import Experience from 'experiences/shared/core/Experience'

import sources from './sources'
import World from './World/World'

export default class Storie extends Experience {
  world: World

  constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
    super(canvas, container, sources)

    this.world = new World(this)
  }

  update(): void {
    this.world.update()
    super.update()
  }
}
