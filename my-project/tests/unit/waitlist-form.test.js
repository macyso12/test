import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validateEmail, initWaitlistForm } from '../../src/js/waitlist-form.js'

describe('validateEmail', () => {
  it('returns false for empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('returns false for plain word', () => {
    expect(validateEmail('bad')).toBe(false)
  })

  it('returns false for missing domain', () => {
    expect(validateEmail('user@')).toBe(false)
  })

  it('returns true for valid email', () => {
    expect(validateEmail('a@b.c')).toBe(true)
  })

  it('returns true for typical email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })

  it('returns false for email longer than 254 chars', () => {
    expect(validateEmail('a'.repeat(250) + '@b.com')).toBe(false)
  })
})

describe('initWaitlistForm — client-side validation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="waitlist-form" novalidate>
        <input type="email" id="waitlist-email" name="email" />
        <button type="submit">Join</button>
      </form>
      <p id="form-message"></p>
    `
    initWaitlistForm()
  })

  it('shows error message for invalid email without calling fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const input = document.getElementById('waitlist-email')
    const form = document.getElementById('waitlist-form')

    input.value = 'notanemail'
    form.dispatchEvent(new Event('submit', { bubbles: true }))

    await new Promise(r => setTimeout(r, 0))

    expect(document.getElementById('form-message').textContent).toContain('valid email')
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('shows success message on 201 response', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ status: 'created', message: "You're on the list!" })
    })
    const input = document.getElementById('waitlist-email')
    const form = document.getElementById('waitlist-form')

    input.value = 'test@example.com'
    form.dispatchEvent(new Event('submit', { bubbles: true }))

    await new Promise(r => setTimeout(r, 50))

    expect(document.getElementById('form-message').textContent).toContain("on the list")
    fetchSpy.mockRestore()
  })

  it('shows duplicate message on 200 duplicate response', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ status: 'duplicate', message: "You're already on the list!" })
    })
    const input = document.getElementById('waitlist-email')
    const form = document.getElementById('waitlist-form')

    input.value = 'dup@example.com'
    form.dispatchEvent(new Event('submit', { bubbles: true }))

    await new Promise(r => setTimeout(r, 50))

    expect(document.getElementById('form-message').textContent).toContain('already')
    fetchSpy.mockRestore()
  })

  it('shows error message on network failure', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))
    const input = document.getElementById('waitlist-email')
    const form = document.getElementById('waitlist-form')

    input.value = 'test@example.com'
    form.dispatchEvent(new Event('submit', { bubbles: true }))

    await new Promise(r => setTimeout(r, 50))

    expect(document.getElementById('form-message').textContent).toContain('try again')
    fetchSpy.mockRestore()
  })
})
