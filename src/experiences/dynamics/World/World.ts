import * as THREE from 'three'

import Experience from '../Experience'
import Resources from '../Utils/Resources'

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

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor()
      this.fox = new Fox()
      this.environment = new Environment()
    })
  }

  update(): void {
    if (this.fox) this.fox.update()
  }
}
