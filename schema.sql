-- Drop existing triggers and functions if tables exist
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
        DROP TRIGGER IF EXISTS update_users_updated_at ON "users";
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'surveys') THEN
        DROP TRIGGER IF EXISTS update_surveys_updated_at ON "surveys";
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'groups') THEN
        DROP TRIGGER IF EXISTS update_groups_updated_at ON "groups";
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'locations') THEN
        DROP TRIGGER IF EXISTS update_locations_updated_at ON "locations";
    END IF;
END $$;

DROP FUNCTION IF EXISTS update_updated_at();

-- Drop existing tables if they exist
DROP TABLE IF EXISTS "survey_locations" CASCADE;
DROP TABLE IF EXISTS "survey_groups" CASCADE;
DROP TABLE IF EXISTS "survey_users" CASCADE;
DROP TABLE IF EXISTS "responses" CASCADE;
DROP TABLE IF EXISTS "questions" CASCADE;
DROP TABLE IF EXISTS "surveys" CASCADE;
DROP TABLE IF EXISTS "locations" CASCADE;
DROP TABLE IF EXISTS "groups" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Drop existing types
DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "QuestionType" CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Role enum type
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- Create QuestionType enum type
CREATE TYPE "QuestionType" AS ENUM ('NPS_EMOJI', 'NPS_STAR', 'NPS_NUMBER', 'DRIVER', 'OPEN_ENDED');

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "role" "Role" DEFAULT 'USER'
);

-- Create surveys table
CREATE TABLE IF NOT EXISTS "surveys" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "is_active" BOOLEAN DEFAULT true
);

-- Create questions table
CREATE TABLE IF NOT EXISTS "questions" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "survey_id" UUID NOT NULL REFERENCES "surveys"("id"),
  "type" "QuestionType" NOT NULL,
  "text" TEXT NOT NULL,
  "required" BOOLEAN DEFAULT true,
  "order" INTEGER NOT NULL,
  "options" JSONB,
  "logic_rules" JSONB
);

-- Create responses table
CREATE TABLE IF NOT EXISTS "responses" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "question_id" UUID NOT NULL REFERENCES "questions"("id"),
  "user_id" UUID NOT NULL REFERENCES "users"("id"),
  "value" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create groups table
CREATE TABLE IF NOT EXISTS "groups" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create locations table
CREATE TABLE IF NOT EXISTS "locations" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create junction table for surveys and users
CREATE TABLE IF NOT EXISTS "survey_users" (
  "survey_id" UUID NOT NULL REFERENCES "surveys"("id") ON DELETE CASCADE,
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  PRIMARY KEY ("survey_id", "user_id")
);

-- Create junction table for surveys and groups
CREATE TABLE IF NOT EXISTS "survey_groups" (
  "group_id" UUID NOT NULL REFERENCES "groups"("id") ON DELETE CASCADE,
  "survey_id" UUID NOT NULL REFERENCES "surveys"("id") ON DELETE CASCADE,
  PRIMARY KEY ("group_id", "survey_id")
);

-- Create junction table for surveys and locations
CREATE TABLE IF NOT EXISTS "survey_locations" (
  "location_id" UUID NOT NULL REFERENCES "locations"("id") ON DELETE CASCADE,
  "survey_id" UUID NOT NULL REFERENCES "surveys"("id") ON DELETE CASCADE,
  PRIMARY KEY ("location_id", "survey_id")
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "questions_survey_id_idx" ON "questions"("survey_id");
CREATE INDEX IF NOT EXISTS "responses_question_id_idx" ON "responses"("question_id");
CREATE INDEX IF NOT EXISTS "responses_user_id_idx" ON "responses"("user_id");
CREATE INDEX IF NOT EXISTS "survey_users_user_id_idx" ON "survey_users"("user_id");
CREATE INDEX IF NOT EXISTS "survey_groups_survey_id_idx" ON "survey_groups"("survey_id");
CREATE INDEX IF NOT EXISTS "survey_locations_survey_id_idx" ON "survey_locations"("survey_id");

-- Add RLS policies
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "surveys" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "questions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "responses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "locations" ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own data" ON "users"
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON "users"
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data" ON "users"
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Surveys policies
CREATE POLICY "Users can read surveys they have access to" ON "surveys"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "survey_users"
      WHERE "user_id" = auth.uid() AND "survey_id" = id
    )
  );

-- Questions policies
CREATE POLICY "Users can read questions from their surveys" ON "questions"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "surveys"
      JOIN "survey_users" ON "survey_users"."survey_id" = surveys.id
      WHERE "survey_users"."user_id" = auth.uid()
      AND surveys.id = "survey_id"
    )
  );

-- Responses policies
CREATE POLICY "Users can read their own responses" ON "responses"
  FOR SELECT
  USING ("user_id" = auth.uid());

CREATE POLICY "Users can insert their own responses" ON "responses"
  FOR INSERT
  WITH CHECK ("user_id" = auth.uid());

-- Add triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON "users"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_surveys_updated_at
  BEFORE UPDATE ON "surveys"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON "groups"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON "locations"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
