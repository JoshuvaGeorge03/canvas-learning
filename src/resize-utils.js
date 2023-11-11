export function createResizeObserver(callback) {
	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			callback(entry);
		}
	});
	return {
		observe: (el, options) => observer.observe(el, options),
		unObserve: (el) => observer.unobserve(el)
	};
}
