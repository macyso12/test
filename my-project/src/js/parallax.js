export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const bg = document.querySelector('.hero__bg')
  const content = document.querySelector('.hero__content')
  if (!bg) return

  bg.style.top = '-15%'
  bg.style.height = '130%'

  let ticking = false

  function update() {
    const scrollY = window.scrollY
    const heroH = document.querySelector('.hero').offsetHeight

    bg.style.transform = `translateY(${scrollY * 0.4}px)`

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
