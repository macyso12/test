import { describe, it, expect, beforeEach } from 'vitest'

// Mock import.meta.env before importing the module
const mockEnv = { VITE_APP_STORE_LIVE: 'false', VITE_GOOGLE_PLAY_LIVE: 'false', VITE_APP_STORE_URL: '', VITE_GOOGLE_PLAY_URL: '' }

function buildContainers(doc) {
  const ids = ['cta-container', 'cta-container-features', 'cta-container-bottom']
  ids.forEach(id => {
    const el = doc.createElement('div')
    el.id = id
    doc.body.appendChild(el)
  })
}

describe('initCtaMode', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    buildContainers(document)
  })

  it('renders waitlist form when APP_STORE_LIVE is false', async () => {
    mockEnv.VITE_APP_STORE_LIVE = 'false'
    const { initCtaMode } = await import('../../src/js/cta-mode.js?bust=' + Math.random())
    initCtaMode(mockEnv)
    expect(document.querySelector('#waitlist-form')).not.toBeNull()
  })

  it('renders store badges when APP_STORE_LIVE is true', async () => {
    mockEnv.VITE_APP_STORE_LIVE = 'true'
    mockEnv.VITE_GOOGLE_PLAY_LIVE = 'true'
    mockEnv.VITE_APP_STORE_URL = 'https://apps.apple.com/app/tenderly'
    mockEnv.VITE_GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/tenderly'
    const { initCtaMode } = await import('../../src/js/cta-mode.js?bust=' + Math.random())
    initCtaMode(mockEnv)
    const badges = document.querySelectorAll('.store-badge')
    expect(badges.length).toBeGreaterThan(0)
  })
})
