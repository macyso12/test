export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const bg = document.querySelector('.hero__bg')
  const content = document.querySelector('.hero__content')
  if (!bg) return

  let ticking = false

  function update() {
    const scrollY = window.scrollY
    const heroH = document.querySelector('.hero').offsetHeight

    // Shift background position downward as user scrolls (parallax feel)
    const offset = 75 + scrollY * 0.02
    bg.style.backgroundPositionY = `${Math.min(offset, 95)}%`

    if (content) {
      const progress = Math.min(scrollY / (heroH * 0.6), 1)
      content.style.opacity = 1 - progress * 0.6
      content.style.transform = `translateY(${-progress * 40}px)`
    }

    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })
}
