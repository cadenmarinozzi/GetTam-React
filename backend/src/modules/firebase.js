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
const siteViewsRef = ref(database, 'siteViews');

async function getBlacklist() {
	const blacklist = await get(blacklistRef);

	return blacklist.exists() ? blacklist.val() : [];
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

async function getUser({ userId }) {
	const users = await getUsers();

	return users && users[userId];
}

async function addSiteView() {
	const date = new Date();
	const currentSiteViews = await get(siteViewsRef);
	const siteViews = currentSiteViews.exists() && currentSiteViews.val();

	if (!siteViews?.[date.toDateString()]) {
		update(siteViewsRef, {
			[date.toDateString()]: 1,
		});

		return;
	}

	update(siteViewsRef, {
		[date.toDateString()]: currentSiteViews.val()[date.toDateString()] + 1,
	});
}

async function createUser({ userId, username }) {
	await update(child(usersRef, userId), {
		username,
		score: 0,
		school: 1,
	});
}

async function userExists({ userId }) {
	const user = await getUser({ userId });

	return !!user;
}

async function updateScore({ userId, score }) {
	await update(child(usersRef, userId), { score });
}

async function updateSchool({ userId, school }) {
	await update(child(usersRef, userId), { school });
}

async function getScoreData({ userId }) {
	const user = await getUser({ userId });

	return user && { score: user.score, school: user.school };
}

async function login({ username, userId }) {
	// const user = await getUser({ username });

	// return user;
	return true;
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
	addSiteView,
};
