import { Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1, sm: 2, md: 3 },
        bgcolor: "#0a0a0f",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 50%), #0a0a0f",
      }}
    >
      {children}
    </Box>
  );
}
