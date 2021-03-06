// Copyright 2017 John hurst
// John Hurst (john.b.hurst@gmail.com)
// 2017-12-16

// This version uses ES6's filter(), map() & reduce() and higher-order functions to count solutions more elegantly.
// But, this version runs about 20 times slower than queens.js with a plain old for-loop and regular functions.

function new_board(size) {
  return {
    size: size,
    row: 0,
    cols: 0,
    diags1: 0,
    diags2: 0,
  }
}

function ok(board, col) {
  return (board.cols & (1 << col)) == 0 &&
    (board.diags1 & (1 << board.row + col)) == 0 &&
    (board.diags2 & (1 << board.row - col + board.size - 1)) == 0
}

function place(board, col) {
  return {
    size: board.size,
    row: board.row + 1,
    cols: board.cols | 1 << col,
    diags1: board.diags1 | 1 << (board.row + col),
    diags2: board.diags2 | 1 << (board.row - col + board.size - 1)
  }
}

function solve_board(board) {
  return board.row == board.size ? 1 :
    Array.from(Array(board.size).keys())
      .filter(col => ok(board, col))
      .map(col => solve_board(place(board, col)))
      .reduce((v1, v2) => v1 + v2, 0)
}

var start = Number.parseInt(process.argv[2])
var end = process.argv.length > 3 ?
  Number.parseInt(process.argv[3]) : start

for (var size = start; size <= end; size++) {
  var t = process.hrtime();
  var result = solve_board(new_board(size))
  t = process.hrtime(t);
  var seconds = t[0] + t[1] / 1000000000.0;
  console.log("%d,%d,%f", size, result, seconds.toFixed(3));
}
