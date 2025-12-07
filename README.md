# UnitSync - Hospital Intelligence Platform

A modern, AI-powered hospital management platform landing page built with React, TypeScript, and Supabase. UnitSync helps healthcare administrators optimize patient flow, resource utilization, and staffing through intelligent predictions and real-time insights.

## Overview

UnitSync is a comprehensive hospital intelligence solution that provides:
- **Predictive patient inflow forecasting** to prepare for volume surges
- **Real-time resource utilization tracking** for beds and equipment
- **Live triage queue management** with multi-patient transfer capabilities
- **Automated staffing plans** with 24/7 coverage optimization
- **AI-powered assistant** for instant support and guidance
- **A/B testing framework** for optimizing user experience and conversions

## Features

### Core Features
- **Predictive Inflow**: AI-generated summaries explaining major patient volume surges with detailed performance charts
- **Resource Utilization**: Monthly breakdowns of bed occupancy and equipment usage with capacity forecasting
- **Live Triage Queue**: Real-time patient status updates with bulk transfer management
- **Staffing Plans**: Automated shift scheduling for residents, attendings, and nurses with recurring patterns

### Technical Features
- A/B testing with two landing page variants
- Demo booking system with Supabase integration
- Interactive data visualizations using Recharts
- Responsive design with mobile-first approach
- AI-powered chat assistant using Google Gemini
- TypeScript for type safety
- Modern component architecture

## Technologies Used

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization library
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend as a Service (Database, Auth, Storage)
- **PostgreSQL** - Relational database (via Supabase)


## Prerequisites

Before running this project, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Supabase account** (already configured)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Note: The current `.env` file is already configured with the Supabase credentials.

## Database Setup

The project uses Supabase for data persistence. The database includes:

### Tables
- **demo_bookings**: Stores demo booking requests from the landing page

### Migrations
Database schema is managed through Supabase migrations located in:
```
supabase/migrations/
```

The existing migration creates the `demo_bookings` table with proper Row Level Security (RLS) policies.

## Running the Application

### Development Mode
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
Build the application for production:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
project/
├── components/           # React components
│   ├── variants/        # A/B testing variant components
│   ├── Assistant.tsx    # AI chat assistant
│   ├── BookingForm.tsx  # Demo booking form
│   ├── Calendar.tsx     # Date picker component
│   ├── FeaturesGrid.tsx # Main features showcase
│   ├── Navbar.tsx       # Navigation bar
│   └── ...
├── pages/               # Page components
│   ├── VariantA.tsx     # Landing page variant A
│   ├── VariantB.tsx     # Landing page variant B
│   ├── BookDemo.tsx     # Demo booking page router
│   └── ...
├── contexts/            # React contexts
│   └── ABTestContext.tsx # A/B testing logic
├── hooks/               # Custom React hooks
│   ├── useFAQ.ts
│   └── useToggle.ts
├── services/            # External service integrations
│   ├── ai/              # AI service clients
│   └── geminiService.ts # Google Gemini integration
├── types/               # TypeScript type definitions
├── config/              # Configuration files
├── lib/                 # Utility libraries
│   └── supabase.ts      # Supabase client
├── supabase/            # Supabase migrations
│   └── migrations/
├── public/              # Static assets
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── vite.config.ts       # Vite configuration
```

## Key Components

### A/B Testing
The application implements A/B testing with two variants:
- **Variant A**: Original landing page design
- **Variant B**: Alternative design with different hero section, features presentation, and testimonials

Users are randomly assigned to a variant, and the choice is persisted in localStorage.

### Demo Booking System
- Users can book product demos through an interactive calendar interface
- Booking data is stored in Supabase
- Form validation and error handling included

### AI Assistant
- Powered by Google Gemini AI
- Provides contextual help about UnitSync features
- Real-time chat interface with streaming responses

### Data Visualizations
- Interactive charts using Recharts library
- Area charts for patient inflow trends
- Bar charts for resource utilization
- Donut charts for staffing distribution

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key (public) |

## Build and Deployment

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory and can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Features Breakdown

### 1. Predictive Inflow
Visualizes patient volume trends with AI-generated surge detection and peak predictions. Helps administrators prepare for high-demand periods.

### 2. Resource Utilization
Tracks ICU beds and operating room usage across departments. Provides capacity forecasts to optimize resource allocation.

### 3. Live Triage Queue
Displays real-time patient status with severity levels (Critical, Urgent, Standard). Enables bulk patient transfers and status updates.

### 4. Staffing Plans
Shows staff distribution across roles (Nurses, Residents, On Call). Features auto-fill capabilities for 24/7 coverage optimization.

## Development Notes

- The application uses modern React patterns including hooks and context
- TypeScript provides type safety throughout the codebase
- Components follow a modular, reusable architecture
- Supabase handles all backend operations (no custom server needed)
- The design emphasizes clean, professional aesthetics suitable for healthcare

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and intended for educational purposes.

## Contact

For questions or support regarding this project, please contact the development team.
