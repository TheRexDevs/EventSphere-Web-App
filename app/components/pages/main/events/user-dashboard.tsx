"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	Calendar,
	Clock,
	MapPin,
	User,
	Users,
	Trophy,
	Download,
	Settings,
	Image as ImageIcon,
	AlertCircle,
	Loader2,
	ChevronRight
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

import { useAuth } from "@/app/contexts/AuthContext";
import { getUserRegistrations } from "@/lib/api/events";
import { EventRegistration } from "@/types/events";
import { ApiError } from "@/lib/utils/api";
import { showToast } from "@/lib/utils/toast";

const UserDashboard = () => {
	const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("overview");

	const router = useRouter();
	const { user } = useAuth();

	const loadRegistrations = async () => {
		try {
			setIsLoading(true);
			const response = await getUserRegistrations();
			setRegistrations(response.registrations);
		} catch (error) {
			console.error("Failed to load registrations:", error);
			if (error instanceof ApiError) {
				showToast.error(error.message);
			} else {
				showToast.error("Failed to load your registrations");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadRegistrations();
	}, []);

	// Map backend statuses to UI groupings
	const isUpcoming = (status: string) => status === "approved" || status === "pending";
	const isPast = (status: string) => status === "rejected";

	const upcomingEvents = registrations.filter(reg =>
		isUpcoming(reg.event.status) && reg.status === "confirmed"
	);

	const pastEvents = registrations.filter(reg =>
		isPast(reg.event.status) && reg.status === "confirmed"
	);

	const waitlistedEvents = registrations.filter(reg =>
		reg.status === "waitlist"
	);

	const handleViewEvent = (eventId: string) => {
		router.push(`/events/${eventId}`);
	};

	const handleGoToProfile = () => {
		router.push("/account");
	};

	const handleGoToGallery = () => {
		router.push("/gallery");
	};

	const handleGoToEvents = () => {
		router.push("/events");
	};

	if (!user) {
		return (
			<div className="w-site mx-auto py-8">
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						Please sign in to view your dashboard.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<div className="w-site mx-auto py-8 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Welcome back, {user.firstname}!
					</h1>
					<p className="text-gray-600 mt-1">
						Manage your events and track your participation
					</p>
				</div>
				<div className="flex gap-3">
					<Button variant="outline" onClick={handleGoToProfile}>
						<Settings className="h-4 w-4 mr-2" />
						Profile Settings
					</Button>
					<Button variant="outline" onClick={handleGoToGallery}>
						<ImageIcon className="h-4 w-4 mr-2" />
						Gallery
					</Button>
				</div>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Registered Events</p>
								<p className="text-2xl font-bold text-gray-900">
									{registrations.filter(r => r.status === "confirmed").length}
								</p>
							</div>
							<Calendar className="h-8 w-8 text-blue-600" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Upcoming Events</p>
								<p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
							</div>
							<Clock className="h-8 w-8 text-green-600" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Past Events</p>
								<p className="text-2xl font-bold text-gray-900">{pastEvents.length}</p>
							</div>
							<Trophy className="h-8 w-8 text-yellow-600" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Waitlisted</p>
								<p className="text-2xl font-bold text-gray-900">{waitlistedEvents.length}</p>
							</div>
							<Users className="h-8 w-8 text-orange-600" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Main Content Tabs */}
			<div className="space-y-6">
				{/* Tab Navigation */}
				<div className="flex gap-2 border-b">
					{[
						{ id: "overview", label: "Overview" },
						{ id: "upcoming", label: "Upcoming" },
						{ id: "past", label: "Past Events" },
						{ id: "waitlist", label: "Waitlist" }
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
								activeTab === tab.id
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-600 hover:text-gray-900"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Overview Tab */}
				{activeTab === "overview" && (
					<div className="space-y-6">
					{/* Quick Actions */}
					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<Button
									onClick={handleGoToEvents}
									className="flex items-center gap-2 h-auto p-4"
									variant="outline"
								>
									<Calendar className="h-5 w-5" />
									<div className="text-left">
										<p className="font-medium">Browse Events</p>
										<p className="text-sm text-gray-600">Find new events to attend</p>
									</div>
								</Button>

								<Button
									onClick={handleGoToProfile}
									className="flex items-center gap-2 h-auto p-4"
									variant="outline"
								>
									<User className="h-5 w-5" />
									<div className="text-left">
										<p className="font-medium">Update Profile</p>
										<p className="text-sm text-gray-600">Manage your information</p>
									</div>
								</Button>

								<Button
									onClick={handleGoToGallery}
									className="flex items-center gap-2 h-auto p-4"
									variant="outline"
								>
									<ImageIcon className="h-5 w-5" />
									<div className="text-left">
										<p className="font-medium">View Gallery</p>
										<p className="text-sm text-gray-600">Browse event memories</p>
									</div>
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Recent Activity */}
					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
						</CardHeader>
						<CardContent>
							{isLoading ? (
								<div className="flex items-center justify-center py-8">
									<Loader2 className="h-6 w-6 animate-spin text-gray-600" />
								</div>
							) : registrations.length === 0 ? (
								<div className="text-center py-8">
									<p className="text-gray-600">No activity yet. Start by registering for events!</p>
									<Button onClick={handleGoToEvents} className="mt-4">
										Browse Events
									</Button>
								</div>
							) : (
								<div className="space-y-4">
									{registrations.slice(0, 5).map((registration) => (
										<div
											key={registration.id}
											className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
										>
											<div className="flex items-center gap-4">
												<div className={`w-3 h-3 rounded-full ${
													registration.status === "confirmed"
														? "bg-green-500"
														: registration.status === "waitlist"
														? "bg-yellow-500"
														: "bg-red-500"
												}`} />
												<div>
													<p className="font-medium">{registration.event.title}</p>
													<p className="text-sm text-gray-600">
														{new Date(registration.event.date).toLocaleDateString()} • {registration.event.venue}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<span className={`px-2 py-1 rounded-full text-xs font-medium ${
													registration.status === "confirmed"
														? "bg-green-100 text-green-800"
														: registration.status === "waitlist"
														? "bg-yellow-100 text-yellow-800"
														: "bg-red-100 text-red-800"
												}`}>
													{registration.status}
												</span>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleViewEvent(registration.event.id)}
												>
													<ChevronRight className="h-4 w-4" />
												</Button>
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
					</div>
				)}

				{/* Upcoming Events Tab */}
				{activeTab === "upcoming" && (
					<div className="space-y-6">
					{isLoading ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="h-8 w-8 animate-spin text-gray-600" />
						</div>
					) : upcomingEvents.length === 0 ? (
						<Card>
							<CardContent className="pt-6">
								<div className="text-center py-8">
									<Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<p className="text-gray-600 mb-4">No upcoming events registered</p>
									<Button onClick={handleGoToEvents}>Browse Available Events</Button>
								</div>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{upcomingEvents.map((registration) => (
								<EventCard
									key={registration.id}
									registration={registration}
									onViewEvent={handleViewEvent}
								/>
							))}
						</div>
					)}
					</div>
				)}

				{/* Past Events Tab */}
				{activeTab === "past" && (
					<div className="space-y-6">
					{isLoading ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="h-8 w-8 animate-spin text-gray-600" />
						</div>
					) : pastEvents.length === 0 ? (
						<Card>
							<CardContent className="pt-6">
								<div className="text-center py-8">
									<Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<p className="text-gray-600">No past events yet</p>
								</div>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{pastEvents.map((registration) => (
								<EventCard
									key={registration.id}
									registration={registration}
									onViewEvent={handleViewEvent}
									showCertificate={true}
								/>
							))}
						</div>
					)}
					</div>
				)}

				{/* Waitlist Tab */}
				{activeTab === "waitlist" && (
					<div className="space-y-6">
					{isLoading ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="h-8 w-8 animate-spin text-gray-600" />
						</div>
					) : waitlistedEvents.length === 0 ? (
						<Card>
							<CardContent className="pt-6">
								<div className="text-center py-8">
									<Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<p className="text-gray-600">{"You're not on any waitlists"}</p>
								</div>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{waitlistedEvents.map((registration) => (
								<EventCard
									key={registration.id}
									registration={registration}
									onViewEvent={handleViewEvent}
								/>
							))}
						</div>
					)}
					</div>
				)}
			</div>
		</div>
	);
};

// Event Card Component for Dashboard
interface EventCardProps {
	registration: EventRegistration;
	onViewEvent: (eventId: string) => void;
	showCertificate?: boolean;
}

const EventCard = ({ registration, onViewEvent, showCertificate = false }: EventCardProps) => {
	const { event } = registration;
	const eventDate = new Date(event.date);
	const formattedDate = eventDate.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardContent className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<h3 className="font-semibold text-lg text-gray-900 mb-1">
							{event.title}
						</h3>
						<p className="text-sm text-gray-600 mb-2">{event.category}</p>
					</div>
					<span className={`px-2 py-1 rounded-full text-xs font-medium ${
						registration.status === "confirmed"
							? "bg-green-100 text-green-800"
							: registration.status === "waitlist"
							? "bg-yellow-100 text-yellow-800"
							: "bg-red-100 text-red-800"
					}`}>
						{registration.status}
					</span>
				</div>

				<div className="space-y-2 mb-4">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<Calendar className="h-4 w-4" />
						<span>{formattedDate}</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<Clock className="h-4 w-4" />
						<span>{event.time}</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<MapPin className="h-4 w-4" />
						<span>{event.venue}</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => onViewEvent(event.id)}
						>
							View Details
						</Button>
						{showCertificate && (
							<Button variant="outline" size="sm">
								<Download className="h-4 w-4 mr-1" />
								Certificate
							</Button>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserDashboard;
