/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const result = arr.slice().sort((prev, next) => {
    if (prev.toLowerCase() === next.toLowerCase()) {
      if (prev[0] < next[0]) {
        return -1;
      }
    } else {
      return prev.localeCompare(next);
    }
  });
  if (param === 'desc') {
    return result.reverse();
  } else {
    return result;
  }
} 
