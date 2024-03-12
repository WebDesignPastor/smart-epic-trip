export const preparedParams = (params: { [x: string]: any }) => {
    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        delete params[key];
        continue;
      }
      if (typeof value === "object") {
        const objKeys = Object.keys(value);
        if (objKeys.length !== 2) {
          delete params[key];
          continue;
        }
        params[key] = `${value[objKeys[0]]},${value[objKeys[1]]}`;
      }
    }
    return params;
  };
  