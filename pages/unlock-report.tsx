import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFingerprint } from '../components/FingerprintProvider';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import SamplePredictionsDashboard from '../components/SamplePredictionsDashboard';
import TrustSocialProofSection from '../components/TrustSocialProofSection';
import HowItWorksSection from '../components/HowItWorksSection';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import UrgencySection from '../components/UrgencySection';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Payment Form Component
function PaymentForm({
  paymentForm,
  setPaymentForm,
  paidEmailVerified,
  setPaidEmailVerified,
  onPaymentSuccess
}: {
  paymentForm: { firstName: string; lastName: string; email: string };
  setPaymentForm: (form: { firstName: string; lastName: string; email: string }) => void;
  paidEmailVerified: boolean;
  setPaidEmailVerified: (verified: boolean) => void;
  onPaymentSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardName, setCardName] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: paymentForm.email,
          firstName: paymentForm.firstName,
          lastName: paymentForm.lastName,
        }),
      });

      const { clientSecret, userId } = await response.json();

      // Confirm payment
      const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: cardName,
            email: paymentForm.email,
            address: {
              postal_code: postalCode
            }
          },
        },
      });

      if (paymentError) {
        setError(paymentError.message || 'Payment failed');
      } else {
        // Payment successful - save userId to localStorage
        localStorage.setItem('bioascension_user_id', userId);
        onPaymentSuccess();
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            required
            value={paymentForm.firstName}
            onChange={(e) => setPaymentForm({ ...paymentForm, firstName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deepblue focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            required
            value={paymentForm.lastName}
            onChange={(e) => setPaymentForm({ ...paymentForm, lastName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deepblue focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            required
            value={paymentForm.email}
            onChange={(e) => {
              setPaymentForm({ ...paymentForm, email: e.target.value });
              setPaidEmailVerified(false);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deepblue focus:border-transparent"
            placeholder="your.email@gmail.com"
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="paidEmailVerified"
              checked={paidEmailVerified}
              onChange={(e) => setPaidEmailVerified(e.target.checked)}
              className="mr-2 text-deepblue focus:ring-deepblue"
              required
            />
            <label htmlFor="paidEmailVerified" className="text-sm text-gray-700">
              I confirm that my email address is correct and I will receive my analysis report at this email. <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <h4 className="font-bold text-deepblue mr-2">Payment Information</h4>
          <span className="text-green-600 text-lg" title="Secure payment">🔒</span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name on the Card</label>
            <input
              type="text"
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deepblue focus:border-transparent"
              placeholder="Name as it appears on your card"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card</label>
            <div className={`rounded-xl p-4 border transition-all duration-200 ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
            <input
              type="text"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deepblue focus:border-transparent"
              placeholder="ZIP/Postal Code"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm mt-2">{error}</div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing || !paidEmailVerified}
        className="w-full bg-deepblue text-white py-4 rounded-2xl font-bold text-lg border-2 border-deepblue hover:bg-deepblue-700 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing Payment...' : 'Pay $4.99 & Get Report'}
      </button>
      <div className="flex items-center justify-center mt-4 text-gray-600 text-sm">
        <span role="img" aria-label="lock">🔒</span>
        <span className="ml-2">Payment encrypted & secured by Stripe</span>
      </div>
    </form>
  );
}

export default function UnlockReport() {
  const router = useRouter();
  const { fingerprint, isLoading: fingerprintLoading } = useFingerprint();
  const [selectedOption, setSelectedOption] = useState<'free' | 'paid' | null>(null);
  const [referralForm, setReferralForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [referralLink, setReferralLink] = useState('');
  const [showReferralLink, setShowReferralLink] = useState(false);
  const [referralProgress, setReferralProgress] = useState(0);
  const [referralId, setReferralId] = useState<string | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const [emailError, setEmailError] = useState(false);

  // Email verification checkbox states
  const [emailVerified, setEmailVerified] = useState(false);
  const [paidEmailVerified, setPaidEmailVerified] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | null }>({ message: '', type: null });
  const [isProcessing, setIsProcessing] = useState(false);

  // Toast auto-hide effect
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: '', type: null }), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Ensure inviter's referral code is captured from URL and stored in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) {
        // localStorage.setItem('current_referral_ref', ref); // This line is removed
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const quizData = localStorage.getItem('bioascension_quiz_data');
      if (!quizData) {
        router.replace('/quiz');
      }
    }
  }, []);

  const validateEmail = (email: string) => {
    // General email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateSelfReferral = (userId: number, referralID: number) => {
    return userId !== referralID;
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Email validation
    if (!validateEmail(referralForm.email)) {
      setEmailError(true);
      setToast({ message: 'Please enter a valid email address', type: 'error' });
      return;
    } else {
      setEmailError(null);
    }
    // Email verification checkbox validation
    if (!emailVerified) {
      setToast({ message: 'Please confirm that your email address is correct by checking the box before submitting.', type: 'error' });
      return;
    }

    // Get the referral code that was used by this person (if any)
    const usedReferralCode = localStorage.getItem('current_referral_ref');

    // 1. Save user data to database first
    let userId = null;
    try {
      const saveUserResponse = await fetch('/api/user/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: referralForm.email,
          firstName: referralForm.firstName,
          lastName: referralForm.lastName
        })
      });

      if (saveUserResponse.status === 409) {
        setToast({ message: 'You have already completed this test with this email.', type: 'error' });
        return;
      }

      if (!saveUserResponse.ok) {
        throw new Error('Failed to save user data');
      }

      const saveUserResult = await saveUserResponse.json();
      if (saveUserResult && saveUserResult.user && saveUserResult.user.id) {
        userId = saveUserResult.user.id;
        localStorage.setItem('bioascension_user_id', userId);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      return;
    }

    // 2. Look up inviter's referralCode id (if any)
    let inviterReferralIdInt = undefined;
    if (usedReferralCode) {
      try {
        const inviterRes = await fetch(`/api/referral/progress?ref=${usedReferralCode}`);
        const inviterData = await inviterRes.json();
        if (inviterData && inviterData.id) {
          inviterReferralIdInt = inviterData.id;
        }
      } catch (err) {
        console.error('Failed to fetch inviter referral id:', err);
      }
    }

    // 3. Validate self-referral prevention
    if (userId && inviterReferralIdInt && !validateSelfReferral(Number(userId), Number(inviterReferralIdInt))) {
      console.log(`Self-referral attempt detected in frontend: userId=${userId}, referralID=${inviterReferralIdInt}`);
      setToast({ message: 'You cannot refer yourself. Please use a different referral code.', type: 'error' });
      return;
    }

    // 4. Generate unique referral link and save to backend
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const link = `${window.location.origin}/?ref=${uniqueId}`;

    try {
      const referralResponse = await fetch('/api/referral/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref: String(uniqueId),
          email: String(referralForm.email),
          userId: Number(userId),
          referralID: inviterReferralIdInt,
          fingerprint: fingerprint
        })
      });

      if (!referralResponse.ok) {
        const errorData = await referralResponse.json();
        if (errorData.reason === 'Self-referral detected') {
          setToast({ message: errorData.error || 'You cannot refer yourself. Please use a different referral code.', type: 'error' });
        } else if (errorData.reason === 'IP rate limit exceeded') {
          setToast({ message: 'Too many referral attempts from this IP. Please try again later.', type: 'error' });
        } else if (errorData.reason === 'Device rate limit exceeded') {
          setToast({ message: 'Too many referral attempts from this device. Please try again later.', type: 'error' });
        } else {
          setToast({ message: errorData.error || 'Failed to save referral code', type: 'error' });
        }
        return;
      } else {
        // Only show referral link after successful security checks
        setReferralLink(link);
        setShowReferralLink(true);
        setReferralId(uniqueId);
        setToast({ message: '✅ Referral code created successfully! Share your link with friends to unlock your free report.', type: 'success' });
      }
    } catch (error) {
      console.error('Failed to save referral code:', error.stack);
      setToast({ message: 'Failed to save referral code. Please try again.', type: 'error' });
      return;
    }

    // 5. Save quiz data to QuizSubmission table
    try {
      const quizDataString = localStorage.getItem('bioascension_quiz_data');
      const photoPathsString = localStorage.getItem('bioascension_photo_paths');

      if (quizDataString && userId) {
        const quizData = JSON.parse(quizDataString);
        let photoPaths = {};

        if (photoPathsString) {
          try {
            photoPaths = JSON.parse(photoPathsString);
          } catch (e) {
            console.error('Failed to parse photo paths:', e);
          }
        }
        // Save quiz submission WITHOUT photoPaths for free users
        await fetch('/api/quiz-submission/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: Number(userId),
            quizData,
            isFreeUser: true,
          })
        });
        // Delete uploaded photos for free users
        if (photoPaths && Object.values(photoPaths).length > 0) {
          await Promise.all(
            Object.values(photoPaths)
              .filter(Boolean)
              .map(async (url) => {
                try {
                  await fetch('/api/delete-photo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                  });
                } catch (err) {
                  console.error('Failed to delete photo from Vercel Blob:', url, err);
                }
              })
          );
          // Optionally clear from localStorage
          localStorage.removeItem('bioascension_photo_paths');
        }
      }
    } catch (error) {
      console.error('Failed to save quiz submission:', error);
    }

  };

  const handlePaymentSuccess = async () => {
    try {
      // Store user data for analysis
      localStorage.setItem('bioascension_firstName', paymentForm.firstName);
      localStorage.setItem('bioascension_lastName', paymentForm.lastName);
      localStorage.setItem('bioascension_email', paymentForm.email);
      localStorage.setItem('bioascension_payment_status', 'paid');

      // Save quiz data to QuizSubmission table for paid users
      const userId = localStorage.getItem('bioascension_user_id');
      const quizDataString = localStorage.getItem('bioascension_quiz_data');
      const photoPathsString = localStorage.getItem('bioascension_photo_paths');

      if (quizDataString && userId) {
        const quizData = JSON.parse(quizDataString);
        let photoPaths = {};

        if (photoPathsString) {
          try {
            photoPaths = JSON.parse(photoPathsString);
          } catch (e) {
            console.error('Failed to parse photo paths:', e);
          }
        }

        await fetch('/api/quiz-submission/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: Number(userId),
            quizData,
            isFreeUser: false,
            photoPaths
          })
        });
      }

      setToast({ message: '✅ Payment successful! Redirecting to analysis...', type: 'success' });

      // Redirect to preparing page
      router.push('/preparing');
    } catch (error) {
      console.error('Error processing payment success:', error);
      setToast({ message: '❌ Failed to process payment. Please try again.', type: 'error' });
    }
  };



  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setToast({ message: '📋 Referral link copied to clipboard! Share it with your friends.', type: 'success' });
  };

  // Poll referral progress if referralId is set
  useEffect(() => {
    if (!referralId) return;
    const poll = async () => {
      const res = await fetch(`/api/referral/progress?ref=${referralId}`);
      const data = await res.json();
      const newProgress = data.progress || 0;

      // Show progress update messages
      if (newProgress > referralProgress && newProgress > 0) {
        if (newProgress === 1) {
          setToast({ message: '🎉 First friend completed! 1/3 referrals done.', type: 'success' });
        } else if (newProgress === 2) {
          setToast({ message: '🎉 Second friend completed! 2/3 referrals done. Almost there!', type: 'success' });
        } else if (newProgress === 3) {
          setToast({ message: '🎉 All friends completed! Your free report is being sent to your email!', type: 'success' });
        }
      }

      setReferralProgress(newProgress);
    };
    poll();
    pollingRef.current = setInterval(poll, 5000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [referralId, referralProgress]);

  return (
    <>
      <div className="bg-gradient-to-br from-lightblue to-white min-h-screen">
        {/* Toast Notification */}
        {toast.message && (
          <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl text-white text-lg font-semibold transition-all duration-500 ${toast.type === 'error' ? 'bg-red-500 border-2 border-red-400' : 'bg-green-500 border-2 border-green-400'} flex items-center space-x-4 max-w-md`}>
            <div className="flex-shrink-0">
              {toast.type === 'error' ? '❌' : '✅'}
            </div>
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => setToast({ message: '', type: null })}
              className="flex-shrink-0 ml-4 text-white hover:text-gray-200 transition-colors text-xl"
            >
              ✕
            </button>
          </div>
        )}
        <Head>
          <title>Unlock Your Report - Heightmax</title>
          <meta name="description" content="Choose how to unlock your personalized Heightmax report" />
        </Head>

        {/* Header */}
        <header className="bg-deepblue text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="font-extrabold text-2xl tracking-tight">
              <span className="bg-gradient-to-r from-teal to-white text-transparent bg-clip-text drop-shadow-lg">Heightmax</span>
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-teal hover:text-white transition"
            >
              ← Back to Home
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-teal to-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-4xl text-white">🎯</span>
            </div>
            <h1 className="text-4xl font-bold text-deepblue mb-4">Your Report is Ready!</h1>
            <p className="text-xl text-white font-medium max-w-3xl mx-auto">
              We've analyzed your responses using our 95% accurate system powered by millions of data points. Your personalized Heightmax report is now ready to unlock.
              Choose how you'd like to access your results:
            </p>
          </div>

          {/* Unlock Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Free Option - Invite Friends */}
            <div className={`bg-white rounded-3xl shadow-xl p-8 border-2 transition-all duration-300 ${selectedOption === 'free'
              ? 'border-teal shadow-2xl scale-105'
              : 'border-gray-200 hover:border-teal/50 hover:shadow-2xl'
              } flex flex-col h-full justify-between`}>
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">👫</span>
                  </div>
                  <h2 className="text-2xl font-bold text-deepblue mb-2">Invite Friends – FREE Unlock</h2>
                  <p className="text-gray-600">Share your referral link and unlock for free</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-teal mr-3 mt-1">✓</span>
                    <div>
                      <span className="font-semibold text-gray-800">Genetic-only height prediction</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-teal mr-3 mt-1">✓</span>
                    <div>
                      <span className="font-semibold text-gray-800">Prediction based only on your quiz answers</span>
                      <p className="text-sm text-gray-600">🚫 Before-and-after photos will not be analyzed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-teal mr-3 mt-1">✓</span>
                    <div>
                      <span className="font-semibold text-gray-800">Instant email delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setSelectedOption('free');
                    localStorage.setItem('bioascension_user_choice', 'free');
                  }}
                  className="w-full bg-green-100 text-green-900 py-5 px-2 rounded-full font-extrabold text-xl tracking-wide border-4 border-green-400 shadow-lg hover:bg-green-200 hover:shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  Start Free Unlock
                </button>
              </div>
            </div>

            {/* Paid Option */}
            <div className={`relative bg-white rounded-3xl shadow-xl p-8 border-2 transition-all duration-300 
              ${selectedOption === 'paid'
                ? 'border-deepblue shadow-2xl scale-105 ring-4 ring-blue-300/60'
                : 'border-gray-200 hover:border-deepblue/50 hover:shadow-2xl ring-2 ring-blue-200/40'}
            `}>
              {/* Most Popular Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <span className="inline-flex items-center gap-2 bg-yellow-300 text-deepblue text-lg font-extrabold px-7 py-0.5 rounded-full border-2 border-white shadow-lg uppercase tracking-wide">
                  <span className="text-2xl">🌟</span> Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-deepblue to-deepblue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">💎</span>
                </div>
                <h2 className="text-2xl font-bold text-deepblue mb-2">Essential Report – $4.99</h2>
                <p className="text-gray-600">Get your complete results instantly</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Genetic-only height prediction</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Genetic + Optimized height prediction</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Current puberty stage</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Growth timeline projections</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Growth plate fusion analysis</span>
                    <p className="text-sm text-gray-600">% open vs. % closed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Facial maturity timeline</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Predicted development of facial and body structure</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Simple tips to maximize your height and development</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Top tier accuracy with photo analysis</span>
                    <p className="text-sm text-gray-600">Uses your quiz answers + before & now photos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">Instant email delivery</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedOption('paid');
                  localStorage.setItem('bioascension_user_choice', 'paid');
                }}
                className="w-full bg-blue-800 text-white py-5 px-2 rounded-full font-extrabold text-xl tracking-wide border-4 border-blue-400 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Unlock My Full Report – $4.99
              </button>
            </div>
          </div>

          {/* Form Sections */}
          {selectedOption === 'free' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-teal/20">
              <h3 className="text-2xl font-bold text-deepblue mb-6 text-center">Get Your Free Report</h3>

              {!showReferralLink ? (
                <form onSubmit={handleReferralSubmit} className="max-w-md mx-auto">
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        value={referralForm.firstName}
                        onChange={(e) => setReferralForm({ ...referralForm, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        value={referralForm.lastName}
                        onChange={(e) => setReferralForm({ ...referralForm, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={referralForm.email}
                        onChange={(e) => {
                          setReferralForm({ ...referralForm, email: e.target.value });
                          if (emailError) setEmailError(null);
                          setEmailVerified(false);
                        }}
                        className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-teal focus:border-transparent`}
                        placeholder="your.email@example.com"
                      />
                      {emailError && (
                        <div className="text-red-600 text-sm mt-1">Please enter a valid email address</div>
                      )}
                      <div className="flex items-center mt-4">
                        <input
                          type="checkbox"
                          id="emailVerified"
                          checked={emailVerified}
                          onChange={(e) => setEmailVerified(e.target.checked)}
                          className="mr-2 text-teal focus:ring-teal"
                          required
                        />
                        <label htmlFor="emailVerified" className="text-sm text-gray-700">
                          I confirm that my email address is correct and I will receive my analysis report at this email. <span className="text-red-500">*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-100 text-green-900 py-5 px-2 rounded-full font-extrabold text-xl tracking-wide border-4 border-green-400 shadow-lg hover:bg-green-200 hover:shadow-2xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={fingerprintLoading}
                  >
                    {fingerprintLoading ? 'Loading...' : 'Start Free Unlock'}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 rounded-2xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-deepblue mb-4">Thanks! Here's your unique referral link</h4>
                    <p className="text-gray-600 mb-4">Share it with your friends. We'll update your referral progress via Gmail as each friend completes the quiz.</p>

                    <div className="bg-white rounded-xl p-4 border-2 border-teal/20 mb-4">
                      <p className="text-sm text-gray-600 mb-2">Your Referral Link:</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={referralLink}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                        />
                        <button
                          onClick={copyReferralLink}
                          className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-600 transition"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* Referral Progress */}
                    {showReferralLink && (
                      <div className="bg-white rounded-xl p-4 border-2 border-teal/20">
                        <h5 className="font-bold text-deepblue mb-2">Referral Progress</h5>
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          {[1, 2, 3].map((num) => (
                            <div
                              key={num}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${num <= referralProgress
                                ? 'bg-teal text-white'
                                : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                              {num <= referralProgress ? '✓' : num}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {referralProgress === 0 && "0/3 referrals complete"}
                          {referralProgress === 1 && "✅ 1/3 referrals complete"}
                          {referralProgress === 2 && "✅ 2/3 referrals complete"}
                          {referralProgress === 3 && "🎉 3/3 – Your results are ready!"}
                        </p>
                        {referralProgress === 3 && (
                          <div className="mt-4 w-full bg-gradient-to-r from-teal to-teal-600 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center">
                            🎉 You've unlocked your free report! It has been sent to your email.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedOption === 'paid' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-deepblue/20">
              <h3 className="text-2xl font-bold text-deepblue mb-6 text-center">Get Your Complete Report</h3>
              

              
              <Elements stripe={stripePromise}>
                <PaymentForm
                  paymentForm={paymentForm}
                  setPaymentForm={setPaymentForm}
                  paidEmailVerified={paidEmailVerified}
                  setPaidEmailVerified={setPaidEmailVerified}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </Elements>
            </div>
          )}

          {/* Back Button */}
          {selectedOption && (
            <div className="text-center mt-8">
              <button
                onClick={() => setSelectedOption(null)}
                className="text-gray-600 hover:text-deepblue transition"
              >
                ← Choose Different Option
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Place SamplePredictionsDashboard and all sections below here, outside the gradient div */}
      <SamplePredictionsDashboard />
      <TrustSocialProofSection hideCta={true} />
      <HowItWorksSection hideCta={true} />
      <Reviews />
      <FAQ />
      <UrgencySection />
    </>
  );
} 