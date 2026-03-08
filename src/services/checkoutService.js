import { supabase } from '../supabaseClient';

/**
 * Creates a Stripe Checkout Session via Supabase Edge Function.
 * Returns a Stripe-hosted checkout URL with success/cancel URLs built in.
 */
export const createCheckoutSession = async (items, address) => {
    const siteUrl = window.location.origin; // e.g. http://localhost:5173 or https://yourapp.onrender.com

    const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { items, address, siteUrl },
    });

    if (error) throw new Error(error.message);
    if (!data?.url) throw new Error('No checkout URL returned from Stripe.');

    return data; // { url, sessionId }
};
