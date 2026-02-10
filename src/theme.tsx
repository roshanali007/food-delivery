import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 32,
          fontFamily: "monster2",
          textTransform: "none",
          fontSize: "16px",
          padding: "10px 28px",
          border: "2px solid transparent",
          transition: "all 0.3s ease",

          "&:hover": {
            backgroundColor: "#fff",
            color: "#d32f2f",
            borderColor: "#d32f2f",
            boxShadow: "0 6px 20px rgba(211,47,47,0.3)",
            transform: "translateY(-3px)",
          },
        },
      },
    },
  },
});
