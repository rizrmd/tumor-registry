(()=>{var e={};e.id=5148,e.ids=[5148],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},5756:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c});var r=a(482),s=a(9108),i=a(2563),n=a.n(i),o=a(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let c=["",{children:["research",{children:["publications",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,7138)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\research\\publications\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,8549)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,8206)),"D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\not-found.tsx"]}],d=["D:\\Project\\Tumor Registry\\INAMSOS Application Desktop\\frontend\\src\\app\\research\\publications\\page.tsx"],u="/research/publications/page",m={require:a,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/research/publications/page",pathname:"/research/publications",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},3276:(e,t,a)=>{Promise.resolve().then(a.bind(a,1513))},2254:(e,t,a)=>{e.exports=a(4767)},1513:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var r=a(2295),s=a(3729),i=a(3973),n=a(2528);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),[o,l]=(0,s.useState)([]),[c,d]=(0,s.useState)([]),[u,m]=(0,s.useState)(""),[p,x]=(0,s.useState)(""),[h,g]=(0,s.useState)(""),[f,y]=(0,s.useState)(!0),[b,v]=(0,s.useState)(!1),[j,N]=(0,s.useState)({title:"",authors:"",journal:"",year:new Date().getFullYear().toString(),doi:"",abstract:"",datasetUsed:""}),w={totalPublications:o.length,totalCitations:o.reduce((e,t)=>e+t.citations,0),avgImpactFactor:"3.45",thisYear:o.filter(e=>e.year===new Date().getFullYear()).length};(0,s.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&k()},[t,a]),(0,s.useEffect)(()=>{let e=[...o];u&&(e=e.filter(e=>e.year.toString()===u)),p&&(e=e.filter(e=>e.journal===p)),h&&(e=e.filter(e=>e.title.toLowerCase().includes(h.toLowerCase())||e.authors.toLowerCase().includes(h.toLowerCase()))),d(e)},[u,p,h,o]);let k=async()=>{try{y(!0);let e=[{id:"PUB-001",title:"Survival Analysis of Stage II-III Breast Cancer Patients in Indonesian Population",authors:"Siti Aminah, Ahmad Hartono, Bambang Sutrisno, et al.",journal:"Asian Pacific Journal of Cancer Prevention",year:2025,citations:12,datasetUsed:"INAMSOS Breast Cancer Registry 2020-2024",doi:"10.31557/APJCP.2025.26.1.123",abstract:"Background: Breast cancer is the most common cancer among Indonesian women. This study analyzes survival rates and prognostic factors. Methods: Retrospective cohort study using INAMSOS registry data. Results: 5-year survival rate was 68% for stage II and 45% for stage III."},{id:"PUB-002",title:"Epidemiological Trends of Lung Cancer in Indonesia: A 5-Year Analysis",authors:"Eko Prasetyo, Ratna Dewi, Maya Sari",journal:"The Lancet Regional Health - Western Pacific",year:2025,citations:28,datasetUsed:"INAMSOS National Cancer Registry 2020-2024",doi:"10.1016/j.lanwpc.2025.100892",abstract:"We analyzed 5-year epidemiological trends of lung cancer in Indonesia using national registry data. Incidence rates, histological types, and geographic distribution were examined. Significant regional variations were observed."},{id:"PUB-003",title:"Cost-Effectiveness Analysis of Chemotherapy Protocols for Colorectal Cancer",authors:"Budi Santoso, Dewi Lestari, Hendra Wijaya, et al.",journal:"Journal of Clinical Oncology",year:2024,citations:45,datasetUsed:"INAMSOS Colorectal Cancer Registry 2019-2023",doi:"10.1200/JCO.2024.42.16.2345",abstract:"This study evaluates cost-effectiveness of different chemotherapy protocols for colorectal cancer in Indonesian healthcare setting. FOLFOX showed superior cost-effectiveness compared to other regimens."},{id:"PUB-004",title:"Cervical Cancer Screening Patterns and Risk Factors in Young Indonesian Women",authors:"Rina Kusuma, Lina Permata, Andry Hartono",journal:"International Journal of Gynecological Cancer",year:2024,citations:34,datasetUsed:"INAMSOS Cervical Cancer Registry 2018-2023",doi:"10.1136/ijgc-2024-005234",abstract:"We investigated cervical cancer risk factors and screening patterns among women <35 years. Low screening uptake and high-risk HPV prevalence were identified as key concerns requiring targeted interventions."},{id:"PUB-005",title:"Genetic Markers and Personalized Medicine in Hepatocellular Carcinoma",authors:"Bambang Sutrisno, Ahmad Fauzi, Siti Aminah, et al.",journal:"Nature Communications",year:2024,citations:67,datasetUsed:"INAMSOS Liver Cancer Genomic Study 2021-2024",doi:"10.1038/s41467-024-48923-1",abstract:"Comprehensive genomic profiling of hepatocellular carcinoma in Indonesian patients identified novel genetic markers associated with treatment response and prognosis, paving way for personalized medicine approaches."},{id:"PUB-006",title:"Radiotherapy Outcomes in Head and Neck Cancer: Multi-center Study",authors:"Eko Prasetyo, Ratna Dewi, Hendra Wijaya",journal:"Radiotherapy and Oncology",year:2024,citations:23,datasetUsed:"INAMSOS Head & Neck Cancer Registry 2020-2023",doi:"10.1016/j.radonc.2024.109876",abstract:"Multi-center analysis of radiotherapy outcomes for head and neck cancer across 8 Indonesian cancer centers. Treatment adherence and outcomes were comparable to international standards."},{id:"PUB-007",title:"Immunotherapy Efficacy in Advanced Non-Small Cell Lung Cancer",authors:"Maya Sari, Andry Hartono, Bambang Sutrisno",journal:"Journal of Thoracic Oncology",year:2023,citations:56,datasetUsed:"INAMSOS Lung Cancer Immunotherapy Cohort 2020-2023",doi:"10.1016/j.jtho.2023.05.012",abstract:"Real-world evidence of immunotherapy efficacy in advanced NSCLC patients from Indonesian population. Response rates and survival outcomes were analyzed with biomarker correlation."},{id:"PUB-008",title:"Pediatric Leukemia Treatment Outcomes: National Registry Analysis",authors:"Budi Santoso, Dewi Lestari, Rina Kusuma, et al.",journal:"The Lancet Haematology",year:2023,citations:41,datasetUsed:"INAMSOS Pediatric Cancer Registry 2018-2022",doi:"10.1016/S2352-3026(23)00156-8",abstract:"Comprehensive analysis of pediatric leukemia treatment outcomes from Indonesian national registry. Five-year survival rates improved significantly over the study period, attributed to standardized protocols."},{id:"PUB-009",title:"Palliative Care Integration in Cancer Treatment: Indonesian Experience",authors:"Lina Permata, Ahmad Fauzi, Ratna Dewi",journal:"Journal of Pain and Symptom Management",year:2023,citations:18,datasetUsed:"INAMSOS Palliative Care Registry 2019-2022",doi:"10.1016/j.jpainsymman.2023.03.015",abstract:"Evaluation of palliative care integration in cancer treatment across Indonesian cancer centers. Early palliative care improved quality of life and reduced hospital admissions."},{id:"PUB-010",title:"Nutritional Status and Treatment Outcomes in Cancer Patients",authors:"Siti Aminah, Budi Santoso, Maya Sari",journal:"Clinical Nutrition",year:2023,citations:29,datasetUsed:"INAMSOS Multi-cancer Registry 2019-2022",doi:"10.1016/j.clnu.2023.02.018",abstract:"Impact of nutritional status on cancer treatment outcomes was assessed. Malnutrition was prevalent and significantly associated with worse treatment tolerance and survival outcomes."}];l(e),d(e)}catch(e){console.error("Error fetching publications:",e)}finally{y(!1)}},C=Array.from(new Set(o.map(e=>e.year))).sort((e,t)=>t-e),S=Array.from(new Set(o.map(e=>e.journal))).sort(),P=e=>{let t=`${e.authors} (${e.year}). ${e.title}. ${e.journal}. doi:${e.doi}`;alert(`Sitasi:

${t}

Fitur download dalam format BibTeX/RIS akan segera diimplementasikan.`)};return a||f?r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,r.jsxs)(n.A,{children:[r.jsx("div",{className:"mb-6",children:(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Publikasi Penelitian"}),r.jsx("p",{className:"text-gray-600",children:"Publikasi yang menggunakan data INAMSOS"})]}),r.jsx("button",{onClick:()=>{N({title:"",authors:"",journal:"",year:new Date().getFullYear().toString(),doi:"",abstract:"",datasetUsed:""}),v(!0)},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"+ Tambah Publikasi"})]})}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-blue-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total Publikasi"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:w.totalPublications})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-green-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Total Sitasi"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:w.totalCitations})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-purple-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Avg Impact Factor"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:w.avgImpactFactor})]})]})}),r.jsx("div",{className:"bg-white rounded-lg shadow p-6",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 bg-yellow-100 rounded-lg",children:r.jsx("svg",{className:"h-6 w-6 text-yellow-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,r.jsxs)("div",{className:"ml-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Tahun Ini"}),r.jsx("p",{className:"text-2xl font-semibold text-gray-900",children:w.thisYear})]})]})})]}),r.jsx("div",{className:"bg-white rounded-lg shadow p-4 mb-6",children:(0,r.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4",children:[r.jsx("div",{className:"flex-1",children:(0,r.jsxs)("div",{className:"relative",children:[r.jsx("svg",{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),r.jsx("input",{type:"text",value:h,onChange:e=>g(e.target.value),placeholder:"Cari judul atau penulis...",className:"w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})}),r.jsx("div",{children:(0,r.jsxs)("select",{value:u,onChange:e=>m(e.target.value),className:"px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[r.jsx("option",{value:"",children:"Semua Tahun"}),C.map(e=>r.jsx("option",{value:e,children:e},e))]})}),r.jsx("div",{children:(0,r.jsxs)("select",{value:p,onChange:e=>x(e.target.value),className:"px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[r.jsx("option",{value:"",children:"Semua Jurnal"}),S.map(e=>r.jsx("option",{value:e,children:e},e))]})}),(u||p||h)&&r.jsx("button",{onClick:()=>{m(""),x(""),g("")},className:"px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium",children:"Reset"})]})}),(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[r.jsx("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,r.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Daftar Publikasi (",c.length,")"]})}),r.jsx("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[r.jsx("thead",{className:"bg-gray-50",children:(0,r.jsxs)("tr",{children:[r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Judul"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Penulis"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Jurnal"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tahun"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Sitasi"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dataset INAMSOS"}),r.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),r.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:c.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[r.jsx("td",{className:"px-6 py-4",children:r.jsx("div",{className:"text-sm font-medium text-gray-900 max-w-xs",children:e.title})}),r.jsx("td",{className:"px-6 py-4",children:r.jsx("div",{className:"text-sm text-gray-500 max-w-xs truncate",children:e.authors})}),r.jsx("td",{className:"px-6 py-4",children:r.jsx("div",{className:"text-sm text-gray-900 max-w-xs truncate",children:e.journal})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-900",children:e.year})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full",children:e.citations})}),r.jsx("td",{className:"px-6 py-4",children:r.jsx("div",{className:"text-sm text-gray-500 max-w-xs truncate",children:e.datasetUsed})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,r.jsxs)("div",{className:"flex space-x-2",children:[r.jsx("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-900 font-medium",children:"Link"}),r.jsx("button",{onClick:()=>P(e),className:"text-green-600 hover:text-green-900 font-medium",children:"Sitasi"})]})})]},e.id))})]})}),0===c.length&&(0,r.jsxs)("div",{className:"text-center py-12",children:[r.jsx("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})}),r.jsx("p",{className:"mt-4 text-gray-500",children:"Tidak ada publikasi yang sesuai dengan filter"})]})]}),b&&r.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:r.jsx("div",{className:"bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[r.jsx("h2",{className:"text-xl font-bold text-gray-900",children:"Tambah Publikasi"}),r.jsx("button",{onClick:()=>v(!1),className:"text-gray-400 hover:text-gray-600",children:r.jsx("svg",{className:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Judul Publikasi *"}),r.jsx("input",{type:"text",value:j.title,onChange:e=>N({...j,title:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Masukkan judul publikasi"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Penulis *"}),r.jsx("input",{type:"text",value:j.authors,onChange:e=>N({...j,authors:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Contoh: John Doe, Jane Smith, et al."})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Jurnal *"}),r.jsx("input",{type:"text",value:j.journal,onChange:e=>N({...j,journal:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Nama jurnal"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Tahun *"}),r.jsx("input",{type:"number",value:j.year,onChange:e=>N({...j,year:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"2025",min:"1900",max:"2100"})]})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"DOI *"}),r.jsx("input",{type:"text",value:j.doi,onChange:e=>N({...j,doi:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"10.1234/example.2025.123456"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Dataset INAMSOS yang Digunakan *"}),r.jsx("input",{type:"text",value:j.datasetUsed,onChange:e=>N({...j,datasetUsed:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Contoh: INAMSOS Breast Cancer Registry 2020-2024"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Abstract"}),r.jsx("textarea",{value:j.abstract,onChange:e=>N({...j,abstract:e.target.value}),rows:4,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Masukkan abstrak publikasi"})]})]}),(0,r.jsxs)("div",{className:"flex justify-end space-x-3 mt-6",children:[r.jsx("button",{onClick:()=>v(!1),className:"px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium",children:"Batal"}),r.jsx("button",{onClick:()=>{if(!j.title||!j.authors||!j.journal||!j.year||!j.doi||!j.datasetUsed){alert("Mohon lengkapi semua field yang diperlukan");return}let e={id:`PUB-${String(o.length+1).padStart(3,"0")}`,title:j.title,authors:j.authors,journal:j.journal,year:parseInt(j.year),doi:j.doi,abstract:j.abstract,datasetUsed:j.datasetUsed,citations:0};l(t=>[e,...t]),alert("Publikasi berhasil ditambahkan"),v(!1)},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Tambah Publikasi"})]})]})})})]}):r.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),r.jsx("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},7138:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>i,__esModule:()=>s,default:()=>n});let r=(0,a(6843).createProxy)(String.raw`D:\Project\Tumor Registry\INAMSOS Application Desktop\frontend\src\app\research\publications\page.tsx`),{__esModule:s,$$typeof:i}=r,n=r.default},4669:(e,t,a)=>{"use strict";a.d(t,{x7:()=>ed,ZP:()=>eu});var r,s=a(3729);let i={data:""},n=e=>e||i,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":r+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,n):i+":"+n+";")}return a+(t&&s?t+"{"+s+"}":s)+r},u={},m=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+m(e[a]);return t}return e},p=(e,t,a,r,s)=>{let i=m(e),n=u[i]||(u[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!u[n]){let t=i!==e?e:(e=>{let t,a,r=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(a=t[3].replace(c," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(c," ").trim();return r[0]})(e);u[n]=d(s?{["@keyframes "+n]:t}:t,a?"":"."+n)}let p=a&&u.g?u.g:null;return a&&(u.g=u[n]),((e,t,a,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(u[n],t,r,p),n},x=(e,t,a)=>e.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function h(e){let t=this||{},a=e.call?e(t.p):e;return p(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,n(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,f,y,b=h.bind({k:1});function v(e,t){let a=this||{};return function(){let r=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;a.p=Object.assign({theme:f&&f()},o),a.o=/ *go\d+/.test(l),o.className=h.apply(a,r)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),y&&c[0]&&y(o),g(c,o)}return t?t(s):s}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),C="default",S=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return S(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},P=[],I={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},M=(e,t=C)=>{A[t]=S(A[t]||I,e),P.forEach(([e,a])=>{e===t&&a(A[t])})},O=e=>Object.keys(A).forEach(t=>M(e,t)),L=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),E=(e=C)=>t=>{M(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=(e={},t=C)=>{let[a,r]=(0,s.useState)(A[t]||I),i=(0,s.useRef)(A[t]);(0,s.useEffect)(()=>(i.current!==A[t]&&r(A[t]),P.push([t,r]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:n}},B=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||w()}),T=e=>(t,a)=>{let r=B(t,e,a);return E(r.toasterId||L(r.id))({type:2,toast:r}),r.id},U=(e,t)=>T("blank")(e,t);U.error=T("error"),U.success=T("success"),U.loading=T("loading"),U.custom=T("custom"),U.dismiss=(e,t)=>{let a={type:3,toastId:e};t?E(t)(a):O(a)},U.dismissAll=e=>U.dismiss(void 0,e),U.remove=(e,t)=>{let a={type:4,toastId:e};t?E(t)(a):O(a)},U.removeAll=e=>U.remove(void 0,e),U.promise=(e,t,a)=>{let r=U.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?N(t.success,e):void 0;return s?U.success(s,{id:r,...a,...null==a?void 0:a.success}):U.dismiss(r),e}).catch(e=>{let s=t.error?N(t.error,e):void 0;s?U.error(s,{id:r,...a,...null==a?void 0:a.error}):U.dismiss(r)}),e};var $=1e3,q=(e,t="default")=>{let{toasts:a,pausedAt:r}=R(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=$)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&U.dismiss(a.id);return}return setTimeout(()=>U.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let o=(0,s.useCallback)(E(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,s.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},z=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=v("div")`
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
    animation: ${F} 0.15s ease-out forwards;
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
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,J=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,W=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${J} 1s linear infinite;
`,Y=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=b`
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
}`,V=v("div")`
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
`,X=v("div")`
  position: absolute;
`,K=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Z=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Z} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(Q,null,t):t:"blank"===a?null:s.createElement(K,null,s.createElement(W,{...r}),"loading"!==a&&s.createElement(X,null,"error"===a?s.createElement(H,{...r}):s.createElement(V,{...r})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=v("div")`
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
`,ei=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(a),ea(a)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(ee,{toast:e}),o=s.createElement(es,{...e.ariaProps},N(e.message,e));return s.createElement(er,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});r=s.createElement,d.p=void 0,g=r,f=void 0,y=void 0;var eo=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let n=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:n,className:t,style:a},i)},el=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ec=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=q(a,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let n=a.position||t,o=el(n,d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return s.createElement(eo,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?ec:"",style:o},"custom"===a.type?N(a.message,a):i?i(a):s.createElement(en,{toast:a,position:n}))}))},eu=U}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[7141,4192,2528],()=>a(5756));module.exports=r})();