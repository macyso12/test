export function initNav() {
  const nav = document.querySelector('nav')
  if (nav) {
    const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
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

  const sections = document.querySelectorAll('main section[id]')
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]')

  if (!sections.length || !navAnchors.length) return

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`)
      })
    })
  }, { threshold: 0.4 })

  sections.forEach(s => observer.observe(s))
}
