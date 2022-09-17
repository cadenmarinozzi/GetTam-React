const constants = require('./constants');

function validateIp(ip) {
	return constants.ipRegex.test(ip) || ip === '::ffff:127.0.0.1'; // Testing
}

function validateId(id) {
	return constants.idRegex.test(id);
}

function validateName(name) {
	return typeof name === 'string' && name.length > 0;
}

function validateUid(uid) {
	return typeof uid === 'string';
}

function validateUser({ uid, id, name }) {
	return validateUid(uid) && validateId(id) && validateName(name);
}

function validateScore(score) {
	return (
		typeof score === 'number' &&
		score >= 0 &&
		!isNaN(score) &&
		isFinite(score) &&
		score <= constants.maxTile * constants.numTiles &&
		score % 1 === 0 &&
		score % 2 === 0
	);
}

module.exports = { validateIp, validateUser, validateScore };
