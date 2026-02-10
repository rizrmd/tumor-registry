(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1413],{4867:function(e,t,a){Promise.resolve().then(a.bind(a,1341))},1341:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return l}});var r=a(7437),s=a(2265),i=a(6986),n=a(4894);function l(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),[l,o]=(0,s.useState)([]),[d,c]=(0,s.useState)([]),[u,p]=(0,s.useState)(!0),[m,g]=(0,s.useState)(""),[x,h]=(0,s.useState)("all"),[f,y]=(0,s.useState)("all"),[b,v]=(0,s.useState)(""),[j,w]=(0,s.useState)(""),[N,k]=(0,s.useState)(1);(0,s.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&S()},[t,a]),(0,s.useEffect)(()=>{A()},[l,m,x,f,b,j]);let S=async()=>{try{p(!0);let e=[{id:"RPT-2025-001",name:"Laporan Insidensi Kanker Q4 2025",type:"Epidemiologi",generatedAt:"2025-11-22 14:30",generatedBy:"Dr. Siti Nurhaliza",fileSize:"2.4 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-002",name:"Kualitas Data November 2025",type:"Kualitas",generatedAt:"2025-11-21 09:15",generatedBy:"Dr. Budi Santoso",fileSize:"1.8 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-003",name:"Performa Pusat - Bulanan",type:"Administrasi",generatedAt:"2025-11-20 16:45",generatedBy:"Admin RSCM",fileSize:"-",status:"processing"},{id:"RPT-2025-004",name:"Hasil Pengobatan 2025",type:"Klinis",generatedAt:"2025-11-19 11:20",generatedBy:"Dr. Ahmad Wijaya",fileSize:"3.1 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-005",name:"Demografis Pasien Jawa Barat",type:"Epidemiologi",generatedAt:"2025-11-18 08:00",generatedBy:"Dr. Rina Kartika",fileSize:"1.2 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-006",name:"Analisis Survival Rate 2020-2025",type:"Klinis",generatedAt:"2025-11-17 15:30",generatedBy:"Dr. Hendra Gunawan",fileSize:"4.2 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-007",name:"Laporan Tahunan 2024",type:"Administrasi",generatedAt:"2025-11-16 10:00",generatedBy:"Admin Dharmais",fileSize:"8.5 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-008",name:"Pola Pengobatan Kanker Payudara",type:"Klinis",generatedAt:"2025-11-15 13:45",generatedBy:"Dr. Dewi Lestari",fileSize:"-",status:"failed"},{id:"RPT-2025-009",name:"Distribusi Geografis Kasus Oktober",type:"Epidemiologi",generatedAt:"2025-11-14 09:30",generatedBy:"Dr. Eko Prasetyo",fileSize:"2.1 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-010",name:"Evaluasi Screening Program 2025",type:"Kualitas",generatedAt:"2025-11-13 14:15",generatedBy:"Dr. Lina Marlina",fileSize:"1.5 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-011",name:"Laporan Kanker Serviks Nasional",type:"Epidemiologi",generatedAt:"2025-10-28 11:00",generatedBy:"Dr. Siti Nurhaliza",fileSize:"3.8 MB",status:"expired"},{id:"RPT-2025-012",name:"Statistik Kemoterapi Q3 2025",type:"Klinis",generatedAt:"2025-10-15 16:20",generatedBy:"Dr. Ahmad Wijaya",fileSize:"2.7 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-013",name:"Audit Kelengkapan Data September",type:"Kualitas",generatedAt:"2025-10-01 08:45",generatedBy:"Admin RSCM",fileSize:"1.1 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-014",name:"Perbandingan Treatment Outcomes",type:"Klinis",generatedAt:"2025-09-20 13:30",generatedBy:"Dr. Budi Santoso",fileSize:"5.2 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-015",name:"Laporan Insiden Kanker Anak 2025",type:"Epidemiologi",generatedAt:"2025-09-10 10:15",generatedBy:"Dr. Rina Kartika",fileSize:"2.9 MB",status:"expired"}];o(e),c(e)}catch(e){console.error("Error fetching reports:",e)}finally{p(!1)}},A=()=>{let e=[...l];m&&(e=e.filter(e=>e.name.toLowerCase().includes(m.toLowerCase())||e.id.toLowerCase().includes(m.toLowerCase()))),"all"!==x&&(e=e.filter(e=>e.type===x)),"all"!==f&&(e=e.filter(e=>e.status===f)),b&&(e=e.filter(e=>new Date(e.generatedAt)>=new Date(b))),j&&(e=e.filter(e=>new Date(e.generatedAt)<=new Date(j+" 23:59:59"))),c(e),k(1)},D=e=>{switch(e){case"completed":return"text-green-700 bg-green-100 border-green-200";case"processing":return"text-yellow-700 bg-yellow-100 border-yellow-200";case"failed":return"text-red-700 bg-red-100 border-red-200";default:return"text-gray-700 bg-gray-100 border-gray-200"}},C=e=>{switch(e){case"completed":return"Selesai";case"processing":return"Diproses";case"failed":return"Gagal";case"expired":return"Kadaluarsa";default:return e}},E=e=>{alert("Mengunduh: ".concat(e.name,"\nUkuran: ").concat(e.fileSize))},B=e=>{alert("Menampilkan pratinjau: ".concat(e.name))},P=e=>{alert("Mencoba ulang generate laporan: ".concat(e.name))},M=Math.ceil(d.length/10),z=(N-1)*10,L=d.slice(z,z+10);return a||u?(0,r.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,r.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,r.jsxs)(n.A,{children:[(0,r.jsxs)("div",{className:"mb-6",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Riwayat Laporan"}),(0,r.jsx)("p",{className:"text-gray-600",children:"Lihat dan kelola riwayat laporan yang telah dibuat"})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:[(0,r.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Filter & Pencarian"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4",children:[(0,r.jsxs)("div",{className:"lg:col-span-2",children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Cari Laporan"}),(0,r.jsx)("input",{type:"text",value:m,onChange:e=>g(e.target.value),placeholder:"Nama laporan atau ID...",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Tipe Laporan"}),(0,r.jsxs)("select",{value:x,onChange:e=>h(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[(0,r.jsx)("option",{value:"all",children:"Semua Tipe"}),(0,r.jsx)("option",{value:"Epidemiologi",children:"Epidemiologi"}),(0,r.jsx)("option",{value:"Klinis",children:"Klinis"}),(0,r.jsx)("option",{value:"Administrasi",children:"Administrasi"}),(0,r.jsx)("option",{value:"Kualitas",children:"Kualitas"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Status"}),(0,r.jsxs)("select",{value:f,onChange:e=>y(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[(0,r.jsx)("option",{value:"all",children:"Semua Status"}),(0,r.jsx)("option",{value:"completed",children:"Selesai"}),(0,r.jsx)("option",{value:"processing",children:"Diproses"}),(0,r.jsx)("option",{value:"failed",children:"Gagal"}),(0,r.jsx)("option",{value:"expired",children:"Kadaluarsa"})]})]}),(0,r.jsx)("div",{className:"flex items-end",children:(0,r.jsx)("button",{onClick:()=>{g(""),h("all"),y("all"),v(""),w("")},className:"w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",children:"Reset Filter"})})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Dari Tanggal"}),(0,r.jsx)("input",{type:"date",value:b,onChange:e=>v(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Sampai Tanggal"}),(0,r.jsx)("input",{type:"date",value:j,onChange:e=>w(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"})]})]})]}),(0,r.jsx)("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4 mb-6",children:(0,r.jsxs)("p",{className:"text-sm text-green-800",children:["Menampilkan ",(0,r.jsx)("strong",{children:L.length})," dari ",(0,r.jsx)("strong",{children:d.length})," laporan",(m||"all"!==x||"all"!==f||b||j)&&" (terfilter)"]})}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,r.jsx)("thead",{className:"bg-gray-50",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"ID / Nama Laporan"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tipe"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dibuat"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dibuat Oleh"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Ukuran"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,r.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:0===L.length?(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:7,className:"px-6 py-12 text-center",children:(0,r.jsxs)("div",{className:"text-gray-500",children:[(0,r.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),(0,r.jsx)("p",{className:"mt-2",children:"Tidak ada laporan ditemukan"})]})})}):L.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,r.jsx)("td",{className:"px-6 py-4",children:(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.name}),(0,r.jsx)("div",{className:"text-xs text-gray-500",children:e.id})]})}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded",children:e.type})}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsx)("div",{className:"text-sm text-gray-900",children:e.generatedAt})}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsx)("div",{className:"text-sm text-gray-900",children:e.generatedBy})}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsx)("div",{className:"text-sm text-gray-900",children:e.fileSize})}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsx)("span",{className:"px-2 py-1 text-xs font-medium rounded border ".concat(D(e.status)),children:C(e.status)})}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,r.jsxs)("div",{className:"flex space-x-2",children:["completed"===e.status&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{onClick:()=>B(e),className:"text-blue-600 hover:text-blue-900 font-medium",title:"Lihat",children:(0,r.jsxs)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]})}),(0,r.jsx)("button",{onClick:()=>E(e),className:"text-green-600 hover:text-green-900 font-medium",title:"Download",children:(0,r.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})})]}),"processing"===e.status&&(0,r.jsx)("span",{className:"text-yellow-600 text-xs",children:"Sedang diproses..."}),"failed"===e.status&&(0,r.jsx)("button",{onClick:()=>P(e),className:"text-red-600 hover:text-red-900 font-medium text-xs",children:"Coba Lagi"}),"expired"===e.status&&(0,r.jsx)("span",{className:"text-gray-500 text-xs",children:"Tidak tersedia"})]})})]},e.id))})]})}),M>1&&(0,r.jsx)("div",{className:"bg-white px-4 py-3 border-t border-gray-200 sm:px-6",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"text-sm text-gray-700",children:["Halaman ",(0,r.jsx)("strong",{children:N})," dari ",(0,r.jsx)("strong",{children:M})]}),(0,r.jsxs)("div",{className:"flex space-x-2",children:[(0,r.jsx)("button",{onClick:()=>k(e=>Math.max(1,e-1)),disabled:1===N,className:"px-4 py-2 border rounded-lg ".concat(1===N?"bg-gray-100 text-gray-400 cursor-not-allowed":"bg-white text-gray-700 hover:bg-gray-50"),children:"Sebelumnya"}),(0,r.jsx)("button",{onClick:()=>k(e=>Math.min(M,e+1)),disabled:N===M,className:"px-4 py-2 border rounded-lg ".concat(N===M?"bg-gray-100 text-gray-400 cursor-not-allowed":"bg-white text-gray-700 hover:bg-gray-50"),children:"Selanjutnya"})]})]})})]})]}):(0,r.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,r.jsx)("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let r,s;a.d(t,{x7:function(){return ep},ZP:function(){return em}});var i,n=a(2265);let l={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let a="",r="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":r+="f"==i[1]?p(n,i):i+"{"+p(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=p(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=p.p?p.p(i,n):i+":"+n+";")}return a+(t&&s?t+"{"+s+"}":s)+r},m={},g=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+g(e[a]);return t}return e},x=(e,t,a,r,s)=>{var i;let n=g(e),l=m[n]||(m[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!m[l]){let t=n!==e?e:(e=>{let t,a,r=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?r.shift():t[3]?(a=t[3].replace(u," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);m[l]=p(s?{["@keyframes "+l]:t}:t,a?"":"."+l)}let o=a&&m.g?m.g:null;return a&&(m.g=m[l]),i=m[l],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),l},h=(e,t,a)=>e.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return x(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function w(e,t){let a=this||{};return function(){let r=arguments;function s(i,n){let l=Object.assign({},i),o=l.className||s.className;a.p=Object.assign({theme:b&&b()},l),a.o=/ *go\d+/.test(o),l.className=f.apply(a,r)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),v&&d[0]&&v(l),y(d,l)}return t?t(s):s}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,S=(r=0,()=>(++r).toString()),A=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},D="default",C=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return C(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],B={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},M=(e,t=D)=>{P[t]=C(P[t]||B,e),E.forEach(([e,a])=>{e===t&&a(P[t])})},z=e=>Object.keys(P).forEach(t=>M(e,t)),L=e=>Object.keys(P).find(t=>P[t].toasts.some(t=>t.id===e)),T=(e=D)=>t=>{M(t,e)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},K=(e={},t=D)=>{let[a,r]=(0,n.useState)(P[t]||B),s=(0,n.useRef)(P[t]);(0,n.useEffect)(()=>(s.current!==P[t]&&r(P[t]),E.push([t,r]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:i}},O=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||S()}),$=e=>(t,a)=>{let r=O(t,e,a);return T(r.toasterId||L(r.id))({type:2,toast:r}),r.id},I=(e,t)=>$("blank")(e,t);I.error=$("error"),I.success=$("success"),I.loading=$("loading"),I.custom=$("custom"),I.dismiss=(e,t)=>{let a={type:3,toastId:e};t?T(t)(a):z(a)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let a={type:4,toastId:e};t?T(t)(a):z(a)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,a)=>{let r=I.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?I.success(s,{id:r,...a,...null==a?void 0:a.success}):I.dismiss(r),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?I.error(s,{id:r,...a,...null==a?void 0:a.error}):I.dismiss(r)}),e};var U=1e3,_=(e,t="default")=>{let{toasts:a,pausedAt:r}=K(e,t),s=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=U)=>{if(s.has(e))return;let a=setTimeout(()=>{s.delete(e),l({type:4,toastId:e})},t);s.set(e,a)},[]);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&I.dismiss(a.id);return}return setTimeout(()=>I.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let l=(0,n.useCallback)(T(t),[t]),o=(0,n.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,n.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,n.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}},H=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=j`
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

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
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
`,V=j`
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
  animation: ${V} 1s linear infinite;
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
}`,J=w("div")`
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
`,Y=w("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(Q,{...r}),"loading"!==a&&n.createElement(Y,null,"error"===a?n.createElement(G,{...r}):n.createElement(J,{...r})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
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
`,el=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=A()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(a),es(a)];return{animation:t?`${j(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:a,children:r})=>{let s=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),l=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof r?r({icon:i,message:l}):n.createElement(n.Fragment,null,i,l))});i=n.createElement,p.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:r,children:s})=>{let i=n.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return n.createElement("div",{ref:i,className:t,style:a},s)},ec=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:A()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:s,toasterId:i,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=_(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,l=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eu:"",style:l},"custom"===a.type?k(a.message,a):s?s(a):n.createElement(eo,{toast:a,position:i}))}))},em=I}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=4867)}),_N_E=e.O()}]);