(()=>{var e={};e.id=3005,e.ids=[3005],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},3939:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>l.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var r=s(482),a=s(9108),i=s(2563),l=s.n(i),n=s(8300),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);s.d(t,o);let d=["",{children:["follow-up",{children:["reminders",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,4477)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\follow-up\\reminders\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\follow-up\\reminders\\page.tsx"],u="/follow-up/reminders/page",m={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/follow-up/reminders/page",pathname:"/follow-up/reminders",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},4706:(e,t,s)=>{Promise.resolve().then(s.bind(s,8685))},2254:(e,t,s)=>{e.exports=s(4767)},8685:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var r=s(2295),a=s(3729),i=s(3973),l=s(2528),n=s(8119),o=s(2254);function d(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),d=(0,o.useRouter)(),[c,u]=(0,a.useState)(!0),[m,p]=(0,a.useState)([]),[x,h]=(0,a.useState)([]),[g,y]=(0,a.useState)(7),[f,b]=(0,a.useState)(new Set);(0,a.useEffect)(()=>{if(!s&&!t){d.push("/login");return}t&&j()},[t,s,d]);let j=async()=>{try{u(!0);let e=await n.Z.getAllVisits(void 0,"scheduled");p(e);let t=new Date,s=e.map(e=>{let s=new Date(e.scheduledDate).getTime()-t.getTime();return{id:e.id,patientId:e.patientId,patientName:e.patient?.name||"Unknown",mrNumber:e.patient?.hospitalRecordNumber||"-",visitNumber:e.visitNumber,scheduledDate:e.scheduledDate,daysUntil:Math.ceil(s/864e5),reminderSent:e.reminderSent||!1,status:e.reminderSent?"sent":"pending"}}).filter(e=>e.daysUntil<=30&&e.daysUntil>=-2).sort((e,t)=>e.daysUntil-t.daysUntil);h(s)}catch(e){console.error("Error loading reminder data:",e)}finally{u(!1)}},v=e=>{let t=new Set(f);t.has(e)?t.delete(e):t.add(e),b(t)},w=()=>{let e=x.filter(e=>e.daysUntil<=g).map(e=>e.id);b(new Set(e))},N=()=>{b(new Set)},S=async()=>{try{for(let e of(u(!0),Array.from(f)))await n.Z.updateVisit(e,{reminderSent:!0,reminderDate:new Date().toISOString(),reminderMethod:"Manual/Email"});alert(`✅ Success!

${f.size} reminders have been tracked as SENT manually.

Note: Automated sending via SMS/WhatsApp is still in development.`),await j(),N()}catch(e){console.error("Error sending reminders:",e),alert("Error updating reminder status. Please try again.")}finally{u(!1)}},D=e=>e<=1?r.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800",children:"Urgent"}):e<=3?r.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800",children:"High"}):e<=7?r.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800",children:"Medium"}):r.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800",children:"Low"}),k=x.filter(e=>e.daysUntil<=g);return s||c?r.jsx(l.A,{children:r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Loading reminder queue..."})]})})}):(0,r.jsxs)(l.A,{children:[(0,r.jsxs)("div",{className:"mb-6",children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Follow-up Reminder Management"}),r.jsx("p",{className:"text-gray-600",children:"Automated reminder system for upcoming follow-up visits"})]}),r.jsx("div",{className:"bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6",children:(0,r.jsxs)("div",{className:"flex items-start",children:[r.jsx("span",{className:"text-2xl mr-3",children:"\uD83D\uDEA7"}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-sm font-semibold text-yellow-900",children:"Feature In Development"}),r.jsx("p",{className:"text-sm text-yellow-800 mt-1",children:"Automated SMS/Email reminder system requires backend integration with notification service. This page currently shows the reminder queue and allows manual tracking."})]})]})}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total in Queue"}),r.jsx("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:x.length})]}),r.jsx("div",{className:"text-4xl",children:"\uD83D\uDCCB"})]})}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Need Reminder"}),r.jsx("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:k.length})]}),r.jsx("div",{className:"text-4xl",children:"\uD83D\uDD14"})]}),(0,r.jsxs)("p",{className:"text-xs text-gray-500 mt-2",children:["Within ",g," days"]})]}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Urgent (≤3 days)"}),r.jsx("p",{className:"text-3xl font-bold text-red-600 mt-2",children:x.filter(e=>e.daysUntil<=3).length})]}),r.jsx("div",{className:"text-4xl",children:"\uD83D\uDEA8"})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Selected"}),r.jsx("p",{className:"text-3xl font-bold text-green-600 mt-2",children:f.size})]}),r.jsx("div",{className:"text-4xl",children:"✅"})]})})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Reminder Settings"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Send Reminder (Days Before Visit)"}),(0,r.jsxs)("select",{value:g,onChange:e=>y(parseInt(e.target.value)),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[r.jsx("option",{value:1,children:"1 day before"}),r.jsx("option",{value:3,children:"3 days before"}),r.jsx("option",{value:7,children:"7 days before"}),r.jsx("option",{value:14,children:"14 days before"}),r.jsx("option",{value:30,children:"30 days before"})]})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Reminder Method"}),r.jsx("select",{disabled:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500",children:r.jsx("option",{children:"SMS + Email (Default)"})}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Requires backend configuration"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Reminder Template"}),r.jsx("select",{disabled:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500",children:r.jsx("option",{children:"Default Template"})}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Requires backend configuration"})]})]})]}),k.length>0&&r.jsx("div",{className:"bg-white rounded-lg shadow p-4 mb-6",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsxs)("button",{onClick:w,className:"text-sm text-blue-600 hover:text-blue-800 font-medium",children:["Select All (",k.length,")"]}),r.jsx("button",{onClick:N,className:"text-sm text-gray-600 hover:text-gray-800 font-medium",children:"Clear Selection"})]}),(0,r.jsxs)("button",{onClick:S,disabled:0===f.size,className:"px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",children:["\uD83D\uDCE7 Send Reminders (",f.size,")"]})]})}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[r.jsx("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,r.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Reminder Queue (",x.length," visits)"]})}),0===x.length?(0,r.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[r.jsx("div",{className:"text-6xl mb-4",children:"✉️"}),r.jsx("p",{className:"text-lg font-medium",children:"No upcoming visits"}),r.jsx("p",{className:"text-sm mt-2",children:"All visits are completed or scheduled beyond 30 days"})]}):r.jsx("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[r.jsx("thead",{className:"bg-gray-50",children:(0,r.jsxs)("tr",{children:[r.jsx("th",{className:"px-6 py-3 text-left",children:r.jsx("input",{type:"checkbox",checked:f.size===k.length&&k.length>0,onChange:()=>{f.size===k.length?N():w()},className:"rounded border-gray-300 text-blue-600 focus:ring-blue-500"})}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Patient"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"MR Number"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Visit #"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Scheduled Date"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Days Until"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Priority"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"})]})}),r.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:x.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[r.jsx("td",{className:"px-6 py-4",children:r.jsx("input",{type:"checkbox",checked:f.has(e.id),onChange:()=>v(e.id),className:"rounded border-gray-300 text-blue-600 focus:ring-blue-500"})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.patientName})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-900",children:e.mrNumber})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsxs)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800",children:["Visit #",e.visitNumber]})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-900",children:new Date(e.scheduledDate).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:`text-sm font-semibold ${e.daysUntil<=1?"text-red-600":e.daysUntil<=3?"text-orange-600":e.daysUntil<=7?"text-yellow-600":"text-gray-600"}`,children:0===e.daysUntil?"Today":1===e.daysUntil?"Tomorrow":`${e.daysUntil} days`})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:D(e.daysUntil)}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.reminderSent?r.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800",children:"Sent"}):r.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800",children:"Pending"})})]},e.id))})]})})]}),(0,r.jsxs)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8",children:[r.jsx("h3",{className:"text-lg font-semibold text-blue-900 mb-4",children:"ℹ️ About Automated Reminders"}),(0,r.jsxs)("div",{className:"text-sm text-blue-800 space-y-2",children:[r.jsx("p",{children:r.jsx("strong",{children:"When implemented, the reminder system will:"})}),(0,r.jsxs)("ul",{className:"list-disc list-inside ml-4 space-y-1",children:[r.jsx("li",{children:"Automatically send SMS/Email reminders based on configured schedule"}),r.jsx("li",{children:"Track delivery status and failed attempts"}),r.jsx("li",{children:"Support custom reminder templates"}),r.jsx("li",{children:"Allow bulk reminder sending for multiple patients"}),r.jsx("li",{children:"Provide reminder history and analytics"}),r.jsx("li",{children:"Support WhatsApp Business API integration (optional)"})]}),r.jsx("p",{className:"mt-4",children:r.jsx("strong",{children:"Required Backend Services:"})}),(0,r.jsxs)("ul",{className:"list-disc list-inside ml-4 space-y-1",children:[r.jsx("li",{children:"SMS Gateway (Twilio, AWS SNS, or local provider)"}),r.jsx("li",{children:"Email Service (SendGrid, AWS SES, or SMTP)"}),r.jsx("li",{children:"Notification Queue (Bull/Redis)"}),r.jsx("li",{children:"Scheduled Jobs (Cron or Task Scheduler)"})]})]})]})]})}},8119:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(7530);class a{async generateSchedule(e){return(await r.Z.post("/follow-ups/generate-schedule",e)).data}async createVisit(e){return(await r.Z.post("/follow-ups",e)).data}async getAllVisits(e,t){let s={};return e&&(s.patientId=e),t&&(s.status=t),(await r.Z.get("/follow-ups",{params:s})).data}async getVisitById(e){return(await r.Z.get(`/follow-ups/${e}`)).data}async getVisitsByPatient(e){return(await r.Z.get(`/follow-ups/patient/${e}`)).data}async getPatientSummary(e){return(await r.Z.get(`/follow-ups/patient/${e}/summary`)).data}async updateVisit(e,t){return(await r.Z.put(`/follow-ups/${e}`,t)).data}async deleteVisit(e){await r.Z.delete(`/follow-ups/${e}`)}getStatusColor(e){return({scheduled:"blue",completed:"green",missed:"red",cancelled:"gray"})[e]||"gray"}getClinicalStatusColor(e){return({NED:"green",AWD:"yellow",DOD:"red",DOC:"gray"})[e||""]||"gray"}}let i=new a},4477:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>a,default:()=>l});let r=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\follow-up\reminders\page.tsx`),{__esModule:a,$$typeof:i}=r,l=r.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>eu});var r,a=s(3729);let i={data:""},l=e=>e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":r+="f"==i[1]?c(l,i):i+"{"+c(l,"k"==i[1]?"":t)+"}":"object"==typeof l?r+=c(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,l):i+":"+l+";")}return s+(t&&a?t+"{"+a+"}":a)+r},u={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e},p=(e,t,s,r,a)=>{let i=m(e),l=u[i]||(u[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!u[l]){let t=i!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);u[l]=c(a?{["@keyframes "+l]:t}:t,s?"":"."+l)}let p=s&&u.g?u.g:null;return s&&(u.g=u[l]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(u[l],t,r,p),l},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return p(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,y,f,b=h.bind({k:1});function j(e,t){let s=this||{};return function(){let r=arguments;function a(i,l){let n=Object.assign({},i),o=n.className||a.className;s.p=Object.assign({theme:y&&y()},n),s.o=/ *go\d+/.test(o),n.className=h.apply(s,r)+(o?" "+o:""),t&&(n.ref=l);let d=e;return e[0]&&(d=n.as||e,delete n.as),f&&d[0]&&f(n),g(d,n)}return t?t(a):a}}var v=e=>"function"==typeof e,w=(e,t)=>v(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),S=(()=>{let e;return()=>e})(),D="default",k=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},q=(e,t=D)=>{P[t]=k(P[t]||E,e),A.forEach(([e,s])=>{e===t&&s(P[t])})},C=e=>Object.keys(P).forEach(t=>q(e,t)),$=e=>Object.keys(P).find(t=>P[t].toasts.some(t=>t.id===e)),M=(e=D)=>t=>{q(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=(e={},t=D)=>{let[s,r]=(0,a.useState)(P[t]||E),i=(0,a.useRef)(P[t]);(0,a.useEffect)(()=>(i.current!==P[t]&&r(P[t]),A.push([t,r]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let l=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:l}},T=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),O=e=>(t,s)=>{let r=T(t,e,s);return M(r.toasterId||$(r.id))({type:2,toast:r}),r.id},U=(e,t)=>O("blank")(e,t);U.error=O("error"),U.success=O("success"),U.loading=O("loading"),U.custom=O("custom"),U.dismiss=(e,t)=>{let s={type:3,toastId:e};t?M(t)(s):C(s)},U.dismissAll=e=>U.dismiss(void 0,e),U.remove=(e,t)=>{let s={type:4,toastId:e};t?M(t)(s):C(s)},U.removeAll=e=>U.remove(void 0,e),U.promise=(e,t,s)=>{let r=U.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?U.success(a,{id:r,...s,...null==s?void 0:s.success}):U.dismiss(r),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?U.error(a,{id:r,...s,...null==s?void 0:s.error}):U.dismiss(r)}),e};var z=1e3,_=(e,t="default")=>{let{toasts:s,pausedAt:r}=R(e,t),i=(0,a.useRef)(new Map).current,l=(0,a.useCallback)((e,t=z)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&U.dismiss(s.id);return}return setTimeout(()=>U.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,a.useCallback)(M(t),[t]),o=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},l=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...r?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,l]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}},Z=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,V=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${V} 0.15s ease-out forwards;
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
    animation: ${L} 0.15s ease-out forwards;
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
`,W=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,G=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=b`
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
}`,Q=j("div")`
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
    animation: ${H} 0.2s ease-out forwards;
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
`,J=j("div")`
  position: absolute;
`,X=j("div")`
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
}`,K=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(K,null,t):t:"blank"===s?null:a.createElement(X,null,a.createElement(W,{...r}),"loading"!==s&&a.createElement(J,null,"error"===s?a.createElement(B,{...r}):a.createElement(Q,{...r})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=j("div")`
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
`,ea=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=S()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},l=a.createElement(ee,{toast:e}),n=a.createElement(ea,{...e.ariaProps},w(e.message,e));return a.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:l,message:n}):a.createElement(a.Fragment,null,l,n))});r=a.createElement,c.p=void 0,g=r,y=void 0,f=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let l=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:l,className:t,style:s},i)},eo=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:S()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:l,containerStyle:n,containerClassName:o})=>{let{toasts:d,handlers:c}=_(s,l);return a.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let l=s.position||t,n=eo(l,c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return a.createElement(en,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?w(s.message,s):i?i(s):a.createElement(el,{toast:s,position:l}))}))},eu=U}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[7141,4192,2528],()=>s(3939));module.exports=r})();