export function initNav() {
  const nav = document.querySelector('nav')

  if (nav) {
    const sections = Array.from(document.querySelectorAll('[data-nav-bg]'))
    const navH = nav.offsetHeight

    const updateNavColor = () => {
      // Find the topmost section currently behind the nav bar
      let active = null
      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= navH && rect.bottom > navH) {
          active = el
          break
        }
      }
      if (!active) {
        // Default: transparent over hero-ish top
        active = sections[0]
      }

      const bg = active.dataset.navBg || 'transparent'
      const isDark = 'navDark' in active.dataset

      nav.style.backgroundColor = bg === 'transparent' ? '' : bg
      nav.style.borderBottomColor = 'transparent'

      nav.classList.toggle('nav--scrolled', isDark && bg !== 'transparent')
      nav.classList.toggle('nav--light', !isDark && bg !== 'transparent')

      // Hero: fully transparent
      if (bg === 'transparent') {
        nav.classList.remove('nav--scrolled', 'nav--light')
        nav.style.backgroundColor = ''
      }
    }

    window.addEventListener('scroll', updateNavColor, { passive: true })
    updateNavColor()
  }

  const hamburger = document.querySelector('.nav__hamburger')
  const navLinks = document.getElementById('nav-links')

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open')
      hamburger.setAttribute('aria-expanded', String(isOpen))
    })

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open')
        hamburger.setAttribute('aria-expanded', 'false')
      })
    })
  }

  const navSections = document.querySelectorAll('main section[id]')
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]')

  if (!navSections.length || !navAnchors.length) return

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`)
      })
    })
  }, { threshold: 0.4 })

  navSections.forEach(s => observer.observe(s))
}
