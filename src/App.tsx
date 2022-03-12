import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react"
import { Box, Button, Container, Input, Typography, TextField } from "@mui/material"
import { getWordForDate, dateToHumanReadable, formatDate, generateTip, GameData, Games, WordArray, normalizeWord } from "./util/util"

export default function App(path: Games) {
	const [date, setDate] = useState(new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)),
		[revealed, setRevealed] = useState(false),
		[showTip, setTip] = useState(false),
		[confirmTip, setConfirmTip] = useState(false),
		[badLetters, setBadLetters] = useState(""),
		[goodLetters, setGoodLetters] = useState(""),
		[word, setWord] = useState<WordArray>(Array<string>(5).fill("") as WordArray),
		wordPartRefs = useRef<HTMLInputElement[]>([]),
		dayWord = getWordForDate(date, path),
		tip = generateTip(badLetters, goodLetters, word, path).join(", "),
		{ epoch } = require(`./util/${path}/util`) as GameData,
		gameName = getName(path)

	let previousEvent: KeyboardEvent<HTMLDivElement> | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	function resetDefaults() {
		setRevealed(false)
		setTip(false)
		setConfirmTip(false)
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
								? `Palavras encontradas:\n${tip}`
								: "Não foi possível encontrar nenhuma palavra com a configuração apresentada. Experimenta alterar a configuração ou ver a solução de hoje"}
						</Typography>
					</>
				) : showTip ? (
					<>
						<br />
						<br />
						<TextField
							color="error"
							variant="standard"
							placeholder="Letras erradas"
							value={badLetters}
							onChange={e => setBadLetters(e.target.value)}
						></TextField>
						<br />
						<TextField
							color="success"
							variant="standard"
							placeholder="Letras corretas"
							value={goodLetters}
							onChange={e => setGoodLetters(e.target.value)}
						></TextField>
						<br />

						{Array.from({ length: word.length }, (_, i) => {
							function handleCharChange(char: string, index = i) {
								const newWord = [...word] as WordArray
								newWord[index] = /[A-Z]/gi.test(char) ? char?.toUpperCase() ?? "" : ""
								setWord(newWord)
							}

							function changeCharFocus(index: number) {
								const ref = wordPartRefs.current[index]
								ref?.focus()
							}

							return (
								<TextField
									variant="outlined"
									style={{ width: 40, marginRight: 3, marginTop: 10, textAlign: "center" }}
									ref={el => {
										if (el) wordPartRefs.current[i] = el.querySelector<HTMLInputElement>("input")!
									}}
									key={i}
									onKeyDown={e => {
										if (e.nativeEvent.code !== "Backspace") return

										if (word[i]) handleCharChange("")
										else handleCharChange("", i - 1)
										changeCharFocus(i - 1)
										previousEvent = e
									}}
									onChange={e => {
										if (previousEvent?.type === "keydown" && !e.target.value) return
										handleCharChange(normalizeWord(e.target.value.at(-1) ?? ""))
										changeCharFocus(i + 1)
										previousEvent = e
									}}
									value={word[i]}
								></TextField>
							)
						})}

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
