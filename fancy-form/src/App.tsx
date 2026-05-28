import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { usePrices } from "./hooks/usePrices";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { ExchangeForm } from "./components/ExchangeForm";

function App() {
  const { tokens, loading, error } = usePrices();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Header />
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={`Failed to load prices: ${error}`} />
        ) : (
          <ExchangeForm tokens={tokens} />
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
