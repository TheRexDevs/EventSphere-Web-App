import Link from "next/link";

import { Button } from "../ui/button";
import { ReactNode } from "react";

interface CTA {
	link: string;
	label: string;
	colorType?: "secondary" | "primary";
}

type HeroProps = {
	title: string;
	subtitle: string;
	ctas?: CTA[];
	backgroundImageUrl?: string;
	overlay?: boolean;
	height?: string;
	alignment?: "left" | "center" | "right";
    children?: ReactNode;
};

/**
 * Reusable hero section component with customizable background and content
 */
export default function HeroSection({
	title,
	subtitle,
	ctas = [],
	backgroundImageUrl,
	overlay = true,
	height = "90svh",
	alignment = "center",
    children
}: HeroProps) {

    const alignmentStyles =
		alignment === "center"
			? "items-center text-center max-w-[1060px]"
			: alignment === "right"
			? "items-start text-right md:!gap-8 max-md:pt-[170px] max-md:!justify-start "
			: "items-start text-left md:!gap-8 max-md:pt-[170px] max-md:!justify-start ";

	const titleStyles =
		height === "90svh"
			? "text-[3.375em] md:text-6xl lg:text-[5rem] max-w-[1060px]"
			: "text-5xl md:text-3xl lg:text-5xl";
	const subtitleStyles =
		height === "90svh"
			? "text-base md:text-lg max-w-[955px]"
			: "text-sm md:text-[1.125em] max-w-[1028px]";
	const subtitleCtaStyles =
		height === "90svh"
			? "flex-col gap-4 sm:gap-6 md:gap-18"
			: "flex-col lg:flex-col gap-4 sm:gap-6 md:gap-10 items-start lg:items-center justify-start lg:justify-center";
	const ctaStyles =
		height === "90svh"
			? "justify-center"
			: "max-md:absolute max-md:w-full left-[0px] bottom-[60px]";

	return (
		<section
			id="heroSection"
			className={`heroSection fit-img relative text-white max-md:!h-[90svh]`}
			style={{
				backgroundImage: backgroundImageUrl
					? `url(${backgroundImageUrl || "/mecca-bg.png"})`
					: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				height: `${height}`,
			}}
		>
			<div className="w-site h-full relative z-[1]">
				<div
					className={`"hero-content h-full flex flex-col gap-4 sm:gap-6 md:gap-6 mx-auto px-4" justify-center relative ${alignmentStyles}`}
				>
					<h2
						className={`${titleStyles} font-extrabold !mb-[0] text-white`}
					>
						{title}
					</h2>

					{/* subtitle and ctas */}
					<div className={`flex ${subtitleCtaStyles}`}>
						<p className={`${subtitleStyles}`}>{subtitle}</p>

						{ctas.length > 0 && (
							<div
								className={`ctas flex flex-wrap justify-center gap-3 md:gap-4 ${ctaStyles}`}
							>
								{ctas.map((cta, index) => (
									<Button
										key={index}
										variant={
											cta.colorType == "secondary"
												? "secondary"
												: "default"
										}
										asChild
										className={`text-white whitespace-nowrap !py-3 !px-6 ${
											height !== "100svh" &&
											"max-md:w-full"
										}`}
									>
										<Link href={cta.link}>{cta.label}</Link>
									</Button>
								))}
							</div>
						)}
					</div>

                    {children}
				</div>
			</div>
			{/* Overlay */}
			{overlay && (
				<div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black-500/30 to-primary/20" />
			)}
		</section>
	);
}
