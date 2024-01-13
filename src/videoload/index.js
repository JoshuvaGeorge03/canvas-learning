import { getEleById, addListener } from '../utils.js';

export default function videoLoadInit(drawingAreaEl, drawingAreaContext) {
	const videoFileInputElement = getEleById('videoToLoad');

	function playVideoOnToCanvas(videoEl) {
		// addListener(videoEl, 'play', () => {
		drawingAreaContext.drawImage(
			videoEl,
			0,
			0,
			drawingAreaEl.width,
			drawingAreaEl.height
		);
		requestAnimationFrame(() => {
			playVideoOnToCanvas(videoEl);
		});
		// });
		// videoEl.play();
	}

	function handleFileChange(e) {
		console.log('e', e);
		if (!e.target.files.length) {
			return;
		}

		const fileReader = new FileReader();

		function handleFileLoad(ev) {
			const url = ev.target.result;
			const videoEl = document.createElement('video');

			addListener(videoEl, 'play', () => playVideoOnToCanvas(videoEl));

			videoEl.src = url;
			videoEl.play();
		}

		addListener(fileReader, 'load', handleFileLoad);

		fileReader.readAsDataURL(e.target.files[0]);
	}

	const unListen = addListener(
		videoFileInputElement,
		'change',
		handleFileChange
	);

	return () => {
		unListen();
	};
}
