import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/state/hooks';
import { fetchListings } from '@/lib/state/marketplaceSlice';
import Link from 'next/link';
import { Web5 } from '@web5/api';

const MarketplaceListings: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.marketplace);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchListingsData = async () => {
            try {
                const { web5 } = await Web5.connect();
                dispatch(fetchListings(web5));
            } catch (error) {
                console.error('Error connecting to Web5:', error);
            }
        };

        fetchListingsData();

        // Interval to refresh listings periodically, every 30s
        const intervalId = setInterval(fetchListingsData, 30000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);


    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            {status === 'succeeded' && filteredItems.length === 0 && (
                <div>No listings available at the moment.</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                    <Link href={`/marketplace/${item.id}`} key={item.id}>
                        <div className="border rounded p-4 hover:shadow-lg transition-shadow">
                            <img src={item.photos} alt={item.title} className="w-full h-48 object-cover mb-2" />
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

export default MarketplaceListings;