import * as THREE from 'three'

import Experience from 'experiences/shared/core/Experience'
import Resources from 'experiences/shared/utils/Resources'

export default class Floor {
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  geometry: THREE.CircleGeometry
  textures: {
    color: THREE.Texture
    normal: THREE.Texture
  }

  material: THREE.MeshStandardMaterial
  mesh: THREE.Mesh

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Setup
    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry(): void {
    this.geometry = new THREE.CircleGeometry(5, 64)
  }

  setTextures(): void {
    this.textures = {
      color: this.resources.items.grassColorTexture as THREE.Texture,
      normal: this.resources.items.grassNormalTexture as THREE.Texture,
    }

    this.textures.color.encoding = THREE.sRGBEncoding
    this.textures.color.repeat.set(1.5, 1.5)
    this.textures.color.wrapS = THREE.RepeatWrapping
    this.textures.color.wrapT = THREE.RepeatWrapping

    this.textures.normal.repeat.set(1.5, 1.5)
    this.textures.normal.wrapS = THREE.RepeatWrapping
    this.textures.normal.wrapT = THREE.RepeatWrapping
  }

  setMaterial(): void {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      side: THREE.DoubleSide,
    })
  }

  setMesh(): void {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
