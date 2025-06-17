export const toggleStringSet = (set: Set<string>, key: string) => {
  if (set.has(key)) {
    set.delete(key);
  } else {
    set.add(key);
  }
};
