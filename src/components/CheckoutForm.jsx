import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './CheckoutForm.css';

/**
 * Stripe Checkout Form using CardElement
 * CardElement is easier for simple integrations without a backend to manage client secrets.
 */
const CheckoutForm = ({ amount, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardError, setCardError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setCardError(null);

        const cardElement = elements.getElement(CardElement);

        // Normally, you would fetch a clientSecret from your backend here
        // const clientSecret = await createPaymentIntent(amount);
        // ... and then use it to confirm the payment.

        // For demonstration/testing, we'll mock the payment confirmation
        // If they don't have a backend yet, we use Stripe's test tokens logic.

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setCardError(error.message);
            setIsProcessing(false);
        } else {
            console.log('PaymentMethod created:', paymentMethod);
            // On a real backend, you'd send paymentMethod.id to your server and confirm
            // For now, we simulate success for the UI flow.
            setTimeout(() => {
                onPaymentSuccess();
                setIsProcessing(false);
            }, 1500);
        }
    };

    const cardStyle = {
        style: {
            base: {
                color: "#FFFFFF",
                fontFamily: 'Inter, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#A0AEC0"
                }
            },
            invalid: {
                color: "#FA755A",
                iconColor: "#FA755A"
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="stripe-checkout-form">
            <div className="card-element-wrapper">
                <CardElement options={cardStyle} />
            </div>
            {cardError && <div className="card-error-msg">{cardError}</div>}
            <button
                type="submit"
                className="btn-place-order"
                disabled={!stripe || isProcessing}
            >
                {isProcessing ? 'Processing...' : `PAY — $${amount.toFixed(2)}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
