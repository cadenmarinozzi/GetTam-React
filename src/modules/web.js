import axios from 'axios';
import cookies from './cookies';

const baseUrl = 'https://gettam.herokuapp.com/';
// const baseUrl = 'http://localhost:5000/';

axios.defaults.baseURL = baseUrl;

async function signUp({ userId, username }) {
	const response = await axios.post(
		'create/user',
		{
			userId,
			username,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return response.data;
}

// async function sendLegacyRequest({ email, username }) {
// 	const response = await axios.post('legacy/request', {
// 		email,
// 		username,
// 	});

// 	return response.data;
// }

async function getUsers() {
	const response = await axios.post('get/users', {
		userId: cookies.get('user-id'),
	});

	return response.data;
}

async function login() {
	const response = await axios.post('login/user', {
		userId: cookies.get('user-id'),
	});

	return response.data;
}

async function addSiteView() {
	const response = await axios.post('add/siteView', {
		userId: cookies.get('user-id'),
	});

	return response.data;
}

async function getScoreData() {
	try {
		const response = await axios.post('get/user/scoreData', {
			userId: cookies.get('user-id'),
		});

		return response.data;
	} catch (error) {
		return null;
	}
}

async function updateScore(score) {
	const response = await axios.post('update/user/score', {
		userId: cookies.get('user-id'),
		score,
	});

	return response.data;
}

async function updateSchool(school) {
	const response = await axios.post('update/user/school', {
		userId: cookies.get('user-id'),
		school,
	});

	return response.data;
}

// eslint-disable-next-line
export default {
	getScoreData,
	signUp,
	login,
	updateScore,
	updateSchool,
	getUsers,
	// sendLegacyRequest,
	addSiteView,
};
