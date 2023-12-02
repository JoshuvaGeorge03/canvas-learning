import { addListener } from './utils.js';
export default function interactiveShapesInit() {
	function draw(e) {
		drawingAreaContext.beginPath();

		drawingAreaContext.moveTo(e.offsetX, e.offsetY);
		drawingAreaContext.lineTo(e.offsetX + 10, e.offsetY + 10);
		drawingAreaContext.stroke();
	}
	const removeList = addListener(drawingArea, 'pointermove', draw);

	return removeList;
}
