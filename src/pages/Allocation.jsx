import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Allocation.css';

const PRODUCTS = [
    {
        id: 'R-001',
        name: 'Jardin de Claude, Thailand',
        fullName: 'Jardin de Claude, Thailand Single Estate Specialty Coffee',
        price: 19.50,
        image: '/jardin-de-claude.jpg',
        estate: 'Jardin de Claude',
        country: 'Thailand',
        varietal: 'Catimor/Typica',
        process: 'Anaerobic Fermentation',
        altitude: '1,200 masl',
        roast: 'Light-Medium',
        batchSize: '200g',
        totalBags: '48 Produced',
        flavors: ['Jasmine', 'Bergamot', 'Lemon Verbena', 'White Peach'],
        story: 'Sourced from the mountains of northern Thailand, this lot is grown at altitude where cool temperatures slow cherry development, producing a refined and florally complex cup.',
    }
];

const Allocation = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

    const handleSelectProduct = (p) => {
        setSelectedProduct(p);
    };


    const handleReserve = () => {
        addToCart({
            id: selectedProduct.id,
            name: selectedProduct.fullName,
            price: selectedProduct.price,
            image: selectedProduct.image,
            varietal: selectedProduct.varietal,
            country: selectedProduct.country,
        });
        navigate('/cart');
    };

    return (
        <div className="allocation-page">
            {/* Hero */}
            <section className="allocation-hero-minimal">
                <div className="release-header">
                    <p className="release-meta">SPECIALTY RELEASE — {selectedProduct.id}</p>
                    <h1 className="estate-name">{selectedProduct.name}</h1>
                    <div className="estate-details-grid">
                        <div className="detail-item">
                            <span className="label">COUNTRY</span>
                            <span className="value">{selectedProduct.country}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">VARIETAL</span>
                            <span className="value">{selectedProduct.varietal}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">ALTITUDE</span>
                            <span className="value">{selectedProduct.altitude}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Selector */}
            <section className="variety-selection">
                <div className="selection-container">
                    <h2 className="selection-title-main">Available Harvests</h2>
                    <div className="variety-grid">
                        {PRODUCTS.map(p => (
                            <div
                                key={p.id}
                                className={`variety-card ${selectedProduct.id === p.id ? 'active' : ''}`}
                                onClick={() => handleSelectProduct(p)}
                            >
                                <div className="variety-card-img">
                                    <img src={p.image} alt={p.name} />
                                </div>
                                <div className="variety-card-body">
                                    <div className="variety-id">{p.id}</div>
                                    <div className="variety-name">{p.name}</div>
                                    <div className="variety-sub">{p.country} · {p.varietal}</div>
                                    <div className="variety-price">${p.price.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="allocation-details-section">
                <div className="details-container">
                    <div className="allocation-info-card">
                        <h2 className="card-title">Allocation Details</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">ROAST LEVEL</span>
                                <span className="value">{selectedProduct.roast}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">PROCESS</span>
                                <span className="value">{selectedProduct.process}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">BATCH SIZE</span>
                                <span className="value">{selectedProduct.batchSize}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">TOTAL BAGS</span>
                                <span className="value">{selectedProduct.totalBags}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flavor-profile-refined">
                        <h2 className="card-title">Flavor Profile</h2>
                        <p className="profile-desc">Structured, refined, and minimal. A clean finish with vibrant acidity.</p>
                        <div className="flavor-grid">
                            {selectedProduct.flavors.map(flavor => (
                                <span key={flavor} className="flavor-tag">
                                    {flavor}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="action-container">
                    <button className="reserve-button-large" onClick={handleReserve}>
                        RESERVE ALLOCATION — ${selectedProduct.price.toFixed(2)}
                    </button>
                    <p className="shipping-note">Free worldwide shipping on all micro-batch harvests.</p>
                </div>
            </section>

            {/* Story */}
            <section className="below-fold-story">
                <div className="story-container">
                    <div className="story-image-placeholder">
                        <img src="/plantation.png" alt="Coffee Plantation" className="story-img" />
                    </div>
                    <div className="story-content">
                        <h3>Estate Story</h3>
                        <p>{selectedProduct.story}</p>
                        <h3>Farmer Profile</h3>
                        <p>
                            The {selectedProduct.name} harvest is sourced from small-hold estates where hand-sorting is a non-negotiable standard. Only the most mature cherries undergo the fermentation process.
                        </p>
                        <h3>Roast Development</h3>
                        <p>
                            Roasted in micro-batches. Each roast profile is designed to highlight the terroir without the masking influence of deep roast oils.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Allocation;
