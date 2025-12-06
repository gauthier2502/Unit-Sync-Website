import React from 'react';
import { Button } from '../components/Button';
import { HeroVariantB } from '../components/variants/HeroVariantB';
import { FeaturesGridVariantB } from '../components/variants/FeaturesGridVariantB';
import { DoctorTestimonialVariantB } from '../components/variants/DoctorTestimonialVariantB';
import { FAQSectionVariantB } from '../components/variants/FAQSectionVariantB';
import { HowItWorks } from '../components/HowItWorks';
import { CaseStudy } from '../components/CaseStudy';
import { Assistant } from '../components/Assistant';
import { ABTestToggle } from '../components/ABTestToggle';
import { NAV_ITEMS } from '../constants';
import { Menu, Activity, Twitter, Linkedin, Mail, MapPin, Wifi, ArrowRight } from 'lucide-react';

export const VariantB: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white selection:bg-[#2E5BFF] selection:text-white">

      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-8 h-8 bg-[#2E5BFF] rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">UnitSync</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="text-slate-600 hover:text-[#2E5BFF] font-medium transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button size="sm" className="hidden md:inline-flex">Get a Demo</Button>
              <button
                className="md:hidden text-slate-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 absolute w-full shadow-xl animate-in slide-in-from-top-2 duration-200">
             <nav className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-600 font-medium py-2 hover:text-[#2E5BFF]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="w-full">Get a Demo</Button>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-20">

        <HeroVariantB />

        <section className="border-y border-slate-100 bg-slate-50/50 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Seamlessly integrates with</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-2xl font-bold font-serif text-slate-800">EPIC</div>
              <div className="text-2xl font-bold font-sans italic text-slate-800">Cerner</div>
              <div className="text-2xl font-bold font-mono text-slate-800">Allscripts</div>
              <div className="text-2xl font-bold font-sans text-slate-800 tracking-tighter">MEDITECH</div>
            </div>
          </div>
        </section>

        <div id="features" className="scroll-mt-28">
          <FeaturesGridVariantB />
        </div>

        <HowItWorks />

        <div id="testimonials" className="scroll-mt-28">
          <DoctorTestimonialVariantB />
        </div>

        <CaseStudy />

        <div id="faq" className="scroll-mt-28">
          <FAQSectionVariantB />
        </div>

        <section className="py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
           <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">

              <div className="inline-flex items-center space-x-2 bg-white border border-blue-200 rounded-full px-4 py-1.5 mb-8 shadow-lg">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                 </span>
                 <span className="text-sm font-semibold text-blue-700">Limited Time Offer</span>
                 <Wifi className="w-4 h-4 text-blue-600" />
              </div>

              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight leading-[1.1]">
                Transform your hospital today
              </h2>

              <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto font-medium">
                Join <span className="text-slate-900 font-bold">50+ hospitals</span> already improving patient care with UnitSync
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl shadow-blue-500/30 w-full sm:w-auto px-8 py-4 h-auto text-lg">
                  Get started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white border-2 border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-blue-500 w-full sm:w-auto px-8 py-4 h-auto text-lg shadow-sm">
                  Schedule Demo
                </Button>
              </div>
           </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                 <Activity className="w-6 h-6 text-[#2E5BFF]" />
                 <span className="text-white text-xl font-bold">UnitSync</span>
              </div>
              <p className="max-w-xs text-sm">Empowering hospitals with intelligence to save lives and resources.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2"/> support@unitsync.com</li>
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2"/> 12 Ave Marceau, Paris</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-4 md:mb-0">
              &copy; 2024 UnitSync. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>

      <Assistant />
      <ABTestToggle />

    </div>
  );
};
