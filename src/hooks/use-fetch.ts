import { axios } from "@/lib/utils/axios-config";
import {
  CONDITION,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from "@/lib/utils/constants";
import { GetAllNotesSchema } from "@/lib/utils/graphql";
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
  `${
    CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
  }/api/graphql`
);

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
    queryFn: async () => await graphQLClient.request(GetAllNotesSchema),
    /**
     * @see https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5#removed-keeppreviousdata-in-favor-of-placeholderdata-identity-function
     */
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
