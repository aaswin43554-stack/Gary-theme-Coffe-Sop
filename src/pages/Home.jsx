import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import CurrentAllocation from '../components/CurrentAllocation';
import Journey from '../components/Journey';
import Newsletter from '../components/Newsletter';
import Allocation from './Allocation';
import Journal from './Journal';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // adding a short timeout ensures the components are rendered before scrolling
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className="home-page">
            <Hero />
            <CurrentAllocation />
            <Journey />
            <div id="allocation">
                <Allocation />
            </div>
            <div id="journal">
                <Journal />
            </div>
            <Newsletter />
        </div>
    );
};

export default Home;
