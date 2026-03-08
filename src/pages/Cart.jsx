import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createCheckoutSession } from '../services/checkoutService';
import './Cart.css';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
    const [step, setStep] = useState('cart'); // 'cart' | 'address'
    const [saving, setSaving] = useState(false);

    const [address, setAddress] = useState({
        fullName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleProceedToAddress = () => {
        setStep('address');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleConfirmAndPay = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Save cart + address snapshot to localStorage (used on /success to save to Supabase)
            const pendingOrder = {
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    varietal: item.varietal,
                    country: item.country,
                })),
                subtotal,
                address,
                createdAt: new Date().toISOString(),
            };
            localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));

            // Call Supabase Edge Function → get a Stripe Checkout URL
            const { url } = await createCheckoutSession(pendingOrder.items, address);

            // Clear cart and off to Stripe (success_url already set server-side)
            clearCart();
            window.location.href = url;
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Could not start checkout. Please try again.');
            setSaving(false);
        }
    };

    /* ─── Empty cart ─── */
    if (cartItems.length === 0 && step !== 'address') {
        return (
            <div className="cart-empty-container">
                <div className="cart-empty-content">
                    <p className="cart-label">YOUR CART</p>
                    <h1 className="cart-title">Your selection is empty</h1>
                    <p className="cart-empty-msg">Select a premium estate harvest to begin your journey.</p>
                    <Link to="/allocation" className="btn-return">VIEW ALLOCATIONS</Link>
                </div>
            </div>
        );
    }

    /* ─── Address Step ─── */
    if (step === 'address') {
        return (
            <div className="payment-page">
                <div className="checkout-container">
                    {/* Address form */}
                    <div className="checkout-form-side">
                        <div className="checkout-steps">
                            <span className="active">DETAILS</span>
                            <div className="step-line"></div>
                            <span>STRIPE CHECKOUT</span>
                        </div>

                        <div className="shipping-section animate-in">
                            <h2 className="section-title">Shipping Details</h2>
                            <p className="payment-instruction">
                                We need your delivery address before redirecting you to Stripe to complete payment.
                            </p>
                            <form onSubmit={handleConfirmAndPay}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input name="fullName" type="text" required
                                        placeholder="John Doe"
                                        value={address.fullName}
                                        onChange={handleAddressChange} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input name="email" type="email" required
                                            placeholder="name@example.com"
                                            value={address.email}
                                            onChange={handleAddressChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input name="phone" type="tel"
                                            placeholder="+91 98765 43210"
                                            value={address.phone}
                                            onChange={handleAddressChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Street Address</label>
                                    <input name="street" type="text" required
                                        placeholder="123 Main Street, Apt 4B"
                                        value={address.street}
                                        onChange={handleAddressChange} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input name="city" type="text" required
                                            placeholder="Mumbai"
                                            value={address.city}
                                            onChange={handleAddressChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Postal Code</label>
                                        <input name="postalCode" type="text" required
                                            placeholder="400001"
                                            value={address.postalCode}
                                            onChange={handleAddressChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input name="country" type="text" required
                                        placeholder="India"
                                        value={address.country}
                                        onChange={handleAddressChange} />
                                </div>

                                <button type="submit" className="btn-continue" disabled={saving}>
                                    {saving ? 'REDIRECTING TO STRIPE...' : 'CONTINUE TO PAYMENT →'}
                                </button>
                                <button type="button" className="btn-back" onClick={() => setStep('cart')}>
                                    ← Back to cart
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order summary side */}
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
                                <div className="row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="row"><span>Shipping</span><span>FREE</span></div>
                                <div className="divider"></div>
                                <div className="row grand-total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ─── Cart Step ─── */
    return (
        <div className="cart-page">
            <div className="cart-header">
                <p className="cart-label">YOUR SELECTION</p>
                <h1 className="cart-title">Cart</h1>
            </div>

            <div className="cart-container">
                <div className="cart-items-section">
                    <div className="cart-table-header">
                        <span>PRODUCT</span>
                        <span>QUANTITY</span>
                        <span>TOTAL</span>
                    </div>

                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="item-info">
                                <div className="item-image-box">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-meta">{item.varietal}</p>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                    <button className="item-remove" onClick={() => removeFromCart(item.id)}>
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                            <div className="item-quantity">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <div className="item-total">
                                ${((item.price || 0) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary-section">
                    <div className="summary-card">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free-shipping">FREE</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <button onClick={handleProceedToAddress} className="btn-checkout">
                            PROCEED TO CHECKOUT
                        </button>

                        <div className="stripe-trust-badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="1" y="3" width="15" height="13" rx="2"></rect>
                                <path d="M7 12h2l1-3 1.5 6 1.5-3h2"></path>
                            </svg>
                            Secured by Stripe
                        </div>
                        <p className="tax-notice">Taxes and duties calculated at checkout.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
