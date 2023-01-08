import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'formula-excel'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    })

    this.count = 0
  }

  getHTML() {
    return `
      <div class="excel__formula formula-excel">
        <div class="formula-excel__body">
          <div class="formula-excel__info">
            fx
          </div>
          <div contenteditable="" class="formula-excel__input"></div>
        </div>
      </div>`
  }

  onInput(event) {
    this.count++

    if (this.count > 5) {
      console.log('qw')
      this.$root.removeEventListener('input', this.onInput)
    } else {
      console.log(this.count)
    }
    // console.log(this.$root)
    // console.log(event.target.innerText)
  }
}
