import shajs from 'sha.js';

function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
}

function randomInRange(min, max) {
	const rand = Math.random();

	if (min === undefined) {
		return rand;
	} else if (max === undefined) {
		return rand * min;
	}

	return rand * (max - min) + min;
}

function lerp(a, b, t) {
	return t * (b - a) + a;
}

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function sha256(input) {
	const hash = shajs('sha256').update(input).digest('hex');

	return hash;
}

function navigate(url) {
	let baseUrl = '/';

	if (window.location.href.includes('GetTam-React')) {
		baseUrl += 'GetTam-React/#';
	}

	window.location.href = baseUrl + url;
}

export { copyToClipboard, randomInRange, lerp, sleep, sha256, navigate };
