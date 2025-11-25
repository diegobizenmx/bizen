-- Add age verification fields to profiles table
-- This enables age-based restrictions for forum users

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS birth_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_minor BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS parental_override BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS age_verified_at TIMESTAMP WITH TIME ZONE;

-- Create index for quick lookups of minor users
CREATE INDEX IF NOT EXISTS idx_profiles_is_minor ON profiles(is_minor) WHERE is_minor = true;

-- Create index for age verification status
CREATE INDEX IF NOT EXISTS idx_profiles_age_verified ON profiles(age_verified_at) WHERE age_verified_at IS NOT NULL;

-- Function to calculate if user is minor based on birth_date
CREATE OR REPLACE FUNCTION calculate_is_minor(birth_date_val TIMESTAMP WITH TIME ZONE)
RETURNS BOOLEAN AS $$
BEGIN
  IF birth_date_val IS NULL THEN
    RETURN false;
  END IF;
  
  -- Check if user is under 18 years old
  RETURN (EXTRACT(YEAR FROM AGE(birth_date_val)) < 18);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update existing profiles: if birth_date exists, calculate is_minor
UPDATE profiles 
SET is_minor = calculate_is_minor(birth_date)
WHERE birth_date IS NOT NULL;

-- Create trigger to automatically update is_minor when birth_date changes
CREATE OR REPLACE FUNCTION update_is_minor_on_birth_date_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.birth_date IS NOT NULL THEN
    NEW.is_minor := calculate_is_minor(NEW.birth_date);
    
    -- Auto-graduate users who turn 18 (set is_minor to false)
    IF NEW.is_minor = false AND OLD.is_minor = true THEN
      -- User just turned 18, remove restrictions
      NEW.parental_override := false; -- No longer needed
    END IF;
  ELSE
    NEW.is_minor := false;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_is_minor ON profiles;
CREATE TRIGGER trigger_update_is_minor
  BEFORE INSERT OR UPDATE OF birth_date ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_is_minor_on_birth_date_change();

-- Comment on columns
COMMENT ON COLUMN profiles.birth_date IS 'User birth date for age verification';
COMMENT ON COLUMN profiles.is_minor IS 'Cached flag: true if user is under 18 years old';
COMMENT ON COLUMN profiles.parental_override IS 'If true, parent/tutor has requested full access for minor';
COMMENT ON COLUMN profiles.age_verified_at IS 'Timestamp when user first verified their age';

