/**
 * Created by dan on 10/05/2017.
 */

export function mergeUniqueArrayByID(firstArray, secondArray) {
  let mergedArray = firstArray.concat(secondArray);
  return mergedArray
    .map(id => {
      return id.id;
    })
    .reduce((result, current) => {
      if (current && result.indexOf(current) < 0) {
        result.push(current);
      }
      return result;
    }, []);
}
