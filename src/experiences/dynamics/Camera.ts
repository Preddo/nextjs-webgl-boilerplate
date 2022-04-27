import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience'
import Sizes from './Utils/Sizes'

export default class Camera {
  experience: Experience
  sizes: Sizes
  scene: THREE.Scene
  canvas: HTMLCanvasElement
  instance: THREE.PerspectiveCamera
  controls: OrbitControls

  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.setInstance()
    this.setControls()
  }

  setInstance(): void {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  setControls(): void {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize(): void {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(): void {
    this.controls.update()
  }
}
