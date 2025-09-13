"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, Calendar, Users, Star } from "lucide-react";


const Overview = () => {
	const router = useRouter();
	const { user, isLoading } = useAuth();

	const handleViewEvents = () => {
		router.push("/events");
	};

	const handleLogin = () => {
		router.push("/login");
	};

	const handleSignup = () => {
		router.push("/signup");
	};

	if (isLoading) {
		return (
			<div className="w-site space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-3xl font-bold text-gray-900">
						Loading...
					</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="w-site space-y-8">
			{/* Welcome Section */}
			<div className="text-center space-y-4">
				<h1 className="text-3xl font-bold text-gray-900">
					{user ? "Welcome back!" : "Welcome to Event Sphere"}
				</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					{user
						? "Manage your events and discover new opportunities"
						: "Discover and participate in amazing events happening around you"
					}
				</p>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					{user ? (
						<>
							<Button
								onClick={() => {}}
								className="flex items-center gap-2"
							>
								<Plus className="h-4 w-4" />
								Create New Event
							</Button>
							<Button onClick={handleViewEvents} variant="outline">
								View All Events
							</Button>
						</>
					) : (
						<>
							<Button
								onClick={handleLogin}
								className="flex items-center gap-2"
							>
								Login
							</Button>
							<Button onClick={handleSignup} variant="outline">
								Sign Up
							</Button>
							<Button onClick={handleViewEvents} variant="outline">
								Browse Events
							</Button>
						</>
					)}
				</CardContent>
			</Card>

			{/* Features Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Discover Events
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							Browse through a variety of events happening in your area
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-5 w-5" />
							Connect
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							Meet like-minded people and build your network
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Star className="h-5 w-5" />
							Create & Manage
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							{user
								? "Organize your own events and manage registrations"
								: "Sign up to create and manage your own events"
							}
						</p>
					</CardContent>
				</Card>
			</div>
			
		</div>
	);
};

export default Overview;
