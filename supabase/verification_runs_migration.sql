-- Create verification_runs table to store user's verification history
CREATE TABLE IF NOT EXISTS public.verification_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Run metadata
    file_name TEXT NOT NULL,
    total_records INTEGER NOT NULL DEFAULT 0,
    successful_verifications INTEGER NOT NULL DEFAULT 0,
    failed_verifications INTEGER NOT NULL DEFAULT 0,
    credits_used INTEGER NOT NULL DEFAULT 0,

    -- Run data (stored as JSONB for flexibility)
    results JSONB NOT NULL DEFAULT '[]'::jsonb,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

    -- Indexes for better query performance
    CONSTRAINT verification_runs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_verification_runs_user_id ON public.verification_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_runs_created_at ON public.verification_runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_verification_runs_user_created ON public.verification_runs(user_id, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.verification_runs ENABLE ROW LEVEL SECURITY;

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
GRANT USAGE ON SEQUENCE verification_runs_id_seq TO authenticated;

-- Add comment for documentation
COMMENT ON TABLE public.verification_runs IS 'Stores historical ABN verification runs for users';
