(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2990],{6581:function(e,t,s){Promise.resolve().then(s.bind(s,6188))},6188:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return c}});var a=s(7437),i=s(2265),l=s(6986),r=s(4894),o=s(4033),n=s(1396),d=s.n(n);function c(){let{user:e,isAuthenticated:t,isLoading:s}=(0,l.useAuth)(),n=(0,o.useRouter)(),[c,m]=(0,i.useState)(!0),[u,x]=(0,i.useState)({clinicalPhotos:0,radiologyImages:0,pathologyReports:0,totalFiles:0,totalSize:0}),[p,h]=(0,i.useState)([]),[g,f]=(0,i.useState)("all");(0,i.useEffect)(()=>{if(!s&&!t){n.push("/login");return}t&&y()},[t,s,n]);let y=async()=>{try{m(!0),x({clinicalPhotos:0,radiologyImages:0,pathologyReports:0,totalFiles:0,totalSize:0}),h([])}catch(e){console.error("Error loading media data:",e)}finally{m(!1)}},b=e=>({photo:"\uD83D\uDCF8",radiology:"\uD83C\uDFE5",pathology:"\uD83D\uDD2C"})[e]||"\uD83D\uDCC4",v=e=>{let t=e.charAt(0).toUpperCase()+e.slice(1);return(0,a.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full ".concat({photo:"bg-blue-100 text-blue-800",radiology:"bg-purple-100 text-purple-800",pathology:"bg-green-100 text-green-800"}[e]||"bg-gray-100 text-gray-800"),children:t})},j="all"===g?p:p.filter(e=>e.type===g);return s||c?(0,a.jsx)(r.A,{children:(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading media gallery..."})]})})}):(0,a.jsxs)(r.A,{children:[(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Media Gallery"}),(0,a.jsx)("p",{className:"text-gray-600",children:"Centralized view of all clinical media"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Clinical Photos"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-blue-600 mt-2",children:u.clinicalPhotos})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDCF8"})]}),(0,a.jsx)(d(),{href:"/media/photos",className:"mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium block",children:"View all →"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Radiology Images"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-purple-600 mt-2",children:u.radiologyImages})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83C\uDFE5"})]}),(0,a.jsx)(d(),{href:"/media/radiology",className:"mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium block",children:"View all →"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Pathology Reports"}),(0,a.jsx)("p",{className:"text-3xl font-bold text-green-600 mt-2",children:u.pathologyReports})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDD2C"})]}),(0,a.jsx)(d(),{href:"/media/pathology",className:"mt-4 text-sm text-green-600 hover:text-green-800 font-medium block",children:"View all →"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Storage"}),(0,a.jsxs)("p",{className:"text-3xl font-bold text-gray-900 mt-2",children:[(u.totalSize/1073741824).toFixed(2),(0,a.jsx)("span",{className:"text-base ml-1",children:"GB"})]})]}),(0,a.jsx)("div",{className:"text-4xl",children:"\uD83D\uDCBE"})]}),(0,a.jsxs)("p",{className:"mt-4 text-sm text-gray-600",children:[u.totalFiles," files total"]})]})]}),(0,a.jsxs)("div",{className:"bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 mb-8",children:[(0,a.jsx)("h2",{className:"text-white text-lg font-semibold mb-4",children:"Quick Upload"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,a.jsx)(d(),{href:"/media/photos",className:"bg-white rounded-lg p-4 hover:shadow-lg transition-shadow",children:(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)("div",{className:"text-3xl",children:"\uD83D\uDCF8"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"font-medium text-gray-900",children:"Clinical Photo"}),(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"Upload patient photos"})]})]})}),(0,a.jsx)(d(),{href:"/media/radiology",className:"bg-white rounded-lg p-4 hover:shadow-lg transition-shadow",children:(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)("div",{className:"text-3xl",children:"\uD83C\uDFE5"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"font-medium text-gray-900",children:"Radiology Image"}),(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"Upload X-Ray, CT, MRI"})]})]})}),(0,a.jsx)(d(),{href:"/media/pathology",className:"bg-white rounded-lg p-4 hover:shadow-lg transition-shadow",children:(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)("div",{className:"text-3xl",children:"\uD83D\uDD2C"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"font-medium text-gray-900",children:"Pathology Report"}),(0,a.jsx)("p",{className:"text-sm text-gray-600",children:"Upload biopsy reports"})]})]})})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow",children:[(0,a.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900",children:"Recent Uploads"}),(0,a.jsxs)("div",{className:"flex space-x-2",children:[(0,a.jsx)("button",{onClick:()=>f("all"),className:"px-4 py-2 text-sm font-medium rounded-lg transition-colors ".concat("all"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"),children:"All"}),(0,a.jsx)("button",{onClick:()=>f("photo"),className:"px-4 py-2 text-sm font-medium rounded-lg transition-colors ".concat("photo"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"),children:"Photos"}),(0,a.jsx)("button",{onClick:()=>f("radiology"),className:"px-4 py-2 text-sm font-medium rounded-lg transition-colors ".concat("radiology"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"),children:"Radiology"}),(0,a.jsx)("button",{onClick:()=>f("pathology"),className:"px-4 py-2 text-sm font-medium rounded-lg transition-colors ".concat("pathology"===g?"bg-blue-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"),children:"Pathology"})]})]})}),0===j.length?(0,a.jsxs)("div",{className:"p-12 text-center text-gray-500",children:[(0,a.jsx)("div",{className:"text-6xl mb-4",children:"\uD83D\uDCC2"}),(0,a.jsx)("p",{className:"text-lg font-medium",children:"No media files yet"}),(0,a.jsx)("p",{className:"text-sm mt-2",children:"Upload clinical photos, radiology images, or pathology reports to get started"}),(0,a.jsx)("div",{className:"mt-6 flex justify-center space-x-4",children:(0,a.jsx)(d(),{href:"/media/photos",className:"px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors",children:"Upload First File"})})]}):(0,a.jsx)("div",{className:"p-6",children:(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:j.map(e=>(0,a.jsxs)("div",{className:"border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",children:[(0,a.jsx)("div",{className:"aspect-square bg-gray-100 flex items-center justify-center",children:e.thumbnailUrl?(0,a.jsx)("img",{src:e.thumbnailUrl,alt:e.title,className:"w-full h-full object-cover"}):(0,a.jsx)("div",{className:"text-6xl",children:b(e.type)})}),(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("h3",{className:"font-semibold text-gray-900 truncate flex-1",children:e.title}),v(e.type)]}),(0,a.jsx)("p",{className:"text-sm text-gray-600 truncate",children:e.patientName||"Unknown"}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:e.mrNumber||"-"}),(0,a.jsx)("p",{className:"text-xs text-gray-400 mt-2",children:new Date(e.uploadDate).toLocaleDateString("id-ID")})]})]},e.id))})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mt-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Storage by Type"}),(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[(0,a.jsx)("span",{className:"text-gray-600",children:"Clinical Photos"}),(0,a.jsxs)("span",{className:"font-medium",children:[u.clinicalPhotos>0?Math.round(u.clinicalPhotos/u.totalFiles*100):0,"%"]})]}),(0,a.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,a.jsx)("div",{className:"bg-blue-500 h-2 rounded-full",style:{width:"".concat(u.clinicalPhotos>0?u.clinicalPhotos/u.totalFiles*100:0,"%")}})})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[(0,a.jsx)("span",{className:"text-gray-600",children:"Radiology Images"}),(0,a.jsxs)("span",{className:"font-medium",children:[u.radiologyImages>0?Math.round(u.radiologyImages/u.totalFiles*100):0,"%"]})]}),(0,a.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,a.jsx)("div",{className:"bg-purple-500 h-2 rounded-full",style:{width:"".concat(u.radiologyImages>0?u.radiologyImages/u.totalFiles*100:0,"%")}})})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[(0,a.jsx)("span",{className:"text-gray-600",children:"Pathology Reports"}),(0,a.jsxs)("span",{className:"font-medium",children:[u.pathologyReports>0?Math.round(u.pathologyReports/u.totalFiles*100):0,"%"]})]}),(0,a.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,a.jsx)("div",{className:"bg-green-500 h-2 rounded-full",style:{width:"".concat(u.pathologyReports>0?u.pathologyReports/u.totalFiles*100:0,"%")}})})]})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Upload Activity"}),(0,a.jsxs)("div",{className:"text-center py-6",children:[(0,a.jsx)("p",{className:"text-4xl font-bold text-gray-900",children:u.totalFiles}),(0,a.jsx)("p",{className:"text-sm text-gray-600 mt-2",children:"Total Files"}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"All time"})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Storage Capacity"}),(0,a.jsxs)("div",{className:"text-center py-6",children:[(0,a.jsx)("p",{className:"text-4xl font-bold text-gray-900",children:(u.totalSize/1073741824).toFixed(1)}),(0,a.jsx)("p",{className:"text-sm text-gray-600 mt-2",children:"Gigabytes Used"}),(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:"MinIO Storage"})]})]})]})]})}},4033:function(e,t,s){e.exports=s(5313)},5925:function(e,t,s){"use strict";let a,i;s.d(t,{x7:function(){return eu},ZP:function(){return ex}});var l,r=s(2265);let o={data:""},n=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let s="",a="",i="";for(let l in e){let r=e[l];"@"==l[0]?"i"==l[1]?s=l+" "+r+";":a+="f"==l[1]?u(r,l):l+"{"+u(r,"k"==l[1]?"":t)+"}":"object"==typeof r?a+=u(r,t?t.replace(/([^,])+/g,e=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):l):null!=r&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=u.p?u.p(l,r):l+":"+r+";")}return s+(t&&i?t+"{"+i+"}":i)+a},x={},p=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+p(e[s]);return t}return e},h=(e,t,s,a,i)=>{var l;let r=p(e),o=x[r]||(x[r]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(r));if(!x[o]){let t=r!==e?e:(e=>{let t,s,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);x[o]=u(i?{["@keyframes "+o]:t}:t,s?"":"."+o)}let n=s&&x.g?x.g:null;return s&&(x.g=x[o]),l=x[o],n?t.data=t.data.replace(n,l):-1===t.data.indexOf(l)&&(t.data=a?l+t.data:t.data+l),o},g=(e,t,s)=>e.reduce((e,a,i)=>{let l=t[i];if(l&&l.call){let e=l(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;l=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==l?"":l)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function N(e,t){let s=this||{};return function(){let a=arguments;function i(l,r){let o=Object.assign({},l),n=o.className||i.className;s.p=Object.assign({theme:b&&b()},o),s.o=/ *go\d+/.test(n),o.className=f.apply(s,a)+(n?" "+n:""),t&&(o.ref=r);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),y(d,o)}return t?t(i):i}}var w=e=>"function"==typeof e,D=(e,t)=>w(e)?e(t):e,C=(a=0,()=>(++a).toString()),k=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},E="default",F=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return F(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let l=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+l}))}}},P=[],I={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},R={},$=(e,t=E)=>{R[t]=F(R[t]||I,e),P.forEach(([e,s])=>{e===t&&s(R[t])})},A=e=>Object.keys(R).forEach(t=>$(e,t)),S=e=>Object.keys(R).find(t=>R[t].toasts.some(t=>t.id===e)),O=(e=E)=>t=>{$(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},U=(e={},t=E)=>{let[s,a]=(0,r.useState)(R[t]||I),i=(0,r.useRef)(R[t]);(0,r.useEffect)(()=>(i.current!==R[t]&&a(R[t]),P.push([t,a]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let l=s.toasts.map(t=>{var s,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...s,toasts:l}},_=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||C()}),M=e=>(t,s)=>{let a=_(t,e,s);return O(a.toasterId||S(a.id))({type:2,toast:a}),a.id},T=(e,t)=>M("blank")(e,t);T.error=M("error"),T.success=M("success"),T.loading=M("loading"),T.custom=M("custom"),T.dismiss=(e,t)=>{let s={type:3,toastId:e};t?O(t)(s):A(s)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let s={type:4,toastId:e};t?O(t)(s):A(s)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,s)=>{let a=T.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?D(t.success,e):void 0;return i?T.success(i,{id:a,...s,...null==s?void 0:s.success}):T.dismiss(a),e}).catch(e=>{let i=t.error?D(t.error,e):void 0;i?T.error(i,{id:a,...s,...null==s?void 0:s.error}):T.dismiss(a)}),e};var L=1e3,H=(e,t="default")=>{let{toasts:s,pausedAt:a}=U(e,t),i=(0,r.useRef)(new Map).current,l=(0,r.useCallback)((e,t=L)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),i=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&T.dismiss(s.id);return}return setTimeout(()=>T.dismiss(s.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let o=(0,r.useCallback)(O(t),[t]),n=(0,r.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,r.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,r.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),m=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:l}=t||{},r=s.filter(t=>(t.position||l)===(e.position||l)&&t.height),o=r.findIndex(t=>t.id===e.id),n=r.filter((e,t)=>t<o&&e.visible).length;return r.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+i,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,l]),{toasts:s,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:m}}},B=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,G=j`
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
}`,q=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${G} 0.15s ease-out forwards;
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
`,Z=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Q=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,X=j`
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
}`,J=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${X} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,K=N("div")`
  position: absolute;
`,W=N("div")`
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
}`,et=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(et,null,t):t:"blank"===s?null:r.createElement(W,null,r.createElement(Q,{...a}),"loading"!==s&&r.createElement(K,null,"error"===s?r.createElement(q,{...a}):r.createElement(J,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,el=N("div")`
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
`,er=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let s=e.includes("top")?1:-1,[a,i]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),ei(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},l=r.createElement(es,{toast:e}),o=r.createElement(er,{...e.ariaProps},D(e.message,e));return r.createElement(el,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:l,message:o}):r.createElement(r.Fragment,null,l,o))});l=r.createElement,u.p=void 0,y=l,b=void 0,v=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let l=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:l,className:t,style:s},i)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:l,containerStyle:o,containerClassName:n})=>{let{toasts:d,handlers:c}=H(s,l);return r.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let l=s.position||t,o=ec(l,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?em:"",style:o},"custom"===s.type?D(s.message,s):i?i(s):r.createElement(en,{toast:s,position:l}))}))},ex=T}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=6581)}),_N_E=e.O()}]);