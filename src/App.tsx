import React from "react"
import { Box, Button, Container, Input, Typography, TableFooter } from "@mui/material"
import { getWordForDate, dateToHumanReadable, formatDate } from "./util"

export default function App() {
	const [date, setDate] = React.useState(new Date()),
		[revealed, setRevealed] = React.useState(false),
		wordForDate = getWordForDate(date),
		formattedDate = dateToHumanReadable(date)

	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4, textAlign: "center" }}>
				<Typography variant="h3" component="h1" gutterBottom>
					Solução do Termooo
				</Typography>

				<Typography variant="body2" component="h2" gutterBottom>
					Rodry © {new Date().getFullYear()}
				</Typography>

				<Typography variant="h6" gutterBottom>
					Seleciona uma data:
				</Typography>
				<Input
					type="date"
					onChange={e => {
						if (e.target.value) setDate(new Date(e.target.value))
						else {
							setDate(new Date())
							e.target.value = formatDate(new Date())
						}
						setRevealed(false)
					}}
					value={date.toISOString().substring(0, 10)}
				/>

				{revealed ? (
					<Typography variant="body1" gutterBottom sx={{ my: 2 }}>
						Palavra de {formattedDate}: {wordForDate}
					</Typography>
				) : (
					<>
						<br />
						<Button onClick={() => setRevealed(true)}>Revelar palavra</Button>
					</>
				)}
			</Box>
		</Container>
	)
}
