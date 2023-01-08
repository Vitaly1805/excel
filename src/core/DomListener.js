import {capitalize} from "./utils"

export class DomListener {
  constructor($root, lesteners = []) {
    if (!$root) {
      throw Error('No $root provided for DomListener')
    }

    this.$root = $root
    this.listeners = lesteners
  }

  initDomListeners() {
    this.listeners.forEach(event => {
      const methodName = this.getMethodName(event)

      if (!this[methodName]) {
        throw new Error(`Method ${methodName} is not found in ${this.name} component`)
      }

      this[methodName] = this[methodName].bind(this)
      this.$root.addEventListener(event, this[methodName])
    })
  }

  getMethodName(string) {
    return 'on' + capitalize(string)
  }
}
