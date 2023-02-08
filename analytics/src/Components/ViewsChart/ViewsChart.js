import { Component } from 'react';
import { DataChart } from '../Chart';
import { getSiteViews } from 'web/firebase';

/**
 *
 * @param {string} date - The date to be formatted. Should be in the format M-D-TESTING or M-D
 * @return {Object} An object containing the parsed date
 */
function parseDate(date, value) {
	const dateData = new Date(date); // Create the date object
	const month = dateData.getMonth();
	const day = dateData.getDate();

	return {
		month: month,
		day: day,
		siteViews: value,
		date: dateData,
		comparativeDate: dateData[Symbol.toPrimitive]('number'), // Get the numerical representation of the date
	};
}

class ViewsChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			labels: [],
		};
	}

	async componentDidMount() {
		const siteViews = await getSiteViews();
		console.log(siteViews);
		const labels = Object.entries(siteViews)
			// Map the values to the parsed date
			.map(([key, value]) => parseDate(key, value))
			// Sort the dates from oldest to newest
			.sort((a, b) => a.comparativeDate - b.comparativeDate);

		this.setState({
			labels: labels.map(
				(date) => date.date.toDateString().replace('2022', '') // ew
			),
			data: labels.map((dateData) => dateData.siteViews),
		});
	}

	render() {
		if (this.state.labels.length > 0) {
			return (
				<DataChart
					averageEnabled
					predictedEnabled
					label="Games Played"
					labels={this.state.labels}
					data={this.state.data}
					theme={this.props.theme}
				/>
			);
		}
	}
}

export default ViewsChart;
