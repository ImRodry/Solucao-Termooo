import words from "./palavras.json"

export const doesPreferDark = () => !!window.matchMedia("(prefers-color-scheme: dark)").matches

export const getWordForDate = (currentDate: Date) => {
	// Epoch: 2/1/2022 - January 2nd 2022
	const msSinceEpoch = currentDate.setHours(0, 0, 0, 0) - new Date(2022, 0, 2, 0, 0, 0, 0).getTime()

	return words[Math.round(msSinceEpoch / 864e5) % words.length]
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
