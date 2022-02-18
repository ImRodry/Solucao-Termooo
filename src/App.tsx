import React, { Dispatch, SetStateAction } from "react"
import { Box, Button, Container, Input, Typography, Select, FormControl, InputLabel, MenuItem } from "@mui/material"
import { getWordForDate, dateToHumanReadable, formatDate, generateTip, LetterCount, GameData, Games } from "./util/util"

export default function App(path: Games) {
	const [date, setDate] = React.useState(new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)),
		[revealed, setRevealed] = React.useState(false),
		[showTip, setTip] = React.useState(false),
		[confirmTip, setConfirmTip] = React.useState(false),
		[letters, setLetters] = React.useState<LetterCount>(1),
		dayWord = getWordForDate(date, path),
		tip = generateTip(dayWord, letters, path),
		{ epoch } = require(`./util/${path}/util`) as GameData,
		gameName = getName(path)

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
					{document.title}
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

				{confirmTip && !showTip && !revealed ? (
					<>
						<Typography variant="body1" gutterBottom sx={{ my: 2 }}>
							{tip
								? `Dica com ${letters === 1 ? `${letters} letra` : `${letters} letras`} em comum com a palavra de ${dateToHumanReadable(
										date,
								  )}: ${tip}`
								: dayWord
								? `Tens de escolher um número de letras entre 1 e 5! Para veres a palavra, clica em "${
										document.querySelector("#root > div > div > button:nth-child(6)")!.textContent
								  }"`
								: `${gameName.charAt(0).toUpperCase()}${gameName.slice(1)} só começou a ${formatDate(epoch)}!`}
						</Typography>
					</>
				) : showTip ? (
					<>
						<Typography variant="body1" gutterBottom sx={{ my: 2 }}>
							Seleciona o número de letras que desejas incluir na dica. Isto não te irá dar a resposta certa, mas pode sempre ajudar!
						</Typography>
						<FormControl>
							<InputLabel id="select-letters">Letras</InputLabel>
							<Select<LetterCount> labelId="select-letters" value={letters} label="Age" onChange={e => setLetters(e.target.value as LetterCount)}>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</Select>
						</FormControl>
						<>
							<br />
							<Button
								onClick={() => {
									setConfirmTip(true)
									setTip(false)
								}}
							>
								Mostrar dica
							</Button>
						</>
					</>
				) : (
					""
				)}
				{revealed ? (
					<Typography variant="body1" gutterBottom sx={{ my: 2 }}>
						{dayWord
							? `Palavra de ${dateToHumanReadable(date)}: ${dayWord}`
							: `${gameName.charAt(0).toUpperCase()}${gameName.slice(1)} só começou a ${formatDate(epoch)}!`}
					</Typography>
				) : confirmTip || !showTip ? (
					<>
						{!confirmTip ? <br /> : <></>}
						<Button onClick={() => setRevealed(true)}>Revelar palavra</Button>
						<Button
							onClick={() => {
								setTip(true)
								setConfirmTip(false)
							}}
						>
							Ver dica
						</Button>
					</>
				) : (
					""
				)}
			</Box>
		</Container>
	)
}

function getName(type: Games) {
	switch (type) {
		case "termooo":
			return "o Termooo"
		case "palavra-do-dia":
			return "a Palavra do dia"
	}
}
