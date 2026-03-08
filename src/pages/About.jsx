import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <p className="about-label">OUR STORY</p>
                <h1 className="about-title">One estate at a time.</h1>
            </section>

            <section className="about-content">
                <div className="content-grid">
                    <div className="content-block">
                        <h2 className="block-title">Philosophy</h2>
                        <p>
                            We believe in absolute focus. Instead of a vast catalogue of farms
                            and blends, we dedicate ourselves to one single estate for each
                            allocation cycle. This allows us to understand every nuance of the
                            bean and the farm it came from.
                        </p>
                    </div>

                    <div className="content-block">
                        <h2 className="block-title">Method</h2>
                        <p>
                            Our process is rooted in precision. We practice direct sourcing,
                            visiting every farm personally. Our roasting is done in strictly
                            controlled micro-batches of 300–400g. This isn't just a preference;
                            it's the only way we can guarantee perfection in every bag.
                        </p>
                    </div>

                    <div className="content-block">
                        <h2 className="block-title">Commitment</h2>
                        <p>
                            We are committed to sustainability through scarcity, not volume.
                            We do not overproduce. Every allocation represents the entirety
                            of a microlot. When the allocation is closed, the cycle ends,
                            respecting the natural limits of the earth and the farmer's yield.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-quote">
                <div className="quote-container">
                    <blockquote>
                        "The goal is not to be a warehouse of coffee, but a curator of
                        singular moments in a cup."
                    </blockquote>
                </div>
            </section>
        </div>
    );
};

export default About;
