import { Metadata } from "next";

import ContactPage from "@/app/components/pages/main/contact";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Contact Us",
		description: "",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact/`,
		},
		openGraph: {
			description: "",
			title: "Reach out to us",
		},
	};
}

const Contact = () => {
	return <ContactPage />;
};

export default Contact;
