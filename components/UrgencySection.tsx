import React from 'react';

const UrgencySection = () => (
  <section className="py-16 bg-deepblue">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Your height, face, and frame only develop during puberty. Once puberty ends, there's no going back.
        </h2>
        <p className="text-xl text-teal font-semibold">
          Every second you wait, you lose potential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Box 1: What Being Short Can Cost You */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-teal-200 hover:border-teal-300 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-teal to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">📉</span>
            </div>
            <h3 className="text-2xl font-bold text-deepblue mb-2">What Being Short Can Cost You:</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">🔻</span>
              <div>
                <span className="font-semibold text-gray-800">Fewer matches</span>
                <p className="text-gray-600 text-sm">Short men get up to 40% fewer likes on dating apps</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">🧠</span>
              <div>
                <span className="font-semibold text-gray-800">Less respect</span>
                <p className="text-gray-600 text-sm">People subconsciously link height with confidence and authority</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">💸</span>
              <div>
                <span className="font-semibold text-gray-800">Lower income</span>
                <p className="text-gray-600 text-sm">Each extra inch = ~$600 more per year (on average)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">🚪</span>
              <div>
                <span className="font-semibold text-gray-800">Fewer leadership roles</span>
                <p className="text-gray-600 text-sm">Most CEOs are above 5'10"</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">😓</span>
              <div>
                <span className="font-semibold text-gray-800">More insecurity</span>
                <p className="text-gray-600 text-sm">Shorter guys report higher rates of social anxiety and low self-esteem</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">⏳</span>
              <div>
                <span className="font-semibold text-gray-800">Lost growth window</span>
                <p className="text-gray-600 text-sm">Once puberty ends, your height stops increasing — there's no way to go back and improve it.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: What Being Ugly Can Cost You */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-deepblue-200 hover:border-deepblue-300 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-deepblue to-deepblue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">📉</span>
            </div>
            <h3 className="text-2xl font-bold text-deepblue mb-2">What Being Ugly Can Cost You:</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-deepblue text-lg">💔</span>
              <div>
                <span className="font-semibold text-gray-800">Fewer matches</span>
                <p className="text-gray-600 text-sm">Attractive men get up to 11× more matches on dating apps (Tinder Study, 2020)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-deepblue text-lg">🧠</span>
              <div>
                <span className="font-semibold text-gray-800">Unfair judgment</span>
                <p className="text-gray-600 text-sm">People rate attractive faces as more intelligent and trustworthy, even with identical resumes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-deepblue text-lg">💸</span>
              <div>
                <span className="font-semibold text-gray-800">Lower income</span>
                <p className="text-gray-600 text-sm">Each 1-point increase in facial attractiveness (on a 10-point scale) can raise earnings by 5–10%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-deepblue text-lg">🧍‍♂️</span>
              <div>
                <span className="font-semibold text-gray-800">Less influence</span>
                <p className="text-gray-600 text-sm">Symmetry, jawline strength, and facial width are linked to greater dominance and leadership appeal</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-deepblue text-lg">😞</span>
              <div>
                <span className="font-semibold text-gray-800">More insecurity</span>
                <p className="text-gray-600 text-sm">Facial dissatisfaction is linked to lower self-esteem and higher social anxiety (Psych Journal, 2019)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-deepblue text-lg">⏳</span>
              <div>
                <span className="font-semibold text-gray-800">Lost growth window</span>
                <p className="text-gray-600 text-sm">Your jaw, cheekbones, and facial frame stop developing after puberty — and can't be naturally changed after</p>
              </div>
            </div>
          </div>
        </div>

        {/* Box 3: What a Weak or Undeveloped Frame Can Cost You */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-teal-200 hover:border-teal-300 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-teal to-deepblue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">📉</span>
            </div>
            <h3 className="text-2xl font-bold text-deepblue mb-2">What a Weak or Undeveloped Frame Can Cost You:</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">💔</span>
              <div>
                <span className="font-semibold text-gray-800">Fewer matches</span>
                <p className="text-gray-600 text-sm">Broad shoulders and strong posture are highly rated traits; narrow frames reduce perceived masculinity and dominance</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">🧠</span>
              <div>
                <span className="font-semibold text-gray-800">Less respect</span>
                <p className="text-gray-600 text-sm">People associate a wider, upright frame with confidence and authority — poor posture or a small frame often signals the opposite</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">💪</span>
              <div>
                <span className="font-semibold text-gray-800">Lower physical appeal</span>
                <p className="text-gray-600 text-sm">A weak shoulder-to-waist ratio lowers perceived attractiveness and fitness, especially in shirtless or gym photos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">🧍‍♂️</span>
              <div>
                <span className="font-semibold text-gray-800">Limited aesthetics</span>
                <p className="text-gray-600 text-sm">Narrow clavicles and a small ribcage reduce V-taper and make it harder to build an impressive physique</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">😞</span>
              <div>
                <span className="font-semibold text-gray-800">More insecurity</span>
                <p className="text-gray-600 text-sm">Men with narrow or recessed frames are more likely to report low body confidence and posture-related self-esteem issues</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-teal text-lg">⏳</span>
              <div>
                <span className="font-semibold text-gray-800">Lost growth window</span>
                <p className="text-gray-600 text-sm">Your frame (shoulders, ribcage, posture) only develops during puberty — after that, it's fixed for life</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-teal to-deepblue text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">These all can be maximized during your puberty where most changes are happening</h3>
          <p className="text-xl">
            Your height, face, and frame can only be fully developed during puberty — the stage when the most critical growth and changes occur.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default UrgencySection; 