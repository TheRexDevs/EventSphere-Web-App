import { FooterLogo } from "./footer-logo";
import { FooterLinks } from "./footer-links";
import { FooterCategories } from "./footer-categories";
import { FooterContact } from "./footer-contact";
import { FooterBottom } from "./footer-bottom";

export const MainFooter = () => {
	return (
		<footer className="bg-[#667154] border-t border-gray-200">
			<div className="w-site mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-[1]">
				<div className="grid max-md:grid-cols-1 max-lg:grid-cols-3 grid-cols-4 gap-8">
					<FooterLogo />
					<FooterLinks />
					<FooterCategories />
					<FooterContact />
				</div>
			</div>

			<FooterBottom />
		</footer>
	);
};
