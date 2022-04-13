import { red, lightGreen } from "@mui/material/colors"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PalavraDoDia from "./util/palavra-do-dia/PalavraDoDia"
import Termooo from "./util/termooo/Termooo"
import Termopt from "./util/termopt/Termopt"
import { doesPreferDark } from "./util/util"

const theme = createTheme({
	palette: {
		primary: {
			main: "#21DE3D",
		},
		secondary: {
			main: "#6e5c62",
		},
		error: {
			main: red[500],
		},
		success: {
			main: lightGreen.A400,
		},
		mode: doesPreferDark() ? "dark" : "light",
	},
})

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate replace to="/termooo" />} />
				<Route path="/termooo" element={<Termooo />} />
				<Route path="/palavra-do-dia" element={<PalavraDoDia />} />
				<Route path="/termopt" element={<Termopt />} />
			</Routes>
		</BrowserRouter>
	</ThemeProvider>,
	document.querySelector("#root"),
)
