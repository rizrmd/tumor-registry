(()=>{var e={};e.id=6938,e.ids=[6938],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},7120:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d});var r=s(482),a=s(9108),i=s(2563),o=s.n(i),n=s(8300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let d=["",{children:["settings",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9700)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\settings\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\settings\\page.tsx"],p="/settings/page",u={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/settings/page",pathname:"/settings",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5871:(e,t,s)=>{Promise.resolve().then(s.bind(s,4895))},2254:(e,t,s)=>{e.exports=s(4767)},4895:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var r=s(2295),a=s(783),i=s.n(a),o=s(2528),n=s(3973),l=s(47);function d(){let{user:e}=(0,n.useAuth)(),{statistics:t,isSyncing:s,triggerFullSync:a}=(0,l.useSync)();return(0,r.jsxs)(o.A,{children:[(0,r.jsxs)("div",{className:"mb-6",children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Pengaturan"}),r.jsx("p",{className:"text-gray-600",children:"Kelola pengaturan akun dan preferensi Anda"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 gap-6",children:[(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Informasi Profil"}),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Nama"}),r.jsx("input",{type:"text",defaultValue:e?.name,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Email"}),r.jsx("input",{type:"email",defaultValue:e?.email,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50",disabled:!0})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Role"}),r.jsx("input",{type:"text",defaultValue:e?.role,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50",disabled:!0})]})]}),r.jsx("div",{className:"mt-6",children:r.jsx("button",{className:"px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700",children:"Simpan Perubahan"})})]}),t&&(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsxs)("div",{children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Sinkronisasi Data"}),r.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Kelola sinkronisasi data offline dengan server pusat"})]}),r.jsx(i(),{href:"/sync/conflicts",className:"text-sm text-emerald-600 hover:text-emerald-700 font-medium",children:"Lihat Detail →"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-4 gap-4 mb-6",children:[(0,r.jsxs)("div",{className:"p-4 bg-emerald-50 rounded-lg",children:[r.jsx("p",{className:"text-xs text-emerald-600 font-medium uppercase",children:"Tersinkron"}),r.jsx("p",{className:"text-2xl font-bold text-emerald-700",children:t.synced})]}),(0,r.jsxs)("div",{className:"p-4 bg-yellow-50 rounded-lg",children:[r.jsx("p",{className:"text-xs text-yellow-600 font-medium uppercase",children:"Menunggu"}),r.jsx("p",{className:"text-2xl font-bold text-yellow-700",children:t.pending})]}),(0,r.jsxs)("div",{className:`p-4 rounded-lg ${t.conflict>0?"bg-orange-100":"bg-orange-50"}`,children:[r.jsx("p",{className:"text-xs text-orange-600 font-medium uppercase",children:"Konflik"}),r.jsx("p",{className:"text-2xl font-bold text-orange-700",children:t.conflict})]}),(0,r.jsxs)("div",{className:`p-4 rounded-lg ${t.failed>0?"bg-red-100":"bg-red-50"}`,children:[r.jsx("p",{className:"text-xs text-red-600 font-medium uppercase",children:"Gagal"}),r.jsx("p",{className:"text-2xl font-bold text-red-700",children:t.failed})]})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-3",children:[r.jsx("button",{onClick:a,disabled:s,className:"flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed",children:s?(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}),r.jsx("span",{children:"Menyinkronkan..."})]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),r.jsx("span",{children:"Sinkronkan Sekarang"})]})}),(t.conflict>0||t.failed>0)&&(0,r.jsxs)(i(),{href:"/sync/conflicts",className:"flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700",children:[r.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),(0,r.jsxs)("span",{children:["Selesaikan Masalah (",t.conflict+t.failed,")"]})]})]}),(t.conflict>0||t.failed>0)&&r.jsx("div",{className:"mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg",children:(0,r.jsxs)("div",{className:"flex items-start space-x-3",children:[r.jsx("svg",{className:"w-5 h-5 text-orange-600 mt-0.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-orange-900",children:"Perhatian Diperlukan"}),(0,r.jsxs)("p",{className:"text-sm text-orange-700 mt-1",children:["Terdapat ",t.conflict," konflik dan ",t.failed," item gagal sinkron. Silakan selesaikan untuk memastikan data Anda tersinkron dengan baik."]})]})]})})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Keamanan"}),r.jsx("button",{className:"text-emerald-600 hover:text-emerald-700",children:"Ubah Password"})]})]})]})}},9700:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>a,default:()=>o});let r=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\settings\page.tsx`),{__esModule:a,$$typeof:i}=r,o=r.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>ep});var r,a=s(3729);let i={data:""},o=e=>e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+r},p={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e},m=(e,t,s,r,a)=>{let i=u(e),o=p[i]||(p[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!p[o]){let t=i!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);p[o]=c(a?{["@keyframes "+o]:t}:t,s?"":"."+o)}let m=s&&p.g?p.g:null;return s&&(p.g=p[o]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(p[o],t,r,m),o},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return m(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let g,h,b,y=f.bind({k:1});function v(e,t){let s=this||{};return function(){let r=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;s.p=Object.assign({theme:h&&h()},n),s.o=/ *go\d+/.test(l),n.className=f.apply(s,r)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),g(d,n)}return t?t(a):a}}var j=e=>"function"==typeof e,k=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),N=(()=>{let e;return()=>e})(),P="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return A(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},q={},$=(e,t=P)=>{q[t]=A(q[t]||D,e),E.forEach(([e,s])=>{e===t&&s(q[t])})},S=e=>Object.keys(q).forEach(t=>$(e,t)),C=e=>Object.keys(q).find(t=>q[t].toasts.some(t=>t.id===e)),M=(e=P)=>t=>{$(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=P)=>{let[s,r]=(0,a.useState)(q[t]||D),i=(0,a.useRef)(q[t]);(0,a.useEffect)(()=>(i.current!==q[t]&&r(q[t]),E.push([t,r]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:o}},_=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||w()}),L=e=>(t,s)=>{let r=_(t,e,s);return M(r.toasterId||C(r.id))({type:2,toast:r}),r.id},z=(e,t)=>L("blank")(e,t);z.error=L("error"),z.success=L("success"),z.loading=L("loading"),z.custom=L("custom"),z.dismiss=(e,t)=>{let s={type:3,toastId:e};t?M(t)(s):S(s)},z.dismissAll=e=>z.dismiss(void 0,e),z.remove=(e,t)=>{let s={type:4,toastId:e};t?M(t)(s):S(s)},z.removeAll=e=>z.remove(void 0,e),z.promise=(e,t,s)=>{let r=z.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?k(t.success,e):void 0;return a?z.success(a,{id:r,...s,...null==s?void 0:s.success}):z.dismiss(r),e}).catch(e=>{let a=t.error?k(t.error,e):void 0;a?z.error(a,{id:r,...s,...null==s?void 0:s.error}):z.dismiss(r)}),e};var T=1e3,R=(e,t="default")=>{let{toasts:s,pausedAt:r}=I(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=T)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&z.dismiss(s.id);return}return setTimeout(()=>z.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,a.useCallback)(M(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),p=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}},F=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=v("div")`
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
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,K=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${K} 1s linear infinite;
`,V=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=y`
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
}`,Z=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${W} 0.2s ease-out forwards;
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
`,X=v("div")`
  position: absolute;
`,Y=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(Q,null,t):t:"blank"===s?null:a.createElement(Y,null,a.createElement(U,{...r}),"loading"!==s&&a.createElement(X,null,"error"===s?a.createElement(B,{...r}):a.createElement(Z,{...r})))},et=e=>`
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
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=N()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${y(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(ee,{toast:e}),n=a.createElement(ea,{...e.ariaProps},k(e.message,e));return a.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});r=a.createElement,c.p=void 0,g=r,h=void 0,b=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let o=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:o,className:t,style:s},i)},el=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:N()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},ed=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=R(s,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o=s.position||t,n=el(o,c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return a.createElement(en,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?k(s.message,s):i?i(s):a.createElement(eo,{toast:s,position:o}))}))},ep=z}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[7141,4192,2528],()=>s(7120));module.exports=r})();