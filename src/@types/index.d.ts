/* eslint-disable @typescript-eslint/naming-convention */
import Experience from 'experiences/shared/core/Experience'

declare global {
  interface Window {
    experience: Experience
  }
}
