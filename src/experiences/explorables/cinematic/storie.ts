import Experience, {
  IExperienceOptions,
} from 'experiences/shared/core/Experience'

import sources from './sources'
import World from './World/World'

export default class Storie extends Experience {
  world: World

  constructor(containerSelector: string, options?: IExperienceOptions) {
    super(containerSelector, { sources, ...options })

    this.world = new World(this)
  }

  update(): void {
    this.world.update()
    super.update()
  }
}
