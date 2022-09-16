import constants from 'modules/constants';

// prettier-ignore
const size = (616 - (8 * 2)) / 4; // (boardSize - (padding * 2)) / nTiles

let bestSchool = 1;

class Tile {
	constructor(i, j, value, parent) {
		this.i = i;
		this.j = j;

		this.previousI = i;
		this.previousJ = j;

		this.value = value;
		this.displayValue = value;

		this.parent = parent;
		this.p5 = parent.p5;

		this.position = this.p5.createVector(i * size, j * size);
		this.contact = this.p5.createVector(-1, -1);

		this.scale = this.p5.createVector(-0.5, -0.5);
		this.deltaScale = this.p5.createVector(0, 0);

		this.combine = true;
		this.neighbors = [];
	}

	updateValue() {
		let parent = this.parent;

		this.value++;
		parent.score += 2 ** this.value;
		parent.setScore(parent.score);

		this.contact = true;
		this.combine = false;

		if (this.value < 7) return;

		const deltaCamera = parent.deltaCamera;

		if (Math.round(deltaCamera.mag() * 10) / 10 < 0.3) {
			if (this.p5?.Vector) {
				deltaCamera.set(this.p5.Vector.random2D());
			}
		}

		deltaCamera.mult(this.value - 5);
		deltaCamera.mult(0.9);
	}

	move() {
		this.previousI = this.i;
		this.previousJ = this.j;

		this.contact = false;
		this.displayValue = this.value;
		this.combine = true;
	}

	moveDown() {
		this.move();

		const tiles = this.parent.tiles,
			i = this.i,
			j = this.j;

		for (let k = j + 1; k < 4; k++) {
			if (tiles[i][k] !== 0) {
				tiles[i][j] = 0;
				if (tiles[i][k].value === this.value && tiles[i][k].combine) {
					this.updateValue();

					this.j = k;

					tiles[i][k] = this;
					tiles[i][k - 1] = 0;
				} else {
					this.j = k - 1;
					tiles[i][k - 1] = this;
				}

				break;
			} else {
				tiles[i][this.j] = 0;

				this.j = k;
				tiles[i][k] = this;
			}
		}

		if (this.j !== j) this.parent.moved = true;
	}

	moveUp() {
		this.move();

		const tiles = this.parent.tiles,
			i = this.i,
			j = this.j;

		for (let k = j - 1; k >= 0; k--) {
			if (tiles[i][k] !== 0) {
				tiles[i][j] = 0;

				if (tiles[i][k].value === this.value && tiles[i][k].combine) {
					this.updateValue();

					this.j = k;

					tiles[i][k] = this;
					tiles[i][k + 1] = 0;
				} else {
					this.j = k + 1;
					tiles[i][k + 1] = this;
				}

				break;
			} else {
				tiles[i][this.j] = 0;

				this.j = k;
				tiles[i][k] = this;
			}
		}

		if (this.j !== j) this.parent.moved = true;
	}

	moveLeft() {
		this.move();

		const tiles = this.parent.tiles,
			i = this.i,
			j = this.j;

		for (let k = i - 1; k >= 0; k--) {
			if (tiles[k][j] !== 0) {
				tiles[i][j] = 0;

				if (tiles[k][j].value === this.value && tiles[k][j].combine) {
					this.updateValue();

					this.i = k;

					tiles[k][j] = this;
					tiles[k + 1][j] = 0;
				} else {
					this.i = k + 1;
					tiles[k + 1][j] = this;
				}

				break;
			} else {
				tiles[this.i][j] = 0;

				this.i = k;
				tiles[k][j] = this;
			}
		}

		if (this.i !== i) this.parent.moved = true;
	}

