"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the client-side component
const SendMoneyContent = dynamic(() => import('./SendMoneyContent'), { ssr: false });

export function SendMoneyPage() {
    return (
        <main className="w-full mx-auto bg-primary-yellow">
            <section className="w-full">
                <div className="section-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center justify-between gap-5">
                    <div className="text-black lg:col-span-3">
                        <h1 className="text-4xl font-semibold">
                            Fast, flexible and secure money transfers
                        </h1>
                    </div>
                    <div className="text-black bg-white p-5 lg:col-span-2 rounded-xl">
                        <SendMoneyContent />
                    </div>
                </div>
            </section>
        </main>
    );
}