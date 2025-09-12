"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

	const { user, logout, isLoading } = useAuth();

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
				<div className="flex items-center justify-between py-3 ">
					{/* Logo */}
					<Link href="/">
						<Image
							src={Logo}
							alt="Logo"
							height={0}
							width={0}
							className="h-[67px] w-[220px]"
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:block">
						<NavigationMenu className="max-w-[100%]">
							<NavigationMenuList className="gap-4">
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

					{/* Right side */}
					<div className="hidden md:flex items-center relative !mr-0">
						{isLoading ? (
							<span className="text-sm text-gray-500">
								Loading...
							</span>
						) : !user ? (
							// Show login & signup if no user
							<div className="flex gap-3 ">
								<Link href="/login">
									<Button variant="outline" shape="pill">
										Sign In
									</Button>
								</Link>
								<Link href="/signup">
									<Button shape="pill">Sign Up</Button>
								</Link>
							</div>
						) : (
							// Show welcome + profile menu if logged in
							<>
								<span className="mr-2 text-sm font-medium">
									Welcome,
									{user.firstname ??
										user.firstname ??
										user.email}
								</span>
								<Button
									className="!p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
									onClick={() =>
										setProfileMenuOpen((v) => !v)
									}
									aria-label="Open profile menu"
								>
									<User className="!h-6 !w-6 text-gray-700" />
								</Button>
								<ProfileMenu
									isOpen={profileMenuOpen}
									onClose={() => setProfileMenuOpen(false)}
									onLogout={handleLogout}
								/>
							</>
						)}
					</div>

					{/* Mobile Hamburger */}
					<Button
						variant={"ghost"}
						className="md:hidden !p-2 rounded hover:bg-gray-100 text-base"
						onClick={() => setMobileOpen(true)}
						aria-label="Open menu"
					>
						<Menu className="!h-8 !w-8" />
					</Button>
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
