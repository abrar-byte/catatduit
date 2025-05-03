"use client";
import axios from "axios";
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { baseURL } from "@/lib/constants";
import { handleError, queryParamsToQs } from "@/services/query/utils";
import {
  error,
  listParams,
  listResult,
  listResultInfinite,
  mutationParams,
} from "@/types/api";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export const useApi = () => {
    const router = useRouter();
    
    // Gunakan async function untuk mendapatkan session
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      return data?.session || null;
    };
    
    // Dapatkan session menggunakan React Query
    const { data: sessionData } = useQuery({
      queryKey: ['auth-session'],
      queryFn: getSession,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 menit
    });
    
    const session = sessionData;
    
    // Fungsi untuk logout
    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        // Invalidate query cache
        const queryClient = new QueryClient();
        queryClient.clear();
        router.replace("/"); // Redirect ke halaman utama
      }
    };
  
    const headers: any = {};
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }
    
    const axiosInstance = axios.create({ baseURL, headers });
    
    // Interceptor untuk menangani error 401
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Jika status 401 (Unauthorized), lakukan logout
        if (error.response && error.response.status === 401) {
          console.log("Token expired or unauthorized, logging out...");
          handleLogout();
        }
        return Promise.reject(error);
      },
    );
    
    return { api: axiosInstance, session };
  };

export const useApiList = (
  table: string,
  {
    queryParams = {},
    skip = false,
    isPublic = false,
    keys,
    staleTime = 0,
    retry = false,
  }: listParams = {},
) => {
  const queryString = queryParamsToQs(queryParams);
  const { api, session } = useApi();
  return useQuery({
    queryKey: keys ? [...keys, queryString] : [table, queryString],
    queryFn: async (): Promise<listResult> => {
      // try {
      
      const { data } = await api.get(`${table}${queryString}`);
      return data;
      // } catch (error) {
      //   return { data: [], meta: { count: 0, page: 0, take: 0, pageCount: 0 } };
      // }
    },
    enabled: isPublic ? !skip : !!session?.access_token && !skip,
    placeholderData: (previousData) => previousData,
    throwOnError: false,
    refetchOnWindowFocus: false,
    staleTime,
    retry,
  });
};

export const useApiRead = (
  table: string,
  id: string | number,
  {
    queryParams = {},
    skip = false,
    isPublic = false,
    keys,
    staleTime = 0,
    retry = false,
  }: listParams = {},
) => {
  const queryString = queryParamsToQs(queryParams);
  const { api, session } = useApi();
  // console.log(
  //   "read",
  //   (!!id && isPublic && !skip) || (!!session?.access_token && !skip),
  // );
  return useQuery({
    queryKey: keys ? [...keys, queryString] : [table, id, queryString],
    queryFn: async (): Promise<{ [key: string]: any }> => {
      // try {
      const { data } = await api.get(`${table}/${id}${queryString}`);
      return data;
      // } catch (error) {
      //   return {};
      // }
    },
    enabled: isPublic
      ? !!id && !skip
      : !!id && !!session?.access_token && !skip,
    placeholderData: (previousData) => previousData,
    throwOnError: false,
    refetchOnWindowFocus: false,
    staleTime,
    retry,
  });
};

export const useApiPost = (
  table: string,
  { invalidateKeys = [] }: mutationParams = {},
) => {
  const queryClient = useQueryClient();
  const { api } = useApi();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await api.post(`${table}`, payload);
    },
    onSuccess: () => {
      if (!!invalidateKeys?.length) {
        for (let i = 0; i < invalidateKeys.length; i++) {
          const key = invalidateKeys[i];
          queryClient.invalidateQueries({ queryKey: [key] });
        }
      }
      queryClient.invalidateQueries({ queryKey: [table] });
    },
    onError: handleError,
    throwOnError: false,
  });
};

export const useApiPatch = (
  table: string,
  { invalidateKeys = [] }: mutationParams = {},
) => {
  const queryClient = useQueryClient();
  const { api } = useApi();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string | number;
      payload: any;
    }) => {
      return await api.patch(`${table}/${id}`, payload);
    },
    onSuccess: (data, variables, context) => {
      if (!!invalidateKeys?.length) {
        for (let i = 0; i < invalidateKeys.length; i++) {
          const key = invalidateKeys[i];
          queryClient.invalidateQueries({ queryKey: [key] });
        }
      }
      queryClient.invalidateQueries({ queryKey: [table] });
      queryClient.invalidateQueries({ queryKey: [`${table}-${variables.id}`] });
    },
    onError: handleError,
    throwOnError: false,
  });
};

export const useApiDelete = (
  table: string,
  { invalidateKeys = [] }: mutationParams = {},
) => {
  const queryClient = useQueryClient();
  const { api } = useApi();
  return useMutation({
    mutationFn: async (id?: string | number) => {
      return await api.delete(`${table}${id ? `/${id}` : ""}`);
    },
    onSuccess: (data, id, context) => {
      if (!!invalidateKeys?.length) {
        for (let i = 0; i < invalidateKeys.length; i++) {
          const key = invalidateKeys[i];
          queryClient.invalidateQueries({ queryKey: [key] });
        }
      }
      queryClient.invalidateQueries({ queryKey: [table] });
      queryClient.invalidateQueries({ queryKey: [`${table}-${id}`] });
    },
    onError: handleError,
    throwOnError: false,
  });
};

