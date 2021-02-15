const CLASS_JUMPING: string = 'is--jumping'
const CLASS_SLIDING: string = 'is--sliding'
const CLASS_JUMP_BUFFER: string = 'buffer'
const ID_CHARACTER: string = 'character'
const ID_BLOCK: string = 'block'
const ID_SCORE: string = 'score'
const ID_HIGH_SCORE: string = 'hsc'

const character: any = document.getElementById(ID_CHARACTER)
const block: any = document.getElementById(ID_BLOCK)
const score: any = document.getElementById(ID_SCORE)
const high_score: any = document.getElementById(ID_HIGH_SCORE)

let gamePaused: boolean = true
let gameScore: number = 0
let highScore: any = localStorage.getItem('highscore')
high_score.innerHTML = highScore

let counter: any

interface Position {
  bottom: number
  height: number
  left: number
  right: number
  toJSON?: any
  top: number
  width: number
  x: number
  y: number
}

const character_starter_position: Position = character.getBoundingClientRect()

document.body.onkeyup = (e) => {
  if (e.keyCode == 32) {
    if (gamePaused) {
      startGame()
      startScoreCounter()
    }
    jump()
  }
}

document.addEventListener('touchstart', () => {
  if (gamePaused) {
    startGame()
    startScoreCounter()
  }
  jump()
})

const startGame = () => {
  gamePaused = !gamePaused
  block.classList.add(CLASS_SLIDING)
}

const startScoreCounter = () => {
  counter = setInterval(() => {
    gameScore++
    score.innerText = gameScore
  }, 50)
}

const setHighScore = () => {
  highScore = gameScore
  high_score.innerHTML = highScore
  localStorage.setItem('highscore', highScore)
}

const jump = () => {
  if (!character.classList.contains(CLASS_JUMP_BUFFER)) {
    character.classList.add(CLASS_JUMPING)
    character.classList.add(CLASS_JUMP_BUFFER)

    setTimeout(() => {
      character.classList.remove(CLASS_JUMPING)
      character.classList.remove(CLASS_JUMP_BUFFER)
    }, 500)
  }
}

const checkDead = setInterval(() => {
  const isBlockUnderCharacter: boolean =
    (block.getBoundingClientRect().left >= character_starter_position.left &&
      block.getBoundingClientRect().left <= character_starter_position.right) ||
    (block.getBoundingClientRect().right <= character_starter_position.left &&
      block.getBoundingClientRect().right >= character_starter_position.right)
  const isCharacterJumpingHigh: boolean =
    character_starter_position.bottom -
      character.getBoundingClientRect().bottom >
    20

  if (isBlockUnderCharacter && !isCharacterJumpingHigh) {
    gameOver()
  }
}, 10)

const gameOver = () => {
  clearInterval(counter)
  block.classList.remove(CLASS_SLIDING)
  gamePaused = !gamePaused
  if (gameScore > highScore) {
    setHighScore()
  }
  gameScore = 0
}
