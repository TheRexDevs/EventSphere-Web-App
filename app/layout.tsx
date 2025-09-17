import type { Metadata } from "next";
// import { Inter } from "next/font/google";

import { AuthProvider } from "@/app/contexts/AuthContext";
import { languages as langs } from "@/constants";
import { Toaster } from "@/app/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "EventSphere",
	description: "College Event Information System.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang={langs[0]} suppressHydrationWarning>
			<body className={"antialiased"}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange={false}
				>
					<AuthProvider>
						{children}
					</AuthProvider>
					<Toaster position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
