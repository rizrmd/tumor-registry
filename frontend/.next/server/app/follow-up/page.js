(()=>{var e={};e.id=5,e.ids=[5],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},8824:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>l.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var a=s(482),r=s(9108),i=s(2563),l=s.n(i),o=s(8300),n={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>o[e]);s.d(t,n);let d=["",{children:["follow-up",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,8575)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\follow-up\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\follow-up\\page.tsx"],u="/follow-up/page",p={require:s,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/follow-up/page",pathname:"/follow-up",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},7344:(e,t,s)=>{Promise.resolve().then(s.bind(s,1008))},2254:(e,t,s)=>{e.exports=s(4767)},1008:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var a=s(2295),r=s(3729),i=s(3973),l=s(2528),o=s(8119),n=s(2254);function d(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),d=(0,n.useRouter)(),[c,u]=(0,r.useState)(!0),[p,m]=(0,r.useState)({totalActivePatients:0,upcomingVisits:0,overdueVisits:0,complianceRate:0}),[x,h]=(0,r.useState)([]),[g,f]=(0,r.useState)([]),[y,b]=(0,r.useState)("all"),[v,w]=(0,r.useState)("all"),[j,N]=(0,r.useState)("");(0,r.useEffect)(()=>{if(!s&&!t){d.push("/login");return}t&&D()},[t,s,d]),(0,r.useEffect)(()=>{k()},[x,y,v,j]);let D=async()=>{try{u(!0);let e=await o.Z.getAllVisits();h(e);let t=new Date,s=new Set(e.map(e=>e.patientId)).size,a=e.filter(e=>"scheduled"===e.status),r=a.filter(e=>{let s=new Date(e.scheduledDate),a=Math.ceil((s.getTime()-t.getTime())/864e5);return a>=0&&a<=30}),i=a.filter(e=>new Date(e.scheduledDate)<t),l=e.filter(e=>"completed"===e.status).length,n=e.length;m({totalActivePatients:s,upcomingVisits:r.length,overdueVisits:i.length,complianceRate:n>0?Math.round(l/n*100):0})}catch(e){console.error("Error loading follow-up data:",e)}finally{u(!1)}},k=()=>{let e=[...x];if("all"!==y){if("overdue"===y){let t=new Date;e=e.filter(e=>{let s=new Date(e.scheduledDate);return"scheduled"===e.status&&s<t})}else e=e.filter(e=>e.status===y)}"all"!==v&&(e=e.filter(e=>e.visitNumber===parseInt(v))),j&&(e=e.filter(e=>e.patient?.name?.toLowerCase().includes(j.toLowerCase())||e.patient?.inamsosRecordNumber?.toLowerCase().includes(j.toLowerCase())||e.patient?.hospitalRecordNumber?.toLowerCase().includes(j.toLowerCase()))),e.sort((e,t)=>new Date(e.scheduledDate).getTime()-new Date(t.scheduledDate).getTime()),f(e)},A=e=>{let t=new Date,s=new Date(e.scheduledDate);if("scheduled"===e.status&&s<t)return a.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800",children:"Overdue"});let r={scheduled:"bg-blue-100 text-blue-800",completed:"bg-green-100 text-green-800",missed:"bg-red-100 text-red-800",cancelled:"bg-gray-100 text-gray-800"}[e.status]||"bg-gray-100 text-gray-800";return a.jsx("span",{className:`px-2 py-1 text-xs font-semibold rounded-full ${r}`,children:e.status})},C=e=>{let t=new Date,s=Math.ceil((new Date(e).getTime()-t.getTime())/864e5);return s<0?`${Math.abs(s)} days overdue`:0===s?"Today":1===s?"Tomorrow":`in ${s} days`};return s||c?a.jsx(l.A,{children:a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),a.jsx("p",{className:"mt-4 text-gray-600",children:"Loading follow-up data..."})]})})}):(0,a.jsxs)(l.A,{children:[(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"14-Visit Follow-up Protocol"}),a.jsx("p",{className:"text-gray-600",children:"Monitor and manage longitudinal follow-up visits over 5 years"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[a.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Active Patients"}),a.jsx("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:p.totalActivePatients})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDC65"})]})}),a.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Upcoming (30 days)"}),a.jsx("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:p.upcomingVisits})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDCC5"})]})}),a.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Overdue Visits"}),a.jsx("p",{className:"text-3xl font-bold text-red-600 mt-2",children:p.overdueVisits})]}),a.jsx("div",{className:"text-4xl",children:"\uD83D\uDEA8"})]})}),a.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Compliance Rate"}),(0,a.jsxs)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:[p.complianceRate,"%"]})]}),a.jsx("div",{className:"text-4xl",children:"✅"})]})})]}),a.jsx("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Search Patient"}),a.jsx("input",{type:"text",value:j,onChange:e=>N(e.target.value),placeholder:"Name or MR Number",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Status"}),(0,a.jsxs)("select",{value:y,onChange:e=>b(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[a.jsx("option",{value:"all",children:"All Statuses"}),a.jsx("option",{value:"scheduled",children:"Scheduled"}),a.jsx("option",{value:"overdue",children:"Overdue"}),a.jsx("option",{value:"completed",children:"Completed"}),a.jsx("option",{value:"missed",children:"Missed"}),a.jsx("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Visit Number"}),(0,a.jsxs)("select",{value:v,onChange:e=>w(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[a.jsx("option",{value:"all",children:"All Visits"}),[...Array(14)].map((e,t)=>(0,a.jsxs)("option",{value:t+1,children:["Visit #",t+1]},t+1))]})]}),a.jsx("div",{className:"flex items-end",children:a.jsx("button",{onClick:D,className:"w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"\uD83D\uDD04 Refresh"})})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[a.jsx("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Follow-up Visits (",g.length,")"]})}),0===g.length?(0,a.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[a.jsx("div",{className:"text-6xl mb-4",children:"\uD83D\uDCC5"}),a.jsx("p",{className:"text-lg font-medium",children:"No visits found"}),a.jsx("p",{className:"text-sm mt-2",children:"Try adjusting your filters or search query"})]}):a.jsx("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[a.jsx("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Patient"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"MR Number"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Visit #"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Scheduled Date"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Days Until"}),a.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),a.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Actions"})]})}),a.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:g.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.patient?.name||"Unknown"})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("div",{className:"text-sm text-gray-900",children:e.patient?.inamsosRecordNumber||e.patient?.hospitalRecordNumber||"-"})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800",children:["Visit #",e.visitNumber]})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("div",{className:"text-sm text-gray-900",children:new Date(e.scheduledDate).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("div",{className:"text-sm text-gray-600",children:C(e.scheduledDate)})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:A(e)}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:[a.jsx("button",{onClick:()=>d.push(`/patients/${e.patientId}`),className:"text-blue-600 hover:text-blue-900 mr-3",children:"View Patient"}),"scheduled"===e.status&&a.jsx("button",{onClick:()=>d.push(`/demo/follow-up-calendar?patient=${e.patientId}`),className:"text-green-600 hover:text-green-900",children:"Enter Data"})]})]},e.id))})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mt-8",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Visit Completion Rate by Visit Number"}),a.jsx("div",{className:"grid grid-cols-7 gap-2",children:[...Array(14)].map((e,t)=>{let s=t+1,r=x.filter(e=>e.visitNumber===s).length,i=x.filter(e=>e.visitNumber===s&&"completed"===e.status).length,l=r>0?Math.round(i/r*100):0;return(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsxs)("div",{className:"mb-2",children:[(0,a.jsxs)("div",{className:"text-xs font-medium text-gray-600 mb-1",children:["V",s]}),a.jsx("div",{className:"bg-blue-500 rounded-t",style:{height:`${Math.max(l,5)}px`},title:`${l}% completed`}),(0,a.jsxs)("div",{className:"text-xs font-semibold text-gray-900 mt-1",children:[l,"%"]})]}),(0,a.jsxs)("div",{className:"text-xs text-gray-500",children:[i,"/",r]})]},s)})})]})]})}},8119:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var a=s(7530);class r{async generateSchedule(e){return(await a.Z.post("/follow-ups/generate-schedule",e)).data}async createVisit(e){return(await a.Z.post("/follow-ups",e)).data}async getAllVisits(e,t){let s={};return e&&(s.patientId=e),t&&(s.status=t),(await a.Z.get("/follow-ups",{params:s})).data}async getVisitById(e){return(await a.Z.get(`/follow-ups/${e}`)).data}async getVisitsByPatient(e){return(await a.Z.get(`/follow-ups/patient/${e}`)).data}async getPatientSummary(e){return(await a.Z.get(`/follow-ups/patient/${e}/summary`)).data}async updateVisit(e,t){return(await a.Z.put(`/follow-ups/${e}`,t)).data}async deleteVisit(e){await a.Z.delete(`/follow-ups/${e}`)}getStatusColor(e){return({scheduled:"blue",completed:"green",missed:"red",cancelled:"gray"})[e]||"gray"}getClinicalStatusColor(e){return({NED:"green",AWD:"yellow",DOD:"red",DOC:"gray"})[e||""]||"gray"}}let i=new r},8575:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>l});let a=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\follow-up\page.tsx`),{__esModule:r,$$typeof:i}=a,l=a.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>eu});var a,r=s(3729);let i={data:""},l=e=>e||i,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",a="",r="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":a+="f"==i[1]?c(l,i):i+"{"+c(l,"k"==i[1]?"":t)+"}":"object"==typeof l?a+=c(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(i,l):i+":"+l+";")}return s+(t&&r?t+"{"+r+"}":r)+a},u={},p=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+p(e[s]);return t}return e},m=(e,t,s,a,r)=>{let i=p(e),l=u[i]||(u[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!u[l]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(s=t[3].replace(d," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);u[l]=c(r?{["@keyframes "+l]:t}:t,s?"":"."+l)}let m=s&&u.g?u.g:null;return s&&(u.g=u[l]),((e,t,s,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(u[l],t,a,m),l},x=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return m(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,f,y,b=h.bind({k:1});function v(e,t){let s=this||{};return function(){let a=arguments;function r(i,l){let o=Object.assign({},i),n=o.className||r.className;s.p=Object.assign({theme:f&&f()},o),s.o=/ *go\d+/.test(n),o.className=h.apply(s,a)+(n?" "+n:""),t&&(o.ref=l);let d=e;return e[0]&&(d=o.as||e,delete o.as),y&&d[0]&&y(o),g(d,o)}return t?t(r):r}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),D=(()=>{let e;return()=>e})(),k="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return A(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},C=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},E={},S=(e,t=k)=>{E[t]=A(E[t]||P,e),C.forEach(([e,s])=>{e===t&&s(E[t])})},$=e=>Object.keys(E).forEach(t=>S(e,t)),q=e=>Object.keys(E).find(t=>E[t].toasts.some(t=>t.id===e)),V=(e=k)=>t=>{S(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=k)=>{let[s,a]=(0,r.useState)(E[t]||P),i=(0,r.useRef)(E[t]);(0,r.useEffect)(()=>(i.current!==E[t]&&a(E[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let l=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:l}},M=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),R=e=>(t,s)=>{let a=M(t,e,s);return V(a.toasterId||q(a.id))({type:2,toast:a}),a.id},T=(e,t)=>R("blank")(e,t);T.error=R("error"),T.success=R("success"),T.loading=R("loading"),T.custom=R("custom"),T.dismiss=(e,t)=>{let s={type:3,toastId:e};t?V(t)(s):$(s)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let s={type:4,toastId:e};t?V(t)(s):$(s)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,s)=>{let a=T.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?j(t.success,e):void 0;return r?T.success(r,{id:a,...s,...null==s?void 0:s.success}):T.dismiss(a),e}).catch(e=>{let r=t.error?j(t.error,e):void 0;r?T.error(r,{id:a,...s,...null==s?void 0:s.error}):T.dismiss(a)}),e};var _=1e3,L=(e,t="default")=>{let{toasts:s,pausedAt:a}=I(e,t),i=(0,r.useRef)(new Map).current,l=(0,r.useCallback)((e,t=_)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&T.dismiss(s.id);return}return setTimeout(()=>T.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let o=(0,r.useCallback)(V(t),[t]),n=(0,r.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,r.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,r.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},l=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=l.findIndex(t=>t.id===e.id),n=l.filter((e,t)=>t<o&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,l]),{toasts:s,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}},z=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Z=b`
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
}`,U=v("div")`
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
`,H=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,B=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=b`
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
}`,X=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
}`,Q=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(Q,null,t):t:"blank"===s?null:r.createElement(J,null,r.createElement(H,{...a}),"loading"!==s&&r.createElement(Y,null,"error"===s?r.createElement(U,{...a}):r.createElement(X,{...a})))},et=e=>`
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
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=D()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},l=r.createElement(ee,{toast:e}),o=r.createElement(er,{...e.ariaProps},j(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:l,message:o}):r.createElement(r.Fragment,null,l,o))});a=r.createElement,c.p=void 0,g=a,f=void 0,y=void 0;var eo=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let l=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:l,className:t,style:s},i)},en=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:D()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:l,containerStyle:o,containerClassName:n})=>{let{toasts:d,handlers:c}=L(s,l);return r.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let l=s.position||t,o=en(l,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(eo,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:o},"custom"===s.type?j(s.message,s):i?i(s):r.createElement(el,{toast:s,position:l}))}))},eu=T}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[7141,4192,2528],()=>s(8824));module.exports=a})();