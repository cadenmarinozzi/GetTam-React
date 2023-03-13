const constants = require('./constants');
const { sha256 } = require('./utils');
const { initializeApp } = require('firebase/app');
const { config } = require('dotenv');
const {
	getFirestore,
	collection,
	doc,
	setDoc,
	updateDoc,
	getDoc,
	getDocs,
} = require('firebase/firestore');

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
const database = getFirestore(app);
const blacklistRef = collection(database, 'blacklist');
const usersRef = collection(database, 'users');
const siteViewsRef = collection(database, 'siteViews');

async function getBlacklist() {
	const blacklist = await getDoc(doc(database, 'blacklist', 'identifiers'));

	return blacklist.exists() ? blacklist.data() : [];
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
	// const users = await getDoc(database, 'users');

	// return users.exists() && users.data();
	const users = await getDocs(usersRef);

	// return users.docs.reduce((acc, user) => {
	// 	acc[user.userId] = user.data();

	// 	return acc;
	// }, {});
	const usersData = {};

	for (const user of users.docs) {
		usersData[user.id] = user.data();
	}

	return usersData;
}

async function getUser({ userId }) {
	// const users = await getUsers();

	// return users && users[userId];
	const user = await getDoc(doc(database, 'users', userId));

	return user.exists() && user.data();
}

function getDateString() {
	return new Date()
		.toLocaleString('en-US', {
			timeZone: 'America/Los_Angeles',
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: '2-digit',
		})
		.replaceAll(',', '');
}

async function addSiteView() {
	const dateString = getDateString();
	const currentSiteViews = await getDoc(doc(database, 'siteViews', 'daily'));
	const siteViews = currentSiteViews.exists() && currentSiteViews.data();

	if (!siteViews?.[dateString]) {
		updateDoc(doc(database, 'siteViews', 'daily'), {
			[dateString]: 1,
		});

		return;
	}

	updateDoc(doc(database, 'siteViews', 'daily'), {
		[dateString]: currentSiteViews.data()[dateString] + 1,
	});
}

async function createUser({ userId, username }) {
	await setDoc(doc(database, 'users', userId), {
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
	await updateDoc(doc(database, 'users', userId), { score });
}

async function updateSchool({ userId, school }) {
	await updateDoc(doc(database, 'users', userId), { school });
}

async function getScoreData({ userId }) {
	const user = await getUser({ userId });

	return user && { score: user.score, school: user.school };
}

async function getSiteViews() {
	const siteViews = await getDoc(doc(database, 'siteViews', 'daily'));

	return siteViews.exists() && siteViews.data();
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
	getSiteViews,
};
