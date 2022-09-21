const constants = require('./constants');
const { sha256 } = require('./utils');
const { initializeApp } = require('firebase/app');
const { config } = require('dotenv');
const { ref, get, getDatabase, update, child } = require('firebase/database');

config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID,
	measurementId: process.env.FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const blacklistRef = ref(database, 'blacklist');
const usersRef = ref(database, 'users');

async function getBlacklist() {
	const blacklist = await get(blacklistRef);

	return blacklist.exists() && blacklist.val();
}

async function isUserBlacklisted(identifiers) {
	const blacklist = await getBlacklist();

	for (const identifier of identifiers) {
		if (blacklist[identifier]) {
			return true;
		}
	}
}

async function getUsers() {
	const users = await get(usersRef);

	return users.exists() && users.val();
}

async function getUser({ username }) {
	const users = await getUsers();

	return users && users[username];
}

async function createUser({ username, password }) {
	await update(child(usersRef, username), {
		password: sha256(password),
		score: 0,
		school: 1,
	});
}

async function userExists({ username }) {
	const user = await getUser({ username });

	return !!user;
}

async function updateScore({ username, score }) {
	await update(child(usersRef, username), { score });
}

async function updateSchool({ username, school }) {
	await update(child(usersRef, username), { school });
}

async function getScoreData({ username }) {
	const user = await getUser({ username });

	return user && { score: user.score, school: user.school };
}

async function login({ username, password }) {
	const user = await getUser({ username });

	return user && user.password === sha256(password);
}

// eslint-disable-next-line
module.exports = {
	isUserBlacklisted,
	createUser,
	userExists,
	login,
	updateScore,
	updateSchool,
	getScoreData,
	getUsers,
};
