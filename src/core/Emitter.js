export class Emitter {
  constructor() {
    this.listeners = []
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      return false
    }
    // console.log(event)

    this.listeners[event].forEach(listener => {
      listener(...args)
    })

    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
