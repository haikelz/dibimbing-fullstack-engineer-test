import { axios } from "@/lib/utils/axios-config";
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get(url, {
      method: "GET",
    });

    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch data!");
  }
}

/**
 * A reusable useQuery with additional configuration
 * @export
 * @param {string} link - API link
 * @returns {UseQueryResult<any, Error>} configured useQuery
 */
export function useFetch(link: string): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: [link],
    queryFn: () => getData(link),
    /**
     * @see https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5#removed-keeppreviousdata-in-favor-of-placeholderdata-identity-function
     */
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
