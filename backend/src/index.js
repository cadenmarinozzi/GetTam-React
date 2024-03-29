const express = require('express');
const { getRequestIp } = require('./modules/utils.js');
const validation = require('./modules/validation.js');
const firebase = require('./modules/firebase.js');

// const firebase = require('./modules/firebaseLegacy.js');
const sendEmail = require('./modules/mail');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.get('*', (req, res) => {
	res.status(200).end('https://gettamgame.com');
});

app.post('/legacy/request', async (req, res) => {
	try {
		const requestIp = getRequestIp(req);
		const user = req.body;

		if (!validation.validateIp(requestIp)) {
			return res.status(400).end('Invalid IP');
		}

		if (await firebase.isUserBlacklisted([requestIp])) {
			return res.status(403).end('User Is Blacklisted');
		}
		if (!validation.validateEmail(user.email)) {
			return res.status(400).end('Invalid school email');
		}

		sendEmail({
			toEmail: process.env.MAILER_EMAIL,
			subject: 'GetTam Legacy Request',
			body: `Legacy Account Requested for: ${user.username}. Email: ${user.email}`,
		});

		res.status(200).end('OK');
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/login/user', async (req, res) => {
	try {
		const requestIp = getRequestIp(req);
		const user = req.body;

		if (!validation.validateIp(requestIp)) {
			return res.status(400).end('Invalid IP');
		}

		if (!validation.validateUser(user)) {
			return res.status(400).end('Invalid User');
		}

		if (await firebase.isUserBlacklisted([requestIp, user.username])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (!(await firebase.userExists(user))) {
			return res.status(400).end('User Does Not Exist');
		}

		if (!(await firebase.login(user))) {
			return res.status(200).end('User Is Not Logged In');
		}

		return res.status(200).end('OK');
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

		if (await firebase.isUserBlacklisted([requestIp, user.username])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (!(await firebase.userExists(user))) {
			return res.status(400).end('User Does Not Exist');
		}

		if (!(await firebase.login(user))) {
			return res.status(403).end('User Is Not Logged In');
		}

		if (!validation.validateScore(user.score)) {
			return res.status(400).end('Invalid Score');
		}

		await firebase.updateScore(user);

		return res.status(200).end('OK');
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/get/users', async (req, res) => {
	try {
		// const requestIp = getRequestIp(req);
		const user = req.body;

		// if (!validation.validateIp(requestIp)) {
		// 	return res.status(400).end('Invalid IP');
		// }

		// if (!validation.validateUser(user)) {
		// 	return res.status(400).end('Invalid User');
		// }

		// if (await firebase.isUserBlacklisted([requestIp, user.username])) {
		// 	return res.status(403).end('User Is Blacklisted');
		// }

		// if (!(await firebase.userExists(user))) {
		// 	return res.status(400).end('User Does Not Exist');
		// }

		// if (!(await firebase.login(user))) {
		// 	return res.status(403).end('User Is Not Logged In');
		// }

		const users = await firebase.getUsers();
		let clientUsers = [];

		for (const [userId, user] of Object.entries(users)) {
			clientUsers.push({
				userId: userId,
				score: user.score,
				username: user.username,
				school: user.school,
			});
		}

		return res.status(200).json(clientUsers);
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/update/user/school', async (req, res) => {
	try {
		const requestIp = getRequestIp(req);
		const user = req.body;

		if (!validation.validateIp(requestIp)) {
			return res.status(400).end('Invalid IP');
		}

		if (!validation.validateUser(user)) {
			return res.status(400).end('Invalid User');
		}

		if (await firebase.isUserBlacklisted([requestIp, user.username])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (!(await firebase.userExists(user))) {
			return res.status(400).end('User Does Not Exist');
		}

		if (!(await firebase.login(user))) {
			return res.status(403).end('User Is Not Logged In');
		}

		if (!validation.validateSchool(user.school)) {
			return res.status(400).end('Invalid School');
		}

		await firebase.updateSchool(user);

		return res.status(200).end('OK');
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/get/user/scoreData', async (req, res) => {
	try {
		const requestIp = getRequestIp(req);
		const user = req.body;

		if (!validation.validateIp(requestIp)) {
			return res.status(400).end('Invalid IP');
		}

		if (!validation.validateUser(user)) {
			return res.status(400).end('Invalid User');
		}

		if (await firebase.isUserBlacklisted([requestIp, user.username])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (!(await firebase.userExists(user))) {
			return res.status(400).end('User Does Not Exist');
		}

		if (!(await firebase.login(user))) {
			return res.status(403).end('User Is Not Logged In');
		}

		const scoreData = await firebase.getScoreData(user);

		res.status(200).json(scoreData);
	} catch (err) {
		console.error(err);
		res.status(500).end('Internal Server Error');
	}
});

app.post('/add/siteView', async (req, res) => {
	try {
		await firebase.addSiteView();

		res.status(200).end('OK');
	} catch (err) {
		console.error(err);
		res.status(400).end('Internal Server Error');
	}
});

app.post('/get/siteViews', async (req, res) => {
	try {
		const siteViews = await firebase.getSiteViews();

		res.status(200).json(siteViews);
	} catch (err) {
		console.error(err);
		res.status(400).end('Internal Server Error');
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

		if (await firebase.isUserBlacklisted([requestIp, user.username])) {
			return res.status(403).end('User Is Blacklisted');
		}

		if (await firebase.userExists(user)) {
			return res.status(400).end('User already exists');
		}

		await firebase.createUser(user);

		return res.status(200).end('OK');
	} catch (err) {
		console.error(err);
		res.status(400).end('Internal Server Error');
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`GetTam Backend Running on port ${port}`);
});
