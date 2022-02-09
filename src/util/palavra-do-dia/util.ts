import allWords from "./palavras.json"
import correctWordsRaw from "./palavrasCertas.json"

const correctWords = shuffle(correctWordsRaw, 1.31337)

export { allWords, correctWords }

// Epoch: 13/1/2022 - January 13th 2022
export const epoch = new Date(2022, 0, 13, 0, 0, 0, 0)

export function shuffle(array: string[], seed: number) {
	var length = array.length,
		word: string,
		index = 0
	while (length) {
		index = Math.floor(random(seed) * length--)
		word = array[length]
		array[length] = array[index]
		array[index] = word
		++seed
	}
	return array
}

export function random(seed: number) {
	var x = Math.sin(seed++) * 10_000
	return x - Math.floor(x)
}
