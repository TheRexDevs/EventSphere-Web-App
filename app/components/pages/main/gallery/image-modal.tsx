"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/types/events";

interface ImageModalProps {
	event: Event | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function ImageModal({ event, isOpen, onClose }: ImageModalProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Get all images for the slideshow (featured + gallery images)
	const getAllImages = (event: Event) => {
		const images = [];

		// Add featured image first
		if (event.featured_image?.url) {
			images.push({
				url: event.featured_image.url,
				filename: event.featured_image.filename,
				type: 'featured'
			});
		}

		// Add gallery images
		if (event.gallery_images) {
			event.gallery_images.forEach(img => {
				if (img.url) {
					images.push({
						url: img.url,
						filename: img.filename,
						type: 'gallery'
					});
				}
			});
		}

		return images;
	};

	const images = event ? getAllImages(event) : [];
	const totalImages = images.length;

	// Navigation functions
	const goToPrevious = useCallback(() => {
		setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
	}, [totalImages]);

	const goToNext = useCallback(() => {
		setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
	}, [totalImages]);

	// Reset to first image when modal opens with new event
	useEffect(() => {
		if (isOpen && event) {
			setCurrentImageIndex(0);
		}
	}, [isOpen, event]);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			switch (e.key) {
				case 'ArrowLeft':
					goToPrevious();
					break;
				case 'ArrowRight':
					goToNext();
					break;
				case 'Escape':
					onClose();
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, currentImageIndex, totalImages, goToPrevious, goToNext, onClose]);

	const goToImage = (index: number) => {
		setCurrentImageIndex(index);
	};

	if (!isOpen || !event || totalImages === 0) {
		return null;
	}

	const currentImage = images[currentImageIndex];
	const eventDate = new Date(event.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90">
			{/* Close Button */}
			<button
				onClick={onClose}
				className="absolute top-4 right-4 z-[110] p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
				aria-label="Close gallery"
			>
				<X size={24} />
			</button>

			{/* Main Content */}
			<div className="relative w-full h-full flex items-center justify-center p-4">
				{/* Navigation Arrows */}
				{totalImages > 1 && (
					<>
						<button
							onClick={goToPrevious}
							className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors z-[110]"
							aria-label="Previous image"
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={goToNext}
							className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors z-[110]"
							aria-label="Next image"
						>
							<ChevronRight size={24} />
						</button>
					</>
				)}

				{/* Image Display */}
				<div className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center">
					<Image
						src={currentImage.url}
						alt={`${event.title} - Image ${currentImageIndex + 1}`}
						fill
						className="object-contain"
						sizes="100vw"
						priority
					/>
				</div>

				{/* Event Info and Navigation */}
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6">
					{/* Event Details */}
					<div className="text-white mb-4">
						<h2 className="text-xl font-semibold mb-1">
							{event.title}
						</h2>
						<p className="text-sm opacity-90">
							{event.category} • {eventDate}
						</p>
						<p className="text-sm opacity-75">{event.venue}</p>
					</div>

					{/* Image Counter and Thumbnails */}
					{totalImages > 1 && (
						<div className="flex items-center justify-between">
							{/* Image Counter */}
							<div className="text-white text-sm">
								{currentImageIndex + 1} of {totalImages}
								{currentImage.type === "featured" && (
									<span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded">
										Featured
									</span>
								)}
							</div>

							{/* Thumbnail Navigation */}
							<div className="flex space-x-2 overflow-x-auto max-w-md">
								{images.slice(0, 10).map((img, index) => (
									<button
										key={index}
										onClick={() => goToImage(index)}
										className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden ${
											index === currentImageIndex
												? "border-white"
												: "border-gray-500 hover:border-gray-300"
										}`}
									>
										<Image
											src={img.url}
											alt={`Thumbnail ${index + 1}`}
											width={48}
											height={48}
											className="object-cover w-full h-full"
										/>
									</button>
								))}
								{totalImages > 10 && (
									<div className="flex-shrink-0 w-12 h-12 bg-black bg-opacity-50 text-white rounded flex items-center justify-center text-xs">
										+{totalImages - 10}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
