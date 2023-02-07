import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import cookies from 'modules/cookies';
import web from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Leaderboard.scss';

class Leaderboard extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentDidMount() {
		const users = await web.getUsers();

		const leaderboard = users.sort((a, b) => b.score - a.score);

		this.setState({
			leaderboard: leaderboard,
		});
	}

	render() {
		return (
			<>
				<div className="back-button">
					<Link to="/">
						<Button label="Back" icon={faArrowLeft} />
					</Link>
				</div>
				<div className="leaderboard">
					<div className="leaderboard-header">
						<h1 className="leaderboard-title">Leaderboard</h1>
					</div>
					{/* I don't want to change the look of the leaderboard so I have to used tables... I hate tables... Why cruel world... */}
					<table className="leaderboard-contents">
						<thead className="leaderboard-contents-header">
							<tr>
								<th width="120">Rank</th>
								<th width="390">Name</th>
								<th width="90">Score</th>
							</tr>
						</thead>
						<tbody className="leaderboard-contents-body">
							{this.state.leaderboard
								?.slice(0, 100)
								.map((user, index) => {
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td
												className={`${
													user.username ===
														cookies.get(
															'username'
														) && 'active-user'
												}`}>
												{user.username}
											</td>
											<td>{user.score}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</>
		);
	}
}

export default Leaderboard;