// // >> FOR DYNAMIC TYPES:
export const useApiAnyGet = (
  table: string,
  {
    queryParams = {},
    skip = false,
    isPublic = false,
    keys,
    staleTime = 0,
    retry = false,
  }: listParams = {},
) => {
  const queryString = queryParamsToQs(queryParams);
  const { api, session } = useApi();
  return useQuery({
    queryKey: keys ? [...keys, queryString] : [table, queryString],

    queryFn: async () => {
      // try {
      const { data } = await api.get(`${table}${queryString}`);
      return data;
      // } catch (error) {
      //   return null;
      // }
    },
    enabled: isPublic ? !skip : !!session?.access_token && !skip,
    placeholderData: (previousData) => previousData,
    throwOnError: false,
    refetchOnWindowFocus: false,
    staleTime,
    retry,
  });
};

// export const useToggleFavorite = (
//   table: string,
//   { invalidateKeys = [] }: mutationParams = {},
//   tableQuery: string = "contents",
// ) => {
//   const queryClient = useQueryClient();
//   const { api } = useApi();
//   const router = useRouter();
//   const params = useParams();
//   return useMutation({
//     mutationFn: async ({
//       id,
//       payload,
//     }: {
//       id: string | number;
//       payload: any;
//     }): Promise<any> => {
//       return await api.patch(`${table}/${id}`, payload);
//     },
//     onMutate: async (newItem) => {
//       // Cancel any outgoing refetches
//       // (so they don't overwrite our optimistic update)
//       await queryClient.cancelQueries({ queryKey: [tableQuery] });

//       // Snapshot the previous value
//       const previousData = queryClient.getQueryData([tableQuery]);
//       console.log("previousData", previousData);

//       // Optimistically update to the new value
//       queryClient.setQueryData([tableQuery], newItem);

//       // Return a context with the previous and new todo
//       return { previousData, newItem };
//     },
//     // If the mutation fails, use the context we returned above
//     onError: (err: error, newItem, context: any) => {
//       queryClient.setQueryData(
//         [tableQuery],
//         context.previousData?.payload?.favourite,
//       );
//       handleResponseError(err, () => logout({ router, params }), "read");
//     },
//     onSettled: (data) => {
//       queryClient.invalidateQueries({ queryKey: [tableQuery] });
//       queryClient.invalidateQueries({ queryKey: [table] });
//     },
//   });
// };

// function handleResponseError(error: error, logout: any, type = "read") {
//   if (error?.response?.status === 401) {
//     const { headers, request } = error?.response ?? {};

//     // logout({ isReload: true });
//     return;
//   }
//   return handleError(error);
// }
export const useApiInfiniteList = (
  table: string,
  {
    queryParams = {},
    skip = false,
    isPublic = false,
    keys,
    staleTime = 0,
    retry = false,
  }: listParams = {},
) => {
  const queryString = queryParamsToQs(queryParams);
  const { api, session } = useApi();

  return useInfiniteQuery({
    queryKey: keys ? [...keys, queryString] : [table, queryString],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<listResultInfinite> => {
      try {
        const combinedQueryParams = { ...queryParams, page: pageParam };
        const queryString = queryParamsToQs(combinedQueryParams);
        const { data } = await api.get(`${table}${queryString}`);
        return data;
      } catch (error) {
        return { pages: [], pageParams: [] };
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages) => {
      const { meta } = lastPage;
      const page =
        typeof meta?.page === "string" ? parseInt(meta?.page) : meta?.page;
      const nextPage = page < meta?.pageCount ? page + 1 : undefined;
      return nextPage;
      // return page < meta?.pageCount ? page + 1 : undefined;
    },
    enabled: isPublic ? !skip : !!session?.access_token && !skip,
    placeholderData: (previousData) => previousData,
    throwOnError: false,
    refetchOnWindowFocus: false,
    staleTime,
    retry,
  });
};

// export const handleLogout = async ({
//   pathname,
//   router,
//   queryClient,
//   userId,
//   clearAll,
// }: HandleLogoutParams & { clearAll: () => void }): Promise<void> => {
//   const supabase = createClient();
//   await setUrl(window.location.href, userId);
//   clearAll();
//   queryClient.clear();
//   const { error } = await supabase.auth.signOut();
//   if (!error)
//     if (pathname !== "/") {
//       router.replace("/");
//     } else {
//       router.refresh();
//     }
// };

// export const getSessionClient = async () => {
//   const supabase = createClient();
//   const {
//     data: { session },
//     error,
//   } = await supabase.auth.getSession();
//   if (error) {
//     console.log('session error:', error);
//     return null;
//   }
//   return session;
// };
