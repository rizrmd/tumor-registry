(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6891],{3905:function(e,t,s){Promise.resolve().then(s.bind(s,134))},134:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return n}});var a=s(7437),r=s(2265),l=s(6986),i=s(4894);function n(){let{user:e,isAuthenticated:t,isLoading:s}=(0,l.useAuth)(),[n,o]=(0,r.useState)(!0),[d,c]=(0,r.useState)("breast");if((0,r.useEffect)(()=>{if(!s&&!t){window.location.href="/login";return}t&&o(!1)},[t,s]),s||n)return(0,a.jsx)(i.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"})})});let m=[{month:"Nov 2023",cases:78,change:0},{month:"Des 2023",cases:82,change:5.1},{month:"Jan 2024",cases:89,change:8.5},{month:"Feb 2024",cases:91,change:2.2},{month:"Mar 2024",cases:95,change:4.4},{month:"Apr 2024",cases:88,change:-7.4},{month:"Mei 2024",cases:103,change:17},{month:"Jun 2024",cases:98,change:-4.9},{month:"Jul 2024",cases:106,change:8.2},{month:"Agu 2024",cases:112,change:5.7},{month:"Sep 2024",cases:108,change:-3.6},{month:"Okt 2024",cases:115,change:6.5}],u=m[m.length-1];m[m.length-2];let x=m[0],h=Math.round(m.reduce((e,t)=>e+t.cases,0)/m.length),p=m.reduce((e,t)=>e+t.cases,0),g=((u.cases-x.cases)/x.cases*100).toFixed(1);return(0,a.jsxs)(i.A,{children:[(0,a.jsxs)("div",{className:"mb-8",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Analisis Tren Temporal"}),(0,a.jsx)("p",{className:"text-gray-600 mt-2",children:"Analisis tren kasus kanker dari waktu ke waktu"})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row gap-4",children:[(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Jenis Kanker"}),(0,a.jsx)("select",{value:d,onChange:e=>c(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[{value:"breast",label:"Kanker Payudara"},{value:"cervical",label:"Kanker Serviks"},{value:"lung",label:"Kanker Paru-paru"},{value:"colorectal",label:"Kanker Kolorektal"},{value:"liver",label:"Kanker Hati"}].map(e=>(0,a.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Periode Waktu"}),(0,a.jsxs)("select",{className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[(0,a.jsx)("option",{children:"12 Bulan Terakhir"}),(0,a.jsx)("option",{children:"6 Bulan Terakhir"}),(0,a.jsx)("option",{children:"3 Bulan Terakhir"}),(0,a.jsx)("option",{children:"Tahun 2024"}),(0,a.jsx)("option",{children:"Tahun 2023"})]})]})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-6",children:[(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Bulan Ini"}),(0,a.jsx)("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:u.cases}),(0,a.jsxs)("div",{className:"flex items-center mt-2",children:[u.change>0?(0,a.jsx)("svg",{className:"w-4 h-4 text-red-600 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}):(0,a.jsx)("svg",{className:"w-4 h-4 text-green-600 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),(0,a.jsxs)("span",{className:"text-sm font-medium ".concat(u.change>0?"text-red-600":"text-green-600"),children:[Math.abs(u.change),"%"]}),(0,a.jsx)("span",{className:"text-xs text-gray-500 ml-1",children:"vs bulan lalu"})]})]}),(0,a.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-8 w-8 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})})})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Rata-rata Bulanan"}),(0,a.jsx)("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:h}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-2",children:"kasus per bulan"})]}),(0,a.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-8 w-8 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})})})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total 12 Bulan"}),(0,a.jsx)("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:p.toLocaleString()}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-2",children:"kasus terdaftar"})]}),(0,a.jsx)("div",{className:"p-3 bg-purple-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-8 w-8 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"})})})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Pertumbuhan YoY"}),(0,a.jsxs)("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:[g,"%"]}),(0,a.jsxs)("div",{className:"flex items-center mt-2",children:[parseFloat(g)>0?(0,a.jsx)("svg",{className:"w-4 h-4 text-red-600 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}):(0,a.jsx)("svg",{className:"w-4 h-4 text-green-600 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),(0,a.jsx)("span",{className:"text-xs text-gray-500",children:"vs tahun lalu"})]})]}),(0,a.jsx)("div",{className:"p-3 bg-yellow-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-8 w-8 text-yellow-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"})})})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:[(0,a.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-6",children:"Tren Kasus - 12 Bulan Terakhir"}),(0,a.jsx)("div",{className:"bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8",style:{minHeight:"400px"},children:(0,a.jsx)("div",{className:"flex items-end justify-around h-80 pb-8",children:m.map((e,t)=>{let s=e.cases/Math.max(...m.map(e=>e.cases))*100;return(0,a.jsxs)("div",{className:"flex flex-col items-center flex-1 mx-1",children:[(0,a.jsx)("div",{className:"relative w-full flex items-end justify-center",style:{height:"280px"},children:(0,a.jsx)("div",{className:"group relative",children:(0,a.jsx)("div",{className:"w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all hover:from-green-700 hover:to-green-500 cursor-pointer",style:{height:"".concat(s,"%"),minWidth:"24px"},children:(0,a.jsx)("div",{className:"absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity",children:(0,a.jsxs)("div",{className:"bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap",children:[e.cases," kasus"]})})})})}),(0,a.jsx)("p",{className:"text-xs text-gray-600 mt-2 transform -rotate-45 origin-top-left",children:e.month})]},e.month)})})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,a.jsxs)("div",{className:"lg:col-span-2 bg-white rounded-lg shadow overflow-hidden",children:[(0,a.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsx)("h2",{className:"text-xl font-semibold text-gray-900",children:"Rincian Bulanan"})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Bulan"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Jumlah Kasus"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Perubahan"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:m.slice().reverse().map((e,t)=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.month})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-semibold text-gray-900",children:e.cases})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("div",{className:"text-sm font-medium ".concat(e.change>0?"text-red-600":e.change<0?"text-green-600":"text-gray-600"),children:[e.change>0?"+":"",e.change.toFixed(1),"%"]})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:e.change>0?(0,a.jsxs)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",children:[(0,a.jsx)("svg",{className:"w-3 h-3 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),"Naik"]}):e.change<0?(0,a.jsxs)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",children:[(0,a.jsx)("svg",{className:"w-3 h-3 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Turun"]}):(0,a.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800",children:"Stabil"})})]},e.month))})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-6",children:"Perbandingan Tahunan"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"border-b pb-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("span",{className:"text-sm font-medium text-gray-700",children:"2024"}),(0,a.jsx)("span",{className:"text-lg font-bold text-green-600",children:p})]}),(0,a.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-3",children:(0,a.jsx)("div",{className:"bg-green-600 h-3 rounded-full",style:{width:"100%"}})})]}),(0,a.jsxs)("div",{className:"border-b pb-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("span",{className:"text-sm font-medium text-gray-700",children:"2023"}),(0,a.jsx)("span",{className:"text-lg font-bold text-gray-600",children:"937"})]}),(0,a.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-3",children:(0,a.jsx)("div",{className:"bg-gray-500 h-3 rounded-full",style:{width:"".concat(937/p*100,"%")}})})]}),(0,a.jsxs)("div",{className:"border-b pb-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("span",{className:"text-sm font-medium text-gray-700",children:"2022"}),(0,a.jsx)("span",{className:"text-lg font-bold text-gray-600",children:"824"})]}),(0,a.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-3",children:(0,a.jsx)("div",{className:"bg-gray-400 h-3 rounded-full",style:{width:"".concat(824/p*100,"%")}})})]}),(0,a.jsxs)("div",{className:"bg-blue-50 rounded-lg p-4 mt-6",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-blue-900 mb-2",children:"Insight"}),(0,a.jsxs)("p",{className:"text-xs text-blue-700",children:["Terjadi peningkatan kasus sebesar ",g,"% dibandingkan tahun lalu. Peningkatan tertinggi terjadi di bulan ",m.reduce((e,t)=>t.cases>e.cases?t:e).month,"."]})]})]})]})]})]})}},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,r;s.d(t,{x7:function(){return eu},ZP:function(){return ex}});var l,i=s(2265);let n={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let s="",a="",r="";for(let l in e){let i=e[l];"@"==l[0]?"i"==l[1]?s=l+" "+i+";":a+="f"==l[1]?u(i,l):l+"{"+u(i,"k"==l[1]?"":t)+"}":"object"==typeof i?a+=u(i,t?t.replace(/([^,])+/g,e=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):l):null!=i&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=u.p?u.p(l,i):l+":"+i+";")}return s+(t&&r?t+"{"+r+"}":r)+a},x={},h=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+h(e[s]);return t}return e},p=(e,t,s,a,r)=>{var l;let i=h(e),n=x[i]||(x[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!x[n]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);x[n]=u(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let o=s&&x.g?x.g:null;return s&&(x.g=x[n]),l=x[n],o?t.data=t.data.replace(o,l):-1===t.data.indexOf(l)&&(t.data=a?l+t.data:t.data+l),n},g=(e,t,s)=>e.reduce((e,a,r)=>{let l=t[r];if(l&&l.call){let e=l(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;l=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==l?"":l)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return p(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let b,v,y,j=f.bind({k:1});function N(e,t){let s=this||{};return function(){let a=arguments;function r(l,i){let n=Object.assign({},l),o=n.className||r.className;s.p=Object.assign({theme:v&&v()},n),s.o=/ *go\d+/.test(o),n.className=f.apply(s,a)+(o?" "+o:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),b(d,n)}return t?t(r):r}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},M="default",L=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return L(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let l=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+l}))}}},z=[],B={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},T={},$=(e,t=M)=>{T[t]=L(T[t]||B,e),z.forEach(([e,s])=>{e===t&&s(T[t])})},A=e=>Object.keys(T).forEach(t=>$(e,t)),O=e=>Object.keys(T).find(t=>T[t].toasts.some(t=>t.id===e)),P=(e=M)=>t=>{$(t,e)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(e={},t=M)=>{let[s,a]=(0,i.useState)(T[t]||B),r=(0,i.useRef)(T[t]);(0,i.useEffect)(()=>(r.current!==T[t]&&a(T[t]),z.push([t,a]),()=>{let e=z.findIndex(([e])=>e===t);e>-1&&z.splice(e,1)}),[t]);let l=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:l}},V=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||E()}),I=e=>(t,s)=>{let a=V(t,e,s);return P(a.toasterId||O(a.id))({type:2,toast:a}),a.id},_=(e,t)=>I("blank")(e,t);_.error=I("error"),_.success=I("success"),_.loading=I("loading"),_.custom=I("custom"),_.dismiss=(e,t)=>{let s={type:3,toastId:e};t?P(t)(s):A(s)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let s={type:4,toastId:e};t?P(t)(s):A(s)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,s)=>{let a=_.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?_.success(r,{id:a,...s,...null==s?void 0:s.success}):_.dismiss(a),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?_.error(r,{id:a,...s,...null==s?void 0:s.error}):_.dismiss(a)}),e};var S=1e3,H=(e,t="default")=>{let{toasts:s,pausedAt:a}=D(e,t),r=(0,i.useRef)(new Map).current,l=(0,i.useCallback)((e,t=S)=>{if(r.has(e))return;let s=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,s)},[]);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&_.dismiss(s.id);return}return setTimeout(()=>_.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,i.useCallback)(P(t),[t]),o=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,i.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),m=(0,i.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:l}=t||{},i=s.filter(t=>(t.position||l)===(e.position||l)&&t.height),n=i.findIndex(t=>t.id===e.id),o=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,i.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[s,l]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:m}}},F=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,K=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,J=N("div")`
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
    animation: ${K} 0.15s ease-out forwards;
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
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,Z=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,q=j`
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
}`,G=N("div")`
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
    animation: ${q} 0.2s ease-out forwards;
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
`,Q=N("div")`
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
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(et,null,t):t:"blank"===s?null:i.createElement(X,null,i.createElement(U,{...a}),"loading"!==s&&i.createElement(Q,null,"error"===s?i.createElement(J,{...a}):i.createElement(G,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,el=N("div")`
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
`,ei=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),er(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=i.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},l=i.createElement(es,{toast:e}),n=i.createElement(ei,{...e.ariaProps},k(e.message,e));return i.createElement(el,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:l,message:n}):i.createElement(i.Fragment,null,l,n))});l=i.createElement,u.p=void 0,b=l,v=void 0,y=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let l=i.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:l,className:t,style:s},r)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,toasterId:l,containerStyle:n,containerClassName:o})=>{let{toasts:d,handlers:c}=H(s,l);return i.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let l=s.position||t,n=ec(l,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?em:"",style:n},"custom"===s.type?k(s.message,s):r?r(s):i.createElement(eo,{toast:s,position:l}))}))},ex=_}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=3905)}),_N_E=e.O()}]);