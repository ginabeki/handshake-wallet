"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/state/hooks";
import { useParams } from "next/navigation";
import { fetchListings } from "@/lib/state/marketplaceSlice";
import { sendMessage, fetchMessages, resetMessageStatus } from "@/lib/state/messageSlice";
import { constantPublicDid as publicDid } from "@/data/constant";

const ItemDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const { web5, did, isAuthenticated } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.marketplace);
  const { messages, status } = useAppSelector((state) => state.messages);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const item = items.find((item) => item.id === id);

  useEffect(() => {
    if (web5 && publicDid && items.length === 0) {
      dispatch(fetchListings(web5));
    }
  }, [dispatch, web5, publicDid, items.length]);

  useEffect(() => {
    if (web5 && did && item) {
      dispatch(fetchMessages({ web5, did, itemId: item.id }));
    }
  }, [dispatch, web5, did, item]);

  useEffect(() => {
    // Reset message status when component mounts or unmounts
    return () => {
      dispatch(resetMessageStatus());
    };
  }, [dispatch]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowSuccessMessage(false);
    if (!isAuthenticated || !web5 || !did || !item) {
      setError("Unable to send message. Please ensure you're logged in and try again.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a message before sending.");
      return;
    }

    try {
      const result = await dispatch(sendMessage({ web5, did, itemId: item.id, sellerId: item.sellerId, message })).unwrap();
      // console.log('Message sent result:', result);
      setMessage("");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
      dispatch(fetchMessages({ web5, did, itemId: item.id }));
    } catch (error: any) {
      console.error("Failed to send message:", error);
      setError(`Failed to send message: ${error.toString()}`);
    }
  };

  if (!item) return <div>Loading...</div>;
  const photos = Array.isArray(item.photos) ? item.photos : [item.photos].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          {photos.length > 0 && (
            <img
              src={photos[0]}
              alt={item.title}
              className="w-full h-64 object-cover mb-4"
            />
          )}
          <div className="flex space-x-2 mb-4">
            {photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${item.title} ${index + 2}`}
                className="w-20 h-20 object-cover"
              />
            ))}
          </div>
          <p className="text-xl font-bold mb-2">${item.price}</p>
          <p className="mb-2">Condition: {item.condition}</p>
          <p className="mb-2">Location: {item.location}</p>
          <p className="mb-4">{item.description}</p>
        </div>
        <div className="conversation">
          <h2 className="text-2xl font-bold mb-4">Chat with Seller</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 h-40 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.from === did ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.from === did ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  {msg.message}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="mt-4">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded-l-lg"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                disabled={!isAuthenticated || status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {showSuccessMessage && <p className="text-green-500 mt-2">Message sent successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;