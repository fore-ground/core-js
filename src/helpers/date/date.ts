export function isDate(value: any) {
  let returns = false;

  switch (typeof value) {
    case "string":
      returns = isNaN(parseInt(value)) && !isNaN(Date.parse(value));
      break;
    case "object":
      if (value instanceof Date) {
        returns = !isNaN(value.getTime());
      }
      break;
  }

  return returns;
}
