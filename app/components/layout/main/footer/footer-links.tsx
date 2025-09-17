import Link from "next/link";

export const FooterLinks = () => {
	return (
		<div className="ml-7 max-md:ml-0">
			<h4 className="font-medium text-xl text-[#F9F9F6] mb-3">
				Quick Links
			</h4>
			<ul className="space-y-2 text-base text-[#F9F9F6]">
				<li>
					<Link
						href="/"
						className="hover:text-primary transition-colors"
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						href="/events"
						className="hover:text-primary transition-colors"
					>
						Browse Events
					</Link>
				</li>
				<li>
					<Link
						href="/gallery"
						className="hover:text-primary transition-colors"
					>
						Gallery
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-primary transition-colors"
					>
						About Us
					</Link>
				</li>
				<li>
					<Link
						href="/sitemap"
						className="hover:text-primary transition-colors"
					>
						Sitemap
					</Link>
				</li>
			</ul>
		</div>
	);
};
