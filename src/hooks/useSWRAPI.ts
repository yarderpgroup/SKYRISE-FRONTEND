import { BASE_URL } from "api";
import useSWR from "swr";
import { getLocalStorageItem } from "utils";
const useSWRAPI = (url: string | null, options?: any) => {
  const accessToken = getLocalStorageItem("ACCESS_TOKEN");

  const fetcher = async (url: string, options?: any) => {
    const headers: any = {};
    accessToken && (headers["Authorization"] = `Bearer ${accessToken}`);
    headers["Content-Type"] = "application/json";
    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await res.json();
    return { data, res };
  };

  const { data, error, mutate, isValidating } = useSWR(
    url ? [`${BASE_URL}/${url}`, options] : null,
    fetcher,
    {
      ...options,
      revalidateOnFocus: false,
    }
  );
  return {
    data,
    error,
    isValidating,
    mutate,
  };
};
export default useSWRAPI;
