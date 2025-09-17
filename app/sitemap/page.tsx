import { Metadata } from "next";
import { Sitemap } from "@/app/components/pages/main/home/site-map";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Site Map | EventSphere",
		description: "Complete overview of all pages and sections available in EventSphere. Navigate through our platform with ease.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap`,
		},
		openGraph: {
			title: "EventSphere Site Map",
			description: "Complete overview of all pages and sections available in EventSphere",
		},
	};
}

export default function SitemapPage() {
	return (
		<main className="min-h-screen bg-secondary/5">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-blue-600 to-primary/40 text-white py-16">
				<div className="w-site mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						EventSphere Site Map
					</h1>
					<p className="text-xl text-blue-100 max-w-2xl mx-auto">
						Your complete guide to navigating our platform. Find all
						pages and features at your fingertips.
					</p>
				</div>
			</section>

			{/* Sitemap Component */}
			<Sitemap />
		</main>
	);
}
