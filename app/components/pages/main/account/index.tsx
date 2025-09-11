"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { User, Mail, Phone, Building, MapPin, Save } from "lucide-react";
import FieldWrapper from "@/app/components/common/field-wrapper";
import CardSection from "./card-section";
import ProfilePicUpload from "./profile-pic-upload";
import { accountSchema, type AccountFormData } from "@/lib/schemas/account";
import { useAuth } from "@/app/contexts/AuthContext";
import { showToast } from "@/lib/utils/toast";

const AccountPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user, isLoading: authLoading, updateUser } = useAuth();

	const initialValues: AccountFormData = useMemo(
		() => ({
			firstName: user?.firstname ?? "",
			lastName: user?.lastname ?? "",
			email: user?.email ?? "",
			phone: user?.phone ?? "",
			company: "",
			jobTitle: "",
			address: "",
			timezone: "",
			language: "",
		}),
		[user]
	);

	const form = useForm<AccountFormData>({
		resolver: zodResolver(accountSchema),
		defaultValues: initialValues,
	});

	useEffect(() => {
		form.reset(initialValues);
	}, [initialValues, form]);

	const handleSave = async (data: AccountFormData) => {
		try {
			setIsSubmitting(true);
			// TODO: integrate backend profile update when available
			updateUser({
				firstname: data.firstName,
				lastname: data.lastName,
				phone: data.phone ?? null,
			});
			showToast.success("Profile updated");
		} catch {
			showToast.error("Failed to update profile");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-site mx-auto space-y-6">
			<header className="space-y-2">
				<h1 className="text-3xl font-bold text-gray-900">
					Profile Settings
				</h1>
				<p className="text-gray-600">
					Manage your account information and preferences
				</p>
			</header>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSave)}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
						{/* Left Column */}
						<div className="flex flex-col gap-6">
							<CardSection
								title="Personal Information"
								icon={<User className="h-5 w-5" />}
							>
								<ProfilePicUpload />

								<Separator className="mb-12"></Separator>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FieldWrapper
										control={form.control}
										name="firstName"
										label="First Name"
										disabled={isSubmitting || authLoading}
									/>
									<FieldWrapper
										control={form.control}
										name="lastName"
										label="Last Name"
										disabled={isSubmitting || authLoading}
									/>
								</div>

								<FieldWrapper
									control={form.control}
									name="email"
									label="Email Address"
									type="email"
									icon={<Mail className="h-4 w-4" />}
									disabled
									helperText="Email cannot be changed"
								/>

								<FieldWrapper
									control={form.control}
									name="phone"
									label="Phone Number"
									type="tel"
									icon={<Phone className="h-4 w-4" />}
									disabled={isSubmitting || authLoading}
								/>
							</CardSection>
						</div>

						{/* Right Column */}
						<div className="flex flex-col gap-6">
							<CardSection
								title="Business Information"
								icon={<Building className="h-5 w-5" />}
							>
								<FieldWrapper
									control={form.control}
									name="company"
									label="Company Name"
									disabled={isSubmitting || authLoading}
								/>

								<FieldWrapper
									control={form.control}
									name="jobTitle"
									label="Job Title"
									disabled={isSubmitting || authLoading}
								/>

								<FieldWrapper
									control={form.control}
									name="address"
									label="Business Address"
									icon={<MapPin className="h-4 w-4" />}
									disabled={isSubmitting || authLoading}
								/>
							</CardSection>

							<CardSection title="Account Settings">
								<FieldWrapper
									control={form.control}
									name="timezone"
									label="Timezone"
									disabled={isSubmitting || authLoading}
								/>

								<FieldWrapper
									control={form.control}
									name="language"
									label="Language"
									disabled={isSubmitting || authLoading}
								/>
							</CardSection>
						</div>
					</div>

					{/* Save Button */}
					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={isSubmitting || authLoading}
							className="flex items-center gap-2"
						>
							<Save className="!h-4 !w-4" />
							{isSubmitting ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AccountPage;
