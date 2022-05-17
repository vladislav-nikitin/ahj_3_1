// Попробуйте реализовать всё не в виде единого скрипта, а разбив приложение на классы,
// каждый из которых ответственен за опредённую логику

// класс, отвечающий за логику игры

export default class Game {
  constructor(board, char) {
    this.board = board;
    this.char = char;
    this.boardSize = 4;
    this.startPosition = null;
    this.boardListeners = [];
  }

  init() {
    this.getBoard();
    this.board.addEventListener('click', this.onBoardClick.bind(this));
    this.start();
  }

  start() {
    setInterval(() => {
      this.generateposition();
    }, 1000);
  }

  // Гоблин появляется в рандомной точке
  generateposition() {
    let position = Math.floor(Math.random() * this.boardSize ** 2);
    if (position === this.startPosition) {
      position = Math.floor(Math.random() * this.boardSize ** 2);
      return;
    }
    this.deleteCharacter();
    this.position = position;
    this.getCharacter();
  }

  getCharacter() {
    this.startPosition = this.char.createCharacter();
    this.cells[this.position].appendChild(this.startPosition);
  }

  // очищает клетку от персонажа, чтобы картинки в клетке не умножались
  deleteCharacter() {
    if (this.startPosition === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
  }

  getBoard() {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');

    this.board = this.board.createBoard(this.boardSize);
    this.counter = this.gameInformation();
    this.cells = [...this.board.children];

    wrapper.classList.add('wrapper');
    wrapper.innerHTML = "<h1 class='title'>Whack Goblin!</h1>";

    wrapper.appendChild(this.counter);
    wrapper.appendChild(this.board);
    body.insertBefore(wrapper, body.firstChild);
  }

  // блок с информацией о статусе игры
  gameInformation() {
    this.counter = document.createElement('div');
    this.counter.classList.add('information');
    this.counter.innerHTML = 'Убито гоблинов: <span class="killed">0</span><br>Промахов: <span class="missed">0</span><br>';
    return this.counter;
  }

  // если пользователь успел за 1 секунду кликнуть по гоблину то:
  // 1) пользователю засчитывается +1 балл
  // 2) гоблин пропадает из ячейки

  onBoardClick(event) {
    event.preventDefault();
    this.killed = document.querySelector('.killed');
    this.missed = document.querySelector('.missed');
    this.boardListeners.forEach((callback) => callback(event.target));
    /* eslint-disable */
    if (event.target.classList.contains("goblin")) {
      ++this.killed.textContent;
      event.target.classList.remove("goblin");
    } else {
      ++this.missed.textContent;
    }

    if (this.killed.textContent >= 10) {
      this.resetScore();
      alert("Поздравляем! Вы одержали победу!");
    }

    if (this.missed.textContent >= 5) {
      this.resetScore();
      alert("К сожалению вы проиграли...");
    }
  }

  resetScore() {
    this.missed.textContent = 0;
    this.killed.textContent = 0;
  }
}
