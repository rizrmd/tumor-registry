(()=>{var e={};e.id=3666,e.ids=[3666],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},5328:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>c,routeModule:()=>p,tree:()=>d});var s=a(482),i=a(9108),r=a(2563),n=a.n(r),o=a(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let d=["",{children:["research",{children:["collaboration",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,4360)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\research\\collaboration\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\research\\collaboration\\page.tsx"],m="/research/collaboration/page",u={require:a,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/research/collaboration/page",pathname:"/research/collaboration",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},1921:(e,t,a)=>{Promise.resolve().then(a.bind(a,2096))},2254:(e,t,a)=>{e.exports=a(4767)},2096:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var s=a(2295),i=a(3729),r=a(3973),n=a(2528);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,r.useAuth)(),[o,l]=(0,i.useState)([]),[d,c]=(0,i.useState)([]),[m,u]=(0,i.useState)([]),[p,x]=(0,i.useState)([]),[h,g]=(0,i.useState)(""),[f,b]=(0,i.useState)(!0),[v,y]=(0,i.useState)(!1),[j,k]=(0,i.useState)(null),[N,w]=(0,i.useState)(""),P={activeProjects:o.filter(e=>"Active"===e.status).length,collaborators:d.length,sharedDatasets:o.reduce((e,t)=>e+t.datasets,0)};(0,i.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&M()},[t,a]),(0,i.useEffect)(()=>{h?u(d.filter(e=>e.name.toLowerCase().includes(h.toLowerCase())||e.institution.toLowerCase().includes(h.toLowerCase())||e.expertise.some(e=>e.toLowerCase().includes(h.toLowerCase())))):u(d)},[h,d]);let M=async()=>{try{b(!0);let e=[{id:"RES-001",name:"Prof. Dr. Andry Hartono, Sp.Onk",institution:"Universitas Indonesia",expertise:["Onkologi Medis","Kanker Payudara","Imunoterapi"],publications:45,photo:"https://ui-avatars.com/api/?name=Andry+Hartono&background=10b981&color=fff",email:"andry.hartono@ui.ac.id"},{id:"RES-002",name:"Dr. Siti Aminah, M.Sc",institution:"Universitas Gadjah Mada",expertise:["Epidemiologi Kanker","Biostatistik","Data Science"],publications:32,photo:"https://ui-avatars.com/api/?name=Siti+Aminah&background=3b82f6&color=fff",email:"siti.aminah@ugm.ac.id"},{id:"RES-003",name:"Prof. Bambang Sutrisno, Ph.D",institution:"Institut Teknologi Bandung",expertise:["Bioinformatika","Genomik","Machine Learning"],publications:58,photo:"https://ui-avatars.com/api/?name=Bambang+Sutrisno&background=8b5cf6&color=fff",email:"bambang.s@itb.ac.id"},{id:"RES-004",name:"Dr. Rina Kusuma, Sp.PA",institution:"Universitas Airlangga",expertise:["Patologi Anatomi","Histopatologi","Molekuler Patologi"],publications:28,photo:"https://ui-avatars.com/api/?name=Rina+Kusuma&background=ec4899&color=fff",email:"rina.kusuma@unair.ac.id"},{id:"RES-005",name:"Prof. Dr. Eko Prasetyo, Sp.Rad(K)",institution:"Universitas Padjadjaran",expertise:["Radiologi Onkologi","Radioterapi","Imaging"],publications:41,photo:"https://ui-avatars.com/api/?name=Eko+Prasetyo&background=f59e0b&color=fff",email:"eko.prasetyo@unpad.ac.id"},{id:"RES-006",name:"Dr. Maya Sari, M.Biomed",institution:"Universitas Hasanuddin",expertise:["Biologi Molekuler","Cancer Biology","Stem Cell"],publications:24,photo:"https://ui-avatars.com/api/?name=Maya+Sari&background=14b8a6&color=fff",email:"maya.sari@unhas.ac.id"},{id:"RES-007",name:"Prof. Hendra Wijaya, Ph.D",institution:"Universitas Diponegoro",expertise:["Onkologi Bedah","Surgical Oncology","Minimal Invasive"],publications:36,photo:"https://ui-avatars.com/api/?name=Hendra+Wijaya&background=6366f1&color=fff",email:"hendra.w@undip.ac.id"},{id:"RES-008",name:"Dr. Lina Permata, Sp.KFR",institution:"Universitas Brawijaya",expertise:["Rehabilitasi Medik","Cancer Rehabilitation","Palliative Care"],publications:19,photo:"https://ui-avatars.com/api/?name=Lina+Permata&background=f43f5e&color=fff",email:"lina.permata@ub.ac.id"}];l([{id:"PROJ-001",title:"Studi Multi-center Kanker Payudara",members:8,datasets:3,status:"Active",lastActivity:"2025-11-20",description:"Kolaborasi penelitian kanker payudara melibatkan 5 rumah sakit di Indonesia",lead:"Dr. Siti Rahayu"},{id:"PROJ-002",title:"Analisis Genomik Kanker Paru",members:5,datasets:2,status:"Active",lastActivity:"2025-11-19",description:"Penelitian genomik untuk identifikasi biomarker kanker paru",lead:"Prof. Ahmad Wijaya"},{id:"PROJ-003",title:"Efektivitas Imunoterapi di Indonesia",members:6,datasets:4,status:"Planning",lastActivity:"2025-11-18",description:"Evaluasi efektivitas dan biaya imunoterapi pada berbagai jenis kanker",lead:"Dr. Ratna Dewi"},{id:"PROJ-004",title:"Registry Kanker Anak Nasional",members:12,datasets:5,status:"Completed",lastActivity:"2025-10-30",description:"Pembentukan registry nasional untuk kanker anak",lead:"Dr. Budi Santoso"}]),c(e),u(e),x([{id:"TM-001",name:"Dr. Ahmad Fauzi",role:"Principal Investigator",institution:"RS Cipto Mangunkusumo"},{id:"TM-002",name:"Dr. Dewi Lestari",role:"Co-Investigator",institution:"RS Dharmais"},{id:"TM-003",name:"Adi Nugroho, M.Sc",role:"Data Analyst",institution:"Universitas Indonesia"},{id:"TM-004",name:"Sari Wijayanti",role:"Research Assistant",institution:"RS Sardjito"}])}catch(e){console.error("Error fetching collaboration data:",e)}finally{b(!1)}},S=e=>{switch(e){case"Active":return"bg-green-100 text-green-800";case"Planning":return"bg-blue-100 text-blue-800";default:return"bg-gray-100 text-gray-800"}},A=e=>{k(e),w(""),y(!0)};return a||f?s.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),s.jsx("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,s.jsxs)(n.A,{children:[(0,s.jsxs)("div",{className:"mb-6",children:[s.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Kolaborasi Penelitian"}),s.jsx("p",{className:"text-gray-600",children:"Kelola kolaborasi penelitian dan jaringan peneliti"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[s.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[s.jsx("div",{className:"p-3 bg-green-100 rounded-lg",children:s.jsx("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[s.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Proyek Aktif"}),s.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:P.activeProjects})]})]})}),s.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[s.jsx("div",{className:"p-3 bg-blue-100 rounded-lg",children:s.jsx("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[s.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Kolaborator"}),s.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:P.collaborators})]})]})}),s.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[s.jsx("div",{className:"p-3 bg-purple-100 rounded-lg",children:s.jsx("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[s.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Dataset Dibagikan"}),s.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:P.sharedDatasets})]})]})})]}),(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[s.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Proyek Aktif"}),s.jsx("button",{className:"text-sm text-green-600 hover:text-green-700 font-medium",children:"+ Proyek Baru"})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:o.map(e=>(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-3",children:[s.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:e.title}),s.jsx("span",{className:`px-2 py-1 text-xs font-medium rounded-full ${S(e.status)}`,children:e.status})]}),s.jsx("p",{className:"text-sm text-gray-600 mb-4",children:e.description}),(0,s.jsxs)("div",{className:"flex items-center text-sm text-gray-500 mb-3",children:[s.jsx("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),(0,s.jsxs)("span",{className:"mr-4",children:["Lead: ",e.lead]})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm text-gray-500 mb-4",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[s.jsx("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})}),(0,s.jsxs)("span",{children:[e.members," anggota"]})]}),(0,s.jsxs)("div",{className:"flex items-center",children:[s.jsx("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"})}),(0,s.jsxs)("span",{children:[e.datasets," dataset"]})]}),(0,s.jsxs)("div",{className:"flex items-center",children:[s.jsx("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),s.jsx("span",{children:e.lastActivity})]})]}),s.jsx("button",{className:"w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium",children:"Lihat Detail"})]},e.id))})]}),(0,s.jsxs)("div",{className:"mb-8",children:[s.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Cari Kolaborator"}),s.jsx("div",{className:"bg-white rounded-lg shadow p-4 mb-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[s.jsx("svg",{className:"h-5 w-5 text-gray-400 mr-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),s.jsx("input",{type:"text",value:h,onChange:e=>g(e.target.value),placeholder:"Cari berdasarkan nama, institusi, atau expertise...",className:"flex-1 px-3 py-2 border-0 focus:outline-none"})]})}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:m.map(e=>(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow",children:[(0,s.jsxs)("div",{className:"flex items-center mb-4",children:[s.jsx("img",{src:e.photo,alt:e.name,className:"h-16 w-16 rounded-full mr-4"}),(0,s.jsxs)("div",{className:"flex-1",children:[s.jsx("h3",{className:"font-semibold text-gray-900",children:e.name}),s.jsx("p",{className:"text-sm text-gray-500",children:e.institution})]})]}),(0,s.jsxs)("div",{className:"mb-4",children:[s.jsx("p",{className:"text-xs font-medium text-gray-500 mb-2",children:"Expertise:"}),s.jsx("div",{className:"flex flex-wrap gap-2",children:e.expertise.map((e,t)=>s.jsx("span",{className:"px-2 py-1 bg-green-50 text-green-700 text-xs rounded",children:e},t))})]}),s.jsx("div",{className:"flex items-center justify-between mb-4",children:(0,s.jsxs)("div",{className:"flex items-center text-sm text-gray-500",children:[s.jsx("svg",{className:"h-4 w-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})}),(0,s.jsxs)("span",{children:[e.publications," publikasi"]})]})}),s.jsx("button",{onClick:()=>A(e),className:"w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Kirim Permintaan"})]},e.id))}),0===m.length&&(0,s.jsxs)("div",{className:"text-center py-12 bg-white rounded-lg shadow",children:[s.jsx("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),s.jsx("p",{className:"mt-4 text-gray-500",children:"Tidak ada peneliti yang sesuai dengan pencarian"})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[s.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Tim Penelitian Saya"}),s.jsx("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[s.jsx("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[s.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nama"}),s.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Role"}),s.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Institusi"}),s.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),s.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:p.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[s.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:s.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:s.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded",children:e.role})}),s.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:s.jsx("div",{className:"text-sm text-gray-500",children:e.institution})}),(0,s.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:[s.jsx("button",{className:"text-blue-600 hover:text-blue-900 font-medium mr-3",children:"Profil"}),s.jsx("button",{className:"text-green-600 hover:text-green-900 font-medium",children:"Kontak"})]})]},e.id))})]})})]}),v&&j&&s.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:s.jsx("div",{className:"bg-white rounded-lg max-w-xl w-full",children:(0,s.jsxs)("div",{className:"p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[s.jsx("h2",{className:"text-xl font-bold text-gray-900",children:"Kirim Permintaan Kolaborasi"}),s.jsx("button",{onClick:()=>y(!1),className:"text-gray-400 hover:text-gray-600",children:s.jsx("svg",{className:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsxs)("div",{className:"flex items-center mb-4",children:[s.jsx("img",{src:j.photo,alt:j.name,className:"h-12 w-12 rounded-full mr-3"}),(0,s.jsxs)("div",{children:[s.jsx("p",{className:"font-semibold text-gray-900",children:j.name}),s.jsx("p",{className:"text-sm text-gray-500",children:j.institution})]})]}),s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Pesan Kolaborasi *"}),s.jsx("textarea",{value:N,onChange:e=>w(e.target.value),rows:6,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Jelaskan proposal kolaborasi Anda, topik penelitian, dan bagaimana Anda ingin berkolaborasi..."})]}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3",children:[s.jsx("button",{onClick:()=>y(!1),className:"px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium",children:"Batal"}),s.jsx("button",{onClick:()=>{if(!N.trim()){alert("Mohon masukkan pesan kolaborasi");return}alert(`Permintaan kolaborasi berhasil dikirim ke ${j?.name}!`),y(!1),k(null),w("")},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Kirim Permintaan"})]})]})})})]}):s.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),s.jsx("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},4360:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>r,__esModule:()=>i,default:()=>n});let s=(0,a(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\research\collaboration\page.tsx`),{__esModule:i,$$typeof:r}=s,n=s.default},4669:(e,t,a)=>{"use strict";a.d(t,{x7:()=>ec,ZP:()=>em});var s,i=a(3729);let r={data:""},n=e=>e||r,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let a="",s="",i="";for(let r in e){let n=e[r];"@"==r[0]?"i"==r[1]?a=r+" "+n+";":s+="f"==r[1]?c(n,r):r+"{"+c(n,"k"==r[1]?"":t)+"}":"object"==typeof n?s+=c(n,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=n&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=c.p?c.p(r,n):r+":"+n+";")}return a+(t&&i?t+"{"+i+"}":i)+s},m={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e},p=(e,t,a,s,i)=>{let r=u(e),n=m[r]||(m[r]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(r));if(!m[n]){let t=r!==e?e:(e=>{let t,a,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(a=t[3].replace(d," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(d," ").trim();return s[0]})(e);m[n]=c(i?{["@keyframes "+n]:t}:t,a?"":"."+n)}let p=a&&m.g?m.g:null;return a&&(m.g=m[n]),((e,t,a,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(m[n],t,s,p),n},x=(e,t,a)=>e.reduce((e,s,i)=>{let r=t[i];if(r&&r.call){let e=r(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==r?"":r)},"");function h(e){let t=this||{},a=e.call?e(t.p):e;return p(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,n(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,f,b,v=h.bind({k:1});function y(e,t){let a=this||{};return function(){let s=arguments;function i(r,n){let o=Object.assign({},r),l=o.className||i.className;a.p=Object.assign({theme:f&&f()},o),a.o=/ *go\d+/.test(l),o.className=h.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),b&&d[0]&&b(o),g(d,o)}return t?t(i):i}}var j=e=>"function"==typeof e,k=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),w=(()=>{let e;return()=>e})(),P="default",M=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return M(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},S=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},D=(e,t=P)=>{C[t]=M(C[t]||A,e),S.forEach(([e,a])=>{e===t&&a(C[t])})},E=e=>Object.keys(C).forEach(t=>D(e,t)),L=e=>Object.keys(C).find(t=>C[t].toasts.some(t=>t.id===e)),R=(e=P)=>t=>{D(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={},t=P)=>{let[a,s]=(0,i.useState)(C[t]||A),r=(0,i.useRef)(C[t]);(0,i.useEffect)(()=>(r.current!==C[t]&&s(C[t]),S.push([t,s]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,s,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...a,toasts:n}},q=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||N()}),z=e=>(t,a)=>{let s=q(t,e,a);return R(s.toasterId||L(s.id))({type:2,toast:s}),s.id},B=(e,t)=>z("blank")(e,t);B.error=z("error"),B.success=z("success"),B.loading=z("loading"),B.custom=z("custom"),B.dismiss=(e,t)=>{let a={type:3,toastId:e};t?R(t)(a):E(a)},B.dismissAll=e=>B.dismiss(void 0,e),B.remove=(e,t)=>{let a={type:4,toastId:e};t?R(t)(a):E(a)},B.removeAll=e=>B.remove(void 0,e),B.promise=(e,t,a)=>{let s=B.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?k(t.success,e):void 0;return i?B.success(i,{id:s,...a,...null==a?void 0:a.success}):B.dismiss(s),e}).catch(e=>{let i=t.error?k(t.error,e):void 0;i?B.error(i,{id:s,...a,...null==a?void 0:a.error}):B.dismiss(s)}),e};var $=1e3,K=(e,t="default")=>{let{toasts:a,pausedAt:s}=O(e,t),r=(0,i.useRef)(new Map).current,n=(0,i.useCallback)((e,t=$)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),o({type:4,toastId:e})},t);r.set(e,a)},[]);(0,i.useEffect)(()=>{if(s)return;let e=Date.now(),i=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&B.dismiss(a.id);return}return setTimeout(()=>B.dismiss(a.id,t),s)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let o=(0,i.useCallback)(R(t),[t]),l=(0,i.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,i.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,i.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),m=(0,i.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:i=8,defaultPosition:r}=t||{},n=a.filter(t=>(t.position||r)===(e.position||r)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[a]);return(0,i.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}},T=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,_=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,W=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,G=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=v`
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
}`,V=y("div")`
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
    animation: ${J} 0.2s ease-out forwards;
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
`,Z=y("div")`
  position: absolute;
`,X=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Y=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?i.createElement(Q,null,t):t:"blank"===a?null:i.createElement(X,null,i.createElement(F,{...s}),"loading"!==a&&i.createElement(Z,null,"error"===a?i.createElement(W,{...s}):i.createElement(V,{...s})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=y("div")`
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
`,ei=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,er=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(a),ea(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=i.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?er(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(ee,{toast:e}),o=i.createElement(ei,{...e.ariaProps},k(e.message,e));return i.createElement(es,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:n,message:o}):i.createElement(i.Fragment,null,n,o))});s=i.createElement,c.p=void 0,g=s,f=void 0,b=void 0;var eo=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let n=i.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return i.createElement("div",{ref:n,className:t,style:a},r)},el=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:w()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=K(a,n);return i.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let n=a.position||t,o=el(n,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return i.createElement(eo,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ed:"",style:o},"custom"===a.type?k(a.message,a):r?r(a):i.createElement(en,{toast:a,position:n}))}))},em=B}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[7141,4192,2528],()=>a(5328));module.exports=s})();