import { toast } from "react-toastify";
import { APIFunction } from "types/api";

import { getLocalStorageItem } from "utils";
// export const BASE_URL = `http://192.168.29.123:8000/api/v1`;
// export const BASE_URL = `http://localhost:8000/api/v1`;
export const BASE_URL = `https://skyrise-backend-2.onrender.com/api/v1`;

export const post: APIFunction = async ({
  path,
  body = {},
  method = "POST",
  options = {},
  headers = {},
  isImage,
  isAlert,
}) => {
  if (!isImage) {
    headers["Content-Type"] = "application/json";
  }

  const accessToken = getLocalStorageItem("ACCESS_TOKEN");

  headers.Authorization = `Bearer ${accessToken}`;
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    };

    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    const json = await response.json();

    if (isAlert) {
      response?.status === 200
        ? toast.success(json.message)
        : toast.error(json.error);
    }

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    if (isAlert) toast.error(error);
    return { error };
  }
};
export const put: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = "PUT",
  options = {},
  headers = {},
  token = "",
  isImage,
  isAlert,
}) => {
  const accessToken = getLocalStorageItem("ACCESS_TOKEN");

  accessToken && (headers.Authorization = `Bearer ${accessToken}`);
  if (!isImage) {
    headers["Content-Type"] = "application/json";
  }
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    };
    //
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    const json = await response.json();

    if (isAlert) {
      response?.status === 200
        ? toast.success(json.message)
        : toast.error(json.error);
    }

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    if (isAlert) toast.error(error);
    return { error };
  }
};
export const remove: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = "DELETE",
  options = {},
  headers = { "Content-Type": "application/json" },
  token = "",
  isImage,
  isAlert,
}) => {
  const accessToken = getLocalStorageItem("ACCESS_TOKEN");

  accessToken && (headers.Authorization = `Bearer ${accessToken}`);
  if (!isImage) {
    headers["Content-Type"] = "application/json";
  }
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    };
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    const json = await response.json();
    if (isAlert) {
      response?.status === 200
        ? toast.success(json.message)
        : toast.error(json.error);
    }

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    if (isAlert) toast.error(error);
    return { error };
  }
};
export { default as END_POINTS } from "./end-points";
