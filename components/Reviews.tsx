import React from 'react';

const Reviews = () => (
    < section className="py-24 px-6 md:px-20 bg-gray-50" id="reviews" >
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <span className="inline-block bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Customer Reviews
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-deepblue mb-6">
                    What Our <span className="text-teal">Users Say</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Real stories from teens and young adults who discovered their true growth potential
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review 1 */}
                <div className="group">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 text-xl mb-2">
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-deepblue mb-2">Gave me a lot of relief</h3>
                        <p className="text-sm text-gray-500 mb-4">By Jerome P.</p>

                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p className="text-sm">
                                I'm 16 and 5'2, and honestly, I've lost all hope about my height. I barely grown over the past 3 years and this year I havent grown at all. Mean while most of my friends kept growing taller. My dad is 5'8" and my older brother is 5'10", so I was starting to think I just got unlucky.
                            </p>
                            <p className="text-sm">
                                I found Heightmax from tiktok and decided to try it and it actually made a lot of sense. It showed that people with my background who are Ghanaian, Akan often grow early in puberty, slow down for a while, then get a second big growth spurt around 18 or 19. That's exactly what happened to my brother and even my dad, and I never really noticed the pattern until now.
                            </p>
                            <p className="text-sm">
                                The crazy part is how accurate it predicted how I would later grow just like my dad and brother. It made me answer a bunch of questions about my past growth and compared it with data from people like me. Now I know I'm probably not done growing. This gave me a lot of hope and relief, and I actually know how to take care of myself during this stage to maximize whatever height I have left.
                            </p>
                            <p className="text-sm font-medium text-teal">
                                If you're in the same situation and feel stuck, I definitely recommend this. It's way better than guessing or stressing out for nothing.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Review 2 */}
                <div className="group">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 text-xl mb-2">
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-deepblue mb-2">Super helpful 10/10</h3>
                        <p className="text-sm text-gray-500 mb-4">By Kenji L.</p>

                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p className="text-sm">
                                I always think if I am done growing since I am 19 and everyone tells me to stop growing taller at 16. I used to think growth plates just closed overnight but apparently they turn out they close gradually over time within months.
                            </p>
                            <p className="text-sm">
                                The analysis said my genetic background's growth plates close during the ages 19 and 21 which makes sense for me since I am 19. I didn't know that before. Right now my growth plates 80% fused at 5'11 so there is a chance i can grow more than 6 feet.
                            </p>
                            <p className="text-sm font-medium text-teal">
                                I started following their advice to keep my growth plates opening as long as possible. Super helpful if you ever wonder how much you are going to grow and motivates you to grow taller. Worth it for $1.99
                            </p>
                        </div>
                    </div>
                </div>

                {/* Review 3 */}
                <div className="group">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 text-xl mb-2">
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                                <span>⭐️</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-deepblue mb-2">Good prediction thanks</h3>
                        <p className="text-sm text-gray-500 mb-4">By Ryan C.</p>

                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p className="text-sm">
                                My parents are short and my sister is 5'4 and shes done growing so I dont know if I would grow tall. The review said most brothers grow about 6 inches taller than their sister's height, and predicted I'll likely hit 5'10" with a 75% chance.
                            </p>
                            <p className="text-sm font-medium text-teal">
                                Super helpful and straight to the point.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 text-center">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <h3 className="text-2xl font-bold text-deepblue mb-6">Join Thousands of Satisfied Users</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-teal mb-2">10K+</div>
                            <div className="text-gray-600">Users Analyzed</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-teal mb-2">95%</div>
                            <div className="text-gray-600">Accuracy Rate</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-teal mb-2">4.9/5</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section >
)

export default Reviews;

