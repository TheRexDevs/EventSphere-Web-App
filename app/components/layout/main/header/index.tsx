import StickyHeader from "./sticky-header";
import HeaderContent from "./HeaderContent";

export const MainHeader = ({ noHero=false }: { noHero? : boolean}) => {
	return (
		<StickyHeader noHero={noHero}>
			<HeaderContent noHero={noHero} />
		</StickyHeader>
	);
};
