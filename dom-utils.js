export function setAttrOfAnEl(el, attrName, attrValue) {
	el.setAttribute(attrName, attrValue);
	return el;
}

export function setWidthOfAnEl(el, attrValue) {
	setAttrOfAnEl(el, 'width', attrValue);
	return el;
}

export function setHeightOfAnEl(el, attrVAlue) {
	setAttrOfAnEl(el, 'height', attrVAlue);
	return el;
}
