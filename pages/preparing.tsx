import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Preparing() {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    { text: "Analyzing your genetic data...", icon: "🧬", duration: 2000 },
    { text: "Processing growth patterns...", icon: "📊", duration: 2500 },
    { text: "Calculating height predictions...", icon: "📏", duration: 2000 },
    { text: "Evaluating puberty markers...", icon: "🔬", duration: 2200 },
    { text: "Assessing facial development...", icon: "💀", duration: 1800 },
    { text: "Generating optimization strategies...", icon: "💪", duration: 2000 },
    { text: "Finalizing your personalized report...", icon: "✨", duration: 1500 }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // DEV MODE: Set test user data in localStorage
      // if (process.env.NODE_ENV === 'development') {
      //   localStorage.setItem('bioascension_firstName', 'Test');
      //   localStorage.setItem('bioascension_lastName', 'User');
      //   localStorage.setItem('bioascension_email', 'traininga951@gmail.com');
      // }
      const quizData = localStorage.getItem('bioascension_quiz_data');
      if (!quizData) {
        router.replace('/quiz');
      }
    }
  }, []);

  useEffect(() => {
    const runLoadingSequence = async () => {
      let totalProgress = 0;
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(i);
        const stepProgress = 100 / loadingSteps.length;
        const startProgress = totalProgress;
        const endProgress = totalProgress + stepProgress;
        const animationDuration = loadingSteps[i].duration;
        const animationSteps = 50;
        const progressIncrement = stepProgress / animationSteps;
        const timeIncrement = animationDuration / animationSteps;
        for (let j = 0; j <= animationSteps; j++) {
          const currentProgress = startProgress + (progressIncrement * j);
          setProgress(Math.min(currentProgress, endProgress));
          await new Promise(resolve => setTimeout(resolve, timeIncrement));
        }
        totalProgress = endProgress;
      }
      // Add a small delay at the end to show 100% completion
      await new Promise(resolve => setTimeout(resolve, 500));
    };

    const saveUserAndRunAnalysis = async () => {
      try {
        // Get user form data from localStorage
        const email = localStorage.getItem('bioascension_email');
        const firstName = localStorage.getItem('bioascension_firstName');
        const lastName = localStorage.getItem('bioascension_lastName');
        
        if (!email || !firstName || !lastName) {
          throw new Error('User form data not found');
        }

        // Store userId in localStorage for later use
        const userId = localStorage.getItem('bioascension_user_id');

        // Step 2: Retrieve quiz data
        const quizDataString = localStorage.getItem('bioascension_quiz_data');
        if (!quizDataString) throw new Error('Quiz data not found');
        const quizData = JSON.parse(quizDataString);

        // Retrieve photoPaths from localStorage (if available)
        let photoPaths = {};
        const photoPathsString = localStorage.getItem('bioascension_photo_paths');
        if (photoPathsString) {
          try {
            photoPaths = JSON.parse(photoPathsString);
          } catch (e) {
            photoPaths = {};
          }
        }

        // Step 3: Check if user chose free option or paid option
        const userChoice = localStorage.getItem('bioascension_user_choice');
        const isFreeUser = userChoice === 'free';

        if (!isFreeUser) {
          // For paid users, generate analysis and send email
          const analysisResponse = await fetch('/api/analyzed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quizData,
              isFreeUser: false,
              photoPaths
            })
          });

          if (!analysisResponse.ok) {
            throw new Error('Failed to generate analysis');
          }

          const { analysis } = await analysisResponse.json();

          // Save analysis to database
          await fetch('/api/analysis/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: Number(userId),
              content: analysis,
              isFreeUser: false
            })
          });

          // Send email with analysis
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              name: `${firstName} ${lastName}`,
              analysis,
              isFreeUser: false
            })
          });
        }

        // Step 6: Redirect to success page
        router.push('/success');
      } catch (error) {
        console.error('Analysis error:', error);
        alert('Failed to analyze your data. Please contact support.');
      }
    };

    // Run loading animation first, then save user and run analysis
    const runCompleteFlow = async () => {
      await runLoadingSequence();
      await saveUserAndRunAnalysis();
    };

    runCompleteFlow();
  }, [router]);

  return (
    <div className="bg-gradient-to-br from-deepblue via-teal to-lightblue min-h-screen">
      <Head>
        <title>Preparing Your Results - Heightmax</title>
        <meta name="description" content="We're analyzing your genetic data and preparing your personalized report." />
      </Head>
      {/* Header */}
      <header className="bg-deepblue/80 backdrop-blur-sm text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center">
          <div className="font-extrabold text-2xl tracking-tight">
            <span className="bg-gradient-to-r from-teal to-white text-transparent bg-clip-text drop-shadow-lg">Heightmax</span>
          </div>
        </div>
      </header>
      {/* Loading Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 flex items-center justify-center min-h-[85vh]">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
          {/* Main DNA Animation */}
          <div className="relative mb-8">
            <div className="w-40 h-40 mx-auto relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal via-deepblue to-purple-500 opacity-20 animate-pulse"></div>
              {/* Middle ring */}
              <div className="absolute inset-3 rounded-full bg-gradient-to-r from-teal via-deepblue to-purple-500 opacity-40 animate-ping"></div>
              {/* Inner spinning DNA */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-teal via-deepblue to-purple-500 flex items-center justify-center animate-spin">
                <span className="text-5xl text-white">🧬</span>
              </div>
              {/* Floating particles */}
              <div className="absolute inset-0">
                <div className="absolute top-2 left-8 w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-8 right-4 w-1.5 h-1.5 bg-deepblue rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-6 left-4 w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-2 right-8 w-1.5 h-1.5 bg-teal rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-deepblue mb-4">Preparing Your Results</h1>
          <p className="text-xl text-gray-600 mb-8">
            Our advanced system is analyzing your genetic data to create your personalized report...
          </p>
          {/* Current Step Display */}
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
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 bg-gradient-to-r from-teal via-deepblue to-purple-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
          {/* Loading Steps Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-500 ${index === loadingStep
                    ? 'bg-gradient-to-r from-teal/20 to-deepblue/20 border border-teal/30 scale-105'
                    : index < loadingStep
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200 opacity-60'
                  }`}
              >
                <span className="text-xl">{step.icon}</span>
                <span className={`text-sm font-medium ${index === loadingStep ? 'text-deepblue' : index < loadingStep ? 'text-green-700' : 'text-gray-500'
                  }`}>
                  {step.text.replace('...', '')}
                </span>
                {index < loadingStep && <span className="text-green-500 text-lg ml-auto">✓</span>}
                {index === loadingStep && (
                  <div className="w-3 h-3 border-2 border-teal border-t-transparent rounded-full animate-spin ml-auto"></div>
                )}
              </div>
            ))}
          </div>
          {/* What's Being Analyzed */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-deepblue mb-4">What We're Analyzing</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-teal">•</span>
                <span className="text-gray-700">Growth patterns</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-teal">•</span>
                <span className="text-gray-700">Puberty markers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-teal">•</span>
                <span className="text-gray-700">Facial development</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-teal">•</span>
                <span className="text-gray-700">Genetic potential</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="text-center pb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
          <p className="text-xs text-gray-500">
            Your personalized report will be ready in just a moment...
          </p>
        </div>
      </div>
    </div>
  );
}
