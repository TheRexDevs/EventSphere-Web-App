"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import FullScreenLoader from "@/app/components/ui/fullscreen-loader";

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/about", "/contact", "/events", "/gallery"];

function isPublicRoute(pathname: string): boolean {
	return PUBLIC_ROUTES.some(
		(route) => pathname === route || pathname.startsWith(`${route}/`)
	);
}

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const isPublic = isPublicRoute(pathname);

	useEffect(() => {
		if (!isLoading && !user && !isPublic) {
			router.replace(`/login?redirect=true&from=${pathname}`);
		}
	}, [user, isLoading, router, pathname, isPublic]);

	if (isLoading)
		return <FullScreenLoader label="Loading your workspace..." />;

	// Only block access if user is not authenticated AND route is not public
	if (!user && !isPublic)
		return <FullScreenLoader label="Redirecting to login..." />;

	return <>{children}</>;
}
