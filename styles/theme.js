import { createTheme } from "@mui/material/styles";

//create theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: '#D48166',
            dark: "#964A32",
            // light: '#757ce8',
            // contrastText: '#fff',
        },
        secondary: {
            main: '#fd40a5'
        }
    }
})

export default theme