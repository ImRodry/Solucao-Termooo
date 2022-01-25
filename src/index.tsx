import { red } from "@mui/material/colors"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { doesPreferDark } from "./util"

const theme = createTheme({
	palette: {
		primary: {
			main: "#21DE3D"
		},
		secondary: {
			main: "#6e5c62"
		},
		error: {
			main: red.A400
		},
		mode: doesPreferDark() ? "dark" : "light"
	}
})


ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>,
	document.querySelector("#root"),
)
