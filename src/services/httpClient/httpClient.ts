import { toFormData } from "helpers";

export async function call(url: string, opts = {}) {
  const init = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    ...opts,
  };

  try {
    return await (await fetch(url, init)).json();
  } catch (error) {
    throw error;
  }
}

export const get = (endpoint: string, opts: any) => call(endpoint, opts);

export const post = (endpoint: string, body: any) =>
  call(endpoint, {
    method: "POST",
    body: toFormData(body),
  });

export const httpDelete = (endpoint: string) =>
  call(endpoint, { method: "DELETE" });
