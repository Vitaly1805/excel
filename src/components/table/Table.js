import {ExcelComponent} from "@core/ExcelComponent";
import {TableResize} from "./classes/TableResize";
import {shouldResize, isCell, isSystemKey, isNavigationKey, nextSelector} from './table.functions'
import {createTable} from "./table.template";
import {TableSelection} from "./classes/TableSelection";
import {matrix} from "./table.functions";

export class Table extends ExcelComponent {
  static className = 'table-excel'
  countRow = 50

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    })
  }

  getHTML() {
    return `
      <div class="table-excel__body">
        ${createTable(this.countRow)}
      </div`
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $firstCell = this.$root.querySelector('[data-cell="0:0"]')
    this.selection.select($firstCell)
    this.$subscribe('formula:input', (text) => this.selection.$currentCell.textContent = text)
    this.$subscribe('formula:enter', () => this.onKeydown({key: 'Enter', preventDefault() {}}))
  }

  onMousedown(event) {
    event.preventDefault();

    if (shouldResize(event)) {
      TableResize.start(event, this.$root, 40, 25)
    } else if (isCell(event)) {
      if (event.ctrlKey) {
        this.selection.selectCtrlGroup(event.target)
        this.$emit('table:navigation', event.target.textContent)
      } else if (event.shiftKey) {
        const $cells = matrix(event.target, this.selection.$currentCell)
                          .map(attr => this.$root.querySelector(attr))
        this.selection.selectShiftGroup($cells)
      } else {
        this.selection.select(event.target)
        this.$emit('table:navigation', event.target.textContent)
      }
    }
  }

  onKeydown(event) {
    const {key} = event

    if (isSystemKey(key)) {
      event.preventDefault()

      if (isNavigationKey(key)) {
        const attr = nextSelector(this.selection.$currentCell, key, event.shiftKey)
        const $cell = this.$root.querySelector(attr)

        if ($cell) {
          this.selection.select($cell)
          this.$emit('table:navigation', $cell.textContent)
        }
      }
    } else {
      const text = event.target.textContent
      this.$emit('table:input', text)
    }
  }
}
