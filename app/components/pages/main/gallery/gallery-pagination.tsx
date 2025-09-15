"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from "@/app/components/ui/pagination";

interface GalleryPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function GalleryPagination({
	currentPage,
	totalPages,
	onPageChange,
}: GalleryPaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	const generatePageNumbers = () => {
		const pages = [];
		const delta = 2; // Number of pages to show around current page

		// Always show first page
		if (1 < currentPage - delta) {
			pages.push(1);
			if (2 < currentPage - delta) {
				pages.push('ellipsis-start');
			}
		}

		// Show pages around current page
		for (
			let i = Math.max(1, currentPage - delta);
			i <= Math.min(totalPages, currentPage + delta);
			i++
		) {
			pages.push(i);
		}

		// Always show last page
		if (totalPages > currentPage + delta) {
			if (totalPages - 1 > currentPage + delta) {
				pages.push('ellipsis-end');
			}
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = generatePageNumbers();

	return (
		<Pagination className="mt-8">
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious
						onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
						className={
							currentPage <= 1
								? "pointer-events-none opacity-50"
								: "cursor-pointer"
						}
					/>
				</PaginationItem>

				{/* Page Numbers */}
				{pageNumbers.map((page, index) => (
					<PaginationItem key={index}>
						{page === 'ellipsis-start' || page === 'ellipsis-end' ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								onClick={() => onPageChange(page as number)}
								isActive={page === currentPage}
								className="cursor-pointer"
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				{/* Next Button */}
				<PaginationItem>
					<PaginationNext
						onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
						className={
							currentPage >= totalPages
								? "pointer-events-none opacity-50"
								: "cursor-pointer"
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
