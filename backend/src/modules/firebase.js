const { initializeApp } = require('firebase/app');
const { config } = require('dotenv');
const { compareUser } = require('./utils.js');
const {
	ref,
	get,
	getDatabase,
	update,
	child,
	set,
} = require('firebase/database');

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
const usersRef = ref(database, 'test');
const leaderboardRef = ref(database, 'Leaderboard');

async function getBlacklist() {
	const blacklist = await get(blacklistRef);

	return blacklist.exists() && blacklist.val();
}

async function getLeaderboard() {
	const leaderboard = await get(leaderboardRef);

	return leaderboard.exists() && leaderboard.val();
}

async function isUserBlacklisted(identifiers) {
	const blacklist = await getBlacklist();

	for (const identifier of identifiers) {
		if (Object.values(blacklist).includes(identifier)) {
			return true;
		}
	}
}

async function updateUserScore({ uid, id, name, score }) {
	update(child(usersRef, uid), { id, name, score: score });
}

async function updateLeaderboard(user) {
	let leaderboard = await getLeaderboard();
	let updated = false;

	for (const player of Object.values(leaderboard)) {
		if (!compareUser(user, player)) continue;

		player.score = user.score;
		updated = true;

		break;
	}

	if (!updated && leaderboard) {
		leaderboard.push({
			id: user.id,
			name: user.name,
			score: user.score,
		});
	}

	if (!leaderboard) {
		leaderboard = [
			{
				id: user.id,
				name: user.name,
				score: user.score,
			},
		];

		leaderboard.sort((a, b) => b.score - a.score);
	}

	await set(leaderboardRef, leaderboard);
}

async function getUsers() {
	const users = await get(usersRef);

	return users.exists() && users.val();
}

async function createUser({ uid, id, name }) {
	await update(child(usersRef, uid), { id, name, score: 0 });
}

async function userExists(user) {
	const users = await getUsers();

	for (const [uid, player] of Object.entries(users)) {
		if (compareUser(user, player, uid)) {
			return true;
		}
	}
}

// eslint-disable-next-line
module.exports = {
	isUserBlacklisted,
	createUser,
	userExists,
	getLeaderboard,
	updateLeaderboard,
	updateUserScore,
};
