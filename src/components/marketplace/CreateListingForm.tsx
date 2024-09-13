import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/state/hooks';
import { createListing } from '@/lib/state/marketplaceSlice';

const CreateListingForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { web5, did } = useAppSelector((state) => state.auth);
    const { status, error } = useAppSelector((state) => state.marketplace);
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        condition: 'new' as 'new' | 'used',
        description: '',
        location: '',
        photos: [] as string[],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileNames = Array.from(e.target.files || []).map(file => file.name);
        setFormData(prev => ({ ...prev, photos: [...prev.photos, ...fileNames] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (web5 && did) {
            try {
                await dispatch(createListing({ web5, did, item: formData })).unwrap();
                alert('Listing created successfully!');
                // Reset form or navigate to another page
            } catch (err) {
                console.error('Failed to create listing:', err);
                alert('Failed to create listing. Please try again.');
            }
        } else {
            alert('Web5 or DID not initialized. Please ensure you are logged in.');
        }
    };

    const isLoading = status === 'loading';


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="price" className="block mb-2">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="condition" className="block mb-2">Condition</label>
                <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
            </div>
            <div>
                <label htmlFor="description" className="block mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="location" className="block mb-2">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="photos" className="block mb-2">Photos</label>
                <input
                    type="file"
                    id="photos"
                    name="photos"
                    onChange={handlePhotoUpload}
                    multiple
                    accept="image/*"
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                className={`px-4 py-2 rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
                disabled={isLoading}
            >
                {isLoading ? 'Creating...' : 'Publish Listing'}
            </button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    );
};

export default CreateListingForm;