export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.Components = options.components || []
  }

  render() {
    this.components = this.Components.map(Component => {
      const $root = document.createElement('div')
      $root.classList.add(Component.className)

      const component = new Component($root)
      $root.innerHTML = component.getHTML()
      this.$el.append($root)

      return component
    })

    this.components.forEach(component => {
      component.initDomListeners()
    });
  }
}
