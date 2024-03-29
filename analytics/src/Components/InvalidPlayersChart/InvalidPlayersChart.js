import { Component } from 'react';
import { getPlayers, getUsers } from '../../web/firebase';
import { PieChart } from '../Chart';
import validatePlayer from '../../web/validate';
import PropTypes from 'prop-types';

class InvalidPlayers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			invalidPlayers: [],
			players: [],
		};
	}

	async componentDidMount() {
		const players = Object.values(await getUsers());

		this.setState({
			players: players,
			invalidPlayers: players.filter(validatePlayer),
		});
	}

	render() {
		if (this.state.invalidPlayers.length === 0) return;

		return (
			<PieChart
				label="Invalid Players"
				labels={[
					['Invalid Players', `rgba(255, 100, 132, 0.7)`],
					['Valid Players', `rgba(135, 132, 200, 0.7)`],
				]}
				data={[
					this.state.invalidPlayers.length,
					this.state.players.length,
				]}
				theme={this.props.theme}
			/>
		);
	}
}

InvalidPlayers.propTypes = {
	theme: PropTypes.string,
};

export default InvalidPlayers;
