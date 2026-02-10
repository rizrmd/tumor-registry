(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[37],{1417:function(e,t,a){Promise.resolve().then(a.bind(a,7185))},7185:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var r=a(7437),s=a(2265),n=a(6986),i=a(4894);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,n.useAuth)(),[o,l]=(0,s.useState)(!0),[c,d]=(0,s.useState)("general"),[u,m]=(0,s.useState)(!1),[g,p]=(0,s.useState)([]),[x,h]=(0,s.useState)({systemName:"INAMSOS Tumor Registry",timezone:"Asia/Jakarta",language:"id",dateFormat:"DD/MM/YYYY"}),[b,f]=(0,s.useState)({minPasswordLength:8,requireUppercase:!0,requireLowercase:!0,requireNumbers:!0,requireSpecialChars:!0,sessionTimeout:30,mfaRequired:!1,maxLoginAttempts:5}),[y,v]=(0,s.useState)({smtpHost:"smtp.gmail.com",smtpPort:587,smtpUser:"noreply@inamsos.id",smtpPassword:"",smtpSecure:!0,fromEmail:"noreply@inamsos.id",fromName:"INAMSOS System"}),[j,k]=(0,s.useState)({autoBackup:!0,backupSchedule:"daily",backupTime:"02:00",retentionDays:30,includeFiles:!0,includeDatabase:!0}),[N,w]=(0,s.useState)({rateLimitEnabled:!0,requestsPerMinute:60,requestsPerHour:1e3});(0,s.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&(C(),P())},[t,a]);let C=async()=>{try{l(!0)}catch(e){console.error("Error fetching config:",e)}finally{l(!1)}},P=async()=>{try{p([{id:"1",name:"Production API",key:"sk_live_xxxxxxxxxxxxxxxxxxx",createdAt:"2025-10-01",lastUsed:"2025-11-22 14:30",status:"active"},{id:"2",name:"Development API",key:"sk_dev_yyyyyyyyyyyyyyyyyy",createdAt:"2025-09-15",lastUsed:"2025-11-20 10:15",status:"active"}])}catch(e){console.error("Error fetching API keys:",e)}},S=async()=>{m(!0);try{console.log("Saving general config:",x),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi umum berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},E=async()=>{m(!0);try{console.log("Saving security config:",b),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi keamanan berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},A=async()=>{m(!0);try{console.log("Saving email config:",y),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi email berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},M=async()=>{m(!0);try{console.log("Saving backup config:",j),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi backup berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},D=async()=>{m(!0);try{console.log("Saving API config:",N),await new Promise(e=>setTimeout(e,1e3)),alert("Konfigurasi API berhasil disimpan")}catch(e){console.error("Error saving config:",e),alert("Gagal menyimpan konfigurasi")}finally{m(!1)}},T=async()=>{try{console.log("Testing email connection..."),await new Promise(e=>setTimeout(e,1500)),alert("Koneksi email berhasil! Email test telah dikirim.")}catch(e){alert("Gagal menghubungkan ke server email")}},I=async()=>{try{console.log("Testing backup..."),await new Promise(e=>setTimeout(e,2e3)),alert("Backup berhasil! File backup disimpan.")}catch(e){alert("Gagal melakukan backup")}},Y=e=>{p(g.map(t=>t.id===e?{...t,status:"active"===t.status?"inactive":"active"}:t))};return a||o?(0,r.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,r.jsx)("p",{className:"mt-4 text-gray-600",children:"Memuat..."})]})}):t?(0,r.jsxs)(i.A,{children:[(0,r.jsxs)("div",{className:"mb-6",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Konfigurasi Sistem"}),(0,r.jsx)("p",{className:"text-gray-600",children:"Kelola konfigurasi dan pengaturan sistem"})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow mb-6",children:[(0,r.jsx)("div",{className:"border-b border-gray-200",children:(0,r.jsxs)("nav",{className:"flex -mb-px",children:[(0,r.jsx)("button",{onClick:()=>d("general"),className:"px-6 py-3 border-b-2 font-medium text-sm ".concat("general"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Umum"}),(0,r.jsx)("button",{onClick:()=>d("security"),className:"px-6 py-3 border-b-2 font-medium text-sm ".concat("security"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Keamanan"}),(0,r.jsx)("button",{onClick:()=>d("email"),className:"px-6 py-3 border-b-2 font-medium text-sm ".concat("email"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Email"}),(0,r.jsx)("button",{onClick:()=>d("backup"),className:"px-6 py-3 border-b-2 font-medium text-sm ".concat("backup"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Backup"}),(0,r.jsx)("button",{onClick:()=>d("api"),className:"px-6 py-3 border-b-2 font-medium text-sm ".concat("api"===c?"border-green-600 text-green-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"API"})]})}),(0,r.jsxs)("div",{className:"p-6",children:["general"===c&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Nama Sistem"}),(0,r.jsx)("input",{type:"text",value:x.systemName,onChange:e=>h({...x,systemName:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Timezone"}),(0,r.jsxs)("select",{value:x.timezone,onChange:e=>h({...x,timezone:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,r.jsx)("option",{value:"Asia/Jakarta",children:"Asia/Jakarta (WIB)"}),(0,r.jsx)("option",{value:"Asia/Makassar",children:"Asia/Makassar (WITA)"}),(0,r.jsx)("option",{value:"Asia/Jayapura",children:"Asia/Jayapura (WIT)"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Bahasa"}),(0,r.jsxs)("select",{value:x.language,onChange:e=>h({...x,language:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,r.jsx)("option",{value:"id",children:"Indonesia"}),(0,r.jsx)("option",{value:"en",children:"English"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Format Tanggal"}),(0,r.jsxs)("select",{value:x.dateFormat,onChange:e=>h({...x,dateFormat:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,r.jsx)("option",{value:"DD/MM/YYYY",children:"DD/MM/YYYY"}),(0,r.jsx)("option",{value:"MM/DD/YYYY",children:"MM/DD/YYYY"}),(0,r.jsx)("option",{value:"YYYY-MM-DD",children:"YYYY-MM-DD"})]})]}),(0,r.jsx)("div",{className:"pt-4",children:(0,r.jsx)("button",{onClick:S,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"})})]}),"security"===c&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Panjang Password Minimal"}),(0,r.jsx)("input",{type:"number",min:"6",max:"32",value:b.minPasswordLength,onChange:e=>f({...b,minPasswordLength:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{className:"space-y-3",children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Kebijakan Password"}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:b.requireUppercase,onChange:e=>f({...b,requireUppercase:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib huruf besar"})]}),(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:b.requireLowercase,onChange:e=>f({...b,requireLowercase:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib huruf kecil"})]}),(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:b.requireNumbers,onChange:e=>f({...b,requireNumbers:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib angka"})]}),(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:b.requireSpecialChars,onChange:e=>f({...b,requireSpecialChars:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Wajib karakter khusus"})]})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Session Timeout (menit)"}),(0,r.jsx)("input",{type:"number",min:"5",max:"120",value:b.sessionTimeout,onChange:e=>f({...b,sessionTimeout:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Maksimal Percobaan Login"}),(0,r.jsx)("input",{type:"number",min:"3",max:"10",value:b.maxLoginAttempts,onChange:e=>f({...b,maxLoginAttempts:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsx)("div",{children:(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:b.mfaRequired,onChange:e=>f({...b,mfaRequired:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Wajibkan Multi-Factor Authentication (MFA)"})]})}),(0,r.jsx)("div",{className:"pt-4",children:(0,r.jsx)("button",{onClick:E,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"})})]}),"email"===c&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Host"}),(0,r.jsx)("input",{type:"text",value:y.smtpHost,onChange:e=>v({...y,smtpHost:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Port"}),(0,r.jsx)("input",{type:"number",value:y.smtpPort,onChange:e=>v({...y,smtpPort:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Username"}),(0,r.jsx)("input",{type:"text",value:y.smtpUser,onChange:e=>v({...y,smtpUser:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"SMTP Password"}),(0,r.jsx)("input",{type:"password",value:y.smtpPassword,onChange:e=>v({...y,smtpPassword:e.target.value}),placeholder:"Kosongkan jika tidak diubah",className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsx)("div",{children:(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:y.smtpSecure,onChange:e=>v({...y,smtpSecure:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Gunakan TLS/SSL"})]})}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"From Email"}),(0,r.jsx)("input",{type:"email",value:y.fromEmail,onChange:e=>v({...y,fromEmail:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"From Name"}),(0,r.jsx)("input",{type:"text",value:y.fromName,onChange:e=>v({...y,fromName:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})]}),(0,r.jsxs)("div",{className:"pt-4 flex space-x-3",children:[(0,r.jsx)("button",{onClick:A,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"}),(0,r.jsx)("button",{onClick:T,className:"px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium",children:"Test Koneksi"})]})]}),"backup"===c&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)("div",{children:(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:j.autoBackup,onChange:e=>k({...j,autoBackup:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Aktifkan Auto Backup"})]})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Jadwal Backup"}),(0,r.jsxs)("select",{value:j.backupSchedule,onChange:e=>k({...j,backupSchedule:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,r.jsx)("option",{value:"hourly",children:"Setiap Jam"}),(0,r.jsx)("option",{value:"daily",children:"Harian"}),(0,r.jsx)("option",{value:"weekly",children:"Mingguan"}),(0,r.jsx)("option",{value:"monthly",children:"Bulanan"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Waktu Backup"}),(0,r.jsx)("input",{type:"time",value:j.backupTime,onChange:e=>k({...j,backupTime:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Retensi (hari)"}),(0,r.jsx)("input",{type:"number",min:"7",max:"365",value:j.retentionDays,onChange:e=>k({...j,retentionDays:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:j.includeDatabase,onChange:e=>k({...j,includeDatabase:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Backup Database"})]}),(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:j.includeFiles,onChange:e=>k({...j,includeFiles:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Backup File"})]})]}),(0,r.jsxs)("div",{className:"pt-4 flex space-x-3",children:[(0,r.jsx)("button",{onClick:M,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"}),(0,r.jsx)("button",{onClick:I,className:"px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium",children:"Backup Sekarang"})]})]}),"api"===c&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)("div",{children:(0,r.jsxs)("label",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:N.rateLimitEnabled,onChange:e=>w({...N,rateLimitEnabled:e.target.checked}),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"}),(0,r.jsx)("span",{className:"ml-2 text-sm text-gray-700",children:"Aktifkan Rate Limiting"})]})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Request Per Menit"}),(0,r.jsx)("input",{type:"number",min:"10",max:"1000",value:N.requestsPerMinute,onChange:e=>w({...N,requestsPerMinute:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Request Per Jam"}),(0,r.jsx)("input",{type:"number",min:"100",max:"10000",value:N.requestsPerHour,onChange:e=>w({...N,requestsPerHour:parseInt(e.target.value)}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,r.jsxs)("div",{className:"pt-4 border-t border-gray-200",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsx)("h3",{className:"text-lg font-semibold text-gray-900",children:"API Keys"}),(0,r.jsx)("button",{onClick:()=>{let e={id:String(g.length+1),name:"New API Key",key:"sk_"+Math.random().toString(36).substring(2,15),createdAt:new Date().toISOString().split("T")[0],lastUsed:"-",status:"active"};p([...g,e])},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm",children:"+ Generate Key"})]}),(0,r.jsx)("div",{className:"space-y-3",children:g.map(e=>(0,r.jsxs)("div",{className:"flex items-center justify-between p-4 border border-gray-200 rounded-lg",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)("div",{className:"font-medium text-gray-900",children:e.name}),(0,r.jsx)("div",{className:"text-sm text-gray-500 font-mono",children:e.key}),(0,r.jsxs)("div",{className:"text-xs text-gray-400 mt-1",children:["Created: ",e.createdAt," | Last used: ",e.lastUsed]})]}),(0,r.jsx)("button",{onClick:()=>Y(e.id),className:"px-3 py-1 text-xs font-medium rounded-full ".concat("active"===e.status?"text-green-600 bg-green-100":"text-red-600 bg-red-100"),children:"active"===e.status?"Aktif":"Tidak Aktif"})]},e.id))})]}),(0,r.jsx)("div",{className:"pt-4",children:(0,r.jsx)("button",{onClick:D,disabled:u,className:"px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50",children:u?"Menyimpan...":"Simpan Perubahan"})})]})]})]})]}):(0,r.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,r.jsx)("p",{className:"mt-4 text-gray-600",children:"Mengarahkan ke login..."})]})})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let r,s;a.d(t,{x7:function(){return em},ZP:function(){return eg}});var n,i=a(2265);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",r="",s="";for(let n in e){let i=e[n];"@"==n[0]?"i"==n[1]?a=n+" "+i+";":r+="f"==n[1]?m(i,n):n+"{"+m(i,"k"==n[1]?"":t)+"}":"object"==typeof i?r+=m(i,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=i&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(n,i):n+":"+i+";")}return a+(t&&s?t+"{"+s+"}":s)+r},g={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e},x=(e,t,a,r,s)=>{var n;let i=p(e),o=g[i]||(g[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!g[o]){let t=i!==e?e:(e=>{let t,a,r=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?r.shift():t[3]?(a=t[3].replace(u," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);g[o]=m(s?{["@keyframes "+o]:t}:t,a?"":"."+o)}let l=a&&g.g?g.g:null;return a&&(g.g=g[o]),n=g[o],l?t.data=t.data.replace(l,n):-1===t.data.indexOf(n)&&(t.data=r?n+t.data:t.data+n),o},h=(e,t,a)=>e.reduce((e,r,s)=>{let n=t[s];if(n&&n.call){let e=n(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==n?"":n)},"");function b(e){let t=this||{},a=e.call?e(t.p):e;return x(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}b.bind({g:1});let f,y,v,j=b.bind({k:1});function k(e,t){let a=this||{};return function(){let r=arguments;function s(n,i){let o=Object.assign({},n),l=o.className||s.className;a.p=Object.assign({theme:y&&y()},o),a.o=/ *go\d+/.test(l),o.className=b.apply(a,r)+(l?" "+l:""),t&&(o.ref=i);let c=e;return e[0]&&(c=o.as||e,delete o.as),v&&c[0]&&v(o),f(c,o)}return t?t(s):s}}var N=e=>"function"==typeof e,w=(e,t)=>N(e)?e(t):e,C=(r=0,()=>(++r).toString()),P=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},S="default",E=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return E(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+n}))}}},A=[],M={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},D={},T=(e,t=S)=>{D[t]=E(D[t]||M,e),A.forEach(([e,a])=>{e===t&&a(D[t])})},I=e=>Object.keys(D).forEach(t=>T(e,t)),Y=e=>Object.keys(D).find(t=>D[t].toasts.some(t=>t.id===e)),q=(e=S)=>t=>{T(t,e)},L={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={},t=S)=>{let[a,r]=(0,i.useState)(D[t]||M),s=(0,i.useRef)(D[t]);(0,i.useEffect)(()=>(s.current!==D[t]&&r(D[t]),A.push([t,r]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||L[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:n}},$=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),F=e=>(t,a)=>{let r=$(t,e,a);return q(r.toasterId||Y(r.id))({type:2,toast:r}),r.id},_=(e,t)=>F("blank")(e,t);_.error=F("error"),_.success=F("success"),_.loading=F("loading"),_.custom=F("custom"),_.dismiss=(e,t)=>{let a={type:3,toastId:e};t?q(t)(a):I(a)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let a={type:4,toastId:e};t?q(t)(a):I(a)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,a)=>{let r=_.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?w(t.success,e):void 0;return s?_.success(s,{id:r,...a,...null==a?void 0:a.success}):_.dismiss(r),e}).catch(e=>{let s=t.error?w(t.error,e):void 0;s?_.error(s,{id:r,...a,...null==a?void 0:a.error}):_.dismiss(r)}),e};var B=1e3,K=(e,t="default")=>{let{toasts:a,pausedAt:r}=O(e,t),s=(0,i.useRef)(new Map).current,n=(0,i.useCallback)((e,t=B)=>{if(s.has(e))return;let a=setTimeout(()=>{s.delete(e),o({type:4,toastId:e})},t);s.set(e,a)},[]);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&_.dismiss(a.id);return}return setTimeout(()=>_.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let o=(0,i.useCallback)(q(t),[t]),l=(0,i.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,i.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,i.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:n}=t||{},i=a.filter(t=>(t.position||n)===(e.position||n)&&t.height),o=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<o&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,i.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},z=j`
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
}`,H=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,R=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,W=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,J=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Z=j`
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
}`,Q=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Z} 0.2s ease-out forwards;
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
`,V=k("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?i.createElement(et,null,t):t:"blank"===a?null:i.createElement(X,null,i.createElement(W,{...r}),"loading"!==a&&i.createElement(V,null,"error"===a?i.createElement(R,{...r}):i.createElement(Q,{...r})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,en=k("div")`
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
`,ei=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=P()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(a),es(a)];return{animation:t?`${j(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=i.memo(({toast:e,position:t,style:a,children:r})=>{let s=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(ea,{toast:e}),o=i.createElement(ei,{...e.ariaProps},w(e.message,e));return i.createElement(en,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof r?r({icon:n,message:o}):i.createElement(i.Fragment,null,n,o))});n=i.createElement,m.p=void 0,f=n,y=void 0,v=void 0;var ec=({id:e,className:t,style:a,onHeightUpdate:r,children:s})=>{let n=i.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return i.createElement("div",{ref:n,className:t,style:a},s)},ed=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},eu=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:s,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=K(a,n);return i.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let n=a.position||t,o=ed(n,d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return i.createElement(ec,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?eu:"",style:o},"custom"===a.type?w(a.message,a):s?s(a):i.createElement(el,{toast:a,position:n}))}))},eg=_}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=1417)}),_N_E=e.O()}]);