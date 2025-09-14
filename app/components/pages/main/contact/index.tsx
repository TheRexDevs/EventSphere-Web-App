"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import { contactSchema, ContactFormValues } from "@/lib/schemas/contact";

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/app/components/ui/form";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";

const ContactPage = () => {
	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const FORMSPREE_ENDPOINT = "https://formspree.io/f/xovnboar";

	const onSubmit = async (values: ContactFormValues) => {
		try {
			const response = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(values),
			});

			if (response.ok) {
				alert("✅ Message sent successfully!");
				form.reset({
					name: "",
					email: "",
					subject: "",
					message: "",
				}); // 🔹 Clear all fields explicitly
			} else {
				alert("❌ Something went wrong. Please try again.");
			}
		} catch (error) {
			console.error(error);
			alert("⚠️ Network error, please try again later.");
		}
	};

	const address = "/address.png";
	const phone = "/call.png";
	const whatsapp = "/whatsapp.png";
	const email = "/email.png";

	return (
		<>
			{/* Hero Section */}
			<section
				style={{
					backgroundImage: `url('/contactimg.jpg')`,
				}}
				className="relative h-[420px] w-full bg-cover bg-center bg-no-repeat bottom-4 m-auto cursor-pointer max-md:h-[300px] max-md:w-full"
			>
				<div className="absolute inset-0 bg-black opacity-45 z-0"></div>

				<div className="absolute inset-0 z-10 text-white flex justify-center items-center">
					<div>
						<h1 className="text-[49px] font-bold text-center">
							Get In Touch
						</h1>
						<p className="text-center text-[18px]">
							We would love to hear from you, send us a message
						</p>
					</div>
				</div>
			</section>

			<div className="w-site mx-auto space-y-6">
				{/* Contact Section */}
				<section className="py-14">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-9 w-full max-w-6xl mx-auto">
						{/* Contact Form */}
						<Card className="w-full" rounded={"xxl"}>
							<CardHeader>
								<CardTitle className="text-center text-2xl">
									Contact Us
								</CardTitle>
							</CardHeader>

							<div className="p-6">
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-6"
									>
										<input
											type="hidden"
											name="_subject"
											value="New Contact Form Submission"
										/>

										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-base">
														Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Your full name"
															{...field}
															name="name"
															value={field.value}
															onChange={
																field.onChange
															}
															shape={"rounded"}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-base">
														Email
													</FormLabel>
													<FormControl>
														<Input
															type="email"
															placeholder="you@example.com"
															{...field}
															name="email"
															value={field.value}
															onChange={
																field.onChange
															}
															shape={"rounded"}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="subject"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-base">
														Subject
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Subject of your message"
															{...field}
															name="subject"
															value={field.value}
															onChange={
																field.onChange
															}
															shape={"rounded"}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="message"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-base">
														Message
													</FormLabel>
													<FormControl>
														<Textarea
															rows={5}
															placeholder="Write your message here..."
															{...field}
															name="message"
															value={field.value}
															onChange={
																field.onChange
															}
															shape={"rounded"}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<Button
											type="submit"
											shape={"rounded"}
											className="w-full"
										>
											Send Message
										</Button>
									</form>
								</Form>
							</div>
						</Card>

						{/* Contact Info Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[10px]">
							{/* Phone */}
							<div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
								<Image
									src={phone}
									alt="Phone"
									height={60}
									width={60}
									className="mb-4"
								/>
								<h1 className="text-lg font-semibold mb-2">
									Phone Number
								</h1>
								<Link href="tel:+2340000000000">
									<p className="text-gray-600 hover:text-green-700 transition">
										+234 000 000 0000
									</p>
								</Link>
							</div>

							{/* Email */}
							<div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
								<Image
									src={email}
									alt="Email"
									height={60}
									width={60}
									className="mb-4"
								/>
								<h1 className="text-lg font-semibold mb-2">
									Email Address
								</h1>
								<Link href="mailto:Support@eventsphere.edu?subject=Support%20Request&body=Hello%20EventSphere%20Team,">
									<p className="text-gray-600 hover:text-green-700 transition text-center">
										Support@eventsphere.edu <br />{" "}
										info@eventsphere.edu
									</p>
								</Link>
							</div>

							{/* WhatsApp */}
							<div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
								<Image
									src={whatsapp}
									alt="WhatsApp"
									height={60}
									width={60}
									className="mb-4"
								/>
								<h1 className="text-lg font-semibold mb-2">
									WhatsApp
								</h1>
								<Link
									href="https://wa.me/2340000000000"
									target="_blank"
								>
									<p className="text-gray-600 hover:text-green-700 transition">
										+234 000 000 0000
									</p>
								</Link>
							</div>

							{/* Address */}
							<div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
								<Image
									src={address}
									alt="Address"
									height={60}
									width={60}
									className="mb-4"
								/>
								<h1 className="text-lg font-semibold mb-2">
									Address
								</h1>
								<p className="text-gray-600 text-center">
									Eventsphere Office <br />
									Students Service Building, Room 201 <br />
									University Campus, Lagos, Nigeria
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="py-10">
					<section
						style={{
							backgroundImage: `url('/cont.jpg')`,
						}}
						className="relative h-[450px] w-site bg-cover bg-center bg-no-repeat m-auto cursor-pointer max-md:h-[300px] max-md:w-full"
					>
						<div className="absolute inset-0 bg-black opacity-30 z-0 "></div>

						<div className="absolute inset-0 z-10 text-white flex justify-center items-center">
							<p className="w-[40%] max-lg:w-[90%] max-lg:text-[30px] text-[45px] text-center">
								We Are Always Ready To give you the Perfect
								Event
							</p>
						</div>
					</section>
				</section>
			</div>
		</>
	);
};

export default ContactPage;
