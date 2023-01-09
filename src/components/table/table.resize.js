import {setStyles} from '@core/utils.js'

export class Resize {
  static start(event, $root, minCellWidth, minCellHeight) {
    this.$root = $root
    this.minCellWidth = minCellWidth
    this.minCellHeight = minCellHeight
    this.$resizer = event.target
    this.$resizableElem = this.$resizer.closest('[data-type="resizable"]')
    this.typeResize = this.$resizer.dataset.resize

    this.setResizerStyle()

    document.onmousemove = e => this.onMousemove.apply(this, [e])
    document.onmouseup = () => this.onMouseup.apply(this)
  }

  static onMousemove(e) {
    const coords = this.$resizableElem.getBoundingClientRect()

    if (this.typeResize === 'col') {
      const width = e.clientX - coords.x
      this.setColWidth(width)
    } else if (this.typeResize === 'row') {
      const height = e.clientY - this.$resizableElem.offsetTop
      this.setRowHeight(height)
    }

    this.setResizerCoords(e, coords)
  }

  static onMouseup() {
    document.onmousemove = null
    document.onmouseup = null

    if (this.typeResize === 'col') {
      this.addWidthCells(this.$resizableElem)
    } else {
      setStyles(this.$resizableElem, {'height': `${this.height}px`})
    }

    this.removeResizerStyle()
  }

  static setColWidth(width) {
    if (width >= this.minCellWidth) {
      this.width = width
    } else {
      this.width = this.minCellWidth
    }
  }

  static setRowHeight(height) {
    if (height >= this.minCellHeight) {
      this.height = height
    } else {
      this.height = this.minCellHeight
    }
  }

  static addWidthCells() {
    const letter = this.$resizableElem.dataset.col
    const $cells = this.$root.querySelectorAll(`[data-col="${letter}"]`)

    $cells.forEach($elem => {
      setStyles($elem, {'width': `${this.width}px`})
    })
  }

  static setResizerCoords(event, coords) {
    if (this.typeResize === 'col') {
      if (this.width > this.minCellWidth) {
        setStyles(this.$resizer, {'right': `${coords.right - event.clientX}px`})
      }
    } else {
      if (this.height > this.minCellHeight) {
        setStyles(this.$resizer, {'bottom': `${coords.bottom - event.clientY}px`})
      }
    }
  }

  static setResizerStyle() {
    const sideProp = this.typeResize === 'col' ? 'bottom' : 'right'
    const cursor = this.typeResize === 'col' ? 'col-resize' : 'row-resize'

    setStyles(this.$resizer, {
      "opacity": 1,
      [sideProp]: "-10000px",
      "cursor": cursor
    })
  }

  static removeResizerStyle() {
    setStyles(this.$resizer, {
      'opacity': '0',
      'right': '0',
      'bottom': '0',
    })
    setStyles(document.body, {
      'cursor': 'auto'
    })
  }
}
