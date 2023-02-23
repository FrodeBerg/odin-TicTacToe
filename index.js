const Gameboard = (() => {
  const gameboard = [];
  const boardSize = 9;

  if (gameboard.length < boardSize) {
    for (let i = 0; i < boardSize; i += 1) {
      gameboard.push("");
    }
  }

  const move = (position, player) => {
    gameboard[position] = player;
  };

  function reset() {
    for (let i = 0; i < boardSize; i += 1) {
      gameboard[i] = "";
    }
  }

  return {
    move,
    gameboard,
    reset,
  };
})();

const player = (name, symbol) => {
  const { gameboard } = Gameboard;

  const move = (position) => {
    if (gameboard[position] === "") {
      Gameboard.move(position, symbol);
      const buttons = document.getElementById("buttons");
      // Takes text child nodes into account
      buttons.childNodes[position * 2 + 1].innerHTML = symbol;
    }
  };

  const isPlayerTurn = () => {
    let x = 0;
    let o = 0;
    for (let i = 0; i < gameboard.length; i += 1) {
      if (gameboard[i] === "x") x += 1;
      if (gameboard[i] === "o") o += 1;
    }
    return x > o ? symbol === "o" : symbol === "x";
  };

  return {
    symbol,
    name,
    gameboard,
    move,
    isPlayerTurn,
  };
};

const displayController = (() => {
  const players = [];

  function currentPlayer() {
    for (let i = 0; i < players.length; i += 1) {
      if (players[i].isPlayerTurn()) return players[i];
    }
    return players[0];
  }

  function checkEnd() {
    const { gameboard } = players[0];
    // Check rows
    for (let i = 0; i < 3; i += 1) {
      const index = i * 3 + 1;
      const variable = gameboard[index];
      if (
        variable === gameboard[index + 1] &&
        variable === gameboard[index - 1]
      )
        return variable;
    }
    // Check columns
    for (let i = 0; i < 3; i += 1) {
      const index = 3 + i;
      const variable = gameboard[index];
      if (
        variable === gameboard[index + 3] &&
        variable === gameboard[index - 3]
      )
        return variable;
    }
    // Check diagonals
    const variable = gameboard[4];
    if (variable === gameboard[0] && variable === gameboard[8]) return variable;
    if (variable === gameboard[2] && variable === gameboard[6]) return variable;

    for (let i = 0; i < gameboard.length; i += 1) {
      if (gameboard[i] === "") return false;
    }
    return "It's a tie!";
  }

  function updateDisplay() {
    let end = checkEnd();
    if (end) {
      if (end !== "It's a tie!") {
        end = `${end} Wins`;
      }
      document.getElementById("endMessage").innerHTML = end;
    }
    const current = document.getElementById("currentPlayer");
    current.innerHTML = `Current player is: ${currentPlayer().name} (${
      currentPlayer().symbol
    })`;
  }

  function addPlayer() {
    const symbol = players.length ? "o" : "x";
    const playerInput = document.getElementById("playerInput");
    const name = playerInput.value;
    playerInput.value = "";
    players.push(player(name, symbol));

    if (players.length === 2) {
      const initialInput = document.getElementById("initialInput");
      initialInput.style.display = "none";

      const board = document.getElementById("board");
      board.style.display = "block";

      updateDisplay();
    }
  }

  function buttonPress(element) {
    const position = Array.from(element.parentNode.children).indexOf(element);
    currentPlayer().move(position);
    updateDisplay();
  }

  return {
    buttonPress,
    addPlayer,
  };
})();

// eslint-disable-next-line no-unused-vars
const controller = displayController;
