import { Component } from 'react';
import Sketch from 'react-p5';
import constants from 'modules/constants';

class Board extends Component {
	constructor() {
		super();

		this.tiles = [];

		let startTiles = 0;

		for (let i = 0; i < 4; i++) {
			this.tiles.push([]);

			for (let j = 0; j < 4; j++) {
				const isStartTile = Math.round(Math.random());

				this.tiles[i].push({
					worth:
						startTiles < 2
							? isStartTile
								? Math.round(Math.random()) + 1
								: 0
							: 0,
				});

				if (isStartTile) {
					startTiles++;
				}
			}
		}
	}

	render() {
		function setup(p5, canvasParentRef) {
			p5.createCanvas(616, 616).parent(canvasParentRef);

			this.tileImages = [];

			constants.tiles.forEach((tile) => {
				p5.loadImage(tile.imagePath, (image) => {
					this.tileImages.push('/assets/images/tiles/' + image);
					p5.redraw();
				});
			});

			p5.noLoop();
		}

		const margin = 20; // Spacing between tiles and board
		const padding = 20; // Spacing between each tile

		function drawBoard(p5) {
			p5.background(225);

			p5.fill(180);
			p5.stroke(180);

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					const tileSize = (616 - margin * 2 - padding * 3) / 4;
					const tileX = margin + (tileSize + padding) * i;
					const tileY = margin + (tileSize + padding) * j;
					p5.rect(tileX, tileY, tileSize, tileSize);
				}
			}
		}

		function drawTiles(p5) {
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					const tile = this.tiles[i][j];

					if (tile.worth > 0) {
						const tileSize = (616 - margin * 2 - padding * 3) / 4;
						const tileX = margin + (tileSize + padding) * i;
						const tileY = margin + (tileSize + padding) * j;

						if (tile.image)
							p5.image(
								tile.image,
								tileX,
								tileY,
								tileSize,
								tileSize
							);

						p5.rect(tileX, tileY, tileSize, tileSize);
					}
				}
			}
		}

		function draw(p5) {
			drawBoard.bind(this)(p5);
			drawTiles.bind(this)(p5);
		}

		return <Sketch setup={setup.bind(this)} draw={draw.bind(this)} />;
	}
}

export default Board;
