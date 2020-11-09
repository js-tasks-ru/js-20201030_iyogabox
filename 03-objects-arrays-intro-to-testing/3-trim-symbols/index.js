/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */

export function trimSymbols(string, size) {
	if (size === undefined) {
	  return string;
	} else if (size === 0) {
	  return '';
	}
	const arrStr = [...string];
	const arrResult = arrStr.reduce(
	  (acc, elem, index, arr) => {
		if (elem === arr[index + 1]) {
		  acc[0] += elem;
		} else {
		  acc[0] += elem;
		  acc.push(acc[0]);
		  acc[0] = '';
		}
		return acc;
	  },
	  ['']
	);

	arrResult.shift();
	const finalStr = arrResult.reduce((acc, elem) => {
		acc += elem.slice(0, size);
	  return acc;
	}, '');

	return finalStr;
  }
