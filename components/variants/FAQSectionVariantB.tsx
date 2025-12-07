import React, { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long does implementation take?',
    answer: 'Most hospitals are up and running within 2-4 weeks. Our team handles all technical integration with your existing EHR systems, and we provide comprehensive training for your staff.',
  },
  {
    question: 'Is UnitSync HIPAA compliant?',
    answer: 'Yes, absolutely. UnitSync is fully HIPAA compliant with end-to-end encryption, comprehensive audit trails, and regular security audits. We also maintain SOC 2 Type II certification.',
  },
  {
    question: 'What systems does UnitSync integrate with?',
    answer: 'We integrate with all major EHR systems including Epic, Cerner, Allscripts, and MEDITECH. Our API is flexible and can connect with virtually any healthcare system.',
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer 24/7 technical support, a dedicated account manager, regular check-ins, and ongoing training for new staff. Our support team has an average response time of under 2 hours.',
  },
  {
    question: 'Can we customize the dashboard for our needs?',
    answer: 'Yes! UnitSync is highly configurable. You can customize dashboards, KPIs, alerts, and workflows to match your specific operational needs and preferences.',
  },
  {
    question: 'What is the pricing model?',
    answer: 'We offer flexible pricing based on hospital size and needs. Contact us for a customized quote. Most hospitals see ROI within the first 6 months of implementation.',
  },
];

export const FAQSectionVariantB: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Common questions answered
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about UnitSync
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-500 text-white rotate-180' : 'bg-slate-100 text-slate-600'}`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6">
              Our team is here to help. Schedule a call with one of our experts.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
