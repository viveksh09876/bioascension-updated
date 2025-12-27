import React, { useState } from 'react';

const faqs = [
    {
        question: 'How accurate is your height prediction?',
        answer: 'Our predictions are based on a combination of genetic patterns, growth data and AI modeling. While nothing is 100% precise, our system typically provides a highly accurate range of 95%, especially if you\'re still in puberty (ages 12–25).'
    },
    {
        question: 'Why not just get a DNA test and an X-ray of my growth plates instead?',
        answer: 'DNA tests take 2–6 weeks and can cost up to $300. A growth plate X-ray and height prediction from an endocrinologist can run over $500. We deliver both insights with 95% accuracy instantly by analyzing hundreds of millions of data points.'
    },
    {
        question: 'What data do you use to make predictions?',
        answer: 'We analyze your age, sex, current height, growth history, parental heights and facial structure to model your growth trajectory. Your genetic background is also factored in to predict your height and development with top-tier accuracy.'
    },
    {
        question: 'Can I still grow if my parents are short?',
        answer: 'Yes. While genetics play a large role, some individuals surpass their parents due to skipped-generation traits or optimized puberty environments.'
    },
    {
        question: 'Does late puberty mean I\'ll grow more?',
        answer: 'Often, yes. Late bloomers tend to grow later and sometimes for longer. It can be a good sign if you\'re still developing at 16–17.'
    },
    {
        question: 'How long do I have left in puberty?',
        answer: 'It varies. Most males finish puberty between 17–20. Our tool estimates your remaining puberty time based on your current stage.'
    },
    {
        question: 'How do I know if my growth plates are still open?',
        answer: 'Our systems estimate this based on your growth history, puberty markers and genetic background.'
    },
    {
        question: 'What\'s the best age to use this tool for accurate predictions?',
        answer: 'Ages 12–20 are ideal. The earlier you start, the more actionable insight you\'ll get to influence your growth potential.'
    },
    {
        question: 'How does your system work?',
        answer: 'Our systems compare your input data against hundreds of millions of known growth trajectories and genetic trends to predict height and facial maturity.'
    },
    {
        question: 'How do you predict my growth plates % open and % closed?',
        answer: 'Heightmax looks at your age, growth rate, puberty stage, hormone signs (like acne, voice changes, or facial structure) and family trends. It then compares this data to millions of others with similar genetic profiles to estimate the percentage your growth plates are likely still open or closing with 95% accuracy, all without an X-ray.'
    },
    {
        question: 'How do I know if my growth plates are closed?',
        answer: "Heightmax analyzes your growth history, puberty stage and genetic background to estimate this for you. In general, growth plates may be closing if you haven't grown in the past 6–12 months, but some people naturally pause or slow in growth and start again later, especially at younger ages 16-19 for boys."
    },
    {
        question: 'How fast will I get my results?',
        answer: 'All results are instantly sent to the Gmail address you provided on the submission page.'
    },
    {
        question: 'What does "50% facial maturity" mean?',
        answer: 'It means you\'re halfway through your facial bone development. Expect more changes in jaw width, cheekbone prominence and overall facial definition.'
    }
];

