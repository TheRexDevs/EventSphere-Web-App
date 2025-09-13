export const MainBody = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className="wrapper min-h-[90svh] flex-1 pb-8">
			{children}
		</main>
	);
};
