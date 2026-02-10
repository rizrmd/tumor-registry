exports.id=4786,exports.ids=[4786],exports.modules={2254:(e,t,a)=>{e.exports=a(4767)},9998:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var s=a(7530);class i{async create(e){return(await s.Z.post("/research-requests",e)).data}async update(e,t){return(await s.Z.patch(`/research-requests/${e}`,t)).data}async submit(e){return(await s.Z.post(`/research-requests/${e}/submit`)).data}async getAll(e){return(await s.Z.get("/research-requests",{params:e})).data}async findAll(e){return this.getAll(e)}async getPending(){return(await s.Z.get("/research-requests/pending")).data}async estimatePatients(e){return(await s.Z.post("/research-requests/estimate",e)).data}async getOne(e){return(await s.Z.get(`/research-requests/${e}`)).data}async approveOrReject(e,t){return(await s.Z.post(`/research-requests/${e}/approve`,t)).data}async delete(e){await s.Z.delete(`/research-requests/${e}`)}getPresetDataFields(e){return({basic_research:{demographics:{selected:!0,justification:"Basic demographics for patient characterization",subFields:{age:!0,gender:!0,region:!0}},diagnosisClassification:{selected:!0,justification:"Diagnosis and classification for tumor type analysis"},stagingData:{selected:!0,justification:"Staging data for disease severity assessment"}},outcome_study:{diagnosisClassification:{selected:!0,justification:"Diagnosis for outcome stratification"},stagingData:{selected:!0,justification:"Staging for baseline disease severity"},treatmentManagement:{selected:!0,justification:"Treatment details for outcome correlation"},followUpOutcomes:{selected:!0,justification:"Follow-up data and MSTS scores for outcome measurement"}},survival_analysis:{demographics:{selected:!0,justification:"Age and demographics as survival predictors",subFields:{age:!0,gender:!0}},diagnosisClassification:{selected:!0,justification:"Tumor type and grade for survival analysis"},stagingData:{selected:!0,justification:"Stage is primary survival predictor"},treatmentManagement:{selected:!0,justification:"Treatment modality affects survival"},followUpOutcomes:{selected:!0,justification:"Survival status and duration",subFields:{survivalStatus:!0,survivalDuration:!0}}},treatment_comparison:{diagnosisClassification:{selected:!0,justification:"Diagnosis for treatment stratification"},stagingData:{selected:!0,justification:"Baseline staging for comparison groups"},treatmentManagement:{selected:!0,justification:"Treatment details for comparison"},followUpOutcomes:{selected:!0,justification:"Outcomes for treatment effectiveness comparison"}}})[e]||{}}async generateExport(e){return(await s.Z.post(`/research-requests/${e}/generate-export`)).data}async getDownloadUrl(e){return(await s.Z.get(`/research-requests/${e}/download`)).data}async requestExtension(e,t,a){return(await s.Z.post(`/research-requests/${e}/request-extension`,{extensionMonths:t,justification:a})).data}}let r=new i},4669:(e,t,a)=>{"use strict";a.d(t,{x7:()=>ed,ZP:()=>eu});var s,i=a(3729);let r={data:""},o=e=>e||r,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let a="",s="",i="";for(let r in e){let o=e[r];"@"==r[0]?"i"==r[1]?a=r+" "+o+";":s+="f"==r[1]?d(o,r):r+"{"+d(o,"k"==r[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=o&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=d.p?d.p(r,o):r+":"+o+";")}return a+(t&&i?t+"{"+i+"}":i)+s},u={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e},m=(e,t,a,s,i)=>{let r=p(e),o=u[r]||(u[r]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(r));if(!u[o]){let t=r!==e?e:(e=>{let t,a,s=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(a=t[3].replace(c," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(c," ").trim();return s[0]})(e);u[o]=d(i?{["@keyframes "+o]:t}:t,a?"":"."+o)}let m=a&&u.g?u.g:null;return a&&(u.g=u[o]),((e,t,a,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(u[o],t,s,m),o},f=(e,t,a)=>e.reduce((e,s,i)=>{let r=t[i];if(r&&r.call){let e=r(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==r?"":r)},"");function g(e){let t=this||{},a=e.call?e(t.p):e;return m(a.unshift?a.raw?f(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,h,v,b=g.bind({k:1});function x(e,t){let a=this||{};return function(){let s=arguments;function i(r,o){let n=Object.assign({},r),l=n.className||i.className;a.p=Object.assign({theme:h&&h()},n),a.o=/ *go\d+/.test(l),n.className=g.apply(a,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(i):i}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,$=(()=>{let e=0;return()=>(++e).toString()})(),E=(()=>{let e;return()=>e})(),D="default",k=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return k(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},O=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},Z=(e,t=D)=>{A[t]=k(A[t]||C,e),O.forEach(([e,a])=>{e===t&&a(A[t])})},q=e=>Object.keys(A).forEach(t=>Z(e,t)),P=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),z=(e=D)=>t=>{Z(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},N=(e={},t=D)=>{let[a,s]=(0,i.useState)(A[t]||C),r=(0,i.useRef)(A[t]);(0,i.useEffect)(()=>(r.current!==A[t]&&s(A[t]),O.push([t,s]),()=>{let e=O.findIndex(([e])=>e===t);e>-1&&O.splice(e,1)}),[t]);let o=a.toasts.map(t=>{var a,s,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...a,toasts:o}},S=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||$()}),F=e=>(t,a)=>{let s=S(t,e,a);return z(s.toasterId||P(s.id))({type:2,toast:s}),s.id},T=(e,t)=>F("blank")(e,t);T.error=F("error"),T.success=F("success"),T.loading=F("loading"),T.custom=F("custom"),T.dismiss=(e,t)=>{let a={type:3,toastId:e};t?z(t)(a):q(a)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let a={type:4,toastId:e};t?z(t)(a):q(a)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,a)=>{let s=T.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?j(t.success,e):void 0;return i?T.success(i,{id:s,...a,...null==a?void 0:a.success}):T.dismiss(s),e}).catch(e=>{let i=t.error?j(t.error,e):void 0;i?T.error(i,{id:s,...a,...null==a?void 0:a.error}):T.dismiss(s)}),e};var M=1e3,U=(e,t="default")=>{let{toasts:a,pausedAt:s}=N(e,t),r=(0,i.useRef)(new Map).current,o=(0,i.useCallback)((e,t=M)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,a)},[]);(0,i.useEffect)(()=>{if(s)return;let e=Date.now(),i=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&T.dismiss(a.id);return}return setTimeout(()=>T.dismiss(a.id,t),s)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let n=(0,i.useCallback)(z(t),[t]),l=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,i.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:i=8,defaultPosition:r}=t||{},o=a.filter(t=>(t.position||r)===(e.position||r)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[a]);return(0,i.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},L=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,_=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${H} 0.15s ease-out forwards;
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
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,G=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=b`
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
}`,K=x("div")`
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
`,Q=x("div")`
  position: absolute;
`,V=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?i.createElement(X,null,t):t:"blank"===a?null:i.createElement(V,null,i.createElement(Y,{...s}),"loading"!==a&&i.createElement(Q,null,"error"===a?i.createElement(_,{...s}):i.createElement(K,{...s})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=x("div")`
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
`,ei=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,er=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(a),ea(a)];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=i.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?er(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(ee,{toast:e}),n=i.createElement(ei,{...e.ariaProps},j(e.message,e));return i.createElement(es,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});s=i.createElement,d.p=void 0,y=s,h=void 0,v=void 0;var en=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let o=i.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return i.createElement("div",{ref:o,className:t,style:a},r)},el=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},ec=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=U(a,o);return i.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let o=a.position||t,n=el(o,d.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return i.createElement(en,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?ec:"",style:n},"custom"===a.type?j(a.message,a):r?r(a):i.createElement(eo,{toast:a,position:o}))}))},eu=T}};