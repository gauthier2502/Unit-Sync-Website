import React from 'react';
import { BookingCalendar } from '../components/BookingCalendar';
import { BookingForm } from '../components/BookingForm';

export const BookDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
            Book Your Demo
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Schedule a personalized demo to see how UnitSync can transform your hospital operations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <BookingCalendar
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
          />

          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      </div>
    </div>
  );
};
