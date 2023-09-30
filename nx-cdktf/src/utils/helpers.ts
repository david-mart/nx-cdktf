/**
 * Splits an object into two objects based on the provided keys.
 *
 * @template T - The type of the options object.
 * @param {T} options - The options object to split.
 * @param {(keyof T)[]} args - The keys to include in the first object.
 * @returns {[Partial<T>, Partial<T>]} An array containing two objects: the first object contains the properties specified in the `args` parameter, and the second object contains the remaining properties.
 */
export const splitArgs = <T extends Record<string, any> = Record<string, any>>(
  options: T,
  args: (keyof T)[]
) =>
  Object.entries(options).reduce(
    (acc, [key, value]: [keyof T, T[keyof T]]) => {
      if (args.includes(key)) {
        acc[0][key] = value;
      } else {
        acc[1][key] = value;
      }
      return acc;
    },
    [{}, {}] as [Partial<T>, Partial<T>]
  );
