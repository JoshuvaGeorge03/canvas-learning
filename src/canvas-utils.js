function calculateWidth() {}

function calculateHeight() {}

function setSizeOfCanvasDrawingArea(canvasEl) {}

function saveCanvasState(canvasEl) {}

function restoreCanvasState(canvasEl) {}

function resetAndRestorePreviousCanvasDrawingArea(canvasEle) {
	saveCanvasState(canvasEle);
	resetCanvasDrawingSurface(canvasEle);
	restoreCanvasState(canvasEle);
}

export function resetCanvasDrawingSurface(canvasEl) {
	setSizeOfCanvasDrawingArea(canvasEl);
}
