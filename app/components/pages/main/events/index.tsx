"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import HeroSection from "@/app/components/common/hero";
import EventCard, { EventCardSkeleton, convertEventToEventData } from "@/app/components/common/event-card";

import { useRouter } from "next/navigation";

// Removed unused imports
import type { ListEventsRequest } from "@/types/events";
import { getEvents, getEventCategories } from "@/lib/api/events";
import { Event, EventCategory } from "@/types/events";
import { ApiError } from "@/lib/utils/api";
import { showToast } from "@/lib/utils/toast";

// Dynamic filter options
const getFilterOptions = (categories: EventCategory[]) => ({
	categories: ["All categories", ...categories.map(cat => cat.name)],
	dates: ["All Dates", "Today", "This Week", "This Month", "Next Month"],
	status: ["All Events", "Ongoing", "Coming Soon", "Ended"],
	departments: ["All Departments", "Arts", "Business", "Technology", "Science"],
});

const EventsPage = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [categories, setCategories] = useState<EventCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const [filters, setFilters] = useState({
		category: "All categories",
		date: "All Dates",
		status: "All Events",
		department: "All Departments",
	});

	const router = useRouter();
	// const { user } = useAuth();

	const handleFilterChange = (filterType: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[filterType]: value,
		}));
		// Reset pagination when filters change
		setCurrentPage(1);
		setHasMore(true);
	};

	const handleViewDetails = (eventId: string) => {
		router.push(`/events/${eventId}`);
	};

	// Load events based on current filters and pagination
	const loadEvents = async (page: number = 1, append: boolean = false) => {
		try {
			if (page === 1) {
				setIsLoading(true);
			} else {
				setIsLoadingMore(true);
			}

			const params: { page: number; per_page: number; category_id?: string; status?: string } = {
				page,
				per_page: 20,
			};

			// Apply filters
			if (filters.category !== "All categories") {
				// Find category ID by name
				const category = categories.find(cat => cat.name === filters.category);
				if (category) {
					params.category_id = category.id;
				}
			}

			if (filters.status !== "All Events") {
				const statusMap: { [key: string]: "ongoing" | "coming-soon" | "ended" } = {
					"Ongoing": "ongoing",
					"Coming Soon": "coming-soon",
					"Ended": "ended"
				};
				params.status = statusMap[filters.status];
			}

			// Ensure status is one of the allowed union or undefined
			const response = await getEvents(params as ListEventsRequest);

			if (append) {
				setEvents(prev => [...prev, ...response.events]);
			} else {
				setEvents(response.events);
			}

			setHasMore(page < response.total_pages);
			setCurrentPage(page);

		} catch (error) {
			console.error("Failed to load events:", error);
			if (error instanceof ApiError) {
				showToast.error(error.message);
			} else {
				showToast.error("Failed to load events");
			}
		} finally {
			setIsLoading(false);
			setIsLoadingMore(false);
		}
	};

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

	// Load events when filters change
	useEffect(() => {
		loadEvents(1, false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, categories]); // categories dependency ensures we wait for categories to load

	const handleLoadMore = () => {
		if (hasMore && !isLoadingMore) {
			loadEvents(currentPage + 1, true);
		}
	};

	return (
		<>
			{/* Hero Section */}
			<HeroSection
				title="All Events"
				subtitle="Discover and join events that match your interest"
				backgroundImageUrl="/hero-2.jpg"
				height="330px"
			/>

			{/* Filter Section */}
			<section className="bg-card py-8">
				<div className="w-site mx-auto space-y-4">
					<div className="flex flex-wrap gap-6 items-center justify-between">
						{/* Category Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-foreground/80">
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
									{getFilterOptions(categories).categories.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Date Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-foreground/80">
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
									{getFilterOptions(categories).dates.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Status Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-foreground/80">
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
									{getFilterOptions(categories).status.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Department Filter */}
						<div className="flex gap-4 items-center">
							<label className="text-sm font-medium text-foreground/80">
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
									{getFilterOptions(categories).departments.map((option) => (
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
						{/* Loading State */}
						{isLoading ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{Array.from({ length: 6 }).map((_, index) => (
									<EventCardSkeleton key={index} />
								))}
							</div>
						) : (
							<>
								{/* Events Grid */}
								{events.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
										{events.map((event) => (
								<EventCard
									key={event.id}
												event={convertEventToEventData(event)}
									onViewDetails={handleViewDetails}
								/>
							))}
						</div>
								) : (
									/* No Events State */
							<div className="text-center py-16">
								<h3 className="text-xl font-semibold text-foreground mb-2">
									No events found
								</h3>
								<p className="text-foreground/70">
									Try adjusting your filters or check back
									later for new events.
								</p>
							</div>
								)}

								{/* Load More Button */}
								{hasMore && events.length > 0 && (
									<div className="flex justify-center mt-8">
										<Button
											onClick={handleLoadMore}
											disabled={isLoadingMore}
											variant="outline"
											size="lg"
										>
											{isLoadingMore ? "Loading..." : "Load More Events"}
										</Button>
									</div>
								)}

								{/* Loading more skeleton */}
								{isLoadingMore && (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
										{Array.from({ length: 3 }).map((_, index) => (
											<EventCardSkeleton key={`loading-${index}`} />
										))}
									</div>
								)}
							</>
						)}
					</div>
				</section>
			</div>
		</>
	);
}

export default EventsPage;
