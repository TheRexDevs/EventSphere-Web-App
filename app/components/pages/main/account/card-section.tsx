import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";

interface CardSectionProps {
	title: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
    className?: string;
}

const CardSection = ({
	title,
	icon,
	className = "",
	children,
}: CardSectionProps) => (
	<Card className={`grow ${className}`}>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				{icon && icon}
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-6">{children}</CardContent>
	</Card>
);

export default CardSection;