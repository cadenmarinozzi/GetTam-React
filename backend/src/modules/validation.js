const constants = require('./constants');

function validateIp(ip) {
	return (
		constants.ipRegex.test(ip) || ip === '::ffff:127.0.0.1' || ip === '::1'
	); // Testing
}

function validatePassword(password) {
	return true;
	// return typeof password === 'string' && password.length > 0;
}

function validateSchool(school) {
	return (
		typeof school === 'number' &&
		school >= 0 &&
		school < constants.schools.length
	);
}

function validateEmail(email) {
	return constants.emailRegex.test(email);
}

function validateUsername(name) {
	return typeof name === 'string' && name.length > 0;
}

function validateUser({ username, password }) {
	return true;
	// return validateUsername(username) && validatePassword(password);
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

module.exports = {
	validateIp,
	validateUser,
	validateScore,
	validateSchool,
	validateEmail,
};
