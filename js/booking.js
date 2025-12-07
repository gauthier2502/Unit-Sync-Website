// Booking page components

// Calendar widget
class CalendarWidget {
    constructor() {
        this.selectedDate = null;
        this.selectedTime = null;
        this.currentMonth = new Date();
        this.container = null;
        this.timeSlots = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
            '04:00 PM', '04:30 PM'
        ];
        this.init();
    }

    init() {
        this.container = document.getElementById('calendar-widget');
        if (!this.container) return;
        this.render();
    }

    getDaysInMonth(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    }

    isDateDisabled(day) {
        const { year, month } = this.getDaysInMonth(this.currentMonth);
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today || date.getDay() === 0 || date.getDay() === 6;
    }

    isDateSelected(day) {
        if (!this.selectedDate) return false;
        const { year, month } = this.getDaysInMonth(this.currentMonth);
        return (
            this.selectedDate.getDate() === day &&
            this.selectedDate.getMonth() === month &&
            this.selectedDate.getFullYear() === year
        );
    }

    handleDateClick(day) {
        if (this.isDateDisabled(day)) return;
        const { year, month } = this.getDaysInMonth(this.currentMonth);
        this.selectedDate = new Date(year, month, day);
        this.render();

        // Trigger event for booking form
        const event = new CustomEvent('dateSelected', { detail: { date: this.selectedDate } });
        document.dispatchEvent(event);
    }

    handleTimeClick(time) {
        this.selectedTime = time;
        this.render();

        // Trigger event for booking form
        const event = new CustomEvent('timeSelected', { detail: { time: this.selectedTime } });
        document.dispatchEvent(event);
    }

    previousMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
        this.render();
    }

    render() {
        const { daysInMonth, startingDayOfWeek, year, month } = this.getDaysInMonth(this.currentMonth);
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let daysHTML = '';

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            daysHTML += '<div class="aspect-square"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const disabled = this.isDateDisabled(day);
            const selected = this.isDateSelected(day);

            daysHTML += `
                <button
                    class="aspect-square rounded-lg text-sm font-medium transition-all
                        ${disabled
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-slate-700 hover:bg-blue-50 cursor-pointer'
                        }
                        ${selected
                            ? 'bg-[#2E5BFF] text-white hover:bg-blue-600'
                            : ''
                        }
                    "
                    onclick="calendar.handleDateClick(${day})"
                    ${disabled ? 'disabled' : ''}
                >
                    ${day}
                </button>
            `;
        }

        const timeSlotHTML = this.selectedDate ? `
            <div class="border-t border-slate-200 pt-6">
                <div class="flex items-center space-x-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#2E5BFF]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <h4 class="text-sm font-semibold text-slate-900">Select Time</h4>
                </div>
                <div class="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    ${this.timeSlots.map(time => `
                        <button
                            class="px-4 py-2 rounded-lg text-sm font-medium transition-all
                                ${this.selectedTime === time
                                    ? 'bg-[#2E5BFF] text-white'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                }
                            "
                            onclick="calendar.handleTimeClick('${time}')"
                        >
                            ${time}
                        </button>
                    `).join('')}
                </div>
            </div>
        ` : '';

        this.container.innerHTML = `
            <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-slate-900">
                            ${monthNames[month]} ${year}
                        </h3>
                        <div class="flex space-x-2">
                            <button
                                onclick="calendar.previousMonth()"
                                class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button
                                onclick="calendar.nextMonth()"
                                class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-7 gap-2 mb-2">
                        ${dayNames.map(name => `
                            <div class="text-center text-xs font-semibold text-slate-500 uppercase">
                                ${name}
                            </div>
                        `).join('')}
                    </div>

                    <div class="grid grid-cols-7 gap-2">
                        ${daysHTML}
                    </div>
                </div>

                ${timeSlotHTML}
            </div>
        `;
    }
}

// Booking Form
class BookingForm {
    constructor() {
        this.selectedDate = null;
        this.selectedTime = null;
        this.formData = {
            name: '',
            email: '',
            phone: '',
            organization: '',
            role: '',
            bedsCount: '',
            notes: ''
        };
        this.isSubmitting = false;
        this.submitStatus = 'idle';
        this.container = null;
        this.init();
    }

    init() {
        this.container = document.getElementById('booking-form');
        if (!this.container) return;

        // Listen for date and time selection
        document.addEventListener('dateSelected', (e) => {
            this.selectedDate = e.detail.date;
            this.render();
        });

        document.addEventListener('timeSelected', (e) => {
            this.selectedTime = e.detail.time;
            this.render();
        });

        this.render();
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.selectedDate || !this.selectedTime) {
            alert('Please select a date and time for your demo');
            return;
        }

        this.isSubmitting = true;
        this.render();

