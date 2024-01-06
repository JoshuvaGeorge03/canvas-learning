import {
	resetAndRestorePreviousCanvasDrawingArea,
	resetCanvasState
} from './canvas-utils.js';
import { createResizeObserver } from './resize-utils.js';
import {
	addListener,
	getEleById,
	getEl,
	doNothingExceptReturnPassedArg,
	dummyFn
} from './utils.js';
import { basicShapesInit } from './basic-shapes.js';
import interactiveShapesInit from './interactive-shapes.js';
import loadImage from './load-image.js';

const mainEl = getEl('main');

const basicShapesInputElementId = 'myBasicShapes';
const interactiveShapesInputEementId = 'interactiveShapes';

const loadImageIputElementId = 'imageDraw';

const inputElementIds = [
	basicShapesInputElementId,
	interactiveShapesInputEementId,
	loadImageIputElementId,
	'videoDraw',
	'imageFilter',
	'vidoFilter',
	'memeGenerator'
];

const templateIds = inputElementIds.map((id) => `${id}Template`);

const inputElementIdsToTemplateIdsMapping = inputElementIds.reduce(
	(accu, cur) => {
		const dynamicRegexBasedOnInputElementId = new RegExp(`^${cur}`);
		const templateId = templateIds.find((templateId) =>
			dynamicRegexBasedOnInputElementId.test(templateId)
		);
		accu[cur] = templateId;
		return accu;
	},
	{}
);

const inputElementIdsToCanvasInitFunctionMapping = inputElementIds.reduce(
	(acc, cur) => (acc[cur] = dummyFn),
	{}
);

const inputElementIdsToElementMapping = inputElementIds.reduce(
	(accumulator, current) => {
		const element = getEleById(current);
		accumulator[current] = element;
		return accumulator;
	},
	{}
);

const templateIdsToElementMapping = templateIds.reduce(
	(acc, id) => ((acc[id] = getEleById(id)), acc),
	{}
);

function getTemplateInsertionSection() {
	return getEleById('templateInsertSection');
}

function parseTemplate(template) {
	const cloneNode = template.content.cloneNode(true);
	return cloneNode;
}

function insertTemplate(inputElementId) {
	const templateId = inputElementIdsToTemplateIdsMapping[inputElementId];
	const initFn = inputElementIdsToCanvasInitFunctionMapping[inputElementId];
	const template = templateIdsToElementMapping[templateId];
	const clonedTemplate = parseTemplate(template);
	const templateContainer = getTemplateInsertionSection();
	templateContainer.replaceChildren(clonedTemplate);
	resetCanvasState();
	const tearFn = initFn(drawingArea, drawingAreaContext);
	return tearFn || dummyFn;
}

function setInputElementIdToDrawCall(elementId, func) {
	inputElementIdsToCanvasInitFunctionMapping[elementId] = func;
}

let tearDownFn = dummyFn;
inputElementIds.forEach((inputElementId) => {
	addListener(inputElementIdsToElementMapping[inputElementId], 'change', () => {
		tearDownFn?.();
		tearDownFn = insertTemplate(inputElementId);
	});
});

function getInitiallySelectedSection() {
	return localStorage.getItem('initiallySelectedItem') || inputElementIds[0];
}

setInputElementIdToDrawCall(basicShapesInputElementId, basicShapesInit);
setInputElementIdToDrawCall(
	interactiveShapesInputEementId,
	interactiveShapesInit
);
setInputElementIdToDrawCall(loadImageIputElementId, loadImage);

tearDownFn = insertTemplate(getInitiallySelectedSection());

function canvasUnsizedFlashFixHack() {
	window.drawingArea.style.opacity = 1;
}

setTimeout(() => {
	resetAndRestorePreviousCanvasDrawingArea(window.drawingArea, mainEl);
	canvasUnsizedFlashFixHack();
}, 1000);

createResizeObserver(mainEl, (entry) =>
	resetAndRestorePreviousCanvasDrawingArea(window.drawingArea, mainEl)
);
