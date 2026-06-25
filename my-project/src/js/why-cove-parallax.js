export function initWhyCoveParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const section = document.querySelector('.why-cove')
  if (!section) return

  const cards = section.querySelectorAll('.why-cove__card')
  const heading = section.querySelector('.why-cove__heading')

  const depths = [0.06, 0.1, 0.04]

  let ticking = false

  const update = () => {
    const sectionRect = section.getBoundingClientRect()
    const viewH = window.innerHeight
    const progress = 1 - (sectionRect.bottom / (viewH + sectionRect.height))
    const p = Math.max(0, Math.min(1, progress))

    if (heading) {
      heading.style.transform = `translateY(${(p - 0.3) * -30}px)`
    }

    cards.forEach((card, i) => {
      const depth = depths[i] ?? 0.05
      card.style.transform = `translateY(${(p - 0.4) * -100 * depth}px)`
    })

    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })

  update()
}
