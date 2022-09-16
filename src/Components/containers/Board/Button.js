class Button {
	constructor(label, x, y, onClick, p5) {
		this.label = label;

		this.p5 = p5;

		this.x = x;
		this.y = y;
		this.z = 1;

		this.mouseDown = false;

		window.addEventListener('mousemove', (e) => {
			const x = e.offsetX;
			const y = e.offsetY;

			this.mouseX = x;
			this.mouseY = y;

			if (
				Math.abs(x - this.x) <= this.width / 2 + 20 &&
				Math.abs(y - this.y) <= this.height / 2 + 20
			) {
				this.mouseOver = true;
			}
		});

		window.addEventListener('mousedown', () => {
			if (this.mouseOver) {
				this.mouseDown = true;
			}
		});

		window.addEventListener('mouseup', () => {
			this.mouseDown = false;

			if (!this.mouseOver) return;

			onClick();
		});
	}

	display(alpha) {
		let p5 = this.p5;

		p5.rectMode(p5.CENTER);
		p5.textAlign(p5.CENTER, p5.CENTER);
		p5.textSize(35);

		this.height = p5.textAscent() + p5.textDescent() + 20;
		this.width = p5.textWidth(this.label) + 40;

		if (this.mouseDown) {
			this.z = 0;
		} else {
			this.z = 1;
		}

		this.p5.push();

		this.p5.translate(this.x, this.y);
		this.p5.noStroke();

		this.p5.fill(0, Math.min(alpha, 160));

		this.p5.rect(0, 0, this.width, this.height);
		this.p5.fill(31, 75, 163, Math.min(alpha, 255));

		this.p5.translate(-this.z * 4, -this.z * 4);

		this.p5.rect(0, 0, this.width, this.height);
		this.p5.fill(255, alpha);

		this.p5.text(this.label, 0, 2);

		this.p5.pop();
	}
}

export default Button;
