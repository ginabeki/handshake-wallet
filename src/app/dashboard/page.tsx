"use client";

import { useAppSelector } from "@/lib/state/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router = useRouter();
    const { isAuthenticated, did } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!isAuthenticated && !did) {
            router.push('/');
        }
    }, [isAuthenticated, did, router]);
    return (
        <div>dashboard page</div>
    )
}

export default Dashboard;