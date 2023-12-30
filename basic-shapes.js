import { compose } from './utils.js';

function fillRect(x, y, width, height) {
	drawingAreaContext.fillRect(x, y, width, height);
}

function strokeRect(x, y, width, height) {
	drawingAreaContext.strokeRect(x, y, width, height);
}

function clearRect(x, y, width, height) {
	drawingAreaContext.clearRect(x, y, width, height);
}

function getCenterPointOfCanvas() {
	const width = drawingArea.width;
	const centerInXaxis = Math.round(width / 2);
	const yAxis = 100;
	return [centerInXaxis, yAxis];
}

function getCanvasMemeText() {
	return 'Joshuva Rocks';
}

function toUpperCase(text) {
	return text.toUpperCase();
}

export function basicShapesInit() {
	/// learned basic drawing commands

	drawingAreaContext.fillStyle = 'purple';
	fillRect(10, 10, 100, 100);

	drawingAreaContext.fillStyle = 'black';
	fillRect(110, 110, 50, 40);

	drawingAreaContext.strokeStyle = 'lightblue';
	strokeRect(70, 150, 40, 100);

	clearRect(130, 130, 20, 20);

	drawingAreaContext.beginPath();
	drawingAreaContext.moveTo(110, 250);
	drawingAreaContext.lineTo(110, 290);
	drawingAreaContext.lineTo(125, 275);
	drawingAreaContext.lineTo(110, 250);
	drawingAreaContext.fill();

	const [centerX, centerY] = getCenterPointOfCanvas();
	drawingAreaContext.font = '36pt impact';
	drawingAreaContext.fillStyle = 'white';
	drawingAreaContext.textAlign = 'center';
	const canvasText = compose(toUpperCase, getCanvasMemeText)();
	drawingAreaContext.fillText(canvasText, centerX, centerY);
	drawingAreaContext.strokeStyle = 'black';
	drawingAreaContext.strokeText(canvasText, centerX, centerY);
}
