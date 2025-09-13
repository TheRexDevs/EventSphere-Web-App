"use client";

import { useEffect, useState } from "react";
import EventCard, { EventData } from "@/app/components/common/event-card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { getSixEvents } from "@/lib/api/events";
import { Event } from "@/types/events";
import { useRouter } from "next/navigation";

function convertEventToEventData(event: Event): EventData {
	const date = new Date(event.date);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const availability: "available" | "full" | "cancelled" =
		event.available_slots > 0 ? "available" : "full";

	return {
		id: event.id,
		title: event.title,
		description: event.description,
		date: formattedDate,
		time: event.time,
		location: event.venue,
		image: event.image_url || "",
		category: event.category,
		status: event.status,
		availability,
		tags: event.tags || [],
	};
}

// Skeleton for the EventCard to show while loading
function EventCardSkeleton() {
	return (
		<div className="border rounded-lg p-4 shadow-sm">
			<div className="space-y-4">
				<Skeleton className="w-full h-48 rounded-md" />
				<Skeleton className="h-6 w-3/4" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
				<div className="flex justify-between items-center mt-4">
					<Skeleton className="h-10 w-24 rounded-full" />
					<Skeleton className="h-10 w-24 rounded-full" />
				</div>
			</div>
		</div>
	);
}

const FeaturedEvents = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const loadFeaturedEvents = async () => {
			try {
				setIsLoading(true);
				const response = await getSixEvents();
				// The response from getSixEvents is a ListEventsResponse["data"] object
				// so you need to access the `events` property.
				setEvents(response.events);
			} catch (error) {
				console.error("Failed to load featured events:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadFeaturedEvents();
	}, []);

	const handleViewDetails = (eventId: string) => {
		router.push(`/events/${eventId}`);
	};

	return (
		<section className="py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-[33px] font-bold text-center mb-2">
					Featured Events
				</h2>
				<p className="text-center font-semi-bold text-[18px] mb-8">
					Don’t Miss THis Amazing Upcoming Events
				</p>

				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{Array.from({ length: 6 }).map((_, index) => (
							<EventCardSkeleton key={index} />
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{events.length > 0 ? (
							events.map((event) => (
								<EventCard
									key={event.id}
									event={convertEventToEventData(event)}
									onViewDetails={handleViewDetails}
								/>
							))
						) : (
							<div className="text-center col-span-full py-16 text-gray-600">
								<p>No featured events found at this time.</p>
							</div>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default FeaturedEvents;
