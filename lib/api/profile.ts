// lib/api/profile.ts
import { User } from "@/types/auth";
import { apiPost, apiPut, apiGet, tokenManager } from "@/lib/utils/api";

/**
 * Get user profile by username
 */
export async function getUserProfile(username: string): Promise<User> {
	const response = await apiGet<User>(`/api/v1/users/${username}`);
	return response;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
	userId: number,
	updates: Partial<User>
): Promise<User> {
	const response = await apiPut<User>(`/api/v1/users/${userId}`, updates);
	return response;
}

/**
 * Upload profile picture
 */
export async function uploadProfilePicture(
	userId: number,
	file: File
): Promise<{ profile_picture: string }> {
	const formData = new FormData();
	formData.append("profile_picture", file);

	const response = await apiPost<{ profile_picture: string }>(
		`/api/v1/users/${userId}/profile-picture`,
		formData,
		{
			"Content-Type": "multipart/form-data",
			...tokenManager.getAuthHeader(),
		}
	);

	return response;
}

/**
 * Update user settings
 */
export async function updateUserSettings(
	userId: number,
	settings: any
): Promise<User> {
	const response = await apiPut<User>(
		`/api/v1/users/${userId}/settings`,
		settings
	);
	return response;
}
