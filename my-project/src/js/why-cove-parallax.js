export function initWhyCoveParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const section = document.querySelector('.why-cove')
  if (!section) return

  const reasons = section.querySelectorAll('.why-cove__reason')
  const heading = section.querySelector('.why-cove__heading')
  const sub = section.querySelector('.why-cove__sub')

  // Each reason gets a different parallax depth
  const depths = [0.12, 0.07, 0.04]

  let ticking = false

  const update = () => {
    const sectionRect = section.getBoundingClientRect()
    const viewH = window.innerHeight
    // Progress: 0 when section enters bottom, 1 when it leaves top
    const progress = 1 - (sectionRect.bottom / (viewH + sectionRect.height))
    const clampedProgress = Math.max(0, Math.min(1, progress))

    // Subtle vertical shift on the heading/sub
    if (heading) {
      const y = (clampedProgress - 0.3) * -40
      heading.style.transform = `translateY(${y}px)`
    }
    if (sub) {
      const y = (clampedProgress - 0.3) * -24
      sub.style.transform = `translateY(${y}px)`
    }

    // Each reason moves at a different rate
    reasons.forEach((reason, i) => {
      const depth = depths[i] ?? 0.04
      const y = (clampedProgress - 0.4) * -100 * depth
      reason.style.transform = `translateY(${y}px)`
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
