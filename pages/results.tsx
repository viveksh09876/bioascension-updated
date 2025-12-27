import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Results() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    { text: "Analyzing your genetic data...", icon: "🧬" },
    { text: "Processing growth patterns...", icon: "📊" },
    { text: "Calculating height predictions...", icon: "📏" },
    { text: "Generating your personalized report...", icon: "📋" },
    { text: "Finalizing results...", icon: "✨" }
  ];

  useEffect(() => {
    const processResults = async () => {
      // Simulate loading steps
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      setIsLoading(false);
    };
    processResults();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex items-center justify-center min-h-[80vh]">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
        <div className="w-32 h-32 mx-auto relative mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal to-deepblue opacity-20 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-teal to-deepblue opacity-40 animate-ping"></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-teal to-deepblue flex items-center justify-center animate-spin">
            <span className="text-4xl text-white">🧬</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-deepblue mb-4">Analyzing Your Genetic Data</h1>
        <p className="text-lg text-gray-600 mb-8">
          Our AI is processing your responses and generating your personalized genetic potential report...
        </p>
        <div className="mb-8">
          <div className="bg-gradient-to-r from-teal/20 to-deepblue/20 border-2 border-teal/30 rounded-2xl p-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl animate-pulse">{loadingSteps[loadingStep]?.icon}</span>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-deepblue">
                  {loadingSteps[loadingStep]?.text}
                </h3>
                <p className="text-sm text-gray-600">Step {loadingStep + 1} of {loadingSteps.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 border-2 border-teal/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-deepblue mb-6 text-center">Your full report will be sent to your email after payment or referrals!</h2>
          <p className="text-gray-700 text-center">For your privacy, your full analysis is only available via email.</p>
        </div>
      </div>
    </div>
  );
}
