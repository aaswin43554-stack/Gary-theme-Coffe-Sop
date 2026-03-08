import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
    return (
        <section className="next-allocation">
            <div className="section-label">NEXT ALLOCATION</div>
            <div className="next-container">
                <div className="next-content">
                    <h2 className="next-title">Limited Micro-Batches. Released When Ready.</h2>
                    <form className="signup-form">
                        <input type="email" placeholder="Enter your email" className="email-input" />
                        <button type="submit" className="btn-primary">Join Release List</button>
                    </form>
                </div>

                <div className="upcoming-list">
                    <div className="upcoming-item">
                        <div className="item-left">
                            <span className="dot yellow"></span>
                            <span className="item-name">R-015 • Honey Process</span>
                        </div>
                        <span className="status">Coming Soon</span>
                    </div>
                    <div className="upcoming-divider"></div>
                    <div className="upcoming-item">
                        <div className="item-left">
                            <span className="dot yellow"></span>
                            <span className="item-name">R-016 • Washed Process</span>
                        </div>
                        <span className="status">In Development</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
