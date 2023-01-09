import {ExcelComponent} from "@core/ExcelComponent";
import {Resize} from "./table.resize";
import {shouldResize} from './table.functions'
import {createTable} from "./table.template";

export class Table extends ExcelComponent {
  static className = 'table-excel'
  countRow = 25

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
    if (shouldResize(event)) {
      Resize.start(event, this.$root, 40, 25)
    }
  }
}
