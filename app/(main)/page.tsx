"use client"

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, TrendingUp, Package, ShoppingCart } from "lucide-react";


const Overview = () => {
	const router = useRouter();



	const handleViewEvents = () => {
		router.push("/events");
	};


	return (
		<div className="w-site space-y-8">
			{/* Welcome Section */}
			<div className="text-center space-y-4">
				<h1 className="text-3xl font-bold text-gray-900">
					Welcome back!
				</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Adjust pages as needed
				</p>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					<Button
						onClick={() => {}}
						className="flex items-center gap-2"
					>
						<Plus className="h-4 w-4" />
						Create New Event
					</Button>
					<Button onClick={() => {}} variant="outline">
						View All Events
					</Button>
				</CardContent>
			</Card>

			{/* Event Overview */}
			<Card>
					<CardHeader>
						<CardTitle>Your Events</CardTitle>
					</CardHeader>
					<CardContent>
						
					</CardContent>
			</Card>
			
		</div>
	);
};

export default Overview;
