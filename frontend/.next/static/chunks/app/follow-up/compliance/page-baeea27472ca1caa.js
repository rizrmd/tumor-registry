(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1710],{8103:function(e,t,s){Promise.resolve().then(s.bind(s,1379))},1379:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return c}});var a=s(7437),i=s(2265),r=s(6986),l=s(4894),n=s(776),o=s(4033);function c(){let{user:e,isAuthenticated:t,isLoading:s}=(0,r.useAuth)(),c=(0,o.useRouter)(),[d,m]=(0,i.useState)(!0),[u,p]=(0,i.useState)([]),[x,h]=(0,i.useState)(0),[g,f]=(0,i.useState)(0),[y,b]=(0,i.useState)(0),[v,w]=(0,i.useState)("30d");(0,i.useEffect)(()=>{if(!s&&!t){c.push("/login");return}t&&j()},[t,s,c,v]);let j=async()=>{try{m(!0);let e=await n.Z.getAllVisits();p(e);let t=new Date,s=e.filter(e=>"completed"===e.status||new Date(e.scheduledDate)<=t),a=e.filter(e=>"completed"===e.status).length,i=s.length;h(i>0?Math.round(a/i*100):0);let r=e.filter(e=>{let s=new Date(e.scheduledDate);return"scheduled"===e.status&&s<t});if(r.length>0){let e=r.reduce((e,s)=>{let a=new Date(s.scheduledDate),i=t.getTime()-a.getTime();return e+Math.ceil(i/864e5)},0);f(Math.round(e/r.length))}else f(0);let l=new Date;l.setMonth(l.getMonth()-6);let o=new Set(e.filter(e=>new Date(e.scheduledDate)>l).map(e=>e.patientId)),c=new Set(e.map(e=>e.patientId)).size-o.size;b(c)}catch(e){console.error("Error loading compliance data:",e)}finally{m(!1)}},N=e=>e>=90?"text-green-600":e>=75?"text-yellow-600":"text-red-600",k=e=>e>=90?"bg-green-100 text-green-800":e>=75?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800",D=(()=>{let e=[];for(let t=1;t<=14;t++){let s=u.filter(e=>e.visitNumber===t),a=s.filter(e=>"completed"===e.status),i=s.length>0?Math.round(a.length/s.length*100):0;e.push({visitNumber:t,total:s.length,completed:a.length,rate:i})}return e})();return s||d?(0,a.jsx)(l.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading compliance data..."})]})})}):(0,a.jsxs)(l.A,{children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Follow-up Compliance Tracking"}),(0,a.jsx)("p",{className:"text-gray-600",children:"Monitor adherence to 14-visit follow-up protocol"})]}),(0,a.jsx)("div",{children:(0,a.jsxs)("select",{value:v,onChange:e=>w(e.target.value),className:"px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,a.jsx)("option",{value:"7d",children:"Last 7 Days"}),(0,a.jsx)("option",{value:"30d",children:"Last 30 Days"}),(0,a.jsx)("option",{value:"90d",children:"Last 90 Days"}),(0,a.jsx)("option",{value:"1y",children:"Last Year"}),(0,a.jsx)("option",{value:"all",children:"All Time"})]})})]})}),(0,a.jsx)("div",{className:"bg-emerald-50 border-l-4 border-emerald-400 rounded-lg p-4 mb-6",children:(0,a.jsxs)("div",{className:"flex gap-3",children:[(0,a.jsx)("div",{className:"flex-shrink-0",children:(0,a.jsx)("span",{className:"text-2xl",children:"⭐"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h4",{className:"text-sm font-semibold text-emerald-900 mb-1",children:"Pentingnya Compliance Tracking"}),(0,a.jsxs)("p",{className:"text-sm text-emerald-800",children:["Monitoring kepatuhan follow-up sangat krusial untuk ",(0,a.jsx)("strong",{children:"deteksi dini rekurensi tumor"}),", ",(0,a.jsx)("strong",{children:"evaluasi efektivitas pengobatan"}),", dan ",(0,a.jsx)("strong",{children:"menjaga validitas data penelitian"}),". Compliance rate yang tinggi (>90%) memastikan data registry berkualitas tinggi dan dapat digunakan untuk publikasi internasional serta perbaikan protokol klinis."]})]})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsx)("h3",{className:"text-sm font-medium text-gray-600",children:"Overall Compliance Rate"}),(0,a.jsx)("span",{className:"text-2xl",children:"✅"})]}),(0,a.jsxs)("div",{className:"text-4xl font-bold ".concat(N(x)),children:[x,"%"]}),(0,a.jsx)("div",{className:"mt-4 w-full bg-gray-200 rounded-full h-3",children:(0,a.jsx)("div",{className:"h-3 rounded-full ".concat(x>=90?"bg-green-500":x>=75?"bg-yellow-500":"bg-red-500"),style:{width:"".concat(x,"%")}})}),(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-2",children:[u.filter(e=>"completed"===e.status).length," of ",u.length," visits completed"]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsx)("h3",{className:"text-sm font-medium text-gray-600",children:"Average Days Late"}),(0,a.jsx)("span",{className:"text-2xl",children:"⏱️"})]}),(0,a.jsx)("div",{className:"text-4xl font-bold ".concat(g>7?"text-red-600":"text-green-600"),children:g}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:g>7?"Needs improvement":"Within acceptable range"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsx)("h3",{className:"text-sm font-medium text-gray-600",children:"Lost to Follow-up"}),(0,a.jsx)("span",{className:"text-2xl",children:"\uD83D\uDEAB"})]}),(0,a.jsx)("div",{className:"text-4xl font-bold ".concat(y>0?"text-red-600":"text-green-600"),children:y}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Patients with no visit in last 6 months"})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Compliance by Visit Number"}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Visit Number"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Schedule"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total Visits"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Completed"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Compliance Rate"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:D.map(e=>{let t=e.visitNumber<=8?"Month ".concat(3*e.visitNumber):"Month ".concat(24+(e.visitNumber-8)*6);return(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("span",{className:"px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800",children:["Visit #",e.visitNumber]})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:t}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:e.total}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:e.completed}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"w-32 bg-gray-200 rounded-full h-2 mr-3",children:(0,a.jsx)("div",{className:"h-2 rounded-full ".concat(e.rate>=90?"bg-green-500":e.rate>=75?"bg-yellow-500":"bg-red-500"),style:{width:"".concat(e.rate,"%")}})}),(0,a.jsxs)("span",{className:"text-sm font-semibold ".concat(N(e.rate)),children:[e.rate,"%"]})]})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full ".concat(k(e.rate)),children:e.rate>=90?"Excellent":e.rate>=75?"Good":"Needs Improvement"})})]},e.visitNumber)})})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Compliance Trend (Year 1-5)"}),(0,a.jsx)("div",{className:"flex items-end space-x-2 h-64",children:D.map(e=>(0,a.jsxs)("div",{className:"flex-1 flex flex-col items-center group h-full justify-end",children:[(0,a.jsx)("div",{className:"w-full rounded-t ".concat(e.rate>=90?"bg-green-500":e.rate>=75?"bg-yellow-500":"bg-red-500"," hover:opacity-75 transition-opacity cursor-pointer relative group-hover:scale-110"),style:{height:"".concat(Math.max(e.rate,5),"%")},title:"Visit ".concat(e.visitNumber,": ").concat(e.rate,"%"),children:(0,a.jsxs)("div",{className:"absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",children:[e.rate,"%"]})}),(0,a.jsxs)("div",{className:"mt-2 text-xs font-medium text-gray-600",children:["V",e.visitNumber]})]},e.visitNumber))}),(0,a.jsxs)("div",{className:"flex justify-between mt-4 text-sm text-gray-500",children:[(0,a.jsx)("span",{children:"Year 1-2 (Q3M)"}),(0,a.jsx)("span",{children:"Year 3-5 (Q6M)"})]})]}),(0,a.jsxs)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8",children:[(0,a.jsx)("h3",{className:"text-lg font-semibold text-blue-900 mb-4",children:"\uD83D\uDCCB Recommendations"}),(0,a.jsxs)("ul",{className:"space-y-2 text-sm text-blue-800",children:[x>=90?(0,a.jsxs)("li",{className:"flex items-start",children:[(0,a.jsx)("span",{className:"mr-2",children:"\uD83C\uDFC6"}),(0,a.jsx)("span",{className:"font-semibold text-green-800",children:"Excellent compliance! Data is of high quality and suitable for international publications (e.g., JCO, Lancet Oncology standards)."})]}):(0,a.jsxs)("li",{className:"flex items-start",children:[(0,a.jsx)("span",{className:"mr-2",children:"•"}),(0,a.jsx)("span",{children:"Overall compliance is below 90%. Focus on increasing retention to ensure research validity for international publications."})]}),x<90&&(0,a.jsxs)("li",{className:"flex items-start",children:[(0,a.jsx)("span",{className:"mr-2",children:"•"}),(0,a.jsx)("span",{children:"Consider implementing the Automated SMS/Email Reminder System to reduce missed visits."})]}),g>7&&(0,a.jsxs)("li",{className:"flex items-start",children:[(0,a.jsx)("span",{className:"mr-2",children:"•"}),(0,a.jsx)("span",{children:"Average delay exceeds 7 days. Late visits increase the risk of missing early recurrence detection."})]}),y>0&&(0,a.jsxs)("li",{className:"flex items-start",children:[(0,a.jsx)("span",{className:"mr-2",children:"•"}),(0,a.jsxs)("span",{className:"font-semibold text-red-800",children:[y," patient(s) lost to follow-up. These missing data points weaken statistical power for registry research."]})]}),D.some(e=>e.visitNumber>10&&e.rate<75)&&(0,a.jsxs)("li",{className:"flex items-start",children:[(0,a.jsx)("span",{className:"mr-2",children:"•"}),(0,a.jsx)("span",{children:"Late-stage visits (Year 3-5) showing low compliance. Focus retention efforts on long-term follow-up."})]})]})]})]})}},776:function(e,t,s){"use strict";var a=s(6383);class i{async generateSchedule(e){return(await a.Z.post("/follow-ups/generate-schedule",e)).data}async createVisit(e){return(await a.Z.post("/follow-ups",e)).data}async getAllVisits(e,t){let s={};return e&&(s.patientId=e),t&&(s.status=t),(await a.Z.get("/follow-ups",{params:s})).data}async getVisitById(e){return(await a.Z.get("/follow-ups/".concat(e))).data}async getVisitsByPatient(e){return(await a.Z.get("/follow-ups/patient/".concat(e))).data}async getPatientSummary(e){return(await a.Z.get("/follow-ups/patient/".concat(e,"/summary"))).data}async updateVisit(e,t){return(await a.Z.put("/follow-ups/".concat(e),t)).data}async deleteVisit(e){await a.Z.delete("/follow-ups/".concat(e))}getStatusColor(e){return({scheduled:"blue",completed:"green",missed:"red",cancelled:"gray"})[e]||"gray"}getClinicalStatusColor(e){return({NED:"green",AWD:"yellow",DOD:"red",DOC:"gray"})[e||""]||"gray"}}t.Z=new i},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,i;s.d(t,{x7:function(){return eu},ZP:function(){return ep}});var r,l=s(2265);let n={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let s="",a="",i="";for(let r in e){let l=e[r];"@"==r[0]?"i"==r[1]?s=r+" "+l+";":a+="f"==r[1]?u(l,r):r+"{"+u(l,"k"==r[1]?"":t)+"}":"object"==typeof l?a+=u(l,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=l&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=u.p?u.p(r,l):r+":"+l+";")}return s+(t&&i?t+"{"+i+"}":i)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,i)=>{var r;let l=x(e),n=p[l]||(p[l]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(l));if(!p[n]){let t=l!==e?e:(e=>{let t,s,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);p[n]=u(i?{["@keyframes "+n]:t}:t,s?"":"."+n)}let o=s&&p.g?p.g:null;return s&&(p.g=p[n]),r=p[n],o?t.data=t.data.replace(o,r):-1===t.data.indexOf(r)&&(t.data=a?r+t.data:t.data+r),n},g=(e,t,s)=>e.reduce((e,a,i)=>{let r=t[i];if(r&&r.call){let e=r(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==r?"":r)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,w=f.bind({k:1});function j(e,t){let s=this||{};return function(){let a=arguments;function i(r,l){let n=Object.assign({},r),o=n.className||i.className;s.p=Object.assign({theme:b&&b()},n),s.o=/ *go\d+/.test(o),n.className=f.apply(s,a)+(o?" "+o:""),t&&(n.ref=l);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(i):i}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,D=(a=0,()=>(++a).toString()),C=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},E="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return A(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},O=[],S={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},M={},$=(e,t=E)=>{M[t]=A(M[t]||S,e),O.forEach(([e,s])=>{e===t&&s(M[t])})},L=e=>Object.keys(M).forEach(t=>$(e,t)),I=e=>Object.keys(M).find(t=>M[t].toasts.some(t=>t.id===e)),P=(e=E)=>t=>{$(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},t=E)=>{let[s,a]=(0,l.useState)(M[t]||S),i=(0,l.useRef)(M[t]);(0,l.useEffect)(()=>(i.current!==M[t]&&a(M[t]),O.push([t,a]),()=>{let e=O.findIndex(([e])=>e===t);e>-1&&O.splice(e,1)}),[t]);let r=s.toasts.map(t=>{var s,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...s,toasts:r}},_=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||D()}),z=e=>(t,s)=>{let a=_(t,e,s);return P(a.toasterId||I(a.id))({type:2,toast:a}),a.id},Z=(e,t)=>z("blank")(e,t);Z.error=z("error"),Z.success=z("success"),Z.loading=z("loading"),Z.custom=z("custom"),Z.dismiss=(e,t)=>{let s={type:3,toastId:e};t?P(t)(s):L(s)},Z.dismissAll=e=>Z.dismiss(void 0,e),Z.remove=(e,t)=>{let s={type:4,toastId:e};t?P(t)(s):L(s)},Z.removeAll=e=>Z.remove(void 0,e),Z.promise=(e,t,s)=>{let a=Z.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?k(t.success,e):void 0;return i?Z.success(i,{id:a,...s,...null==s?void 0:s.success}):Z.dismiss(a),e}).catch(e=>{let i=t.error?k(t.error,e):void 0;i?Z.error(i,{id:a,...s,...null==s?void 0:s.error}):Z.dismiss(a)}),e};var F=1e3,R=(e,t="default")=>{let{toasts:s,pausedAt:a}=V(e,t),i=(0,l.useRef)(new Map).current,r=(0,l.useCallback)((e,t=F)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,l.useEffect)(()=>{if(a)return;let e=Date.now(),i=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&Z.dismiss(s.id);return}return setTimeout(()=>Z.dismiss(s.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,l.useCallback)(P(t),[t]),o=(0,l.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,l.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,l.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),m=(0,l.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:r}=t||{},l=s.filter(t=>(t.position||r)===(e.position||r)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+i,0)},[s]);return(0,l.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,r]),{toasts:s,handlers:{updateHeight:c,startPause:o,endPause:d,calculateOffset:m}}},Y=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,B=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=w`
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

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${B} 0.15s ease-out forwards;
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
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Q=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,W=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=w`
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
}`,J=j("div")`
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
    animation: ${G} 0.2s ease-out forwards;
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
`,K=j("div")`
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
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===s?null:l.createElement(X,null,l.createElement(U,{...a}),"loading"!==s&&l.createElement(K,null,"error"===s?l.createElement(q,{...a}):l.createElement(J,{...a})))},ea=e=>`
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
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,i]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),ei(s)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=l.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},r=l.createElement(es,{toast:e}),n=l.createElement(el,{...e.ariaProps},k(e.message,e));return l.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:r,message:n}):l.createElement(l.Fragment,null,r,n))});r=l.createElement,u.p=void 0,y=r,b=void 0,v=void 0;var ec=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let r=l.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:r,className:t,style:s},i)},ed=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:r,containerStyle:n,containerClassName:o})=>{let{toasts:c,handlers:d}=R(s,r);return l.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(s=>{let r=s.position||t,n=ed(r,d.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return l.createElement(ec,{id:s.id,key:s.id,onHeightUpdate:d.updateHeight,className:s.visible?em:"",style:n},"custom"===s.type?k(s.message,s):i?i(s):l.createElement(eo,{toast:s,position:r}))}))},ep=Z}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=8103)}),_N_E=e.O()}]);