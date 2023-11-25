import {
	resetAndRestorePreviousCanvasDrawingArea,
	resetCanvasState
} from './canvas-utils.js';
import { createResizeObserver } from './resize-utils.js';
import {
	addListener,
	getEleById,
	getEl,
	doNothingExceptReturnPassedArg
} from './utils.js';
import { basicShapesInit } from './basic-shapes.js';

const mainEl = getEl('main');

const basicShapesInputElementId = 'myBasicShapes';

const inputElementIds = [
	basicShapesInputElementId,
	'interactiveShapes',
	'imageDraw',
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
	(acc, cur) => (acc[cur] = doNothingExceptReturnPassedArg),
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
	initFn();
}

function createIdsToDraw(elementId, func) {
	inputElementIdsToCanvasInitFunctionMapping[elementId] = func;
}

inputElementIds.forEach((inputElementId) => {
	addListener(inputElementIdsToElementMapping[inputElementId], 'change', () => {
		insertTemplate(inputElementId);
	});
});

function getInitiallySelectedSection() {
	return localStorage.getItem('initiallySelectedItem') || inputElementIds[0];
}

createIdsToDraw(basicShapesInputElementId, basicShapesInit);

insertTemplate(getInitiallySelectedSection());

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
