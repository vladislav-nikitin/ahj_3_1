import Board from './Board';
import Character from './Character';
import Game from './Game';

const board = new Board();
const char = new Character();
const game = new Game(board, char);

game.init();
