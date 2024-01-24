export const stringifyReplacer = (
  key: string,
  value: any,
  ignoredKeys: string[],
) => {
  if (ignoredKeys.includes(key)) return undefined;
  else return value;
};
