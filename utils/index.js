export function theSameArrayItems(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every(item1 => arr2.find(item2 => item1 === item2));
}