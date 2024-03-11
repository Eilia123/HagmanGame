//Class
//every thing about HTML
class HtmlUI {
  //creat keyboard
  creatBoard() {
    let letterSelect;
    for (let i = 97; i <= 122; i++) {
      const buttom = document.createElement("button");
      buttom.innerHTML = String.fromCharCode(i);
      buttom.value = String.fromCharCode(i);
      buttom.classList.add("btn");
      keyboardDiv.appendChild(buttom);
      //when click every buttom
      buttom.addEventListener("click", (e) => {
        letterSelect = e.target.value
        this.checkValue(e.target, letterSelect)
      });
    }
  }
  //show Hint and Word lenth
  showHintWord() {
    const obj = insert.randomWord();
    const randomWord = obj.word,
      randomHint = obj.hint;
    currentWord = randomWord;
    wordDisplay.innerHTML = randomWord
      .split("")
      .map(() => `<li class="letter"></li>`)
      .join("");
    hintText.innerHTML = randomHint;
    return randomWord;
  }
  ///check select letter of word
  checkValue(buttom, letterclick) {
    new Audio("./music/selectBtn.mp3").play()
    //if select letter = word
    if (currentWord.includes(letterclick)) {
      currentWord.split("").forEach((letter, index) => {
        if (letter === letterclick) {
          wordDisplay.querySelectorAll("li")[index].innerHTML = letter
          wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
          wordLenth.push(letter)
        }
      })
      //when you win
      if (currentWord.length == wordLenth.length) {
        setTimeout(() => {
          this.wingame()
        }, 500);
      }
    }
    //when you lost
    else {
      document.querySelector(".hagman-box img").src = `./images/hangman-${index}.svg`
      index++
      if (index === 7) {
        setTimeout(() => {
          this.lostGame()
        }, 500);
      }
    }
    buttom.disabled = true
  }
  //when hagman is dead
  lostGame() {
    new Audio("./music/lostMusic.mp3").play()
    wordLenth = []
    document.getElementById("game-modal").style.display = "flex"
    document.querySelector("#game-modal .content h4").innerText = "you Lost !"
    document.querySelector("#game-modal .content p b").innerText = currentWord
    document.querySelector("#game-modal .content img").src = "./images/lost.gif"
  }
  //when player win game
  wingame() {
    new Audio("./music/winMusic.mp3").play()
    wordLenth = []
    document.getElementById("game-modal").style.display = "flex"
    document.querySelector("#game-modal .content p b").innerText = currentWord
    document.querySelector("#game-modal .content h4").innerText = "you Win !"
    document.querySelector("#game-modal .content img").src = "./images/victory.gif"

  }
}

class Insert {
  //creat random word and random hint
  randomWord() {
    const randomString = Math.floor(Math.random() * wordList.length),
      randomWord = wordList[randomString];
    return randomWord;
  }
}

//Variable
let html = new HtmlUI();
let insert = new Insert();
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint-text");
let wordLenth = []
let index = 1
let currentWord;
//eventlistener
eventListener();

function eventListener() {
  //when relod site
  document.addEventListener("DOMContentLoaded", () => {
    html.creatBoard();
    html.showHintWord();
  });
  //when click btn for play again
  document.querySelector(".play-again").addEventListener("click", () => {
    keyboardDiv.innerHTML = ""
    html.showHintWord()
    html.creatBoard()
    document.getElementById("game-modal").style.display = "none"
    index = 1
    document.querySelector(".hagman-box img").src = `./images/hangman-0.svg`
  })
}