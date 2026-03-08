import React from 'react';
import './Documentation.css';

const Documentation = () => {
    const docs = [
        {
            title: 'Roast Log — R-014',
            subtitle: 'Full Roast Metrics & Notes',
            image: '/roast_log.png'
        },
        {
            title: 'Process Study',
            subtitle: 'Natural Anaerobic',
            image: '/process_study.png'
        },
        {
            title: 'Estate Intro',
            subtitle: 'Jardin de Claude',
            image: '/estate_intro.png'
        }
    ];

    return (
        <section className="documentation">
            <div className="section-label">DOCUMENTATION</div>
            <div className="doc-container">
                <div className="doc-grid">
                    {docs.map((doc, index) => (
                        <div key={index} className="doc-card">
                            <img src={doc.image} alt={doc.title} className="doc-bg" />
                            <div className="doc-content">
                                <h3 className="doc-title">{doc.title}</h3>
                                <p className="doc-subtitle">{doc.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="doc-action">
                    <a href="/journal" className="btn-outline">View All Logs</a>
                </div>
            </div>
        </section>
    );
};

export default Documentation;
