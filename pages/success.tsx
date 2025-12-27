import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Success() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const quizData = localStorage.getItem('bioascension_quiz_data');
      if (!quizData) {
        router.replace('/quiz');
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserDataAndSendEmail = async () => {
      try {
        // Get email and userId from localStorage
        const storedEmail = localStorage.getItem('bioascension_email');
        const storedUserId = localStorage.getItem('bioascension_user_id');
        
        if (storedEmail) setEmail(storedEmail);
        if (storedUserId) {
          const userIdNum = parseInt(storedUserId);
          setUserId(userIdNum);
          
          // Check if user is free or paid
          const userChoice = localStorage.getItem('bioascension_user_choice');
          const isFreeUser = userChoice === 'free';

          if (isFreeUser) {
            // For free users, DO NOT increment referral progress immediately
            // They need to complete their own 3/3 referrals first
            // The increment will happen when they complete their referrals (handled in increment.ts)
            setEmailSent(true);
          } else {
            // For paid users, email was already sent in preparing.tsx
            setEmailSent(true);
          }
        } else {
          setError('User ID not found');
        }
      } catch (err) {
        console.error('Error in success page:', err);
        setError('An error occurred while processing your request');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDataAndSendEmail();
  }, []);

  return (
    <div className="bg-gradient-to-br from-lightblue to-white min-h-screen">
      <Head>
        <title>Success - Heightmax</title>
        <meta name="description" content="Your personalized report is being delivered." />
      </Head>
      <div className="max-w-4xl mx-auto px-6 py-16 flex items-center justify-center min-h-[80vh]">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
          <div className="w-24 h-24 bg-gradient-to-r from-teal to-deepblue rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <span className="text-4xl text-white">🎯</span>
          </div>
          <h1 className="text-4xl font-bold text-deepblue mb-4">Your Results Are Ready!</h1>
          
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deepblue mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 mb-8">Processing your analysis and sending your report...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-xl text-red-600 mb-8">{error}</p>
              {error.includes('referral progress') && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 text-sm">
                    💡 <strong>Tip:</strong> Share your referral link with friends to unlock your free report!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
          <p className="text-xl text-gray-600 mb-8">
            We've analyzed your genetic data and prepared your personalized report.<br />
            <b>Your full report has been sent to {email || 'your email'}.</b>
          </p>
          <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 border-2 border-teal/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-deepblue mb-6 text-center">Check your email for your full analysis!</h2>
            <p className="text-gray-700 text-center">For your privacy, your full report is only available via email.</p>
          </div>
            </>
          )}
          
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-4">
              Didn't receive your email? Check your spam folder or contact support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:sales@heightmax.ai"
                className="px-6 py-2 bg-gray-100 text-deepblue rounded-lg hover:bg-gray-200 transition"
              >
                📧 Contact Support
              </a>
              <button 
                onClick={() => router.push('/')}
                className="px-6 py-2 bg-gradient-to-r from-teal to-deepblue text-white rounded-lg hover:from-teal-400 hover:to-deepblue transition"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
