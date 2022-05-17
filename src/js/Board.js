// Попробуйте реализовать всё не в виде единого скрипта, а разбив приложение на классы,
// каждый из которых ответственен за опредённую логику

// класс, отвечающий за создание игрового поля

export default class Board {
  constructor() {
    this.board = null;
  }

  createBoard(number) {
    const board = document.createElement('div');
    board.classList.add('board');
    board.classList.add('hammer');

    for (let i = 0; i < Math.floor(number) ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }
    this.board = board;
    return this.board;
  }
}
