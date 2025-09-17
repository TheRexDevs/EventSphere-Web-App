"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
	/** Final value to count up to */
	end: number;
	/** Optional label rendered under the number */
	label?: string;
	/** Optional suffix appended to the number (e.g. "+", "%") */
	suffix?: string;
	/** Animation duration in ms */
	duration?: number;
}

/**
 * Animated counter that starts when it becomes visible in the viewport.
 * Renders an optional label beneath the animated value.
 */
export default function Counter({ end, label, suffix = "", duration = 2000 }: CounterProps) {
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
				const progress = Math.min((timestamp - startTimestamp) / duration, 1);
				setCount(Math.floor(progress * end));
				if (progress < 1) requestAnimationFrame(step);
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

	const formatted = new Intl.NumberFormat().format(count);

	return (
		<div className="flex flex-col items-center">
			<div ref={ref} className="text-[32px] md:text-[40px] font-bold text-primary leading-none">
				{formatted}
				{suffix}
			</div>
			{label && (
				<p className="text-foreground/70 text-center mt-2 text-sm md:text-base">{label}</p>
			)}
		</div>
	);
}


