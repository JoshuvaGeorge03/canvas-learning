import { getEleById, addListener } from './utils.js';

const memeGeneratorForm = getEleById('memeGeneratorForm');
const memeImageInput = getEleById('memeFile');

function drawImage(imageElement) {
    drawingAreaContext.drawImage(imageElement, 300, 400, drawingArea.width, drawingArea.height);
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
    createImageBitmap(file).then(imageBitMap => {
        drawImage(imageBitMap);
    });
}

async function handleFileChangeViaCreateImageBitMapApiAsync(file) {
    const imageBitMap = await createImageBitmap(file); // svg support is not available.
    drawImage(imageBitMap);
}

addListener(memeImageInput, 'change', (e) => {
    console.log('e', e);
    const file = e.target.files[0];
    console.log('file', file);
    handleFileChangeViaCreateImageBitMapApiAsync(file);
});