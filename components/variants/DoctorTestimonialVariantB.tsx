import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "UnitSync has revolutionized how we manage patient flow. We've reduced ER wait times by 40% and our staff burnout has decreased significantly. It's the most impactful technology we've implemented in the last decade.",
    author: "Dr. James Wilson",
    role: "Chief of Emergency Medicine",
    hospital: "Metropolitan General Hospital",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1964&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "The predictive analytics are incredible. We can now anticipate patient surges 6-8 hours in advance and adjust staffing accordingly. This has been a game-changer for our operations team.",
    author: "Dr. Sarah Chen",
    role: "Director of Operations",
    hospital: "Mercy Regional Medical Center",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1964&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "Implementation was seamless and the ROI was clear within the first quarter. UnitSync integrates perfectly with our existing systems and the support team is outstanding.",
    author: "Dr. Marcus Reynolds",
    role: "Chief Information Officer",
    hospital: "St. Mary's Hospital",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
    rating: 5,
  },
];

export const DoctorTestimonialVariantB: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Trusted by healthcare leaders nationwide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how hospitals are transforming their operations with UnitSync
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <Quote className="w-10 h-10 text-blue-500 mb-4 opacity-50" />

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 flex-1 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                  <div className="text-xs text-slate-500">{testimonial.hospital}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-slate-600">
            <div className="flex -space-x-2">
              {testimonials.map((t, i) => (
                <img
                  key={i}
                  src={t.image}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm font-medium">
              Join <span className="font-bold text-slate-900">50+ hospitals</span> already using UnitSync
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
