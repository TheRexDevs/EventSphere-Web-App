import Link from "next/link";

import { NavigationMenuItem } from "@/app/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavLinkProps {
	href: string;
	label: string;
	icon?: React.ReactNode;
	isActive: boolean;
	onClick?: () => void;
	mobile?: boolean;
}

const NavLink = ({
	href,
	label,
	icon,
	isActive,
	onClick,
	mobile = false,
}: NavLinkProps) => (
	<NavigationMenuItem>
		<Link
			href={href}
			onClick={onClick}
			className={cn(
				"flex items-center px-3 py-2 font-medium transition-colors",
				mobile ? "text-base" : "text-sm",
				isActive ? "text-black !font-bold" : "text-black"
			)}
		>
			{icon}
			{label}
		</Link>
	</NavigationMenuItem>
);

export default NavLink;
