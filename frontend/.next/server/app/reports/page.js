(()=>{var e={};e.id=882,e.ids=[882],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},6595:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var r=s(482),a=s(9108),i=s(2563),n=s.n(i),o=s(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let d=["",{children:["reports",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9969)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\reports\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\reports\\page.tsx"],p="/reports/page",m={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/reports/page",pathname:"/reports",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},4588:(e,t,s)=>{Promise.resolve().then(s.bind(s,7e3))},2254:(e,t,s)=>{e.exports=s(4767)},7e3:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var r=s(2295),a=s(3729),i=s(3973),n=s(2528);function o(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),[o,l]=(0,a.useState)({totalReports:0,thisMonth:0,pending:0,templates:0}),[d,c]=(0,a.useState)(""),[p,m]=(0,a.useState)([]),[u,x]=(0,a.useState)(!0),g=[{id:"cancer-incidence",name:"Laporan Insidensi Kanker",description:"Statistik insidensi kanker per jenis, usia, dan wilayah",category:"Epidemiologi",icon:"chart"},{id:"treatment-outcomes",name:"Laporan Hasil Pengobatan",description:"Analisis outcome pengobatan dan survival rate",category:"Klinis",icon:"medical"},{id:"center-performance",name:"Laporan Performa Pusat",description:"Evaluasi kinerja pusat kanker dan registrar",category:"Administrasi",icon:"building"},{id:"data-quality",name:"Laporan Kualitas Data",description:"Kelengkapan, akurasi, dan konsistensi data",category:"Kualitas",icon:"check"},{id:"demographics",name:"Laporan Demografis",description:"Distribusi pasien berdasarkan demografi",category:"Epidemiologi",icon:"users"},{id:"custom",name:"Laporan Custom",description:"Buat laporan sesuai kebutuhan spesifik",category:"Custom",icon:"settings"}];(0,a.useEffect)(()=>{if(!s&&!t){window.location.href="/login";return}t&&h()},[t,s]);let h=async()=>{try{x(!0),l({totalReports:148,thisMonth:23,pending:2,templates:g.length}),m([{id:"1",name:"Insidensi Kanker Q4 2025",type:"Epidemiologi",generatedAt:"2025-11-22 14:30",status:"completed",size:"2.4 MB"},{id:"2",name:"Kualitas Data November",type:"Kualitas",generatedAt:"2025-11-21 09:15",status:"completed",size:"1.8 MB"},{id:"3",name:"Performa Pusat - Bulanan",type:"Administrasi",generatedAt:"2025-11-20 16:45",status:"processing",size:"-"},{id:"4",name:"Hasil Pengobatan 2025",type:"Klinis",generatedAt:"2025-11-19 11:20",status:"completed",size:"3.1 MB"},{id:"5",name:"Demografis Pasien",type:"Epidemiologi",generatedAt:"2025-11-18 08:00",status:"completed",size:"1.2 MB"}])}catch(e){console.error("Error fetching reports data:",e)}finally{x(!1)}},f=e=>{switch(e){case"completed":return"text-green-600 bg-green-100";case"processing":return"text-yellow-600 bg-yellow-100";case"failed":return"text-red-600 bg-red-100";default:return"text-gray-600 bg-gray-100"}},y=e=>{switch(e){case"completed":return"Selesai";case"processing":return"Proses";case"failed":return"Gagal";default:return e}};return s||u?r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,r.jsxs)(n.A,{children:[(0,r.jsxs)("div",{className:"mb-6",children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Laporan"}),r.jsx("p",{className:"text-gray-600",children:"Buat, kelola, dan ekspor laporan statistik kanker"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-blue-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total Laporan"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:o.totalReports})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-green-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Bulan Ini"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:o.thisMonth})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-yellow-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-yellow-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Dalam Proses"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:o.pending})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-purple-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Template"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:o.templates})]})]})})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Generator Laporan"}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6",children:g.map(e=>r.jsx("div",{onClick:()=>c(e.id),className:`p-4 border-2 rounded-lg cursor-pointer transition-all ${d===e.id?"border-green-500 bg-green-50":"border-gray-200 hover:border-green-300"}`,children:(0,r.jsxs)("div",{className:"flex items-start space-x-3",children:[r.jsx("div",{className:`p-2 rounded-lg ${d===e.id?"bg-green-200":"bg-gray-100"}`,children:r.jsx("svg",{className:"h-5 w-5 text-gray-700",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})})}),(0,r.jsxs)("div",{className:"flex-1",children:[r.jsx("h3",{className:"font-medium text-gray-900 text-sm",children:e.name}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:e.description}),r.jsx("span",{className:"inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded",children:e.category})]})]})},e.id))}),(0,r.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t",children:[r.jsx("div",{className:"text-sm text-gray-600",children:d?(0,r.jsxs)("span",{children:["Template dipilih: ",r.jsx("strong",{children:g.find(e=>e.id===d)?.name})]}):r.jsx("span",{children:"Pilih template laporan untuk memulai"})}),r.jsx("button",{onClick:()=>{if(!d){alert("Silakan pilih template laporan terlebih dahulu");return}alert(`Generating report: ${d}
Fitur ini akan segera diimplementasikan.`)},disabled:!d,className:`px-6 py-2 rounded-lg font-medium transition-colors ${d?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}`,children:"Generate Laporan"})]})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Laporan Terbaru"}),r.jsx("button",{className:"text-sm text-green-600 hover:text-green-700 font-medium",children:"Lihat Semua"})]}),r.jsx("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[r.jsx("thead",{className:"bg-gray-50",children:(0,r.jsxs)("tr",{children:[r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nama Laporan"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tipe"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dibuat"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Ukuran"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),r.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:p.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-500",children:e.type})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-500",children:e.generatedAt})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("span",{className:`px-2 py-1 text-xs font-medium rounded-full ${f(e.status)}`,children:y(e.status)})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-500",children:e.size})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:"completed"===e.status&&r.jsx("button",{className:"text-green-600 hover:text-green-900 font-medium",children:"Download"})})]},e.id))})]})})]})]}):r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},9969:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>a,default:()=>n});let r=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\reports\page.tsx`),{__esModule:a,$$typeof:i}=r,n=r.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>ep});var r,a=s(3729);let i={data:""},n=e=>e||i,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":r+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,n):i+":"+n+";")}return s+(t&&a?t+"{"+a+"}":a)+r},p={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e},u=(e,t,s,r,a)=>{let i=m(e),n=p[i]||(p[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,s,r=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);p[n]=c(a?{["@keyframes "+n]:t}:t,s?"":"."+n)}let u=s&&p.g?p.g:null;return s&&(p.g=p[n]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(p[n],t,r,u),n},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function g(e){let t=this||{},s=e.call?e(t.p):e;return u(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}g.bind({g:1});let h,f,y,b=g.bind({k:1});function v(e,t){let s=this||{};return function(){let r=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;s.p=Object.assign({theme:f&&f()},o),s.o=/ *go\d+/.test(l),o.className=g.apply(s,r)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),y&&d[0]&&y(o),h(d,o)}return t?t(a):a}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),P="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return A(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},L={},M=(e,t=P)=>{L[t]=A(L[t]||D,e),E.forEach(([e,s])=>{e===t&&s(L[t])})},q=e=>Object.keys(L).forEach(t=>M(e,t)),$=e=>Object.keys(L).find(t=>L[t].toasts.some(t=>t.id===e)),z=(e=P)=>t=>{M(t,e)},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={},t=P)=>{let[s,r]=(0,a.useState)(L[t]||D),i=(0,a.useRef)(L[t]);(0,a.useEffect)(()=>(i.current!==L[t]&&r(L[t]),E.push([t,r]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let n=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:n}},I=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||w()}),O=e=>(t,s)=>{let r=I(t,e,s);return z(r.toasterId||$(r.id))({type:2,toast:r}),r.id},_=(e,t)=>O("blank")(e,t);_.error=O("error"),_.success=O("success"),_.loading=O("loading"),_.custom=O("custom"),_.dismiss=(e,t)=>{let s={type:3,toastId:e};t?z(t)(s):q(s)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let s={type:4,toastId:e};t?z(t)(s):q(s)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,s)=>{let r=_.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?N(t.success,e):void 0;return a?_.success(a,{id:r,...s,...null==s?void 0:s.success}):_.dismiss(r),e}).catch(e=>{let a=t.error?N(t.error,e):void 0;a?_.error(a,{id:r,...s,...null==s?void 0:s.error}):_.dismiss(r)}),e};var T=1e3,B=(e,t="default")=>{let{toasts:s,pausedAt:r}=S(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=T)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&_.dismiss(s.id);return}return setTimeout(()=>_.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let o=(0,a.useCallback)(z(t),[t]),l=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,a.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),p=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,n]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}},R=b`
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
}`,K=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${K} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=b`
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
  animation: ${F} 1s linear infinite;
`,W=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=b`
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

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
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
`,Q=v("div")`
  position: absolute;
`,X=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Y=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(J,null,t):t:"blank"===s?null:a.createElement(X,null,a.createElement(V,{...r}),"loading"!==s&&a.createElement(Q,null,"error"===s?a.createElement(G,{...r}):a.createElement(Z,{...r})))},et=e=>`
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
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(ee,{toast:e}),o=a.createElement(ea,{...e.ariaProps},N(e.message,e));return a.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});r=a.createElement,c.p=void 0,h=r,f=void 0,y=void 0;var eo=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let n=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:n,className:t,style:s},i)},el=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},ed=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=B(s,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let n=s.position||t,o=el(n,c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return a.createElement(eo,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:o},"custom"===s.type?N(s.message,s):i?i(s):a.createElement(en,{toast:s,position:n}))}))},ep=_}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[7141,4192,2528],()=>s(6595));module.exports=r})();