(()=>{var e={};e.id=1577,e.ids=[1577],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},4450:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>l.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>d,routeModule:()=>u,tree:()=>c});var s=a(482),r=a(9108),i=a(2563),l=a.n(i),n=a(8300),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);a.d(t,o);let c=["",{children:["analytics",{children:["limb-salvage",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,5418)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\analytics\\limb-salvage\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],d=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\analytics\\limb-salvage\\page.tsx"],m="/analytics/limb-salvage/page",p={require:a,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/analytics/limb-salvage/page",pathname:"/analytics/limb-salvage",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2314:(e,t,a)=>{Promise.resolve().then(a.bind(a,9373))},2254:(e,t,a)=>{e.exports=a(4767)},9373:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var s=a(2295),r=a(3729),i=a(3973),l=a(2528),n=a(2254);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),o=(0,n.useRouter)(),[c,d]=(0,r.useState)(!0),[m,p]=(0,r.useState)({totalProcedures:0,salvageCount:0,amputationCount:0,salvageRate:0}),[u,x]=(0,r.useState)([]),[g,h]=(0,r.useState)([]),[f,y]=(0,r.useState)([]),[v,b]=(0,r.useState)("all");(0,r.useEffect)(()=>{if(!a&&!t){o.push("/login");return}t&&j()},[t,a,o,v]);let j=async()=>{try{d(!0),p({totalProcedures:847,salvageCount:698,amputationCount:149,salvageRate:82.4}),x([{tumorType:"Osteosarcoma",total:285,salvage:225,amputation:60,salvageRate:78.9},{tumorType:"Ewing Sarcoma",total:156,salvage:138,amputation:18,salvageRate:88.5},{tumorType:"Chondrosarcoma",total:134,salvage:121,amputation:13,salvageRate:90.3},{tumorType:"Giant Cell Tumor",total:98,salvage:95,amputation:3,salvageRate:96.9},{tumorType:"Soft Tissue Sarcoma",total:174,salvage:119,amputation:55,salvageRate:68.4}]),h([{stage:"IA (Low grade, intracompartmental)",total:245,salvage:241,amputation:4,salvageRate:98.4},{stage:"IB (Low grade, extracompartmental)",total:189,salvage:178,amputation:11,salvageRate:94.2},{stage:"IIA (High grade, intracompartmental)",total:168,salvage:142,amputation:26,salvageRate:84.5},{stage:"IIB (High grade, extracompartmental)",total:156,salvage:95,amputation:61,salvageRate:60.9},{stage:"III (Metastasis)",total:89,salvage:42,amputation:47,salvageRate:47.2}]),y([{centerId:"1",centerName:"RSUPN Dr. Cipto Mangunkusumo",total:156,salvage:139,amputation:17,salvageRate:89.1,rank:1},{centerId:"2",centerName:"RSUP Dr. Sardjito",total:134,salvage:116,amputation:18,salvageRate:86.6,rank:2},{centerId:"3",centerName:"RSUP Dr. Soetomo",total:128,salvage:109,amputation:19,salvageRate:85.2,rank:3},{centerId:"4",centerName:"RSUP Dr. Hasan Sadikin",total:98,salvage:81,amputation:17,salvageRate:82.7,rank:4},{centerId:"5",centerName:"RSOP Prof. Dr. Soeharso",total:89,salvage:72,amputation:17,salvageRate:80.9,rank:5}])}catch(e){console.error("Error loading limb salvage analytics:",e)}finally{d(!1)}},N=e=>e>=85?"text-green-600":e>=70?"text-yellow-600":"text-red-600",w=e=>e>=85?"bg-green-100":e>=70?"bg-yellow-100":"bg-red-100";return a||c?s.jsx(l.A,{children:s.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),s.jsx("p",{className:"mt-4 text-gray-600",children:"Loading limb salvage analytics..."})]})})}):(0,s.jsxs)(l.A,{children:[s.jsx("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[s.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Limb Salvage vs Amputation Analytics"}),s.jsx("p",{className:"text-gray-600",children:"Key surgical outcome metrics for musculoskeletal tumors"})]}),s.jsx("div",{children:(0,s.jsxs)("select",{value:v,onChange:e=>b(e.target.value),className:"px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[s.jsx("option",{value:"all",children:"All Time"}),s.jsx("option",{value:"1y",children:"Last Year"}),s.jsx("option",{value:"6m",children:"Last 6 Months"}),s.jsx("option",{value:"3m",children:"Last 3 Months"})]})})]})}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[s.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[s.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total Procedures"}),s.jsx("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:m.totalProcedures})]}),s.jsx("div",{className:"text-4xl",children:"\uD83C\uDFE5"})]})}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[s.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Limb Salvage"}),s.jsx("p",{className:"text-3xl font-bold text-green-600 mt-2",children:m.salvageCount})]}),s.jsx("div",{className:"text-4xl",children:"✅"})]}),(0,s.jsxs)("p",{className:"text-sm text-gray-500 mt-2",children:[m.salvageRate,"% of total"]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[s.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Amputation"}),s.jsx("p",{className:"text-3xl font-bold text-red-600 mt-2",children:m.amputationCount})]}),s.jsx("div",{className:"text-4xl",children:"⚠️"})]}),(0,s.jsxs)("p",{className:"text-sm text-gray-500 mt-2",children:[(100-m.salvageRate).toFixed(1),"% of total"]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[s.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Salvage Rate"}),(0,s.jsxs)("p",{className:`text-3xl font-bold mt-2 ${N(m.salvageRate)}`,children:[m.salvageRate,"%"]})]}),s.jsx("div",{className:"text-4xl",children:"\uD83D\uDCCA"})]}),s.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2 mt-3",children:s.jsx("div",{className:`h-2 rounded-full ${m.salvageRate>=85?"bg-green-500":m.salvageRate>=70?"bg-yellow-500":"bg-red-500"}`,style:{width:`${m.salvageRate}%`}})})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[s.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Limb Salvage Rate by Tumor Type"}),s.jsx("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[s.jsx("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[s.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tumor Type"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amputation"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage Rate"})]})}),s.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:u.map((e,t)=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[s.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:s.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.tumorType})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:s.jsx("div",{className:"text-sm text-gray-900",children:e.total})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:s.jsx("div",{className:"text-sm text-green-600 font-medium",children:e.salvage})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:s.jsx("div",{className:"text-sm text-red-600 font-medium",children:e.amputation})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsxs)("span",{className:`px-3 py-1 rounded-full text-sm font-semibold ${w(e.salvageRate)} ${N(e.salvageRate)}`,children:[e.salvageRate,"%"]})})]},t))})]})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[s.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Limb Salvage Rate by Enneking Staging"}),s.jsx("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[s.jsx("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[s.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Enneking Stage"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amputation"}),s.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage Rate"})]})}),s.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:g.map((e,t)=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[s.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:s.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.stage})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:s.jsx("div",{className:"text-sm text-gray-900",children:e.total})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:s.jsx("div",{className:"text-sm text-green-600 font-medium",children:e.salvage})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:s.jsx("div",{className:"text-sm text-red-600 font-medium",children:e.amputation})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsxs)("span",{className:`px-3 py-1 rounded-full text-sm font-semibold ${w(e.salvageRate)} ${N(e.salvageRate)}`,children:[e.salvageRate,"%"]})})]},t))})]})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[s.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Center Performance Leaderboard"}),s.jsx("div",{className:"space-y-4",children:f.map(e=>(0,s.jsxs)("div",{className:"flex items-center space-x-4 p-4 bg-gray-50 rounded-lg",children:[s.jsx("div",{className:"flex-shrink-0 w-10 h-10 flex items-center justify-center",children:e.rank<=3?s.jsx("span",{className:"text-2xl",children:1===e.rank?"\uD83E\uDD47":2===e.rank?"\uD83E\uDD48":"\uD83E\uDD49"}):s.jsx("span",{className:"text-gray-500 font-semibold text-lg",children:e.rank})}),(0,s.jsxs)("div",{className:"flex-1",children:[s.jsx("p",{className:"text-sm font-medium text-gray-900",children:e.centerName}),(0,s.jsxs)("div",{className:"flex items-center space-x-4 text-xs text-gray-500 mt-1",children:[(0,s.jsxs)("span",{children:[e.total," procedures"]}),s.jsx("span",{children:"•"}),(0,s.jsxs)("span",{className:"text-green-600",children:[e.salvage," salvage"]}),s.jsx("span",{children:"•"}),(0,s.jsxs)("span",{className:"text-red-600",children:[e.amputation," amputation"]})]})]}),s.jsx("div",{children:(0,s.jsxs)("span",{className:`px-4 py-2 rounded-full text-lg font-bold ${w(e.salvageRate)} ${N(e.salvageRate)}`,children:[e.salvageRate,"%"]})})]},e.centerId))})]})]})}},5418:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>l});let s=(0,a(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\analytics\limb-salvage\page.tsx`),{__esModule:r,$$typeof:i}=s,l=s.default},4669:(e,t,a)=>{"use strict";a.d(t,{x7:()=>ed,ZP:()=>em});var s,r=a(3729);let i={data:""},l=e=>e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let a="",s="",r="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+l+";":s+="f"==i[1]?d(l,i):i+"{"+d(l,"k"==i[1]?"":t)+"}":"object"==typeof l?s+=d(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(i,l):i+":"+l+";")}return a+(t&&r?t+"{"+r+"}":r)+s},m={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e},u=(e,t,a,s,r)=>{let i=p(e),l=m[i]||(m[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!m[l]){let t=i!==e?e:(e=>{let t,a,s=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?s.shift():t[3]?(a=t[3].replace(c," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(c," ").trim();return s[0]})(e);m[l]=d(r?{["@keyframes "+l]:t}:t,a?"":"."+l)}let u=a&&m.g?m.g:null;return a&&(m.g=m[l]),((e,t,a,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(m[l],t,s,u),l},x=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function g(e){let t=this||{},a=e.call?e(t.p):e;return u(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let h,f,y,v=g.bind({k:1});function b(e,t){let a=this||{};return function(){let s=arguments;function r(i,l){let n=Object.assign({},i),o=n.className||r.className;a.p=Object.assign({theme:f&&f()},n),a.o=/ *go\d+/.test(o),n.className=g.apply(a,s)+(o?" "+o:""),t&&(n.ref=l);let c=e;return e[0]&&(c=n.as||e,delete n.as),y&&c[0]&&y(n),h(c,n)}return t?t(r):r}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),R="default",S=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return S(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},E=(e,t=R)=>{A[t]=S(A[t]||P,e),D.forEach(([e,a])=>{e===t&&a(A[t])})},I=e=>Object.keys(A).forEach(t=>E(e,t)),$=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),C=(e=R)=>t=>{E(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},q=(e={},t=R)=>{let[a,s]=(0,r.useState)(A[t]||P),i=(0,r.useRef)(A[t]);(0,r.useEffect)(()=>(i.current!==A[t]&&s(A[t]),D.push([t,s]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let l=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:l}},O=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||w()}),L=e=>(t,a)=>{let s=O(t,e,a);return C(s.toasterId||$(s.id))({type:2,toast:s}),s.id},M=(e,t)=>L("blank")(e,t);M.error=L("error"),M.success=L("success"),M.loading=L("loading"),M.custom=L("custom"),M.dismiss=(e,t)=>{let a={type:3,toastId:e};t?C(t)(a):I(a)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let a={type:4,toastId:e};t?C(t)(a):I(a)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,a)=>{let s=M.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?N(t.success,e):void 0;return r?M.success(r,{id:s,...a,...null==a?void 0:a.success}):M.dismiss(s),e}).catch(e=>{let r=t.error?N(t.error,e):void 0;r?M.error(r,{id:s,...a,...null==a?void 0:a.error}):M.dismiss(s)}),e};var _=1e3,z=(e,t="default")=>{let{toasts:a,pausedAt:s}=q(e,t),i=(0,r.useRef)(new Map).current,l=(0,r.useCallback)((e,t=_)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);(0,r.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&M.dismiss(a.id);return}return setTimeout(()=>M.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let n=(0,r.useCallback)(C(t),[t]),o=(0,r.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,r.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,r.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),m=(0,r.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},l=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,r.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,l]),{toasts:a,handlers:{updateHeight:c,startPause:o,endPause:d,calculateOffset:m}}},F=v`
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
}`,U=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=b("div")`
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
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,Z=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=v`
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
}`,X=b("div")`
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
    animation: ${K} 0.2s ease-out forwards;
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
`,J=b("div")`
  position: absolute;
`,Q=b("div")`
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
}`,W=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?r.createElement(W,null,t):t:"blank"===a?null:r.createElement(Q,null,r.createElement(Y,{...s}),"loading"!==a&&r.createElement(J,null,"error"===a?r.createElement(G,{...s}):r.createElement(X,{...s})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=b("div")`
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
`,ei=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(a),ea(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=r.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},l=r.createElement(ee,{toast:e}),n=r.createElement(er,{...e.ariaProps},N(e.message,e));return r.createElement(es,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof s?s({icon:l,message:n}):r.createElement(r.Fragment,null,l,n))});s=r.createElement,d.p=void 0,h=s,f=void 0,y=void 0;var en=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let l=r.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return r.createElement("div",{ref:l,className:t,style:a},i)},eo=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},ec=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:l,containerStyle:n,containerClassName:o})=>{let{toasts:c,handlers:d}=z(a,l);return r.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let l=a.position||t,n=eo(l,d.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return r.createElement(en,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?ec:"",style:n},"custom"===a.type?N(a.message,a):i?i(a):r.createElement(el,{toast:a,position:l}))}))},em=M}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[7141,4192,2528],()=>a(4450));module.exports=s})();