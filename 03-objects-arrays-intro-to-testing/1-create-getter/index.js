/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArr = path.split(".");
  return function (obj) {
    if (!Object.entries(obj).length) {return;}
    const lastObj = pathArr.reduce((akk, elem, index) => {
      if (index === 0) {
        return Object.assign({}, obj);
      }
      return returnObj(akk);
    }, {});

    return lastObj[pathArr[pathArr.length - 1]];
  };
}
function returnObj(obj) {
  const arr = Object.entries(obj);
  return arr[0][1];
}
