import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

import OrderSuccess from './pages/OrderSuccess';

// Simple Contact placeholder
const Contact = () => (
    <div className="contact-page" style={{ padding: '150px 4%', textAlign: 'center', backgroundColor: 'var(--bg-cream)', minHeight: '80vh' }}>
        <p style={{ fontFamily: 'var(--font-accent)', letterSpacing: '3px', color: 'var(--accent-ochre)', marginBottom: '20px' }}>GET IN TOUCH</p>
        <h1 style={{ fontSize: '48px', color: 'var(--bg-dark)' }}>Contact Us</h1>
        <p style={{ marginTop: '40px', color: 'rgba(60, 42, 33, 0.7)' }}>support@oneestatecoffee.com</p>
    </div>
);

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="app">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/payment" element={<Payment />} />

                            <Route path="/success" element={<OrderSuccess />} />
                        </Routes>
                    </main>
                    <footer className="footer-elegant">
                        <div className="footer-container">
                            <p className="copyright">© 2026 One Estate Coffee — Single Estate • Micro-Batch • Documented</p>
                            <div className="social-links">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </Router>
        </CartProvider>
    );
}


export default App;
