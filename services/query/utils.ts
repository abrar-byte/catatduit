import * as qs from "qs";
import { useQueryClient } from "@tanstack/react-query";
import { queryParams } from "@/types/api";

export const queryParamsToQs = (
  queryParams: Record<string, any> = {},
  { deleteEmpty = false } = {},
): string => {
  // Filter out empty values
  let filteredParams = { ...queryParams };
  if (deleteEmpty) {
    filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value),
    );
  }

  const withParams = Object.keys(filteredParams)?.length;
  const queryString = withParams
    ? "?" +
      qs.stringify(filteredParams, {
        arrayFormat: "indices",
        encode: false,
        format: "RFC3986",
      })
    : "";
  return queryString;
};

export const qsToQueryParams = (queryString: string): queryParams => {
  const parsedParams = qs.parse(queryString, {
    ignoreQueryPrefix: true,
  }) as queryParams;

  return parsedParams;
};

export const handleError = (error: any) => {
  return false;
};

export const useInvalidateQueries = (keys: string[]) => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    keys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  };

  return { invalidateQueries };
};

