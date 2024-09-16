"use client";

import { useAppSelector } from "@/lib/state/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardPage from "@/pagesComponents/DashboardPage";

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, did } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated && !did) {
      router.push("/");
    }
  }, [isAuthenticated, did, router]);
  return <DashboardPage />;
};

export default Dashboard;
