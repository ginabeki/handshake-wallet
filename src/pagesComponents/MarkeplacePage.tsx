"use client"

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/state/hooks';
import { fetchListings } from '@/lib/state/marketplaceSlice';
import { initializeWeb5 } from '@/lib/state/web5Slice';
import Link from 'next/link';
import CreateListingForm from '@/components/marketplace/CreateListingForm';

const MarketplacePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { web5, did, isAuthenticated } = useAppSelector((state) => state.auth);
  const { items, status, error } = useAppSelector((state) => state.marketplace);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    if (web5 && did) {
      dispatch(fetchListings({ web5, did }));
    }
  }, [dispatch, web5, did]);

  const handleAuth = () => {
    dispatch(initializeWeb5());
    setShowAuthPrompt(false);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link href={`/marketplace/${item.id}`} key={item.id}>
            <div className="border rounded p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-bold">{item.title}</h3>
              <p>${item.price}</p>
              <p>{item.condition}</p>
              <p>{item.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;