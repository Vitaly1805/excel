import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'formula-excel'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  getHTML() {
    return `
      <div class="excel__formula formula-excel">
        <div class="formula-excel__body">
          <div class="formula-excel__info">
            fx
          </div>
          <div contenteditable="" data-formula="input" class="formula-excel__input"></div>
        </div>
      </div>`
  }

  init() {
    super.init()
    this.input = this.$root.querySelector('[data-formula="input"]')
    this.$subscribe(['table:input', 'table:navigation'], (text) => this.input.textContent = text)
  }

  onInput() {
    const text = this.input.textContent
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.$emit('formula:enter')
    }
  }
}
