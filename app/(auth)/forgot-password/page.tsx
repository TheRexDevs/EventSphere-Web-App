import { Metadata } from "next";
import { Suspense } from "react";

import ForgotPasswordPage from "@/app/components/pages/auth/forgot-password";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Forgot Password | EventSphere",
		description: "Reset your password to regain access to your EventSphere account.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
		},
		openGraph: {
			title: "Forgot Password",
			description: "Reset your password to regain access to your EventSphere account.",
		},
	};
}

export default function ForgotPassword() {
	return (
		<Suspense fallback={null}>
			<ForgotPasswordPage />
		</Suspense>
	);
}
