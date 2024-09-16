"use client";

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from "@/lib/state/hooks";
import { useRouter } from "next/navigation";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, did } = useAppSelector((state) => state.auth);
    const router = useRouter();

    if (!isAuthenticated || !did) {
        router.push('/');
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <nav className="mt-5">
                    <Link href="/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
                        Dashboard
                    </Link>
                    <Link href="/dashboard/marketplace" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
                        Marketplace
                    </Link>
                    <Link href="/dashboard/sendmoney" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
                        Send Money
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;