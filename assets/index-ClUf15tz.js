(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();function h(){const e=document.querySelector("nav");if(e){const n=document.querySelector("#hero"),a=document.querySelectorAll(".download-section, footer"),c=e.offsetHeight,u=()=>{const m=(n?n.getBoundingClientRect().bottom:0)<=c;let d=!1;a.forEach(g=>{const f=g.getBoundingClientRect();f.top<=c&&f.bottom>0&&(d=!0)}),e.classList.toggle("nav--scrolled",d),e.classList.toggle("nav--light",m&&!d)};window.addEventListener("scroll",u,{passive:!0}),u()}const o=document.querySelector(".nav__hamburger"),r=document.getElementById("nav-links");o&&r&&(o.addEventListener("click",()=>{const n=r.classList.toggle("open");o.setAttribute("aria-expanded",String(n))}),r.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>{r.classList.remove("open"),o.setAttribute("aria-expanded","false")})}));const i=document.querySelectorAll("main section[id]"),t=document.querySelectorAll('.nav__links a[href^="#"]');if(!i.length||!t.length)return;const s=new IntersectionObserver(n=>{n.forEach(a=>{a.isIntersecting&&t.forEach(c=>{c.classList.toggle("active",c.getAttribute("href")===`#${a.target.id}`)})})},{threshold:.4});i.forEach(n=>s.observe(n))}const p={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function y(){return`
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
    `),`<div class="store-badges">${o.join("")}</div>`}function v(e=p){const o=e.VITE_APP_STORE_LIVE==="true",r=e.VITE_GOOGLE_PLAY_LIVE==="true",t=o||r?b(e):y();["cta-container"].forEach(n=>{const a=document.getElementById(n);a&&(a.innerHTML=t)})}const E=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function _(e){return typeof e=="string"&&e.length>0&&e.length<=254&&E.test(e)}function w(){document.addEventListener("submit",async e=>{const o=e.target.closest("#waitlist-form");if(!o)return;e.preventDefault();const r=o.querySelector('input[type="email"]'),i=o.querySelector('button[type="submit"]'),t=document.getElementById("form-message");if(!r||!i)return;const s=r.value.trim();if(!_(s)){l(t,"Please enter a valid email address.","error"),r.focus();return}i.disabled=!0,i.textContent="Joining…",L(t);try{const a=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})})).json();a.status==="created"?(l(t,a.message,"success"),o.reset()):a.status==="duplicate"?l(t,a.message,"info"):l(t,a.message||"Something went wrong.","error")}catch{l(t,"Could not connect. Please try again later.","error")}finally{i.disabled=!1,i.textContent="Join the waitlist"}})}function l(e,o,r){e&&(e.textContent=o,e.className=`form-message form-message--${r}`)}function L(e){e&&(e.textContent="",e.className="form-message")}function S(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll(".feature-card, .testimonial-card, .hiw-card, [data-reveal]");if(!e.length)return;const o=new IntersectionObserver(r=>{r.forEach(i=>{i.isIntersecting&&(i.target.classList.add("visible"),o.unobserve(i.target))})},{threshold:.15});e.forEach(r=>o.observe(r))}function O(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__bg"),o=document.querySelector(".hero__content");if(!e)return;let r=!1;function i(){const t=window.scrollY,s=document.querySelector(".hero").offsetHeight,n=75+t*.02;if(e.style.backgroundPositionY=`${Math.min(n,95)}%`,o){const a=Math.min(t/(s*.6),1);o.style.opacity=1-a*.6,o.style.transform=`translateY(${-a*40}px)`}r=!1}window.addEventListener("scroll",()=>{r||(requestAnimationFrame(i),r=!0)},{passive:!0})}document.addEventListener("DOMContentLoaded",()=>{h(),v(),w(),S(),O()});
