// Implement cards
const cards = document.querySelectorAll('.card')

// Set defalut values

let matched = 0
let firstCard, secondCard
let disableDeck = false

//
function flipCard({ target: clickedCard }) {
	if (firstCard !== clickedCard && !disableDeck) {
		clickedCard.classList.add('flip')
		if (!firstCard) {
			return (firstCard = clickedCard)
		}
		secondCard = clickedCard
		disableDeck = true
		let firstCardImg = firstCard.querySelector('.back-view img').src,
			secondCardImg = secondCard.querySelector('.back-view img').src
		matchCards(firstCardImg, secondCardImg)
	}
}

//A function that checks if two cards are the same. If all 8 cards are matched, the game resets after a second with return shuffleCard, also function

function matchCards(img1, img2) {
	if (img1 === img2) {
		matched++
		if (matched == 8) {
			setTimeout(() => {
				return shuffleCard()
			}, 1000)
		}

		firstCard.removeEventListener('click', flipCard)
		secondCard.removeEventListener('click', flipCard)
		firstCard = secondCard = ''
		return (disableDeck = false)
	}
	// If the cards are different, after the 1s the cards are returned as disableDeck
	setTimeout(() => {
		firstCard.classList.remove('flip')
		secondCard.classList.remove('flip')
		firstCard = secondCard = ''
		disableDeck = false
	}, 1000)
}

// A function that shuffles the cards, changes the values on the defalut and turns all the cards back

function shuffleCard() {
	matched = 0
	disableDeck = false
	firstCard = secondCard = ''
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
	arr.sort(() => (Math.random() > 0.5 ? 1 : -1))
	cards.forEach((card, i) => {
		card.classList.remove('flip')
		let imgTag = card.querySelector('.back-view img')
		imgTag.src = `images/img-${arr[i]}.png`
		card.addEventListener('click', flipCard)
	})
}

shuffleCard()

cards.forEach(card => {
	card.addEventListener('click', flipCard)
})
