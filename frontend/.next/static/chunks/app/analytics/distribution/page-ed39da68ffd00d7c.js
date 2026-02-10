(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[52],{535:function(e,t,s){Promise.resolve().then(s.bind(s,813))},813:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return n}});var a=s(7437),r=s(2265),i=s(6986),l=s(4894);function n(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),[n,o]=(0,r.useState)(!0),[d,c]=(0,r.useState)("all");if((0,r.useEffect)(()=>{if(!s&&!t){window.location.href="/login";return}t&&o(!1)},[t,s]),s||n)return(0,a.jsx)(l.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"})})});let m=[{province:"Jawa Barat",cases:324,percentage:18.5,trend:"up",color:"bg-red-600"},{province:"Jawa Timur",cases:298,percentage:17,trend:"up",color:"bg-red-500"},{province:"DKI Jakarta",cases:276,percentage:15.8,trend:"stable",color:"bg-orange-600"},{province:"Jawa Tengah",cases:234,percentage:13.4,trend:"down",color:"bg-orange-500"},{province:"Sumatera Utara",cases:187,percentage:10.7,trend:"up",color:"bg-yellow-500"},{province:"Banten",cases:156,percentage:8.9,trend:"stable",color:"bg-yellow-400"},{province:"Sulawesi Selatan",cases:134,percentage:7.7,trend:"up",color:"bg-green-400"},{province:"Sumatera Barat",cases:98,percentage:5.6,trend:"stable",color:"bg-green-300"},{province:"Kalimantan Timur",cases:45,percentage:2.6,trend:"down",color:"bg-blue-300"},{province:"Bali",cases:23,percentage:1.3,trend:"stable",color:"bg-blue-200"}],p=m.reduce((e,t)=>e+t.cases,0);return(0,a.jsxs)(l.A,{children:[(0,a.jsxs)("div",{className:"mb-8",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Distribusi Geografis Kanker"}),(0,a.jsx)("p",{className:"text-gray-600 mt-2",children:"Peta distribusi kasus kanker di seluruh Indonesia"})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row gap-4",children:[(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Jenis Kanker"}),(0,a.jsx)("select",{value:d,onChange:e=>c(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[{value:"all",label:"Semua Jenis Kanker"},{value:"breast",label:"Kanker Payudara"},{value:"cervical",label:"Kanker Serviks"},{value:"lung",label:"Kanker Paru-paru"},{value:"colorectal",label:"Kanker Kolorektal"},{value:"liver",label:"Kanker Hati"}].map(e=>(0,a.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Periode"}),(0,a.jsxs)("select",{className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[(0,a.jsx)("option",{children:"Tahun 2024"}),(0,a.jsx)("option",{children:"Tahun 2023"}),(0,a.jsx)("option",{children:"6 Bulan Terakhir"}),(0,a.jsx)("option",{children:"3 Bulan Terakhir"})]})]})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6",children:[(0,a.jsxs)("div",{className:"lg:col-span-2 bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Peta Indonesia"}),(0,a.jsx)("div",{className:"bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 mb-6",style:{minHeight:"400px"},children:(0,a.jsx)("div",{className:"flex items-center justify-center h-full",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("svg",{className:"mx-auto h-32 w-32 text-green-600 mb-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"})}),(0,a.jsx)("p",{className:"text-gray-600 font-medium",children:"Peta Interaktif Indonesia"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Visualisasi distribusi kasus kanker berdasarkan provinsi"}),(0,a.jsxs)("div",{className:"mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto",children:[(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"text-3xl font-bold text-green-600",children:m.length}),(0,a.jsx)("div",{className:"text-sm text-gray-600",children:"Provinsi Terdampak"})]}),(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"text-3xl font-bold text-green-600",children:p.toLocaleString()}),(0,a.jsx)("div",{className:"text-sm text-gray-600",children:"Total Kasus"})]})]})]})})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-3",children:"Legenda Intensitas Kasus"}),(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("div",{className:"w-8 h-4 bg-red-600 rounded"}),(0,a.jsx)("span",{className:"text-sm text-gray-600",children:"Sangat Tinggi (300+)"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("div",{className:"w-8 h-4 bg-orange-500 rounded"}),(0,a.jsx)("span",{className:"text-sm text-gray-600",children:"Tinggi (150-299)"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("div",{className:"w-8 h-4 bg-yellow-400 rounded"}),(0,a.jsx)("span",{className:"text-sm text-gray-600",children:"Sedang (50-149)"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("div",{className:"w-8 h-4 bg-green-300 rounded"}),(0,a.jsx)("span",{className:"text-sm text-gray-600",children:"Rendah (20-49)"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("div",{className:"w-8 h-4 bg-blue-200 rounded"}),(0,a.jsx)("span",{className:"text-sm text-gray-600",children:"Sangat Rendah (<20)"})]})]})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Top 5 Provinsi"}),(0,a.jsx)("div",{className:"space-y-4",children:m.slice(0,5).map((e,t)=>(0,a.jsxs)("div",{className:"border-b pb-4 last:border-b-0 last:pb-0",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"flex items-center justify-center w-8 h-8 bg-green-100 rounded-full",children:(0,a.jsxs)("span",{className:"text-green-700 font-bold text-sm",children:["#",t+1]})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"font-semibold text-gray-900",children:e.province}),(0,a.jsxs)("p",{className:"text-sm text-gray-500",children:[e.cases.toLocaleString()," kasus"]})]})]}),"up"===e.trend&&(0,a.jsx)("div",{className:"flex items-center text-red-600",children:(0,a.jsx)("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})})}),"down"===e.trend&&(0,a.jsx)("div",{className:"flex items-center text-green-600",children:(0,a.jsx)("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",clipRule:"evenodd"})})})]}),(0,a.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,a.jsx)("div",{className:"bg-green-600 h-2 rounded-full transition-all",style:{width:"".concat(5*e.percentage,"%")}})}),(0,a.jsxs)("p",{className:"text-xs text-gray-500 mt-1",children:[e.percentage,"% dari total"]})]},e.province))})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,a.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsx)("h2",{className:"text-xl font-semibold text-gray-900",children:"Semua Provinsi"})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Peringkat"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Provinsi"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Jumlah Kasus"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Persentase"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Intensitas"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tren"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:m.map((e,t)=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:["#",t+1]}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.province})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-semibold text-gray-900",children:e.cases.toLocaleString()})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("div",{className:"text-sm text-gray-900",children:[e.percentage,"%"]})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("span",{className:"inline-flex px-2 py-1 text-xs font-semibold rounded-full ".concat(e.color," text-white"),children:e.cases>=300?"Sangat Tinggi":e.cases>=150?"Tinggi":e.cases>=50?"Sedang":e.cases>=20?"Rendah":"Sangat Rendah"})}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:["up"===e.trend&&(0,a.jsxs)("span",{className:"inline-flex items-center text-red-600 text-sm",children:[(0,a.jsx)("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),"Naik"]}),"down"===e.trend&&(0,a.jsxs)("span",{className:"inline-flex items-center text-green-600 text-sm",children:[(0,a.jsx)("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Turun"]}),"stable"===e.trend&&(0,a.jsxs)("span",{className:"inline-flex items-center text-gray-600 text-sm",children:[(0,a.jsx)("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z",clipRule:"evenodd"})}),"Stabil"]})]})]},e.province))})]})})]})]})}},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,r;s.d(t,{x7:function(){return ep},ZP:function(){return eu}});var i,l=s(2265);let n={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,p=(e,t)=>{let s="",a="",r="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":a+="f"==i[1]?p(l,i):i+"{"+p(l,"k"==i[1]?"":t)+"}":"object"==typeof l?a+=p(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=p.p?p.p(i,l):i+":"+l+";")}return s+(t&&r?t+"{"+r+"}":r)+a},u={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},g=(e,t,s,a,r)=>{var i;let l=x(e),n=u[l]||(u[l]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(l));if(!u[n]){let t=l!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);u[n]=p(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let o=s&&u.g?u.g:null;return s&&(u.g=u[n]),i=u[n],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),n},h=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return g(s.unshift?s.raw?h(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let b,v,y,j=f.bind({k:1});function w(e,t){let s=this||{};return function(){let a=arguments;function r(i,l){let n=Object.assign({},i),o=n.className||r.className;s.p=Object.assign({theme:v&&v()},n),s.o=/ *go\d+/.test(o),n.className=f.apply(s,a)+(o?" "+o:""),t&&(n.ref=l);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),b(d,n)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},S="default",P=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return P(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},T=[],L={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},I=(e,t=S)=>{$[t]=P($[t]||L,e),T.forEach(([e,s])=>{e===t&&s($[t])})},R=e=>Object.keys($).forEach(t=>I(e,t)),A=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),D=(e=S)=>t=>{I(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={},t=S)=>{let[s,a]=(0,l.useState)($[t]||L),r=(0,l.useRef)($[t]);(0,l.useEffect)(()=>(r.current!==$[t]&&a($[t]),T.push([t,a]),()=>{let e=T.findIndex(([e])=>e===t);e>-1&&T.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:i}},K=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||E()}),B=e=>(t,s)=>{let a=K(t,e,s);return D(a.toasterId||A(a.id))({type:2,toast:a}),a.id},_=(e,t)=>B("blank")(e,t);_.error=B("error"),_.success=B("success"),_.loading=B("loading"),_.custom=B("custom"),_.dismiss=(e,t)=>{let s={type:3,toastId:e};t?D(t)(s):R(s)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let s={type:4,toastId:e};t?D(t)(s):R(s)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,s)=>{let a=_.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?_.success(r,{id:a,...s,...null==s?void 0:s.success}):_.dismiss(a),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?_.error(r,{id:a,...s,...null==s?void 0:s.error}):_.dismiss(a)}),e};var M=1e3,V=(e,t="default")=>{let{toasts:s,pausedAt:a}=z(e,t),r=(0,l.useRef)(new Map).current,i=(0,l.useCallback)((e,t=M)=>{if(r.has(e))return;let s=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,s)},[]);(0,l.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&_.dismiss(s.id);return}return setTimeout(()=>_.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,l.useCallback)(D(t),[t]),o=(0,l.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,l.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,l.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),m=(0,l.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},l=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,l.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:m}}},H=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,J=j`
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
}`,U=w("div")`
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
    animation: ${J} 0.15s ease-out forwards;
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
`,Z=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,G=j`
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
`,Q=w("div")`
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
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===s?null:l.createElement(X,null,l.createElement(q,{...a}),"loading"!==s&&l.createElement(Q,null,"error"===s?l.createElement(U,{...a}):l.createElement(Y,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=w("div")`
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
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),er(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=l.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(es,{toast:e}),n=l.createElement(el,{...e.ariaProps},k(e.message,e));return l.createElement(ei,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:n}):l.createElement(l.Fragment,null,i,n))});i=l.createElement,p.p=void 0,b=i,v=void 0,y=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let i=l.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:i,className:t,style:s},r)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,toasterId:i,containerStyle:n,containerClassName:o})=>{let{toasts:d,handlers:c}=V(s,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let i=s.position||t,n=ec(i,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return l.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?em:"",style:n},"custom"===s.type?k(s.message,s):r?r(s):l.createElement(eo,{toast:s,position:i}))}))},eu=_}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=535)}),_N_E=e.O()}]);