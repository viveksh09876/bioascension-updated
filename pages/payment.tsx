import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    // Generate a simple referral link (in real app, use user ID or token)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const userId = localStorage.getItem('bioascension_email') || 'your-email';
    setReferralLink(`${baseUrl}/quiz?ref=${encodeURIComponent(userId)}`);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = async () => {
    if (!email || !name) {
      alert('Please fill in your email and name');
      return;
    }
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      localStorage.setItem('bioascension_email', email);
      localStorage.setItem('bioascension_name', name);
      router.push('/preparing');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-deepblue via-teal to-lightblue min-h-screen flex flex-col">
      <Head>
        <title>Unlock Your Report - Heightmax</title>
        <meta name="description" content="Unlock your personalized genetic report by payment or referral." />
      </Head>
      <header className="bg-deepblue/80 backdrop-blur-sm text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center">
          <div className="font-extrabold text-2xl tracking-tight">
            <span className="bg-gradient-to-r from-teal to-white text-transparent bg-clip-text drop-shadow-lg">Heightmax</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-teal/20">
          <h1 className="text-3xl font-bold text-deepblue mb-6 text-center">Unlock Your Full Report</h1>
          <p className="text-lg text-gray-700 mb-8 text-center">Choose one of the options below to access your personalized genetic analysis and growth report.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pay Option */}
            <div className="bg-gradient-to-br from-white to-teal/10 rounded-2xl shadow p-6 flex flex-col items-center border border-teal/20">
              <div className="w-16 h-16 bg-gradient-to-r from-teal to-deepblue rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white">💳</span>
              </div>
              <h2 className="text-xl font-bold text-deepblue mb-2">Pay Instantly</h2>
              <div className="text-3xl font-extrabold text-teal mb-2">$4.99</div>
              <p className="text-gray-600 mb-4 text-center">Unlock your report immediately with a one-time payment.</p>
              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-teal text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-teal-600 transition-all duration-300 mt-auto"
              >
                Pay & Unlock Now
              </button>
            </div>
            {/* Referral Option */}
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow p-6 flex flex-col items-center border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-teal rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white">🎁</span>
              </div>
              <h2 className="text-xl font-bold text-yellow-700 mb-2">Unlock for Free</h2>
              <p className="text-gray-700 mb-4 text-center">Share your referral link. Once 3 friends complete and submit the quiz, your report unlocks for free!</p>
              <div className="w-full flex flex-col items-center mb-4">
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-teal/30 rounded-l-lg text-sm bg-gray-50 focus:outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2 bg-teal text-white rounded-r-lg font-semibold text-sm transition-all duration-200 ${copied ? 'bg-green-500' : 'hover:bg-teal-600'}`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <span className="text-xs text-gray-500 mt-2">Share this link with your friends</span>
              </div>
              <div className="text-xs text-yellow-700 text-center mt-2">* Your report will unlock automatically when 3 friends use your link and complete the quiz.</div>
            </div>
          </div>
          {/* Payment Modal/Section */}
          {showPayment && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                <button onClick={() => setShowPayment(false)} className="absolute top-3 right-3 text-gray-400 hover:text-teal text-2xl">×</button>
                <h2 className="text-2xl font-bold text-deepblue mb-4 text-center">Secure Checkout</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                  />
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-teal text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-teal-600 transition-all duration-300 mt-2 disabled:opacity-60"
                  >
                    {isProcessing ? 'Processing...' : 'Pay $4.99 & Unlock'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-xs text-gray-500">
          © 2025 Heightmax. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
