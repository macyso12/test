function buildWaitlistForm() {
  return `
    <form id="waitlist-form" class="waitlist-form" novalidate>
      <label for="waitlist-email" class="visually-hidden">Email address</label>
      <input
        type="email"
        id="waitlist-email"
        name="email"
        placeholder="you@example.com"
        autocomplete="email"
        required
      />
      <button type="submit" class="btn btn--primary">
        Get early access
      </button>
    </form>
    <p id="form-message" class="form-message" aria-live="polite"></p>
  `
}

function buildStoreBadges(env) {
  const badges = []
  if (env.VITE_APP_STORE_URL) {
    badges.push(`
      <a href="${env.VITE_APP_STORE_URL}" class="store-badge store-badge--apple" target="_blank" rel="noopener" aria-label="Download on the App Store">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">App Store</text>
        </svg>
      </a>
    `)
  }
  if (env.VITE_GOOGLE_PLAY_URL) {
    badges.push(`
      <a href="${env.VITE_GOOGLE_PLAY_URL}" class="store-badge store-badge--google" target="_blank" rel="noopener" aria-label="Get it on Google Play">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">Google Play</text>
        </svg>
      </a>
    `)
  }
  return `<div class="store-badges">${badges.join('')}</div>`
}

export function initCtaMode(env = import.meta.env) {
  const appStoreLive = env.VITE_APP_STORE_LIVE === 'true'
  const googlePlayLive = env.VITE_GOOGLE_PLAY_LIVE === 'true'
  const showBadges = appStoreLive || googlePlayLive

  const html = showBadges ? buildStoreBadges(env) : buildWaitlistForm()

  const containerIds = ['cta-container', 'cta-container-bottom']
  containerIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.innerHTML = html
  })
}
