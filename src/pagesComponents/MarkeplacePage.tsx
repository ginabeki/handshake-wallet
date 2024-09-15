"use client"

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/state/hooks';
import { fetchListings } from '@/lib/state/marketplaceSlice';
import { initializeWeb5 } from '@/lib/state/web5Slice';
import Link from 'next/link';
import CreateListingForm from '@/components/marketplace/CreateListingForm';
import CustomImage from '@/components/CustomImage';

const MarketplacePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { web5, did, isAuthenticated, publicDid } = useAppSelector((state) => state.auth);
  const { items, status, error } = useAppSelector((state) => state.marketplace);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    if (web5) {
      dispatch(fetchListings(web5));
    }
  }, [web5, dispatch]);

  const handleAuth = () => {
    dispatch(initializeWeb5());
    setShowAuthPrompt(false);
  };

  const fetchImage = async (recordId: string) => {
    if (web5) {
      try {
        const { record } = await web5.dwn.records.read({
          message: {
            filter: {
              recordId: recordId
            }
          }
        });

        if (!record) {
          console.error(`No record found for ID: ${recordId}`);
          return null;
        }

        if (!record.data) {
          console.error(`Record found, but data is undefined for ID: ${recordId}`);
          return null;
        }

        const blob = await record.data.blob();
        if (!blob) {
          console.error(`Failed to get blob from record data for ID: ${recordId}`);
          return null;
        }

        return URL.createObjectURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
        return null;
      }
    }
    return null;
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
              {item.photos && item.photos.length > 0 && (
                <CustomImage
                  width={300}
                  height={250}
                  src={fetchImage(item.photos[0])}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-2"
                />
              )}
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