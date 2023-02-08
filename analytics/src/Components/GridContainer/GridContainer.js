import './GridContainer.scss';

function GridItem(props) {
	return <div className="grid-item">{props.children}</div>;
}

function GridContainer(props) {
	if (!props.children) return null;

	if (!Array.isArray(props.children)) {
		return (
			<section className="grid-container">
				<GridItem>{props.children}</GridItem>
			</section>
		);
	}

	const grid = props.children.map((item, index) => {
		return <GridItem key={index}>{item}</GridItem>;
	});

	return <section className="grid-container">{grid}</section>;
}

export default GridContainer;
