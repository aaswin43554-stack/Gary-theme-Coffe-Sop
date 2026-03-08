import React from 'react';
import './CurrentAllocation.css';

const CurrentAllocation = () => {
    return (
        <section className="current-estate">
            <div className="section-label">CURRENT ALLOCATIONS</div>
            <div className="estate-container">
                <div className="estate-header">
                    <h2 className="estate-title">One Estate. One Origin.</h2>
                    <div className="estate-meta">
                        <span className="meta-item">Suan Thadet, Chiang Mai, Thailand</span>
                    </div>
                </div>

                <div className="estate-card">
                    <div className="estate-image">
                        <img src="/plantation.png" alt="Coffee Plantation" />
                    </div>
                    <div className="estate-description">
                        <div>
                            <p style={{ marginBottom: '10px' }}><strong>Estate:</strong> Suan Thadet, Thailand</p>
                            <p style={{ marginBottom: '10px' }}><strong>Altitude:</strong> 1300 masl</p>
                            <p><strong>Variety:</strong> Yellow Caturra</p>
                        </div>
                        <a href="#allocation" className="btn-outline">View Harvest</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CurrentAllocation;
