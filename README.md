# UnitSync - Hospital Intelligence Platform

A modern, enterprise-grade landing page and demo booking system for hospital operations management software. Built with React, TypeScript, and Supabase.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [A/B Testing](#ab-testing)
- [AI Assistant](#ai-assistant)
- [Key Design Decisions](#key-design-decisions)

## Project Overview

UnitSync is a marketing website and demo booking platform for a hospital operations intelligence system. The project demonstrates modern web development practices, including:

- Clean architecture with separation of concerns
- A/B testing for marketing optimization
- AI-powered customer service assistant
- Database integration for lead capture
- Responsive design with premium UI/UX

**Target Audience:** Hospital administrators, department heads, and healthcare IT decision-makers.

## Features

### Core Functionality
- **Marketing Landing Pages** - Two A/B tested variants with different messaging and layouts
- **Demo Booking System** - Integrated form with validation and database persistence
- **AI Assistant** - Gemini-powered chatbot for answering product questions
- **Interactive FAQ** - Collapsible FAQ section with smooth animations
- **Testimonials & Case Studies** - Social proof elements to build trust
- **Responsive Design** - Mobile-first approach with breakpoints for all devices

### A/B Testing Features
- **Variant A** - Traditional hero section with direct call-to-action
- **Variant B** - Enhanced version with expanded security documentation dropdown
- Context-based routing for testing different user experiences
- **Toggle component** for easy switching between variants (development mode)

## Technology Stack

### Frontend
- **React 19.2.0** - UI library with hooks and functional components
- **TypeScript** - Type-safe development
- **React Router DOM 7.10.1** - Client-side routing
- **Vite 6.2.0** - Fast build tool and dev server
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization (dashboard mockups)

### Backend & Services
- **Supabase** - Backend-as-a-Service for database and authentication
- **Google Gemini AI** - Natural language processing for chatbot
- **PostgreSQL** - Relational database (via Supabase)

### Development Tools
- **Node.js** - Runtime environment
- **npm** - Package management
- **ESLint** - Code linting (via Vite)

## Architecture

The project follows clean architecture principles with clear separation of concerns:

```
├── components/          # React components
│   ├── variants/       # A/B test variant components
│   └── [shared]        # Reusable UI components
├── config/             # Configuration management
│   ├── content.ts      # Content constants (FAQ, testimonials)
│   └── ai.ts           # AI service configuration
├── contexts/           # React Context providers
│   └── ABTestContext   # A/B testing state management
├── hooks/              # Custom React hooks
│   ├── useFAQ.ts       # FAQ state management
│   └── useToggle.ts    # Toggle state management
├── pages/              # Page-level components
│   ├── VariantA.tsx    # Landing page variant A
│   ├── VariantB.tsx    # Landing page variant B
│   └── BookDemo*.tsx   # Demo booking pages
├── services/           # Business logic & API clients
│   └── ai/             # AI service layer
│       ├── GeminiClient.ts  # Gemini API client class
│       └── index.ts    # Service exports
├── types/              # TypeScript type definitions
│   ├── navigation.ts   # Navigation types
│   ├── content.ts      # Content types
│   └── chat.ts         # Chat/AI types
└── supabase/           # Database migrations
    └── migrations/     # SQL migration files
```

### Design Patterns Used
- **Singleton Pattern** - Single GeminiClient instance for AI service
- **Context Pattern** - A/B testing state management
- **Custom Hooks Pattern** - Reusable stateful logic (useFAQ, useToggle)
- **Service Layer Pattern** - Business logic separation from UI components
- **Configuration Pattern** - Centralized configuration management

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database features)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   API_KEY=your_gemini_api_key
   ```

4. **Run database migrations**

   Migrations are automatically applied through Supabase. The schema includes:
   - `demo_bookings` table for storing demo requests

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

6. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

### Component Organization

**Shared Components**
- `Button.tsx` - Reusable button component with size variants
- `Navbar.tsx` - Header navigation with mobile menu
- `Assistant.tsx` - AI chatbot widget
- `BookingForm.tsx` - Demo booking form with validation
- `Calendar.tsx` - Date picker for appointments
- `FAQSection.tsx` - Collapsible FAQ display

**Page Components**
- `VariantA.tsx` - Landing page with standard layout
- `VariantB.tsx` - Landing page with enhanced security section
- `BookDemoVariantA.tsx` - Booking page for variant A traffic
- `BookDemoVariantB.tsx` - Booking page for variant B traffic

### Custom Hooks

**`useFAQ(initialOpenIndex)`**
- Manages FAQ accordion state
- Provides toggle functionality
- Returns current open index and helper functions

**`useToggle(initialValue)`**
- Generic boolean state management
- Provides toggle, open, close functions
- Used for modals, dropdowns, and expandable sections

### Service Layer

**`GeminiClient`**
```typescript
class GeminiClient {
  public isConfigured(): boolean
  public async sendMessage(history, message): Promise<string>
}
```
- Singleton pattern for API efficiency
- Error handling with user-friendly messages
- Configuration validation

## Database Schema

### `demo_bookings` Table

Stores demo booking requests with the following structure:

```sql
CREATE TABLE demo_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  role TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  message TEXT,
  variant TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Row Level Security (RLS)**
- Enabled for data protection
- Public insert policy for form submissions
- Authenticated read policy for admin access

**Indexes**
- Primary key on `id`
- Index on `email` for lookup performance
- Index on `created_at` for reporting queries

## A/B Testing

The application implements A/B testing to optimize conversion rates:

### Variant A (Control)
- Traditional hero section
- Direct download link for technical documentation
- Standard testimonial layout

### Variant B (Treatment)
- Enhanced hero messaging
- Interactive security documentation dropdown
- Expanded FAQ with 3-minute overview

### Implementation
```typescript
// Context-based variant management
<ABTestProvider>
  <Routes>
    <Route path="/" element={<VariantA />} />
    <Route path="/b" element={<VariantB />} />
  </Routes>
</ABTestProvider>
```

### Tracking
- Variant information stored with each booking
- Enables conversion rate analysis
- Easy to extend with analytics integration

## AI Assistant

### Features
- Real-time chat interface
- Context-aware responses
- Product knowledge base
- Professional tone matching brand voice

### Configuration
Located in `config/ai.ts`:
```typescript
{
  model: 'gemini-2.5-flash',
  systemInstruction: '...',
  fallbackMessage: '...',
  errorMessage: '...'
}
```

### Error Handling
- Graceful degradation when API unavailable
- User-friendly error messages
- No sensitive information exposure

## Key Design Decisions

### 1. Clean Architecture
**Why:** Separation of concerns improves maintainability and testability
- Components focus on presentation
- Hooks handle state management
- Services manage business logic
- Types ensure type safety

### 2. Supabase for Backend
**Why:** Rapid development without sacrificing security
- Built-in authentication and authorization
- Real-time capabilities for future features
- Automatic API generation
- Row Level Security for data protection

### 3. TypeScript Throughout
**Why:** Type safety prevents runtime errors
- Catch errors during development
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring

### 4. Custom Hooks Pattern
**Why:** Reusable logic without component duplication
- `useFAQ` used in both FAQ variants
- `useToggle` for all boolean states
- Easier to test in isolation
- Consistent behavior across components

### 5. Configuration Management
**Why:** Single source of truth for constants
- Easy to update content
- Reduces duplication
- Enables content management workflow
- Simplifies internationalization later

### 6. Service Layer for AI
**Why:** Abstraction allows easy provider switching
- `GeminiClient` class encapsulates API details
- Could swap to OpenAI or Claude with minimal changes
- Centralized error handling
- Easy to mock for testing

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

1. **Analytics Integration** - Google Analytics or Mixpanel for A/B test tracking
2. **Email Notifications** - Send confirmation emails after booking
3. **Admin Dashboard** - View and manage demo requests
4. **Calendar Integration** - Sync with Google Calendar or Outlook
5. **Multi-language Support** - Internationalization for global markets
6. **Performance Optimization** - Code splitting and lazy loading
7. **Advanced AI Features** - Document upload and analysis
8. **User Authentication** - Allow users to track their demo request status

## License

Proprietary - All rights reserved

## Contact

For questions or support, please contact the development team.

---

**Built with modern web technologies for optimal performance and user experience.**
