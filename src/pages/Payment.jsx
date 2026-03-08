import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { saveAddress } from '../services/addressService';
import { createOrder, addOrderItem } from '../services/orderService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import './Payment.css';

// Replace with your public key from Stripe Dashboard (pk_test_...)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_sample');

// Product-specific Stripe Payment Links
const STRIPE_LINKS = {
    'R-001': 'https://buy.stripe.com/test_14A14p2MvaG55EK4Jb6Vq02', // Jardin de Claude, Thailand
};

const Payment = () => {
    const { cartItems, subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    // Find the specialty product in the cart and get its Stripe link
    const specialtyItem = cartItems.find(item =>
        item.id === 'R-001' ||
        item.name?.toLowerCase().includes('jardin de claude')
    );
    const hasSpecialtyProduct = !!specialtyItem;
    const stripePaymentLink = specialtyItem ? STRIPE_LINKS[specialtyItem.id] : null;

    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Worldwide'
    });

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleShippingSubmit = async (e) => {
        e.preventDefault();

        // Save address to Supabase
        const addressData = {
            full_name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            street_address: form.address,
            city: form.city,
            postal_code: form.postalCode,
            country: form.country,
            is_default: true
        };

        try {
            console.log('Saving address:', addressData);
            await saveAddress(addressData);
            setStep(2);
        } catch (error) {
            console.error('Error saving address:', error);
            alert('Error saving address. Please try again.');
        }
    };

    const handlePaymentLinkClick = () => {
        // Clear cart and redirect to product-specific Stripe checkout
        clearCart();
        window.location.href = stripePaymentLink || 'https://buy.stripe.com/test_14A14p2MvaG55EK4Jb6Vq02';
    };

    const handlePaymentSuccess = () => {
        setStep(3);
        setTimeout(() => {
            clearCart();
        }, 500);
    };


    if (step === 3) {
        return (
            <div className="payment-success-container">
                <div className="success-content">
                    <div className="success-icon">✓</div>
                    <p className="success-label">ORDER CONFIRMED</p>
                    <h1 className="success-title">Your harvest is on its way</h1>
                    <p className="success-msg">Order #OE-{Math.floor(Math.random() * 100000)} has been placed successfully.</p>
                    <button onClick={() => navigate('/')} className="btn-success-home">BACK TO HOME</button>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-page">
            <div className="checkout-container">
                <div className="checkout-form-side">
                    <div className="checkout-steps">
                        <span className={step >= 1 ? 'active' : ''}>SHIPPING</span>
                        <div className="step-line"></div>
                        <span className={step >= 2 ? 'active' : ''}>PAYMENT</span>
                    </div>

                    {step === 1 ? (
                        <div className="shipping-section animate-in">
                            <h2 className="section-title">Shipping Information</h2>
                            <form onSubmit={handleShippingSubmit}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" required placeholder="name@example.com" value={form.email} onChange={handleInputChange} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" name="firstName" required value={form.firstName} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" required value={form.lastName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Shipping Address</label>
                                    <input type="text" name="address" required value={form.address} onChange={handleInputChange} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input type="text" name="city" required value={form.city} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Postal Code</label>
                                        <input type="text" name="postalCode" required value={form.postalCode} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <button type="submit" className="btn-continue">CONTINUE TO PAYMENT</button>
                            </form>
                        </div>
                    ) : (
                        <div className="payment-section animate-in">
                            <h2 className="section-title">Secure Payment</h2>

                            {hasSpecialtyProduct ? (
                                <div className="payment-link-section">
                                    <p className="payment-instruction">
                                        Click below to complete your payment securely via Stripe Checkout.
                                    </p>
                                    <button
                                        onClick={handlePaymentLinkClick}
                                        className="btn-place-order"
                                    >
                                        PROCEED TO STRIPE — ₹1,230.06
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="payment-instruction">Enter your card details securely below to complete your order.</p>

                                    {/* STRIPE ELEMENTS WRAPPER */}
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            amount={subtotal}
                                            onPaymentSuccess={handlePaymentSuccess}
                                        />
                                    </Elements>
                                </>
                            )}

                            <button type="button" onClick={() => setStep(1)} className="btn-back">
                                ← Back to shipping
                            </button>
                        </div>
                    )}
                </div>

                <div className="checkout-summary-side">
                    <div className="order-review">
                        <h3>Order Review</h3>
                        <div className="review-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="review-item">
                                    <div className="review-item-img">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="review-item-info">
                                        <p className="name">{item.name}</p>
                                        <p className="qty">Qty: {item.quantity}</p>
                                        <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="review-totals">
                            <div className="row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="row">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="divider"></div>
                            <div className="row grand-total">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;

