export const getEl = (selector) => {
	return document.querySelector(selector);
};

export const getAllEl = (selector) => document.querySelectorAll(selector);

export const getEleById = (selector) => getEl(`#${selector}`);

export function addListener(ele, type, cb) {
	ele.addEventListener(type, cb);
	return () => ele.removeEventListener(type, cb);
}

/*
 1) return new function
 2) when calling that function, it inturn calls all of the given function in right to left manner.
 3) facilitating passing of one function output to another function input.
 4) once every function called, it will return final output.
*/
export function compose(...fns) {
	const copyOfFns = [...fns];
	return function innerComposed(input) {
		return copyOfFns.reduceRight((previousOutput, fn) => {
			const outputOfFn = fn(previousOutput);
			return outputOfFn;
		}, input);
	};
}

export const doNothingExceptReturnPassedArg = (arg) => arg;

export const dummyFn = () => void 0;
