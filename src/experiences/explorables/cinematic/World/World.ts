import * as THREE from 'three'

import Experience from 'experiences/shared/core/Experience'
import Resources from 'experiences/shared/utils/Resources'

import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

export default class World {
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  floor: Floor
  fox: Fox
  environment: Environment

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor(this.experience)
      this.fox = new Fox(this.experience)
      this.environment = new Environment(this.experience)
    })
  }

  update(): void {
    if (this.fox) this.fox.update()
  }
}
