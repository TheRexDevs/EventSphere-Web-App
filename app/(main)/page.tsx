"use client";

import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, TrendingUp, Package, ShoppingCart } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
const Overview = () => {
	return (
		<section>
			<section
				style={{
					backgroundImage: `url('/landingpage.jpg')`,
				}}
				className="relative h-[480px] w-full bg-cover bg-center bg-no-repeat bottom-4 m-auto cursor-pointer max-md:h-[300px] max-md:w-full"
			>
				<div className="absolute inset-0 bg-black opacity-45 z-0"></div>

				<div className="absolute inset-0 z-10 text-white py-20">
					<div>
						<h1 className="text-[49px] font-bold text-center">
							Discover Amazing Campus Events
						</h1>
						<p className="text-center text-[19px]">
							Join Thousands Of Students In Creating Unforgettable
							Memories
						</p>
					</div>

					<div className="!bg-white rounded-2xl relative">
						<Input placeholder="Search Events, Categories" />
					</div>
				</div>
			</section>
		</section>
	);
};

export default Overview;
