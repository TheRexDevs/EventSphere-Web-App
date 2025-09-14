/**
 * Certificate related TypeScript interfaces and types
 */

import { ApiResponse } from "./auth";

// Certificate data structure
export interface Certificate {
  id: string;
  event_id: string;
  user_id: string;
  certificate_number: string;
  certificate_url: string;
  issued_at: string;
  event_title: string;
  event_date: string;
  participant_name: string;
}

// API Response types
export type GetUserCertificatesResponse = ApiResponse<{
  certificates: Certificate[];
  total: number;
  page: number;
  per_page: number;
}>;

export type DownloadCertificateResponse = Blob; // File download response
