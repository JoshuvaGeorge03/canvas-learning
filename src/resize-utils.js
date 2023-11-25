export function createResizeObserver(el, callback, options) {
	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			callback(entry);
		}
	});
	observer.observe(el, options);
	return (el) => observer.unobserve(el);
	// return {
	// 	observe: (el, options) => observer.observe(el, options),
	// 	unObserve: (el) => observer.unobserve(el)
	// };
}
