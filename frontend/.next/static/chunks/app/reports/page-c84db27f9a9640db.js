(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[882],{223:function(e,t,a){Promise.resolve().then(a.bind(a,9256))},9256:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var s=a(7437),r=a(2265),i=a(6986),n=a(4894);function o(){var e;let{user:t,isAuthenticated:a,isLoading:o}=(0,i.useAuth)(),[l,d]=(0,r.useState)({totalReports:0,thisMonth:0,pending:0,templates:0}),[c,m]=(0,r.useState)(""),[p,u]=(0,r.useState)([]),[x,h]=(0,r.useState)(!0),g=[{id:"cancer-incidence",name:"Laporan Insidensi Kanker",description:"Statistik insidensi kanker per jenis, usia, dan wilayah",category:"Epidemiologi",icon:"chart"},{id:"treatment-outcomes",name:"Laporan Hasil Pengobatan",description:"Analisis outcome pengobatan dan survival rate",category:"Klinis",icon:"medical"},{id:"center-performance",name:"Laporan Performa Pusat",description:"Evaluasi kinerja pusat kanker dan registrar",category:"Administrasi",icon:"building"},{id:"data-quality",name:"Laporan Kualitas Data",description:"Kelengkapan, akurasi, dan konsistensi data",category:"Kualitas",icon:"check"},{id:"demographics",name:"Laporan Demografis",description:"Distribusi pasien berdasarkan demografi",category:"Epidemiologi",icon:"users"},{id:"custom",name:"Laporan Custom",description:"Buat laporan sesuai kebutuhan spesifik",category:"Custom",icon:"settings"}];(0,r.useEffect)(()=>{if(!o&&!a){window.location.href="/login";return}a&&f()},[a,o]);let f=async()=>{try{h(!0),d({totalReports:148,thisMonth:23,pending:2,templates:g.length}),u([{id:"1",name:"Insidensi Kanker Q4 2025",type:"Epidemiologi",generatedAt:"2025-11-22 14:30",status:"completed",size:"2.4 MB"},{id:"2",name:"Kualitas Data November",type:"Kualitas",generatedAt:"2025-11-21 09:15",status:"completed",size:"1.8 MB"},{id:"3",name:"Performa Pusat - Bulanan",type:"Administrasi",generatedAt:"2025-11-20 16:45",status:"processing",size:"-"},{id:"4",name:"Hasil Pengobatan 2025",type:"Klinis",generatedAt:"2025-11-19 11:20",status:"completed",size:"3.1 MB"},{id:"5",name:"Demografis Pasien",type:"Epidemiologi",generatedAt:"2025-11-18 08:00",status:"completed",size:"1.2 MB"}])}catch(e){console.error("Error fetching reports data:",e)}finally{h(!1)}},y=e=>{switch(e){case"completed":return"text-green-600 bg-green-100";case"processing":return"text-yellow-600 bg-yellow-100";case"failed":return"text-red-600 bg-red-100";default:return"text-gray-600 bg-gray-100"}},b=e=>{switch(e){case"completed":return"Selesai";case"processing":return"Proses";case"failed":return"Gagal";default:return e}};return o||x?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):a?(0,s.jsxs)(n.A,{children:[(0,s.jsxs)("div",{className:"mb-6",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Laporan"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Buat, kelola, dan ekspor laporan statistik kanker"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Laporan"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:l.totalReports})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Bulan Ini"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:l.thisMonth})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-yellow-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-yellow-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Dalam Proses"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:l.pending})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-purple-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Template"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:l.templates})]})]})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Generator Laporan"}),(0,s.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6",children:g.map(e=>(0,s.jsx)("div",{onClick:()=>m(e.id),className:"p-4 border-2 rounded-lg cursor-pointer transition-all ".concat(c===e.id?"border-green-500 bg-green-50":"border-gray-200 hover:border-green-300"),children:(0,s.jsxs)("div",{className:"flex items-start space-x-3",children:[(0,s.jsx)("div",{className:"p-2 rounded-lg ".concat(c===e.id?"bg-green-200":"bg-gray-100"),children:(0,s.jsx)("svg",{className:"h-5 w-5 text-gray-700",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})})}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("h3",{className:"font-medium text-gray-900 text-sm",children:e.name}),(0,s.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:e.description}),(0,s.jsx)("span",{className:"inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded",children:e.category})]})]})},e.id))}),(0,s.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t",children:[(0,s.jsx)("div",{className:"text-sm text-gray-600",children:c?(0,s.jsxs)("span",{children:["Template dipilih: ",(0,s.jsx)("strong",{children:null===(e=g.find(e=>e.id===c))||void 0===e?void 0:e.name})]}):(0,s.jsx)("span",{children:"Pilih template laporan untuk memulai"})}),(0,s.jsx)("button",{onClick:()=>{if(!c){alert("Silakan pilih template laporan terlebih dahulu");return}alert("Generating report: ".concat(c,"\nFitur ini akan segera diimplementasikan."))},disabled:!c,className:"px-6 py-2 rounded-lg font-medium transition-colors ".concat(c?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"),children:"Generate Laporan"})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900",children:"Laporan Terbaru"}),(0,s.jsx)("button",{className:"text-sm text-green-600 hover:text-green-700 font-medium",children:"Lihat Semua"})]}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nama Laporan"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tipe"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dibuat"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Ukuran"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:p.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500",children:e.type})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500",children:e.generatedAt})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-medium rounded-full ".concat(y(e.status)),children:b(e.status)})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500",children:e.size})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:"completed"===e.status&&(0,s.jsx)("button",{className:"text-green-600 hover:text-green-900 font-medium",children:"Download"})})]},e.id))})]})})]})]}):(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return ep},ZP:function(){return eu}});var i,n=a(2265);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,p=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?p(n,i):i+"{"+p(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=p(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=p.p?p.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},u={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},h=(e,t,a,s,r)=>{var i;let n=x(e),o=u[n]||(u[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!u[o]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(m," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);u[o]=p(r?{["@keyframes "+o]:t}:t,a?"":"."+o)}let l=a&&u.g?u.g:null;return a&&(u.g=u[o]),i=u[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),o},g=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function w(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let o=Object.assign({},i),l=o.className||r.className;a.p=Object.assign({theme:b&&b()},o),a.o=/ *go\d+/.test(l),o.className=f.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),y(d,o)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(s=0,()=>(++s).toString()),L=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},C="default",z=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return z(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},M={},P=(e,t=C)=>{M[t]=z(M[t]||D,e),A.forEach(([e,a])=>{e===t&&a(M[t])})},$=e=>Object.keys(M).forEach(t=>P(e,t)),O=e=>Object.keys(M).find(t=>M[t].toasts.some(t=>t.id===e)),B=(e=C)=>t=>{P(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={},t=C)=>{let[a,s]=(0,n.useState)(M[t]||D),r=(0,n.useRef)(M[t]);(0,n.useEffect)(()=>(r.current!==M[t]&&s(M[t]),A.push([t,s]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},_=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),H=e=>(t,a)=>{let s=_(t,e,a);return B(s.toasterId||O(s.id))({type:2,toast:s}),s.id},T=(e,t)=>H("blank")(e,t);T.error=H("error"),T.success=H("success"),T.loading=H("loading"),T.custom=H("custom"),T.dismiss=(e,t)=>{let a={type:3,toastId:e};t?B(t)(a):$(a)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let a={type:4,toastId:e};t?B(t)(a):$(a)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,a)=>{let s=T.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?T.success(r,{id:s,...a,...null==a?void 0:a.success}):T.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?T.error(r,{id:s,...a,...null==a?void 0:a.error}):T.dismiss(s)}),e};var K=1e3,R=(e,t="default")=>{let{toasts:a,pausedAt:s}=S(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=K)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),o({type:4,toastId:e})},t);r.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&T.dismiss(a.id);return}return setTimeout(()=>T.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let o=(0,n.useCallback)(B(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,n.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),m=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}},F=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,V=j`
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
}`,G=w("div")`
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
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=j`
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
  animation: ${U} 1s linear infinite;
`,Z=j`
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
}`,Y=w("div")`
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
`,J=w("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(q,{...s}),"loading"!==a&&n.createElement(J,null,"error"===a?n.createElement(G,{...s}):n.createElement(Y,{...s})))},es=e=>`
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
`,en=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=L()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),o=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,p.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:L()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=R(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,o=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?em:"",style:o},"custom"===a.type?k(a.message,a):r?r(a):n.createElement(el,{toast:a,position:i}))}))},eu=T}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=223)}),_N_E=e.O()}]);