(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3119],{3278:function(e,t,a){Promise.resolve().then(a.bind(a,3337))},3337:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return l}});var s=a(7437),r=a(2265),i=a(6986),n=a(4894);function l(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),[l,o]=(0,r.useState)(!0),[d,c]=(0,r.useState)("3months");return((0,r.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&o(!1)},[t,a]),a||l)?(0,s.jsx)(n.A,{children:(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"})})}):(0,s.jsxs)(n.A,{children:[(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Prediksi AI"}),(0,s.jsx)("p",{className:"text-gray-600 mt-2",children:"Prediksi dan proyeksi kasus kanker berbasis machine learning"})]}),(0,s.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",children:[{title:"Prediksi 3 Bulan Ke Depan",timeframe:"Nov 2024 - Jan 2025",predictedCases:348,confidence:87,trend:"up",change:"+12.4%",color:"bg-blue-500"},{title:"Prediksi 6 Bulan Ke Depan",timeframe:"Nov 2024 - Apr 2025",predictedCases:712,confidence:82,trend:"up",change:"+15.8%",color:"bg-purple-500"},{title:"Prediksi Puncak Kasus",timeframe:"Maret 2025",predictedCases:134,confidence:79,trend:"peak",change:"Puncak",color:"bg-red-500"}].map(e=>(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow-lg overflow-hidden",children:[(0,s.jsxs)("div",{className:"".concat(e.color," p-4 text-white"),children:[(0,s.jsx)("h3",{className:"text-lg font-semibold",children:e.title}),(0,s.jsx)("p",{className:"text-sm opacity-90 mt-1",children:e.timeframe})]}),(0,s.jsxs)("div",{className:"p-6",children:[(0,s.jsxs)("div",{className:"text-center mb-4",children:[(0,s.jsx)("div",{className:"text-4xl font-bold text-gray-900",children:e.predictedCases}),(0,s.jsx)("div",{className:"text-sm text-gray-600 mt-1",children:"Kasus Diprediksi"})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,s.jsx)("span",{className:"text-sm text-gray-600",children:"Tingkat Kepercayaan"}),(0,s.jsxs)("span",{className:"text-lg font-semibold text-green-600",children:[e.confidence,"%"]})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2 mb-4",children:(0,s.jsx)("div",{className:"bg-green-600 h-2 rounded-full transition-all",style:{width:"".concat(e.confidence,"%")}})}),(0,s.jsxs)("div",{className:"flex items-center justify-center",children:["up"===e.trend&&(0,s.jsxs)("span",{className:"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800",children:[(0,s.jsx)("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),e.change]}),"peak"===e.trend&&(0,s.jsxs)("span",{className:"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800",children:[(0,s.jsx)("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z",clipRule:"evenodd"})}),e.change]})]})]})]},e.title))}),(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6",children:[(0,s.jsxs)("div",{className:"lg:col-span-2 bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-6",children:"Faktor Risiko Utama"}),(0,s.jsx)("div",{className:"space-y-4",children:[{factor:"Urbanisasi Tinggi",impact:"Tinggi",score:8.5,color:"bg-red-500"},{factor:"Polusi Udara",impact:"Tinggi",score:8.2,color:"bg-red-500"},{factor:"Gaya Hidup Tidak Sehat",impact:"Sedang",score:7.1,color:"bg-yellow-500"},{factor:"Penuaan Populasi",impact:"Sedang",score:6.8,color:"bg-yellow-500"},{factor:"Akses Layanan Kesehatan",impact:"Rendah",score:4.5,color:"bg-green-500"}].map(e=>(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)("span",{className:"text-sm font-medium text-gray-900",children:e.factor}),(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-semibold rounded-full ".concat("Tinggi"===e.impact?"bg-red-100 text-red-800":"Sedang"===e.impact?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"),children:e.impact})]}),(0,s.jsxs)("span",{className:"text-sm font-bold text-gray-900",children:[e.score,"/10"]})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-3",children:(0,s.jsx)("div",{className:"".concat(e.color," h-3 rounded-full transition-all"),style:{width:"".concat(10*e.score,"%")}})})]},e.factor))}),(0,s.jsx)("div",{className:"mt-6 p-4 bg-blue-50 rounded-lg",children:(0,s.jsxs)("div",{className:"flex items-start gap-2",children:[(0,s.jsx)("svg",{className:"w-5 h-5 text-blue-600 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium text-blue-900 mb-1",children:"Rekomendasi AI"}),(0,s.jsx)("p",{className:"text-xs text-blue-700",children:"Fokus pencegahan pada daerah urban dengan tingkat polusi tinggi. Kampanye edukasi gaya hidup sehat dapat mengurangi risiko hingga 23%."})]})]})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-6",children:"Akurasi Model"}),(0,s.jsxs)("div",{className:"space-y-6",children:[[{metric:"Akurasi Model",value:"84.7%",description:"Tingkat akurasi prediksi"},{metric:"Mean Absolute Error",value:"8.2",description:"Rata-rata kesalahan absolut"},{metric:"R\xb2 Score",value:"0.89",description:"Koefisien determinasi"},{metric:"Training Data",value:"3,247",description:"Jumlah data pelatihan"}].map(e=>(0,s.jsxs)("div",{className:"border-b pb-4 last:border-b-0 last:pb-0",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,s.jsx)("span",{className:"text-sm font-medium text-gray-700",children:e.metric}),(0,s.jsx)("span",{className:"text-lg font-bold text-green-600",children:e.value})]}),(0,s.jsx)("p",{className:"text-xs text-gray-500",children:e.description})]},e.metric)),(0,s.jsxs)("div",{className:"bg-green-50 rounded-lg p-4 mt-6",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,s.jsx)("svg",{className:"w-5 h-5 text-green-600",fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})}),(0,s.jsx)("p",{className:"text-sm font-medium text-green-900",children:"Model Terverifikasi"})]}),(0,s.jsx)("p",{className:"text-xs text-green-700",children:"Model telah divalidasi dengan data historis 3 tahun terakhir"})]})]})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,s.jsxs)("div",{className:"px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold text-gray-900",children:"Prediksi Hotspot Regional"}),(0,s.jsx)("p",{className:"text-sm text-gray-600 mt-1",children:"Provinsi dengan prediksi peningkatan kasus tertinggi - 3 bulan ke depan"})]}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Provinsi"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Kasus Saat Ini"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Prediksi Kasus"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Peningkatan"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tingkat Risiko"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:[{province:"DKI Jakarta",currentCases:276,predictedCases:312,increase:13,riskLevel:"Sangat Tinggi",color:"text-red-600"},{province:"Jawa Barat",currentCases:324,predictedCases:368,increase:13.6,riskLevel:"Sangat Tinggi",color:"text-red-600"},{province:"Jawa Timur",currentCases:298,predictedCases:334,increase:12.1,riskLevel:"Tinggi",color:"text-orange-600"},{province:"Banten",currentCases:156,predictedCases:181,increase:16,riskLevel:"Tinggi",color:"text-orange-600"},{province:"Sumatera Utara",currentCases:187,predictedCases:207,increase:10.7,riskLevel:"Sedang",color:"text-yellow-600"}].map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("svg",{className:"w-5 h-5 mr-2 ".concat(e.color),fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",clipRule:"evenodd"})}),(0,s.jsx)("span",{className:"text-sm font-medium text-gray-900",children:e.province})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"text-sm text-gray-900",children:e.currentCases})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"text-sm font-semibold text-gray-900",children:e.predictedCases})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("svg",{className:"w-4 h-4 text-red-600 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),(0,s.jsxs)("span",{className:"text-sm font-medium text-red-600",children:["+",e.increase,"%"]})]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"inline-flex px-3 py-1 text-xs font-semibold rounded-full ".concat("Sangat Tinggi"===e.riskLevel?"bg-red-100 text-red-800":"Tinggi"===e.riskLevel?"bg-orange-100 text-orange-800":"bg-yellow-100 text-yellow-800"),children:e.riskLevel})})]},e.province))})]})}),(0,s.jsx)("div",{className:"px-6 py-4 bg-gray-50 border-t border-gray-200",children:(0,s.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[(0,s.jsx)("span",{className:"text-gray-600",children:"Berdasarkan model prediktif AI dengan data historis 2021-2024"}),(0,s.jsx)("button",{className:"text-green-600 hover:text-green-700 font-medium",children:"Download Laporan Lengkap"})]})})]})]})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return ep},ZP:function(){return eu}});var i,n=a(2265);let l={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,p=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?p(n,i):i+"{"+p(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=p(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=p.p?p.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},u={},x=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+x(e[a]);return t}return e},g=(e,t,a,s,r)=>{var i;let n=x(e),l=u[n]||(u[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!u[l]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(m," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);u[l]=p(r?{["@keyframes "+l]:t}:t,a?"":"."+l)}let o=a&&u.g?u.g:null;return a&&(u.g=u[l]),i=u[l],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),l},h=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return g(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let b,v,y,j=f.bind({k:1});function w(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;a.p=Object.assign({theme:v&&v()},l),a.o=/ *go\d+/.test(o),l.className=f.apply(a,s)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),y&&d[0]&&y(l),b(d,l)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,C=(s=0,()=>(++s).toString()),E=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},L="default",P=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return P(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},z={},R=(e,t=L)=>{z[t]=P(z[t]||T,e),A.forEach(([e,a])=>{e===t&&a(z[t])})},M=e=>Object.keys(z).forEach(t=>R(e,t)),D=e=>Object.keys(z).find(t=>z[t].toasts.some(t=>t.id===e)),$=(e=L)=>t=>{R(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=L)=>{let[a,s]=(0,n.useState)(z[t]||T),r=(0,n.useRef)(z[t]);(0,n.useEffect)(()=>(r.current!==z[t]&&s(z[t]),A.push([t,s]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},O=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),_=e=>(t,a)=>{let s=O(t,e,a);return $(s.toasterId||D(s.id))({type:2,toast:s}),s.id},B=(e,t)=>_("blank")(e,t);B.error=_("error"),B.success=_("success"),B.loading=_("loading"),B.custom=_("custom"),B.dismiss=(e,t)=>{let a={type:3,toastId:e};t?$(t)(a):M(a)},B.dismissAll=e=>B.dismiss(void 0,e),B.remove=(e,t)=>{let a={type:4,toastId:e};t?$(t)(a):M(a)},B.removeAll=e=>B.remove(void 0,e),B.promise=(e,t,a)=>{let s=B.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?B.success(r,{id:s,...a,...null==a?void 0:a.success}):B.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?B.error(r,{id:s,...a,...null==a?void 0:a.error}):B.dismiss(s)}),e};var H=1e3,K=(e,t="default")=>{let{toasts:a,pausedAt:s}=I(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=H)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),l({type:4,toastId:e})},t);r.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&B.dismiss(a.id);return}return setTimeout(()=>B.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let l=(0,n.useCallback)($(t),[t]),o=(0,n.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,n.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,n.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),m=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:m}}},F=j`
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
}`,V=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,J=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,q=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,G=j`
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
}`,Q=w("div")`
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
`,W=w("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(q,{...s}),"loading"!==a&&n.createElement(W,null,"error"===a?n.createElement(J,{...s}):n.createElement(Q,{...s})))},es=e=>`
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
`,el=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),l=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:l}):n.createElement(n.Fragment,null,i,l))});i=n.createElement,p.p=void 0,b=i,v=void 0,y=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},em=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=K(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,l=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?em:"",style:l},"custom"===a.type?k(a.message,a):r?r(a):n.createElement(eo,{toast:a,position:i}))}))},eu=B}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=3278)}),_N_E=e.O()}]);