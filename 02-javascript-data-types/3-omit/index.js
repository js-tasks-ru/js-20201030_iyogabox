/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const arr = Object.entries(obj);
  const newObj = {};
  for (let value of arr) {
    if (!fields.includes(value[0])) {
      newObj[value[0]] = value[1];
    }
  }
  return newObj;
};