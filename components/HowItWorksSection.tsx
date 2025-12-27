import React from 'react';

const HowItWorksSection = ({ hideCta = false }: { hideCta?: boolean }) => (
  <section className="py-24 px-6 md:px-20 bg-white" id="how">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          Our Process
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-deepblue mb-6">
          How It <span className="text-teal">Works</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our system analyzes your quiz responses using a scientifically backed process to reveal your growth and development potential
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            icon: '📝',
            title: 'Complete the Quiz',
            desc: "Heightmax asks simple questions about your growth, puberty, family, traits, habits and genetic background. You can also upload a photo to boost accuracy. It uses your quiz answers and a photo if you want to add one, to find out how your body is likely to grow. Then it gives you a super accurate prediction of your final height, development stage and how your body and face is likely to grow. No DNA test or doctor needed.",
            time: '⏱️ Takes under 10 minutes',
            step: '01'
          },
          {
            icon: '📊',
            title: 'Millions of data points',
            desc: 'Our system analyzes your growth pattern, rate and family tree using millions of data points. By comparing trends from your relatives and similar genetic lineages, we predict your final height with top-tier accuracy.',
            time: '⚙️ Accurate Growth Projection',
            step: '02'
          },
          {
            icon: '⚡',
            title: 'Get Your Personalized Report',
            desc: ' Receive your detailed growth and height prediction report directly in your gmail inbox, along with tips to help you stay in your growth window longer and reach your full potential.',
            time: '📩 Instant Delivery',
            step: '03'
          },
        ].map((item, i) => (
          <div key={i} className="relative group">
            {i < 2 && (
              <div className="hidden md:block absolute top-20 left-full w-8 h-0.5 bg-gray-300 z-0">
                <div className="h-full bg-gradient-to-r from-teal to-deepblue rounded-full"></div>
              </div>
            )}
            <div className="relative z-10 bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl hover:border-teal/30 transition-all duration-300 h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-teal to-deepblue rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {item.step}
              </div>
              <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal/20 transition-colors duration-300">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-deepblue">{item.title}</h3>
              <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4 border border-gray-200">
                {item.time}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-teal to-deepblue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>
      {!hideCta && (
        <div className="text-center mt-16">
          <a
            href="/quiz"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal to-deepblue text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg font-bold"
          >
            Start Your Analysis
            <span className="ml-2">→</span>
          </a>
        </div>
      )}
    </div>
  </section>
);

export default HowItWorksSection; 