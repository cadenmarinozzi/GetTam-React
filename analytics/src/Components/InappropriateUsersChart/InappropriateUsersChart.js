import { getPlayers, getUsers } from '../../web/firebase';
import { PieChart } from '../Chart';
import filter from '../../web/filter';
import { Component } from 'react';
import PropTypes from 'prop-types';

class InappropriateUsersChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inappropriateUsers: [],
			players: [],
		};
	}

	async componentDidMount() {
		const players = Object.values(await getUsers());
		this.setState({
			players: players,
			inappropriateUsers: players.filter((player) =>
				filter(player.username)
			),
		});
	}

	render() {
		if (this.state.inappropriateUsers.length === 0) return;

		return (
			<div>
				<PieChart
					label="Inappropriate User Names"
					labels={[
						['Appropriate', `rgba(255, 100, 132, 0.7)`],
						['Inappropriate', `rgba(135, 132, 200, 0.7)`],
					]}
					data={[
						this.state.players.length,
						this.state.inappropriateUsers.length,
					]}
					thene={this.props.theme}
				/>
			</div>
		);
	}
}

InappropriateUsersChart.propTypes = {
	theme: PropTypes.string,
};

export default InappropriateUsersChart;
