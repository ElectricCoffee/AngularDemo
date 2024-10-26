/**
 * Functional and immutable alternative to `arr[i] = e;`
 * If the index doesn't exist, nothing happens.
 * @param arr the array you wish to update
 * @param index the index at which you wish to replace the item
 * @param newItem the item you wish to insert
 */
export function replaceAtIndex<T>(arr: T[], index: number, newItem: T) {
  return arr.map((e, i) => i === index ? newItem : e);
}

/**
 * Functional and immutable alternative to `delete arr[i];`
 * If the index doesn't exist, nothing happens.
 * @param arr the array you wish to update
 * @param index the index at which you wish to delete the item
 */
export function removeAtIndex<T>(arr: T[], index: number) {
  return arr.filter((_, i) => i !== index);
}
