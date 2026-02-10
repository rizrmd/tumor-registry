(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9141],{1955:function(e,t,a){Promise.resolve().then(a.bind(a,6356))},6356:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return d}});var s=a(7437),r=a(2265),i=a(4033),n=a(6986),o=a(4894),l=a(379);function d(){let{isAuthenticated:e,isLoading:t}=(0,n.useAuth)(),a=(0,i.useRouter)(),[d,c]=(0,r.useState)(!0),[u,p]=(0,r.useState)([]),[m,h]=(0,r.useState)(""),[f,x]=(0,r.useState)([]);(0,r.useEffect)(()=>{if(!t&&!e){a.push("/login");return}e&&g()},[e,t,a]),(0,r.useEffect)(()=>{b()},[m,u]);let g=async()=>{try{c(!0);let e=await l.Z.getPatients({page:1,limit:100,sortBy:"createdAt",sortOrder:"desc"});p(e.data||[]),x(e.data||[])}catch(e){console.error("Error loading patients:",e),p([]),x([])}finally{c(!1)}},b=()=>{if(!u||0===u.length){x([]);return}m?x(u.filter(e=>{var t,a,s,r;return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(m.toLowerCase()))||(null===(a=e.name)||void 0===a?void 0:a.toLowerCase().includes(m.toLowerCase()))||(null===(s=e.inamsosRecordNumber)||void 0===s?void 0:s.toLowerCase().includes(m.toLowerCase()))||(null===(r=e.hospitalRecordNumber)||void 0===r?void 0:r.toLowerCase().includes(m.toLowerCase()))})):x(u)};return t||d?(0,s.jsx)(o.A,{children:(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading patients..."})]})})}):(0,s.jsx)(o.A,{children:(0,s.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,s.jsxs)("div",{className:"mb-6",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"MSTS Score Calculator"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Select a patient to perform Musculoskeletal Tumor Society (MSTS) functional assessment"})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Search Patient"}),(0,s.jsx)("input",{type:"text",value:m,onChange:e=>h(e.target.value),placeholder:"Search by name or MR number...",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,s.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,s.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Patients (",(null==f?void 0:f.length)||0,")"]})}),f&&0!==f.length?(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"MR Number"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Date of Birth"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Gender"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Actions"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:f.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"text-sm text-gray-900",children:[e.inamsosRecordNumber,(0,s.jsx)("br",{}),(0,s.jsx)("span",{className:"text-xs text-gray-500",children:e.hospitalRecordNumber})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-600",children:new Date(e.dateOfBirth).toLocaleDateString("id-ID")})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-600",children:e.gender})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:(0,s.jsx)("button",{onClick:()=>a.push("/msts/calculator?patientId=".concat(e.id)),className:"px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"Calculate MSTS"})})]},e.id))})]})}):(0,s.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,s.jsx)("div",{className:"text-6xl mb-4",children:"\uD83D\uDC65"}),(0,s.jsx)("p",{className:"text-lg font-medium",children:"No patients found"}),(0,s.jsx)("p",{className:"text-sm mt-2",children:m?"Try adjusting your search query":"No patients available. Please add patients first."}),!m&&(0,s.jsx)("button",{onClick:()=>a.push("/patients/new"),className:"mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"Add New Patient"})]})]}),(0,s.jsx)("div",{className:"bg-emerald-50 border-l-4 border-emerald-400 rounded-lg p-4 mt-6 mb-4",children:(0,s.jsxs)("div",{className:"flex gap-3",children:[(0,s.jsx)("div",{className:"flex-shrink-0",children:(0,s.jsx)("span",{className:"text-2xl",children:"⭐"})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h4",{className:"text-sm font-semibold text-emerald-900 mb-1",children:"Pentingnya MSTS Assessment"}),(0,s.jsxs)("p",{className:"text-sm text-emerald-800",children:["MSTS Score adalah standar internasional untuk mengevaluasi keberhasilan pengobatan tumor muskuloskeletal. Penilaian ini penting untuk: ",(0,s.jsx)("strong",{children:"mengukur kualitas hidup pasien pasca-operasi"}),", ",(0,s.jsx)("strong",{children:"membandingkan efektivitas berbagai metode pengobatan"}),", dan ",(0,s.jsx)("strong",{children:"memprediksi outcome jangka panjang"}),". Data MSTS juga digunakan dalam publikasi penelitian dan peningkatan protokol klinis."]})]})]})}),(0,s.jsx)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:(0,s.jsxs)("div",{className:"flex gap-3",children:[(0,s.jsx)("div",{className:"flex-shrink-0",children:(0,s.jsx)("svg",{className:"w-6 h-6 text-blue-500",fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h4",{className:"text-sm font-semibold text-blue-900 mb-1",children:"About MSTS Assessment"}),(0,s.jsx)("p",{className:"text-sm text-blue-800",children:"The MSTS (Musculoskeletal Tumor Society) score is a standardized functional outcome measure for musculoskeletal tumor patients. It assesses 6 domains: Pain, Function, Emotional Acceptance, Hand Positioning, Manual Dexterity, and Lifting. Total score ranges from 0-30 points, with higher scores indicating better functional outcomes."})]})]})})]})})}},379:function(e,t,a){"use strict";var s=a(6383);class r{async createPatient(e){return(await s.Z.post("/patients",e)).data.data}async getPatients(e){var t;let a=await s.Z.get("/patients",{params:e});return{data:a.data.patients||[],meta:a.data.pagination||{page:1,limit:50,total:(null===(t=a.data.patients)||void 0===t?void 0:t.length)||0,totalPages:1}}}async getPatientById(e){return(await s.Z.get("/patients/".concat(e))).data}async getPatientByMRN(e,t){return(await s.Z.get("/patients/mrn/".concat(e),{params:{centerId:t}})).data.data}async updatePatient(e,t){return(await s.Z.patch("/patients/".concat(e),t)).data.data}async deletePatient(e){await s.Z.delete("/patients/".concat(e))}async searchPatients(e,t){return(await s.Z.get("/patients/search",{params:{q:e,centerId:t}})).data.data}async getPatientStatistics(e){return(await s.Z.get("/patients/statistics",{params:{centerId:e}})).data.data}async exportPatients(e,t){return(await s.Z.get("/patients/export/".concat(e),{params:t,responseType:"blob"})).data}}t.Z=new r},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return ep},ZP:function(){return em}});var i,n=a(2265);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?p(n,i):i+"{"+p(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=p(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=p.p?p.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},m={},h=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+h(e[a]);return t}return e},f=(e,t,a,s,r)=>{var i;let n=h(e),o=m[n]||(m[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!m[o]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);m[o]=p(r?{["@keyframes "+o]:t}:t,a?"":"."+o)}let l=a&&m.g?m.g:null;return a&&(m.g=m[o]),i=m[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),o},x=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function g(e){let t=this||{},a=e.call?e(t.p):e;return f(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let b,y,v,w=g.bind({k:1});function j(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let o=Object.assign({},i),l=o.className||r.className;a.p=Object.assign({theme:y&&y()},o),a.o=/ *go\d+/.test(l),o.className=g.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),b(d,o)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,S=(s=0,()=>(++s).toString()),C=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},E="default",P=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return P(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],M={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},T=(e,t=E)=>{A[t]=P(A[t]||M,e),D.forEach(([e,a])=>{e===t&&a(A[t])})},$=e=>Object.keys(A).forEach(t=>T(e,t)),L=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),O=(e=E)=>t=>{T(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={},t=E)=>{let[a,s]=(0,n.useState)(A[t]||M),r=(0,n.useRef)(A[t]);(0,n.useEffect)(()=>(r.current!==A[t]&&s(A[t]),D.push([t,s]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},R=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||S()}),Z=e=>(t,a)=>{let s=R(t,e,a);return O(s.toasterId||L(s.id))({type:2,toast:s}),s.id},_=(e,t)=>Z("blank")(e,t);_.error=Z("error"),_.success=Z("success"),_.loading=Z("loading"),_.custom=Z("custom"),_.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):$(a)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):$(a)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,a)=>{let s=_.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?_.success(r,{id:s,...a,...null==a?void 0:a.success}):_.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?_.error(r,{id:s,...a,...null==a?void 0:a.error}):_.dismiss(s)}),e};var B=1e3,H=(e,t="default")=>{let{toasts:a,pausedAt:s}=z(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=B)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),o({type:4,toastId:e})},t);r.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&_.dismiss(a.id);return}return setTimeout(()=>_.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let o=(0,n.useCallback)(O(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,n.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},F=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
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
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,K=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Q=w`
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
}`,V=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Q} 0.2s ease-out forwards;
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
`,W=j("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(J,{...s}),"loading"!==a&&n.createElement(W,null,"error"===a?n.createElement(G,{...s}):n.createElement(V,{...s})))},es=e=>`
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
`,en=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),o=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,p.p=void 0,b=i,y=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=H(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,o=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eu:"",style:o},"custom"===a.type?k(a.message,a):r?r(a):n.createElement(el,{toast:a,position:i}))}))},em=_}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=1955)}),_N_E=e.O()}]);