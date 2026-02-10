(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7702],{709:function(e,t,s){Promise.resolve().then(s.bind(s,7736))},7736:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return n}});var a=s(7437),r=s(2265),i=s(6986),o=s(4894);function n(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),[n,l]=(0,r.useState)({totalPatients:0,newPatients:0,limbSalvageRate:0,followUpCompliance:0,activeCenters:0});return((0,r.useEffect)(()=>{if(!s&&!t){window.location.href="/login";return}let e=async()=>{try{let e=localStorage.getItem("token"),t=await fetch("".concat("http://127.0.0.1:3001/api/v1","/national-dashboard/summary"),{headers:{Authorization:"Bearer ".concat(e)}});if(t.ok){let e=await t.json();l({totalPatients:e.totalPatients||0,newPatients:e.newPatients||0,limbSalvageRate:e.limbSalvageRate||0,followUpCompliance:e.followUpComplianceRate||0,activeCenters:e.activeCenters||0})}}catch(e){console.error("Error fetching dashboard data:",e)}};t&&e()},[t,s]),s||!t)?(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):(0,a.jsx)(o.A,{children:(0,a.jsxs)("main",{children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8",children:[(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Patients"}),(0,a.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:n.totalPatients.toLocaleString()})]})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"New Patients"}),(0,a.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:n.newPatients})]})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-purple-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Limb Salvage Rate"}),(0,a.jsxs)("p",{className:"text-2xl font-semibold text-gray-900",children:[n.limbSalvageRate,"%"]}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"WHO benchmark: 85%+"})]})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow",onClick:()=>window.location.href="/follow-up/compliance",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 rounded-lg ".concat(n.followUpCompliance>=90?"bg-emerald-100":"bg-yellow-100"),children:(0,a.jsx)("svg",{className:"h-6 w-6 ".concat(n.followUpCompliance>=90?"text-emerald-600":"text-yellow-600"),fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Follow-up Compliance"}),(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsxs)("p",{className:"text-2xl font-semibold text-gray-900",children:[n.followUpCompliance,"%"]}),n.followUpCompliance>=90&&(0,a.jsx)("span",{className:"px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-white rounded-full uppercase tracking-tighter",children:"Quality Data"})]}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"14-visit protocol"})]})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-indigo-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-indigo-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Active Centers"}),(0,a.jsxs)("p",{className:"text-2xl font-semibold text-gray-900",children:[n.activeCenters," / 21"]}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"National network"})]})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Quick Actions"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(null==e?void 0:e.role)&&["DATA_ENTRY","MEDICAL_OFFICER","CENTER_ADMIN","NATIONAL_ADMIN","SYSTEM_ADMIN","HEAD_OF_CENTER"].includes(e.role)&&(0,a.jsxs)("button",{onClick:()=>window.location.href="/patients/new",className:"flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",children:[(0,a.jsx)("svg",{className:"h-5 w-5 mr-2 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),"Add New Patient"]}),(null==e?void 0:e.role)&&["RESEARCHER","CENTER_ADMIN","NATIONAL_ADMIN","SYSTEM_ADMIN","HEAD_OF_CENTER","OBSERVER","DATA_ENTRY"].includes(e.role)&&(0,a.jsxs)("button",{onClick:()=>window.location.href="/reports",className:"flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",children:[(0,a.jsx)("svg",{className:"h-5 w-5 mr-2 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Generate Reports"]}),(null==e?void 0:e.role)&&["DATA_ENTRY","MEDICAL_OFFICER","RESEARCHER","CENTER_ADMIN","NATIONAL_ADMIN","SYSTEM_ADMIN","HEAD_OF_CENTER","OBSERVER"].includes(e.role)&&(0,a.jsxs)("button",{onClick:()=>window.location.href="/analytics",className:"flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",children:[(0,a.jsx)("svg",{className:"h-5 w-5 mr-2 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),"View Analytics"]})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Activity"}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-900",children:"Osteosarcoma case registered"}),(0,a.jsx)("p",{className:"text-xs text-gray-500",children:"2 hours ago • WHO Classification: 9180/3"})]}),(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full",children:"New Case"})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-900",children:"MSTS score calculated (24/30)"}),(0,a.jsx)("p",{className:"text-xs text-gray-500",children:"4 hours ago • Post-op functional assessment"})]}),(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full",children:"MSTS"})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-900",children:"Limb salvage procedure documented"}),(0,a.jsx)("p",{className:"text-xs text-gray-500",children:"6 hours ago • Enneking Stage IIB"})]}),(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full",children:"Surgery"})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-900",children:"CPC conference scheduled"}),(0,a.jsx)("p",{className:"text-xs text-gray-500",children:"8 hours ago • Multidisciplinary team discussion"})]}),(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full",children:"CPC"})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between py-3",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-900",children:"Follow-up visit completed"}),(0,a.jsx)("p",{className:"text-xs text-gray-500",children:"1 day ago • 6-month protocol visit"})]}),(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full",children:"Follow-up"})]})]})]})]})})}},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,r;s.d(t,{x7:function(){return eu},ZP:function(){return ep}});var i,o=s(2265);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let s="",a="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":a+="f"==i[1]?u(o,i):i+"{"+u(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=u(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=u.p?u.p(i,o):i+":"+o+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,r)=>{var i;let o=x(e),n=p[o]||(p[o]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);p[n]=u(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let l=s&&p.g?p.g:null;return s&&(p.g=p[n]),i=p[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),n},f=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function g(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?f(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,v,b,j=g.bind({k:1});function w(e,t){let s=this||{};return function(){let a=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;s.p=Object.assign({theme:v&&v()},n),s.o=/ *go\d+/.test(l),n.className=g.apply(s,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),y(d,n)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},A="default",M=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return M(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},_=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},R={},L=(e,t=A)=>{R[t]=M(R[t]||D,e),_.forEach(([e,s])=>{e===t&&s(R[t])})},I=e=>Object.keys(R).forEach(t=>L(e,t)),O=e=>Object.keys(R).find(t=>R[t].toasts.some(t=>t.id===e)),S=(e=A)=>t=>{L(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=(e={},t=A)=>{let[s,a]=(0,o.useState)(R[t]||D),r=(0,o.useRef)(R[t]);(0,o.useEffect)(()=>(r.current!==R[t]&&a(R[t]),_.push([t,a]),()=>{let e=_.findIndex(([e])=>e===t);e>-1&&_.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:i}},H=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||E()}),z=e=>(t,s)=>{let a=H(t,e,s);return S(a.toasterId||O(a.id))({type:2,toast:a}),a.id},$=(e,t)=>z("blank")(e,t);$.error=z("error"),$.success=z("success"),$.loading=z("loading"),$.custom=z("custom"),$.dismiss=(e,t)=>{let s={type:3,toastId:e};t?S(t)(s):I(s)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let s={type:4,toastId:e};t?S(t)(s):I(s)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,s)=>{let a=$.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?$.success(r,{id:a,...s,...null==s?void 0:s.success}):$.dismiss(a),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?$.error(r,{id:a,...s,...null==s?void 0:s.error}):$.dismiss(a)}),e};var F=1e3,B=(e,t="default")=>{let{toasts:s,pausedAt:a}=P(e,t),r=(0,o.useRef)(new Map).current,i=(0,o.useCallback)((e,t=F)=>{if(r.has(e))return;let s=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,s)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&$.dismiss(s.id);return}return setTimeout(()=>$.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,o.useCallback)(S(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,o.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),m=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,o.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}},W=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Y=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Q=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Z=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,q=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=j`
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
}`,J=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
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
`,K=w("div")`
  position: absolute;
`,X=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===s?null:o.createElement(X,null,o.createElement(Z,{...a}),"loading"!==s&&o.createElement(K,null,"error"===s?o.createElement(Y,{...a}):o.createElement(J,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=w("div")`
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
`,eo=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),er(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(es,{toast:e}),n=o.createElement(eo,{...e.ariaProps},k(e.message,e));return o.createElement(ei,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,u.p=void 0,y=i,v=void 0,b=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let i=o.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:i,className:t,style:s},r)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},em=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=B(s,i);return o.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let i=s.position||t,n=ec(i,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?em:"",style:n},"custom"===s.type?k(s.message,s):r?r(s):o.createElement(el,{toast:s,position:i}))}))},ep=$}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=709)}),_N_E=e.O()}]);