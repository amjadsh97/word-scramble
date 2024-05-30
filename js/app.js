document.addEventListener("DOMContentLoaded", () => {
	const randomButton = document.getElementById("random_button");
	const resetButton = document.getElementById("reset_button");
	const wordElement = document.querySelector(".word");
	const guessedWordElement = document.querySelector(".guessed-word");
	const triesRange = document.querySelector(".tries-range")
	const mistakesRange = document.querySelector(".mistakes-range");
	const bullets = document.querySelectorAll(".bullets > .bullet-item");
	const winnerMessage = document.getElementById('winner-message');
	const closeWinnerMessageButton = document.getElementById('close-winner-message');

	const suggestedWords = ["apple", "choose", "car", "cart", "banana"];
	const MAX_NUMBER_OF_TRIES_AND_MISTAKES = 5;
	let currentIndex = 0;
	let guessedWord = getRandomWord();
	let shuffledWord = shuffleWord(guessedWord);
	let letterElements;
	let userTries = [];
	let userMistakes = [];

	guessedWordElement.innerHTML = shuffledWord;
	createSquares(guessedWord.length);

	document.addEventListener('keydown', handleKeyPress);
	randomButton.addEventListener("click", handleRandomButtonClick);
	resetButton.addEventListener("click", handleResetButtonClick);
	closeWinnerMessageButton.addEventListener('click', () => {
		winnerMessage.classList.remove('winner-active');
		handleRandomButtonClick()
	});

	function handleKeyPress(event) {
		const key = event.key.toLowerCase();
		if (key.length === 1 && key.match(/[a-zA-Z]/)) {
			
			if (key === guessedWord[currentIndex]) {
				letterElements[currentIndex].innerText = key;
				currentIndex++;
				updateActiveLetter(currentIndex);
				if (currentIndex === guessedWord.length) {
					showWinnerMessage();
				}
			} else {
				userTries.push(key);
				userMistakes.push(key);
			}
			if (userMistakes.length > MAX_NUMBER_OF_TRIES_AND_MISTAKES || userTries.length > MAX_NUMBER_OF_TRIES_AND_MISTAKES) {
				handleResetButtonClick();
			}
			
			updateTriesAndMistakes()
		}
	}

	function showWinnerMessage() {winnerMessage.classList.add('winner-active', 'animate__animated', 'animate__bounceIn');}

	function handleRandomButtonClick() {
		guessedWord = getRandomWord();
		shuffledWord = shuffleWord(guessedWord);
		guessedWordElement.innerHTML = shuffledWord;
		createSquares(guessedWord.length);
		currentIndex = 0;
		letterElements = document.querySelectorAll(".letter");
		updateActiveLetter(currentIndex);
	}

	function handleResetButtonClick() {
		currentIndex = 0;
		letterElements.forEach(letter => letter.innerText = '');
		updateActiveLetter(currentIndex);
		userMistakes = [];
		userTries = [];
		updateTriesAndMistakes()
	}

	function updateActiveLetter(index) {
		letterElements.forEach((letter, i) => {
			letter.classList.toggle("active", i === index);
			if (i === index && !letter.innerHTML) {
				letter.innerHTML = '_';
			}
		});
	}
	
	function updateTriesAndMistakes() {
		triesRange.innerHTML = `<span>(${userTries.length}/5): </span>`;
		mistakesRange.innerHTML = `<span>${userMistakes.join(', ')}</span>`;
		bullets.forEach(bullet => bullet.classList.remove('bullet-active'));
		for (let i = 0; i < userTries.length; i++) {
			bullets[i]?.classList.add('bullet-active');
		}
	}

	function removePrevSquares() {
		wordElement.innerHTML = '';
	}

	function createSquares(num) {
		removePrevSquares();
		for (let i = 0; i < num; i++) {
			const newLetter = document.createElement("span");
			newLetter.classList.add("letter");
			wordElement.appendChild(newLetter);
		}
		letterElements = document.querySelectorAll(".letter");
		updateActiveLetter(currentIndex);
	}

	function getRandomWord() {
		return suggestedWords[Math.floor(Math.random() * suggestedWords.length)];
	}

	function shuffleWord(word) {
		return word.split('').sort(() => 0.5 - Math.random()).join('');
	}
});