var v=Object.defineProperty;var L=(s,e,a)=>e in s?v(s,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[e]=a;var u=(s,e,a)=>(L(s,typeof e!="symbol"?e+"":e,a),a);import{a as S,i as f,S as b}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=a(t);fetch(t.href,i)}})();const r=class r{constructor(){this.query="Default",this.page=1,this.pageSize=40,this.totalResults=0}fetchImages(){const e=r.BASE_URL+r.END_POINT,a={key:"42078504-06c0bc861c70afe486d8727f6",q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",page:this.page,per_page:this.pageSize};return S.get(e,{params:a}).then(n=>n.data)}};u(r,"BASE_URL","https://pixabay.com"),u(r,"END_POINT","/api/");let m=r;const o=new m,p=document.querySelector(".gallery"),q=document.querySelector(".form"),l=document.querySelector(".loader"),d=document.querySelector(".load");q.addEventListener("submit",w);d.addEventListener("click",O);async function w(s){s.preventDefault(),l.classList.remove("is-hidden");const e=s.target.elements.imageDesc.value;o.query=e,o.page=1;const a=await o.fetchImages();if(a.totalHits===0){f.error({message:"Sorry, there are no images matching your search query. Please try again!!"});return}const n=g(a.hits);p.innerHTML=n,y.refresh(),d.classList.add("is-hidden"),o.totalResults=a.totalHits,h(),s.target.reset(),l.classList.add("is-hidden")}async function O(){l.classList.remove("is-hidden"),o.page+=1;const s=await o.fetchImages(),e=g(s.hits);p.insertAdjacentHTML("beforeend",e),window.scrollBy({top:500,behavior:"smooth"});const n=document.querySelector(".gallery-item").getBoundingClientRect();n.height=n.height*2,y.refresh(),h(),l.classList.add("is-hidden")}function h(){const s=Math.ceil(o.totalResults/o.pageSize);o.page>=s?(d.classList.add("is-hidden"),f.info({message:"We're sorry, but you've reached the end of search results."})):d.classList.remove("is-hidden")}function B({largeImageURL:s,webformatURL:e,tags:a,likes:n,views:t,comments:i,downloads:c}){return`<li class="gallery-item">
      <a href='${s}' class="galery-link">
  <img class="gallery-image" src="${e}" alt="${a}" loading="lazy" />

  <div class = info-container>

    <div class="info-item">
      <span class="info-name">Likes</span>
      <span class ="info-value">${n}</span>
    </div>

    <div class="info-item">
      <span class="info-name">Views</span>
      <span class ="info-value">${t}</span>
    </div>

    <div class="info-item">
      <span class="info-name">Comments</span>
      <span class ="info-value">${i}</span>
    </div>

    <div class="info-item">
      <span class="info-name">Downloads</span>
      <span class ="info-value">${c}</span>
    </div>
    </div>

  </a>
</li>
`}function g(s){return s.map(B).join("")}const y=new b(".gallery a",{captionDelay:"250"});
//# sourceMappingURL=commonHelpers.js.map
