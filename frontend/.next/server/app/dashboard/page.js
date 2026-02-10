(()=>{var e={};e.id=7702,e.ids=[7702],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},3455:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>d});var r=s(482),a=s(9108),i=s(2563),o=s.n(i),n=s(8300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let d=["",{children:["dashboard",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9468)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\dashboard\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\dashboard\\page.tsx"],m="/dashboard/page",p={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/dashboard/page",pathname:"/dashboard",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},1209:(e,t,s)=>{Promise.resolve().then(s.bind(s,2038))},2254:(e,t,s)=>{e.exports=s(4767)},2038:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var r=s(2295),a=s(3729),i=s(3973),o=s(2528);function n(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),[n,l]=(0,a.useState)({totalPatients:0,newPatients:0,limbSalvageRate:0,followUpCompliance:0,activeCenters:0});return((0,a.useEffect)(()=>{if(!s&&!t){window.location.href="/login";return}let e=async()=>{try{let e=localStorage.getItem("token"),t=await fetch("http://127.0.0.1:3001/api/v1/national-dashboard/summary",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){let e=await t.json();l({totalPatients:e.totalPatients||0,newPatients:e.newPatients||0,limbSalvageRate:e.limbSalvageRate||0,followUpCompliance:e.followUpComplianceRate||0,activeCenters:e.activeCenters||0})}}catch(e){console.error("Error fetching dashboard data:",e)}};t&&e()},[t,s]),s||!t)?r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):(0,r.jsxs)(o.A,{children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8",children:[r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-blue-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total Patients"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:n.totalPatients.toLocaleString()})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-green-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"New Patients"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:n.newPatients})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-purple-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Limb Salvage Rate"}),(0,r.jsxs)("p",{className:"text-2xl font-semibold text-gray-900",children:[n.limbSalvageRate,"%"]}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"WHO benchmark: 85%+"})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow",onClick:()=>window.location.href="/follow-up/compliance",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:`p-3 rounded-lg ${n.followUpCompliance>=90?"bg-emerald-100":"bg-yellow-100"}`,children:r.jsx("svg",{className:`h-6 w-6 ${n.followUpCompliance>=90?"text-emerald-600":"text-yellow-600"}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Follow-up Compliance"}),(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsxs)("p",{className:"text-2xl font-semibold text-gray-900",children:[n.followUpCompliance,"%"]}),n.followUpCompliance>=90&&r.jsx("span",{className:"px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-white rounded-full uppercase tracking-tighter",children:"Quality Data"})]}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"14-visit protocol"})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-indigo-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-indigo-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Active Centers"}),(0,r.jsxs)("p",{className:"text-2xl font-semibold text-gray-900",children:[n.activeCenters," / 21"]}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"National network"})]})]})})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Quick Actions"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e?.role&&["DATA_ENTRY","MEDICAL_OFFICER","CENTER_ADMIN","NATIONAL_ADMIN","SYSTEM_ADMIN","HEAD_OF_CENTER"].includes(e.role)&&(0,r.jsxs)("button",{onClick:()=>window.location.href="/patients/new",className:"flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",children:[r.jsx("svg",{className:"h-5 w-5 mr-2 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),"Add New Patient"]}),e?.role&&["RESEARCHER","CENTER_ADMIN","NATIONAL_ADMIN","SYSTEM_ADMIN","HEAD_OF_CENTER","OBSERVER","DATA_ENTRY"].includes(e.role)&&(0,r.jsxs)("button",{onClick:()=>window.location.href="/reports",className:"flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",children:[r.jsx("svg",{className:"h-5 w-5 mr-2 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Generate Reports"]}),e?.role&&["DATA_ENTRY","MEDICAL_OFFICER","RESEARCHER","CENTER_ADMIN","NATIONAL_ADMIN","SYSTEM_ADMIN","HEAD_OF_CENTER","OBSERVER"].includes(e.role)&&(0,r.jsxs)("button",{onClick:()=>window.location.href="/analytics",className:"flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",children:[r.jsx("svg",{className:"h-5 w-5 mr-2 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),"View Analytics"]})]})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Activity"}),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-900",children:"Osteosarcoma case registered"}),r.jsx("p",{className:"text-xs text-gray-500",children:"2 hours ago • WHO Classification: 9180/3"})]}),r.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full",children:"New Case"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-900",children:"MSTS score calculated (24/30)"}),r.jsx("p",{className:"text-xs text-gray-500",children:"4 hours ago • Post-op functional assessment"})]}),r.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full",children:"MSTS"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-900",children:"Limb salvage procedure documented"}),r.jsx("p",{className:"text-xs text-gray-500",children:"6 hours ago • Enneking Stage IIB"})]}),r.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full",children:"Surgery"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between py-3 border-b",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-900",children:"CPC conference scheduled"}),r.jsx("p",{className:"text-xs text-gray-500",children:"8 hours ago • Multidisciplinary team discussion"})]}),r.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full",children:"CPC"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between py-3",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-900",children:"Follow-up visit completed"}),r.jsx("p",{className:"text-xs text-gray-500",children:"1 day ago • 6-month protocol visit"})]}),r.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full",children:"Follow-up"})]})]})]})]})}},9468:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>a,default:()=>o});let r=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\dashboard\page.tsx`),{__esModule:a,$$typeof:i}=r,o=r.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>em});var r,a=s(3729);let i={data:""},o=e=>e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+r},m={},p=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+p(e[s]);return t}return e},u=(e,t,s,r,a)=>{let i=p(e),o=m[i]||(m[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!m[o]){let t=i!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);m[o]=c(a?{["@keyframes "+o]:t}:t,s?"":"."+o)}let u=s&&m.g?m.g:null;return s&&(m.g=m[o]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(m[o],t,r,u),o},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return u(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,f,y,b=h.bind({k:1});function v(e,t){let s=this||{};return function(){let r=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;s.p=Object.assign({theme:f&&f()},n),s.o=/ *go\d+/.test(l),n.className=h.apply(s,r)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),g(d,n)}return t?t(a):a}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),E="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return A(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},C=[],M={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},D=(e,t=E)=>{P[t]=A(P[t]||M,e),C.forEach(([e,s])=>{e===t&&s(P[t])})},S=e=>Object.keys(P).forEach(t=>D(e,t)),R=e=>Object.keys(P).find(t=>P[t].toasts.some(t=>t.id===e)),_=(e=E)=>t=>{D(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={},t=E)=>{let[s,r]=(0,a.useState)(P[t]||M),i=(0,a.useRef)(P[t]);(0,a.useEffect)(()=>(i.current!==P[t]&&r(P[t]),C.push([t,r]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:o}},T=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||w()}),L=e=>(t,s)=>{let r=T(t,e,s);return _(r.toasterId||R(r.id))({type:2,toast:r}),r.id},q=(e,t)=>L("blank")(e,t);q.error=L("error"),q.success=L("success"),q.loading=L("loading"),q.custom=L("custom"),q.dismiss=(e,t)=>{let s={type:3,toastId:e};t?_(t)(s):S(s)},q.dismissAll=e=>q.dismiss(void 0,e),q.remove=(e,t)=>{let s={type:4,toastId:e};t?_(t)(s):S(s)},q.removeAll=e=>q.remove(void 0,e),q.promise=(e,t,s)=>{let r=q.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?N(t.success,e):void 0;return a?q.success(a,{id:r,...s,...null==s?void 0:s.success}):q.dismiss(r),e}).catch(e=>{let a=t.error?N(t.error,e):void 0;a?q.error(a,{id:r,...s,...null==s?void 0:s.error}):q.dismiss(r)}),e};var $=1e3,z=(e,t="default")=>{let{toasts:s,pausedAt:r}=O(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=$)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&q.dismiss(s.id);return}return setTimeout(()=>q.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,a.useCallback)(_(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),m=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}},H=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,W=v("div")`
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
    animation: ${F} 0.15s ease-out forwards;
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
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,Y=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=b`
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
}`,Q=v("div")`
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
`,Z=v("div")`
  position: absolute;
`,X=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===s?null:a.createElement(X,null,a.createElement(V,{...r}),"loading"!==s&&a.createElement(Z,null,"error"===s?a.createElement(W,{...r}):a.createElement(Q,{...r})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=v("div")`
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
`,ea=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(ee,{toast:e}),n=a.createElement(ea,{...e.ariaProps},N(e.message,e));return a.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});r=a.createElement,c.p=void 0,g=r,f=void 0,y=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let o=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:o,className:t,style:s},i)},el=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=z(s,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o=s.position||t,n=el(o,c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return a.createElement(en,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?N(s.message,s):i?i(s):a.createElement(eo,{toast:s,position:o}))}))},em=q}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[7141,4192,2528],()=>s(3455));module.exports=r})();