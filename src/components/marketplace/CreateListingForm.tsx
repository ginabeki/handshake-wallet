"use client"
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/lib/state/hooks';
import useImageUploader from '@/lib/imageUploader';
import { handshakeProtocol } from '@/data/handshakeProtocolDefinition';
import { constantPublicDid as publicDid } from '@/data/constant';
import { addListing, fetchListings, MarketPlaceItem } from '@/lib/state/marketplaceSlice';

const CreateListingForm = () => {
    const dispatch = useAppDispatch();
    const { web5, did } = useAppSelector((state) => state.auth);
    const { picture: photos, handleImageChange } = useImageUploader();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        id: uuidv4(),
        title: '',
        price: 0,
        condition: 'new' as 'new' | 'used',
        description: '',
        location: '',
        photos,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const createListing = async (event: React.FormEvent, web5: any) => {
        event.preventDefault();
        setLoading(true);
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!formData.title || !formData.price || !formData.description || !formData.location || !photos) {
            alert("Please fill in all the required fields!");
            setLoading(false);
            return;
        }

        try {
            const listingData: MarketPlaceItem = {
                ...formData,
                sellerId: did || '',
                photos: photos,
            };

            const { record, status } = await web5.dwn.records.create({
                data: listingData,
                message: {
                    protocol: handshakeProtocol.protocol,
                    protocolPath: "marketplaceItem",
                    schema: handshakeProtocol.types.marketplaceItem.schema,
                    recipient: did,
                    published: true,
                },
            });


            if (status.code === 202 && status.detail === "Accepted") {
                dispatch(addListing(listingData));
                setSuccess('Listing created successfully! It may take a few moments to appear.');
                alert('Listing created successfully!');
                const DIDs = [did, publicDid].filter((d): d is string => typeof d === 'string');
                DIDs.forEach(targetDid => {
                    record.send(targetDid).catch((error: any) => {
                        console.warn(`Failed to send record to DID: ${targetDid}. This is non-critical and the listing has been created.`, error);
                    });
                });
                // Reset form
                setFormData({
                    id: uuidv4(),
                    title: '',
                    price: 0,
                    condition: 'new',
                    description: '',
                    location: '',
                    photos: null,
                });
                // Refresh listings after a short delay
                setTimeout(() => {
                    dispatch(fetchListings(web5));
                }, 5000); // Wait for 5 seconds before refreshing
            } else {
                throw new Error(`Unexpected status: ${status.code} ${status.detail}`);
            }
        } catch (error) {
            console.error("Error creating listing: ", error);
            setError(`Failed to create listing. Please try again. Error: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => createListing(e, web5)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block mb-2 text-[16px] font-medium text-gray-900">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    required
                />
            </div>

            <div>
                <label htmlFor="price" className="block mb-2 text-[16px] font-medium text-gray-900">
                    Price <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    required
                />
            </div>

            <div>
                <label htmlFor="condition" className="block mb-2 text-[16px] font-medium text-gray-900">
                    Condition <span className="text-red-500">*</span>
                </label>
                <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    required
                >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
            </div>

            <div>
                <label htmlFor="description" className="block mb-2 text-[16px] font-medium text-gray-900">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    required
                />
            </div>

            <div>
                <label htmlFor="location" className="block mb-2 text-[16px] font-medium text-gray-900">
                    Location <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    required
                />
            </div>

            <div>
                <label htmlFor="photos" className="block mb-2 text-[16px] font-medium text-gray-900">
                    Photos <span className="text-red-500">*</span>
                </label>
                <input
                    type="file"
                    id="photos"
                    name="photos"
                    onChange={handleImageChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    multiple
                    required
                />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                {loading ? 'Creating...' : 'Create Listing'}
            </button>
        </form>
    );
};

export default CreateListingForm;