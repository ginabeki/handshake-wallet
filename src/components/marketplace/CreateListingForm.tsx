"use client"
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/lib/state/hooks';
import useImageUploader from '@/lib/imageUploader';
import { handshakeProtocol } from '@/data/handshakeProtocolDefinition';

const CreateListingForm = () => {
    const { web5, did, publicDid } = useAppSelector((state) => state.auth);
    const { picture: photos, handleImageChange } = useImageUploader();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: uuidv4(),
        title: '',
        price: 0,
        condition: 'new' as 'new' | 'used',
        description: '',
        location: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const createListing = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!formData.title || !formData.price || !formData.description || !formData.location || !photos) {
            alert("Please fill in all the required fields!");
            setLoading(false);
            return;
        }

        try {
            const listingData = {
                ...formData,
                sellerId: did,
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

            const DIDs = [did, publicDid];
            await Promise.all(
                DIDs.map(async (did) => {
                    await record.send(did);
                })
            );

            if (status.code === 202 && status.detail === "Accepted") {
                alert('Listing created successfully!');
                // Reset form
                setFormData({
                    id: uuidv4(),
                    title: '',
                    price: 0,
                    condition: 'new',
                    description: '',
                    location: '',
                });
            }
        } catch (error) {
            console.error("Error creating listing: ", error);
            alert(`Failed to create listing: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={createListing} className="space-y-4">
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

            <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-teal hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                {loading ? 'Creating...' : 'Create Listing'}
            </button>
        </form>
    );
};

export default CreateListingForm;