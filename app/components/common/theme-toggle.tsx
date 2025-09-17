"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export const ThemeToggle = () => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="icon" className="theme-toggle">
				<div className="h-5 w-5" />
			</Button>
		);
	}

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className="theme-toggle relative overflow-hidden"
			aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
		>
			<div className="relative h-5 w-5">
				{/* Sun icon */}
				<Sun
					className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
						resolvedTheme === "dark"
							? "rotate-90 scale-0 opacity-0"
							: "rotate-0 scale-100 opacity-100"
					}`}
				/>
				{/* Moon icon */}
				<Moon
					className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
						resolvedTheme === "dark"
							? "rotate-0 scale-100 opacity-100"
							: "-rotate-90 scale-0 opacity-0"
					}`}
				/>
			</div>
		</Button>
	);
};
