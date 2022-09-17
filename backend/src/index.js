const express = require('express');
const { getRequestIp } = require('./modules/utils.js');
const validation = require('./modules/validation.js');
const firebase = require('./modules/firebase.js');

const app = express();
app.use(express.json());

app.get('*', (req, res) => {
	res.status(200).end('https://lankmann.github.io/GetTam/');
});

app.get('/get/Leaderboard', async (req, res) => {
	try {
		const leaderboard = await firebase.getLeaderboard();
		res.status(200).json(leaderboard);
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/update/Leaderboard', async (req, res) => {
	try {
		const requestIp = getRequestIp(req);
		const user = req.body;

		if (!validation.validateIp(requestIp)) {
			return res.status(400).end('Invalid IP');
		}

		if (!validation.validateUser(user)) {
			return res.status(400).end('Invalid User');
		}

		if (await firebase.isUserBlacklisted([requestIp, user.id, user.name])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (!(await firebase.userExists(user))) {
			return res.status(400).end('User Does Not Exist');
		}

		if (validation.validateScore(user.score)) {
			await firebase.updateLeaderboard(user);

			return res.status(200).end('OK');
		}

		res.status(400).end('Invalid Score');
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/update/user/score', async (req, res) => {
	try {
		const requestIp = getRequestIp(req);
		const user = req.body;

		if (!validation.validateIp(requestIp)) {
			return res.status(400).end('Invalid IP');
		}

		if (!validation.validateUser(user)) {
			return res.status(400).end('Invalid User');
		}

		if (await firebase.isUserBlacklisted([requestIp, user.id, user.name])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (!(await firebase.userExists(user))) {
			return res.status(400).end('User Does Not Exist');
		}

		if (validation.validateScore(user.score)) {
			await firebase.updateUserScore(user);

			return res.status(200).end('OK');
		}

		res.status(400).end('Invalid Score');
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/create/user', async (req, res) => {
	try {
		const requestIp = getRequestIp(req);
		const user = req.body;

		if (!validation.validateIp(requestIp)) {
			return res.status(400).end('Invalid IP');
		}

		if (!validation.validateUser(user)) {
			return res.status(400).end('Invalid User');
		}

		if (await firebase.isUserBlacklisted([requestIp, user.id, user.name])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (!(await firebase.userExists(user))) {
			await firebase.createUser(user);

			return res.status(200).end('OK');
		}

		res.status(400).end('User already exists');
	} catch (err) {
		console.error(err);
		res.status(400).end('Internal Server Error');
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`GetTam-Backend Running on port ${port}`);
});
