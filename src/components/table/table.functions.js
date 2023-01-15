import {range} from '@core/utils.js'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function isSystemKey(key) {
  const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Tab', 'Enter']
  return keys.includes(key)
}

export function isNavigationKey(key) {
  const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Tab', 'Enter']
  return keys.includes(key)
}

export function nextSelector($currentCell, key, isShift = false) {
  let {col, row} = getCoords($currentCell.dataset.cell)

  switch (key) {
    case 'ArrowDown':
      row++
      break;
    case 'ArrowUp':
      row--
      break;
    case 'ArrowLeft':
      col--
      break;
    case 'ArrowRight':
    case 'Tab':
      col++
      break;
    case 'Enter':
      isShift ? row-- : row++
      break;
  }

  return `[data-cell="${col}:${row}"]`
}

export function matrix($elem, $currentElem) {
  const elem = getCoords($elem.dataset.cell)
  const currentElem = getCoords($currentElem.dataset.cell)
  const cols = range(elem.col, currentElem.col)
  const rows = range(elem.row, currentElem.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => {
      acc.push(`[data-cell="${col}:${row}"]`)
    })
    return acc
  }, [])
}

function getCoords(attr) {
  const coords = attr.split(':')

  return {
    col: +coords[0],
    row: +coords[1]
  }
}
