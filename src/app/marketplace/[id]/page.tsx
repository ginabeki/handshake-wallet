'use client'

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/state/hooks';
import { useParams } from 'next/navigation';
import { fetchListings } from '@/lib/state/marketplaceSlice';
import { handshakeProtocol } from '@/data/handshakeProtocolDefinition';
import { constantPublicDid as publicDid } from '@/data/constant';

const ItemDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const id = params.id as string;
    const { web5, did } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.marketplace);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (web5 && publicDid && items.length === 0) {
            dispatch(fetchListings({ web5, publicDid }));
        }
    }, [dispatch, web5, publicDid, items.length]);

    const item = items.find(item => item.id === id);

    const handleSendMessage = async () => {
        if (web5 && did && item) {
            try {
                await web5.dwn.records.create({
                    data: {
                        from: did,
                        to: item.sellerId,
                        message,
                        itemId: item.id,
                    },
                    message: {
                        protocol: handshakeProtocol.protocol,
                        protocolPath: "marketplace/marketplaceMessage",
                        schema: handshakeProtocol.types.marketplaceMessage.schema,
                        dataFormat: "application/json"
                    }
                });
                setMessage('');
                alert('Message sent!');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    if (!item) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={item.photos[0]} alt={item.title} className="w-full h-64 object-cover mb-4" />
                    <div className="flex space-x-2">
                        {item.photos.slice(1).map((photo, index) => (
                            <img key={index} src={photo} alt={`${item.title} ${index + 2}`} className="w-20 h-20 object-cover" />
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xl font-bold mb-2">${item.price}</p>
                    <p className="mb-2">Condition: {item.condition}</p>
                    <p className="mb-2">Location: {item.location}</p>
                    <p className="mb-4">{item.description}</p>
                    <div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask the seller a question..."
                            className="w-full p-2 border rounded mb-2"
                            rows={4}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;