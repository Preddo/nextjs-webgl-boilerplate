import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
  paused: boolean
  start: number
  current: number
  elapsed: number
  delta: number
  animationFrameId: number

  constructor() {
    super()

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this.animationFrameId = window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick(): void {
    const currentTime = Date.now()

    this.delta = this.paused ? 0 : currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  pause(): void {
    this.paused = true
  }

  play(): void {
    this.paused = false
  }
}
