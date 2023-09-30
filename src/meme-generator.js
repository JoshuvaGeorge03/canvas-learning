import { getEleById, addListener } from './utils.js';

const memeGeneratorForm = getEleById('memeGeneratorForm');
const memeImageInput = getEleById('memeFile');

const memeInputForm = getEleById('memeTextInputForm');
const memeTopText = getEleById('toptext');
const memeBottomText = getEleById('bottomtext');

function drawImage(imageElement) {
	drawingAreaContext.drawImage(
		imageElement,
		300,
		100,
		drawingArea.width,
		drawingArea.height
	);
}

function setFontRelatedStyles(fontStyles) {
	drawingAreaContext.font = '36px sans-sarif';
}

function setFillColor(color) {
	drawingAreaContext.fillStyle = color;
}

function setStrokeColor(color) {
	drawingAreaContext.strokeStyle = color;
}

function drawFillText(value, position, color = 'white') {
	setFillColor(color);
	drawingAreaContext.fillText(value, position.x, position.y);
}

function drawStrokeText(value, position, color = 'black') {
	setStrokeColor(color);
	drawingAreaContext.strokeText(value, position.x, position.y);
}

function drawText(value, position) {
	drawFillText(value, position);
	drawStrokeText(value, position);
}

function handleFileChangeViaFileReaderApi(file) {
	const fileReader = new FileReader();
	const image = new Image();

	image.addEventListener('load', (ev) => {
		console.log('image', ev);
		drawImage(image);
	});

	fileReader.addEventListener('load', (ev) => {
		console.log('ev', ev);
		const url = ev.target.result;
		image.src = url;
	});

	fileReader.readAsDataURL(file);
}

function handleFileChangeViaCreateImageBitMapApi(file) {
	createImageBitmap(file).then((imageBitMap) => {
		drawImage(imageBitMap);
	});
}

async function handleFileChangeViaCreateImageBitMapApiAsync(file) {
	const imageBitMap = await createImageBitmap(file); // svg support is not available.
	drawImage(imageBitMap);
}

function createDrawText(position) {
	let previousValue = '';
	return function positionRememberedDrawText(ev) {
		const inputTarget = ev.target;
		const currentInputValue = inputTarget.value;
		previousValue = currentInputValue;
		drawText(currentInputValue, position);
	};
}

addListener(memeImageInput, 'change', (e) => {
	console.log('e', e);
	const file = e.target.files[0];
	console.log('file', file);
	handleFileChangeViaCreateImageBitMapApiAsync(file);
});

addListener(
	memeTopText,
	'input',
	createDrawText({
		x: 400,
		y: 150
	})
);

addListener(
	memeBottomText,
	'input',
	createDrawText({
		x: 400,
		y: 600
	})
);
