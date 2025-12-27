import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TestPayment() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestPayment = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setMessage('❌ Please fill in all required fields');
      return;
    }

    if (!emailVerified) {
      setMessage('❌ Please confirm your email address');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create a test user ID
      const testUserId = Math.floor(Math.random() * 1000000) + 1;
      
      // Store test user data
      localStorage.setItem('bioascension_user_id', testUserId.toString());
      localStorage.setItem('bioascension_firstName', formData.firstName);
      localStorage.setItem('bioascension_lastName', formData.lastName);
      localStorage.setItem('bioascension_email', formData.email);
      localStorage.setItem('bioascension_payment_status', 'paid');

      setMessage('✅ Test payment successful! Redirecting to analysis...');
      
      // Redirect to preparing page after a short delay
      setTimeout(() => {
        router.push('/preparing');
      }, 1500);

    } catch (error) {
      console.error('Test payment error:', error);
      setMessage('❌ Test payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Test Payment - Heightmax</title>
        <meta name="description" content="Test payment functionality without Stripe" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🧪</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Test Payment
            </h1>
            <p className="text-gray-600">
              Bypass Stripe for development/testing
            </p>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your.email@gmail.com"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailVerified"
                checked={emailVerified}
                onChange={(e) => setEmailVerified(e.target.checked)}
                className="mr-3 text-indigo-500 focus:ring-indigo-500"
                required
              />
              <label htmlFor="emailVerified" className="text-sm text-gray-700">
                I confirm that my email address is correct and I will receive my analysis report at this email. <span className="text-red-500">*</span>
              </label>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-2 mt-0.5">⚠️</span>
                <div className="text-sm text-orange-700">
                  <strong>Test Mode:</strong> This payment will be simulated without charging any real money. 
                  Your data will be processed normally for analysis generation.
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleTestPayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isProcessing
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isProcessing ? 'Processing Test Payment...' : '🧪 Process Test Payment ($4.99)'}
            </button>
            
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-center ${
                message.includes('✅') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}
            
            <div className="text-xs text-gray-500 text-center mt-4">
              <p>This test payment will:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Create a test user ID</li>
                <li>Store your information in localStorage</li>
                <li>Redirect to the analysis preparation page</li>
                <li>Process your quiz data normally</li>
              </ul>
            </div>
            
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => router.push('/unlock-report')}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                ← Back to Unlock Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
} 