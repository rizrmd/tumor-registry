exports.id=8527,exports.ids=[8527],exports.modules={2254:(e,t,a)=>{e.exports=a(4767)},9356:(e,t,a)=>{"use strict";async function i(e,t={}){let a={"Content-Type":"application/json",...t.headers},i=await fetch(`http://127.0.0.1:3001/api${e}`,{...t,headers:a});if(!i.ok){if(401===i.status)throw Error("Session expired. Please login again.");let e=await i.json().catch(()=>({message:`HTTP ${i.status}: ${i.statusText}`}));if(400===i.status&&e.error?.details?.some(e=>"Unauthorized"===e.message))throw Error("Session expired. Please login again.");throw Error(e.message||"API request failed")}return i.json()}async function o(e){let t=new URLSearchParams;return e?.page&&t.append("page",e.page.toString()),e?.limit&&t.append("limit",e.limit.toString()),e?.search&&t.append("search",e.search),e?.centerId&&t.append("centerId",e.centerId),i(`/patients?${t.toString()}`)}a.d(t,{X4:()=>o,ZP:()=>s});let s={create:async function(e){return i("/patients",{method:"POST",body:JSON.stringify(e)})},update:async function(e,t){return i(`/patients/${e}`,{method:"PATCH",body:JSON.stringify(t)})},getById:async function(e){return i(`/patients/${e}`)},getAll:o,delete:async function(e){return i(`/patients/${e}`,{method:"DELETE"})},transformWizardData:function(e){let t=e.section1||{},a=e.section2||{},i=e.section3||{},o=e.section4||{},s=e.section5||{},r=e.section6||{},n=e.section7||{},l=e.section8||{},c=e.section9||{};return{centerId:t.centerId||"",pathologyType:t.pathologyTypeId,hospitalRecordNumber:a.hospitalRecordNumber||`MR-${Date.now()}`,nik:a.nik||"",name:a.name||"",dateOfBirth:a.dateOfBirth||"",placeOfBirth:a.placeOfBirth,gender:a.gender||"",bloodType:a.bloodType,religion:a.religion,maritalStatus:a.maritalStatus,occupation:a.occupation,education:a.education,phone:a.phone,email:a.email,address:a.address,province:a.province,regency:a.regency,district:a.district,village:a.village,postalCode:a.postalCode,emergencyContact:a.emergencyContact,chiefComplaint:i.chiefComplaint,symptomOnset:i.symptomOnset,symptomDuration:i.symptomDuration,symptomDurationUnit:i.symptomDurationUnit,presentingSymptoms:i.presentingSymptoms,tumorSize:i.tumorSize,familyHistory:i.familyHistory,tumorSyndromeId:i.tumorSyndromeId,karnofskyScore:i.karnofskyScore,height:i.height,weight:i.weight,bmi:i.bmi,biopsyType:o.biopsyType,biopsyDate:o.biopsyDate,biopsyLocation:o.biopsyLocation,biopsySite:o.biopsySite,imagingStudies:o.imagingStudies,imagingDate:o.imagingDate,imagingFindings:o.imagingFindings,mirrelScore:o.mirrelScore,diagnosisDate:s.diagnosisDate,whoClassificationId:s.whoClassificationId,boneLocationId:s.boneLocationId,softTissueLocationId:s.softTissueLocationId,tumorGrade:s.tumorGrade,histopathology:s.histopathology,stagingSystem:r.stagingSystem,enneking:r.enneking,ajcc:r.ajcc,cpc:n.cpcHeld?{held:n.cpcHeld,date:n.cpcDate,location:n.cpcLocation,participants:n.participants,presentation:n.casePresentation,recommendations:n.recommendations,consensus:n.consensus,notes:n.notes}:void 0,treatment:{surgery:l.surgery,chemotherapy:l.chemotherapy,radiotherapy:l.radiotherapy,overallResponse:l.overallResponse},followUp:{visits:c.visits}}}}},4669:(e,t,a)=>{"use strict";a.d(t,{x7:()=>ed,ZP:()=>ep});var i,o=a(3729);let s={data:""},r=e=>e||s,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let a="",i="",o="";for(let s in e){let r=e[s];"@"==s[0]?"i"==s[1]?a=s+" "+r+";":i+="f"==s[1]?d(r,s):s+"{"+d(r,"k"==s[1]?"":t)+"}":"object"==typeof r?i+=d(r,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=r&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=d.p?d.p(s,r):s+":"+r+";")}return a+(t&&o?t+"{"+o+"}":o)+i},p={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e},m=(e,t,a,i,o)=>{let s=u(e),r=p[s]||(p[s]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(s));if(!p[r]){let t=s!==e?e:(e=>{let t,a,i=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?i.shift():t[3]?(a=t[3].replace(c," ").trim(),i.unshift(i[0][a]=i[0][a]||{})):i[0][t[1]]=t[2].replace(c," ").trim();return i[0]})(e);p[r]=d(o?{["@keyframes "+r]:t}:t,a?"":"."+r)}let m=a&&p.g?p.g:null;return a&&(p.g=p[r]),((e,t,a,i)=>{i?t.data=t.data.replace(i,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(p[r],t,i,m),r},f=(e,t,a)=>e.reduce((e,i,o)=>{let s=t[o];if(s&&s.call){let e=s(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+i+(null==s?"":s)},"");function g(e){let t=this||{},a=e.call?e(t.p):e;return m(a.unshift?a.raw?f(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,r(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,h,b,v=g.bind({k:1});function x(e,t){let a=this||{};return function(){let i=arguments;function o(s,r){let n=Object.assign({},s),l=n.className||o.className;a.p=Object.assign({theme:h&&h()},n),a.o=/ *go\d+/.test(l),n.className=g.apply(a,i)+(l?" "+l:""),t&&(n.ref=r);let c=e;return e[0]&&(c=n.as||e,delete n.as),b&&c[0]&&b(n),y(c,n)}return t?t(o):o}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,S=(()=>{let e=0;return()=>(++e).toString()})(),E=(()=>{let e;return()=>e})(),D="default",I=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:i}=t;return I(e,{type:e.toasts.find(e=>e.id===i.id)?1:0,toast:i});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},$=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},O={},T=(e,t=D)=>{O[t]=I(O[t]||C,e),$.forEach(([e,a])=>{e===t&&a(O[t])})},P=e=>Object.keys(O).forEach(t=>T(e,t)),j=e=>Object.keys(O).find(t=>O[t].toasts.some(t=>t.id===e)),N=(e=D)=>t=>{T(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=(e={},t=D)=>{let[a,i]=(0,o.useState)(O[t]||C),s=(0,o.useRef)(O[t]);(0,o.useEffect)(()=>(s.current!==O[t]&&i(O[t]),$.push([t,i]),()=>{let e=$.findIndex(([e])=>e===t);e>-1&&$.splice(e,1)}),[t]);let r=a.toasts.map(t=>{var a,i,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...a,toasts:r}},L=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||S()}),H=e=>(t,a)=>{let i=L(t,e,a);return N(i.toasterId||j(i.id))({type:2,toast:i}),i.id},R=(e,t)=>H("blank")(e,t);R.error=H("error"),R.success=H("success"),R.loading=H("loading"),R.custom=H("custom"),R.dismiss=(e,t)=>{let a={type:3,toastId:e};t?N(t)(a):P(a)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let a={type:4,toastId:e};t?N(t)(a):P(a)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,a)=>{let i=R.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?k(t.success,e):void 0;return o?R.success(o,{id:i,...a,...null==a?void 0:a.success}):R.dismiss(i),e}).catch(e=>{let o=t.error?k(t.error,e):void 0;o?R.error(o,{id:i,...a,...null==a?void 0:a.error}):R.dismiss(i)}),e};var F=1e3,U=(e,t="default")=>{let{toasts:a,pausedAt:i}=A(e,t),s=(0,o.useRef)(new Map).current,r=(0,o.useCallback)((e,t=F)=>{if(s.has(e))return;let a=setTimeout(()=>{s.delete(e),n({type:4,toastId:e})},t);s.set(e,a)},[]);(0,o.useEffect)(()=>{if(i)return;let e=Date.now(),o=a.map(a=>{if(a.duration===1/0)return;let i=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(i<0){a.visible&&R.dismiss(a.id);return}return setTimeout(()=>R.dismiss(a.id,t),i)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[a,i,t]);let n=(0,o.useCallback)(N(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,o.useCallback)(()=>{i&&n({type:6,time:Date.now()})},[i,n]),p=(0,o.useCallback)((e,t)=>{let{reverseOrder:i=!1,gutter:o=8,defaultPosition:s}=t||{},r=a.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=r.findIndex(t=>t.id===e.id),l=r.filter((e,t)=>t<n&&e.visible).length;return r.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[a]);return(0,o.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[a,r]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:p}}},B=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Z=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=x("div")`
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
    animation: ${M} 0.15s ease-out forwards;
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
    animation: ${Z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,J=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${J} 1s linear infinite;
`,W=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=v`
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
}`,Y=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
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
`,K=x("div")`
  position: absolute;
`,Q=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:a,iconTheme:i}=e;return void 0!==t?"string"==typeof t?o.createElement(_,null,t):t:"blank"===a?null:o.createElement(Q,null,o.createElement(q,{...i}),"loading"!==a&&o.createElement(K,null,"error"===a?o.createElement(G,{...i}):o.createElement(Y,{...i})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=x("div")`
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
`,eo=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let a=e.includes("top")?1:-1,[i,o]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(a),ea(a)];return{animation:t?`${v(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},er=o.memo(({toast:e,position:t,style:a,children:i})=>{let s=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},r=o.createElement(ee,{toast:e}),n=o.createElement(eo,{...e.ariaProps},k(e.message,e));return o.createElement(ei,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof i?i({icon:r,message:n}):o.createElement(o.Fragment,null,r,n))});i=o.createElement,d.p=void 0,y=i,h=void 0,b=void 0;var en=({id:e,className:t,style:a,onHeightUpdate:i,children:s})=>{let r=o.useCallback(t=>{if(t){let a=()=>{i(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return o.createElement("div",{ref:r,className:t,style:a},s)},el=(e,t)=>{let a=e.includes("top"),i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...i}},ec=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:i,children:s,toasterId:r,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=U(a,r);return o.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let r=a.position||t,n=el(r,d.calculateOffset(a,{reverseOrder:e,gutter:i,defaultPosition:t}));return o.createElement(en,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?ec:"",style:n},"custom"===a.type?k(a.message,a):s?s(a):o.createElement(er,{toast:a,position:r}))}))},ep=R}};