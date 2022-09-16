import './Scores.scss';

function Scores({ currentScore, currentSchool, bestScore, bestSchool }) {
	return (
		<div className="scores-container">
			<div className="score-label">BEST</div>
			<div />
			<div className="score">
				<div className="score-value">{bestScore}</div>
			</div>
			<div className="score">
				<div className="score-school">{bestSchool}</div>
			</div>
			<div className="score-label">CURRENT</div>
			<div />
			<div className="score">
				<div className="score-value">{currentScore}</div>
			</div>
			<div className="score">
				<div className="score-school">{currentSchool}</div>
			</div>
		</div>
	);
}

export default Scores;
