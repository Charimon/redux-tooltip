/**
 * Returns a position of given DOM element.
 *
 * @param {Object} el - DOM element.
 * @return {Object}
 */
export function position(el) {
  const pos = el.getBoundingClientRect();
  const { pageYOffset, pageXOffset } = window;
  const { scrollTop, clientTop, scrollLeft, clientLeft } = document.documentElement;
  const winTop = (pageYOffset || scrollTop) - clientTop;
  const winLeft = (pageXOffset || scrollLeft) - clientLeft;

  return {
    top: pos.top + winTop,
    left: pos.left + winLeft,
    right: pos.right + winLeft,
    bottom: pos.bottom + winTop,
    width: pos.width,
    height: pos.height,
  };
}

/**
 * Calculates a position of the tooltip.
 *
 * @param {string} place - 'top', 'right', 'bottom', or 'left'.
 * @param {Object} tooltip - DOM element.
 * @param {Object} origin - DOM element.
 * @return {Object} contains 'top' and 'left' keys.
 */
export function placement(place, tooltip, origin) {
  const gap = 12;
  const tip = position(tooltip);
  const pos = position(origin);

  let offset = {};

  switch(place) {
  case 'top': case 'bottom':
    offset.left = `${pos.left + (pos.width * 0.5) - (tip.width * 0.5)}px`;
    break;
  case 'left': case 'right':
    offset.top = `${pos.top + (pos.height * 0.5) - (tip.height * 0.5)}px`;
    break;
  }

  switch(place) {
  case 'top':
    offset.top = `${pos.top - tip.height - gap}px`;
    break;
  case 'right':
    offset.left = `${pos.right + gap}px`;
    break;
  case 'bottom':
    offset.top = `${pos.top + pos.height + gap}px`;
    break;
  case 'left':
    offset.left = `${pos.left - tip.width - gap}px`;
    break;
  }

  return offset;
}

/**
 * Resolves names of target tooltip from action or props.
 *
 * @param {Object} action or props.
 * @return {Array} a list of tooltip names.
 */
export function resolve(obj) {
  let names;
  if (obj && obj.payload && obj.payload.name) {
    names = obj.payload.name;
  } else if (obj && obj.name) {
    names = obj.name;
  } else {
    names = ['default'];
  }

  if (typeof names === 'string') {
    names = [names];
  }

  return names;
}
