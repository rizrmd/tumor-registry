(()=>{var e={};e.id=4629,e.ids=[4629],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},4131:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var a=s(482),r=s(9108),i=s(2563),n=s.n(i),l=s(8300),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);s.d(t,o);let d=["",{children:["patients",{children:["quality",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,2615)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\patients\\quality\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],c=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\patients\\quality\\page.tsx"],u="/patients/quality/page",m={require:s,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/patients/quality/page",pathname:"/patients/quality",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},6884:(e,t,s)=>{Promise.resolve().then(s.bind(s,8493))},2254:(e,t,s)=>{e.exports=s(4767)},8493:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u});var a=s(2295),r=s(3729),i=s(3973),n=s(2528),l=s(1934);let o="http://127.0.0.1:3001/api/v1";class d{getAuthHeaders(){let e=localStorage.getItem("token");return{headers:{Authorization:`Bearer ${e}`}}}async getPatientQualityScore(e){return(await l.Z.get(`${o}/quality/patient/${e}/score`,this.getAuthHeaders())).data}async getPatientQualityTrends(e,t=30){return(await l.Z.get(`${o}/quality/patient/${e}/trends?days=${t}`,this.getAuthHeaders())).data}async validatePatientData(e){return(await l.Z.get(`${o}/quality/patient/${e}/validate`,this.getAuthHeaders())).data}async getCenterQualitySummary(e){return(await l.Z.get(`${o}/quality/center/${e}/summary`,this.getAuthHeaders())).data}async getNationalQualityOverview(){return(await l.Z.get(`${o}/quality/national/overview`,this.getAuthHeaders())).data}async getStaffPerformanceLeaderboard(e){let t=e?`${o}/quality/staff-performance?centerId=${e}`:`${o}/quality/staff-performance`;return(await l.Z.get(t,this.getAuthHeaders())).data}async getMissingDataHeatmap(e){let t=e?`${o}/quality/missing-data-heatmap?centerId=${e}`:`${o}/quality/missing-data-heatmap`;return(await l.Z.get(t,this.getAuthHeaders())).data}}let c=new d;function u(){let{user:e,isAuthenticated:t,isLoading:s}=(0,i.useAuth)(),[l,o]=(0,r.useState)({overallScore:0,completeness:0,accuracy:0,timeliness:0,consistency:0}),[d,u]=(0,r.useState)([]),[m,p]=(0,r.useState)([]),[g,h]=(0,r.useState)([]),[x,f]=(0,r.useState)([]),[y,b]=(0,r.useState)("30d"),[v,j]=(0,r.useState)(!0);(0,r.useEffect)(()=>{if(!s&&!t){window.location.href="/login";return}t&&w()},[t,s,y]);let w=async()=>{try{j(!0);let[e,t,s]=await Promise.all([c.getNationalQualityOverview(),c.getStaffPerformanceLeaderboard(),c.getMissingDataHeatmap()]);if(o({overallScore:e.averageScore,completeness:e.qualityDistribution.percentages.high+e.qualityDistribution.percentages.medium,accuracy:88,timeliness:78,consistency:90}),e.trends&&e.trends.length>0){let t=e.trends.map(e=>({date:`Week ${e.week}`,score:e.averageScore,entries:e.patientCount}));h(t)}let a=[];e.qualityDistribution.percentages.low>20&&a.push(`${e.qualityDistribution.low} patients have low quality scores (< 70%) - Focus on improving data completeness`),e.qualityDistribution.percentages.high<50&&a.push("Less than 50% of patients have high quality scores - Consider staff training on data entry standards"),a.push(`Total of ${e.totalPatients} patients in quality monitoring system`),a.push("Implement automated data validation rules to improve consistency"),a.push("Schedule regular data quality audits for continuous improvement"),f(a),u(t),p(s)}catch(e){console.error("Error fetching quality dashboard data:",e),N()}finally{j(!1)}},N=()=>{u([{staffId:"1",staffName:"Dr. Ahmad Sutanto",staffEmail:"ahmad.sutanto@inamsos.go.id",entriesCount:145,avgQualityScore:94,completionRate:98,rank:1},{staffId:"2",staffName:"Siti Nurhaliza",staffEmail:"siti.nurhaliza@inamsos.go.id",entriesCount:132,avgQualityScore:91,completionRate:95,rank:2},{staffId:"3",staffName:"Budi Santoso",staffEmail:"budi.santoso@inamsos.go.id",entriesCount:128,avgQualityScore:88,completionRate:92,rank:3},{staffId:"4",staffName:"Ratna Dewi",staffEmail:"ratna.dewi@inamsos.go.id",entriesCount:115,avgQualityScore:85,completionRate:89,rank:4},{staffId:"5",staffName:"Eko Prasetyo",staffEmail:"eko.prasetyo@inamsos.go.id",entriesCount:98,avgQualityScore:82,completionRate:85,rank:5}]),p([{field:"Histologi Lengkap",missingCount:45,missingPercentage:18,priority:"high"},{field:"Stadium TNM Detail",missingCount:38,missingPercentage:15,priority:"high"},{field:"Tanggal Diagnosis",missingCount:12,missingPercentage:5,priority:"medium"},{field:"Riwayat Keluarga",missingCount:67,missingPercentage:27,priority:"medium"},{field:"Status Merokok",missingCount:52,missingPercentage:21,priority:"low"},{field:"BMI",missingCount:89,missingPercentage:36,priority:"low"}])},k=e=>e>=90?"text-green-600 bg-green-100":e>=75?"text-yellow-600 bg-yellow-100":"text-red-600 bg-red-100",$=e=>e>=90?"bg-green-500":e>=75?"bg-yellow-500":"bg-red-500",q=e=>{switch(e){case"high":return"text-red-600 bg-red-100";case"medium":return"text-yellow-600 bg-yellow-100";default:return"text-gray-600 bg-gray-100"}};return s||v?a.jsx(n.A,{children:a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),a.jsx("p",{className:"mt-4 text-gray-600",children:"Loading quality dashboard..."})]})})}):(0,a.jsxs)(n.A,{children:[a.jsx("div",{className:"mb-6",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{children:[a.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Dashboard Kualitas Data"}),a.jsx("p",{className:"text-gray-600",children:"Monitor dan tingkatkan kualitas data pasien"})]}),a.jsx("div",{children:(0,a.jsxs)("select",{value:y,onChange:e=>b(e.target.value),className:"px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[a.jsx("option",{value:"7d",children:"7 Hari Terakhir"}),a.jsx("option",{value:"30d",children:"30 Hari Terakhir"}),a.jsx("option",{value:"90d",children:"90 Hari Terakhir"}),a.jsx("option",{value:"1y",children:"1 Tahun Terakhir"})]})})]})}),a.jsx("div",{className:"bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 mb-8 text-white",children:(0,a.jsxs)("div",{className:"text-center",children:[a.jsx("h2",{className:"text-lg font-medium mb-2",children:"Skor Kualitas Keseluruhan"}),a.jsx("div",{className:"text-6xl font-bold mb-2",children:l.overallScore}),a.jsx("div",{className:"w-full bg-white bg-opacity-30 rounded-full h-3 mb-4",children:a.jsx("div",{className:"bg-white h-3 rounded-full transition-all duration-500",style:{width:`${l.overallScore}%`}})}),a.jsx("p",{className:"text-sm opacity-90",children:l.overallScore>=90?"Excellent":l.overallScore>=75?"Good":"Needs Improvement"})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-600",children:"Kelengkapan"}),a.jsx("span",{className:`text-2xl font-bold px-3 py-1 rounded-full ${k(l.completeness)}`,children:l.completeness})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:`h-2 rounded-full ${$(l.completeness)}`,style:{width:`${l.completeness}%`}})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-600",children:"Akurasi"}),a.jsx("span",{className:`text-2xl font-bold px-3 py-1 rounded-full ${k(l.accuracy)}`,children:l.accuracy})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:`h-2 rounded-full ${$(l.accuracy)}`,style:{width:`${l.accuracy}%`}})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-600",children:"Ketepatan Waktu"}),a.jsx("span",{className:`text-2xl font-bold px-3 py-1 rounded-full ${k(l.timeliness)}`,children:l.timeliness})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:`h-2 rounded-full ${$(l.timeliness)}`,style:{width:`${l.timeliness}%`}})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-600",children:"Konsistensi"}),a.jsx("span",{className:`text-2xl font-bold px-3 py-1 rounded-full ${k(l.consistency)}`,children:l.consistency})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:`h-2 rounded-full ${$(l.consistency)}`,style:{width:`${l.consistency}%`}})})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Data yang Sering Hilang"}),a.jsx("div",{className:"space-y-3",children:m.map((e,t)=>(0,a.jsxs)("div",{className:"border-b border-gray-200 pb-3 last:border-0",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[a.jsx("span",{className:"text-sm font-medium text-gray-900",children:e.field}),a.jsx("span",{className:`text-xs px-2 py-1 rounded-full ${q(e.priority)}`,children:e.priority})]}),(0,a.jsxs)("span",{className:"text-sm font-semibold text-gray-700",children:[e.missingPercentage,"%"]})]}),a.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:a.jsx("div",{className:"bg-red-500 h-2 rounded-full",style:{width:`${e.missingPercentage}%`}})}),(0,a.jsxs)("p",{className:"text-xs text-gray-500 mt-1",children:[e.missingCount," records hilang"]})]},t))})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Performa Staff Data Entry"}),a.jsx("div",{className:"space-y-3",children:d.map(e=>(0,a.jsxs)("div",{className:"flex items-center space-x-4 p-3 bg-gray-50 rounded-lg",children:[a.jsx("div",{className:"flex-shrink-0 w-8 h-8 flex items-center justify-center",children:e.rank<=3?a.jsx("span",{className:"text-2xl",children:1===e.rank?"\uD83E\uDD47":2===e.rank?"\uD83E\uDD48":"\uD83E\uDD49"}):a.jsx("span",{className:"text-gray-500 font-semibold",children:e.rank})}),(0,a.jsxs)("div",{className:"flex-1",children:[a.jsx("p",{className:"text-sm font-medium text-gray-900",children:e.staffName}),(0,a.jsxs)("div",{className:"flex items-center space-x-4 text-xs text-gray-500",children:[(0,a.jsxs)("span",{children:[e.entriesCount," entries"]}),a.jsx("span",{children:"•"}),(0,a.jsxs)("span",{children:[e.completionRate,"% completion"]})]})]}),a.jsx("div",{className:`text-lg font-bold px-3 py-1 rounded-full ${k(e.avgQualityScore)}`,children:e.avgQualityScore})]},e.staffId))})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Tren Kualitas Data"}),a.jsx("div",{className:"h-64 flex items-end space-x-1",children:g.map((e,t)=>a.jsx("div",{className:"flex-1 flex flex-col items-center",children:a.jsx("div",{className:"w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer",style:{height:`${e.score/100*100}%`},title:`${e.date}: ${e.score.toFixed(1)}% (${e.entries} entries)`})},t))}),(0,a.jsxs)("div",{className:"flex justify-between mt-4 text-xs text-gray-500",children:[a.jsx("span",{children:g[0]?.date}),a.jsx("span",{children:"Hari Ini"})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Rekomendasi Peningkatan Kualitas"}),a.jsx("div",{className:"space-y-3",children:x.map((e,t)=>(0,a.jsxs)("div",{className:"flex items-start space-x-3 p-3 bg-blue-50 rounded-lg",children:[a.jsx("svg",{className:"w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),a.jsx("p",{className:"text-sm text-gray-700",children:e})]},t))})]})]})}},2615:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>n});let a=(0,s(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\patients\quality\page.tsx`),{__esModule:r,$$typeof:i}=a,n=a.default},4669:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>eu});var a,r=s(3729);let i={data:""},n=e=>e||i,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",a="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":a+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(i,n):i+":"+n+";")}return s+(t&&r?t+"{"+r+"}":r)+a},u={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e},p=(e,t,s,a,r)=>{let i=m(e),n=u[i]||(u[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!u[n]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=l.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(s=t[3].replace(d," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);u[n]=c(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let p=s&&u.g?u.g:null;return s&&(u.g=u[n]),((e,t,s,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(u[n],t,a,p),n},g=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return p(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}h.bind({g:1});let x,f,y,b=h.bind({k:1});function v(e,t){let s=this||{};return function(){let a=arguments;function r(i,n){let l=Object.assign({},i),o=l.className||r.className;s.p=Object.assign({theme:f&&f()},l),s.o=/ *go\d+/.test(o),l.className=h.apply(s,a)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),y&&d[0]&&y(l),x(d,l)}return t?t(r):r}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),$="default",q=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return q(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},E=(e,t=$)=>{P[t]=q(P[t]||D,e),S.forEach(([e,s])=>{e===t&&s(P[t])})},A=e=>Object.keys(P).forEach(t=>E(e,t)),C=e=>Object.keys(P).find(t=>P[t].toasts.some(t=>t.id===e)),I=(e=$)=>t=>{E(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=(e={},t=$)=>{let[s,a]=(0,r.useState)(P[t]||D),i=(0,r.useRef)(P[t]);(0,r.useEffect)(()=>(i.current!==P[t]&&a(P[t]),S.push([t,a]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let n=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:n}},H=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),M=e=>(t,s)=>{let a=H(t,e,s);return I(a.toasterId||C(a.id))({type:2,toast:a}),a.id},R=(e,t)=>M("blank")(e,t);R.error=M("error"),R.success=M("success"),R.loading=M("loading"),R.custom=M("custom"),R.dismiss=(e,t)=>{let s={type:3,toastId:e};t?I(t)(s):A(s)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let s={type:4,toastId:e};t?I(t)(s):A(s)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,s)=>{let a=R.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?w(t.success,e):void 0;return r?R.success(r,{id:a,...s,...null==s?void 0:s.success}):R.dismiss(a),e}).catch(e=>{let r=t.error?w(t.error,e):void 0;r?R.error(r,{id:a,...s,...null==s?void 0:s.error}):R.dismiss(a)}),e};var _=1e3,z=(e,t="default")=>{let{toasts:s,pausedAt:a}=T(e,t),i=(0,r.useRef)(new Map).current,n=(0,r.useCallback)((e,t=_)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&R.dismiss(s.id);return}return setTimeout(()=>R.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let l=(0,r.useCallback)(I(t),[t]),o=(0,r.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,r.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,r.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,n]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}},L=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Q=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Z=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Q} 0.15s ease-out forwards;
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
    animation: ${K} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,G=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=b`
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
}`,U=v("div")`
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
`,X=v("div")`
  position: absolute;
`,Y=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=b`
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
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(V,null,t):t:"blank"===s?null:r.createElement(Y,null,r.createElement(B,{...a}),"loading"!==s&&r.createElement(X,null,"error"===s?r.createElement(Z,{...a}):r.createElement(U,{...a})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
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
`,er=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=r.createElement(ee,{toast:e}),l=r.createElement(er,{...e.ariaProps},w(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:n,message:l}):r.createElement(r.Fragment,null,n,l))});a=r.createElement,c.p=void 0,x=a,f=void 0,y=void 0;var el=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let n=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:n,className:t,style:s},i)},eo=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=z(s,n);return r.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let n=s.position||t,l=eo(n,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(el,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:l},"custom"===s.type?w(s.message,s):i?i(s):r.createElement(en,{toast:s,position:n}))}))},eu=R}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[7141,4192,2528],()=>s(4131));module.exports=a})();