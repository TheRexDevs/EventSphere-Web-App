import Link from "next/link";

export const MainFooter = () => {
	return (
		<footer className="bg-[#667154] border-t border-gray-200">
			<div className="w-site mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-[1]">
				<div className="grid max-md:grid-cols-1   max-lg:grid-cols-3 grid-cols-4    gap-8">
					<div>
						<h3 className="text-xl font-semibold text-[#F9F9F6] mb-2">
							EventSpehere
						</h3>
						<p className=" text-xl text-[#F9F9F6]">
							Your gateway to amazing campus experiences. connect,
							discover and Participate in events that matters to
							you.
						</p>
					</div>

					<div className="ml-7 max-md:ml-0">
						<h4 className="font-medium text-xl text-[#F9F9F6]  mb-3">
							Quick Links
						</h4>
						<ul className="space-y-2 text-base text-[#F9F9F6]">
							<li>
								<Link
									href="/features"
									className="hover:text-primary"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/pricing"
									className="hover:text-primary"
								>
									Browse Events
								</Link>
							</li>
							<li>
								<Link
									href="/integrations"
									className="hover:text-primary"
								>
									Gallery
								</Link>
							</li>
							<li>
								<Link
									href="/integrations"
									className="hover:text-primary"
								>
									About us
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-medium text-xl text-[#F9F9F6] mb-3">
							Categories
						</h4>
						<ul className="space-y-2 text-base text-[#F9F9F6]">
							<li>
								<Link
									href="/support"
									className="hover:text-primary"
								>
									Academics Events
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="hover:text-primary"
								>
									Sports Activities
								</Link>
							</li>
							<li>
								<Link
									href="/status"
									className="hover:text-primary"
								>
									Professional Development
								</Link>
							</li>
							<li>
								<Link
									href="/status"
									className="hover:text-primary"
								>
									Social Events
								</Link>
							</li>
						</ul>
					</div>

					<div className="">
						<h4 className="font-medium text-xl text-[#F9F9F6] mb-3">
							Contact
						</h4>
						<ul className="space-y-2 text-base text-[#F9F9F6]">
							<li>
								<Link
									href="/about"
									className="hover:text-primary"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="mailto:Support@eventsphere.edu?subject=Support%20Request&body=Hello%20EventSphere%20Team,"
									className="hover:text-primary"
								>
									Support@eventsphere.edu
								</Link>
							</li>
							<li>
								<Link
									href="mailto:info@eventsphere.edu?subject=Support%20Request&body=Hello%20EventSphere%20Team,"
									className="hover:text-primary"
								>
									info@eventsphere.edu
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Footer Bottom */}
			<div className="w-site relative z-[1]">
				<div className="py-8 text-center">
					<p className="text-sm text-[#F9F9F6]">
						© 2024 Eventsphere. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};
