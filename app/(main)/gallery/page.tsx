import { Metadata } from "next";

import EventsPage from "@/app/components/pages/main/events";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Events Gallery",
		description: "",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/events/`,
		},
		openGraph: {
			description: "",
			title: "Browse through images and relive memories",
		},
	};
}

export default function Events() {
	return <EventsPage />;
}
