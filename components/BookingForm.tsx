import React from 'react';
import { Building2, User, Mail, Phone, Briefcase, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '../services/supabase';

interface BookingFormProps {
  selectedDate: Date | null;
  selectedTime: string | null;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  notes: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedDate, selectedTime }) => {
  const [formData, setFormData] = React.useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setSubmitStatus('error');
      setErrorMessage('Please select a date and time');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('bookings').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          role: formData.role,
          notes: formData.notes,
          booking_date: selectedDate.toISOString(),
          booking_time: selectedTime,
          status: 'pending',
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        notes: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">
        Your Details
      </h3>

      {selectedDate && selectedTime && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm font-semibold text-[#2E5BFF] mb-1">Selected Appointment</p>
          <p className="text-sm text-slate-700">
            {formatDate(selectedDate)} at {selectedTime}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
            <User className="w-4 h-4 inline mr-1.5 text-slate-500" />
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
            placeholder="Dr. Jane Smith"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1.5 text-slate-500" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
            placeholder="jane.smith@hospital.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1.5 text-slate-500" />
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-slate-700 mb-2">
            <Building2 className="w-4 h-4 inline mr-1.5 text-slate-500" />
            Hospital / Organization *
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            required
            value={formData.organization}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
            placeholder="City General Hospital"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
            <Briefcase className="w-4 h-4 inline mr-1.5 text-slate-500" />
            Role / Title *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
            placeholder="Chief Medical Officer"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-1.5 text-slate-500" />
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your specific needs or questions..."
          />
        </div>

        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900">Booking Confirmed!</p>
              <p className="text-sm text-green-700 mt-1">
                We'll send you a confirmation email shortly with meeting details.
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Booking Failed</p>
              <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !selectedDate || !selectedTime}
        >
          {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
        </Button>

        {(!selectedDate || !selectedTime) && (
          <p className="text-xs text-slate-500 text-center">
            Please select a date and time to continue
          </p>
        )}
      </form>
    </div>
  );
};
