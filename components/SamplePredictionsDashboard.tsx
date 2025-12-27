import React from 'react';

const SamplePredictionsDashboard = () => (
  <section className="py-24 px-6 md:px-20 bg-gray-50" id="dashboard">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          Sample Report
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-deepblue mb-6">
          See Your <span className="text-teal">Potential</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Preview what your personalized genetic analysis report will reveal about your growth potential
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Genetic Height Growth Range */}
        <div className="group">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                <span className="text-2xl">📏</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-deepblue">Genetic Height Growth Range</h3>
                <p className="text-sm text-gray-600">Age: 16 | Current: 173cm (5'8")</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { height: '175cm (5\'9")', probability: 95, color: 'from-green-400 to-green-600' },
                { height: '178cm (5\'10")', probability: 65, color: 'from-teal to-teal-600' },
                { height: '180cm (5\'11")', probability: 20, color: 'from-blue-400 to-blue-600' },
                { height: '183cm (6\'0")', probability: 7, color: 'from-purple-400 to-purple-600' },
                { height: '185cm (6\'1")', probability: 5, color: 'from-orange-400 to-orange-600' },
                { height: '188cm (6\'2")', probability: 2, color: 'from-red-400 to-red-600' },
                { height: '190cm (6\'3+)', probability: 1, color: 'from-gray-400 to-gray-600' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.height}</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-600 w-8 text-right">{item.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optimized Height Growth Range */}
        <div className="group">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal to-deepblue rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-deepblue">Genetics + Optimized Height Growth Range</h3>
                <p className="text-sm text-gray-600">Age: 16 | Current: 173cm (5'8")</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { height: '175cm (5\'9")', probability: 100, color: 'from-green-400 to-green-600' },
                { height: '178cm (5\'10")', probability: 95, color: 'from-teal to-teal-600' },
                { height: '180cm (5\'11")', probability: 40, color: 'from-blue-400 to-blue-600' },
                { height: '183cm (6\'0")', probability: 10, color: 'from-purple-400 to-purple-600' },
                { height: '185cm (6\'1")', probability: 6, color: 'from-orange-400 to-orange-600' },
                { height: '188cm (6\'2")', probability: 2, color: 'from-red-400 to-red-600' },
                { height: '190cm (6\'3+)', probability: 1, color: 'from-gray-400 to-gray-600' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.height}</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-600 w-8 text-right">{item.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hormone Deployment */}
        <div className="group">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                <span className="text-2xl">🧪</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-deepblue">Hormone Deployment</h3>
                <p className="text-sm text-gray-600">Active development phase</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 rounded-xl p-3 border-l-4 border-teal">
                <p className="text-sm text-gray-700 font-medium">Shoulders will widen by 2–3 inches.</p>
              </div>
              <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 rounded-xl p-3 border-l-4 border-teal">
                <p className="text-sm text-gray-700 font-medium">Facial bones are thickening due to increased testosterone levels.</p>
              </div>
              <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 rounded-xl p-3 border-l-4 border-teal">
                <p className="text-sm text-gray-700 font-medium">Facial growth plates are beginning to slow down, reducing the rate of forward and width-based facial development.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Facial Maturity */}
        <div className="group">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                <span className="text-2xl">💀</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-deepblue">Facial Maturity</h3>
                <p className="text-sm text-gray-600">What you can expect:</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-teal mr-2 mt-1">•</span>
                <span className="text-sm text-gray-700">Jaw is beginning to widen</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal mr-2 mt-1">•</span>
                <span className="text-sm text-gray-700">Gonial angle will appear more defined</span>
              </div>
              <div className="flex items-start">
                <span className="text-teal mr-2 mt-1">•</span>
                <span className="text-sm text-gray-700">Cheekbones are expanding outward and becoming more prominent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Puberty Stage */}
        <div className="group lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                <span className="text-2xl">⏳</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-deepblue">Puberty Stage</h3>
                <p className="text-sm text-gray-600">Growth timeline assessment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 rounded-xl p-4 border-l-4 border-teal mb-4">
                  <p className="text-sm text-gray-700 font-medium">Approximately 10–24 months of puberty remaining</p>
                </div>
                <div className="bg-gradient-to-r from-teal/10 to-deepblue/10 rounded-xl p-4 border-l-4 border-teal">
                  <p className="text-sm text-gray-700 font-medium">Growth plates are 70% fused.</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-8 border-transparent border-t-teal border-r-deepblue flex items-center justify-center">
                      <span className="text-2xl font-bold text-deepblue">70%</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-teal border-r-deepblue" style={{ transform: 'rotate(252deg)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200 shadow-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-deepblue mb-6">Your Complete Analysis Includes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="font-semibold text-deepblue">Personalized Predictions</span>
              <span className="text-sm text-gray-600 mt-1">Tailored to your genetics</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">📈</span>
              </div>
              <span className="font-semibold text-deepblue">Puberty & Hormone Profile</span>
              <span className="text-sm text-gray-600 mt-1">Upcoming physical and hormonal changes</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <span className="font-semibold text-deepblue">Optimization Tips</span>
              <span className="text-sm text-gray-600 mt-1">Actionable recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SamplePredictionsDashboard; 