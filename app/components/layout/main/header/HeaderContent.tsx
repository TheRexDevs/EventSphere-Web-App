"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuList,
} from "@/app/components/ui/navigation-menu";
import { User, Menu } from "lucide-react";
import NavLink from "./NavLink";
import ProfileMenu from "./ProfileMenu";
import MobileMenu, { mainNavLinks } from "./MobileMenu";
import { useAuth } from "@/app/contexts/AuthContext";
import { showToast } from "@/lib/utils/toast";
import Logo from "@/public/Logo.png";
import Image from "next/image";

const HeaderContent = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);

	const { logout, user } = useAuth();

	const handleLogout = useCallback(() => {
		logout().finally(() => {
			showToast.success("Logged out");
			router.replace("/login");
		});
	}, [logout, router]);

	const isActive = useCallback(
		(path: string) => pathname === path,
		[pathname]
	);

	return (
		<header className="w-full bg-card border-b border-gray-200">
			<div className="w-site mx-auto">
				<div className="flex items-center justify-between py-4">
					{/* Logo */}
					<Link href="/" className="flex-shrink-0">
						<div className="fit-img h-12 w-auto">
							<Image
								src="/logo.png"
								alt="Event Sphere"
								objectFit="cover"
								priority
								width={0}
								height={0}
								sizes="100vw"
								className="w-full h-full object-cover"
							/>
						</div>
					</Link>

					{/* Desktop Navigation - Centered */}
					<nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
						<NavigationMenu>
							<NavigationMenuList className="space-x-6">
								{mainNavLinks.map((link) => (
									<NavLink
										key={link.href}
										href={link.href}
										label={link.label}
										icon={link.icon}
										isActive={isActive(link.href)}
									/>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</nav>

					{/* Right Side - Conditional */}
					<div className="flex items-center space-x-3">
						{user ? (
							/* Profile Icon (Desktop) - When logged in */
							<div className="hidden md:flex items-center relative">
								<Button
									className="!p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
									onClick={() =>
										setProfileMenuOpen((v) => !v)
									}
									aria-label="Open profile menu"
								>
									<User className="!h-6 !w-6 text-gray-700" />
								</Button>
								{/* Profile Dropdown */}
								<ProfileMenu
									isOpen={profileMenuOpen}
									onClose={() => setProfileMenuOpen(false)}
									onLogout={handleLogout}
								/>
							</div>
						) : (
							/* Login/Signup Buttons - When not logged in */
							<div className="hidden md:flex items-center space-x-3">
								<Button
									variant="outline"
									className="rounded-full px-6 py-2"
									onClick={() => router.push("/login")}
								>
									Sign In
								</Button>
								<Button
									className="rounded-full px-6 py-2"
									onClick={() => router.push("/signup")}
								>
									Sign Up
								</Button>
							</div>
						)}

						{/* Hamburger (Mobile) */}
						<Button
							variant={"ghost"}
							className="lg:hidden !p-2 rounded hover:bg-gray-100 text-base"
							onClick={() => setMobileOpen(true)}
							aria-label="Open menu"
						>
							<Menu className="!h-8 !w-8" />
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Slide-in Menu */}
			<MobileMenu
				isOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
				onLogout={handleLogout}
				isActive={isActive}
			/>
		</header>
	);
};

export default HeaderContent;
