"use client"

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Carousel3DC.module.css";

const images = [
    "/3d-img/first-img.jpg",
    "/3d-img/second-img.jpg",
    "/3d-img/third-img.jpg",
    "/3d-img/fourth-img.jpg"
];

const Carousel3D = ({ initial = 0 }: { initial?: number }) => {
	const n = images.length;
	const [center, setCenter] = useState(((initial % n) + n) % n);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const dragging = useRef(false);
	const startX = useRef(0);
	const threshold = 50; // pixels to trigger a swipe

	// Normalize index difference into range [-floor(n/2), floor(n/2)]
	const relativePos = (idx: number) => {
		let diff = idx - center;
		if (diff > n / 2) diff -= n;
		if (diff < -n / 2) diff += n;
		return diff;
	};

	function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
		dragging.current = true;
		startX.current = e.clientX;
		if (containerRef.current) {
			containerRef.current.style.cursor = "grabbing";
		}
	}

	function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
		if (!dragging.current) return;
		const dx = e.clientX - startX.current;
		if (Math.abs(dx) > threshold) {
			if (dx > 0) {
				setCenter((c) => (c - 1 + n) % n); // swipe right → previous
			} else {
				setCenter((c) => (c + 1) % n); // swipe left → next
			}
			startX.current = e.clientX;
		}
	}

	function onPointerUp() {
		dragging.current = false;
		if (containerRef.current) {
			containerRef.current.style.cursor = "grab";
		}
	}

	// Keyboard support
	useEffect(() => {
		const onKey = (ev: KeyboardEvent) => {
			if (ev.key === "ArrowLeft") setCenter((c) => (c - 1 + n) % n);
			if (ev.key === "ArrowRight") setCenter((c) => (c + 1) % n);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [n]);

	// Auto-rotate carousel
	useEffect(() => {
		const interval = setInterval(() => {
			setCenter((c) => (c + 1) % n);
		}, 4000);
		return () => clearInterval(interval);
	}, [n]);

	return (
		<div className={styles.wrapper}>
			<div
				ref={containerRef}
				className={styles.stage}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
				role="listbox"
				aria-label="3D C-shaped carousel"
				style={{ cursor: "grab" }}
			>
				{images.map((src, idx) => {
					const pos = relativePos(idx);
					const abs = Math.abs(pos);

					// Adjusted values for a more pronounced C-shape
					const slideSpacing = 240;
					const rotateY = pos * -30;
					const translateX = pos * slideSpacing;
					const translateZ = -abs * 150;
					const translateY = pos === 0 ? 0 : Math.abs(pos) * 40;
					const scale = Math.max(0.6, 1 - abs * 0.2);
					const zIndex = 100 - abs;
					const opacity = Math.max(0.2, 1 - abs * 0.3);

					const style: React.CSSProperties = {
						transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
						zIndex,
						opacity,
						transition: dragging.current
							? "none"
							: "transform 700ms cubic-bezier(0.23, 1, 0.32, 1), opacity 500ms",
					};

					return (
						<div
							key={idx}
							className={styles.slide}
							style={style}
							aria-hidden={pos !== 0}
							onClick={() => setCenter(idx)}
						>
							<Image
								src={src}
								alt={`slide-${idx}`}
								width={380}
								height={240}
								className={styles.img}
								priority={idx === center}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Carousel3D