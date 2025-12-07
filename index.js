import{a as u,S as y,i as n}from"./assets/vendor-CxL-4rjn.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="53431502-05bc1324bd266ac6e07fa7d19";u.defaults.baseURL="https://pixabay.com/api/";async function h(i){const r={key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0};return u.get("/",{params:r}).then(o=>o.data)}const d=document.querySelector(".gallery"),f=document.querySelector(".loader"),b=new y(".gallery a",{captionsData:"alt",captionDelay:250});function L(i){const r=i.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:s,comments:p,downloads:m})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${a}">
            <img class="gallery-image" src="${o}" alt="${e}" />
            </a>
            <div class="info">
            <p><b>Likes</b> ${t}</p>
            <p><b>Views</b> ${s}</p>
            <p><b>Comments</b> ${p}</p>
            <p><b>Downloads</b> ${m}</p>
            </div>
        </li>`).join("");d.insertAdjacentHTML("beforeend",r),b.refresh()}function c(){d.innerHTML=""}function q(){f.classList.remove("is-hidden")}function w(){f.classList.add("is-hidden")}const l=document.querySelector(".form");l.addEventListener("submit",async i=>{i.preventDefault();const r=i.target.elements["search-text"].value.trim();if(!r){n.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}c(),q();try{const o=await h(r);if(o.hits.length===0){c(),n.info({title:"Pictures not found",message:"Try another query",position:"topRight"});return}L(o.hits)}catch(o){console.error(o),n.error({title:"Error",message:"An error occurred while loading. Please try again later.",position:"topRight"})}finally{w(),l.reset()}});
//# sourceMappingURL=index.js.map
