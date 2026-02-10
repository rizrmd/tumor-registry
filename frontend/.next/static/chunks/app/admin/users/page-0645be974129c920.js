(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9674],{3059:function(e,t,a){Promise.resolve().then(a.bind(a,4882))},4882:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var s=a(7437),r=a(2265),n=a(6986),i=a(4894),l=a(9996);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,n.useAuth)(),[o,c]=(0,r.useState)([]),[d,u]=(0,r.useState)([]),[m,g]=(0,r.useState)([]),[p,x]=(0,r.useState)(!0),[h,f]=(0,r.useState)(""),[y,b]=(0,r.useState)("all"),[v,w]=(0,r.useState)("all"),[j,N]=(0,r.useState)("all"),[k,C]=(0,r.useState)(1),[S]=(0,r.useState)(10),[E,Z]=(0,r.useState)(!1),[I,P]=(0,r.useState)(!1),[A,D]=(0,r.useState)(null),[T,L]=(0,r.useState)({name:"",email:"",role:"Viewer",centerId:"",password:""}),[B,R]=(0,r.useState)([]);(0,r.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&($(),O())},[t,a]),(0,r.useEffect)(()=>{U()},[o,h,y,v,j]);let $=async()=>{try{x(!0);let e=(await l.Xv.fetchUsers()).map(e=>{var t;let a=e.userRoles.find(e=>e.isActive),s=(null==a?void 0:a.role.name)||"No Role";return{id:e.id,name:e.name,email:e.email,role:s,center:(null===(t=e.center)||void 0===t?void 0:t.name)||"-",centerId:e.centerId||"",status:e.isActive?"active":"inactive",lastLogin:e.lastLoginAt?new Date(e.lastLoginAt).toLocaleString("id-ID",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}):"-"}});c(e)}catch(e){console.error("Error fetching users:",e),alert("Gagal memuat data pengguna. Silakan coba lagi.")}finally{x(!1)}},O=async()=>{try{let e=(await l.eH.fetchCenters(!0)).map(e=>({id:e.id,name:e.name}));g(e)}catch(e){console.error("Error fetching centers:",e)}},U=()=>{let e=[...o];h&&(e=e.filter(e=>e.name.toLowerCase().includes(h.toLowerCase())||e.email.toLowerCase().includes(h.toLowerCase()))),"all"!==y&&(e=e.filter(e=>e.role===y)),"all"!==v&&(e=e.filter(e=>e.status===v)),"all"!==j&&(e=e.filter(e=>e.centerId===j)),u(e),C(1)},M=e=>{D(e),L({name:e.name,email:e.email,role:e.role,centerId:e.centerId,password:""}),P(!0)},_=e=>{c(o.map(t=>t.id===e?{...t,status:"active"===t.status?"inactive":"active"}:t))},z=e=>{R(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},q=e=>{switch(e){case"Admin":return"text-purple-600 bg-purple-100";case"Registrar":return"text-blue-600 bg-blue-100";case"Data Entry":return"text-green-600 bg-green-100";default:return"text-gray-600 bg-gray-100"}},V=e=>"active"===e?"text-green-600 bg-green-100":"text-red-600 bg-red-100",H=k*S,F=H-S,W=d.slice(F,H),X=Math.ceil(d.length/S);return a||p?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Memuat..."})]})}):t?(0,s.jsxs)(i.A,{children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Manajemen Pengguna"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Kelola pengguna sistem INAMSOS"})]}),(0,s.jsx)("button",{onClick:()=>{L({name:"",email:"",role:"Viewer",centerId:"",password:""}),Z(!0)},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"+ Tambah Pengguna"})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Cari"}),(0,s.jsx)("input",{type:"text",placeholder:"Nama atau email...",value:h,onChange:e=>f(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Role"}),(0,s.jsxs)("select",{value:y,onChange:e=>b(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"all",children:"Semua Role"}),(0,s.jsx)("option",{value:"Admin",children:"Admin"}),(0,s.jsx)("option",{value:"Registrar",children:"Registrar"}),(0,s.jsx)("option",{value:"Data Entry",children:"Data Entry"}),(0,s.jsx)("option",{value:"Viewer",children:"Viewer"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Status"}),(0,s.jsxs)("select",{value:v,onChange:e=>w(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"all",children:"Semua Status"}),(0,s.jsx)("option",{value:"active",children:"Aktif"}),(0,s.jsx)("option",{value:"inactive",children:"Tidak Aktif"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Pusat"}),(0,s.jsxs)("select",{value:j,onChange:e=>N(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"all",children:"Semua Pusat"}),m.map(e=>(0,s.jsx)("option",{value:e.id,children:e.name},e.id))]})]})]})}),B.length>0&&(0,s.jsx)("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4 mb-6",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("span",{className:"text-sm text-gray-700",children:[B.length," pengguna terpilih"]}),(0,s.jsxs)("div",{className:"space-x-2",children:[(0,s.jsx)("button",{onClick:()=>{c(o.map(e=>B.includes(e.id)?{...e,status:"active"}:e)),R([])},className:"px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700",children:"Aktifkan"}),(0,s.jsx)("button",{onClick:()=>{c(o.map(e=>B.includes(e.id)?{...e,status:"inactive"}:e)),R([])},className:"px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700",children:"Nonaktifkan"}),(0,s.jsx)("button",{onClick:()=>{console.log("Exporting users..."),alert("Ekspor data pengguna dimulai")},className:"px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700",children:"Ekspor"})]})]})}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left",children:(0,s.jsx)("input",{type:"checkbox",checked:B.length===W.length&&W.length>0,onChange:()=>{B.length===W.length?R([]):R(W.map(e=>e.id))},className:"rounded border-gray-300 text-green-600 focus:ring-green-500"})}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nama"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Email"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Role"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Pusat"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Login Terakhir"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:W.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4",children:(0,s.jsx)("input",{type:"checkbox",checked:B.includes(e.id),onChange:()=>z(e.id),className:"rounded border-gray-300 text-green-600 focus:ring-green-500"})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.name})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500",children:e.email})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-medium rounded-full ".concat(q(e.role)),children:e.role})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500",children:e.center})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("button",{onClick:()=>_(e.id),className:"px-2 py-1 text-xs font-medium rounded-full ".concat(V(e.status)," hover:opacity-80"),children:"active"===e.status?"Aktif":"Tidak Aktif"})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500",children:e.lastLogin})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,s.jsx)("button",{onClick:()=>M(e),className:"text-green-600 hover:text-green-900 font-medium",children:"Edit"})})]},e.id))})]})}),(0,s.jsx)("div",{className:"bg-white px-6 py-4 border-t border-gray-200",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"text-sm text-gray-700",children:["Menampilkan ",F+1," - ",Math.min(H,d.length)," dari"," ",d.length," pengguna"]}),(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("button",{onClick:()=>C(e=>Math.max(1,e-1)),disabled:1===k,className:"px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50",children:"Sebelumnya"}),Array.from({length:X},(e,t)=>t+1).map(e=>(0,s.jsx)("button",{onClick:()=>C(e),className:"px-3 py-1 border rounded text-sm ".concat(k===e?"bg-green-600 text-white border-green-600":"border-gray-300 hover:bg-gray-50"),children:e},e)),(0,s.jsx)("button",{onClick:()=>C(e=>Math.min(X,e+1)),disabled:k===X,className:"px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50",children:"Selanjutnya"})]})]})})]}),E&&(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,s.jsxs)("div",{className:"bg-white rounded-lg p-6 w-full max-w-md",children:[(0,s.jsx)("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Tambah Pengguna Baru"}),(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault();let t=m.find(e=>e.id===T.centerId),a={id:String(o.length+1),name:T.name,email:T.email,role:T.role,center:(null==t?void 0:t.name)||"",centerId:T.centerId,status:"active",lastLogin:"-"};c([...o,a]),Z(!1)},children:[(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Nama Lengkap ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",required:!0,value:T.name,onChange:e=>L({...T,name:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Email ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"email",required:!0,value:T.email,onChange:e=>L({...T,email:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Role ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsxs)("select",{required:!0,value:T.role,onChange:e=>L({...T,role:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"Admin",children:"Admin"}),(0,s.jsx)("option",{value:"Registrar",children:"Registrar"}),(0,s.jsx)("option",{value:"Data Entry",children:"Data Entry"}),(0,s.jsx)("option",{value:"Viewer",children:"Viewer"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Pusat ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsxs)("select",{required:!0,value:T.centerId,onChange:e=>L({...T,centerId:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"",children:"Pilih Pusat"}),m.map(e=>(0,s.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Password ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"password",required:!0,value:T.password,onChange:e=>L({...T,password:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})]}),(0,s.jsxs)("div",{className:"mt-6 flex space-x-3",children:[(0,s.jsx)("button",{type:"submit",className:"flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Tambah Pengguna"}),(0,s.jsx)("button",{type:"button",onClick:()=>Z(!1),className:"flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium",children:"Batal"})]})]})]})}),I&&A&&(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,s.jsxs)("div",{className:"bg-white rounded-lg p-6 w-full max-w-md",children:[(0,s.jsx)("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Edit Pengguna"}),(0,s.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),!A)return;let t=m.find(e=>e.id===T.centerId);c(o.map(e=>e.id===A.id?{...e,name:T.name,email:T.email,role:T.role,center:(null==t?void 0:t.name)||e.center,centerId:T.centerId}:e)),P(!1)},children:[(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Nama Lengkap ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",required:!0,value:T.name,onChange:e=>L({...T,name:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Email ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"email",required:!0,value:T.email,onChange:e=>L({...T,email:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Role ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsxs)("select",{required:!0,value:T.role,onChange:e=>L({...T,role:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"Admin",children:"Admin"}),(0,s.jsx)("option",{value:"Registrar",children:"Registrar"}),(0,s.jsx)("option",{value:"Data Entry",children:"Data Entry"}),(0,s.jsx)("option",{value:"Viewer",children:"Viewer"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Pusat ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsxs)("select",{required:!0,value:T.centerId,onChange:e=>L({...T,centerId:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"",children:"Pilih Pusat"}),m.map(e=>(0,s.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Password Baru (kosongkan jika tidak diubah)"}),(0,s.jsx)("input",{type:"password",value:T.password,onChange:e=>L({...T,password:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})]}),(0,s.jsxs)("div",{className:"mt-6 flex space-x-3",children:[(0,s.jsx)("button",{type:"submit",className:"flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Simpan Perubahan"}),(0,s.jsx)("button",{type:"button",onClick:()=>P(!1),className:"flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium",children:"Batal"})]})]})]})})]}):(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Mengarahkan ke login..."})]})})}},7911:function(e,t,a){"use strict";var s=a(6383);class r{async fetchCenters(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(await s.Z.get("/centers",{params:{includeInactive:e.toString()}})).data}async fetchCenterById(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(await s.Z.get("/centers/".concat(e),{params:{includeUsers:t.toString()}})).data}async fetchStatistics(){return(await s.Z.get("/centers/statistics")).data}async createCenter(e){return(await s.Z.post("/centers",e)).data}async updateCenter(e,t){return(await s.Z.put("/centers/".concat(e),t)).data}async activateCenter(e){return(await s.Z.put("/centers/".concat(e,"/activate"))).data}async deactivateCenter(e){return(await s.Z.put("/centers/".concat(e,"/deactivate"))).data}async deleteCenter(e){await s.Z.delete("/centers/".concat(e))}async getCenterUsers(e){return(await s.Z.get("/centers/".concat(e,"/users"))).data}}t.Z=new r},9996:function(e,t,a){"use strict";a.d(t,{eH:function(){return i.Z},S_:function(){return n},Xv:function(){return o}}),a(905),a(379);var s=a(6383);class r{async getCenters(e){return(await s.Z.get("/centers",{params:e})).data.data}async getCenterById(e){return(await s.Z.get("/centers/".concat(e))).data.data}async getPathologyTypes(){return(await s.Z.get("/pathology-types")).data.data}async getWhoBoneTumors(e){return(await s.Z.get("/who-classifications/bone",{params:e})).data}async getWhoBoneTumorById(e){return(await s.Z.get("/who-classifications/bone/".concat(e))).data}async getWhoSoftTissueTumors(e){return(await s.Z.get("/who-classifications/soft-tissue",{params:e})).data}async getWhoSoftTissueTumorById(e){return(await s.Z.get("/who-classifications/soft-tissue/".concat(e))).data}async getBoneLocations(e){return(await s.Z.get("/locations/bone",{params:e})).data}async getBoneLocationById(e){return(await s.Z.get("/locations/bone/".concat(e))).data}async getSoftTissueLocations(e){return(await s.Z.get("/locations/soft-tissue",{params:e})).data}async getSoftTissueLocationById(e){return(await s.Z.get("/locations/soft-tissue/".concat(e))).data}async getTumorSyndromes(){return(await s.Z.get("/tumor-syndromes")).data}async getTumorSyndromeById(e){return(await s.Z.get("/tumor-syndromes/".concat(e))).data}}var n=new r,i=a(7911);class l{async fetchUsers(){return(await s.Z.get("/users")).data}async fetchUserById(e){return(await s.Z.get("/users/".concat(e))).data}async fetchUsersByCenter(e){return(await s.Z.get("/users/center/".concat(e))).data}async createUser(e){return(await s.Z.post("/users",e)).data}async updateUser(e,t){return(await s.Z.patch("/users/".concat(e),t)).data}async changeUserRole(e,t){return(await s.Z.patch("/users/".concat(e,"/role"),t)).data}async toggleUserStatus(e,t){return(await s.Z.patch("/users/".concat(e,"/status"),t)).data}async deleteUser(e){await s.Z.delete("/users/".concat(e))}async activateUser(e){return this.toggleUserStatus(e,{isActive:!0})}async deactivateUser(e){return this.toggleUserStatus(e,{isActive:!1})}}var o=new l},379:function(e,t,a){"use strict";var s=a(6383);class r{async createPatient(e){return(await s.Z.post("/patients",e)).data.data}async getPatients(e){var t;let a=await s.Z.get("/patients",{params:e});return{data:a.data.patients||[],meta:a.data.pagination||{page:1,limit:50,total:(null===(t=a.data.patients)||void 0===t?void 0:t.length)||0,totalPages:1}}}async getPatientById(e){return(await s.Z.get("/patients/".concat(e))).data}async getPatientByMRN(e,t){return(await s.Z.get("/patients/mrn/".concat(e),{params:{centerId:t}})).data.data}async updatePatient(e,t){return(await s.Z.patch("/patients/".concat(e),t)).data.data}async deletePatient(e){await s.Z.delete("/patients/".concat(e))}async searchPatients(e,t){return(await s.Z.get("/patients/search",{params:{q:e,centerId:t}})).data.data}async getPatientStatistics(e){return(await s.Z.get("/patients/statistics",{params:{centerId:e}})).data.data}async exportPatients(e,t){return(await s.Z.get("/patients/export/".concat(e),{params:t,responseType:"blob"})).data}}t.Z=new r},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return em},ZP:function(){return eg}});var n,i=a(2265);let l={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",s="",r="";for(let n in e){let i=e[n];"@"==n[0]?"i"==n[1]?a=n+" "+i+";":s+="f"==n[1]?m(i,n):n+"{"+m(i,"k"==n[1]?"":t)+"}":"object"==typeof i?s+=m(i,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=i&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(n,i):n+":"+i+";")}return a+(t&&r?t+"{"+r+"}":r)+s},g={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e},x=(e,t,a,s,r)=>{var n;let i=p(e),l=g[i]||(g[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!g[l]){let t=i!==e?e:(e=>{let t,a,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);g[l]=m(r?{["@keyframes "+l]:t}:t,a?"":"."+l)}let o=a&&g.g?g.g:null;return a&&(g.g=g[l]),n=g[l],o?t.data=t.data.replace(o,n):-1===t.data.indexOf(n)&&(t.data=s?n+t.data:t.data+n),l},h=(e,t,a)=>e.reduce((e,s,r)=>{let n=t[r];if(n&&n.call){let e=n(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==n?"":n)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return x(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,w=f.bind({k:1});function j(e,t){let a=this||{};return function(){let s=arguments;function r(n,i){let l=Object.assign({},n),o=l.className||r.className;a.p=Object.assign({theme:b&&b()},l),a.o=/ *go\d+/.test(o),l.className=f.apply(a,s)+(o?" "+o:""),t&&(l.ref=i);let c=e;return e[0]&&(c=l.as||e,delete l.as),v&&c[0]&&v(l),y(c,l)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,C=(s=0,()=>(++s).toString()),S=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},E="default",Z=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return Z(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+n}))}}},I=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},D=(e,t=E)=>{A[t]=Z(A[t]||P,e),I.forEach(([e,a])=>{e===t&&a(A[t])})},T=e=>Object.keys(A).forEach(t=>D(e,t)),L=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),B=(e=E)=>t=>{D(t,e)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e={},t=E)=>{let[a,s]=(0,i.useState)(A[t]||P),r=(0,i.useRef)(A[t]);(0,i.useEffect)(()=>(r.current!==A[t]&&s(A[t]),I.push([t,s]),()=>{let e=I.findIndex(([e])=>e===t);e>-1&&I.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:n}},O=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),U=e=>(t,a)=>{let s=O(t,e,a);return B(s.toasterId||L(s.id))({type:2,toast:s}),s.id},M=(e,t)=>U("blank")(e,t);M.error=U("error"),M.success=U("success"),M.loading=U("loading"),M.custom=U("custom"),M.dismiss=(e,t)=>{let a={type:3,toastId:e};t?B(t)(a):T(a)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let a={type:4,toastId:e};t?B(t)(a):T(a)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,a)=>{let s=M.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?M.success(r,{id:s,...a,...null==a?void 0:a.success}):M.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?M.error(r,{id:s,...a,...null==a?void 0:a.error}):M.dismiss(s)}),e};var _=1e3,z=(e,t="default")=>{let{toasts:a,pausedAt:s}=$(e,t),r=(0,i.useRef)(new Map).current,n=(0,i.useCallback)((e,t=_)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),l({type:4,toastId:e})},t);r.set(e,a)},[]);(0,i.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&M.dismiss(a.id);return}return setTimeout(()=>M.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let l=(0,i.useCallback)(B(t),[t]),o=(0,i.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),c=(0,i.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),d=(0,i.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:n}=t||{},i=a.filter(t=>(t.position||n)===(e.position||n)&&t.height),l=i.findIndex(t=>t.id===e.id),o=i.filter((e,t)=>t<l&&e.visible).length;return i.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,i.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:c,startPause:o,endPause:d,calculateOffset:u}}},q=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,V=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,F=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,W=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,X=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
`,G=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=w`
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
}`,Y=j("div")`
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
    animation: ${K} 0.2s ease-out forwards;
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
`,J=j("div")`
  position: absolute;
`,Q=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?i.createElement(et,null,t):t:"blank"===a?null:i.createElement(Q,null,i.createElement(X,{...s}),"loading"!==a&&i.createElement(J,null,"error"===a?i.createElement(F,{...s}):i.createElement(Y,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,en=j("div")`
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
`,ei=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,el=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=S()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=i.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(ea,{toast:e}),l=i.createElement(ei,{...e.ariaProps},k(e.message,e));return i.createElement(en,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:n,message:l}):i.createElement(i.Fragment,null,n,l))});n=i.createElement,m.p=void 0,y=n,b=void 0,v=void 0;var ec=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let n=i.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return i.createElement("div",{ref:n,className:t,style:a},r)},ed=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:S()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:c,handlers:d}=z(a,n);return i.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let n=a.position||t,l=ed(n,d.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return i.createElement(ec,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?eu:"",style:l},"custom"===a.type?k(a.message,a):r?r(a):i.createElement(eo,{toast:a,position:n}))}))},eg=M}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=3059)}),_N_E=e.O()}]);