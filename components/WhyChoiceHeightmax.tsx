import React from 'react';
import TrustSocialProofSection from './TrustSocialProofSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';

const WhyChoiceHeightmax = () => (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-20 bg-white" id="why">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-20">
        <span className="inline-block bg-gradient-to-r from-teal/10 to-deepblue/10 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-teal/20">
          Why Choose Us
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-deepblue mb-6 md:mb-8">
          Why Choose <span className="bg-gradient-to-r from-teal to-deepblue text-transparent bg-clip-text">Heightmax</span>?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
          Unlock your genetic potential with the most advanced, accessible and accurate growth analysis available today.
        </p>
      </div>

      {/* Key Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
        {[
          {
            icon: '⚡',
            title: 'Instant Results',
            desc: 'Get your personalized genetic growth analysis instantly - no lab visits, no waiting periods. Your full report is securely sent straight to your email inbox.',
            highlight: 'Under 10 minutes',
            color: 'from-yellow-400 to-orange-500'
          },
          {
            icon: '🎯',
            title: '95% Accuracy',
            desc: 'Built on advanced systems with millions of genetic data points for precise predictions.',
            highlight: 'Science-backed',
            color: 'from-blue-400 to-blue-600'
          },
          {
            icon: '💎',
            title: 'Affordable Access',
            desc: 'Professional-grade genetic analysis at a fraction of traditional testing costs.',
            highlight: 'From $4.99',
            color: 'from-green-400 to-emerald-600'
          },
          {
            icon: '🧬',
            title: 'Looksmax Optimized',
            desc: 'Specifically designed for teens and young adults maximizing their genetic potential.',
            highlight: 'Ages 12-25',
            color: 'from-purple-400 to-purple-600'
          },
        ].map((item, i) => (
          <div key={i} className="group relative">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:border-teal/30 transition-all duration-500 transform hover:-translate-y-2 h-full">
              {/* Gradient background accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

              {/* Icon with animated background */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-teal/10 to-deepblue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">{item.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-deepblue/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-deepblue">{item.title}</h3>

              {/* Enhanced highlight badge */}
              <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 text-teal px-4 py-2 rounded-full text-sm font-bold mb-4 border border-teal/20 inline-block">
                {item.highlight}
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>

              {/* Animated bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-deepblue rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        ))}
      </div>
      {/* Comparison Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-deepblue mb-4">How We Compare to Traditional Methods</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">See why thousands choose Heightmax over expensive and time-consuming alternatives</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* DNA Tests */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 border border-red-200 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Traditional
            </div>
            <div className="text-4xl mb-4">🧬</div>
            <h4 className="text-xl font-bold text-deepblue mb-4">DNA Tests</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-red-600">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                🕒 2–6 weeks

              </div>
              <div className="flex items-center text-sm text-red-600">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                💰 Up to $300

              </div>
              <div className="flex items-center text-sm text-red-600">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                📦 Lab kit + shipping required
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              ✅ <b>Heightmax</b> figures out your genetics through simple questions about your face, body and family traits, no DNA test needed. Optional photo upload for extra accuracy.
            </p>
          </div>

          {/* Medical Visits */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 border border-orange-200 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Expensive
            </div>
            <div className="text-4xl mb-4">🦴</div>
            <h4 className="text-xl font-bold text-deepblue mb-4">Growth Plate X-Ray + Endocrinologist</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-orange-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                🕒 1–2 weeks wait
              </div>
              <div className="flex items-center text-sm text-orange-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                💰 $500+ cost
              </div>
              <div className="flex items-center text-sm text-orange-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                🏥 In-person visit
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              ✅ <b>Heightmax</b> works like an endocrinologist, but smarter. It uses your genetic background and puberty signs to spot things X-rays can miss.
            </p>
          </div>

          {/* Heightmax */}
          <div className="bg-gradient-to-br from-teal-50 to-deepblue-50 rounded-3xl p-8 border-2 border-teal-200 relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* Best Choice Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-teal to-deepblue text-white px-3 py-1 rounded-full text-xs font-bold shadow">
              Best Choice
            </div>
            <div className="relative flex flex-col items-center">
              {/* Main Icon */}
              <div className="text-4xl mb-2">✨</div>
              {/* Title */}
              <h4 className="text-xl font-bold text-deepblue mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Heightmax
              </h4>
              {/* Features List */}
              <ul className="space-y-2 mb-6 w-full">
                <li className="flex items-center text-sm text-teal-700">
                  <span className="mr-2 text-lg">⚡</span>
                  Instant results — no waiting
                </li>
                <li className="flex items-center text-sm text-teal-700">
                  <span className="mr-2 text-lg">💲</span>
                  Free by sharing with 3 friends or just $4.99
                </li>
                <li className="flex items-center text-sm text-teal-700">
                  <span className="mr-2 text-lg">📩</span>
                  No labs, no appointments, no shipping
                </li>
                <li className="flex items-center text-sm text-teal-700">
                  <span className="mr-2 text-lg">🧬</span>
                  Uses simple questions about your growth, puberty, family, habits, and background
                </li>
                <li className="flex items-center text-sm text-teal-700">
                  <span className="mr-2 text-lg">🖼️</span>
                  Optional photo upload for even more accuracy
                </li>
                <li className="flex items-center text-sm text-teal-700">
                  <span className="mr-2 text-lg">📏</span>
                  Predicts your final height and puberty stage with high accuracy — no DNA test or doctor needed
                </li>
              </ul>
              {/* Real Examples */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-teal/20 mt-2 w-full">
                <div className="flex items-center mb-1">
                  <span className="text-lg text-teal-600 mr-2">📚</span>
                  <span className="text-xs font-bold text-teal">Real Examples</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 list-disc pl-5">
                  <li>
                    An endocrinologist might say "2 years left (according to the x-ray)," but your genetic growth pattern shows <span className="font-bold text-teal-700">3+ years</span>.
                  </li>
                  <li>
                    X-rays may look like you have 2+ years of growth left, but fast puberty signs mean only 6–12 months left. Heightmax catches this early and gives tips to extend growth.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Social Proof Section */}
      <TrustSocialProofSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Pricing */}
      <PricingSection />

    </div>
  </section >
);

export default WhyChoiceHeightmax; 