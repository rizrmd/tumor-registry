(()=>{var e={};e.id=2990,e.ids=[2990],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},9813:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>l.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>d});var a=s(482),r=s(9108),i=s(2563),l=s.n(i),o=s(8300),n={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>o[e]);s.d(t,n);let d=["",{children:["media",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,7854)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\media\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\media\\page.tsx"],m="/media/page",p={require:s,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/media/page",pathname:"/media",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5178:(e,t,s)=>{Promise.resolve().then(s.bind(s,6163))},2254:(e,t,s)=>{e.exports=s(4767)},6163:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var a=s(2295),r=s(3729),i=s(3973),l=s(2528),o=s(2254),n=s(783),d=s.n(n);function c(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),n=(0,o.useRouter)(),[c,m]=(0,r.useState)(!0),[p,u]=(0,r.useState)({clinicalPhotos:0,radiologyImages:0,pathologyReports:0,totalFiles:0,totalSize:0}),[x,h]=(0,r.useState)([]),[g,f]=(0,r.useState)("all");(0,r.useEffect)(()=>{if(!s&&!t){n.push("/login");return}t&&y()},[t,s,n]);let y=async()=>{try{m(!0),u({clinicalPhotos:0,radiologyImages:0,pathologyReports:0,totalFiles:0,totalSize:0}),h([])}catch(e){console.error("Error loading media data:",e)}finally{m(!1)}},b=e=>({photo:"\uD83D\uDCF8",radiology:"\uD83C\uDFE5",pathology:"\uD83D\uDD2C"})[e]||"\uD83D\uDCC4",v=e=>{let t=e.charAt(0).toUpperCase()+e.slice(1);return a.jsx("span",{className:`px-2 py-1 text-xs font-semibold rounded-full ${{photo:"bg-blue-100 text-blue-800",radiology:"bg-purple-100 text-purple-800",pathology:"bg-green-100 text-green-800"}[e]||"bg-gray-100 text-gray-800"}`,children:t})},j="all"===g?x:x.filter(e=>e.type===g);return s||c?a.jsx(l.A,{children:a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),a.jsx("p",{className:"mt-4 text-gray-600",children:"Loading media gallery..."})]})})}):(0,a.jsxs)(l.A,{children:[(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Media Gallery"}),a.jsx("p",{className:"text-gray-600",children:"Centralized view of all clinical media"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Clinical Photos"}),a.jsx("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:p.clinicalPhotos})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDCF8"})]}),a.jsx(d(),{href:"/media/photos",className:"mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium block",children:"View all →"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Radiology Images"}),a.jsx("p",{className:"text-3xl font-bold text-purple-600 mt-2",children:p.radiologyImages})]}),a.jsx("div",{className:"text-4xl",children:"\uD83C\uDFE5"})]}),a.jsx(d(),{href:"/media/radiology",className:"mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium block",children:"View all →"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Pathology Reports"}),a.jsx("p",{className:"text-3xl font-bold text-green-600 mt-2",children:p.pathologyReports})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDD2C"})]}),a.jsx(d(),{href:"/media/pathology",className:"mt-4 text-sm text-green-600 hover:text-green-800 font-medium block",children:"View all →"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total Storage"}),(0,a.jsxs)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:[(p.totalSize/1073741824).toFixed(2),a.jsx("span",{className:"text-base ml-1",children:"GB"})]})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDCBE"})]}),(0,a.jsxs)("p",{className:"mt-4 text-sm text-gray-600",children:[p.totalFiles," files total"]})]})]}),(0,a.jsxs)("div",{className:"bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 mb-8",children:[a.jsx("h2",{className:"text-white text-lg font-semibold mb-4",children:"Quick Upload"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[a.jsx(d(),{href:"/media/photos",className:"bg-white rounded-lg p-4 hover:shadow-lg transition-shadow",children:(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[a.jsx("div",{className:"text-3xl",children:"\uD83D\uDCF8"}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-medium text-gray-900",children:"Clinical Photo"}),a.jsx("p",{className:"text-sm text-gray-600",children:"Upload patient photos"})]})]})}),a.jsx(d(),{href:"/media/radiology",className:"bg-white rounded-lg p-4 hover:shadow-lg transition-shadow",children:(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[a.jsx("div",{className:"text-3xl",children:"\uD83C\uDFE5"}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-medium text-gray-900",children:"Radiology Image"}),a.jsx("p",{className:"text-sm text-gray-600",children:"Upload X-Ray, CT, MRI"})]})]})}),a.jsx(d(),{href:"/media/pathology",className:"bg-white rounded-lg p-4 hover:shadow-lg transition-shadow",children:(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[a.jsx("div",{className:"text-3xl",children:"\uD83D\uDD2C"}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-medium text-gray-900",children:"Pathology Report"}),a.jsx("p",{className:"text-sm text-gray-600",children:"Upload biopsy reports"})]})]})})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow",children:[a.jsx("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Recent Uploads"}),(0,a.jsxs)("div",{className:"flex space-x-2",children:[a.jsx("button",{onClick:()=>f("all"),className:`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${"all"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:"All"}),a.jsx("button",{onClick:()=>f("photo"),className:`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${"photo"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:"Photos"}),a.jsx("button",{onClick:()=>f("radiology"),className:`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${"radiology"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:"Radiology"}),a.jsx("button",{onClick:()=>f("pathology"),className:`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${"pathology"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:"Pathology"})]})]})}),0===j.length?(0,a.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[a.jsx("div",{className:"text-6xl mb-4",children:"\uD83D\uDCC2"}),a.jsx("p",{className:"text-lg font-medium",children:"No media files yet"}),a.jsx("p",{className:"text-sm mt-2",children:"Upload clinical photos, radiology images, or pathology reports to get started"}),a.jsx("div",{className:"mt-6 flex justify-center space-x-4",children:a.jsx(d(),{href:"/media/photos",className:"px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"Upload First File"})})]}):a.jsx("div",{className:"p-6",children:a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:j.map(e=>(0,a.jsxs)("div",{className:"border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",children:[a.jsx("div",{className:"aspect-square bg-gray-100 flex items-center justify-center",children:e.thumbnailUrl?a.jsx("img",{src:e.thumbnailUrl,alt:e.title,className:"w-full h-full object-cover"}):a.jsx("div",{className:"text-6xl",children:b(e.type)})}),(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[a.jsx("h3",{className:"font-semibold text-gray-900 truncate flex-1",children:e.title}),v(e.type)]}),a.jsx("p",{className:"text-sm text-gray-600 truncate",children:e.patientName||"Unknown"}),a.jsx("p",{className:"text-xs text-gray-500 mt-1",children:e.mrNumber||"-"}),a.jsx("p",{className:"text-xs text-gray-400 mt-2",children:new Date(e.uploadDate).toLocaleDateString("id-ID")})]})]},e.id))})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mt-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Storage by Type"}),(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[a.jsx("span",{className:"text-gray-600",children:"Clinical Photos"}),(0,a.jsxs)("span",{className:"font-medium",children:[p.clinicalPhotos>0?Math.round(p.clinicalPhotos/p.totalFiles*100):0,"%"]})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:"bg-blue-500 h-2 rounded-full",style:{width:`${p.clinicalPhotos>0?p.clinicalPhotos/p.totalFiles*100:0}%`}})})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[a.jsx("span",{className:"text-gray-600",children:"Radiology Images"}),(0,a.jsxs)("span",{className:"font-medium",children:[p.radiologyImages>0?Math.round(p.radiologyImages/p.totalFiles*100):0,"%"]})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:"bg-purple-500 h-2 rounded-full",style:{width:`${p.radiologyImages>0?p.radiologyImages/p.totalFiles*100:0}%`}})})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[a.jsx("span",{className:"text-gray-600",children:"Pathology Reports"}),(0,a.jsxs)("span",{className:"font-medium",children:[p.pathologyReports>0?Math.round(p.pathologyReports/p.totalFiles*100):0,"%"]})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:"bg-green-500 h-2 rounded-full",style:{width:`${p.pathologyReports>0?p.pathologyReports/p.totalFiles*100:0}%`}})})]})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Upload Activity"}),(0,a.jsxs)("div",{className:"text-center py-6",children:[a.jsx("p",{className:"text-4xl font-bold text-gray-900",children:p.totalFiles}),a.jsx("p",{className:"text-sm text-gray-600 mt-2",children:"Total Files"}),a.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"All time"})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Storage Capacity"}),(0,a.jsxs)("div",{className:"text-center py-6",children:[a.jsx("p",{className:"text-4xl font-bold text-gray-900",children:(p.totalSize/1073741824).toFixed(1)}),a.jsx("p",{className:"text-sm text-gray-600 mt-2",children:"Gigabytes Used"}),a.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"MinIO Storage"})]})]})]})]})}},7854:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>l});let a=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\media\page.tsx`),{__esModule:r,$$typeof:i}=a,l=a.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>em});var a,r=s(3729);let i={data:""},l=e=>e||i,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",a="",r="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":a+="f"==i[1]?c(l,i):i+"{"+c(l,"k"==i[1]?"":t)+"}":"object"==typeof l?a+=c(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(i,l):i+":"+l+";")}return s+(t&&r?t+"{"+r+"}":r)+a},m={},p=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+p(e[s]);return t}return e},u=(e,t,s,a,r)=>{let i=p(e),l=m[i]||(m[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!m[l]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(s=t[3].replace(d," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);m[l]=c(r?{["@keyframes "+l]:t}:t,s?"":"."+l)}let u=s&&m.g?m.g:null;return s&&(m.g=m[l]),((e,t,s,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(m[l],t,a,u),l},x=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return u(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,f,y,b=h.bind({k:1});function v(e,t){let s=this||{};return function(){let a=arguments;function r(i,l){let o=Object.assign({},i),n=o.className||r.className;s.p=Object.assign({theme:f&&f()},o),s.o=/ *go\d+/.test(n),o.className=h.apply(s,a)+(n?" "+n:""),t&&(o.ref=l);let d=e;return e[0]&&(d=o.as||e,delete o.as),y&&d[0]&&y(o),g(d,o)}return t?t(r):r}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),D=(()=>{let e;return()=>e})(),P="default",C=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return C(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},k=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},I=(e,t=P)=>{A[t]=C(A[t]||E,e),k.forEach(([e,s])=>{e===t&&s(A[t])})},$=e=>Object.keys(A).forEach(t=>I(e,t)),S=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),R=(e=P)=>t=>{I(t,e)},q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},F=(e={},t=P)=>{let[s,a]=(0,r.useState)(A[t]||E),i=(0,r.useRef)(A[t]);(0,r.useEffect)(()=>(i.current!==A[t]&&a(A[t]),k.push([t,a]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let l=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||q[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:l}},O=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||w()}),M=e=>(t,s)=>{let a=O(t,e,s);return R(a.toasterId||S(a.id))({type:2,toast:a}),a.id},_=(e,t)=>M("blank")(e,t);_.error=M("error"),_.success=M("success"),_.loading=M("loading"),_.custom=M("custom"),_.dismiss=(e,t)=>{let s={type:3,toastId:e};t?R(t)(s):$(s)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let s={type:4,toastId:e};t?R(t)(s):$(s)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,s)=>{let a=_.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?N(t.success,e):void 0;return r?_.success(r,{id:a,...s,...null==s?void 0:s.success}):_.dismiss(a),e}).catch(e=>{let r=t.error?N(t.error,e):void 0;r?_.error(r,{id:a,...s,...null==s?void 0:s.error}):_.dismiss(a)}),e};var z=1e3,T=(e,t="default")=>{let{toasts:s,pausedAt:a}=F(e,t),i=(0,r.useRef)(new Map).current,l=(0,r.useCallback)((e,t=z)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&_.dismiss(s.id);return}return setTimeout(()=>_.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let o=(0,r.useCallback)(R(t),[t]),n=(0,r.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,r.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,r.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),m=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},l=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=l.findIndex(t=>t.id===e.id),n=l.filter((e,t)=>t<o&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,l]),{toasts:s,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:m}}},U=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=v("div")`
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
    animation: ${L} 0.15s ease-out forwards;
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
`,B=b`
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
  animation: ${B} 1s linear infinite;
`,X=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Z=b`
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

  animation: ${X} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Z} 0.2s ease-out forwards;
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
`,Y=v("div")`
  position: absolute;
`,J=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(W,null,t):t:"blank"===s?null:r.createElement(J,null,r.createElement(V,{...a}),"loading"!==s&&r.createElement(Y,null,"error"===s?r.createElement(H,{...a}):r.createElement(Q,{...a})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=v("div")`
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
`,er=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=D()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},l=r.createElement(ee,{toast:e}),o=r.createElement(er,{...e.ariaProps},N(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:l,message:o}):r.createElement(r.Fragment,null,l,o))});a=r.createElement,c.p=void 0,g=a,f=void 0,y=void 0;var eo=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let l=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:l,className:t,style:s},i)},en=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:D()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:l,containerStyle:o,containerClassName:n})=>{let{toasts:d,handlers:c}=T(s,l);return r.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let l=s.position||t,o=en(l,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(eo,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:o},"custom"===s.type?N(s.message,s):i?i(s):r.createElement(el,{toast:s,position:l}))}))},em=_}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[7141,4192,2528],()=>s(9813));module.exports=a})();