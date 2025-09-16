import Link from "next/link";

export const FooterContact = () => {
	return (
		<div className="">
			<h4 className="font-medium text-xl text-[#F9F9F6] mb-3">
				Contact
			</h4>
			<ul className="space-y-2 text-base text-[#F9F9F6]">
				<li>
					<Link
						href="/contact"
						className="hover:text-primary transition-colors"
					>
						Contact Us
					</Link>
				</li>
				<li>
					<Link
						href="mailto:support@eventsphere.edu?subject=Support%20Request&body=Hello%20EventSphere%20Team,"
						className="hover:text-primary transition-colors"
					>
						support@eventsphere.edu
					</Link>
				</li>
				<li>
					<Link
						href="mailto:info@eventsphere.edu?subject=General%20Inquiry&body=Hello%20EventSphere%20Team,"
						className="hover:text-primary transition-colors"
					>
						info@eventsphere.edu
					</Link>
				</li>
			</ul>
		</div>
	);
};
