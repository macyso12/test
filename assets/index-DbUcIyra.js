(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();function c(){const e=document.querySelector(".nav__hamburger"),r=document.getElementById("nav-links");e&&r&&(e.addEventListener("click",()=>{const s=r.classList.toggle("open");e.setAttribute("aria-expanded",String(s))}),r.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>{r.classList.remove("open"),e.setAttribute("aria-expanded","false")})}));const o=document.querySelectorAll("main section[id]"),n=document.querySelectorAll('.nav__links a[href^="#"]');if(!o.length||!n.length)return;const t=new IntersectionObserver(s=>{s.forEach(i=>{i.isIntersecting&&n.forEach(a=>{a.classList.toggle("active",a.getAttribute("href")===`#${i.target.id}`)})})},{threshold:.4});o.forEach(s=>t.observe(s))}const d={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function f(){return`
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
    `),`<div class="store-badges">${r.join("")}</div>`}function m(e=d){const r=e.VITE_APP_STORE_LIVE==="true",o=e.VITE_GOOGLE_PLAY_LIVE==="true",t=r||o?u(e):f();["cta-container"].forEach(i=>{const a=document.getElementById(i);a&&(a.innerHTML=t)})}const g=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function h(e){return typeof e=="string"&&e.length>0&&e.length<=254&&g.test(e)}function p(){document.addEventListener("submit",async e=>{const r=e.target.closest("#waitlist-form");if(!r)return;e.preventDefault();const o=r.querySelector('input[type="email"]'),n=r.querySelector('button[type="submit"]'),t=document.getElementById("form-message");if(!o||!n)return;const s=o.value.trim();if(!h(s)){l(t,"Please enter a valid email address.","error"),o.focus();return}n.disabled=!0,n.textContent="Joining…",y(t);try{const a=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})})).json();a.status==="created"?(l(t,a.message,"success"),r.reset()):a.status==="duplicate"?l(t,a.message,"info"):l(t,a.message||"Something went wrong.","error")}catch{l(t,"Could not connect. Please try again later.","error")}finally{n.disabled=!1,n.textContent="Join the waitlist"}})}function l(e,r,o){e&&(e.textContent=r,e.className=`form-message form-message--${o}`)}function y(e){e&&(e.textContent="",e.className="form-message")}function b(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll(".feature-card, .testimonial-card, [data-reveal]");if(!e.length)return;const r=new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting&&(n.target.classList.add("visible"),r.unobserve(n.target))})},{threshold:.15});e.forEach(o=>r.observe(o))}function v(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__bg"),r=document.querySelector(".hero__content");if(!e)return;e.style.top="-15%",e.style.height="130%";let o=!1;function n(){const t=window.scrollY,s=document.querySelector(".hero").offsetHeight;if(e.style.transform=`translateY(${t*.4}px)`,r){const i=Math.min(t/(s*.6),1);r.style.opacity=1-i*.6,r.style.transform=`translateY(${-i*40}px)`}o=!1}window.addEventListener("scroll",()=>{o||(requestAnimationFrame(n),o=!0)},{passive:!0})}document.addEventListener("DOMContentLoaded",()=>{c(),m(),p(),b(),v()});
