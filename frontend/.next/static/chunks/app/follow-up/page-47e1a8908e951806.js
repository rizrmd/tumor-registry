(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5],{788:function(e,t,s){Promise.resolve().then(s.bind(s,7917))},7917:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return d}});var a=s(7437),i=s(2265),r=s(6986),l=s(4894),n=s(776),o=s(4033);function d(){let{user:e,isAuthenticated:t,isLoading:s}=(0,r.useAuth)(),d=(0,o.useRouter)(),[c,u]=(0,i.useState)(!0),[m,p]=(0,i.useState)({totalActivePatients:0,upcomingVisits:0,overdueVisits:0,complianceRate:0}),[x,h]=(0,i.useState)([]),[g,f]=(0,i.useState)([]),[y,b]=(0,i.useState)("all"),[v,w]=(0,i.useState)("all"),[j,N]=(0,i.useState)("");(0,i.useEffect)(()=>{if(!s&&!t){d.push("/login");return}t&&D()},[t,s,d]),(0,i.useEffect)(()=>{C()},[x,y,v,j]);let D=async()=>{try{u(!0);let e=await n.Z.getAllVisits();h(e);let t=new Date,s=new Set(e.map(e=>e.patientId)).size,a=e.filter(e=>"scheduled"===e.status),i=a.filter(e=>{let s=new Date(e.scheduledDate),a=Math.ceil((s.getTime()-t.getTime())/864e5);return a>=0&&a<=30}),r=a.filter(e=>new Date(e.scheduledDate)<t),l=e.filter(e=>"completed"===e.status).length,o=e.length;p({totalActivePatients:s,upcomingVisits:i.length,overdueVisits:r.length,complianceRate:o>0?Math.round(l/o*100):0})}catch(e){console.error("Error loading follow-up data:",e)}finally{u(!1)}},C=()=>{let e=[...x];if("all"!==y){if("overdue"===y){let t=new Date;e=e.filter(e=>{let s=new Date(e.scheduledDate);return"scheduled"===e.status&&s<t})}else e=e.filter(e=>e.status===y)}"all"!==v&&(e=e.filter(e=>e.visitNumber===parseInt(v))),j&&(e=e.filter(e=>{var t,s,a,i,r,l;return(null===(s=e.patient)||void 0===s?void 0:null===(t=s.name)||void 0===t?void 0:t.toLowerCase().includes(j.toLowerCase()))||(null===(i=e.patient)||void 0===i?void 0:null===(a=i.inamsosRecordNumber)||void 0===a?void 0:a.toLowerCase().includes(j.toLowerCase()))||(null===(l=e.patient)||void 0===l?void 0:null===(r=l.hospitalRecordNumber)||void 0===r?void 0:r.toLowerCase().includes(j.toLowerCase()))})),e.sort((e,t)=>new Date(e.scheduledDate).getTime()-new Date(t.scheduledDate).getTime()),f(e)},k=e=>{let t=new Date,s=new Date(e.scheduledDate);if("scheduled"===e.status&&s<t)return(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800",children:"Overdue"});let i={scheduled:"bg-blue-100 text-blue-800",completed:"bg-green-100 text-green-800",missed:"bg-red-100 text-red-800",cancelled:"bg-gray-100 text-gray-800"}[e.status]||"bg-gray-100 text-gray-800";return(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full ".concat(i),children:e.status})},E=e=>{let t=new Date,s=Math.ceil((new Date(e).getTime()-t.getTime())/864e5);return s<0?"".concat(Math.abs(s)," days overdue"):0===s?"Today":1===s?"Tomorrow":"in ".concat(s," days")};return s||c?(0,a.jsx)(l.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading follow-up data..."})]})})}):(0,a.jsxs)(l.A,{children:[(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"14-Visit Follow-up Protocol"}),(0,a.jsx)("p",{className:"text-gray-600",children:"Monitor and manage longitudinal follow-up visits over 5 years"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Active Patients"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:m.totalActivePatients})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDC65"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Upcoming (30 days)"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:m.upcomingVisits})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDCC5"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Overdue Visits"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-red-600 mt-2",children:m.overdueVisits})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDEA8"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Compliance Rate"}),(0,a.jsxs)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:[m.complianceRate,"%"]})]}),(0,a.jsx)("div",{className:"text-4xl",children:"✅"})]})})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Search Patient"}),(0,a.jsx)("input",{type:"text",value:j,onChange:e=>N(e.target.value),placeholder:"Name or MR Number",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Status"}),(0,a.jsxs)("select",{value:y,onChange:e=>b(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,a.jsx)("option",{value:"all",children:"All Statuses"}),(0,a.jsx)("option",{value:"scheduled",children:"Scheduled"}),(0,a.jsx)("option",{value:"overdue",children:"Overdue"}),(0,a.jsx)("option",{value:"completed",children:"Completed"}),(0,a.jsx)("option",{value:"missed",children:"Missed"}),(0,a.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Visit Number"}),(0,a.jsxs)("select",{value:v,onChange:e=>w(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,a.jsx)("option",{value:"all",children:"All Visits"}),[...Array(14)].map((e,t)=>(0,a.jsxs)("option",{value:t+1,children:["Visit #",t+1]},t+1))]})]}),(0,a.jsx)("div",{className:"flex items-end",children:(0,a.jsx)("button",{onClick:D,className:"w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"\uD83D\uDD04 Refresh"})})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,a.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Follow-up Visits (",g.length,")"]})}),0===g.length?(0,a.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,a.jsx)("div",{className:"text-6xl mb-4",children:"\uD83D\uDCC5"}),(0,a.jsx)("p",{className:"text-lg font-medium",children:"No visits found"}),(0,a.jsx)("p",{className:"text-sm mt-2",children:"Try adjusting your filters or search query"})]}):(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Patient"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"MR Number"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Visit #"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Scheduled Date"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Days Until"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,a.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Actions"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:g.map(e=>{var t,s,i;return(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:(null===(t=e.patient)||void 0===t?void 0:t.name)||"Unknown"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:(null===(s=e.patient)||void 0===s?void 0:s.inamsosRecordNumber)||(null===(i=e.patient)||void 0===i?void 0:i.hospitalRecordNumber)||"-"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800",children:["Visit #",e.visitNumber]})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:new Date(e.scheduledDate).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-600",children:E(e.scheduledDate)})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:k(e)}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:[(0,a.jsx)("button",{onClick:()=>d.push("/patients/".concat(e.patientId)),className:"text-blue-600 hover:text-blue-900 mr-3",children:"View Patient"}),"scheduled"===e.status&&(0,a.jsx)("button",{onClick:()=>d.push("/demo/follow-up-calendar?patient=".concat(e.patientId)),className:"text-green-600 hover:text-green-900",children:"Enter Data"})]})]},e.id)})})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mt-8",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Visit Completion Rate by Visit Number"}),(0,a.jsx)("div",{className:"grid grid-cols-7 gap-2",children:[...Array(14)].map((e,t)=>{let s=t+1,i=x.filter(e=>e.visitNumber===s).length,r=x.filter(e=>e.visitNumber===s&&"completed"===e.status).length,l=i>0?Math.round(r/i*100):0;return(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsxs)("div",{className:"mb-2",children:[(0,a.jsxs)("div",{className:"text-xs font-medium text-gray-600 mb-1",children:["V",s]}),(0,a.jsx)("div",{className:"bg-blue-500 rounded-t",style:{height:"".concat(Math.max(l,5),"px")},title:"".concat(l,"% completed")}),(0,a.jsxs)("div",{className:"text-xs font-semibold text-gray-900 mt-1",children:[l,"%"]})]}),(0,a.jsxs)("div",{className:"text-xs text-gray-500",children:[r,"/",i]})]},s)})})]})]})}},776:function(e,t,s){"use strict";var a=s(6383);class i{async generateSchedule(e){return(await a.Z.post("/follow-ups/generate-schedule",e)).data}async createVisit(e){return(await a.Z.post("/follow-ups",e)).data}async getAllVisits(e,t){let s={};return e&&(s.patientId=e),t&&(s.status=t),(await a.Z.get("/follow-ups",{params:s})).data}async getVisitById(e){return(await a.Z.get("/follow-ups/".concat(e))).data}async getVisitsByPatient(e){return(await a.Z.get("/follow-ups/patient/".concat(e))).data}async getPatientSummary(e){return(await a.Z.get("/follow-ups/patient/".concat(e,"/summary"))).data}async updateVisit(e,t){return(await a.Z.put("/follow-ups/".concat(e),t)).data}async deleteVisit(e){await a.Z.delete("/follow-ups/".concat(e))}getStatusColor(e){return({scheduled:"blue",completed:"green",missed:"red",cancelled:"gray"})[e]||"gray"}getClinicalStatusColor(e){return({NED:"green",AWD:"yellow",DOD:"red",DOC:"gray"})[e||""]||"gray"}}t.Z=new i},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,i;s.d(t,{x7:function(){return em},ZP:function(){return ep}});var r,l=s(2265);let n={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",a="",i="";for(let r in e){let l=e[r];"@"==r[0]?"i"==r[1]?s=r+" "+l+";":a+="f"==r[1]?m(l,r):r+"{"+m(l,"k"==r[1]?"":t)+"}":"object"==typeof l?a+=m(l,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=l&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(r,l):r+":"+l+";")}return s+(t&&i?t+"{"+i+"}":i)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,i)=>{var r;let l=x(e),n=p[l]||(p[l]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(l));if(!p[n]){let t=l!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(u," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,s?"":"."+n)}let o=s&&p.g?p.g:null;return s&&(p.g=p[n]),r=p[n],o?t.data=t.data.replace(o,r):-1===t.data.indexOf(r)&&(t.data=a?r+t.data:t.data+r),n},g=(e,t,s)=>e.reduce((e,a,i)=>{let r=t[i];if(r&&r.call){let e=r(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==r?"":r)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,w=f.bind({k:1});function j(e,t){let s=this||{};return function(){let a=arguments;function i(r,l){let n=Object.assign({},r),o=n.className||i.className;s.p=Object.assign({theme:b&&b()},n),s.o=/ *go\d+/.test(o),n.className=f.apply(s,a)+(o?" "+o:""),t&&(n.ref=l);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),y(d,n)}return t?t(i):i}}var N=e=>"function"==typeof e,D=(e,t)=>N(e)?e(t):e,C=(a=0,()=>(++a).toString()),k=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},E="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return A(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},V=[],S={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},O={},P=(e,t=E)=>{O[t]=A(O[t]||S,e),V.forEach(([e,s])=>{e===t&&s(O[t])})},$=e=>Object.keys(O).forEach(t=>P(e,t)),I=e=>Object.keys(O).find(t=>O[t].toasts.some(t=>t.id===e)),M=(e=E)=>t=>{P(t,e)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={},t=E)=>{let[s,a]=(0,l.useState)(O[t]||S),i=(0,l.useRef)(O[t]);(0,l.useEffect)(()=>(i.current!==O[t]&&a(O[t]),V.push([t,a]),()=>{let e=V.findIndex(([e])=>e===t);e>-1&&V.splice(e,1)}),[t]);let r=s.toasts.map(t=>{var s,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...s,toasts:r}},T=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||C()}),_=e=>(t,s)=>{let a=T(t,e,s);return M(a.toasterId||I(a.id))({type:2,toast:a}),a.id},Z=(e,t)=>_("blank")(e,t);Z.error=_("error"),Z.success=_("success"),Z.loading=_("loading"),Z.custom=_("custom"),Z.dismiss=(e,t)=>{let s={type:3,toastId:e};t?M(t)(s):$(s)},Z.dismissAll=e=>Z.dismiss(void 0,e),Z.remove=(e,t)=>{let s={type:4,toastId:e};t?M(t)(s):$(s)},Z.removeAll=e=>Z.remove(void 0,e),Z.promise=(e,t,s)=>{let a=Z.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?D(t.success,e):void 0;return i?Z.success(i,{id:a,...s,...null==s?void 0:s.success}):Z.dismiss(a),e}).catch(e=>{let i=t.error?D(t.error,e):void 0;i?Z.error(i,{id:a,...s,...null==s?void 0:s.error}):Z.dismiss(a)}),e};var z=1e3,F=(e,t="default")=>{let{toasts:s,pausedAt:a}=L(e,t),i=(0,l.useRef)(new Map).current,r=(0,l.useCallback)((e,t=z)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,l.useEffect)(()=>{if(a)return;let e=Date.now(),i=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&Z.dismiss(s.id);return}return setTimeout(()=>Z.dismiss(s.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,l.useCallback)(M(t),[t]),o=(0,l.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,l.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,l.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,l.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:r}=t||{},l=s.filter(t=>(t.position||r)===(e.position||r)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+i,0)},[s]);return(0,l.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,r]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}},H=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,q=j("div")`
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
    animation: ${U} 0.15s ease-out forwards;
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
`,W=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
`,G=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=w`
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
}`,K=j("div")`
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
`,Q=j("div")`
  position: absolute;
`,X=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===s?null:l.createElement(X,null,l.createElement(Y,{...a}),"loading"!==s&&l.createElement(Q,null,"error"===s?l.createElement(q,{...a}):l.createElement(K,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
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
`,el=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,i]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),ei(s)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=l.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},r=l.createElement(es,{toast:e}),n=l.createElement(el,{...e.ariaProps},D(e.message,e));return l.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:r,message:n}):l.createElement(l.Fragment,null,r,n))});r=l.createElement,m.p=void 0,y=r,b=void 0,v=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let r=l.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:r,className:t,style:s},i)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:r,containerStyle:n,containerClassName:o})=>{let{toasts:d,handlers:c}=F(s,r);return l.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let r=s.position||t,n=ec(r,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return l.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?eu:"",style:n},"custom"===s.type?D(s.message,s):i?i(s):l.createElement(eo,{toast:s,position:r}))}))},ep=Z}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=788)}),_N_E=e.O()}]);