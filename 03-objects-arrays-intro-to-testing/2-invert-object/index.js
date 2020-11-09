/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
	if (!obj) {
	  return undefined;
	}
	if (Object.entries(obj).length === 0) {
	  return {};
	}
	const entries = Object.entries(obj);
	const invertObj = entries.reduce((akk, elem, index) => {
	  return Object.assign(akk, { [elem[1]]: elem[0] });
	}, {});

	return invertObj;
  }
