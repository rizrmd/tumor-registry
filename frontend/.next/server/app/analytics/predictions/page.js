(()=>{var e={};e.id=3119,e.ids=[3119],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},8921:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d});var a=s(482),r=s(9108),i=s(2563),n=s.n(i),l=s(8300),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);s.d(t,o);let d=["",{children:["analytics",{children:["predictions",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,377)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\analytics\\predictions\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\analytics\\predictions\\page.tsx"],p="/analytics/predictions/page",u={require:s,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/analytics/predictions/page",pathname:"/analytics/predictions",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},3590:(e,t,s)=>{Promise.resolve().then(s.bind(s,9935))},2254:(e,t,s)=>{e.exports=s(4767)},9935:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var a=s(2295),r=s(3729),i=s(3973),n=s(2528);function l(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),[l,o]=(0,r.useState)(!0),[d,c]=(0,r.useState)("3months");return((0,r.useEffect)(()=>{if(!s&&!t){window.location.href="/login";return}t&&o(!1)},[t,s]),s||l)?a.jsx(n.A,{children:a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"})})}):(0,a.jsxs)(n.A,{children:[(0,a.jsxs)("div",{className:"mb-8",children:[a.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Prediksi AI"}),a.jsx("p",{className:"text-gray-600 mt-2",children:"Prediksi dan proyeksi kasus kanker berbasis machine learning"})]}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",children:[{title:"Prediksi 3 Bulan Ke Depan",timeframe:"Nov 2024 - Jan 2025",predictedCases:348,confidence:87,trend:"up",change:"+12.4%",color:"bg-blue-500"},{title:"Prediksi 6 Bulan Ke Depan",timeframe:"Nov 2024 - Apr 2025",predictedCases:712,confidence:82,trend:"up",change:"+15.8%",color:"bg-purple-500"},{title:"Prediksi Puncak Kasus",timeframe:"Maret 2025",predictedCases:134,confidence:79,trend:"peak",change:"Puncak",color:"bg-red-500"}].map(e=>(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-lg overflow-hidden",children:[(0,a.jsxs)("div",{className:`${e.color} p-4 text-white`,children:[a.jsx("h3",{className:"text-lg font-semibold",children:e.title}),a.jsx("p",{className:"text-sm opacity-90 mt-1",children:e.timeframe})]}),(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsxs)("div",{className:"text-center mb-4",children:[a.jsx("div",{className:"text-4xl font-bold text-gray-900",children:e.predictedCases}),a.jsx("div",{className:"text-sm text-gray-600 mt-1",children:"Kasus Diprediksi"})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("span",{className:"text-sm text-gray-600",children:"Tingkat Kepercayaan"}),(0,a.jsxs)("span",{className:"text-lg font-semibold text-green-600",children:[e.confidence,"%"]})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2 mb-4",children:a.jsx("div",{className:"bg-green-600 h-2 rounded-full transition-all",style:{width:`${e.confidence}%`}})}),(0,a.jsxs)("div",{className:"flex items-center justify-center",children:["up"===e.trend&&(0,a.jsxs)("span",{className:"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800",children:[a.jsx("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),e.change]}),"peak"===e.trend&&(0,a.jsxs)("span",{className:"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800",children:[a.jsx("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z",clipRule:"evenodd"})}),e.change]})]})]})]},e.title))}),(0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6",children:[(0,a.jsxs)("div",{className:"lg:col-span-2 bg-white rounded-lg shadow p-6",children:[a.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-6",children:"Faktor Risiko Utama"}),a.jsx("div",{className:"space-y-4",children:[{factor:"Urbanisasi Tinggi",impact:"Tinggi",score:8.5,color:"bg-red-500"},{factor:"Polusi Udara",impact:"Tinggi",score:8.2,color:"bg-red-500"},{factor:"Gaya Hidup Tidak Sehat",impact:"Sedang",score:7.1,color:"bg-yellow-500"},{factor:"Penuaan Populasi",impact:"Sedang",score:6.8,color:"bg-yellow-500"},{factor:"Akses Layanan Kesehatan",impact:"Rendah",score:4.5,color:"bg-green-500"}].map(e=>(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[a.jsx("span",{className:"text-sm font-medium text-gray-900",children:e.factor}),a.jsx("span",{className:`px-2 py-1 text-xs font-semibold rounded-full ${"Tinggi"===e.impact?"bg-red-100 text-red-800":"Sedang"===e.impact?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"}`,children:e.impact})]}),(0,a.jsxs)("span",{className:"text-sm font-bold text-gray-900",children:[e.score,"/10"]})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-3",children:a.jsx("div",{className:`${e.color} h-3 rounded-full transition-all`,style:{width:`${10*e.score}%`}})})]},e.factor))}),a.jsx("div",{className:"mt-6 p-4 bg-blue-50 rounded-lg",children:(0,a.jsxs)("div",{className:"flex items-start gap-2",children:[a.jsx("svg",{className:"w-5 h-5 text-blue-600 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-blue-900 mb-1",children:"Rekomendasi AI"}),a.jsx("p",{className:"text-xs text-blue-700",children:"Fokus pencegahan pada daerah urban dengan tingkat polusi tinggi. Kampanye edukasi gaya hidup sehat dapat mengurangi risiko hingga 23%."})]})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-6",children:"Akurasi Model"}),(0,a.jsxs)("div",{className:"space-y-6",children:[[{metric:"Akurasi Model",value:"84.7%",description:"Tingkat akurasi prediksi"},{metric:"Mean Absolute Error",value:"8.2",description:"Rata-rata kesalahan absolut"},{metric:"R\xb2 Score",value:"0.89",description:"Koefisien determinasi"},{metric:"Training Data",value:"3,247",description:"Jumlah data pelatihan"}].map(e=>(0,a.jsxs)("div",{className:"border-b pb-4 last:border-b-0 last:pb-0",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[a.jsx("span",{className:"text-sm font-medium text-gray-700",children:e.metric}),a.jsx("span",{className:"text-lg font-bold text-green-600",children:e.value})]}),a.jsx("p",{className:"text-xs text-gray-500",children:e.description})]},e.metric)),(0,a.jsxs)("div",{className:"bg-green-50 rounded-lg p-4 mt-6",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[a.jsx("svg",{className:"w-5 h-5 text-green-600",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})}),a.jsx("p",{className:"text-sm font-medium text-green-900",children:"Model Terverifikasi"})]}),a.jsx("p",{className:"text-xs text-green-700",children:"Model telah divalidasi dengan data historis 3 tahun terakhir"})]})]})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,a.jsxs)("div",{className:"px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50",children:[a.jsx("h2",{className:"text-xl font-semibold text-gray-900",children:"Prediksi Hotspot Regional"}),a.jsx("p",{className:"text-sm text-gray-600 mt-1",children:"Provinsi dengan prediksi peningkatan kasus tertinggi - 3 bulan ke depan"})]}),a.jsx("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[a.jsx("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Provinsi"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Kasus Saat Ini"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Prediksi Kasus"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Peningkatan"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tingkat Risiko"})]})}),a.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:[{province:"DKI Jakarta",currentCases:276,predictedCases:312,increase:13,riskLevel:"Sangat Tinggi",color:"text-red-600"},{province:"Jawa Barat",currentCases:324,predictedCases:368,increase:13.6,riskLevel:"Sangat Tinggi",color:"text-red-600"},{province:"Jawa Timur",currentCases:298,predictedCases:334,increase:12.1,riskLevel:"Tinggi",color:"text-orange-600"},{province:"Banten",currentCases:156,predictedCases:181,increase:16,riskLevel:"Tinggi",color:"text-orange-600"},{province:"Sumatera Utara",currentCases:187,predictedCases:207,increase:10.7,riskLevel:"Sedang",color:"text-yellow-600"}].map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("svg",{className:`w-5 h-5 mr-2 ${e.color}`,fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",clipRule:"evenodd"})}),a.jsx("span",{className:"text-sm font-medium text-gray-900",children:e.province})]})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("span",{className:"text-sm text-gray-900",children:e.currentCases})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("span",{className:"text-sm font-semibold text-gray-900",children:e.predictedCases})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("svg",{className:"w-4 h-4 text-red-600 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),(0,a.jsxs)("span",{className:"text-sm font-medium text-red-600",children:["+",e.increase,"%"]})]})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("span",{className:`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${"Sangat Tinggi"===e.riskLevel?"bg-red-100 text-red-800":"Tinggi"===e.riskLevel?"bg-orange-100 text-orange-800":"bg-yellow-100 text-yellow-800"}`,children:e.riskLevel})})]},e.province))})]})}),a.jsx("div",{className:"px-6 py-4 bg-gray-50 border-t border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[a.jsx("span",{className:"text-gray-600",children:"Berdasarkan model prediktif AI dengan data historis 2021-2024"}),a.jsx("button",{className:"text-green-600 hover:text-green-700 font-medium",children:"Download Laporan Lengkap"})]})})]})]})}},377:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>n});let a=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\analytics\predictions\page.tsx`),{__esModule:r,$$typeof:i}=a,n=a.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>ep});var a,r=s(3729);let i={data:""},n=e=>e||i,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",a="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":a+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(i,n):i+":"+n+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e},m=(e,t,s,a,r)=>{let i=u(e),n=p[i]||(p[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=l.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(s=t[3].replace(d," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);p[n]=c(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let m=s&&p.g?p.g:null;return s&&(p.g=p[n]),((e,t,s,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(p[n],t,a,m),n},x=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function g(e){let t=this||{},s=e.call?e(t.p):e;return m(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}g.bind({g:1});let h,f,y,v=g.bind({k:1});function b(e,t){let s=this||{};return function(){let a=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;s.p=Object.assign({theme:f&&f()},l),s.o=/ *go\d+/.test(o),l.className=g.apply(s,a)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),y&&d[0]&&y(l),h(d,l)}return t?t(r):r}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),P="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return A(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},C=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},E={},M=(e,t=P)=>{E[t]=A(E[t]||D,e),C.forEach(([e,s])=>{e===t&&s(E[t])})},R=e=>Object.keys(E).forEach(t=>M(e,t)),S=e=>Object.keys(E).find(t=>E[t].toasts.some(t=>t.id===e)),T=(e=P)=>t=>{M(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},q=(e={},t=P)=>{let[s,a]=(0,r.useState)(E[t]||D),i=(0,r.useRef)(E[t]);(0,r.useEffect)(()=>(i.current!==E[t]&&a(E[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let n=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:n}},L=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||w()}),z=e=>(t,s)=>{let a=L(t,e,s);return T(a.toasterId||S(a.id))({type:2,toast:a}),a.id},I=(e,t)=>z("blank")(e,t);I.error=z("error"),I.success=z("success"),I.loading=z("loading"),I.custom=z("custom"),I.dismiss=(e,t)=>{let s={type:3,toastId:e};t?T(t)(s):R(s)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let s={type:4,toastId:e};t?T(t)(s):R(s)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,s)=>{let a=I.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?N(t.success,e):void 0;return r?I.success(r,{id:a,...s,...null==s?void 0:s.success}):I.dismiss(a),e}).catch(e=>{let r=t.error?N(t.error,e):void 0;r?I.error(r,{id:a,...s,...null==s?void 0:s.error}):I.dismiss(a)}),e};var O=1e3,_=(e,t="default")=>{let{toasts:s,pausedAt:a}=q(e,t),i=(0,r.useRef)(new Map).current,n=(0,r.useCallback)((e,t=O)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&I.dismiss(s.id);return}return setTimeout(()=>I.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let l=(0,r.useCallback)(T(t),[t]),o=(0,r.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,r.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,r.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),p=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,n]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:p}}},B=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,F=b("div")`
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
`,U=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,G=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=v`
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
}`,Z=b("div")`
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
`,X=b("div")`
  position: absolute;
`,Y=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(W,null,t):t:"blank"===s?null:r.createElement(Y,null,r.createElement(V,{...a}),"loading"!==s&&r.createElement(X,null,"error"===s?r.createElement(F,{...a}):r.createElement(Z,{...a})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=b("div")`
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
`,er=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${v(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=r.createElement(ee,{toast:e}),l=r.createElement(er,{...e.ariaProps},N(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:n,message:l}):r.createElement(r.Fragment,null,n,l))});a=r.createElement,c.p=void 0,h=a,f=void 0,y=void 0;var el=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let n=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:n,className:t,style:s},i)},eo=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ed=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=_(s,n);return r.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let n=s.position||t,l=eo(n,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(el,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:l},"custom"===s.type?N(s.message,s):i?i(s):r.createElement(en,{toast:s,position:n}))}))},ep=I}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[7141,4192,2528],()=>s(8921));module.exports=a})();