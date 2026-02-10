(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8132],{525:function(e,t,o){"use strict";function i(){localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="/login"}async function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=localStorage.getItem("token"),a={"Content-Type":"application/json",...t.headers};o&&(a.Authorization="Bearer ".concat(o));let r=await fetch("".concat("http://127.0.0.1:3001/api/v1").concat(e),{...t,headers:a});if(!r.ok){var s,n;if(401===r.status)throw i(),Error("Session expired. Please login again.");let e=await r.json().catch(()=>({message:"HTTP ".concat(r.status,": ").concat(r.statusText)}));if(400===r.status&&(null===(n=e.error)||void 0===n?void 0:null===(s=n.details)||void 0===s?void 0:s.some(e=>"Unauthorized"===e.message)))throw i(),Error("Session expired. Please login again.");throw Error(e.message||"API request failed")}return r.json()}async function r(e){return a("/patients",{method:"POST",body:JSON.stringify(e)})}async function s(e,t){return a("/patients/".concat(e),{method:"PATCH",body:JSON.stringify(t)})}async function n(e){return a("/patients/".concat(e))}async function l(e){let t=new URLSearchParams;return(null==e?void 0:e.page)&&t.append("page",e.page.toString()),(null==e?void 0:e.limit)&&t.append("limit",e.limit.toString()),(null==e?void 0:e.search)&&t.append("search",e.search),(null==e?void 0:e.centerId)&&t.append("centerId",e.centerId),a("/patients?".concat(t.toString()))}async function c(e){return a("/patients/".concat(e),{method:"DELETE"})}o.d(t,{X4:function(){return l}}),t.ZP={create:r,update:s,getById:n,getAll:l,delete:c,transformWizardData:function(e){let t=e.section1||{},o=e.section2||{},i=e.section3||{},a=e.section4||{},r=e.section5||{},s=e.section6||{},n=e.section7||{},l=e.section8||{},c=e.section9||{};return{centerId:t.centerId||"",pathologyType:t.pathologyTypeId,hospitalRecordNumber:o.hospitalRecordNumber||"MR-".concat(Date.now()),nik:o.nik||"",name:o.name||"",dateOfBirth:o.dateOfBirth||"",placeOfBirth:o.placeOfBirth,gender:o.gender||"",bloodType:o.bloodType,religion:o.religion,maritalStatus:o.maritalStatus,occupation:o.occupation,education:o.education,phone:o.phone,email:o.email,address:o.address,province:o.province,regency:o.regency,district:o.district,village:o.village,postalCode:o.postalCode,emergencyContact:o.emergencyContact,chiefComplaint:i.chiefComplaint,symptomOnset:i.symptomOnset,symptomDuration:i.symptomDuration,symptomDurationUnit:i.symptomDurationUnit,presentingSymptoms:i.presentingSymptoms,tumorSize:i.tumorSize,familyHistory:i.familyHistory,tumorSyndromeId:i.tumorSyndromeId,karnofskyScore:i.karnofskyScore,height:i.height,weight:i.weight,bmi:i.bmi,biopsyType:a.biopsyType,biopsyDate:a.biopsyDate,biopsyLocation:a.biopsyLocation,biopsySite:a.biopsySite,imagingStudies:a.imagingStudies,imagingDate:a.imagingDate,imagingFindings:a.imagingFindings,mirrelScore:a.mirrelScore,diagnosisDate:r.diagnosisDate,whoClassificationId:r.whoClassificationId,boneLocationId:r.boneLocationId,softTissueLocationId:r.softTissueLocationId,tumorGrade:r.tumorGrade,histopathology:r.histopathology,stagingSystem:s.stagingSystem,enneking:s.enneking,ajcc:s.ajcc,cpc:n.cpcHeld?{held:n.cpcHeld,date:n.cpcDate,location:n.cpcLocation,participants:n.participants,presentation:n.casePresentation,recommendations:n.recommendations,consensus:n.consensus,notes:n.notes}:void 0,treatment:{surgery:l.surgery,chemotherapy:l.chemotherapy,radiotherapy:l.radiotherapy,overallResponse:l.overallResponse},followUp:{visits:c.visits}}}}},4033:function(e,t,o){e.exports=o(5313)},5925:function(e,t,o){"use strict";let i,a;o.d(t,{x7:function(){return eu},ZP:function(){return em}});var r,s=o(2265);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,p=/\n+/g,u=(e,t)=>{let o="",i="",a="";for(let r in e){let s=e[r];"@"==r[0]?"i"==r[1]?o=r+" "+s+";":i+="f"==r[1]?u(s,r):r+"{"+u(s,"k"==r[1]?"":t)+"}":"object"==typeof s?i+=u(s,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=s&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=u.p?u.p(r,s):r+":"+s+";")}return o+(t&&a?t+"{"+a+"}":a)+i},m={},f=e=>{if("object"==typeof e){let t="";for(let o in e)t+=o+f(e[o]);return t}return e},g=(e,t,o,i,a)=>{var r;let s=f(e),n=m[s]||(m[s]=(e=>{let t=0,o=11;for(;t<e.length;)o=101*o+e.charCodeAt(t++)>>>0;return"go"+o})(s));if(!m[n]){let t=s!==e?e:(e=>{let t,o,i=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?i.shift():t[3]?(o=t[3].replace(p," ").trim(),i.unshift(i[0][o]=i[0][o]||{})):i[0][t[1]]=t[2].replace(p," ").trim();return i[0]})(e);m[n]=u(a?{["@keyframes "+n]:t}:t,o?"":"."+n)}let l=o&&m.g?m.g:null;return o&&(m.g=m[n]),r=m[n],l?t.data=t.data.replace(l,r):-1===t.data.indexOf(r)&&(t.data=i?r+t.data:t.data+r),n},y=(e,t,o)=>e.reduce((e,i,a)=>{let r=t[a];if(r&&r.call){let e=r(o),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+i+(null==r?"":r)},"");function h(e){let t=this||{},o=e.call?e(t.p):e;return g(o.unshift?o.raw?y(o,[].slice.call(arguments,1),t.p):o.reduce((e,o)=>Object.assign(e,o&&o.call?o(t.p):o),{}):o,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let b,v,x,w=h.bind({k:1});function k(e,t){let o=this||{};return function(){let i=arguments;function a(r,s){let n=Object.assign({},r),l=n.className||a.className;o.p=Object.assign({theme:v&&v()},n),o.o=/ *go\d+/.test(l),n.className=h.apply(o,i)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),x&&c[0]&&x(n),b(c,n)}return t?t(a):a}}var S=e=>"function"==typeof e,E=(e,t)=>S(e)?e(t):e,I=(i=0,()=>(++i).toString()),D=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},C="default",O=(e,t)=>{let{toastLimit:o}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,o)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:i}=t;return O(e,{type:e.toasts.find(e=>e.id===i.id)?1:0,toast:i});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},T=[],j={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},N=(e,t=C)=>{$[t]=O($[t]||j,e),T.forEach(([e,o])=>{e===t&&o($[t])})},P=e=>Object.keys($).forEach(t=>N(e,t)),z=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),A=(e=C)=>t=>{N(t,e)},L={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=(e={},t=C)=>{let[o,i]=(0,s.useState)($[t]||j),a=(0,s.useRef)($[t]);(0,s.useEffect)(()=>(a.current!==$[t]&&i($[t]),T.push([t,i]),()=>{let e=T.findIndex(([e])=>e===t);e>-1&&T.splice(e,1)}),[t]);let r=o.toasts.map(t=>{var o,i,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(o=e[t.type])?void 0:o.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||L[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...o,toasts:r}},_=(e,t="blank",o)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(null==o?void 0:o.id)||I()}),R=e=>(t,o)=>{let i=_(t,e,o);return A(i.toasterId||z(i.id))({type:2,toast:i}),i.id},B=(e,t)=>R("blank")(e,t);B.error=R("error"),B.success=R("success"),B.loading=R("loading"),B.custom=R("custom"),B.dismiss=(e,t)=>{let o={type:3,toastId:e};t?A(t)(o):P(o)},B.dismissAll=e=>B.dismiss(void 0,e),B.remove=(e,t)=>{let o={type:4,toastId:e};t?A(t)(o):P(o)},B.removeAll=e=>B.remove(void 0,e),B.promise=(e,t,o)=>{let i=B.loading(t.loading,{...o,...null==o?void 0:o.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?E(t.success,e):void 0;return a?B.success(a,{id:i,...o,...null==o?void 0:o.success}):B.dismiss(i),e}).catch(e=>{let a=t.error?E(t.error,e):void 0;a?B.error(a,{id:i,...o,...null==o?void 0:o.error}):B.dismiss(i)}),e};var F=1e3,M=(e,t="default")=>{let{toasts:o,pausedAt:i}=H(e,t),a=(0,s.useRef)(new Map).current,r=(0,s.useCallback)((e,t=F)=>{if(a.has(e))return;let o=setTimeout(()=>{a.delete(e),n({type:4,toastId:e})},t);a.set(e,o)},[]);(0,s.useEffect)(()=>{if(i)return;let e=Date.now(),a=o.map(o=>{if(o.duration===1/0)return;let i=(o.duration||0)+o.pauseDuration-(e-o.createdAt);if(i<0){o.visible&&B.dismiss(o.id);return}return setTimeout(()=>B.dismiss(o.id,t),i)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[o,i,t]);let n=(0,s.useCallback)(A(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,s.useCallback)(()=>{i&&n({type:6,time:Date.now()})},[i,n]),p=(0,s.useCallback)((e,t)=>{let{reverseOrder:i=!1,gutter:a=8,defaultPosition:r}=t||{},s=o.filter(t=>(t.position||r)===(e.position||r)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[o]);return(0,s.useEffect)(()=>{o.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[o,r]),{toasts:o,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:p}}},U=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Z=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Z} 0.15s ease-out forwards;
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
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,J=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,W=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${J} 1s linear infinite;
`,X=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Y=w`
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
}`,K=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${X} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Y} 0.2s ease-out forwards;
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
`,Q=k("div")`
  position: absolute;
`,V=k("div")`
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
}`,et=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,eo=({toast:e})=>{let{icon:t,type:o,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(et,null,t):t:"blank"===o?null:s.createElement(V,null,s.createElement(W,{...i}),"loading"!==o&&s.createElement(Q,null,"error"===o?s.createElement(G,{...i}):s.createElement(K,{...i})))},ei=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=k("div")`
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
`,es=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let o=e.includes("top")?1:-1,[i,a]=D()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ei(o),ea(o)];return{animation:t?`${w(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=s.memo(({toast:e,position:t,style:o,children:i})=>{let a=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},r=s.createElement(eo,{toast:e}),n=s.createElement(es,{...e.ariaProps},E(e.message,e));return s.createElement(er,{className:e.className,style:{...a,...o,...e.style}},"function"==typeof i?i({icon:r,message:n}):s.createElement(s.Fragment,null,r,n))});r=s.createElement,u.p=void 0,b=r,v=void 0,x=void 0;var ec=({id:e,className:t,style:o,onHeightUpdate:i,children:a})=>{let r=s.useCallback(t=>{if(t){let o=()=>{i(e,t.getBoundingClientRect().height)};o(),new MutationObserver(o).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return s.createElement("div",{ref:r,className:t,style:o},a)},ed=(e,t)=>{let o=e.includes("top"),i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:D()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...i}},ep=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:o,gutter:i,children:a,toasterId:r,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=M(o,r);return s.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(o=>{let r=o.position||t,n=ed(r,d.calculateOffset(o,{reverseOrder:e,gutter:i,defaultPosition:t}));return s.createElement(ec,{id:o.id,key:o.id,onHeightUpdate:d.updateHeight,className:o.visible?ep:"",style:n},"custom"===o.type?E(o.message,o):a?a(o):s.createElement(el,{toast:o,position:r}))}))},em=B}}]);