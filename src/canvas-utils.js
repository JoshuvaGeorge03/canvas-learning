import { setHeightOfAnEl, setWidthOfAnEl } from './dom-utils.js';

const canvasElement = window.drawingArea;

const minHeight = 300;
const minWidth = 500;

function getViewportHeight() {
	return document.documentElement.clientHeight;
}

function getViewportHeightWithoutPadding() {
	return (
		getViewportHeight() - parseInt(getComputedStyle(document.body).padding)
	);
}

function calculateWidth(rootElRect, canvasElRect) {
	return rootElRect.width;
}

function calculateHeight(rootElRect, canvasElRect) {
	const sectionHeight = canvasElRect.y - rootElRect.y;
	const viewportHeight = getViewportHeightWithoutPadding();
	return viewportHeight - sectionHeight;
}

function getRectObject(el) {
	return el.getBoundingClientRect();
}

function setCanvasHeight(height) {
	setHeightOfAnEl(canvasElement, height);
}

function setCanvasWidth(width) {
	setWidthOfAnEl(canvasElement, width);
}

function setCanvasWidthBasedOnMinWidth(width) {
	if (width >= minWidth) {
		setCanvasWidth(width);
		return;
	}
	setCanvasHeight(minWidth);
}

function setCanvasWidthBasedOnMinHeight(height) {
	if (height >= minHeight) {
		setCanvasHeight(height);
		return;
	}
	setCanvasHeight(minHeight);
}

function setSizeOfCanvasDrawingArea(canvasEl, rootEl) {
	const rootElRect = getRectObject(rootEl);
	const canvasElRect = getRectObject(canvasEl);
	const canvasWidth = calculateWidth(rootElRect, canvasElRect);
	const canvasHeight = calculateHeight(rootElRect, canvasElRect);
	setCanvasWidthBasedOnMinHeight(canvasHeight);
	setCanvasWidthBasedOnMinWidth(canvasWidth);
}

function saveCanvasState(canvasEl) {}

function restoreCanvasState(canvasEl) {}

function resetAndRestorePreviousCanvasDrawingArea(canvasEle) {
	saveCanvasState(canvasEle);
	resetCanvasDrawingSurface(canvasEle);
	restoreCanvasState(canvasEle);
}

export function resetCanvasDrawingSurface(canvasEl, rootEl = document.body) {
	setSizeOfCanvasDrawingArea(canvasEl, rootEl);
}
