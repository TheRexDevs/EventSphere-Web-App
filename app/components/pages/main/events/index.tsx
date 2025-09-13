"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import HeroSection from "@/app/components/common/hero";
import EventCard, { EventData } from "@/app/components/common/event-card";


import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import ConfirmDialog from "@/app/components/ui/confirm-dialog";
import { Plus } from "lucide-react";

import { Skeleton } from "@/app/components/ui/skeleton";

function EventCardSkeleton() {
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="space-y-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<Skeleton className="w-12 h-12 rounded-lg" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-4 w-48" />
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-6 w-20 rounded-full" />
					<Skeleton className="h-6 w-20 rounded-full" />
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					{[1, 2, 3].map((i) => (
						<div key={i} className="flex justify-between">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-10" />
						</div>
					))}
				</div>
				<div className="pt-4 space-y-2">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</CardContent>
		</Card>
	);
}

// Mock data for demonstration
const mockEvents: EventData[] = [
	{
		id: "1",
		title: "Digital Art Masterclass",
		description: "Learn advanced digital art techniques from industry professionals.",
		date: "March 15, 2025",
		time: "2:00pm",
		location: "Art Studio",
		image: "/3dimg/Event Discovery.png",
		category: "Art Workshop",
		status: "ongoing",
		availability: "available",
		tags: ["Art", "Workshop", "Creative"],
	},
	{
		id: "2",
		title: "Annual Career Fair 2025",
		description: "Connect with top employers and explore career opportunities",
		date: "March 15, 2025",
		time: "10:00AM",
		location: "Main Campus",
		image: "/3dimg/Event Discovery (1).png",
		category: "Career Fair",
		status: "coming-soon",
		availability: "available",
		tags: ["Career", "Professional", "Network"],
	},
	{
		id: "3",
		title: "Shakespeare in the Park",
		description: "A modern adaptation of Hamlet performed outdoors.",
		date: "March 22, 2025",
		time: "7:00pm",
		location: "Main Park",
		image: "/3dimg/real time updates.png",
		category: "Theater",
		status: "coming-soon",
		availability: "available",
		tags: ["Theater", "Culture", "Entertainment"],
	},
];

const filterOptions = {
	categories: ["All categories", "Art Workshop", "Career Fair", "Theater", "Music", "Sports"],
	dates: ["All Dates", "Today", "This Week", "This Month", "Next Month"],
	status: ["All Events", "Ongoing", "Coming Soon", "Ended"],
	departments: ["All Departments", "Arts", "Business", "Technology", "Science"],
};

const EventsPage = () => {
	const [filters, setFilters] = useState({
		category: "All categories",
		date: "All Dates",
		status: "All Events",
		department: "All Departments",
	});

	const handleFilterChange = (filterType: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[filterType]: value,
		}));
	};

	const handleViewDetails = (eventId: string) => {
		console.log("View details for event:", eventId);
		// TODO: Implement navigation to event details page
	};

	return (
		<>
			{/* Hero Section */}
			<HeroSection
				title="All Events"
				subtitle="Discover and join events that match your interest"
				backgroundImageUrl="/3dimg/landingpage.jpg"
				height="330px"
			/>

			{/* Filter Section */}
			<section className="bg-white py-8">
				<div className="w-site mx-auto space-y-4">
					<div className="flex flex-wrap gap-6 items-center justify-between">
						{/* Category Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-gray-700">
								Category
							</label>
							<Select
								value={filters.category}
								onValueChange={(value) =>
									handleFilterChange("category", value)
								}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{filterOptions.categories.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Date Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-gray-700">
								Date
							</label>
							<Select
								value={filters.date}
								onValueChange={(value) =>
									handleFilterChange("date", value)
								}
							>
								<SelectTrigger className="w-[150px]">
									<SelectValue placeholder="Select date" />
								</SelectTrigger>
								<SelectContent>
									{filterOptions.dates.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Status Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-gray-700">
								Status
							</label>
							<Select
								value={filters.status}
								onValueChange={(value) =>
									handleFilterChange("status", value)
								}
							>
								<SelectTrigger className="w-[150px]">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									{filterOptions.status.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Department Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-gray-700">
								Department
							</label>
							<Select
								value={filters.department}
								onValueChange={(value) =>
									handleFilterChange("department", value)
								}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select department" />
								</SelectTrigger>
								<SelectContent>
									{filterOptions.departments.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</section>

			<div className="w-site mx-auto space-y-4">
				{/* Events Grid */}
				<section className="py-12">
					<div className="w-site mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{mockEvents.map((event) => (
								<EventCard
									key={event.id}
									event={event}
									onViewDetails={handleViewDetails}
								/>
							))}
						</div>

						{/* No Events State */}
						{mockEvents.length === 0 && (
							<div className="text-center py-16">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									No events found
								</h3>
								<p className="text-gray-600">
									Try adjusting your filters or check back
									later for new events.
								</p>
							</div>
						)}
					</div>
				</section>
			</div>
		</>
	);
}

export default EventsPage;
