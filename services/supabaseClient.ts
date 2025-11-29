
import { createClient } from '@supabase/supabase-js';

// Load from environment variables for security
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables. Check .env.local file.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Calls the Supabase Edge Function to generate a Stripe Checkout URL
 */
export const createCheckoutSession = async (
    priceId: string, 
    userId: string, 
    mode: 'subscription' | 'payment',
    credits: number
) => {
    try {
        const { data, error } = await supabase.functions.invoke('create-checkout', {
            body: { priceId, userId, mode, credits }
        });

        if (error) {
            // Supabase client error (e.g. network) or function returned 4xx/5xx
            // Try to parse the body if it exists to get the real error message
            let errorMessage = error.message;
            if (error instanceof Error && 'context' in error) {
                 // @ts-ignore
                 const body = await error.context?.json().catch(() => null);
                 if (body && body.error) {
                     errorMessage = body.error;
                 }
            }
            console.error("Edge Function Error:", errorMessage);
            return { url: null, error: errorMessage };
        }

        return { url: data?.url, error: null };
    } catch (err: any) {
        return { url: null, error: err.message || "Unknown error occurred" };
    }
};
