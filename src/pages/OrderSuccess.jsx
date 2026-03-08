import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(true);
    const [orderNumber, setOrderNumber] = useState('');
    const [savedOrder, setSavedOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        saveOrderToSupabase();
    }, []);

    const saveOrderToSupabase = async () => {
        try {
            const raw = localStorage.getItem('pendingOrder');
            if (!raw) {
                setSaving(false);
                return;
            }

            const pending = JSON.parse(raw);
            const { items, subtotal, address } = pending;
            const refNumber = `OE-${Date.now().toString().slice(-6)}`;
            setOrderNumber(refNumber);

            // 1. Save shipping address
            const { data: addressData, error: addressError } = await supabase
                .from('customer_addresses')
                .insert([{
                    full_name: address.fullName,
                    email: address.email,
                    phone: address.phone,
                    street_address: address.street,
                    city: address.city,
                    postal_code: address.postalCode,
                    country: address.country,
                    is_default: true,
                }])
                .select()
                .single();

            if (addressError) throw addressError;

            // 2. Create the order record
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert([{
                    order_reference: refNumber,
                    total_amount: subtotal,
                    payment_status: 'paid',
                    payment_method: 'stripe',
                    order_status: 'confirmed',
                    shipping_address_id: addressData?.id || null,
                    customer_name: address.fullName,
                    customer_email: address.email,
                }])
                .select()
                .single();

            if (orderError) throw orderError;

            // 3. Save each order item
            const orderItems = items.map(item => ({
                order_id: orderData.id,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,          // existing NOT NULL column
                unit_price: item.price,
                total_price: item.price * item.quantity,
                varietal: item.varietal,
                country: item.country,
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            setSavedOrder({ ...orderData, items, address });
            localStorage.removeItem('pendingOrder'); // Clean up
        } catch (err) {
            console.error('Full error saving order:', JSON.stringify(err, null, 2));
            console.error('Error message:', err?.message);
            console.error('Error details:', err?.details);
            console.error('Error code:', err?.code);
            setError(err?.message || JSON.stringify(err));
        } finally {
            setSaving(false);
        }
    };

    if (saving) {
        return (
            <div className="success-page">
                <div className="success-container">
                    <div className="saving-spinner"></div>
                    <p className="success-label" style={{ marginTop: '30px' }}>CONFIRMING YOUR ORDER...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="success-page">
            <div className="success-container">
                {/* Animated checkmark */}
                <div className="success-icon-wrap">
                    <svg className="success-checkmark" viewBox="0 0 52 52">
                        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark-check" fill="none" d="M14 26 l8 8 l16-16" />
                    </svg>
                </div>

                <p className="success-label">ORDER CONFIRMED</p>
                <h1 className="success-title">Your harvest is on its way</h1>
                {orderNumber && <p className="success-order-num">Order {orderNumber}</p>}

                <p className="success-msg">
                    Thank you for your purchase. A confirmation has been sent to{' '}
                    <strong>{savedOrder?.customer_email || 'your email'}</strong>.
                    Your single estate coffee will be roasted fresh and dispatched within 2–3 business days.
                </p>

                {/* Order summary */}
                {savedOrder?.items && (
                    <div className="order-summary-box">
                        <h3>Order Summary</h3>
                        {savedOrder.items.map((item, i) => (
                            <div key={i} className="summary-item-row">
                                <div className="summary-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="summary-item-details">
                                    <p className="summary-item-name">{item.name}</p>
                                    <p className="summary-item-meta">Qty: {item.quantity} · ${item.price.toFixed(2)} each</p>
                                </div>
                                <div className="summary-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                        <div className="summary-order-total">
                            <span>Total Paid</span>
                            <span>${savedOrder.total_amount?.toFixed(2)}</span>
                        </div>
                    </div>
                )}

                {/* Shipping address */}
                {savedOrder?.address && (
                    <div className="address-summary-box">
                        <h3>Shipping To</h3>
                        <p>{savedOrder.address.fullName}</p>
                        <p>{savedOrder.address.street}</p>
                        <p>{savedOrder.address.city}, {savedOrder.address.postalCode}</p>
                        <p>{savedOrder.address.country}</p>
                    </div>
                )}

                {error && (
                    <p className="save-error">
                        ⚠️ Payment successful, but there was an issue saving order details. Please contact support with order number {orderNumber}.
                    </p>
                )}

                <div className="success-details">
                    <div className="success-detail-item">
                        <span className="detail-icon">☕</span>
                        <span>Micro-batch roasted to order</span>
                    </div>
                    <div className="success-detail-item">
                        <span className="detail-icon">📦</span>
                        <span>Dispatched within 2–3 business days</span>
                    </div>
                    <div className="success-detail-item">
                        <span className="detail-icon">🌍</span>
                        <span>Free worldwide shipping</span>
                    </div>
                </div>

                <div className="success-actions">
                    <button onClick={() => navigate('/allocation')} className="btn-view-more">
                        VIEW MORE HARVESTS
                    </button>
                    <button onClick={() => navigate('/')} className="btn-back-home">
                        BACK TO HOME
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
