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
import './Home.scss';

class Home extends Component {
	constructor() {
		super();

		this.state = {
			currentSchool: 'Tamiscal',
			currentScore: 0,
			bestScore: 0,
			bestSchool: 'Tamiscal',
		};
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
						<span>Combine Marin Schools to get Tam!</span>
					</div>
					<Scores
						currentScore={this.state.currentScore}
						currentSchool={this.state.currentSchool}
						bestScore={this.state.bestScore}
						bestSchool={this.state.bestSchool}
					/>
				</div>
				<div className="board-container">
					<div className="board" id="board">
						<Board
							setScore={(currentScore) => {
								this.setState({ currentScore });
							}}
							setSchool={(currentSchool) => {
								this.setState({ currentSchool });
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
					<Button icon={faShare} label="Share By Email" />
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
					/>
				</div>
				<div className="home-credits">
					GetTam was created by <b>Linus Tornqvist</b>,{' '}
					<b>Foster Angus</b>, <b>Adnan Ashraf</b>, and{' '}
					<b>Caden Marinozzi</b>
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
