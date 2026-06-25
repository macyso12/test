(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();function d(){const e=document.querySelector("nav");if(e){const n=document.querySelector("#hero"),a=()=>{const c=n?n.offsetHeight-80:60;e.classList.toggle("nav--scrolled",window.scrollY>c)};window.addEventListener("scroll",a,{passive:!0}),a()}const r=document.querySelector(".nav__hamburger"),o=document.getElementById("nav-links");r&&o&&(r.addEventListener("click",()=>{const n=o.classList.toggle("open");r.setAttribute("aria-expanded",String(n))}),o.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>{o.classList.remove("open"),r.setAttribute("aria-expanded","false")})}));const i=document.querySelectorAll("main section[id]"),t=document.querySelectorAll('.nav__links a[href^="#"]');if(!i.length||!t.length)return;const s=new IntersectionObserver(n=>{n.forEach(a=>{a.isIntersecting&&t.forEach(c=>{c.classList.toggle("active",c.getAttribute("href")===`#${a.target.id}`)})})},{threshold:.4});i.forEach(n=>s.observe(n))}const u={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function f(){return`
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
  `}function m(e){const r=[];return e.VITE_APP_STORE_URL&&r.push(`
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
    `),`<div class="store-badges">${r.join("")}</div>`}function g(e=u){const r=e.VITE_APP_STORE_LIVE==="true",o=e.VITE_GOOGLE_PLAY_LIVE==="true",t=r||o?m(e):f();["cta-container"].forEach(n=>{const a=document.getElementById(n);a&&(a.innerHTML=t)})}const h=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function p(e){return typeof e=="string"&&e.length>0&&e.length<=254&&h.test(e)}function y(){document.addEventListener("submit",async e=>{const r=e.target.closest("#waitlist-form");if(!r)return;e.preventDefault();const o=r.querySelector('input[type="email"]'),i=r.querySelector('button[type="submit"]'),t=document.getElementById("form-message");if(!o||!i)return;const s=o.value.trim();if(!p(s)){l(t,"Please enter a valid email address.","error"),o.focus();return}i.disabled=!0,i.textContent="Joining…",b(t);try{const a=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})})).json();a.status==="created"?(l(t,a.message,"success"),r.reset()):a.status==="duplicate"?l(t,a.message,"info"):l(t,a.message||"Something went wrong.","error")}catch{l(t,"Could not connect. Please try again later.","error")}finally{i.disabled=!1,i.textContent="Join the waitlist"}})}function l(e,r,o){e&&(e.textContent=r,e.className=`form-message form-message--${o}`)}function b(e){e&&(e.textContent="",e.className="form-message")}function v(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll(".feature-card, .testimonial-card, [data-reveal]");if(!e.length)return;const r=new IntersectionObserver(o=>{o.forEach(i=>{i.isIntersecting&&(i.target.classList.add("visible"),r.unobserve(i.target))})},{threshold:.15});e.forEach(o=>r.observe(o))}function E(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__bg"),r=document.querySelector(".hero__content");if(!e)return;let o=!1;function i(){const t=window.scrollY,s=document.querySelector(".hero").offsetHeight,n=75+t*.02;if(e.style.backgroundPositionY=`${Math.min(n,95)}%`,r){const a=Math.min(t/(s*.6),1);r.style.opacity=1-a*.6,r.style.transform=`translateY(${-a*40}px)`}o=!1}window.addEventListener("scroll",()=>{o||(requestAnimationFrame(i),o=!0)},{passive:!0})}document.addEventListener("DOMContentLoaded",()=>{d(),g(),y(),v(),E()});
