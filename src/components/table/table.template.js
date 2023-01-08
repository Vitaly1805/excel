const CODES = {
  "A": 65,
  "Z": 90
}

function toChar(code) {
  return String.fromCodePoint(code)
}

function createCell(value = '') {
  let cell = '<div class="table-excel__cell table-excel__column"'

  if (!value) {
    cell = cell + " contenteditable"
  }

  return cell + `>${value}</div>`
}

function createFirstCell(value = '') {
  return `<div class="table-excel__cell table-excel__num">${value}</div>`
}

function createRow(value, isTop = false) {
  let row = '<div class="table-excel__row">'
  const countColumn = CODES.Z - CODES.A

  row = row + createFirstCell(value, true)

  for (let i = 0; i <= countColumn; i++) {
    row = row + createCell(isTop ? toChar(CODES.A + i) : '')
  }

  return row + '</div>'
}

export function createTable(countRow = 50) {
  let table = ''

  table = table + createRow(' ', true)

  for (let i = 1; i <= countRow; i++) {
    table = table + createRow(i)
  }

  return table
}

//           <div class="table-excel__row table-excel__row_top">
//             <div class="table-excel__cell table-excel__num"></div>
//               <div class="table-excel__cell table-excel__column_selected table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column table-excel__column_active">
//                 B
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 C
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 B
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 B
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 C
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 B
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 B
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 C
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 B
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 B
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 C
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 A
//               </div>
//               <div class="table-excel__cell table-excel__column">
//                 B
//               </div>
//             </div>
//             <div class="table-excel__row">
//               <div class="table-excel__cell table-excel__num table-excel__num_selected">
//                 1
//               </div>
//               <div class="table-excel__cell">
//                 A1
//               </div>
//               <div class="table-excel__cell">
//                 B1
//               </div>
//               <div class="table-excel__cell">
//                 C1
//               </div>
//             </div>
//             <div class="table-excel__row">
//               <div class="table-excel__cell table-excel__num table-excel__num_active">
//                 2
//               </div>
//               <div class="table-excel__cell">
//                 A2
//               </div>
//               <div class="table-excel__cell table-excel__cell_selected">
//                 B2
//               </div>
//               <div class="table-excel__cell">
//                 C2
//               </div>
//             </div>
