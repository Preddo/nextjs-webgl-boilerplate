import * as THREE from 'three'

import Debug from 'experiences/shared/utils/Debug'
import Resources, { ISource } from 'experiences/shared/utils/Resources'
import Sizes from 'experiences/shared/utils/Sizes'
import Time from 'experiences/shared/utils/Time'

import Camera from './Camera'
import Renderer from './Renderer'

export default class Experience {
  container: HTMLElement
  canvas: HTMLCanvasElement
  debug: Debug
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  resources: Resources
  camera: Camera
  renderer: Renderer

  constructor(containerSelector: string, sources: ISource[]) {
    this.container = document.querySelector(containerSelector) as HTMLElement
    // Options
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes(this.container)
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)

    // Resize event
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize(): void {
    this.camera.resize()
    this.renderer.resize()
  }

  update(): void {
    this.camera.update()
    this.renderer.update()
  }

  destroy(): void {
    this.sizes.off('resize')
    this.time.off('tick')

    // Traverse the whole scene
    this.scene.traverse(child => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key]

          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    if (this.debug.active) this.debug.ui.destroy()

    this.container.removeChild(this.canvas)
  }
}
