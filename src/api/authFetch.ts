import { BASE_URL } from "api";

export interface fetchURLProps {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
  isFormData?: boolean;
}

export default async function authFetch({
  path,
  method = "GET",
  body,
  isFormData = false,
}: fetchURLProps): Promise<{
  data: any;
  message: string;
  error?: string;
}> {
  try {
    const ACCESS_TOKEN = localStorage?.getItem("ACCESS_TOKEN");
    const headers: any = {};
    ACCESS_TOKEN && (headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`);
    !isFormData && (headers["Content-Type"] = "application/json");
    const options: RequestInit = {
      method: method,
      headers,
      body: body,
    };
    !body && delete options?.body;
    const response = await fetch(`${BASE_URL}/${path}`, options);
    const responseData = await response.json();
    responseData?.ACCESS_TOKEN &&
      localStorage?.setItem("ACCESS_TOKEN", responseData?.ACCESS_TOKEN);
    return responseData;
  } catch (error) {
    const err = error as Error;
    return { error: err?.message, data: null, message: "" };
  }
}

export async function authFetchServer({
  path,
  method = "GET",
  body,
  isFormData = false,
}: fetchURLProps): Promise<{
  data: any;
  message: string;
  error?: string;
}> {
  try {
    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
      body: body,
    };
    !body && delete options?.body;
    const response = await fetch(`${BASE_URL}/${path}`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    const err = error as Error;
    return { error: err?.message, data: null, message: "" };
  }
}
