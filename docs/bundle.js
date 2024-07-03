(()=>{"use strict";const e=[{filename:"debug.html",description:"How to debug",lastModified:"2024-07-03 18:19"},{filename:"how_to_deploy_github_page.html",description:"Deploy on GitHub Pages",lastModified:"2024-07-03 17:54"},{filename:"how_to_git.html",description:"How to Git",lastModified:"2024-07-03 17:54"},{filename:"how_to_install.html",description:"How to install",lastModified:"2024-07-03 18:18"},{filename:"how_to_nextjs.html",description:"How to next JS",lastModified:"2024-07-03 18:18"},{filename:"how_to_webpack.html",description:"How to Use Webpack",lastModified:"2024-07-03 18:49"},{filename:"how_to_wordpress.html",description:"How to Wordpress",lastModified:"2024-07-03 18:18"},{filename:"index.html",description:"Documentation Index",lastModified:"2024-07-03 17:55"}];document.addEventListener("DOMContentLoaded",(function(){const t=document.getElementById("sidebar"),i=document.getElementById("search-input"),o=document.getElementById("search-button"),n=document.getElementById("search-results");o&&o.addEventListener("click",(function(){if(i&&i.value){const e=i.value.toLowerCase();!function(e){let t="";e.forEach((e=>{t+=`<li><a href="${e.filename}">${e.description}</a></li>`})),n.innerHTML=`<ul>${t}</ul>`}(files.filter((t=>t.description.toLowerCase().includes(e))))}})),function(){let i='\n            <a href="https://github.com/nathabee">\n            <img src="logo.png" alt="Logo">\n            </a>\n            <nav>\n        ',o="";e.forEach(((e,t)=>{"debug.html"===e.filename?o+=`<ul id="setbottom"><li><a href="${e.filename}">${e.description}</a></li></ul>`:i+=`<ul><li><a href="${e.filename}">${e.description}</a></li></ul>`})),i+=o,i+="</nav>",t.innerHTML=i}(),document.querySelectorAll(".collapsible").forEach((function(e){e.addEventListener("click",(function(){this.classList.toggle("active");var e=this.querySelector(".content");"block"===e.style.display?e.style.display="none":e.style.display="block"}))})),document.querySelectorAll("#main-content nav ul li a").forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault();var t=this.getAttribute("href").substring(1),i=document.getElementById(t);if(i&&i.classList.contains("collapsible")){var o=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});i.dispatchEvent(o),i.scrollIntoView({behavior:"smooth"})}}))})),console.log("DOMContentLoaded event fired"),e.sort(((e,t)=>new Date(t.lastModified)-new Date(e.lastModified))),console.log("Files sorted by last modified date:",e),function(e){const t=document.getElementById("last-modified-files");if(!t)return;let i="<ul>";e.forEach((e=>{i+=`<li><a href="${e.filename}">${e.description}</a> - ${e.lastModified}</li>`})),i+="</ul>",t.innerHTML=i}(e.slice(0,10))}))})();