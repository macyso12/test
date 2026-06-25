(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();function h(){const e=document.querySelector("nav");if(e){const i=document.querySelector("#hero"),a=document.querySelectorAll(".download-section, footer"),l=e.offsetHeight,f=()=>{const m=(i?i.getBoundingClientRect().bottom:0)<=l;let d=!1;a.forEach(g=>{const u=g.getBoundingClientRect();u.top<=l&&u.bottom>0&&(d=!0)}),e.classList.toggle("nav--scrolled",d),e.classList.toggle("nav--light",m&&!d)};window.addEventListener("scroll",f,{passive:!0}),f()}const o=document.querySelector(".nav__hamburger"),r=document.getElementById("nav-links");o&&r&&(o.addEventListener("click",()=>{const i=r.classList.toggle("open");o.setAttribute("aria-expanded",String(i))}),r.querySelectorAll("a").forEach(i=>{i.addEventListener("click",()=>{r.classList.remove("open"),o.setAttribute("aria-expanded","false")})}));const s=document.querySelectorAll("main section[id]"),t=document.querySelectorAll('.nav__links a[href^="#"]');if(!s.length||!t.length)return;const n=new IntersectionObserver(i=>{i.forEach(a=>{a.isIntersecting&&t.forEach(l=>{l.classList.toggle("active",l.getAttribute("href")===`#${a.target.id}`)})})},{threshold:.4});s.forEach(i=>n.observe(i))}const p={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function y(){return`
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
  `}function b(e){const o=[];return e.VITE_APP_STORE_URL&&o.push(`
      <a href="${e.VITE_APP_STORE_URL}" class="store-badge store-badge--apple" target="_blank" rel="noopener" aria-label="Download on the App Store">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">App Store</text>
        </svg>
      </a>
    `),e.VITE_GOOGLE_PLAY_URL&&o.push(`
      <a href="${e.VITE_GOOGLE_PLAY_URL}" class="store-badge store-badge--google" target="_blank" rel="noopener" aria-label="Get it on Google Play">
        <svg aria-hidden="true" focusable="false" width="135" height="40" viewBox="0 0 135 40">
          <rect width="135" height="40" rx="8" fill="#000"/>
          <text x="67" y="25" text-anchor="middle" fill="#fff" font-size="14" font-family="sans-serif">Google Play</text>
        </svg>
      </a>
    `),`<div class="store-badges">${o.join("")}</div>`}function v(e=p){const o=e.VITE_APP_STORE_LIVE==="true",r=e.VITE_GOOGLE_PLAY_LIVE==="true",t=o||r?b(e):y();["cta-container"].forEach(i=>{const a=document.getElementById(i);a&&(a.innerHTML=t)})}const E=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function _(e){return typeof e=="string"&&e.length>0&&e.length<=254&&E.test(e)}function L(){document.addEventListener("submit",async e=>{const o=e.target.closest("#waitlist-form");if(!o)return;e.preventDefault();const r=o.querySelector('input[type="email"]'),s=o.querySelector('button[type="submit"]'),t=document.getElementById("form-message");if(!r||!s)return;const n=r.value.trim();if(!_(n)){c(t,"Please enter a valid email address.","error"),r.focus();return}s.disabled=!0,s.textContent="Joining…",w(t);try{const a=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n})})).json();a.status==="created"?(c(t,a.message,"success"),o.reset()):a.status==="duplicate"?c(t,a.message,"info"):c(t,a.message||"Something went wrong.","error")}catch{c(t,"Could not connect. Please try again later.","error")}finally{s.disabled=!1,s.textContent="Join the waitlist"}})}function c(e,o,r){e&&(e.textContent=o,e.className=`form-message form-message--${r}`)}function w(e){e&&(e.textContent="",e.className="form-message")}function S(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll("[data-reveal]");if(!e.length)return;e.forEach(r=>{const t=Array.from(r.parentElement.querySelectorAll("[data-reveal]")).indexOf(r);t>0&&(r.style.transitionDelay=`${t*.1}s`)});const o=new IntersectionObserver(r=>{r.forEach(s=>{s.isIntersecting&&(s.target.classList.add("visible"),o.unobserve(s.target))})},{threshold:.12});e.forEach(r=>o.observe(r))}function O(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__bg"),o=document.querySelector(".hero__content");if(!e)return;let r=!1;function s(){const t=window.scrollY,n=document.querySelector(".hero").offsetHeight,i=75+t*.02;if(e.style.backgroundPositionY=`${Math.min(i,95)}%`,o){const a=Math.min(t/(n*.6),1);o.style.opacity=1-a*.6,o.style.transform=`translateY(${-a*40}px)`}r=!1}window.addEventListener("scroll",()=>{r||(requestAnimationFrame(s),r=!0)},{passive:!0})}document.addEventListener("DOMContentLoaded",()=>{h(),v(),L(),S(),O()});
