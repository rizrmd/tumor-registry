(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3666],{1046:function(e,t,a){Promise.resolve().then(a.bind(a,1788))},1788:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var s=a(7437),i=a(2265),r=a(6986),n=a(4894);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,r.useAuth)(),[o,l]=(0,i.useState)([]),[d,c]=(0,i.useState)([]),[m,u]=(0,i.useState)([]),[p,x]=(0,i.useState)([]),[h,g]=(0,i.useState)(""),[f,b]=(0,i.useState)(!0),[v,y]=(0,i.useState)(!1),[j,k]=(0,i.useState)(null),[N,w]=(0,i.useState)(""),C={activeProjects:o.filter(e=>"Active"===e.status).length,collaborators:d.length,sharedDatasets:o.reduce((e,t)=>e+t.datasets,0)};(0,i.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&M()},[t,a]),(0,i.useEffect)(()=>{h?u(d.filter(e=>e.name.toLowerCase().includes(h.toLowerCase())||e.institution.toLowerCase().includes(h.toLowerCase())||e.expertise.some(e=>e.toLowerCase().includes(h.toLowerCase())))):u(d)},[h,d]);let M=async()=>{try{b(!0);let e=[{id:"RES-001",name:"Prof. Dr. Andry Hartono, Sp.Onk",institution:"Universitas Indonesia",expertise:["Onkologi Medis","Kanker Payudara","Imunoterapi"],publications:45,photo:"https://ui-avatars.com/api/?name=Andry+Hartono&background=10b981&color=fff",email:"andry.hartono@ui.ac.id"},{id:"RES-002",name:"Dr. Siti Aminah, M.Sc",institution:"Universitas Gadjah Mada",expertise:["Epidemiologi Kanker","Biostatistik","Data Science"],publications:32,photo:"https://ui-avatars.com/api/?name=Siti+Aminah&background=3b82f6&color=fff",email:"siti.aminah@ugm.ac.id"},{id:"RES-003",name:"Prof. Bambang Sutrisno, Ph.D",institution:"Institut Teknologi Bandung",expertise:["Bioinformatika","Genomik","Machine Learning"],publications:58,photo:"https://ui-avatars.com/api/?name=Bambang+Sutrisno&background=8b5cf6&color=fff",email:"bambang.s@itb.ac.id"},{id:"RES-004",name:"Dr. Rina Kusuma, Sp.PA",institution:"Universitas Airlangga",expertise:["Patologi Anatomi","Histopatologi","Molekuler Patologi"],publications:28,photo:"https://ui-avatars.com/api/?name=Rina+Kusuma&background=ec4899&color=fff",email:"rina.kusuma@unair.ac.id"},{id:"RES-005",name:"Prof. Dr. Eko Prasetyo, Sp.Rad(K)",institution:"Universitas Padjadjaran",expertise:["Radiologi Onkologi","Radioterapi","Imaging"],publications:41,photo:"https://ui-avatars.com/api/?name=Eko+Prasetyo&background=f59e0b&color=fff",email:"eko.prasetyo@unpad.ac.id"},{id:"RES-006",name:"Dr. Maya Sari, M.Biomed",institution:"Universitas Hasanuddin",expertise:["Biologi Molekuler","Cancer Biology","Stem Cell"],publications:24,photo:"https://ui-avatars.com/api/?name=Maya+Sari&background=14b8a6&color=fff",email:"maya.sari@unhas.ac.id"},{id:"RES-007",name:"Prof. Hendra Wijaya, Ph.D",institution:"Universitas Diponegoro",expertise:["Onkologi Bedah","Surgical Oncology","Minimal Invasive"],publications:36,photo:"https://ui-avatars.com/api/?name=Hendra+Wijaya&background=6366f1&color=fff",email:"hendra.w@undip.ac.id"},{id:"RES-008",name:"Dr. Lina Permata, Sp.KFR",institution:"Universitas Brawijaya",expertise:["Rehabilitasi Medik","Cancer Rehabilitation","Palliative Care"],publications:19,photo:"https://ui-avatars.com/api/?name=Lina+Permata&background=f43f5e&color=fff",email:"lina.permata@ub.ac.id"}];l([{id:"PROJ-001",title:"Studi Multi-center Kanker Payudara",members:8,datasets:3,status:"Active",lastActivity:"2025-11-20",description:"Kolaborasi penelitian kanker payudara melibatkan 5 rumah sakit di Indonesia",lead:"Dr. Siti Rahayu"},{id:"PROJ-002",title:"Analisis Genomik Kanker Paru",members:5,datasets:2,status:"Active",lastActivity:"2025-11-19",description:"Penelitian genomik untuk identifikasi biomarker kanker paru",lead:"Prof. Ahmad Wijaya"},{id:"PROJ-003",title:"Efektivitas Imunoterapi di Indonesia",members:6,datasets:4,status:"Planning",lastActivity:"2025-11-18",description:"Evaluasi efektivitas dan biaya imunoterapi pada berbagai jenis kanker",lead:"Dr. Ratna Dewi"},{id:"PROJ-004",title:"Registry Kanker Anak Nasional",members:12,datasets:5,status:"Completed",lastActivity:"2025-10-30",description:"Pembentukan registry nasional untuk kanker anak",lead:"Dr. Budi Santoso"}]),c(e),u(e),x([{id:"TM-001",name:"Dr. Ahmad Fauzi",role:"Principal Investigator",institution:"RS Cipto Mangunkusumo"},{id:"TM-002",name:"Dr. Dewi Lestari",role:"Co-Investigator",institution:"RS Dharmais"},{id:"TM-003",name:"Adi Nugroho, M.Sc",role:"Data Analyst",institution:"Universitas Indonesia"},{id:"TM-004",name:"Sari Wijayanti",role:"Research Assistant",institution:"RS Sardjito"}])}catch(e){console.error("Error fetching collaboration data:",e)}finally{b(!1)}},P=e=>{switch(e){case"Active":return"bg-green-100 text-green-800";case"Planning":return"bg-blue-100 text-blue-800";default:return"bg-gray-100 text-gray-800"}},S=e=>{k(e),w(""),y(!0)};return a||f?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,s.jsxs)(n.A,{children:[(0,s.jsxs)("div",{className:"mb-6",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Kolaborasi Penelitian"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Kelola kolaborasi penelitian dan jaringan peneliti"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Proyek Aktif"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:C.activeProjects})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Kolaborator"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:C.collaborators})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-purple-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Dataset Dibagikan"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:C.sharedDatasets})]})]})})]}),(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900",children:"Proyek Aktif"}),(0,s.jsx)("button",{className:"text-sm text-green-600 hover:text-green-700 font-medium",children:"+ Proyek Baru"})]}),(0,s.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:o.map(e=>(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-3",children:[(0,s.jsx)("h3",{className:"text-lg font-semibold text-gray-900",children:e.title}),(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-medium rounded-full ".concat(P(e.status)),children:e.status})]}),(0,s.jsx)("p",{className:"text-sm text-gray-600 mb-4",children:e.description}),(0,s.jsxs)("div",{className:"flex items-center text-sm text-gray-500 mb-3",children:[(0,s.jsx)("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),(0,s.jsxs)("span",{className:"mr-4",children:["Lead: ",e.lead]})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm text-gray-500 mb-4",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})}),(0,s.jsxs)("span",{children:[e.members," anggota"]})]}),(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"})}),(0,s.jsxs)("span",{children:[e.datasets," dataset"]})]}),(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,s.jsx)("span",{children:e.lastActivity})]})]}),(0,s.jsx)("button",{className:"w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium",children:"Lihat Detail"})]},e.id))})]}),(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Cari Kolaborator"}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-4 mb-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("svg",{className:"h-5 w-5 text-gray-400 mr-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),(0,s.jsx)("input",{type:"text",value:h,onChange:e=>g(e.target.value),placeholder:"Cari berdasarkan nama, institusi, atau expertise...",className:"flex-1 px-3 py-2 border-0 focus:outline-none"})]})}),(0,s.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:m.map(e=>(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow",children:[(0,s.jsxs)("div",{className:"flex items-center mb-4",children:[(0,s.jsx)("img",{src:e.photo,alt:e.name,className:"h-16 w-16 rounded-full mr-4"}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("h3",{className:"font-semibold text-gray-900",children:e.name}),(0,s.jsx)("p",{className:"text-sm text-gray-500",children:e.institution})]})]}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("p",{className:"text-xs font-medium text-gray-500 mb-2",children:"Expertise:"}),(0,s.jsx)("div",{className:"flex flex-wrap gap-2",children:e.expertise.map((e,t)=>(0,s.jsx)("span",{className:"px-2 py-1 bg-green-50 text-green-700 text-xs rounded",children:e},t))})]}),(0,s.jsx)("div",{className:"flex items-center justify-between mb-4",children:(0,s.jsxs)("div",{className:"flex items-center text-sm text-gray-500",children:[(0,s.jsx)("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})}),(0,s.jsxs)("span",{children:[e.publications," publikasi"]})]})}),(0,s.jsx)("button",{onClick:()=>S(e),className:"w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Kirim Permintaan"})]},e.id))}),0===m.length&&(0,s.jsxs)("div",{className:"text-center py-12 bg-white rounded-lg shadow",children:[(0,s.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),(0,s.jsx)("p",{className:"mt-4 text-gray-500",children:"Tidak ada peneliti yang sesuai dengan pencarian"})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Tim Penelitian Saya"}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nama"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Role"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Institusi"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:p.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded",children:e.role})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500",children:e.institution})}),(0,s.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:[(0,s.jsx)("button",{className:"text-blue-600 hover:text-blue-900 font-medium mr-3",children:"Profil"}),(0,s.jsx)("button",{className:"text-green-600 hover:text-green-900 font-medium",children:"Kontak"})]})]},e.id))})]})})]}),v&&j&&(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,s.jsx)("div",{className:"bg-white rounded-lg max-w-xl w-full",children:(0,s.jsxs)("div",{className:"p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,s.jsx)("h2",{className:"text-xl font-bold text-gray-900",children:"Kirim Permintaan Kolaborasi"}),(0,s.jsx)("button",{onClick:()=>y(!1),className:"text-gray-400 hover:text-gray-600",children:(0,s.jsx)("svg",{className:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsxs)("div",{className:"flex items-center mb-4",children:[(0,s.jsx)("img",{src:j.photo,alt:j.name,className:"h-12 w-12 rounded-full mr-3"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-semibold text-gray-900",children:j.name}),(0,s.jsx)("p",{className:"text-sm text-gray-500",children:j.institution})]})]}),(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Pesan Kolaborasi *"}),(0,s.jsx)("textarea",{value:N,onChange:e=>w(e.target.value),rows:6,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Jelaskan proposal kolaborasi Anda, topik penelitian, dan bagaimana Anda ingin berkolaborasi..."})]}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3",children:[(0,s.jsx)("button",{onClick:()=>y(!1),className:"px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium",children:"Batal"}),(0,s.jsx)("button",{onClick:()=>{if(!N.trim()){alert("Mohon masukkan pesan kolaborasi");return}alert("Permintaan kolaborasi berhasil dikirim ke ".concat(null==j?void 0:j.name,"!")),y(!1),k(null),w("")},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Kirim Permintaan"})]})]})})})]}):(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,i;a.d(t,{x7:function(){return eu},ZP:function(){return ep}});var r,n=a(2265);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let a="",s="",i="";for(let r in e){let n=e[r];"@"==r[0]?"i"==r[1]?a=r+" "+n+";":s+="f"==r[1]?u(n,r):r+"{"+u(n,"k"==r[1]?"":t)+"}":"object"==typeof n?s+=u(n,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=n&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=u.p?u.p(r,n):r+":"+n+";")}return a+(t&&i?t+"{"+i+"}":i)+s},p={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},h=(e,t,a,s,i)=>{var r;let n=x(e),o=p[n]||(p[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(m," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);p[o]=u(i?{["@keyframes "+o]:t}:t,a?"":"."+o)}let l=a&&p.g?p.g:null;return a&&(p.g=p[o]),r=p[o],l?t.data=t.data.replace(l,r):-1===t.data.indexOf(r)&&(t.data=s?r+t.data:t.data+r),o},g=(e,t,a)=>e.reduce((e,s,i)=>{let r=t[i];if(r&&r.call){let e=r(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+s+(null==r?"":r)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}f.bind({g:1});let b,v,y,j=f.bind({k:1});function k(e,t){let a=this||{};return function(){let s=arguments;function i(r,n){let o=Object.assign({},r),l=o.className||i.className;a.p=Object.assign({theme:v&&v()},o),a.o=/ *go\d+/.test(l),o.className=f.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),y&&d[0]&&y(o),b(d,o)}return t?t(i):i}}var N=e=>"function"==typeof e,w=(e,t)=>N(e)?e(t):e,C=(s=0,()=>(++s).toString()),M=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},P="default",S=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return S(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},E=[],L={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},D=(e,t=P)=>{A[t]=S(A[t]||L,e),E.forEach(([e,a])=>{e===t&&a(A[t])})},R=e=>Object.keys(A).forEach(t=>D(e,t)),B=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),O=(e=P)=>t=>{D(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=P)=>{let[a,s]=(0,n.useState)(A[t]||L),i=(0,n.useRef)(A[t]);(0,n.useEffect)(()=>(i.current!==A[t]&&s(A[t]),E.push([t,s]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let r=a.toasts.map(t=>{var a,s,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...a,toasts:r}},K=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),$=e=>(t,a)=>{let s=K(t,e,a);return O(s.toasterId||B(s.id))({type:2,toast:s}),s.id},H=(e,t)=>$("blank")(e,t);H.error=$("error"),H.success=$("success"),H.loading=$("loading"),H.custom=$("custom"),H.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):R(a)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):R(a)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,a)=>{let s=H.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?w(t.success,e):void 0;return i?H.success(i,{id:s,...a,...null==a?void 0:a.success}):H.dismiss(s),e}).catch(e=>{let i=t.error?w(t.error,e):void 0;i?H.error(i,{id:s,...a,...null==a?void 0:a.error}):H.dismiss(s)}),e};var W=1e3,T=(e,t="default")=>{let{toasts:a,pausedAt:s}=I(e,t),i=(0,n.useRef)(new Map).current,r=(0,n.useCallback)((e,t=W)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),i=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&H.dismiss(a.id);return}return setTimeout(()=>H.dismiss(a.id,t),s)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let o=(0,n.useCallback)(O(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,n.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),m=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:i=8,defaultPosition:r}=t||{},n=a.filter(t=>(t.position||r)===(e.position||r)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,r]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}},_=j`
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
}`,F=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,J=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${F} 0.15s ease-out forwards;
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
`,G=k("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(G,{...s}),"loading"!==a&&n.createElement(Q,null,"error"===a?n.createElement(J,{...s}):n.createElement(Y,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=k("div")`
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
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=M()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),ei(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},r=n.createElement(ea,{toast:e}),o=n.createElement(en,{...e.ariaProps},w(e.message,e));return n.createElement(er,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof s?s({icon:r,message:o}):n.createElement(n.Fragment,null,r,o))});r=n.createElement,u.p=void 0,b=r,v=void 0,y=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let r=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:r,className:t,style:a},i)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:M()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:r,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=T(a,r);return n.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let r=a.position||t,o=ec(r,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?em:"",style:o},"custom"===a.type?w(a.message,a):i?i(a):n.createElement(el,{toast:a,position:r}))}))},ep=H}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=1046)}),_N_E=e.O()}]);