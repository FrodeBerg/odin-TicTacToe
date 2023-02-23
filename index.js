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
  const move = (position) => Gameboard.move(position, symbol);

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

  function addPlayer(name, symbol) {
    players.push(player(name, symbol));
  }

  function currentPlayer() {
    for (let i = 0; i < players.length; i += 1) {
      if (players[i].isPlayerTurn()) return players[i];
    }
    return players[0];
  }

  return {
    players,
    currentPlayer,
    addPlayer,
  };
})();

const controller = displayController;
controller.addPlayer("frode", "x");
controller.addPlayer("wil", "o");
console.log(controller.currentPlayer())
controller.currentPlayer().move(5);
controller.currentPlayer().move(7);
controller.currentPlayer().move(3);

console.log(controller.currentPlayer())