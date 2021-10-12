function includes(haystack, needle) {
  return haystack.indexOf(needle) !== -1;
}

export const pick = (data, toPick) => pickBy(data, toPick, (values, v) => includes(values, v));

export const omit = (data, toOmit) => pickBy(data, toOmit, (values, v) => !includes(values, v));

export const pickBy = (data, values, predicate) => {
  return Object.keys(data)
  .reduce((c, v) => {
    if (predicate(values, v)) {
      c[v] = data[v];
      return c;
    }
    return c;
  }, {});
}
