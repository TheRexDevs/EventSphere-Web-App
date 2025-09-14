/**
 * Certificate API functions
 */

import {
  GetUserCertificatesResponse,
  DownloadCertificateResponse,
} from "@/types/certificates";
import { apiGet, tokenManager } from "@/lib/utils/api";

/**
 * Get current user's certificates
 * @param page - Page number (default: 1)
 * @param perPage - Items per page (default: 20)
 * @returns User's certificates
 */
export async function getUserCertificates(
  page: number = 1,
  perPage: number = 20
): Promise<GetUserCertificatesResponse["data"]> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  const response = await apiGet<GetUserCertificatesResponse>(
    `/api/v1/user/certificates?${queryParams.toString()}`,
    tokenManager.getAuthHeader()
  );
  return response.data;
}

/**
 * Download a certificate file
 * @param certificateId - Certificate UUID
 * @param format - Download format (pdf, png) - default: pdf
 * @returns Certificate file blob
 */
export async function downloadCertificate(
  certificateId: string,
  format: string = "pdf"
): Promise<DownloadCertificateResponse> {
  const queryParams = new URLSearchParams({ format });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/certificates/${certificateId}/download?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        ...tokenManager.getAuthHeader(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to download certificate: ${response.statusText}`);
  }

  return response.blob();
}
