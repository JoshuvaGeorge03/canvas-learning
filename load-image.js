import { getEleById, addListener } from './utils.js';

export default function loadImage(canvasEl, canvasContext) {
	const inputEle = getEleById('imageToLoad');
	let url = '';
	function handleFileLoad(e) {
		if (url) {
			URL.revokeObjectURL(url);
			url = '';
		}
		console.log('e', e.target.files);
		url = URL.createObjectURL(e.target.files[0]);
		const img = new Image();
		img.src = url;
		addListener(img, 'load', () => {
			canvasContext.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
		});
	}

	const removeChangeList = addListener(inputEle, 'change', handleFileLoad);

	return () => {
		removeChangeList();
		URL.revokeObjectURL(url);
	};
}
