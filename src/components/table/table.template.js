const CODES = {
  "A": 65,
  "Z": 90
}

function toChar(code) {
  return String.fromCodePoint(code)
}

function createColumn(value = '') {
  return `
    <div class="table-excel__column" data-col="${value}" data-type="resizable">
      ${value}
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createCell(letter = '', row = 0, col = 0) {
  return `<div class="table-excel__cell" data-type="cell" data-cell="${col}:${row}" data-col="${letter}" contenteditable></div>`
}

function createNumCell(value = '') {
  const resize = value ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="table-excel__num" data-type="resizable">
      ${value}
      ${resize}
    </div>`
}

function createRow(value, isTop = false) {
  let row = '<div class="table-excel__row" data-type="row">'
  const countColumn = CODES.Z - CODES.A
  row = row + createNumCell(value, true)

  for (let i = 0; i <= countColumn; i++) {
    if (isTop) {
      row = row + createColumn(toChar(CODES.A + i))
    } else {
      row = row + createCell(toChar(CODES.A + i), value - 1, i)
    }
  }

  return row + '</div>'
}

export function createTable(countRow = 25) {
  let table = ''

  table = table + createRow('', true)

  for (let i = 1; i < countRow; i++) {
    table = table + createRow(i)
  }

  return table
}
