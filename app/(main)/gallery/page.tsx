import { Metadata } from "next";

import GalleryPage from "@/app/components/pages/main/gallery";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Events Gallery",
		description: "",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery/`,
		},
		openGraph: {
			description: "",
			title: "Memories from our amazing events",
		},
	};
}

export default function Events() {
	return <GalleryPage />;
}
