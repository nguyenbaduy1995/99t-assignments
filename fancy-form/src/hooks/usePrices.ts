import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrices } from "../api/coingecko";

const REFETCH_INTERVAL = 30 * 1000;

export function usePrices() {
  const { data, isLoading, error, dataUpdatedAt } = useQuery({
    queryKey: ["tokenPrices"],
    queryFn: fetchTokenPrices,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: REFETCH_INTERVAL,
    gcTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    tokens: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    lastUpdated: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
  };
}
