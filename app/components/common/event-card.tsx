"use client";

import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "../ui/skeleton";

import { Event } from "@/types/events";

export interface EventCardData {
	id: string;
	title: string;
	description: string;
	date: string;
	time: string;
	location: string;
	image: string;
	category: string;
	status: "ongoing" | "coming-soon" | "ended";
	availability: "available" | "full" | "cancelled";
	tags?: string[];
}

interface EventCardProps {
	event: EventCardData;
	onViewDetails?: (eventId: string) => void;
	className?: string;
	detailed?: boolean;
}


// Helper function to convert Event to EventCardData format for EventCard
export function convertEventToEventData(event: Event): EventCardData {
	const date = new Date(event.date);
	const formattedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Convert time from "09:00:00" to "9:00 AM" format
	const formatTime = (timeStr: string) => {
		const [hours, minutes] = timeStr.split(':');
		const hour = parseInt(hours);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour % 12 || 12;
		return `${displayHour}:${minutes} ${ampm}`;
	};

	// Map API status to EventCardData status
	const mapStatus = (apiStatus: string): "ongoing" | "coming-soon" | "ended" => {
		switch (apiStatus) {
			case "approved":
				return "coming-soon";
			case "pending":
				return "coming-soon";
			case "rejected":
				return "ended";
			default:
				return "coming-soon";
		}
	};

	const availability: "available" | "full" | "cancelled" =
		event.max_participants > 0 ? "available" : "full";

	// Extract featured image URL from EventImage object or string
	const featuredImageUrl = event.featured_image?.url ?? "";

	return {
		id: event.id,
		title: event.title,
		description: event.description,
		date: formattedDate,
		time: formatTime(event.time),
		location: event.venue,
		image: featuredImageUrl,
		category: event.category,
		status: mapStatus(event.status),
		availability,
		tags: [], // API doesn't provide tags, so empty array
	};
}


export function EventCardSkeleton() {
	return (
		<Card className="hover:shadow-lg transition-shadow animate-pulse">
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

/**
 * Reusable event card component displaying event information in a clean, modern design
 */
export default function EventCard({
	event,
	onViewDetails,
	className = "",
  detailed = true
}: EventCardProps) {
	const {
		id,
		title,
		description,
		date,
		time,
		location,
		image,
		category,
		status,
		availability,
		tags,
	} = event;

	// Provide fallback for status if it's undefined/null
	const eventStatus = status || "coming-soon";

	const getStatusColor = (status: string) => {
		switch (status) {
			case "ongoing":
				return "bg-green-600/10";
			case "coming-soon":
				return "bg-blue-600/10";
			case "ended":
				return "bg-gray-600/10";
			default:
				return "bg-gray-600/10";
		}
	};

	const getAvailabilityColor = (availability: string) => {
		switch (availability) {
			case "available":
				return "bg-green-100 text-green-800";
			case "full":
				return "bg-red-100 text-red-800";
			case "cancelled":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<Card
			className={`overflow-hidden !py-0 hover:shadow-lg transition-shadow duration-300 ${className}`}
			rounded="lg"
		>
			{/* Image Section */}
			<div className="relative h-48 w-full">
				{typeof image === "string" && image.trim() !== "" ? (
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
						<div className="text-white text-center">
							<div className="text-4xl mb-2">🎪</div>
							<div className="text-sm font-medium">Event</div>
						</div>
					</div>
				)}
				{/* Dark overlay */}
				<div className="absolute inset-0 bg-black/40" />

				{/* Category title on image */}
				<div className="absolute inset-0 flex items-center justify-center">
					<h3 className="text-2xl font-bold text-white text-center px-4">
						{category}
					</h3>
				</div>

				{/* Status badge */}
        {detailed && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                eventStatus
              )}`}
            >
              {eventStatus.replace("-", " ").toUpperCase()}
            </span>
          </div>
        )}
			</div>

			{/* Content Section */}
			<CardContent className="px-4 pb-6 space-y-4">
				{/* Date and Time */}
				<div className="flex items-center gap-2 text-green-600 font-medium">
					<Calendar className="h-4 w-4" />
					<span>{date}</span>
					<span>•</span>
					<Clock className="h-4 w-4" />
					<span>{time}</span>
				</div>

				{/* Event Title */}
				<h4 className="text-xl font-bold text-gray-900 line-clamp-2">
					{title}
				</h4>

				{/* Description */}
				{detailed && (
					<p className="text-gray-600 text-sm line-clamp-3">
						{description}
					</p>
				)}

				{/* Tags */}
				{detailed && (
					<div className="flex flex-wrap gap-2">
						{tags && tags.slice(0, 3).map((tag, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full"
							>
								{tag}
							</span>
						))}
						{tags && tags.length > 3 && (
							<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
								+{tags.length - 3} more
							</span>
						)}
					</div>
				)}

				{/* Location and Availability */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 text-gray-600">
						<MapPin className="h-4 w-4" />
						<span className="text-sm">{location}</span>
					</div>
					<span
						className={`px-3 py-1.5 text-sm font-semibold rounded-lg ${getAvailabilityColor(
							availability
						)}`}
					>
						{availability.toUpperCase()}
					</span>
				</div>

				{/* Action Button */}
				<Button
					shape="rounded"
					className="w-full font-medium"
					onClick={() => onViewDetails?.(id)}
				>
					View Details
				</Button>
			</CardContent>
		</Card>
	);
}
