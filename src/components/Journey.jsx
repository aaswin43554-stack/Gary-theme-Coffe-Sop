import React from 'react';
import './Journey.css';

const Journey = () => {
    return (
        <section className="roast-release">
            <div className="section-label">ACTIVE ROAST RELEASE</div>
            <div className="release-container">
                <div className="release-card">
                    <div className="release-details">
                        <div className="release-header">
                            <h2 className="release-title">Allocation R-009</h2>
                            <span className="release-status">Now Available</span>
                        </div>

                        <div className="release-info-grid">
                            <div className="info-row">
                                <span className="info-label">Process</span>
                                <span className="info-value">Washed</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Roast Level</span>
                                <span className="info-value">Espresso</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Estate</span>
                                <span className="info-value">Suan Thadet, Thailand</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Altitude</span>
                                <span className="info-value">1300 masl</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Variety</span>
                                <span className="info-value">Yellow Caturra</span>
                            </div>
                            <div className="info-row flavor">
                                <span className="info-label">Flavor Profile</span>
                                <div className="flavor-chips">
                                    <span className="chip">Jasmine</span>
                                    <span className="chip">Bergamot</span>
                                    <span className="chip">Stone Fruit</span>
                                    <span className="chip">Clean Finish</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="release-stats">
                        <div className="stats-header">
                            <span className="units-count">7 / 10</span>
                            <span className="units-label">Units Available</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '70%' }}></div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-box">
                                <span className="stat-label">Charge</span>
                                <span className="stat-val">198°C</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">Drop</span>
                                <span className="stat-val">206°C</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">Time</span>
                                <span className="stat-val">9:12</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">Development</span>
                                <span className="stat-val">1:18 <span className="percentage">(14.1%)</span></span>
                            </div>
                        </div>

                        <a href="/allocation" className="btn-primary secure-btn">Secure Allocation <span>→</span></a>
                    </div>

                    <div className="release-bg">
                        <img src="/beans.png" alt="Coffee beans background" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
