!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.script=void 0,t.script="flightschool"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this._max=0,this._ids=[]}gen(){var e;return null!==(e=this._ids.pop())&&void 0!==e?e:this._max++}free(e){this._ids.push(e)}clear(){this._max=0,this._ids=[]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(0),n(3),n(8)},function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.vRPTunnelServer=t.vRPServer=void 0;const r=n(0),s=n(4),c=o(n(7));let i,l;t.vRPServer=i,t.vRPTunnelServer=l;const a=(e,t)=>{"config"===t?console.log(`^1ERROR(gmconfig/${r.script}.json): ${e}`):"none"===t?console.log("^1ERROR: "+e):console.log(`^1ERROR(${t}): ${e}`)};c.default.existsSync("./gmconfig/")||a('cant find folder "gmconfig" in '+process.cwd(),"none"),c.default.existsSync("./gmlocales/")||a('cant find folder "gmlocales" in '+process.cwd(),"none"),c.default.existsSync(`./gmconfig/${r.script}.json`)||a(`cant find file "${r.script}.json" in ${process.cwd()}\\gmconfig`,"none"),c.default.existsSync(`./gmlocales/${r.script}/`)||a(`cant find folder "${r.script}" in ${process.cwd()}\\gmlocales`,"none"),c.default.existsSync(`./gmlocales/${r.script}/questions/`)||a(`cant find folder "questions" in ${process.cwd()}\\gmlocales\\${r.script}`,"none"),c.default.existsSync(`./gmlocales/${r.script}/locales/`)||a(`cant find folder "locales" in ${process.cwd()}\\gmlocales\\${r.script}`,"none"),c.default.existsSync(`./gmconfig/${r.script}.json`)||c.default.existsSync(`./gmlocales/${r.script}/locales`)||c.default.existsSync(`./gmlocales/${r.script}/questions`)||a("please read the installation instructions of our scripts","none");const u=JSON.parse(c.default.readFileSync(`./gmconfig/${r.script}.json`).toString());c.default.existsSync(`./gmlocales/${r.script}/locales/${u.lang}.json`)||a(`cant find file "${u.lang}.json" in ${process.cwd()}\\gmlocales\\${r.script}\\locales`,"none"),c.default.existsSync(`./gmlocales/${r.script}/questions/${u.lang}.json`)||a(`cant find file "${u.lang}.json" in ${process.cwd()}\\gmlocales\\${r.script}\\questions`,"none");const f=JSON.parse(c.default.readFileSync(`./gmlocales/${r.script}/locales/${u.lang}.json`).toString()),d=JSON.parse(c.default.readFileSync(`./gmlocales/${r.script}/questions/${u.lang}.json`).toString());onNet(`gm_${r.script}:getConfig`,e=>{emitNet(`gm_${r.script}:callbackUtils`,source,u,e.CallbackID),"vrp"===u.framework&&(t.vRPServer=i=s.VrpProxy.getInterface("vRP"),t.vRPTunnelServer=l=s.VrpTunnel.getInterface("vRP"))}),onNet(`gm_${r.script}:getLocales`,e=>{emitNet(`gm_${r.script}:callbackUtils`,source,f,e.CallbackID)}),onNet(`gm_${r.script}:getQuestions`,e=>{emitNet(`gm_${r.script}:callbackUtils`,source,d,e.CallbackID)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.VrpProxy=t.VrpTunnel=t.IdGenerator=void 0,t.IdGenerator=n(1),t.VrpTunnel=n(5),t.VrpProxy=n(6)},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function c(e){try{l(o.next(e))}catch(e){s(e)}}function i(e){try{l(o.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,i)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.bindInterface=t.getInterface=void 0;const r=n(1);t.getInterface=function(e,t=GetCurrentResourceName()){const n=new r.default,o={};return onNet(`${e}:${t}:tunnel_res`,(e,t)=>{const r=o[e];r&&(delete o[e],n.free(e),r(t.length<=1?t[0]:t))}),new Proxy({},{get(r,s){const c=s.toString();return r[c]||(r[c]=function(r){return(s,...c)=>-1===s||r.startsWith("_")?emitNet(e+":tunnel_req",s,r.substring(1),c,t,-1):new Promise(i=>{const l=n.gen();o[l]=i,emitNet(e+":tunnel_req",s,r,c,t,l)})}(c)),r[c]},set(){throw new Error("set isn't supported on Tunnel access")}})},t.bindInterface=function(e,t){onNet(e+":tunnel_req",(n,r,s,c)=>o(this,void 0,void 0,(function*(){const o=global.source,i=t[n];let l;if(i)try{l=yield i(...r)}catch(e){console.error(e)}c>=0&&emitNet(`${e}:${s}:tunnel_res`,o,c,[l])})))}},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function c(e){try{l(o.next(e))}catch(e){s(e)}}function i(e){try{l(o.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,i)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.addInterface=t.getInterface=void 0;const r=n(1);t.getInterface=function(e,t=GetCurrentResourceName()){const n=new r.default,o={};return on(`${e}:${t}:proxy_res`,(e,t)=>{const r=o[e];r&&(delete o[e],n.free(e),r(t.length<=1?t[0]:t))}),new Proxy({},{get(r,s){const c=s.toString();return r[c]||(r[c]=function(r){return(...s)=>{if(r.startsWith("_"))return emit(e+":proxy",r.substring(1),s,t,-1);let c,i=!1;const l=new Promise(l=>{const a=n.gen();o[a]=e=>{i=!0,c=e,l(c)},emit(e+":proxy",r,s,t,a)});return i?c:l}}(c)),r[c]},set(){throw new Error("cannot set values on proxy access interface")}})},t.addInterface=function(e,t){on(e+":proxy",(n,r,s,c)=>o(this,void 0,void 0,(function*(){const o=t[n];let i;if(o)try{i=yield o(...r)}catch(e){console.error(e)}else console.log(`error: proxy call ${e}:${n} not found`);c>=0&&emit(`${e}:${s}:proxy_res`,c,[i])})))}},function(e,t){e.exports=require("fs")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0);onNet(`gm_${o.script}:getLicenses_esx`,e=>{const t=source;emit("esx_license:getLicenses",source,n=>{emitNet(`gm_${o.script}:callback`,t,n,e.CallbackID)})}),onNet(`gm_${o.script}:addLicense_esx`,e=>{emit("esx_license:addLicense",source,e)}),onNet(`gm_${o.script}:tryUiPayment_esx`,e=>{let t;emit("esx:getSharedObject",e=>t=e);const n=t.GetPlayerFromId(source);let r=!1;n.getMoney()>=e.payment?(n.removeMoney(e.payment),r=!0):(n.removeAccountMoney("bank",e.payment),r=!0),emitNet(`gm_${o.script}:callbackUi`,source,r,e.CallbackID)}),onNet(`gm_${o.script}:tryPayment_esx`,e=>{let t;emit("esx:getSharedObject",e=>t=e);const n=t.GetPlayerFromId(source);let r=!1;n.getMoney()>=e.payment?(n.removeMoney(e.payment),r=!0):(n.removeAccountMoney("bank",e.payment),r=!0),emitNet(`gm_${o.script}:callback`,source,r,e.CallbackID)})}]);