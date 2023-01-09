import {ExcelComponent} from "@core/ExcelComponent";
import {setStyles} from "../../core/utils";
import {createTable} from "./table.template";

export class Table extends ExcelComponent {
  static className = 'table-excel'
  countRow = 25
  minCellWidth = 40
  minCellHeight = 25

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"]
    })
  }

  getHTML() {
    return `
      <div class="table-excel__body">
        ${createTable(this.countRow)}
      </div`
  }

  onMousedown(event) {
    const $resizer = event.target
    const dataset = $resizer.dataset

    if (dataset.resize) {
      const $resizableElem = $resizer.closest('[data-type="resizable"]')
      const typeResize = dataset.resize
      $resizer.classList.add('_active')

      document.onmousemove = e => this.onMousemove.apply(this, [e, $resizer, $resizableElem, typeResize])
      document.onmouseup = () => this.onMouseup.apply(this, [$resizer, $resizableElem, typeResize])
    }
  }

  onMousemove(e, $resizer, $resizableElem, typeResize) {
    const coords = $resizableElem.getBoundingClientRect()

    if (typeResize === 'col') {
      const width = e.clientX - coords.x
      this.setColWidth(width)
    } else if (typeResize === 'row') {
      const height = e.clientY - $resizableElem.offsetTop
      this.setRowHeight(height)
    }

    this.setResizeCoords($resizer, e, coords, typeResize)
  }

  onMouseup($resizer, $resizableElem, typeResize) {
    $resizer.classList.remove('_active')
    document.onmousemove = null
    document.onmouseup = null

    if (typeResize === 'col') {
      this.addWidthCells($resizableElem)
      setStyles($resizer, {'right': '0px'})
    } else {
      setStyles($resizableElem, {'height': `${this.height}px`})
      setStyles($resizer, {'bottom': '0px'})
    }
  }

  setColWidth(width) {
    if (width >= this.minCellWidth) {
      this.width = width
    } else {
      this.width = this.minCellWidth
    }
  }

  setRowHeight(height) {
    if (height >= this.minCellHeight) {
      this.height = height
    } else {
      this.height = this.minCellHeight
    }
  }

  addWidthCells($resizableElem) {
    const letter = $resizableElem.dataset.col
    const $cells = this.$root.querySelectorAll(`[data-col="${letter}"]`)

    $cells.forEach($elem => {
      setStyles($elem, {'width': `${this.width}px`})
    })
  }

  setResizeCoords($resizer, event, coords, typeResize) {
    if (typeResize === 'col') {
      if (this.width > this.minCellWidth) {
        const resizePadding = coords.right - event.clientX
        setStyles($resizer, {'right': `${resizePadding}px`})
      }
    } else {
      if (this.height > this.minCellHeight) {
        const resizePadding = coords.bottom - event.clientY
        setStyles($resizer, {'bottom': `${resizePadding}px`})
      }
    }
  }
}
