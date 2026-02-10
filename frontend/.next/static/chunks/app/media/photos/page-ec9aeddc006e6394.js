(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9559],{2485:function(e,t,s){Promise.resolve().then(s.bind(s,8204))},8204:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return d}});var a=s(7437),i=s(2265),r=s(6986),l=s(4894),o=s(6579),n=s(4033);function d(){let{user:e,isAuthenticated:t,isLoading:s}=(0,r.useAuth)(),d=(0,n.useRouter)(),[c,u]=(0,i.useState)(!0),[p,m]=(0,i.useState)([]),[x,h]=(0,i.useState)([]),[g,f]=(0,i.useState)(""),[b,y]=(0,i.useState)("all"),[v,j]=(0,i.useState)(null),[w,N]=(0,i.useState)(!1),[k,D]=(0,i.useState)(!1),[C,E]=(0,i.useState)(null),[L,P]=(0,i.useState)(""),[T,A]=(0,i.useState)(""),[R,S]=(0,i.useState)(""),[O,I]=(0,i.useState)("");(0,i.useEffect)(()=>{if(!s&&!t){d.push("/login");return}t&&F()},[t,s,d]),(0,i.useEffect)(()=>{z()},[p,g,b]);let F=async()=>{try{u(!0),m([])}catch(e){console.error("Error loading clinical photos:",e)}finally{u(!1)}},z=()=>{let e=[...p];g&&(e=e.filter(e=>{var t,s,a;return(null===(t=e.patientName)||void 0===t?void 0:t.toLowerCase().includes(g.toLowerCase()))||(null===(s=e.mrNumber)||void 0===s?void 0:s.toLowerCase().includes(g.toLowerCase()))||(null===(a=e.description)||void 0===a?void 0:a.toLowerCase().includes(g.toLowerCase()))})),"all"!==b&&(e=e.filter(e=>e.viewType===b)),e.sort((e,t)=>new Date(t.uploadDate).getTime()-new Date(e.uploadDate).getTime()),h(e)},_=async()=>{if(!C||!T){alert("Please select a file and enter patient ID");return}try{N(!0),await o.Z.uploadPhoto({patientId:T,file:C,viewType:R,description:O}),alert("Photo uploaded successfully!"),E(null),P(""),A(""),S(""),I(""),D(!1),F()}catch(e){console.error("Error uploading photo:",e),alert("Failed to upload photo. Please try again.")}finally{N(!1)}},M=async e=>{if(confirm("Are you sure you want to delete this photo?"))try{await o.Z.deletePhoto(e),alert("Photo deleted successfully"),F(),j(null)}catch(e){console.error("Error deleting photo:",e),alert("Failed to delete photo")}},$=e=>{let t={ANTERIOR:"bg-blue-100 text-blue-800",POSTERIOR:"bg-green-100 text-green-800",LATERAL_LEFT:"bg-purple-100 text-purple-800",LATERAL_RIGHT:"bg-pink-100 text-pink-800",OTHER:"bg-gray-100 text-gray-800"}[e||""]||"bg-gray-100 text-gray-800";return(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full ".concat(t),children:e||"Unknown"})};return s||c?(0,a.jsx)(l.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading clinical photos..."})]})})}):(0,a.jsxs)(l.A,{children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Clinical Photos Management"}),(0,a.jsx)("p",{className:"text-gray-600",children:"Upload and manage clinical photography documentation"})]}),(0,a.jsxs)("button",{onClick:()=>D(!0),className:"px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center",children:[(0,a.jsx)("span",{className:"mr-2",children:"\uD83D\uDCF8"}),"Upload Photo"]})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Photos"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:p.length})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDDBC️"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"This Month"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:p.filter(e=>{let t=new Date(e.uploadDate),s=new Date;return t.getMonth()===s.getMonth()&&t.getFullYear()===s.getFullYear()}).length})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDCC5"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Patients"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:new Set(p.map(e=>e.patientId)).size})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDC65"})]})}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Size"}),(0,a.jsxs)("p",{className:"text-3xl font-bold text-purple-600 mt-2",children:[(p.reduce((e,t)=>e+(t.fileSize||0),0)/1048576).toFixed(1),(0,a.jsx)("span",{className:"text-sm ml-1",children:"MB"})]})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDCBE"})]})})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-6",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{className:"md:col-span-2",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Search"}),(0,a.jsx)("input",{type:"text",value:g,onChange:e=>f(e.target.value),placeholder:"Patient name, MR number, or description",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"View Type"}),(0,a.jsxs)("select",{value:b,onChange:e=>y(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,a.jsx)("option",{value:"all",children:"All Views"}),(0,a.jsx)("option",{value:"ANTERIOR",children:"Anterior"}),(0,a.jsx)("option",{value:"POSTERIOR",children:"Posterior"}),(0,a.jsx)("option",{value:"LATERAL_LEFT",children:"Lateral Left"}),(0,a.jsx)("option",{value:"LATERAL_RIGHT",children:"Lateral Right"}),(0,a.jsx)("option",{value:"OTHER",children:"Other"})]})]})]})}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:["Clinical Photos (",x.length,")"]}),0===x.length?(0,a.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,a.jsx)("div",{className:"text-6xl mb-4",children:"\uD83D\uDCF8"}),(0,a.jsx)("p",{className:"text-lg font-medium",children:"No clinical photos found"}),(0,a.jsx)("p",{className:"text-sm mt-2",children:0===p.length?"Start by uploading clinical photos for your patients":"Try adjusting your search filters"}),(0,a.jsx)("button",{onClick:()=>D(!0),className:"mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"Upload First Photo"})]}):(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",children:x.map(e=>(0,a.jsxs)("div",{className:"border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",onClick:()=>j(e),children:[(0,a.jsxs)("div",{className:"aspect-square bg-gray-100 relative",children:[(0,a.jsx)("img",{src:e.fileUrl,alt:e.description||"Clinical photo",className:"w-full h-full object-cover"}),(0,a.jsx)("div",{className:"absolute top-2 right-2",children:$(e.viewType)})]}),(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsx)("h3",{className:"font-semibold text-gray-900 truncate",children:e.patientName||"Unknown Patient"}),(0,a.jsx)("p",{className:"text-sm text-gray-600 truncate",children:e.mrNumber||"-"}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-2 line-clamp-2",children:e.description||"No description"}),(0,a.jsx)("p",{className:"text-xs text-gray-400 mt-2",children:new Date(e.uploadDate).toLocaleDateString("id-ID")})]})]},e.id))})]}),k&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,a.jsxs)("div",{className:"bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[(0,a.jsx)("div",{className:"p-6 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("h2",{className:"text-xl font-bold text-gray-900",children:"Upload Clinical Photo"}),(0,a.jsx)("button",{onClick:()=>!w&&D(!1),className:"text-gray-400 hover:text-gray-600",disabled:w,children:(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})}),(0,a.jsxs)("div",{className:"p-6 space-y-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Photo File *"}),(0,a.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var t;let s=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!s)return;if(!s.type.startsWith("image/")){alert("Please select an image file");return}if(s.size>10485760){alert("File size must be less than 10MB");return}E(s);let a=new FileReader;a.onloadend=()=>{P(a.result)},a.readAsDataURL(s)},className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",disabled:w}),L&&(0,a.jsx)("div",{className:"mt-4",children:(0,a.jsx)("img",{src:L,alt:"Preview",className:"w-full max-h-64 object-contain rounded-lg border border-gray-200"})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Patient ID *"}),(0,a.jsx)("input",{type:"text",value:T,onChange:e=>A(e.target.value),placeholder:"Enter patient ID",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",disabled:w})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"View Type"}),(0,a.jsxs)("select",{value:R,onChange:e=>S(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",disabled:w,children:[(0,a.jsx)("option",{value:"",children:"Select view type"}),(0,a.jsx)("option",{value:"ANTERIOR",children:"Anterior"}),(0,a.jsx)("option",{value:"POSTERIOR",children:"Posterior"}),(0,a.jsx)("option",{value:"LATERAL_LEFT",children:"Lateral Left"}),(0,a.jsx)("option",{value:"LATERAL_RIGHT",children:"Lateral Right"}),(0,a.jsx)("option",{value:"OTHER",children:"Other"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Description"}),(0,a.jsx)("textarea",{value:O,onChange:e=>I(e.target.value),rows:3,placeholder:"Photo description (optional)",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",disabled:w})]})]}),(0,a.jsxs)("div",{className:"p-6 border-t border-gray-200 flex justify-end space-x-3",children:[(0,a.jsx)("button",{onClick:()=>D(!1),className:"px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors",disabled:w,children:"Cancel"}),(0,a.jsx)("button",{onClick:_,disabled:w||!C||!T,className:"px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",children:w?"Uploading...":"Upload Photo"})]})]})}),v&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4",children:(0,a.jsxs)("div",{className:"bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto",children:[(0,a.jsx)("div",{className:"p-6 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("h2",{className:"text-xl font-bold text-gray-900",children:"Clinical Photo Detail"}),(0,a.jsx)("button",{onClick:()=>j(null),className:"text-gray-400 hover:text-gray-600",children:(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})}),(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsx)("img",{src:v.fileUrl,alt:v.description||"Clinical photo",className:"w-full rounded-lg"})}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"Patient"}),(0,a.jsx)("p",{className:"font-semibold",children:v.patientName||"Unknown"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"MR Number"}),(0,a.jsx)("p",{className:"font-semibold",children:v.mrNumber||"-"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"View Type"}),(0,a.jsx)("div",{className:"mt-1",children:$(v.viewType)})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"Upload Date"}),(0,a.jsx)("p",{className:"font-semibold",children:new Date(v.uploadDate).toLocaleString("id-ID")})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"File Size"}),(0,a.jsx)("p",{className:"font-semibold",children:v.fileSize?"".concat((v.fileSize/1024).toFixed(1)," KB"):"Unknown"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"Uploaded By"}),(0,a.jsx)("p",{className:"font-semibold",children:v.uploadedBy||"-"})]})]}),v.description&&(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("p",{className:"text-sm text-gray-600 mb-1",children:"Description"}),(0,a.jsx)("p",{className:"text-gray-900",children:v.description})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3",children:[(0,a.jsx)("button",{onClick:()=>window.open(v.fileUrl,"_blank"),className:"px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors",children:"Download"}),(0,a.jsx)("button",{onClick:()=>M(v.id),className:"px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors",children:"Delete"})]})]})]})})]})}},6579:function(e,t,s){"use strict";var a=s(6383);class i{async uploadPhoto(e){let t=new FormData;return t.append("file",e.file),t.append("patientId",e.patientId),e.viewType&&t.append("viewType",e.viewType),e.anatomicalLocation&&t.append("anatomicalLocation",e.anatomicalLocation),e.description&&t.append("description",e.description),(await a.Z.post("/clinical-photos/upload",t,{headers:{"Content-Type":"multipart/form-data"}})).data}async uploadMultiplePhotos(e,t){let s=t.map(t=>this.uploadPhoto({patientId:e,file:t.file,viewType:t.viewAngle,description:t.description}));return await Promise.all(s)}async getPhotosByPatient(e){return(await a.Z.get("/clinical-photos/patient/".concat(e))).data}async deletePhoto(e){return(await a.Z.delete("/clinical-photos/".concat(e))).data}}t.Z=new i},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,i;s.d(t,{x7:function(){return ep},ZP:function(){return em}});var r,l=s(2265);let o={data:""},n=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let s="",a="",i="";for(let r in e){let l=e[r];"@"==r[0]?"i"==r[1]?s=r+" "+l+";":a+="f"==r[1]?p(l,r):r+"{"+p(l,"k"==r[1]?"":t)+"}":"object"==typeof l?a+=p(l,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=l&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=p.p?p.p(r,l):r+":"+l+";")}return s+(t&&i?t+"{"+i+"}":i)+a},m={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,i)=>{var r;let l=x(e),o=m[l]||(m[l]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(l));if(!m[o]){let t=l!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(u," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);m[o]=p(i?{["@keyframes "+o]:t}:t,s?"":"."+o)}let n=s&&m.g?m.g:null;return s&&(m.g=m[o]),r=m[o],n?t.data=t.data.replace(n,r):-1===t.data.indexOf(r)&&(t.data=a?r+t.data:t.data+r),o},g=(e,t,s)=>e.reduce((e,a,i)=>{let r=t[i];if(r&&r.call){let e=r(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==r?"":r)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}f.bind({g:1});let b,y,v,j=f.bind({k:1});function w(e,t){let s=this||{};return function(){let a=arguments;function i(r,l){let o=Object.assign({},r),n=o.className||i.className;s.p=Object.assign({theme:y&&y()},o),s.o=/ *go\d+/.test(n),o.className=f.apply(s,a)+(n?" "+n:""),t&&(o.ref=l);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),b(d,o)}return t?t(i):i}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,D=(a=0,()=>(++a).toString()),C=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},E="default",L=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return L(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},P=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},R=(e,t=E)=>{A[t]=L(A[t]||T,e),P.forEach(([e,s])=>{e===t&&s(A[t])})},S=e=>Object.keys(A).forEach(t=>R(e,t)),O=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),I=(e=E)=>t=>{R(t,e)},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={},t=E)=>{let[s,a]=(0,l.useState)(A[t]||T),i=(0,l.useRef)(A[t]);(0,l.useEffect)(()=>(i.current!==A[t]&&a(A[t]),P.push([t,a]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let r=s.toasts.map(t=>{var s,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||F[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...s,toasts:r}},_=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||D()}),M=e=>(t,s)=>{let a=_(t,e,s);return I(a.toasterId||O(a.id))({type:2,toast:a}),a.id},$=(e,t)=>M("blank")(e,t);$.error=M("error"),$.success=M("success"),$.loading=M("loading"),$.custom=M("custom"),$.dismiss=(e,t)=>{let s={type:3,toastId:e};t?I(t)(s):S(s)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let s={type:4,toastId:e};t?I(t)(s):S(s)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,s)=>{let a=$.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?k(t.success,e):void 0;return i?$.success(i,{id:a,...s,...null==s?void 0:s.success}):$.dismiss(a),e}).catch(e=>{let i=t.error?k(t.error,e):void 0;i?$.error(i,{id:a,...s,...null==s?void 0:s.error}):$.dismiss(a)}),e};var U=1e3,B=(e,t="default")=>{let{toasts:s,pausedAt:a}=z(e,t),i=(0,l.useRef)(new Map).current,r=(0,l.useCallback)((e,t=U)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,s)},[]);(0,l.useEffect)(()=>{if(a)return;let e=Date.now(),i=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&$.dismiss(s.id);return}return setTimeout(()=>$.dismiss(s.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let o=(0,l.useCallback)(I(t),[t]),n=(0,l.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,l.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,l.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,l.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:r}=t||{},l=s.filter(t=>(t.position||r)===(e.position||r)&&t.height),o=l.findIndex(t=>t.id===e.id),n=l.filter((e,t)=>t<o&&e.visible).length;return l.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+i,0)},[s]);return(0,l.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,r]),{toasts:s,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}},H=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Z=j`
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
    animation: ${Z} 0.15s ease-out forwards;
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
`,Y=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
`,q=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=j`
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

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,Q=w("div")`
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
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?l.createElement(et,null,t):t:"blank"===s?null:l.createElement(X,null,l.createElement(Y,{...a}),"loading"!==s&&l.createElement(Q,null,"error"===s?l.createElement(G,{...a}):l.createElement(J,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=w("div")`
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
`,el=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let s=e.includes("top")?1:-1,[a,i]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),ei(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=l.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},r=l.createElement(es,{toast:e}),o=l.createElement(el,{...e.ariaProps},k(e.message,e));return l.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:r,message:o}):l.createElement(l.Fragment,null,r,o))});r=l.createElement,p.p=void 0,b=r,y=void 0,v=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let r=l.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return l.createElement("div",{ref:r,className:t,style:s},i)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:r,containerStyle:o,containerClassName:n})=>{let{toasts:d,handlers:c}=B(s,r);return l.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let r=s.position||t,o=ec(r,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return l.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?eu:"",style:o},"custom"===s.type?k(s.message,s):i?i(s):l.createElement(en,{toast:s,position:r}))}))},em=$}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=2485)}),_N_E=e.O()}]);