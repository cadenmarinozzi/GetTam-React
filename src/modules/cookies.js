// God i hate cookies so much, worst part of web development.

function get(cookieName) {
	const cookies = document.cookie.split(';');

	let finalCookie;

	for (let cookie of cookies) {
		while (cookie.charAt(0) === ' ')
			cookie = cookie.substring(1, cookie.length);

		if (cookie.indexOf(`${cookieName}=`) === 0) {
			finalCookie = cookie.substring(
				cookieName.length + 1,
				cookie.length
			);

			break;
		}
	}

	if (finalCookie === 'null' || finalCookie === 'undefined') {
		return null;
	}

	if (finalCookie === 'true') return true;
	if (finalCookie === 'false') return false;

	return finalCookie;
}

function set(name, value) {
	document.cookie = `${name}=${value}; path=/`;
}

function remove(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// eslint-disable-next-line
export default { get, set, remove };
