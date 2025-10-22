import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563eb", // xanh HBO (tailwind blue-600)
        },
        secondary: {
            main: "#64748b", // gray slate
        },
    },
    shape: {
        borderRadius: 10, // bo góc mềm hơn
    },
    typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
        button: {
            textTransform: "none", // nút không in hoa
            fontWeight: 600,
        },
    },
});

export default theme;
