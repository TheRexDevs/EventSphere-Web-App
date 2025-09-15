"use client";

import Image from "next/image";
import { Event } from "@/types/events";

interface GalleryImageCardProps {
	event: Event;
	onImageClick: (event: Event) => void;
}

export default function GalleryImageCard({ event, onImageClick }: GalleryImageCardProps) {
	// Extract the image URL from featured_image object
	const imageUrl = event.featured_image?.url || "";

	// Format event date for display
	const eventDate = new Date(event.date);
	const formattedDate = eventDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<div
			className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
			onClick={() => onImageClick(event)}
		>
			{/* Image Container */}
			<div className="relative aspect-[4/3] w-full">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={`${event.title} - ${event.category}`}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
						<div className="text-white text-center">
							<div className="text-4xl mb-2">🎪</div>
							<div className="text-sm font-medium">No Image</div>
						</div>
					</div>
				)}

				{/* Overlay with event info */}
				<div className="absolute inset-0 bg-black/60 lg:bg-black/0 group-hover:lg:bg-black/50 transition-all duration-300 flex items-end">
					<div className="p-4 text-white transform lg:translate-y-full group-hover:lg:translate-y-0 transition-transform duration-300">
						<h3 className="text-lg font-semibold mb-1">
							{event.title}
						</h3>
						<p className="text-sm opacity-90 mb-1">
							{event.category}
						</p>
						<p className="text-xs opacity-75">{formattedDate}</p>
						<p className="text-xs opacity-75 mt-1">
							{event.gallery_images?.length || 0} photos
						</p>
					</div>
				</div>

				{/* Photo count indicator */}
				<div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
					{event.gallery_images?.length || 0}
				</div>
			</div>
		</div>
	);
}
