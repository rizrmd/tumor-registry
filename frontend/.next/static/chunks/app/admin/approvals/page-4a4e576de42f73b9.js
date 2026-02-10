(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8005],{2898:function(e,t,a){"use strict";a.d(t,{Z:function(){return n}});var s=a(2265),r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),n=(e,t)=>{let a=(0,s.forwardRef)(({color:a="currentColor",size:n=24,strokeWidth:l=2,absoluteStrokeWidth:o,className:d="",children:c,...u},m)=>(0,s.createElement)("svg",{ref:m,...r,width:n,height:n,stroke:a,strokeWidth:o?24*Number(l)/Number(n):l,className:["lucide",`lucide-${i(e)}`,d].join(" "),...u},[...t.map(([e,t])=>(0,s.createElement)(e,t)),...Array.isArray(c)?c:[c]]));return a.displayName=`${e}`,a}},6637:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(2898).Z)("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]])},4785:function(e,t,a){Promise.resolve().then(a.bind(a,9680))},9680:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return y}});var s,r,i=a(7437),n=a(2265),l=a(6986),o=a(4894),d=a(6383);(s=r||(r={})).DRAFT="draft",s.SUBMITTED="submitted",s.APPROVED="approved",s.REJECTED="rejected",s.EXPIRED="expired";class c{async getPendingRequests(){return(await d.Z.get("/research-requests/pending")).data}async getRequestDetails(e){return(await d.Z.get("/research-requests/".concat(e))).data}async approveRequest(e,t){return(await d.Z.post("/research-requests/".concat(e,"/approve"),{approved:!0,approvalNotes:t})).data}async rejectRequest(e,t){return(await d.Z.post("/research-requests/".concat(e,"/approve"),{approved:!1,rejectionReason:t})).data}}var u=new c,m=a(6637),p=a(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let x=(0,p.Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),h=(0,p.Z)("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]),g=(0,p.Z)("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]),f=(0,p.Z)("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);function y(){let{user:e,isAuthenticated:t,isLoading:a}=(0,l.useAuth)(),[s,r]=(0,n.useState)([]),[d,c]=(0,n.useState)(!0),[p,y]=(0,n.useState)(null),[b,v]=(0,n.useState)(null),[j,w]=(0,n.useState)(!1),[N,k]=(0,n.useState)(!1),[E,C]=(0,n.useState)(""),[D,P]=(0,n.useState)(null);(0,n.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&S()},[t,a]);let S=async()=>{try{c(!0);let e=await u.getPendingRequests();r(e)}catch(e){console.error("Failed to fetch pending requests:",e),y("Gagal memuat daftar permintaan penelitian.")}finally{c(!1)}},$=async e=>{if(confirm('Setujui permintaan penelitian "'.concat(e.title,'"? Peneliti akan mendapatkan akses ke statistik yang diminta.')))try{P(e.id),await u.approveRequest(e.id),alert("Permintaan berhasil disetujui."),w(!1),S()}catch(e){var t,a;console.error("Failed to approve request:",e),alert((null===(a=e.response)||void 0===a?void 0:null===(t=a.data)||void 0===t?void 0:t.message)||"Gagal menyetujui permintaan.")}finally{P(null)}},A=async()=>{if(b&&E.trim())try{P(b.id),await u.rejectRequest(b.id,E),alert("Permintaan berhasil ditolak."),k(!1),w(!1),C(""),S()}catch(a){var e,t;console.error("Failed to reject request:",a),alert((null===(t=a.response)||void 0===t?void 0:null===(e=t.data)||void 0===e?void 0:e.message)||"Gagal menolak permintaan.")}finally{P(null)}},q=e=>{v(e),k(!0)},T=e=>{v(e),w(!0)};return a||d?(0,i.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,i.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"})}):(0,i.jsxs)(o.A,{children:[(0,i.jsxs)("div",{className:"mb-8",children:[(0,i.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Persetujuan Penelitian"}),(0,i.jsx)("p",{className:"text-gray-600 mt-1",children:"Review dan kelola permintaan data penelitian dari pengguna."})]}),p&&(0,i.jsx)("div",{className:"bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200",children:p}),(0,i.jsx)("div",{className:"bg-white rounded-lg shadow border overflow-hidden",children:0===s.length?(0,i.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,i.jsx)(m.Z,{className:"h-12 w-12 mx-auto text-gray-300 mb-4"}),(0,i.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:"Tidak ada permintaan menunggu"}),(0,i.jsx)("p",{children:"Semua permintaan penelitian telah diproses."})]}):(0,i.jsx)("div",{className:"overflow-x-auto",children:(0,i.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,i.jsx)("thead",{className:"bg-gray-50",children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Judul Penelitian"}),(0,i.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Peneliti"}),(0,i.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tanggal Submit"}),(0,i.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Est. Pasien"}),(0,i.jsx)("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,i.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:s.map(e=>(0,i.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,i.jsxs)("td",{className:"px-6 py-4",children:[(0,i.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.title}),(0,i.jsx)("div",{className:"text-xs text-gray-500 truncate max-w-xs",children:e.description})]}),(0,i.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:[(0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)(x,{className:"h-4 w-4 text-gray-400 mr-2"}),(0,i.jsx)("div",{className:"text-sm text-gray-900",children:e.requesterName})]}),(0,i.jsx)("div",{className:"text-xs text-gray-500 ml-6",children:e.requesterEmail})]}),(0,i.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsxs)("div",{className:"flex items-center text-sm text-gray-500",children:[(0,i.jsx)(h,{className:"h-4 w-4 mr-2"}),new Date(e.submittedAt).toLocaleDateString("id-ID")]})}),(0,i.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsx)("div",{className:"text-sm text-gray-900",children:e.patientCount?e.patientCount.toLocaleString():"-"})}),(0,i.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2",children:[(0,i.jsx)("button",{onClick:()=>T(e),className:"px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700",children:"Detail"}),(0,i.jsxs)("button",{onClick:()=>$(e),disabled:D===e.id,className:"px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-white flex items-center inline-flex",children:[(0,i.jsx)(g,{className:"h-4 w-4 mr-1"}),"Setuju"]}),(0,i.jsxs)("button",{onClick:()=>q(e),disabled:D===e.id,className:"px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white flex items-center inline-flex",children:[(0,i.jsx)(f,{className:"h-4 w-4 mr-1"}),"Tolak"]})]})]},e.id))})]})})}),j&&b&&(0,i.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,i.jsxs)("div",{className:"bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col",children:[(0,i.jsxs)("div",{className:"p-6 border-b",children:[(0,i.jsx)("h3",{className:"text-xl font-bold text-gray-900",children:"Detail Permintaan Penelitian"}),(0,i.jsxs)("p",{className:"text-sm text-gray-500",children:["ID: ",b.id]})]}),(0,i.jsxs)("div",{className:"p-6 space-y-6 overflow-y-auto flex-1",children:[(0,i.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{className:"text-sm font-semibold text-gray-500",children:"Judul"}),(0,i.jsx)("p",{className:"text-gray-900",children:b.title})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{className:"text-sm font-semibold text-gray-500",children:"IRB / No. Ethics"}),(0,i.jsx)("p",{className:"text-gray-900",children:b.irbNumber||"-"})]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{className:"text-sm font-semibold text-gray-500",children:"Deskripsi"}),(0,i.jsx)("p",{className:"text-gray-900 text-sm whitespace-pre-wrap",children:b.description})]}),(0,i.jsxs)("div",{className:"bg-gray-50 p-4 rounded-lg border",children:[(0,i.jsx)("h4",{className:"text-sm font-semibold text-gray-900 mb-2",children:"Filter Data Yang Diminta"}),(0,i.jsx)("pre",{className:"text-xs text-gray-600 overflow-x-auto",children:JSON.stringify(b.filters,null,2)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{className:"text-sm font-semibold text-gray-500",children:"Justifikasi Ilmiah"}),(0,i.jsx)("p",{className:"text-gray-900 text-sm",children:b.justification||"Tidak ada justifikasi disertakan."})]}),(0,i.jsxs)("div",{className:"border-t pt-4 flex justify-between items-center",children:[(0,i.jsxs)("div",{className:"text-sm text-gray-500",children:["Diajukan oleh: ",(0,i.jsx)("span",{className:"font-semibold text-gray-900",children:b.requesterName})," (",b.requesterEmail,")"]}),(0,i.jsxs)("div",{className:"text-sm text-gray-500",children:["Tanggal: ",new Date(b.submittedAt).toLocaleDateString("id-ID",{dateStyle:"full"})]})]})]}),(0,i.jsxs)("div",{className:"p-6 border-t flex justify-end space-x-2 bg-gray-50",children:[(0,i.jsx)("button",{onClick:()=>w(!1),className:"px-4 py-2 border bg-white rounded-md text-gray-700 hover:bg-gray-50",children:"Tutup"}),(0,i.jsx)("button",{onClick:()=>{b&&q(b)},className:"px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700",children:"Tolak"}),(0,i.jsx)("button",{onClick:()=>{b&&$(b)},className:"px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700",children:"Setujui Permintaan"})]})]})}),N&&(0,i.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,i.jsxs)("div",{className:"bg-white rounded-lg w-full max-w-lg",children:[(0,i.jsxs)("div",{className:"p-6 border-b",children:[(0,i.jsx)("h3",{className:"text-lg font-bold text-gray-900",children:"Tolak Permintaan"}),(0,i.jsx)("p",{className:"text-sm text-gray-500",children:"Mohon berikan alasan penolakan untuk peneliti."})]}),(0,i.jsx)("div",{className:"p-6",children:(0,i.jsx)("textarea",{placeholder:"Alasan penolakan...",value:E,onChange:e=>C(e.target.value),rows:4,className:"w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"})}),(0,i.jsxs)("div",{className:"p-6 border-t flex justify-end space-x-2 bg-gray-50",children:[(0,i.jsx)("button",{onClick:()=>k(!1),className:"px-4 py-2 border bg-white rounded-md text-gray-700 hover:bg-gray-50",children:"Batal"}),(0,i.jsx)("button",{onClick:A,disabled:!E.trim(),className:"px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50",children:"Konfirmasi Penolakan"})]})]})})]})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return em},ZP:function(){return ep}});var i,n=a(2265);let l={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},p={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},h=(e,t,a,s,r)=>{var i;let n=x(e),l=p[n]||(p[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!p[l]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);p[l]=m(r?{["@keyframes "+l]:t}:t,a?"":"."+l)}let o=a&&p.g?p.g:null;return a&&(p.g=p[l]),i=p[l],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),l},g=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function w(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;a.p=Object.assign({theme:b&&b()},l),a.o=/ *go\d+/.test(o),l.className=f.apply(a,s)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),v&&d[0]&&v(l),y(d,l)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(s=0,()=>(++s).toString()),C=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},D="default",P=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return P(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],$={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},q=(e,t=D)=>{A[t]=P(A[t]||$,e),S.forEach(([e,a])=>{e===t&&a(A[t])})},T=e=>Object.keys(A).forEach(t=>q(e,t)),z=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),I=(e=D)=>t=>{q(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=(e={},t=D)=>{let[a,s]=(0,n.useState)(A[t]||$),r=(0,n.useRef)(A[t]);(0,n.useEffect)(()=>(r.current!==A[t]&&s(A[t]),S.push([t,s]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},Z=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),L=e=>(t,a)=>{let s=Z(t,e,a);return I(s.toasterId||z(s.id))({type:2,toast:s}),s.id},_=(e,t)=>L("blank")(e,t);_.error=L("error"),_.success=L("success"),_.loading=L("loading"),_.custom=L("custom"),_.dismiss=(e,t)=>{let a={type:3,toastId:e};t?I(t)(a):T(a)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let a={type:4,toastId:e};t?I(t)(a):T(a)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,a)=>{let s=_.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?_.success(r,{id:s,...a,...null==a?void 0:a.success}):_.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?_.error(r,{id:s,...a,...null==a?void 0:a.error}):_.dismiss(s)}),e};var F=1e3,M=(e,t="default")=>{let{toasts:a,pausedAt:s}=R(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=F)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),l({type:4,toastId:e})},t);r.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&_.dismiss(a.id);return}return setTimeout(()=>_.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let l=(0,n.useCallback)(I(t),[t]),o=(0,n.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,n.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,n.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}},H=j`
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
}`,J=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,U=w("div")`
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
    animation: ${J} 0.15s ease-out forwards;
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
`,V=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,W=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=j`
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
}`,Y=w("div")`
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
    animation: ${X} 0.2s ease-out forwards;
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
`,K=w("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(Q,null,n.createElement(V,{...s}),"loading"!==a&&n.createElement(K,null,"error"===a?n.createElement(U,{...s}):n.createElement(Y,{...s})))},es=e=>`
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
`,el=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),l=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:l}):n.createElement(n.Fragment,null,i,l))});i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=M(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,l=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eu:"",style:l},"custom"===a.type?k(a.message,a):r?r(a):n.createElement(eo,{toast:a,position:i}))}))},ep=_}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=4785)}),_N_E=e.O()}]);