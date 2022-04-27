/* eslint-disable @typescript-eslint/naming-convention */
import Experience from 'experiences/dynamics/Experience'

declare global {
  interface Window {
    experience: Experience
  }
}
