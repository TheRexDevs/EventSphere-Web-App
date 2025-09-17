import { Metadata } from "next";
import UserDashboard from "@/app/components/pages/main/events/user-dashboard";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "My Dashboard | EventSphere",
		description: "Manage your event registrations, view upcoming events, and track your participation in EventSphere.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
		},
		openGraph: {
			title: "My Dashboard",
			description: "Manage your events and track your participation",
		},
	};
}

export default function DashboardPage() {
	return <UserDashboard />;
}