export default function FAQ () {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <section className="py-24 px-6 md:px-20 bg-gray-50" id="faq">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        FAQ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-deepblue mb-6">
                        Frequently Asked <span className="text-teal">Questions</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Everything you need to know about our genetic analysis, accuracy, and how to maximize your growth potential
                    </p>
                </div>

                <div className="space-y-8">
                    {/* General Questions */}
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-deepblue mb-2">💬 General Questions</h3>
                            <p className="text-gray-600">Essential information about our service</p>
                        </div>
                        {faqs.slice(0, 3).map((faq, idx) => (
                            <div key={idx} className="group">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300">
                                    <button
                                        className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-deepblue font-semibold text-lg hover:bg-gray-50 transition-all duration-300"
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        aria-expanded={openFaq === idx}
                                        aria-controls={`faq-answer-${idx}`}
                                    >
                                        <span className="flex items-center">
                                            <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                                                <span className="text-teal font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                                            </span>
                                            {faq.question}
                                        </span>
                                        <div className={`ml-4 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === idx ? 'rotate-180 bg-teal text-white' : 'group-hover:bg-gray-200'}`}>
                                            <span className="text-sm">▼</span>
                                        </div>
                                    </button>
                                    <div
                                        id={`faq-answer-${idx}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-8 pb-6">
                                            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-teal">
                                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Genetics & Puberty */}
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-deepblue mb-2">🧬 Genetics & Puberty</h3>
                            <p className="text-gray-600">Understanding your growth potential and development timeline</p>
                        </div>
                        {faqs.slice(3, 8).map((faq, idx) => (
                            <div key={idx + 3} className="group">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300">
                                    <button
                                        className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-deepblue font-semibold text-lg hover:bg-gray-50 transition-all duration-300"
                                        onClick={() => setOpenFaq(openFaq === idx + 3 ? null : idx + 3)}
                                        aria-expanded={openFaq === idx + 3}
                                        aria-controls={`faq-answer-${idx + 3}`}
                                    >
                                        <span className="flex items-center">
                                            <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                                                <span className="text-teal font-bold text-sm">{String(idx + 4).padStart(2, '0')}</span>
                                            </span>
                                            {faq.question}
                                        </span>
                                        <div className={`ml-4 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === idx + 3 ? 'rotate-180 bg-teal text-white' : 'group-hover:bg-gray-200'}`}>
                                            <span className="text-sm">▼</span>
                                        </div>
                                    </button>
                                    <div
                                        id={`faq-answer-${idx + 3}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx + 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-8 pb-6">
                                            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-teal">
                                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BioAscension Systems Questions */}
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-deepblue mb-2">💻 Heightmax Systems Questions</h3>
                            <p className="text-gray-600">How our technology works and protects your data</p>
                        </div>
                        {faqs.slice(8, 12).map((faq, idx) => (
                            <div key={idx + 8} className="group">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300">
                                    <button
                                        className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-deepblue font-semibold text-lg hover:bg-gray-50 transition-all duration-300"
                                        onClick={() => setOpenFaq(openFaq === idx + 8 ? null : idx + 8)}
                                        aria-expanded={openFaq === idx + 8}
                                        aria-controls={`faq-answer-${idx + 8}`}
                                    >
                                        <span className="flex items-center">
                                            <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                                                <span className="text-teal font-bold text-sm">{String(idx + 9).padStart(2, '0')}</span>
                                            </span>
                                            {faq.question}
                                        </span>
                                        <div className={`ml-4 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === idx + 8 ? 'rotate-180 bg-teal text-white' : 'group-hover:bg-gray-200'}`}>
                                            <span className="text-sm">▼</span>
                                        </div>
                                    </button>
                                    <div
                                        id={`faq-answer-${idx + 8}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx + 8 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-8 pb-6">
                                            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-teal">
                                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Safety & Data Protection */}
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-deepblue mb-2">⚠️ Safety & Data Protection</h3>
                            <p className="text-gray-600">We take your privacy and personal information very seriously, in full compliance with legal standards and Stripe's strict security protocols.</p>
                        </div>
                        {[
                            {
                                question: 'Do you sell my data?',
                                answer: 'Absolutely not. We never sell or share your data in any form.'
                            },
                            {
                                question: 'Is my card information secure?',
                                answer: 'Yes. Your card details are fully protected and cannot be accessed or leaked. Payments are processed through Stripe.com, a leading encrypted third-party payment platform. We never see or store your card information.'
                            }
                        ].map((faq, idx) => (
                            <div key={idx + 12} className="group">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300">
                                    <button
                                        className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-deepblue font-semibold text-lg hover:bg-gray-50 transition-all duration-300"
                                        onClick={() => setOpenFaq(openFaq === idx + 12 ? null : idx + 12)}
                                        aria-expanded={openFaq === idx + 12}
                                        aria-controls={`faq-answer-${idx + 12}`}
                                    >
                                        <span className="flex items-center">
                                            <span className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal/20 transition-colors duration-300">
                                                <span className="text-teal font-bold text-sm">{String(idx + 13).padStart(2, '0')}</span>
                                            </span>
                                            {faq.question}
                                        </span>
                                        <div className={`ml-4 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === idx + 12 ? 'rotate-180 bg-teal text-white' : 'group-hover:bg-gray-200'}`}>
                                            <span className="text-sm">▼</span>
                                        </div>
                                    </button>
                                    <div
                                        id={`faq-answer-${idx + 12}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx + 12 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-8 pb-6">
                                            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-teal">
                                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional help section */}
                <div className="mt-16 text-center" id="contact">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <h3 className="text-2xl font-bold text-deepblue mb-4">Still have questions?</h3>
                        <a
                            href="mailto:sales@heightmax.ai"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal to-deepblue text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold"
                        >
                            <span className="mr-2">📧</span>
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

