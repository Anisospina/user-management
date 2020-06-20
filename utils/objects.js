export function flattenObject(obj = {}, path = "") {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const isObject = typeof value === "object" && !Array.isArray(value);
    const flatKey = path ? `${path}.${key}` : key;
    const flat = isObject
      ? flattenObject(value, flatKey)
      : { [flatKey]: value };
    return { ...acc, ...flat };
  }, {});
}

export function inflateObject(entry) {
  const [key, value] = entry;
  if (key.length === 0) return value;
  const [base, ...values] = key.split(".");
  const newEntry = values.join(".");
  return { [base]: inflateObject([newEntry, value]) };
}
