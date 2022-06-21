import * as dat from 'lil-gui'
import Stats from 'stats.js'

import Experience from 'experiences/shared/core/Experience'

export default class Debug {
  active: boolean
  ui: dat.GUI
  stats: Stats

  constructor(experience?: Experience) {
    this.active = window.location.hash === '#debug'

    if (this.active) {
      this.ui = new dat.GUI({
        container: experience.container,
        autoPlace: true,
      })

      this.stats = new Stats()
      this.stats.dom.style.position = 'absolute'
      this.stats.showPanel(0)

      experience.container.appendChild(this.stats.dom)
    }
  }
}
