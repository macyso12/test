import { initNav } from './nav.js'
import { initCtaMode } from './cta-mode.js'
import { initWaitlistForm } from './waitlist-form.js'
import { initScrollReveal } from './scroll-reveal.js'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initCtaMode()
  initWaitlistForm()
  initScrollReveal()
})
