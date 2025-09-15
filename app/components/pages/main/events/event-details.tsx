"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	MapPin,
	Calendar,
	Clock,
	Users,
	Tag,
	ArrowLeft,
	User,
	Loader2,
	AlertCircle
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
// Badge component inline
import { Separator } from "@/app/components/ui/separator";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

import { useAuth } from "@/app/contexts/AuthContext";
import { getEvent, registerForEvent, cancelEventRegistration, getEventRegistrationDetails } from "@/lib/api/events";
import { Event, EventRegistration } from "@/types/events";
import { ApiError } from "@/lib/utils/api";
import { showToast } from "@/lib/utils/toast";


interface EventDetailsPageProps {
	eventId: string;
}

const EventDetailsPage = ({ eventId }: EventDetailsPageProps) => {
	const [event, setEvent] = useState<Event | null>(null);
	const [registration, setRegistration] = useState<EventRegistration | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isRegistering, setIsRegistering] = useState(false);
	const [isCancelling, setIsCancelling] = useState(false);

	const router = useRouter();
	const { user } = useAuth();

	const loadEvent = async () => {
		try {
			setIsLoading(true);
			const eventData = await getEvent(eventId);
			
			setEvent(eventData);

			// If user is authenticated, check registration status
			if (user) {
				try {
					const regDetails = await getEventRegistrationDetails(eventId);
					setRegistration(regDetails);
				} catch {
					// User not registered, that's fine
					setRegistration(null);
				}
			}
		} catch (err: unknown) {
			console.error("Failed to load event:", err);
			if (err instanceof ApiError) {
				showToast.error(err.message);
			} else {
				showToast.error("Failed to load event details");
			}
			router.push("/events"); // Redirect back to events list
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// Intentionally depend on both eventId and user, suppress exhaustive-deps by keeping function inline
		loadEvent();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventId, user]);

	const handleRegister = async () => {
		if (!user) {
			router.push("/login");
			return;
		}

		try {
			setIsRegistering(true);
			const result = await registerForEvent(eventId);
			showToast.success(result.message);

			// Reload event and registration data
			await loadEvent();
		} catch (error) {
			console.error("Registration failed:", error);
			if (error instanceof ApiError) {
				showToast.error(error.message);
			} else {
				showToast.error("Registration failed");
			}
		} finally {
			setIsRegistering(false);
		}
	};

	const handleCancelRegistration = async () => {
		try {
			setIsCancelling(true);
			const result = await cancelEventRegistration(eventId);
			showToast.success(result.message);

			// Reload event and registration data
			await loadEvent();
		} catch (error) {
			console.error("Cancellation failed:", error);
			if (error instanceof ApiError) {
				showToast.error(error.message);
			} else {
				showToast.error("Cancellation failed");
			}
		} finally {
			setIsCancelling(false);
		}
	};

	const handleGoBack = () => {
		router.push("/events");
	};

	if (isLoading) {
		return (
			<div className="w-site mx-auto py-8">
				<div className="flex items-center justify-center min-h-[400px]">
					<Loader2 className="h-8 w-8 animate-spin text-gray-600" />
				</div>
			</div>
		);
	}

	if (!event) {
		return (
			<div className="w-site mx-auto py-8">
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						Event not found. It may have been removed or you may have an invalid link.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	const eventDate = new Date(event.date);
	const formattedDate = eventDate.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Convert time from "09:00:00" to "9:00 AM" format
	const formatTime = (timeStr: string) => {
		const [hours, minutes] = timeStr.split(':');
		const hour = parseInt(hours);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour % 12 || 12;
		return `${displayHour}:${minutes} ${ampm}`;
	};

	// Map API status to display status
	const mapStatus = (apiStatus: string): "ongoing" | "coming-soon" | "ended" => {
		switch (apiStatus) {
			case "approved":
				return "coming-soon";
			case "pending":
				return "coming-soon";
			case "rejected":
				return "ended";
			default:
				return "coming-soon";
		}
	};

	// Provide fallbacks for potentially null/undefined fields
	const eventStatus = mapStatus(event.status || "approved");
	const maxParticipants = event.max_participants || 0;
	const capacity = event.capacity || 0;
	const organizerName = event.organizer?.full_name || "Event Organizer";
	const galleryImages = event.gallery_images || [];
	const formattedTime = formatTime(event.time);

	// Extract featured image URL from EventImage object
	const featuredImage = event.featured_image?.url ?? "";

	// Extract gallery image URLs from EventImage objects
	const galleryUrls: string[] = galleryImages
		.map((img) => img.url)
		.filter((url): url is string => typeof url === "string" && url.trim().length > 0);

	const isRegistered = registration?.status === "confirmed" || registration?.status === "waitlist";
	const canRegister = maxParticipants > 0 && !isRegistered;
	const canCancel = isRegistered && registration?.status === "confirmed";

	return (
		<div className="w-site mx-auto py-8 space-y-6">
			{/* Back Button */}
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					onClick={handleGoBack}
					className="flex items-center gap-2"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Events
				</Button>
			</div>

			{/* Event Hero Section */}
			<Card className="overflow-hidden !py-0">
				<div className="relative h-64 md:h-80">
					{featuredImage ? (
						<Image
							src={featuredImage}
							alt={event.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
							<div className="text-white text-center">
								<div className="text-6xl mb-2">🎪</div>
								<div className="text-xl font-bold">{event.title}</div>
							</div>
						</div>
					)}
					<div className="absolute inset-0 bg-black/50" />
					<div className="absolute inset-0 flex items-center">
						<div className="w-site mx-auto px-4 text-white">
							<div className="max-w-4xl">
								<div className="flex items-center gap-2 mb-4">
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											eventStatus === "ongoing"
												? "bg-green-100 text-green-800"
												: "bg-blue-100 text-blue-800"
										}`}
									>
										{eventStatus
											.replace("-", " ")
											.toUpperCase()}
									</span>
									<span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
										{event.category}
									</span>
								</div>
								<h1 className="text-3xl md:text-4xl font-bold mb-4">
									{event.title}
								</h1>
								<div className="flex flex-wrap items-center gap-6 text-sm">
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4" />
										<span>{formattedDate}</span>
									</div>
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4" />
										<span>{formattedTime}</span>
									</div>
									<div className="flex items-center gap-2">
										<MapPin className="h-4 w-4" />
										<span>{event.venue}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>

			{/* Registration Status & Actions */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							{user ? (
								isRegistered ? (
									<div className="flex items-center gap-2">
										<div
											className={`w-3 h-3 rounded-full ${
												registration?.status ===
												"confirmed"
													? "bg-green-500"
													: "bg-yellow-500"
											}`}
										/>
										<span className="font-medium">
											{registration?.status ===
											"confirmed"
												? "You're registered for this event"
												: "You're on the waitlist"}
										</span>
									</div>
								) : (
									<span className="text-gray-600">
										{"You're not registered for this event"}
									</span>
								)
							) : (
								<span className="text-gray-600">
									Sign in to register for this event
								</span>
							)}
						</div>

						<div className="flex gap-3">
							{user ? (
								<>
									{canRegister && (
										<Button
											onClick={handleRegister}
											disabled={isRegistering}
											className="flex items-center gap-2"
										>
											{isRegistering ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												<User className="h-4 w-4" />
											)}
											{isRegistering
												? "Registering..."
												: "Register Now"}
										</Button>
									)}

									{canCancel && (
										<Button
											variant="outline"
											onClick={handleCancelRegistration}
											disabled={isCancelling}
											className="flex items-center gap-2"
										>
											{isCancelling ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												"Cancel Registration"
											)}
										</Button>
									)}
								</>
							) : (
								<Button
									onClick={() => {
										router.push("/login");
										showToast.info(
											"Please sign in to register for events"
										);
									}}
									className="flex items-center gap-2"
								>
									<User className="h-4 w-4" />
									Sign In to Register
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Event Details */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Description */}
					<Card>
						<CardHeader>
							<CardTitle>About This Event</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-700 leading-relaxed whitespace-pre-line">
								{event.description}
							</p>
						</CardContent>
					</Card>

					{/* Event Category */}
					<Card>
						<CardHeader>
							<CardTitle>Event Category</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2">
								<span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
									<Tag className="h-3 w-3" />
									{event.category}
								</span>
							</div>
						</CardContent>
					</Card>

					{/* Gallery */}
					{galleryUrls.length > 0 && (
						<Card>
							<CardHeader>
								<CardTitle>Event Gallery</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{galleryUrls.map((url, index) => (
										<div key={index} className="relative aspect-square rounded-lg overflow-hidden">
											<Image
												src={url}
												alt={`Event image ${index + 1}`}
												fill
												className="object-cover hover:scale-105 transition-transform"
											/>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Event Info */}
					<Card>
						<CardHeader>
							<CardTitle>Event Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-3">
								<Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
								<div>
									<p className="font-medium">
										{formattedDate}
									</p>
									<p className="text-sm text-gray-600">
										Date
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex items-center gap-3">
								<Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />
								<div>
									<p className="font-medium">
										{formattedTime}
									</p>
									<p className="text-sm text-gray-600">
										Time
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex items-center gap-3">
								<MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
								<div>
									<p className="font-medium">{event.venue}</p>
									<p className="text-sm text-gray-600">
										Venue
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex items-center gap-3">
								<div>
									<p className="font-medium">capacity</p>
									<p className="text-sm text-gray-600">
										{capacity}
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex items-center gap-3">
								<Users className="h-5 w-5 text-gray-500 flex-shrink-0" />
								<div>
									<p className="font-medium">
										Max {maxParticipants} participants
									</p>
									<p className="text-sm text-gray-600">
										{maxParticipants > 0
											? `${maxParticipants} spots available`
											: "Event is full"}
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex items-center gap-3">
								<User className="h-5 w-5 text-gray-500 flex-shrink-0" />
								<div>
									<p className="font-medium">
										{organizerName}
									</p>
									<p className="text-sm text-gray-600">
										Organizer
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Additional Info */}
					<Card>
						<CardHeader>
							<CardTitle>Event Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Status
									</span>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											eventStatus === "coming-soon"
												? "bg-blue-100 text-blue-800"
												: eventStatus === "ongoing"
												? "bg-green-100 text-green-800"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{eventStatus
											.replace("-", " ")
											.toUpperCase()}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Created
									</span>
									<span className="text-sm font-medium">
										{new Date(
											event.created_at
										).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Last Updated
									</span>
									<span className="text-sm font-medium">
										{new Date(
											event.updated_at
										).toLocaleDateString()}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default EventDetailsPage;
