"use client";

import Link from "next/link";
import { Home, Calendar, Image, Info, Phone, User, LogIn, FileText, CheckCircle, Globe, Shield, UserCheck, ArrowRight } from "lucide-react";

export const Sitemap = () => {
	const publicPages = [
		{ name: "Home", href: "/", icon: <Home className="h-4 w-4" />, description: "Main landing page" },
		{ name: "Events", href: "/events", icon: <Calendar className="h-4 w-4" />, description: "Browse and discover events" },
		{ name: "Gallery", href: "/gallery", icon: <Image className="h-4 w-4" aria-hidden="true" />, description: "Event photos and memories" },
		{ name: "About", href: "/about", icon: <Info className="h-4 w-4" />, description: "About EventSphere" },
		{ name: "Contact", href: "/contact", icon: <Phone className="h-4 w-4" />, description: "Contact information" },
	];

	const authPages = [
		{ name: "Login", href: "/login", icon: <LogIn className="h-4 w-4" />, description: "Sign in to your account" },
		{ name: "Sign Up", href: "/signup", icon: <User className="h-4 w-4" />, description: "Create new account" },
		{ name: "Verify Email", href: "/verify-email", icon: <CheckCircle className="h-4 w-4" />, description: "Email verification" },
	];

	const userPages = [
		{ name: "Account", href: "/account", icon: <User className="h-4 w-4" />, description: "Profile settings" },
		{ name: "Registered Events", href: "/events/registered", icon: <Calendar className="h-4 w-4" />, description: "Your registered events" },
	];

	const dynamicPages = [
		{ name: "Event Details", pattern: "/events/[eventId]", description: "Individual event information" },
	];

	return (
		<section id="sitemap" className="py-16 bg-gray-50">
			<div className="w-site mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						EventSphere Site Map
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Navigate through our platform with ease. Here&apos;s a complete overview of all pages and sections available in EventSphere.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Public Pages */}
					<div className="bg-white rounded-lg shadow-sm border p-6">
						<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
							<Globe className="h-5 w-5 text-green-600" />
							Public Pages
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							Accessible to all visitors without requiring login
						</p>
						<div className="space-y-3">
							{publicPages.map((page) => (
								<Link
									key={page.href}
									href={page.href}
									className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
								>
									<div className="text-blue-600 group-hover:text-blue-700">
										{page.icon}
									</div>
									<div>
										<div className="font-medium text-gray-900">{page.name}</div>
										<div className="text-sm text-gray-600">{page.description}</div>
									</div>
								</Link>
							))}
						</div>
					</div>

					{/* Authentication Pages */}
					<div className="bg-white rounded-lg shadow-sm border p-6">
						<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
							<Shield className="h-5 w-5 text-blue-600" />
							Authentication
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							User account management and security
						</p>
						<div className="space-y-3">
							{authPages.map((page) => (
								<Link
									key={page.href}
									href={page.href}
									className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
								>
									<div className="text-purple-600 group-hover:text-purple-700">
										{page.icon}
									</div>
									<div>
										<div className="font-medium text-gray-900">{page.name}</div>
										<div className="text-sm text-gray-600">{page.description}</div>
									</div>
								</Link>
							))}
						</div>
					</div>

					{/* User Dashboard */}
					<div className="bg-white rounded-lg shadow-sm border p-6">
						<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
							<UserCheck className="h-5 w-5 text-orange-600" />
							User Dashboard
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							Personalized features for registered participants
						</p>
						<div className="space-y-3">
							{userPages.map((page) => (
								<div
									key={page.href}
									className="flex items-center gap-3 p-3 rounded-lg"
								>
									<div className="text-orange-600">
										{page.icon}
									</div>
									<div>
										<div className="font-medium text-gray-900">{page.name}</div>
										<div className="text-sm text-gray-600">{page.description}</div>
									</div>
								</div>
							))}
						</div>

						{/* Dynamic Pages */}
						<div className="mt-6 pt-4 border-t">
							<h4 className="font-medium text-gray-900 mb-3">Dynamic Pages</h4>
							<div className="space-y-3">
								{dynamicPages.map((page) => (
									<div
										key={page.pattern}
										className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
									>
										<FileText className="h-4 w-4 text-gray-500" />
										<div>
											<div className="font-medium text-gray-900">{page.name}</div>
											<div className="text-sm text-gray-600">{page.description}</div>
											<div className="text-xs text-gray-500 mt-1">{page.pattern}</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Flow */}
				<div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
					<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
						<ArrowRight className="h-5 w-5 text-indigo-600" />
						Navigation Flow
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium mb-2">
								Visitors
							</div>
							<p className="text-sm text-gray-600">
								Can access all public pages, browse events, and view the gallery
							</p>
						</div>
						<div className="text-center">
							<div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium mb-2">
								Participants
							</div>
							<p className="text-sm text-gray-600">
								All visitor access + registration, dashboard, certificates, and feedback
							</p>
						</div>
						<div className="text-center">
							<div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium mb-2">
								Organizers/Admins
							</div>
							<p className="text-sm text-gray-600">
								Full system access for event management and administration
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
