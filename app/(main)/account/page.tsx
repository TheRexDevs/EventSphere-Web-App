import AccountPage from "@/app/components/pages/main/account";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Account Settings",
		description: "",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/account/`,
		},
		openGraph: {
			description: "",
			title: "Edit account details",
		},
	};
}

export default function Account() {
	return <AccountPage />;
}
