import { addListener } from './utils.js';
export default function interactiveShapesInit() {
	const pointerMap = new Map();

	function draw(e) {
		if (!pointerMap.get(e.pointerId)) return;
		// console.log('pointer move', e);
		drawingAreaContext.beginPath();

		drawingAreaContext.moveTo(e.offsetX, e.offsetY);
		drawingAreaContext.lineTo(e.offsetX + 10, e.offsetY + 10);
		drawingAreaContext.stroke();
	}

	function drawStart(e) {
		// console.log('pointer down', e);
		pointerMap.set(e.pointerId, true);
	}

	function drawEnd(e) {
		// console.log('pointer up', e);
		pointerMap.set(e.pointerId, false);
	}

	const removePointerMoveLis = addListener(drawingArea, 'pointermove', draw);
	const removePointerDownLis = addListener(
		drawingArea,
		'pointerdown',
		drawStart
	);
	const removePointerUpList = addListener(drawingArea, 'pointerup', drawEnd);
	const removePointerCancelLis = addListener(
		drawingArea,
		'pointercancel',
		(e) => {
			console.log('i am cancel event', e);
		}
	);

	return () => {
		removePointerDownLis();
		removePointerMoveLis();
		removePointerUpList();
		removePointerCancelLis();
	};
}
