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

export { copyToClipboard, randomInRange, lerp, sleep };
