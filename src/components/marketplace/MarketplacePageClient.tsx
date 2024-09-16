"use client"

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/state/hooks';
import { initializeWeb5 } from '@/lib/state/web5Slice';
import CreateListingForm from '@/components/marketplace/CreateListingForm';
import MarketplaceListings from '@/components/marketplace/MarketplaceListings';

const MarketplacePageClient: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const handleAuth = () => {
        dispatch(initializeWeb5());
        setShowAuthPrompt(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Marketplace</h1>

            {isAuthenticated ? (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Create New Listing</h2>
                    <CreateListingForm />
                </div>
            ) : (
                <div className="mb-8">
                    <button onClick={() => setShowAuthPrompt(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Create Listing (Sign In Required)
                    </button>
                </div>
            )}

            {showAuthPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded">
                        <h2 className="text-xl mb-4">Authentication Required</h2>
                        <p className="mb-4">You need to sign in to create a listing.</p>
                        <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
                        <button onClick={() => setShowAuthPrompt(false)} className="ml-4 text-gray-600">Cancel</button>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Current Listings</h2>
            <MarketplaceListings />
        </div>
    );
};

export default MarketplacePageClient;