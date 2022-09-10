import './Body.scss';

function Body({ children }) {
	return (
		<div className="body-container">
			<div className="body">{children}</div>
		</div>
	);
}

export default Body;
