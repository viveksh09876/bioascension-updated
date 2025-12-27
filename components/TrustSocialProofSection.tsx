import React from 'react';

const TrustSocialProofSection = ({ hideCta = false }: { hideCta?: boolean }) => (
  <section className="relative z-10 py-16 px-4 sm:px-6 md:px-20 bg-gradient-to-br from-teal-50 to-deepblue-50 rounded-3xl border border-teal-200 shadow-xl mb-16">
    <div className="max-w-5xl mx-auto flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-deepblue text-center mb-4">
        <span className="inline-block bg-gradient-to-r from-teal to-deepblue text-transparent bg-clip-text">Trusted by 10,000+ Users Worldwide</span>
      </h3>
      <p className="text-lg sm:text-xl text-gray-700 text-center mb-10 max-w-2xl">
        Join the growing community of young adults who've unlocked their genetic potential with Heightmax
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow p-6 border border-teal/10">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-teal-100 mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <div className="text-3xl font-extrabold text-teal mb-1">95%</div>
          <div className="text-gray-700 font-semibold">Accuracy Rate</div>
          <div className="text-xs text-gray-500 mt-1">Verified by user feedback</div>
        </div>
        <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow p-6 border border-teal/10">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100 mb-4">
            <span className="text-3xl">👥</span>
          </div>
          <div className="text-3xl font-extrabold text-teal mb-1">10K+</div>
          <div className="text-gray-700 font-semibold">Users Analyzed</div>
          <div className="text-xs text-gray-500 mt-1">Growing daily</div>
        </div>
        <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow p-6 border border-teal/10">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-teal-100 mb-4">
            <span className="text-3xl">⭐</span>
          </div>
          <div className="text-3xl font-extrabold text-teal mb-1">4.9/5</div>
          <div className="text-gray-700 font-semibold">Average Rating</div>
          <div className="text-xs text-gray-500 mt-1">Based on 2,500+ reviews</div>
        </div>
      </div>
      {!hideCta && (
        <>
          <a
            href="/quiz"
            className="inline-flex items-center bg-gradient-to-r from-teal to-deepblue text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group mb-2"
          >
            <span>Start Your Analysis Now</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-sm text-gray-500 mt-2 text-center">Takes less than 10 minutes • No credit card required to start</p>
        </>
      )}
    </div>
  </section>
);

export default TrustSocialProofSection; 