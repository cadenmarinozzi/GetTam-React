function getRequestIp(req) {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

function compareUser(user, otherUser, uid) {
	return (
		(uid ? uid === user.uid : true) &&
		otherUser.id === user.id &&
		otherUser.name === user.name
	);
}

const sumPowers = (x, a, b, sum = 0) =>
	a > b ? sum : sumPowers(x, a + 1, b, sum + x ** a);

module.exports = { getRequestIp, compareUser, sumPowers };
