import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }

  getHTML() {
    return 'ww'
  }

  // init() {
  //   this.initDomListeners()
  // }
}
