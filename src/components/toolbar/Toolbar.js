import {ExcelComponent} from "@core/ExcelComponent";

export class Toolbar extends ExcelComponent {
  static className = 'toolbar-excel'

  getHTML() {
    return `
      <div class="toolbar-excel__body">
        <div class="toolbar-excel__list">
          <span class="material-symbols-outlined">
            format_align_left
          </span>
          <span class="material-symbols-outlined">
            format_align_center
          </span>
          <span class="material-symbols-outlined">
            format_align_right
          </span>
          <span class="material-symbols-outlined">
            format_bold
          </span>
          <span class="material-symbols-outlined">
            format_italic
          </span>
          <span class="material-symbols-outlined">
            format_underlined
          </span>
        </div>
      </div>`
  }

  onInput() {}
}
