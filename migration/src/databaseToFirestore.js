const {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDoc,
} = require('firebase/firestore');
const {
	ref,
	get,
	getDatabase,
	update,
	child,
	set,
} = require('firebase/database');
const { initializeApp } = require('firebase/app');
require('dotenv').config();

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
const firestore = getFirestore(app);

const blacklistRef = ref(database, 'blacklist');
const usersRef = ref(database, 'users');
const siteViewsRef = ref(database, 'siteViews');

const blacklistCollection = collection(firestore, 'blacklist');
const usersCollection = collection(firestore, 'users');
const siteViewsCollection = collection(firestore, 'siteViews');

async function getDatabaseData(ref) {
	const databaseData = await get(ref);

	return databaseData.exists() && databaseData.val();
}

async function mainRun() {
	// let blacklist = await getDatabaseData(blacklistRef);
	let users = await getDatabaseData(usersRef);
	let siteViews = await getDatabaseData(siteViewsRef);

	// for (const [userId, user] of Object.entries(users)) {
	// 	if (!user) continue;

	// 	const userDoc = doc(usersCollection, userId);
	// 	await setDoc(userDoc, user);
	// }

	// console.log('Transferred users');

	setDoc(doc(siteViewsCollection, 'daily'), siteViews);

	console.log('Transferred siteViews');
}

mainRun();
