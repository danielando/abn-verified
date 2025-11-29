import { Stripe } from "https://esm.sh/stripe@12.0.0?target=deno"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// @ts-ignore
Deno.serve(async (req) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // @ts-ignore
    const secretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is missing in Supabase Secrets.');
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const body = await req.json().catch(() => ({}));
    const { priceId, userId, mode, credits } = body;

    if (!priceId || !userId) {
      throw new Error('Missing priceId or userId in request body.');
    }

    console.log(`Creating session for User: ${userId}, Price: ${priceId}, Mode: ${mode}`);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode, // 'payment' or 'subscription'
      success_url: `${req.headers.get('origin') ?? 'http://localhost:5173'}?payment=success`,
      cancel_url: `${req.headers.get('origin') ?? 'http://localhost:5173'}?payment=cancelled`,
      metadata: {
        user_id: userId,
        credits_to_add: credits ? credits.toString() : '0'
      },
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error("Checkout Function Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})