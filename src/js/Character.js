// класс, отвечающий за создание персонажа

export default class Character {
  constructor() {
    this.char = null;
  }

  createCharacter() {
    const char = document.createElement('div');
    char.classList.add('goblin');
    this.char = char;
    return this.char;
  }
}
