import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems } = useCart();

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img src="/logo.jpg" alt="ONE ESTATE logo" className="logo-icon" />
                    <span>ONE ESTATE</span>
                </Link>

                <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
                    <li><a href="/#" className={location.pathname === '/' && !location.hash ? 'active' : ''} onClick={() => setMenuOpen(false)}>HOME</a></li>
                    <li><a href="/#allocation" className={location.hash === '#allocation' || location.pathname === '/allocation' ? 'active' : ''} onClick={() => setMenuOpen(false)}>ALLOCATION</a></li>
                    <li><a href="/#journal" className={location.hash === '#journal' || location.pathname === '/journal' ? 'active' : ''} onClick={() => setMenuOpen(false)}>JOURNAL</a></li>
                </ul>

                {/* Cart icon — always visible on desktop & mobile */}
                <Link to="/cart" className="cart-icon-btn" aria-label="View cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                    )}
                </Link>

                <button
                    className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {menuOpen && (
                <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
            )}
        </header>
    );
};

export default Header;
