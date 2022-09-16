import Tile from './Tile';
import { Component } from 'react';
import Sketch from 'react-p5';
import constants from 'modules/constants';
import { randomInRange } from 'modules/utils';
import Button from './Button';

const size = 600 / 4;

// I don't know what this does and I'm too tired to figure it out
// (I'm guessing it get's the rows from the columns and the columns from the rows)
function transpose(original, update) {
	const transposed = [];

	for (let i = 0; i < original[0].length; i++) {
		transposed.push([]);

		for (let j = 0; j < original.length; j++) {
			if (update) {
				original[j][i].i = i;
				original[j][i].j = j;
			}

			transposed[i][j] = original[j][i];
		}
	}

	return transposed;
}

class Board extends Component {
	constructor({ setScore, setSchool }) {
		super();

		this.setScore = setScore;
		this.setSchool = setSchool;
	}

	tileOdds() {
		return Math.max(Math.floor(randomInRange(1, 3) - 0.8), 1);
	}

	addTile() {
		let x = Math.floor(randomInRange(0, 4));
		let y = Math.floor(randomInRange(0, 4));

		while (this.tiles[x][y]) {
			x = Math.floor(randomInRange(0, 4));
			y = Math.floor(randomInRange(0, 4));
		}

		this.tiles[x][y] = new Tile(x, y, this.tileOdds(), this);
	}

	isFull() {
		let full = true;

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.tiles[i][j] && this.tiles[j][i]) continue;

				full = false;

				break;
			}
		}

		this.full = full;

		return full;
	}

	moveDown() {
		for (let i = 0; i < 4; i++) {
			for (let j = 4 - 1; j >= 0; j--) {
				const tile = this.tiles[i][j];

				if (tile !== 0) tile.moveDown();
			}
		}
	}

	moveUp() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const tile = this.tiles[i][j];

				if (tile !== 0) tile.moveUp();
			}
		}
	}

	moveLeft() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const tile = this.rows[i][j];

				if (tile !== 0) tile.moveLeft();
			}
		}
	}

	moveRight() {
		for (let i = 0; i < 4; i++) {
			for (let j = 4 - 1; j >= 0; j--) {
				const tile = this.rows[i][j];

				if (tile !== 0) tile.moveRight();
			}
		}
	}

	display() {
		let p5 = this.p5;
		this.moved = false;
		this.rows = transpose(this.tiles);

		p5.rectMode(p5.CORNER);
		p5.fill(180);
		p5.noStroke();

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				p5.rect(i * size + 8, j * size + 8, size - 16, size - 16);
			}
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const tile = this.tiles[i][j];

				if (tile !== 0) {
					tile.display();
				}
			}
		}

		if (this.won) return;

		this.isFull();

		if (this.gameOver()) {
			this.lost = true;

			return;
		}

		if (this.movement.y < 0) this.moveUp();
		else if (this.movement.y > 0) this.moveDown();
		else if (this.movement.x < 0) this.moveLeft();
		else if (this.movement.x > 0) this.moveRight();

		if (Math.abs(this.movement.x) + Math.abs(this.movement.y) > 0) {
			if (!this.full && this.moved) {
				this.addTile();
			}
		}
	}

	gameOver() {
		if (!this.full || this.won) return;

		let gameOver = true;

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const tile = this.tiles[i][j];
				const otherTile = this.tiles[4 - i - 1][4 - j - 1];

				for (const neighbor of tile.neighbors) {
					if (neighbor.value === tile.value) {
						gameOver = false;

						break;
					}
				}

				for (const neighbor of otherTile.neighbors) {
					if (neighbor.value === otherTile.value) {
						gameOver = false;

						break;
					}
				}

				if (!gameOver) break;
			}

			if (!gameOver) break;
		}

		return gameOver;
	}

	lose() {
		let p5 = this.p5;

		p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.p5.rectMode(this.p5.CORNER);

		this.p5.fill(31, 75, 163, Math.min(this.overlayAlpha, 140));
		this.p5.rect(-8, -8, 616, 616);

		this.p5.noStroke();

		this.p5.textSize(65);

		this.p5.fill(0, Math.min(0.2 * this.textOverlayAlpha, 80));
		this.p5.text('Game Over', 616 / 2 + 2, 180 + 2);

		this.p5.fill(255, this.textOverlayAlpha);
		this.p5.text('Game Over', 616 / 2, 180);

		this.overlayAlpha += 1;
		this.textOverlayAlpha =
			Math.max(130, 3 * this.overlayAlpha - 130) - 130;

		this.restartButton.display(this.textOverlayAlpha);
	}

	restart() {
		this.setup(this.p5, this.canvasParentRef);
	}

	setup(p5, canvasParentRef) {
		this.p5 = p5;
		this.canvasParentRef = canvasParentRef;

		this.won = false;
		this.lost = false;

		this.score = 0;

		this.tiles = [];

		this.textOverlayAlpha = 0;
		this.overlayAlpha = 0;

		this.movement = p5.createVector(0, 0);
		this.camera = p5.createVector(0, 0);

		this.deltaCamera = p5.createVector(0, 0);

		this.tileImages = [];

		this.restartButton = new Button(
			'Restart',
			616 / 2,
			616 / 2,
			this.restart.bind(this),
			p5
		);

		window.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'w':
				case 'ArrowUp':
					this.movement.y = -1;

					break;

				case 's':
				case 'ArrowDown':
					this.movement.y = 1;

					break;

				case 'a':
				case 'ArrowLeft':
					this.movement.x = -1;

					break;

				case 'd':
				case 'ArrowRight':
					this.movement.x = 1;

					break;

				default:
					break;
			}

			if (this.movement.x !== 0 || this.movement.y !== 0) {
				e.preventDefault();
			}
		});

		for (let i = 0; i < 4; i++) {
			this.tiles.push([]);

			for (let j = 0; j < 4; j++) {
				this.tiles[i].push(0);
			}
		}

		for (let i = 0; i < 2; i++) {
			const x = Math.floor(randomInRange(4));
			const y = Math.floor(randomInRange(4));

			this.tiles[x][y] = new Tile(x, y, this.tileOdds(), this);
		}

		this.rows = transpose(this.tiles);

		p5.createCanvas(616, 616).parent(canvasParentRef);

		constants.tiles.forEach((tile, index) => {
			this.tileImages[index] = p5.loadImage(
				`https://raw.githubusercontent.com/nekumelon/GetTam-React/main/src/assets/images/tiles/${tile.imagePath}`
			);
		});
	}

	draw(p5) {
		p5.push();

		p5.translate(8 - this.camera.x, 8 - this.camera.y);

		p5.background(225);
		this.display();

		if (this.lost) this.lose();

		const k = 0.1;
		this.deltaCamera.x -=
			this.camera.x * k + this.deltaCamera.x * constants.damping;
		this.deltaCamera.y -=
			this.camera.y * k + this.deltaCamera.y * constants.damping;
		this.camera.add(this.deltaCamera);

		p5.pop();

		this.movement.set(0, 0);
	}

	render() {
		return (
			this.sketch || (
				<Sketch
					setup={this.setup.bind(this)}
					draw={this.draw.bind(this)}
				/>
			)
		);
	}
}

export default Board;
