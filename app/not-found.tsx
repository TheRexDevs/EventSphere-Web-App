import Link from "next/link";
import { Metadata } from "next";
import { Button } from "./components/ui/button";
import { Home, Search, Calendar } from "lucide-react";

export const metadata: Metadata = {
	title: "404 - Page Not Found | EventSphere",
	description: "The page you're looking for doesn't exist. Discover amazing campus events on EventSphere.",
	openGraph: {
		title: "404 - Page Not Found | EventSphere",
		description: "The page you're looking for doesn't exist. Discover amazing campus events on EventSphere.",
	},
};

export default function NotFound() {
	return (
		<main className="min-h-screen bg-background text-foreground flex items-center justify-center">
			{/* Main Content */}
			<section className="py-16 bg-background w-full max-w-4xl mx-auto px-4">
				<div className="text-center space-y-8">
					{/* Page Title */}
					<div className="space-y-4">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground">
							Page Not Found
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							Oops! The page you&apos;re looking for doesn&apos;t
							exist. It seems you&apos;ve ventured into uncharted
							territory.
						</p>
					</div>

					{/* Fun 404 Illustration */}
					<div className="w-full relative pb-1 flex gap-4 justify-center items-center">
						<span className="relative text-8xl md:text-9xl font-bold text-primary/20 select-none">
							4
						</span>
						<span className="relative text-8xl md:text-9xl font-bold text-primary select-none">
							0
						</span>
						<span className="relative text-8xl md:text-9xl font-bold text-primary/20 select-none">
							4
						</span>
					</div>

					{/* Helpful Links */}
					<div className="max-w-2xl mx-auto">
						<h3 className="text-2xl font-semibold text-foreground mb-6">
							Here are some helpful links:
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Link href="/" className="group">
								<div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
									<div className="flex flex-col items-center space-y-3">
										<div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
											<Home className="w-6 h-6 text-primary" />
										</div>
										<h4 className="font-medium text-foreground">
											Home
										</h4>
										<p className="text-sm text-muted-foreground text-center">
											Return to our homepage
										</p>
									</div>
								</div>
							</Link>

							<Link href="/events" className="group">
								<div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
									<div className="flex flex-col items-center space-y-3">
										<div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
											<Calendar className="w-6 h-6 text-primary" />
										</div>
										<h4 className="font-medium text-foreground">
											Events
										</h4>
										<p className="text-sm text-muted-foreground text-center">
											Browse upcoming events
										</p>
									</div>
								</div>
							</Link>

							<Link href="/gallery" className="group">
								<div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
									<div className="flex flex-col items-center space-y-3">
										<div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
											<Search className="w-6 h-6 text-primary" />
										</div>
										<h4 className="font-medium text-foreground">
											Gallery
										</h4>
										<p className="text-sm text-muted-foreground text-center">
											View event memories
										</p>
									</div>
								</div>
							</Link>
						</div>
					</div>

					{/* Contact Support */}
					<div className="bg-muted/50 rounded-lg p-6 max-w-lg mx-auto">
						<h4 className="font-semibold text-foreground mb-2">
							Still can&apos;t find what you&apos;re looking for?
						</h4>
						<p className="text-muted-foreground mb-4">
							Contact our support team for assistance.
						</p>
						<Button asChild variant="outline">
							<Link href="/contact">Contact Support</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
