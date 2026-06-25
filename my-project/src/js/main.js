import { initNav } from './nav.js'
import { initCtaMode } from './cta-mode.js'
import { initWaitlistForm } from './waitlist-form.js'
import { initScrollReveal } from './scroll-reveal.js'
import { initParallax } from './parallax.js'
import { initImageTrail } from './image-trail.js'
import { initWhyCoveParallax } from './why-cove-parallax.js'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initCtaMode()
  initWaitlistForm()
  initScrollReveal()
  initParallax()
  initImageTrail()
  initWhyCoveParallax()
})
