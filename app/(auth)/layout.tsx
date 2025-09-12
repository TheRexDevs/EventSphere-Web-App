"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import FullScreenLoader from "@/app/components/ui/fullscreen-loader";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const authPages = ["/login", "/signup"];

	const [ready, setReady] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setReady(true), 0);
		return () => clearTimeout(timeout);
	}, []);

	// While loading, don’t show login/signup — just show loader
	if (isLoading || !ready) {
		return <FullScreenLoader label="Checking authentication..." />;
	}

	// Redirect logged-in users away from login/signup
	if (user && authPages.includes(pathname)) {
		router.replace("/");
		return <FullScreenLoader label="Redirecting..." />;
	}

	return <div id="auth">{children}</div>;
}
