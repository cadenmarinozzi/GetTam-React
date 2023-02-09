import cookies from 'modules/cookies';
import web from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Scores.scss';

class Scores extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<Link to="/leaderboard">
				<div className="scores-container">
					<div className="score-label">BEST</div>
					<div />
					<div className="score">
						<div className="score-value">
							{this.props.bestScore}
						</div>
					</div>
					<div className="score">
						<div className="score-school">
							{this.props.bestSchool}
						</div>
					</div>
					<div className="score-label">CURRENT</div>
					<div />
					<div className="score">
						<div className="score-value">
							{this.props.currentScore}
						</div>
					</div>
					<div className="score">
						<div className="score-school">
							{this.props.currentSchool}
						</div>
					</div>
					<div className="score-button">
						Click to view leaderboard
					</div>
				</div>
			</Link>
		);
	}
}

export default Scores;
