import {Emitter} from "@core/Emitter";

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.Components = options.components || []
    this.emitter = new Emitter()
  }

  render() {
    this.components = this.Components.map(Component => {
      const $root = document.createElement('div')
      $root.classList.add(Component.className)

      const componentOptions = {
        emitter: this.emitter
      }

      const component = new Component($root, componentOptions)
      $root.innerHTML = component.getHTML()
      this.$el.append($root)

      return component
    })

    this.components.forEach(component => {
      component.init()
    });
  }
}
