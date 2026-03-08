import { supabase } from '../supabaseClient';

/**
 * Creates a Payment Intent on the backend (Supabase Edge Function)
 * @param {number} amount - The total amount in the smallest currency unit (e.g., cents for USD)
 * @returns {Promise<string>} - The client secret for the Payment Intent
 */
export const createPaymentIntent = async (amount) => {
    try {
        const { data, error } = await supabase.functions.invoke('stripe_payment', {
            body: {
                amount: Math.round(amount * 100), // Convert to cents
                currency: 'usd'
            }
        });

        if (error) throw error;

        return data.clientSecret;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};
