export const MainBody = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className="wrapper min-h-[90svh] flex-1 py-8 pt-26">
			{children}
		</main>
	);
};
