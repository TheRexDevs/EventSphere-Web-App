"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

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

	const onSubmit = (values: ContactFormValues) => {
		console.log("Contact form submitted:", values);
	};
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

			<div className="w-site space-y-6">
				{/* Contact Section */}
				<section className="py-14">
					<div className="flex flex-col lg:flex-row gap-9 w-full">
						{/* Contact Form */}
						<Card className="w-full lg:w-1/2" rounded={"xxl"}>
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
						<div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-6">
							{/* Phone */}
							<Card className="w-full text-center p-6 justify-center" rounded="lg">
								<div className="flex flex-col items-center space-y-3">
									<div className="p-3 bg-primary/10 rounded-full">
										<Phone className="w-8 h-8 text-primary" />
									</div>
									<h3 className="text-xl font-bold">
										Phone Number
									</h3>
									<Link href="tel:+2340000000000" className="text-muted-foreground hover:text-primary transition-colors">
										+234 000 000 0000
									</Link>
								</div>
							</Card>

							{/* Email */}
							<Card className="w-full text-center p-6 justify-center" rounded="lg">
								<div className="flex flex-col items-center space-y-3">
									<div className="p-3 bg-primary/10 rounded-full">
										<Mail className="w-8 h-8 text-primary" />
									</div>
									<h3 className="text-xl font-bold">
										Email Address
									</h3>
									<div className="space-y-1">
										<Link href="mailto:Support@eventsphere.edu?subject=Support%20Request&body=Hello%20EventSphere%20Team," className="block text-muted-foreground hover:text-primary transition-colors">
											Support@eventsphere.edu
										</Link>
										<Link href="mailto:info@eventsphere.edu" className="block text-muted-foreground hover:text-primary transition-colors">
											info@eventsphere.edu
										</Link>
									</div>
								</div>
							</Card>

							{/* WhatsApp */}
							<Card className="w-full text-center p-6 justify-center" rounded="lg">
								<div className="flex flex-col items-center space-y-3">
									<div className="p-3 bg-primary/10 rounded-full">
										<MessageCircle className="w-8 h-8 text-primary" />
									</div>
									<h3 className="text-xl font-bold">
										WhatsApp
									</h3>
									<Link
										href="https://wa.me/2340000000000"
										target="_blank"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										+234 000 000 0000
									</Link>
								</div>
							</Card>

							{/* Address */}
							<Card className="w-full text-center p-6 justify-center" rounded="lg">
								<div className="flex flex-col items-center space-y-3">
									<div className="p-3 bg-primary/10 rounded-full">
										<MapPin className="w-8 h-8 text-primary" />
									</div>
									<h3 className="text-xl font-bold">
										Address
									</h3>
									<div className="text-muted-foreground text-sm space-y-1">
										<p>Eventsphere Office</p>
										<p>Students Service Building, Room 201</p>
										<p>University Campus, Lagos, Nigeria</p>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</section>

				<section className="py-10">
					<section
						style={{
							backgroundImage: `url('/cont.jpg')`,
						}}
						className="relative h-[450px] fit-img m-auto cursor-pointer {small-screen:}  max-md:h-[300px]  max-md:w-full flex items-center justify-center rounded-lg"
					>
						<div className="absolute inset-0 bg-black opacity-50 z-0 "></div>

						<div className="relative z-10 text-white flex justify-center items-center">
							<p className="max-w-[60%]  text-xl lg:text-5xl text-center">
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
