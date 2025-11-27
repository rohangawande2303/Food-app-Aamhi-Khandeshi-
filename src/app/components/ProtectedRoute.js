"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            const returnUrl = encodeURIComponent(window.location.pathname);
            router.push(`/login?message=Please login to proceed to checkout&returnUrl=${returnUrl}`);
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-green-600"></div>
            </div>
        );
    }

    return user ? children : null;
};

export default ProtectedRoute;
