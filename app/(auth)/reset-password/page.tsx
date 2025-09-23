import { Metadata } from "next";
import { Suspense } from "react";

import ResetPasswordPage from "@/app/components/pages/auth/reset-password";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Reset Password | EventSphere",
		description: "Set a new password for your EventSphere account.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
		},
		openGraph: {
			title: "Reset Password",
			description: "Set a new password for your EventSphere account.",
		},
	};
}

export default function ResetPassword() {
	return (
		<Suspense fallback={null}>
			<ResetPasswordPage />
		</Suspense>
	);
}
