const app = {
  init: function() {
    const self = this;
    this.players = ['x', 'o'];
    this.currentPlayer = 0;
    this.board = new Board();
    this._resetBtn = $('.app__reset-btn');
    this._resetBtn.click(function () {
      self.board.clear();
      self.currentPlayer = 0;
    });
  },
  switchPlayer: function () {
    this.currentPlayer = this.currentPlayer == 0 ? 1: 0;
  },
  markWithCurrentPlayer: function () {
    const result = this.players[this.currentPlayer];
    this.switchPlayer();
    return result;
  }
};

class Board {
  constructor() {
    this.cells = $('.board__row-cell');
    this._init();
  }
  _init() {
    const self = this;
    this.board = new Array(3);

    for(let i = 0; i < 3; i++) {
      this.board[i] = new Array(3);
    }

    this.cells.each(function () {
      const cell = new Cell($(this));
      const pos = cell.getPosition();
      self.board[pos[0]][pos[1]] = cell;
    });

  }
  clear() {
    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j].unmark();
      }
    }
  }
}

class Cell {
  constructor(el) {
    this.el = el;
    // marked states null, x, o
    this.marked = null;
    this._init();
  }
  _init() {
    const self = this;
    this.el.click(function () {
      self._mark();
    });
  }
  _mark() {
    if(this.marked == null) {
      const currentPlayer = app.markWithCurrentPlayer();
      this.el.addClass('board__row-cell--marked-' + currentPlayer);
      this.marked = currentPlayer;
    }
  }
  unmark() {
    this.el.removeClass('board__row-cell--marked-x');
    this.el.removeClass('board__row-cell--marked-o');
    this.marked = null;
  }
  getPosition() {
    return this.el.data('pos');
  }
}

app.init();
