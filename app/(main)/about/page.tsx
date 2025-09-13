import { Metadata } from "next";

import AboutPage from "@/app/components/pages/main/about";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "About Us",
		description: "",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about/`,
		},
		openGraph: {
			description: "",
			title: "What you need to know about us",
		},
	};
}

const About = () => {
	return <AboutPage />;
};

export default About;
