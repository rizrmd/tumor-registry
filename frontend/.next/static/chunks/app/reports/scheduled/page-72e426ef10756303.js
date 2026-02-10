(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[616],{5468:function(e,t,a){Promise.resolve().then(a.bind(a,4125))},4125:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return l}});var s=a(7437),r=a(2265),i=a(6986),n=a(4894);function l(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),[l,o]=(0,r.useState)([]),[d,c]=(0,r.useState)(!0),[u,m]=(0,r.useState)(!1),[p,x]=(0,r.useState)(null),[h,g]=(0,r.useState)({name:"",reportType:"",schedule:"weekly",recipients:"",status:"active"});(0,r.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&f()},[t,a]);let f=async()=>{try{c(!0),o([{id:"SCH-001",name:"Laporan Insidensi Mingguan",schedule:"weekly",nextRun:"2025-11-29 08:00",recipients:["dr.siti@rscm.co.id","admin@kemenkes.go.id"],status:"active",lastRun:"2025-11-22 08:00",reportType:"Epidemiologi"},{id:"SCH-002",name:"Kualitas Data Bulanan",schedule:"monthly",nextRun:"2025-12-01 09:00",recipients:["dr.budi@dharmais.co.id","quality@inamsos.id"],status:"active",lastRun:"2025-11-01 09:00",reportType:"Kualitas"},{id:"SCH-003",name:"Dashboard Eksekutif Harian",schedule:"daily",nextRun:"2025-11-23 07:00",recipients:["direktur@rscm.co.id","kabid@kemenkes.go.id"],status:"active",lastRun:"2025-11-22 07:00",reportType:"Administrasi"},{id:"SCH-004",name:"Analisis Treatment Outcomes",schedule:"monthly",nextRun:"2025-12-15 10:00",recipients:["dr.ahmad@rscm.co.id","research@inamsos.id"],status:"active",lastRun:"2025-11-15 10:00",reportType:"Klinis"},{id:"SCH-005",name:"Distribusi Geografis Kasus",schedule:"weekly",nextRun:"2025-11-30 11:00",recipients:["dr.rina@dharmais.co.id","epidemio@kemenkes.go.id"],status:"inactive",lastRun:"2025-11-16 11:00",reportType:"Epidemiologi"},{id:"SCH-006",name:"Performa Pusat Kesehatan",schedule:"monthly",nextRun:"2025-12-01 14:00",recipients:["admin@rscm.co.id","admin@dharmais.co.id"],status:"active",lastRun:"2025-11-01 14:00",reportType:"Administrasi"},{id:"SCH-007",name:"Update Pasien Baru",schedule:"daily",nextRun:"2025-11-23 16:00",recipients:["registrar@rscm.co.id"],status:"inactive",lastRun:"2025-11-22 16:00",reportType:"Administrasi"}])}catch(e){console.error("Error fetching scheduled reports:",e)}finally{c(!1)}},y=e=>{switch(e){case"daily":return"Harian";case"weekly":return"Mingguan";case"monthly":return"Bulanan";default:return e}},b=e=>{switch(e){case"daily":return"bg-blue-100 text-blue-800";case"weekly":return"bg-green-100 text-green-800";case"monthly":return"bg-purple-100 text-purple-800";default:return"bg-gray-100 text-gray-800"}},v=e=>{let t="active"===e.status?"inactive":"active";o(a=>a.map(a=>a.id===e.id?{...a,status:t}:a)),alert('Laporan "'.concat(e.name,'" ').concat("active"===t?"diaktifkan":"dinonaktifkan"))},j=e=>{x(e),g({name:e.name,reportType:e.reportType,schedule:e.schedule,recipients:e.recipients.join(", "),status:e.status}),m(!0)},k=e=>{confirm('Apakah Anda yakin ingin menghapus jadwal laporan "'.concat(e.name,'"?'))&&(o(t=>t.filter(t=>t.id!==e.id)),alert('Laporan "'.concat(e.name,'" berhasil dihapus')))},w=e=>{alert('Menjalankan laporan "'.concat(e.name,'" sekarang...\nLaporan akan dikirim ke ').concat(e.recipients.length," penerima."))};return a||d?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,s.jsxs)(n.A,{children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Laporan Terjadwal"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Kelola laporan yang dijadwalkan secara otomatis"})]}),(0,s.jsx)("button",{onClick:()=>{x(null),g({name:"",reportType:"",schedule:"weekly",recipients:"",status:"active"}),m(!0)},className:"px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium",children:"+ Jadwalkan Laporan Baru"})]})}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",children:[(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Laporan Aktif"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:l.filter(e=>"active"===e.status).length})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-gray-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Tidak Aktif"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:l.filter(e=>"inactive"===e.status).length})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Jadwal"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:l.length})]})]})})]}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nama Laporan"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Jadwal"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Eksekusi Berikutnya"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Penerima"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:0===l.length?(0,s.jsx)("tr",{children:(0,s.jsx)("td",{colSpan:6,className:"px-6 py-12 text-center",children:(0,s.jsxs)("div",{className:"text-gray-500",children:[(0,s.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,s.jsx)("p",{className:"mt-2",children:"Belum ada laporan terjadwal"})]})})}):l.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.name}),(0,s.jsxs)("div",{className:"text-xs text-gray-500",children:[e.reportType," - ",e.id]})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-medium rounded ".concat(b(e.schedule)),children:y(e.schedule)})}),(0,s.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:[(0,s.jsx)("div",{className:"text-sm text-gray-900",children:e.nextRun}),e.lastRun&&(0,s.jsxs)("div",{className:"text-xs text-gray-500",children:["Terakhir: ",e.lastRun]})]}),(0,s.jsxs)("td",{className:"px-6 py-4",children:[(0,s.jsxs)("div",{className:"text-sm text-gray-900",children:[e.recipients.length," penerima"]}),(0,s.jsxs)("div",{className:"text-xs text-gray-500",children:[e.recipients[0],e.recipients.length>1&&", +".concat(e.recipients.length-1," lainnya")]})]}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("button",{onClick:()=>v(e),className:"relative inline-flex h-6 w-11 items-center rounded-full transition-colors ".concat("active"===e.status?"bg-green-600":"bg-gray-300"),children:(0,s.jsx)("span",{className:"inline-block h-4 w-4 transform rounded-full bg-white transition-transform ".concat("active"===e.status?"translate-x-6":"translate-x-1")})})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,s.jsxs)("div",{className:"flex space-x-3",children:[(0,s.jsx)("button",{onClick:()=>w(e),className:"text-blue-600 hover:text-blue-900",title:"Jalankan Sekarang",children:(0,s.jsxs)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"}),(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})]})}),(0,s.jsx)("button",{onClick:()=>j(e),className:"text-green-600 hover:text-green-900",title:"Edit",children:(0,s.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,s.jsx)("button",{onClick:()=>k(e),className:"text-red-600 hover:text-red-900",title:"Hapus",children:(0,s.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})})]},e.id))})]})})}),u&&(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,s.jsxs)("div",{className:"bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[(0,s.jsx)("div",{className:"p-6 border-b",children:(0,s.jsx)("h2",{className:"text-xl font-bold text-gray-900",children:p?"Edit Laporan Terjadwal":"Jadwalkan Laporan Baru"})}),(0,s.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),!h.name||!h.reportType||!h.recipients){alert("Mohon lengkapi semua field yang diperlukan");return}let t=h.recipients.split(",").map(e=>e.trim());if(p)o(e=>e.map(e=>e.id===p.id?{...e,name:h.name,reportType:h.reportType,schedule:h.schedule,recipients:t,status:h.status}:e)),alert('Laporan "'.concat(h.name,'" berhasil diupdate'));else{let e={id:"SCH-".concat(String(l.length+1).padStart(3,"0")),name:h.name,reportType:h.reportType,schedule:h.schedule,recipients:t,status:h.status,nextRun:"2025-11-25 08:00",lastRun:void 0};o([...l,e]),alert('Laporan "'.concat(h.name,'" berhasil dijadwalkan'))}m(!1)},className:"p-6 space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["Nama Laporan ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",value:h.name,onChange:e=>g({...h,name:e.target.value}),placeholder:"Contoh: Laporan Insidensi Mingguan",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",required:!0})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["Tipe Laporan ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsxs)("select",{value:h.reportType,onChange:e=>g({...h,reportType:e.target.value}),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",required:!0,children:[(0,s.jsx)("option",{value:"",children:"Pilih Tipe Laporan"}),(0,s.jsx)("option",{value:"Epidemiologi",children:"Epidemiologi"}),(0,s.jsx)("option",{value:"Klinis",children:"Klinis"}),(0,s.jsx)("option",{value:"Administrasi",children:"Administrasi"}),(0,s.jsx)("option",{value:"Kualitas",children:"Kualitas"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Frekuensi Jadwal"}),(0,s.jsx)("div",{className:"grid grid-cols-3 gap-4",children:["daily","weekly","monthly"].map(e=>(0,s.jsx)("button",{type:"button",onClick:()=>g({...h,schedule:e}),className:"px-4 py-3 border-2 rounded-lg font-medium transition-colors ".concat(h.schedule===e?"border-green-500 bg-green-50 text-green-700":"border-gray-300 hover:border-green-300"),children:y(e)},e))})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["Email Penerima ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("textarea",{value:h.recipients,onChange:e=>g({...h,recipients:e.target.value}),placeholder:"Masukkan email penerima, pisahkan dengan koma Contoh: admin@rscm.co.id, dr.budi@dharmais.co.id",rows:3,className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",required:!0}),(0,s.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"Pisahkan dengan koma untuk multiple email"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Status"}),(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsxs)("label",{className:"flex items-center",children:[(0,s.jsx)("input",{type:"radio",value:"active",checked:"active"===h.status,onChange:e=>g({...h,status:e.target.value}),className:"mr-2"}),(0,s.jsx)("span",{children:"Aktif"})]}),(0,s.jsxs)("label",{className:"flex items-center",children:[(0,s.jsx)("input",{type:"radio",value:"inactive",checked:"inactive"===h.status,onChange:e=>g({...h,status:e.target.value}),className:"mr-2"}),(0,s.jsx)("span",{children:"Tidak Aktif"})]})]})]}),(0,s.jsxs)("div",{className:"flex space-x-3 pt-4 border-t",children:[(0,s.jsx)("button",{type:"button",onClick:()=>m(!1),className:"flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors",children:"Batal"}),(0,s.jsx)("button",{type:"submit",className:"flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors",children:p?"Simpan Perubahan":"Jadwalkan Laporan"})]})]})]})})]}):(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return em},ZP:function(){return ep}});var i,n=a(2265);let l={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},p={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},h=(e,t,a,s,r)=>{var i;let n=x(e),l=p[n]||(p[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!p[l]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);p[l]=m(r?{["@keyframes "+l]:t}:t,a?"":"."+l)}let o=a&&p.g?p.g:null;return a&&(p.g=p[l]),i=p[l],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),l},g=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function k(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;a.p=Object.assign({theme:b&&b()},l),a.o=/ *go\d+/.test(o),l.className=f.apply(a,s)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),v&&d[0]&&v(l),y(d,l)}return t?t(r):r}}var w=e=>"function"==typeof e,N=(e,t)=>w(e)?e(t):e,C=(s=0,()=>(++s).toString()),L=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},E="default",T=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return T(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],S={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},R={},M=(e,t=E)=>{R[t]=T(R[t]||S,e),A.forEach(([e,a])=>{e===t&&a(R[t])})},H=e=>Object.keys(R).forEach(t=>M(e,t)),$=e=>Object.keys(R).find(t=>R[t].toasts.some(t=>t.id===e)),z=(e=E)=>t=>{M(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=(e={},t=E)=>{let[a,s]=(0,n.useState)(R[t]||S),r=(0,n.useRef)(R[t]);(0,n.useEffect)(()=>(r.current!==R[t]&&s(R[t]),A.push([t,s]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},O=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),B=e=>(t,a)=>{let s=O(t,e,a);return z(s.toasterId||$(s.id))({type:2,toast:s}),s.id},I=(e,t)=>B("blank")(e,t);I.error=B("error"),I.success=B("success"),I.loading=B("loading"),I.custom=B("custom"),I.dismiss=(e,t)=>{let a={type:3,toastId:e};t?z(t)(a):H(a)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let a={type:4,toastId:e};t?z(t)(a):H(a)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,a)=>{let s=I.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?N(t.success,e):void 0;return r?I.success(r,{id:s,...a,...null==a?void 0:a.success}):I.dismiss(s),e}).catch(e=>{let r=t.error?N(t.error,e):void 0;r?I.error(r,{id:s,...a,...null==a?void 0:a.error}):I.dismiss(s)}),e};var _=1e3,K=(e,t="default")=>{let{toasts:a,pausedAt:s}=P(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=_)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),l({type:4,toastId:e})},t);r.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&I.dismiss(a.id);return}return setTimeout(()=>I.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let l=(0,n.useCallback)(z(t),[t]),o=(0,n.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,n.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,n.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}},W=j`
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
}`,q=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,U=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=k("div")`
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
}`,G=j`
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
}`,Y=k("div")`
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
`,Q=k("div")`
  position: absolute;
`,X=k("div")`
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
}`,et=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(V,{...s}),"loading"!==a&&n.createElement(Q,null,"error"===a?n.createElement(q,{...s}):n.createElement(Y,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=k("div")`
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
`,en=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,el=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=L()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),l=n.createElement(en,{...e.ariaProps},N(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:l}):n.createElement(n.Fragment,null,i,l))});i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:L()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=K(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,l=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eu:"",style:l},"custom"===a.type?N(a.message,a):r?r(a):n.createElement(eo,{toast:a,position:i}))}))},ep=I}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=5468)}),_N_E=e.O()}]);