/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const arr = Object.entries(obj);
  const newObj = {};
  let index = 0;
  for (let value of arr) {
    if (!fields.includes(value[0])) {
      newObj[value[0]] = arr[index][1];
    }
    index++;
  }
  return newObj;
};
const fruits = {
  apple: 2,
  orange: 4,
  banana: 3,
};

console.log(omit(fruits, "apple", "banana")); // Вернет обїект - { orange: 4 }
