export function initWhyCoveParallax() {
  const section = document.querySelector('.why-cove')
  if (!section) return

  // Start looping notification when lock screen scrolls into view
  const lockscreen = document.querySelector('.wc-lockscreen')
  if (lockscreen) {
    const notifObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        lockscreen.classList.toggle('notif-visible', entry.isIntersecting)
      })
    }, { threshold: 0.4 })
    notifObserver.observe(lockscreen)
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const rows = section.querySelectorAll('.why-cove__row')
  const heading = section.querySelector('.why-cove__heading')
  const depths = [0.06, 0.04, 0.02]
  let ticking = false

  const update = () => {
    const sectionRect = section.getBoundingClientRect()
    const viewH = window.innerHeight
    const progress = 1 - (sectionRect.bottom / (viewH + sectionRect.height))
    const p = Math.max(0, Math.min(1, progress))

    if (heading) {
      heading.style.transform = `translateY(${(p - 0.3) * -24}px)`
    }

    rows.forEach((row, i) => {
      const depth = depths[i] ?? 0.02
      const visual = row.querySelector('.why-cove__row-visual img')
      if (visual) visual.style.transform = `translateY(${(p - 0.5) * -80 * depth}px)`
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
