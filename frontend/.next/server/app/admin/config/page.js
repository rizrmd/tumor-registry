(()=>{var e={};e.id=37,e.ids=[37],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},5416:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c});var a=r(482),s=r(9108),n=r(2563),i=r.n(n),o=r(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["admin",{children:["config",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,5343)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\admin\\config\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],d=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\admin\\config\\page.tsx"],u="/admin/config/page",m={require:r,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/admin/config/page",pathname:"/admin/config",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},1580:(e,t,r)=>{Promise.resolve().then(r.bind(r,6313))},2254:(e,t,r)=>{e.exports=r(4767)},6313:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(2295),s=r(3729),n=r(3973),i=r(2528);function o(){let{user:e,isAuthenticated:t,isLoading:r}=(0,n.useAuth)(),[o,l]=(0,s.useState)(!0),[c,d]=(0,s.useState)("general"),[u,m]=(0,s.useState)(!1),[p,g]=(0,s.useState)([]),[x,h]=(0,s.useState)({systemName:"INAMSOS Tumor Registry",timezone:"Asia/Jakarta",language:"id",dateFormat:"DD/MM/YYYY"}),[b,f]=(0,s.useState)({minPasswordLength:8,requireUppercase:!0,requireLowercase:!0,requireNumbers:!0,requireSpecialChars:!0,sessionTimeout:30,mfaRequired:!1,maxLoginAttempts:5}),[y,v]=(0,s.useState)({smtpHost:"smtp.gmail.com",smtpPort:587,smtpUser:"noreply@inamsos.id",smtpPassword:"",smtpSecure:!0,fromEmail:"noreply@inamsos.id",fromName:"INAMSOS System"}),[j,k]=(0,s.useState)({autoBackup:!0,backupSchedule:"daily",backupTime:"02:00",retentionDays:30,includeFiles:!0,includeDatabase:!0}),[N,w]=(0,s.useState)({rateLimitEnabled:!0,requestsPerMinute:60,requestsPerHour:1e3});(0,s.useEffect)(()=>{if(!r&&!t){window.location.href="/login";return}t&&(P(),S())},[t,r]);let P=async()=>{try{l(!0)}catch(e){console.error("Error fetching config:",e)}finally{l(!1)}},S=async()=>{try{g([{id:"1",name:"Production API",key:"sk_live_xxxxxxxxxxxxxxxxxxx",createdAt:"2025-10-01",lastUsed:"2025-11-22 14:30",status:"active"},{id:"2",name:"Development API",key:"sk_dev_yyyyyyyyyyyyyyyyyy",createdAt:"2025-09-15",lastUsed:"2025-11-20 10:15",status:"active"}])}catch(e){console.error("Error fetching API keys:",e)}},C=async()=>{m(!0);try{console.log("Saving general config:",x),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi umum berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},A=async()=>{m(!0);try{console.log("Saving security config:",b),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi keamanan berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},M=async()=>{m(!0);try{console.log("Saving email config:",y),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi email berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},q=async()=>{m(!0);try{console.log("Saving backup config:",j),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi backup berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},D=async()=>{m(!0);try{console.log("Saving API config:",N),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi API berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},E=async()=>{try{console.log("Testing email connection..."),await new Promise(e=>setTimeout(e,1500)),alert("Koneksi email berhasil! Email test telah dikirim.")}catch(e){alert("Gagal menghubungkan ke server email")}},T=async()=>{try{console.log("Testing backup..."),await new Promise(e=>setTimeout(e,2e3)),alert("Backup berhasil! File backup disimpan.")}catch(e){alert("Gagal melakukan backup")}},I=e=>{g(p.map(t=>t.id===e?{...t,status:"active"===t.status?"inactive":"active"}:t))};return r||o?a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),a.jsx("p",{className:"mt-4 text-gray-600",children:"Memuat..."})]})}):t?(0,a.jsxs)(i.A,{children:[(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Konfigurasi Sistem"}),a.jsx("p",{className:"text-gray-600",children:"Kelola konfigurasi dan pengaturan sistem"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow mb-6",children:[a.jsx("div",{className:"border-b border-gray-200",children:(0,a.jsxs)("nav",{className:"flex -mb-px",children:[a.jsx("button",{onClick:()=>d("general"),className:`px-6 py-3 border-b-2 font-medium text-sm ${"general"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,children:"Umum"}),a.jsx("button",{onClick:()=>d("security"),className:`px-6 py-3 border-b-2 font-medium text-sm ${"security"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,children:"Keamanan"}),a.jsx("button",{onClick:()=>d("email"),className:`px-6 py-3 border-b-2 font-medium text-sm ${"email"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,children:"Email"}),a.jsx("button",{onClick:()=>d("backup"),className:`px-6 py-3 border-b-2 font-medium text-sm ${"backup"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,children:"Backup"}),a.jsx("button",{onClick:()=>d("api"),className:`px-6 py-3 border-b-2 font-medium text-sm ${"api"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,children:"API"})]})}),(0,a.jsxs)("div",{className:"p-6",children:["general"===c&&(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Nama Sistem"}),a.jsx("input",{type:"text",value:x.systemName,onChange:e=>h({...x,systemName:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Timezone"}),(0,a.jsxs)("select",{value:x.timezone,onChange:e=>h({...x,timezone:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[a.jsx("option",{value:"Asia/Jakarta",children:"Asia/Jakarta (WIB)"}),a.jsx("option",{value:"Asia/Makassar",children:"Asia/Makassar (WITA)"}),a.jsx("option",{value:"Asia/Jayapura",children:"Asia/Jayapura (WIT)"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Bahasa"}),(0,a.jsxs)("select",{value:x.language,onChange:e=>h({...x,language:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[a.jsx("option",{value:"id",children:"Indonesia"}),a.jsx("option",{value:"en",children:"English"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Format Tanggal"}),(0,a.jsxs)("select",{value:x.dateFormat,onChange:e=>h({...x,dateFormat:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[a.jsx("option",{value:"DD/MM/YYYY",children:"DD/MM/YYYY"}),a.jsx("option",{value:"MM/DD/YYYY",children:"MM/DD/YYYY"}),a.jsx("option",{value:"YYYY-MM-DD",children:"YYYY-MM-DD"})]})]}),a.jsx("div",{className:"pt-4",children:a.jsx("button",{onClick:C,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"})})]}),"security"===c&&(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Panjang Password Minimal"}),a.jsx("input",{type:"number",min:"6",max:"32",value:b.minPasswordLength,onChange:e=>f({...b,minPasswordLength:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{className:"space-y-3",children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Kebijakan Password"}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:b.requireUppercase,onChange:e=>f({...b,requireUppercase:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib huruf besar"})]}),(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:b.requireLowercase,onChange:e=>f({...b,requireLowercase:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib huruf kecil"})]}),(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:b.requireNumbers,onChange:e=>f({...b,requireNumbers:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib angka"})]}),(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:b.requireSpecialChars,onChange:e=>f({...b,requireSpecialChars:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib karakter khusus"})]})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Session Timeout (menit)"}),a.jsx("input",{type:"number",min:"5",max:"120",value:b.sessionTimeout,onChange:e=>f({...b,sessionTimeout:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Maksimal Percobaan Login"}),a.jsx("input",{type:"number",min:"3",max:"10",value:b.maxLoginAttempts,onChange:e=>f({...b,maxLoginAttempts:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),a.jsx("div",{children:(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:b.mfaRequired,onChange:e=>f({...b,mfaRequired:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Wajibkan Multi-Factor Authentication (MFA)"})]})}),a.jsx("div",{className:"pt-4",children:a.jsx("button",{onClick:A,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"})})]}),"email"===c&&(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Host"}),a.jsx("input",{type:"text",value:y.smtpHost,onChange:e=>v({...y,smtpHost:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Port"}),a.jsx("input",{type:"number",value:y.smtpPort,onChange:e=>v({...y,smtpPort:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Username"}),a.jsx("input",{type:"text",value:y.smtpUser,onChange:e=>v({...y,smtpUser:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Password"}),a.jsx("input",{type:"password",value:y.smtpPassword,onChange:e=>v({...y,smtpPassword:e.target.value}),placeholder:"Kosongkan jika tidak diubah",className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),a.jsx("div",{children:(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:y.smtpSecure,onChange:e=>v({...y,smtpSecure:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Gunakan TLS/SSL"})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"From Email"}),a.jsx("input",{type:"email",value:y.fromEmail,onChange:e=>v({...y,fromEmail:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"From Name"}),a.jsx("input",{type:"text",value:y.fromName,onChange:e=>v({...y,fromName:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})]}),(0,a.jsxs)("div",{className:"pt-4 flex space-x-3",children:[a.jsx("button",{onClick:M,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"}),a.jsx("button",{onClick:E,className:"px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium",children:"Test Koneksi"})]})]}),"backup"===c&&(0,a.jsxs)("div",{className:"space-y-6",children:[a.jsx("div",{children:(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:j.autoBackup,onChange:e=>k({...j,autoBackup:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Aktifkan Auto Backup"})]})}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Jadwal Backup"}),(0,a.jsxs)("select",{value:j.backupSchedule,onChange:e=>k({...j,backupSchedule:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[a.jsx("option",{value:"hourly",children:"Setiap Jam"}),a.jsx("option",{value:"daily",children:"Harian"}),a.jsx("option",{value:"weekly",children:"Mingguan"}),a.jsx("option",{value:"monthly",children:"Bulanan"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Waktu Backup"}),a.jsx("input",{type:"time",value:j.backupTime,onChange:e=>k({...j,backupTime:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Retensi (hari)"}),a.jsx("input",{type:"number",min:"7",max:"365",value:j.retentionDays,onChange:e=>k({...j,retentionDays:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:j.includeDatabase,onChange:e=>k({...j,includeDatabase:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Backup Database"})]}),(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:j.includeFiles,onChange:e=>k({...j,includeFiles:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Backup File"})]})]}),(0,a.jsxs)("div",{className:"pt-4 flex space-x-3",children:[a.jsx("button",{onClick:q,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"}),a.jsx("button",{onClick:T,className:"px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium",children:"Backup Sekarang"})]})]}),"api"===c&&(0,a.jsxs)("div",{className:"space-y-6",children:[a.jsx("div",{children:(0,a.jsxs)("label",{className:"flex items-center",children:[a.jsx("input",{type:"checkbox",checked:N.rateLimitEnabled,onChange:e=>w({...N,rateLimitEnabled:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),a.jsx("span",{className:"ml-2 text-sm text-gray-700",children:"Aktifkan Rate Limiting"})]})}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Request Per Menit"}),a.jsx("input",{type:"number",min:"10",max:"1000",value:N.requestsPerMinute,onChange:e=>w({...N,requestsPerMinute:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Request Per Jam"}),a.jsx("input",{type:"number",min:"100",max:"10000",value:N.requestsPerHour,onChange:e=>w({...N,requestsPerHour:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,a.jsxs)("div",{className:"pt-4 border-t border-gray-200",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"API Keys"}),a.jsx("button",{onClick:()=>{let e={id:String(p.length+1),name:"New API Key",key:"sk_"+Math.random().toString(36).substring(2,15),createdAt:new Date().toISOString().split("T")[0],lastUsed:"-",status:"active"};g([...p,e])},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm",children:"+ Generate Key"})]}),a.jsx("div",{className:"space-y-3",children:p.map(e=>(0,a.jsxs)("div",{className:"flex items-center justify-between p-4 border border-gray-200 rounded-lg",children:[(0,a.jsxs)("div",{className:"flex-1",children:[a.jsx("div",{className:"font-medium text-gray-900",children:e.name}),a.jsx("div",{className:"text-sm text-gray-500 font-mono",children:e.key}),(0,a.jsxs)("div",{className:"text-xs text-gray-400 mt-1",children:["Created: ",e.createdAt," | Last used: ",e.lastUsed]})]}),a.jsx("button",{onClick:()=>I(e.id),className:`px-3 py-1 text-xs font-medium rounded-full ${"active"===e.status?"text-green-600 bg-green-100":"text-red-600 bg-red-100"}`,children:"active"===e.status?"Aktif":"Tidak Aktif"})]},e.id))})]}),a.jsx("div",{className:"pt-4",children:a.jsx("button",{onClick:D,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"})})]})]})]})]}):a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),a.jsx("p",{className:"mt-4 text-gray-600",children:"Mengarahkan ke login..."})]})})}},5343:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>s,default:()=>i});let a=(0,r(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\admin\config\page.tsx`),{__esModule:s,$$typeof:n}=a,i=a.default},4669:(e,t,r)=>{"use strict";r.d(t,{x7:()=>ed,ZP:()=>eu});var a,s=r(3729);let n={data:""},i=e=>e||n,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let n in e){let i=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+i+";":a+="f"==n[1]?d(i,n):n+"{"+d(i,"k"==n[1]?"":t)+"}":"object"==typeof i?a+=d(i,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=i&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(n,i):n+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},u={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},p=(e,t,r,a,s)=>{let n=m(e),i=u[n]||(u[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!u[i]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(r=t[3].replace(c," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(c," ").trim();return a[0]})(e);u[i]=d(s?{["@keyframes "+i]:t}:t,r?"":"."+i)}let p=r&&u.g?u.g:null;return r&&(u.g=u[i]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(u[i],t,a,p),i},g=(e,t,r)=>e.reduce((e,a,s)=>{let n=t[s];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==n?"":n)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return p(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}x.bind({g:1});let h,b,f,y=x.bind({k:1});function v(e,t){let r=this||{};return function(){let a=arguments;function s(n,i){let o=Object.assign({},n),l=o.className||s.className;r.p=Object.assign({theme:b&&b()},o),r.o=/ *go\d+/.test(l),o.className=x.apply(r,a)+(l?" "+l:""),t&&(o.ref=i);let c=e;return e[0]&&(c=o.as||e,delete o.as),f&&c[0]&&f(o),h(c,o)}return t?t(s):s}}var j=e=>"function"==typeof e,k=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),w=(()=>{let e;return()=>e})(),P="default",S=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return S(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+n}))}}},C=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},M={},q=(e,t=P)=>{M[t]=S(M[t]||A,e),C.forEach(([e,r])=>{e===t&&r(M[t])})},D=e=>Object.keys(M).forEach(t=>q(e,t)),E=e=>Object.keys(M).find(t=>M[t].toasts.some(t=>t.id===e)),T=(e=P)=>t=>{q(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Y=(e={},t=P)=>{let[r,a]=(0,s.useState)(M[t]||A),n=(0,s.useRef)(M[t]);(0,s.useEffect)(()=>(n.current!==M[t]&&a(M[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:i}},$=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),L=e=>(t,r)=>{let a=$(t,e,r);return T(a.toasterId||E(a.id))({type:2,toast:a}),a.id},O=(e,t)=>L("blank")(e,t);O.error=L("error"),O.success=L("success"),O.loading=L("loading"),O.custom=L("custom"),O.dismiss=(e,t)=>{let r={type:3,toastId:e};t?T(t)(r):D(r)},O.dismissAll=e=>O.dismiss(void 0,e),O.remove=(e,t)=>{let r={type:4,toastId:e};t?T(t)(r):D(r)},O.removeAll=e=>O.remove(void 0,e),O.promise=(e,t,r)=>{let a=O.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?O.success(s,{id:a,...r,...null==r?void 0:r.success}):O.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?O.error(s,{id:a,...r,...null==r?void 0:r.error}):O.dismiss(a)}),e};var _=1e3,F=(e,t="default")=>{let{toasts:r,pausedAt:a}=Y(e,t),n=(0,s.useRef)(new Map).current,i=(0,s.useCallback)((e,t=_)=>{if(n.has(e))return;let r=setTimeout(()=>{n.delete(e),o({type:4,toastId:e})},t);n.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&O.dismiss(r.id);return}return setTimeout(()=>O.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,s.useCallback)(T(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,s.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:n}=t||{},i=r.filter(t=>(t.position||n)===(e.position||n)&&t.height),o=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<o&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=n.get(e.id);t&&(clearTimeout(t),n.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},R=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,K=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
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
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,G=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,H=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=y`
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
}`,J=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,Z=v("div")`
  position: absolute;
`,X=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(V,null,t):t:"blank"===r?null:s.createElement(X,null,s.createElement(G,{...a}),"loading"!==r&&s.createElement(Z,null,"error"===r?s.createElement(K,{...a}):s.createElement(J,{...a})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=v("div")`
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
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(r),er(r)];return{animation:t?`${y(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=s.memo(({toast:e,position:t,style:r,children:a})=>{let n=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=s.createElement(ee,{toast:e}),o=s.createElement(es,{...e.ariaProps},k(e.message,e));return s.createElement(ea,{className:e.className,style:{...n,...r,...e.style}},"function"==typeof a?a({icon:i,message:o}):s.createElement(s.Fragment,null,i,o))});a=s.createElement,d.p=void 0,h=a,b=void 0,f=void 0;var eo=({id:e,className:t,style:r,onHeightUpdate:a,children:n})=>{let i=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:i,className:t,style:r},n)},el=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:w()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ec=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:n,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=F(r,i);return s.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let i=r.position||t,o=el(i,d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return s.createElement(eo,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?ec:"",style:o},"custom"===r.type?k(r.message,r):n?n(r):s.createElement(ei,{toast:r,position:i}))}))},eu=O}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[7141,4192,2528],()=>r(5416));module.exports=a})();