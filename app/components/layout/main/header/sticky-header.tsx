"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const StickyHeader = ({ children }: { children: React.ReactNode }) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`${styles.stickyNav} ${
				isScrolled ? styles.scrolled : ""
			}`}
		>
			{children}
		</div>
	);
};

export default StickyHeader;