        try {
            // Submit to Supabase
            const { error } = await supabaseClient
                .from('demo_bookings')
                .insert([
                    {
                        name: this.formData.name,
                        email: this.formData.email,
                        phone: this.formData.phone,
                        organization: this.formData.organization,
                        role: this.formData.role,
                        beds_count: this.formData.bedsCount,
                        booking_date: this.selectedDate.toISOString().split('T')[0],
                        booking_time: this.selectedTime,
                        notes: this.formData.notes,
                        status: 'pending'
                    }
                ]);

            if (error) throw error;

            this.submitStatus = 'success';
            this.formData = {
                name: '',
                email: '',
                phone: '',
                organization: '',
                role: '',
                bedsCount: '',
                notes: ''
            };
        } catch (error) {
            console.error('Error submitting booking:', error);
            this.submitStatus = 'error';
        } finally {
            this.isSubmitting = false;
            this.render();
        }
    }

    render() {
        if (this.submitStatus === 'success') {
            this.container.innerHTML = `
                <div class="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                    <div class="text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                        </div>
                        <h3 class="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
                        <p class="text-slate-600 mb-6">
                            We've received your demo booking request. Our team will send you a confirmation email shortly.
                        </p>
                        <div class="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                            <p class="text-sm text-slate-600 mb-1">
                                <span class="font-semibold text-slate-900">Date:</span> ${this.selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p class="text-sm text-slate-600">
                                <span class="font-semibold text-slate-900">Time:</span> ${this.selectedTime}
                            </p>
                        </div>
                        <button onclick="bookingForm.submitStatus = 'idle'; bookingForm.render();" class="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 font-semibold py-2 px-4 rounded-lg border border-slate-200 transition-colors">
                            Book Another Demo
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        this.container.innerHTML = `
            <div class="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h3 class="text-2xl font-bold text-slate-900 mb-6">Your Details</h3>

                <form id="bookingFormElement" class="space-y-5">
                    <div>
                        <label for="name" class="block text-sm font-semibold text-slate-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
                            placeholder="Dr. Jane Smith"
                        />
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-semibold text-slate-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
                            placeholder="jane.smith@hospital.com"
                        />
                    </div>

                    <div>
                        <label for="phone" class="block text-sm font-semibold text-slate-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    <div>
                        <label for="organization" class="block text-sm font-semibold text-slate-700 mb-2">
                            Hospital / Organization *
                        </label>
                        <input
                            type="text"
                            id="organization"
                            name="organization"
                            required
                            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
                            placeholder="City General Hospital"
                        />
                    </div>

                    <div>
                        <label for="role" class="block text-sm font-semibold text-slate-700 mb-2">
                            Your Role *
                        </label>
                        <select
                            id="role"
                            name="role"
                            required
                            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
                        >
                            <option value="">Select your role</option>
                            <option value="Hospital Director">Hospital Director</option>
                            <option value="Chief Medical Officer">Chief Medical Officer</option>
                            <option value="Chief Information Officer">Chief Information Officer</option>
                            <option value="Department Head">Department Head</option>
                            <option value="IT Manager">IT Manager</option>
                            <option value="Operations Manager">Operations Manager</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label for="bedsCount" class="block text-sm font-semibold text-slate-700 mb-2">
                            Number of Beds *
                        </label>
                        <select
                            id="bedsCount"
                            name="bedsCount"
                            required
                            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all"
                        >
                            <option value="">Select bed count</option>
                            <option value="50-100">50-100 beds</option>
                            <option value="100-200">100-200 beds</option>
                            <option value="200-300">200-300 beds</option>
                            <option value="300-500">300-500 beds</option>
                            <option value="500+">500+ beds</option>
                        </select>
                    </div>

                    <div>
                        <label for="notes" class="block text-sm font-semibold text-slate-700 mb-2">
                            Special Requirements (Optional)
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows="4"
                            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF] focus:border-transparent transition-all resize-none"
                            placeholder="Any specific areas you'd like us to focus on during the demo?"
                        ></textarea>
                    </div>

                    ${this.submitStatus === 'error' ? `
                        <div class="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                            <p class="text-sm">Failed to submit booking. Please try again.</p>
                        </div>
                    ` : ''}

                    <button
                        type="submit"
                        ${this.isSubmitting || !this.selectedDate || !this.selectedTime ? 'disabled' : ''}
                        class="w-full inline-flex items-center justify-center bg-[#2E5BFF] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ${this.isSubmitting ? `
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                            Submitting...
                        ` : 'Confirm Booking'}
                    </button>

                    ${!this.selectedDate || !this.selectedTime ? `
                        <p class="text-sm text-slate-500 text-center">
                            Please select a date and time from the calendar
                        </p>
                    ` : ''}
                </form>
            </div>
        `;

        // Attach form submit handler
        const form = document.getElementById('bookingFormElement');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Update form data on input change
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    this.formData[e.target.name] = e.target.value;
                });
            });
        }
    }
}

// Initialize components
let calendar, bookingForm;
document.addEventListener('DOMContentLoaded', () => {
    calendar = new CalendarWidget();
    bookingForm = new BookingForm();
});
