import * as THREE from 'three'

import Sizes from 'experiences/shared/utils/Sizes'

import Camera from './Camera'
import Experience from './Experience'

export interface IRendererOptions {
  enableAntialias?: boolean
  physicallyCorrectLights?: boolean
  enableShadowMap?: boolean
}

export default class Renderer {
  experience: Experience
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene
  camera: Camera
  instance: THREE.WebGLRenderer

  constructor(experience: Experience, options?: IRendererOptions) {
    this.experience = experience
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.setInstance(options)
  }

  setInstance(options: IRendererOptions): void {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: options?.enableAntialias || false,
    })

    this.instance.physicallyCorrectLights =
      options?.physicallyCorrectLights || false
    this.instance.outputEncoding = THREE.sRGBEncoding
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = options?.enableShadowMap || false
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

    this.experience.camera.controls.addEventListener(
      'change',
      this.update.bind(this),
    )
  }

  resize(): void {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update(): void {
    this.instance.render(this.scene, this.camera.instance)
  }
}
