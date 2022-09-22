import axios from 'axios';
import cookies from './cookies';

const baseUrl = 'http://localhost:5000/';

axios.defaults.baseURL = baseUrl;

async function signUp({ username, password }) {
	const response = await axios.post(
		'create/user',
		{
			username,
			password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return response.data;
}

async function sendLegacyRequest({ email, username }) {
	const response = await axios.post('legacy/request', {
		email,
		username,
	});

	return response.data;
}

async function getUsers() {
	const response = await axios.post('get/users', {
		username: cookies.get('username'),
		password: cookies.get('password'),
	});

	return response.data;
}

async function login() {
	const response = await axios.post('login/user', {
		username: cookies.get('username'),
		password: cookies.get('password'),
	});

	return response.data;
}

async function getScoreData() {
	const response = await axios.post('get/user/scoreData', {
		username: cookies.get('username'),
		password: cookies.get('password'),
	});

	return response.data;
}

async function updateScore(score) {
	const response = await axios.post('update/user/score', {
		username: cookies.get('username'),
		password: cookies.get('password'),
		score,
	});

	return response.data;
}

async function updateSchool(school) {
	const response = await axios.post('update/user/school', {
		username: cookies.get('username'),
		password: cookies.get('password'),
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
	sendLegacyRequest,
};
