(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4629],{1447:function(e,t,a){Promise.resolve().then(a.bind(a,1910))},1910:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return u}});var s=a(7437),i=a(2265),r=a(6986),n=a(4894),o=a(4829);let l="http://127.0.0.1:3001/api/v1";class c{getAuthHeaders(){let e=localStorage.getItem("token");return{headers:{Authorization:"Bearer ".concat(e)}}}async getPatientQualityScore(e){return(await o.Z.get("".concat(l,"/quality/patient/").concat(e,"/score"),this.getAuthHeaders())).data}async getPatientQualityTrends(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30;return(await o.Z.get("".concat(l,"/quality/patient/").concat(e,"/trends?days=").concat(t),this.getAuthHeaders())).data}async validatePatientData(e){return(await o.Z.get("".concat(l,"/quality/patient/").concat(e,"/validate"),this.getAuthHeaders())).data}async getCenterQualitySummary(e){return(await o.Z.get("".concat(l,"/quality/center/").concat(e,"/summary"),this.getAuthHeaders())).data}async getNationalQualityOverview(){return(await o.Z.get("".concat(l,"/quality/national/overview"),this.getAuthHeaders())).data}async getStaffPerformanceLeaderboard(e){let t=e?"".concat(l,"/quality/staff-performance?centerId=").concat(e):"".concat(l,"/quality/staff-performance");return(await o.Z.get(t,this.getAuthHeaders())).data}async getMissingDataHeatmap(e){let t=e?"".concat(l,"/quality/missing-data-heatmap?centerId=").concat(e):"".concat(l,"/quality/missing-data-heatmap");return(await o.Z.get(t,this.getAuthHeaders())).data}}let d=new c;function u(){var e;let{user:t,isAuthenticated:a,isLoading:o}=(0,r.useAuth)(),[l,c]=(0,i.useState)({overallScore:0,completeness:0,accuracy:0,timeliness:0,consistency:0}),[u,m]=(0,i.useState)([]),[p,g]=(0,i.useState)([]),[f,h]=(0,i.useState)([]),[x,y]=(0,i.useState)([]),[b,v]=(0,i.useState)("30d"),[j,w]=(0,i.useState)(!0);(0,i.useEffect)(()=>{if(!o&&!a){window.location.href="/login";return}a&&N()},[a,o,b]);let N=async()=>{try{w(!0);let[e,t,a]=await Promise.all([d.getNationalQualityOverview(),d.getStaffPerformanceLeaderboard(),d.getMissingDataHeatmap()]);if(c({overallScore:e.averageScore,completeness:e.qualityDistribution.percentages.high+e.qualityDistribution.percentages.medium,accuracy:88,timeliness:78,consistency:90}),e.trends&&e.trends.length>0){let t=e.trends.map(e=>({date:"Week ".concat(e.week),score:e.averageScore,entries:e.patientCount}));h(t)}let s=[];e.qualityDistribution.percentages.low>20&&s.push("".concat(e.qualityDistribution.low," patients have low quality scores (< 70%) - Focus on improving data completeness")),e.qualityDistribution.percentages.high<50&&s.push("Less than 50% of patients have high quality scores - Consider staff training on data entry standards"),s.push("Total of ".concat(e.totalPatients," patients in quality monitoring system")),s.push("Implement automated data validation rules to improve consistency"),s.push("Schedule regular data quality audits for continuous improvement"),y(s),m(t),g(a)}catch(e){console.error("Error fetching quality dashboard data:",e),k()}finally{w(!1)}},k=()=>{m([{staffId:"1",staffName:"Dr. Ahmad Sutanto",staffEmail:"ahmad.sutanto@inamsos.go.id",entriesCount:145,avgQualityScore:94,completionRate:98,rank:1},{staffId:"2",staffName:"Siti Nurhaliza",staffEmail:"siti.nurhaliza@inamsos.go.id",entriesCount:132,avgQualityScore:91,completionRate:95,rank:2},{staffId:"3",staffName:"Budi Santoso",staffEmail:"budi.santoso@inamsos.go.id",entriesCount:128,avgQualityScore:88,completionRate:92,rank:3},{staffId:"4",staffName:"Ratna Dewi",staffEmail:"ratna.dewi@inamsos.go.id",entriesCount:115,avgQualityScore:85,completionRate:89,rank:4},{staffId:"5",staffName:"Eko Prasetyo",staffEmail:"eko.prasetyo@inamsos.go.id",entriesCount:98,avgQualityScore:82,completionRate:85,rank:5}]),g([{field:"Histologi Lengkap",missingCount:45,missingPercentage:18,priority:"high"},{field:"Stadium TNM Detail",missingCount:38,missingPercentage:15,priority:"high"},{field:"Tanggal Diagnosis",missingCount:12,missingPercentage:5,priority:"medium"},{field:"Riwayat Keluarga",missingCount:67,missingPercentage:27,priority:"medium"},{field:"Status Merokok",missingCount:52,missingPercentage:21,priority:"low"},{field:"BMI",missingCount:89,missingPercentage:36,priority:"low"}])},E=e=>e>=90?"text-green-600 bg-green-100":e>=75?"text-yellow-600 bg-yellow-100":"text-red-600 bg-red-100",S=e=>e>=90?"bg-green-500":e>=75?"bg-yellow-500":"bg-red-500",D=e=>{switch(e){case"high":return"text-red-600 bg-red-100";case"medium":return"text-yellow-600 bg-yellow-100";default:return"text-gray-600 bg-gray-100"}};return o||j?(0,s.jsx)(n.A,{children:(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading quality dashboard..."})]})})}):(0,s.jsxs)(n.A,{children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Dashboard Kualitas Data"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Monitor dan tingkatkan kualitas data pasien"})]}),(0,s.jsx)("div",{children:(0,s.jsxs)("select",{value:b,onChange:e=>v(e.target.value),className:"px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"7d",children:"7 Hari Terakhir"}),(0,s.jsx)("option",{value:"30d",children:"30 Hari Terakhir"}),(0,s.jsx)("option",{value:"90d",children:"90 Hari Terakhir"}),(0,s.jsx)("option",{value:"1y",children:"1 Tahun Terakhir"})]})})]})}),(0,s.jsx)("div",{className:"bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 mb-8 text-white",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("h2",{className:"text-lg font-medium mb-2",children:"Skor Kualitas Keseluruhan"}),(0,s.jsx)("div",{className:"text-6xl font-bold mb-2",children:l.overallScore}),(0,s.jsx)("div",{className:"w-full bg-white bg-opacity-30 rounded-full h-3 mb-4",children:(0,s.jsx)("div",{className:"bg-white h-3 rounded-full transition-all duration-500",style:{width:"".concat(l.overallScore,"%")}})}),(0,s.jsx)("p",{className:"text-sm opacity-90",children:l.overallScore>=90?"Excellent":l.overallScore>=75?"Good":"Needs Improvement"})]})}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,s.jsx)("h3",{className:"text-sm font-medium text-gray-600",children:"Kelengkapan"}),(0,s.jsx)("span",{className:"text-2xl font-bold px-3 py-1 rounded-full ".concat(E(l.completeness)),children:l.completeness})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"h-2 rounded-full ".concat(S(l.completeness)),style:{width:"".concat(l.completeness,"%")}})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,s.jsx)("h3",{className:"text-sm font-medium text-gray-600",children:"Akurasi"}),(0,s.jsx)("span",{className:"text-2xl font-bold px-3 py-1 rounded-full ".concat(E(l.accuracy)),children:l.accuracy})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"h-2 rounded-full ".concat(S(l.accuracy)),style:{width:"".concat(l.accuracy,"%")}})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,s.jsx)("h3",{className:"text-sm font-medium text-gray-600",children:"Ketepatan Waktu"}),(0,s.jsx)("span",{className:"text-2xl font-bold px-3 py-1 rounded-full ".concat(E(l.timeliness)),children:l.timeliness})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"h-2 rounded-full ".concat(S(l.timeliness)),style:{width:"".concat(l.timeliness,"%")}})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,s.jsx)("h3",{className:"text-sm font-medium text-gray-600",children:"Konsistensi"}),(0,s.jsx)("span",{className:"text-2xl font-bold px-3 py-1 rounded-full ".concat(E(l.consistency)),children:l.consistency})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"h-2 rounded-full ".concat(S(l.consistency)),style:{width:"".concat(l.consistency,"%")}})})]})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8",children:[(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Data yang Sering Hilang"}),(0,s.jsx)("div",{className:"space-y-3",children:p.map((e,t)=>(0,s.jsxs)("div",{className:"border-b border-gray-200 pb-3 last:border-0",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,s.jsx)("span",{className:"text-sm font-medium text-gray-900",children:e.field}),(0,s.jsx)("span",{className:"text-xs px-2 py-1 rounded-full ".concat(D(e.priority)),children:e.priority})]}),(0,s.jsxs)("span",{className:"text-sm font-semibold text-gray-700",children:[e.missingPercentage,"%"]})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2",children:(0,s.jsx)("div",{className:"bg-red-500 h-2 rounded-full",style:{width:"".concat(e.missingPercentage,"%")}})}),(0,s.jsxs)("p",{className:"text-xs text-gray-500 mt-1",children:[e.missingCount," records hilang"]})]},t))})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Performa Staff Data Entry"}),(0,s.jsx)("div",{className:"space-y-3",children:u.map(e=>(0,s.jsxs)("div",{className:"flex items-center space-x-4 p-3 bg-gray-50 rounded-lg",children:[(0,s.jsx)("div",{className:"flex-shrink-0 w-8 h-8 flex items-center justify-center",children:e.rank<=3?(0,s.jsx)("span",{className:"text-2xl",children:1===e.rank?"\uD83E\uDD47":2===e.rank?"\uD83E\uDD48":"\uD83E\uDD49"}):(0,s.jsx)("span",{className:"text-gray-500 font-semibold",children:e.rank})}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.staffName}),(0,s.jsxs)("div",{className:"flex items-center space-x-4 text-xs text-gray-500",children:[(0,s.jsxs)("span",{children:[e.entriesCount," entries"]}),(0,s.jsx)("span",{children:"•"}),(0,s.jsxs)("span",{children:[e.completionRate,"% completion"]})]})]}),(0,s.jsx)("div",{className:"text-lg font-bold px-3 py-1 rounded-full ".concat(E(e.avgQualityScore)),children:e.avgQualityScore})]},e.staffId))})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Tren Kualitas Data"}),(0,s.jsx)("div",{className:"h-64 flex items-end space-x-1",children:f.map((e,t)=>(0,s.jsx)("div",{className:"flex-1 flex flex-col items-center",children:(0,s.jsx)("div",{className:"w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer",style:{height:"".concat(e.score/100*100,"%")},title:"".concat(e.date,": ").concat(e.score.toFixed(1),"% (").concat(e.entries," entries)")})},t))}),(0,s.jsxs)("div",{className:"flex justify-between mt-4 text-xs text-gray-500",children:[(0,s.jsx)("span",{children:null===(e=f[0])||void 0===e?void 0:e.date}),(0,s.jsx)("span",{children:"Hari Ini"})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Rekomendasi Peningkatan Kualitas"}),(0,s.jsx)("div",{className:"space-y-3",children:x.map((e,t)=>(0,s.jsxs)("div",{className:"flex items-start space-x-3 p-3 bg-blue-50 rounded-lg",children:[(0,s.jsx)("svg",{className:"w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,s.jsx)("p",{className:"text-sm text-gray-700",children:e})]},t))})]})]})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,i;a.d(t,{x7:function(){return em},ZP:function(){return ep}});var r,n=a(2265);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",s="",i="";for(let r in e){let n=e[r];"@"==r[0]?"i"==r[1]?a=r+" "+n+";":s+="f"==r[1]?m(n,r):r+"{"+m(n,"k"==r[1]?"":t)+"}":"object"==typeof n?s+=m(n,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=n&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(r,n):r+":"+n+";")}return a+(t&&i?t+"{"+i+"}":i)+s},p={},g=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+g(e[a]);return t}return e},f=(e,t,a,s,i)=>{var r;let n=g(e),o=p[n]||(p[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);p[o]=m(i?{["@keyframes "+o]:t}:t,a?"":"."+o)}let l=a&&p.g?p.g:null;return a&&(p.g=p[o]),r=p[o],l?t.data=t.data.replace(l,r):-1===t.data.indexOf(r)&&(t.data=s?r+t.data:t.data+r),o},h=(e,t,a)=>e.reduce((e,s,i)=>{let r=t[i];if(r&&r.call){let e=r(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==r?"":r)},"");function x(e){let t=this||{},a=e.call?e(t.p):e;return f(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let y,b,v,j=x.bind({k:1});function w(e,t){let a=this||{};return function(){let s=arguments;function i(r,n){let o=Object.assign({},r),l=o.className||i.className;a.p=Object.assign({theme:b&&b()},o),a.o=/ *go\d+/.test(l),o.className=x.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),v&&c[0]&&v(o),y(c,o)}return t?t(i):i}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(s=0,()=>(++s).toString()),S=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},D="default",C=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return C(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},P=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},q=(e,t=D)=>{I[t]=C(I[t]||A,e),P.forEach(([e,a])=>{e===t&&a(I[t])})},H=e=>Object.keys(I).forEach(t=>q(e,t)),$=e=>Object.keys(I).find(t=>I[t].toasts.some(t=>t.id===e)),O=(e=D)=>t=>{q(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={},t=D)=>{let[a,s]=(0,n.useState)(I[t]||A),i=(0,n.useRef)(I[t]);(0,n.useEffect)(()=>(i.current!==I[t]&&s(I[t]),P.push([t,s]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let r=a.toasts.map(t=>{var a,s,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...a,toasts:r}},L=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),M=e=>(t,a)=>{let s=L(t,e,a);return O(s.toasterId||$(s.id))({type:2,toast:s}),s.id},_=(e,t)=>M("blank")(e,t);_.error=M("error"),_.success=M("success"),_.loading=M("loading"),_.custom=M("custom"),_.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):H(a)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):H(a)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,a)=>{let s=_.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?k(t.success,e):void 0;return i?_.success(i,{id:s,...a,...null==a?void 0:a.success}):_.dismiss(s),e}).catch(e=>{let i=t.error?k(t.error,e):void 0;i?_.error(i,{id:s,...a,...null==a?void 0:a.error}):_.dismiss(s)}),e};var Q=1e3,R=(e,t="default")=>{let{toasts:a,pausedAt:s}=z(e,t),i=(0,n.useRef)(new Map).current,r=(0,n.useCallback)((e,t=Q)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),i=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&_.dismiss(a.id);return}return setTimeout(()=>_.dismiss(a.id,t),s)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let o=(0,n.useCallback)(O(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,n.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:i=8,defaultPosition:r}=t||{},n=a.filter(t=>(t.position||r)===(e.position||r)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,r]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},K=j`
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
}`,F=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${F} 0.15s ease-out forwards;
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
`,U=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
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
}`,J=w("div")`
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
`,V=w("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(X,null,n.createElement(U,{...s}),"loading"!==a&&n.createElement(V,null,"error"===a?n.createElement(B,{...s}):n.createElement(J,{...s})))},es=e=>`
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
`,en=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=S()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),ei(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},r=n.createElement(ea,{toast:e}),o=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(er,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof s?s({icon:r,message:o}):n.createElement(n.Fragment,null,r,o))});r=n.createElement,m.p=void 0,y=r,b=void 0,v=void 0;var ec=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let r=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:r,className:t,style:a},i)},ed=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:S()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:r,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=R(a,r);return n.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let r=a.position||t,o=ed(r,d.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ec,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?eu:"",style:o},"custom"===a.type?k(a.message,a):i?i(a):n.createElement(el,{toast:a,position:r}))}))},ep=_}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=1447)}),_N_E=e.O()}]);