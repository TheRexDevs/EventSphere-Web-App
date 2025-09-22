"use client";

import { useScroll } from "@/app/hooks/useScroll";
import styles from "./styles.module.css";

export interface HeaderProps {
	children: React.ReactNode;
	noHero?: boolean;
}

const StickyHeader = ({ noHero=false, children }: HeaderProps) => {
	const isScrolled = useScroll(10);

	return (
		<div
			className={`${styles.stickyNav} 
			${
				noHero ? styles.noHero : ""
			} ${
				isScrolled ? styles.scrolled : ""
			}`}
		>
			{children}
		</div>
	);
};

export default StickyHeader;
