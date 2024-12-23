/*
  # Create groups table for random picker

  1. New Tables
    - `groups`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `inhibited` (boolean, default false)
      - `color` (text, for group color)
      - `emoji` (text, for group emoji)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `groups` table
    - Add policies for authenticated users to:
      - Read their own groups
      - Create new groups
      - Update their own groups
      - Delete their own groups
*/

CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  inhibited boolean DEFAULT false,
  color text NOT NULL,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own groups"
  ON groups
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create groups"
  ON groups
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own groups"
  ON groups
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own groups"
  ON groups
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);