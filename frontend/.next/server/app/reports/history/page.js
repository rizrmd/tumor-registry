(()=>{var e={};e.id=1413,e.ids=[1413],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},669:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d});var r=a(482),s=a(9108),i=a(2563),n=a.n(i),o=a(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let d=["",{children:["reports",{children:["history",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,5912)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\reports\\history\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\reports\\history\\page.tsx"],p="/reports/history/page",u={require:a,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/reports/history/page",pathname:"/reports/history",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},1590:(e,t,a)=>{Promise.resolve().then(a.bind(a,4580))},2254:(e,t,a)=>{e.exports=a(4767)},4580:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var r=a(2295),s=a(3729),i=a(3973),n=a(2528);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),[o,l]=(0,s.useState)([]),[d,c]=(0,s.useState)([]),[p,u]=(0,s.useState)(!0),[m,x]=(0,s.useState)(""),[g,h]=(0,s.useState)("all"),[f,y]=(0,s.useState)("all"),[b,v]=(0,s.useState)(""),[j,w]=(0,s.useState)(""),[N,k]=(0,s.useState)(1);(0,s.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&S()},[t,a]),(0,s.useEffect)(()=>{A()},[o,m,g,f,b,j]);let S=async()=>{try{u(!0);let e=[{id:"RPT-2025-001",name:"Laporan Insidensi Kanker Q4 2025",type:"Epidemiologi",generatedAt:"2025-11-22 14:30",generatedBy:"Dr. Siti Nurhaliza",fileSize:"2.4 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-002",name:"Kualitas Data November 2025",type:"Kualitas",generatedAt:"2025-11-21 09:15",generatedBy:"Dr. Budi Santoso",fileSize:"1.8 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-003",name:"Performa Pusat - Bulanan",type:"Administrasi",generatedAt:"2025-11-20 16:45",generatedBy:"Admin RSCM",fileSize:"-",status:"processing"},{id:"RPT-2025-004",name:"Hasil Pengobatan 2025",type:"Klinis",generatedAt:"2025-11-19 11:20",generatedBy:"Dr. Ahmad Wijaya",fileSize:"3.1 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-005",name:"Demografis Pasien Jawa Barat",type:"Epidemiologi",generatedAt:"2025-11-18 08:00",generatedBy:"Dr. Rina Kartika",fileSize:"1.2 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-006",name:"Analisis Survival Rate 2020-2025",type:"Klinis",generatedAt:"2025-11-17 15:30",generatedBy:"Dr. Hendra Gunawan",fileSize:"4.2 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-007",name:"Laporan Tahunan 2024",type:"Administrasi",generatedAt:"2025-11-16 10:00",generatedBy:"Admin Dharmais",fileSize:"8.5 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-008",name:"Pola Pengobatan Kanker Payudara",type:"Klinis",generatedAt:"2025-11-15 13:45",generatedBy:"Dr. Dewi Lestari",fileSize:"-",status:"failed"},{id:"RPT-2025-009",name:"Distribusi Geografis Kasus Oktober",type:"Epidemiologi",generatedAt:"2025-11-14 09:30",generatedBy:"Dr. Eko Prasetyo",fileSize:"2.1 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-010",name:"Evaluasi Screening Program 2025",type:"Kualitas",generatedAt:"2025-11-13 14:15",generatedBy:"Dr. Lina Marlina",fileSize:"1.5 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-011",name:"Laporan Kanker Serviks Nasional",type:"Epidemiologi",generatedAt:"2025-10-28 11:00",generatedBy:"Dr. Siti Nurhaliza",fileSize:"3.8 MB",status:"expired"},{id:"RPT-2025-012",name:"Statistik Kemoterapi Q3 2025",type:"Klinis",generatedAt:"2025-10-15 16:20",generatedBy:"Dr. Ahmad Wijaya",fileSize:"2.7 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-013",name:"Audit Kelengkapan Data September",type:"Kualitas",generatedAt:"2025-10-01 08:45",generatedBy:"Admin RSCM",fileSize:"1.1 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-014",name:"Perbandingan Treatment Outcomes",type:"Klinis",generatedAt:"2025-09-20 13:30",generatedBy:"Dr. Budi Santoso",fileSize:"5.2 MB",status:"completed",downloadUrl:"#"},{id:"RPT-2025-015",name:"Laporan Insiden Kanker Anak 2025",type:"Epidemiologi",generatedAt:"2025-09-10 10:15",generatedBy:"Dr. Rina Kartika",fileSize:"2.9 MB",status:"expired"}];l(e),c(e)}catch(e){console.error("Error fetching reports:",e)}finally{u(!1)}},A=()=>{let e=[...o];m&&(e=e.filter(e=>e.name.toLowerCase().includes(m.toLowerCase())||e.id.toLowerCase().includes(m.toLowerCase()))),"all"!==g&&(e=e.filter(e=>e.type===g)),"all"!==f&&(e=e.filter(e=>e.status===f)),b&&(e=e.filter(e=>new Date(e.generatedAt)>=new Date(b))),j&&(e=e.filter(e=>new Date(e.generatedAt)<=new Date(j+" 23:59:59"))),c(e),k(1)},P=e=>{switch(e){case"completed":return"text-green-700 bg-green-100 border-green-200";case"processing":return"text-yellow-700 bg-yellow-100 border-yellow-200";case"failed":return"text-red-700 bg-red-100 border-red-200";default:return"text-gray-700 bg-gray-100 border-gray-200"}},D=e=>{switch(e){case"completed":return"Selesai";case"processing":return"Diproses";case"failed":return"Gagal";case"expired":return"Kadaluarsa";default:return e}},E=e=>{alert(`Mengunduh: ${e.name}
Ukuran: ${e.fileSize}`)},M=e=>{alert(`Menampilkan pratinjau: ${e.name}`)},C=e=>{alert(`Mencoba ulang generate laporan: ${e.name}`)},B=Math.ceil(d.length/10),T=(N-1)*10,z=d.slice(T,T+10);return a||p?r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,r.jsxs)(n.A,{children:[(0,r.jsxs)("div",{className:"mb-6",children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Riwayat Laporan"}),r.jsx("p",{className:"text-gray-600",children:"Lihat dan kelola riwayat laporan yang telah dibuat"})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Filter & Pencarian"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4",children:[(0,r.jsxs)("div",{className:"lg:col-span-2",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Cari Laporan"}),r.jsx("input",{type:"text",value:m,onChange:e=>x(e.target.value),placeholder:"Nama laporan atau ID...",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Tipe Laporan"}),(0,r.jsxs)("select",{value:g,onChange:e=>h(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[r.jsx("option",{value:"all",children:"Semua Tipe"}),r.jsx("option",{value:"Epidemiologi",children:"Epidemiologi"}),r.jsx("option",{value:"Klinis",children:"Klinis"}),r.jsx("option",{value:"Administrasi",children:"Administrasi"}),r.jsx("option",{value:"Kualitas",children:"Kualitas"})]})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Status"}),(0,r.jsxs)("select",{value:f,onChange:e=>y(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[r.jsx("option",{value:"all",children:"Semua Status"}),r.jsx("option",{value:"completed",children:"Selesai"}),r.jsx("option",{value:"processing",children:"Diproses"}),r.jsx("option",{value:"failed",children:"Gagal"}),r.jsx("option",{value:"expired",children:"Kadaluarsa"})]})]}),r.jsx("div",{className:"flex items-end",children:r.jsx("button",{onClick:()=>{x(""),h("all"),y("all"),v(""),w("")},className:"w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",children:"Reset Filter"})})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Dari Tanggal"}),r.jsx("input",{type:"date",value:b,onChange:e=>v(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Sampai Tanggal"}),r.jsx("input",{type:"date",value:j,onChange:e=>w(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"})]})]})]}),r.jsx("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4 mb-6",children:(0,r.jsxs)("p",{className:"text-sm text-green-800",children:["Menampilkan ",r.jsx("strong",{children:z.length})," dari ",r.jsx("strong",{children:d.length})," laporan",(m||"all"!==g||"all"!==f||b||j)&&" (terfilter)"]})}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[r.jsx("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[r.jsx("thead",{className:"bg-gray-50",children:(0,r.jsxs)("tr",{children:[r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"ID / Nama Laporan"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tipe"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dibuat"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dibuat Oleh"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Ukuran"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),r.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:0===z.length?r.jsx("tr",{children:r.jsx("td",{colSpan:7,className:"px-6 py-12 text-center",children:(0,r.jsxs)("div",{className:"text-gray-500",children:[r.jsx("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),r.jsx("p",{className:"mt-2",children:"Tidak ada laporan ditemukan"})]})})}):z.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[r.jsx("td",{className:"px-6 py-4",children:(0,r.jsxs)("div",{children:[r.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.name}),r.jsx("div",{className:"text-xs text-gray-500",children:e.id})]})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded",children:e.type})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-900",children:e.generatedAt})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-900",children:e.generatedBy})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-900",children:e.fileSize})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("span",{className:`px-2 py-1 text-xs font-medium rounded border ${P(e.status)}`,children:D(e.status)})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,r.jsxs)("div",{className:"flex space-x-2",children:["completed"===e.status&&(0,r.jsxs)(r.Fragment,{children:[r.jsx("button",{onClick:()=>M(e),className:"text-blue-600 hover:text-blue-900 font-medium",title:"Lihat",children:(0,r.jsxs)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]})}),r.jsx("button",{onClick:()=>E(e),className:"text-green-600 hover:text-green-900 font-medium",title:"Download",children:r.jsx("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})})]}),"processing"===e.status&&r.jsx("span",{className:"text-yellow-600 text-xs",children:"Sedang diproses..."}),"failed"===e.status&&r.jsx("button",{onClick:()=>C(e),className:"text-red-600 hover:text-red-900 font-medium text-xs",children:"Coba Lagi"}),"expired"===e.status&&r.jsx("span",{className:"text-gray-500 text-xs",children:"Tidak tersedia"})]})})]},e.id))})]})}),B>1&&r.jsx("div",{className:"bg-white px-4 py-3 border-t border-gray-200 sm:px-6",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"text-sm text-gray-700",children:["Halaman ",r.jsx("strong",{children:N})," dari ",r.jsx("strong",{children:B})]}),(0,r.jsxs)("div",{className:"flex space-x-2",children:[r.jsx("button",{onClick:()=>k(e=>Math.max(1,e-1)),disabled:1===N,className:`px-4 py-2 border rounded-lg ${1===N?"bg-gray-100 text-gray-400 cursor-not-allowed":"bg-white text-gray-700 hover:bg-gray-50"}`,children:"Sebelumnya"}),r.jsx("button",{onClick:()=>k(e=>Math.min(B,e+1)),disabled:N===B,className:`px-4 py-2 border rounded-lg ${N===B?"bg-gray-100 text-gray-400 cursor-not-allowed":"bg-white text-gray-700 hover:bg-gray-50"}`,children:"Selanjutnya"})]})]})})]})]}):r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},5912:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>i,__esModule:()=>s,default:()=>n});let r=(0,a(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\reports\history\page.tsx`),{__esModule:s,$$typeof:i}=r,n=r.default},4669:(e,t,a)=>{"use strict";a.d(t,{x7:()=>ec,ZP:()=>ep});var r,s=a(3729);let i={data:""},n=e=>e||i,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let a="",r="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":r+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(i,n):i+":"+n+";")}return a+(t&&s?t+"{"+s+"}":s)+r},p={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e},m=(e,t,a,r,s)=>{let i=u(e),n=p[i]||(p[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,a,r=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(a=t[3].replace(d," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);p[n]=c(s?{["@keyframes "+n]:t}:t,a?"":"."+n)}let m=a&&p.g?p.g:null;return a&&(p.g=p[n]),((e,t,a,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(p[n],t,r,m),n},x=(e,t,a)=>e.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function g(e){let t=this||{},a=e.call?e(t.p):e;return m(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,n(t.target),t.g,t.o,t.k)}g.bind({g:1});let h,f,y,b=g.bind({k:1});function v(e,t){let a=this||{};return function(){let r=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;a.p=Object.assign({theme:f&&f()},o),a.o=/ *go\d+/.test(l),o.className=g.apply(a,r)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),y&&d[0]&&y(o),h(d,o)}return t?t(s):s}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),S="default",A=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return A(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},P=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},E={},M=(e,t=S)=>{E[t]=A(E[t]||D,e),P.forEach(([e,a])=>{e===t&&a(E[t])})},C=e=>Object.keys(E).forEach(t=>M(e,t)),B=e=>Object.keys(E).find(t=>E[t].toasts.some(t=>t.id===e)),T=(e=S)=>t=>{M(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=(e={},t=S)=>{let[a,r]=(0,s.useState)(E[t]||D),i=(0,s.useRef)(E[t]);(0,s.useEffect)(()=>(i.current!==E[t]&&r(E[t]),P.push([t,r]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:n}},L=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||N()}),$=e=>(t,a)=>{let r=L(t,e,a);return T(r.toasterId||B(r.id))({type:2,toast:r}),r.id},q=(e,t)=>$("blank")(e,t);q.error=$("error"),q.success=$("success"),q.loading=$("loading"),q.custom=$("custom"),q.dismiss=(e,t)=>{let a={type:3,toastId:e};t?T(t)(a):C(a)},q.dismissAll=e=>q.dismiss(void 0,e),q.remove=(e,t)=>{let a={type:4,toastId:e};t?T(t)(a):C(a)},q.removeAll=e=>q.remove(void 0,e),q.promise=(e,t,a)=>{let r=q.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?w(t.success,e):void 0;return s?q.success(s,{id:r,...a,...null==a?void 0:a.success}):q.dismiss(r),e}).catch(e=>{let s=t.error?w(t.error,e):void 0;s?q.error(s,{id:r,...a,...null==a?void 0:a.error}):q.dismiss(r)}),e};var K=1e3,O=(e,t="default")=>{let{toasts:a,pausedAt:r}=R(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=K)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&q.dismiss(a.id);return}return setTimeout(()=>q.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let o=(0,s.useCallback)(T(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),p=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}},I=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,_=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,F=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${_} 0.15s ease-out forwards;
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
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,W=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,V=b`
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
}`,Q=v("div")`
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
    animation: ${V} 0.2s ease-out forwards;
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
`,Z=v("div")`
  position: absolute;
`,J=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Y=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(Y,null,t):t:"blank"===a?null:s.createElement(J,null,s.createElement(H,{...r}),"loading"!==a&&s.createElement(Z,null,"error"===a?s.createElement(F,{...r}):s.createElement(Q,{...r})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=v("div")`
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
`,es=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(a),ea(a)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(ee,{toast:e}),o=s.createElement(es,{...e.ariaProps},w(e.message,e));return s.createElement(er,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});r=s.createElement,c.p=void 0,h=r,f=void 0,y=void 0;var eo=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let n=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:n,className:t,style:a},i)},el=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ed=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=O(a,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let n=a.position||t,o=el(n,c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return s.createElement(eo,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ed:"",style:o},"custom"===a.type?w(a.message,a):i?i(a):s.createElement(en,{toast:a,position:n}))}))},ep=q}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[7141,4192,2528],()=>a(669));module.exports=r})();