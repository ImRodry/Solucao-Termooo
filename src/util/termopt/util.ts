import allWords from "./palavras.json"
import correctWordsRaw from "./palavrasCertas.json"

const correctWords = shuffle(correctWordsRaw, 1.31337)

export { allWords, correctWords }

// Epoch: 13/1/2022 - January 13th 2022
export const epoch = new Date(2022, 0, 13, 0, 0, 0, 0)

function shuffle(array: string[], seed: number) {
	let length = array.length,
		word,
		newIndex
	while (length) {
		newIndex = Math.floor(random(seed) * length--)
		word = array[length]
		array[length] = array[newIndex]
		array[newIndex] = word
		++seed
	}
	return array
}

function random(seed: number) {
	var x = Math.sin(seed++) * 10000
	return x - Math.floor(x)
}
