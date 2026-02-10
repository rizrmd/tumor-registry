(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4300],{2681:function(e,t,a){Promise.resolve().then(a.bind(a,4499))},4499:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var s=a(7437),r=a(2265),i=a(6986),n=a(4894),l=a(4033);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),o=(0,l.useRouter)(),[c,d]=(0,r.useState)(!0),[m,x]=(0,r.useState)([]),[u,p]=(0,r.useState)([]),[g,h]=(0,r.useState)([]),[f,y]=(0,r.useState)([]),[b,v]=(0,r.useState)("all");(0,r.useEffect)(()=>{if(!a&&!t){o.push("/login");return}t&&j()},[t,a,o,b]);let j=async()=>{try{d(!0),x([{stage:"IA (Low grade, intracompartmental)",count:245,percentage:28.9,avgAge:34.2,maleCount:138,femaleCount:107},{stage:"IB (Low grade, extracompartmental)",count:189,percentage:22.3,avgAge:38.7,maleCount:105,femaleCount:84},{stage:"IIA (High grade, intracompartmental)",count:168,percentage:19.8,avgAge:28.5,maleCount:95,femaleCount:73},{stage:"IIB (High grade, extracompartmental)",count:156,percentage:18.4,avgAge:31.2,maleCount:87,femaleCount:69},{stage:"III (Metastasis)",count:89,percentage:10.5,avgAge:35.8,maleCount:48,femaleCount:41}]),p([{tumorType:"Osteosarcoma",IA:45,IB:38,IIA:78,IIB:89,III:35,total:285},{tumorType:"Ewing Sarcoma",IA:28,IB:32,IIA:42,IIB:38,III:16,total:156},{tumorType:"Chondrosarcoma",IA:52,IB:48,IIA:22,IIB:8,III:4,total:134},{tumorType:"Giant Cell Tumor",IA:58,IB:32,IIA:6,IIB:2,III:0,total:98},{tumorType:"Soft Tissue Sarcoma",IA:62,IB:39,IIA:20,IIB:19,III:34,total:174}]),h([{year:"2020",earlyStage:156,locallyAdvanced:98,metastatic:28},{year:"2021",earlyStage:178,locallyAdvanced:112,metastatic:32},{year:"2022",earlyStage:189,locallyAdvanced:125,metastatic:35},{year:"2023",earlyStage:212,locallyAdvanced:138,metastatic:38},{year:"2024",earlyStage:245,locallyAdvanced:156,metastatic:45}]),y([{stage:"IA",oneYear:98.4,threeYear:94.2,fiveYear:89.7,patientCount:245},{stage:"IB",oneYear:96.8,threeYear:91.5,fiveYear:85.3,patientCount:189},{stage:"IIA",oneYear:89.3,threeYear:72.8,fiveYear:58.4,patientCount:168},{stage:"IIB",oneYear:78.2,threeYear:54.6,fiveYear:38.9,patientCount:156},{stage:"III",oneYear:52.8,threeYear:28.3,fiveYear:15.7,patientCount:89}])}catch(e){console.error("Error loading staging analytics:",e)}finally{d(!1)}},I=e=>e.includes("IA")?"bg-green-100 text-green-800":e.includes("IB")?"bg-blue-100 text-blue-800":e.includes("IIA")?"bg-yellow-100 text-yellow-800":e.includes("IIB")?"bg-orange-100 text-orange-800":e.includes("III")?"bg-red-100 text-red-800":"bg-gray-100 text-gray-800",N=e=>e>=80?"text-green-600":e>=60?"text-yellow-600":e>=40?"text-orange-600":"text-red-600";if(a||c)return(0,s.jsx)(n.A,{children:(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading staging analytics..."})]})})});let w=m.reduce((e,t)=>e+t.count,0),A=m.filter(e=>e.stage.includes("IA")||e.stage.includes("IB")).reduce((e,t)=>e+t.count,0),k=w>0?(A/w*100).toFixed(1):"0.0";return(0,s.jsxs)(n.A,{children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Enneking Staging Analysis"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Staging distribution and outcomes for musculoskeletal tumors"})]}),(0,s.jsx)("div",{children:(0,s.jsxs)("select",{value:b,onChange:e=>v(e.target.value),className:"px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,s.jsx)("option",{value:"all",children:"All Time"}),(0,s.jsx)("option",{value:"5y",children:"Last 5 Years"}),(0,s.jsx)("option",{value:"3y",children:"Last 3 Years"}),(0,s.jsx)("option",{value:"1y",children:"Last Year"})]})})]})}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Patients"}),(0,s.jsx)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:w})]}),(0,s.jsx)("div",{className:"text-4xl",children:"\uD83D\uDC65"})]})}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Early Stage (IA-IB)"}),(0,s.jsx)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:A})]}),(0,s.jsx)("div",{className:"text-4xl",children:"✅"})]}),(0,s.jsxs)("p",{className:"text-sm text-gray-500 mt-2",children:[k,"% of total"]})]}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Advanced (IIA-IIB)"}),(0,s.jsx)("p",{className:"text-3xl font-bold text-yellow-600 mt-2",children:m.filter(e=>e.stage.includes("IIA")||e.stage.includes("IIB")).reduce((e,t)=>e+t.count,0)})]}),(0,s.jsx)("div",{className:"text-4xl",children:"⚠️"})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Metastatic (III)"}),(0,s.jsx)("p",{className:"text-3xl font-bold text-red-600 mt-2",children:m.filter(e=>e.stage.includes("III")).reduce((e,t)=>e+t.count,0)})]}),(0,s.jsx)("div",{className:"text-4xl",children:"\uD83D\uDD34"})]})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Enneking Staging Distribution"}),(0,s.jsx)("div",{className:"space-y-4",children:m.map((e,t)=>(0,s.jsxs)("div",{className:"border-b border-gray-200 pb-4 last:border-0",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,s.jsx)("span",{className:"px-3 py-1 rounded-full text-sm font-semibold ".concat(I(e.stage)),children:e.stage}),(0,s.jsxs)("span",{className:"text-sm text-gray-600",children:[e.count," patients (",e.percentage,"%)"]})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-6 text-sm text-gray-600",children:[(0,s.jsxs)("span",{children:["Avg Age: ",e.avgAge," yrs"]}),(0,s.jsxs)("span",{children:["M: ",e.maleCount]}),(0,s.jsxs)("span",{children:["F: ",e.femaleCount]})]})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-3",children:(0,s.jsx)("div",{className:"h-3 rounded-full ".concat(e.stage.includes("IA")?"bg-green-500":e.stage.includes("IB")?"bg-blue-500":e.stage.includes("IIA")?"bg-yellow-500":e.stage.includes("IIB")?"bg-orange-500":"bg-red-500"),style:{width:"".concat(e.percentage,"%")}})})]},t))})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Staging Distribution by Tumor Type"}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tumor Type"}),(0,s.jsx)("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IA"}),(0,s.jsx)("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IB"}),(0,s.jsx)("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IIA"}),(0,s.jsx)("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"IIB"}),(0,s.jsx)("th",{className:"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",children:"III"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:u.map((e,t)=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.tumorType})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:(0,s.jsx)("div",{className:"text-sm text-green-600 font-medium",children:e.IA})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:(0,s.jsx)("div",{className:"text-sm text-blue-600 font-medium",children:e.IB})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:(0,s.jsx)("div",{className:"text-sm text-yellow-600 font-medium",children:e.IIA})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:(0,s.jsx)("div",{className:"text-sm text-orange-600 font-medium",children:e.IIB})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-center",children:(0,s.jsx)("div",{className:"text-sm text-red-600 font-medium",children:e.III})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsx)("div",{className:"text-sm font-bold text-gray-900",children:e.total})})]},t))})]})})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Staging Trends Over Time"}),(0,s.jsx)("div",{className:"space-y-4",children:g.map((e,t)=>(0,s.jsxs)("div",{className:"border-b border-gray-200 pb-4 last:border-0",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,s.jsx)("span",{className:"text-sm font-semibold text-gray-900",children:e.year}),(0,s.jsxs)("span",{className:"text-sm text-gray-600",children:["Total: ",e.earlyStage+e.locallyAdvanced+e.metastatic]})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[(0,s.jsx)("span",{className:"text-gray-600",children:"Early Stage (IA-IB)"}),(0,s.jsx)("span",{className:"text-green-600 font-medium",children:e.earlyStage})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[(0,s.jsx)("span",{className:"text-gray-600",children:"Locally Advanced (IIA-IIB)"}),(0,s.jsx)("span",{className:"text-yellow-600 font-medium",children:e.locallyAdvanced})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[(0,s.jsx)("span",{className:"text-gray-600",children:"Metastatic (III)"}),(0,s.jsx)("span",{className:"text-red-600 font-medium",children:e.metastatic})]})]})]},t))})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Survival Rates by Enneking Stage"}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Stage"}),(0,s.jsx)("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"1-Yr"}),(0,s.jsx)("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"3-Yr"}),(0,s.jsx)("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"5-Yr"}),(0,s.jsx)("th",{className:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"N"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:f.map((e,t)=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-4 py-3 whitespace-nowrap",children:(0,s.jsx)("span",{className:"px-2 py-1 rounded text-xs font-semibold ".concat(I(e.stage)),children:e.stage})}),(0,s.jsx)("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:(0,s.jsxs)("span",{className:"text-sm font-semibold ".concat(N(e.oneYear)),children:[e.oneYear,"%"]})}),(0,s.jsx)("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:(0,s.jsxs)("span",{className:"text-sm font-semibold ".concat(N(e.threeYear)),children:[e.threeYear,"%"]})}),(0,s.jsx)("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:(0,s.jsxs)("span",{className:"text-sm font-semibold ".concat(N(e.fiveYear)),children:[e.fiveYear,"%"]})}),(0,s.jsx)("td",{className:"px-4 py-3 whitespace-nowrap text-right",children:(0,s.jsx)("span",{className:"text-sm text-gray-600",children:e.patientCount})})]},t))})]})})]})]})]})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return ex},ZP:function(){return eu}});var i,n=a(2265);let l={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,x=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?x(n,i):i+"{"+x(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=x(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=x.p?x.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},u={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e},g=(e,t,a,s,r)=>{var i;let n=p(e),l=u[n]||(u[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!u[l]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(a=t[3].replace(m," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);u[l]=x(r?{["@keyframes "+l]:t}:t,a?"":"."+l)}let o=a&&u.g?u.g:null;return a&&(u.g=u[l]),i=u[l],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),l},h=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":x(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return g(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function I(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;a.p=Object.assign({theme:b&&b()},l),a.o=/ *go\d+/.test(o),l.className=f.apply(a,s)+(o?" "+o:""),t&&(l.ref=n);let c=e;return e[0]&&(c=l.as||e,delete l.as),v&&c[0]&&v(l),y(c,l)}return t?t(r):r}}var N=e=>"function"==typeof e,w=(e,t)=>N(e)?e(t):e,A=(s=0,()=>(++s).toString()),k=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},C="default",E=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return E(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],B={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},Y={},T=(e,t=C)=>{Y[t]=E(Y[t]||B,e),S.forEach(([e,a])=>{e===t&&a(Y[t])})},D=e=>Object.keys(Y).forEach(t=>T(e,t)),$=e=>Object.keys(Y).find(t=>Y[t].toasts.some(t=>t.id===e)),O=(e=C)=>t=>{T(t,e)},L={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=(e={},t=C)=>{let[a,s]=(0,n.useState)(Y[t]||B),r=(0,n.useRef)(Y[t]);(0,n.useEffect)(()=>(r.current!==Y[t]&&s(Y[t]),S.push([t,s]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||L[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},P=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||A()}),z=e=>(t,a)=>{let s=P(t,e,a);return O(s.toasterId||$(s.id))({type:2,toast:s}),s.id},M=(e,t)=>z("blank")(e,t);M.error=z("error"),M.success=z("success"),M.loading=z("loading"),M.custom=z("custom"),M.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):D(a)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):D(a)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,a)=>{let s=M.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?w(t.success,e):void 0;return r?M.success(r,{id:s,...a,...null==a?void 0:a.success}):M.dismiss(s),e}).catch(e=>{let r=t.error?w(t.error,e):void 0;r?M.error(r,{id:s,...a,...null==a?void 0:a.error}):M.dismiss(s)}),e};var F=1e3,H=(e,t="default")=>{let{toasts:a,pausedAt:s}=_(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=F)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),l({type:4,toastId:e})},t);r.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&M.dismiss(a.id);return}return setTimeout(()=>M.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let l=(0,n.useCallback)(O(t),[t]),o=(0,n.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),c=(0,n.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),d=(0,n.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),m=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:c,startPause:o,endPause:d,calculateOffset:m}}},R=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Z=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,q=I("div")`
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
    animation: ${Z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=I("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,K=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Q=j`
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
}`,V=I("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Q} 0.2s ease-out forwards;
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
`,W=I("div")`
  position: absolute;
`,X=I("div")`
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
}`,et=I("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(J,{...s}),"loading"!==a&&n.createElement(W,null,"error"===a?n.createElement(q,{...s}):n.createElement(V,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=I("div")`
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
`,en=I("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,el=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),l=n.createElement(en,{...e.ariaProps},w(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:l}):n.createElement(n.Fragment,null,i,l))});i=n.createElement,x.p=void 0,y=i,b=void 0,v=void 0;var ec=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:a},r)},ed=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ex=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:l,containerClassName:o})=>{let{toasts:c,handlers:d}=H(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let i=a.position||t,l=ed(i,d.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ec,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?em:"",style:l},"custom"===a.type?w(a.message,a):r?r(a):n.createElement(eo,{toast:a,position:i}))}))},eu=M}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=2681)}),_N_E=e.O()}]);