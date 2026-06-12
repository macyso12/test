const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/

export function validateEmail(email) {
  return typeof email === 'string' && email.length > 0 && email.length <= 254 && EMAIL_RE.test(email)
}

export function initWaitlistForm() {
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('#waitlist-form')
    if (!form) return
    e.preventDefault()

    const input = form.querySelector('input[type="email"]')
    const btn = form.querySelector('button[type="submit"]')
    const msg = document.getElementById('form-message')

    if (!input || !btn) return

    const email = input.value.trim()

    if (!validateEmail(email)) {
      showMessage(msg, 'Please enter a valid email address.', 'error')
      input.focus()
      return
    }

    btn.disabled = true
    btn.textContent = 'Joining…'
    clearMessage(msg)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()

      if (data.status === 'created') {
        showMessage(msg, data.message, 'success')
        form.reset()
      } else if (data.status === 'duplicate') {
        showMessage(msg, data.message, 'info')
      } else {
        showMessage(msg, data.message || 'Something went wrong.', 'error')
      }
    } catch {
      showMessage(msg, 'Could not connect. Please try again later.', 'error')
    } finally {
      btn.disabled = false
      btn.textContent = 'Join the waitlist'
    }
  })
}

function showMessage(el, text, type) {
  if (!el) return
  el.textContent = text
  el.className = `form-message form-message--${type}`
}

function clearMessage(el) {
  if (!el) return
  el.textContent = ''
  el.className = 'form-message'
}
