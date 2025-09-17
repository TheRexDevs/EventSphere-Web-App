import Link from "next/link";
import { Button } from '@/app/components/ui/button';
import { User, LogOut, CalendarCheck } from "lucide-react";

interface ProfileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onLogout: () => void;
}

const ProfileMenu = ({
	isOpen,
	onClose,
	onLogout,
}: ProfileMenuProps) => {
	if (!isOpen) return null;

	const profileLinks = [
		{
			href: "/account",
			label: "Profile Settings",
			icon: <User className="h-4 w-4 mr-2" />,
		},
		{
			href: "/dashboard",
			label: "My Dashboard",
			icon: <CalendarCheck className="h-4 w-4 mr-2" />,
		},
	];

	return (
		<div
			className="absolute left-[-70px] top-11 mt-2 w-56 bg-card border border-border shadow-lg z-50 overflow-hidden"
			onMouseLeave={onClose}
		>
			{profileLinks.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="flex items-center px-4 py-2 text-sm hover:bg-background/80"
					onClick={onClose}
				>
					{link.icon}
					{link.label}
				</Link>
			))}
			<Button
				variant="ghost"
				className="flex justify-start items-center w-full px-4 py-2 text-sm text-foreground hover:bg-gray-100"
				onClick={() => {
					onClose();
					onLogout();
				}}
			>
				<LogOut className="h-4 w-4 mr-2" />
				Logout
			</Button>
		</div>
	);
};

export default ProfileMenu