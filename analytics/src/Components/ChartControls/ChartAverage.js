import { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from '../Toggle';

class ChartAverage extends Component {
	handleClick(enabled) {
		let annotation =
			this.props.chartState.chart?.config.options.plugins.annotation
				.annotations[0];
		if (!annotation) return;

		annotation.borderWidth = enabled ? 2 : 0;
		annotation.label.enabled = enabled;
		this.props.chartState.chart.update();
	}

	render() {
		return (
			<Toggle
				label="Show Average"
				enabled={this.props.enabled}
				onClick={this.handleClick.bind(this)}
			/>
		);
	}
}

ChartAverage.propTypes = {
	chartState: PropTypes.shape({
		chart: PropTypes.object
	}).isRequired,
	enabled: PropTypes.bool
};

export default ChartAverage;
