export function initImageTrail() {
  const container = document.querySelector('.download-section')
  if (!container) return

  const images = [
    '/images/hiw-1.jpg',
    '/images/hiw-2.jpg',
    '/images/hiw-3.jpg',
    '/images/approach-calendar.png',
  ]

  let currentIndex = 0
  let lastSpawnTime = 0
  const INTERVAL = 120 // ms between spawns

  const getRelativePos = (e) => {
    const rect = container.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const spawnImage = (x, y) => {
    const el = document.createElement('div')
    el.className = 'trail-item'

    const img = document.createElement('img')
    img.src = images[currentIndex % images.length]
    img.alt = ''
    img.draggable = false
    el.appendChild(img)

    const rotation = (Math.random() - 0.5) * 30
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`

    container.appendChild(el)
    currentIndex++

    // Animate in then out
    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.15s cubic-bezier(0.33,1,0.68,1), opacity 0.15s ease'
      el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1.1)`

      setTimeout(() => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.32,0,0.67,0), opacity 0.5s ease'
        el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`
        el.style.opacity = '0'

        setTimeout(() => el.remove(), 520)
      }, 150)
    })
  }

  const onMove = (e) => {
    const now = performance.now()
    if (now - lastSpawnTime < INTERVAL) return
    lastSpawnTime = now

    const { x, y } = getRelativePos(e)
    spawnImage(x, y)
  }

  container.addEventListener('mousemove', onMove)
  container.addEventListener('touchmove', onMove, { passive: true })
}
