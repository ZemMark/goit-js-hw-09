const t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};t.start.onclick=e=>{a=setInterval((()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.target.disabled=!0,t.stop.disabled&&(t.stop.disabled=!1)},t.stop.onclick=e=>{t.start.disabled&&(clearInterval(a),e.target.disabled=!0,t.start.disabled=!1)};let a=null;
//# sourceMappingURL=01-color-switcher.a7ef887a.js.map
