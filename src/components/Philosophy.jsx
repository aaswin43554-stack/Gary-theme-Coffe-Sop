import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Philosophy.css';

const Philosophy = () => {
    const navigate = useNavigate();
    const points = [
        {
            num: '01',
            title: 'Single Estate',
            desc: 'One farm. One story. No catalogue of compromises.'
        },
        {
            num: '02',
            title: 'Micro-Batch',
            desc: '300-400g roasts. Perfected. Not mass-produced.'
        },
        {
            num: '03',
            title: 'Controlled Allocation',
            desc: 'When closed, it\'s gone. No overproduction, pure.'
        }
    ];

    return (
        <section className="philosophy">
            <div className="philosophy-container">
                <div className="phil-left">
                    <p className="phil-label">PHILOSOPHY</p>
                    <h2 className="phil-title">One estate at a time.</h2>
                    <p className="phil-desc">
                        We source from a single farm per allocation cycle. No blends. No shortcuts.
                        Every batch is roasted in 300-400g lots to ensure absolute consistency
                        and respect for the farmer's craft.
                    </p>
                    <p className="phil-desc-small">
                        Limited production. Allocation closes when sold out.
                    </p>
                    <button className="philosophy-btn" onClick={() => navigate('/about')}>READ OUR STORY</button>
                </div>

                <div className="phil-right">
                    {points.map((point, index) => (
                        <div className="point-card" key={index}>
                            <span className="point-num">{point.num}</span>
                            <h3 className="point-title">{point.title}</h3>
                            <p className="point-desc">{point.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
