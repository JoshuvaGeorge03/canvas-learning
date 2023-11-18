import { resetAndRestorePreviousCanvasDrawingArea } from './canvas-utils.js';
import { createResizeObserver } from './resize-utils.js';
import { addListener, getEleById, getEl } from './utils.js';

const mainEl = getEl('main');

const inputElementIds = [
	'myBasicShapes',
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
	const template = templateIdsToElementMapping[templateId];
	const clonedTemplate = parseTemplate(template);
	const templateContainer = getTemplateInsertionSection();
	templateContainer.replaceChildren(clonedTemplate);
}

inputElementIds.forEach((inputElementId) => {
	addListener(inputElementIdsToElementMapping[inputElementId], 'change', () => {
		insertTemplate(inputElementId);
	});
});

function getInitiallySelectedSection() {
	return localStorage.getItem('initiallySelectedItem') || inputElementIds[0];
}

insertTemplate(getInitiallySelectedSection());

function canvasUnsizedFlashFixHack() {
	window.drawingArea.style.opacity = 1;
}

setTimeout(() => {
	resetAndRestorePreviousCanvasDrawingArea(window.drawingArea, mainEl);
	canvasUnsizedFlashFixHack();
}, 1000);

createResizeObserver((entry) =>
	resetAndRestorePreviousCanvasDrawingArea(window.drawingArea, mainEl)
).observe(mainEl);
