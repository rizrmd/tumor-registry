(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[606],{3691:function(e,t,s){Promise.resolve().then(s.bind(s,8513))},8513:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return d}});var a=s(7437),r=s(2265),i=s(4033),n=s(6986),l=s(4894),o=s(833);function d(){let e=(0,i.useRouter)(),{user:t,isAuthenticated:s,isLoading:d}=(0,n.useAuth)(),[c,u]=(0,r.useState)([]),[m,p]=(0,r.useState)([]),[x,h]=(0,r.useState)(""),[g,f]=(0,r.useState)(!0),[y,b]=(0,r.useState)(!1),[v,j]=(0,r.useState)(null);(0,r.useEffect)(()=>{if(!d&&!s){window.location.href="/login";return}s&&w()},[s,d]),(0,r.useEffect)(()=>{x?p(c.filter(e=>e.status===x)):p(c)},[x,c]);let w=async()=>{try{f(!0);let e=(await o.Z.findAll()).map(e=>({id:e.requestNumber||e.id,title:e.title,requestedDate:e.submittedAt?new Date(e.submittedAt).toISOString().split("T")[0]:new Date(e.createdAt).toISOString().split("T")[0],status:N(e.status),dataType:"Anonymized",purpose:e.objectives||"",justification:e.researchAbstract||"",datasetDescription:Object.keys(e.requestedDataFields||{}).filter(t=>{var s;return null===(s=e.requestedDataFields[t])||void 0===s?void 0:s.selected}).join(", "),timeline:"".concat(e.accessDurationMonths||0," months"),reviewerNotes:e.adminNotes}));u(e),p(e)}catch(e){console.error("Error fetching requests:",e)}finally{f(!1)}},N=e=>({DRAFT:"Draft",SUBMITTED:"Submitted",PENDING_REVIEW:"Under Review",UNDER_REVIEW:"Under Review",NEED_MORE_INFO:"Under Review",APPROVED:"Approved",APPROVED_WITH_CONDITIONS:"Approved",REJECTED:"Rejected",DATA_READY:"Approved",ACTIVE:"In Progress",COMPLETED:"Completed",EXPIRED:"Completed"})[e]||"Submitted",k=e=>{switch(e){case"Draft":default:return"bg-gray-100 text-gray-800";case"Submitted":return"bg-blue-100 text-blue-800";case"Under Review":return"bg-yellow-100 text-yellow-800";case"Approved":return"bg-green-100 text-green-800";case"Rejected":return"bg-red-100 text-red-800";case"In Progress":return"bg-purple-100 text-purple-800";case"Completed":return"bg-teal-100 text-teal-800"}},D=e=>{switch(e){case"Aggregate":return"bg-blue-50 text-blue-700";case"Anonymized":return"bg-green-50 text-green-700";case"Identified":return"bg-orange-50 text-orange-700";default:return"bg-gray-50 text-gray-700"}},E=e=>{j(e),b(!0)},C=e=>{u(t=>t.map(t=>t.id===e?{...t,status:"Submitted"}:t)),alert("Permintaan berhasil diajukan untuk review")},A=e=>{confirm("Apakah Anda yakin ingin membatalkan permintaan ini?")&&(u(t=>t.filter(t=>t.id!==e)),alert("Permintaan dibatalkan"))},S=e=>{alert("Mengunduh data untuk permintaan ".concat(e,"...\nFitur download akan segera diimplementasikan."))};return d||g?(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):s?(0,a.jsxs)(l.A,{children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Permintaan Data Penelitian"}),(0,a.jsx)("p",{className:"text-gray-600",children:"Kelola permintaan akses data untuk penelitian"})]}),(0,a.jsx)("button",{onClick:()=>{e.push("/research/requests/new")},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"+ Permintaan Baru"})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Permintaan"}),(0,a.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:c.length})]})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-yellow-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-yellow-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Dalam Review"}),(0,a.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:c.filter(e=>"Under Review"===e.status||"Submitted"===e.status).length})]})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Disetujui"}),(0,a.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:c.filter(e=>"Approved"===e.status).length})]})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 bg-teal-100 rounded-lg",children:(0,a.jsx)("svg",{className:"h-6 w-6 text-teal-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})})}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Selesai"}),(0,a.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:c.filter(e=>"Completed"===e.status).length})]})]})})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-4 mb-6",children:(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,a.jsx)("label",{className:"text-sm font-medium text-gray-700",children:"Filter Status:"}),(0,a.jsxs)("select",{value:x,onChange:e=>h(e.target.value),className:"px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,a.jsx)("option",{value:"",children:"Semua Status"}),(0,a.jsx)("option",{value:"Draft",children:"Draft"}),(0,a.jsx)("option",{value:"Submitted",children:"Submitted"}),(0,a.jsx)("option",{value:"Under Review",children:"Under Review"}),(0,a.jsx)("option",{value:"Approved",children:"Approved"}),(0,a.jsx)("option",{value:"Rejected",children:"Rejected"}),(0,a.jsx)("option",{value:"In Progress",children:"In Progress"}),(0,a.jsx)("option",{value:"Completed",children:"Completed"})]}),x&&(0,a.jsx)("button",{onClick:()=>h(""),className:"text-sm text-red-600 hover:text-red-700 font-medium",children:"Reset Filter"})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,a.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Permintaan Saya (",m.length,")"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Request ID"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Judul"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tanggal"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tipe Data"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tujuan"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:m.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.id})}),(0,a.jsx)("td",{className:"px-6 py-4",children:(0,a.jsx)("div",{className:"text-sm text-gray-900 max-w-xs truncate",children:e.title})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-500",children:e.requestedDate})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-medium rounded-full ".concat(k(e.status)),children:e.status})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-medium rounded ".concat(D(e.dataType)),children:e.dataType})}),(0,a.jsx)("td",{className:"px-6 py-4",children:(0,a.jsx)("div",{className:"text-sm text-gray-500 max-w-xs truncate",children:e.purpose})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,a.jsxs)("div",{className:"flex space-x-2",children:[(0,a.jsx)("button",{onClick:()=>E(e),className:"text-blue-600 hover:text-blue-900 font-medium",children:"Detail"}),"Draft"===e.status&&(0,a.jsx)("button",{onClick:()=>C(e.id),className:"text-purple-600 hover:text-purple-900 font-medium",children:"Submit"}),("Draft"===e.status||"Submitted"===e.status)&&(0,a.jsx)("button",{onClick:()=>A(e.id),className:"text-red-600 hover:text-red-900 font-medium",children:"Batal"}),("Approved"===e.status||"Completed"===e.status)&&(0,a.jsx)("button",{onClick:()=>S(e.id),className:"text-green-600 hover:text-green-900 font-medium",children:"Download"})]})})]},e.id))})]})}),0===m.length&&(0,a.jsxs)("div",{className:"text-center py-12",children:[(0,a.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),(0,a.jsx)("p",{className:"mt-4 text-gray-500",children:"Tidak ada permintaan yang sesuai dengan filter"})]})]}),y&&v&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,a.jsx)("div",{className:"bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto",children:(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,a.jsx)("h2",{className:"text-xl font-bold text-gray-900",children:"Detail Permintaan"}),(0,a.jsx)("button",{onClick:()=>b(!1),className:"text-gray-400 hover:text-gray-600",children:(0,a.jsx)("svg",{className:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Request ID"}),(0,a.jsx)("p",{className:"mt-1 text-gray-900 font-medium",children:v.id})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Judul"}),(0,a.jsx)("p",{className:"mt-1 text-gray-900",children:v.title})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Tanggal Permintaan"}),(0,a.jsx)("p",{className:"mt-1 text-gray-900",children:v.requestedDate})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Status"}),(0,a.jsx)("span",{className:"inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ".concat(k(v.status)),children:v.status})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Tipe Data"}),(0,a.jsx)("span",{className:"inline-block mt-1 px-2 py-1 text-xs font-medium rounded ".concat(D(v.dataType)),children:v.dataType})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Tujuan Penelitian"}),(0,a.jsx)("p",{className:"mt-1 text-gray-900",children:v.purpose})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Justifikasi"}),(0,a.jsx)("p",{className:"mt-1 text-gray-900",children:v.justification})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Deskripsi Dataset"}),(0,a.jsx)("p",{className:"mt-1 text-gray-900",children:v.datasetDescription})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-500",children:"Timeline"}),(0,a.jsx)("p",{className:"mt-1 text-gray-900",children:v.timeline})]}),v.reviewerNotes&&(0,a.jsxs)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-blue-900",children:"Catatan Reviewer"}),(0,a.jsx)("p",{className:"mt-1 text-blue-800",children:v.reviewerNotes})]})]}),(0,a.jsx)("div",{className:"flex justify-end mt-6",children:(0,a.jsx)("button",{onClick:()=>b(!1),className:"px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium",children:"Tutup"})})]})})})]}):(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},833:function(e,t,s){"use strict";var a=s(6383);class r{async create(e){return(await a.Z.post("/research-requests",e)).data}async update(e,t){return(await a.Z.patch("/research-requests/".concat(e),t)).data}async submit(e){return(await a.Z.post("/research-requests/".concat(e,"/submit"))).data}async getAll(e){return(await a.Z.get("/research-requests",{params:e})).data}async findAll(e){return this.getAll(e)}async getPending(){return(await a.Z.get("/research-requests/pending")).data}async estimatePatients(e){return(await a.Z.post("/research-requests/estimate",e)).data}async getOne(e){return(await a.Z.get("/research-requests/".concat(e))).data}async approveOrReject(e,t){return(await a.Z.post("/research-requests/".concat(e,"/approve"),t)).data}async delete(e){await a.Z.delete("/research-requests/".concat(e))}getPresetDataFields(e){return({basic_research:{demographics:{selected:!0,justification:"Basic demographics for patient characterization",subFields:{age:!0,gender:!0,region:!0}},diagnosisClassification:{selected:!0,justification:"Diagnosis and classification for tumor type analysis"},stagingData:{selected:!0,justification:"Staging data for disease severity assessment"}},outcome_study:{diagnosisClassification:{selected:!0,justification:"Diagnosis for outcome stratification"},stagingData:{selected:!0,justification:"Staging for baseline disease severity"},treatmentManagement:{selected:!0,justification:"Treatment details for outcome correlation"},followUpOutcomes:{selected:!0,justification:"Follow-up data and MSTS scores for outcome measurement"}},survival_analysis:{demographics:{selected:!0,justification:"Age and demographics as survival predictors",subFields:{age:!0,gender:!0}},diagnosisClassification:{selected:!0,justification:"Tumor type and grade for survival analysis"},stagingData:{selected:!0,justification:"Stage is primary survival predictor"},treatmentManagement:{selected:!0,justification:"Treatment modality affects survival"},followUpOutcomes:{selected:!0,justification:"Survival status and duration",subFields:{survivalStatus:!0,survivalDuration:!0}}},treatment_comparison:{diagnosisClassification:{selected:!0,justification:"Diagnosis for treatment stratification"},stagingData:{selected:!0,justification:"Baseline staging for comparison groups"},treatmentManagement:{selected:!0,justification:"Treatment details for comparison"},followUpOutcomes:{selected:!0,justification:"Outcomes for treatment effectiveness comparison"}}})[e]||{}}async generateExport(e){return(await a.Z.post("/research-requests/".concat(e,"/generate-export"))).data}async getDownloadUrl(e){return(await a.Z.get("/research-requests/".concat(e,"/download"))).data}async requestExtension(e,t,s){return(await a.Z.post("/research-requests/".concat(e,"/request-extension"),{extensionMonths:t,justification:s})).data}}let i=new r;t.Z=i},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,r;s.d(t,{x7:function(){return em},ZP:function(){return ep}});var i,n=s(2265);let l={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",a="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":a+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,n):i+":"+n+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,r)=>{var i;let n=x(e),l=p[n]||(p[n]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(n));if(!p[l]){let t=n!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(u," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[l]=m(r?{["@keyframes "+l]:t}:t,s?"":"."+l)}let o=s&&p.g?p.g:null;return s&&(p.g=p[l]),i=p[l],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),l},g=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function w(e,t){let s=this||{};return function(){let a=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;s.p=Object.assign({theme:b&&b()},l),s.o=/ *go\d+/.test(o),l.className=f.apply(s,a)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),v&&d[0]&&v(l),y(d,l)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,D=(a=0,()=>(++a).toString()),E=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},C="default",A=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return A(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},O=(e,t=C)=>{P[t]=A(P[t]||T,e),S.forEach(([e,s])=>{e===t&&s(P[t])})},R=e=>Object.keys(P).forEach(t=>O(e,t)),I=e=>Object.keys(P).find(t=>P[t].toasts.some(t=>t.id===e)),q=(e=C)=>t=>{O(t,e)},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=(e={},t=C)=>{let[s,a]=(0,n.useState)(P[t]||T),r=(0,n.useRef)(P[t]);(0,n.useEffect)(()=>(r.current!==P[t]&&a(P[t]),S.push([t,a]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||M[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:i}},L=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||D()}),$=e=>(t,s)=>{let a=L(t,e,s);return q(a.toasterId||I(a.id))({type:2,toast:a}),a.id},z=(e,t)=>$("blank")(e,t);z.error=$("error"),z.success=$("success"),z.loading=$("loading"),z.custom=$("custom"),z.dismiss=(e,t)=>{let s={type:3,toastId:e};t?q(t)(s):R(s)},z.dismissAll=e=>z.dismiss(void 0,e),z.remove=(e,t)=>{let s={type:4,toastId:e};t?q(t)(s):R(s)},z.removeAll=e=>z.remove(void 0,e),z.promise=(e,t,s)=>{let a=z.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?z.success(r,{id:a,...s,...null==s?void 0:s.success}):z.dismiss(a),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?z.error(r,{id:a,...s,...null==s?void 0:s.error}):z.dismiss(a)}),e};var F=1e3,Z=(e,t="default")=>{let{toasts:s,pausedAt:a}=_(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=F)=>{if(r.has(e))return;let s=setTimeout(()=>{r.delete(e),l({type:4,toastId:e})},t);r.set(e,s)},[]);(0,n.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&z.dismiss(s.id);return}return setTimeout(()=>z.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let l=(0,n.useCallback)(q(t),[t]),o=(0,n.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,n.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,n.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,n.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}},U=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,B=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${B} 0.15s ease-out forwards;
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
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,W=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
`,Y=j`
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
}`,K=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,X=w("div")`
  position: absolute;
`,Q=w("div")`
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
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===s?null:n.createElement(Q,null,n.createElement(J,{...a}),"loading"!==s&&n.createElement(X,null,"error"===s?n.createElement(H,{...a}):n.createElement(K,{...a})))},ea=e=>`
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
`,el=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),er(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(es,{toast:e}),l=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:l}):n.createElement(n.Fragment,null,i,l))});i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let i=n.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:s},r)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,toasterId:i,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=Z(s,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let i=s.position||t,l=ec(i,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return n.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?eu:"",style:l},"custom"===s.type?k(s.message,s):r?r(s):n.createElement(eo,{toast:s,position:i}))}))},ep=z}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=3691)}),_N_E=e.O()}]);