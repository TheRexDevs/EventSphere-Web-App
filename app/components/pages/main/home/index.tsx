"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import Counter from "@/app/components/common/counter";
import HeroSection from "@/app/components/common/hero";
import { getEvents } from "@/lib/api/events";
import { Event } from "@/types/events";
import { useEffect, useState } from "react";
import { ApiError } from "@/lib/utils/api";
import { showToast } from "@/lib/utils/toast";
import EventCard, {
	EventCardSkeleton,
	convertEventToEventData,
} from "@/app/components/common/event-card";
import { Sitemap } from "./site-map";

const HomePage = () => {
	const router = useRouter();
	const { isLoading } = useAuth();
	const [featured, setFeatured] = useState<Event[]>([]);
	const [loadingFeatured, setLoadingFeatured] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				setLoadingFeatured(true);
				const res = await getEvents({ page: 1, per_page: 6 });
				setFeatured(res.events.slice(0, 6));
			} catch (error) {
				if (error instanceof ApiError) showToast.error(error.message);
			} finally {
				setLoadingFeatured(false);
			}
		};
		load();
	}, []);

	if (isLoading) {
		return (
			<div className="w-site space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-3xl font-bold text-gray-900">
						Loading...
					</h1>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Hero Section using shared component */}
			<HeroSection
				title="Discover Amazing Campus events"
				subtitle="Join thousand of students in creating unforgettable memories"
				height="50svh"
				alignment="center"
				backgroundImageUrl="/hero-1.jpg"
			/>

			{/* Counters Section */}
			<section className="py-12 pb-8 bg-white">
				<div className="w-site">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<Counter end={150} suffix="+" label="Active users" />
						<Counter
							end={25000}
							suffix="+"
							label="Students joined"
						/>
						<Counter
							end={500}
							suffix="+"
							label="Events this year"
						/>
						<Counter end={50} suffix="+" label="Organizers" />
					</div>
				</div>
			</section>

			<div className="w-site space-y-16">
				{/* Featured Events */}
				<section className="space-y-12 py-16">
					<div className="text-center space-y-2">
						<h2 className="text-2xl md:text-3xl font-bold">
							Featured event
						</h2>
						<p className="text-gray-600 text-base lg:text-lg">
							Don’t Miss THis Amazing Upcoming Events
				</p>
			</div>

					{loadingFeatured ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 6 }).map((_, i) => (
								<EventCardSkeleton key={i} />
							))}
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{featured.slice(0, 6).map((ev) => (
								<EventCard
									key={ev.id}
									event={convertEventToEventData(ev)}
									onViewDetails={(id) =>
										router.push(`/events/${id}`)
									}
									detailed={false}
								/>
							))}
						</div>
					)}
				</section>
			</div>

			{/* Sitemap Section */}
			<Sitemap />
		</>
	);
};

export default HomePage;
