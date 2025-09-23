"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { showToast } from "@/lib/utils/toast";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/schemas/auth";
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
 * ForgotPasswordPage component - handles password reset requests
 */
export default function ForgotPasswordPage() {
    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            // Include the base URL and reset path for the backend
            const payload = {
                email: data.email,
                // reset_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`
            };

            await apiPost("/api/v1/auth/forgot-password", payload);

            setIsSubmitted(true);
            showToast.success("Password reset link has been sent to your email!");
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.errors) {
                    Object.entries(error.errors).forEach(([field, messages]) => {
                        if (messages.length > 0) {
                            form.setError(field as keyof ForgotPasswordFormData, {
                                type: "manual",
                                message: messages[0],
                            });
                        }
                    });
                } else {
                    showToast.error(error.message);
                }
            } else {
                showToast.error("Failed to send reset link. Please try again.");
            }
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Check your email
                        </CardTitle>
                        <CardDescription className="text-center">
                            We&apos;ve sent a password reset link to your email address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center">
                                Didn&apos;t receive the email? Check your spam folder or{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-primary hover:underline"
                                >
                                    try again
                                </button>
                            </p>
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
                        Forgot your password?
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email address and we&apos;ll send you a link to reset your password.
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
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Enter your email address"
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Sending..."
                                    : "Send Reset Link"}
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
