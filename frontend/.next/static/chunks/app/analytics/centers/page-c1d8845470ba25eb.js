(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8116],{6778:function(e,t,a){Promise.resolve().then(a.bind(a,7498))},7498:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return n}});var s=a(7437),r=a(2265),l=a(6986),i=a(4894);function n(){let{user:e,isAuthenticated:t,isLoading:a}=(0,l.useAuth)(),[n,o]=(0,r.useState)(!0),[d,c]=(0,r.useState)("all");if((0,r.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&o(!1)},[t,a]),a||n)return(0,s.jsx)(i.A,{children:(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"})})});let m=[{rank:1,name:"RSUPN Dr. Cipto Mangunkusumo",region:"DKI Jakarta",qualityScore:94.5,patientVolume:456,timeliness:96.2,completeness:98.1,overallPerformance:96.2,medal:"gold"},{rank:2,name:"RSUP Dr. Sardjito",region:"DI Yogyakarta",qualityScore:92.8,patientVolume:398,timeliness:94.5,completeness:96.8,overallPerformance:94.7,medal:"silver"},{rank:3,name:"RSUP Dr. Soetomo",region:"Jawa Timur",qualityScore:91.3,patientVolume:512,timeliness:91.8,completeness:95.2,overallPerformance:92.8,medal:"bronze"},{rank:4,name:"RSUP Dr. Hasan Sadikin",region:"Jawa Barat",qualityScore:89.7,patientVolume:423,timeliness:90.4,completeness:94.1,overallPerformance:91.4,medal:null},{rank:5,name:"RSUP Dr. Kariadi",region:"Jawa Tengah",qualityScore:88.9,patientVolume:367,timeliness:89.2,completeness:93.7,overallPerformance:90.6,medal:null},{rank:6,name:"RSUP H. Adam Malik",region:"Sumatera Utara",qualityScore:86.4,patientVolume:289,timeliness:87.8,completeness:91.5,overallPerformance:88.6,medal:null},{rank:7,name:"RSUP Dr. Wahidin Sudirohusodo",region:"Sulawesi Selatan",qualityScore:85.1,patientVolume:245,timeliness:86.3,completeness:90.2,overallPerformance:87.2,medal:null},{rank:8,name:"RSUP Sanglah",region:"Bali",qualityScore:83.7,patientVolume:198,timeliness:84.9,completeness:89.6,overallPerformance:86.1,medal:null},{rank:9,name:"RSUP Dr. M. Djamil",region:"Sumatera Barat",qualityScore:82.3,patientVolume:176,timeliness:83.1,completeness:88.4,overallPerformance:84.6,medal:null},{rank:10,name:"RSUD Dr. Soetomo",region:"Kalimantan Timur",qualityScore:79.8,patientVolume:134,timeliness:81.2,completeness:86.9,overallPerformance:82.6,medal:null}],u=e=>"gold"===e?(0,s.jsx)("div",{className:"flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full",children:(0,s.jsx)("span",{className:"text-xl",children:"\uD83E\uDD47"})}):"silver"===e?(0,s.jsx)("div",{className:"flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full",children:(0,s.jsx)("span",{className:"text-xl",children:"\uD83E\uDD48"})}):"bronze"===e?(0,s.jsx)("div",{className:"flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full",children:(0,s.jsx)("span",{className:"text-xl",children:"\uD83E\uDD49"})}):null,p=e=>e>=90?(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800",children:"Sangat Baik"}):e>=80?(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800",children:"Baik"}):e>=70?(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800",children:"Cukup"}):(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800",children:"Perlu Perbaikan"}),x=m[0],h=m.reduce((e,t)=>e+t.qualityScore,0)/m.length,g=Math.round(m.reduce((e,t)=>e+t.patientVolume,0)/m.length),f=m.reduce((e,t)=>e+t.patientVolume,0);return(0,s.jsxs)(i.A,{children:[(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Perbandingan Performa Pusat Kanker"}),(0,s.jsx)("p",{className:"text-gray-600 mt-2",children:"Benchmarking dan evaluasi kinerja antar pusat kesehatan"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-6",children:[(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Pusat"}),(0,s.jsx)("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:m.length}),(0,s.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"Pusat aktif"})]}),(0,s.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-8 w-8 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})})})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Skor Kualitas Rata-rata"}),(0,s.jsxs)("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:[h.toFixed(1),"%"]}),(0,s.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"Across all centers"})]}),(0,s.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-8 w-8 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Volume Pasien"}),(0,s.jsx)("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:f.toLocaleString()}),(0,s.jsxs)("p",{className:"text-xs text-gray-500 mt-1",children:["Rata-rata ",g," per pusat"]})]}),(0,s.jsx)("div",{className:"p-3 bg-purple-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-8 w-8 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})})]})}),(0,s.jsx)("div",{className:"bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow p-6 text-white",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium opacity-90",children:"Pusat Terbaik"}),(0,s.jsx)("p",{className:"text-lg font-bold mt-1 line-clamp-1",children:x.name}),(0,s.jsxs)("p",{className:"text-xs opacity-90 mt-1",children:["Skor ",x.overallPerformance,"%"]})]}),(0,s.jsx)("div",{className:"text-4xl",children:"\uD83E\uDD47"})]})})]}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,s.jsxs)("div",{className:"flex flex-col md:flex-row gap-4 items-end",children:[(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Filter Wilayah"}),(0,s.jsx)("select",{value:d,onChange:e=>c(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[{value:"all",label:"Semua Wilayah"},{value:"jawa",label:"Jawa"},{value:"sumatera",label:"Sumatera"},{value:"kalimantan",label:"Kalimantan"},{value:"sulawesi",label:"Sulawesi"},{value:"bali-nusa",label:"Bali & Nusa Tenggara"}].map(e=>(0,s.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Periode Evaluasi"}),(0,s.jsxs)("select",{className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[(0,s.jsx)("option",{children:"Q3 2024 (Jul-Sep)"}),(0,s.jsx)("option",{children:"Q2 2024 (Apr-Jun)"}),(0,s.jsx)("option",{children:"Q1 2024 (Jan-Mar)"}),(0,s.jsx)("option",{children:"Tahun 2024"}),(0,s.jsx)("option",{children:"Tahun 2023"})]})]}),(0,s.jsxs)("button",{className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2",children:[(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Download Laporan"]})]})}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,s.jsxs)("div",{className:"px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold text-gray-900",children:"Tabel Perbandingan Performa"}),(0,s.jsx)("p",{className:"text-sm text-gray-600 mt-1",children:"Benchmarking komprehensif seluruh pusat kanker"})]}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Peringkat"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nama Pusat"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Wilayah"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Skor Kualitas"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Volume Pasien"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Ketepatan Waktu"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Kelengkapan Data"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Performa Overall"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:m.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[u(e.medal),(0,s.jsxs)("span",{className:"text-sm font-bold text-gray-900",children:["#",e.rank]})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-600",children:e.region})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("div",{className:"w-16 bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"bg-blue-600 h-2 rounded-full",style:{width:"".concat(e.qualityScore,"%")}})}),(0,s.jsxs)("span",{className:"text-sm font-semibold text-gray-900",children:[e.qualityScore,"%"]})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"text-sm font-semibold text-gray-900",children:e.patientVolume.toLocaleString()})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("div",{className:"w-16 bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"bg-green-600 h-2 rounded-full",style:{width:"".concat(e.timeliness,"%")}})}),(0,s.jsxs)("span",{className:"text-sm font-semibold text-gray-900",children:[e.timeliness,"%"]})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("div",{className:"w-16 bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"bg-purple-600 h-2 rounded-full",style:{width:"".concat(e.completeness,"%")}})}),(0,s.jsxs)("span",{className:"text-sm font-semibold text-gray-900",children:[e.completeness,"%"]})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,s.jsxs)("span",{className:"text-sm font-bold text-gray-900",children:[e.overallPerformance,"%"]}),p(e.overallPerformance)]})})]},e.rank))})]})})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mt-6",children:[(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3 mb-3",children:[(0,s.jsx)("div",{className:"p-2 bg-blue-100 rounded-lg",children:(0,s.jsx)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsx)("h3",{className:"font-semibold text-gray-900",children:"Skor Kualitas"})]}),(0,s.jsx)("p",{className:"text-xs text-gray-600",children:"Evaluasi kualitas data, akurasi diagnosis, dan kepatuhan terhadap standar pelayanan"})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3 mb-3",children:[(0,s.jsx)("div",{className:"p-2 bg-purple-100 rounded-lg",children:(0,s.jsx)("svg",{className:"w-5 h-5 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,s.jsx)("h3",{className:"font-semibold text-gray-900",children:"Volume Pasien"})]}),(0,s.jsx)("p",{className:"text-xs text-gray-600",children:"Jumlah total pasien yang ditangani dalam periode evaluasi"})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3 mb-3",children:[(0,s.jsx)("div",{className:"p-2 bg-green-100 rounded-lg",children:(0,s.jsx)("svg",{className:"w-5 h-5 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsx)("h3",{className:"font-semibold text-gray-900",children:"Ketepatan Waktu"})]}),(0,s.jsx)("p",{className:"text-xs text-gray-600",children:"Persentase pelaporan data tepat waktu sesuai standar registry nasional"})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3 mb-3",children:[(0,s.jsx)("div",{className:"p-2 bg-yellow-100 rounded-lg",children:(0,s.jsx)("svg",{className:"w-5 h-5 text-yellow-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,s.jsx)("h3",{className:"font-semibold text-gray-900",children:"Kelengkapan Data"})]}),(0,s.jsx)("p",{className:"text-xs text-gray-600",children:"Tingkat kelengkapan field data wajib pada setiap entri pasien"})]})]})]})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return eu},ZP:function(){return ep}});var l,i=a(2265);let n={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let a="",s="",r="";for(let l in e){let i=e[l];"@"==l[0]?"i"==l[1]?a=l+" "+i+";":s+="f"==l[1]?u(i,l):l+"{"+u(i,"k"==l[1]?"":t)+"}":"object"==typeof i?s+=u(i,t?t.replace(/([^,])+/g,e=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):l):null!=i&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=u.p?u.p(l,i):l+":"+i+";")}return a+(t&&r?t+"{"+r+"}":r)+s},p={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},h=(e,t,a,s,r)=>{var l;let i=x(e),n=p[i]||(p[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(m," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);p[n]=u(r?{["@keyframes "+n]:t}:t,a?"":"."+n)}let o=a&&p.g?p.g:null;return a&&(p.g=p[n]),l=p[n],o?t.data=t.data.replace(o,l):-1===t.data.indexOf(l)&&(t.data=s?l+t.data:t.data+l),n},g=(e,t,a)=>e.reduce((e,s,r)=>{let l=t[r];if(l&&l.call){let e=l(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;l=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+s+(null==l?"":l)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function w(e,t){let a=this||{};return function(){let s=arguments;function r(l,i){let n=Object.assign({},l),o=n.className||r.className;a.p=Object.assign({theme:b&&b()},n),a.o=/ *go\d+/.test(o),n.className=f.apply(a,s)+(o?" "+o:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),y(d,n)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,S=(s=0,()=>(++s).toString()),P=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},D="default",E=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return E(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let l=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+l}))}}},M=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},L={},z=(e,t=D)=>{L[t]=E(L[t]||C,e),M.forEach(([e,a])=>{e===t&&a(L[t])})},V=e=>Object.keys(L).forEach(t=>z(e,t)),$=e=>Object.keys(L).find(t=>L[t].toasts.some(t=>t.id===e)),A=(e=D)=>t=>{z(t,e)},B={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={},t=D)=>{let[a,s]=(0,i.useState)(L[t]||C),r=(0,i.useRef)(L[t]);(0,i.useEffect)(()=>(r.current!==L[t]&&s(L[t]),M.push([t,s]),()=>{let e=M.findIndex(([e])=>e===t);e>-1&&M.splice(e,1)}),[t]);let l=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||B[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:l}},T=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||S()}),H=e=>(t,a)=>{let s=T(t,e,a);return A(s.toasterId||$(s.id))({type:2,toast:s}),s.id},R=(e,t)=>H("blank")(e,t);R.error=H("error"),R.success=H("success"),R.loading=H("loading"),R.custom=H("custom"),R.dismiss=(e,t)=>{let a={type:3,toastId:e};t?A(t)(a):V(a)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let a={type:4,toastId:e};t?A(t)(a):V(a)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,a)=>{let s=R.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?R.success(r,{id:s,...a,...null==a?void 0:a.success}):R.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?R.error(r,{id:s,...a,...null==a?void 0:a.error}):R.dismiss(s)}),e};var q=1e3,W=(e,t="default")=>{let{toasts:a,pausedAt:s}=O(e,t),r=(0,i.useRef)(new Map).current,l=(0,i.useCallback)((e,t=q)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,a)},[]);(0,i.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&R.dismiss(a.id);return}return setTimeout(()=>R.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let n=(0,i.useCallback)(A(t),[t]),o=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,i.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),m=(0,i.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:l}=t||{},i=a.filter(t=>(t.position||l)===(e.position||l)&&t.height),n=i.findIndex(t=>t.id===e.id),o=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,i.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,l]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:m}}},I=j`
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
}`,_=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,K=w("div")`
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
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,J=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${J} 1s linear infinite;
`,Q=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Y=j`
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
}`,Z=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Y} 0.2s ease-out forwards;
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
`,G=w("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?i.createElement(et,null,t):t:"blank"===a?null:i.createElement(X,null,i.createElement(F,{...s}),"loading"!==a&&i.createElement(G,null,"error"===a?i.createElement(K,{...s}):i.createElement(Z,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,el=w("div")`
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
`,ei=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=P()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=i.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},l=i.createElement(ea,{toast:e}),n=i.createElement(ei,{...e.ariaProps},k(e.message,e));return i.createElement(el,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:l,message:n}):i.createElement(i.Fragment,null,l,n))});l=i.createElement,u.p=void 0,y=l,b=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let l=i.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return i.createElement("div",{ref:l,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:l,containerStyle:n,containerClassName:o})=>{let{toasts:d,handlers:c}=W(a,l);return i.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let l=a.position||t,n=ec(l,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return i.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?em:"",style:n},"custom"===a.type?k(a.message,a):r?r(a):i.createElement(eo,{toast:a,position:l}))}))},ep=R}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=6778)}),_N_E=e.O()}]);