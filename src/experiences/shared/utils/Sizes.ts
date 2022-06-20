import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
  width: number
  height: number
  pixelRatio: number

  constructor(container: HTMLElement) {
    super()

    // Setup
    this.width = container.clientWidth
    this.height = container.clientHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Resize event
    window.addEventListener('resize', () => {
      const c = document.querySelector(`.${container.className}`)

      this.width = c.clientWidth
      this.height = c.clientHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.trigger('resize')
    })
  }
}
