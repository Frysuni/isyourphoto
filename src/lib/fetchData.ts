//http request method to api route
//qs is used to convert json object into a parameter string in the url
import qs from "qs";

export const getStrapiURL = (path = "") => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`
  return url;
};

interface ParamsObj {
  [x: string]: string | string[] | { [y: string]: {} };
}

export const fetchData = async (
  path: string,
  paramsObj: ParamsObj = {},
  options: RequestInit = {}
) => {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const queryString = qs.stringify(paramsObj);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};
