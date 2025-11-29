-- Create verification_runs table to store user's verification history
-- This version is safe to run multiple times

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.verification_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,

    -- Run metadata
    file_name TEXT NOT NULL,
    total_records INTEGER NOT NULL DEFAULT 0,
    successful_verifications INTEGER NOT NULL DEFAULT 0,
    failed_verifications INTEGER NOT NULL DEFAULT 0,
    credits_used INTEGER NOT NULL DEFAULT 0,

    -- Run data (stored as JSONB for flexibility)
    results JSONB NOT NULL DEFAULT '[]'::jsonb,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add foreign key constraint only if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'verification_runs_user_id_fkey'
    ) THEN
        ALTER TABLE public.verification_runs
        ADD CONSTRAINT verification_runs_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Create indexes for efficient queries (IF NOT EXISTS handles duplicates)
CREATE INDEX IF NOT EXISTS idx_verification_runs_user_id ON public.verification_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_runs_created_at ON public.verification_runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_verification_runs_user_created ON public.verification_runs(user_id, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.verification_runs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view their own verification runs" ON public.verification_runs;
DROP POLICY IF EXISTS "Users can insert their own verification runs" ON public.verification_runs;
DROP POLICY IF EXISTS "Users can delete their own verification runs" ON public.verification_runs;

-- RLS Policies: Users can only see their own verification runs
CREATE POLICY "Users can view their own verification runs"
    ON public.verification_runs
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verification runs"
    ON public.verification_runs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own verification runs"
    ON public.verification_runs
    FOR DELETE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT, INSERT, DELETE ON public.verification_runs TO authenticated;

-- Add comment for documentation
COMMENT ON TABLE public.verification_runs IS 'Stores historical ABN verification runs for users';
