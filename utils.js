export const getEl = (selector) => {
    return document.querySelector(selector);
}

export const getAllEl = selector => document.querySelectorAll(selector);

export const getEleById = selector => getEl(`#${selector}`);


export function addListener(ele, type, cb) {
    ele.addEventListener(type, cb);
    return () => ele.removeEventListener(type, cb);
}