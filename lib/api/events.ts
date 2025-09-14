/**
 * Event API functions
 */

import {
	Event,
	EventCategory,
	EventRegistration,
	ListEventsRequest,
	ListEventsResponse,
	GetEventResponse,
	ListCategoriesResponse,
	RegisterForEventResponse,
	CancelRegistrationResponse,
	GetUserRegistrationsResponse,
	GetRegistrationDetailsResponse,
} from "@/types/events";
import { apiGet, apiPost, apiDelete } from "@/lib/utils/api";

/**
 * Get paginated list of public events
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of events
 */
export async function getEvents(
	params: ListEventsRequest = {}
): Promise<ListEventsResponse["data"]> {
	const queryParams = new URLSearchParams();

	if (params.page) queryParams.append("page", params.page.toString());
	if (params.per_page)
		queryParams.append("per_page", params.per_page.toString());
	if (params.category_id)
		queryParams.append("category_id", params.category_id);
	if (params.search) queryParams.append("search", params.search);
	if (params.status) queryParams.append("status", params.status);
	if (params.date_from) queryParams.append("date_from", params.date_from);
	if (params.date_to) queryParams.append("date_to", params.date_to);

	const endpoint = `/api/v1/events${
		queryParams.toString() ? `?${queryParams.toString()}` : ""
	}`;
	const response = await apiGet<ListEventsResponse>(endpoint);
	return response.data;
}

// 👇
/**
 * Get a fixed list of 6 events for a specific purpose.
 * It's a wrapper around `getEvents` to simplify fetching a small, featured set.
 * @returns A list of the first 6 events.
 */
export async function getSixEvents(): Promise<ListEventsResponse["data"]> {
	const params: ListEventsRequest = {
		page: 1,
		per_page: 6,
	};
	const response = await getEvents(params);
	return response;
}
// 👆
// END OF NEW FUNCTION

/**
 * Get detailed information about a specific event
 * @param eventId - Event UUID
 * @returns Complete event object
 */
export async function getEvent(eventId: string): Promise<Event> {
	const response = await apiGet<GetEventResponse>(
		`/api/v1/events/${eventId}`
	);
	return response.data;
}

/**
 * Get list of all event categories
 * @returns Array of event categories
 */
export async function getEventCategories(): Promise<EventCategory[]> {
	const response = await apiGet<ListCategoriesResponse>(
		"/api/v1/events/categories"
	);
	return response.data.categories;
}

/**
 * Register current user for an event
 * @param eventId - Event UUID
 * @returns Registration confirmation
 */
export async function registerForEvent(
	eventId: string
): Promise<RegisterForEventResponse["data"]> {
	const response = await apiPost<RegisterForEventResponse>(
		`/api/v1/events/${eventId}/register`
	);
	return response.data;
}

/**
 * Cancel user's registration for an event
 * @param eventId - Event UUID
 * @returns Cancellation confirmation
 */
export async function cancelEventRegistration(
	eventId: string
): Promise<CancelRegistrationResponse["data"]> {
	const response = await apiDelete<CancelRegistrationResponse>(
		`/api/v1/events/${eventId}/register`
	);
	return response.data;
}

/**
 * Get current user's event registrations
 * @param page - Page number (default: 1)
 * @param perPage - Items per page (default: 20)
 * @returns User's registrations with event details
 */
export async function getUserRegistrations(
	page: number = 1,
	perPage: number = 20
): Promise<GetUserRegistrationsResponse["data"]> {
	const queryParams = new URLSearchParams({
		page: page.toString(),
		per_page: perPage.toString(),
	});

	const response = await apiGet<GetUserRegistrationsResponse>(
		`/api/v1/user/registrations?${queryParams.toString()}`
	);
	return response.data;
}

/**
 * Get user's registration details for a specific event
 * @param eventId - Event UUID
 * @returns Registration details
 */
export async function getEventRegistrationDetails(
	eventId: string
): Promise<EventRegistration> {
	const response = await apiGet<GetRegistrationDetailsResponse>(
		`/api/v1/events/${eventId}/registration`
	);
	return response.data.registration;
}
