"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
	end: number;
	duration?: number;
	suffix?: string;
}

export default function Counter({
	end,
	duration = 2000,
	suffix = "",
}: CounterProps) {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let observer: IntersectionObserver;
		let started = false;

		const handleStart = () => {
			if (started) return;
			started = true;

			let startTimestamp: number | null = null;

			const step = (timestamp: number) => {
				if (!startTimestamp) startTimestamp = timestamp;
				const progress = Math.min(
					(timestamp - startTimestamp) / duration,
					1
				);
				setCount(Math.floor(progress * end));

				if (progress < 1) {
					requestAnimationFrame(step);
				}
			};

			requestAnimationFrame(step);
		};

		if (ref.current) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						handleStart();
						observer.disconnect();
					}
				},
				{ threshold: 0.5 }
			);
			observer.observe(ref.current);
		}

		return () => observer && observer.disconnect();
	}, [end, duration]);

	// format with commas
	const formatted = new Intl.NumberFormat().format(count);

	return (
		<div ref={ref} className="text-[32px] font-bold text-primary">
			{formatted}
			{suffix}
		</div>
	);
}
