export const doesPreferDark = () => !!window.matchMedia("(prefers-color-scheme: dark)").matches

export const getWordForDate = (currentDate: Date, path: Games) => {
	const { epoch, correctWords }: GameData = require(`./${path}/util`)
	const msSinceEpoch = currentDate.setHours(0, 0, 0, 0) - epoch.getTime()

	return correctWords[Math.round(msSinceEpoch / 864e5) % correctWords.length] ?? null
}

export const normalizeWord = (word: string) => word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export function generateTip(word: string, letterCount: LetterCount, path: Games) {
	if (!word) return null
	const { allWords }: GameData = require(`./${path}/util`),
		[...normTargetWord] = normalizeWord(word),
		// Count each letter of the word
		letterCountsTargetWord = normTargetWord.reduce<Record<string, number>>((lc, char) => {
			lc[char] ? lc[char]++ : (lc[char] = 1)
			return lc
		}, {}),
		matchingWords = allWords.filter(testWord => {
			if (testWord === word) return false
			const [...normTestWord] = normalizeWord(testWord),
				// Same thing we did for the target word, but also counting the total number of matches
				result = normTestWord.reduce<{ encountered: Record<string, number>; match: number }>(
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
