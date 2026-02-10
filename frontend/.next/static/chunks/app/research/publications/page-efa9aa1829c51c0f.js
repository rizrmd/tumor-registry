(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5148],{8770:function(e,t,a){Promise.resolve().then(a.bind(a,4310))},4310:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var s=a(7437),r=a(2265),i=a(6986),n=a(4894);function o(){let{user:e,isAuthenticated:t,isLoading:a}=(0,i.useAuth)(),[o,l]=(0,r.useState)([]),[d,c]=(0,r.useState)([]),[u,m]=(0,r.useState)(""),[p,h]=(0,r.useState)(""),[x,g]=(0,r.useState)(""),[f,y]=(0,r.useState)(!0),[b,v]=(0,r.useState)(!1),[j,N]=(0,r.useState)({title:"",authors:"",journal:"",year:new Date().getFullYear().toString(),doi:"",abstract:"",datasetUsed:""}),w={totalPublications:o.length,totalCitations:o.reduce((e,t)=>e+t.citations,0),avgImpactFactor:"3.45",thisYear:o.filter(e=>e.year===new Date().getFullYear()).length};(0,r.useEffect)(()=>{if(!a&&!t){window.location.href="/login";return}t&&k()},[t,a]),(0,r.useEffect)(()=>{let e=[...o];u&&(e=e.filter(e=>e.year.toString()===u)),p&&(e=e.filter(e=>e.journal===p)),x&&(e=e.filter(e=>e.title.toLowerCase().includes(x.toLowerCase())||e.authors.toLowerCase().includes(x.toLowerCase()))),c(e)},[u,p,x,o]);let k=async()=>{try{y(!0);let e=[{id:"PUB-001",title:"Survival Analysis of Stage II-III Breast Cancer Patients in Indonesian Population",authors:"Siti Aminah, Ahmad Hartono, Bambang Sutrisno, et al.",journal:"Asian Pacific Journal of Cancer Prevention",year:2025,citations:12,datasetUsed:"INAMSOS Breast Cancer Registry 2020-2024",doi:"10.31557/APJCP.2025.26.1.123",abstract:"Background: Breast cancer is the most common cancer among Indonesian women. This study analyzes survival rates and prognostic factors. Methods: Retrospective cohort study using INAMSOS registry data. Results: 5-year survival rate was 68% for stage II and 45% for stage III."},{id:"PUB-002",title:"Epidemiological Trends of Lung Cancer in Indonesia: A 5-Year Analysis",authors:"Eko Prasetyo, Ratna Dewi, Maya Sari",journal:"The Lancet Regional Health - Western Pacific",year:2025,citations:28,datasetUsed:"INAMSOS National Cancer Registry 2020-2024",doi:"10.1016/j.lanwpc.2025.100892",abstract:"We analyzed 5-year epidemiological trends of lung cancer in Indonesia using national registry data. Incidence rates, histological types, and geographic distribution were examined. Significant regional variations were observed."},{id:"PUB-003",title:"Cost-Effectiveness Analysis of Chemotherapy Protocols for Colorectal Cancer",authors:"Budi Santoso, Dewi Lestari, Hendra Wijaya, et al.",journal:"Journal of Clinical Oncology",year:2024,citations:45,datasetUsed:"INAMSOS Colorectal Cancer Registry 2019-2023",doi:"10.1200/JCO.2024.42.16.2345",abstract:"This study evaluates cost-effectiveness of different chemotherapy protocols for colorectal cancer in Indonesian healthcare setting. FOLFOX showed superior cost-effectiveness compared to other regimens."},{id:"PUB-004",title:"Cervical Cancer Screening Patterns and Risk Factors in Young Indonesian Women",authors:"Rina Kusuma, Lina Permata, Andry Hartono",journal:"International Journal of Gynecological Cancer",year:2024,citations:34,datasetUsed:"INAMSOS Cervical Cancer Registry 2018-2023",doi:"10.1136/ijgc-2024-005234",abstract:"We investigated cervical cancer risk factors and screening patterns among women <35 years. Low screening uptake and high-risk HPV prevalence were identified as key concerns requiring targeted interventions."},{id:"PUB-005",title:"Genetic Markers and Personalized Medicine in Hepatocellular Carcinoma",authors:"Bambang Sutrisno, Ahmad Fauzi, Siti Aminah, et al.",journal:"Nature Communications",year:2024,citations:67,datasetUsed:"INAMSOS Liver Cancer Genomic Study 2021-2024",doi:"10.1038/s41467-024-48923-1",abstract:"Comprehensive genomic profiling of hepatocellular carcinoma in Indonesian patients identified novel genetic markers associated with treatment response and prognosis, paving way for personalized medicine approaches."},{id:"PUB-006",title:"Radiotherapy Outcomes in Head and Neck Cancer: Multi-center Study",authors:"Eko Prasetyo, Ratna Dewi, Hendra Wijaya",journal:"Radiotherapy and Oncology",year:2024,citations:23,datasetUsed:"INAMSOS Head & Neck Cancer Registry 2020-2023",doi:"10.1016/j.radonc.2024.109876",abstract:"Multi-center analysis of radiotherapy outcomes for head and neck cancer across 8 Indonesian cancer centers. Treatment adherence and outcomes were comparable to international standards."},{id:"PUB-007",title:"Immunotherapy Efficacy in Advanced Non-Small Cell Lung Cancer",authors:"Maya Sari, Andry Hartono, Bambang Sutrisno",journal:"Journal of Thoracic Oncology",year:2023,citations:56,datasetUsed:"INAMSOS Lung Cancer Immunotherapy Cohort 2020-2023",doi:"10.1016/j.jtho.2023.05.012",abstract:"Real-world evidence of immunotherapy efficacy in advanced NSCLC patients from Indonesian population. Response rates and survival outcomes were analyzed with biomarker correlation."},{id:"PUB-008",title:"Pediatric Leukemia Treatment Outcomes: National Registry Analysis",authors:"Budi Santoso, Dewi Lestari, Rina Kusuma, et al.",journal:"The Lancet Haematology",year:2023,citations:41,datasetUsed:"INAMSOS Pediatric Cancer Registry 2018-2022",doi:"10.1016/S2352-3026(23)00156-8",abstract:"Comprehensive analysis of pediatric leukemia treatment outcomes from Indonesian national registry. Five-year survival rates improved significantly over the study period, attributed to standardized protocols."},{id:"PUB-009",title:"Palliative Care Integration in Cancer Treatment: Indonesian Experience",authors:"Lina Permata, Ahmad Fauzi, Ratna Dewi",journal:"Journal of Pain and Symptom Management",year:2023,citations:18,datasetUsed:"INAMSOS Palliative Care Registry 2019-2022",doi:"10.1016/j.jpainsymman.2023.03.015",abstract:"Evaluation of palliative care integration in cancer treatment across Indonesian cancer centers. Early palliative care improved quality of life and reduced hospital admissions."},{id:"PUB-010",title:"Nutritional Status and Treatment Outcomes in Cancer Patients",authors:"Siti Aminah, Budi Santoso, Maya Sari",journal:"Clinical Nutrition",year:2023,citations:29,datasetUsed:"INAMSOS Multi-cancer Registry 2019-2022",doi:"10.1016/j.clnu.2023.02.018",abstract:"Impact of nutritional status on cancer treatment outcomes was assessed. Malnutrition was prevalent and significantly associated with worse treatment tolerance and survival outcomes."}];l(e),c(e)}catch(e){console.error("Error fetching publications:",e)}finally{y(!1)}},C=Array.from(new Set(o.map(e=>e.year))).sort((e,t)=>t-e),S=Array.from(new Set(o.map(e=>e.journal))).sort(),I=e=>{let t="".concat(e.authors," (").concat(e.year,"). ").concat(e.title,". ").concat(e.journal,". doi:").concat(e.doi);alert("Sitasi:\n\n".concat(t,"\n\nFitur download dalam format BibTeX/RIS akan segera diimplementasikan."))};return a||f?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):t?(0,s.jsxs)(n.A,{children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Publikasi Penelitian"}),(0,s.jsx)("p",{className:"text-gray-600",children:"Publikasi yang menggunakan data INAMSOS"})]}),(0,s.jsx)("button",{onClick:()=>{N({title:"",authors:"",journal:"",year:new Date().getFullYear().toString(),doi:"",abstract:"",datasetUsed:""}),v(!0)},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"+ Tambah Publikasi"})]})}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-blue-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Publikasi"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:w.totalPublications})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-green-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Total Sitasi"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:w.totalCitations})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-purple-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Avg Impact Factor"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:w.avgImpactFactor})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-6",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"p-3 bg-yellow-100 rounded-lg",children:(0,s.jsx)("svg",{className:"h-6 w-6 text-yellow-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsxs)("div",{className:"ml-4",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-600",children:"Tahun Ini"}),(0,s.jsx)("p",{className:"text-2xl font-semibold text-gray-900",children:w.thisYear})]})]})})]}),(0,s.jsx)("div",{className:"bg-white rounded-lg shadow p-4 mb-6",children:(0,s.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4",children:[(0,s.jsx)("div",{className:"flex-1",children:(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("svg",{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),(0,s.jsx)("input",{type:"text",value:x,onChange:e=>g(e.target.value),placeholder:"Cari judul atau penulis...",className:"w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"})]})}),(0,s.jsx)("div",{children:(0,s.jsxs)("select",{value:u,onChange:e=>m(e.target.value),className:"px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"",children:"Semua Tahun"}),C.map(e=>(0,s.jsx)("option",{value:e,children:e},e))]})}),(0,s.jsx)("div",{children:(0,s.jsxs)("select",{value:p,onChange:e=>h(e.target.value),className:"px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",children:[(0,s.jsx)("option",{value:"",children:"Semua Jurnal"}),S.map(e=>(0,s.jsx)("option",{value:e,children:e},e))]})}),(u||p||x)&&(0,s.jsx)("button",{onClick:()=>{m(""),h(""),g("")},className:"px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium",children:"Reset"})]})}),(0,s.jsxs)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:[(0,s.jsx)("div",{className:"px-6 py-4 border-b border-gray-200",children:(0,s.jsxs)("h2",{className:"text-lg font-semibold text-gray-900",children:["Daftar Publikasi (",d.length,")"]})}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Judul"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Penulis"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Jurnal"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tahun"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Sitasi"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Dataset INAMSOS"}),(0,s.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aksi"})]})}),(0,s.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:d.map(e=>(0,s.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,s.jsx)("td",{className:"px-6 py-4",children:(0,s.jsx)("div",{className:"text-sm font-medium text-gray-900 max-w-xs",children:e.title})}),(0,s.jsx)("td",{className:"px-6 py-4",children:(0,s.jsx)("div",{className:"text-sm text-gray-500 max-w-xs truncate",children:e.authors})}),(0,s.jsx)("td",{className:"px-6 py-4",children:(0,s.jsx)("div",{className:"text-sm text-gray-900 max-w-xs truncate",children:e.journal})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-900",children:e.year})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("span",{className:"px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full",children:e.citations})}),(0,s.jsx)("td",{className:"px-6 py-4",children:(0,s.jsx)("div",{className:"text-sm text-gray-500 max-w-xs truncate",children:e.datasetUsed})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("a",{href:"https://doi.org/".concat(e.doi),target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-900 font-medium",children:"Link"}),(0,s.jsx)("button",{onClick:()=>I(e),className:"text-green-600 hover:text-green-900 font-medium",children:"Sitasi"})]})})]},e.id))})]})}),0===d.length&&(0,s.jsxs)("div",{className:"text-center py-12",children:[(0,s.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})}),(0,s.jsx)("p",{className:"mt-4 text-gray-500",children:"Tidak ada publikasi yang sesuai dengan filter"})]})]}),b&&(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,s.jsx)("div",{className:"bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:(0,s.jsxs)("div",{className:"p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,s.jsx)("h2",{className:"text-xl font-bold text-gray-900",children:"Tambah Publikasi"}),(0,s.jsx)("button",{onClick:()=>v(!1),className:"text-gray-400 hover:text-gray-600",children:(0,s.jsx)("svg",{className:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Judul Publikasi *"}),(0,s.jsx)("input",{type:"text",value:j.title,onChange:e=>N({...j,title:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Masukkan judul publikasi"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Penulis *"}),(0,s.jsx)("input",{type:"text",value:j.authors,onChange:e=>N({...j,authors:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Contoh: John Doe, Jane Smith, et al."})]}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Jurnal *"}),(0,s.jsx)("input",{type:"text",value:j.journal,onChange:e=>N({...j,journal:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Nama jurnal"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Tahun *"}),(0,s.jsx)("input",{type:"number",value:j.year,onChange:e=>N({...j,year:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"2025",min:"1900",max:"2100"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"DOI *"}),(0,s.jsx)("input",{type:"text",value:j.doi,onChange:e=>N({...j,doi:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"10.1234/example.2025.123456"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Dataset INAMSOS yang Digunakan *"}),(0,s.jsx)("input",{type:"text",value:j.datasetUsed,onChange:e=>N({...j,datasetUsed:e.target.value}),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Contoh: INAMSOS Breast Cancer Registry 2020-2024"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Abstract"}),(0,s.jsx)("textarea",{value:j.abstract,onChange:e=>N({...j,abstract:e.target.value}),rows:4,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Masukkan abstrak publikasi"})]})]}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3 mt-6",children:[(0,s.jsx)("button",{onClick:()=>v(!1),className:"px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium",children:"Batal"}),(0,s.jsx)("button",{onClick:()=>{if(!j.title||!j.authors||!j.journal||!j.year||!j.doi||!j.datasetUsed){alert("Mohon lengkapi semua field yang diperlukan");return}let e={id:"PUB-".concat(String(o.length+1).padStart(3,"0")),title:j.title,authors:j.authors,journal:j.journal,year:parseInt(j.year),doi:j.doi,abstract:j.abstract,datasetUsed:j.datasetUsed,citations:0};l(t=>[e,...t]),alert("Publikasi berhasil ditambahkan"),v(!1)},className:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",children:"Tambah Publikasi"})]})]})})})]}):(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-600",children:"Redirecting to login..."})]})})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,r;a.d(t,{x7:function(){return em},ZP:function(){return ep}});var i,n=a(2265);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},p={},h=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+h(e[a]);return t}return e},x=(e,t,a,s,r)=>{var i;let n=h(e),o=p[n]||(p[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);p[o]=m(r?{["@keyframes "+o]:t}:t,a?"":"."+o)}let l=a&&p.g?p.g:null;return a&&(p.g=p[o]),i=p[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),o},g=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return x(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function N(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let o=Object.assign({},i),l=o.className||r.className;a.p=Object.assign({theme:b&&b()},o),a.o=/ *go\d+/.test(l),o.className=f.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),y(d,o)}return t?t(r):r}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,C=(s=0,()=>(++s).toString()),S=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},I="default",P=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return P(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],M={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},L={},O=(e,t=I)=>{L[t]=P(L[t]||M,e),A.forEach(([e,a])=>{e===t&&a(L[t])})},E=e=>Object.keys(L).forEach(t=>O(e,t)),B=e=>Object.keys(L).find(t=>L[t].toasts.some(t=>t.id===e)),U=(e=I)=>t=>{O(t,e)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(e={},t=I)=>{let[a,s]=(0,n.useState)(L[t]||M),r=(0,n.useRef)(L[t]);(0,n.useEffect)(()=>(r.current!==L[t]&&s(L[t]),A.push([t,s]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:i}},T=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),z=e=>(t,a)=>{let s=T(t,e,a);return U(s.toasterId||B(s.id))({type:2,toast:s}),s.id},$=(e,t)=>z("blank")(e,t);$.error=z("error"),$.success=z("success"),$.loading=z("loading"),$.custom=z("custom"),$.dismiss=(e,t)=>{let a={type:3,toastId:e};t?U(t)(a):E(a)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let a={type:4,toastId:e};t?U(t)(a):E(a)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,a)=>{let s=$.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?$.success(r,{id:s,...a,...null==a?void 0:a.success}):$.dismiss(s),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?$.error(r,{id:s,...a,...null==a?void 0:a.error}):$.dismiss(s)}),e};var F=1e3,H=(e,t="default")=>{let{toasts:a,pausedAt:s}=D(e,t),r=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=F)=>{if(r.has(e))return;let a=setTimeout(()=>{r.delete(e),o({type:4,toastId:e})},t);r.set(e,a)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&$.dismiss(a.id);return}return setTimeout(()=>$.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let o=(0,n.useCallback)(U(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,n.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,n.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},J=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,_=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Y=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${_} 0.15s ease-out forwards;
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
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,V=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${V} 1s linear infinite;
`,G=j`
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
}`,X=N("div")`
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
`,Z=N("div")`
  position: absolute;
`,Q=N("div")`
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
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===a?null:n.createElement(Q,null,n.createElement(q,{...s}),"loading"!==a&&n.createElement(Z,null,"error"===a?n.createElement(Y,{...s}):n.createElement(X,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=N("div")`
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
`,en=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=S()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),er(a)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),o=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:r})=>{let i=n.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:S()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:r,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=H(a,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i=a.position||t,o=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eu:"",style:o},"custom"===a.type?k(a.message,a):r?r(a):n.createElement(el,{toast:a,position:i}))}))},ep=$}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=8770)}),_N_E=e.O()}]);