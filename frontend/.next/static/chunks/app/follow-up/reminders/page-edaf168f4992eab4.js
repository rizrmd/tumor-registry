(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3005],{2509:function(e,t,s){Promise.resolve().then(s.bind(s,4831))},4831:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return o}});var a=s(7437),i=s(2265),r=s(6986),l=s(4894),n=s(776),d=s(4033);function o(){let{user:e,isAuthenticated:t,isLoading:s}=(0,r.useAuth)(),o=(0,d.useRouter)(),[c,m]=(0,i.useState)(!0),[u,p]=(0,i.useState)([]),[x,h]=(0,i.useState)([]),[g,f]=(0,i.useState)(7),[y,b]=(0,i.useState)(new Set);(0,i.useEffect)(()=>{if(!s&&!t){o.push("/login");return}t&&v()},[t,s,o]);let v=async()=>{try{m(!0);let e=await n.Z.getAllVisits(void 0,"scheduled");p(e);let t=new Date,s=e.map(e=>{var s,a;let i=new Date(e.scheduledDate).getTime()-t.getTime();return{id:e.id,patientId:e.patientId,patientName:(null===(s=e.patient)||void 0===s?void 0:s.name)||"Unknown",mrNumber:(null===(a=e.patient)||void 0===a?void 0:a.hospitalRecordNumber)||"-",visitNumber:e.visitNumber,scheduledDate:e.scheduledDate,daysUntil:Math.ceil(i/864e5),reminderSent:e.reminderSent||!1,status:e.reminderSent?"sent":"pending"}}).filter(e=>e.daysUntil<=30&&e.daysUntil>=-2).sort((e,t)=>e.daysUntil-t.daysUntil);h(s)}catch(e){console.error("Error loading reminder data:",e)}finally{m(!1)}},j=e=>{let t=new Set(y);t.has(e)?t.delete(e):t.add(e),b(t)},w=()=>{let e=x.filter(e=>e.daysUntil<=g).map(e=>e.id);b(new Set(e))},N=()=>{b(new Set)},S=async()=>{try{for(let e of(m(!0),Array.from(y)))await n.Z.updateVisit(e,{reminderSent:!0,reminderDate:new Date().toISOString(),reminderMethod:"Manual/Email"});alert("✅ Success!\n\n"+"".concat(y.size," reminders have been tracked as SENT manually.\n\n")+"Note: Automated sending via SMS/WhatsApp is still in development."),await v(),N()}catch(e){console.error("Error sending reminders:",e),alert("Error updating reminder status. Please try again.")}finally{m(!1)}},k=e=>e<=1?(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800",children:"Urgent"}):e<=3?(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800",children:"High"}):e<=7?(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800",children:"Medium"}):(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800",children:"Low"}),D=x.filter(e=>e.daysUntil<=g);return s||c?(0,a.jsx)(l.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading reminder queue..."})]})})}):(0,a.jsxs)(l.A,{children:[(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Follow-up Reminder Management"}),(0,a.jsx)("p",{className:"text-gray-600",children:"Automated reminder system for upcoming follow-up visits"})]}),(0,a.jsx)("div",{className:"bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6",children:(0,a.jsxs)("div",{className:"flex items-start",children:[(0,a.jsx)("span",{className:"text-2xl mr-3",children:"\uD83D\uDEA7"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-yellow-900",children:"Feature In Development"}),(0,a.jsx)("p",{className:"text-sm text-yellow-800 mt-1",children:"Automated SMS/Email reminder system requires backend integration with notification service. This page currently shows the reminder queue and allows manual tracking."})]})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total in Queue"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:x.length})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDCCB"})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Need Reminder"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:D.length})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDD14"})]}),(0,a.jsxs)("p",{className:"text-xs text-gray-500 mt-2",children:["Within ",g," days"]})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Urgent (≤3 days)"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-red-600 mt-2",children:x.filter(e=>e.daysUntil<=3).length})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDEA8"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Selected"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:y.size})]}),(0,a.jsx)("div",{className:"text-4xl",children:"✅"})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Reminder Settings"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Send Reminder (Days Before Visit)"}),(0,a.jsxs)("select",{value:g,onChange:e=>f(parseInt(e.target.value)),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,a.jsx)("option",{value:1,children:"1 day before"}),(0,a.jsx)("option",{value:3,children:"3 days before"}),(0,a.jsx)("option",{value:7,children:"7 days before"}),(0,a.jsx)("option",{value:14,children:"14 days before"}),(0,a.jsx)("option",{value:30,children:"30 days before"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Reminder Method"}),(0,a.jsx)("select",{disabled:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500",children:(0,a.jsx)("option",{children:"SMS + Email (Default)"})}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"Requires backend configuration"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Reminder Template"}),(0,a.jsx)("select",{disabled:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500",children:(0,a.jsx)("option",{children:"Default Template"})}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"Requires backend configuration"})]})]})]}),D.length>0&&(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-4 mb-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,a.jsxs)("button",{onClick:w,className:"text-sm text-blue-600 hover:text-blue-800 font-medium",children:["Select All (",D.length,")"]}),(0,a.jsx)("button",{onClick:N,className:"text-sm text-gray-600 hover:text-gray-800 font-medium",children:"Clear Selection"})]}),(0,a.jsxs)("button",{onClick:S,disabled:0===y.size,className:"px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",children:["\uD83D\uDCE7 Send Reminders (",y.size,")"]})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,a.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Reminder Queue (",x.length," visits)"]})}),0===x.length?(0,a.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,a.jsx)("div",{className:"text-6xl mb-4",children:"✉️"}),(0,a.jsx)("p",{className:"text-lg font-medium",children:"No upcoming visits"}),(0,a.jsx)("p",{className:"text-sm mt-2",children:"All visits are completed or scheduled beyond 30 days"})]}):(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left",children:(0,a.jsx)("input",{type:"checkbox",checked:y.size===D.length&&D.length>0,onChange:()=>{y.size===D.length?N():w()},className:"rounded border-gray-300 text-blue-600 focus:ring-blue-500"})}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Patient"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"MR Number"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Visit #"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Scheduled Date"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Days Until"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Priority"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:x.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4",children:(0,a.jsx)("input",{type:"checkbox",checked:y.has(e.id),onChange:()=>j(e.id),className:"rounded border-gray-300 text-blue-600 focus:ring-blue-500"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.patientName})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:e.mrNumber})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800",children:["Visit #",e.visitNumber]})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:new Date(e.scheduledDate).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-semibold ".concat(e.daysUntil<=1?"text-red-600":e.daysUntil<=3?"text-orange-600":e.daysUntil<=7?"text-yellow-600":"text-gray-600"),children:0===e.daysUntil?"Today":1===e.daysUntil?"Tomorrow":"".concat(e.daysUntil," days")})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:k(e.daysUntil)}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:e.reminderSent?(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800",children:"Sent"}):(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800",children:"Pending"})})]},e.id))})]})})]}),(0,a.jsxs)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8",children:[(0,a.jsx)("h3",{className:"text-lg font-semibold text-blue-900 mb-4",children:"ℹ️ About Automated Reminders"}),(0,a.jsxs)("div",{className:"text-sm text-blue-800 space-y-2",children:[(0,a.jsx)("p",{children:(0,a.jsx)("strong",{children:"When implemented, the reminder system will:"})}),(0,a.jsxs)("ul",{className:"list-disc list-inside ml-4 space-y-1",children:[(0,a.jsx)("li",{children:"Automatically send SMS/Email reminders based on configured schedule"}),(0,a.jsx)("li",{children:"Track delivery status and failed attempts"}),(0,a.jsx)("li",{children:"Support custom reminder templates"}),(0,a.jsx)("li",{children:"Allow bulk reminder sending for multiple patients"}),(0,a.jsx)("li",{children:"Provide reminder history and analytics"}),(0,a.jsx)("li",{children:"Support WhatsApp Business API integration (optional)"})]}),(0,a.jsx)("p",{className:"mt-4",children:(0,a.jsx)("strong",{children:"Required Backend Services:"})}),(0,a.jsxs)("ul",{className:"list-disc list-inside ml-4 space-y-1",children:[(0,a.jsx)("li",{children:"SMS Gateway (Twilio, AWS SNS, or local provider)"}),(0,a.jsx)("li",{children:"Email Service (SendGrid, AWS SES, or SMTP)"}),(0,a.jsx)("li",{children:"Notification Queue (Bull/Redis)"}),(0,a.jsx)("li",{children:"Scheduled Jobs (Cron or Task Scheduler)"})]})]})]})]})}},776:function(e,t,s){"use strict";var a=s(6383);class i{async generateSchedule(e){return(await a.Z.post("/follow-ups/generate-schedule",e)).data}async createVisit(e){return(await a.Z.post("/follow-ups",e)).data}async getAllVisits(e,t){let s={};return e&&(s.patientId=e),t&&(s.status=t),(await a.Z.get("/follow-ups",{params:s})).data}async getVisitById(e){return(await a.Z.get("/follow-ups/".concat(e))).data}async getVisitsByPatient(e){return(await a.Z.get("/follow-ups/patient/".concat(e))).data}async getPatientSummary(e){return(await a.Z.get("/follow-ups/patient/".concat(e,"/summary"))).data}async updateVisit(e,t){return(await a.Z.put("/follow-ups/".concat(e),t)).data}async deleteVisit(e){await a.Z.delete("/follow-ups/".concat(e))}getStatusColor(e){return({scheduled:"blue",completed:"green",missed:"red",cancelled:"gray"})[e]||"gray"}getClinicalStatusColor(e){return({NED:"green",AWD:"yellow",DOD:"red",DOC:"gray"})[e||""]||"gray"}}t.Z=new i},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,i;s.d(t,{x7:function(){return eu},ZP:function(){return ep}});var r,l=s(2265);let n={data:""},d=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let s="",a="",i="";for(let r in e){let l=e[r];"@"==r[0]?"i"==r[1]?s=r+" "+l+";":a+="f"==r[1]?u(l,r):r+"{"+u(l,"k"==r[1]?"":t)+"}":"object"==typeof l?a+=u(l,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=l&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=u.p?u.p(r,l):r+":"+l+";")}return s+(t&&i?t+"{"+i+"}":i)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,i)=>{var r;let l=x(e),n=p[l]||(p[l]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(l));if(!p[n]){let t=l!==e?e:(e=>{let t,s,a=[{}];for(;t=o.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);p[n]=u(i?{["@keyframes "+n]:t}:t,s?"":"."+n)}let d=s&&p.g?p.g:null;return s&&(p.g=p[n]),r=p[n],d?t.data=t.data.replace(d,r):-1===t.data.indexOf(r)&&(t.data=a?r+t.data:t.data+r),n},g=(e,t,s)=>e.reduce((e,a,i)=>{let r=t[i];if(r&&r.call){let e=r(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==r?"":r)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,d(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function w(e,t){let s=this||{};return function(){let a=arguments;function i(r,l){let n=Object.assign({},r),d=n.className||i.className;s.p=Object.assign({theme:b&&b()},n),s.o=/ *go\d+/.test(d),n.className=f.apply(s,a)+(d?" "+d:""),t&&(n.ref=l);let o=e;return e[0]&&(o=n.as||e,delete n.as),v&&o[0]&&v(n),y(o,n)}return t?t(i):i}}var N=e=>"function"==typeof e,S=(e,t)=>N(e)?e(t):e,k=(a=0,()=>(++a).toString()),D=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},E="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return A(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},C=[],U={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},M=(e,t=E)=>{I[t]=A(I[t]||U,e),C.forEach(([e,s])=>{e===t&&s(I[t])})},O=e=>Object.keys(I).forEach(t=>M(e,t)),P=e=>Object.keys(I).find(t=>I[t].toasts.some(t=>t.id===e)),R=(e=E)=>t=>{M(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e={},t=E)=>{let[s,a]=(0,l.useState)(I[t]||U),i=(0,l.useRef)(I[t]);(0,l.useEffect)(()=>(i.current!==I[t]&&a(I[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let r=s.toasts.map(t=>{var s,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...s,toasts:r}},z=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||k()}),Z=e=>(t,s)=>{let a=z(t,e,s);return R(a.toasterId||P(a.id))({type:2,toast:a}),a.id},_=(e,t)=>Z("blank")(e,t);_.error=Z("error"),_.success=Z("success"),_.loading=Z("loading"),_.custom=Z("custom"),_.dismiss=(e,t)=>{let s={type:3,toastId:e};t?R(t)(s):O(s)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let s={type:4,toastId:e};t?R(t)(s):O(s)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,s)=>{let a=_.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?S(t.success,e):void 0;return i?_.success(i,{id:a,...s,...null==s?void 0:s.success}):_.dismiss(a),e}).catch(e=>{let i=t.error?S(t.error,e):void 0;i?_.error(i,{id:a,...s,...null==s?void 0:s.error}):_.dismiss(a)}),e};var V=1e3,L=(e,t="default")=>{let{toasts:s,pausedAt:a}=$(e,t),i=(0,l.useRef)(new Map).current,r=(0,l.useCallback)((e,t=V)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,l.useEffect)(()=>{if(a)return;let e=Date.now(),i=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&_.dismiss(s.id);return}return setTimeout(()=>_.dismiss(s.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,l.useCallback)(R(t),[t]),d=(0,l.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),o=(0,l.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,l.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),m=(0,l.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:r}=t||{},l=s.filter(t=>(t.position||r)===(e.position||r)&&t.height),n=l.findIndex(t=>t.id===e.id),d=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[d+1]:[0,d]).reduce((e,t)=>e+(t.height||0)+i,0)},[s]);return(0,l.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,r]),{toasts:s,handlers:{updateHeight:o,startPause:d,endPause:c,calculateOffset:m}}},B=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,W=w("div")`
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
    animation: ${q} 0.15s ease-out forwards;
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
`,H=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Q=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${H} 1s linear infinite;
`,G=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=j`
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
}`,Y=w("div")`
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
`,K=w("div")`
  position: absolute;
`,X=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===s?null:l.createElement(X,null,l.createElement(Q,{...a}),"loading"!==s&&l.createElement(K,null,"error"===s?l.createElement(W,{...a}):l.createElement(Y,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=w("div")`
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
`,el=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,i]=D()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),ei(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ed=l.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},r=l.createElement(es,{toast:e}),n=l.createElement(el,{...e.ariaProps},S(e.message,e));return l.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:r,message:n}):l.createElement(l.Fragment,null,r,n))});r=l.createElement,u.p=void 0,y=r,b=void 0,v=void 0;var eo=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let r=l.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:r,className:t,style:s},i)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:D()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:r,containerStyle:n,containerClassName:d})=>{let{toasts:o,handlers:c}=L(s,r);return l.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},o.map(s=>{let r=s.position||t,n=ec(r,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return l.createElement(eo,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?em:"",style:n},"custom"===s.type?S(s.message,s):i?i(s):l.createElement(ed,{toast:s,position:r}))}))},ep=_}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=2509)}),_N_E=e.O()}]);