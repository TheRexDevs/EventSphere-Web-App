"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { showToast } from "@/lib/utils/toast";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/schemas/auth";
import { ApiError, apiPost } from "@/lib/utils/api";
import { Button } from "@/app/components/ui/button";

import {
    Form,
} from "@/app/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import FieldWrapper from "@/app/components/common/field-wrapper";

/**
 * ResetPasswordPage component - handles password reset
 */
export default function ResetPasswordPage() {
    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Validate token on mount
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValidToken(false);
                setIsLoading(false);
                return;
            }

            try {
                // Note: The API endpoint from docs uses GET with query param
                // But we'll implement this as needed. For now, assume token is valid
                // if it exists and let the reset API handle validation
                setIsValidToken(true);
            } catch {
                setIsValidToken(false);
                showToast.error("Invalid or expired reset link");
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();
    }, [token]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            showToast.error("Invalid reset link");
            return;
        }

        try {
            await apiPost("/api/v1/auth/reset-password", {
                token,
                new_password: data.password,
            });

            showToast.success("Password has been reset successfully!");
            router.push("/login");
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.errors) {
                    Object.entries(error.errors).forEach(([field, messages]) => {
                        if (messages.length > 0) {
                            form.setError(field as keyof ResetPasswordFormData, {
                                type: "manual",
                                message: messages[0],
                            });
                        }
                    });
                } else {
                    showToast.error(error.message);
                }
            } else {
                showToast.error("Failed to reset password. Please try again.");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-muted-foreground">Validating reset link...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!isValidToken || !token) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Invalid Reset Link
                        </CardTitle>
                        <CardDescription className="text-center">
                            This password reset link is invalid or has expired.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Button
                                onClick={() => router.push("/forgot-password")}
                                className="w-full"
                            >
                                Request New Reset Link
                            </Button>
                            <Button
                                onClick={() => router.push("/login")}
                                className="w-full"
                                variant="outline"
                            >
                                Back to Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Reset your password
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FieldWrapper
                                control={form.control}
                                name="password"
                                label="New Password"
                                type="password"
                                placeholder="Enter your new password"
                            />

                            <FieldWrapper
                                control={form.control}
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                placeholder="Confirm your new password"
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Resetting..."
                                    : "Reset Password"}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-foreground/70">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
