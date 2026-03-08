import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">ONE ESTATE COFFEE</h1>
                    <p className="hero-subtitle">Single Estate Specialty Coffee</p>
                    <p className="hero-tagline">Micro-Batch Roasted. Documented.</p>

                    <a href="/allocation" className="btn-primary hero-btn">
                        View Current Allocation
                        <span className="arrow">→</span>
                    </a>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-label">Single Estate</span>
                            <span className="stat-value">Thailand</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-label">Micro-Batch</span>
                            <span className="stat-value">300–400g</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-label">Documented</span>
                            <span className="stat-value">From Crop To Cup</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-container">
                    <img src="/coffee_bag.png" alt="One Estate Coffee Bag" className="hero-bag-img" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
