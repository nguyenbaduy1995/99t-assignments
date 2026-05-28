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
        background:
          "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f5d0fe 70%, #e9d5ff 100%)",
      }}
    >
      {children}
    </Box>
  );
}
