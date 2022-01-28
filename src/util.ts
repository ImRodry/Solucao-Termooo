import allWords from "./palavras.json"
import correctWords from "./palavras.json"

export const epoch = new Date(2022, 0, 2, 0, 0, 0, 0)

export const doesPreferDark = () => !!window.matchMedia("(prefers-color-scheme: dark)").matches

export const getWordForDate = (currentDate: Date) => {
	// Epoch: 2/1/2022 - January 2nd 2022
	const msSinceEpoch = currentDate.setHours(0, 0, 0, 0) - epoch.getTime()

	return correctWords[Math.round(msSinceEpoch / 864e5) % correctWords.length]
}

export const normalizeWord = (word: string) => word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export function generateTip(word: string, letterCount: 1 | 2 | 3 | 4) {
	const [...normTargetWord] = normalizeWord(word)
	// Count each letter of the word
	const letterCountsTargetWord = normTargetWord.reduce<Record<string, number>>((lc, char) => {
		lc[char] ? lc[char]++ : (lc[char] = 1)
		return lc
	}, {})

	const matchingWords = allWords.filter(testWord => {
		const [...normTestWord] = normalizeWord(testWord)
		// Same thing we did for the target word, but also counting the total number of matches
		const result = normTestWord.reduce<{ encountered: Record<string, number>; match: number }>(
			(res, char) => {
				res.encountered[char] ? res.encountered[char]++ : (res.encountered[char] = 1)
				// Make sure we don't count a letter more times than it appears in the target word
				if (res.encountered[char] <= (letterCountsTargetWord[char] ?? 0)) {
					res.match++
				}
				return res
			},
			{ encountered: {}, match: 0 },
		)
		return result.match === letterCount
	})
	return matchingWords[Math.floor(Math.random() * matchingWords.length)]
}

export type LetterCount = 1 | 2 | 3 | 4

export function dateToHumanReadable(date: Date) {
	const dateTime = date.setHours(0, 0, 0, 0),
		currentDate = new Date().setHours(0, 0, 0, 0)

	if (dateTime === currentDate) return "hoje"
	else if (dateTime === new Date(currentDate).setDate(new Date().getDate() + 1)) return "amanhã"
	else if (dateTime === new Date(currentDate).setDate(new Date().getDate() - 1)) return "ontem"

	return formatDate(date)
}

export const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
