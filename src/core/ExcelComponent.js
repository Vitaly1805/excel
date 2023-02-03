import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter

    this.prepare()
  }

  prepare() {}

  getHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $subscribe(event, fn) {
    if (Array.isArray(event)) {
      return event.map(e => this.emitter.subscribe(e, fn))
    } else {
      return this.emitter.subscribe(event, fn)
    }
  }

  init() {
    this.initDomListeners()
  }
}
