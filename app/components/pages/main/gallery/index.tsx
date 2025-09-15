"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/app/components/common/hero";
import { getEvents, getEventCategories } from "@/lib/api/events";
import { Event, EventCategory } from "@/types/events";
import { ApiError } from "@/lib/utils/api";
import { showToast } from "@/lib/utils/toast";

// Import gallery components
import GalleryImageCard from "./gallery-image-card";
import ImageModal from "./image-modal";
import GalleryFilters from "./gallery-filters";
import GalleryPagination from "./gallery-pagination";

const GalleryPage = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [categories, setCategories] = useState<EventCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Modal state
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Filter state
	const [filters, setFilters] = useState({
		category: "All Categories",
		year: "All Years",
	});

	// Load categories on mount
	useEffect(() => {
		const loadCategories = async () => {
			try {
				const cats = await getEventCategories();
				setCategories(cats);
			} catch (error) {
				console.error("Failed to load categories:", error);
			}
		};

		loadCategories();
	}, []);

	// Load events when filters or page changes
	useEffect(() => {
		loadEvents(currentPage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, currentPage]);

	const loadEvents = async (page: number = 1) => {
		try {
			setIsLoading(true);

			// Build API parameters
			const params: {
				page: number;
				per_page: number;
				category_id?: string;
			} = {
				page,
				per_page: 12, // Show 12 events per page for gallery view
			};

			// Apply category filter
			if (filters.category !== "All Categories") {
				const category = categories.find(cat => cat.name === filters.category);
				if (category) {
					params.category_id = category.id;
				}
			}

			// For now, we'll load all events and filter by year on the client side
			// In a production app, you'd want to implement year filtering on the backend
			const response = await getEvents(params);

			// Apply year filtering on client side (temporary solution)
			let filteredEvents = response.events;
			if (filters.year !== "All Years") {
				filteredEvents = response.events.filter(event => {
					const eventYear = new Date(event.date).getFullYear().toString();
					return eventYear === filters.year;
				});

				// If client-side filtering reduced results, we might need to adjust pagination
				// For now, we'll keep it simple and just show what's available
			}

			setEvents(filteredEvents);
			setTotalPages(response.total_pages);

		} catch (error) {
			console.error("Failed to load events:", error);
			if (error instanceof ApiError) {
				showToast.error(error.message);
			} else {
				showToast.error("Failed to load gallery");
			}
			setEvents([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFilterChange = (filterType: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[filterType]: value,
		}));
		setCurrentPage(1); // Reset to first page when filters change
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleImageClick = (event: Event) => {
		// Only open modal if the event has images
		const hasImages = event.featured_image?.url ||
			(event.gallery_images && event.gallery_images.length > 0);

		if (hasImages) {
			setSelectedEvent(event);
			setIsModalOpen(true);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	return (
		<>
			{/* Hero Section */}
			<HeroSection
				title="Event Gallery"
				subtitle="Memories from our amazing events"
				backgroundImageUrl="/hero-3.jpg"
				height="330px"
			/>

			{/* Filter Section */}
			<GalleryFilters
				categories={categories}
				selectedCategory={filters.category}
				selectedYear={filters.year}
				onCategoryChange={(value) => handleFilterChange("category", value)}
				onYearChange={(value) => handleFilterChange("year", value)}
			/>

			{/* Gallery Section */}
			<div className="w-site mx-auto space-y-4">
				<section className="py-12">
					<div className="w-site mx-auto px-4">
						{/* Loading State */}
						{isLoading ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{Array.from({ length: 12 }).map((_, index) => (
									<div key={index} className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse" />
								))}
							</div>
						) : (
							<>
								{/* Gallery Grid */}
								{events.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
										{events.map((event) => (
											<GalleryImageCard
												key={event.id}
												event={event}
												onImageClick={handleImageClick}
											/>
										))}
									</div>
								) : (
									/* No Events State */
									<div className="text-center py-16">
										<h3 className="text-xl font-semibold text-gray-900 mb-2">
											No events found
										</h3>
										<p className="text-gray-600">
											Try adjusting your filters to see more events.
										</p>
									</div>
								)}

								{/* Pagination */}
								{events.length > 0 && (
									<GalleryPagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
									/>
								)}
							</>
						)}
					</div>
				</section>
			</div>

			{/* Image Modal */}
			<ImageModal
				event={selectedEvent}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	);
}

export default GalleryPage