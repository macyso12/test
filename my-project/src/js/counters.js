export function initCounters() {
  const stats = document.querySelectorAll('.proof-strip__number')
  if (!stats.length) return

  const targets = Array.from(stats).map(el => parseInt(el.textContent, 10))

  const animateCount = (el, target) => {
    const duration = 1200
    const start = performance.now()
    const update = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.round(eased * target)
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      stats.forEach((el, i) => animateCount(el, targets[i]))
      observer.disconnect()
    })
  }, { threshold: 0.5 })

  const strip = document.querySelector('.proof-strip')
  if (strip) observer.observe(strip)
}
