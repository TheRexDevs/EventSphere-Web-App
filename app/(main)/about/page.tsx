import Carousel3D from "@/app/components/pages/main/3d/Carousel3D";
import React from "react";
import Image from "next/image";
import Easyreg from "@/public/3dimg/Easy Registration.png";
import Eventdisc from "@/public/3dimg/Event Discovery.png";
import communityb from "@/public/3dimg/Event Discovery (1).png";
import realt from "@/public/3dimg/real time updates.png";
import Counter from "@/app/components/common/Counter";

const page = () => {
	return (
		<section className="w-full">
			<div className="flex items-center justify-center">
				<div className="pt-[60px]">
					<h1 className="text-center font-bold text-[40px] max-md:text-[35px]">
						About EventSphere
					</h1>
					<p className="text-center text-[#545454] text-[18px] max-md:text-[16px]">
						Your gateway to campus life and memorable experiences
					</p>
				</div>
			</div>

			<div className="w-full">
				<Carousel3D />
			</div>

			<section className="w-site">
				<div>
					<h1 className="text-primary font-semibold text-[40px]">
						Our Mission
					</h1>
					<p className="text-[#545454]">
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

					<div className="grid grid-cols-3 max-md:grid-cols-1 gap-11 mt-7">
						<div>
							<Image
								src={Eventdisc}
								alt="Event Discovery"
								height={0}
								width={0}
								className="w-[80%]"
							/>
							<p className="mt-2">
								Find events that match your interests with our
								advanced filtering and search capability
							</p>
						</div>

						<div>
							<Image
								src={Easyreg}
								alt="Easy Registration"
								height={0}
								width={0}
								className="w-[80%]"
							/>
							<p className="mt-2">
								Simple streamlined registration process that
								gets you signed up in seconds
							</p>
						</div>

						<div>
							<Image
								src={realt}
								alt="Real time Update"
								height={0}
								width={0}
								className="w-[80%]"
							/>
							<p className="mt-2">
								Stay informed with instant notifications about
								event changes and new opportunities
							</p>
						</div>

						<div>
							<Image
								src={communityb}
								alt="Community Building"
								height={0}
								width={0}
								className="w-[80%]"
							/>
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
					<p className="text-[#545454] ">
						Founded by students, for students, EventSphere was born
						from the frustration of missing out on campus events due
						to poor and scattered information. We recognized that
						every student deserves access to the full spectrum of
						campus life, and we built this platform to make that
						happen.
					</p>
				</div>

				{/* Animated Counters */}
				<div className="py-20 max-md:py-10">
					<div className="text-center">
						<h1 className="py-10 font-semibold text-[30px]">
							Eventsphere by the Numbers
						</h1>
					</div>

					<div className="w-[90%] grid grid-cols-2 md:grid-cols-4 gap-8 m-auto">
						<div>
							<Counter end={50000} suffix="+" />
							<p className="text-[#545454] text-center">
								Active students
							</p>
						</div>

						<div>
							<Counter end={1200} suffix="+" />
							<p className="text-[#545454] text-center">
								Events Hosted
							</p>
						</div>

						<div>
							<Counter end={95} suffix="%" />
							<p className="text-[#545454] text-center">
								User Satisfaction
							</p>
						</div>

						<div>
							<Counter end={24} suffix="/7" />
							<p className="text-[#545454] text-center">
								Platform availability
							</p>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};

export default page;
