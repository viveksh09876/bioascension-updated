import React from 'react';

const PricingSection = () => (
  <section className="py-24 px-6 md:px-20 bg-white" id="pricing">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          Pricing Plans
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-deepblue mb-6">
          Simple, Cheap & <span className="text-teal">Effective</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Take action during puberty - discover and unlock your full potential for just $4.99
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto justify-center">
        <div className="flex-1 relative group">
          <div className="bg-gradient-to-br from-teal/10 to-white rounded-3xl shadow-2xl p-10 flex flex-col border-2 border-teal/30 hover:border-teal hover:shadow-3xl transition-all duration-300 h-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-teal">Invite 3 Friends</h3>
              <div className="text-5xl font-extrabold mb-2 text-teal">FREE</div>
              <p className="text-gray-500">Get your report for free</p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-4 mb-6">
              <p className="text-yellow-800 text-sm">Share your referral link. Once 3 friends complete and submit the quiz, you'll receive:</p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Genetic only height prediction analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Instant email delivery</span>
              </li>
            </ul>
            <a href="/quiz" className="w-full bg-white text-teal border-2 border-teal py-4 rounded-2xl shadow-lg hover:bg-teal-600 hover:shadow-xl font-bold text-lg transition-all duration-300 group-hover:scale-105 block text-center">
              Get Started
            </a>
          </div>
        </div>
        <div className="flex-1 relative group">
          <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col border-2 border-gray-200 hover:border-teal hover:shadow-3xl transition-all duration-300 h-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-deepblue">Essential Report</h3>
              <div className="text-5xl font-extrabold mb-2 text-deepblue">$4.99</div>
              <p className="text-gray-500">One-time payment</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-4 mb-6">
              <p className="text-blue-800 text-sm font-semibold mb-1">Want your results now?</p>
              <p className="text-blue-800 text-sm">Pay a one-time fee of $4.99 to receive:</p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Genetic-only height prediction</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Genetic + Optimized height prediction</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Current puberty stage</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Growth timeline projections</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Growth plate fusion analysis (% open vs. % closed)</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Facial maturity timeline</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Predicted development of facial and body structure</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Simple tips to maximize your height and development</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-3 mt-1">✓</span>
                <span className="text-gray-700">Instant email delivery</span>
              </li>
            </ul>
            <a href="/quiz" className="w-full bg-teal text-white py-4 rounded-2xl shadow-lg hover:bg-teal-600 hover:shadow-xl font-bold text-lg transition-all duration-300 group-hover:scale-105 block text-center">
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-deepblue mb-6">Trusted & Secure</h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center mr-3">
                <svg className="w-8 h-4" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M59.5759 13.5587C59.5759 12.8176 59.5759 12.0765 59.5759 11.3354C59.5759 10.5943 59.5759 9.85317 59.5759 9.11206C59.5759 8.37095 59.5759 7.62984 59.5759 6.88873C59.5759 6.14762 59.5759 5.40651 59.5759 4.6654C59.5759 3.92429 59.5759 3.18318 59.5759 2.44207C59.5759 1.70096 59.5759 0.959854 59.5759 0.218746H0.424072C0.424072 0.959854 0.424072 1.70096 0.424072 2.44207C0.424072 3.18318 0.424072 3.92429 0.424072 4.6654C0.424072 5.40651 0.424072 6.14762 0.424072 6.88873C0.424072 7.62984 0.424072 8.37095 0.424072 9.11206C0.424072 9.85317 0.424072 10.5943 0.424072 11.3354C0.424072 12.0765 0.424072 12.8176 0.424072 13.5587H59.5759Z" fill="#6772E5" />
                  <path d="M26.3158 9.11206C26.3158 8.37095 26.3158 7.62984 26.3158 6.88873C26.3158 6.14762 26.3158 5.40651 26.3158 4.6654C26.3158 3.92429 26.3158 3.18318 26.3158 2.44207C26.3158 1.70096 26.3158 0.959854 26.3158 0.218746H33.6842C33.6842 0.959854 33.6842 1.70096 33.6842 2.44207C33.6842 3.18318 33.6842 3.92429 33.6842 4.6654C33.6842 5.40651 33.6842 6.14762 33.6842 6.88873C33.6842 7.62984 33.6842 8.37095 33.6842 9.11206H26.3158Z" fill="white" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-deepblue">Stripe</div>
                <div className="text-sm text-gray-600">Secure payments</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-deepblue">SSL Encrypted</div>
                <div className="text-sm text-gray-600">Bank-level security</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-deepblue">Instant Delivery</div>
                <div className="text-sm text-gray-600">Results in minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection; 