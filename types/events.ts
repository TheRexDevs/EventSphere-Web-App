/**
 * Event related TypeScript interfaces and types
 */

import { ApiResponse } from "./auth";

// Event data structure
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  category_id: string;
  date: string; // ISO date string
  time: string; // Time string like "2:00pm"
  venue: string;
  organizer_id: string;
  organizer_name: string;
  status: "ongoing" | "coming-soon" | "ended";
  capacity: number;
  available_slots: number;
  booked_slots: number;
  image_url: string;
  gallery_images?: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
  is_registered?: boolean; // For authenticated users
  registration_status?: "confirmed" | "waitlist" | "cancelled";
}

// Event category
export interface EventCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

// Event registration
export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  status: "confirmed" | "waitlist" | "cancelled";
  registered_at: string;
  event: Event; // Nested event data for convenience
}

// API Response types
export type ListEventsResponse = ApiResponse<{
  events: Event[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}>;

export type GetEventResponse = ApiResponse<Event>;

export type ListCategoriesResponse = ApiResponse<{
  categories: EventCategory[];
}>;

export type RegisterForEventResponse = ApiResponse<{
  registration_id: string;
  status: "confirmed" | "waitlist";
  message: string;
}>;

export type CancelRegistrationResponse = ApiResponse<{
  message: string;
}>;

export type GetUserRegistrationsResponse = ApiResponse<{
  registrations: EventRegistration[];
  total: number;
  page: number;
  per_page: number;
}>;

export type GetRegistrationDetailsResponse = ApiResponse<{
  registration: EventRegistration;
}>;

// Request types
export interface ListEventsRequest {
  page?: number;
  per_page?: number;
  category_id?: string;
  search?: string;
  status?: "ongoing" | "coming-soon" | "ended";
  date_from?: string;
  date_to?: string;
}

export interface RegisterForEventRequest {
  // Empty - registration uses current user
}

export interface CancelRegistrationRequest {
  // Empty - cancellation uses current user
}
