const { config } = require('dotenv');
const { ref, get, getDatabase, update, child } = require('firebase/database');
const { initializeApp } = require('firebase/app');

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

const oldFirebaseConfig = {
	apiKey: process.env.OLD_FIREBASE_APIKEY,
	authDomain: process.env.OLD_FIREBASE_AUTHDOMAIN,
	projectId: process.env.OLD_FIREBASE_PROJECTID,
	storageBucket: process.env.OLD_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.OLD_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.OLD_FIREBASE_APPID,
	measurementId: process.env.OLD_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const databaseRef = ref(database);

const oldApp = initializeApp(oldFirebaseConfig);
const oldDatabase = getDatabase(oldApp);
const oldDatabaseRef = ref(oldDatabase);

async function getDatabaseData(ref) {
	const databaseData = await get(ref);

	return databaseData.exists() && databaseData.val();
}
