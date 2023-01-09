// import {setStyles} from '@core/utils.js'

// const minCellWidth = 40
// const minCellHeight = 25
// let currentWidth
// let currentHeight
// let $root

// export function resizeHandler(event, $elem) {
//   $root = $elem
//   const $resizer = event.target
//   const dataset = $resizer.dataset
//   const $resizableElem = $resizer.closest('[data-type="resizable"]')
//   const typeResize = dataset.resize

//   $resizer.classList.add('_active')

//   document.onmousemove = e => onMousemove.apply({}, [e, $resizer, $resizableElem, typeResize])
//   document.onmouseup = () => onMouseup.apply({}, [$resizer, $resizableElem, typeResize])
// }

// function onMousemove(e, $resizer, $resizableElem, typeResize) {
//   const coords = $resizableElem.getBoundingClientRect()

//   if (typeResize === 'col') {
//     const width = e.clientX - coords.x
//     setColWidth(width)
//   } else if (typeResize === 'row') {
//     const height = e.clientY - $resizableElem.offsetTop
//     setRowHeight(height)
//   }

//   setResizeCoords($resizer, e, coords, typeResize)
// }

// function onMouseup($resizer, $resizableElem, typeResize) {
//   $resizer.classList.remove('_active')
//   document.onmousemove = null
//   document.onmouseup = null

//   if (typeResize === 'col') {
//     addWidthCells($resizableElem)
//     setStyles($resizer, {'right': '0px'})
//   } else {
//     setStyles($resizableElem, {'height': `${currentHeight}px`})
//     setStyles($resizer, {'bottom': '0px'})
//   }
// }

// function setColWidth(width) {
//   if (width >= minCellWidth) {
//     currentWidth = width
//   } else {
//     currentWidth = minCellWidth
//   }
// }

// function setRowHeight(height) {
//   if (height >= minCellHeight) {
//     currentHeight = height
//   } else {
//     currentHeight = minCellHeight
//   }
// }

// function addWidthCells($resizableElem) {
//   const letter = $resizableElem.dataset.col
//   const $cells = $root.querySelectorAll(`[data-col="${letter}"]`)

//   $cells.forEach($elem => {
//     setStyles($elem, {'width': `${currentWidth}}px`})
//   })
// }

// function setResizeCoords($resizer, event, coords, typeResize) {
//   if (typeResize === 'col') {
//     if (currentWidth > minCellWidth) {
//       const resizePadding = coords.right - event.clientX
//       setStyles($resizer, {'right': `${resizePadding}px`})
//     }
//   } else {
//     if (currentHeight > minCellHeight) {
//       const resizePadding = coords.bottom - event.clientY
//       setStyles($resizer, {'bottom': `${resizePadding}px`})
//     }
//   }
// }
