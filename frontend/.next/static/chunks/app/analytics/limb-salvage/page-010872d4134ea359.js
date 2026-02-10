(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1577],{3422:function(e,t,a){Promise.resolve().then(a.bind(a,5180))},5180:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var s=a(7437),r=a(2265),i=a(6986),l=a(4894),n=a(4033);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),o=(0,n.useRouter)(),[d,c]=(0,r.useState)(!0),[m,u]=(0,r.useState)({totalProcedures:0,salvageCount:0,amputationCount:0,salvageRate:0}),[p,x]=(0,r.useState)([]),[g,h]=(0,r.useState)([]),[f,v]=(0,r.useState)([]),[y,b]=(0,r.useState)("all");(0,r.useEffect)(()=>{if(!a&&!t){o.push("/login");return}t&&j()},[t,a,o,y]);let j=async()=>{try{c(!0),u({totalProcedures:847,salvageCount:698,amputationCount:149,salvageRate:82.4}),x([{tumorType:"Osteosarcoma",total:285,salvage:225,amputation:60,salvageRate:78.9},{tumorType:"Ewing Sarcoma",total:156,salvage:138,amputation:18,salvageRate:88.5},{tumorType:"Chondrosarcoma",total:134,salvage:121,amputation:13,salvageRate:90.3},{tumorType:"Giant Cell Tumor",total:98,salvage:95,amputation:3,salvageRate:96.9},{tumorType:"Soft Tissue Sarcoma",total:174,salvage:119,amputation:55,salvageRate:68.4}]),h([{stage:"IA (Low grade, intracompartmental)",total:245,salvage:241,amputation:4,salvageRate:98.4},{stage:"IB (Low grade, extracompartmental)",total:189,salvage:178,amputation:11,salvageRate:94.2},{stage:"IIA (High grade, intracompartmental)",total:168,salvage:142,amputation:26,salvageRate:84.5},{stage:"IIB (High grade, extracompartmental)",total:156,salvage:95,amputation:61,salvageRate:60.9},{stage:"III (Metastasis)",total:89,salvage:42,amputation:47,salvageRate:47.2}]),v([{centerId:"1",centerName:"RSUPN Dr. Cipto Mangunkusumo",total:156,salvage:139,amputation:17,salvageRate:89.1,rank:1},{centerId:"2",centerName:"RSUP Dr. Sardjito",total:134,salvage:116,amputation:18,salvageRate:86.6,rank:2},{centerId:"3",centerName:"RSUP Dr. Soetomo",total:128,salvage:109,amputation:19,salvageRate:85.2,rank:3},{centerId:"4",centerName:"RSUP Dr. Hasan Sadikin",total:98,salvage:81,amputation:17,salvageRate:82.7,rank:4},{centerId:"5",centerName:"RSOP Prof. Dr. Soeharso",total:89,salvage:72,amputation:17,salvageRate:80.9,rank:5}])}catch(e){console.error("Error loading limb salvage analytics:",e)}finally{c(!1)}},N=e=>e>=85?"text-green-600":e>=70?"text-yellow-600":"text-red-600",w=e=>e>=85?"bg-green-100":e>=70?"bg-yellow-100":"bg-red-100";return a||d?(0,s.jsx)(l.A,{children:(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading limb salvage analytics..."})]})})}):(0,s.jsxs)(l.A,{children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Limb Salvage vs Amputation Analytics"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Key surgical outcome metrics for musculoskeletal tumors"})]}),(0,s.jsx)("div",{children:(0,s.jsxs)("select",{value:y,onChange:e=>b(e.target.value),className:"px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,s.jsx)("option",{value:"all",children:"All Time"}),(0,s.jsx)("option",{value:"1y",children:"Last Year"}),(0,s.jsx)("option",{value:"6m",children:"Last 6 Months"}),(0,s.jsx)("option",{value:"3m",children:"Last 3 Months"})]})})]})}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Procedures"}),(0,s.jsx)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:m.totalProcedures})]}),(0,s.jsx)("div",{className:"text-4xl",children:"\uD83C\uDFE5"})]})}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Limb Salvage"}),(0,s.jsx)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:m.salvageCount})]}),(0,s.jsx)("div",{className:"text-4xl",children:"✅"})]}),(0,s.jsxs)("p",{className:"text-sm text-gray-500 mt-2",children:[m.salvageRate,"% of total"]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Amputation"}),(0,s.jsx)("p",{className:"text-3xl font-bold text-red-600 mt-2",children:m.amputationCount})]}),(0,s.jsx)("div",{className:"text-4xl",children:"⚠️"})]}),(0,s.jsxs)("p",{className:"text-sm text-gray-500 mt-2",children:[(100-m.salvageRate).toFixed(1),"% of total"]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Salvage Rate"}),(0,s.jsxs)("p",{className:"text-3xl font-bold mt-2 ".concat(N(m.salvageRate)),children:[m.salvageRate,"%"]})]}),(0,s.jsx)("div",{className:"text-4xl",children:"\uD83D\uDCCA"})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2 mt-3",children:(0,s.jsx)("div",{className:"h-2 rounded-full ".concat(m.salvageRate>=85?"bg-green-500":m.salvageRate>=70?"bg-yellow-500":"bg-red-500"),style:{width:"".concat(m.salvageRate,"%")}})})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Limb Salvage Rate by Tumor Type"}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tumor Type"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amputation"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage Rate"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:p.map((e,t)=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.tumorType})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsx)("div",{className:"text-sm text-gray-900",children:e.total})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsx)("div",{className:"text-sm text-green-600 font-medium",children:e.salvage})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsx)("div",{className:"text-sm text-red-600 font-medium",children:e.amputation})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsxs)("span",{className:"px-3 py-1 rounded-full text-sm font-semibold ".concat(w(e.salvageRate)," ").concat(N(e.salvageRate)),children:[e.salvageRate,"%"]})})]},t))})]})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Limb Salvage Rate by Enneking Staging"}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Enneking Stage"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Total"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amputation"}),(0,s.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Salvage Rate"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:g.map((e,t)=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.stage})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsx)("div",{className:"text-sm text-gray-900",children:e.total})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsx)("div",{className:"text-sm text-green-600 font-medium",children:e.salvage})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsx)("div",{className:"text-sm text-red-600 font-medium",children:e.amputation})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right",children:(0,s.jsxs)("span",{className:"px-3 py-1 rounded-full text-sm font-semibold ".concat(w(e.salvageRate)," ").concat(N(e.salvageRate)),children:[e.salvageRate,"%"]})})]},t))})]})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Center Performance Leaderboard"}),(0,s.jsx)("div",{className:"space-y-4",children:f.map(e=>(0,s.jsxs)("div",{className:"flex items-center space-x-4 p-4 bg-gray-50 rounded-lg",children:[(0,s.jsx)("div",{className:"flex-shrink-0 w-10 h-10 flex items-center justify-center",children:e.rank<=3?(0,s.jsx)("span",{className:"text-2xl",children:1===e.rank?"\uD83E\uDD47":2===e.rank?"\uD83E\uDD48":"\uD83E\uDD49"}):(0,s.jsx)("span",{className:"text-gray-500 font-semibold text-lg",children:e.rank})}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.centerName}),(0,s.jsxs)("div",{className:"flex items-center space-x-4 text-xs text-gray-500 mt-1",children:[(0,s.jsxs)("span",{children:[e.total," procedures"]}),(0,s.jsx)("span",{children:"•"}),(0,s.jsxs)("span",{className:"text-green-600",children:[e.salvage," salvage"]}),(0,s.jsx)("span",{children:"•"}),(0,s.jsxs)("span",{className:"text-red-600",children:[e.amputation," amputation"]})]})]}),(0,s.jsx)("div",{children:(0,s.jsxs)("span",{className:"px-4 py-2 rounded-full text-lg font-bold ".concat(w(e.salvageRate)," ").concat(N(e.salvageRate)),children:[e.salvageRate,"%"]})})]},e.centerId))})]})]})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return eu},ZP:function(){return ep}});var i,l=a(2265);let n={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let a="",s="",r="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+l+";":s+="f"==i[1]?u(l,i):i+"{"+u(l,"k"==i[1]?"":t)+"}":"object"==typeof l?s+=u(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=u.p?u.p(i,l):i+":"+l+";")}return a+(t&&r?t+"{"+r+"}":r)+s},p={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},g=(e,t,a,s,r)=>{var i;let l=x(e),n=p[l]||(p[l]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(l));if(!p[n]){let t=l!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(m," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);p[n]=u(r?{["@keyframes "+n]:t}:t,a?"":"."+n)}let o=a&&p.g?p.g:null;return a&&(p.g=p[n]),i=p[n],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),n},h=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return g(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let v,y,b,j=f.bind({k:1});function N(e,t){let a=this||{};return function(){let s=arguments;function r(i,l){let n=Object.assign({},i),o=n.className||r.className;a.p=Object.assign({theme:y&&y()},n),a.o=/ *go\d+/.test(o),n.className=f.apply(a,s)+(o?" "+o:""),t&&(n.ref=l);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),v(d,n)}return t?t(r):r}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,R=(s=0,()=>(++s).toString()),E=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},S="default",D=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return D(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},C=[],I={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},T=(e,t=S)=>{A[t]=D(A[t]||I,e),C.forEach(([e,a])=>{e===t&&a(A[t])})},P=e=>Object.keys(A).forEach(t=>T(e,t)),$=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),L=(e=S)=>t=>{T(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=(e={},t=S)=>{let[a,s]=(0,l.useState)(A[t]||I),r=(0,l.useRef)(A[t]);(0,l.useEffect)(()=>(r.current!==A[t]&&s(A[t]),C.push([t,s]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},z=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||R()}),M=e=>(t,a)=>{let s=z(t,e,a);return L(s.toasterId||$(s.id))({type:2,toast:s}),s.id},H=(e,t)=>M("blank")(e,t);H.error=M("error"),H.success=M("success"),H.loading=M("loading"),H.custom=M("custom"),H.dismiss=(e,t)=>{let a={type:3,toastId:e};t?L(t)(a):P(a)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let a={type:4,toastId:e};t?L(t)(a):P(a)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,a)=>{let s=H.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?H.success(r,{id:s,...a,...null==a?void 0:a.success}):H.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?H.error(r,{id:s,...a,...null==a?void 0:a.error}):H.dismiss(s)}),e};var F=1e3,U=(e,t="default")=>{let{toasts:a,pausedAt:s}=_(e,t),r=(0,l.useRef)(new Map).current,i=(0,l.useCallback)((e,t=F)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,a)},[]);(0,l.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&H.dismiss(a.id);return}return setTimeout(()=>H.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let n=(0,l.useCallback)(L(t),[t]),o=(0,l.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,l.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,l.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),m=(0,l.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},l=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,l.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:m}}},B=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Y=j`
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
}`,q=N("div")`
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
    animation: ${Y} 0.15s ease-out forwards;
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
`,K=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,J=j`
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
}`,V=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,W=N("div")`
  position: absolute;
`,X=N("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===a?null:l.createElement(X,null,l.createElement(K,{...s}),"loading"!==a&&l.createElement(W,null,"error"===a?l.createElement(q,{...s}):l.createElement(V,{...s})))},es=e=>`
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
`,en=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=l.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(ea,{toast:e}),n=l.createElement(el,{...e.ariaProps},k(e.message,e));return l.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:n}):l.createElement(l.Fragment,null,i,n))});i=l.createElement,u.p=void 0,v=i,y=void 0,b=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=l.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:n,containerClassName:o})=>{let{toasts:d,handlers:c}=U(a,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,n=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return l.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?em:"",style:n},"custom"===a.type?k(a.message,a):r?r(a):l.createElement(eo,{toast:a,position:i}))}))},ep=H}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=3422)}),_N_E=e.O()}]);