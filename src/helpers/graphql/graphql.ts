import { get } from "services";

const schemas: any = {};

export const queryTemplates = {
  pagination:
    "{:schema :args { data {:fields} paginatorInfo{total,currentPage,perPage}}}",
  list: "{:schema :args {:fields}}",
};

/**
 * Genere argument pour une query graphql
 *
 * @param {object} args
 * @returns  {string}
 */
export function makeQueryArgs(args: any = {}) {
  let argsString = "";

  if (args && typeof args == "object")
    for (let key in args) {
      if (key.startsWith("_") || !args[key]) continue;

      if (typeof args[key] == "object") {
        argsString = `${argsString}, ${key}: {${makeQueryArgs(args[key])}}`;
        continue;
      }

      const value = args[key];
      const match = key.match(/^\$.*/) ? true : false;
      if (match) {
        key = key.replace(/^\$/, "");
      }
      argsString = `${argsString}, ${key}: ${
        match ? value : JSON.stringify(value)
      }`;
    }

  return `${argsString.substr(1).trim()}`;
}

/**
 * Generer une query graphql
 *
 * @param {string} schema
 * @param {object} args
 * @param {boolean} pagination
 * @param {string} fields
 * @returns  {string}
 */
export function makeQuery(
  schema: string,
  args: any = {},
  pagination = true,
  fields: string
) {
  args = makeQueryArgs(args);
  args = args && (args as string).length ? `(${args})` : "";

  if (!fields) {
    if (schemas[schema]) {
      fields = schemas[schema][0];
    }
  }

  return (pagination ? queryTemplates.pagination : queryTemplates.list)
    .replace(":schema", schema)
    .replace(":args", args as string)
    .replace(":fields", fields);
}

/**
 * Permet de faire une requete graphql
 *
 * @param {string} query
 * @returns {Promise<{schema: string, data: Array, paginatorInfo: {total: number, currentPage: number, perPage: number}}>}
 */
export async function fetchQuery(query: string) {
  const res = await get(/*to cahnge*/ `/graphql`, {
    params: {
      query,
    },
  });

  const data = res.data.data ? res.data.data : res.data;
  const [key] = Object.keys(data);

  return {
    schema: key,
    data: data[key].data ? data[key].data : data[key],
    paginatorInfo: data[key].paginatorInfo ? data[key].paginatorInfo : null,
  };
}
