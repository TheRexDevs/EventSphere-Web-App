"use client";

import React from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";
import FeaturedEvents from "../events/FeaturedEvents";
import Counter from "@/app/components/common/Counter";

const IndexPage = () => {
	// We now also get `isLoading` from the useAuth hook
	const { user, isLoading } = useAuth();

	// If the authentication state is still loading, we render nothing to prevent a flash
	if (isLoading) {
		return null; // or you could return a loading spinner here
	}

	return (
		<section>
			<div className="relative h-[500px] w-full max-md:h-[300px]">
				<div className="absolute inset-0 z-0">
					<img
						src="/landingpage.jpg"
						alt="A large group of students in an auditorium."
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black opacity-30"></div>
				</div>

				{/* Content container */}
				<div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-white">
					<h1 className="text-[50px] text-center font-bold max-md:text-[30px]">
						Discover Amazing Campus Events
					</h1>
					<p className="pt-3 text-[20px] text-center font-semibold max-md:text-[15px]">
						Join Thousands Of Students In Creating Unforgettable
						Memories
					</p>

					{user && (
						<form className="mt-10 flex w-full max-w-md items-center rounded-full bg-white p-1 shadow-md">
							<Input
								placeholder="Search Events, Organizer Or Categories....."
								className="!text-black !bg-white !flex-1 !border-none !outline-none !ring-0 !shadow-none
                                !focus:outline-none !focus-visible:outline-none !focus:ring-0 !focus:border-0
                                !focus:ring-transparent !focus:ring-offset-0 !focus-visible:border-none !focus-visible:ring-0"
							/>
							{/* The updated search button is here 👇 */}
							<button
								type="submit"
								aria-label="Search"
								className="flex items-center justify-center rounded-full bg-primary p-3 transition hover:bg-primary/90"
							>
								<Search className="h-5 w-5 text-white" />
							</button>
						</form>
					)}
				</div>
			</div>

			{!user && (
				<div className="w-[70%] grid grid-cols-2 md:grid-cols-4 py-14 gap-4 m-auto">
					<div className="text-center">
						<Counter end={150} suffix="+" />
						<p className="text-[#545454] text-center">
							Active students
						</p>
					</div>

					<div className="text-center">
						<Counter end={25} suffix="k" />
						<p className="text-[#545454] text-center">
							Students Joined
						</p>
					</div>

					<div className="text-center">
						<Counter end={500} suffix="+" />
						<p className="text-[#545454] text-center">
							Events This Year
						</p>
					</div>

					<div className="text-center">
						<Counter end={50} suffix="+" />
						<p className="text-[#545454] text-center">Organizers</p>
					</div>
				</div>
			)}

			<div>
				<FeaturedEvents />
			</div>
		</section>
	);
};

export default IndexPage;
