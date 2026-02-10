(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3708],{2898:function(e,t,a){"use strict";a.d(t,{Z:function(){return o}});var s=a(2265),r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),o=(e,t)=>{let a=(0,s.forwardRef)(({color:a="currentColor",size:o=24,strokeWidth:n=2,absoluteStrokeWidth:l,className:d="",children:c,...u},m)=>(0,s.createElement)("svg",{ref:m,...r,width:o,height:o,stroke:a,strokeWidth:l?24*Number(n)/Number(o):n,className:["lucide",`lucide-${i(e)}`,d].join(" "),...u},[...t.map(([e,t])=>(0,s.createElement)(e,t)),...Array.isArray(c)?c:[c]]));return a.displayName=`${e}`,a}},6637:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(2898).Z)("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]])},6137:function(e,t,a){Promise.resolve().then(a.bind(a,5115))},5115:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return x}});var s=a(7437),r=a(2265),i=a(6986),o=a(4894),n=a(6383);class l{async getLogs(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(await n.Z.get("/activity-logs",{params:e})).data}}var d=new l,c=a(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let u=(0,c.Z)("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]);var m=a(6637);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let p=(0,c.Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);function x(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),[n,l]=(0,r.useState)([]),[c,x]=(0,r.useState)(0),[f,h]=(0,r.useState)(!0),[y,g]=(0,r.useState)(null),[b,v]=(0,r.useState)(1),[w,j]=(0,r.useState)(void 0),[k,N]=(0,r.useState)(void 0);(0,r.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&E()},[t,a,b,w,k]);let E=async()=>{try{h(!0);let e=await d.getLogs({page:b,limit:20,centerId:w,actorId:k});l(e.data),x(e.total)}catch(t){var e;console.error("Failed to fetch logs:",t),(null===(e=t.response)||void 0===e?void 0:e.status)===403?g("Anda tidak memiliki izin untuk melihat log aktivitas."):g("Gagal memuat log aktivitas.")}finally{h(!1)}},C=e=>{v(e)},$=Math.ceil(c/20);return a?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"})}):(0,s.jsxs)(o.A,{children:[(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsxs)("h1",{className:"text-2xl font-bold text-gray-900 flex items-center",children:[(0,s.jsx)(u,{className:"mr-2 h-6 w-6 text-gray-700"}),"Audit Logs"]}),(0,s.jsx)("p",{className:"text-gray-600 mt-1",children:"Riwayat aktivitas dan perubahan data dalam sistem."})]}),y&&(0,s.jsx)("div",{className:"bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200",children:y}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow border overflow-hidden",children:f&&0===n.length?(0,s.jsxs)("div",{className:"p-8 text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-2 text-gray-500",children:"Memuat log..."})]}):0===n.length?(0,s.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,s.jsx)(m.Z,{className:"h-12 w-12 mx-auto text-gray-300 mb-4"}),(0,s.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:"Tidak ada aktivitas"}),(0,s.jsx)("p",{children:"Belum ada log aktivitas yang tercatat."})]}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Waktu"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aktor"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aktivitas"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Detail"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Pusat"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:n.map(e=>{var t;return(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)(p,{className:"h-4 w-4 mr-2 text-gray-400"}),new Date(e.createdAt).toLocaleString("id-ID")]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:e.actor?(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.actor.name}),(0,s.jsx)("div",{className:"text-xs text-gray-500",children:e.actor.email})]}):(0,s.jsx)("span",{className:"text-sm text-gray-400 italic",children:"System / Unknown"})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800",children:e.action})}),(0,s.jsxs)("td",{className:"px-6 py-4",children:[(0,s.jsx)("div",{className:"text-sm text-gray-900",children:(null===(t=e.changesAfter)||void 0===t?void 0:t.description)||e.description||"-"}),e.entity&&(0,s.jsxs)("div",{className:"text-xs text-gray-500 mt-0.5",children:["Entity: ",e.entity," (",e.entityId,")"]})]}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:e.center?e.center.name:"-"})]},e.id)})})]})}),(0,s.jsxs)("div",{className:"px-6 py-4 border-t border-gray-200 flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"text-sm text-gray-500",children:["Menampilkan ",(b-1)*20+1," sampai ",Math.min(20*b,c)," dari ",c," entri"]}),(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("button",{onClick:()=>C(Math.max(1,b-1)),disabled:1===b,className:"px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 text-sm",children:"Sebelumnya"}),(0,s.jsxs)("span",{className:"px-3 py-1 text-sm font-medium",children:["Halaman ",b," / ",$]}),(0,s.jsx)("button",{onClick:()=>C(Math.min($,b+1)),disabled:b>=$,className:"px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 text-sm",children:"Selanjutnya"})]})]})]})})]})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return em},ZP:function(){return ep}});var i,o=a(2265);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",s="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":s+="f"==i[1]?m(o,i):i+"{"+m(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=m(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,o):i+":"+o+";")}return a+(t&&r?t+"{"+r+"}":r)+s},p={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},f=(e,t,a,s,r)=>{var i;let o=x(e),n=p[o]||(p[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);p[n]=m(r?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&p.g?p.g:null;return a&&(p.g=p[n]),i=p[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),n},h=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function y(e){let t=this||{},a=e.call?e(t.p):e;return f(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let g,b,v,w=y.bind({k:1});function j(e,t){let a=this||{};return function(){let s=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;a.p=Object.assign({theme:b&&b()},n),a.o=/ *go\d+/.test(l),n.className=y.apply(a,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),g(d,n)}return t?t(r):r}}var k=e=>"function"==typeof e,N=(e,t)=>k(e)?e(t):e,E=(s=0,()=>(++s).toString()),C=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},$="default",A=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return A(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],S={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},O={},I=(e,t=$)=>{O[t]=A(O[t]||S,e),D.forEach(([e,a])=>{e===t&&a(O[t])})},z=e=>Object.keys(O).forEach(t=>I(e,t)),L=e=>Object.keys(O).find(t=>O[t].toasts.some(t=>t.id===e)),M=(e=$)=>t=>{I(t,e)},_={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=(e={},t=$)=>{let[a,s]=(0,o.useState)(O[t]||S),r=(0,o.useRef)(O[t]);(0,o.useEffect)(()=>(r.current!==O[t]&&s(O[t]),D.push([t,s]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||_[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},Z=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),T=e=>(t,a)=>{let s=Z(t,e,a);return M(s.toasterId||L(s.id))({type:2,toast:s}),s.id},F=(e,t)=>T("blank")(e,t);F.error=T("error"),F.success=T("success"),F.loading=T("loading"),F.custom=T("custom"),F.dismiss=(e,t)=>{let a={type:3,toastId:e};t?M(t)(a):z(a)},F.dismissAll=e=>F.dismiss(void 0,e),F.remove=(e,t)=>{let a={type:4,toastId:e};t?M(t)(a):z(a)},F.removeAll=e=>F.remove(void 0,e),F.promise=(e,t,a)=>{let s=F.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?N(t.success,e):void 0;return r?F.success(r,{id:s,...a,...null==a?void 0:a.success}):F.dismiss(s),e}).catch(e=>{let r=t.error?N(t.error,e):void 0;r?F.error(r,{id:s,...a,...null==a?void 0:a.error}):F.dismiss(s)}),e};var H=1e3,R=(e,t="default")=>{let{toasts:a,pausedAt:s}=P(e,t),r=(0,o.useRef)(new Map).current,i=(0,o.useCallback)((e,t=H)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,a)},[]);(0,o.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&F.dismiss(a.id);return}return setTimeout(()=>F.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let n=(0,o.useCallback)(M(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,o.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},o=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,o.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},B=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,V=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,q=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,G=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${q} 1s linear infinite;
`,Y=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${J} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Q=j("div")`
  position: absolute;
`,X=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===a?null:o.createElement(X,null,o.createElement(G,{...s}),"loading"!==a&&o.createElement(Q,null,"error"===a?o.createElement(V,{...s}):o.createElement(K,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(ea,{toast:e}),n=o.createElement(eo,{...e.ariaProps},N(e.message,e));return o.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,m.p=void 0,g=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=o.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return o.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=R(a,i);return o.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,n=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return o.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eu:"",style:n},"custom"===a.type?N(a.message,a):r?r(a):o.createElement(el,{toast:a,position:i}))}))},ep=F}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=6137)}),_N_E=e.O()}]);