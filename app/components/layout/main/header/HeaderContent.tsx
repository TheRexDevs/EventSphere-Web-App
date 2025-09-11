"use client"
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

const HeaderContent = () => {
    const router = useRouter();
	const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const { logout } = useAuth();

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
				<div className="flex items-center justify-between py-4 space-x-8">
					<div className="flex items-center grow space-x-8">
						{/* Logo */}
						<Link
							href="/"
							className="text-2xl font-bold text-gray-900"
						>
							FolioEngine
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden md:block grow">
							<NavigationMenu className="max-w-[100%] justify-end">
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
					</div>

					{/* Profile Icon (Desktop) */}
					<div className="hidden md:flex items-center relative !mr-0">
						<Button
							className="!p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
							onClick={() => setProfileMenuOpen((v) => !v)}
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

					{/* Hamburger (Mobile) */}
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
}

export default HeaderContent