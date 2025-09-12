"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
	loginUser,
	logoutUser,
	signupUser,
	verifyEmail as verifyEmailApi,
	validateToken,
	refreshAccessToken,
} from "@/lib/api/auth";
import { tokenManager, ApiError } from "@/lib/utils/api";
import { User, SignupRequest, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = tokenManager.get();
				if (token) {
					// Hydrate from localStorage for instant UI
					try {
						const storedUser = localStorage.getItem("auth_user");
						if (storedUser) {
							setUser(JSON.parse(storedUser));
							setIsLoading(false);
						}
					} catch {}

					// Validate token in background
					try {
						const userData = await validateToken(token);
						if (userData) {
							setUser(userData);
						} else {
							await refreshAccessToken();
							const newToken = tokenManager.get();
							if (newToken) {
								const refreshedUserData = await validateToken(
									newToken
								);
								if (refreshedUserData) {
									setUser(refreshedUserData);
								} else {
									tokenManager.remove();
									setUser(null);
								}
							}
						}
					} catch {
						tokenManager.remove();
						setUser(null);
					}
				}
			} catch (err) {
				console.warn("Auth check failed:", err);
				tokenManager.remove();
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const signup = async (userData: SignupRequest): Promise<string> => {
		try {
			setError(null);
			setIsLoading(true);
			return await signupUser(userData);
		} catch (err) {
			const errorMessage =
				err instanceof ApiError ? err.message : "Signup failed";
			setError(errorMessage);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const verifyEmail = async (code: string, regId: string): Promise<void> => {
		try {
			setError(null);
			setIsLoading(true);
			const { user: userData } = await verifyEmailApi(code, regId);
			setUser(userData);
		} catch (err) {
			const errorMessage =
				err instanceof ApiError
					? err.message
					: "Email verification failed";
			setError(errorMessage);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (email: string, password: string): Promise<void> => {
		try {
			setError(null);
			setIsLoading(true);
			const { user: userData } = await loginUser(email, password);
			setUser(userData);
		} catch (err) {
			const errorMessage =
				err instanceof ApiError ? err.message : "Login failed";
			setError(errorMessage);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			setIsLoading(true);
			await logoutUser();
			setUser(null);
		} catch (err) {
			console.error("Logout failed:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const clearError = () => setError(null);

	const updateUser = (partial: Partial<User>): void => {
		setUser((prev) => {
			if (!prev) return prev;
			const next = { ...prev, ...partial } as User;
			try {
				localStorage.setItem("auth_user", JSON.stringify(next));
			} catch {}
			return next;
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				error,
				signup,
				verifyEmail,
				login,
				logout,
				clearError,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
