"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactSchema, ContactFormValues } from "@/lib/schemas/contact";

import address from "@/public/address.png";
import phone from "@/public/call.png";
import whatsap from "@/public/whatsapp.png";
import email from "@/public/email.png";
import Image from "next/image";
import Link from "next/link";

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

	const onSubmit = (values: ContactFormValues) => {
		console.log("Contact form submitted:", values);
	};

	return (
		<main className="w-full">
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

			{/* Contact Section */}
			<section className="w-site  mx-auto py-14">
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
														shape={"rounded"}
														placeholder="Write your message here..."
														{...field}
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
					<div className="grid grid-cols-2 gap-6 mt-[60px]">
						{/* Phone */}
						<div className="w-full">
							<Image
								src={phone}
								alt="Phone"
								height={0}
								width={0}
								className="w-[31%] m-auto"
							/>
							<div className="mt-5 items-center">
								<h1 className="text-center text-[22px] font-bold">
									Phone Number
								</h1>
								<Link href="tel:+2340000000000">
									<p className="text-center">
										+234 000 000 0000
									</p>
								</Link>
							</div>
						</div>

						{/* Email */}
						<div className="w-full">
							<Image
								src={email}
								alt="Email"
								height={0}
								width={0}
								className="w-[31%] m-auto"
							/>
							<div className="mt-5 items-center">
								<h1 className="text-center text-[22px] font-bold">
									Email Address
								</h1>
								<Link href="mailto:Support@eventsphere.edu?subject=Support%20Request&body=Hello%20EventSphere%20Team,">
									<p className="text-center">
										Support@eventsphere.edu <br />
										info@eventsphere.edu
									</p>
								</Link>
							</div>
						</div>

						{/* WhatsApp */}
						<div className="w-full relative top-11">
							<Image
								src={whatsap}
								alt="WhatsApp"
								height={0}
								width={0}
								className="w-[31%] m-auto"
							/>
							<div className="mt-5 items-center">
								<h1 className="text-center text-[22px] font-bold">
									WhatsApp
								</h1>
								<Link
									href="https://wa.me/2340000000000"
									target="_blank"
								>
									<p className="text-center">
										+234 000 000 0000
									</p>
								</Link>
							</div>
						</div>

						{/* Address */}
						<div className="w-full">
							<Image
								src={address}
								alt="Address"
								height={0}
								width={0}
								className="w-[31%] m-auto"
							/>
							<div className="mt-5 items-center">
								<h1 className="text-center text-[22px] font-bold">
									Address
								</h1>
								<p className=" ml-5">
									Eventsphere Office <br />
									Students Service Building, Room 201 <br />
									University Campus, Lagos, Nigeria
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-10">
				<section
					style={{
						backgroundImage: `url('/cont.jpg')`,
					}}
					className="relative h-[450px]  
				   w-site bg-cover bg-center bg-no-repeat   m-auto cursor-pointer
				   {small-screen:}  max-md:h-[300px]  max-md:w-full 
				 
				   "
				>
					<div className="absolute inset-0 bg-black opacity-30 z-0 "></div>

					<div className="absolute inset-0 z-10 text-white flex justify-center items-center">
						<p className="w-[40%]  text-[45px] text-center">
							We Are Always Ready To give you the Perfect Event
						</p>
					</div>
				</section>
			</section>
		</main>
	);
};

export default ContactPage;
