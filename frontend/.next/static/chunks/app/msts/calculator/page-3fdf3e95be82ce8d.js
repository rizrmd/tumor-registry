(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2884],{9643:function(e,t,a){Promise.resolve().then(a.bind(a,9794))},9794:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return p}});var s=a(7437),r=a(2265),i=a(4033),o=a(6986),n=a(1113),l=a(4894),c=a(379),d=a(7071);function u(){let e=(0,i.useSearchParams)(),t=(0,i.useRouter)(),{isAuthenticated:a,isLoading:l}=(0,o.useAuth)(),[u,p]=(0,r.useState)(!0),[m,f]=(0,r.useState)(null),[h,g]=(0,r.useState)([]),y=e.get("patientId");(0,r.useEffect)(()=>{if(!l&&!a){t.push("/login");return}a&&(y?(x(),b()):t.push("/msts"))},[a,l,y,t]);let x=async()=>{if(y)try{p(!0);let e=await c.Z.getPatientById(y);f(e)}catch(e){console.error("Error loading patient:",e),alert("Failed to load patient data"),t.push("/msts")}finally{p(!1)}},b=async()=>{if(y)try{let e=await d.Z.getPatientHistory(y);g(e.scores||[])}catch(e){console.error("Error loading MSTS history:",e),g([])}},v=async e=>{console.log("MSTS score saved with ID:",e),await b()};return l||u?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading patient data..."})]})}):m&&y?(0,s.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,s.jsx)("div",{className:"mb-6 flex items-center justify-between",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("button",{onClick:()=>t.push("/msts"),className:"text-blue-600 hover:text-blue-700 font-medium mb-2 flex items-center",children:"← Back to Patient Selection"}),(0,s.jsxs)("h1",{className:"text-2xl font-bold text-gray-900",children:["MSTS Score Calculator - ",m.name]}),(0,s.jsxs)("p",{className:"text-gray-600",children:["MR Number: ",m.hospitalRecordNumber]})]})}),h&&h.length>0&&(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Previous Assessments"}),(0,s.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:h.slice(0,3).map(e=>(0,s.jsxs)("div",{className:"border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-2",children:[(0,s.jsx)("span",{className:"text-xs text-gray-500",children:new Date(e.assessmentDate).toLocaleDateString("id-ID")}),(0,s.jsxs)("span",{className:"text-lg font-bold text-blue-600",children:[e.totalScore,"/30"]})]}),(0,s.jsxs)("p",{className:"text-xs text-gray-600",children:["By: ",e.assessedBy]})]},e.id))}),h.length>3&&(0,s.jsxs)("button",{onClick:()=>t.push("/patients/view?id=".concat(y)),className:"mt-4 text-sm text-blue-600 hover:text-blue-700",children:["View all ",h.length," assessments →"]})]}),(0,s.jsx)(n.K,{patientId:y,patientName:m.name,autoSave:!0,onSave:v})]}):(0,s.jsxs)("div",{className:"text-center py-12",children:[(0,s.jsx)("p",{className:"text-red-600",children:"Patient not found"}),(0,s.jsx)("button",{onClick:()=>t.push("/msts"),className:"mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg",children:"Back to Patient Selection"})]})}function p(){return(0,s.jsx)(l.A,{children:(0,s.jsx)(r.Suspense,{fallback:(0,s.jsx)("div",{children:"Loading..."}),children:(0,s.jsx)(u,{})})})}},379:function(e,t,a){"use strict";var s=a(6383);class r{async createPatient(e){return(await s.Z.post("/patients",e)).data.data}async getPatients(e){var t;let a=await s.Z.get("/patients",{params:e});return{data:a.data.patients||[],meta:a.data.pagination||{page:1,limit:50,total:(null===(t=a.data.patients)||void 0===t?void 0:t.length)||0,totalPages:1}}}async getPatientById(e){return(await s.Z.get("/patients/".concat(e))).data}async getPatientByMRN(e,t){return(await s.Z.get("/patients/mrn/".concat(e),{params:{centerId:t}})).data.data}async updatePatient(e,t){return(await s.Z.patch("/patients/".concat(e),t)).data.data}async deletePatient(e){await s.Z.delete("/patients/".concat(e))}async searchPatients(e,t){return(await s.Z.get("/patients/search",{params:{q:e,centerId:t}})).data.data}async getPatientStatistics(e){return(await s.Z.get("/patients/statistics",{params:{centerId:e}})).data.data}async exportPatients(e,t){return(await s.Z.get("/patients/export/".concat(e),{params:t,responseType:"blob"})).data}}t.Z=new r},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return ep},ZP:function(){return em}});var i,o=a(2265);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let a="",s="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":s+="f"==i[1]?p(o,i):i+"{"+p(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=p(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=p.p?p.p(i,o):i+":"+o+";")}return a+(t&&r?t+"{"+r+"}":r)+s},m={},f=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+f(e[a]);return t}return e},h=(e,t,a,s,r)=>{var i;let o=f(e),n=m[o]||(m[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!m[n]){let t=o!==e?e:(e=>{let t,a,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);m[n]=p(r?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&m.g?m.g:null;return a&&(m.g=m[n]),i=m[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),n},g=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function y(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let x,b,v,w=y.bind({k:1});function j(e,t){let a=this||{};return function(){let s=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;a.p=Object.assign({theme:b&&b()},n),a.o=/ *go\d+/.test(l),n.className=y.apply(a,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),x(c,n)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(s=0,()=>(++s).toString()),P=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},S="default",C=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return C(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],$={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},O=(e,t=S)=>{I[t]=C(I[t]||$,e),D.forEach(([e,a])=>{e===t&&a(I[t])})},A=e=>Object.keys(I).forEach(t=>O(e,t)),Z=e=>Object.keys(I).find(t=>I[t].toasts.some(t=>t.id===e)),_=(e=S)=>t=>{O(t,e)},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={},t=S)=>{let[a,s]=(0,o.useState)(I[t]||$),r=(0,o.useRef)(I[t]);(0,o.useEffect)(()=>(r.current!==I[t]&&s(I[t]),D.push([t,s]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||M[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},L=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),T=e=>(t,a)=>{let s=L(t,e,a);return _(s.toasterId||Z(s.id))({type:2,toast:s}),s.id},B=(e,t)=>T("blank")(e,t);B.error=T("error"),B.success=T("success"),B.loading=T("loading"),B.custom=T("custom"),B.dismiss=(e,t)=>{let a={type:3,toastId:e};t?_(t)(a):A(a)},B.dismissAll=e=>B.dismiss(void 0,e),B.remove=(e,t)=>{let a={type:4,toastId:e};t?_(t)(a):A(a)},B.removeAll=e=>B.remove(void 0,e),B.promise=(e,t,a)=>{let s=B.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?B.success(r,{id:s,...a,...null==a?void 0:a.success}):B.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?B.error(r,{id:s,...a,...null==a?void 0:a.error}):B.dismiss(s)}),e};var R=1e3,F=(e,t="default")=>{let{toasts:a,pausedAt:s}=z(e,t),r=(0,o.useRef)(new Map).current,i=(0,o.useCallback)((e,t=R)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,a)},[]);(0,o.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&B.dismiss(a.id);return}return setTimeout(()=>B.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let n=(0,o.useCallback)(_(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,o.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},o=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,o.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},H=w`
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
}`,K=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,V=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${V} 1s linear infinite;
`,G=w`
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
}`,Q=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===a?null:o.createElement(X,null,o.createElement(Y,{...s}),"loading"!==a&&o.createElement(W,null,"error"===a?o.createElement(K,{...s}):o.createElement(Q,{...s})))},es=e=>`
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
`,en=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=P()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(ea,{toast:e}),n=o.createElement(eo,{...e.ariaProps},k(e.message,e));return o.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,p.p=void 0,x=i,b=void 0,v=void 0;var ec=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=o.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return o.createElement("div",{ref:i,className:t,style:a},r)},ed=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=F(a,i);return o.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let i=a.position||t,n=ed(i,d.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return o.createElement(ec,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?eu:"",style:n},"custom"===a.type?k(a.message,a):r?r(a):o.createElement(el,{toast:a,position:i}))}))},em=B}},function(e){e.O(0,[1176,4829,1956,4894,7409,2971,4938,1744],function(){return e(e.s=9643)}),_N_E=e.O()}]);