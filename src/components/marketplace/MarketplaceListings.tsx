import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/state/hooks';
import { fetchListings } from '@/lib/state/marketplaceSlice';
import Link from 'next/link';

const MarketplaceListings: React.FC = () => {
    const dispatch = useAppDispatch();
    const { web5 } = useAppSelector((state) => state.auth);
    const { items, status, error } = useAppSelector((state) => state.marketplace);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (web5) {
            dispatch(fetchListings({ web5 }));
        }
    }, [dispatch, web5]);

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