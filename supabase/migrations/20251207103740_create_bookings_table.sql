/*
  # Create Bookings Table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `full_name` (text) - Full name of the person booking
      - `email` (text) - Email address for confirmation
      - `phone` (text) - Contact phone number
      - `organization` (text) - Hospital or organization name
      - `role` (text) - Job title or role
      - `notes` (text, nullable) - Additional notes or requirements
      - `booking_date` (timestamptz) - Date of the scheduled demo
      - `booking_time` (text) - Time slot for the demo
      - `status` (text) - Booking status (pending, confirmed, cancelled)
      - `created_at` (timestamptz) - Timestamp when booking was created
      - `updated_at` (timestamptz) - Timestamp when booking was last updated

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for public to insert bookings (demo bookings)
    - Add policy for authenticated admins to read all bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization text NOT NULL,
  role text NOT NULL,
  notes text DEFAULT '',
  booking_date timestamptz NOT NULL,
  booking_time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_bookings_booking_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
