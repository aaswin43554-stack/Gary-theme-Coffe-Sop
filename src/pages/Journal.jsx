import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Journal.css';

const Journal = () => {
    const [email, setEmail] = useState('');
    const [joined, setJoined] = useState(false);

    const handleJoin = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setJoined(true);
        }
    };

    const posts = [
        {
            date: 'OCT 24, 2025',
            title: 'Field Notes: The Red Iron Soil of Kochere',
            excerpt: 'Walking through the Gedeo zone reveals why Ethiopia remains the birthplace of the finest coffees...',
            category: 'FIELD NOTES'
        },
        {
            date: 'OCT 18, 2025',
            title: 'Roast Refinements: Batch #014-A',
            excerpt: 'Adjusting the air flow on our 300g test roasts to maximize the jasmine aromatics of the heirloom varietal...',
            category: 'ROAST LOGS'
        },
        {
            date: 'OCT 12, 2025',
            title: 'Cupping Logs: First Arrival Samples',
            excerpt: 'Initial results show a remarkably clean finish with dominant notes of bergamot and stone fruit...',
            category: 'CUPPING'
        }
    ];

    return (
        <div className="journal-page">
            <section className="journal-hero">
                <p className="journal-label">CHRONICLES</p>
                <h1 className="journal-title">The Journal</h1>
            </section>

            <section className="journal-list">
                <div className="journal-container">
                    {posts.map((post, index) => (
                        <article className="journal-item" key={index}>
                            <div className="item-meta">
                                <span className="item-category">{post.category}</span>
                                <span className="item-date">{post.date}</span>
                            </div>
                            <h2 className="item-title">{post.title}</h2>
                            <p className="item-excerpt">{post.excerpt}</p>
                            <Link to="/allocation" className="item-link">READ NOTES & RESERVE ALLOCATION →</Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="journal-cta">
                <div className="cta-content">
                    <h3>Never Miss a Note</h3>
                    <p>Join our newsletter to receive field notes and early access to the next allocation.</p>

                    {joined ? (
                        <div className="cta-success">
                            <span className="cta-success-icon">✓</span>
                            You're on the list. We'll be in touch.
                        </div>
                    ) : (
                        <form className="cta-form" onSubmit={handleJoin}>
                            <input
                                type="email"
                                className="cta-email-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="cta-btn">JOIN ALLOCATION LIST</button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Journal;
