(()=>{var e={};e.id=4300,e.ids=[4300],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},6604:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>d,routeModule:()=>x,tree:()=>c});var a=s(482),r=s(9108),i=s(2563),n=s.n(i),l=s(8300),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);s.d(t,o);let c=["",{children:["analytics",{children:["staging",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,4057)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\analytics\\staging\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],d=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\analytics\\staging\\page.tsx"],m="/analytics/staging/page",p={require:s,loadChunk:()=>Promise.resolve()},x=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/analytics/staging/page",pathname:"/analytics/staging",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},7836:(e,t,s)=>{Promise.resolve().then(s.bind(s,5745))},2254:(e,t,s)=>{e.exports=s(4767)},5745:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var a=s(2295),r=s(3729),i=s(3973),n=s(2528),l=s(2254);function o(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),o=(0,l.useRouter)(),[c,d]=(0,r.useState)(!0),[m,p]=(0,r.useState)([]),[x,u]=(0,r.useState)([]),[g,h]=(0,r.useState)([]),[y,f]=(0,r.useState)([]),[b,v]=(0,r.useState)("all");(0,r.useEffect)(()=>{if(!s&&!t){o.push("/login");return}t&&j()},[t,s,o,b]);let j=async()=>{try{d(!0),p([{stage:"IA (Low grade, intracompartmental)",count:245,percentage:28.9,avgAge:34.2,maleCount:138,femaleCount:107},{stage:"IB (Low grade, extracompartmental)",count:189,percentage:22.3,avgAge:38.7,maleCount:105,femaleCount:84},{stage:"IIA (High grade, intracompartmental)",count:168,percentage:19.8,avgAge:28.5,maleCount:95,femaleCount:73},{stage:"IIB (High grade, extracompartmental)",count:156,percentage:18.4,avgAge:31.2,maleCount:87,femaleCount:69},{stage:"III (Metastasis)",count:89,percentage:10.5,avgAge:35.8,maleCount:48,femaleCount:41}]),u([{tumorType:"Osteosarcoma",IA:45,IB:38,IIA:78,IIB:89,III:35,total:285},{tumorType:"Ewing Sarcoma",IA:28,IB:32,IIA:42,IIB:38,III:16,total:156},{tumorType:"Chondrosarcoma",IA:52,IB:48,IIA:22,IIB:8,III:4,total:134},{tumorType:"Giant Cell Tumor",IA:58,IB:32,IIA:6,IIB:2,III:0,total:98},{tumorType:"Soft Tissue Sarcoma",IA:62,IB:39,IIA:20,IIB:19,III:34,total:174}]),h([{year:"2020",earlyStage:156,locallyAdvanced:98,metastatic:28},{year:"2021",earlyStage:178,locallyAdvanced:112,metastatic:32},{year:"2022",earlyStage:189,locallyAdvanced:125,metastatic:35},{year:"2023",earlyStage:212,locallyAdvanced:138,metastatic:38},{year:"2024",earlyStage:245,locallyAdvanced:156,metastatic:45}]),f([{stage:"IA",oneYear:98.4,threeYear:94.2,fiveYear:89.7,patientCount:245},{stage:"IB",oneYear:96.8,threeYear:91.5,fiveYear:85.3,patientCount:189},{stage:"IIA",oneYear:89.3,threeYear:72.8,fiveYear:58.4,patientCount:168},{stage:"IIB",oneYear:78.2,threeYear:54.6,fiveYear:38.9,patientCount:156},{stage:"III",oneYear:52.8,threeYear:28.3,fiveYear:15.7,patientCount:89}])}catch(e){console.error("Error loading staging analytics:",e)}finally{d(!1)}},I=e=>e.includes("IA")?"bg-green-100 text-green-800":e.includes("IB")?"bg-blue-100 text-blue-800":e.includes("IIA")?"bg-yellow-100 text-yellow-800":e.includes("IIB")?"bg-orange-100 text-orange-800":e.includes("III")?"bg-red-100 text-red-800":"bg-gray-100 text-gray-800",N=e=>e>=80?"text-green-600":e>=60?"text-yellow-600":e>=40?"text-orange-600":"text-red-600";if(s||c)return a.jsx(n.A,{children:a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),a.jsx("p",{className:"mt-4 text-gray-600",children:"Loading staging analytics..."})]})})});let w=m.reduce((e,t)=>e+t.count,0),A=m.filter(e=>e.stage.includes("IA")||e.stage.includes("IB")).reduce((e,t)=>e+t.count,0),k=w>0?(A/w*100).toFixed(1):"0.0";return(0,a.jsxs)(n.A,{children:[a.jsx("div",{className:"mb-6",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{children:[a.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Enneking Staging Analysis"}),a.jsx("p",{className:"text-gray-600",children:"Staging distribution and outcomes for musculoskeletal tumors"})]}),a.jsx("div",{children:(0,a.jsxs)("select",{value:b,onChange:e=>v(e.target.value),className:"px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[a.jsx("option",{value:"all",children:"All Time"}),a.jsx("option",{value:"5y",children:"Last 5 Years"}),a.jsx("option",{value:"3y",children:"Last 3 Years"}),a.jsx("option",{value:"1y",children:"Last Year"})]})})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[a.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total Patients"}),a.jsx("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:w})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDC65"})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Early Stage (IA-IB)"}),a.jsx("p",{className:"text-3xl font-bold text-green-600 mt-2",children:A})]}),a.jsx("div",{className:"text-4xl",children:"✅"})]}),(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-2",children:[k,"% of total"]})]}),a.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Advanced (IIA-IIB)"}),a.jsx("p",{className:"text-3xl font-bold text-yellow-600 mt-2",children:m.filter(e=>e.stage.includes("IIA")||e.stage.includes("IIB")).reduce((e,t)=>e+t.count,0)})]}),a.jsx("div",{className:"text-4xl",children:"⚠️"})]})}),a.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Metastatic (III)"}),a.jsx("p",{className:"text-3xl font-bold text-red-600 mt-2",children:m.filter(e=>e.stage.includes("III")).reduce((e,t)=>e+t.count,0)})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDD34"})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Enneking Staging Distribution"}),a.jsx("div",{className:"space-y-4",children:m.map((e,t)=>(0,a.jsxs)("div",{className:"border-b border-gray-200 pb-4 last:border-0",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[a.jsx("span",{className:`px-3 py-1 rounded-full text-sm font-semibold ${I(e.stage)}`,children:e.stage}),(0,a.jsxs)("span",{className:"text-sm text-gray-600",children:[e.count," patients (",e.percentage,"%)"]})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-6 text-sm text-gray-600",children:[(0,a.jsxs)("span",{children:["Avg Age: ",e.avgAge," yrs"]}),(0,a.jsxs)("span",{children:["M: ",e.maleCount]}),(0,a.jsxs)("span",{children:["F: ",e.femaleCount]})]})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-3",children:a.jsx("div",{className:`h-3 rounded-full ${e.stage.includes("IA")?"bg-green-500":e.stage.includes("IB")?"bg-blue-500":e.stage.includes("IIA")?"bg-yellow-500":e.stage.includes("IIB")?"bg-orange-500":"bg-red-500"}`,style:{width:`${e.percentage}%`}})})]},t))})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Staging Distribution by Tumor Type"}),a.jsx("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[a.jsx("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tumor Type"}),a.jsx("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IA"}),a.jsx("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IB"}),a.jsx("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IIA"}),a.jsx("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IIB"}),a.jsx("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"III"}),a.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total"})]})}),a.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:x.map((e,t)=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.tumorType})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:a.jsx("div",{className:"text-sm text-green-600 font-medium",children:e.IA})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:a.jsx("div",{className:"text-sm text-blue-600 font-medium",children:e.IB})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:a.jsx("div",{className:"text-sm text-yellow-600 font-medium",children:e.IIA})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:a.jsx("div",{className:"text-sm text-orange-600 font-medium",children:e.IIB})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:a.jsx("div",{className:"text-sm text-red-600 font-medium",children:e.III})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:a.jsx("div",{className:"text-sm font-bold text-gray-900",children:e.total})})]},t))})]})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Staging Trends Over Time"}),a.jsx("div",{className:"space-y-4",children:g.map((e,t)=>(0,a.jsxs)("div",{className:"border-b border-gray-200 pb-4 last:border-0",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[a.jsx("span",{className:"text-sm font-semibold text-gray-900",children:e.year}),(0,a.jsxs)("span",{className:"text-sm text-gray-600",children:["Total: ",e.earlyStage+e.locallyAdvanced+e.metastatic]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[a.jsx("span",{className:"text-gray-600",children:"Early Stage (IA-IB)"}),a.jsx("span",{className:"text-green-600 font-medium",children:e.earlyStage})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[a.jsx("span",{className:"text-gray-600",children:"Locally Advanced (IIA-IIB)"}),a.jsx("span",{className:"text-yellow-600 font-medium",children:e.locallyAdvanced})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[a.jsx("span",{className:"text-gray-600",children:"Metastatic (III)"}),a.jsx("span",{className:"text-red-600 font-medium",children:e.metastatic})]})]})]},t))})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Survival Rates by Enneking Stage"}),a.jsx("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[a.jsx("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[a.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Stage"}),a.jsx("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"1-Yr"}),a.jsx("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"3-Yr"}),a.jsx("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"5-Yr"}),a.jsx("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"N"})]})}),a.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:y.map((e,t)=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[a.jsx("td",{className:"px-4 py-3 whitespace-nowrap",children:a.jsx("span",{className:`px-2 py-1 rounded text-xs font-semibold ${I(e.stage)}`,children:e.stage})}),a.jsx("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:(0,a.jsxs)("span",{className:`text-sm font-semibold ${N(e.oneYear)}`,children:[e.oneYear,"%"]})}),a.jsx("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:(0,a.jsxs)("span",{className:`text-sm font-semibold ${N(e.threeYear)}`,children:[e.threeYear,"%"]})}),a.jsx("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:(0,a.jsxs)("span",{className:`text-sm font-semibold ${N(e.fiveYear)}`,children:[e.fiveYear,"%"]})}),a.jsx("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:a.jsx("span",{className:"text-sm text-gray-600",children:e.patientCount})})]},t))})]})})]})]})]})}},4057:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>n});let a=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\analytics\staging\page.tsx`),{__esModule:r,$$typeof:i}=a,n=a.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ed,ZP:()=>em});var a,r=s(3729);let i={data:""},n=e=>e||i,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let s="",a="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":a+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(i,n):i+":"+n+";")}return s+(t&&r?t+"{"+r+"}":r)+a},m={},p=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+p(e[s]);return t}return e},x=(e,t,s,a,r)=>{let i=p(e),n=m[i]||(m[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!m[n]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=l.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(s=t[3].replace(c," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(c," ").trim();return a[0]})(e);m[n]=d(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let x=s&&m.g?m.g:null;return s&&(m.g=m[n]),((e,t,s,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(m[n],t,a,x),n},u=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function g(e){let t=this||{},s=e.call?e(t.p):e;return x(s.unshift?s.raw?u(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}g.bind({g:1});let h,y,f,b=g.bind({k:1});function v(e,t){let s=this||{};return function(){let a=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;s.p=Object.assign({theme:y&&y()},l),s.o=/ *go\d+/.test(o),l.className=g.apply(s,a)+(o?" "+o:""),t&&(l.ref=n);let c=e;return e[0]&&(c=l.as||e,delete l.as),f&&c[0]&&f(l),h(c,l)}return t?t(r):r}}var j=e=>"function"==typeof e,I=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),w=(()=>{let e;return()=>e})(),A="default",k=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return k(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},E={},D=(e,t=A)=>{E[t]=k(E[t]||C,e),S.forEach(([e,s])=>{e===t&&s(E[t])})},P=e=>Object.keys(E).forEach(t=>D(e,t)),B=e=>Object.keys(E).find(t=>E[t].toasts.some(t=>t.id===e)),T=(e=A)=>t=>{D(t,e)},Y={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e={},t=A)=>{let[s,a]=(0,r.useState)(E[t]||C),i=(0,r.useRef)(E[t]);(0,r.useEffect)(()=>(i.current!==E[t]&&a(E[t]),S.push([t,a]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let n=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||Y[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:n}},q=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),O=e=>(t,s)=>{let a=q(t,e,s);return T(a.toasterId||B(a.id))({type:2,toast:a}),a.id},M=(e,t)=>O("blank")(e,t);M.error=O("error"),M.success=O("success"),M.loading=O("loading"),M.custom=O("custom"),M.dismiss=(e,t)=>{let s={type:3,toastId:e};t?T(t)(s):P(s)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let s={type:4,toastId:e};t?T(t)(s):P(s)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,s)=>{let a=M.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?I(t.success,e):void 0;return r?M.success(r,{id:a,...s,...null==s?void 0:s.success}):M.dismiss(a),e}).catch(e=>{let r=t.error?I(t.error,e):void 0;r?M.error(r,{id:a,...s,...null==s?void 0:s.error}):M.dismiss(a)}),e};var _=1e3,L=(e,t="default")=>{let{toasts:s,pausedAt:a}=$(e,t),i=(0,r.useRef)(new Map).current,n=(0,r.useCallback)((e,t=_)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&M.dismiss(s.id);return}return setTimeout(()=>M.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let l=(0,r.useCallback)(T(t),[t]),o=(0,r.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),c=(0,r.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),d=(0,r.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),m=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,n]),{toasts:s,handlers:{updateHeight:c,startPause:o,endPause:d,calculateOffset:m}}},z=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=b`
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

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
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
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=b`
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
  animation: ${G} 1s linear infinite;
`,Z=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=b`
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
}`,J=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,K=v("div")`
  position: absolute;
`,Q=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=b`
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
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(W,null,t):t:"blank"===s?null:r.createElement(Q,null,r.createElement(U,{...a}),"loading"!==s&&r.createElement(K,null,"error"===s?r.createElement(H,{...a}):r.createElement(J,{...a})))},et=e=>`
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
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=r.createElement(ee,{toast:e}),l=r.createElement(er,{...e.ariaProps},I(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:n,message:l}):r.createElement(r.Fragment,null,n,l))});a=r.createElement,d.p=void 0,h=a,y=void 0,f=void 0;var el=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let n=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:n,className:t,style:s},i)},eo=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:w()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ec=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:c,handlers:d}=L(s,n);return r.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(s=>{let n=s.position||t,l=eo(n,d.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(el,{id:s.id,key:s.id,onHeightUpdate:d.updateHeight,className:s.visible?ec:"",style:l},"custom"===s.type?I(s.message,s):i?i(s):r.createElement(en,{toast:s,position:n}))}))},em=M}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[7141,4192,2528],()=>s(6604));module.exports=a})();