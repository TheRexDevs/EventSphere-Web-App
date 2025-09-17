import React from "react";
import Image from "next/image";

import Carousel3D from "./carousel-3d";
import Counter from "@/app/components/common/counter";

const AboutPage = () => {
	return (
		<div className="w-site mx-auto space-y-6">
			<section className="flex items-center justify-center">
				<div className="pt-[60px]">
					<h1 className="text-center font-bold text-3xl lg:text-[40px]">
						About EventSphere
					</h1>
					<p className="text-center text-foreground/70 text-base lg:text-[18px]">
						Your gateway to campus life and memorable experiences
					</p>
				</div>
			</section>

			<section className="w-full">
				<Carousel3D />
			</section>

			<section className="w-full">
				<div>
					<h1 className="text-primary font-semibold text-[40px]">
						Our Mission
					</h1>
					<p className="text-foreground/70">
						EventSphere is designed to be the central hub for all
						campus events connecting Students with opportunities to
						learn, grow, and create lasting memories. We believe
						that campus life extends far beyond the classrooms and
						our platform makes it easy for students to discover and
						participate in events that match their interests.
					</p>
				</div>

				<div className="pt-[100px] pb-[60px] ">
					<h1 className="text-primary font-semibold text-[40px]">
						What we offer
					</h1>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-11 mt-7">
						<div>
							<div className="fit-img w-[80%]">
								<Image
									src={"/3d-img/event-discovery.png"}
									alt="Event Discovery"
									objectFit="cover"
									priority
									height={0}
									width={0}
									sizes="100vw"
									className="w-full object-cover"
								/>
							</div>
							<p className="mt-2">
								Find events that match your interests with our
								advanced filtering and search capability
							</p>
						</div>

						<div>
							<div className="fit-img w-[80%]">
								<Image
									src={"/3d-img/easy-reg.png"}
									alt="Easy Registration"
									objectFit="cover"
									priority
									height={0}
									width={0}
									sizes="100vw"
									className="w-full object-cover"
								/>
							</div>
							<p className="mt-2">
								Simple streamlined registration process that
								gets you signed up in seconds
							</p>
						</div>

						<div>
							<div className="fit-img w-[80%]">
								<Image
									src={"/3d-img/real-time.png"}
									alt="Real time Update"
									objectFit="cover"
									priority
									height={0}
									width={0}
									sizes="100vw"
									className="w-full object-cover"
								/>
							</div>
							<p className="mt-2">
								Stay informed with instant notifications about
								event changes and new opportunities
							</p>
						</div>

						<div>
							<div className="fit-img w-[80%]">
								<Image
									src={"/3d-img/event-disco.png"}
									alt="Community Building"
									objectFit="cover"
									priority
									height={0}
									width={0}
									sizes="100vw"
									className="w-full object-cover"
								/>
							</div>
							<p className="mt-2">
								Connect with likeminded students and build your
								project
							</p>
						</div>
					</div>
				</div>

				<div className="pb-10">
					<h1 className="text-primary font-semibold text-[40px]">
						Our Story
					</h1>
					<p className="text-foreground/70 ">
						Founded by students, for students, EventSphere was born
						from the frustration of missing out on campus events due
						to poor and scattered information. We recognized that
						every student deserves access to the full spectrum of
						campus life, and we built this platform to make that
						happen.
					</p>
				</div>

				{/* Animated Counters */}
				<div className="py-20">
					<div className="text-center">
						<h1 className="py-10 font-semibold text-[30px]">
							EventSphere by the Numbers
						</h1>
					</div>

					<div className="w-[90%] grid grid-cols-2 md:grid-cols-4 gap-8 m-auto">
						<div className="text-center">
							<Counter end={50000} suffix="+" label="Active students" />
						</div>

						<div className="text-center">
							<Counter end={1200} suffix="+" label="Events Hosted" />
						</div>

						<div className="text-center">
							<Counter end={95} suffix="%" label="User Satisfaction" />
						</div>

						<div className="text-center">
							<Counter end={24} suffix="/7" label="Platform availability" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
