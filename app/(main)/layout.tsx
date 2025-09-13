import ProtectedLayout from "../components/layout/protected-layout";
import { MainHeader } from "../components/layout/main/header";
import { MainFooter } from "../components/layout/main/footer";
import { MainBody } from "../components/layout/main/body";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<div className="max-w-[105rem] mx-auto flex flex-col">
				<MainHeader />
				<MainBody>{children}</MainBody>
				<MainFooter />
			</div>
		</div>
	);
}
