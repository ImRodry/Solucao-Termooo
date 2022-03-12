export const doesPreferDark = () => !!window.matchMedia("(prefers-color-scheme: dark)").matches

export const getWordForDate = (currentDate: Date, path: Games) => {
	const { epoch, correctWords }: GameData = require(`./${path}/util`)
	const msSinceEpoch = currentDate.setHours(0, 0, 0, 0) - epoch.getTime()

	return correctWords[Math.round(msSinceEpoch / 864e5) % correctWords.length] ?? null
}

export const normalizeWord = (word: string) => word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export function generateTip(badLetters: string, goodLetters: string, wordGuess: WordArray, path: Games) {
	const { allWords }: GameData = require(`./${path}/util`)
	return allWords.filter(w => {
		const [...normWord] = normalizeWord(w.toLowerCase())
		return (
			[...badLetters].every(l => !normWord.includes(l)) &&
			[...goodLetters].every(l => normWord.includes(l)) &&
			wordGuess.every((l, i) => {
				if (l) return normWord[i] === l.toLowerCase()
				else return true
			})
		)
	})
}

export type WordArray = [string, string, string, string, string]

export function dateToHumanReadable(date: Date) {
	const dateTime = date.setHours(0, 0, 0, 0),
		currentDate = new Date().setHours(0, 0, 0, 0)

	if (dateTime === currentDate) return "hoje"
	else if (dateTime === new Date(currentDate).setDate(new Date().getDate() + 1)) return "amanhã"
	else if (dateTime === new Date(currentDate).setDate(new Date().getDate() - 1)) return "ontem"

	return formatDate(date)
}

export const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

export type LetterCount = 1 | 2 | 3 | 4 | 5

export type Games = "termooo" | "palavra-do-dia"

export interface GameData {
	allWords: string[]
	correctWords: string[]
	epoch: Date
}
