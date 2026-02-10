(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7051],{7716:function(e,t,r){Promise.resolve().then(r.bind(r,2574))},2574:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var s=r(7437),a=r(2265),l=r(4033),o=r(4894),i=r(7841);function n(e){var t,r;let{queueItem:l,isOpen:o,onClose:n,onResolve:c}=e,[u,m]=(0,a.useState)(i.Wp.USE_LOCAL),[x,p]=(0,a.useState)({}),[h,g]=(0,a.useState)("visual");if((0,a.useEffect)(()=>{var e;(null==l?void 0:null===(e=l.conflictData)||void 0===e?void 0:e.localData)&&p({...l.conflictData.localData})},[l]),!o||!l)return null;let f=(null===(t=l.conflictData)||void 0===t?void 0:t.localData)||{},b=(null===(r=l.conflictData)||void 0===r?void 0:r.remoteData)||{},v=l.entityType,y=l.entityId,j=Array.from(new Set([...Object.keys(f),...Object.keys(b)])).filter(e=>!["id","createdAt","updatedAt","passwordHash","metadata"].includes(e)),N=e=>null==e?"-":"boolean"==typeof e?e?"Yes":"No":"object"==typeof e?JSON.stringify(e).slice(0,50):String(e),w=e=>JSON.stringify(f[e])!==JSON.stringify(b[e]);return(0,s.jsxs)("div",{className:"fixed inset-0 z-50 overflow-y-auto",children:[(0,s.jsx)("div",{className:"fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",onClick:n}),(0,s.jsx)("div",{className:"flex min-h-full items-center justify-center p-4",children:(0,s.jsxs)("div",{className:"relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden",children:[(0,s.jsx)("div",{className:"bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,s.jsx)("div",{className:"w-10 h-10 bg-white/20 rounded-full flex items-center justify-center",children:(0,s.jsx)("svg",{className:"w-6 h-6 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-xl font-bold text-white",children:"Conflict Detected"}),(0,s.jsxs)("p",{className:"text-orange-100 text-sm",children:[v," ",y&&"(ID: ".concat(y.slice(0,8),"...)")]})]})]}),(0,s.jsx)("button",{onClick:n,className:"text-white/80 hover:text-white transition-colors",children:(0,s.jsx)("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})}),(0,s.jsxs)("div",{className:"p-6 max-h-[70vh] overflow-y-auto",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,s.jsxs)("div",{className:"flex space-x-1 bg-gray-100 p-1 rounded-lg",children:[(0,s.jsx)("button",{onClick:()=>g("visual"),className:"px-4 py-1.5 rounded-md text-sm font-medium transition-colors ".concat("visual"===h?"bg-white text-gray-900 shadow-sm":"text-gray-600 hover:text-gray-900"),children:"Visual Diff"}),(0,s.jsx)("button",{onClick:()=>g("json"),className:"px-4 py-1.5 rounded-md text-sm font-medium transition-colors ".concat("json"===h?"bg-white text-gray-900 shadow-sm":"text-gray-600 hover:text-gray-900"),children:"JSON View"})]}),(0,s.jsx)("div",{className:"text-sm text-gray-500",children:(0,s.jsxs)("span",{className:"inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium",children:[j.filter(w).length," differences"]})})]}),"visual"===h?(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{className:"border-2 border-blue-200 rounded-xl overflow-hidden",children:[(0,s.jsx)("div",{className:"bg-blue-50 px-4 py-3 border-b border-blue-100",children:(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)("div",{className:"w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center",children:(0,s.jsx)("svg",{className:"w-4 h-4 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-semibold text-blue-900",children:"Your Version"}),(0,s.jsx)("p",{className:"text-xs text-blue-600",children:"Local changes"})]})]})}),(0,s.jsx)("div",{className:"p-4 space-y-2 max-h-96 overflow-y-auto",children:j.map(e=>(0,s.jsxs)("div",{className:"p-2 rounded-lg ".concat(w(e)?"bg-blue-50 border border-blue-200":"bg-gray-50"),children:[(0,s.jsx)("div",{className:"text-xs font-medium text-gray-500 uppercase",children:e}),(0,s.jsx)("div",{className:"text-sm text-gray-900 font-medium",children:N(f[e])})]},e))})]}),(0,s.jsxs)("div",{className:"border-2 border-purple-200 rounded-xl overflow-hidden",children:[(0,s.jsx)("div",{className:"bg-purple-50 px-4 py-3 border-b border-purple-100",children:(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)("div",{className:"w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center",children:(0,s.jsx)("svg",{className:"w-4 h-4 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-semibold text-purple-900",children:"Server Version"}),(0,s.jsx)("p",{className:"text-xs text-purple-600",children:"Remote changes"})]})]})}),(0,s.jsx)("div",{className:"p-4 space-y-2 max-h-96 overflow-y-auto",children:j.map(e=>(0,s.jsxs)("div",{className:"p-2 rounded-lg ".concat(w(e)?"bg-purple-50 border border-purple-200":"bg-gray-50"),children:[(0,s.jsx)("div",{className:"text-xs font-medium text-gray-500 uppercase",children:e}),(0,s.jsx)("div",{className:"text-sm text-gray-900 font-medium",children:N(b[e])})]},e))})]})]}):(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{className:"bg-gray-900 rounded-lg p-4 overflow-x-auto",children:[(0,s.jsx)("div",{className:"text-xs text-gray-400 mb-2",children:"Local (Your Changes)"}),(0,s.jsx)("pre",{className:"text-sm text-green-400 font-mono",children:JSON.stringify(f,null,2)})]}),(0,s.jsxs)("div",{className:"bg-gray-900 rounded-lg p-4 overflow-x-auto",children:[(0,s.jsx)("div",{className:"text-xs text-gray-400 mb-2",children:"Remote (Server)"}),(0,s.jsx)("pre",{className:"text-sm text-blue-400 font-mono",children:JSON.stringify(b,null,2)})]})]}),(0,s.jsxs)("div",{className:"mt-6",children:[(0,s.jsx)("h3",{className:"text-sm font-semibold text-gray-900 mb-3",children:"Choose Resolution Strategy"}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,s.jsx)(d,{value:i.Wp.USE_LOCAL,label:"Use My Version",description:"Keep your local changes and overwrite server",icon:"\uD83D\uDCBB",selected:u===i.Wp.USE_LOCAL,onSelect:e=>{m(e),p({...f})},color:"blue"}),(0,s.jsx)(d,{value:i.Wp.USE_REMOTE,label:"Use Server Version",description:"Accept server changes and discard yours",icon:"\uD83C\uDF10",selected:u===i.Wp.USE_REMOTE,onSelect:e=>{m(e),p({...b})},color:"purple"}),(0,s.jsx)(d,{value:i.Wp.MERGE,label:"Smart Merge",description:"Merge non-conflicting fields from both",icon:"\uD83D\uDD00",selected:u===i.Wp.MERGE,onSelect:e=>{m(e);let t={...b};Object.keys(f).forEach(e=>{let r=f[e];null!=r&&""!==r&&(t[e]=r)}),p(t)},color:"orange"}),(0,s.jsx)(d,{value:i.Wp.MANUAL,label:"Manual Edit",description:"Edit the data before resolving",icon:"✏️",selected:u===i.Wp.MANUAL,onSelect:e=>{m(e),p({...f})},color:"emerald"})]})]}),(u===i.Wp.MERGE||u===i.Wp.MANUAL)&&(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsx)("h3",{className:"text-sm font-semibold text-gray-900 mb-2",children:u===i.Wp.MERGE?"Review Merged Data":"Edit Data Manually"}),(0,s.jsx)("div",{className:"bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto",children:j.map(e=>(0,s.jsxs)("div",{className:"mb-3",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-1",children:[(0,s.jsxs)("label",{className:"block text-xs font-medium text-gray-500 uppercase",children:[e,w(e)&&(0,s.jsx)("span",{className:"ml-2 text-orange-500",title:"Different in Local and Remote",children:"●"})]}),w(e)&&(0,s.jsx)("span",{className:"text-xs text-orange-600",children:"Conflict"})]}),(0,s.jsx)("input",{type:"text",value:void 0!==x[e]&&null!==x[e]?String(x[e]):"",onChange:t=>p({...x,[e]:t.target.value}),className:"w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ".concat(w(e)?"border-orange-300 bg-orange-50":"border-gray-300")})]},e))})]})]}),(0,s.jsx)("div",{className:"bg-gray-50 px-6 py-4 border-t border-gray-200",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsx)("div",{className:"text-sm text-gray-500",children:"This action cannot be undone"}),(0,s.jsxs)("div",{className:"flex space-x-3",children:[(0,s.jsx)("button",{onClick:n,className:"px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors",children:"Cancel"}),(0,s.jsx)("button",{onClick:()=>{u===i.Wp.MERGE||u===i.Wp.MANUAL?c(u,x):c(u)},className:"px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm",children:"Resolve Conflict"})]})]})})]})})]})}function d(e){let{value:t,label:r,description:a,icon:l,selected:o,onSelect:i,color:n}=e;return(0,s.jsx)("button",{onClick:()=>i(t),className:"p-4 rounded-xl border-2 text-left transition-all ".concat(o?({blue:"border-blue-500 bg-blue-50 ring-2 ring-blue-200",purple:"border-purple-500 bg-purple-50 ring-2 ring-purple-200",orange:"border-orange-500 bg-orange-50 ring-2 ring-orange-200",emerald:"border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"})[n]:({blue:"border-blue-200 hover:border-blue-300 bg-blue-50/50",purple:"border-purple-200 hover:border-purple-300 bg-purple-50/50",orange:"border-orange-200 hover:border-orange-300 bg-orange-50/50",emerald:"border-emerald-200 hover:border-emerald-300 bg-emerald-50/50"})[n]),children:(0,s.jsxs)("div",{className:"flex items-start space-x-3",children:[(0,s.jsx)("span",{className:"text-2xl",children:l}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"font-semibold text-gray-900",children:r}),(0,s.jsx)("div",{className:"text-sm text-gray-600 mt-1",children:a})]})]})})}var c=r(5925);function u(){(0,l.useRouter)();let[e,t]=(0,a.useState)([]),[r,d]=(0,a.useState)(null),[u,x]=(0,a.useState)(!0),[p,h]=(0,a.useState)(null),[g,f]=(0,a.useState)(!1),[b,v]=(0,a.useState)("all"),[y,j]=(0,a.useState)(!1),N=(0,a.useCallback)(async()=>{try{let[e,r]=await Promise.all([i.Rb.getQueueItems(100),i.Rb.getStatistics()]);t(e.items),d(r)}catch(e){console.error("Failed to fetch sync data:",e),c.ZP.error("Failed to load sync data")}finally{x(!1)}},[]);(0,a.useEffect)(()=>{N();let e=setInterval(N,3e4);return()=>clearInterval(e)},[N]);let w=async(e,t)=>{if(!p)return;let r=c.ZP.loading("Resolving conflict...");try{await i.Rb.resolveConflict(p.id,e,t),c.ZP.success("Conflict resolved successfully",{id:r}),f(!1),h(null),await N()}catch(e){console.error("Failed to resolve conflict:",e),c.ZP.error("Failed to resolve conflict",{id:r})}},k=async e=>{let t=c.ZP.loading("Retrying sync...");try{await i.Rb.retryItem(e.id),c.ZP.success("Item queued for retry",{id:t}),await N()}catch(e){console.error("Failed to retry:",e),c.ZP.error("Failed to retry",{id:t})}},C=async()=>{j(!0);let e=c.ZP.loading("Running full sync...");try{await i.Rb.runFullSync(),c.ZP.success("Sync completed",{id:e}),await N()}catch(t){console.error("Sync failed:",t),c.ZP.error("Sync failed",{id:e})}finally{j(!1)}},L=e=>{h(e),f(!0)},E=e.filter(e=>"all"===b?["CONFLICT","FAILED","PENDING"].includes(e.status):e.status.toLowerCase()===b),D=e=>{switch(e){case"CONFLICT":return"bg-orange-100 text-orange-800 border-orange-200";case"FAILED":return"bg-red-100 text-red-800 border-red-200";case"PENDING":return"bg-yellow-100 text-yellow-800 border-yellow-200";case"PROCESSING":return"bg-blue-100 text-blue-800 border-blue-200";case"SYNCED":return"bg-emerald-100 text-emerald-800 border-emerald-200";default:return"bg-gray-100 text-gray-800 border-gray-200"}},S=e=>{switch(e){case"CONFLICT":return(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})});case"FAILED":return(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})});case"PENDING":return(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})});default:return null}};return u?(0,s.jsx)(o.A,{children:(0,s.jsx)("div",{className:"flex items-center justify-center h-64",children:(0,s.jsx)("div",{className:"w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"})})}):(0,s.jsxs)(o.A,{children:[(0,s.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,s.jsx)("div",{className:"mb-8",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Sync Management"}),(0,s.jsx)("p",{className:"text-gray-600 mt-1",children:"Manage sync conflicts and pending items"})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,s.jsxs)("button",{onClick:N,className:"flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50",children:[(0,s.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),(0,s.jsx)("span",{children:"Refresh"})]}),(0,s.jsxs)("button",{onClick:C,disabled:y,className:"flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed",children:[y?(0,s.jsx)("div",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}):(0,s.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"})}),(0,s.jsx)("span",{children:"Sync Now"})]})]})]})}),r&&(0,s.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8",children:[(0,s.jsx)(m,{title:"Pending",value:r.pending,color:"yellow",icon:"⏳"}),(0,s.jsx)(m,{title:"Processing",value:r.processing,color:"blue",icon:"\uD83D\uDD04"}),(0,s.jsx)(m,{title:"Synced",value:r.synced,color:"emerald",icon:"✅"}),(0,s.jsx)(m,{title:"Conflicts",value:r.conflict,color:"orange",icon:"⚠️",alert:r.conflict>0}),(0,s.jsx)(m,{title:"Failed",value:r.failed,color:"red",icon:"❌",alert:r.failed>0}),(0,s.jsx)(m,{title:"Needs Attention",value:r.needsAttention,color:"purple",icon:"\uD83D\uDD14",alert:r.needsAttention>0})]}),(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",children:[(0,s.jsx)("div",{className:"border-b border-gray-200",children:(0,s.jsx)("div",{className:"flex",children:[{key:"all",label:"All Issues",count:(null==r?void 0:r.needsAttention)||0},{key:"conflict",label:"Conflicts",count:(null==r?void 0:r.conflict)||0},{key:"failed",label:"Failed",count:(null==r?void 0:r.failed)||0},{key:"pending",label:"Pending",count:(null==r?void 0:r.pending)||0}].map(e=>(0,s.jsxs)("button",{onClick:()=>v(e.key),className:"flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ".concat(b===e.key?"border-emerald-500 text-emerald-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:[(0,s.jsx)("span",{children:e.label}),e.count>0&&(0,s.jsx)("span",{className:"px-2 py-0.5 rounded-full text-xs ".concat(b===e.key?"bg-emerald-100 text-emerald-700":"bg-gray-100 text-gray-600"),children:e.count})]},e.key))})}),(0,s.jsx)("div",{className:"divide-y divide-gray-200",children:0===E.length?(0,s.jsxs)("div",{className:"p-12 text-center",children:[(0,s.jsx)("div",{className:"w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4",children:(0,s.jsx)("svg",{className:"w-8 h-8 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),"all"===b?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:"All caught up!"}),(0,s.jsx)("p",{className:"text-gray-500 mt-1",children:"No items need your attention"})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("h3",{className:"text-lg font-medium text-gray-900 capitalize",children:["No ",b," items"]}),(0,s.jsx)("p",{className:"text-gray-500 mt-1",children:(null==r?void 0:r.needsAttention)&&r.needsAttention>0&&"pending"===b?"You have ".concat(r.needsAttention," items that need attention in other tabs."):"There are no items with ".concat(b," status.")})]})]}):E.map(e=>{var t;return(0,s.jsx)("div",{className:"p-6 hover:bg-gray-50 transition-colors",children:(0,s.jsxs)("div",{className:"flex items-start justify-between",children:[(0,s.jsxs)("div",{className:"flex items-start space-x-4",children:[(0,s.jsx)("div",{className:"w-10 h-10 rounded-full flex items-center justify-center ".concat(D(e.status)),children:S(e.status)}),(0,s.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsxs)("h3",{className:"text-base font-semibold text-gray-900 capitalize",children:[e.operation.toLowerCase()," ",e.entityType]}),(0,s.jsx)("span",{className:"px-2 py-0.5 rounded-full text-xs font-medium border ".concat(D(e.status)),children:e.status})]}),(0,s.jsxs)("p",{className:"text-sm text-gray-500 mt-1",children:["ID: ",null===(t=e.entityId)||void 0===t?void 0:t.slice(0,12),"... • Attempt ",e.attemptCount,"/",e.maxAttempts," •",new Date(e.localTimestamp).toLocaleString()]}),e.errorMessage&&(0,s.jsx)("div",{className:"mt-2 p-3 bg-red-50 border border-red-200 rounded-lg",children:(0,s.jsx)("p",{className:"text-sm text-red-700",children:e.errorMessage})}),"CONFLICT"===e.status&&e.conflictData&&(0,s.jsx)("div",{className:"mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg",children:(0,s.jsx)("p",{className:"text-sm text-orange-700",children:e.conflictData.errorMessage||"Data conflict detected between local and remote versions"})})]})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-2 ml-4",children:["CONFLICT"===e.status&&(0,s.jsxs)("button",{onClick:()=>L(e),className:"flex items-center space-x-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors",children:[(0,s.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"})}),(0,s.jsx)("span",{children:"Resolve"})]}),"FAILED"===e.status&&(0,s.jsxs)("button",{onClick:()=>k(e),className:"flex items-center space-x-1 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors",children:[(0,s.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),(0,s.jsx)("span",{children:"Retry"})]}),(0,s.jsx)("button",{onClick:()=>L(e),className:"p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",title:"View Details",children:(0,s.jsxs)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]})})]})]})},e.id)})})]})]}),p&&(0,s.jsx)(n,{queueItem:p,isOpen:g,onClose:()=>{f(!1),h(null)},onResolve:w})]})}function m(e){let{title:t,value:r,color:a,icon:l,alert:o}=e,i={yellow:"text-yellow-900",blue:"text-blue-900",emerald:"text-emerald-900",orange:"text-orange-900",red:"text-red-900",purple:"text-purple-900"};return(0,s.jsx)("div",{className:"p-4 rounded-xl border-2 ".concat({yellow:"bg-yellow-50 border-yellow-200",blue:"bg-blue-50 border-blue-200",emerald:"bg-emerald-50 border-emerald-200",orange:"bg-orange-50 border-orange-200",red:"bg-red-50 border-red-200",purple:"bg-purple-50 border-purple-200"}[a]," ").concat(o?"ring-2 ring-offset-2 ring-red-400":""),children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium ".concat(i[a]," opacity-70"),children:t}),(0,s.jsx)("p",{className:"text-3xl font-bold ".concat(i[a]," mt-1"),children:r})]}),(0,s.jsx)("span",{className:"text-3xl",children:l})]})})}},4033:function(e,t,r){e.exports=r(5313)},5925:function(e,t,r){"use strict";let s,a;r.d(t,{x7:function(){return em},ZP:function(){return ex}});var l,o=r(2265);let i={data:""},n=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",s="",a="";for(let l in e){let o=e[l];"@"==l[0]?"i"==l[1]?r=l+" "+o+";":s+="f"==l[1]?m(o,l):l+"{"+m(o,"k"==l[1]?"":t)+"}":"object"==typeof o?s+=m(o,t?t.replace(/([^,])+/g,e=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):l):null!=o&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=m.p?m.p(l,o):l+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},x={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},h=(e,t,r,s,a)=>{var l;let o=p(e),i=x[o]||(x[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!x[i]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(r=t[3].replace(u," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);x[i]=m(a?{["@keyframes "+i]:t}:t,r?"":"."+i)}let n=r&&x.g?x.g:null;return r&&(x.g=x[i]),l=x[i],n?t.data=t.data.replace(n,l):-1===t.data.indexOf(l)&&(t.data=s?l+t.data:t.data+l),i},g=(e,t,r)=>e.reduce((e,s,a)=>{let l=t[a];if(l&&l.call){let e=l(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;l=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==l?"":l)},"");function f(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,n(t.target),t.g,t.o,t.k)}f.bind({g:1});let b,v,y,j=f.bind({k:1});function N(e,t){let r=this||{};return function(){let s=arguments;function a(l,o){let i=Object.assign({},l),n=i.className||a.className;r.p=Object.assign({theme:v&&v()},i),r.o=/ *go\d+/.test(n),i.className=f.apply(r,s)+(n?" "+n:""),t&&(i.ref=o);let d=e;return e[0]&&(d=i.as||e,delete i.as),y&&d[0]&&y(i),b(d,i)}return t?t(a):a}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,C=(s=0,()=>(++s).toString()),L=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},E="default",D=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return D(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let l=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+l}))}}},S=[],M={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},O=(e,t=E)=>{A[t]=D(A[t]||M,e),S.forEach(([e,r])=>{e===t&&r(A[t])})},I=e=>Object.keys(A).forEach(t=>O(e,t)),R=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),P=(e=E)=>t=>{O(t,e)},W={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},F=(e={},t=E)=>{let[r,s]=(0,o.useState)(A[t]||M),a=(0,o.useRef)(A[t]);(0,o.useEffect)(()=>(a.current!==A[t]&&s(A[t]),S.push([t,s]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let l=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||W[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:l}},z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),$=e=>(t,r)=>{let s=z(t,e,r);return P(s.toasterId||R(s.id))({type:2,toast:s}),s.id},T=(e,t)=>$("blank")(e,t);T.error=$("error"),T.success=$("success"),T.loading=$("loading"),T.custom=$("custom"),T.dismiss=(e,t)=>{let r={type:3,toastId:e};t?P(t)(r):I(r)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let r={type:4,toastId:e};t?P(t)(r):I(r)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,r)=>{let s=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?k(t.success,e):void 0;return a?T.success(a,{id:s,...r,...null==r?void 0:r.success}):T.dismiss(s),e}).catch(e=>{let a=t.error?k(t.error,e):void 0;a?T.error(a,{id:s,...r,...null==r?void 0:r.error}):T.dismiss(s)}),e};var _=1e3,B=(e,t="default")=>{let{toasts:r,pausedAt:s}=F(e,t),a=(0,o.useRef)(new Map).current,l=(0,o.useCallback)((e,t=_)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),i({type:4,toastId:e})},t);a.set(e,r)},[]);(0,o.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&T.dismiss(r.id);return}return setTimeout(()=>T.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let i=(0,o.useCallback)(P(t),[t]),n=(0,o.useCallback)(()=>{i({type:5,time:Date.now()})},[i]),d=(0,o.useCallback)((e,t)=>{i({type:1,toast:{id:e,height:t}})},[i]),c=(0,o.useCallback)(()=>{s&&i({type:6,time:Date.now()})},[s,i]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:l}=t||{},o=r.filter(t=>(t.position||l)===(e.position||l)&&t.height),i=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<i&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,l]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}},H=j`
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
}`,Z=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,V=N("div")`
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
    animation: ${Z} 0.15s ease-out forwards;
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
`,J=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,Y=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,q=j`
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
}`,K=N("div")`
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
    animation: ${q} 0.2s ease-out forwards;
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
`,Q=N("div")`
  position: absolute;
`,X=N("div")`
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
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===r?null:o.createElement(X,null,o.createElement(J,{...s}),"loading"!==r&&o.createElement(Q,null,"error"===r?o.createElement(V,{...s}):o.createElement(K,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
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
`,eo=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let r=e.includes("top")?1:-1,[s,a]=L()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(r),ea(r)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:r,children:s})=>{let a=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},l=o.createElement(er,{toast:e}),i=o.createElement(eo,{...e.ariaProps},k(e.message,e));return o.createElement(el,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof s?s({icon:l,message:i}):o.createElement(o.Fragment,null,l,i))});l=o.createElement,m.p=void 0,b=l,v=void 0,y=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:s,children:a})=>{let l=o.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return o.createElement("div",{ref:l,className:t,style:r},a)},ec=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:L()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},eu=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:a,toasterId:l,containerStyle:i,containerClassName:n})=>{let{toasts:d,handlers:c}=B(r,l);return o.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let l=r.position||t,i=ec(l,c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return o.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:i},"custom"===r.type?k(r.message,r):a?a(r):o.createElement(en,{toast:r,position:l}))}))},ex=T}},function(e){e.O(0,[1176,4829,1956,4894,2971,4938,1744],function(){return e(e.s=7716)}),_N_E=e.O()}]);