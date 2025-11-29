import { Stripe } from "https://esm.sh/stripe@12.0.0?target=deno"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0"

// @ts-ignore
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

// @ts-ignore
Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')

  try {
    const body = await req.text()
    // @ts-ignore
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!webhookSecret) {
        throw new Error("Missing STRIPE_WEBHOOK_SECRET");
    }

    // 1. Verify Event Signature
    let event;
    try {
        event = await stripe.webhooks.constructEventAsync(
            body,
            signature!,
            webhookSecret,
            undefined,
            cryptoProvider
        )
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // 2. Handle Event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      const userId = session.metadata?.user_id
      const creditsToAdd = Number(session.metadata?.credits_to_add || 0)

      console.log(`Processing Order: User ${userId}, Credits: ${creditsToAdd}`);

      if (userId && creditsToAdd > 0) {
        // Initialize Admin Supabase Client
        const supabase = createClient(
          // @ts-ignore
          Deno.env.get('SUPABASE_URL') ?? '',
          // @ts-ignore
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 3. Fulfill Order (Add Credits using secure RPC function)
        const { error: rpcError } = await supabase.rpc('add_credits_with_log', {
          user_id: userId,
          amount: creditsToAdd,
          description: `Stripe Payment: ${session.id}`
        })

        if (rpcError) {
            console.error("Error adding credits via RPC:", rpcError);

            // Fallback: Direct update if RPC doesn't exist yet
            const { data: profile } = await supabase
              .from('profiles')
              .select('credits_balance')
              .eq('id', userId)
              .single()

            const newBalance = (profile?.credits_balance || 0) + creditsToAdd

            const { error: updateError } = await supabase
              .from('profiles')
              .update({ credits_balance: newBalance })
              .eq('id', userId)

            if (updateError) {
                console.error("Error updating balance (fallback):", updateError);
                throw updateError;
            }
            console.log(`Credits added via fallback. New Balance: ${newBalance}`);
        } else {
            console.log(`Successfully added ${creditsToAdd} credits to user ${userId} via RPC`);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})