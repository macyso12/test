(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();function h(){const e=document.querySelector("nav");if(e){const a=Array.from(document.querySelectorAll("[data-nav-bg]")),i=e.offsetHeight,l=()=>{let c=null;for(const m of a){const g=m.getBoundingClientRect();if(g.top<=i&&g.bottom>i){c=m;break}}c||(c=a[0]);const d=c.dataset.navBg||"transparent",u="navDark"in c.dataset;e.style.backgroundColor=d==="transparent"?"":d,e.style.borderBottomColor="transparent",e.classList.toggle("nav--scrolled",u&&d!=="transparent"),e.classList.toggle("nav--light",!u&&d!=="transparent"),d==="transparent"&&(e.classList.remove("nav--scrolled","nav--light"),e.style.backgroundColor="")};window.addEventListener("scroll",l,{passive:!0}),l()}const r=document.querySelector(".nav__hamburger"),s=document.getElementById("nav-links");r&&s&&(r.addEventListener("click",()=>{const a=s.classList.toggle("open");r.setAttribute("aria-expanded",String(a))}),s.querySelectorAll("a").forEach(a=>{a.addEventListener("click",()=>{s.classList.remove("open"),r.setAttribute("aria-expanded","false")})}));const o=document.querySelectorAll("main section[id]"),t=document.querySelectorAll('.nav__links a[href^="#"]');if(!o.length||!t.length)return;const n=new IntersectionObserver(a=>{a.forEach(i=>{i.isIntersecting&&t.forEach(l=>{l.classList.toggle("active",l.getAttribute("href")===`#${i.target.id}`)})})},{threshold:.4});o.forEach(a=>n.observe(a))}const p={BASE_URL:"/test/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function v(){return`
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
  `}function y(e){const r=[];return e.VITE_APP_STORE_URL&&r.push(`
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
    `),`<div class="store-badges">${r.join("")}</div>`}function b(e=p){const r=e.VITE_APP_STORE_LIVE==="true",s=e.VITE_GOOGLE_PLAY_LIVE==="true",t=r||s?y(e):v();["cta-container"].forEach(a=>{const i=document.getElementById(a);i&&(i.innerHTML=t)})}const E=/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;function L(e){return typeof e=="string"&&e.length>0&&e.length<=254&&E.test(e)}function _(){document.addEventListener("submit",async e=>{const r=e.target.closest("#waitlist-form");if(!r)return;e.preventDefault();const s=r.querySelector('input[type="email"]'),o=r.querySelector('button[type="submit"]'),t=document.getElementById("form-message");if(!s||!o)return;const n=s.value.trim();if(!L(n)){f(t,"Please enter a valid email address.","error"),s.focus();return}o.disabled=!0,o.textContent="Joining…",w(t);try{const i=await(await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n})})).json();i.status==="created"?(f(t,i.message,"success"),r.reset()):i.status==="duplicate"?f(t,i.message,"info"):f(t,i.message||"Something went wrong.","error")}catch{f(t,"Could not connect. Please try again later.","error")}finally{o.disabled=!1,o.textContent="Join the waitlist"}})}function f(e,r,s){e&&(e.textContent=r,e.className=`form-message form-message--${s}`)}function w(e){e&&(e.textContent="",e.className="form-message")}function S(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelectorAll("[data-reveal]");if(!e.length)return;e.forEach(s=>{const t=Array.from(s.parentElement.querySelectorAll("[data-reveal]")).indexOf(s);t>0&&(s.style.transitionDelay=`${t*.1}s`)});const r=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(o.target.classList.add("visible"),r.unobserve(o.target))})},{threshold:.12});e.forEach(s=>r.observe(s))}function A(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__bg"),r=document.querySelector(".hero__content");if(!e)return;let s=!1;function o(){const t=window.scrollY,n=document.querySelector(".hero").offsetHeight,a=75+t*.02;if(e.style.backgroundPositionY=`${Math.min(a,95)}%`,r){const i=Math.min(t/(n*.6),1);r.style.opacity=1-i*.6,r.style.transform=`translateY(${-i*40}px)`}s=!1}window.addEventListener("scroll",()=>{s||(requestAnimationFrame(o),s=!0)},{passive:!0})}document.addEventListener("DOMContentLoaded",()=>{h(),b(),_(),S(),A()});
