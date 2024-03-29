import { Component } from 'react';
import { DataChart } from '../Chart';
import { getLeaderboard, getUsers } from '../../web/firebase';
import validatePlayer from '../../web/validate';
import PropTypes from 'prop-types';

class LeaderboardChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [],
			data: [],
		};
	}

	async componentDidMount() {
		const leaderboard = (await getUsers())
			.slice(0, 100)
			.reverse()
			.sort((a, b) => a.score - b.score)
			.filter((player) => !validatePlayer(player)); // We reverse the data so it's in descending order

		this.setState({
			labels: leaderboard.map(
				(player, index) =>
					`${player.username} (${leaderboard.length - index})`
			),
			data: leaderboard.map((player) => player.score),
		});
	}

	render() {
		if (this.state.labels.length > 0) {
			return (
				<DataChart
					searchEnabled
					averageEnabled
					predictedEnabled
					label="Score"
					labels={this.state.labels}
					data={this.state.data}
					theme={this.props.theme}
				/>
			);
		}
	}
}

LeaderboardChart.propTypes = {
	theme: PropTypes.string,
};

export default LeaderboardChart;
