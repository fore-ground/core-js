/*eslint no-use-before-define: ["error", { "functions": false }]*/

import { isDate } from "../date";

/**
 * Permet d'ajouter une valeur au FormData
 *
 * @param {string|array|object} value
 * @param {FormData} form
 * @param {string} $on
 */
export function addValueToFormData(value: any, form: any, $on: string) {
  if (
    typeof value === "object" &&
    !(value instanceof File) &&
    !(value instanceof Date)
  ) {
    const entries: any = Array.isArray(value)
      ? value.entries()
      : Object.entries(value);

    for (const [$k, $v] of entries) {
      form = addValueToFormData($v, form, `${$on}[${$k}]`);
    }
    return form;
  }

  if (isDate(value)) {
    form.append($on, "" /** to do formatted date */);
    return form;
  }

  form.append($on, value);
  return form;
}

/**
 * Transform un object en FormData
 *
 * @param {object} data
 * @returns  {FormData}
 */
export function toFormData(data: object) {
  let form = new FormData();

  for (const [$k, $v] of Object.entries(data)) {
    form = addValueToFormData($v, form, $k);
  }

  return form;
}
