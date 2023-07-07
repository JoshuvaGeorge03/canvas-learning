import { getEleById, addListener } from './utils.js';

const memeGeneratorForm = getEleById('memeGeneratorForm');
const memeImageInput = getEleById('memeFile');

function drawImage(imageElement) {
    drawingAreaContext.drawImage(imageElement, 100, 100, drawingArea.width, drawingArea.height);
}

addListener(memeImageInput, 'change', (e) => {
    console.log('e', e);
    drawImage(memeImageInput);
})