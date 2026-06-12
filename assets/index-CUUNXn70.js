(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();function c(){const e=document.querySelector(".nav__hamburger"),r=document.getElementById("nav-links");e&&r&&(e.addEventListener("click",()=>{const s=r.classList.toggle("open");e.setAttribute("aria-expanded",String(s))}),r.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>{r.classList.remove("open"),e.setAttribute("aria-expanded","false")})}));const o=document.querySelectorAll("main section[id]"),i=document.querySelectorAll('.nav__links a[href^="#"]');if(!o.length||!i.length)return;const t=new IntersectionObserver(s=>{s.forEach(a=>{a.isIntersecting&&i.forEach(n=>{n.classList.toggle("active",n.getAttribute("href")===`#${a.target.id}`)})})},{threshold:.4});o.forEach(s=>t.observe(s))}const d={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function f(){return`
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
  `}function u(e){const r=[];return e.VITE_APP_STORE_URL&&r.push(`
      <a href="${e.VITE_APP_STORE_URL}" class="store-badge store-badge--apple" target="_blank" rel="noopener" aria-label="Download on the App Store">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">App Store</text>
        </svg>
      </a>
    `),e.VITE_GOOGLE_PLAY_URL&&r.push(`
      <a href="${e.VITE_GOOGLE_PLAY_URL}" class="store-badge store-badge--google" target="_blank" rel="noopener" aria-label="Get it on Google Play">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">Google Play</text>
        </svg>
      </a>
    `),`<div class="store-badges">${r.join("")}</div>`}function m(e=d){const r=e.VITE_APP_STORE_LIVE==="true",o=e.VITE_GOOGLE_PLAY_LIVE==="true",t=r||o?u(e):f();["cta-container"].forEach(a=>{const n=document.getElementById(a);n&&(n.innerHTML=t)})}const g=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function h(e){return typeof e=="string"&&e.length>0&&e.length<=254&&g.test(e)}function p(){document.addEventListener("submit",async e=>{const r=e.target.closest("#waitlist-form");if(!r)return;e.preventDefault();const o=r.querySelector('input[type="email"]'),i=r.querySelector('button[type="submit"]'),t=document.getElementById("form-message");if(!o||!i)return;const s=o.value.trim();if(!h(s)){l(t,"Please enter a valid email address.","error"),o.focus();return}i.disabled=!0,i.textContent="Joining…",b(t);try{const n=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})})).json();n.status==="created"?(l(t,n.message,"success"),r.reset()):n.status==="duplicate"?l(t,n.message,"info"):l(t,n.message||"Something went wrong.","error")}catch{l(t,"Could not connect. Please try again later.","error")}finally{i.disabled=!1,i.textContent="Join the waitlist"}})}function l(e,r,o){e&&(e.textContent=r,e.className=`form-message form-message--${o}`)}function b(e){e&&(e.textContent="",e.className="form-message")}function y(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll(".feature-card, .testimonial-card, [data-reveal]");if(!e.length)return;const r=new IntersectionObserver(o=>{o.forEach(i=>{i.isIntersecting&&(i.target.classList.add("visible"),r.unobserve(i.target))})},{threshold:.15});e.forEach(o=>r.observe(o))}document.addEventListener("DOMContentLoaded",()=>{c(),m(),p(),y()});
