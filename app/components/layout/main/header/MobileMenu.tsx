import Link from "next/link";
import { Store, User, Shield, LogOut, X } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import NavLink from "./NavLink";

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onLogout: () => void;
	isActive: (path: string) => boolean;
}

export const mainNavLinks = [
	{ href: "/", label: "Home", icon: null },
	{ href: "/events", label: "Events", icon: null },
	{ href: "/gallery", label: "Gallery", icon: null },
	{ href: "/about", label: "About", icon: null },
	{ href: "/contact", label: "Contact", icon: null },
];

const MobileMenu = ({
	isOpen,
	onClose,
	onLogout,
	isActive,
}: MobileMenuProps) => {
	const profileLinks = [
		{
			href: "/account",
			label: "Profile Settings",
			icon: <User className="h-4 w-4" />,
		},
		{
			href: "/registered-events",
			label: "Registered event",
			icon: <Shield className="h-4 w-4 mr-2" />,
		},

		{
			href: "/certificate",
			label: "Certificate",
			icon: null,
		},
	];

	return (
		<div
			className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${
				isOpen ? "visible" : "invisible pointer-events-none"
			}`}
		>
			{/* Overlay */}
			<div
				className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
				onClick={onClose}
			/>

			{/* Slide-in Panel */}
			<div
				className={`absolute top-0 right-0 h-full w-72 bg-white shadow-lg transition-transform duration-300 flex flex-col ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between px-4 py-4 border-b">
					<Link
						href="/"
						className="text-2xl font-bold text-gray-900"
						onClick={onClose}
					>
						FolioEngine
					</Link>
					<Button
						variant="ghost"
						className="!p-2 hover:bg-gray-100"
						onClick={onClose}
						aria-label="Close menu"
					>
						<span className="sr-only">Close</span>
						<X className="!h-6 !w-6" />
					</Button>
				</div>

				<nav className="flex-1 overflow-y-auto px-4 py-6">
					<ul className="flex flex-col space-y-2">
						{mainNavLinks.map((link) => (
							<NavLink
								key={link.href}
								href={link.href}
								label={link.label}
								icon={link.icon}
								isActive={isActive(link.href)}
								onClick={onClose}
								mobile
							/>
						))}
					</ul>

					{/* Profile Section */}
					<ul className="flex flex-col mt-8 border-t pt-4 space-y-2">
						{profileLinks.map((link) => (
							<NavLink
								key={link.href}
								href={link.href}
								label={link.label}
								icon={link.icon}
								isActive={isActive(link.href)}
								onClick={onClose}
								mobile
							/>
						))}
						<Button
							variant="ghost"
							className="flex !justify-start items-center gap-2 w-full !px-3 !py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors mt-2"
							onClick={() => {
								onClose();
								onLogout();
							}}
						>
							<LogOut className="!h-4 !w-4" />
							Logout
						</Button>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default MobileMenu;
