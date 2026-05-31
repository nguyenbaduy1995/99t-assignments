import { ThemeProvider, CssBaseline, Typography, Box } from "@mui/material";
import { theme } from "./theme";
import { usePrices } from "./hooks/usePrices";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { ExchangeForm } from "./components/ExchangeForm";

function formatLastUpdated(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleTimeString();
}

function App() {
  const { tokens, loading, error, lastUpdated } = usePrices();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Header />
        {loading && tokens.length === 0 ? (
          <LoadingState />
        ) : error && tokens.length === 0 ? (
          <ErrorState message={`Failed to load prices: ${error}`} />
        ) : (
          <>
            <ExchangeForm tokens={tokens} />
            {lastUpdated && (
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.4)",
                    fontSize: "0.75rem",
                  }}
                >
                  Prices from CoinGecko • Last updated:{" "}
                  {formatLastUpdated(lastUpdated)}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
