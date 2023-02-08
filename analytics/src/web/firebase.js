import axios from 'axios';
import cookies from './cookies';

const baseUrl = 'https://gettam.herokuapp.com/';

axios.defaults.baseURL = baseUrl;

async function getSiteViews() {
	const response = await axios.post('get/siteViews');

	return response.data;
}

async function getUsers() {
	const response = await axios.post('get/users');

	return response.data;
}

export { getSiteViews, getUsers };
