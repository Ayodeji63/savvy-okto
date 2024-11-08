import BackButton from '../../components/common/back-button';
import React from 'react';

const WelcomeBanner = () => {

    return (
        <div className="bg-green-900 p-6 rounded-lg mb-8 shadow-md">
            <h2 className="text-2xl font-bold text-green-100 mb-2"><BackButton /></h2>
            <p className="text-green-200">Your savings journey continues. Let's grow together!</p>
        </div>
    );
};

export default WelcomeBanner;