import { Metadata } from "next";

import EventsPage from "@/app/components/pages/main/events";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Events",
		description: "",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/events/`,
		},
		openGraph: {
			description: "",
			title: "Browse through available events",
		},
	};
}


export default function Events() {
	

	return (
        <EventsPage/>
	);
}
