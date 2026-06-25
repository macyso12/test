export function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const targets = document.querySelectorAll('[data-reveal]')
  if (!targets.length) return

  // Assign stagger delay based on position among siblings in the same parent
  targets.forEach(el => {
    const siblings = Array.from(el.parentElement.querySelectorAll('[data-reveal]'))
    const index = siblings.indexOf(el)
    if (index > 0) {
      el.style.transitionDelay = `${index * 0.1}s`
    }
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  targets.forEach(el => observer.observe(el))
}
