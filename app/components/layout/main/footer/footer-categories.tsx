import Link from "next/link";

interface CategoryLink {
	name: string;
	href: string;
}

export const FooterCategories = () => {
	// Common categories that might be available in the system
	const categories: CategoryLink[] = [
		{
			name: "Workshop",
			href: "/events?category=Workshop"
		},
		{
			name: "Conference",
			href: "/events?category=Conference"
		},
		{
			name: "Seminar",
			href: "/events?category=Seminar"
		},
		{
			name: "Competition",
			href: "/events?category=Competition"
		}
	];

	return (
		<div>
			<h4 className="font-medium text-xl text-[#F9F9F6] mb-3">
				Categories
			</h4>
			<ul className="space-y-2 text-base text-[#F9F9F6]">
				{categories.map((category) => (
					<li key={category.name}>
						<Link
							href={category.href}
							className="hover:text-primary transition-colors"
						>
							{category.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
