const shajs = require('sha.js');

function getRequestIp(req) {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

function sha256(input) {
	return shajs('sha256').update(input).digest('hex');
}

const sumPowers = (x, a, b, sum = 0) =>
	a > b ? sum : sumPowers(x, a + 1, b, sum + x ** a);

module.exports = { getRequestIp, sumPowers, sha256 };
