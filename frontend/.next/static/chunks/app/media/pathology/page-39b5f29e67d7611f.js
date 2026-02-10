(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4960],{7567:function(e,t,s){Promise.resolve().then(s.bind(s,5945))},5945:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return n}});var a=s(7437),r=s(2265),i=s(6986),l=s(4894),o=s(4033);function n(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),n=(0,o.useRouter)(),[d,c]=(0,r.useState)(!0),[m,p]=(0,r.useState)([]),[x,u]=(0,r.useState)([]),[h,g]=(0,r.useState)(""),[f,y]=(0,r.useState)("all"),[b,v]=(0,r.useState)(null);(0,r.useEffect)(()=>{if(!s&&!t){n.push("/login");return}t&&j()},[t,s,n]),(0,r.useEffect)(()=>{N()},[m,h,f]);let j=async()=>{try{c(!0),p([])}catch(e){console.error("Error loading pathology reports:",e)}finally{c(!1)}},N=()=>{let e=[...m];h&&(e=e.filter(e=>{var t,s,a,r;return(null===(t=e.patientName)||void 0===t?void 0:t.toLowerCase().includes(h.toLowerCase()))||(null===(s=e.mrNumber)||void 0===s?void 0:s.toLowerCase().includes(h.toLowerCase()))||(null===(a=e.diagnosis)||void 0===a?void 0:a.toLowerCase().includes(h.toLowerCase()))||(null===(r=e.specimenType)||void 0===r?void 0:r.toLowerCase().includes(h.toLowerCase()))})),"all"!==f&&(e=e.filter(e=>e.reportType===f)),e.sort((e,t)=>new Date(t.reportDate).getTime()-new Date(e.reportDate).getTime()),u(e)},w=e=>{let t={"CORE-BIOPSY":"bg-blue-100 text-blue-800",FNAB:"bg-green-100 text-green-800",EXCISIONAL:"bg-purple-100 text-purple-800",INCISIONAL:"bg-yellow-100 text-yellow-800",IHC:"bg-pink-100 text-pink-800",CYTOLOGY:"bg-orange-100 text-orange-800"}[e]||"bg-gray-100 text-gray-800";return(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full ".concat(t),children:e})};return s||d?(0,a.jsx)(l.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading pathology reports..."})]})})}):(0,a.jsxs)(l.A,{children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Pathology Reports"}),(0,a.jsx)("p",{className:"text-gray-600",children:"Manage histopathology and cytology reports"})]}),(0,a.jsxs)("button",{onClick:()=>n.push("/patients/new"),className:"px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center",children:[(0,a.jsx)("span",{className:"mr-2",children:"\uD83D\uDCE4"}),"Upload Report"]})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Reports"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:m.length})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDD2C"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Core Biopsy"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:m.filter(e=>"CORE-BIOPSY"===e.reportType).length})]}),(0,a.jsx)("div",{className:"text-2xl",children:"\uD83D\uDC89"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"FNAB"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:m.filter(e=>"FNAB"===e.reportType).length})]}),(0,a.jsx)("div",{className:"text-2xl",children:"\uD83E\uDDEA"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"IHC"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-pink-600 mt-2",children:m.filter(e=>"IHC"===e.reportType).length})]}),(0,a.jsx)("div",{className:"text-2xl",children:"\uD83E\uDDEC"})]})})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Search"}),(0,a.jsx)("input",{type:"text",value:h,onChange:e=>g(e.target.value),placeholder:"Patient name, MR number, diagnosis, or specimen type",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Report Type"}),(0,a.jsxs)("select",{value:f,onChange:e=>y(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,a.jsx)("option",{value:"all",children:"All Types"}),(0,a.jsx)("option",{value:"CORE-BIOPSY",children:"Core Biopsy"}),(0,a.jsx)("option",{value:"FNAB",children:"FNAB"}),(0,a.jsx)("option",{value:"EXCISIONAL",children:"Excisional Biopsy"}),(0,a.jsx)("option",{value:"INCISIONAL",children:"Incisional Biopsy"}),(0,a.jsx)("option",{value:"IHC",children:"Immunohistochemistry"}),(0,a.jsx)("option",{value:"CYTOLOGY",children:"Cytology"})]})]})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,a.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Pathology Reports (",x.length,")"]})}),0===x.length?(0,a.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,a.jsx)("div",{className:"text-6xl mb-4",children:"\uD83D\uDD2C"}),(0,a.jsx)("p",{className:"text-lg font-medium",children:"No pathology reports found"}),(0,a.jsx)("p",{className:"text-sm mt-2",children:0===m.length?"Pathology reports will appear here when uploaded":"Try adjusting your search filters"})]}):(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Patient"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"MR Number"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Report Type"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Specimen"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Biopsy Date"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Diagnosis"}),(0,a.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Actions"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:x.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.patientName||"Unknown"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:e.mrNumber||"-"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:w(e.reportType)}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:e.specimenType||"-"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:new Date(e.biopsyDate).toLocaleDateString("id-ID")})}),(0,a.jsx)("td",{className:"px-6 py-4",children:(0,a.jsx)("div",{className:"text-sm text-gray-900 line-clamp-2",children:e.diagnosis||"Pending"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:(0,a.jsx)("button",{onClick:()=>v(e),className:"text-blue-600 hover:text-blue-900",children:"View"})})]},e.id))})]})})]}),b&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4",children:(0,a.jsxs)("div",{className:"bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto",children:[(0,a.jsx)("div",{className:"p-6 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("h2",{className:"text-xl font-bold text-gray-900",children:"Pathology Report Detail"}),(0,a.jsx)("button",{onClick:()=>v(null),className:"text-gray-400 hover:text-gray-600",children:(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})}),(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-6 mb-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Patient Information"}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs text-gray-600",children:"Patient Name"}),(0,a.jsx)("p",{className:"font-medium",children:b.patientName||"Unknown"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs text-gray-600",children:"MR Number"}),(0,a.jsx)("p",{className:"font-medium",children:b.mrNumber||"-"})]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Report Information"}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs text-gray-600",children:"Report Type"}),(0,a.jsx)("div",{className:"mt-1",children:w(b.reportType)})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs text-gray-600",children:"Specimen Type"}),(0,a.jsx)("p",{className:"font-medium",children:b.specimenType||"-"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs text-gray-600",children:"Biopsy Date"}),(0,a.jsx)("p",{className:"font-medium",children:new Date(b.biopsyDate).toLocaleDateString("id-ID")})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs text-gray-600",children:"Report Date"}),(0,a.jsx)("p",{className:"font-medium",children:new Date(b.reportDate).toLocaleDateString("id-ID")})]})]})]})]}),b.diagnosis&&(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-2",children:"Diagnosis"}),(0,a.jsx)("p",{className:"text-gray-900 font-medium",children:b.diagnosis})]}),b.grossDescription&&(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-2",children:"Gross Description"}),(0,a.jsx)("p",{className:"text-gray-900 whitespace-pre-wrap",children:b.grossDescription})]}),b.microscopicDescription&&(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-2",children:"Microscopic Description"}),(0,a.jsx)("p",{className:"text-gray-900 whitespace-pre-wrap",children:b.microscopicDescription})]}),b.ihcMarkers&&(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-2",children:"IHC Markers"}),(0,a.jsx)("p",{className:"text-gray-900 whitespace-pre-wrap",children:b.ihcMarkers})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3",children:[b.fileUrl&&(0,a.jsx)("button",{onClick:()=>window.open(b.fileUrl,"_blank"),className:"px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors",children:"Download PDF"}),(0,a.jsx)("button",{onClick:()=>v(null),className:"px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"Close"})]})]})]})})]})}},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,r;s.d(t,{x7:function(){return ep},ZP:function(){return ex}});var i,l=s(2265);let o={data:""},n=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,p=(e,t)=>{let s="",a="",r="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":a+="f"==i[1]?p(l,i):i+"{"+p(l,"k"==i[1]?"":t)+"}":"object"==typeof l?a+=p(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=p.p?p.p(i,l):i+":"+l+";")}return s+(t&&r?t+"{"+r+"}":r)+a},x={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e},h=(e,t,s,a,r)=>{var i;let l=u(e),o=x[l]||(x[l]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(l));if(!x[o]){let t=l!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);x[o]=p(r?{["@keyframes "+o]:t}:t,s?"":"."+o)}let n=s&&x.g?x.g:null;return s&&(x.g=x[o]),i=x[o],n?t.data=t.data.replace(n,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),o},g=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function N(e,t){let s=this||{};return function(){let a=arguments;function r(i,l){let o=Object.assign({},i),n=o.className||r.className;s.p=Object.assign({theme:b&&b()},o),s.o=/ *go\d+/.test(n),o.className=f.apply(s,a)+(n?" "+n:""),t&&(o.ref=l);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),y(d,o)}return t?t(r):r}}var w=e=>"function"==typeof e,D=(e,t)=>w(e)?e(t):e,C=(a=0,()=>(++a).toString()),k=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},E="default",I=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return I(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},O=[],L={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},T=(e,t=E)=>{A[t]=I(A[t]||L,e),O.forEach(([e,s])=>{e===t&&s(A[t])})},S=e=>Object.keys(A).forEach(t=>T(e,t)),P=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),R=(e=E)=>t=>{T(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},B=(e={},t=E)=>{let[s,a]=(0,l.useState)(A[t]||L),r=(0,l.useRef)(A[t]);(0,l.useEffect)(()=>(r.current!==A[t]&&a(A[t]),O.push([t,a]),()=>{let e=O.findIndex(([e])=>e===t);e>-1&&O.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:i}},M=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||C()}),_=e=>(t,s)=>{let a=M(t,e,s);return R(a.toasterId||P(a.id))({type:2,toast:a}),a.id},z=(e,t)=>_("blank")(e,t);z.error=_("error"),z.success=_("success"),z.loading=_("loading"),z.custom=_("custom"),z.dismiss=(e,t)=>{let s={type:3,toastId:e};t?R(t)(s):S(s)},z.dismissAll=e=>z.dismiss(void 0,e),z.remove=(e,t)=>{let s={type:4,toastId:e};t?R(t)(s):S(s)},z.removeAll=e=>z.remove(void 0,e),z.promise=(e,t,s)=>{let a=z.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?D(t.success,e):void 0;return r?z.success(r,{id:a,...s,...null==s?void 0:s.success}):z.dismiss(a),e}).catch(e=>{let r=t.error?D(t.error,e):void 0;r?z.error(r,{id:a,...s,...null==s?void 0:s.error}):z.dismiss(a)}),e};var F=1e3,H=(e,t="default")=>{let{toasts:s,pausedAt:a}=B(e,t),r=(0,l.useRef)(new Map).current,i=(0,l.useCallback)((e,t=F)=>{if(r.has(e))return;let s=setTimeout(()=>{r.delete(e),o({type:4,toastId:e})},t);r.set(e,s)},[]);(0,l.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&z.dismiss(s.id);return}return setTimeout(()=>z.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let o=(0,l.useCallback)(R(t),[t]),n=(0,l.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,l.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,l.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),m=(0,l.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},l=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=l.findIndex(t=>t.id===e.id),n=l.filter((e,t)=>t<o&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,l.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:m}}},Y=j`
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
}`,G=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,X=N("div")`
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
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Z=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,V=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=j`
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
}`,J=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,K=N("div")`
  position: absolute;
`,Q=N("div")`
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
}`,et=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===s?null:l.createElement(Q,null,l.createElement(q,{...a}),"loading"!==s&&l.createElement(K,null,"error"===s?l.createElement(X,{...a}):l.createElement(J,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=N("div")`
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
`,el=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),er(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=l.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(es,{toast:e}),o=l.createElement(el,{...e.ariaProps},D(e.message,e));return l.createElement(ei,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:o}):l.createElement(l.Fragment,null,i,o))});i=l.createElement,p.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let i=l.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:i,className:t,style:s},r)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,toasterId:i,containerStyle:o,containerClassName:n})=>{let{toasts:d,handlers:c}=H(s,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let i=s.position||t,o=ec(i,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return l.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?em:"",style:o},"custom"===s.type?D(s.message,s):r?r(s):l.createElement(en,{toast:s,position:i}))}))},ex=z}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=7567)}),_N_E=e.O()}]);