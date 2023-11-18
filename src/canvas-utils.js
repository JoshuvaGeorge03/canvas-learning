/* eslint-disable no-self-assign */
import { setHeightOfAnEl, setWidthOfAnEl } from './dom-utils.js';

const canvasElement = window.drawingArea;
const canvasDrawingContext = window.drawingAreaContext;

const minHeight = 300;
const minWidth = 500;

class CanvasImageData {
	constructor() {
		this.imageData = [];
		this.canvasEl = canvasElement;
		this.canvasDrawingContext = canvasDrawingContext;
	}

	setCanvasProps(canvasEl, canvasDrawingContext) {
		this.canvasEl = canvasEl;
		this.canvasDrawingContext = canvasDrawingContext;
	}

	save() {
		this.canvasDrawingContext.save();
		this.imageData.push(
			this.canvasDrawingContext.getImageData(
				0,
				0,
				this.canvasEl.width,
				this.canvasEl.height
			)
		);
	}

	reset() {
		this.canvasEl.width = this.canvasEl.width;
		this.canvasEl.height = this.canvasEl.height;
	}

	restore() {
		const imageData = this.imageData.pop();
		this.canvasDrawingContext.putImageData(imageData, 0, 0);
		this.canvasDrawingContext.restore();
	}
}

const canvasImageData = new CanvasImageData();

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

function saveCanvasState(canvasEl) {
	canvasImageData.save();
}

function restoreCanvasState(canvasEl) {
	canvasImageData.restore();
}

function resetCanvasState(canvasEl) {
	canvasImageData.reset();
}

function resetCanvasDrawingSurface(canvasEl, rootEl = document.body) {
	setSizeOfCanvasDrawingArea(canvasEl, rootEl);
}

export function resetAndRestorePreviousCanvasDrawingArea(
	canvasEle,
	rootEl = document.body
) {
	saveCanvasState(canvasEle);
	resetCanvasDrawingSurface(canvasEle, rootEl);
	restoreCanvasState(canvasEle);
}
