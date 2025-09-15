"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { EventCategory } from "@/types/events";

interface GalleryFiltersProps {
	categories: EventCategory[];
	selectedCategory: string;
	selectedYear: string;
	onCategoryChange: (category: string) => void;
	onYearChange: (year: string) => void;
}

// Generate year options (current year back to 5 years ago)
const generateYearOptions = () => {
	const currentYear = new Date().getFullYear();
	const years = ["All Years"];

	for (let i = 0; i < 5; i++) {
		years.push((currentYear - i).toString());
	}

	return years;
};

export default function GalleryFilters({
	categories,
	selectedCategory,
	selectedYear,
	onCategoryChange,
	onYearChange,
}: GalleryFiltersProps) {
	const yearOptions = generateYearOptions();

	return (
		<section className="bg-white py-8">
			<div className="w-site mx-auto space-y-4">
				<div className="flex flex-wrap gap-6 items-center justify-center">
					{/* Category Filter */}
					<div className="flex gap-4 items-center">
						<label className="text-sm font-medium text-gray-700">
							Category
						</label>
						<Select
							value={selectedCategory}
							onValueChange={onCategoryChange}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="All Categories">All Categories</SelectItem>
								{categories.map((category) => (
									<SelectItem key={category.id} value={category.name}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Year Filter */}
					<div className="flex gap-4 items-center">
						<label className="text-sm font-medium text-gray-700">
							Year
						</label>
						<Select
							value={selectedYear}
							onValueChange={onYearChange}
						>
							<SelectTrigger className="w-[150px]">
								<SelectValue placeholder="Select year" />
							</SelectTrigger>
							<SelectContent>
								{yearOptions.map((year) => (
									<SelectItem key={year} value={year}>
										{year}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Active Filters Display */}
				{(selectedCategory !== "All Categories" || selectedYear !== "All Years") && (
					<div className="flex items-center justify-center gap-4 text-sm text-gray-600">
						<span>Active filters:</span>
						{selectedCategory !== "All Categories" && (
							<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
								Category: {selectedCategory}
							</span>
						)}
						{selectedYear !== "All Years" && (
							<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
								Year: {selectedYear}
							</span>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
