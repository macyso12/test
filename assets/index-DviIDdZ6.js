(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();function d(){const e=document.querySelector("nav");if(e){const o=()=>e.classList.toggle("nav--scrolled",window.scrollY>60);window.addEventListener("scroll",o,{passive:!0}),o()}const r=document.querySelector(".nav__hamburger"),s=document.getElementById("nav-links");r&&s&&(r.addEventListener("click",()=>{const o=s.classList.toggle("open");r.setAttribute("aria-expanded",String(o))}),s.querySelectorAll("a").forEach(o=>{o.addEventListener("click",()=>{s.classList.remove("open"),r.setAttribute("aria-expanded","false")})}));const i=document.querySelectorAll("main section[id]"),t=document.querySelectorAll('.nav__links a[href^="#"]');if(!i.length||!t.length)return;const n=new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&t.forEach(c=>{c.classList.toggle("active",c.getAttribute("href")===`#${a.target.id}`)})})},{threshold:.4});i.forEach(o=>n.observe(o))}const u={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function f(){return`
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
    `),`<div class="store-badges">${r.join("")}</div>`}function g(e=u){const r=e.VITE_APP_STORE_LIVE==="true",s=e.VITE_GOOGLE_PLAY_LIVE==="true",t=r||s?m(e):f();["cta-container"].forEach(o=>{const a=document.getElementById(o);a&&(a.innerHTML=t)})}const h=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function p(e){return typeof e=="string"&&e.length>0&&e.length<=254&&h.test(e)}function y(){document.addEventListener("submit",async e=>{const r=e.target.closest("#waitlist-form");if(!r)return;e.preventDefault();const s=r.querySelector('input[type="email"]'),i=r.querySelector('button[type="submit"]'),t=document.getElementById("form-message");if(!s||!i)return;const n=s.value.trim();if(!p(n)){l(t,"Please enter a valid email address.","error"),s.focus();return}i.disabled=!0,i.textContent="Joining…",b(t);try{const a=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n})})).json();a.status==="created"?(l(t,a.message,"success"),r.reset()):a.status==="duplicate"?l(t,a.message,"info"):l(t,a.message||"Something went wrong.","error")}catch{l(t,"Could not connect. Please try again later.","error")}finally{i.disabled=!1,i.textContent="Join the waitlist"}})}function l(e,r,s){e&&(e.textContent=r,e.className=`form-message form-message--${s}`)}function b(e){e&&(e.textContent="",e.className="form-message")}function v(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll(".feature-card, .testimonial-card, [data-reveal]");if(!e.length)return;const r=new IntersectionObserver(s=>{s.forEach(i=>{i.isIntersecting&&(i.target.classList.add("visible"),r.unobserve(i.target))})},{threshold:.15});e.forEach(s=>r.observe(s))}function E(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__bg"),r=document.querySelector(".hero__content");if(!e)return;e.style.top="-15%",e.style.height="130%";let s=!1;function i(){const t=window.scrollY,n=document.querySelector(".hero").offsetHeight;if(e.style.transform=`translateY(${t*.4}px)`,r){const o=Math.min(t/(n*.6),1);r.style.opacity=1-o*.6,r.style.transform=`translateY(${-o*40}px)`}s=!1}window.addEventListener("scroll",()=>{s||(requestAnimationFrame(i),s=!0)},{passive:!0})}document.addEventListener("DOMContentLoaded",()=>{d(),g(),y(),v(),E()});
