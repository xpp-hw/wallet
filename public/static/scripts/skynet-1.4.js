!function(){var e={534:function(e){var t={getItem:function(e){try{return JSON.parse(localStorage.getItem(e))}catch(e){return""}},clear:function(e){try{return localStorage.setItem(e,"")}catch(e){return""}},setItem:function(e,t){try{var n=localStorage.getItem(e),r=[];n&&((r=JSON.parse(n)).length||(r=[r])),t.length?r=r.concat(t):r.push(t),localStorage.setItem(e,JSON.stringify(r))}catch(e){}}};e.exports=t},900:function(e){var t=!1,n=!1,r=!1,o=!1;window.__SKYNET&&window.__SKYNET.appName&&!window.__SKYNET.dev&&(t=!0,(void 0===window.__SKYNET.sendError||window.__SKYNET.sendError)&&(n=!0),void 0!==window.__SKYNET.rate&&(t=0!==window.__SKYNET.rate&&(100===window.__SKYNET.rate||100*Math.random()>>1<=window.__SKYNET.rate)),window.__SKYNET.uploadResTime&&(r=!0),window.__SKYNET.uploadAPITime&&(o=!0)),e.exports={needSendPerformance:t,needSendError:n,needSendRes:r,needSendAPI:o}},79:function(e,t,n){n(564);var r=n(28),o=n(502),i=n(758),s=n(447),a=n(502),p=a.sendWithInfo,d=a.sendBeaconWithInfo,u=n(900),c=n(541),l=performance.timing.redirectStart||performance.timing.navigationStart||performance.timing.fetchStart,f=document.documentElement.clientHeight;window.__SKYNET=window.__SKYNET||{};var w,m,h,g=document.documentElement,_=0,y=0,v=0,x={},S=0,E=0,T=0,b={},O=0,N=0,M=null,Y={type:"",time:0,message:""},K={node:null,time:0},I=!1,L=null;function R(){try{return Math.round((performance.getEntriesByName("first-paint")[0]||{}).startTime||0)}catch(e){return new Date-l}}function B(){try{return Math.round((performance.getEntriesByName("first-contentful-paint")[0]||{}).startTime||0)}catch(e){return 0}}if((!window.__SKYNET.init||window.__SKYNET.init&&!window.__SKYNET.pageInit)&&u.needSendPerformance){var V=function(e){m||(m={time:Date.now()});var t=0,n=e[0],r=n.nodeName.toLowerCase();if("script"!==r&&"style"!==r&&"link"!==r&&"#text"!==r&&1==++_&&setTimeout((function(){N=Date.now()-l}),0),T<2&&"script"!==r&&"style"!==r&&"link"!==r&&"#text"!==r&&n.getBoundingClientRect){var o=Date.now();site=n.getBoundingClientRect(),t=site.y||site.top,site.height&&site.height<f&&t+site.height+20>=f&&(++T>1&&!E&&(E=o-l),M=n,b={time:E,node:n},k())}e.length&&(clearTimeout(h),K.time=Date.now()-l,K.node=e[0],h=setTimeout((function(){b=K,O||(O=K.time),k(O)}),300))},P=function(e){v++,x[e.url]={},x[e.url].timer=setTimeout((function(){x[e.url].timeout=!0,v--,k()}),1e3*s.maxXHR)},k=function(e){y||function(e){if(0!==O&&0===y){var t=R()||N,n=B(),i=0;(O||E)&&v<=1&&document.body.innerText.length>0&&(i=Math.max(S||O,E,n)>>0,clearTimeout(L),L=setTimeout((function(){t=R()||N,i=Math.max(t,S||O,n,E)>>0,y=e-l,r.off("__networkBack"),r.off("__networkSend",P),y=Math.max(e-l,i),i===S?(Y.type="lcp",Y.time=i):i===O?(Y.type=b.type||"lcpfix",Y.time=i,Y.message=b.node?(b.node.outerHTML||"").slice(0,100):""):(Y.type="bottom",Y.time=i,Y.message=M?(M.outerHTML||"").slice(0,100):""),A={fp:t,fsp:i,tti:y},window.__SKYNET.USERSENDPROFILE?H&&(I||(I=!0,r.fire("profilekeys",{fp:t,fsp:i,tti:y,p1:H.p1||0,p2:H.p2||0}))):I||(I=!0,r.fire("profilekeys",{fp:t,fsp:i,tti:y,p1:0,p2:0})),i>=1e4&&o.sendWithInfo("keypoints","slow",JSON.stringify(Y)),w.disconnect&&w.disconnect()}),1e3))}}(e||Date.now())},D=function(){return document.body.innerText.length<30};try{(w=new MutationObserver((function(e){for(var t,n=0,r=e.length;n<r;n++)(t=e[n]).addedNodes.length&&V(t.addedNodes)}))).observe(g,{childList:!0,attributes:!1,subtree:!0})}catch(e){console.error(e),window.errors+=e.message}try{u.needSendPerformance&&new PerformanceObserver((function(e){var t=e.getEntries(),n=t[t.length-1];S=Math.round(n.renderTime||n.loadTime),k()})).observe({type:"largest-contentful-paint",buffered:!0})}catch(e){}var H=null,A=null;window.__SKYNET.USERSENDPROFILE&&r.on("userProfile",(function(e){H=e,A&&(I||(I=!0,r.fire("profilekeys",{fp:A.fp,fsp:A.fsp,tti:A.tti,p1:H.p1||0,p2:H.p2||0})))})),u.needSendPerformance&&(r.on("__networkSend",P),r.on("__networkBack",(function(e){x[e.url].timeout||(v--,clearTimeout(x[e.url].timer),k())})),u.needSendError&&(r.on("longRequest",(function(e){o.sendWithInfo("xhr","slow",JSON.stringify(e))})),r.on("longRun",(function(e){o.sendWithInfo("jsRun","slow",JSON.stringify(e))})),r.on("error",(function(e){"ajaxError"!==e.name&&"fetchError"!==e.name||!window.__SKYNET.ajaxErrorFilter?o.sendWithInfo(e.name,e.type,e.msg):window.__SKYNET.ajaxErrorFilter(e.url)||o.sendWithInfo(e.name,e.type,e.msg)}))));var X=!1;u.needSendPerformance&&(setTimeout((function(){D()&&!X&&(X=!0,p("whiteScreen","paintError",_+" - "+document.body.innerText+" - "+(Date.now()-l)+" - "+c.getInfo())),window.__SKYNET.USERSENDPROFILE||I||(I=!0,r.fire("profilekeys",U()))}),1e4),r.bindBrowserEvent(window,"beforeunload",(function(){!X&&D()&&Date.now()-l>5e3&&!window.__SKYNET.DONTSENDPAINTERROR&&(X=!0,d("whiteScreen","paintError","unload - "+_+" - "+document.body.innerText+" - "+(Date.now()-l)+" - "+c.getInfo())),I||d("upload","profile","unload - "+(Date.now()-l)+" - "+c.getInfo())})))}function U(){var e=R()>>0||N;i.init();var t=Math.max(e,S||O,E,B())>>0;return{fp:e,fsp:t,tti:y=Math.max(y,t)>>0}}e.exports=U},28:function(e){var t={};e.exports={bindBrowserEvent:function(e,t,n,r){var o=!1;void 0!==r&&(o=r),e.addEventListener?e.addEventListener(t,n,o):e.attachEvent&&e.attachEvent("on"+t,n)},off:function(e,n){var r=t[e];if(r&&r.length)if(n){for(var o=0,i=r.length;o<i;o++)if(r[o]===n){r.splice(o,1);break}}else t[e]=[]},on:function(e,n){t[e]||(t[e]=[]),t[e].push(n)},fire:function(e,n){var r=t[e];if(r&&r.length)for(var o=0,i=r.length;o<i&&!1!==r[o](n);o++);}}},327:function(e){var t,n,r="1"===(t=location.search.substring(1),n={},t.split("&").forEach((function(e){var t=e.split("=");n[t[0]]=t[1]})),n).debug;e.exports=r},564:function(e,t,n){function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}var o=n(28),i=n(447),s=n(900),a=n(541),p=1e3*i.maxXHR,d=1e3*i.maxJsRun,u=window.XMLHttpRequest,c=0;function l(e){try{return-1===e.indexOf("cmos/profile")&&-1===e.indexOf("tracker")&&-1===e.indexOf("/pf")&&-1===e.indexOf("/printLog")}catch(e){return!0}}if(window.__SKYNET=window.__SKYNET||{},(!window.__SKYNET.init||window.__SKYNET.init&&!window.__SKYNET.pageInit)&&s.needSendPerformance){try{if(window.fetch){var f=window.fetch;window.fetch=function(e,t){return new Promise((function(n,i){var s,d=Date.now(),u=0;s=t?f(e,t):f(e),a.addAPI(),s.then((function(t){var i="object"===r(e)?e.url:e;if(a.addAPIDONE(),u=Date.now()-d,t.ok)o.fire("apiTime",{time:u,url:i,netType:1}),u>p&&o.fire("longRequest",{time:u,url:i});else if(l(i))if(window.__SKYNET.xhrStatusFilter)try{-1===window.__SKYNET.xhrStatusFilter.indexOf(t.status)&&o.fire("error",{name:"fetchError",type:"network",msg:i+" status "+t.status,url:i})}catch(e){}else o.fire("apiTime",{time:u,url:i,netType:0}),o.fire("error",{name:"fetchError",type:"network",msg:i+" status "+t.status,url:i});n(t)})).catch((function(t){var n="object"===r(e)?e.url:e;l(n)&&o.fire("error",{name:"fetchError",type:"network",msg:n+" "+(t.type||t.name)+" "+(t.message||"").substring(100)+" status -1",url:n}),i(t)}))}))}}}catch(e){o.fire("JsError",{name:"jsRun",type:"fetchRun",msg:e.message})}window.XMLHttpRequest=function(){this._id=c++,this._start=0,this._xhr=new u,this.readyState=0,this.status=0,this.onreadystatechange=null,this.responseText="",this.responseURL="",this.responseXML=null,this.response="",this.responseType="";var e=0;this.aborted=!1,this.upload=this._xhr.upload,this.withCredentials=this._xhr.withCredentials;var t=this,n="",r=!1;Object.defineProperty(this,"withCredentials",{set:function(e){t._xhr.withCredentials=r=e},get:function(){return r}}),Object.defineProperty(this,"timeout",{set:function(n){e=n,t._xhr.timeout=n},get:function(){return e}}),Object.defineProperty(this,"responseType",{set:function(e){n=e,t._xhr.responseType=e},get:function(){return n}})},XMLHttpRequest.prototype.open=function(e,t,n){void 0===n&&(n=!0),this._url=t,this._type=n,this._method=e,this._start=Date.now(),this._xhr.open(e,t,n)},XMLHttpRequest.prototype.send=function(e){var t=this;l(t._url)&&(o.fire("__networkSend",{url:t._url}),a.addAPI()),Object.defineProperty||""===this.responseType||(this._xhr.responseType=this.responseType),this._xhr.onreadystatechange=function(e){if(4===t._xhr.readyState){var n=Date.now()-t._start;if(t._xhr.status>=200&&t._xhr.status<300||304===t._xhr.status){if(a.addAPIDONE(),o.fire("apiTime",{time:n,url:t._url,netType:1}),n>p&&o.fire("longRequest",{time:n,url:t._url}),t.responseURL=t._xhr.responseURL,""!==this.responseType&&"text"!==this.responseType||(t.responseText=t._xhr.responseText),""!==this.responseType&&""!==this.responseType||(t.responseXML=t._xhr.responseXML),t.response=t._xhr.response,"json"===t.responseType&&"string"==typeof t.response)try{t.response=JSON.parse(t.response)}catch(e){}t._type&&(t._start=Date.now()),setTimeout((function(){var e=Date.now()-t._start-10;l(t._url)&&o.fire("__networkBack",{url:t._url,useTime:e}),e>d&&o.fire("longRun",{time:e,url:t._url})}),10)}else{if(l(t._url))if(window.__SKYNET.xhrStatusFilter)try{-1===window.__SKYNET.xhrStatusFilter.indexOf(t._xhr.status)&&o.fire("error",{name:"ajaxError",type:"network",msg:t._url+" status "+t._xhr.status,url:t._url})}catch(e){}else o.fire("apiTime",{time:n,url:t._url,netType:0}),o.fire("error",{name:"ajaxError",type:"network",msg:t._url+" status "+t._xhr.status,url:t._url});o.fire("__networkBack",{url:t._url,useTime:n,type:"error"})}}t.readyState=t._xhr.readyState,t.status=t._xhr.status,t.onreadystatechange&&t.onreadystatechange(e)},this._xhr.onload=function(e){t.onload&&t.onload(e)},this._xhr.ontimeout=function(e){t.ontimeout&&t.ontimeout(e)},this._xhr.onabort=function(e){t.onabrot&&t.onabort(e)},this._xhr.onloadend=function(e){t.onloadend&&t.onloadend(e)},this._xhr.onerror=function(e){t.onerror&&t.onerror(e)},this._xhr.onloadstart=function(e){t.onloadstart&&t.onloadstart(e)},this._xhr.onprogress=function(e){t.onprogress&&t.onprogress(e)},this._xhr.send(e)},XMLHttpRequest.prototype.setRequestHeader=function(e,t){this._xhr.setRequestHeader(e,t)},XMLHttpRequest.prototype.getResponseHeader=function(e){return this._xhr.getResponseHeader(e)},XMLHttpRequest.prototype.getAllResponseHeaders=function(){return this._xhr.getAllResponseHeaders()},XMLHttpRequest.prototype.abort=function(){return this.aborted=!0,this._xhr.abort()},XMLHttpRequest.prototype.addEventListener=function(e,t,n){return this._xhr.addEventListener(e,t,n)},XMLHttpRequest.prototype.removeEventListener=function(e,t,n){return this._xhr.removeEventListener(e,t,n)},XMLHttpRequest.prototype.overrideMimeType=function(e){this._xhr.overrideMimeType(e)},XMLHttpRequest.prototype.__zone_symbol__addEventListener=XMLHttpRequest.prototype.addEventListener,XMLHttpRequest.prototype.__zone_symbol__removeEventListener=XMLHttpRequest.prototype.removeEventListener}e.exports={XHR:u,getMaxTime:function(){return{}}}},502:function(e,t,n){n(534);var r,o,i=n(564),s=(window.__SKYNET||{}).api||"https://mtm.online-cmcc.cn/cmos/profile",a=n(883),p=n(922),d=n(900),u=n(327),c=n(28),l=a(),f=[],w=[],m=[],h=0,g={};c.bindBrowserEvent(window,"beforeunload",(function(){d.needSendPerformance&&(w.length&&navigator.sendBeacon&&(navigator.sendBeacon(s,JSON.stringify(w)),w.length=0),f.length&&navigator.sendBeacon&&(navigator.sendBeacon(s,JSON.stringify(f)),f.length=0),m.length&&navigator.sendBeacon&&(navigator.sendBeacon(s,JSON.stringify(m)),m.length=0))}));var _=null,y={post:function(e){if(d.needSendPerformance&&0!==e.length&&!(h>=3)){var t=JSON.stringify(e),n=new(0,i.XHR);n.timeout=3e3,n.addEventListener("error",(function(){})),n.open("POST",s),n.send(t),n.onreadystatechange=function(){4===n.readyState&&(n.status>=200&&n.status<300||304===n.status||h++)};try{var r=window.leadeon||window.cmcc||{};r.webViewLog&&l.clientVersion.substring(0,5).replace(/\./g,"")>=925&&u&&r.webViewLog({debug:!1,logList:[t]})}catch(e){}}},sendBeacon:function(e){d.needSendPerformance&&navigator.sendBeacon&&(navigator.sendBeacon(s,JSON.stringify(e))||h++)},sendBeaconWithInfoAll:function(e,t,n){if(d.needSendPerformance)if(navigator.sendBeacon)navigator.sendBeacon(s,JSON.stringify({event:c||"error",sys:l.appName,sysV:l.appVersion,clientV:l.clientVersion,pageName:l.page(),os:l.os,osV:l.OSVersion,browser:l.browser,browserV:l.browserVersion,product:l.product,time:Date.now(),errorName:e,errorType:t,errorLog:n,uuid:p.getUUID()}))||h++;else try{y.sendWithInfo(e,t,n,"error","all")}catch(e){}},sendALLInfo:function(e,t,n,r){d.needSendPerformance&&d.needSendAPI&&(clearTimeout(_),m.push({event:r||"error",sys:l.appName,sysV:l.appVersion,clientV:l.clientVersion,pageName:l.page(),os:l.os,osV:l.OSVersion,browser:l.browser,browserV:l.browserVersion,product:l.product,time:Date.now(),errorName:e,errorType:t,errorLog:n,uuid:p.getUUID()}),_=setTimeout((function(){navigator.sendBeacon(s,JSON.stringify(m)),m.length=0}),2e3))},sendBeaconWithInfo:function(e,t,n,r){if(d.needSendPerformance)if(navigator.sendBeacon)navigator.sendBeacon(s,JSON.stringify({event:r||"error",sys:l.appName,sysV:l.appVersion,clientV:l.clientVersion,pageName:l.page(),os:l.os,osV:l.OSVersion,browser:l.browser,browserV:l.browserVersion,product:l.product,time:Date.now(),errorName:e,errorType:t,errorLog:n,uuid:p.getUUID()}));else try{y.sendWithInfo(e,t,n,r)}catch(e){}},send:function(e,t){d.needSendPerformance&&(t?y.post(e):(clearTimeout(o),e.length?w=w.concat(e):w.push(e),o=setTimeout((function(){w.length&&(y.post(w),w.length=0),clearTimeout(o)}),1e3)))},sendWithInfo:function(e,t,n,o,i){(i||d.needSendPerformance)&&(function(e,t){return!(!e||"string"!=typeof e||(n="network"===t?e:e.substring(0,100),g[n]?g[n]+=1:g[n]=1,g[n]<3));var n}(n,t)||(clearTimeout(r),f.push({event:o||"error",sys:l.appName,sysV:l.appVersion,clientV:l.clientVersion,pageName:l.page(),os:l.os,osV:l.OSVersion,browser:l.browser,browserV:l.browserVersion,product:l.product,time:Date.now(),errorName:e,errorType:t,errorLog:n,uuid:p.getUUID()}),r=setTimeout((function(){f.length&&(y.post(f),f.length=0)}),1e3)))}};c.on("apiTime",(function(e){y.sendALLInfo("api","network",{time:e.time,url:e.url,netType:e.netType},"netTime")})),e.exports=y},817:function(e){var t={browser:"",bv:"",os:"",ov:"",product:""},n={MicroMessenger:"WeChat"};e.exports=function(e){try{var r;return e.match(/\([^\)]*\)/g)?function(e){var t,r,o=e.match(/\([^\)]*\)/g),i=o[0];i=i.split(" ");var s,a,p,d,u=[];if(-1!==e.indexOf("iPhone")){r=e.split(o[1])[1],t=e.split(o[1])[1].split(/\s+/g),-1!==e.indexOf("wkwebview")?u=["wkwebview",""]:-1!==e.indexOf("MicroMessenger")?u=t[2].split("(")[0].split("/"):-1!==e.indexOf("AlipayClient")?u=["AlipayClient",r.split("AlipayClient/")[1].split(" ")[0]]:-1!==e.indexOf("shydhn")||-1!==e.indexOf("GDMobile")||-1!==e.indexOf("ynmobileapp_ios")||-1!==e.indexOf("sjyyt")||-1!==e.indexOf("ImgoTV")?1===(u=t[t.length-1].split("/")).length&&(u=t[t.length-2].split("/")):u=-1!==e.indexOf("anhuiAPP")?[t[2].split("=")[1],t[t.length-2].split("=")[1]]:-1!==e.indexOf("10086APP")?["10086APP",""]:-1!==e.indexOf("woxin_IOS")?["woxin",""]:-1!==e.indexOf("UCBrowser")||-1!==e.indexOf("QQTheme")||-1!==e.indexOf("toon")?t[2].split("/"):-1!==e.indexOf("Quark")?["Quark",e.split("Quark/")[1].split(" ")[0]]:-1!==e.indexOf("SogouMobileBrowser")?t[t.length-1].split("/"):-1!==e.indexOf("CqmcClient")?["CqmcClient",""]:-1!==e.indexOf("ysapp_ios")?["ysapp",""]:-1!==e.indexOf("GxMobileEhallAppMessenger")?["GxMobileEhallAppMessenger",t[t.length-1].split("@")[1]]:-1!==e.indexOf("Youku")?["Youku",t[4].split("/")[1].split("(")[0]]:-1!==e.indexOf("gmcchh")?["gmcchh",t[t.length-2].split("/")[1]||t[t.length-1].split("/")[1]]:-1!==e.indexOf("weibo")?["weibo",t[t.length-1].split("__")[2]]:-1!==e.indexOf("baiduboxapp")?t[4].split("/"):-1!==e.indexOf("jsmcc")?t[t.length-2].split("/"):-1!==e.indexOf("scmcc")?["scmcc",t[1].split("/")[2]]:-1!==e.indexOf("iHeYueSX")?["iHeYueSX",t[2].split(";")[3]]:-1!==e.indexOf("Migu")?["Migu",t[2].split("(")[0].split("/")[2]||t[3].split("V")[1]]:t.length<3?r=e.split(") ")[1].split(" ")[0].split("/"):e.split(") ")[1].split(" ")[0].split("/"),u[1]||(u=e.split(") ")[1].split(" ")[0].split("/"));for(var c=0,l=i.length;c<l&&(p=i[c].replace(/\_/g,"."),/[a-zA-Z]/.test(p));c++);s={browser:n[u[0]]||u[0],bv:u[1].split("(")[0],os:"iOS",ov:p,product:i[0].replace("(","").replace(";","")}}else u=-1!==e.indexOf("MicroMessenger")?["MicroMessenger",e.split("MicroMessenger/")[1].split("(")[0].split(" ")[0]]:-1!==e.indexOf("MQQBrowser")?["MQQBrowser",e.split("MQQBrowser/")[1].split(" ")[0]]:-1!==e.indexOf("AlipayClient")?["AlipayClient",e.split("AlipayClient/")[1].split(" ")[0]]:-1!==e.indexOf("10086APP")?["10086APP",""]:-1!==e.indexOf("HuaweiBrowser")?["HuaweiBrowser",e.split("HuaweiBrowser/")[1].split(" ")[0]]:-1!==e.indexOf("UCBrowser")?["UCBrowser",e.split("UCBrowser/")[1].split(" ")[0]]:-1!==e.indexOf("Quark")?["Quark",e.split("Quark/")[1].split(" ")[0]]:-1!==e.indexOf("GDMobile")?["GDMobile",e.split("GDMobile/")[1].split(" ")[0]]:-1!==e.indexOf("MiuiBrowser")?["MiuiBrowser",e.split("MiuiBrowser/")[1].split(" ")[0]]:-1!==e.indexOf("Youku")?["Youku",e.split("Youku/")[1].split(" ")[0]]:-1!==e.indexOf("Firefox")?["Firefox",e.split("Firefox/")[1].split(" ")[0].split("_")[0]]:-1!==e.indexOf("HeyTapBrowser")?["HeyTapBrowser",e.split("HeyTapBrowser/")[1].split(" ")[0]]:-1!==e.indexOf("NokiaBrowser")?["NokiaBrowser",e.split("NokiaBrowser/")[1].split(" ")[0]]:-1!==e.indexOf("Chrome")?["Chrome",e.split("Chrome/")[1].split(" ")[0]]:e.split(") ")[1].split(" ")[0].split("/"),-1!==e.indexOf("Flyme")?(a=e.split("Meizu-")[1].split("/")[0],s={browser:"AppleWebKit",bv:e.split("AppleWebKit")[1].split("(")[0].split(" ")[0],os:"Flyme",ov:e.split("Flyme")[1],product:a}):-1!==i[0].indexOf("inux")?("ZTE"===(a=i.length<4?"":"HUAWEI"!==(i[3]||"").replace(";","")?i[3].replace(";",""):(i[4]||"").replace(";",""))||"HarmonyOS"===a?a=i[4]:"Redmi"===a||"Le"===a||"HM"===a||"OPPO"===a||"vivo"===a?a=i[3]+" "+i[4]:-1!==e.indexOf("GIONEE")&&(a=-1===e.indexOf("GIONEE-")?i[3]+" "+(-1!==i[4].indexOf("/")?"":i[4]):e.split("GIONEE-")[1].split("/")[0],u=["AppleWebKit",e.split("AppleWebKit")[1].split("(")[0].split(" ")[0].replace("/","")]),d=i[1],p=(i[2]||"").replace(")",""),-1!==e.indexOf("HarmonyOS")?(d="HarmonyOS",p=""):"U;"===d&&(d=i[2],p=(i[3]||"").replace(";","")),a===p&&("Redmi"!==(a=i[5])&&"Le"!==a&&"HM"!==a&&"OPPO"!==a&&"vivo"!==a||(a=i[5]+" "+i[6])),"8848"===a&&(a=i[5]+" "+i[6]),/[^\d]/.test(a)||(a=""),a&&(a=a.replace(")","")),p&&(p=p.replace(")","")),a&&-1!==a.indexOf("Build/")&&(a=-1!==a.indexOf("-")?a.split("/")[1]:""),s={browser:n[u[0]]||u[0],bv:u[1],os:d,ov:p,product:a}):-1!==i[0].indexOf("iPad")?(p=((p="OS"===i[3]?i[4]:i[3])||"").replace("_","."),s={browser:n[u[0]]||u[0],bv:u[1],os:"Mac OS",ov:p,product:"iPad"}):-1!==i[0].indexOf("Macintosh")?s={browser:n[u[0]]||u[0],bv:u[1],os:"Mac OS",ov:(i[5]||"").replace("_",".").replace(")",""),product:"Macintosh"}:-1!==i[0].indexOf("X11")?s={browser:n[u[0]]||u[0],bv:u[1],os:"Linux X11",ov:"Linux X11",product:"Linux X11"}:-1!==i[0].indexOf("Windows")?s={browser:n[u[0]]||u[0],bv:u[1],os:"Windows",ov:{5:"Windows XP",6:"windows 7",10:"Windows 10"}[parseInt(i[2]||"")||parseInt(i[4]||"")],product:"Windows"}:-1!==i[0].indexOf("Android")?s={browser:n[u[0]]||u[0],bv:u[1],os:"Android",ov:i[1].replace(";",""),product:""}:-1!==i[0].indexOf("Symbian")&&(s={browser:n[u[0]]||u[0],bv:u[1],os:"Symbian",ov:(i[0].split("/")[1]||"").replace(";",""),product:i[2].split("/")[0]});return s||(s={browser:"",bv:"",os:"",ov:"",product:""}),s.product=s.product||"",s}(e):"Hisense"===(r=e.split(" "))[0]?(i=(o=r)[2].split("/"),s=o[1].split("/")[0],{browser:(a=o[4].split("/"))[1],bv:a[2],os:i[0],ov:i[1],product:s}):-1!==r[0].indexOf("Xiao")?function(e){var t,n,r;return 1===e.length?(t=["",""],n="xiaomi",r=e[0].split("/")):8===e.length?(t=["Android",e[1].split("/").pop()],n=e[0].split("/")[0],r=e.pop().split("/")):(t=e[2].split("/"),n=e[0].split("/")[0],r=e.pop().split("/")),{browser:r[1],bv:r[2],os:t[0],ov:t[1],product:n}}(r):-1!==r[0].indexOf("Xingcheweishi")?{browser:"",bv:"",os:"Xingcheweishi",ov:r[0].split("/")[1],product:""}:-1!==r[0].indexOf("MTK")?function(e){var t=e[2].split("/"),n=e[0].split("/")[0],r=e[5].split("/");return{browser:r[0],bv:r[1],os:t[0],ov:t[1],product:n}}(r):t}catch(e){return t}var o,i,s,a}},758:function(e,t,n){var r=n(502),o=n(447),i=n(900),s=n(28),a=1e3*o.maxResource,p={},d={};function u(){var e=[];try{e=window.performance.getEntriesByType("resource")}catch(e){}for(var t,n=[],o=[],s=0,c=e.length;s<c;s++)"link"!==e[s].initiatorType&&"script"!==e[s].initiatorType||d[e[s].name]||(d[e[s].name]=!0,o.push({name:e[s].name,time:e[s].duration>>0,netType:(t=e[s].decodedBodySize,t>0?1:0)})),"xmlhttprequest"!==e[s].initiatorType&&"fetch"!==e[s].initiatorType&&""!==e[s].nextHopProtocol&&e[s].duration>a&&!p[e[s].name]&&-1===(e[s].name||"").indexOf("dcs.gif")&&-1===(e[s].name||"").indexOf("sa.gif")&&(p[e[s].name]=!0,n.push(e[s].name+" - "+(e[s].duration>>0)));o.length&&i.needSendRes&&r.sendBeaconWithInfo("resourse","time",o,"resTime"),n.length&&i.needSendPerformance&&i.needSendError&&r.sendBeaconWithInfo("resourse","slow",{msg:n}),setTimeout(u,5e3)}s.bindBrowserEvent(window,"beforeunload",(function(){u()}));var c=!1;e.exports={init:function(){c||(c=!0,u())}}},541:function(e,t,n){var r=1e3*n(447).maxResource,o=0,i=0,s=0,a=0,p=0,d=0,u=0,c=!1;e.exports={addError:function(){o++},addAPI:function(){i++},addAPIDONE:function(){s++},addErrorRes:function(){u++},setOnload:function(e){c=e},getInfo:function(){try{if(window.performance.getEntries)for(var e=performance.getEntriesByType("resource"),t=0,n=e.length;t<n;t++)"link"===e[t].initiatorType?(p++,e[t].duration>r&&d++):"script"===e[t].initiatorType&&(a++,e[t].duration>r&&d++)}catch(e){}return"jsError:"+o+" api:"+i+" apiDone:"+s+" jsRes:"+a+" cssRes:"+p+" errRes:"+u+" slow:"+d+" isonload:"+c}}},447:function(e){e.exports={maxXHR:((window.__SKYNET||{}).time||{}).api||3,maxJsRun:((window.__SKYNET||{}).time||{}).jsrun||.5,maxResource:((window.__SKYNET||{}).time||{}).res||2}},883:function(e,t,n){var r=n(817);function o(){return document.title,(window.__SKYNET.formatUrl?""+window.__SKYNET.formatUrl(location.href):window.__SKYNET.usePathKey?(""+location.pathname).replace(/\/$/,""):""+location.href.replace(/\:/g,"").replace(/yx=[^&]*&*|touch_id=[^&]*&*|ys=[^&]*&*/g,"")).substring(0,200)}window.__SKYNET=window.__SKYNET||{},window.__SKYNET.__versions="1.4.1";var i=r(navigator.userAgent),s=(/leadeon\/([^\/]+)/.exec(navigator.userAgent)||["","0"])[1];e.exports=function(e){var t=window.__SKYNET.noSendDevice;return{browser:t?"":("0"===s?"":"webview-")+(i.browser||""),browserVersion:t?"":i.bv||"0",os:t?"":i.os||"0",OSVersion:t?"":i.ov||"0",appName:window.__SKYNET.appName||"unknown",appVersion:window.__SKYNET.appVersion||"0",clientVersion:s,page:o}}},922:function(e,t,n){var r=n(534),o=(performance.timing.navigationStart||performance.timing.redirectStart||performance.timing.fetchStart)+"-";function i(){for(var e="",t=4;t--;)e+="01234456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[63*Math.random()>>0];return e}var s=r.getItem("cmosClientId");s||(s=i(),r.setItem("cmosClientId",s)),o+=i(),e.exports={getUUID:function(){var e="";return window.__SKYNET.getUID?(e=window.__SKYNET.getUID(),s+"-"+e+"-"+o):s+"-"+o}}},285:function(e,t,n){var r=n(28),o=r.bindBrowserEvent,i=n(502),s=n(883),a=n(922),p=n(900),d=n(541),u=s();function c(e){var t,n,o=e.target||e.srcElement,s="",p=o.src||o.href;if(o===window){var c="",l="";e.message||e.error?(c=e.message||e.error.message,l=e.error.stack||""):e.reason&&e.reason.message?(c="Uncaught (in promise) "+e.reason.message,l=e.reason.stack):e.reason&&(c="Uncaught (in promise) "+e.reason,l=""),c=c.substring(0,200),window.__SKYNET.errorFilter&&window.__SKYNET.errorFilter(c)?s="":""!==c.replace(/\s+/g,"")&&(n="9.2.0",s="0"!==(t=u.clientVersion)&&(t[0]<n[0]||t[2]<n[2]||t[4]<n[4])&&-1!==c.indexOf("Script error")?"":JSON.stringify({line:e.lineno||0,column:e.colno||0,msg:c||"",fileName:e.filename||"",stack:l,pageName:u.page()})),s&&(r.fire("JsError",s),d.addError(),i.send({event:"error",sys:u.appName,sysV:u.appVersion,clientV:u.clientVersion,pageName:u.page(),os:u.os,osV:u.OSVersion,browser:u.browser,browserV:u.browserVersion,product:u.product,errorName:"JsError",errorType:"runtime",errorLog:s,time:Date.now(),uuid:a.getUUID()}))}else p&&"mini-img-qrcode-show data:image/png;base64,"!==p&&"mini-img-qrcode data:image/png;base64,"!==p&&p!==location.href&&(i.sendWithInfo(o.tagName,"resource",(o.className||"")+" "+p),-1===p.indexOf(".js")&&-1===p.indexOf(".css")||d.addErrorRes())}e.exports=function(){p.needSendPerformance&&p.needSendError&&(o(window,"error",c,!0),o(window,"unhandledrejection",c,!0))}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}!function(){var e=n(883),t=n(28),r=n(502),o=n(285),i=n(79),s=n(758),a=n(922),p=n(502),d=n(900),u=n(541),c=t.bindBrowserEvent;if(window.__SKYNET=window.__SKYNET||{},!window.__SKYNET.init||window.__SKYNET.init&&!window.__SKYNET.pageInit){var l=function(){var t=(new Date).getTime(),n=w.unloadEventEnd-w.unloadEventStart,r=w.domainLookupStart-w.fetchStart,o=w.domainLookupEnd-w.domainLookupStart,i=w.responseStart-(w.requestStart||w.fetchStart),s=w.responseEnd-w.responseStart,p=w.connectEnd-w.connectStart,d=w.loadEventEnd-(w.navigationStart||w.fetchStart),u=w.domContentLoadedEventEnd-w.responseEnd,c=w.domComplete-w.responseEnd,l=e();return{event:"performance",sys:l.appName,pageName:l.page(),sysV:l.appVersion,clientV:l.clientVersion,time:t,fp:0,fsp:0,interactive:0,unload:Math.max(Math.round(n,0),0),cache:Math.max(Math.round(r,0),0),tcp:Math.max(Math.round(p||0),0),dns:Math.max(Math.round(o||0),0),fb:Math.max(Math.round(i||0),0),domready:Math.max(Math.round(u||0),0),fullLoad:Math.max(Math.round(d||0),0),htmlLoad:Math.max(Math.round(s||0),0),pageRender:Math.max(Math.round(c||0),0),os:l.os,osV:l.OSVersion,browser:l.browser,browserV:l.browserVersion,product:l.product,uuid:a.getUUID()}},f=function(e,t){if(!m){m=!0;var n=t;n||(n=i());var o=l();o.fp=Math.round(n.fp),o.interactive=Math.round(n.tti),o.fsp=Math.round(n.fsp),o.p1=Math.round(n.p1||0),o.p2=Math.round(n.p2||0),o.webview=window.__SKYNET.webview?(w.navigationStart||w.fetchStart)-window.__SKYNET.webview>>0:0,"unload"===e?(o.sendType="unload",r.sendBeacon(o)):r.send(o)}};o();var w,m=!1;w=window.performance?performance.getEntriesByType("navigation").length?performance.getEntriesByType("navigation")[0]:performance.timing?performance.timing:{}:{},c(window,"load",(function(){u.setOnload(w.loadEventStart-(w.navigationStart||w.fetchStart)>>0)})),t.on("profilekeys",(function(e){var t=l(),n=null;t.fullLoad>0?(s.init(),t.fp=Math.round(e.fp),t.interactive=Math.round(e.tti),t.fsp=Math.round(e.fsp),t.p1=Math.round(e.p1||0),t.p2=Math.round(e.p2||0),t.webview=window.__SKYNET.webview?(w.navigationStart||w.fetchStart)-window.__SKYNET.webview>>0:0,m=!0,r.send(t,!0)):(e.fp<e.fsp&&(n=e),c(window,"load",(function(){setTimeout((function(){f("load",n)}),100)})))})),c(window,"beforeunload",(function(){d.needSendPerformance&&f("unload")})),window.__SKYNET.send=function(e,t){"string"!=typeof e&&(e=JSON.stringify(e)),p.sendBeaconWithInfo("custom",t||"user",e)},window.__SKYNET.sendAll=function(e,t){"string"!=typeof e&&(e=JSON.stringify(e)),p.sendBeaconWithInfoAll("custom",t||"user",e)},window.__SKYNET.init=!0,window.__SKYNET.pageInit=!0,window.__SKYNET.fire=t.fire}}()}();