import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import SamplePredictionsDashboard from '../components/SamplePredictionsDashboard';
import WhyChoiceHeightmax from '../components/WhyChoiceHeightmax';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import UrgencySection from '../components/UrgencySection';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear(); // Always clear
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) {
        localStorage.setItem('current_referral_ref', ref);
      }
    }
  }, []);

  return (
    <div className="bg-lightblue min-h-screen flex flex-col">
      <Head>
        <title>Heightmax – Discover Your Genetic Potential</title>
        <meta name="description" content="Maximize your face, height and frame by understanding what your puberty + genetics are truly capable of." />
      </Head>
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-deepblue text-white shadow flex items-center justify-between px-8 py-4">
        <a href="/" className="font-extrabold text-2xl tracking-tight flex items-center hover:scale-105 transition-transform duration-200">
          <Image src="/logo/logo.png" width={55} height={36} alt="Heightmax Logo" />
          <span className="bg-gradient-to-r from-teal to-white text-transparent bg-clip-text drop-shadow-lg">Heightmax</span>
        </a>
        <nav className="hidden md:flex gap-10 text-base font-semibold mx-auto">
          <a href="#how" className="hover:text-teal transition">How It Works</a>
          <a href="#pricing" className="hover:text-teal transition">Pricing</a>
          <a href="#faq" className="hover:text-teal transition">FAQ</a>
          <a href="/contact-us" className="hover:text-teal transition">Contact</a>
          <a href="/refund-policy" className="hover:text-teal transition">Refund Policy</a>
          <a href="/terms-conditions" className="hover:text-teal transition">Terms & Conditions</a>
          <a href="/privacy-policy" className="hover:text-teal transition">Privacy Policy</a>
        </nav>
        <a href="/quiz" className="bg-gradient-to-r from-teal to-deepblue text-white px-6 py-2 rounded-lg shadow font-bold hover:from-teal-400 hover:to-deepblue transition">Start Quiz</a>
      </header>

      {/* Hero Section */}
      <section className="flex justify-center items-center min-h-[80vh] p-4 sm:p-6 md:p-12 bg-white">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start">
            <div className="mb-4 md:mb-6">
              <span className="inline-block bg-teal/10 text-teal px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                🧬 Science-Based Analysis
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight text-deepblue text-center md:text-left">
              Discover & Maximize Your <span className="text-teal">Genetic Potential</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-lg text-gray-600 leading-relaxed text-center md:text-left">
              Maximize your height, face, frame by understanding what your genetics and puberty are truly capable of.
            </p>
            <div className="mb-6 md:mb-8">
              <a href="/quiz" className="inline-flex items-center justify-center bg-gradient-to-r from-teal to-deepblue text-white px-6 py-3 md:px-8 md:py-4 rounded-xl shadow-lg text-base md:text-lg font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Start Your Analysis
                <span className="ml-2">→</span>
              </a>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <span className="mr-4">✓ 95% Accuracy</span>
              <span>✓ Instant Results</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center w-full max-w-[300px] md:max-w-none mx-auto">
            {/* DNA visualization component - adjust size for mobile */}
            <div className="relative w-full max-w-[280px] md:max-w-none">
              {/* Main DNA Analysis Container - reduce size on mobile */}
              <div className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center">
                {/* Charming background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-deepblue/5 rounded-full"></div>

                {/* Elegant scanning rings */}
                <div className="absolute inset-0 rounded-full border-2 border-teal/30 animate-spin shadow-lg" style={{ animationDuration: '25s' }}></div>
                <div className="absolute inset-8 rounded-full border border-deepblue/25 animate-spin shadow-md" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-16 rounded-full border border-teal/15 animate-spin" style={{ animationDuration: '15s' }}></div>

                {/* Magical sparkle effects */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-teal rounded-full animate-ping opacity-40"
                    style={{
                      top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 30}%`,
                      left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 30}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: '3s'
                    }}
                  ></div>
                ))}

                {/* Central DNA Helix */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Beautiful DNA Double Helix Structure */}
                  <div className="relative w-52 h-52 dna-helix">
                    {/* Create the elegant double helix */}
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          transform: `rotateZ(${i * 18}deg)`,
                          opacity: 0.7 + (i % 3) * 0.1
                        }}
                      >
                        {/* Left DNA strand with glow */}
                        <div className="absolute left-1/3 top-0 w-1.5 h-full bg-gradient-to-b from-teal via-teal/90 to-teal/50 rounded-full transform -rotate-15 shadow-lg shadow-teal/30"></div>
                        {/* Right DNA strand with glow */}
                        <div className="absolute right-1/3 top-0 w-1.5 h-full bg-gradient-to-b from-deepblue via-deepblue/90 to-deepblue/50 rounded-full transform rotate-15 shadow-lg shadow-deepblue/30"></div>

                        {/* Charming base pairs with subtle animation */}
                        {[...Array(10)].map((_, pair) => (
                          <div
                            key={pair}
                            className="absolute left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-teal via-white to-deepblue rounded-full shadow-sm"
                            style={{
                              top: `${8 + pair * 8}%`,
                              opacity: 0.8 + Math.sin(pair * 0.5) * 0.2,
                              transform: `rotateZ(${pair * 12}deg) scale(${0.8 + Math.sin(pair * 0.3) * 0.2})`
                            }}
                          ></div>
                        ))}
                      </div>
                    ))}

                    {/* Enchanting central core */}
                    <div className="absolute inset-1/4 bg-gradient-to-br from-teal/30 to-deepblue/30 rounded-full backdrop-blur-sm border-2 border-white/40 shadow-2xl glow-effect"></div>
                    <div className="absolute inset-1/3 bg-gradient-to-br from-teal to-deepblue rounded-full shadow-xl animate-pulse flex items-center justify-center border-2 border-white/20">
                      <span className="text-white text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🧬</span>
                    </div>
                  </div>

                  {/* Gentle scanning beam effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-teal/60 to-transparent opacity-50 animate-spin shadow-lg shadow-teal/20" style={{ animationDuration: '4s' }}></div>
                  </div>
                </div>

                {/* Credibility Indicators Outside Circle */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-teal/20">
                    <div className="text-center">
                      <div className="text-xl font-bold text-teal">95%</div>
                      <div className="text-xs text-gray-600 font-medium">Accuracy</div>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-deepblue/20">
                    <div className="text-center">
                      <div className="text-xl font-bold text-deepblue">10K+</div>
                      <div className="text-xs text-gray-600 font-medium">Users Tested</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-16 -left-12 floating-element" style={{ animationDelay: '2s' }}>
                  <div className="bg-gradient-to-br from-teal to-deepblue rounded-2xl shadow-xl p-4 border border-white/30 hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                      <div className="text-white text-2xl mb-2">📏</div>
                      <div className="text-white text-sm font-medium">Height</div>
                      <div className="text-white/80 text-xs">Prediction</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-16 -right-12 floating-element" style={{ animationDelay: '1.5s' }}>
                  <div className="bg-gradient-to-br from-deepblue to-teal rounded-2xl shadow-xl p-4 border border-white/30 hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                      <div className="text-white text-2xl mb-2">🧬</div>
                      <div className="text-white text-sm font-medium">Growth</div>
                      <div className="text-white/80 text-xs">Timeline</div>
                    </div>
                  </div>
                </div>

                {/* Delightful floating genetic particles */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-br from-teal to-deepblue rounded-full shadow-lg particle-orbit opacity-70 animate-pulse"
                    style={{
                      top: '50%',
                      left: '50%',
                      animationDelay: `${i * 0.4}s`,
                      animationDuration: `${10 + i * 0.5}s`
                    }}
                  ></div>
                ))}

                {/* Charming scientific indicators */}
                <div className="absolute top-6 left-6 floating-element" style={{ animationDelay: '3s' }}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-3 py-2 border border-teal/20">
                    <div className="text-xs text-teal font-bold flex items-center">
                      <span className="w-2 h-2 bg-teal rounded-full mr-2 animate-pulse"></span>
                      DNA Analysis Active
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 floating-element" style={{ animationDelay: '4s' }}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-3 py-2 border border-deepblue/20">
                    <div className="text-xs text-deepblue font-bold flex items-center">
                      <span className="w-2 h-2 bg-deepblue rounded-full mr-2 animate-pulse"></span>
                      Processing Complete
                    </div>
                  </div>
                </div>

                {/* Elegant connecting constellation */}
                <div className="absolute inset-0 pointer-events-none opacity-25">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <circle
                      cx="200"
                      cy="200"
                      r="160"
                      stroke="url(#charmingGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="15,10"
                      className="animate-spin"
                      style={{ animationDuration: '30s' }}
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="120"
                      stroke="url(#charmingGradient2)"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="8,5"
                      className="animate-spin"
                      style={{ animationDuration: '20s', animationDirection: 'reverse' }}
                    />
                    <defs>
                      <linearGradient id="charmingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00C2A8" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#0A0E3F" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00C2A8" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="charmingGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0A0E3F" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#00C2A8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0A0E3F" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Predictions Dashboard */}
      <SamplePredictionsDashboard />

      {/* Why Heightmax */}
      <WhyChoiceHeightmax />

      {/* Reviews */}
      <Reviews />

      {/* FAQ */}
      <FAQ />

      {/* Urgency Section */}
      <UrgencySection />

      {/* Footer */}
      < footer className="bg-gray-50 border-t border-gray-200 py-12 px-6 md:px-20 mt-auto" >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-bold text-2xl text-deepblue mb-2">Heightmax</div>
              <p className="text-gray-600 text-sm">Discover and maximize your genetic potential</p>
            </div>
            <div className="flex gap-8 text-sm mb-6 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-teal transition-colors duration-300">Home</a>
              <a href="#how" className="text-gray-600 hover:text-teal transition-colors duration-300">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-teal transition-colors duration-300">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-teal transition-colors duration-300">FAQ</a>
              <a href="/contact-us" className="text-gray-600 hover:text-teal transition-colors duration-300">Contact</a>
              <a href="/refund-policy" className="text-gray-600 hover:text-teal transition-colors duration-300">Refund Policy</a>
              <a href="/terms-conditions" className="text-gray-600 hover:text-teal transition-colors duration-300">Terms & Conditions</a>
              <a href="/privacy-policy" className="text-gray-600 hover:text-teal transition-colors duration-300">Privacy Policy</a>
            </div>
            <div className="text-xs text-gray-500">© 2025 Heightmax. All rights reserved.</div>
          </div>
        </div>
      </footer >
    </div >
  );
} 
