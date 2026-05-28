import { useState, useEffect } from "react";
import type { Token, TokenPrice } from "../types";

const PRICES_URL = "https://interview.switcheo.com/prices.json";
const ICON_BASE_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

export function usePrices() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch(PRICES_URL);
        if (!response.ok) throw new Error("Failed to fetch prices");

        const data: TokenPrice[] = await response.json();

        const tokenMap = new Map<string, Token>();
        for (const item of data) {
          const existing = tokenMap.get(item.currency);
          if (!existing || item.date > existing.date) {
            tokenMap.set(item.currency, {
              currency: item.currency,
              price: item.price,
              icon: `${ICON_BASE_URL}/${item.currency}.svg`,
              date: item.date,
            });
          }
        }

        const sortedTokens = Array.from(tokenMap.values()).sort((a, b) =>
          a.currency.localeCompare(b.currency)
        );

        setTokens(sortedTokens);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  return { tokens, loading, error };
}
