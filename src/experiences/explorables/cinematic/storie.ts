import Experience from 'experiences/shared/core/Experience'

import sources from './sources'
import World from './World/World'

export default class Storie extends Experience {
  world: World

  constructor(containerSelector: string) {
    super(containerSelector, sources)

    this.world = new World(this)
  }

  update(): void {
    this.world.update()
    super.update()
  }
}