	moveRight() {
		this.move();

		const tiles = this.parent.tiles,
			i = this.i,
			j = this.j;

		for (let k = i + 1; k < 4; k++) {
			if (tiles[k][j] !== 0) {
				tiles[i][j] = 0;

				if (tiles[k][j].value === this.value && tiles[k][j].combine) {
					this.updateValue();

					this.i = k;

					tiles[k][j] = this;
					tiles[k - 1][j] = 0;
				} else {
					this.i = k - 1;
					tiles[k - 1][j] = this;
				}

				break;
			} else {
				tiles[this.i][j] = 0;

				this.i = k;
				tiles[k][j] = this;
			}
		}

		if (this.i !== i) this.parent.moved = true;
	}

	display() {
		const parent = this.parent;
		const p5 = this.p5;

		if (this.displayValue > bestSchool) {
			bestSchool = this.displayValue;

			parent.setSchool(constants.tiles[bestSchool - 1].name);
		}

		let tiles = parent.tiles;
		let neighbors = [];

		if (!parent.won && this.i % 1 === 0) {
			if (this.j > 0) neighbors.push(tiles[this.i][this.j - 1]);
			if (this.i < 4 - 1) neighbors.push(tiles[this.i + 1][this.j]);
			if (this.j < 4 - 1) neighbors.push(tiles[this.i][this.j + 1]);
			if (this.i > 0) neighbors.push(tiles[this.i - 1][this.j]);
		}

		this.neighbors = neighbors;

		const maxValue = parent.tileImages.length;

		const s = 0.3;
		const k = 0.05;
		let t = 1; // I asked a few people and none of them liked the dynamic tile size
		/* let t = this.displayValue === maxValue
		 	? 2
		 	: this.displayValue >= 11
		 	? 1.25
		 	: this.displayValue >= 9
		 	? 1.13
			: this.displayValue >= 7
		 	? 1.08
		 	: 1; */

		p5.rectMode(p5.CENTER);

		let scale = this.scale;
		let scaleX = scale.x;
		let scaleY = scale.y;

		this.deltaScale.x -=
			(scaleX - t) * k + this.deltaScale.x * constants.damping;
		this.deltaScale.y -=
			(scaleY - t) * k + this.deltaScale.y * constants.damping;

		this.deltaScale.limit(0.15);

		scale.add(this.deltaScale);

		scaleX = p5.constrain(scaleX, 0, t + 0.2);
		scaleY = p5.constrain(scaleY, 0, t + 0.2);

		if (
			this.displayValue < maxValue &&
			this.contact &&
			(this.previousI !== this.i || this.previousJ !== this.j)
		) {
			const dx = this.i - this.previousI;
			const dy = this.j - this.previousJ;

			if (Math.abs(dx) + Math.abs(dy) < 1) {
				scaleX -= dx !== 0 ? 0.12 : 0;
				scaleY -= dy !== 0 ? 0.12 : 0;
			}

			if (Math.abs(dx) + Math.abs(dy) < 0.05) {
				this.move();
			}

			p5.push();
			p5.translate(this.i * size, this.j * size);

			const offsetX =
				dx !== 0 ? ((size / 2) * (1 - scaleX) * dx) / Math.abs(dx) : 0;
			const offsetY =
				dy !== 0 ? ((size / 2) * (1 - scaleY) * dy) / Math.abs(dy) : 0;

			p5.translate(size / 2 + offsetX || 0, size / 2 + offsetY);
			p5.scale(scaleX, scaleY);

			this.drawIcon();

			p5.pop();
		}

		this.previousI = p5.lerp(this.previousI, this.i, s);
		this.previousJ = p5.lerp(this.previousJ, this.j, s);

		this.position.set(this.previousI * size, this.previousJ * size);

		p5.push();

		p5.translate(this.position);
		p5.translate(size / 2, size / 2);

		p5.scale(scaleX, scaleY);

		this.drawIcon();

		p5.pop();
		p5.rectMode(p5.CORNER);
	}

	drawIcon() {
		const p5 = this.p5;
		p5.imageMode(this.p5.CENTER);

		const tileImage = this.parent.tileImages[this.displayValue - 1];

		if (!tileImage) return;

		p5.image(tileImage, 0, 0, size - 16, size - 16);
	}
}

export default Tile;
