import Button from 'Components/shared/Button';
import {
	faShare,
	faCopy,
	faArrowRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import logo from 'assets/images/GetTamLogoSmall.ico';
import constants from 'modules/constants';
import { copyToClipboard } from 'modules/utils';
import { Component } from 'react';
import Board from 'Components/containers/Board';
import Scores from 'Components/containers/Scores/Scores';
import cookies from 'modules/cookies';
import web from 'modules/web';
import { Link } from 'react-router-dom';
import './Home.scss';

const changelog = 'Reworked firebase backend';

class Home extends Component {
	constructor() {
		super();

		this.state = {
			currentSchool: 1,
			currentScore: 0,
		};
	}

	async componentDidMount() {
		if (this.state.bestScore) return;

		const scoreData = await web.getScoreData();

		this.setState({
			bestScore: scoreData.score,
			bestSchool: scoreData.school,
		});
	}

	componentDidUpdate() {
		if (this.state.resetBoard) {
			this.setState({
				resetBoard: false, // This is so bad lmao
			});
		}

		let shiftDown = false;
		let spaceDown = false;

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Shift') shiftDown = true;
			if (e.key === ' ') {
				spaceDown = true;

				e.preventDefault();
			}

			if (shiftDown && spaceDown) {
				this.setState({
					resetBoard: true,
				});
			}
		});

		document.addEventListener('keyup', (e) => {
			if (e.key === 'Shift') shiftDown = false;
			if (e.key === ' ') spaceDown = false;
		});
	}

	render() {
		return (
			<div className="home">
				<div className="home-header">
					<div className="home-header-left">
						<div className="home-header-start">
							<img className="home-logo" src={logo} alt="Logo" />
							<h1 className="home-title">GetTam</h1>
						</div>
					</div>
					<Scores
						currentScore={this.state.currentScore}
						currentSchool={
							constants.tiles[this.state.currentSchool - 1].name
						}
						bestScore={this.state.bestScore}
						bestSchool={
							constants.tiles[this.state.bestSchool - 1]?.name
						}
					/>
				</div>
				<div className="board-container">
					<span>
						Press the Shift and Space key together to reset the
						board.
					</span>
					<span className="changelog">Changelog: {changelog}</span>
					<div className="board" id="board">
						<Board
							resetBoard={this.state.resetBoard}
							setScore={async (currentScore) => {
								const bestScore = parseInt(
									cookies.get('best-score')
								);
								this.setState({ currentScore });

								if (currentScore > bestScore) {
									cookies.set('best-score', currentScore);
									this.setState({ bestScore: currentScore });
									await web.updateScore(currentScore);
								}
							}}
							setSchool={async (currentSchool) => {
								const bestSchool = cookies.get('best-school');

								this.setState({ currentSchool });

								if (currentSchool > bestSchool) {
									cookies.set('best-school', currentSchool);
									this.setState({
										bestSchool: currentSchool,
									});

									await web.updateSchool(currentSchool);
								}
							}}
						/>
					</div>
				</div>
				<div className="home-footer">
					<span>
						<b>HOW TO PLAY: </b>
						<span>
							Use your <b>arrow keys</b> or <b>swipe</b> with your
							finger to move the tiles. When two tiles of the same
							shcool overlap, they <b>combine!</b>
						</span>
					</span>
					<span>
						<b>NOTE: </b>
						<span>
							The order of schools is <b>not</b> intended to be a
							ranking. It is based on when the school was
							founded/built, with Tam being the oldest.
						</span>
					</span>
				</div>
				<div className="home-buttons">
					<Button
						icon={faCopy}
						label="Copy Link"
						onClick={() => {
							copyToClipboard(window.location.href);
						}}
					/>
					<Button
						danger
						icon={faArrowRotateRight}
						label="Reset Board"
						onClick={() => {
							this.setState({
								resetBoard: true,
							});
						}}
					/>
				</div>
				<div className="home-credits">
					GetTam was created by <b>Caden Marinozzi</b>,{' '}
					<b>Linus Tornqvist</b>, <b>Foster Angus</b>, and{' '}
					<b>Adnan Ashraf</b>. See the full Credits{' '}
					<Link to="/credits">Here</Link>.
					<br />
					<br />
					Inspired by GetMit.{' '}
					<a href="https://tamcsclub.github.io/">Tam CS Club</a>
				</div>
				<div className="home-tiles-container">
					<div className="home-tiles">
						{constants.tiles.map((tile, index) => {
							return (
								<div className="home-tile" key={index}>
									<img
										className="home-tile-image"
										src={tile.image}
										alt={tile.name}
									/>
									<div className="home-tile-details">
										<h3 className="home-tile-name">
											{tile.name}
										</h3>
										Worth: {tile.worth}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
