/**
 * Event related TypeScript interfaces and types
 */

import { ApiResponse } from "./auth";

// Event organizer data structure
export interface EventOrganizer {
  id: string;
  email: string;
  full_name: string;
  username: string;
}

// Image data structure
export interface EventImage {
  id: string;
  filename: string;
  url: string;
  height?: number;
  width?: number;
  thumbnail_url?: string | null;
  created_at?: string;
  file_type?: string;
}

// Event data structure (matches API response)
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  category_id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // Time string like "09:00:00"
  venue: string;
  organizer_id: string;
  organizer: EventOrganizer;
  status: "approved" | "pending" | "rejected";
  capacity: number;
  max_participants: number;
  featured_image: EventImage | null;
  gallery_images: EventImage[];
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

export type GetEventResponse = ApiResponse<{ event: Event }>;

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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RegisterForEventRequest {
  // Empty - registration uses current user
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CancelRegistrationRequest {
  // Empty - cancellation uses current user
}
