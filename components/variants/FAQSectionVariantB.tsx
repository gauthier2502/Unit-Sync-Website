import React, { useState } from 'react';
import { Plus, Minus, ChevronDown, ChevronUp, FileDown, Shield, Link2, Lock } from 'lucide-react';
import { Button } from '../Button';

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
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

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

        <div className="mt-16">
          <div className="border border-blue-200 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full flex items-center justify-between p-8 text-left hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    See Security & Integration Overview
                  </h3>
                  <p className="text-sm text-slate-600">3-min read</p>
                </div>
              </div>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center transition-transform duration-300 ${showTechnicalDetails ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5 text-white" />
              </div>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out ${
                showTechnicalDetails ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-8 pb-8 bg-white">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-start p-6 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <Lock className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Enterprise Security</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      HIPAA compliant with end-to-end encryption, SOC 2 Type II certified, and regular third-party security audits. Full data sovereignty and on-premise options available.
                    </p>
                  </div>

                  <div className="flex flex-col items-start p-6 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Link2 className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Seamless Integration</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      RESTful API connects with Epic, Cerner, Allscripts, MEDITECH and more. HL7 FHIR compliant. No disruption to existing workflows. Implementation in 2-4 weeks.
                    </p>
                  </div>

                  <div className="flex flex-col items-start p-6 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Compliance & Auditing</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Comprehensive audit trails, role-based access control, and automated compliance reporting. Meets all healthcare regulatory requirements including GDPR.
                    </p>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-slate-200">
                  <p className="text-slate-600 mb-6">
                    Need the complete technical documentation?
                  </p>
                  <a
                    href="/UnitSync-Technical-Information.pdf"
                    download
                    className="inline-block"
                  >
                    <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800">
                      <FileDown className="w-5 h-5 mr-2" />
                      Download Full Technical PDF
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
