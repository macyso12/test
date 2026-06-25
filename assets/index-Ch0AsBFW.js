(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function c(){const e=document.querySelector(".nav__hamburger"),t=document.getElementById("nav-links");e&&t&&(e.addEventListener("click",()=>{const s=t.classList.toggle("open");e.setAttribute("aria-expanded",String(s))}),t.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>{t.classList.remove("open"),e.setAttribute("aria-expanded","false")})}));const n=document.querySelectorAll("main section[id]"),o=document.querySelectorAll('.nav__links a[href^="#"]');if(!n.length||!o.length)return;const r=new IntersectionObserver(s=>{s.forEach(a=>{a.isIntersecting&&o.forEach(i=>{i.classList.toggle("active",i.getAttribute("href")===`#${a.target.id}`)})})},{threshold:.4});n.forEach(s=>r.observe(s))}const d={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function u(){return`
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
  `}function f(e){const t=[];return e.VITE_APP_STORE_URL&&t.push(`
      <a href="${e.VITE_APP_STORE_URL}" class="store-badge store-badge--apple" target="_blank" rel="noopener" aria-label="Download on the App Store">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">App Store</text>
        </svg>
      </a>
    `),e.VITE_GOOGLE_PLAY_URL&&t.push(`
      <a href="${e.VITE_GOOGLE_PLAY_URL}" class="store-badge store-badge--google" target="_blank" rel="noopener" aria-label="Get it on Google Play">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">Google Play</text>
        </svg>
      </a>
    `),`<div class="store-badges">${t.join("")}</div>`}function m(e=d){const t=e.VITE_APP_STORE_LIVE==="true",n=e.VITE_GOOGLE_PLAY_LIVE==="true",r=t||n?f(e):u();["cta-container"].forEach(a=>{const i=document.getElementById(a);i&&(i.innerHTML=r)})}const g=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function h(e){return typeof e=="string"&&e.length>0&&e.length<=254&&g.test(e)}function p(){document.addEventListener("submit",async e=>{const t=e.target.closest("#waitlist-form");if(!t)return;e.preventDefault();const n=t.querySelector('input[type="email"]'),o=t.querySelector('button[type="submit"]'),r=document.getElementById("form-message");if(!n||!o)return;const s=n.value.trim();if(!h(s)){l(r,"Please enter a valid email address.","error"),n.focus();return}o.disabled=!0,o.textContent="Joining…",y(r);try{const i=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})})).json();i.status==="created"?(l(r,i.message,"success"),t.reset()):i.status==="duplicate"?l(r,i.message,"info"):l(r,i.message||"Something went wrong.","error")}catch{l(r,"Could not connect. Please try again later.","error")}finally{o.disabled=!1,o.textContent="Join the waitlist"}})}function l(e,t,n){e&&(e.textContent=t,e.className=`form-message form-message--${n}`)}function y(e){e&&(e.textContent="",e.className="form-message")}function b(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll(".feature-card, .testimonial-card, [data-reveal]");if(!e.length)return;const t=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(o.target.classList.add("visible"),t.unobserve(o.target))})},{threshold:.15});e.forEach(n=>t.observe(n))}function v(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__bg"),t=document.querySelector(".hero__content"),n=document.querySelector(".hero__mockup");if(!e)return;e.style.top="-15%",e.style.height="130%";let o=!1;function r(){const s=window.scrollY,a=document.querySelector(".hero").offsetHeight;if(e.style.transform=`translateY(${s*.4}px)`,t){const i=Math.min(s/(a*.6),1);t.style.opacity=1-i*.6,t.style.transform=`translateY(${-i*40}px)`}n&&(n.style.transform=`translateY(${-s*.08}px)`),o=!1}window.addEventListener("scroll",()=>{o||(requestAnimationFrame(r),o=!0)},{passive:!0})}document.addEventListener("DOMContentLoaded",()=>{c(),m(),p(),b(),v()});
