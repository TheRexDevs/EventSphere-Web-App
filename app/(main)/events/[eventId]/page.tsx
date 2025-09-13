import EventDetailsPage from "../../../components/pages/main/events/event-details";

interface PageProps {
	params: Promise<{
		eventId: string;
	}>;
}

const EventDetails = async ({ params }: PageProps) => {
	const { eventId } = await params;

	return <EventDetailsPage eventId={eventId} />;
};

export default EventDetails;
