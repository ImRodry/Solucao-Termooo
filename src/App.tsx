import React, { Dispatch, SetStateAction } from "react"
import { Box, Button, Container, Input, Typography } from "@mui/material"
import { getWordForDate, dateToHumanReadable, formatDate, epoch, generateTip, LetterCount } from "./util"

export default function App() {
	const [date, setDate] = React.useState(new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)),
		[revealed, setRevealed] = React.useState(false),
		[showTip, setTip] = React.useState(false),
		[confirmTip, setConfirmTip] = React.useState(false),
		[letters, setLetters] = React.useState(1) as [LetterCount, Dispatch<SetStateAction<number>>],
		dayWord = getWordForDate(date)

	function resetDefaults() {
		setRevealed(false)
		setTip(false)
		setConfirmTip(false)
		setLetters(1)
	}

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
						if (e.target.value) setDate(new Date(Date.parse(e.target.value) - new Date().getTimezoneOffset() * 60_000))
						else setDate(new Date(Date.now() - new Date().getTimezoneOffset() * 60_000))

						resetDefaults()
					}}
					value={date.toISOString().substring(0, 10)}
				/>

				{revealed ? (
					<Typography variant="body1" gutterBottom sx={{ my: 2 }}>
						{dayWord ? `Palavra de ${dateToHumanReadable(date)}: ${dayWord}` : `O Termooo só começou a ${formatDate(epoch)}!`}
					</Typography>
				) : showTip ? (
					confirmTip ? (
						<>
							<Typography variant="body1" gutterBottom sx={{ my: 2 }}>
								Dica com {letters === 1 ? `${letters} letra` : `${letters} letras`} em comum com a palavra de {dateToHumanReadable(date)}:{" "}
								{generateTip(dayWord, letters)}
							</Typography>
							<Button onClick={() => setRevealed(true)}>Revelar palavra</Button>
						</>
					) : (
						<>
							<Typography variant="body1" gutterBottom sx={{ my: 2 }}>
								Seleciona o número de letras que desejas incluir na dica
							</Typography>
							<Input
								size="medium"
								type="number"
								inputMode="numeric"
								inputProps={{ min: 1, max: 4 }}
								defaultValue="1"
								onChange={e => setLetters(Number(e.target.value))}
							></Input>
							<>
								<br />
								<Button onClick={() => setConfirmTip(true)}>Mostrar dica</Button>
							</>
						</>
					)
				) : (
					<>
						<br />
						<Button onClick={() => setRevealed(true)}>Revelar palavra</Button>
						<Button onClick={() => setTip(true)}>Ver dica</Button>
					</>
				)}
			</Box>
		</Container>
	)
}
