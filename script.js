let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#rst");
let Newgame = document.querySelector(".newbtn");
let msg_Container = document.querySelector(".msgcontainer");
let msg = document.querySelector(".msg");
let moveSound = document.querySelector("#moveSound");
let winSound = document.querySelector("#winSound");
let oScoreEl = document.querySelector("#oScore");
let xScoreEl = document.querySelector("#xScore");

let oScore = 0;
let xScore = 0;

let player0 = true;

const winningpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, The winner is ${winner}`;
  msg_Container.classList.remove("hide");
  winSound.play();
  disableBoxes();

  if (winner === "O") {
    oScore++;
    oScoreEl.innerText = oScore;
  } else if (winner === "X") {
    xScore++;
    xScoreEl.innerText = xScore;
  }
};

const checkWinner = () => {
  for (let pattern of winningpattern) {
    let first = boxes[pattern[0]].innerText;
    let second = boxes[pattern[1]].innerText;
    let third = boxes[pattern[2]].innerText;

    if (first !== "" && first === second && second === third) {
      showWinner(first);
      return true;
    }
  }

  let allFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (allFilled) {
    msg.innerText = "It's a Draw!";
    msg_Container.classList.remove("hide");
    return true;
  }

  return false;
};

const aiMove = () => {
  let emptyBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (emptyBoxes.length === 0) return;

  let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.innerText = "X";
  randomBox.disabled = true;
  moveSound.play();
  player0 = true;
  checkWinner();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && player0) {
      box.innerText = "O";
      box.disabled = true;
      moveSound.play();
      player0 = false;
      if (!checkWinner()) {
        setTimeout(aiMove, 500);
      }
    }
  });
});

const resetGame = () => {
  player0 = true;
  enableBoxes();
  msg_Container.classList.add("hide");
};

reset.addEventListener("click", resetGame);
Newgame.addEventListener("click", resetGame);
