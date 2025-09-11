"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import ConfirmDialog from "@/app/components/ui/confirm-dialog";
import { Plus } from "lucide-react";

import { Skeleton } from "@/app/components/ui/skeleton";

function EventCardSkeleton() {
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="space-y-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<Skeleton className="w-12 h-12 rounded-lg" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-4 w-48" />
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-6 w-20 rounded-full" />
					<Skeleton className="h-6 w-20 rounded-full" />
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					{[1, 2, 3].map((i) => (
						<div key={i} className="flex justify-between">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-10" />
						</div>
					))}
				</div>
				<div className="pt-4 space-y-2">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</CardContent>
		</Card>
	);
}

const EventsPage = () => {
	const router = useRouter();
	useAuth();



	return (
		<>
			<div className="w-site mx-auto">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Our Events
						</h1>
						<p className="text-gray-600 mt-2">
							Browse through available events
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center text-center py-16">
					<div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
						<Plus className="h-12 w-12 text-gray-400" />
					</div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-4">
						No Events yet
					</h2>
					<p className="text-gray-600 mb-8 max-w-md mx-auto">
						Check Back later or contact an admin
					</p>
				</div>
			</div>
		</>
	);
}

export default EventsPage;
