const { sumPowers } = require('./utils');

const constants = {
	ipRegex: /^(\d{1,3}\.){3}\d{1,3}$/,
	idRegex: /^([a-z]){3}([0-9]{1,3})$/,
	emailRegex: /^(.+)\.(.+)@student\.(.+)\.(.+)$/,
	maxTile: 2 ** sumPowers(2, 1, 13),
	numTiles: 4 * 4,
	schools: [
		'Tamiscal',
		'Marin Academy',
		'San Marin',
		'Terra Linda',
		'Redwood',
		'Novato',
		'Archie Williams',
		'Marin Catholic',
		'San Rafael',
		'Branson',
		'Tam High',
	],
};

module.exports = constants;
