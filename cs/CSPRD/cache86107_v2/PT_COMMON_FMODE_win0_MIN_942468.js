

var gFocusId = null;var bLocalModal = false;function PT_createStandardObjects()
{
 browserInfoObj2 = new PT_browserInfo();  browserInfoObj2.init(); ptCommonObj2 = new PT_common();  ptConsole2 = new PT_console();  ptRC2 = new PT_RC();  ptSearchObj = new PT_Search(); }

function PT_console()
{
this.el = null;this.enabled = false;this.activated = false;}

PT_console.prototype = {
isActive: function() {
return this.activated;},
isEnabled:function(){
if (this.el && this.enabled) return true;return false;},
enable:function(){
if (this.isEnabled()) return;this.enabled = true;this.el = document.getElementById("pt_console");if(!this.el){
 var oBody = document.body; oObj = document.createElement("div"); oObj.setAttribute("id", "pt_console"); oBody.appendChild(oObj);}

this.el = document.getElementById("pt_console");this.el.consoleModal=this;this.el.innerHTML="<input type=button id='COPYCONSOLE' value='Copy' onclick='ptConsole2.copy();' alt='copy to clipboard' title='copy to clipboard'><input type=button id='CLEARCONSOLE' onclick='ptConsole2.clear();' value='Clear' alt='clear console' title='clear console'><input type=button id='HIDECONSOLE' onclick='ptConsole2.hide();' value='Hide' alt='hide console' title='hide console'><input type=button id='CLOSECONSOLE' onclick='ptConsole2.deactive();' value='Close' alt='close console' title='close console'>";},
active:function(){
if (!this.enabled) return false;if (!this.el)
{
this.el = document.getElementById("pt_console");if (!this.el) return null;}
if (this.el.innerHTML == "")
 this.el.innerHTML="<input type=button id='COPYCONSOLE' value='Copy' onclick='ptConsole2.copy();' alt='copy to clipboard' title='copy to clipboard'><input type=button id='CLEARCONSOLE' onclick='ptConsole2.clear();' value='Clear' alt='clear console' title='clear console'><input type=button id='HIDECONSOLE' onclick='ptConsole2.hide();' value='Hide' alt='hide console' title='hide console'><input type=button id='CLOSECONSOLE' onclick='ptConsole2.deactive();' value='Close' alt='close console' title='close console'>";this.show();this.activated = true;},
deactive:function(){
if (!this.enabled) return false;this.hide();if (this.el)
 this.el.innerHtml = "";this.el = null;this.activated = false;},
show:function(){
if (!this.el) return false;if (isFModeLayout()) 
 removeHide(this.el);else {
 this.el.style.zIndex = 99999; this.el.style.display = "block"; this.el.style.top = 75 + 'px'; this.el.style.left = (ptCommonObj2.getViewportWidth(window) - this.el.clientWidth - 10) + 'px'; }
},
hide:function(){
if (!this.el) return false;if (isFModeLayout())
 addHide(this.el);else
 this.el.style.display = "none";},

copy:function(){
if (!this.el) return false;var txt='';for (var i=0; i<this.el.childNodes.length; i++) {
 var node=this.el.childNodes[i]; if (node.nodeName.toLowerCase() == 'div')
 {
 if (node.lastChild.nodeName.toLowerCase() == 'textarea')
 txt=txt+node.lastChild.value+'\n\n'; }
 }
if (browserInfoObj2.isIE)
 clipboardData.setData("Text", txt);else 
 this.append(txt);},
clear:function(){
if (!this.el) return false;while(this.el.lastChild && this.el.lastChild.type!='button') {
this.el.removeChild(this.el.lastChild);}
},
append:function(msg){
if (!this.el) return false;var txtNode=document.createElement('textarea');txtNode.className='debugtext';txtNode.readOnly = 'true';txtNode.value=msg;txtNode.setAttribute('PSnchg','1');var domEl=document.createElement('div');domEl.appendChild(txtNode);domEl.className='debugtext';this.el.appendChild(domEl);}
} 
var bSessionStorage = (typeof(sessionStorage) != "undefined")?true:false;if (bSessionStorage) {
 try {
 sessionStorage.setItem("test", "1"); sessionStorage.removeItem("test"); }
 catch (e) {
 bSessionStorage = false; }
}

function PT_browserInfo()
{
 this.browser='';  this.isOpera=false;  this.isIE=false;  this.isFF=false;  this.isNetscape;  this.isMozilla = false; this.isSafari = false; this.version='';  this.isMacOS=false; this.isSafari2x = false; this.isiPad = false; this.isiOS5 = false; this.isEdge = false; this.isEdgeChromium = false; this.isChrome = false; this.bypassIOSFrameWrknd = false; }

PT_browserInfo.prototype = {
init:function(){
this.browser = navigator.userAgent.toLowerCase();this.isMozilla = /mozilla/.test(this.browser) && !/(compatible|webkit)/.test(this.browser);this.isSafari2x = this.Safari2x(this.browser);this.isiPad = (this.browser.indexOf('ipad') >= 0) ? true : (this.browser.indexOf('iphone') >= 0) ? true : false;this.isiOS5 = /os 5/.test(this.browser);var tstver = this.browser.match(/\s+os\s+(\d+)_/); this.bypassIOSFrameWrknd = (tstver != null && tstver.length && tstver[1] >= 13); this.isOpera = (this.browser.indexOf('opera') >= 0) ? true : false;if (this.isOpera) return;this.isIE = ((this.browser.indexOf('msie') >= 0) || (this.browser.indexOf('trident') >= 0) || (this.browser.indexOf('edge') >= 0)) ? true : false;if (this.isIE) {
 if (this.browser.toLowerCase().indexOf('msie') >= 0)
 this.version = navigator.appVersion.replace(/.*?MSIE (\d\.\d).*/g, '$1') / 1; else if (this.browser.toLowerCase().indexOf('trident/7.0') >= 0)
 this.version = 11; else if (this.browser.toLowerCase().indexOf('edge/') >= 0) {
 this.isEdge = true; this.version = 12; }
 return;}

this.isChrome = (this.browser.indexOf('chrome') >= 0) ? true : false;if (this.isChrome) 
 {
 if (this.browser.toLowerCase().indexOf('edg/') >= 0)
 this.isEdgeChromium = true; return; }

this.isSafari = this.isChrome = (this.browser.indexOf('safari') >= 0) ? true : false;if (this.isSafari) return;this.isNetscape = (this.browser.indexOf('netscape') >= 0 || this.browser.indexOf('Navigator') >= 0) ? true : false;if (this.isNetscape) return;this.isFF = (this.browser.indexOf('firefox') >= 0) ? true : false;if (this.isFF) return;},




Safari2x : function (userAgent) {
 if (userAgent == null)
 return false; var bSafari2x = false; var WEBKITBUILD412 = 412.0;  var WEBKITBUILD419DOT3 = 419.3;  var WEBKITSTR = "applewebkit/";  var HTMLSTR = " (khtml";  var webKitBuild = 0;  var i = userAgent.toLowerCase().indexOf(WEBKITSTR); var j = userAgent.toLowerCase().indexOf(HTMLSTR); if (i >= 0 && j >= 0) {
 var b = i + WEBKITSTR.length;  var webKitBuildLen = j - b;  webKitBuild = userAgent.substring(b, b + webKitBuildLen);  if (webKitBuild >= WEBKITBUILD412 && webKitBuild <= WEBKITBUILD419DOT3)
 bSafari2x = true; }
 return bSafari2x;}
} 


function PT_common()
{}

PT_common.prototype = {


isHTMLTemplate : typeof(bPSHTMLtemplate) !== "undefined" && bPSHTMLtemplate,

 
cancelEvent : function()
 {
 return false; },


 getViewportHeight: function(oWin) {
 if (!oWin) oWin = window; if (oWin.innerHeight != oWin.undefined)
 return oWin.innerHeight; if (oWin.document && oWin.document.compatMode == 'CSS1Compat')
 return oWin.document.documentElement.clientHeight; if (oWin.document && oWin.document.body)
 return oWin.document.body.clientHeight; return oWin.undefined; },
 
 getViewportWidth: function(oWin) {

 if (!oWin) oWin = window; if (oWin.innerWidth != oWin.undefined)
 return oWin.innerWidth; if (oWin.document && oWin.document.compatMode == 'CSS1Compat')
 return oWin.document.documentElement.clientWidth; if (oWin.document && oWin.document.body)
 return oWin.document.body.clientWidth; return oWin.undefined; },


getMouseCoords : function(ev)
{
 
 
 if('ltr'=='rtl' && browserInfoObj2.isIE)
 {
 var scLeft= parseInt((document.body.scrollWidth - document.body.clientWidth- document.body.scrollLeft),10); var newX=ev.clientX; if (scLeft > 0 && ev.clientX>=scLeft)
 newX = ev.clientX - scLeft;  if(ev.pageX || ev.pageY)
 return {x:newX, y:ev.pageY}; else
 return {x:newX, y:ev.clientY + document.body.scrollTop - document.body.clientTop}; }

 if(ev.pageX || ev.pageY)
 return {x:ev.pageX, y:ev.pageY}; return { x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, y:ev.clientY + document.body.scrollTop - document.body.clientTop };},


getMouseOffset : function(target, ev)
{
 ev = ev || window.event;  var docPos = this.getPosition(target); var mousePos = this.getMouseCoords(ev); return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};},




getPosition2 : function(e, formName)
{
 var left = 0; var top = 0; var oParent=null; var SGRIDLEFTSIDE = "divgbl";  var SGRIDRIGHTSIDE = "divgbr";  var SGRIDLEFTSIDE_FIREFOX = "tdgbl";  var SGRIDRIGHTSIDE_FIREFOX = "tdgbr";  var bFound=false; var nLen=0; while (e.offsetParent)
 {
 if (e.tagName!='HTML')
 {
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else 
 left += e.offsetLeft;  top += e.offsetTop; if ('ltr' != 'rtl') 
 {
 if (!bFound && (e.id.search(SGRIDLEFTSIDE) == 0 || e.id.search(SGRIDRIGHTSIDE) == 0) )
 nLen = SGRIDLEFTSIDE.length; else if (!bFound && (e.id.search(SGRIDLEFTSIDE_FIREFOX) == 0 || e.id.search(SGRIDRIGHTSIDE_FIREFOX) == 0) ) 
 nLen = SGRIDLEFTSIDE_FIREFOX.length; if (!bFound && nLen >0) 
 {
 bFound = true; var gridID = e.id.substring(nLen); nLen=0; var sScript = "var oScrollPos = ptGridObj_" + formName +".getScrollPos(gridID);"; eval(sScript);  top -= oScrollPos.y; if (e.id.search(SGRIDRIGHTSIDE) == 0 || e.id.search(SGRIDRIGHTSIDE_FIREFOX) == 0) 
 left -= oScrollPos.x; } 
 } 
 } 
 else
 oParent=e.offsetParent; e = e.offsetParent; } 
 
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else
 left += e.offsetLeft; top += e.offsetTop; return {x:left, y:top};},


getPosition : function(e)
{
 if (e == null) return {x:0, y:0}; var left = 0; var top = 0; var oParent=null; while (e.offsetParent)
 {
 if (e.tagName!='HTML')
 {
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else 
 left += e.offsetLeft; top += e.offsetTop; }
 else
 oParent=e.offsetParent; e = e.offsetParent; }
 
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else
 left += e.offsetLeft; top += e.offsetTop; return {x:left, y:top};},


getTopPos : function(inputObj)
{
 if (inputObj == null)
 return 0; var returnValue = inputObj.offsetTop; while((inputObj = inputObj.offsetParent) != null){
 if(inputObj.tagName!='HTML'){
 returnValue -=inputObj.scrollTop; returnValue += inputObj.offsetTop; if(document.all)returnValue+=inputObj.clientTop; }
 }
 

 return returnValue;},

getLeftPos:function(inputObj)
{
 if (inputObj == null)
 return 0; var returnValue = inputObj.offsetLeft; if (inputObj.offsetParent)
 {
 while((inputObj = inputObj.offsetParent) != null){
 if(inputObj.tagName!='HTML'){
 returnValue -=inputObj.scrollLeft; returnValue += inputObj.offsetLeft; if(document.all)returnValue+=inputObj.clientLeft; }
 }
 }

 return returnValue;},

getEV: function (id, doc) {
 if (typeof doc == "undefined" || !doc)
 doc = document; var el = document.getElementById(id); if (el && (typeof el.value != "undefined") && el.value)
 return el.value; else
 return "";},

getNV:function(el)
{
 var nv = ""; if (el == null || el.disabled)
 return nv; var elid = (el.id !== "") ? el.id : el.name;  switch(el.type)
 {
 case "button":
 if (el.checked)
 nv = elid + "=" + encodeURIComponent(el.value)+"&"; break; case "radio":
 if (el.checked)
 nv = elid + "=" + encodeURIComponent(el.value)+"&"; break; case "select-one":
 if (el.selectedIndex>-1)
 nv = elid + "=" + encodeURIComponent(el.options[el.selectedIndex].value)+"&"; break; case "select-multiple":
 var i=0; for (i=0;i<el.options.length;i++)
 {
 if (el.options[i].selected)
 nv += (elid + "=" + encodeURIComponent(el.options[i].value)+"&"); }
 break; default:
 if ((typeof el.value == "undefined" || el.type=="") && isFModeLayout()) {
 var sState = (el.getAttribute("ps_state")) ? el.getAttribute("ps_state") : ""; nv = elid + "=" + encodeURIComponent(sState) + "&"; }
 else
 nv = elid + "=" +encodeURIComponent(el.value)+"&"; }
 return nv;},
isEdibleField: function (obj) {
 if (!obj || obj.tagName != "INPUT") return false;  switch (obj.type) {
 case "checkbox":
 case "radio":
 return false; default:
 return true; }
 return true;},

setActiveFocus:function()
{
 var b = navigator.userAgent.toLowerCase(); if (b.indexOf("msie")!=-1)
 {
 var cObj = document.activeElement; if (cObj)
 {
 
 cObj.setActive(); cObj.focus(); }
 }
},

tryFocus:function(obj)
{
if (!this.tryFocus0(obj)) 
 gFocusId = obj.id;return;},

tryFocus0:function(obj)
{

if (obj && typeof obj.focus != "undefined" && !obj.disabled && typeof obj.style != "undefined" && obj.style.visibility!="hidden")
{
 var b = navigator.userAgent.toLowerCase(); try { 
 obj.focus(); }
 catch (err) {
 return true; }
 
 if (b.indexOf("msie")!=-1)
 try {
 
 obj.setActive(); } catch(e){} 

 if (window.focusHook)
 focusHook(obj); if (isFModeLayout() && isTouchKeyboard() && obj && ptCommonObj2.isEdibleField(obj)) {
 doCloseKeyboard(obj); }
 return false;}
return true;},



setResizeCursor:function(evt){var o=getEO(evt);if (o && o != "undefined") o.style.cursor='E-resize';},


getEO:function(evt)
{
try {
 if (!evt)
 evt = event; }
catch (err) {
 if (!evt)
 evt = window.event; }
finally {
 if (!evt)
 return null; if (browserInfoObj2.isIE)
 return evt.srcElement; else
 return evt.target; }
},


isICQryDownload:function(form, name)
{
if (name.indexOf('#ICQryDownload') > -1)
 return true;if (name == '#KEY\r' && form.ICType.value == 'Query' && (typeof (form.ICTypeAheadID) == 'undefined' || form.ICTypeAheadID.value == '') && ((form.ICXML && form.ICXML.value == '1' ) 
 || (form.ICExcel && form.ICExcel.value == '1') || (form.ICEXCEL && form.ICEXCEL.value==0 ) ))
 return true;else
 return false;},


isAJAXReq:function(form, name)
{

if (isFModeLayout() && !name)
 return true;if (form.enctype && form.enctype.indexOf('multipart') != -1 && name.indexOf("#ICOK") != -1)
 return false;if (typeof window.bUIMsg != 'undefined' && window.bUIMsg)
 return false;if (!name)
 return false;if (typeof window.winParent != 'undefined' && window.winParent != null) 
 return true;var BrType = new PT_browserInfo();BrType.init();var bSfr=BrType.isSafari;if(bSfr)
 {

 
 if( name.indexOf('$alic')!=-1
 || name.indexOf('$agdn')!=-1
 || name.indexOf('$mvsk')!=-1
 || name.indexOf('$area')!=-1
 || name.indexOf('$right_arrow')!=-1
 || name.indexOf('$left_arrow')!=-1
 || name.indexOf('$expand')!=-1
 )
 {
 return false; }

 }

if (name.indexOf('ICQryName') != -1
 || name.indexOf("ICCustPage") != -1
 || name.indexOf("#ICCancelCustPage") != -1
 || name.indexOf("#ICSaveCustPage") != -1
 || name.indexOf("#ICRestDflt") != -1

 )
 {
 return false; }
else if (this.isICQryDownload(form, name))
 {
 return false; }
else
 {
 return true; }
},



isSearchSearchPage:function(form)
{
 if (form)
 {
 var searchMsg = "Search"; var oElement = form.elements["#ICSearch"]; var cElement = form.elements["#ICCancel"]; if (cElement != null) 
 return false; if (oElement != null && oElement.value.indexOf(searchMsg)==0 && searchMsg.length==oElement.value.length)
 return true; }
},


isSearchPage:function(form)
{
 if (form)
 {
 var oElement = form.elements["#ICSearch"]; if (oElement != null)
 return true; }
},

isSavePage: function(form)
{
 if (form)
 {
 var oElement = form.elements["#ICSave"]; if (oElement != null)
 return true; }
},



getAbsolutePosition:function(element) 
{
 var r = { x: element.offsetLeft, y: element.offsetTop }; if (element.offsetParent) {
 var tmp = this.getAbsolutePosition(element.offsetParent); r.x += tmp.x; r.y += tmp.y; }
 return r;},

getRelativeCoordinates:function(event, reference) 
{
 var x = 0; var y = 0; event = event || window.event; var el = event.target || event.srcElement; if (!window.opera && typeof event.offsetX != 'undefined') {
 
 var pos = { x: event.offsetX, y: event.offsetY };  var e = el; while (e) {
 e.mouseX = pos.x; e.mouseY = pos.y; pos.x += e.offsetLeft; pos.y += e.offsetTop; e = e.offsetParent; }

 
 var e = document.getElementById(reference); var offset = { x: 0, y: 0 }
 while (e) {
 if (typeof e.mouseX != 'undefined') {
 x = e.mouseX - offset.x; y = e.mouseY - offset.y; break; }
 offset.x += e.offsetLeft; offset.y += e.offsetTop; e = e.offsetParent; }

 
 e = el; while (e) {
 e.mouseX = undefined; e.mouseY = undefined; e = e.offsetParent; }
 }
 else {
 
 var pos = this.getAbsolutePosition(document.getElementById(reference)); x = event.pageX - pos.x; y = event.pageY - pos.y; }

 
 return { x: x, y: y };},



moveUnivSrchDiv:function()
{
 if (!parent.updSrchGrpList) {
 return; }

 try {
 var elemPortal = document.getElementById("ptus_portal"); var univSrch = "ptus_universalSrch"; var usDiv = document.getElementById(univSrch); if (elemPortal && elemPortal.parentNode)
 usDiv = elemPortal.parentNode; if (usDiv) {
 if (usDiv.parentNode.id != 'pthdr2srchgbl') { 
 srchhdr = parent.document.getElementById("pthdr2srchgbl"); if (!srchhdr) {
 var searchHdrElems = parent.document.getElementsByName("searchhdr"); if (searchHdrElems) {
 srchhdr = searchHdrElems[0]; }
 }
 
 if (srchhdr) { 
 
 usDiv = usDiv.parentNode.removeChild(usDiv);   if (!isCrossDomain(top)) {
 
 var tmp = parent.document.getElementById(univSrch); if (tmp)
 tmp.parentNode.removeChild(tmp);  var newNode = parent.document.createElement("div"); newNode.style.visibility="hidden"; newNode.style.display = "none"; newNode.innerHTML = usDiv.innerHTML;  newNode.id = univSrch;  srchhdr.appendChild(newNode);  parent.updSrchGrpList();  }
 } 
 }
 }
 } catch (e) {
 alert(e.message); }
},



expandOrCollapseSearchCriteria:function(form)
{
 var elemAdv = document.getElementById(form.name+'divSEARCHADV'); if (elemAdv && elemAdv.style.display == 'none')
 this.expandSearchCriteria(form, false); else
 this.expandSearchCriteria(form, true);},



expandSearchCriteria:function(form, bExpand)
{
 var elemAbove = document.getElementById(form.name+'divSEARCHABOVE'); var elemAdv = document.getElementById(form.name+'divSEARCHADV'); var elemBelow = document.getElementById(form.name+'divSEARCHBELOW'); var elemImgCollapse = document.getElementById('collapseSrchCriteria'); var elemImgExpand = document.getElementById('expandSrchCriteria'); if (bExpand) {
 if (elemAbove) {
 elemAbove.style.display="block"; }
 if (elemAdv) {
 elemAdv.style.display="block"; }
 if (elemBelow) {
 elemBelow.style.display="block"; }
 if (elemImgExpand) {
 elemImgExpand.style.display="inline-block"; tryFocus(elemImgExpand); }
 if (elemImgCollapse) {
 elemImgCollapse.style.display="none"; }
 }
 else {
 if (elemAbove) {
 elemAbove.style.display="none"; }
 if (elemAdv) {
 elemAdv.style.display="none"; }
 if (elemBelow) {
 elemBelow.style.display="none"; }
 if (elemImgExpand) {
 elemImgExpand.style.display="none"; }
 if (elemImgCollapse) {
 elemImgCollapse.style.display="inline-block"; tryFocus(elemImgCollapse); }
 }

 
 var elemSrchCriteria = document.getElementById(form.name+'divSrchCriteria'); var elemTblSrchFlds = document.getElementById(form.name+'tblSrchFlds'); var elemTblSrchKeyword = document.getElementById(form.name+'tblSrchKeyword'); var elemKeywordSrchHelp = document.getElementById('keywordsrchhelp'); if (elemSrchCriteria && (elemTblSrchFlds || elemTblSrchKeyword || elemKeywordSrchHelp)) {
 var tblWidth0 = 0; var tblWidth1 = 0; var tblWidth2 = 0; if (elemTblSrchKeyword)
 tblWidth0 = elemTblSrchKeyword.offsetWidth; if (elemTblSrchFlds)
 tblWidth1 = elemTblSrchFlds.offsetWidth; var wid = tblWidth0; if (tblWidth1 > tblWidth0)
 wid = tblWidth1;   if ((wid <= 0) && (elemKeywordSrchHelp))
 wid = elemKeywordSrchHelp.offsetWidth; if (wid > 10)
 elemSrchCriteria.style.width = "" + wid + "px"; }
 
 
 var elemTblKeywrodSrchHelp = document.getElementById('tblkeywordsrchhlp');  var elemTabs = document.getElementById('PSTAB'); if (elemTblKeywrodSrchHelp && elemTabs) 
 elemTblKeywrodSrchHelp.width = elemTabs.offsetWidth; },



generateABNSearchResults:function(form)
{
 try {
 var globalSearch = false; var abnSearchResults = document.getElementById(form.name+'divabnsearchresults'); if (!abnSearchResults) {
 abnSearchResults = document.getElementById(form.name+'divabnsearchresultsGbl'); if (!abnSearchResults)
 abnSearchResults = document.getElementById('win0divabnsearchresultsGbl');  if (abnSearchResults)
 globalSearch = true; }
 if (abnSearchResults) {

 var abntbl = document.getElementById("ptabndt"); var abnlist = document.getElementById("ptabndatalist"); if (abntbl || abnlist) { 
 
 if (!globalSearch) {
 var abnSearchResultsGbl = abnSearchResults.cloneNode(true); abnSearchResultsGbl.id = form.name+'divabnsearchresultsGbl'; abnSearchResultsGbl = abnSearchResults.parentNode.appendChild(abnSearchResultsGbl); abnSearchResults = abnSearchResults.parentNode.removeChild(abnSearchResults); abnSearchResultsGbl = abnSearchResultsGbl.parentNode.removeChild(abnSearchResultsGbl); abnSearchResults.style.display = "block"; abnSearchResultsGbl.style.display = "block"; }
 else {
 abnSearchResults = abnSearchResults.parentNode.removeChild(abnSearchResults); abnSearchResults.style.display = "block"; var abnSearchResultsGbl = abnSearchResults; }
 
 
 var doclocation = ""; if (this.isClass(abnSearchResults,"ptabncustom")) {
 doclocation = top.document.location.href; }
 else {
 doclocation = document.location.href; }
 var index = doclocation.indexOf('?'); var actionurl = ''; if (index > 0) {
 actionurl = doclocation.substr(0,index); }
 else {
 actionurl = doclocation; } 
 
 var encodeActionURL = encodeURI(actionurl) ;   if (this.isClass(abnSearchResults,"ptabncustom")) {
 
 if (typeof(top.pthNav) !== "undefined" && top.pthNav.abn.search) {
 top.pthNav.abn.search.add(encodeActionURL,abnSearchResults,this.setABNCustomSearchFormParams(form)); }
 if (typeof(top.searchGbl) !== "undefined") {
 top.searchGbl.add(encodeActionURL,abnSearchResultsGbl, this.setABNCustomSearchFormParams(form)); }
 } else { 
 if (!globalSearch && typeof(top.pthNav) !== "undefined" && top.pthNav.abn.search) { 
 top.pthNav.abn.search.add(encodeActionURL,abnSearchResults); if (typeof(top.searchGbl) !== "undefined") {
 top.searchGbl.add(encodeActionURL,abnSearchResultsGbl); }
 }
 else if (typeof(top.searchGbl) !== "undefined") { 
 top.searchGbl.add(encodeActionURL,abnSearchResultsGbl); }
 }
 }
 }
 } catch (e) {}
},


setABNCustomSearchFormParams:function(form)
{
 var customSearchParams = "{\"ptCustomSearch\":["; var bFirstParam = true; for (var i = 0; i < form.elements.length; i++) { 
 var tempId = form.elements[i].id; if ((tempId == "#ICIncludeHistory" || tempId == "#ICCorrectHistory" ||
 tempId == "#ICMatchCase") && !form.elements[i].checked) {
 continue; } else { 
 if (form.elements[i].tagName == "INPUT" &&
 (form.elements[i].type == "checkbox" || form.elements[i].type == "radio") ) {
 if (!form.elements[i].checked) {
 continue; }
 }
 if (tempId == "ICRefresh" || tempId == "okbuttonModal" || form.elements[i].type == "button") {
 continue; } 
 }
 
 
 if (!bFirstParam) { customSearchParams += ","; }
 bFirstParam = false;   var paramValue = form.elements[i].value; if (tempId == "ICAction")
 paramValue = "";  var paramValue = form.elements[i].value; customSearchParams += this.getCustomSearchNV(form.elements[i].name, paramValue); } 
 
 if (!bFirstParam) { customSearchParams += ","; }

 customSearchParams += this.getCustomSearchNV('ICABNSEARCHRESULT', '1'); customSearchParams += ']}'; return customSearchParams;},


getCustomSearchNV:function(paramName, paramValue)
{
 return "{\"name\":\"" + paramName + "\",\"value\":\"" + paramValue + "\"}";},


submitABNAction:function(form,name)
{
 if (!/\/h\/\?tab=/.test(location)) { 
 parent.pthNav.abn.search.doSubmitABN(name); } else {
 pthNav.abn.search.doSubmitABN(name); }
},


isClass:function(el,cName) {
 if (!el) { return false; }

 
 var classes = el.className; if (!classes) { return false; }
 
 
 if (classes === cName) { return true; }

 
 var whiteSpace = /\s+/; if (!whiteSpace.test(classes)) { return false; }

 
 
 var c = classes.split(whiteSpace); for (var i = 0; i < c.length; i++) {
 if (c[i] === cName) { return true; }
 }
 return false;},

clearABNSearchResults:function() {
 try { 
 var dn = top.document.domain; try { 
 if (typeof(top.pthNav) !== "undefined" && 
 typeof(top.pthNav.abn) !== "undefined" && 
 typeof(top.pthNav.abn.search) !== "undefined") { 
 top.pthNav.abn.search.clearData(true); } 
 } catch (ex2) {} 
 } catch (ex1) {}
},

isPromptReq:function(name)
{
if (name && (name.indexOf("$prompt")!=-1 || name == '#KEYA5'))
 return true;else
 return false;},

expcolGrp:function(id,colurl,colalt,expurl,expalt)
{
var objGrp = document.getElementById("divgrp"+id);var objimg = document.getElementById(id+"$img");if (objGrp.style.display=="none")
{
 objGrp.style.display="block"; objimg.src = colurl; objimg.title = colalt; objimg.alt = colalt;}
else
{
 objGrp.style.display="none"; objimg.src = expurl; objimg.title = expalt; objimg.alt = expalt;}
},



getParam:function(url,name)
{
 var queryString = null; if (url.indexOf("?")!=-1)
 queryString = new String(url.substring(url.indexOf("?")+1,url.length)); var paramList = null; if (queryString)
 paramList = queryString.split("&"); if (paramList)
 {
 for (var j = 0; j < paramList.length; j++)
 {
 var tmp = new String(paramList[j]); if (tmp.indexOf(name+"=")!=-1)
 {
 return tmp.substring(tmp.indexOf(name+"=")+name.length+1,tmp.length); }
 }
 }
 return null;},
canFocus:function(obj)
{
if (!obj) return false;if (!obj.type && !obj.href) return false;if (obj && typeof obj.focus != "undefined" && !obj.disabled && typeof obj.style != "undefined" && obj.style.visibility!="hidden")
 return true;else
 return false;},
getPixValue:function(v)
{
if (v && (v.indexOf('px')!=-1 || v.indexOf('em')!=-1 ))
 return new Number(v.substring(0,v.length-2).valueOf());else
 return new Number(v.valueOf());},
 getHeight: function(o) {
 if (!o || typeof o == 'undefined') return 0; var h = o.style.height; if (typeof h != 'undefined' && h != "")
 return this.getPixValue(h); else if (typeof o.height != 'undefined' && o.height != "")
 return o.height; else return 0;},
getWidth: function(o) {
 if (!o || typeof o == 'undefined') return 0; var w = o.style.width; if (typeof w != 'undefined' && w != "")
 return this.getPixValue(w); else if (typeof o.width != 'undefined' && o.width != "")
 return o.width; else return 0;},
terminateEvent:function(e)
{
e = e || window.event;if (e.stopPropagation != undefined) e.stopPropagation();else if (e.cancelBubble != undefined) e.cancelBubble = true;if (e.preventDefault != undefined) e.preventDefault();else e.returnValue = false;},










fadeElement:function(elID, fade, min_opacity, max_opacity, speed, istep){
 var step; var t = 0; if ((typeof(istep) == "undefined") || (istep == null))
 istep=1; if (fade) {
 
 for (step = max_opacity; step >= min_opacity; step=step-istep) {
 setTimeout("ptCommonObj2.setOpaq('" + elID + "', " + step + ")", (t*speed));  t++; }
 }else {
 
 for (step = min_opacity; step <= max_opacity; step=step+istep) {
 setTimeout("ptCommonObj2.setOpaq('" + elID + "', " + step + ")", (t*speed));  t++; }
 }
 return t;},

setOpaq:function(elID, opacity) {
 var el = document.getElementById(elID); el.style.opacity = (opacity / 100); el.style.filter="alpha(opacity=" + opacity + ")"; if(browserInfoObj2.isIE && browserInfoObj2.version <= 8){
 if(opacity === 100){
 el.style.removeAttribute("filter"); }
 }
},

 showPopupMask: function(oWin, id, bModaless, sStyle) {
 if (typeof oWin == 'undefined') return; if (typeof bModaless == 'undefined') bModaless = false; try {
 this.setMaskSize(oWin, id, sStyle); this.popMask.style.display = "block"; } catch (e) {}; },

 setMaskSize: function(oWin, id, sStyle) {
 if (typeof oWin == 'undefined') return; var nMaxMaskHeight = 10266;  var popHeight = nMaxMaskHeight; if (typeof id == 'undefined') id = 'pt_modalMask'; if (typeof oWin.document !== 'undefined' && oWin.document) 
 this.popMask = oWin.document.getElementById(id); if (sStyle && typeof this.popMask !== 'undefined' && this.popMask) 
 this.popMask.setAttribute("class",sStyle); if (typeof this.popMask == 'undefined' || this.popMask == null) {
 var oBody = oWin.document.body; var oObj = oWin.document.createElement("div"); oObj.setAttribute("id", "pt_modalMask"); oBody.appendChild(oObj); this.popMask = oWin.document.getElementById("pt_modalMask"); }
 if (this.popMask && oWin.document) {
 var theBody = oWin.document.getElementsByTagName("BODY")[0]; var fullHeight = ptCommonObj2.getViewportHeight(oWin); var fullWidth = ptCommonObj2.getViewportWidth(oWin);  this.overflow = theBody.style.overflow; theBody.style.overflow = 'hidden'; if (fullHeight > theBody.scrollHeight)
 popHeight = fullHeight; else
 popHeight = theBody.scrollHeight;  if (popHeight > nMaxMaskHeight) 
 popHeight = nMaxMaskHeight;  var popWidth = theBody.scrollWidth; if (oWin.isFModeLayout())
 {
 this.popMask.style.height = popHeight + "px"; this.popMask.style.width = popWidth + "px"; }
 else
 {
 if (!(browserInfoObj2.isiPad && browserInfoObj2.isSafari))
 popWidth = popWidth + 18;  this.popMask = oWin.document.getElementById(id); this.popMask.style.height = popHeight + "px"; this.popMask.style.width = popWidth + "px"; }
 }
 },

 hidePopupMask: function(oWin, id, bModaless, sStyle) {
 if (typeof oWin == 'undefined') return; if (typeof bModaless == 'undefined') bModaless = false; if (typeof id == 'undefined') id = 'pt_modalMask'; this.popMask = oWin.document.getElementById(id); if (this.popMask) {
 if (sStyle) replaceClass(this.popMask, sStyle, 'ps_modalmask'); if (isFModeLayout()) {
 this.popMask.removeEventListener("click", autoClose, false); if (isClass(this.popMask, 'ps_masktrans')) replaceClass(this.popMask, 'ps_masktrans', 'ps_modalmask'); }
 this.popMask.style.display = "none"; var theBody = oWin.document.getElementsByTagName("BODY")[0];  if (typeof theBody == 'undefined') return; if (typeof getPTDialog() != 'undefined' && typeof getPTDialog().overflow != 'undefined' && getPTDialog().overflow.length>0)
 theBody.style.overflow = getPTDialog().overflow; else
 theBody.style.overflow = ""; } 
 },

 getParModMaskChld: function(id) {
 var modTblObj = MTop().document.getElementById("ptModTable_"+id); if(!modTblObj) return; var chldModTblObj = modTblObj.childNodes; for(var i = 0; i < chldModTblObj.length; i++){
 if(chldModTblObj.item(i).id == 'pt_modalMask'){
 this.popMask = chldModTblObj.item(i); return true; }
 }
 return false; },

 isChldModalExist: function(id) {
 var parModObj = MTop().document.getElementById("pt_modals"); var modObjs = parModObj.childNodes;  for(var i = 0; i < modObjs.length; i++){
 var posOfID = modObjs.item(i).id.indexOf("_", 0);  if (posOfID > 0){ 
 var chldModID = modObjs.item(i).id.substring(posOfID+1);  if(chldModID > id){
 var modMask = modObjs.item(i); if ((modMask.style.display != 'undefined' && modMask.style.display != null) && modMask.style.display != "none")
 return true; }
 }
 }
 return false; },

 hideModMask: function(id)
 {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var pWin = null; try
 {
 var oWin = oframe.contentWindow; pWin = oWin.winParent; }
 catch (e)
 {
 pWin = null; }
 
 ptCommonObj2.hidePopupMask(pWin); },


 setParModMask: function(oWin, id) {
 if (typeof oWin == 'undefined') return; var modTblObj = oWin.document.getElementById("ptModTable_"+id); if(!modTblObj) return; var popHeight = modTblObj.scrollHeight;   var popWidth = modTblObj.scrollWidth; if (!this.getParModMaskChld(id)){
 var oObj = oWin.document.createElement("div"); oObj.setAttribute("id", "pt_modalMask"); oObj.setAttribute("style", "height: "+popHeight+"px; width: "+popWidth+"px; display: block"); modTblObj.appendChild(oObj); }
 else{
 this.popMask.style.height = popHeight + "px"; this.popMask.style.width = popWidth + "px"; this.popMask.style.display = "block"; }
 },

 hideParModalMask: function(oWin, id, bModaless) {
 if (typeof oWin == 'undefined') return; id = oWin.modalID; if (typeof bModaless == 'undefined') bModaless = false; var modTblObj = MTop().document.getElementById("ptModTable_"+id); this.getParModMaskChld(id); if (this.popMask) {
 this.popMask.style.display = "none"; if (modTblObj) modTblObj.style.overflow = ""; } 
 else {
 ptCommonObj2.hideModMask(window.modalID); }
 },

 
 skipToMainContent: function() {
 try {
 var tgtFrm = top.document.getElementById("ptifrmtgtframe");  if (!tgtFrm)
 tgtFrm = top.document.querySelector(".ps_target-iframe")
 var tgtWin = null; var focusId = null;  if ( tgtFrm) {
 tgtWin = (tgtFrm.contentWindow || tgtFrm.contentDocument); if (tgtWin && typeof(tgtWin['firstFocusID']) != "undefined")
 focusId = tgtWin['firstFocusID'];  if (tgtWin && focusId != null) 
 {
 if (tgtWin.document.getElementById(focusId))
 tgtWin.document.getElementById(focusId).focus(); else
 tgtFrm.focus(); }
 
 else
 tgtFrm.focus(); } 
 }
 catch (e) {
 } 
 },
 moveToSkipLink: function() {
 var skipLnk = top.document.getElementById("skipnav"); if (skipLnk) {
 skipLnk.focus(); return; }
 
 skipLnk = top.document.getElementById("PT_SKIPNAV_CONT"); if (skipLnk) {
 top.removeHide(skipLnk); ptCommonObj2.tryFocus0(top.document.getElementById("PT_SKIPNAV")); }
 },
 getScrollX: function() { return browserInfoObj2.isSafari ? window.scrollX : document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft; },
 getScrollY: function() { return browserInfoObj2.isSafari ? window.scrollY : document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop; }
} 


function isClass(obj, sClass0) {
 if (!obj || !sClass0 || sClass0.length==0) return false; return obj.classList.contains(sClass0); }

function removeClass(obj, sClass0) {
 if (!obj || !sClass0 || sClass0.length==0) return; var classList = sClass0.split(" "); for (var i = 0; i < classList.length; i++) {
 var sClass = classList[i]; if (sClass.length > 0)
 obj.classList.remove(sClass); }
}


function addClass(obj, sClass0) {
 if (!obj || !sClass0 || sClass0.length == 0) return; var classList = sClass0.split(" "); for (var i = 0; i < classList.length; i++) {
 var sClass = classList[i]; if (sClass.length > 0)
 obj.classList.add(sClass); }
}

function toggleClass(obj, sClass0) {
 if (!obj) return; obj.classList.toggle(sClass0); }


function PT_RC()
{}

PT_RC.prototype = {
 
 isEnabled:function() {

 var bIsEnabled = false;  if ( (window.top.document.getElementById('ptifrmtarget') == null) &&
 (window.top.document.getElementById('TargetContentFrame') == null) ) {
 return bIsEnabled; }

 
 try {
 if (typeof window.top.ptrc.onAddChangeEvent != 'function') {
 return bIsEnabled; }
 } catch (ex) { return false; } 
 bIsEnabled = true; return bIsEnabled; },

 
 isFrame:function() {
 return (window.top.document.getElementById('TargetContentFrame') != null) ? true : false; },

 
 isIFrame:function() {
 return ((window.top.document.getElementById('ptifrmtarget') != null) ? true:false); }
}




function GetRCTgtContent(url, szParamXML)
{

 var loader = new net2.ContentLoader(url, null, null, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); url = newurl; }, null, szParamXML, "application/x-www-form-urlencoded", 1, 0, null, false);  var loader = new net2.ContentLoader(url, null, null, "POST", 
 function()
 {
 
 var respHTML = this.req.responseText; if (respHTML != "")
 
 {
 var oIFrame = MTop().document.getElementById("ptifrmtgtframe");  oIFrame.contentDocument.write(respHTML);  oIFrame.contentDocument.close();  }
 }, 
 null, szParamXML, "application/x-www-form-urlencoded");}
function OpenRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML,sFormName)
{

function HideProcessing()
 {
 if (typeof(sFormName) != 'undefined' && sFormName != null && sFormName != "")
 {
 var sProcFn = "processing_"+sFormName+"(0, 3000);"; eval(sProcFn); }
 }

if (isFModeLayout()) 
 {
 closeLastModal(); if (typeof(sFormName) != 'undefined' && sFormName != null && sFormName != "")
 {
 var sProcFn = "processing_"+sFormName+"(1, 3000);"; eval(sProcFn); }
 }





var bIsBulkAction = false;if (typeof (bBulkAction) != 'undefined' && bBulkAction != null && bBulkAction == 1)
 bIsBulkAction = true;var nModID = MTop().modId;if ((typeof(szParamXML) != 'undefined') && (szParamXML != 'undefined' && szParamXML != null))
{
 var pos = szParamXML.indexOf("="); var key = szParamXML.substring(0, pos); var val = szParamXML.substring(pos+1); val = escape(val); szParamXML = key+"="+val; }

if (nOpenMode == "3")
 {
 var objFrame = top.frames['TargetContent']; if (objFrame == null)
 nOpenMode = 2;  }

if (nOpenMode == "0")
 {
 if (isFModeLayout() && !bIsBulkAction && nFluidComponent=="1")
 {
 var formfactor = getFormFactorFromCookie(); if(formfactor == "0" || formfactor =="1" || formfactor =="2"){
 var devWidth =getFormFactorSize(formfactor).width; var devHeight =getFormFactorSize(formfactor).height; var myWindow = window.open("", "_blank", "width=1,height=1,resizable=yes,scrollable=yes,scrollbars=yes,toolbar=no,location=no");  myWindow.moveTo(0, 0); myWindow.resizeTo(devWidth, devHeight); myWindow.focus(); myWindow.innerHeight = devHeight; myWindow.innerWidth = devWidth; myWindow.location = url; }else
 window.open(url,'_blank'); }
 else
 OpenCrefInUniNav(url, '_blank',bBulkAction,szParamXML,strLabel,nFluidComponent,1);  }
else if (nOpenMode == "2")
 {
 var url1 = url; if ((typeof bBulkAction == 'undefined' || bBulkAction == null) || !bBulkAction) {
 if (isFModeLayout())
 url1 = "javascript:LaunchURL(null,'" + url + "')|javascript:CloseContextMenuHandler()"; else
 url1 = "javascript:window.open('" + url + "','_self')|javascript:CloseContextMenuHandler()"; }
 if(saveWarning('TargetContent',null, '_top', url1, null, bBulkAction, szParamXML))
 {
 if (szServType == "UEXT")
 HideProcessing(); if (isFModeLayout() && !bIsBulkAction && nFluidComponent=="1")
 LaunchURL(null, url, 4); else
 OpenCrefInUniNav(url, '_top',bBulkAction,szParamXML,strLabel,nFluidComponent); }
 }
else if (nOpenMode == "3")
 {
 var url1 = url; var target = 'TargetContent'; if ((typeof bBulkAction == 'undefined' || bBulkAction == null) || !bBulkAction) {
 url1 = "javascript:window.open('"+url+"','TargetContent')|javascript:CloseContextMenuHandler()"; target = '_top'; }
 if(saveWarning('TargetContent',null, 'TargetContent', url1, null, bBulkAction, szParamXML))
 {
 if (szServType == "UPGE" && typeof parent.pthNav != 'undefined')
 {
 parent.pthNav.fakeBCReqCTXMenu = true; bcUpdater.setStoredData(bcUpdater.isRCService, "T"); }
 if (!bBulkAction) 
 window.open(url,'TargetContent'); else 
 GetRCTgtContent(url, szParamXML);  }
 if(typeof MTop().modId != 'undefined' && MTop().modId != null && MTop().modId != -1 )
 closeModalAll(); }
else if (nOpenMode == "4") 
 {
 
 if(typeof PTNavBar != 'undefined' && PTNavBar && PTNavBar.OpenState == 'slidein_full' && typeof top.PTNavBar != 'undefined' && top.PTNavBar)
 {
 top.PTNavBar.Toggle(); PTNavBar.SetBlur(); }
 var options=""; if ((typeof(strLabel) != 'undefined') && strLabel && strLabel != '')
 {
 var sTitleText = strLabel; var h = String.fromCharCode(160); while(sTitleText.indexOf(h) != -1)
 sTitleText = sTitleText.replace(h," ");  options = 'sTitle@ '+ sTitleText + ';'; }
 
 if (szServType == "UEXT" || szServType == "POP" || szServType == "UQRY")
 options = options + 'bCrossDomain@1;'; else
 {
 if (url.indexOf("?") != -1)
 url = url+"&"; else
 url = url+"?"; url = url+"ICModalJS=1&ICRCFModalJS=1"; if(url.search("IScript")!=-1)
 options = options + 'bCrossDomain@1;';  }
 if (szServType == "UPGE")
 options = options + 'bPIA@1;'; options = options + 'bClose@1;'; options = options + 'bRCFModal@1;'; options = options + 'sGlyphId@'+ strFldID + ';'; if (url)
 url = url.replace(/'/g, '%27'); var oIFrame;  if (bBulkAction != 'undefined' && bBulkAction != null && bBulkAction){
 
 var loader = new net2.ContentLoader(url, null, strLabel, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); url = newurl; }, null, szParamXML, "application/x-www-form-urlencoded", 1, 0, null, false);  if (url.indexOf("/s/") > -1) {
 var loader = new net2.ContentLoader(url, null, strLabel, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); url = newurl; }, null, szParamXML, "application/x-www-form-urlencoded", 1, 0, null, false); } 

 if (!browserInfoObj2.isIE){

 oIFrame = showModal("about:blank", window, options, null, null, true, null, true);  var loader = new net2.ContentLoader(url, null, strLabel, "POST", 
 function()
 {
 
 var respHTML = this.req.responseText; if (respHTML != "")
 {
 oIFrame.contentDocument.write(respHTML);  oIFrame.contentDocument.close();  }
 }, 
 null, szParamXML, "application/x-www-form-urlencoded");  }
 else
 oIFrame = showModal(url, window, options, null, null, true, null, true); }
 else if (nFluidComponent == "1"){
 if (url.indexOf("PTPG_NUI") != -1)
 options = options+";sStyle@ptrc_modal_window;"; var formfactor = getFormFactorFromCookie(); if(formfactor == "0")
 options = options + ';bFullScreen@1;';  doModeless(url, options); }
 else 
 {
 var formfactor = getFormFactorFromCookie(); if(nFluidComponent != "1" && formfactor == "0") 
 {
 options = options+";sStyle@ptrc_modal_window;"; }
 showModal(url,window,options,null,null,true); }



 function checkForReadiness() 
 {
 if (window.modWin != null && window.modWin.contentWindow)
 {
 try {
 if (window.modWin.contentWindow.document.readyState == "complete")
 { 
 setModWinID = setModWinParentPIA(); if (bBulkAction != 'undefined' && bBulkAction != null && bBulkAction && browserInfoObj2.isIE)
 {
 
 var form = oIFrame.contentDocument.createElement("form"); form.setAttribute("method", "POST"); form.setAttribute("action", url);   var strKey = szParamXML.substr(0, 14); var strVal = szParamXML.substr(15); var hiddenField = oIFrame.contentDocument.createElement("input");  hiddenField.setAttribute("type", "hidden"); hiddenField.setAttribute("name", strKey); hiddenField.setAttribute("value", strVal);  form.appendChild(hiddenField); oIFrame.contentDocument.body.appendChild(form); form.submit(); }

 if (!isFModeLayout())
 HideProcessing(); return; }
 setTimeout(checkForReadiness, 1000);  }
 catch (err)
 {
 setTimeout(checkForReadiness, 1000); }
 }
 else
 HideProcessing(); }
 if ((szServType != "UEXT" && szServType != "POP") && typeof(window) != "undefined" && window != null && 
 typeof(window.modWin) != "undefined" && window.modWin != null && 
 typeof(window.modWin.contentWindow) != "undefined" && window.modWin.contentWindow != null)
 checkForReadiness(); else
 {
 if (!isFModeLayout())
 HideProcessing(); }
 }

if (window.top.document.getElementById("ptifrmpopup") && window.top.document.getElementById("ptifrmpopup").style.display != "none") { 
 if (typeof(top.searchGbl) != "undefined" && top.searchGbl.win && top.searchGbl.win.popup) {
 top.searchGbl.win.popup.close(); }
 if (typeof(top.pthNav) != "undefined" && top.pthNav.abn && top.pthNav.abn.search && top.pthNav.abn.search.win && top.pthNav.abn.search.win.popup) { 
 top.pthNav.abn.search.win.popup.close(); }
 }
}
function onRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML)
{
OpenRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML);}


function PT_LONGEDIT_COUNTER()
{} 

PT_LONGEDIT_COUNTER.prototype = {

 LONG_EDIT_MAX : "longEditMax", 
 LONG_EDIT_CNT : "longEditCnt", 
 NO_MAX : 0, 
 BOX_COUNTER_SUFFIX : "$cntr", 
 COUNTER_SUFFIX : "$cntr$val", 

 
 BOX_COUNTER_SC_NUI : "ps_box-counter", 
 BOX_COUNTER_SC_OVER_NUI : "psc_counter-overage", 
 
 
 LONG_EDIT_CNT_SC : "PSTEXT PSLONGEDITCNT", 
 LONG_EDIT_CNT_SC_OVER : "PSLONGEDITCNT PSLONGEDITCNT_OVER", 
 
 
 longEditCheck:function(longEdit) {
 if (longEdit == null) return;  var longEditLimit = longEdit.getAttribute(this.LONG_EDIT_MAX); if (longEditLimit == this.NO_MAX) return;  var longEditCnt = document.getElementById(longEdit.getAttribute(this.LONG_EDIT_CNT)); if (longEditCnt == null) return;  var longEditBoxCnt = document.getElementById(longEdit.id + this.BOX_COUNTER_SUFFIX);  if (longEditBoxCnt == null) return;  var bExceedLimit = longEdit.value.length > longEditLimit;  if (bExceedLimit) { 
 if (isFModeLayout())
  longEditBoxCnt.className = this.BOX_COUNTER_SC_NUI + " " + this.BOX_COUNTER_SC_OVER_NUI; else
 longEditBoxCnt.className = this.LONG_EDIT_CNT_SC_OVER; } else {
 if (isFModeLayout())
 longEditBoxCnt.className = this.BOX_COUNTER_SC_NUI; else
 longEditBoxCnt.className = this.LONG_EDIT_CNT_SC; }
 longEditCnt.innerHTML = longEditLimit - longEdit.value.length; },

 
 onLoadLongEditCounter:function () {
 var textareas = document.getElementsByTagName('textarea'); var textarea = null; var longEditLimit = this.NO_MAX; var longEditCntId = null; for (var i=0; i < textareas.length; i++)
 {
 textarea = textareas[i]; if (textarea.getAttribute(this.LONG_EDIT_MAX) != null && textarea.getAttribute(this.LONG_EDIT_CNT) == null)
 {
 longEditLimit = textarea.getAttribute(this.LONG_EDIT_MAX); if (longEditLimit == this.NO_MAX) break;   longEditCntId = textarea.id + this.COUNTER_SUFFIX;  textarea.setAttribute(this.LONG_EDIT_CNT, longEditCntId); textarea.setAttribute("aria-controls", longEditCntId);   textarea.setAttribute("aria-describedby", textarea.id + this.BOX_COUNTER_SUFFIX); textarea.onkeyup = function() { 
 ptLongEditCounter.longEditCheck(this);  };  ptLongEditCounter.longEditCheck(textarea); }
 }
 }
}
 
var ptLongEditCounter = new PT_LONGEDIT_COUNTER();
var donotcleartimer;var reapplyBind;var cJs;var jqJs;var jsTree;var ssTree;var bDonotApplySelToChld = false;var bSetScrollInto = false;function adjustHt(elemId) {
 if (bSetScrollInto) {
 var elem = ptUtil.id(elemId); if (!elem || elem == "undefined")
 return; var elemTop = elem.getBoundingClientRect().top; var ht = window.innerHeight - elemTop; elem.style = "max-height: " + ht + "px";   }
}

function setScrollIntoView(elemId) {
 if (bSetScrollInto) {
 var elem = ptUtil.id(elemId); if (elem)
 elem.scrollIntoView(); }
}

function doCfgSrchScroll(obj, sFormNm) {
 var elmAppCnt = ptUtil.id(sFormNm + "srchdivPTSAPPSCONTENT"); var scrlTop = elmAppCnt.scrollTop; var elemSrchRslts = document.getElementById("PTS_CS_SRCHRSLTS"); var srchRsltsTop = elemSrchRslts.getBoundingClientRect().top; if (scrlTop > srchRsltsTop) {
 bSetScrollInto = true; elemSrchRslts.scrollIntoView(); ptUtil.addClass(elmAppCnt, 'pts_cfgsrch_overflow');  adjustHt(sFormNm + "srchdivPTS_CSRCH_RSLT$grid$0");  adjustHt(sFormNm + "srchdivPTS_RSLTS_LIST$grid$0"); adjustHt(sFormNm + "srchdivPTS_FACET_GB_F"); }
 else {
 if ((scrlTop < srchRsltsTop) && (obj)) {
 bSetScrollInto = false; doScroll(obj, false); ptUtil.removeClass(elmAppCnt, 'pts_cfgsrch_overflow'); }
 }
}

function ChangeElementProp(elmtId, propty, val) {
 var elm = ptUtil.id(elmtId); if (elm)
 elm.setAttribute(propty, val);}

function DoReturnToList() {
 var oWin = top.window; var prevObj = null; var nextObj = null; var i = 0; prevObj = oWin.document.querySelectorAll('.ps_menuitem.ps_header-previous'); nextObj = oWin.document.querySelectorAll('.ps_menuitem.ps_header-next');  if (prevObj && (typeof (prevObj) !== "undefined")) { 
 for (i = 0; i < prevObj.length; i++) { 
 addHide(prevObj[i]);  } 
 }
 if (nextObj && (typeof (nextObj) !== "undefined")) { 
 for (i = 0; i < nextObj.length; i++) { 
 addHide(nextObj[i]);  }
 } 
}

function ExpandSearchSidePanel(contId, leftpaneId, showFltrsId, collapseImg, expandImg, hideFilters, showFilters) {
 var elmLeftPaneId = ptUtil.id(leftpaneId); ptUtil.removeClass(elmLeftPaneId, 'psc_force-hidden'); var elmContId = ptUtil.id(contId); ptUtil.addClass(elmContId, 'ps_box_horizontal'); var elmShowFltrs = ptUtil.id(showFltrsId); if (elmShowFltrs) {
 elmShowFltrs.href = "javascript:CollapseSearchSidePanel('" + contId + "', '" + leftpaneId + "', '" + showFltrsId + "', '" + collapseImg + "', '" + expandImg + "', '" + hideFilters + "', '" + showFilters + "');"; var elmImg = elmShowFltrs.getElementsByTagName('img')[0]; if (elmImg) {
 elmImg.src = collapseImg; elmImg.alt = hideFilters; elmImg.title = hideFilters; }
 }
}


function CollapseSearchSidePanel(contId, leftpaneId, showFltrsId, collapseImg, expandImg, hideFilters, showFilters) {
 var elmLeftPaneId = ptUtil.id(leftpaneId); ptUtil.addClass(elmLeftPaneId, 'psc_force-hidden'); var elmContId = ptUtil.id(contId); ptUtil.removeClass(elmContId, 'ps_box_horizontal'); var elmShowFltrs = ptUtil.id(showFltrsId); if (elmShowFltrs) {
 elmShowFltrs.href = "javascript:ExpandSearchSidePanel('" + contId + "', '" + leftpaneId + "', '" + showFltrsId + "', '" + collapseImg + "', '" + expandImg + "', '" + hideFilters + "', '" + showFilters + "');"; var elmImg = elmShowFltrs.getElementsByTagName('img')[0]; if (elmImg) {
 elmImg.src = expandImg; elmImg.alt = showFilters; elmImg.title = showFilters; }
 }
}


function ShowMoreFacetValues2(multiSelect, facetGbId, facetGridId, moreId, lessId, bPartialLoad) {
 var elemMore = ptUtil.id(moreId); var elemLess = ptUtil.id(lessId); if (bPartialLoad){
  ptUtil.addClass(elemLess, 'psc_force-hidden'); }else{
 ptUtil.addClass(elemMore, 'psc_force-hidden'); }
 
 var elemFacetValuesGb = ptUtil.id(facetGbId); if (!elemFacetValuesGb) {
 return; }

 var elemFacetValuesGrid = ptUtil.id(facetGridId); if (!elemFacetValuesGrid) {
 return; }

 var nOrigHeight = elemFacetValuesGrid.offsetHeight; var nGridHeight = 2 * nOrigHeight; var nPrntWidth = elemFacetValuesGrid.parentNode.offsetWidth; if (multiSelect) {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ms_more'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ms'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms'); } else {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ss_more'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ss'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss'); }
 elemFacetValuesGrid.style.width = nPrntWidth + "px"; elemFacetValuesGrid.style.height = "100%"; elemFacetValuesGrid.setAttribute("origHeight", nOrigHeight); elemFacetValuesGrid.style.paddingBottom = "10px";}


function ShowMoreFacetValues(multiSelect, facetGbId, facetGridId, moreId, lessId) {
 var elemMore = ptUtil.id(moreId); ptUtil.addClass(elemMore, 'psc_force-hidden'); var elemLess = ptUtil.id(lessId); ptUtil.removeClass(elemLess, 'psc_force-hidden'); var elemFacetValuesGb = ptUtil.id(facetGbId); if (!elemFacetValuesGb) {
 return; }
 var elemFacetValuesGrid = ptUtil.id(facetGridId); if (!elemFacetValuesGrid) {
 return; }

 var elUls = elemFacetValuesGrid.getElementsByTagName('UL'); var elLi; var bTrFct = true; if (elUls && elUls.length > 0) {
 var elUl = elUls[0].childNodes; if (elUl && elUl.length > 10) {
 elLi = elUl[10]; }
 }

 var nOrigHeight = elemFacetValuesGrid.offsetHeight; var nGridHeight = 2 * nOrigHeight; var nPrntWidth = elemFacetValuesGrid.parentNode.offsetWidth; if (multiSelect) {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ms_more'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ms'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms'); if (elLi && elLi.childNodes && elLi.childNodes.length > 0) {
 var elChk = elLi.getElementsByClassName('ps-checkbox'); if (elChk && elChk.length > 0) {
 elChk[0].focus(); bTrFct = false; }
 }
 if (bTrFct && elUls && elUls.length > 0) {
 var elUl = elUls[0].childNodes; if (elUl && elUl.length > 0) {
 elLi = elUl[0]; var nIndx = 0; var elT = elemFacetValuesGrid.getElementsByClassName('ptpg_jet_treeitem'); if (elT && elT.length > 0) {
 setFocusToFirstMoreTreeItem(elLi, 0, 8); }
 }
 }
 } else {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ss_more'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ss'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss'); if (elLi) {
 var elLnk = elLi.getElementsByClassName('ps-link'); if (elLnk && elLnk.length > 0) {
 elLnk[0].focus(); }
 }
 }
 elemFacetValuesGrid.style.width = nPrntWidth + "px"; elemFacetValuesGrid.style.height = "100%"; elemFacetValuesGrid.setAttribute("origHeight", nOrigHeight); elemFacetValuesGrid.style.paddingBottom = "10px";}

function ShowLessFacetValues(multiSelect, facetGbId, facetGridId, moreId, lessId) {
 var elemMore = ptUtil.id(moreId); ptUtil.removeClass(elemMore, 'psc_force-hidden'); var elemLess = ptUtil.id(lessId); ptUtil.addClass(elemLess, 'psc_force-hidden'); var elemFacetValuesGb = ptUtil.id(facetGbId); var elemFacetValuesGrid = ptUtil.id(facetGridId); if (multiSelect) {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetarea_ms'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetgb_ms_more'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms_more'); } else {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetarea_ss'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetgb_ss_more'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss_more'); }
 if (elemFacetValuesGrid) {
 var nOrigHeight = elemFacetValuesGrid.getAttribute("origHeight"); elemFacetValuesGrid.style.height = nOrigHeight + "px"; elemFacetValuesGrid.style.paddingBottom = ""; }
}



function ShowMoreTreeFacetValues(multiSelect, facetGbId, facetAreaId, moreId, lessId) {
 var elemMore = ptUtil.id(moreId); ptUtil.addClass(elemMore, 'psc_force-hidden'); var elemLess = ptUtil.id(lessId); ptUtil.removeClass(elemLess, 'psc_force-hidden'); var elemFacetValuesGb = ptUtil.id(facetGbId); if (!elemFacetValuesGb) return; var elemFacetValuesHtmlArea = ptUtil.id(facetAreaId); if (!elemFacetValuesHtmlArea) return; var nGridHeight = 2 * elemFacetValuesHtmlArea.offsetHeight; var nPrntWidth = elemFacetValuesHtmlArea.parentNode.offsetWidth; if (multiSelect) {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ms_more'); ptUtil.addClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ms_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ms'); ptUtil.removeClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ms'); } else {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ss_more'); ptUtil.addClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ss_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ss'); ptUtil.removeClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ss'); }
 if (elemFacetValuesHtmlArea) {
 elemFacetValuesHtmlArea.style.width = nPrntWidth + "px"; }
}

function ShowLessTreeFacetValues(multiSelect, facetGbId, facetAreaId, moreId, lessId) {
 var elemMore = ptUtil.id(moreId); ptUtil.removeClass(elemMore, 'psc_force-hidden'); var elemLess = ptUtil.id(lessId); ptUtil.addClass(elemLess, 'psc_force-hidden'); var elemFacetValuesGb = ptUtil.id(facetGbId); if (!elemFacetValuesGb) return; var elemFacetValuesHtmlArea = ptUtil.id(facetAreaId); if (!elemFacetValuesHtmlArea) return; var nHtmlAreaHeight = elemFacetValuesHtmlArea.offsetHeight / 2; if (multiSelect) {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetarea_ms'); ptUtil.addClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ms'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetgb_ms_more'); ptUtil.removeClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ms_more'); } else {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetarea_ss'); ptUtil.addClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ss'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetgb_ss_more'); ptUtil.removeClass(elemFacetValuesHtmlArea, 'pts_nui_facetarea_ss_more'); }

 var elemHtmlArea = document.getElementById(facetAreaId); if (elemHtmlArea) {
 elemHtmlArea.scrollTop = 0; elemHtmlArea.scrollLeft = 0; }
}


function updatePntlBtnState(elId, tit1, expanded) {
 var el = document.getElementById(elId); if (el) {
 el.parentElement.setAttribute('title', tit1); el.children[0].setAttribute('alt', tit1); el.setAttribute("aria-expanded", expanded); }
}


function toggleTooltip(elId, tit1, tit2) {
 var el = document.getElementById(elId); if (el) {
 if (el.parentElement.getAttribute('title') == tit1) {
 el.parentElement.setAttribute('title', tit2); el.children[0].setAttribute('alt', tit2); el.setAttribute("aria-expanded", "true"); } else {
 el.parentElement.setAttribute('title', tit1); el.children[0].setAttribute('alt', tit1); el.setAttribute("aria-expanded", "false"); }
 }
}

function updatePanelBtnHref(elId, tit1, tit2) {
 var el = document.getElementById(elId); if (el) {
 var hr = el.getAttribute('href')
 var newHref = hr + "toggleTooltip('" + elId + "', '" + tit1 + "', '" + tit2 + "');"; el.setAttribute('href', newHref)
 }
}

function doMSearchModCancel() {
 var frmname = document.forms[0].name; var obj = document.getElementById(frmname + 'srchdivPSSEARCHPAGE_SIDE'); var i = 0; var bSrchCntFound = false; for (i = 0; i < obj.childNodes.length; i++) {
 if (obj.children[i].id == (frmname + 'srchdivPSSEARCHPAGE_SIDE$content')) {
 
 if (bSrchCntFound) {
 obj.removeChild(obj.childNodes[i]); return; }
 bSrchCntFound = true; }
 }
}

function setSearchContentInModal() {
 var frmname = document.forms[0].name; var objMod = document.querySelector(".ps_modal_content"); if (!objMod) return; var objSrchMod = objMod.querySelector(".pst_panel-content"); if (!objSrchMod) return; var objSrchSide = document.getElementById(frmname + 'srchdivPSSEARCHPAGE_SIDE'); var objSrch = objSrchSide.querySelector(".pst_panel-content"); if (!objSrch) return; objMod.removeChild(objSrchMod); objMod.appendChild(objSrch);}

function isSide1PanellCntlExpanded() {
 var objWrapper = document.getElementById("PT_WRAPPER"); return isClass(objWrapper, 'pst_side1-open');}


function PT_Search() {}

PT_Search.prototype = {
 aSrchGrps: [
 []
 ],

 UpdateSearchGroupLabels: function(elemId) {
 var srchGrpObj = document.getElementById(elemId); if (!srchGrpObj) return; if (!srchGrpObj.options) return; var nLen = srchGrpObj.options.length; var sSelectedSCName; var tmpAry = new Array(); for (var i = 0; i < nLen; i++) {
 tmpAry[i] = new Array(''); var scName = srchGrpObj.getAttribute("SCName" + (i + 1)); if (!scName) return; var scLabel = ""; for (var j = 0; j < nLen; j++) {
 if (srchGrpObj.options[j].value == scName) {
 scLabel = srchGrpObj.options[j].label; if (srchGrpObj.options[j].selected)
 sSelectedSCName = scName; break; }
 }
 tmpAry[i][0] = scLabel; tmpAry[i][1] = scName; }

 for (var i = 0; i < nLen; i++) {
 srchGrpObj.options[0] = null; }

 for (var i = 0; i < tmpAry.length; i++) {
 var op = new Option(tmpAry[i][0], tmpAry[i][1]); srchGrpObj.options[i] = op; if (sSelectedSCName == tmpAry[i][1])
 srchGrpObj.options[i].selected = true; }
 },

 AddSrchGrp: function(i, name, value) {
 if (i >= this.aSrchGrps.length)
 this.aSrchGrps.push([name, value]); this.aSrchGrps[i] = [name, value]; },

 AddDropDownItem: function(elemId, value, labl) {
 var srchGrpObj = document.getElementById(elemId); if (!srchGrpObj) return; if (!srchGrpObj.options) return; var op = new Option(labl, value); srchGrpObj.add(op); },

 SetDropdownItemLabl: function(elemId, value, labl) {
 var srchGrpObj = document.getElementById(elemId); if (!srchGrpObj) return; if (!srchGrpObj.options) return; for (var i = 0; i < srchGrpObj.options.length; i++) {
 if (srchGrpObj.options[i].value == value) {
 srchGrpObj.options[i].label = labl; break; }
 } 
 },

 RemoveElemAttribute: function(elemId, attrName) {
 var elem = document.getElementById(elemId); if (!elem) return; elem.removeAttribute(attrName); },

 RemoveElemClass: function(elemId, className) {
 var elem = ptUtil.id(elemId); if (!elem) return; ptUtil.removeClass(elem, className); },

 DoGSearch: function() {
 var sSrchGrp = document.getElementById('PTS_SRCHGROUPS_GLB').value; var sKeyword = document.getElementById('PTS_KEYWORDS_GLB').value; var sUrl = ""; for (var i = 0; i < this.aSrchGrps.length; i++) {
 if (this.aSrchGrps[i][0] == sSrchGrp) {
 sUrl = this.aSrchGrps[i][1]; break; }
 }
 if (sUrl.length > 0) {
 var nIndex = sUrl.indexOf("?"); if (nIndex < 0) {
 sUrl = sUrl.concat("?SEARCH_GROUP=" + sSrchGrp); } else {
 if (nIndex == (sUrl.length - 1))
 sUrl = sUrl.concat("SEARCH_GROUP=" + sSrchGrp); else
 sUrl = sUrl.concat("&SEARCH_GROUP=" + sSrchGrp); }
 if (sKeyword && sKeyword.length != 0)
 sUrl = sUrl.concat("&SEARCH_TEXT=" + encodeURIComponent(sKeyword)); sUrl = sUrl.concat("&SEARCH_TYPE=BASIC"); LaunchURL(null, sUrl, 4); }
 },

 DoSffGSearch: function(sSrchGrp, sMenuName, sMarketName, sComponent, sNodeName, sExtraParams) {
 var sUrl = ""; for (var i = 0; i < this.aSrchGrps.length; i++) {
 if (this.aSrchGrps[i][0] == "PTUS_ALL") {
 sUrl = this.aSrchGrps[i][1]; break; }
 }

 if (sUrl.length > 0) {
 sUrl = sUrl.concat("?"); if (sExtraParams && sExtraParams.length != 0)
 sUrl = sUrl.concat(sExtraParams + "&"); if (sSrchGrp && sSrchGrp.length != 0)
 sUrl = sUrl.concat("SEARCH_GROUP=" + sSrchGrp + "&"); if (sMenuName && sMenuName.length != 0)
 sUrl = sUrl.concat("MNU=" + sMenuName + "&"); if (sMarketName && sMarketName.length != 0)
 sUrl = sUrl.concat("MKT=" + sMarketName + "&"); if (sComponent && sComponent.length != 0)
 sUrl = sUrl.concat("COMP=" + sComponent + "&"); if (sNodeName && sNodeName.length != 0)
 sUrl = sUrl.concat("PTUS_NODE=" + sNodeName); LaunchURL(null, sUrl, 4); }
 },


 LaunchSrchCatUrl: function(sSrchCat, sKeywords) {
 var sUrl = ""; for (var i = 0; i < this.aSrchGrps.length; i++) {
 if (this.aSrchGrps[i][0] == sSrchCat) {
 sUrl = this.aSrchGrps[i][1]; sUrl = sUrl.concat("?SEARCH_GROUP=" + sSrchCat + "&SEARCH_TEXT=" + sKeywords + "&SEARCH_TYPE=BASIC"); LaunchURL(null, sUrl, 4); break; }
 }
 },

 GetSearchGroupsFromPortal: function(elemId, sPortalUrl, sCurrCompSrchCat, formName) {
 var srchGrpObj = document.getElementById(elemId); if (!srchGrpObj) return; if (!srchGrpObj.options) return; try {
 if (typeof(Storage) !== "undefined") {
 if (!sessionStorage.pBsUrl) {
 sessionStorage.pBsUrl = sPortalUrl + "/"; }
 }
 } catch (e) {}

 ajaxURL = sPortalUrl + "/s/WEBLIB_PTIFRAME.ISCRIPT1.FieldFormula.IScript_PT_GetSrchGrpsList?"
 var listLoader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function() {
 var bHasSearchGroups = true; var res; var srchGrpList = this.req.responseText;  if (srchGrpList == "") {
 bHasSearchGroups = false; } else {
 res = srchGrpList.split("_:_END,"); if (res.length <= 1) 
 bHasSearchGroups = false; }
 if ((typeof(sCurrCompSrchCat) != 'undefined') && (sCurrCompSrchCat != "")) {
 if (bHasSearchGroups == false) {
 
 srchGrpObj.remove(0); }
 bHasSearchGroups = true; }

 if (bHasSearchGroups == false) {
 var srchGCont = document.getElementById(formName + "hdrdivPTS_GSEARCH_CONT"); if (srchGCont) {
 srchGCont.parentNode.removeChild(srchGCont); }
 srchGCont = document.getElementById(formName + "hdrdivPT_SYSACT_GBLSRCH"); if (srchGCont) {
 srchGCont.parentNode.removeChild(srchGCont); }
 } else {
 var bUseSelected = true; var j = 0; if ((typeof(sCurrCompSrchCat) != 'undefined') && (sCurrCompSrchCat != "")) {
 bUseSelected = false; j = 1; }

 var sPortalGSUrl = sPortalUrl + "/c/PORTAL_ADMIN.PTSF_GBLSRCH_FLUID.GBL";  for (var i = 0; i < (res.length - 1); i++) {
 var sValue = res[i]; var res2 = sValue.split("_:,"); var sSGName = res2[0]; var sSelected = res2[1]; var sSGDesc = res2[2]; var sSGUrl = res2[3]; if ((typeof(sSGUrl) == 'undefined') || (sSGUrl == ""))
 sSGUrl = sPortalGSUrl; if (sSGName != "PTUS_ALL") {
 var op = new Option(sSGDesc, sSGName); srchGrpObj.add(op); }

 if ((sSelected == "1") && (bUseSelected == true))
 srchGrpObj.options[srchGrpObj.options.length - 1].selected = true; ptSearchObj.AddSrchGrp(i + j, sSGName, sSGUrl); }

 if ((bUseSelected == false) && (srchGrpObj.options !== null) && (typeof(srchGrpObj.options) !== 'undefined')) {
 for (var i = 0; i < srchGrpObj.options.length; i++) {
 if (srchGrpObj.options[i].value == sCurrCompSrchCat) {
 srchGrpObj.options[j].selected = true; break; }
 }
 }
 }
 }, null, null, "application/x-www-form-urlencoded"); listLoader = null; },

 DoElementOnClick: function(elemId) {
 var elem = document.getElementById(elemId); if (!elem)
 return; if (elem.onclick) {
 elem.onclick(); }
 },

 SetElementAttrib: function(elemId, attribName, attribValue) {
 var elem = document.getElementById(elemId); if (!elem)
 return; elem.setAttribute(attribName, attribValue); },

 prependElementAttrib: function(elemId, attribName, attribValue) {
 var elem = document.getElementById(elemId); if (!elem)
 return; elem.setAttribute(attribName, attribValue + elem.getAttribute(attribName)); },
 
 prependElementAttribFromElement: function(elemId, attribName, fromElemId) {
 var elem = document.getElementById(fromElemId); if (!elem)
 return; var prependVal = elem.getAttribute(attribName); this.prependElementAttrib(elemId, attribName, prependVal); },

 removeFromElementAttribValFromElement: function(elemId, attribName, fromElemId) {
 var elem = document.getElementById(fromElemId); if (!elem)
 return; var removeVal = elem.getAttribute(attribName); elem = document.getElementById(elemId); if (!elem)
 return; var prevVal = elem.getAttribute(attribName); elem.setAttribute(attribName, prevVal.replace(removeVal, "")); },

 setElemAttribValueToParentAttribValue: function(elemId, parentLevel, elemAttribName, parentAttribName) {
 var elem = document.getElementById(elemId); if (!elem)
 return; var i; var parentElem = elem; for (i = 0; i < parentLevel; i++) {
 parentElem = parentElem.parentNode; }

 var elemAttribValue = elem.getAttribute(elemAttribName); parentElem.setAttribute(parentAttribName, elemAttribValue); },

 reApplyTreeBinding: function() {
 if ((typeof ptjqlatest === 'undefined') && (typeof jqJs !== 'undefined'))
 document.getElementsByTagName("head")[0].appendChild(jqJs);  if ((typeof ptjqjettree === 'undefined') && 
 (typeof ssTree !== 'undefined') && 
 (typeof jsTree !== 'undefined')) {
 document.getElementsByTagName("head")[0].appendChild(ssTree); document.getElementsByTagName("head")[0].appendChild(jsTree); }


 if (typeof ptjqjettree === 'undefined') {
 if (typeof reapplyBind !== "undefined") {
 clearInterval(reapplyBind); var xyz1; reapplyBind = xyz1; }
 return; }

 try {
 ptjqjettree('.ptpg_jet_treeitem').each(function() {
 var treeDivEl = ptjqjettree(this); var bindAppl = ptjqjettree(this).attr("bindingapplied"); var sId = ptjqjettree(this).attr("id"); if ((typeof bindAppl !== 'undefined') && 
 (bindAppl !== "true") && 
 (typeof reapplySingleTreeBinding !== 'undefined')) {
 var sTmpId = sId; var nLen = sId.length; sId = sTmpId.substring(0, (nLen - 4)); reapplySingleTreeBinding(sId); return; } 
 }); var trList = document.getElementsByClassName('oj-tree-list'); for (var i = 0; i < trList.length; i++)
 trList[i].tabIndex = "-1"; if (typeof donotcleartimer !== "undefined") {
 return; }

 if (typeof reapplyBind !== "undefined") {
 clearInterval(reapplyBind); var xyz1; reapplyBind = xyz1; }
 } catch(e) { alert(e.toString());}
 },

 addFacetPathClass: function(elemId) {
 var dvElem = ptUtil.id(elemId); if (!dvElem)
 return; if (dvElem.scrollHeight > 25)
 ptUtil.addClass(dvElem, 'PTFACETPATH'); },

 adjustBreadcrumbsHeight: function(elemId) {
 var i; var j; var collection; var collection2; var el; collection = document.getElementsByClassName("PTS_BCRUMBGBWBO"); for (i = 0; i < collection.length; i++) {
 el = collection[i].parentElement.parentElement.parentElement; collection2 = el.getElementsByTagName("td"); for (j = 0; j < collection2.length; j++)
 collection2[j].removeAttribute("height"); }


 collection = document.getElementsByClassName("PTS_BCRUMBGB"); for (i = 0; i < collection.length; i++) {
 collection2 = collection[i].getElementsByTagName("td"); for (j = 0; j < collection2.length; j++)
 collection2[j].removeAttribute("height"); }
 },
};
function getYScroll(){
return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;}

function getXScroll(){
return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;}

var inside_empty = false;callbackOnDelay_empty= function(){ 
 var str = document.getElementById("WAIT_empty").style.visibility; var waitobj = document.getElementById("WAIT_empty"); if(waitobj) {
 var str = waitobj.style.visibility; if(str.indexOf("visible")!=-1) {
 var delayobj = document.getElementById("Delayed_empty"); if(delayobj){
 delayobj.style.visibility="visible"; delayobj.style.display="block"; delayobj.innerHTML="<span> Processing Please wait </span>";  inside_empty=true; sessionStorage.setItem("globalInside_empty", inside_empty);   }
 }
 }
}

callback_end_empty= function(){
 var waitobj = document.getElementById("WAIT_empty"); if(waitobj) {
 var str = waitobj.style.visibility; if( str.indexOf("visible")==-1) {
 var delayobj = document.getElementById("Delayed_empty"); delayobj.style.visibility="visible"; delayobj.style.display="block"; var spannode = delayobj.firstElementChild; if(spannode) {
 spannode.style.visibility="hidden"; }
 delayobj.innerHTML="Loading Complete"; setTimeout(initialize_empty,100);   }
 }
} 

initialize_empty = function(){
 var delayobj = document.getElementById("Delayed_empty"); delayobj.innerHTML=""; delayobj.style.visibility="hidden"; delayobj.style.display="none"; inside_empty=false; sessionStorage.removeItem("globalInside_empty");}


function ptLoadingStatus_empty(display)
{
clearupTimeout2(); var objFrame = top.frames['TargetContent'];var waitobj = null;if ((typeof(window.parent.popupObj_empty) != "undefined") &&
 window.parent.popupObj_empty.isShown) {
 
 waitobj = document.getElementById("WAIT_empty");}
else if (objFrame) {
 try{
 waitobj = objFrame.document.getElementById("WAIT_empty"); }
 catch (err) 
 {
 return true; }
}
else {
 waitobj = document.getElementById("WAIT_empty");}

if (!waitobj)
 waitobj = top.document.getElementById("WAIT_empty");  if (waitobj) {
 if ((typeof display == "undefined") || (display != 0)) {
 if (/\/h\/\?tab=/.test(location)) {
 
 positionHP_WAIT(waitobj)
 }
 else
 waitobj.style.top = getYScroll();  var x = getXScroll(); waitobj.style.right = (x > 0) ? (0 - x) : x; waitobj.style.display="block"; waitobj.style.visibility="visible"; setTimeout(callbackOnDelay_empty,2000); }
 else {
 waitobj.style.display="none"; waitobj.style.visibility="hidden"; var globalInside_empty2 = sessionStorage.getItem("globalInside_empty"); if(globalInside_empty2 !=null && globalInside_empty2.indexOf("true")>=0 ) {
 callback_end_empty ();  }
 }
 }
}

function positionWAIT_empty(){
var waitobj = null;var savedobj = null;var objFrame = top.frames['TargetContent'];if (objFrame) {
 waitobj = objFrame.document.getElementById("WAIT_empty");}
else {
 waitobj = document.getElementById("WAIT_empty"); savedobj = document.getElementById("SAVED_empty");}

if (waitobj && waitobj.style.display != "none" && waitobj.style.visibility != "hidden")
 keepObjTopRight(waitobj);if (savedobj && savedobj.style.display != "none" && savedobj.style.visibility != "hidden")
 keepObjTopRight(savedobj);}
function keepObjTopRight(waitobj) {
 waitobj.style.position = "absolute"; var scrollTop = getScrollXY()[1]; var scrollLeft = getScrollXY()[0]; if (window.frames.length)
 waitobj.style.top = scrollTop + "px"; else {
 if (scrollTop >= 50)
 waitobj.style.top = scrollTop + "px"; else
 waitobj.style.top = 50 + "px"; }
 waitobj.style.right = (scrollLeft > 0) ? ((0-scrollLeft) + "px") : (scrollLeft + "px");}

function positionHP_WAIT(waitObj){

 var wp = document.getElementById("ptpglts"); var wpSib = ptUtil.getNextSibling(waitObj,"table"); if (wp && (!wpSib || (wpSib.id!=="ptpglts"))) {
 var wobj = waitObj.parentNode.removeChild(waitObj); wp.parentNode.insertBefore(wobj, wp); wobj.style.top=""; }
}

function searchProcessing(dispSetting){

 try {
 if (window["TargetContent"]) { 
 
 var formName = window["TargetContent"].document.forms[0].name;  if (!/empty/.test(formName)) { 
 var procFunc = window['TargetContent']['processing_'+formName]; procFunc.call(procFunc,dispSetting,3000); return; }
 } else if (bPSHTMLtemplate){ 
 
 var processingImg = document.getElementById("processing");  if (processingImg) {
 waitLoading = processingImg.parentNode; if (waitLoading && (waitLoading.id.indexOf("WAIT_") != -1)) {
 waitLoading.style.display = dispSetting ? "block" : "none"; waitLoading.style.visibility = dispSetting ? "visible" : "hidden"; return; } 
 }
 }
 } catch (ex) {}
 
 
 var waitLoading; if (typeof parent.frames["UniversalHeader"] != "undefined") { 
 
 waitLoading = parent.frames["UniversalHeader"].document.getElementById("WAIT_empty"); if (waitLoading) waitLoading.style.top=0;  } 
 else 
 waitLoading = top.document.getElementById("WAIT_empty");  if (waitLoading) {
 if (/\/h\/\?tab=/.test(location)) 
 positionHP_WAIT(waitLoading); waitLoading.style.display = dispSetting ? "block" : "none"; } 
} 

if (typeof(ptCommonObj2) === "undefined") 
{
var browserInfoObj2;var ptCommonObj2; var ptConsole2;var ptRC2;var ptSearchObj;var gSrchRsltPageNum = 1;var srchUrls = new Array(10);for (var i = 0; i < 10; i++) {
 srchUrls[i] = new Array(10); for (var j = 0; j < 10; j++)
 srchUrls[i][j] = "";}

var raFormatedString1 = "";var raFormatedString2 = "";var raFormatedString3 = "";var raFormatedString4 = "";var raFormatedString5 = "";var raFormatedString6 = "";var raFormatedString7 = "";var raFormatedString8 = "";var raFormatedString9 = "";var raFormatedString10 = "";var gSrchRaFldId = "";var g_bAccessibilityMode = false;PT_createStandardObjects(); }


if (typeof(ptEvent) === "undefined") {
var ptEvent = {
 fnList : [],
 huid: 100,
 hList: {},
 done: false,
 init : function () {

 if (!ptEvent.done) {
 ptEvent.done = true; if (ptEvent.fnList) {
 for ( var i = 0, fl = ptEvent.fnList.length; i < fl; i++ ) {
 ptEvent.fnList[i].apply(document); }
 ptEvent.fnList = null; }

 
 ptEvent.add(window, "unload", ptEvent.remove);  if (browserInfoObj2.isMozilla || browserInfoObj2.isSafari || browserInfoObj2.isChrome) {
 document.removeEventListener( "DOMContentLoaded", ptEvent.init, false ); }
 }
 },

 load : function (f) {

 if (ptEvent.done) {
 f.apply(document); } else {
 ptEvent.fnList.push(f); }
 },

 onDOMLoad : function (f) {
 ptEvent.load(f); },

 
 add : function (element, type, data,usecapture) {

 var bCapture = false; if(typeof usecapture != "undefined" && usecapture != null && usecapture )
 bCapture = usecapture;     if (browserInfoObj2.isIE && element.setInterval != undefined)
 element = window; if (data) {
 handler = data; handler.data = data; }

 
 if ( !handler.huid )
 handler.huid = this.huid++;  if (!element.events) {
 element.events = {}; }

 if (!element.handle) {
 element.handle = function() { 

 
 var retVal;   if (typeof ptEvent == "undefined") {
 return retVal; }
 
 retVal = ptEvent.handle.apply(element,arguments); return retVal; }; }

 
 var handlers = element.events[type];  if (!handlers) {
 handlers = element.events[type] = {};    if (element.attachEvent) {
 element.attachEvent("on" + type, element.handle); } else if (element.addEventListener) {
 element.addEventListener(type, element.handle, bCapture); }
 }

 
 handlers[handler.huid] = handler; },

 
 remove : function (element, type, handler,usecapture) {

 var bCapture = false; if(typeof usecapture != "undefined" && usecapture != null && usecapture )
 bCapture = usecapture;  var elEvents = element.events, ret; if (elEvents) {

 
 if (type && type.type) {
 handler = type.handler; type = type.type; }
 
 if (!type) {
 for (type in elEvents) {
 this.remove( element, type ); }
 } else if (elEvents[type]) {

 
 if (handler) {
 delete elEvents[type][handler.huid]; } else {
 
 
 for (handler in element.events[type]) {
 delete elEvents[type][handler]; }
 }
 
 
 for (ret in elEvents[type]) { 
 break; }

 if (!ret) {

 if (element.detachEvent) {
 element.detachEvent("on" + type,element.handle); } else if (element.removeEventListener) {
 element.removeEventListener(type,element.handle,bCapture); }

 ret = null; delete elEvents[type]; }
 }
 
 
 for ( ret in elEvents ) {
 break; }

 if ( !ret ) {
 element.handle = element.events = null; }
 }
 },

 
 handle : function (event) {

 var retVal;  event = ptEvent.fix(event || window.event || {});  var c = this.events && this.events[event.type]; var args = [].slice.call(arguments,1); args.unshift(event); for (var j in c) {
 
 

 var temp = c[j]; args[0].handler = c[j]; args[0].data = c[j].data;  var hRetVal = c[j].apply( this, args );  if ( retVal !== false ) {
 retVal = hRetVal; }
 
 if ( hRetVal === false ) {
 event.preventDefault(); event.stopPropagation(); }
 }

 
 if (browserInfoObj2.isIE) {
 event.target = event.preventDefault = event.stopPropagation = 
 event.handler = event.data = null; }
 return retVal; },

 
 fix : function (event) {

 
 if (!event.target && event.srcElement)
 event.target = event.srcElement;  if (event.pageX == undefined && event.clientX != undefined) {
 if (typeof document == "undefined" || typeof document == "unknown") return event; var e = document.documentElement, b = document.body; event.pageX = event.clientX + (e.scrollLeft || b.scrollLeft); event.pageY = event.clientY + (e.scrollTop || b.scrollTop); }
 
 
 if (browserInfoObj2.isSafari && event.target.nodeType == 3) {

 
 
 var originalEvent = event; event = {}; event = originalEvent;   event.target = originalEvent.target.parentNode; }
 
 
 if (!event.preventDefault)
 event.preventDefault = function () { event.returnValue = false; };  if (!event.stopPropagation)
 event.stopPropagation = function () { event.cancelBubble = true; }; return event; }
}; new function () {
 
 if (browserInfoObj2.isMozilla || browserInfoObj2.isSafari || browserInfoObj2.isChrome) {
 document.addEventListener( "DOMContentLoaded", ptEvent.init, false );  } else if (browserInfoObj2.isIE && window == top) {
 (function(){
 if (ptEvent.done) { return; }

 try {
 
 document.documentElement.doScroll("left"); } catch( error ) {
 setTimeout( arguments.callee, 0 ); return; }
 
 ptEvent.init(); })(); }
 ptEvent.add(window,"load",ptEvent.init);}; } 





var ptUtil = {
 
 
 
 
 id : function (s) {
 if (typeof s == "string") { return document.getElementById(s); }
 return s; },

 
 
 
 
 
 getElems : function (pNode,crit) {

 var elems = []; var elName; var cName; var id; var t; if (!pNode || !crit) return elems;   var re = /^([a-z0-9_-]+)(.)([a-z0-9\\*_-]*)/i; var m = re.exec(crit); if (m && m[2] === ".") {
 elName = m[1]; cName = m[3]; } else {
 
 re = /^([a-z0-9_-]+)(#)([a-z0-9\\*_-]*)/i; m = re.exec(crit); if (m && m[2] === "#") {
 elName = m[1]; id = m[3]; } else {
 
 elName = crit; }
 }
 
 if (elName || cName) {
 var cNode; for (var i = 0; i < pNode.childNodes.length; i++) {
 cNode = pNode.childNodes[i];  if (cNode.nodeType === 1) {
 
 if (elName && cName) {
 if (cNode.nodeName.toLowerCase() === elName && 
 ptUtil.isClassMember(cNode,cName)) {
 elems.push(cNode); }
 } else if (elName && cNode.nodeName.toLowerCase() === elName) {
 elems.push(cNode); } else if (ptUtil.isClassMember(cNode,cName)) { 
 elems.push(cNode); }
 
 
 t = ptUtil.getElems(cNode,crit); if (t[0]) elems = elems.concat(t); }
 }
 } else if (id) {
 
 elems.push(ptUtil.id(id)); }
 return elems; },

 
 
 
 
 appendHTML : function (pNode,html,cNodeTag) {
 
 if (!pNode || !html) return; if (cNodeTag) {
 
 var elems = ptUtil.getElems(pNode,cNodeTag); for (var i = 0; i < elems.length; i++) {
 ptUtil.appendNodeFromHTML(elems[i],html); } 
 } else {
 ptUtil.appendNodeFromHTML(pNode,html); }
 },

 appendNodeFromHTML : function (n,html) {
 
 
 if ( html && typeof html == "string" ) {

 var div = document.createElement("div"); div.innerHTML = html;  if (!browserInfoObj2.isIE && div.childNodes.length > 1)
 {
 if (browserInfoObj2.isFF)
 div = div.lastChild; else
 div.childNodes[1]; }
 else
 div = div.firstChild; n.appendChild(div); }
 }, 

 
 
 
 
 
 
 swapClass : function (pNode,fClass,tClass,cNodeTag) {

 
 if (!pNode || !fClass || !tClass) return;  if (cNodeTag) {
 var elems = ptUtil.getElems(pNode,cNodeTag); for (var i = 0; i < elems.length; i++) {
 ptUtil.removeClass(elems[i],fClass); ptUtil.addClass(elems[i],tClass); }
 } else {
 ptUtil.removeClass(pNode,fClass); ptUtil.addClass(pNode,tClass); }
 },

 
 
 
 addClass : function (el, cName) {
 
 if (el && !ptUtil.isClassMember(el,cName)) {

 if (el.className) {
 
 el.className = el.className.replace(/^\s+|\s+$/g, ""); el.className += " " + cName; } else {
 el.className += "" + cName; }
 }
 },

 
 
 
 removeClass : function (el, cName) {

 
 
 
 if (el) {
 el.className = el.className.replace(new RegExp("\\b"+ cName+"\\b\\s*", "g"), ""); }
 },

 
 
 
 isClassMember : function (el, cName) {

 if (!el) { return false; }

 
 var classes = el.className; if (!classes) { return false; }
 
 
 if (classes === cName) { return true; }

 
 var whiteSpace = /\s+/; if (!whiteSpace.test(classes)) { return false; }

 
 
 var c = classes.split(whiteSpace); for (var i = 0; i < c.length; i++) {
 if (c[i] === cName) { return true; }
 }
 return false; },

 
 getElemsByClass : function (searchClass,node,tag) {

 var classElems = []; if (!node) { node = document; }

 if (!tag) { tag = "*"; }

 var els = node.getElementsByTagName(tag); var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"); for (var i = 0, j = els.length; i < j; i++) {
 if (pattern.test(els[i].className) ) { classElems.push(els[i]); }
 }
 return classElems; },

 
 
 
 getCSSValue : function (el,prop) {
 if (!el) { return null; }
 var cssProp = prop; var retVal = null;  if (cssProp === "float") {
 cssProp = browserInfoObj2.isIE ? "styleFloat" : "cssFloat"; }
 
 if (el.style[cssProp]) {
 retVal = el.style[cssProp];  } else if (el.currentStyle) {
 retVal = el.currentStyle[cssProp];   if ( !/^\d+(px)?$/i.test(retVal) && /^\d/.test(retVal) ) {

 
 var left = el.style.left, rsLeft = el.runtimeStyle.left;  el.runtimeStyle.left = el.currentStyle.left; el.style.left = retVal || 0; retVal = el.style.pixelLeft + "px";  el.style.left = left; el.runtimeStyle.left = rsLeft; }

 
 } else if (document.defaultView && document.defaultView.getComputedStyle) {
 retVal = document.defaultView.getComputedStyle(el,"")[cssProp]; }
 return retVal; },

 
 
 
 
 setCSSValue : function (el,prop,value) {

 var cssProp = prop; if (cssProp === "float") {
 cssProp = browserInfoObj2.isIE ? "styleFloat" : "cssFloat"; }

 el.style[cssProp] = value; },

 
 winSize : function () {

 var de = document.documentElement; var height = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight; var width = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth; return {height:height, width:width}; }, 

 
 getNextSibling : function (node,nodeType,styleClass) {

 if (!node) { return null; }
 
 var sibling = node.nextSibling; while (sibling) {
 if (sibling.nodeName.toLowerCase() === nodeType) {
 if (styleClass && styleClass !== "") {
 if (this.isClassMember(sibling,styleClass)) {
 return sibling; }
 } else { 
 return sibling; }
 }
 sibling = sibling.nextSibling; }
 return null; },

 
 getPrevSibling : function (node,nodeType,styleClass) {

 if (!node) { return null; }
 
 var sibling = node.previousSibling; while (sibling) {
 if (sibling.nodeName.toLowerCase() === nodeType) {
 if (styleClass && styleClass !== "") {
 if (this.isClassMember(sibling,styleClass)) {
 return sibling; }
 } else { 
 return sibling; }
 }
 sibling = sibling.previousSibling; }
 return null; },

 
 getGrandParent : function (pNode) {
 if (pNode.parentNode) 
 return pNode.parentNode.parentNode; else
 return null; },

 
 getFirstChild : function (node) {
 var firstChild; if (node.firstElementChild) {
 firstChild = node.firstElementChild; } else {
 firstChild = node.firstChild; while (firstChild && firstChild.nodeType !== 1) {
 firstChild = firstChild.nextSibling; }
 }
 return firstChild; },

 
 getKeyCode : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return 0; }
 if (evt.keyCode) { return evt.keyCode; }
 if (evt.which) { return evt.which; }
 return 0; },

 
 isAltKey : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return false; }
 if (evt.altKey) { return true; }
 if (evt.modifiers) { return (evt.modifiers & Event.ALT_MASK) != 0; }
 return false; },

 
 isCtrlKey : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return false; }
 if (evt.ctrlKey) { return true; }
 if (evt.modifiers) { return (evt.modifiers & Event.CONTROL_MASK) != 0; }
 return false; },

 
 isShiftKey : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return false; }
 if (evt.shiftKey) { return true; }
 if (evt.modifiers) { return (evt.modifiers & Event.SHIFT_MASK) != 0; }
 return false; }
}; function isFModeLayout() {
 if (typeof bFMode == 'undefined') return false; if (bFMode) return true; return false;}

function isTopFModeLayout() {
 try {
 if (top.isFModeLayout())
 return true; else
 return false; }
 catch (e) {
 return false; }
}

function isClassicPlus()
{
 var rootDocElementClassName = document.documentElement.className; if(rootDocElementClassName && rootDocElementClassName.indexOf('pt_classic_plus') !== -1)
 {
 return true; }
 else
 {
 return false; }
}

function setCkeditorFiveUpdatedFlag()
{
 ptUtil.addClass(top.document.documentElement,"pt_rte_updated"); return true;}

function resetCkeditorFiveUpdatedFlag()
{
 ptUtil.removeClass(top.document.documentElement,"pt_rte_updated"); return true;}

function getTargetFrame(frames) {
 for (var j = 0; j < frames.length; ++j) {
 var objFrame = frames[j]; if (objFrame && typeof objFrame.gFocusId != 'undefined' && (objFrame.name == "TargetContent" || objFrame.name == "rightF")) {
 top.ModalTop = window; return objFrame; }
 if (objFrame.frames.length > 0 && !isCrossDomain(objFrame))
 return getTargetFrame(objFrame.frames); }
 return top;}

function printThis(){
window.print();}


function CopyUrlToClipboard(msg) {
if (!browserInfoObj2.isIE) { return; }

if (!msg || msg == "undefined") { msg = strCurrUrl; }
clipboardData.setData("Text", msg);}




function isFluidNavCollection() {
 var bFluidNavCollection = (isTopFModeLayout() && top.isAGMode() && !top.isMDGuided());  return bFluidNavCollection;}




function isPureAG() {
 var bPureAG = (isTopFModeLayout() && top.isAGMode() && top.isMDGuided());  return bPureAG;}

function updateBrowserTitle(sTitle) {
 if (!isPureAG())
 {
 var newTitle = sTitle.replace(/&#039;/g, "'").replace(/&amp;/gi,'&'); top.document.title = newTitle; }
}


function isMAF()
{
 var deviceInfo = getCookieValue("PS_DEVICEFEATURES"); var tempArray = deviceInfo.split(" "); for (var i=0; i<tempArray.length; i++)
 {
 var mafArray = tempArray[i].split(":");  if (mafArray[0] == "maf")
 return mafArray[1];  }
 return 0;}

function updatePageTitle()
{
 var updated = false; var container = parent.document.getElementById("pagetitleheader"); if(container)
 {
 var titleElement; var pageTitleString =""; var pageTitle; pageTitle = parent.document.querySelector( "#ptdashboardlabel,#ptalPgltAreaHeaderLabel"); if (typeof(pageTitle) != 'undefined' && pageTitle != null)
 {
 if(typeof(pageTitle.innerHTML) != 'undefined')
 {
 pageTitleString = pageTitle.innerHTML; }
 }
 else
 { 
 pageTitleString = GetPageTitleString() ;  var navBarPageTitle= parent.document.getElementById("psNavBar"); if (typeof(navBarPageTitle) != 'undefined' && navBarPageTitle != null)
 {
 
 var navBarTitleString = navBarPageTitle.getAttribute("class"); if(navBarTitleString.indexOf("slidein") > -1)
 {
 pageTitleString = ""; }
 }
 }
 var titleHtml=container.innerHTML; if(typeof winName != 'undefined' && winName && isModalPage(winName) && titleHtml.indexOf(">&nbsp;<\/")==-1) 
 {
 return; }
 else if(typeof(pageTitleString) != 'undefined' && pageTitleString.length > 0)
 {
 container.childNodes[0].innerHTML = pageTitleString; }
 
 }

}


function displayPageTitle()
{
 var redwood = top.document.getElementById("pthdr2titlecontainerredwood"); if ( redwood == null )
 {
 if (top.frames) 
 {
 objFrame = top.frames['TargetContent']; if (objFrame)
 {
 const collection = objFrame.document.getElementsByClassName("PAPAGETITLE psaccesshidden"); for(var i=0;i<collection.length;i++) 
 {
 if( typeof(collection[i]) != 'undefined' && collection[i].nodeType!= null && collection[i].nodeType == 1 && hasRoleHeading(collection[i]) == true)
 if(typeof(collection[i].innerHTML) != 'undefined' && isHTML(collection[i].innerHTML) == false)
 collection[i].setAttribute("class", "PAPAGETITLE"); }
 
 const collectionsrch = document.getElementsByClassName("PSSRCHTITLE"); for(var i=0;i<collectionsrch.length;i++) 
 {
 if( typeof(collectionsrch[i]) != 'undefined' && collectionsrch[i].nodeType!= null && collectionsrch[i].nodeType == 1 && hasIdAppLabel(collectionsrch[i]) == true)
 if(typeof(collectionsrch[i].innerHTML) != 'undefined' && isHTML(collectionsrch[i].innerHTML) == false)
 collectionsrch[i].setAttribute("style", "display:block"); }
 }
 else if (isPIAComponentUrl(sHistURL))
 {
 const collection = document.getElementsByClassName("PAPAGETITLE psaccesshidden"); for(var i=0;i<collection.length;i++) 
 {
 if( typeof(collection[i]) != 'undefined' && collection[i].nodeType!= null && collection[i].nodeType == 1 && hasRoleHeading(collection[i]) == true)
 if(typeof(collection[i].innerHTML) != 'undefined' && isHTML(collection[i].innerHTML) == false)
 collection[i].setAttribute("class", "PAPAGETITLE"); }
 const collectionsrch = document.getElementsByClassName("PSSRCHTITLE"); for(var i=0;i<collectionsrch.length;i++) 
 {
 if( typeof(collectionsrch[i]) != 'undefined' && collectionsrch[i].nodeType!= null && collectionsrch[i].nodeType == 1 && hasIdAppLabel(collectionsrch[i]) == true)
 if(typeof(collectionsrch[i].innerHTML) != 'undefined' && isHTML(collectionsrch[i].innerHTML) == false)
 collectionsrch[i].setAttribute("style", "display:block"); }
 }
 }
 }
 
 if (top.frames)
 {
 objFrame = top.frames['RelatedContent']; if (objFrame && !isCrossDomain(objFrame))
 {
 objRCAreaFrame = objFrame.frames['RCArea']; if (objRCAreaFrame && !isCrossDomain(objRCAreaFrame))
 {
 const collection = objRCAreaFrame.document.getElementsByClassName("PAPAGETITLE psaccesshidden"); for(var i=0;i<collection.length;i++) 
 {
 if( typeof(collection[i]) != 'undefined' && collection[i].nodeType!= null && collection[i].nodeType == 1 && hasRoleHeading(collection[i]) == true)
 if(typeof(collection[i].innerHTML) != 'undefined' && isHTML(collection[i].innerHTML) == false)
 collection[i].setAttribute("class", "PAPAGETITLE"); }
 
 const collectionsrch = objRCAreaFrame.document.getElementsByClassName("PSSRCHTITLE"); for(var i=0;i<collectionsrch.length;i++) 
 {
 if( typeof(collectionsrch[i]) != 'undefined' && collectionsrch[i].nodeType!= null && collectionsrch[i].nodeType == 1 && hasIdAppLabel(collectionsrch[i]) == true) 
 if(typeof(collectionsrch[i].innerHTML) != 'undefined' && isHTML(collectionsrch[i].innerHTML) == false)
 collectionsrch[i].setAttribute("style", "display:block"); }
 }
 }
 }
 
 if (isWorkCenter())
 {
 const collection = document.getElementsByClassName("PAPAGETITLE psaccesshidden"); for(var i=0;i<collection.length;i++) 
 {
 if( typeof(collection[i]) != 'undefined' && collection[i].nodeType!= null && collection[i].nodeType == 1 && hasRoleHeading(collection[i]) == true)
 if(typeof(collection[i].innerHTML) != 'undefined' && isHTML(collection[i].innerHTML) == false)
 collection[i].setAttribute("class", "PAPAGETITLE"); }
 
 const collectionsrch = document.getElementsByClassName("PSSRCHTITLE"); for(var i=0;i<collectionsrch.length;i++) 
 {
 if( typeof(collectionsrch[i]) != 'undefined' && collectionsrch[i].nodeType!= null && collectionsrch[i].nodeType == 1 && hasIdAppLabel(collectionsrch[i]) == true)
 if(typeof(collectionsrch[i].innerHTML) != 'undefined' && isHTML(collectionsrch[i].innerHTML) == false)
 collectionsrch[i].setAttribute("style", "display:block"); }
 }
 
 var ModalList = top.document.querySelectorAll('[id^=ptModFrame]'); for (var i=0;i<ModalList.length;i++)
 {
 try{
 objElement = ModalList[i].contentWindow.document.querySelector('.PAPAGETITLE.psaccesshidden'); if( objElement && typeof(objElement) != 'undefined' && objElement.nodeType!= null && objElement.nodeType == 1 && hasRoleHeading(objElement) == true)
 if(typeof(objElement.innerHTML) != 'undefined' && isHTML(objElement.innerHTML) == false)
 objElement.setAttribute("class", "PAPAGETITLE"); } catch (e) {}
 }
}

function GetPageTitleString() {

 
 var pageTitle = top.document.getElementsByClassName("PAPAGETITLE"); for(var i=0;i<pageTitle.length;i++) {
 if (typeof(pageTitle[i]) != 'undefined' && pageTitle[i].nodeType!= null && pageTitle[i].nodeType == 1 && hasRoleHeading(pageTitle[i]) == true) { 
 if(typeof(pageTitle[i].innerHTML) != 'undefined' && isHTML(pageTitle[i].innerHTML) == false)
 return pageTitle[i].innerHTML; } 
 }

 
 pageTitle = top.document.getElementsByClassName("PSSRCHTITLE"); if(pageTitle.length > 0)
 {
 if (typeof pageTitle[0] != 'undefined' && pageTitle[0].nodeType!= null && pageTitle[0].nodeType == 1) { 
 if(typeof(pageTitle[0].innerHTML) != 'undefined' && isHTML(pageTitle[0].innerHTML) == false)
 return pageTitle[0].innerHTML; }
 }
 
 
 var idashboardVal = window.location.search.indexOf("unifieddashboard="); if (idashboardVal != -1) {
 pageTitle = top.document.getElementsByTagName("title"); if(pageTitle.length > 0)
 {
 if (typeof pageTitle[0] != 'undefined' && pageTitle[0].nodeType!= null && pageTitle[0].nodeType == 1) { 
 if(typeof(pageTitle[0].innerHTML) != 'undefined' && isHTML(pageTitle[0].innerHTML) == false)
 return pageTitle[0].innerHTML; }
 }
 }
 
 pageTitle = top.document.getElementsByTagName("h1"); if(pageTitle.length > 0)
 {
 if (typeof pageTitle[0] != 'undefined' && pageTitle[0].nodeType!= null && pageTitle[0].nodeType == 1) { 
 if(typeof(pageTitle[0].innerHTML) != 'undefined' && isHTML(pageTitle[0].innerHTML) == false)
 return pageTitle[0].innerHTML; }
 }


 
 var pageTitle = document.getElementsByClassName("PAPAGETITLE"); for(var i=0;i<pageTitle.length;i++) {
 if (typeof(pageTitle[i]) != 'undefined' && pageTitle[i].nodeType!= null && pageTitle[i].nodeType == 1 && hasRoleHeading(pageTitle[i]) == true) { 
 if(typeof(pageTitle[i].innerHTML) != 'undefined' && isHTML(pageTitle[i].innerHTML) == false)
 return pageTitle[i].innerHTML; } 
 }

 
 pageTitle = document.getElementsByClassName("PSSRCHTITLE"); if(pageTitle.length > 0) {
 if (typeof pageTitle[0] != 'undefined' && pageTitle[0].nodeType!= null && pageTitle[0].nodeType == 1) { 
 if(typeof(pageTitle[0].innerHTML) != 'undefined' && isHTML(pageTitle[0].innerHTML) == false)
 return pageTitle[0].innerHTML; }
 }
 
 
 var idashboardVal = window.location.search.indexOf("unifieddashboard="); if (idashboardVal != -1) {
 pageTitle = document.getElementsByTagName("title"); if(pageTitle.length > 0) {
 if (typeof pageTitle[0] != 'undefined' && pageTitle[0].nodeType!= null && pageTitle[0].nodeType == 1) { 
 if(typeof(pageTitle[0].innerHTML) != 'undefined' && isHTML(pageTitle[0].innerHTML) == false)
 return pageTitle[0].innerHTML; }
 }
 }

 
 pageTitle = document.getElementsByTagName("h1"); if(pageTitle.length > 0) {
 if (typeof pageTitle[0] != 'undefined' && pageTitle[0].nodeType!= null && pageTitle[0].nodeType == 1) { 
 if(typeof(pageTitle[0].innerHTML) != 'undefined' && isHTML(pageTitle[0].innerHTML) == false)
 return pageTitle[0].innerHTML; }
 }

 var htmlTopTag = top.document.getElementsByTagName("html"); pageTitle = htmlTopTag[0].getElementsByTagName("title"); if(pageTitle.length > 0) {
 if (typeof pageTitle[0] != 'undefined' && pageTitle[0].nodeType!= null && pageTitle[0].nodeType == 1) { 
 if(typeof(pageTitle[0].innerHTML) != 'undefined' && isHTML(pageTitle[0].innerHTML) == false)
 return pageTitle[0].innerHTML; }
 }

 
 return "";}

function hasRoleHeading(element)
{
 if(element.hasAttribute("role"))
 {
 if(element.getAttribute("role") == "heading")
 return true; }
 
 return false;}


function isHTML(str) {
 var a = document.createElement('div'); a.innerHTML = str; for (var c = a.childNodes, i = c.length; i--; ) {
 if (c[i].nodeType == 1) 
 {
 return true;  }
 }

 return false;}

function GetPageTitleClassic() {
 pageTitle = document.getElementsByClassName("PAPAGETITLE"); for(var i=0;i<pageTitle.length;i++) {
 if (typeof pageTitle[i] != 'undefined' && pageTitle[i].nodeType!= null && pageTitle[i].nodeType == 1) { 
 if(typeof(pageTitle[i].innerHTML) != 'undefined')
 return pageTitle[i].innerHTML; } 
 }
 if(pageTitle.length == 0) {
 pageTitle = document.getElementsByClassName("PSSRCHTITLE"); for(var i=0;i<pageTitle.length;i++) {
 if (typeof pageTitle[i] != 'undefined' && pageTitle[i].nodeType!= null && pageTitle[i].nodeType == 1) { 
 if(typeof(pageTitle[i].innerHTML) != 'undefined')
 return pageTitle[i].innerHTML; }
 }
 if(pageTitle.length == 0) {
 pageTitle = document.getElementsByTagName("title"); for(var i=0;i<pageTitle.length;i++) {
 if (typeof pageTitle[i] != 'undefined' && pageTitle[i].nodeType!= null && pageTitle[i].nodeType == 1) { 
 if(typeof(pageTitle[i].innerHTML) != 'undefined')
 return pageTitle[i].innerHTML; }
 }
 }
 }

 return "";}




function exceptionMessageStack(e, fName) {
 var errMessage = "Function '" + fName + "' Error: " + e.message; if (typeof e.stack != "undefined" && e.stack) {
 errMessage += "\nError Stack:\n" + e.stack; }
 alert(errMessage); }



function exceptionMessageStackZ(e, fName) {
 var errMessage = "Function '" + fName + "' Error: " + e.message; if (typeof e.stack != "undefined" && e.stack) {
 errMessage += "\nError Stack:\n" + e.stack; }
 return errMessage;}



function exceptionMessageTileZ(e, fName) {
 errMessage = "Error in opening/sending request, function " + fName + ": - Error: " + e; return errMessage;}


function getErrTile(errTileId) {

 var oErrTile = null, oTempTileDiv = null; if (errTileId) {
 oTempTileDiv = document.getElementById(errTileId); if (oTempTileDiv && oTempTileDiv.parentNode && 
 oTempTileDiv.parentNode.parentNode && oTempTileDiv.parentNode.parentNode.parentNode) {
 if (ptUtil.isClassMember(oTempTileDiv.parentNode.parentNode.parentNode), "nuitile") {
 oErrTile = oTempTileDiv.parentNode.parentNode.parentNode;  }
 }
 }
 return oErrTile;}


function setErrTileMessage(oErrTile, fName, err) {
 var errMsg = exceptionMessageTileZ(err, fName); var oErrTileHeader = oErrTile.querySelector(".ps_groupleth"); if (oErrTileHeader) {
 for (var i=oErrTileHeader.parentNode.children.length - 1; i > 0; i--) {
 oErrTileHeader.parentNode.removeChild(oErrTileHeader.parentNode.children[i]); }
 var errMsgDiv = document.createElement("div"); errMsgDiv.innerHTML = errMsg; oErrTileHeader.parentNode.insertBefore(errMsgDiv, oErrTileHeader.nextSibling); }
} 

function htmlDecode(input) {
 var e = document.createElement('div'); e.innerHTML = input; return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;}

function getFormFactorFromCookie()
{
 var formfactor = "3"; var themecookie = getCookieValue('ps_theme'); if(themecookie)
 {
 var splitted = themecookie.split(' '); if(splitted)
 {
 for(i = 0; i < splitted.length; i++){
 if(splitted[i].indexOf('formfactor') != -1)
 {
 var tmp = splitted[i].split(':'); if(tmp && tmp.length ==2)
 {
 formfactor = tmp[1]; } 
 }
 }
 }
 }
 
 return formfactor;}

function clearSessionStorageKey(keyPatt) {
 
 if (typeof sessionStorage != "undefined") {
 var i = sessionStorage.length; var regexPatt = new RegExp(keyPatt); while(i--) {
 var key = sessionStorage.key(i); if(regexPatt.test(key)) 
 sessionStorage.removeItem(key);  }
 }
}

function EscapeJSString(str) {
 return str.replace(/(['"\\])/g, "\\$&");}

function hasIdAppLabel(element)
{
 if(element.hasAttribute("id"))
 {
 if(element.getAttribute("id") == "app_label")
 return true; }
 
 return false;}


 


( function( global, factory ) {

 "use strict"; if ( typeof module === "object" && typeof module.exports === "object" ) {

 
 
 
 
 
 
 
 module.exports = global.document ?
 factory( global, true ) :
 function( w ) {
 if ( !w.document ) {
 throw new Error( "jQuery requires a window with a document" ); }
 return factory( w ); }; } else {
 factory( global ); }


} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {





"use strict";var arr = [];var getProto = Object.getPrototypeOf;var slice = arr.slice;var flat = arr.flat ? function( array ) {
 return arr.flat.call( array );} : function( array ) {
 return arr.concat.apply( [], array );};var push = arr.push;var indexOf = arr.indexOf;var class2type = {};var toString = class2type.toString;var hasOwn = class2type.hasOwnProperty;var fnToString = hasOwn.toString;var ObjectFunctionString = fnToString.call( Object );var support = {};var isFunction = function isFunction( obj ) {

 
 
 
 
 return typeof obj === "function" && typeof obj.nodeType !== "number"; };var isWindow = function isWindow( obj ) {
 return obj != null && obj === obj.window; };var document = window.document; var preservedScriptAttributes = {
 type: true,
 src: true,
 nonce: true,
 noModule: true
 }; function DOMEval( code, node, doc ) {
 doc = doc || document; var i, val,
 script = doc.createElement( "script" ); script.text = code; if ( node ) {
 for ( i in preservedScriptAttributes ) {

 
 
 
 
 
 
 
 
 
 
 val = node[ i ] || node.getAttribute && node.getAttribute( i ); if ( val ) {
 script.setAttribute( i, val ); }
 }
 }
 doc.head.appendChild( script ).parentNode.removeChild( script ); }


function toType( obj ) {
 if ( obj == null ) {
 return obj + ""; }

 
 return typeof obj === "object" || typeof obj === "function" ?
 class2type[ toString.call( obj ) ] || "object" :
 typeof obj;}






var
 version = "3.5.1",

 
 jQuery = function( selector, context ) {

 
 
 return new jQuery.fn.init( selector, context ); };jQuery.fn = jQuery.prototype = {

 
 jquery: version,

 constructor: jQuery,

 
 length: 0,

 toArray: function() {
 return slice.call( this ); },

 
 
 get: function( num ) {

 
 if ( num == null ) {
 return slice.call( this ); }

 
 return num < 0 ? this[ num + this.length ] : this[ num ]; },

 
 
 pushStack: function( elems ) {

 
 var ret = jQuery.merge( this.constructor(), elems );  ret.prevObject = this;  return ret; },

 
 each: function( callback ) {
 return jQuery.each( this, callback ); },

 map: function( callback ) {
 return this.pushStack( jQuery.map( this, function( elem, i ) {
 return callback.call( elem, i, elem ); } ) ); },

 slice: function() {
 return this.pushStack( slice.apply( this, arguments ) ); },

 first: function() {
 return this.eq( 0 ); },

 last: function() {
 return this.eq( -1 ); },

 even: function() {
 return this.pushStack( jQuery.grep( this, function( _elem, i ) {
 return ( i + 1 ) % 2; } ) ); },

 odd: function() {
 return this.pushStack( jQuery.grep( this, function( _elem, i ) {
 return i % 2; } ) ); },

 eq: function( i ) {
 var len = this.length,
 j = +i + ( i < 0 ? len : 0 ); return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] ); },

 end: function() {
 return this.prevObject || this.constructor(); },

 
 
 push: push,
 sort: arr.sort,
 splice: arr.splice
};jQuery.extend = jQuery.fn.extend = function() {
 var options, name, src, copy, copyIsArray, clone,
 target = arguments[ 0 ] || {},
 i = 1,
 length = arguments.length,
 deep = false;  if ( typeof target === "boolean" ) {
 deep = target;  target = arguments[ i ] || {}; i++; }

 
 if ( typeof target !== "object" && !isFunction( target ) ) {
 target = {}; }

 
 if ( i === length ) {
 target = this; i--; }

 for ( ; i < length; i++ ) {

 
 if ( ( options = arguments[ i ] ) != null ) {

 
 for ( name in options ) {
 copy = options[ name ];   if ( name === "__proto__" || target === copy ) {
 continue; }

 
 if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
 ( copyIsArray = Array.isArray( copy ) ) ) ) {
 src = target[ name ];  if ( copyIsArray && !Array.isArray( src ) ) {
 clone = []; } else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
 clone = {}; } else {
 clone = src; }
 copyIsArray = false;  target[ name ] = jQuery.extend( deep, clone, copy );  } else if ( copy !== undefined ) {
 target[ name ] = copy; }
 }
 }
 }

 
 return target;};jQuery.extend( {

 
 expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

 
 isReady: true,

 error: function( msg ) {
 throw new Error( msg ); },

 noop: function() {},

 isPlainObject: function( obj ) {
 var proto, Ctor;   if ( !obj || toString.call( obj ) !== "[object Object]" ) {
 return false; }

 proto = getProto( obj );  if ( !proto ) {
 return true; }

 
 Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor; return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString; },

 isEmptyObject: function( obj ) {
 var name; for ( name in obj ) {
 return false; }
 return true; },

 
 
 globalEval: function( code, options, doc ) {
 DOMEval( code, { nonce: options && options.nonce }, doc ); },

 each: function( obj, callback ) {
 var length, i = 0; if ( isArrayLike( obj ) ) {
 length = obj.length; for ( ; i < length; i++ ) {
 if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
 break; }
 }
 } else {
 for ( i in obj ) {
 if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
 break; }
 }
 }

 return obj; },

 
 makeArray: function( arr, results ) {
 var ret = results || []; if ( arr != null ) {
 if ( isArrayLike( Object( arr ) ) ) {
 jQuery.merge( ret,
 typeof arr === "string" ?
 [ arr ] : arr
 ); } else {
 push.call( ret, arr ); }
 }

 return ret; },

 inArray: function( elem, arr, i ) {
 return arr == null ? -1 : indexOf.call( arr, elem, i ); },

 
 
 merge: function( first, second ) {
 var len = +second.length,
 j = 0,
 i = first.length; for ( ; j < len; j++ ) {
 first[ i++ ] = second[ j ]; }

 first.length = i; return first; },

 grep: function( elems, callback, invert ) {
 var callbackInverse,
 matches = [],
 i = 0,
 length = elems.length,
 callbackExpect = !invert;   for ( ; i < length; i++ ) {
 callbackInverse = !callback( elems[ i ], i ); if ( callbackInverse !== callbackExpect ) {
 matches.push( elems[ i ] ); }
 }

 return matches; },

 
 map: function( elems, callback, arg ) {
 var length, value,
 i = 0,
 ret = [];  if ( isArrayLike( elems ) ) {
 length = elems.length; for ( ; i < length; i++ ) {
 value = callback( elems[ i ], i, arg ); if ( value != null ) {
 ret.push( value ); }
 }

 
 } else {
 for ( i in elems ) {
 value = callback( elems[ i ], i, arg ); if ( value != null ) {
 ret.push( value ); }
 }
 }

 
 return flat( ret ); },

 
 guid: 1,

 
 
 support: support
} );if ( typeof Symbol === "function" ) {
 jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];}


jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( _i, name ) {
 class2type[ "[object " + name + "]" ] = name.toLowerCase();} );function isArrayLike( obj ) {

 
 
 
 
 var length = !!obj && "length" in obj && obj.length,
 type = toType( obj ); if ( isFunction( obj ) || isWindow( obj ) ) {
 return false; }

 return type === "array" || length === 0 ||
 typeof length === "number" && length > 0 && ( length - 1 ) in obj;}
var Sizzle =

( function( window ) {
var i,
 support,
 Expr,
 getText,
 isXML,
 tokenize,
 compile,
 select,
 outermostContext,
 sortInput,
 hasDuplicate,

 
 setDocument,
 document,
 docElem,
 documentIsHTML,
 rbuggyQSA,
 rbuggyMatches,
 matches,
 contains,

 
 expando = "sizzle" + 1 * new Date(),
 preferredDoc = window.document,
 dirruns = 0,
 done = 0,
 classCache = createCache(),
 tokenCache = createCache(),
 compilerCache = createCache(),
 nonnativeSelectorCache = createCache(),
 sortOrder = function( a, b ) {
 if ( a === b ) {
 hasDuplicate = true; }
 return 0; },

 
 hasOwn = ( {} ).hasOwnProperty,
 arr = [],
 pop = arr.pop,
 pushNative = arr.push,
 push = arr.push,
 slice = arr.slice,

 
 
 indexOf = function( list, elem ) {
 var i = 0,
 len = list.length; for ( ; i < len; i++ ) {
 if ( list[ i ] === elem ) {
 return i; }
 }
 return -1; },

 booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
 "ismap|loop|multiple|open|readonly|required|scoped",

 

 
 whitespace = "[\\x20\\t\\r\\n\\f]",

 
 identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
 "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

 
 attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

 
 "*([*^$|!~]?=)" + whitespace +

 
 
 "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
 whitespace + "*\\]",

 pseudos = ":(" + identifier + ")(?:\\((" +

 
 
 "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

 
 "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

 
 ".*" +
 ")\\)|)",

 
 rwhitespace = new RegExp( whitespace + "+", "g" ),
 rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
 whitespace + "+$", "g" ),

 rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
 rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
 "*" ),
 rdescend = new RegExp( whitespace + "|>" ),

 rpseudo = new RegExp( pseudos ),
 ridentifier = new RegExp( "^" + identifier + "$" ),

 matchExpr = {
 "ID": new RegExp( "^#(" + identifier + ")" ),
 "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
 "TAG": new RegExp( "^(" + identifier + "|[*])" ),
 "ATTR": new RegExp( "^" + attributes ),
 "PSEUDO": new RegExp( "^" + pseudos ),
 "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
 whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
 whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
 "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

 
 
 "needsContext": new RegExp( "^" + whitespace +
 "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
 "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
 },

 rhtml = /HTML$/i,
 rinputs = /^(?:input|select|textarea|button)$/i,
 rheader = /^h\d$/i,

 rnative = /^[^{]+\{\s*\[native \w/,

 
 rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

 rsibling = /[+~]/,

 
 
 runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
 funescape = function( escape, nonHex ) {
 var high = "0x" + escape.slice( 1 ) - 0x10000; return nonHex ?

 
 nonHex :

 
 
 
 
 high < 0 ?
 String.fromCharCode( high + 0x10000 ) :
 String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 ); },

 
 
 rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
 fcssescape = function( ch, asCodePoint ) {
 if ( asCodePoint ) {

 
 if ( ch === "\0" ) {
 return "\uFFFD"; }

 
 return ch.slice( 0, -1 ) + "\\" +
 ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " "; }

 
 return "\\" + ch; },

 
 
 
 
 unloadHandler = function() {
 setDocument(); },

 inDisabledFieldset = addCombinator(
 function( elem ) {
 return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset"; },
 { dir: "parentNode", next: "legend" }
 );try {
 push.apply(
 ( arr = slice.call( preferredDoc.childNodes ) ),
 preferredDoc.childNodes
 );    arr[ preferredDoc.childNodes.length ].nodeType;} catch ( e ) {
 push = { apply: arr.length ?

 
 function( target, els ) {
 pushNative.apply( target, slice.call( els ) ); } :

 
 
 function( target, els ) {
 var j = target.length,
 i = 0;  while ( ( target[ j++ ] = els[ i++ ] ) ) {}
 target.length = j - 1; }
 };}

function Sizzle( selector, context, results, seed ) {
 var m, i, elem, nid, match, groups, newSelector,
 newContext = context && context.ownerDocument,

 
 nodeType = context ? context.nodeType : 9; results = results || [];  if ( typeof selector !== "string" || !selector ||
 nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

 return results; }

 
 if ( !seed ) {
 setDocument( context ); context = context || document; if ( documentIsHTML ) {

 
 
 if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

 
 if ( ( m = match[ 1 ] ) ) {

 
 if ( nodeType === 9 ) {
 if ( ( elem = context.getElementById( m ) ) ) {

 
 
 
 if ( elem.id === m ) {
 results.push( elem ); return results; }
 } else {
 return results; }

 
 } else {

 
 
 
 if ( newContext && ( elem = newContext.getElementById( m ) ) &&
 contains( context, elem ) &&
 elem.id === m ) {

 results.push( elem ); return results; }
 }

 
 } else if ( match[ 2 ] ) {
 push.apply( results, context.getElementsByTagName( selector ) ); return results;  } else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
 context.getElementsByClassName ) {

 push.apply( results, context.getElementsByClassName( m ) ); return results; }
 }

 
 if ( support.qsa &&
 !nonnativeSelectorCache[ selector + " " ] &&
 ( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

 
 
 ( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

 newSelector = selector; newContext = context;        if ( nodeType === 1 &&
 ( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

 
 newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
 context;   if ( newContext !== context || !support.scope ) {

 
 if ( ( nid = context.getAttribute( "id" ) ) ) {
 nid = nid.replace( rcssescape, fcssescape ); } else {
 context.setAttribute( "id", ( nid = expando ) ); }
 }

 
 groups = tokenize( selector ); i = groups.length; while ( i-- ) {
 groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
 toSelector( groups[ i ] ); }
 newSelector = groups.join( "," ); }

 try {
 push.apply( results,
 newContext.querySelectorAll( newSelector )
 ); return results; } catch ( qsaError ) {
 nonnativeSelectorCache( selector, true ); } finally {
 if ( nid === expando ) {
 context.removeAttribute( "id" ); }
 }
 }
 }
 }

 
 return select( selector.replace( rtrim, "$1" ), context, results, seed );}


function createCache() {
 var keys = []; function cache( key, value ) {

 
 if ( keys.push( key + " " ) > Expr.cacheLength ) {

 
 delete cache[ keys.shift() ]; }
 return ( cache[ key + " " ] = value ); }
 return cache;}


function markFunction( fn ) {
 fn[ expando ] = true; return fn;}


function assert( fn ) {
 var el = document.createElement( "fieldset" ); try {
 return !!fn( el ); } catch ( e ) {
 return false; } finally {

 
 if ( el.parentNode ) {
 el.parentNode.removeChild( el ); }

 
 el = null; }
}


function addHandle( attrs, handler ) {
 var arr = attrs.split( "|" ),
 i = arr.length; while ( i-- ) {
 Expr.attrHandle[ arr[ i ] ] = handler; }
}


function siblingCheck( a, b ) {
 var cur = b && a,
 diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
 a.sourceIndex - b.sourceIndex;  if ( diff ) {
 return diff; }

 
 if ( cur ) {
 while ( ( cur = cur.nextSibling ) ) {
 if ( cur === b ) {
 return -1; }
 }
 }

 return a ? 1 : -1;}


function createInputPseudo( type ) {
 return function( elem ) {
 var name = elem.nodeName.toLowerCase(); return name === "input" && elem.type === type; };}


function createButtonPseudo( type ) {
 return function( elem ) {
 var name = elem.nodeName.toLowerCase(); return ( name === "input" || name === "button" ) && elem.type === type; };}


function createDisabledPseudo( disabled ) {

 
 return function( elem ) {

 
 
 
 if ( "form" in elem ) {

 
 
 
 
 
 
 
 if ( elem.parentNode && elem.disabled === false ) {

 
 if ( "label" in elem ) {
 if ( "label" in elem.parentNode ) {
 return elem.parentNode.disabled === disabled; } else {
 return elem.disabled === disabled; }
 }

 
 
 return elem.isDisabled === disabled ||

 
 
 elem.isDisabled !== !disabled &&
 inDisabledFieldset( elem ) === disabled; }

 return elem.disabled === disabled;    } else if ( "label" in elem ) {
 return elem.disabled === disabled; }

 
 return false; };}


function createPositionalPseudo( fn ) {
 return markFunction( function( argument ) {
 argument = +argument; return markFunction( function( seed, matches ) {
 var j,
 matchIndexes = fn( [], seed.length, argument ),
 i = matchIndexes.length;  while ( i-- ) {
 if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
 seed[ j ] = !( matches[ j ] = seed[ j ] ); }
 }
 } ); } );}


function testContext( context ) {
 return context && typeof context.getElementsByTagName !== "undefined" && context;}


support = Sizzle.support = {};isXML = Sizzle.isXML = function( elem ) {
 var namespace = elem.namespaceURI,
 docElem = ( elem.ownerDocument || elem ).documentElement;    return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );};setDocument = Sizzle.setDocument = function( node ) {
 var hasCompare, subWindow,
 doc = node ? node.ownerDocument || node : preferredDoc;      if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
 return document; }

 
 document = doc; docElem = document.documentElement; documentIsHTML = !isXML( document );       if ( preferredDoc != document &&
 ( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

 
 if ( subWindow.addEventListener ) {
 subWindow.addEventListener( "unload", unloadHandler, false );  } else if ( subWindow.attachEvent ) {
 subWindow.attachEvent( "onunload", unloadHandler ); }
 }

 
 
 
 
 
 support.scope = assert( function( el ) {
 docElem.appendChild( el ).appendChild( document.createElement( "div" ) ); return typeof el.querySelectorAll !== "undefined" &&
 !el.querySelectorAll( ":scope fieldset div" ).length; } );     support.attributes = assert( function( el ) {
 el.className = "i"; return !el.getAttribute( "className" ); } );   support.getElementsByTagName = assert( function( el ) {
 el.appendChild( document.createComment( "" ) ); return !el.getElementsByTagName( "*" ).length; } );  support.getElementsByClassName = rnative.test( document.getElementsByClassName );     support.getById = assert( function( el ) {
 docElem.appendChild( el ).id = expando; return !document.getElementsByName || !document.getElementsByName( expando ).length; } );  if ( support.getById ) {
 Expr.filter[ "ID" ] = function( id ) {
 var attrId = id.replace( runescape, funescape ); return function( elem ) {
 return elem.getAttribute( "id" ) === attrId; }; }; Expr.find[ "ID" ] = function( id, context ) {
 if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
 var elem = context.getElementById( id ); return elem ? [ elem ] : []; }
 }; } else {
 Expr.filter[ "ID" ] = function( id ) {
 var attrId = id.replace( runescape, funescape ); return function( elem ) {
 var node = typeof elem.getAttributeNode !== "undefined" &&
 elem.getAttributeNode( "id" ); return node && node.value === attrId; }; };   Expr.find[ "ID" ] = function( id, context ) {
 if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
 var node, i, elems,
 elem = context.getElementById( id ); if ( elem ) {

 
 node = elem.getAttributeNode( "id" ); if ( node && node.value === id ) {
 return [ elem ]; }

 
 elems = context.getElementsByName( id ); i = 0; while ( ( elem = elems[ i++ ] ) ) {
 node = elem.getAttributeNode( "id" ); if ( node && node.value === id ) {
 return [ elem ]; }
 }
 }

 return []; }
 }; }

 
 Expr.find[ "TAG" ] = support.getElementsByTagName ?
 function( tag, context ) {
 if ( typeof context.getElementsByTagName !== "undefined" ) {
 return context.getElementsByTagName( tag );  } else if ( support.qsa ) {
 return context.querySelectorAll( tag ); }
 } :

 function( tag, context ) {
 var elem,
 tmp = [],
 i = 0,

 
 results = context.getElementsByTagName( tag );  if ( tag === "*" ) {
 while ( ( elem = results[ i++ ] ) ) {
 if ( elem.nodeType === 1 ) {
 tmp.push( elem ); }
 }

 return tmp; }
 return results; };  Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
 if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
 return context.getElementsByClassName( className ); }
 };    rbuggyMatches = [];      rbuggyQSA = []; if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

 
 
 assert( function( el ) {

 var input;      docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
 "<select id='" + expando + "-\r\\' msallowcapture=''>" +
 "<option selected=''></option></select>";     if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
 rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" ); }

 
 
 if ( !el.querySelectorAll( "[selected]" ).length ) {
 rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" ); }

 
 if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
 rbuggyQSA.push( "~=" ); }

 
 
 
 
 
 input = document.createElement( "input" ); input.setAttribute( "name", "" ); el.appendChild( input ); if ( !el.querySelectorAll( "[name='']" ).length ) {
 rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
 whitespace + "*(?:''|\"\")" ); }

 
 
 
 if ( !el.querySelectorAll( ":checked" ).length ) {
 rbuggyQSA.push( ":checked" ); }

 
 
 
 if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
 rbuggyQSA.push( ".#.+[+~]" ); }

 
 
 el.querySelectorAll( "\\\f" ); rbuggyQSA.push( "[\\r\\n\\f]" ); } ); assert( function( el ) {
 el.innerHTML = "<a href='' disabled='disabled'></a>" +
 "<select disabled='disabled'><option/></select>";   var input = document.createElement( "input" ); input.setAttribute( "type", "hidden" ); el.appendChild( input ).setAttribute( "name", "D" );   if ( el.querySelectorAll( "[name=d]" ).length ) {
 rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" ); }

 
 
 if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
 rbuggyQSA.push( ":enabled", ":disabled" ); }

 
 
 docElem.appendChild( el ).disabled = true; if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
 rbuggyQSA.push( ":enabled", ":disabled" ); }

 
 
 el.querySelectorAll( "*,:x" ); rbuggyQSA.push( ",.*:" ); } ); }

 if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
 docElem.webkitMatchesSelector ||
 docElem.mozMatchesSelector ||
 docElem.oMatchesSelector ||
 docElem.msMatchesSelector ) ) ) ) {

 assert( function( el ) {

 
 
 support.disconnectedMatch = matches.call( el, "*" );   matches.call( el, "[s!='']:x" ); rbuggyMatches.push( "!=", pseudos ); } ); }

 rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) ); rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );  hasCompare = rnative.test( docElem.compareDocumentPosition );    contains = hasCompare || rnative.test( docElem.contains ) ?
 function( a, b ) {
 var adown = a.nodeType === 9 ? a.documentElement : a,
 bup = b && b.parentNode; return a === bup || !!( bup && bup.nodeType === 1 && (
 adown.contains ?
 adown.contains( bup ) :
 a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
 ) ); } :
 function( a, b ) {
 if ( b ) {
 while ( ( b = b.parentNode ) ) {
 if ( b === a ) {
 return true; }
 }
 }
 return false; };   sortOrder = hasCompare ?
 function( a, b ) {

 
 if ( a === b ) {
 hasDuplicate = true; return 0; }

 
 var compare = !a.compareDocumentPosition - !b.compareDocumentPosition; if ( compare ) {
 return compare; }

 
 
 
 
 
 compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
 a.compareDocumentPosition( b ) :

 
 1;  if ( compare & 1 ||
 ( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

 
 
 
 
 
 if ( a == document || a.ownerDocument == preferredDoc &&
 contains( preferredDoc, a ) ) {
 return -1; }

 
 
 
 
 if ( b == document || b.ownerDocument == preferredDoc &&
 contains( preferredDoc, b ) ) {
 return 1; }

 
 return sortInput ?
 ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
 0; }

 return compare & 4 ? -1 : 1; } :
 function( a, b ) {

 
 if ( a === b ) {
 hasDuplicate = true; return 0; }

 var cur,
 i = 0,
 aup = a.parentNode,
 bup = b.parentNode,
 ap = [ a ],
 bp = [ b ];  if ( !aup || !bup ) {

 
 
 
 
 return a == document ? -1 :
 b == document ? 1 :
 
 aup ? -1 :
 bup ? 1 :
 sortInput ?
 ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
 0;  } else if ( aup === bup ) {
 return siblingCheck( a, b ); }

 
 cur = a; while ( ( cur = cur.parentNode ) ) {
 ap.unshift( cur ); }
 cur = b; while ( ( cur = cur.parentNode ) ) {
 bp.unshift( cur ); }

 
 while ( ap[ i ] === bp[ i ] ) {
 i++; }

 return i ?

 
 siblingCheck( ap[ i ], bp[ i ] ) :

 
 
 
 
 
 ap[ i ] == preferredDoc ? -1 :
 bp[ i ] == preferredDoc ? 1 :
 
 0; }; return document;};Sizzle.matches = function( expr, elements ) {
 return Sizzle( expr, null, null, elements );};Sizzle.matchesSelector = function( elem, expr ) {
 setDocument( elem ); if ( support.matchesSelector && documentIsHTML &&
 !nonnativeSelectorCache[ expr + " " ] &&
 ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
 ( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

 try {
 var ret = matches.call( elem, expr );  if ( ret || support.disconnectedMatch ||

 
 
 elem.document && elem.document.nodeType !== 11 ) {
 return ret; }
 } catch ( e ) {
 nonnativeSelectorCache( expr, true ); }
 }

 return Sizzle( expr, document, null, [ elem ] ).length > 0;};Sizzle.contains = function( context, elem ) {

 
 
 
 
 
 if ( ( context.ownerDocument || context ) != document ) {
 setDocument( context ); }
 return contains( context, elem );};Sizzle.attr = function( elem, name ) {

 
 
 
 
 
 if ( ( elem.ownerDocument || elem ) != document ) {
 setDocument( elem ); }

 var fn = Expr.attrHandle[ name.toLowerCase() ],

 
 val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
 fn( elem, name, !documentIsHTML ) :
 undefined; return val !== undefined ?
 val :
 support.attributes || !documentIsHTML ?
 elem.getAttribute( name ) :
 ( val = elem.getAttributeNode( name ) ) && val.specified ?
 val.value :
 null;};Sizzle.escape = function( sel ) {
 return ( sel + "" ).replace( rcssescape, fcssescape );};Sizzle.error = function( msg ) {
 throw new Error( "Syntax error, unrecognized expression: " + msg );};Sizzle.uniqueSort = function( results ) {
 var elem,
 duplicates = [],
 j = 0,
 i = 0;  hasDuplicate = !support.detectDuplicates; sortInput = !support.sortStable && results.slice( 0 ); results.sort( sortOrder ); if ( hasDuplicate ) {
 while ( ( elem = results[ i++ ] ) ) {
 if ( elem === results[ i ] ) {
 j = duplicates.push( i ); }
 }
 while ( j-- ) {
 results.splice( duplicates[ j ], 1 ); }
 }

 
 
 sortInput = null; return results;};getText = Sizzle.getText = function( elem ) {
 var node,
 ret = "",
 i = 0,
 nodeType = elem.nodeType; if ( !nodeType ) {

 
 while ( ( node = elem[ i++ ] ) ) {

 
 ret += getText( node ); }
 } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

 
 
 if ( typeof elem.textContent === "string" ) {
 return elem.textContent; } else {

 
 for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
 ret += getText( elem ); }
 }
 } else if ( nodeType === 3 || nodeType === 4 ) {
 return elem.nodeValue; }

 

 return ret;};Expr = Sizzle.selectors = {

 
 cacheLength: 50,

 createPseudo: markFunction,

 match: matchExpr,

 attrHandle: {},

 find: {},

 relative: {
 ">": { dir: "parentNode", first: true },
 " ": { dir: "parentNode" },
 "+": { dir: "previousSibling", first: true },
 "~": { dir: "previousSibling" }
 },

 preFilter: {
 "ATTR": function( match ) {
 match[ 1 ] = match[ 1 ].replace( runescape, funescape );  match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
 match[ 5 ] || "" ).replace( runescape, funescape ); if ( match[ 2 ] === "~=" ) {
 match[ 3 ] = " " + match[ 3 ] + " "; }

 return match.slice( 0, 4 ); },

 "CHILD": function( match ) {

 
 match[ 1 ] = match[ 1 ].toLowerCase(); if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

 
 if ( !match[ 3 ] ) {
 Sizzle.error( match[ 0 ] ); }

 
 
 match[ 4 ] = +( match[ 4 ] ?
 match[ 5 ] + ( match[ 6 ] || 1 ) :
 2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) ); match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );  } else if ( match[ 3 ] ) {
 Sizzle.error( match[ 0 ] ); }

 return match; },

 "PSEUDO": function( match ) {
 var excess,
 unquoted = !match[ 6 ] && match[ 2 ]; if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
 return null; }

 
 if ( match[ 3 ] ) {
 match[ 2 ] = match[ 4 ] || match[ 5 ] || "";  } else if ( unquoted && rpseudo.test( unquoted ) &&

 
 ( excess = tokenize( unquoted, true ) ) &&

 
 ( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

 
 match[ 0 ] = match[ 0 ].slice( 0, excess ); match[ 2 ] = unquoted.slice( 0, excess ); }

 
 return match.slice( 0, 3 ); }
 },

 filter: {

 "TAG": function( nodeNameSelector ) {
 var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase(); return nodeNameSelector === "*" ?
 function() {
 return true; } :
 function( elem ) {
 return elem.nodeName && elem.nodeName.toLowerCase() === nodeName; }; },

 "CLASS": function( className ) {
 var pattern = classCache[ className + " " ]; return pattern ||
 ( pattern = new RegExp( "(^|" + whitespace +
 ")" + className + "(" + whitespace + "|$)" ) ) && classCache(
 className, function( elem ) {
 return pattern.test(
 typeof elem.className === "string" && elem.className ||
 typeof elem.getAttribute !== "undefined" &&
 elem.getAttribute( "class" ) ||
 ""
 ); } ); },

 "ATTR": function( name, operator, check ) {
 return function( elem ) {
 var result = Sizzle.attr( elem, name ); if ( result == null ) {
 return operator === "!="; }
 if ( !operator ) {
 return true; }

 result += "";  return operator === "=" ? result === check :
 operator === "!=" ? result !== check :
 operator === "^=" ? check && result.indexOf( check ) === 0 :
 operator === "*=" ? check && result.indexOf( check ) > -1 :
 operator === "$=" ? check && result.slice( -check.length ) === check :
 operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
 operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
 false;  }; },

 "CHILD": function( type, what, _argument, first, last ) {
 var simple = type.slice( 0, 3 ) !== "nth",
 forward = type.slice( -4 ) !== "last",
 ofType = what === "of-type"; return first === 1 && last === 0 ?

 
 function( elem ) {
 return !!elem.parentNode; } :

 function( elem, _context, xml ) {
 var cache, uniqueCache, outerCache, node, nodeIndex, start,
 dir = simple !== forward ? "nextSibling" : "previousSibling",
 parent = elem.parentNode,
 name = ofType && elem.nodeName.toLowerCase(),
 useCache = !xml && !ofType,
 diff = false; if ( parent ) {

 
 if ( simple ) {
 while ( dir ) {
 node = elem; while ( ( node = node[ dir ] ) ) {
 if ( ofType ?
 node.nodeName.toLowerCase() === name :
 node.nodeType === 1 ) {

 return false; }
 }

 
 start = dir = type === "only" && !start && "nextSibling"; }
 return true; }

 start = [ forward ? parent.firstChild : parent.lastChild ];  if ( forward && useCache ) {

 

 
 node = parent; outerCache = node[ expando ] || ( node[ expando ] = {} );   uniqueCache = outerCache[ node.uniqueID ] ||
 ( outerCache[ node.uniqueID ] = {} ); cache = uniqueCache[ type ] || []; nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ]; diff = nodeIndex && cache[ 2 ]; node = nodeIndex && parent.childNodes[ nodeIndex ]; while ( ( node = ++nodeIndex && node && node[ dir ] ||

 
 ( diff = nodeIndex = 0 ) || start.pop() ) ) {

 
 if ( node.nodeType === 1 && ++diff && node === elem ) {
 uniqueCache[ type ] = [ dirruns, nodeIndex, diff ]; break; }
 }

 } else {

 
 if ( useCache ) {

 
 node = elem; outerCache = node[ expando ] || ( node[ expando ] = {} );   uniqueCache = outerCache[ node.uniqueID ] ||
 ( outerCache[ node.uniqueID ] = {} ); cache = uniqueCache[ type ] || []; nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ]; diff = nodeIndex; }

 
 
 if ( diff === false ) {

 
 while ( ( node = ++nodeIndex && node && node[ dir ] ||
 ( diff = nodeIndex = 0 ) || start.pop() ) ) {

 if ( ( ofType ?
 node.nodeName.toLowerCase() === name :
 node.nodeType === 1 ) &&
 ++diff ) {

 
 if ( useCache ) {
 outerCache = node[ expando ] ||
 ( node[ expando ] = {} );   uniqueCache = outerCache[ node.uniqueID ] ||
 ( outerCache[ node.uniqueID ] = {} ); uniqueCache[ type ] = [ dirruns, diff ]; }

 if ( node === elem ) {
 break; }
 }
 }
 }
 }

 
 diff -= last; return diff === first || ( diff % first === 0 && diff / first >= 0 ); }
 }; },

 "PSEUDO": function( pseudo, argument ) {

 
 
 
 
 var args,
 fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
 Sizzle.error( "unsupported pseudo: " + pseudo );    if ( fn[ expando ] ) {
 return fn( argument ); }

 
 if ( fn.length > 1 ) {
 args = [ pseudo, pseudo, "", argument ]; return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
 markFunction( function( seed, matches ) {
 var idx,
 matched = fn( seed, argument ),
 i = matched.length; while ( i-- ) {
 idx = indexOf( seed, matched[ i ] ); seed[ idx ] = !( matches[ idx ] = matched[ i ] ); }
 } ) :
 function( elem ) {
 return fn( elem, 0, args ); }; }

 return fn; }
 },

 pseudos: {

 
 "not": markFunction( function( selector ) {

 
 
 
 var input = [],
 results = [],
 matcher = compile( selector.replace( rtrim, "$1" ) ); return matcher[ expando ] ?
 markFunction( function( seed, matches, _context, xml ) {
 var elem,
 unmatched = matcher( seed, null, xml, [] ),
 i = seed.length;  while ( i-- ) {
 if ( ( elem = unmatched[ i ] ) ) {
 seed[ i ] = !( matches[ i ] = elem ); }
 }
 } ) :
 function( elem, _context, xml ) {
 input[ 0 ] = elem; matcher( input, null, xml, results );  input[ 0 ] = null; return !results.pop(); }; } ),

 "has": markFunction( function( selector ) {
 return function( elem ) {
 return Sizzle( selector, elem ).length > 0; }; } ),

 "contains": markFunction( function( text ) {
 text = text.replace( runescape, funescape ); return function( elem ) {
 return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1; }; } ),

 
 
 
 
 
 
 
 "lang": markFunction( function( lang ) {

 
 if ( !ridentifier.test( lang || "" ) ) {
 Sizzle.error( "unsupported lang: " + lang ); }
 lang = lang.replace( runescape, funescape ).toLowerCase(); return function( elem ) {
 var elemLang; do {
 if ( ( elemLang = documentIsHTML ?
 elem.lang :
 elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

 elemLang = elemLang.toLowerCase(); return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0; }
 } while ( ( elem = elem.parentNode ) && elem.nodeType === 1 ); return false; }; } ),

 
 "target": function( elem ) {
 var hash = window.location && window.location.hash; return hash && hash.slice( 1 ) === elem.id; },

 "root": function( elem ) {
 return elem === docElem; },

 "focus": function( elem ) {
 return elem === document.activeElement &&
 ( !document.hasFocus || document.hasFocus() ) &&
 !!( elem.type || elem.href || ~elem.tabIndex ); },

 
 "enabled": createDisabledPseudo( false ),
 "disabled": createDisabledPseudo( true ),

 "checked": function( elem ) {

 
 
 var nodeName = elem.nodeName.toLowerCase(); return ( nodeName === "input" && !!elem.checked ) ||
 ( nodeName === "option" && !!elem.selected ); },

 "selected": function( elem ) {

 
 
 if ( elem.parentNode ) {
 
 elem.parentNode.selectedIndex; }

 return elem.selected === true; },

 
 "empty": function( elem ) {

 
 
 
 
 for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
 if ( elem.nodeType < 6 ) {
 return false; }
 }
 return true; },

 "parent": function( elem ) {
 return !Expr.pseudos[ "empty" ]( elem ); },

 
 "header": function( elem ) {
 return rheader.test( elem.nodeName ); },

 "input": function( elem ) {
 return rinputs.test( elem.nodeName ); },

 "button": function( elem ) {
 var name = elem.nodeName.toLowerCase(); return name === "input" && elem.type === "button" || name === "button"; },

 "text": function( elem ) {
 var attr; return elem.nodeName.toLowerCase() === "input" &&
 elem.type === "text" &&

 
 
 ( ( attr = elem.getAttribute( "type" ) ) == null ||
 attr.toLowerCase() === "text" ); },

 
 "first": createPositionalPseudo( function() {
 return [ 0 ]; } ),

 "last": createPositionalPseudo( function( _matchIndexes, length ) {
 return [ length - 1 ]; } ),

 "eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
 return [ argument < 0 ? argument + length : argument ]; } ),

 "even": createPositionalPseudo( function( matchIndexes, length ) {
 var i = 0; for ( ; i < length; i += 2 ) {
 matchIndexes.push( i ); }
 return matchIndexes; } ),

 "odd": createPositionalPseudo( function( matchIndexes, length ) {
 var i = 1; for ( ; i < length; i += 2 ) {
 matchIndexes.push( i ); }
 return matchIndexes; } ),

 "lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
 var i = argument < 0 ?
 argument + length :
 argument > length ?
 length :
 argument; for ( ; --i >= 0; ) {
 matchIndexes.push( i ); }
 return matchIndexes; } ),

 "gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
 var i = argument < 0 ? argument + length : argument; for ( ; ++i < length; ) {
 matchIndexes.push( i ); }
 return matchIndexes; } )
 }
};Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
 Expr.pseudos[ i ] = createInputPseudo( i );}
for ( i in { submit: true, reset: true } ) {
 Expr.pseudos[ i ] = createButtonPseudo( i );}


function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;Expr.setFilters = new setFilters();tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
 var matched, match, tokens, type,
 soFar, groups, preFilters,
 cached = tokenCache[ selector + " " ]; if ( cached ) {
 return parseOnly ? 0 : cached.slice( 0 ); }

 soFar = selector; groups = []; preFilters = Expr.preFilter; while ( soFar ) {

 
 if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
 if ( match ) {

 
 soFar = soFar.slice( match[ 0 ].length ) || soFar; }
 groups.push( ( tokens = [] ) ); }

 matched = false;  if ( ( match = rcombinators.exec( soFar ) ) ) {
 matched = match.shift(); tokens.push( {
 value: matched,

 
 type: match[ 0 ].replace( rtrim, " " )
 } ); soFar = soFar.slice( matched.length ); }

 
 for ( type in Expr.filter ) {
 if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
 ( match = preFilters[ type ]( match ) ) ) ) {
 matched = match.shift(); tokens.push( {
 value: matched,
 type: type,
 matches: match
 } ); soFar = soFar.slice( matched.length ); }
 }

 if ( !matched ) {
 break; }
 }

 
 
 
 return parseOnly ?
 soFar.length :
 soFar ?
 Sizzle.error( selector ) :

 
 tokenCache( selector, groups ).slice( 0 );};function toSelector( tokens ) {
 var i = 0,
 len = tokens.length,
 selector = ""; for ( ; i < len; i++ ) {
 selector += tokens[ i ].value; }
 return selector;}

function addCombinator( matcher, combinator, base ) {
 var dir = combinator.dir,
 skip = combinator.next,
 key = skip || dir,
 checkNonElements = base && key === "parentNode",
 doneName = done++; return combinator.first ?

 
 function( elem, context, xml ) {
 while ( ( elem = elem[ dir ] ) ) {
 if ( elem.nodeType === 1 || checkNonElements ) {
 return matcher( elem, context, xml ); }
 }
 return false; } :

 
 function( elem, context, xml ) {
 var oldCache, uniqueCache, outerCache,
 newCache = [ dirruns, doneName ];  if ( xml ) {
 while ( ( elem = elem[ dir ] ) ) {
 if ( elem.nodeType === 1 || checkNonElements ) {
 if ( matcher( elem, context, xml ) ) {
 return true; }
 }
 }
 } else {
 while ( ( elem = elem[ dir ] ) ) {
 if ( elem.nodeType === 1 || checkNonElements ) {
 outerCache = elem[ expando ] || ( elem[ expando ] = {} );   uniqueCache = outerCache[ elem.uniqueID ] ||
 ( outerCache[ elem.uniqueID ] = {} ); if ( skip && skip === elem.nodeName.toLowerCase() ) {
 elem = elem[ dir ] || elem; } else if ( ( oldCache = uniqueCache[ key ] ) &&
 oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

 
 return ( newCache[ 2 ] = oldCache[ 2 ] ); } else {

 
 uniqueCache[ key ] = newCache;  if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
 return true; }
 }
 }
 }
 }
 return false; };}

function elementMatcher( matchers ) {
 return matchers.length > 1 ?
 function( elem, context, xml ) {
 var i = matchers.length; while ( i-- ) {
 if ( !matchers[ i ]( elem, context, xml ) ) {
 return false; }
 }
 return true; } :
 matchers[ 0 ];}

function multipleContexts( selector, contexts, results ) {
 var i = 0,
 len = contexts.length; for ( ; i < len; i++ ) {
 Sizzle( selector, contexts[ i ], results ); }
 return results;}

function condense( unmatched, map, filter, context, xml ) {
 var elem,
 newUnmatched = [],
 i = 0,
 len = unmatched.length,
 mapped = map != null; for ( ; i < len; i++ ) {
 if ( ( elem = unmatched[ i ] ) ) {
 if ( !filter || filter( elem, context, xml ) ) {
 newUnmatched.push( elem ); if ( mapped ) {
 map.push( i ); }
 }
 }
 }

 return newUnmatched;}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
 if ( postFilter && !postFilter[ expando ] ) {
 postFilter = setMatcher( postFilter ); }
 if ( postFinder && !postFinder[ expando ] ) {
 postFinder = setMatcher( postFinder, postSelector ); }
 return markFunction( function( seed, results, context, xml ) {
 var temp, i, elem,
 preMap = [],
 postMap = [],
 preexisting = results.length,

 
 elems = seed || multipleContexts(
 selector || "*",
 context.nodeType ? [ context ] : context,
 []
 ),

 
 matcherIn = preFilter && ( seed || !selector ) ?
 condense( elems, preMap, preFilter, context, xml ) :
 elems,

 matcherOut = matcher ?

 
 postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

 
 [] :

 
 results :
 matcherIn;  if ( matcher ) {
 matcher( matcherIn, matcherOut, context, xml ); }

 
 if ( postFilter ) {
 temp = condense( matcherOut, postMap ); postFilter( temp, [], context, xml );  i = temp.length; while ( i-- ) {
 if ( ( elem = temp[ i ] ) ) {
 matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem ); }
 }
 }

 if ( seed ) {
 if ( postFinder || preFilter ) {
 if ( postFinder ) {

 
 temp = []; i = matcherOut.length; while ( i-- ) {
 if ( ( elem = matcherOut[ i ] ) ) {

 
 temp.push( ( matcherIn[ i ] = elem ) ); }
 }
 postFinder( null, ( matcherOut = [] ), temp, xml ); }

 
 i = matcherOut.length; while ( i-- ) {
 if ( ( elem = matcherOut[ i ] ) &&
 ( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

 seed[ temp ] = !( results[ temp ] = elem ); }
 }
 }

 
 } else {
 matcherOut = condense(
 matcherOut === results ?
 matcherOut.splice( preexisting, matcherOut.length ) :
 matcherOut
 ); if ( postFinder ) {
 postFinder( null, results, matcherOut, xml ); } else {
 push.apply( results, matcherOut ); }
 }
 } );}

function matcherFromTokens( tokens ) {
 var checkContext, matcher, j,
 len = tokens.length,
 leadingRelative = Expr.relative[ tokens[ 0 ].type ],
 implicitRelative = leadingRelative || Expr.relative[ " " ],
 i = leadingRelative ? 1 : 0,

 
 matchContext = addCombinator( function( elem ) {
 return elem === checkContext; }, implicitRelative, true ),
 matchAnyContext = addCombinator( function( elem ) {
 return indexOf( checkContext, elem ) > -1; }, implicitRelative, true ),
 matchers = [ function( elem, context, xml ) {
 var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
 ( checkContext = context ).nodeType ?
 matchContext( elem, context, xml ) :
 matchAnyContext( elem, context, xml ) );  checkContext = null; return ret; } ]; for ( ; i < len; i++ ) {
 if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
 matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ]; } else {
 matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );  if ( matcher[ expando ] ) {

 
 j = ++i; for ( ; j < len; j++ ) {
 if ( Expr.relative[ tokens[ j ].type ] ) {
 break; }
 }
 return setMatcher(
 i > 1 && elementMatcher( matchers ),
 i > 1 && toSelector(

 
 tokens
 .slice( 0, i - 1 )
 .concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
 ).replace( rtrim, "$1" ),
 matcher,
 i < j && matcherFromTokens( tokens.slice( i, j ) ),
 j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
 j < len && toSelector( tokens )
 ); }
 matchers.push( matcher ); }
 }

 return elementMatcher( matchers );}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
 var bySet = setMatchers.length > 0,
 byElement = elementMatchers.length > 0,
 superMatcher = function( seed, context, xml, results, outermost ) {
 var elem, j, matcher,
 matchedCount = 0,
 i = "0",
 unmatched = seed && [],
 setMatched = [],
 contextBackup = outermostContext,

 
 elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

 
 dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
 len = elems.length; if ( outermost ) {

 
 
 
 
 outermostContext = context == document || context || outermost; }

 
 
 
 for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
 if ( byElement && elem ) {
 j = 0;     if ( !context && elem.ownerDocument != document ) {
 setDocument( elem ); xml = !documentIsHTML; }
 while ( ( matcher = elementMatchers[ j++ ] ) ) {
 if ( matcher( elem, context || document, xml ) ) {
 results.push( elem ); break; }
 }
 if ( outermost ) {
 dirruns = dirrunsUnique; }
 }

 
 if ( bySet ) {

 
 if ( ( elem = !matcher && elem ) ) {
 matchedCount--; }

 
 if ( seed ) {
 unmatched.push( elem ); }
 }
 }

 
 
 matchedCount += i;        if ( bySet && i !== matchedCount ) {
 j = 0; while ( ( matcher = setMatchers[ j++ ] ) ) {
 matcher( unmatched, setMatched, context, xml ); }

 if ( seed ) {

 
 if ( matchedCount > 0 ) {
 while ( i-- ) {
 if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
 setMatched[ i ] = pop.call( results ); }
 }
 }

 
 setMatched = condense( setMatched ); }

 
 push.apply( results, setMatched );  if ( outermost && !seed && setMatched.length > 0 &&
 ( matchedCount + setMatchers.length ) > 1 ) {

 Sizzle.uniqueSort( results ); }
 }

 
 if ( outermost ) {
 dirruns = dirrunsUnique; outermostContext = contextBackup; }

 return unmatched; }; return bySet ?
 markFunction( superMatcher ) :
 superMatcher;}

compile = Sizzle.compile = function( selector, match  ) {
 var i,
 setMatchers = [],
 elementMatchers = [],
 cached = compilerCache[ selector + " " ]; if ( !cached ) {

 
 if ( !match ) {
 match = tokenize( selector ); }
 i = match.length; while ( i-- ) {
 cached = matcherFromTokens( match[ i ] ); if ( cached[ expando ] ) {
 setMatchers.push( cached ); } else {
 elementMatchers.push( cached ); }
 }

 
 cached = compilerCache(
 selector,
 matcherFromGroupMatchers( elementMatchers, setMatchers )
 );  cached.selector = selector; }
 return cached;};select = Sizzle.select = function( selector, context, results, seed ) {
 var i, tokens, token, type, find,
 compiled = typeof selector === "function" && selector,
 match = !seed && tokenize( ( selector = compiled.selector || selector ) ); results = results || [];   if ( match.length === 1 ) {

 
 tokens = match[ 0 ] = match[ 0 ].slice( 0 ); if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
 context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

 context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
 .replace( runescape, funescape ), context ) || [] )[ 0 ]; if ( !context ) {
 return results;  } else if ( compiled ) {
 context = context.parentNode; }

 selector = selector.slice( tokens.shift().value.length ); }

 
 i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length; while ( i-- ) {
 token = tokens[ i ];  if ( Expr.relative[ ( type = token.type ) ] ) {
 break; }
 if ( ( find = Expr.find[ type ] ) ) {

 
 if ( ( seed = find(
 token.matches[ 0 ].replace( runescape, funescape ),
 rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
 context
 ) ) ) {

 
 tokens.splice( i, 1 ); selector = seed.length && toSelector( tokens ); if ( !selector ) {
 push.apply( results, seed ); return results; }

 break; }
 }
 }
 }

 
 
 ( compiled || compile( selector, match ) )(
 seed,
 context,
 !documentIsHTML,
 results,
 !context || rsibling.test( selector ) && testContext( context.parentNode ) || context
 ); return results;};support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;support.detectDuplicates = !!hasDuplicate;setDocument();support.sortDetached = assert( function( el ) {

 
 return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;} );if ( !assert( function( el ) {
 el.innerHTML = "<a href='#'></a>"; return el.firstChild.getAttribute( "href" ) === "#";} ) ) {
 addHandle( "type|href|height|width", function( elem, name, isXML ) {
 if ( !isXML ) {
 return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 ); }
 } );}



if ( !support.attributes || !assert( function( el ) {
 el.innerHTML = "<input/>"; el.firstChild.setAttribute( "value", "" ); return el.firstChild.getAttribute( "value" ) === "";} ) ) {
 addHandle( "value", function( elem, _name, isXML ) {
 if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
 return elem.defaultValue; }
 } );}



if ( !assert( function( el ) {
 return el.getAttribute( "disabled" ) == null;} ) ) {
 addHandle( booleans, function( elem, name, isXML ) {
 var val; if ( !isXML ) {
 return elem[ name ] === true ? name.toLowerCase() :
 ( val = elem.getAttributeNode( name ) ) && val.specified ?
 val.value :
 null; }
 } );}

return Sizzle;} )( window );jQuery.find = Sizzle;jQuery.expr = Sizzle.selectors;jQuery.expr[ ":" ] = jQuery.expr.pseudos;jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;jQuery.text = Sizzle.getText;jQuery.isXMLDoc = Sizzle.isXML;jQuery.contains = Sizzle.contains;jQuery.escapeSelector = Sizzle.escape;var dir = function( elem, dir, until ) {
 var matched = [],
 truncate = until !== undefined; while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
 if ( elem.nodeType === 1 ) {
 if ( truncate && jQuery( elem ).is( until ) ) {
 break; }
 matched.push( elem ); }
 }
 return matched;};var siblings = function( n, elem ) {
 var matched = []; for ( ; n; n = n.nextSibling ) {
 if ( n.nodeType === 1 && n !== elem ) {
 matched.push( n ); }
 }

 return matched;};var rneedsContext = jQuery.expr.match.needsContext;function nodeName( elem, name ) {

 return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();};var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );function winnow( elements, qualifier, not ) {
 if ( isFunction( qualifier ) ) {
 return jQuery.grep( elements, function( elem, i ) {
 return !!qualifier.call( elem, i, elem ) !== not; } ); }

 
 if ( qualifier.nodeType ) {
 return jQuery.grep( elements, function( elem ) {
 return ( elem === qualifier ) !== not; } ); }

 
 if ( typeof qualifier !== "string" ) {
 return jQuery.grep( elements, function( elem ) {
 return ( indexOf.call( qualifier, elem ) > -1 ) !== not; } ); }

 
 return jQuery.filter( qualifier, elements, not );}

jQuery.filter = function( expr, elems, not ) {
 var elem = elems[ 0 ]; if ( not ) {
 expr = ":not(" + expr + ")"; }

 if ( elems.length === 1 && elem.nodeType === 1 ) {
 return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : []; }

 return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
 return elem.nodeType === 1; } ) );};jQuery.fn.extend( {
 find: function( selector ) {
 var i, ret,
 len = this.length,
 self = this; if ( typeof selector !== "string" ) {
 return this.pushStack( jQuery( selector ).filter( function() {
 for ( i = 0; i < len; i++ ) {
 if ( jQuery.contains( self[ i ], this ) ) {
 return true; }
 }
 } ) ); }

 ret = this.pushStack( [] ); for ( i = 0; i < len; i++ ) {
 jQuery.find( selector, self[ i ], ret ); }

 return len > 1 ? jQuery.uniqueSort( ret ) : ret; },
 filter: function( selector ) {
 return this.pushStack( winnow( this, selector || [], false ) ); },
 not: function( selector ) {
 return this.pushStack( winnow( this, selector || [], true ) ); },
 is: function( selector ) {
 return !!winnow(
 this,

 
 
 typeof selector === "string" && rneedsContext.test( selector ) ?
 jQuery( selector ) :
 selector || [],
 false
 ).length; }
} );var rootjQuery,

 
 
 
 
 rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

 init = jQuery.fn.init = function( selector, context, root ) {
 var match, elem;  if ( !selector ) {
 return this; }

 
 
 root = root || rootjQuery;  if ( typeof selector === "string" ) {
 if ( selector[ 0 ] === "<" &&
 selector[ selector.length - 1 ] === ">" &&
 selector.length >= 3 ) {

 
 match = [ null, selector, null ]; } else {
 match = rquickExpr.exec( selector ); }

 
 if ( match && ( match[ 1 ] || !context ) ) {

 
 if ( match[ 1 ] ) {
 context = context instanceof jQuery ? context[ 0 ] : context;   jQuery.merge( this, jQuery.parseHTML(
 match[ 1 ],
 context && context.nodeType ? context.ownerDocument || context : document,
 true
 ) );  if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
 for ( match in context ) {

 
 if ( isFunction( this[ match ] ) ) {
 this[ match ]( context[ match ] );  } else {
 this.attr( match, context[ match ] ); }
 }
 }

 return this;  } else {
 elem = document.getElementById( match[ 2 ] ); if ( elem ) {

 
 this[ 0 ] = elem; this.length = 1; }
 return this; }

 
 } else if ( !context || context.jquery ) {
 return ( context || root ).find( selector );   } else {
 return this.constructor( context ).find( selector ); }

 
 } else if ( selector.nodeType ) {
 this[ 0 ] = selector; this.length = 1; return this;   } else if ( isFunction( selector ) ) {
 return root.ready !== undefined ?
 root.ready( selector ) :

 
 selector( jQuery ); }

 return jQuery.makeArray( selector, this ); };init.prototype = jQuery.fn;rootjQuery = jQuery( document );var rparentsprev = /^(?:parents|prev(?:Until|All))/,

 
 guaranteedUnique = {
 children: true,
 contents: true,
 next: true,
 prev: true
 };jQuery.fn.extend( {
 has: function( target ) {
 var targets = jQuery( target, this ),
 l = targets.length; return this.filter( function() {
 var i = 0; for ( ; i < l; i++ ) {
 if ( jQuery.contains( this, targets[ i ] ) ) {
 return true; }
 }
 } ); },

 closest: function( selectors, context ) {
 var cur,
 i = 0,
 l = this.length,
 matched = [],
 targets = typeof selectors !== "string" && jQuery( selectors );  if ( !rneedsContext.test( selectors ) ) {
 for ( ; i < l; i++ ) {
 for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

 
 if ( cur.nodeType < 11 && ( targets ?
 targets.index( cur ) > -1 :

 
 cur.nodeType === 1 &&
 jQuery.find.matchesSelector( cur, selectors ) ) ) {

 matched.push( cur ); break; }
 }
 }
 }

 return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched ); },

 
 index: function( elem ) {

 
 if ( !elem ) {
 return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1; }

 
 if ( typeof elem === "string" ) {
 return indexOf.call( jQuery( elem ), this[ 0 ] ); }

 
 return indexOf.call( this,

 
 elem.jquery ? elem[ 0 ] : elem
 ); },

 add: function( selector, context ) {
 return this.pushStack(
 jQuery.uniqueSort(
 jQuery.merge( this.get(), jQuery( selector, context ) )
 )
 ); },

 addBack: function( selector ) {
 return this.add( selector == null ?
 this.prevObject : this.prevObject.filter( selector )
 ); }
} );function sibling( cur, dir ) {
 while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
 return cur;}

jQuery.each( {
 parent: function( elem ) {
 var parent = elem.parentNode; return parent && parent.nodeType !== 11 ? parent : null; },
 parents: function( elem ) {
 return dir( elem, "parentNode" ); },
 parentsUntil: function( elem, _i, until ) {
 return dir( elem, "parentNode", until ); },
 next: function( elem ) {
 return sibling( elem, "nextSibling" ); },
 prev: function( elem ) {
 return sibling( elem, "previousSibling" ); },
 nextAll: function( elem ) {
 return dir( elem, "nextSibling" ); },
 prevAll: function( elem ) {
 return dir( elem, "previousSibling" ); },
 nextUntil: function( elem, _i, until ) {
 return dir( elem, "nextSibling", until ); },
 prevUntil: function( elem, _i, until ) {
 return dir( elem, "previousSibling", until ); },
 siblings: function( elem ) {
 return siblings( ( elem.parentNode || {} ).firstChild, elem ); },
 children: function( elem ) {
 return siblings( elem.firstChild ); },
 contents: function( elem ) {
 if ( elem.contentDocument != null &&

 
 
 
 getProto( elem.contentDocument ) ) {

 return elem.contentDocument; }

 
 
 
 if ( nodeName( elem, "template" ) ) {
 elem = elem.content || elem; }

 return jQuery.merge( [], elem.childNodes ); }
}, function( name, fn ) {
 jQuery.fn[ name ] = function( until, selector ) {
 var matched = jQuery.map( this, fn, until ); if ( name.slice( -5 ) !== "Until" ) {
 selector = until; }

 if ( selector && typeof selector === "string" ) {
 matched = jQuery.filter( selector, matched ); }

 if ( this.length > 1 ) {

 
 if ( !guaranteedUnique[ name ] ) {
 jQuery.uniqueSort( matched ); }

 
 if ( rparentsprev.test( name ) ) {
 matched.reverse(); }
 }

 return this.pushStack( matched ); };} );var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );function createOptions( options ) {
 var object = {}; jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
 object[ flag ] = true; } ); return object;}


jQuery.Callbacks = function( options ) {

 
 
 options = typeof options === "string" ?
 createOptions( options ) :
 jQuery.extend( {}, options ); var 
 firing,

 
 memory,

 
 fired,

 
 locked,

 
 list = [],

 
 queue = [],

 
 firingIndex = -1,

 
 fire = function() {

 
 locked = locked || options.once;   fired = firing = true; for ( ; queue.length; firingIndex = -1 ) {
 memory = queue.shift(); while ( ++firingIndex < list.length ) {

 
 if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
 options.stopOnFalse ) {

 
 firingIndex = list.length; memory = false; }
 }
 }

 
 if ( !options.memory ) {
 memory = false; }

 firing = false;  if ( locked ) {

 
 if ( memory ) {
 list = [];  } else {
 list = ""; }
 }
 },

 
 self = {

 
 add: function() {
 if ( list ) {

 
 if ( memory && !firing ) {
 firingIndex = list.length - 1; queue.push( memory ); }

 ( function add( args ) {
 jQuery.each( args, function( _, arg ) {
 if ( isFunction( arg ) ) {
 if ( !options.unique || !self.has( arg ) ) {
 list.push( arg ); }
 } else if ( arg && arg.length && toType( arg ) !== "string" ) {

 
 add( arg ); }
 } ); } )( arguments ); if ( memory && !firing ) {
 fire(); }
 }
 return this; },

 
 remove: function() {
 jQuery.each( arguments, function( _, arg ) {
 var index; while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
 list.splice( index, 1 );  if ( index <= firingIndex ) {
 firingIndex--; }
 }
 } ); return this; },

 
 
 has: function( fn ) {
 return fn ?
 jQuery.inArray( fn, list ) > -1 :
 list.length > 0; },

 
 empty: function() {
 if ( list ) {
 list = []; }
 return this; },

 
 
 
 disable: function() {
 locked = queue = []; list = memory = ""; return this; },
 disabled: function() {
 return !list; },

 
 
 
 lock: function() {
 locked = queue = []; if ( !memory && !firing ) {
 list = memory = ""; }
 return this; },
 locked: function() {
 return !!locked; },

 
 fireWith: function( context, args ) {
 if ( !locked ) {
 args = args || []; args = [ context, args.slice ? args.slice() : args ]; queue.push( args ); if ( !firing ) {
 fire(); }
 }
 return this; },

 
 fire: function() {
 self.fireWith( this, arguments ); return this; },

 
 fired: function() {
 return !!fired; }
 }; return self;};function Identity( v ) {
 return v;}
function Thrower( ex ) {
 throw ex;}

function adoptValue( value, resolve, reject, noValue ) {
 var method; try {

 
 if ( value && isFunction( ( method = value.promise ) ) ) {
 method.call( value ).done( resolve ).fail( reject );  } else if ( value && isFunction( ( method = value.then ) ) ) {
 method.call( value, resolve, reject );  } else {

 
 
 
 resolve.apply( undefined, [ value ].slice( noValue ) ); }

 
 
 
 } catch ( value ) {

 
 
 reject.apply( undefined, [ value ] ); }
}

jQuery.extend( {

 Deferred: function( func ) {
 var tuples = [

 
 
 [ "notify", "progress", jQuery.Callbacks( "memory" ),
 jQuery.Callbacks( "memory" ), 2 ],
 [ "resolve", "done", jQuery.Callbacks( "once memory" ),
 jQuery.Callbacks( "once memory" ), 0, "resolved" ],
 [ "reject", "fail", jQuery.Callbacks( "once memory" ),
 jQuery.Callbacks( "once memory" ), 1, "rejected" ]
 ],
 state = "pending",
 promise = {
 state: function() {
 return state; },
 always: function() {
 deferred.done( arguments ).fail( arguments ); return this; },
 "catch": function( fn ) {
 return promise.then( null, fn ); },

 
 pipe: function(  ) {
 var fns = arguments; return jQuery.Deferred( function( newDefer ) {
 jQuery.each( tuples, function( _i, tuple ) {

 
 var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];    deferred[ tuple[ 1 ] ]( function() {
 var returned = fn && fn.apply( this, arguments ); if ( returned && isFunction( returned.promise ) ) {
 returned.promise()
 .progress( newDefer.notify )
 .done( newDefer.resolve )
 .fail( newDefer.reject ); } else {
 newDefer[ tuple[ 0 ] + "With" ](
 this,
 fn ? [ returned ] : arguments
 ); }
 } ); } ); fns = null; } ).promise(); },
 then: function( onFulfilled, onRejected, onProgress ) {
 var maxDepth = 0; function resolve( depth, deferred, handler, special ) {
 return function() {
 var that = this,
 args = arguments,
 mightThrow = function() {
 var returned, then;    if ( depth < maxDepth ) {
 return; }

 returned = handler.apply( that, args );   if ( returned === deferred.promise() ) {
 throw new TypeError( "Thenable self-resolution" ); }

 
 
 
 
 then = returned &&

 
 
 
 ( typeof returned === "object" ||
 typeof returned === "function" ) &&
 returned.then;  if ( isFunction( then ) ) {

 
 if ( special ) {
 then.call(
 returned,
 resolve( maxDepth, deferred, Identity, special ),
 resolve( maxDepth, deferred, Thrower, special )
 );  } else {

 
 maxDepth++; then.call(
 returned,
 resolve( maxDepth, deferred, Identity, special ),
 resolve( maxDepth, deferred, Thrower, special ),
 resolve( maxDepth, deferred, Identity,
 deferred.notifyWith )
 ); }

 
 } else {

 
 
 if ( handler !== Identity ) {
 that = undefined; args = [ returned ]; }

 
 
 ( special || deferred.resolveWith )( that, args ); }
 },

 
 process = special ?
 mightThrow :
 function() {
 try {
 mightThrow(); } catch ( e ) {

 if ( jQuery.Deferred.exceptionHook ) {
 jQuery.Deferred.exceptionHook( e,
 process.stackTrace ); }

 
 
 
 if ( depth + 1 >= maxDepth ) {

 
 
 if ( handler !== Thrower ) {
 that = undefined; args = [ e ]; }

 deferred.rejectWith( that, args ); }
 }
 };     if ( depth ) {
 process(); } else {

 
 
 if ( jQuery.Deferred.getStackHook ) {
 process.stackTrace = jQuery.Deferred.getStackHook(); }
 window.setTimeout( process ); }
 }; }

 return jQuery.Deferred( function( newDefer ) {

 
 tuples[ 0 ][ 3 ].add(
 resolve(
 0,
 newDefer,
 isFunction( onProgress ) ?
 onProgress :
 Identity,
 newDefer.notifyWith
 )
 );  tuples[ 1 ][ 3 ].add(
 resolve(
 0,
 newDefer,
 isFunction( onFulfilled ) ?
 onFulfilled :
 Identity
 )
 );  tuples[ 2 ][ 3 ].add(
 resolve(
 0,
 newDefer,
 isFunction( onRejected ) ?
 onRejected :
 Thrower
 )
 ); } ).promise(); },

 
 
 promise: function( obj ) {
 return obj != null ? jQuery.extend( obj, promise ) : promise; }
 },
 deferred = {};  jQuery.each( tuples, function( i, tuple ) {
 var list = tuple[ 2 ],
 stateString = tuple[ 5 ];    promise[ tuple[ 1 ] ] = list.add;  if ( stateString ) {
 list.add(
 function() {

 
 
 state = stateString; },

 
 
 tuples[ 3 - i ][ 2 ].disable,

 
 
 tuples[ 3 - i ][ 3 ].disable,

 
 tuples[ 0 ][ 2 ].lock,

 
 tuples[ 0 ][ 3 ].lock
 ); }

 
 
 
 list.add( tuple[ 3 ].fire );    deferred[ tuple[ 0 ] ] = function() {
 deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments ); return this; };    deferred[ tuple[ 0 ] + "With" ] = list.fireWith; } );  promise.promise( deferred );  if ( func ) {
 func.call( deferred, deferred ); }

 
 return deferred; },

 
 when: function( singleValue ) {
 var

 
 remaining = arguments.length,

 
 i = remaining,

 
 resolveContexts = Array( i ),
 resolveValues = slice.call( arguments ),

 
 master = jQuery.Deferred(),

 
 updateFunc = function( i ) {
 return function( value ) {
 resolveContexts[ i ] = this; resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value; if ( !( --remaining ) ) {
 master.resolveWith( resolveContexts, resolveValues ); }
 }; };  if ( remaining <= 1 ) {
 adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
 !remaining );  if ( master.state() === "pending" ||
 isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

 return master.then(); }
 }

 
 while ( i-- ) {
 adoptValue( resolveValues[ i ], updateFunc( i ), master.reject ); }

 return master.promise(); }
} );var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;jQuery.Deferred.exceptionHook = function( error, stack ) {

 
 
 if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
 window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack ); }
};jQuery.readyException = function( error ) {
 window.setTimeout( function() {
 throw error; } );};var readyList = jQuery.Deferred();jQuery.fn.ready = function( fn ) {

 readyList
 .then( fn )

 
 
 
 .catch( function( error ) {
 jQuery.readyException( error ); } ); return this;};jQuery.extend( {

 
 isReady: false,

 
 
 readyWait: 1,

 
 ready: function( wait ) {

 
 if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
 return; }

 
 jQuery.isReady = true;  if ( wait !== true && --jQuery.readyWait > 0 ) {
 return; }

 
 readyList.resolveWith( document, [ jQuery ] ); }
} );jQuery.ready.then = readyList.then;function completed() {
 document.removeEventListener( "DOMContentLoaded", completed ); window.removeEventListener( "load", completed ); jQuery.ready();}





if ( document.readyState === "complete" ||
 ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

 
 window.setTimeout( jQuery.ready );} else {

 
 document.addEventListener( "DOMContentLoaded", completed );  window.addEventListener( "load", completed );}






var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
 var i = 0,
 len = elems.length,
 bulk = key == null;  if ( toType( key ) === "object" ) {
 chainable = true; for ( i in key ) {
 access( elems, fn, i, key[ i ], true, emptyGet, raw ); }

 
 } else if ( value !== undefined ) {
 chainable = true; if ( !isFunction( value ) ) {
 raw = true; }

 if ( bulk ) {

 
 if ( raw ) {
 fn.call( elems, value ); fn = null;  } else {
 bulk = fn; fn = function( elem, _key, value ) {
 return bulk.call( jQuery( elem ), value ); }; }
 }

 if ( fn ) {
 for ( ; i < len; i++ ) {
 fn(
 elems[ i ], key, raw ?
 value :
 value.call( elems[ i ], i, fn( elems[ i ], key ) )
 ); }
 }
 }

 if ( chainable ) {
 return elems; }

 
 if ( bulk ) {
 return fn.call( elems ); }

 return len ? fn( elems[ 0 ], key ) : emptyGet;};var rmsPrefix = /^-ms-/,
 rdashAlpha = /-([a-z])/g;function fcamelCase( _all, letter ) {
 return letter.toUpperCase();}




function camelCase( string ) {
 return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );}
var acceptData = function( owner ) {

 
 
 
 
 
 
 return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );};function Data() {
 this.expando = jQuery.expando + Data.uid++;}

Data.uid = 1;Data.prototype = {

 cache: function( owner ) {

 
 var value = owner[ this.expando ];  if ( !value ) {
 value = {};    if ( acceptData( owner ) ) {

 
 
 if ( owner.nodeType ) {
 owner[ this.expando ] = value;    } else {
 Object.defineProperty( owner, this.expando, {
 value: value,
 configurable: true
 } ); }
 }
 }

 return value; },
 set: function( owner, data, value ) {
 var prop,
 cache = this.cache( owner );   if ( typeof data === "string" ) {
 cache[ camelCase( data ) ] = value;  } else {

 
 for ( prop in data ) {
 cache[ camelCase( prop ) ] = data[ prop ]; }
 }
 return cache; },
 get: function( owner, key ) {
 return key === undefined ?
 this.cache( owner ) :

 
 owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ]; },
 access: function( owner, key, value ) {

 
 
 
 
 
 
 
 
 
 
 
 if ( key === undefined ||
 ( ( key && typeof key === "string" ) && value === undefined ) ) {

 return this.get( owner, key ); }

 
 
 
 
 
 
 this.set( owner, key, value );   return value !== undefined ? value : key; },
 remove: function( owner, key ) {
 var i,
 cache = owner[ this.expando ]; if ( cache === undefined ) {
 return; }

 if ( key !== undefined ) {

 
 if ( Array.isArray( key ) ) {

 
 
 key = key.map( camelCase ); } else {
 key = camelCase( key );   key = key in cache ?
 [ key ] :
 ( key.match( rnothtmlwhite ) || [] ); }

 i = key.length; while ( i-- ) {
 delete cache[ key[ i ] ]; }
 }

 
 if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

 
 
 
 
 if ( owner.nodeType ) {
 owner[ this.expando ] = undefined; } else {
 delete owner[ this.expando ]; }
 }
 },
 hasData: function( owner ) {
 var cache = owner[ this.expando ]; return cache !== undefined && !jQuery.isEmptyObject( cache ); }
};var dataPriv = new Data();var dataUser = new Data();var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
 rmultiDash = /[A-Z]/g;function getData( data ) {
 if ( data === "true" ) {
 return true; }

 if ( data === "false" ) {
 return false; }

 if ( data === "null" ) {
 return null; }

 
 if ( data === +data + "" ) {
 return +data; }

 if ( rbrace.test( data ) ) {
 return JSON.parse( data ); }

 return data;}

function dataAttr( elem, key, data ) {
 var name;   if ( data === undefined && elem.nodeType === 1 ) {
 name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase(); data = elem.getAttribute( name ); if ( typeof data === "string" ) {
 try {
 data = getData( data ); } catch ( e ) {}

 
 dataUser.set( elem, key, data ); } else {
 data = undefined; }
 }
 return data;}

jQuery.extend( {
 hasData: function( elem ) {
 return dataUser.hasData( elem ) || dataPriv.hasData( elem ); },

 data: function( elem, name, data ) {
 return dataUser.access( elem, name, data ); },

 removeData: function( elem, name ) {
 dataUser.remove( elem, name ); },

 
 
 _data: function( elem, name, data ) {
 return dataPriv.access( elem, name, data ); },

 _removeData: function( elem, name ) {
 dataPriv.remove( elem, name ); }
} );jQuery.fn.extend( {
 data: function( key, value ) {
 var i, name, data,
 elem = this[ 0 ],
 attrs = elem && elem.attributes;  if ( key === undefined ) {
 if ( this.length ) {
 data = dataUser.get( elem ); if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
 i = attrs.length; while ( i-- ) {

 
 
 if ( attrs[ i ] ) {
 name = attrs[ i ].name; if ( name.indexOf( "data-" ) === 0 ) {
 name = camelCase( name.slice( 5 ) ); dataAttr( elem, name, data[ name ] ); }
 }
 }
 dataPriv.set( elem, "hasDataAttrs", true ); }
 }

 return data; }

 
 if ( typeof key === "object" ) {
 return this.each( function() {
 dataUser.set( this, key ); } ); }

 return access( this, function( value ) {
 var data;      if ( elem && value === undefined ) {

 
 
 data = dataUser.get( elem, key ); if ( data !== undefined ) {
 return data; }

 
 
 data = dataAttr( elem, key ); if ( data !== undefined ) {
 return data; }

 
 return; }

 
 this.each( function() {

 
 dataUser.set( this, key, value ); } ); }, null, value, arguments.length > 1, null, true ); },

 removeData: function( key ) {
 return this.each( function() {
 dataUser.remove( this, key ); } ); }
} );jQuery.extend( {
 queue: function( elem, type, data ) {
 var queue; if ( elem ) {
 type = ( type || "fx" ) + "queue"; queue = dataPriv.get( elem, type );  if ( data ) {
 if ( !queue || Array.isArray( data ) ) {
 queue = dataPriv.access( elem, type, jQuery.makeArray( data ) ); } else {
 queue.push( data ); }
 }
 return queue || []; }
 },

 dequeue: function( elem, type ) {
 type = type || "fx"; var queue = jQuery.queue( elem, type ),
 startLength = queue.length,
 fn = queue.shift(),
 hooks = jQuery._queueHooks( elem, type ),
 next = function() {
 jQuery.dequeue( elem, type ); };  if ( fn === "inprogress" ) {
 fn = queue.shift(); startLength--; }

 if ( fn ) {

 
 
 if ( type === "fx" ) {
 queue.unshift( "inprogress" ); }

 
 delete hooks.stop; fn.call( elem, next, hooks ); }

 if ( !startLength && hooks ) {
 hooks.empty.fire(); }
 },

 
 _queueHooks: function( elem, type ) {
 var key = type + "queueHooks"; return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
 empty: jQuery.Callbacks( "once memory" ).add( function() {
 dataPriv.remove( elem, [ type + "queue", key ] ); } )
 } ); }
} );jQuery.fn.extend( {
 queue: function( type, data ) {
 var setter = 2; if ( typeof type !== "string" ) {
 data = type; type = "fx"; setter--; }

 if ( arguments.length < setter ) {
 return jQuery.queue( this[ 0 ], type ); }

 return data === undefined ?
 this :
 this.each( function() {
 var queue = jQuery.queue( this, type, data );  jQuery._queueHooks( this, type ); if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
 jQuery.dequeue( this, type ); }
 } ); },
 dequeue: function( type ) {
 return this.each( function() {
 jQuery.dequeue( this, type ); } ); },
 clearQueue: function( type ) {
 return this.queue( type || "fx", [] ); },

 
 
 promise: function( type, obj ) {
 var tmp,
 count = 1,
 defer = jQuery.Deferred(),
 elements = this,
 i = this.length,
 resolve = function() {
 if ( !( --count ) ) {
 defer.resolveWith( elements, [ elements ] ); }
 }; if ( typeof type !== "string" ) {
 obj = type; type = undefined; }
 type = type || "fx"; while ( i-- ) {
 tmp = dataPriv.get( elements[ i ], type + "queueHooks" ); if ( tmp && tmp.empty ) {
 count++; tmp.empty.add( resolve ); }
 }
 resolve(); return defer.promise( obj ); }
} );var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );var cssExpand = [ "Top", "Right", "Bottom", "Left" ];var documentElement = document.documentElement; var isAttached = function( elem ) {
 return jQuery.contains( elem.ownerDocument, elem ); },
 composed = { composed: true };      if ( documentElement.getRootNode ) {
 isAttached = function( elem ) {
 return jQuery.contains( elem.ownerDocument, elem ) ||
 elem.getRootNode( composed ) === elem.ownerDocument; }; }
var isHiddenWithinTree = function( elem, el ) {

 
 
 elem = el || elem;  return elem.style.display === "none" ||
 elem.style.display === "" &&

 
 
 
 
 isAttached( elem ) &&

 jQuery.css( elem, "display" ) === "none"; };function adjustCSS( elem, prop, valueParts, tween ) {
 var adjusted, scale,
 maxIterations = 20,
 currentValue = tween ?
 function() {
 return tween.cur(); } :
 function() {
 return jQuery.css( elem, prop, "" ); },
 initial = currentValue(),
 unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

 
 initialInUnit = elem.nodeType &&
 ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
 rcssNum.exec( jQuery.css( elem, prop ) ); if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

 
 
 initial = initial / 2;  unit = unit || initialInUnit[ 3 ];  initialInUnit = +initial || 1; while ( maxIterations-- ) {

 
 
 jQuery.style( elem, prop, initialInUnit + unit ); if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
 maxIterations = 0; }
 initialInUnit = initialInUnit / scale; }

 initialInUnit = initialInUnit * 2; jQuery.style( elem, prop, initialInUnit + unit );  valueParts = valueParts || []; }

 if ( valueParts ) {
 initialInUnit = +initialInUnit || +initial || 0;  adjusted = valueParts[ 1 ] ?
 initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
 +valueParts[ 2 ]; if ( tween ) {
 tween.unit = unit; tween.start = initialInUnit; tween.end = adjusted; }
 }
 return adjusted;}


var defaultDisplayMap = {};function getDefaultDisplay( elem ) {
 var temp,
 doc = elem.ownerDocument,
 nodeName = elem.nodeName,
 display = defaultDisplayMap[ nodeName ]; if ( display ) {
 return display; }

 temp = doc.body.appendChild( doc.createElement( nodeName ) ); display = jQuery.css( temp, "display" ); temp.parentNode.removeChild( temp ); if ( display === "none" ) {
 display = "block"; }
 defaultDisplayMap[ nodeName ] = display; return display;}

function showHide( elements, show ) {
 var display, elem,
 values = [],
 index = 0,
 length = elements.length;  for ( ; index < length; index++ ) {
 elem = elements[ index ]; if ( !elem.style ) {
 continue; }

 display = elem.style.display; if ( show ) {

 
 
 
 if ( display === "none" ) {
 values[ index ] = dataPriv.get( elem, "display" ) || null; if ( !values[ index ] ) {
 elem.style.display = ""; }
 }
 if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
 values[ index ] = getDefaultDisplay( elem ); }
 } else {
 if ( display !== "none" ) {
 values[ index ] = "none";  dataPriv.set( elem, "display", display ); }
 }
 }

 
 for ( index = 0; index < length; index++ ) {
 if ( values[ index ] != null ) {
 elements[ index ].style.display = values[ index ]; }
 }

 return elements;}

jQuery.fn.extend( {
 show: function() {
 return showHide( this, true ); },
 hide: function() {
 return showHide( this ); },
 toggle: function( state ) {
 if ( typeof state === "boolean" ) {
 return state ? this.show() : this.hide(); }

 return this.each( function() {
 if ( isHiddenWithinTree( this ) ) {
 jQuery( this ).show(); } else {
 jQuery( this ).hide(); }
 } ); }
} );var rcheckableType = ( /^(?:checkbox|radio)$/i );var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );( function() {
 var fragment = document.createDocumentFragment(),
 div = fragment.appendChild( document.createElement( "div" ) ),
 input = document.createElement( "input" );     input.setAttribute( "type", "radio" ); input.setAttribute( "checked", "checked" ); input.setAttribute( "name", "t" ); div.appendChild( input );   support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;   div.innerHTML = "<textarea>x</textarea>"; support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;    div.innerHTML = "<option></option>"; support.option = !!div.lastChild;} )();var wrapMap = {

 
 
 
 thead: [ 1, "<table>", "</table>" ],
 col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
 tr: [ 2, "<table><tbody>", "</tbody></table>" ],
 td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

 _default: [ 0, "", "" ]
};wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;wrapMap.th = wrapMap.td;if ( !support.option ) {
 wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];}


function getAll( context, tag ) {

 
 
 var ret; if ( typeof context.getElementsByTagName !== "undefined" ) {
 ret = context.getElementsByTagName( tag || "*" ); } else if ( typeof context.querySelectorAll !== "undefined" ) {
 ret = context.querySelectorAll( tag || "*" ); } else {
 ret = []; }

 if ( tag === undefined || tag && nodeName( context, tag ) ) {
 return jQuery.merge( [ context ], ret ); }

 return ret;}



function setGlobalEval( elems, refElements ) {
 var i = 0,
 l = elems.length; for ( ; i < l; i++ ) {
 dataPriv.set(
 elems[ i ],
 "globalEval",
 !refElements || dataPriv.get( refElements[ i ], "globalEval" )
 ); }
}


var rhtml = /<|&#?\w+;/;function buildFragment( elems, context, scripts, selection, ignored ) {
 var elem, tmp, tag, wrap, attached, j,
 fragment = context.createDocumentFragment(),
 nodes = [],
 i = 0,
 l = elems.length; for ( ; i < l; i++ ) {
 elem = elems[ i ]; if ( elem || elem === 0 ) {

 
 if ( toType( elem ) === "object" ) {

 
 
 jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );  } else if ( !rhtml.test( elem ) ) {
 nodes.push( context.createTextNode( elem ) );  } else {
 tmp = tmp || fragment.appendChild( context.createElement( "div" ) );  tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase(); wrap = wrapMap[ tag ] || wrapMap._default; tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];  j = wrap[ 0 ]; while ( j-- ) {
 tmp = tmp.lastChild; }

 
 
 jQuery.merge( nodes, tmp.childNodes );  tmp = fragment.firstChild;  tmp.textContent = ""; }
 }
 }

 
 fragment.textContent = ""; i = 0; while ( ( elem = nodes[ i++ ] ) ) {

 
 if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
 if ( ignored ) {
 ignored.push( elem ); }
 continue; }

 attached = isAttached( elem );  tmp = getAll( fragment.appendChild( elem ), "script" );  if ( attached ) {
 setGlobalEval( tmp ); }

 
 if ( scripts ) {
 j = 0; while ( ( elem = tmp[ j++ ] ) ) {
 if ( rscriptType.test( elem.type || "" ) ) {
 scripts.push( elem ); }
 }
 }
 }

 return fragment;}


var
 rkeyEvent = /^key/,
 rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
 rtypenamespace = /^([^.]*)(?:\.(.+)|)/;function returnTrue() {
 return true;}

function returnFalse() {
 return false;}







function expectSync( elem, type ) {
 return ( elem === safeActiveElement() ) === ( type === "focus" );}




function safeActiveElement() {
 try {
 return document.activeElement; } catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
 var origFn, type;  if ( typeof types === "object" ) {

 
 if ( typeof selector !== "string" ) {

 
 data = data || selector; selector = undefined; }
 for ( type in types ) {
 on( elem, type, selector, data, types[ type ], one ); }
 return elem; }

 if ( data == null && fn == null ) {

 
 fn = selector; data = selector = undefined; } else if ( fn == null ) {
 if ( typeof selector === "string" ) {

 
 fn = data; data = undefined; } else {

 
 fn = data; data = selector; selector = undefined; }
 }
 if ( fn === false ) {
 fn = returnFalse; } else if ( !fn ) {
 return elem; }

 if ( one === 1 ) {
 origFn = fn; fn = function( event ) {

 
 jQuery().off( event ); return origFn.apply( this, arguments ); };  fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ ); }
 return elem.each( function() {
 jQuery.event.add( this, types, fn, data, selector ); } );}


jQuery.event = {

 global: {},

 add: function( elem, types, handler, data, selector ) {

 var handleObjIn, eventHandle, tmp,
 events, t, handleObj,
 special, handlers, type, namespaces, origType,
 elemData = dataPriv.get( elem );  if ( !acceptData( elem ) ) {
 return; }

 
 if ( handler.handler ) {
 handleObjIn = handler; handler = handleObjIn.handler; selector = handleObjIn.selector; }

 
 
 if ( selector ) {
 jQuery.find.matchesSelector( documentElement, selector ); }

 
 if ( !handler.guid ) {
 handler.guid = jQuery.guid++; }

 
 if ( !( events = elemData.events ) ) {
 events = elemData.events = Object.create( null ); }
 if ( !( eventHandle = elemData.handle ) ) {
 eventHandle = elemData.handle = function( e ) {

 
 
 return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
 jQuery.event.dispatch.apply( elem, arguments ) : undefined; }; }

 
 types = ( types || "" ).match( rnothtmlwhite ) || [ "" ]; t = types.length; while ( t-- ) {
 tmp = rtypenamespace.exec( types[ t ] ) || []; type = origType = tmp[ 1 ]; namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();  if ( !type ) {
 continue; }

 
 special = jQuery.event.special[ type ] || {};  type = ( selector ? special.delegateType : special.bindType ) || type;  special = jQuery.event.special[ type ] || {};  handleObj = jQuery.extend( {
 type: type,
 origType: origType,
 data: data,
 handler: handler,
 guid: handler.guid,
 selector: selector,
 needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
 namespace: namespaces.join( "." )
 }, handleObjIn );  if ( !( handlers = events[ type ] ) ) {
 handlers = events[ type ] = []; handlers.delegateCount = 0;  if ( !special.setup ||
 special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

 if ( elem.addEventListener ) {
 elem.addEventListener( type, eventHandle ); }
 }
 }

 if ( special.add ) {
 special.add.call( elem, handleObj ); if ( !handleObj.handler.guid ) {
 handleObj.handler.guid = handler.guid; }
 }

 
 if ( selector ) {
 handlers.splice( handlers.delegateCount++, 0, handleObj ); } else {
 handlers.push( handleObj ); }

 
 jQuery.event.global[ type ] = true; }

 },

 
 remove: function( elem, types, handler, selector, mappedTypes ) {

 var j, origCount, tmp,
 events, t, handleObj,
 special, handlers, type, namespaces, origType,
 elemData = dataPriv.hasData( elem ) && dataPriv.get( elem ); if ( !elemData || !( events = elemData.events ) ) {
 return; }

 
 types = ( types || "" ).match( rnothtmlwhite ) || [ "" ]; t = types.length; while ( t-- ) {
 tmp = rtypenamespace.exec( types[ t ] ) || []; type = origType = tmp[ 1 ]; namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();  if ( !type ) {
 for ( type in events ) {
 jQuery.event.remove( elem, type + types[ t ], handler, selector, true ); }
 continue; }

 special = jQuery.event.special[ type ] || {}; type = ( selector ? special.delegateType : special.bindType ) || type; handlers = events[ type ] || []; tmp = tmp[ 2 ] &&
 new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );  origCount = j = handlers.length; while ( j-- ) {
 handleObj = handlers[ j ]; if ( ( mappedTypes || origType === handleObj.origType ) &&
 ( !handler || handler.guid === handleObj.guid ) &&
 ( !tmp || tmp.test( handleObj.namespace ) ) &&
 ( !selector || selector === handleObj.selector ||
 selector === "**" && handleObj.selector ) ) {
 handlers.splice( j, 1 ); if ( handleObj.selector ) {
 handlers.delegateCount--; }
 if ( special.remove ) {
 special.remove.call( elem, handleObj ); }
 }
 }

 
 
 if ( origCount && !handlers.length ) {
 if ( !special.teardown ||
 special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

 jQuery.removeEvent( elem, type, elemData.handle ); }

 delete events[ type ]; }
 }

 
 if ( jQuery.isEmptyObject( events ) ) {
 dataPriv.remove( elem, "handle events" ); }
 },

 dispatch: function( nativeEvent ) {

 var i, j, ret, matched, handleObj, handlerQueue,
 args = new Array( arguments.length ),

 
 event = jQuery.event.fix( nativeEvent ),

 handlers = (
 dataPriv.get( this, "events" ) || Object.create( null )
 )[ event.type ] || [],
 special = jQuery.event.special[ event.type ] || {};  args[ 0 ] = event; for ( i = 1; i < arguments.length; i++ ) {
 args[ i ] = arguments[ i ]; }

 event.delegateTarget = this;  if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
 return; }

 
 handlerQueue = jQuery.event.handlers.call( this, event, handlers );  i = 0; while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
 event.currentTarget = matched.elem; j = 0; while ( ( handleObj = matched.handlers[ j++ ] ) &&
 !event.isImmediatePropagationStopped() ) {

 
 
 if ( !event.rnamespace || handleObj.namespace === false ||
 event.rnamespace.test( handleObj.namespace ) ) {

 event.handleObj = handleObj; event.data = handleObj.data; ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
 handleObj.handler ).apply( matched.elem, args ); if ( ret !== undefined ) {
 if ( ( event.result = ret ) === false ) {
 event.preventDefault(); event.stopPropagation(); }
 }
 }
 }
 }

 
 if ( special.postDispatch ) {
 special.postDispatch.call( this, event ); }

 return event.result; },

 handlers: function( event, handlers ) {
 var i, handleObj, sel, matchedHandlers, matchedSelectors,
 handlerQueue = [],
 delegateCount = handlers.delegateCount,
 cur = event.target;  if ( delegateCount &&

 
 
 cur.nodeType &&

 
 
 
 
 
 !( event.type === "click" && event.button >= 1 ) ) {

 for ( ; cur !== this; cur = cur.parentNode || this ) {

 
 
 if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
 matchedHandlers = []; matchedSelectors = {}; for ( i = 0; i < delegateCount; i++ ) {
 handleObj = handlers[ i ];  sel = handleObj.selector + " "; if ( matchedSelectors[ sel ] === undefined ) {
 matchedSelectors[ sel ] = handleObj.needsContext ?
 jQuery( sel, this ).index( cur ) > -1 :
 jQuery.find( sel, this, null, [ cur ] ).length; }
 if ( matchedSelectors[ sel ] ) {
 matchedHandlers.push( handleObj ); }
 }
 if ( matchedHandlers.length ) {
 handlerQueue.push( { elem: cur, handlers: matchedHandlers } ); }
 }
 }
 }

 
 cur = this; if ( delegateCount < handlers.length ) {
 handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } ); }

 return handlerQueue; },

 addProp: function( name, hook ) {
 Object.defineProperty( jQuery.Event.prototype, name, {
 enumerable: true,
 configurable: true,

 get: isFunction( hook ) ?
 function() {
 if ( this.originalEvent ) {
 return hook( this.originalEvent ); }
 } :
 function() {
 if ( this.originalEvent ) {
 return this.originalEvent[ name ]; }
 },

 set: function( value ) {
 Object.defineProperty( this, name, {
 enumerable: true,
 configurable: true,
 writable: true,
 value: value
 } ); }
 } ); },

 fix: function( originalEvent ) {
 return originalEvent[ jQuery.expando ] ?
 originalEvent :
 new jQuery.Event( originalEvent ); },

 special: {
 load: {

 
 noBubble: true
 },
 click: {

 
 setup: function( data ) {

 
 
 var el = this || data;  if ( rcheckableType.test( el.type ) &&
 el.click && nodeName( el, "input" ) ) {

 
 leverageNative( el, "click", returnTrue ); }

 
 return false; },
 trigger: function( data ) {

 
 
 var el = this || data;  if ( rcheckableType.test( el.type ) &&
 el.click && nodeName( el, "input" ) ) {

 leverageNative( el, "click" ); }

 
 return true; },

 
 
 _default: function( event ) {
 var target = event.target; return rcheckableType.test( target.type ) &&
 target.click && nodeName( target, "input" ) &&
 dataPriv.get( target, "click" ) ||
 nodeName( target, "a" ); }
 },

 beforeunload: {
 postDispatch: function( event ) {

 
 
 if ( event.result !== undefined && event.originalEvent ) {
 event.originalEvent.returnValue = event.result; }
 }
 }
 }
};function leverageNative( el, type, expectSync ) {

 
 if ( !expectSync ) {
 if ( dataPriv.get( el, type ) === undefined ) {
 jQuery.event.add( el, type, returnTrue ); }
 return; }

 
 dataPriv.set( el, type, false ); jQuery.event.add( el, type, {
 namespace: false,
 handler: function( event ) {
 var notAsync, result,
 saved = dataPriv.get( this, type ); if ( ( event.isTrigger & 1 ) && this[ type ] ) {

 
 
 
 if ( !saved.length ) {

 
 
 
 saved = slice.call( arguments ); dataPriv.set( this, type, saved );    notAsync = expectSync( this, type ); this[ type ](); result = dataPriv.get( this, type ); if ( saved !== result || notAsync ) {
 dataPriv.set( this, type, false ); } else {
 result = {}; }
 if ( saved !== result ) {

 
 event.stopImmediatePropagation(); event.preventDefault(); return result.value; }

 
 
 
 
 
 
 } else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
 event.stopPropagation(); }

 
 
 } else if ( saved.length ) {

 
 dataPriv.set( this, type, {
 value: jQuery.event.trigger(

 
 
 jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
 saved.slice( 1 ),
 this
 )
 } );  event.stopImmediatePropagation(); }
 }
 } );}

jQuery.removeEvent = function( elem, type, handle ) {

 
 if ( elem.removeEventListener ) {
 elem.removeEventListener( type, handle ); }
};jQuery.Event = function( src, props ) {

 
 if ( !( this instanceof jQuery.Event ) ) {
 return new jQuery.Event( src, props ); }

 
 if ( src && src.type ) {
 this.originalEvent = src; this.type = src.type;   this.isDefaultPrevented = src.defaultPrevented ||
 src.defaultPrevented === undefined &&

 
 src.returnValue === false ?
 returnTrue :
 returnFalse;    this.target = ( src.target && src.target.nodeType === 3 ) ?
 src.target.parentNode :
 src.target; this.currentTarget = src.currentTarget; this.relatedTarget = src.relatedTarget;  } else {
 this.type = src; }

 
 if ( props ) {
 jQuery.extend( this, props ); }

 
 this.timeStamp = src && src.timeStamp || Date.now();  this[ jQuery.expando ] = true;};jQuery.Event.prototype = {
 constructor: jQuery.Event,
 isDefaultPrevented: returnFalse,
 isPropagationStopped: returnFalse,
 isImmediatePropagationStopped: returnFalse,
 isSimulated: false,

 preventDefault: function() {
 var e = this.originalEvent; this.isDefaultPrevented = returnTrue; if ( e && !this.isSimulated ) {
 e.preventDefault(); }
 },
 stopPropagation: function() {
 var e = this.originalEvent; this.isPropagationStopped = returnTrue; if ( e && !this.isSimulated ) {
 e.stopPropagation(); }
 },
 stopImmediatePropagation: function() {
 var e = this.originalEvent; this.isImmediatePropagationStopped = returnTrue; if ( e && !this.isSimulated ) {
 e.stopImmediatePropagation(); }

 this.stopPropagation(); }
};jQuery.each( {
 altKey: true,
 bubbles: true,
 cancelable: true,
 changedTouches: true,
 ctrlKey: true,
 detail: true,
 eventPhase: true,
 metaKey: true,
 pageX: true,
 pageY: true,
 shiftKey: true,
 view: true,
 "char": true,
 code: true,
 charCode: true,
 key: true,
 keyCode: true,
 button: true,
 buttons: true,
 clientX: true,
 clientY: true,
 offsetX: true,
 offsetY: true,
 pointerId: true,
 pointerType: true,
 screenX: true,
 screenY: true,
 targetTouches: true,
 toElement: true,
 touches: true,

 which: function( event ) {
 var button = event.button;  if ( event.which == null && rkeyEvent.test( event.type ) ) {
 return event.charCode != null ? event.charCode : event.keyCode; }

 
 if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
 if ( button & 1 ) {
 return 1; }

 if ( button & 2 ) {
 return 3; }

 if ( button & 4 ) {
 return 2; }

 return 0; }

 return event.which; }
}, jQuery.event.addProp );jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
 jQuery.event.special[ type ] = {

 
 setup: function() {

 
 
 
 leverageNative( this, type, expectSync );  return false; },
 trigger: function() {

 
 leverageNative( this, type );  return true; },

 delegateType: delegateType
 };} );jQuery.each( {
 mouseenter: "mouseover",
 mouseleave: "mouseout",
 pointerenter: "pointerover",
 pointerleave: "pointerout"
}, function( orig, fix ) {
 jQuery.event.special[ orig ] = {
 delegateType: fix,
 bindType: fix,

 handle: function( event ) {
 var ret,
 target = this,
 related = event.relatedTarget,
 handleObj = event.handleObj;   if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
 event.type = handleObj.origType; ret = handleObj.handler.apply( this, arguments ); event.type = fix; }
 return ret; }
 };} );jQuery.fn.extend( {

 on: function( types, selector, data, fn ) {
 return on( this, types, selector, data, fn ); },
 one: function( types, selector, data, fn ) {
 return on( this, types, selector, data, fn, 1 ); },
 off: function( types, selector, fn ) {
 var handleObj, type; if ( types && types.preventDefault && types.handleObj ) {

 
 handleObj = types.handleObj; jQuery( types.delegateTarget ).off(
 handleObj.namespace ?
 handleObj.origType + "." + handleObj.namespace :
 handleObj.origType,
 handleObj.selector,
 handleObj.handler
 ); return this; }
 if ( typeof types === "object" ) {

 
 for ( type in types ) {
 this.off( type, selector, types[ type ] ); }
 return this; }
 if ( selector === false || typeof selector === "function" ) {

 
 fn = selector; selector = undefined; }
 if ( fn === false ) {
 fn = returnFalse; }
 return this.each( function() {
 jQuery.event.remove( this, types, fn, selector ); } ); }
} );var

 
 
 
 rnoInnerhtml = /<script|<style|<link/i,

 
 rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
 rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function manipulationTarget( elem, content ) {
 if ( nodeName( elem, "table" ) &&
 nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

 return jQuery( elem ).children( "tbody" )[ 0 ] || elem; }

 return elem;}


function disableScript( elem ) {
 elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type; return elem;}
function restoreScript( elem ) {
 if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
 elem.type = elem.type.slice( 5 ); } else {
 elem.removeAttribute( "type" ); }

 return elem;}

function cloneCopyEvent( src, dest ) {
 var i, l, type, pdataOld, udataOld, udataCur, events; if ( dest.nodeType !== 1 ) {
 return; }

 
 if ( dataPriv.hasData( src ) ) {
 pdataOld = dataPriv.get( src ); events = pdataOld.events; if ( events ) {
 dataPriv.remove( dest, "handle events" ); for ( type in events ) {
 for ( i = 0, l = events[ type ].length; i < l; i++ ) {
 jQuery.event.add( dest, type, events[ type ][ i ] ); }
 }
 }
 }

 
 if ( dataUser.hasData( src ) ) {
 udataOld = dataUser.access( src ); udataCur = jQuery.extend( {}, udataOld ); dataUser.set( dest, udataCur ); }
}


function fixInput( src, dest ) {
 var nodeName = dest.nodeName.toLowerCase();  if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
 dest.checked = src.checked;  } else if ( nodeName === "input" || nodeName === "textarea" ) {
 dest.defaultValue = src.defaultValue; }
}

function domManip( collection, args, callback, ignored ) {

 
 args = flat( args ); var fragment, first, scripts, hasScripts, node, doc,
 i = 0,
 l = collection.length,
 iNoClone = l - 1,
 value = args[ 0 ],
 valueIsFunction = isFunction( value );  if ( valueIsFunction ||
 ( l > 1 && typeof value === "string" &&
 !support.checkClone && rchecked.test( value ) ) ) {
 return collection.each( function( index ) {
 var self = collection.eq( index ); if ( valueIsFunction ) {
 args[ 0 ] = value.call( this, index, self.html() ); }
 domManip( self, args, callback, ignored ); } ); }

 if ( l ) {
 fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored ); first = fragment.firstChild; if ( fragment.childNodes.length === 1 ) {
 fragment = first; }

 
 if ( first || ignored ) {
 scripts = jQuery.map( getAll( fragment, "script" ), disableScript ); hasScripts = scripts.length;    for ( ; i < l; i++ ) {
 node = fragment; if ( i !== iNoClone ) {
 node = jQuery.clone( node, true, true );  if ( hasScripts ) {

 
 
 jQuery.merge( scripts, getAll( node, "script" ) ); }
 }

 callback.call( collection[ i ], node, i ); }

 if ( hasScripts ) {
 doc = scripts[ scripts.length - 1 ].ownerDocument;  jQuery.map( scripts, restoreScript );  for ( i = 0; i < hasScripts; i++ ) {
 node = scripts[ i ]; if ( rscriptType.test( node.type || "" ) &&
 !dataPriv.access( node, "globalEval" ) &&
 jQuery.contains( doc, node ) ) {

 if ( node.src && ( node.type || "" ).toLowerCase() !== "module" ) {

 
 if ( jQuery._evalUrl && !node.noModule ) {
 jQuery._evalUrl( node.src, {
 nonce: node.nonce || node.getAttribute( "nonce" )
 }, doc ); }
 } else {
 DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc ); }
 }
 }
 }
 }
 }

 return collection;}

function remove( elem, selector, keepData ) {
 var node,
 nodes = selector ? jQuery.filter( selector, elem ) : elem,
 i = 0; for ( ; ( node = nodes[ i ] ) != null; i++ ) {
 if ( !keepData && node.nodeType === 1 ) {
 jQuery.cleanData( getAll( node ) ); }

 if ( node.parentNode ) {
 if ( keepData && isAttached( node ) ) {
 setGlobalEval( getAll( node, "script" ) ); }
 node.parentNode.removeChild( node ); }
 }

 return elem;}

jQuery.extend( {
 htmlPrefilter: function( html ) {
 return html; },

 clone: function( elem, dataAndEvents, deepDataAndEvents ) {
 var i, l, srcElements, destElements,
 clone = elem.cloneNode( true ),
 inPage = isAttached( elem );  if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
 !jQuery.isXMLDoc( elem ) ) {

 
 destElements = getAll( clone ); srcElements = getAll( elem ); for ( i = 0, l = srcElements.length; i < l; i++ ) {
 fixInput( srcElements[ i ], destElements[ i ] ); }
 }

 
 if ( dataAndEvents ) {
 if ( deepDataAndEvents ) {
 srcElements = srcElements || getAll( elem ); destElements = destElements || getAll( clone ); for ( i = 0, l = srcElements.length; i < l; i++ ) {
 cloneCopyEvent( srcElements[ i ], destElements[ i ] ); }
 } else {
 cloneCopyEvent( elem, clone ); }
 }

 
 destElements = getAll( clone, "script" ); if ( destElements.length > 0 ) {
 setGlobalEval( destElements, !inPage && getAll( elem, "script" ) ); }

 
 return clone; },

 cleanData: function( elems ) {
 var data, elem, type,
 special = jQuery.event.special,
 i = 0; for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
 if ( acceptData( elem ) ) {
 if ( ( data = elem[ dataPriv.expando ] ) ) {
 if ( data.events ) {
 for ( type in data.events ) {
 if ( special[ type ] ) {
 jQuery.event.remove( elem, type );  } else {
 jQuery.removeEvent( elem, type, data.handle ); }
 }
 }

 
 
 elem[ dataPriv.expando ] = undefined; }
 if ( elem[ dataUser.expando ] ) {

 
 
 elem[ dataUser.expando ] = undefined; }
 }
 }
 }
} );jQuery.fn.extend( {
 detach: function( selector ) {
 return remove( this, selector, true ); },

 remove: function( selector ) {
 return remove( this, selector ); },

 text: function( value ) {
 return access( this, function( value ) {
 return value === undefined ?
 jQuery.text( this ) :
 this.empty().each( function() {
 if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
 this.textContent = value; }
 } ); }, null, value, arguments.length ); },

 append: function() {
 return domManip( this, arguments, function( elem ) {
 if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
 var target = manipulationTarget( this, elem ); target.appendChild( elem ); }
 } ); },

 prepend: function() {
 return domManip( this, arguments, function( elem ) {
 if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
 var target = manipulationTarget( this, elem ); target.insertBefore( elem, target.firstChild ); }
 } ); },

 before: function() {
 return domManip( this, arguments, function( elem ) {
 if ( this.parentNode ) {
 this.parentNode.insertBefore( elem, this ); }
 } ); },

 after: function() {
 return domManip( this, arguments, function( elem ) {
 if ( this.parentNode ) {
 this.parentNode.insertBefore( elem, this.nextSibling ); }
 } ); },

 empty: function() {
 var elem,
 i = 0; for ( ; ( elem = this[ i ] ) != null; i++ ) {
 if ( elem.nodeType === 1 ) {

 
 jQuery.cleanData( getAll( elem, false ) );  elem.textContent = ""; }
 }

 return this; },

 clone: function( dataAndEvents, deepDataAndEvents ) {
 dataAndEvents = dataAndEvents == null ? false : dataAndEvents; deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents; return this.map( function() {
 return jQuery.clone( this, dataAndEvents, deepDataAndEvents ); } ); },

 html: function( value ) {
 return access( this, function( value ) {
 var elem = this[ 0 ] || {},
 i = 0,
 l = this.length; if ( value === undefined && elem.nodeType === 1 ) {
 return elem.innerHTML; }

 
 if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
 !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

 value = jQuery.htmlPrefilter( value ); try {
 for ( ; i < l; i++ ) {
 elem = this[ i ] || {};  if ( elem.nodeType === 1 ) {
 jQuery.cleanData( getAll( elem, false ) ); elem.innerHTML = value; }
 }

 elem = 0;  } catch ( e ) {}
 }

 if ( elem ) {
 this.empty().append( value ); }
 }, null, value, arguments.length ); },

 replaceWith: function() {
 var ignored = [];  return domManip( this, arguments, function( elem ) {
 var parent = this.parentNode; if ( jQuery.inArray( this, ignored ) < 0 ) {
 jQuery.cleanData( getAll( this ) ); if ( parent ) {
 parent.replaceChild( elem, this ); }
 }

 
 }, ignored ); }
} );jQuery.each( {
 appendTo: "append",
 prependTo: "prepend",
 insertBefore: "before",
 insertAfter: "after",
 replaceAll: "replaceWith"
}, function( name, original ) {
 jQuery.fn[ name ] = function( selector ) {
 var elems,
 ret = [],
 insert = jQuery( selector ),
 last = insert.length - 1,
 i = 0; for ( ; i <= last; i++ ) {
 elems = i === last ? this : this.clone( true ); jQuery( insert[ i ] )[ original ]( elems );   push.apply( ret, elems.get() ); }

 return this.pushStack( ret ); };} );var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );var getStyles = function( elem ) {

 
 
 
 var view = elem.ownerDocument.defaultView; if ( !view || !view.opener ) {
 view = window; }

 return view.getComputedStyle( elem ); };var swap = function( elem, options, callback ) {
 var ret, name,
 old = {};  for ( name in options ) {
 old[ name ] = elem.style[ name ]; elem.style[ name ] = options[ name ]; }

 ret = callback.call( elem );  for ( name in options ) {
 elem.style[ name ] = old[ name ]; }

 return ret;};var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );( function() {

 
 
 function computeStyleTests() {

 
 if ( !div ) {
 return; }

 container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
 "margin-top:1px;padding:0;border:0"; div.style.cssText =
 "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
 "margin:auto;border:1px;padding:1px;" +
 "width:60%;top:1%"; documentElement.appendChild( container ).appendChild( div ); var divStyle = window.getComputedStyle( div ); pixelPositionVal = divStyle.top !== "1%";  reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;   div.style.right = "60%"; pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;   boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;     div.style.position = "absolute"; scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12; documentElement.removeChild( container );   div = null; }

 function roundPixelMeasures( measure ) {
 return Math.round( parseFloat( measure ) ); }

 var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
 reliableTrDimensionsVal, reliableMarginLeftVal,
 container = document.createElement( "div" ),
 div = document.createElement( "div" );  if ( !div.style ) {
 return; }

 
 
 div.style.backgroundClip = "content-box"; div.cloneNode( true ).style.backgroundClip = ""; support.clearCloneStyle = div.style.backgroundClip === "content-box"; jQuery.extend( support, {
 boxSizingReliable: function() {
 computeStyleTests(); return boxSizingReliableVal; },
 pixelBoxStyles: function() {
 computeStyleTests(); return pixelBoxStylesVal; },
 pixelPosition: function() {
 computeStyleTests(); return pixelPositionVal; },
 reliableMarginLeft: function() {
 computeStyleTests(); return reliableMarginLeftVal; },
 scrollboxSize: function() {
 computeStyleTests(); return scrollboxSizeVal; },

 
 
 
 
 
 reliableTrDimensions: function() {
 var table, tr, trChild, trStyle; if ( reliableTrDimensionsVal == null ) {
 table = document.createElement( "table" ); tr = document.createElement( "tr" ); trChild = document.createElement( "div" ); table.style.cssText = "position:absolute;left:-11111px"; tr.style.height = "1px"; trChild.style.height = "9px"; documentElement
 .appendChild( table )
 .appendChild( tr )
 .appendChild( trChild ); trStyle = window.getComputedStyle( tr ); reliableTrDimensionsVal = parseInt( trStyle.height ) > 3; documentElement.removeChild( table ); }
 return reliableTrDimensionsVal; }
 } );} )();function curCSS( elem, name, computed ) {
 var width, minWidth, maxWidth, ret,

 
 
 
 
 style = elem.style; computed = computed || getStyles( elem );    if ( computed ) {
 ret = computed.getPropertyValue( name ) || computed[ name ]; if ( ret === "" && !isAttached( elem ) ) {
 ret = jQuery.style( elem, name ); }

 
 
 
 
 
 if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

 
 width = style.width; minWidth = style.minWidth; maxWidth = style.maxWidth;  style.minWidth = style.maxWidth = style.width = ret; ret = computed.width;  style.width = width; style.minWidth = minWidth; style.maxWidth = maxWidth; }
 }

 return ret !== undefined ?

 
 
 ret + "" :
 ret;}


function addGetHookIf( conditionFn, hookFn ) {

 
 return {
 get: function() {
 if ( conditionFn() ) {

 
 
 delete this.get; return; }

 
 return ( this.get = hookFn ).apply( this, arguments ); }
 };}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
 emptyStyle = document.createElement( "div" ).style,
 vendorProps = {};function vendorPropName( name ) {

 
 var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
 i = cssPrefixes.length; while ( i-- ) {
 name = cssPrefixes[ i ] + capName; if ( name in emptyStyle ) {
 return name; }
 }
}


function finalPropName( name ) {
 var final = jQuery.cssProps[ name ] || vendorProps[ name ]; if ( final ) {
 return final; }
 if ( name in emptyStyle ) {
 return name; }
 return vendorProps[ name ] = vendorPropName( name ) || name;}


var

 
 
 
 rdisplayswap = /^(none|table(?!-c[ea]).+)/,
 rcustomProp = /^--/,
 cssShow = { position: "absolute", visibility: "hidden", display: "block" },
 cssNormalTransform = {
 letterSpacing: "0",
 fontWeight: "400"
 };function setPositiveNumber( _elem, value, subtract ) {

 
 
 var matches = rcssNum.exec( value ); return matches ?

 
 Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
 value;}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
 var i = dimension === "width" ? 1 : 0,
 extra = 0,
 delta = 0;  if ( box === ( isBorderBox ? "border" : "content" ) ) {
 return 0; }

 for ( ; i < 4; i += 2 ) {

 
 if ( box === "margin" ) {
 delta += jQuery.css( elem, box + cssExpand[ i ], true, styles ); }

 
 if ( !isBorderBox ) {

 
 delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );  if ( box !== "padding" ) {
 delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );  } else {
 extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles ); }

 
 
 } else {

 
 if ( box === "content" ) {
 delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles ); }

 
 if ( box !== "margin" ) {
 delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles ); }
 }
 }

 
 if ( !isBorderBox && computedVal >= 0 ) {

 
 
 delta += Math.max( 0, Math.ceil(
 elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
 computedVal -
 delta -
 extra -
 0.5

 
 
 ) ) || 0; }

 return delta;}

function getWidthOrHeight( elem, dimension, extra ) {

 
 var styles = getStyles( elem ),

 
 
 boxSizingNeeded = !support.boxSizingReliable() || extra,
 isBorderBox = boxSizingNeeded &&
 jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
 valueIsBorderBox = isBorderBox,

 val = curCSS( elem, dimension, styles ),
 offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );   if ( rnumnonpx.test( val ) ) {
 if ( !extra ) {
 return val; }
 val = "auto"; }


 
 
 
 if ( ( !support.boxSizingReliable() && isBorderBox ||

 
 
 
 
 !support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

 
 
 val === "auto" ||

 
 
 !parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

 
 elem.getClientRects().length ) {

 isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";    valueIsBorderBox = offsetProp in elem; if ( valueIsBorderBox ) {
 val = elem[ offsetProp ]; }
 }

 
 val = parseFloat( val ) || 0;  return ( val +
 boxModelAdjustment(
 elem,
 dimension,
 extra || ( isBorderBox ? "border" : "content" ),
 valueIsBorderBox,
 styles,

 
 val
 )
 ) + "px";}

jQuery.extend( {

 
 
 cssHooks: {
 opacity: {
 get: function( elem, computed ) {
 if ( computed ) {

 
 var ret = curCSS( elem, "opacity" ); return ret === "" ? "1" : ret; }
 }
 }
 },

 
 cssNumber: {
 "animationIterationCount": true,
 "columnCount": true,
 "fillOpacity": true,
 "flexGrow": true,
 "flexShrink": true,
 "fontWeight": true,
 "gridArea": true,
 "gridColumn": true,
 "gridColumnEnd": true,
 "gridColumnStart": true,
 "gridRow": true,
 "gridRowEnd": true,
 "gridRowStart": true,
 "lineHeight": true,
 "opacity": true,
 "order": true,
 "orphans": true,
 "widows": true,
 "zIndex": true,
 "zoom": true
 },

 
 
 cssProps: {},

 
 style: function( elem, name, value, extra ) {

 
 if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
 return; }

 
 var ret, type, hooks,
 origName = camelCase( name ),
 isCustomProp = rcustomProp.test( name ),
 style = elem.style;    if ( !isCustomProp ) {
 name = finalPropName( origName ); }

 
 hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];  if ( value !== undefined ) {
 type = typeof value;  if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
 value = adjustCSS( elem, name, ret );  type = "number"; }

 
 if ( value == null || value !== value ) {
 return; }

 
 
 
 if ( type === "number" && !isCustomProp ) {
 value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" ); }

 
 if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
 style[ name ] = "inherit"; }

 
 if ( !hooks || !( "set" in hooks ) ||
 ( value = hooks.set( elem, value, extra ) ) !== undefined ) {

 if ( isCustomProp ) {
 style.setProperty( name, value ); } else {
 style[ name ] = value; }
 }

 } else {

 
 if ( hooks && "get" in hooks &&
 ( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

 return ret; }

 
 return style[ name ]; }
 },

 css: function( elem, name, extra, styles ) {
 var val, num, hooks,
 origName = camelCase( name ),
 isCustomProp = rcustomProp.test( name );    if ( !isCustomProp ) {
 name = finalPropName( origName ); }

 
 hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];  if ( hooks && "get" in hooks ) {
 val = hooks.get( elem, true, extra ); }

 
 if ( val === undefined ) {
 val = curCSS( elem, name, styles ); }

 
 if ( val === "normal" && name in cssNormalTransform ) {
 val = cssNormalTransform[ name ]; }

 
 if ( extra === "" || extra ) {
 num = parseFloat( val ); return extra === true || isFinite( num ) ? num || 0 : val; }

 return val; }
} );jQuery.each( [ "height", "width" ], function( _i, dimension ) {
 jQuery.cssHooks[ dimension ] = {
 get: function( elem, computed, extra ) {
 if ( computed ) {

 
 
 return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

 
 
 
 
 
 
 ( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
 swap( elem, cssShow, function() {
 return getWidthOrHeight( elem, dimension, extra ); } ) :
 getWidthOrHeight( elem, dimension, extra ); }
 },

 set: function( elem, value, extra ) {
 var matches,
 styles = getStyles( elem ),

 
 
 scrollboxSizeBuggy = !support.scrollboxSize() &&
 styles.position === "absolute",

 
 boxSizingNeeded = scrollboxSizeBuggy || extra,
 isBorderBox = boxSizingNeeded &&
 jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
 subtract = extra ?
 boxModelAdjustment(
 elem,
 dimension,
 extra,
 isBorderBox,
 styles
 ) :
 0;   if ( isBorderBox && scrollboxSizeBuggy ) {
 subtract -= Math.ceil(
 elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
 parseFloat( styles[ dimension ] ) -
 boxModelAdjustment( elem, dimension, "border", false, styles ) -
 0.5
 ); }

 
 if ( subtract && ( matches = rcssNum.exec( value ) ) &&
 ( matches[ 3 ] || "px" ) !== "px" ) {

 elem.style[ dimension ] = value; value = jQuery.css( elem, dimension ); }

 return setPositiveNumber( elem, value, subtract ); }
 };} );jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
 function( elem, computed ) {
 if ( computed ) {
 return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
 elem.getBoundingClientRect().left -
 swap( elem, { marginLeft: 0 }, function() {
 return elem.getBoundingClientRect().left; } )
 ) + "px"; }
 }
);jQuery.each( {
 margin: "",
 padding: "",
 border: "Width"
}, function( prefix, suffix ) {
 jQuery.cssHooks[ prefix + suffix ] = {
 expand: function( value ) {
 var i = 0,
 expanded = {},

 
 parts = typeof value === "string" ? value.split( " " ) : [ value ]; for ( ; i < 4; i++ ) {
 expanded[ prefix + cssExpand[ i ] + suffix ] =
 parts[ i ] || parts[ i - 2 ] || parts[ 0 ]; }

 return expanded; }
 }; if ( prefix !== "margin" ) {
 jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber; }
} );jQuery.fn.extend( {
 css: function( name, value ) {
 return access( this, function( elem, name, value ) {
 var styles, len,
 map = {},
 i = 0; if ( Array.isArray( name ) ) {
 styles = getStyles( elem ); len = name.length; for ( ; i < len; i++ ) {
 map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles ); }

 return map; }

 return value !== undefined ?
 jQuery.style( elem, name, value ) :
 jQuery.css( elem, name ); }, name, value, arguments.length > 1 ); }
} );function Tween( elem, options, prop, end, easing ) {
 return new Tween.prototype.init( elem, options, prop, end, easing );}
jQuery.Tween = Tween;Tween.prototype = {
 constructor: Tween,
 init: function( elem, options, prop, end, easing, unit ) {
 this.elem = elem; this.prop = prop; this.easing = easing || jQuery.easing._default; this.options = options; this.start = this.now = this.cur(); this.end = end; this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" ); },
 cur: function() {
 var hooks = Tween.propHooks[ this.prop ]; return hooks && hooks.get ?
 hooks.get( this ) :
 Tween.propHooks._default.get( this ); },
 run: function( percent ) {
 var eased,
 hooks = Tween.propHooks[ this.prop ]; if ( this.options.duration ) {
 this.pos = eased = jQuery.easing[ this.easing ](
 percent, this.options.duration * percent, 0, 1, this.options.duration
 ); } else {
 this.pos = eased = percent; }
 this.now = ( this.end - this.start ) * eased + this.start; if ( this.options.step ) {
 this.options.step.call( this.elem, this.now, this ); }

 if ( hooks && hooks.set ) {
 hooks.set( this ); } else {
 Tween.propHooks._default.set( this ); }
 return this; }
};Tween.prototype.init.prototype = Tween.prototype;Tween.propHooks = {
 _default: {
 get: function( tween ) {
 var result;   if ( tween.elem.nodeType !== 1 ||
 tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
 return tween.elem[ tween.prop ]; }

 
 
 
 
 result = jQuery.css( tween.elem, tween.prop, "" );  return !result || result === "auto" ? 0 : result; },
 set: function( tween ) {

 
 
 
 if ( jQuery.fx.step[ tween.prop ] ) {
 jQuery.fx.step[ tween.prop ]( tween ); } else if ( tween.elem.nodeType === 1 && (
 jQuery.cssHooks[ tween.prop ] ||
 tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
 jQuery.style( tween.elem, tween.prop, tween.now + tween.unit ); } else {
 tween.elem[ tween.prop ] = tween.now; }
 }
 }
};Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
 set: function( tween ) {
 if ( tween.elem.nodeType && tween.elem.parentNode ) {
 tween.elem[ tween.prop ] = tween.now; }
 }
};jQuery.easing = {
 linear: function( p ) {
 return p; },
 swing: function( p ) {
 return 0.5 - Math.cos( p * Math.PI ) / 2; },
 _default: "swing"
};jQuery.fx = Tween.prototype.init;jQuery.fx.step = {};var
 fxNow, inProgress,
 rfxtypes = /^(?:toggle|show|hide)$/,
 rrun = /queueHooks$/;function schedule() {
 if ( inProgress ) {
 if ( document.hidden === false && window.requestAnimationFrame ) {
 window.requestAnimationFrame( schedule ); } else {
 window.setTimeout( schedule, jQuery.fx.interval ); }

 jQuery.fx.tick(); }
}


function createFxNow() {
 window.setTimeout( function() {
 fxNow = undefined; } ); return ( fxNow = Date.now() );}


function genFx( type, includeWidth ) {
 var which,
 i = 0,
 attrs = { height: type };   includeWidth = includeWidth ? 1 : 0; for ( ; i < 4; i += 2 - includeWidth ) {
 which = cssExpand[ i ]; attrs[ "margin" + which ] = attrs[ "padding" + which ] = type; }

 if ( includeWidth ) {
 attrs.opacity = attrs.width = type; }

 return attrs;}

function createTween( value, prop, animation ) {
 var tween,
 collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
 index = 0,
 length = collection.length; for ( ; index < length; index++ ) {
 if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

 
 return tween; }
 }
}

function defaultPrefilter( elem, props, opts ) {
 var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
 isBox = "width" in props || "height" in props,
 anim = this,
 orig = {},
 style = elem.style,
 hidden = elem.nodeType && isHiddenWithinTree( elem ),
 dataShow = dataPriv.get( elem, "fxshow" );  if ( !opts.queue ) {
 hooks = jQuery._queueHooks( elem, "fx" ); if ( hooks.unqueued == null ) {
 hooks.unqueued = 0; oldfire = hooks.empty.fire; hooks.empty.fire = function() {
 if ( !hooks.unqueued ) {
 oldfire(); }
 }; }
 hooks.unqueued++; anim.always( function() {

 
 anim.always( function() {
 hooks.unqueued--; if ( !jQuery.queue( elem, "fx" ).length ) {
 hooks.empty.fire(); }
 } ); } ); }

 
 for ( prop in props ) {
 value = props[ prop ]; if ( rfxtypes.test( value ) ) {
 delete props[ prop ]; toggle = toggle || value === "toggle"; if ( value === ( hidden ? "hide" : "show" ) ) {

 
 
 if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
 hidden = true;  } else {
 continue; }
 }
 orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop ); }
 }

 
 propTween = !jQuery.isEmptyObject( props ); if ( !propTween && jQuery.isEmptyObject( orig ) ) {
 return; }

 
 if ( isBox && elem.nodeType === 1 ) {

 
 
 
 
 opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];  restoreDisplay = dataShow && dataShow.display; if ( restoreDisplay == null ) {
 restoreDisplay = dataPriv.get( elem, "display" ); }
 display = jQuery.css( elem, "display" ); if ( display === "none" ) {
 if ( restoreDisplay ) {
 display = restoreDisplay; } else {

 
 showHide( [ elem ], true ); restoreDisplay = elem.style.display || restoreDisplay; display = jQuery.css( elem, "display" ); showHide( [ elem ] ); }
 }

 
 if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
 if ( jQuery.css( elem, "float" ) === "none" ) {

 
 if ( !propTween ) {
 anim.done( function() {
 style.display = restoreDisplay; } ); if ( restoreDisplay == null ) {
 display = style.display; restoreDisplay = display === "none" ? "" : display; }
 }
 style.display = "inline-block"; }
 }
 }

 if ( opts.overflow ) {
 style.overflow = "hidden"; anim.always( function() {
 style.overflow = opts.overflow[ 0 ]; style.overflowX = opts.overflow[ 1 ]; style.overflowY = opts.overflow[ 2 ]; } ); }

 
 propTween = false; for ( prop in orig ) {

 
 if ( !propTween ) {
 if ( dataShow ) {
 if ( "hidden" in dataShow ) {
 hidden = dataShow.hidden; }
 } else {
 dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } ); }

 
 if ( toggle ) {
 dataShow.hidden = !hidden; }

 
 if ( hidden ) {
 showHide( [ elem ], true ); }

 

 anim.done( function() {

 

 
 if ( !hidden ) {
 showHide( [ elem ] ); }
 dataPriv.remove( elem, "fxshow" ); for ( prop in orig ) {
 jQuery.style( elem, prop, orig[ prop ] ); }
 } ); }

 
 propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim ); if ( !( prop in dataShow ) ) {
 dataShow[ prop ] = propTween.start; if ( hidden ) {
 propTween.end = propTween.start; propTween.start = 0; }
 }
 }
}

function propFilter( props, specialEasing ) {
 var index, name, easing, value, hooks;  for ( index in props ) {
 name = camelCase( index ); easing = specialEasing[ name ]; value = props[ index ]; if ( Array.isArray( value ) ) {
 easing = value[ 1 ]; value = props[ index ] = value[ 0 ]; }

 if ( index !== name ) {
 props[ name ] = value; delete props[ index ]; }

 hooks = jQuery.cssHooks[ name ]; if ( hooks && "expand" in hooks ) {
 value = hooks.expand( value ); delete props[ name ];   for ( index in value ) {
 if ( !( index in props ) ) {
 props[ index ] = value[ index ]; specialEasing[ index ] = easing; }
 }
 } else {
 specialEasing[ name ] = easing; }
 }
}

function Animation( elem, properties, options ) {
 var result,
 stopped,
 index = 0,
 length = Animation.prefilters.length,
 deferred = jQuery.Deferred().always( function() {

 
 delete tick.elem; } ),
 tick = function() {
 if ( stopped ) {
 return false; }
 var currentTime = fxNow || createFxNow(),
 remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

 
 
 temp = remaining / animation.duration || 0,
 percent = 1 - temp,
 index = 0,
 length = animation.tweens.length; for ( ; index < length; index++ ) {
 animation.tweens[ index ].run( percent ); }

 deferred.notifyWith( elem, [ animation, percent, remaining ] );  if ( percent < 1 && length ) {
 return remaining; }

 
 if ( !length ) {
 deferred.notifyWith( elem, [ animation, 1, 0 ] ); }

 
 deferred.resolveWith( elem, [ animation ] ); return false; },
 animation = deferred.promise( {
 elem: elem,
 props: jQuery.extend( {}, properties ),
 opts: jQuery.extend( true, {
 specialEasing: {},
 easing: jQuery.easing._default
 }, options ),
 originalProperties: properties,
 originalOptions: options,
 startTime: fxNow || createFxNow(),
 duration: options.duration,
 tweens: [],
 createTween: function( prop, end ) {
 var tween = jQuery.Tween( elem, animation.opts, prop, end,
 animation.opts.specialEasing[ prop ] || animation.opts.easing ); animation.tweens.push( tween ); return tween; },
 stop: function( gotoEnd ) {
 var index = 0,

 
 
 length = gotoEnd ? animation.tweens.length : 0; if ( stopped ) {
 return this; }
 stopped = true; for ( ; index < length; index++ ) {
 animation.tweens[ index ].run( 1 ); }

 
 if ( gotoEnd ) {
 deferred.notifyWith( elem, [ animation, 1, 0 ] ); deferred.resolveWith( elem, [ animation, gotoEnd ] ); } else {
 deferred.rejectWith( elem, [ animation, gotoEnd ] ); }
 return this; }
 } ),
 props = animation.props; propFilter( props, animation.opts.specialEasing ); for ( ; index < length; index++ ) {
 result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts ); if ( result ) {
 if ( isFunction( result.stop ) ) {
 jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
 result.stop.bind( result ); }
 return result; }
 }

 jQuery.map( props, createTween, animation ); if ( isFunction( animation.opts.start ) ) {
 animation.opts.start.call( elem, animation ); }

 
 animation
 .progress( animation.opts.progress )
 .done( animation.opts.done, animation.opts.complete )
 .fail( animation.opts.fail )
 .always( animation.opts.always ); jQuery.fx.timer(
 jQuery.extend( tick, {
 elem: elem,
 anim: animation,
 queue: animation.opts.queue
 } )
 ); return animation;}

jQuery.Animation = jQuery.extend( Animation, {

 tweeners: {
 "*": [ function( prop, value ) {
 var tween = this.createTween( prop, value ); adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween ); return tween; } ]
 },

 tweener: function( props, callback ) {
 if ( isFunction( props ) ) {
 callback = props; props = [ "*" ]; } else {
 props = props.match( rnothtmlwhite ); }

 var prop,
 index = 0,
 length = props.length; for ( ; index < length; index++ ) {
 prop = props[ index ]; Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || []; Animation.tweeners[ prop ].unshift( callback ); }
 },

 prefilters: [ defaultPrefilter ],

 prefilter: function( callback, prepend ) {
 if ( prepend ) {
 Animation.prefilters.unshift( callback ); } else {
 Animation.prefilters.push( callback ); }
 }
} );jQuery.speed = function( speed, easing, fn ) {
 var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
 complete: fn || !fn && easing ||
 isFunction( speed ) && speed,
 duration: speed,
 easing: fn && easing || easing && !isFunction( easing ) && easing
 };  if ( jQuery.fx.off ) {
 opt.duration = 0; } else {
 if ( typeof opt.duration !== "number" ) {
 if ( opt.duration in jQuery.fx.speeds ) {
 opt.duration = jQuery.fx.speeds[ opt.duration ]; } else {
 opt.duration = jQuery.fx.speeds._default; }
 }
 }

 
 if ( opt.queue == null || opt.queue === true ) {
 opt.queue = "fx"; }

 
 opt.old = opt.complete; opt.complete = function() {
 if ( isFunction( opt.old ) ) {
 opt.old.call( this ); }

 if ( opt.queue ) {
 jQuery.dequeue( this, opt.queue ); }
 }; return opt;};jQuery.fn.extend( {
 fadeTo: function( speed, to, easing, callback ) {

 
 return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

 
 .end().animate( { opacity: to }, speed, easing, callback ); },
 animate: function( prop, speed, easing, callback ) {
 var empty = jQuery.isEmptyObject( prop ),
 optall = jQuery.speed( speed, easing, callback ),
 doAnimation = function() {

 
 var anim = Animation( this, jQuery.extend( {}, prop ), optall );  if ( empty || dataPriv.get( this, "finish" ) ) {
 anim.stop( true ); }
 }; doAnimation.finish = doAnimation; return empty || optall.queue === false ?
 this.each( doAnimation ) :
 this.queue( optall.queue, doAnimation ); },
 stop: function( type, clearQueue, gotoEnd ) {
 var stopQueue = function( hooks ) {
 var stop = hooks.stop; delete hooks.stop; stop( gotoEnd ); }; if ( typeof type !== "string" ) {
 gotoEnd = clearQueue; clearQueue = type; type = undefined; }
 if ( clearQueue ) {
 this.queue( type || "fx", [] ); }

 return this.each( function() {
 var dequeue = true,
 index = type != null && type + "queueHooks",
 timers = jQuery.timers,
 data = dataPriv.get( this ); if ( index ) {
 if ( data[ index ] && data[ index ].stop ) {
 stopQueue( data[ index ] ); }
 } else {
 for ( index in data ) {
 if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
 stopQueue( data[ index ] ); }
 }
 }

 for ( index = timers.length; index--; ) {
 if ( timers[ index ].elem === this &&
 ( type == null || timers[ index ].queue === type ) ) {

 timers[ index ].anim.stop( gotoEnd ); dequeue = false; timers.splice( index, 1 ); }
 }

 
 
 
 if ( dequeue || !gotoEnd ) {
 jQuery.dequeue( this, type ); }
 } ); },
 finish: function( type ) {
 if ( type !== false ) {
 type = type || "fx"; }
 return this.each( function() {
 var index,
 data = dataPriv.get( this ),
 queue = data[ type + "queue" ],
 hooks = data[ type + "queueHooks" ],
 timers = jQuery.timers,
 length = queue ? queue.length : 0;  data.finish = true;  jQuery.queue( this, type, [] ); if ( hooks && hooks.stop ) {
 hooks.stop.call( this, true ); }

 
 for ( index = timers.length; index--; ) {
 if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
 timers[ index ].anim.stop( true ); timers.splice( index, 1 ); }
 }

 
 for ( index = 0; index < length; index++ ) {
 if ( queue[ index ] && queue[ index ].finish ) {
 queue[ index ].finish.call( this ); }
 }

 
 delete data.finish; } ); }
} );jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
 var cssFn = jQuery.fn[ name ]; jQuery.fn[ name ] = function( speed, easing, callback ) {
 return speed == null || typeof speed === "boolean" ?
 cssFn.apply( this, arguments ) :
 this.animate( genFx( name, true ), speed, easing, callback ); };} );jQuery.each( {
 slideDown: genFx( "show" ),
 slideUp: genFx( "hide" ),
 slideToggle: genFx( "toggle" ),
 fadeIn: { opacity: "show" },
 fadeOut: { opacity: "hide" },
 fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
 jQuery.fn[ name ] = function( speed, easing, callback ) {
 return this.animate( props, speed, easing, callback ); };} );jQuery.timers = [];jQuery.fx.tick = function() {
 var timer,
 i = 0,
 timers = jQuery.timers; fxNow = Date.now(); for ( ; i < timers.length; i++ ) {
 timer = timers[ i ];  if ( !timer() && timers[ i ] === timer ) {
 timers.splice( i--, 1 ); }
 }

 if ( !timers.length ) {
 jQuery.fx.stop(); }
 fxNow = undefined;};jQuery.fx.timer = function( timer ) {
 jQuery.timers.push( timer ); jQuery.fx.start();};jQuery.fx.interval = 13;jQuery.fx.start = function() {
 if ( inProgress ) {
 return; }

 inProgress = true; schedule();};jQuery.fx.stop = function() {
 inProgress = null;};jQuery.fx.speeds = {
 slow: 600,
 fast: 200,

 
 _default: 400
};jQuery.fn.delay = function( time, type ) {
 time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time; type = type || "fx"; return this.queue( type, function( next, hooks ) {
 var timeout = window.setTimeout( next, time ); hooks.stop = function() {
 window.clearTimeout( timeout ); }; } );};( function() {
 var input = document.createElement( "input" ),
 select = document.createElement( "select" ),
 opt = select.appendChild( document.createElement( "option" ) ); input.type = "checkbox";   support.checkOn = input.value !== "";   support.optSelected = opt.selected;   input = document.createElement( "input" ); input.value = "t"; input.type = "radio"; support.radioValue = input.value === "t";} )();var boolHook,
 attrHandle = jQuery.expr.attrHandle;jQuery.fn.extend( {
 attr: function( name, value ) {
 return access( this, jQuery.attr, name, value, arguments.length > 1 ); },

 removeAttr: function( name ) {
 return this.each( function() {
 jQuery.removeAttr( this, name ); } ); }
} );jQuery.extend( {
 attr: function( elem, name, value ) {
 var ret, hooks,
 nType = elem.nodeType;  if ( nType === 3 || nType === 8 || nType === 2 ) {
 return; }

 
 if ( typeof elem.getAttribute === "undefined" ) {
 return jQuery.prop( elem, name, value ); }

 
 
 if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
 hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
 ( jQuery.expr.match.bool.test( name ) ? boolHook : undefined ); }

 if ( value !== undefined ) {
 if ( value === null ) {
 jQuery.removeAttr( elem, name ); return; }

 if ( hooks && "set" in hooks &&
 ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
 return ret; }

 elem.setAttribute( name, value + "" ); return value; }

 if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
 return ret; }

 ret = jQuery.find.attr( elem, name );  return ret == null ? undefined : ret; },

 attrHooks: {
 type: {
 set: function( elem, value ) {
 if ( !support.radioValue && value === "radio" &&
 nodeName( elem, "input" ) ) {
 var val = elem.value; elem.setAttribute( "type", value ); if ( val ) {
 elem.value = val; }
 return value; }
 }
 }
 },

 removeAttr: function( elem, value ) {
 var name,
 i = 0,

 
 
 attrNames = value && value.match( rnothtmlwhite ); if ( attrNames && elem.nodeType === 1 ) {
 while ( ( name = attrNames[ i++ ] ) ) {
 elem.removeAttribute( name ); }
 }
 }
} );boolHook = {
 set: function( elem, value, name ) {
 if ( value === false ) {

 
 jQuery.removeAttr( elem, name ); } else {
 elem.setAttribute( name, name ); }
 return name; }
};jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
 var getter = attrHandle[ name ] || jQuery.find.attr; attrHandle[ name ] = function( elem, name, isXML ) {
 var ret, handle,
 lowercaseName = name.toLowerCase(); if ( !isXML ) {

 
 handle = attrHandle[ lowercaseName ]; attrHandle[ lowercaseName ] = ret; ret = getter( elem, name, isXML ) != null ?
 lowercaseName :
 null; attrHandle[ lowercaseName ] = handle; }
 return ret; };} );var rfocusable = /^(?:input|select|textarea|button)$/i,
 rclickable = /^(?:a|area)$/i;jQuery.fn.extend( {
 prop: function( name, value ) {
 return access( this, jQuery.prop, name, value, arguments.length > 1 ); },

 removeProp: function( name ) {
 return this.each( function() {
 delete this[ jQuery.propFix[ name ] || name ]; } ); }
} );jQuery.extend( {
 prop: function( elem, name, value ) {
 var ret, hooks,
 nType = elem.nodeType;  if ( nType === 3 || nType === 8 || nType === 2 ) {
 return; }

 if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

 
 name = jQuery.propFix[ name ] || name; hooks = jQuery.propHooks[ name ]; }

 if ( value !== undefined ) {
 if ( hooks && "set" in hooks &&
 ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
 return ret; }

 return ( elem[ name ] = value ); }

 if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
 return ret; }

 return elem[ name ]; },

 propHooks: {
 tabIndex: {
 get: function( elem ) {

 
 
 
 
 
 var tabindex = jQuery.find.attr( elem, "tabindex" ); if ( tabindex ) {
 return parseInt( tabindex, 10 ); }

 if (
 rfocusable.test( elem.nodeName ) ||
 rclickable.test( elem.nodeName ) &&
 elem.href
 ) {
 return 0; }

 return -1; }
 }
 },

 propFix: {
 "for": "htmlFor",
 "class": "className"
 }
} );if ( !support.optSelected ) {
 jQuery.propHooks.selected = {
 get: function( elem ) {

 

 var parent = elem.parentNode; if ( parent && parent.parentNode ) {
 parent.parentNode.selectedIndex; }
 return null; },
 set: function( elem ) {

 

 var parent = elem.parentNode; if ( parent ) {
 parent.selectedIndex; if ( parent.parentNode ) {
 parent.parentNode.selectedIndex; }
 }
 }
 };}

jQuery.each( [
 "tabIndex",
 "readOnly",
 "maxLength",
 "cellSpacing",
 "cellPadding",
 "rowSpan",
 "colSpan",
 "useMap",
 "frameBorder",
 "contentEditable"
], function() {
 jQuery.propFix[ this.toLowerCase() ] = this;} );   function stripAndCollapse( value ) {
 var tokens = value.match( rnothtmlwhite ) || []; return tokens.join( " " ); }


function getClass( elem ) {
 return elem.getAttribute && elem.getAttribute( "class" ) || "";}

function classesToArray( value ) {
 if ( Array.isArray( value ) ) {
 return value; }
 if ( typeof value === "string" ) {
 return value.match( rnothtmlwhite ) || []; }
 return [];}

jQuery.fn.extend( {
 addClass: function( value ) {
 var classes, elem, cur, curValue, clazz, j, finalValue,
 i = 0; if ( isFunction( value ) ) {
 return this.each( function( j ) {
 jQuery( this ).addClass( value.call( this, j, getClass( this ) ) ); } ); }

 classes = classesToArray( value ); if ( classes.length ) {
 while ( ( elem = this[ i++ ] ) ) {
 curValue = getClass( elem ); cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " ); if ( cur ) {
 j = 0; while ( ( clazz = classes[ j++ ] ) ) {
 if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
 cur += clazz + " "; }
 }

 
 finalValue = stripAndCollapse( cur ); if ( curValue !== finalValue ) {
 elem.setAttribute( "class", finalValue ); }
 }
 }
 }

 return this; },

 removeClass: function( value ) {
 var classes, elem, cur, curValue, clazz, j, finalValue,
 i = 0; if ( isFunction( value ) ) {
 return this.each( function( j ) {
 jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) ); } ); }

 if ( !arguments.length ) {
 return this.attr( "class", "" ); }

 classes = classesToArray( value ); if ( classes.length ) {
 while ( ( elem = this[ i++ ] ) ) {
 curValue = getClass( elem );  cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " ); if ( cur ) {
 j = 0; while ( ( clazz = classes[ j++ ] ) ) {

 
 while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
 cur = cur.replace( " " + clazz + " ", " " ); }
 }

 
 finalValue = stripAndCollapse( cur ); if ( curValue !== finalValue ) {
 elem.setAttribute( "class", finalValue ); }
 }
 }
 }

 return this; },

 toggleClass: function( value, stateVal ) {
 var type = typeof value,
 isValidValue = type === "string" || Array.isArray( value ); if ( typeof stateVal === "boolean" && isValidValue ) {
 return stateVal ? this.addClass( value ) : this.removeClass( value ); }

 if ( isFunction( value ) ) {
 return this.each( function( i ) {
 jQuery( this ).toggleClass(
 value.call( this, i, getClass( this ), stateVal ),
 stateVal
 ); } ); }

 return this.each( function() {
 var className, i, self, classNames; if ( isValidValue ) {

 
 i = 0; self = jQuery( this ); classNames = classesToArray( value ); while ( ( className = classNames[ i++ ] ) ) {

 
 if ( self.hasClass( className ) ) {
 self.removeClass( className ); } else {
 self.addClass( className ); }
 }

 
 } else if ( value === undefined || type === "boolean" ) {
 className = getClass( this ); if ( className ) {

 
 dataPriv.set( this, "__className__", className ); }

 
 
 
 
 if ( this.setAttribute ) {
 this.setAttribute( "class",
 className || value === false ?
 "" :
 dataPriv.get( this, "__className__" ) || ""
 ); }
 }
 } ); },

 hasClass: function( selector ) {
 var className, elem,
 i = 0; className = " " + selector + " "; while ( ( elem = this[ i++ ] ) ) {
 if ( elem.nodeType === 1 &&
 ( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
 return true; }
 }

 return false; }
} );var rreturn = /\r/g;jQuery.fn.extend( {
 val: function( value ) {
 var hooks, ret, valueIsFunction,
 elem = this[ 0 ]; if ( !arguments.length ) {
 if ( elem ) {
 hooks = jQuery.valHooks[ elem.type ] ||
 jQuery.valHooks[ elem.nodeName.toLowerCase() ]; if ( hooks &&
 "get" in hooks &&
 ( ret = hooks.get( elem, "value" ) ) !== undefined
 ) {
 return ret; }

 ret = elem.value;  if ( typeof ret === "string" ) {
 return ret.replace( rreturn, "" ); }

 
 return ret == null ? "" : ret; }

 return; }

 valueIsFunction = isFunction( value ); return this.each( function( i ) {
 var val; if ( this.nodeType !== 1 ) {
 return; }

 if ( valueIsFunction ) {
 val = value.call( this, i, jQuery( this ).val() ); } else {
 val = value; }

 
 if ( val == null ) {
 val = ""; } else if ( typeof val === "number" ) {
 val += ""; } else if ( Array.isArray( val ) ) {
 val = jQuery.map( val, function( value ) {
 return value == null ? "" : value + ""; } ); }

 hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];  if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
 this.value = val; }
 } ); }
} );jQuery.extend( {
 valHooks: {
 option: {
 get: function( elem ) {

 var val = jQuery.find.attr( elem, "value" ); return val != null ?
 val :

 
 
 
 
 stripAndCollapse( jQuery.text( elem ) ); }
 },
 select: {
 get: function( elem ) {
 var value, option, i,
 options = elem.options,
 index = elem.selectedIndex,
 one = elem.type === "select-one",
 values = one ? null : [],
 max = one ? index + 1 : options.length; if ( index < 0 ) {
 i = max; } else {
 i = one ? index : 0; }

 
 for ( ; i < max; i++ ) {
 option = options[ i ];   if ( ( option.selected || i === index ) &&

 
 !option.disabled &&
 ( !option.parentNode.disabled ||
 !nodeName( option.parentNode, "optgroup" ) ) ) {

 
 value = jQuery( option ).val();  if ( one ) {
 return value; }

 
 values.push( value ); }
 }

 return values; },

 set: function( elem, value ) {
 var optionSet, option,
 options = elem.options,
 values = jQuery.makeArray( value ),
 i = options.length; while ( i-- ) {
 option = options[ i ];  if ( option.selected =
 jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
 ) {
 optionSet = true; }

 
 }

 
 if ( !optionSet ) {
 elem.selectedIndex = -1; }
 return values; }
 }
 }
} );jQuery.each( [ "radio", "checkbox" ], function() {
 jQuery.valHooks[ this ] = {
 set: function( elem, value ) {
 if ( Array.isArray( value ) ) {
 return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 ); }
 }
 }; if ( !support.checkOn ) {
 jQuery.valHooks[ this ].get = function( elem ) {
 return elem.getAttribute( "value" ) === null ? "on" : elem.value; }; }
} );support.focusin = "onfocusin" in window;var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
 stopPropagationCallback = function( e ) {
 e.stopPropagation(); };jQuery.extend( jQuery.event, {

 trigger: function( event, data, elem, onlyHandlers ) {

 var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
 eventPath = [ elem || document ],
 type = hasOwn.call( event, "type" ) ? event.type : event,
 namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : []; cur = lastElement = tmp = elem = elem || document;  if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
 return; }

 
 if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
 return; }

 if ( type.indexOf( "." ) > -1 ) {

 
 namespaces = type.split( "." ); type = namespaces.shift(); namespaces.sort(); }
 ontype = type.indexOf( ":" ) < 0 && "on" + type;  event = event[ jQuery.expando ] ?
 event :
 new jQuery.Event( type, typeof event === "object" && event );  event.isTrigger = onlyHandlers ? 2 : 3; event.namespace = namespaces.join( "." ); event.rnamespace = event.namespace ?
 new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
 null;  event.result = undefined; if ( !event.target ) {
 event.target = elem; }

 
 data = data == null ?
 [ event ] :
 jQuery.makeArray( data, [ event ] );  special = jQuery.event.special[ type ] || {}; if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
 return; }

 
 
 if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

 bubbleType = special.delegateType || type; if ( !rfocusMorph.test( bubbleType + type ) ) {
 cur = cur.parentNode; }
 for ( ; cur; cur = cur.parentNode ) {
 eventPath.push( cur ); tmp = cur; }

 
 if ( tmp === ( elem.ownerDocument || document ) ) {
 eventPath.push( tmp.defaultView || tmp.parentWindow || window ); }
 }

 
 i = 0; while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
 lastElement = cur; event.type = i > 1 ?
 bubbleType :
 special.bindType || type;  handle = (
 dataPriv.get( cur, "events" ) || Object.create( null )
 )[ event.type ] &&
 dataPriv.get( cur, "handle" ); if ( handle ) {
 handle.apply( cur, data ); }

 
 handle = ontype && cur[ ontype ]; if ( handle && handle.apply && acceptData( cur ) ) {
 event.result = handle.apply( cur, data ); if ( event.result === false ) {
 event.preventDefault(); }
 }
 }
 event.type = type;  if ( !onlyHandlers && !event.isDefaultPrevented() ) {

 if ( ( !special._default ||
 special._default.apply( eventPath.pop(), data ) === false ) &&
 acceptData( elem ) ) {

 
 
 if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

 
 tmp = elem[ ontype ]; if ( tmp ) {
 elem[ ontype ] = null; }

 
 jQuery.event.triggered = type; if ( event.isPropagationStopped() ) {
 lastElement.addEventListener( type, stopPropagationCallback ); }

 elem[ type ](); if ( event.isPropagationStopped() ) {
 lastElement.removeEventListener( type, stopPropagationCallback ); }

 jQuery.event.triggered = undefined; if ( tmp ) {
 elem[ ontype ] = tmp; }
 }
 }
 }

 return event.result; },

 
 
 simulate: function( type, elem, event ) {
 var e = jQuery.extend(
 new jQuery.Event(),
 event,
 {
 type: type,
 isSimulated: true
 }
 ); jQuery.event.trigger( e, null, elem ); }

} );jQuery.fn.extend( {

 trigger: function( type, data ) {
 return this.each( function() {
 jQuery.event.trigger( type, data, this ); } ); },
 triggerHandler: function( type, data ) {
 var elem = this[ 0 ]; if ( elem ) {
 return jQuery.event.trigger( type, data, elem, true ); }
 }
} );if ( !support.focusin ) {
 jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

 
 var handler = function( event ) {
 jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) ); }; jQuery.event.special[ fix ] = {
 setup: function() {

 
 
 var doc = this.ownerDocument || this.document || this,
 attaches = dataPriv.access( doc, fix ); if ( !attaches ) {
 doc.addEventListener( orig, handler, true ); }
 dataPriv.access( doc, fix, ( attaches || 0 ) + 1 ); },
 teardown: function() {
 var doc = this.ownerDocument || this.document || this,
 attaches = dataPriv.access( doc, fix ) - 1; if ( !attaches ) {
 doc.removeEventListener( orig, handler, true ); dataPriv.remove( doc, fix ); } else {
 dataPriv.access( doc, fix, attaches ); }
 }
 }; } );}
var location = window.location;var nonce = { guid: Date.now() };var rquery = ( /\?/ );jQuery.parseXML = function( data ) {
 var xml; if ( !data || typeof data !== "string" ) {
 return null; }

 
 
 try {
 xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" ); } catch ( e ) {
 xml = undefined; }

 if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
 jQuery.error( "Invalid XML: " + data ); }
 return xml;};var
 rbracket = /\[\]$/,
 rCRLF = /\r?\n/g,
 rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
 rsubmittable = /^(?:input|select|textarea|keygen)/i;function buildParams( prefix, obj, traditional, add ) {
 var name; if ( Array.isArray( obj ) ) {

 
 jQuery.each( obj, function( i, v ) {
 if ( traditional || rbracket.test( prefix ) ) {

 
 add( prefix, v ); } else {

 
 buildParams(
 prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
 v,
 traditional,
 add
 ); }
 } ); } else if ( !traditional && toType( obj ) === "object" ) {

 
 for ( name in obj ) {
 buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add ); }

 } else {

 
 add( prefix, obj ); }
}



jQuery.param = function( a, traditional ) {
 var prefix,
 s = [],
 add = function( key, valueOrFunction ) {

 
 var value = isFunction( valueOrFunction ) ?
 valueOrFunction() :
 valueOrFunction; s[ s.length ] = encodeURIComponent( key ) + "=" +
 encodeURIComponent( value == null ? "" : value ); }; if ( a == null ) {
 return ""; }

 
 if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

 
 jQuery.each( a, function() {
 add( this.name, this.value ); } ); } else {

 
 
 for ( prefix in a ) {
 buildParams( prefix, a[ prefix ], traditional, add ); }
 }

 
 return s.join( "&" );};jQuery.fn.extend( {
 serialize: function() {
 return jQuery.param( this.serializeArray() ); },
 serializeArray: function() {
 return this.map( function() {

 
 var elements = jQuery.prop( this, "elements" ); return elements ? jQuery.makeArray( elements ) : this; } )
 .filter( function() {
 var type = this.type;  return this.name && !jQuery( this ).is( ":disabled" ) &&
 rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
 ( this.checked || !rcheckableType.test( type ) ); } )
 .map( function( _i, elem ) {
 var val = jQuery( this ).val(); if ( val == null ) {
 return null; }

 if ( Array.isArray( val ) ) {
 return jQuery.map( val, function( val ) {
 return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) }; } ); }

 return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) }; } ).get(); }
} );var
 r20 = /%20/g,
 rhash = /#.*$/,
 rantiCache = /([?&])_=[^&]*/,
 rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

 
 rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
 rnoContent = /^(?:GET|HEAD)$/,
 rprotocol = /^\/\//,

 
 prefilters = {},

 
 transports = {},

 
 allTypes = "*/".concat( "*" ),

 
 originAnchor = document.createElement( "a" ); originAnchor.href = location.href;function addToPrefiltersOrTransports( structure ) {

 
 return function( dataTypeExpression, func ) {

 if ( typeof dataTypeExpression !== "string" ) {
 func = dataTypeExpression; dataTypeExpression = "*"; }

 var dataType,
 i = 0,
 dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || []; if ( isFunction( func ) ) {

 
 while ( ( dataType = dataTypes[ i++ ] ) ) {

 
 if ( dataType[ 0 ] === "+" ) {
 dataType = dataType.slice( 1 ) || "*"; ( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );  } else {
 ( structure[ dataType ] = structure[ dataType ] || [] ).push( func ); }
 }
 }
 };}


function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

 var inspected = {},
 seekingTransport = ( structure === transports ); function inspect( dataType ) {
 var selected; inspected[ dataType ] = true; jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
 var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR ); if ( typeof dataTypeOrTransport === "string" &&
 !seekingTransport && !inspected[ dataTypeOrTransport ] ) {

 options.dataTypes.unshift( dataTypeOrTransport ); inspect( dataTypeOrTransport ); return false; } else if ( seekingTransport ) {
 return !( selected = dataTypeOrTransport ); }
 } ); return selected; }

 return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );}




function ajaxExtend( target, src ) {
 var key, deep,
 flatOptions = jQuery.ajaxSettings.flatOptions || {}; for ( key in src ) {
 if ( src[ key ] !== undefined ) {
 ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ]; }
 }
 if ( deep ) {
 jQuery.extend( true, target, deep ); }

 return target;}


function ajaxHandleResponses( s, jqXHR, responses ) {

 var ct, type, finalDataType, firstDataType,
 contents = s.contents,
 dataTypes = s.dataTypes;  while ( dataTypes[ 0 ] === "*" ) {
 dataTypes.shift(); if ( ct === undefined ) {
 ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" ); }
 }

 
 if ( ct ) {
 for ( type in contents ) {
 if ( contents[ type ] && contents[ type ].test( ct ) ) {
 dataTypes.unshift( type ); break; }
 }
 }

 
 if ( dataTypes[ 0 ] in responses ) {
 finalDataType = dataTypes[ 0 ]; } else {

 
 for ( type in responses ) {
 if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
 finalDataType = type; break; }
 if ( !firstDataType ) {
 firstDataType = type; }
 }

 
 finalDataType = finalDataType || firstDataType; }

 
 
 
 if ( finalDataType ) {
 if ( finalDataType !== dataTypes[ 0 ] ) {
 dataTypes.unshift( finalDataType ); }
 return responses[ finalDataType ]; }
}


function ajaxConvert( s, response, jqXHR, isSuccess ) {
 var conv2, current, conv, tmp, prev,
 converters = {},

 
 dataTypes = s.dataTypes.slice();  if ( dataTypes[ 1 ] ) {
 for ( conv in s.converters ) {
 converters[ conv.toLowerCase() ] = s.converters[ conv ]; }
 }

 current = dataTypes.shift();  while ( current ) {

 if ( s.responseFields[ current ] ) {
 jqXHR[ s.responseFields[ current ] ] = response; }

 
 if ( !prev && isSuccess && s.dataFilter ) {
 response = s.dataFilter( response, s.dataType ); }

 prev = current; current = dataTypes.shift(); if ( current ) {

 
 if ( current === "*" ) {

 current = prev;  } else if ( prev !== "*" && prev !== current ) {

 
 conv = converters[ prev + " " + current ] || converters[ "* " + current ];  if ( !conv ) {
 for ( conv2 in converters ) {

 
 tmp = conv2.split( " " ); if ( tmp[ 1 ] === current ) {

 
 conv = converters[ prev + " " + tmp[ 0 ] ] ||
 converters[ "* " + tmp[ 0 ] ]; if ( conv ) {

 
 if ( conv === true ) {
 conv = converters[ conv2 ];  } else if ( converters[ conv2 ] !== true ) {
 current = tmp[ 0 ]; dataTypes.unshift( tmp[ 1 ] ); }
 break; }
 }
 }
 }

 
 if ( conv !== true ) {

 
 if ( conv && s.throws ) {
 response = conv( response ); } else {
 try {
 response = conv( response ); } catch ( e ) {
 return {
 state: "parsererror",
 error: conv ? e : "No conversion from " + prev + " to " + current
 }; }
 }
 }
 }
 }
 }

 return { state: "success", data: response };}

jQuery.extend( {

 
 active: 0,

 
 lastModified: {},
 etag: {},

 ajaxSettings: {
 url: location.href,
 type: "GET",
 isLocal: rlocalProtocol.test( location.protocol ),
 global: true,
 processData: true,
 async: true,
 contentType: "application/x-www-form-urlencoded; charset=UTF-8",

 

 accepts: {
 "*": allTypes,
 text: "text/plain",
 html: "text/html",
 xml: "application/xml, text/xml",
 json: "application/json, text/javascript"
 },

 contents: {
 xml: /\bxml\b/,
 html: /\bhtml/,
 json: /\bjson\b/
 },

 responseFields: {
 xml: "responseXML",
 text: "responseText",
 json: "responseJSON"
 },

 
 
 converters: {

 
 "* text": String,

 
 "text html": true,

 
 "text json": JSON.parse,

 
 "text xml": jQuery.parseXML
 },

 
 
 
 
 flatOptions: {
 url: true,
 context: true
 }
 },

 
 
 
 ajaxSetup: function( target, settings ) {
 return settings ?

 
 ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

 
 ajaxExtend( jQuery.ajaxSettings, target ); },

 ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
 ajaxTransport: addToPrefiltersOrTransports( transports ),

 
 ajax: function( url, options ) {

 
 if ( typeof url === "object" ) {
 options = url; url = undefined; }

 
 options = options || {}; var transport,

 
 cacheURL,

 
 responseHeadersString,
 responseHeaders,

 
 timeoutTimer,

 
 urlAnchor,

 
 completed,

 
 fireGlobals,

 
 i,

 
 uncached,

 
 s = jQuery.ajaxSetup( {}, options ),

 
 callbackContext = s.context || s,

 
 globalEventContext = s.context &&
 ( callbackContext.nodeType || callbackContext.jquery ) ?
 jQuery( callbackContext ) :
 jQuery.event,

 
 deferred = jQuery.Deferred(),
 completeDeferred = jQuery.Callbacks( "once memory" ),

 
 statusCode = s.statusCode || {},

 
 requestHeaders = {},
 requestHeadersNames = {},

 
 strAbort = "canceled",

 
 jqXHR = {
 readyState: 0,

 
 getResponseHeader: function( key ) {
 var match; if ( completed ) {
 if ( !responseHeaders ) {
 responseHeaders = {}; while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
 responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
 ( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
 .concat( match[ 2 ] ); }
 }
 match = responseHeaders[ key.toLowerCase() + " " ]; }
 return match == null ? null : match.join( ", " ); },

 
 getAllResponseHeaders: function() {
 return completed ? responseHeadersString : null; },

 
 setRequestHeader: function( name, value ) {
 if ( completed == null ) {
 name = requestHeadersNames[ name.toLowerCase() ] =
 requestHeadersNames[ name.toLowerCase() ] || name; requestHeaders[ name ] = value; }
 return this; },

 
 overrideMimeType: function( type ) {
 if ( completed == null ) {
 s.mimeType = type; }
 return this; },

 
 statusCode: function( map ) {
 var code; if ( map ) {
 if ( completed ) {

 
 jqXHR.always( map[ jqXHR.status ] ); } else {

 
 for ( code in map ) {
 statusCode[ code ] = [ statusCode[ code ], map[ code ] ]; }
 }
 }
 return this; },

 
 abort: function( statusText ) {
 var finalText = statusText || strAbort; if ( transport ) {
 transport.abort( finalText ); }
 done( 0, finalText ); return this; }
 };  deferred.promise( jqXHR );    s.url = ( ( url || s.url || location.href ) + "" )
 .replace( rprotocol, location.protocol + "//" );  s.type = options.method || options.type || s.method || s.type;  s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];  if ( s.crossDomain == null ) {
 urlAnchor = document.createElement( "a" );    try {
 urlAnchor.href = s.url;   urlAnchor.href = urlAnchor.href; s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
 urlAnchor.protocol + "//" + urlAnchor.host; } catch ( e ) {

 
 
 s.crossDomain = true; }
 }

 
 if ( s.data && s.processData && typeof s.data !== "string" ) {
 s.data = jQuery.param( s.data, s.traditional ); }

 
 inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );  if ( completed ) {
 return jqXHR; }

 
 
 fireGlobals = jQuery.event && s.global;  if ( fireGlobals && jQuery.active++ === 0 ) {
 jQuery.event.trigger( "ajaxStart" ); }

 
 s.type = s.type.toUpperCase();  s.hasContent = !rnoContent.test( s.type );    cacheURL = s.url.replace( rhash, "" );  if ( !s.hasContent ) {

 
 uncached = s.url.slice( cacheURL.length );  if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
 cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;  delete s.data; }

 
 if ( s.cache === false ) {
 cacheURL = cacheURL.replace( rantiCache, "$1" ); uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
 uncached; }

 
 s.url = cacheURL + uncached;  } else if ( s.data && s.processData &&
 ( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
 s.data = s.data.replace( r20, "+" ); }

 
 if ( s.ifModified ) {
 if ( jQuery.lastModified[ cacheURL ] ) {
 jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] ); }
 if ( jQuery.etag[ cacheURL ] ) {
 jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] ); }
 }

 
 if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
 jqXHR.setRequestHeader( "Content-Type", s.contentType ); }

 
 jqXHR.setRequestHeader(
 "Accept",
 s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
 s.accepts[ s.dataTypes[ 0 ] ] +
 ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
 s.accepts[ "*" ]
 );  for ( i in s.headers ) {
 jqXHR.setRequestHeader( i, s.headers[ i ] ); }

 
 if ( s.beforeSend &&
 ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

 
 return jqXHR.abort(); }

 
 strAbort = "abort";  completeDeferred.add( s.complete ); jqXHR.done( s.success ); jqXHR.fail( s.error );  transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );  if ( !transport ) {
 done( -1, "No Transport" ); } else {
 jqXHR.readyState = 1;  if ( fireGlobals ) {
 globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] ); }

 
 if ( completed ) {
 return jqXHR; }

 
 if ( s.async && s.timeout > 0 ) {
 timeoutTimer = window.setTimeout( function() {
 jqXHR.abort( "timeout" ); }, s.timeout ); }

 try {
 completed = false; transport.send( requestHeaders, done ); } catch ( e ) {

 
 if ( completed ) {
 throw e; }

 
 done( -1, e ); }
 }

 
 function done( status, nativeStatusText, responses, headers ) {
 var isSuccess, success, error, response, modified,
 statusText = nativeStatusText;  if ( completed ) {
 return; }

 completed = true;  if ( timeoutTimer ) {
 window.clearTimeout( timeoutTimer ); }

 
 
 transport = undefined;  responseHeadersString = headers || "";  jqXHR.readyState = status > 0 ? 4 : 0;  isSuccess = status >= 200 && status < 300 || status === 304;  if ( responses ) {
 response = ajaxHandleResponses( s, jqXHR, responses ); }

 
 if ( !isSuccess && jQuery.inArray( "script", s.dataTypes ) > -1 ) {
 s.converters[ "text script" ] = function() {}; }

 
 response = ajaxConvert( s, response, jqXHR, isSuccess );  if ( isSuccess ) {

 
 if ( s.ifModified ) {
 modified = jqXHR.getResponseHeader( "Last-Modified" ); if ( modified ) {
 jQuery.lastModified[ cacheURL ] = modified; }
 modified = jqXHR.getResponseHeader( "etag" ); if ( modified ) {
 jQuery.etag[ cacheURL ] = modified; }
 }

 
 if ( status === 204 || s.type === "HEAD" ) {
 statusText = "nocontent";  } else if ( status === 304 ) {
 statusText = "notmodified";  } else {
 statusText = response.state; success = response.data; error = response.error; isSuccess = !error; }
 } else {

 
 error = statusText; if ( status || !statusText ) {
 statusText = "error"; if ( status < 0 ) {
 status = 0; }
 }
 }

 
 jqXHR.status = status; jqXHR.statusText = ( nativeStatusText || statusText ) + "";  if ( isSuccess ) {
 deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] ); } else {
 deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] ); }

 
 jqXHR.statusCode( statusCode ); statusCode = undefined; if ( fireGlobals ) {
 globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
 [ jqXHR, s, isSuccess ? success : error ] ); }

 
 completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] ); if ( fireGlobals ) {
 globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );  if ( !( --jQuery.active ) ) {
 jQuery.event.trigger( "ajaxStop" ); }
 }
 }

 return jqXHR; },

 getJSON: function( url, data, callback ) {
 return jQuery.get( url, data, callback, "json" ); },

 getScript: function( url, callback ) {
 return jQuery.get( url, undefined, callback, "script" ); }
} );jQuery.each( [ "get", "post" ], function( _i, method ) {
 jQuery[ method ] = function( url, data, callback, type ) {

 
 if ( isFunction( data ) ) {
 type = type || callback; callback = data; data = undefined; }

 
 return jQuery.ajax( jQuery.extend( {
 url: url,
 type: method,
 dataType: type,
 data: data,
 success: callback
 }, jQuery.isPlainObject( url ) && url ) ); };} );jQuery.ajaxPrefilter( function( s ) {
 var i; for ( i in s.headers ) {
 if ( i.toLowerCase() === "content-type" ) {
 s.contentType = s.headers[ i ] || ""; }
 }
} );jQuery._evalUrl = function( url, options, doc ) {
 return jQuery.ajax( {
 url: url,

 
 type: "GET",
 dataType: "script",
 cache: true,
 async: false,
 global: false,

 
 
 
 converters: {
 "text script": function() {}
 },
 dataFilter: function( response ) {
 jQuery.globalEval( response, options, doc ); }
 } );};jQuery.fn.extend( {
 wrapAll: function( html ) {
 var wrap; if ( this[ 0 ] ) {
 if ( isFunction( html ) ) {
 html = html.call( this[ 0 ] ); }

 
 wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true ); if ( this[ 0 ].parentNode ) {
 wrap.insertBefore( this[ 0 ] ); }

 wrap.map( function() {
 var elem = this; while ( elem.firstElementChild ) {
 elem = elem.firstElementChild; }

 return elem; } ).append( this ); }

 return this; },

 wrapInner: function( html ) {
 if ( isFunction( html ) ) {
 return this.each( function( i ) {
 jQuery( this ).wrapInner( html.call( this, i ) ); } ); }

 return this.each( function() {
 var self = jQuery( this ),
 contents = self.contents(); if ( contents.length ) {
 contents.wrapAll( html ); } else {
 self.append( html ); }
 } ); },

 wrap: function( html ) {
 var htmlIsFunction = isFunction( html ); return this.each( function( i ) {
 jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html ); } ); },

 unwrap: function( selector ) {
 this.parent( selector ).not( "body" ).each( function() {
 jQuery( this ).replaceWith( this.childNodes ); } ); return this; }
} );jQuery.expr.pseudos.hidden = function( elem ) {
 return !jQuery.expr.pseudos.visible( elem );};jQuery.expr.pseudos.visible = function( elem ) {
 return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );};jQuery.ajaxSettings.xhr = function() {
 try {
 return new window.XMLHttpRequest(); } catch ( e ) {}
};var xhrSuccessStatus = {

 
 0: 200,

 
 
 1223: 204
 },
 xhrSupported = jQuery.ajaxSettings.xhr();support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );support.ajax = xhrSupported = !!xhrSupported;jQuery.ajaxTransport( function( options ) {
 var callback, errorCallback;  if ( support.cors || xhrSupported && !options.crossDomain ) {
 return {
 send: function( headers, complete ) {
 var i,
 xhr = options.xhr(); xhr.open(
 options.type,
 options.url,
 options.async,
 options.username,
 options.password
 );  if ( options.xhrFields ) {
 for ( i in options.xhrFields ) {
 xhr[ i ] = options.xhrFields[ i ]; }
 }

 
 if ( options.mimeType && xhr.overrideMimeType ) {
 xhr.overrideMimeType( options.mimeType ); }

 
 
 
 
 
 if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
 headers[ "X-Requested-With" ] = "XMLHttpRequest"; }

 
 for ( i in headers ) {
 xhr.setRequestHeader( i, headers[ i ] ); }

 
 callback = function( type ) {
 return function() {
 if ( callback ) {
 callback = errorCallback = xhr.onload =
 xhr.onerror = xhr.onabort = xhr.ontimeout =
 xhr.onreadystatechange = null; if ( type === "abort" ) {
 xhr.abort(); } else if ( type === "error" ) {

 
 
 
 if ( typeof xhr.status !== "number" ) {
 complete( 0, "error" ); } else {
 complete(

 
 xhr.status,
 xhr.statusText
 ); }
 } else {
 complete(
 xhrSuccessStatus[ xhr.status ] || xhr.status,
 xhr.statusText,

 
 
 
 ( xhr.responseType || "text" ) !== "text" ||
 typeof xhr.responseText !== "string" ?
 { binary: xhr.response } :
 { text: xhr.responseText },
 xhr.getAllResponseHeaders()
 ); }
 }
 }; };  xhr.onload = callback(); errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );    if ( xhr.onabort !== undefined ) {
 xhr.onabort = errorCallback; } else {
 xhr.onreadystatechange = function() {

 
 if ( xhr.readyState === 4 ) {

 
 
 
 
 window.setTimeout( function() {
 if ( callback ) {
 errorCallback(); }
 } ); }
 }; }

 
 callback = callback( "abort" ); try {

 
 xhr.send( options.hasContent && options.data || null ); } catch ( e ) {

 
 if ( callback ) {
 throw e; }
 }
 },

 abort: function() {
 if ( callback ) {
 callback(); }
 }
 }; }
} );jQuery.ajaxPrefilter( function( s ) {
 if ( s.crossDomain ) {
 s.contents.script = false; }
} );jQuery.ajaxSetup( {
 accepts: {
 script: "text/javascript, application/javascript, " +
 "application/ecmascript, application/x-ecmascript"
 },
 contents: {
 script: /\b(?:java|ecma)script\b/
 },
 converters: {
 "text script": function( text ) {
 jQuery.globalEval( text ); return text; }
 }
} );jQuery.ajaxPrefilter( "script", function( s ) {
 if ( s.cache === undefined ) {
 s.cache = false; }
 if ( s.crossDomain ) {
 s.type = "GET"; }
} );jQuery.ajaxTransport( "script", function( s ) {

 
 if ( s.crossDomain || s.scriptAttrs ) {
 var script, callback; return {
 send: function( _, complete ) {
 script = jQuery( "<script>" )
 .attr( s.scriptAttrs || {} )
 .prop( { charset: s.scriptCharset, src: s.url } )
 .on( "load error", callback = function( evt ) {
 script.remove(); callback = null; if ( evt ) {
 complete( evt.type === "error" ? 404 : 200, evt.type ); }
 } );  document.head.appendChild( script[ 0 ] ); },
 abort: function() {
 if ( callback ) {
 callback(); }
 }
 }; }
} );var oldCallbacks = [],
 rjsonp = /(=)\?(?=&|$)|\?\?/;jQuery.ajaxSetup( {
 jsonp: "callback",
 jsonpCallback: function() {
 var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) ); this[ callback ] = true; return callback; }
} );jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

 var callbackName, overwritten, responseContainer,
 jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
 "url" :
 typeof s.data === "string" &&
 ( s.contentType || "" )
 .indexOf( "application/x-www-form-urlencoded" ) === 0 &&
 rjsonp.test( s.data ) && "data"
 );  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

 
 callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
 s.jsonpCallback() :
 s.jsonpCallback;  if ( jsonProp ) {
 s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName ); } else if ( s.jsonp !== false ) {
 s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName; }

 
 s.converters[ "script json" ] = function() {
 if ( !responseContainer ) {
 jQuery.error( callbackName + " was not called" ); }
 return responseContainer[ 0 ]; };  s.dataTypes[ 0 ] = "json";  overwritten = window[ callbackName ]; window[ callbackName ] = function() {
 responseContainer = arguments; };  jqXHR.always( function() {

 
 if ( overwritten === undefined ) {
 jQuery( window ).removeProp( callbackName );  } else {
 window[ callbackName ] = overwritten; }

 
 if ( s[ callbackName ] ) {

 
 s.jsonpCallback = originalSettings.jsonpCallback;  oldCallbacks.push( callbackName ); }

 
 if ( responseContainer && isFunction( overwritten ) ) {
 overwritten( responseContainer[ 0 ] ); }

 responseContainer = overwritten = undefined; } );  return "script"; }
} );support.createHTMLDocument = ( function() {
 var body = document.implementation.createHTMLDocument( "" ).body; body.innerHTML = "<form></form><form></form>"; return body.childNodes.length === 2;} )();jQuery.parseHTML = function( data, context, keepScripts ) {
 if ( typeof data !== "string" ) {
 return []; }
 if ( typeof context === "boolean" ) {
 keepScripts = context; context = false; }

 var base, parsed, scripts; if ( !context ) {

 
 
 if ( support.createHTMLDocument ) {
 context = document.implementation.createHTMLDocument( "" );    base = context.createElement( "base" ); base.href = document.location.href; context.head.appendChild( base ); } else {
 context = document; }
 }

 parsed = rsingleTag.exec( data ); scripts = !keepScripts && [];  if ( parsed ) {
 return [ context.createElement( parsed[ 1 ] ) ]; }

 parsed = buildFragment( [ data ], context, scripts ); if ( scripts && scripts.length ) {
 jQuery( scripts ).remove(); }

 return jQuery.merge( [], parsed.childNodes );};jQuery.fn.load = function( url, params, callback ) {
 var selector, type, response,
 self = this,
 off = url.indexOf( " " ); if ( off > -1 ) {
 selector = stripAndCollapse( url.slice( off ) ); url = url.slice( 0, off ); }

 
 if ( isFunction( params ) ) {

 
 callback = params; params = undefined;  } else if ( params && typeof params === "object" ) {
 type = "POST"; }

 
 if ( self.length > 0 ) {
 jQuery.ajax( {
 url: url,

 
 
 
 type: type || "GET",
 dataType: "html",
 data: params
 } ).done( function( responseText ) {

 
 response = arguments; self.html( selector ?

 
 
 jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

 
 responseText );    } ).always( callback && function( jqXHR, status ) {
 self.each( function() {
 callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] ); } ); } ); }

 return this;};jQuery.expr.pseudos.animated = function( elem ) {
 return jQuery.grep( jQuery.timers, function( fn ) {
 return elem === fn.elem; } ).length;};jQuery.offset = {
 setOffset: function( elem, options, i ) {
 var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
 position = jQuery.css( elem, "position" ),
 curElem = jQuery( elem ),
 props = {};  if ( position === "static" ) {
 elem.style.position = "relative"; }

 curOffset = curElem.offset(); curCSSTop = jQuery.css( elem, "top" ); curCSSLeft = jQuery.css( elem, "left" ); calculatePosition = ( position === "absolute" || position === "fixed" ) &&
 ( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;   if ( calculatePosition ) {
 curPosition = curElem.position(); curTop = curPosition.top; curLeft = curPosition.left; } else {
 curTop = parseFloat( curCSSTop ) || 0; curLeft = parseFloat( curCSSLeft ) || 0; }

 if ( isFunction( options ) ) {

 
 options = options.call( elem, i, jQuery.extend( {}, curOffset ) ); }

 if ( options.top != null ) {
 props.top = ( options.top - curOffset.top ) + curTop; }
 if ( options.left != null ) {
 props.left = ( options.left - curOffset.left ) + curLeft; }

 if ( "using" in options ) {
 options.using.call( elem, props ); } else {
 if ( typeof props.top === "number" ) {
 props.top += "px"; }
 if ( typeof props.left === "number" ) {
 props.left += "px"; }
 curElem.css( props ); }
 }
};jQuery.fn.extend( {

 
 offset: function( options ) {

 
 if ( arguments.length ) {
 return options === undefined ?
 this :
 this.each( function( i ) {
 jQuery.offset.setOffset( this, options, i ); } ); }

 var rect, win,
 elem = this[ 0 ]; if ( !elem ) {
 return; }

 
 
 
 
 if ( !elem.getClientRects().length ) {
 return { top: 0, left: 0 }; }

 
 rect = elem.getBoundingClientRect(); win = elem.ownerDocument.defaultView; return {
 top: rect.top + win.pageYOffset,
 left: rect.left + win.pageXOffset
 }; },

 
 
 position: function() {
 if ( !this[ 0 ] ) {
 return; }

 var offsetParent, offset, doc,
 elem = this[ 0 ],
 parentOffset = { top: 0, left: 0 };  if ( jQuery.css( elem, "position" ) === "fixed" ) {

 
 offset = elem.getBoundingClientRect(); } else {
 offset = this.offset();   doc = elem.ownerDocument; offsetParent = elem.offsetParent || doc.documentElement; while ( offsetParent &&
 ( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
 jQuery.css( offsetParent, "position" ) === "static" ) {

 offsetParent = offsetParent.parentNode; }
 if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

 
 parentOffset = jQuery( offsetParent ).offset(); parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true ); parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true ); }
 }

 
 return {
 top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
 left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
 }; },

 
 
 
 
 
 
 
 
 
 
 offsetParent: function() {
 return this.map( function() {
 var offsetParent = this.offsetParent; while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
 offsetParent = offsetParent.offsetParent; }

 return offsetParent || documentElement; } ); }
} );jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
 var top = "pageYOffset" === prop; jQuery.fn[ method ] = function( val ) {
 return access( this, function( elem, method, val ) {

 
 var win; if ( isWindow( elem ) ) {
 win = elem; } else if ( elem.nodeType === 9 ) {
 win = elem.defaultView; }

 if ( val === undefined ) {
 return win ? win[ prop ] : elem[ method ]; }

 if ( win ) {
 win.scrollTo(
 !top ? val : win.pageXOffset,
 top ? val : win.pageYOffset
 ); } else {
 elem[ method ] = val; }
 }, method, val, arguments.length ); };} );jQuery.each( [ "top", "left" ], function( _i, prop ) {
 jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
 function( elem, computed ) {
 if ( computed ) {
 computed = curCSS( elem, prop );  return rnumnonpx.test( computed ) ?
 jQuery( elem ).position()[ prop ] + "px" :
 computed; }
 }
 );} );jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
 jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
 function( defaultExtra, funcName ) {

 
 jQuery.fn[ funcName ] = function( margin, value ) {
 var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
 extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" ); return access( this, function( elem, type, value ) {
 var doc; if ( isWindow( elem ) ) {

 
 return funcName.indexOf( "outer" ) === 0 ?
 elem[ "inner" + name ] :
 elem.document.documentElement[ "client" + name ]; }

 
 if ( elem.nodeType === 9 ) {
 doc = elem.documentElement;   return Math.max(
 elem.body[ "scroll" + name ], doc[ "scroll" + name ],
 elem.body[ "offset" + name ], doc[ "offset" + name ],
 doc[ "client" + name ]
 ); }

 return value === undefined ?

 
 jQuery.css( elem, type, extra ) :

 
 jQuery.style( elem, type, value, extra ); }, type, chainable ? margin : undefined, chainable ); }; } );} );jQuery.each( [
 "ajaxStart",
 "ajaxStop",
 "ajaxComplete",
 "ajaxError",
 "ajaxSuccess",
 "ajaxSend"
], function( _i, type ) {
 jQuery.fn[ type ] = function( fn ) {
 return this.on( type, fn ); };} );jQuery.fn.extend( {

 bind: function( types, data, fn ) {
 return this.on( types, null, data, fn ); },
 unbind: function( types, fn ) {
 return this.off( types, null, fn ); },

 delegate: function( selector, types, data, fn ) {
 return this.on( types, selector, data, fn ); },
 undelegate: function( selector, types, fn ) {

 
 return arguments.length === 1 ?
 this.off( selector, "**" ) :
 this.off( types, selector || "**", fn ); },

 hover: function( fnOver, fnOut ) {
 return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver ); }
} );jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
 "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
 "change select submit keydown keypress keyup contextmenu" ).split( " " ),
 function( _i, name ) {

 
 jQuery.fn[ name ] = function( data, fn ) {
 return arguments.length > 0 ?
 this.on( name, null, data, fn ) :
 this.trigger( name ); }; } );var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;jQuery.proxy = function( fn, context ) {
 var tmp, args, proxy; if ( typeof context === "string" ) {
 tmp = fn[ context ]; context = fn; fn = tmp; }

 
 
 if ( !isFunction( fn ) ) {
 return undefined; }

 
 args = slice.call( arguments, 2 ); proxy = function() {
 return fn.apply( context || this, args.concat( slice.call( arguments ) ) ); };  proxy.guid = fn.guid = fn.guid || jQuery.guid++; return proxy;};jQuery.holdReady = function( hold ) {
 if ( hold ) {
 jQuery.readyWait++; } else {
 jQuery.ready( true ); }
};jQuery.isArray = Array.isArray;jQuery.parseJSON = JSON.parse;jQuery.nodeName = nodeName;jQuery.isFunction = isFunction;jQuery.isWindow = isWindow;jQuery.camelCase = camelCase;jQuery.type = toType;jQuery.now = Date.now;jQuery.isNumeric = function( obj ) {

 
 
 
 var type = jQuery.type( obj ); return ( type === "number" || type === "string" ) &&

 
 
 
 !isNaN( obj - parseFloat( obj ) );};jQuery.trim = function( text ) {
 return text == null ?
 "" :
 ( text + "" ).replace( rtrim, "" );};if ( typeof define === "function" && define.amd ) {
 define( "jquery", [], function() {
 return jQuery; } );}




var

 
 _jQuery = window.jQuery,

 
 _$ = window.$;jQuery.noConflict = function( deep ) {
 if ( window.$ === jQuery ) {
 window.$ = _$; }

 if ( deep && window.jQuery === jQuery ) {
 window.jQuery = _jQuery; }

 return jQuery;};if ( typeof noGlobal === "undefined" ) {
 window.jQuery = window.$ = jQuery;}




return jQuery;} );
 


























window.dataLayer = window.dataLayer || [];function gtag() { window.dataLayer.push(arguments); }

function setTitleByNavCollection() {
 try {
 
 if (top.document.location.pathname.indexOf("PT_AGSTARTPAGE_NUI") < 1) {
 
 return; }
 var selectNavItemLabel; if (window.self === window.top) {
 selectNavItemLabel = document.querySelector(".ps_ag-vertical .ps_ag-step-button.psc_selected span.ps_box-value").innerText;   top.document.title = selectNavItemLabel; } else {
 selectNavItemLabel = window.parent.document.querySelector(".ps_ag-vertical .ps_ag-step-button.psc_selected span.ps_box-value").innerText;  document.getElementsByTagName("title").innerText = selectNavItemLabel;  top.document.title = selectNavItemLabel; }
 } catch (error) {
 
 
 
 }
}



function doGa4() {
 try {
 let sendGa4Hit = true;  if (document.getElementById("peGtag") === null) {
 sendGa4Hit = false; return; }

 
 const falseFilter = ["NUI_FRAMEWORK.PT_AGSTARTPAGE_NUI.GBL"];  falseFilter.forEach((element, index) => {
 falseFilter[index] = element.toUpperCase(); });  falseFilter.forEach((element) => {
 if (getGaPath().toUpperCase().indexOf(element) > 0) {
 sendGa4Hit = false; return; }
 });  if (sendGa4Hit) {
 try {
 const peFormName = document.querySelector("form").getAttribute("name"); if (isModalPage(peFormName) && (getPePage() === "unknown" || getPePage() === "(search)")) {
 sendGa4Hit = false;  }
 } catch (e1) {
 
 if (document.location.search.indexOf('tab') === 0) {
 console.log("Error determining GA4 status: ", e1)
 return false; }
 
 }

 }

 
 return sendGa4Hit; } catch (exception) {
 console.log("Error determining GA4 status: ", exception)
 return false; }
}
function getPeMenu() {
 if (document.querySelector("div[id^='pt_pageinfo']")) {
 return document.querySelector("div[id^='pt_pageinfo']").getAttribute("menu"); } else {
 return "unknown"; }
}

function getPeComponent() {
 if (document.querySelector("div[id^='pt_pageinfo']")) {
 return document.querySelector("div[id^='pt_pageinfo']").getAttribute("component"); } else {
 if (document.location.toString().indexOf('/h/') > 0) {
 return "Classic Home"; } else {
 return "unknown"; }
 }
}
function getPePage() {
 if (document.querySelector("div[id^='pt_pageinfo']")) {
 return document.querySelector("div[id^='pt_pageinfo']").getAttribute("page"); } else {
 if (document.location.toString().indexOf('/h/') > 0 && document.location.search.indexOf('tab') > 0) {
 const searchParams = new URLSearchParams(document.location.search); return searchParams.get("tab");; } else {
 return "unknown"; }
 }
}

function getGaPath() {
 const lastSlash = document.location.pathname.lastIndexOf("/"); let gaPath = document.location.pathname.substring(0, lastSlash + 1); try {
 const menu = document.querySelector("div[id^='pt_pageinfo']").getAttribute("menu")
 const component = document.querySelector("div[id^='pt_pageinfo']").getAttribute("component"); if (menu && component) {
 gaPath = gaPath + menu + "." + component + ".GBL"; }
 } catch (expcetion) {
 
 }
 return gaPath;}


$(document).ready(function () {


 
 const getGa4Url = function () {

 
 const paramsWhitelist = ["yari","tab"]; let ga4LocationUrl, psQueryParam;  paramsWhitelist.forEach((element, index) => {
 paramsWhitelist[index] = element.toUpperCase(); }); const paramsToRemove = []; const search = document.location.search; const lastSlash = document.location.pathname.lastIndexOf("/"); const ga4Path = getGaPath(); if (search) {

 
 const searchParams = new URLSearchParams(search);  for (var pair of searchParams.entries()) {
 
 if (paramsWhitelist.indexOf(pair[0].toUpperCase()) < 0) {
 paramsToRemove.push(pair[0]); }

 
 if (pair[0] === "ICAction" && pair[1].indexOf("ICQryNameURL") === 0) {
 console.log(pair[1]); psQueryParam = pair[1]; }
 }
 

 
 paramsToRemove.forEach(element => {
 searchParams.delete(element); }); if (searchParams.toString()) {
 ga4LocationUrl = searchParams.toString()
 }

 if (psQueryParam) {
 if (ga4LocationUrl) {
 ga4LocationUrl = ga4LocationUrl + "&" + psQueryParam; } else {
 ga4LocationUrl = psQueryParam; }
 }

 if (ga4LocationUrl) {
 ga4LocationUrl = ga4Path + "?" + ga4LocationUrl; }

 }
 if (!ga4LocationUrl) {
 ga4LocationUrl = ga4Path; }
 
 return ga4LocationUrl; }

 
 const getGa4Data = function (aCallBackFunction) {
 const ga4StorageKey = "peGa4Data"; try {
 
 if (!sessionStorage.getItem(ga4StorageKey)) {
 
 var xhttp = new XMLHttpRequest(); xhttp.onreadystatechange = function () {
 try {
 if (this.readyState == 4 && this.status == 200) {
 sessionStorage.setItem(ga4StorageKey, xhttp.responseText); aCallBackFunction(JSON.parse(xhttp.responseText)); }
 } catch (error) {
 console.log("Sending, but error occured \n" + error);  aCallBackFunction(); }

 };  let pePtBaseUri = getptBaseURI(); const scriptUrl = window.location.origin + pePtBaseUri + "s/WEBLIB_PE_TE123.ISCRIPT1.FieldFormula.IScript_GA4_JSON"; xhttp.open("GET", scriptUrl, true); xhttp.send(); } else {
 aCallBackFunction(JSON.parse(sessionStorage.getItem(ga4StorageKey))); }


 
 
 } catch (error) {
 console.log(error); throw "Error getting GA4 Hash"; }
 }

 const getGa4AudienceList = function (aGa4JSON) {
 let audienceList; if (typeof aGa4JSON === "object") {
 
 if (typeof aGa4JSON.audienceList !== "object" || aGa4JSON.audienceList === null) {
 audienceList = ""; } else {
 audienceList = aGa4JSON.audienceList.toString(); }
 }
 return audienceList; };  try {
 if (window.self !== window.top) {
 var parentLinkClone = window.parent.document.querySelector("head link[href*='PE_CLASSIC_SHARED_STYLES_92']").cloneNode(); currentLink = document.querySelector("head link[href*='PE_CLASSIC_SHARED_STYLES_92']"); if (currentLink === null && parentLinkClone !== null) {
 var iFrameLinks = document.getElementsByTagName("link"); var numbLinks = iFrameLinks.length; iFrameLinks[numbLinks - 1].insertAdjacentElement("afterend", parentLinkClone);  }
 }
 } catch (error) {
 
 }


 
 function calcPePageTitle() {
 
 var gaTitle = ""; try {
 gaTitle = document.querySelector("div[id^='pt_pageinfo']").getAttribute("menu") + ":" + document.querySelector("div[id^='pt_pageinfo']").getAttribute("component") + ":" + document.querySelector("div[id^='pt_pageinfo']").getAttribute("page"); } catch (error) {
 
 }

 if (gaTitle.length < 1) {

 try {
 gaTitle = document.querySelector("li.active a").title; } catch (error) {
 try {
 gaTitle = document.querySelector("ul#pthomepagetabs > li#selected > a").getAttribute("id"); } catch (error) {
 gaTitle = "unknown"; }
 }
 }
 return gaTitle; }
 
 function getPePageName() {
 var pageName = ""; try {
 if (document.title || (typeof isMDGuided === "function" && isMDGuided())) {
 if (typeof isMDGuided === "function" && isMDGuided()) {
 
 pageName = document.querySelector(".ps_ag-step-button.psc_selected span[id^='PTGP_STEP_DVW_PTGP_STEP_LABEL']").innerHTML; } else {
 pageName = document.title; }
 } else if (window.parent.document.title) {
 pageName = window.parent.document.title; }
 else if (document.querySelector(".PAPAGETITLE")) {
 pageName = document.querySelector(".PAPAGETITLE").innerText; } else if (document.querySelector("h1#app_label")) {
 pageName = document.querySelector("h1#app_label").innerText; } else if (document.querySelector(".selectedtab #app_label")) {
 pageName = document.querySelector(".selectedtab #app_label").innerText; }
 else {
 pageName = "unknown"; }
 } catch (exception) {
 console.error(exception); pageName = "unknown"; }

 
 return pageName; }

 
 
 var measurementID;  try {

 
 getGa4Data((aGa4JSON) => {

 if (typeof aGa4JSON === "object") {
 if (typeof aGa4JSON.ga4 === "string") {

 
 if (document.getElementById("peGtag") === null) {
 measurementID = aGa4JSON.streamId; var tagManagerUrl = "https://www.googletagmanager.com/gtag/js?id=" + measurementID; var headElement = document.getElementsByTagName("head")[0]

 var gtagScript = document.createElement("script"); gtagScript.setAttribute("src", tagManagerUrl); gtagScript.setAttribute("async", "true"); gtagScript.setAttribute("id", "peGtag"); headElement.prepend(gtagScript); }

 gtag('set', 'user_id', aGa4JSON.ga4);  }

 }

 gtag('set', 'cookie_flags', 'SameSite=None;Secure'); try {
 
 getGa4Data(setGa4UserProps); } catch (error) {
 console.log("Error retrieving GA4 Data:", error); }


 gtag('js', new Date()); }); } catch (error) {
 console.log(error); }

 function setGa4UserProps(aGa4JSON) {
 gtag('set', 'user_properties', {
 audience_membership: getGa4AudienceList(aGa4JSON)
 }); }

 function isNumeric(n) {
 return !isNaN(parseFloat(n)) && isFinite(n); }

 function cleanKeyWords(someKeywords) {
 var keyWordsArray = someKeywords.split(" "); for (let i = 0; i < keyWordsArray.length; i++) {
 
 if (keyWordsArray[i].length == 9 && isNumeric(keyWordsArray[i])) {
 keyWordsArray[i] = "aPsuId"; }
 
 else if (keyWordsArray[i].match(/\b[a-z]{3}[1-9]{1,4}\b/ig)) {
 keyWordsArray[i] = "anAccessId"; }
 
 else if (keyWordsArray[i].match(/\b\d{3}-?\d{2}-?\d{4}\b/g)) {
 keyWordsArray[i] = "aSsn"; }
 }
 return keyWordsArray.join(" "); }

 
 
 if (document.getElementsByTagName("iframe").length < 1 || document.querySelector("body.homePageHdr")) {
 try {
 
 getGa4Data(sendGa4PageView); } catch (error) {
 console.log("Error retrieving GA4 Data:", error);  sendGa4PageView(); }

 }

 function sendGa4PageView(aGa4JSON) {
 try {
 
 if (!doGa4()) {
 return; }

 const audienceList = getGa4AudienceList(aGa4JSON); let userIdHash; if (typeof aGa4JSON === "object") {
 if (typeof aGa4JSON.ga4 === "string") {
 userIdHash = aGa4JSON.ga4; }

 }


 if (typeof userIdHash !== "undefined") {
 gtag('config', measurementID, {
 page_title: getPePageName(),
 menu: getPeMenu(),
 component: getPeComponent(),
 page: getPePage(),
 user_id: userIdHash,
 page_location: getGa4Url(),
 }); } else {
 gtag('config', measurementID, {
 page_title: getPePageName(),
 menu: getPeMenu(),
 component: getPeComponent(),
 page: getPePage(),
 page_location: getGa4Url(),
 }); }
 } catch (exception) {
 console.log(exception.toString()); }
 }

 function sendGlobalSearchEvent() {
 
 var keyWords = cleanKeyWords(document.getElementById("PTS_KEYWORDS_GLB").value); var resultsCountElement = $(".psc_rowcount span")
 var gblSrchResults = 0; if (resultsCountElement.length > 0) {
 gblSrchResults = resultsCountElement.text().split(" ")[0]; }

 
 }

 
 var globalSearchObserver = new MutationObserver(function (mutations) {
 
 mutations.forEach(function (mutation) {
 var keyValues; for (var i = 0; i < mutation.addedNodes.length; i++) {
 
 }
 }); var currentIcStateNumValue = $("#ICStateNum").attr("value"); if (currentIcStateNumValue > icStateNumValue) {
 icStateNumValue = currentIcStateNumValue; sendGlobalSearchEvent(); }
 });  var searchResultsObserverConfig = {
 attributes: true,
 childList: false,
 characterData: false
 };  var icStateNumValue; var pageTitle = document.getElementsByTagName("title"); if (pageTitle && pageTitle.length > 0 && pageTitle[0].innerText == "Global Search") {
 sendGlobalSearchEvent(); icStateNumValue = $("#ICStateNum").attr("value"); globalSearchObserver.observe(document.getElementById("ICStateNum"), searchResultsObserverConfig); }



 
 var searchResultsObserver = new MutationObserver(function (mutations) {
 
 mutations.forEach(function (mutation) {
 var keyValues; for (var i = 0; i < mutation.addedNodes.length; i++) {
 
 }
 }); var resultsCount = 0; var ajaxKeyword = cleanKeyWords(document.getElementById("pthnavsrchinput").value); if (ajaxKeyword && pthnavSearchNeeded) {
 
 resultsCount = $("#pthNavAS #pthNavASScrollRoot #pthNavASul li:not(#asliNoMatch)").length; pthnavSearchNeeded = false; }
 else if (!ajaxKeyword && ptnav2SearchNeeded) {
 
 ajaxKeyword = cleanKeyWords(document.getElementById("ptnav2srchinput").value); resultsCount = $("#ptNav2AS #ptNav2ASScrollRoot #ptNav2ASul li:not(#asliNoMatch)").length; ptnav2SearchNeeded = false; } else {
 ajaxKeyword = null; }

 
 stopSearchOberver(); });  var searchResultsObserverConfig = {
 attributes: false,
 childList: true,
 characterData: false
 }; var searchObserverRunning = false; var ptnav2SearchNeeded = true; var pthnavSearchNeeded = true; function startSearchOberver() {
 searchResultsObserver.observe(ajaxSearchObsTargetNode, searchResultsObserverConfig); searchObserverRunning = true; }

 function stopSearchOberver() {
 searchResultsObserver.disconnect(); searchObserverRunning = false; }

 
 var menuSearch = document.getElementById("pthnavsrchinput"); if (menuSearch) {
 menuSearch.addEventListener("input", startSearchResponseObserver); }
 
 $("#ptpgltli_MENU").on("input", "#ptnav2srchinput", function () {
 startSearchResponseObserver(); });    $("#ptpgltli_MENU").on("blur", "#ptnav2srchinput", function () {
 
 });  var ajaxSearchObsTargetNode = document.body; function startSearchResponseObserver() {
 
 if (!searchObserverRunning) { startSearchOberver() }
 }

 
 
 var xhrObserver = new MutationObserver(function (mutations) {
 
 
 mutations.forEach(function (mutation) {

 if (mutation.type == "attributes" && mutation.attributeName == "component") {
 

 }
 }); var observerPageTitle; var observerLocation; observerLocation = document.location.pathname; var lastSlash = observerLocation.lastIndexOf("/"); observerLocation = observerLocation.substring(0, lastSlash + 1); observerLocation = observerLocation + document.querySelector("div[id^='pt_pageinfo']").getAttribute("menu") + "." + document.querySelector("div[id^='pt_pageinfo']").getAttribute("component") + ".GBL"; try {
 observerPageTitle = document.querySelector("div[id^='pt_pageinfo']").getAttribute("menu") + ":" + document.querySelector("div[id^='pt_pageinfo']").getAttribute("component") + ":" + document.querySelector("div[id^='pt_pageinfo']").getAttribute("page"); } catch (error) {
 observerPageTitle = "unknown"; }

 setTitleByNavCollection(); try {
 
 getGa4Data(sendGa4PageView); } catch (error) {
 
 sendGa4PageView(); }

 try {
 addMissingResultsMessage("Disclaimer: Data displayed is based on LionPATH user security."); } catch (error) {
 
 
 }

 
 setupStudentHelp();   doMessage("peMsgCatMessage");  });  var xhrObserverConfig = {
 attributes: true,
 childList: false,
 characterData: false,
 attributeOldValue: true
 }; setTitleByNavCollection(); try {
 var xhrTarget = document.querySelector("div[id^='pt_pageinfo']");  xhrObserver.observe(xhrTarget, xhrObserverConfig); } catch (error) {
 
 
 }

 

 if (isSWASS() || isSSCS()) {
 
 
 var newDiv = document.createElement("div"); newDiv.setAttribute("style", "display:inline-block;color:#FFFFFF;padding:.42em 0em .42em .42em;overflow:hidden;"); if (isSWASS()) {
 var textnode = document.createTextNode("See What the Student Sees - Advisor"); }
 if (isSSCS()) {
 var textnode = document.createTextNode("See What the Student Sees - Staff"); }
 newDiv.appendChild(textnode); var headerTitleContainer = document.querySelector('div#PT_HEADER div[id$="hdrdivPT_TITLE_CONT"]'); try {

 headerTitleContainer.appendChild(newDiv); } catch (error) {
 
 }
 }

 try {
 addMissingResultsMessage("Disclaimer: Data displayed is based on LionPATH user security.")
 } catch (error) {
 
 
 }

 
 setupStudentHelp();  addPrivacyLink();  try {
 
 if ($('div[page="SSR_CLSRCH_ENTRY"]').length || $('div[page="SSR_SSENRL_CART"]').length || $('div[page="SSR_SSENRL_SWAP"]').length) {

 var formName = document.getElementsByTagName("form")[0].getAttribute("name"); var classSearchObserverTarget = document.getElementById('pt_pageinfo_' + formName); classSearchPageObserver.observe(classSearchObserverTarget, classSearchObserverConfig); $('form').on("keypress", function (event) {
 var keycode = (event.keyCode ? event.keyCode : event.which); if (keycode == '13') {
 if ($('div[page="SSR_CLSRCH_ENTRY"]').length && window.parent.location != window.location) {
 sendGaClassSearchEvent(); }
 }
 }); }
 if ($('div[page="SSR_CLSRCH_ENTRY"]').length && window.parent.location != window.location) {
 prepareSearchButton(); classSearchIcObserver.observe(document.getElementById("ICStateNum"), classSearchObserverConfig); }
 } catch (err) {
 
 console.log("Class Search GA didn't work: " + err); }
 

 
 
 doMessage("peMsgCatMessage"); });var peSearch = window.parent.location.search;var peLocation = window.parent.location.pathname;function isSSCS() {
 if (peLocation.indexOf("PE_UI018_SSCS.PE_UI018_HB_STDNT") >= 0 || peLocation.indexOf("PE_UI018_SSCS.PE_AA032_LNK_CS_FL") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_SCHEDULES_SSCS") >= 0 || peSearch.indexOf("PE_PT_NVF_FIND_CLASSES_SSCS") >= 0 || peSearch.indexOf("PE_PT_NVF_ENROLLMENT_SSCS") >= 0 || peSearch.indexOf("PE_PT_NVF_DEGREE_PLAN_SSCS") >= 0 || peSearch.indexOf("PE_PT_NVF_TRANSFER_CRED_SSCS") >= 0 || peSearch.indexOf("PE_PT_NVF_ACADEMIC_REC_SSCS") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_NOTICES_SSCS") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_MY_FIN_SSCS") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_MY_INFO_SSCS") >= 0 || peSearch.indexOf("yari=sscs") >= 0 || peSearch.indexOf("PE_PT_NVF_FND_CLS_AN_ENL_SSCS") >= 0 || peLocation.indexOf("PE_UI018_SSCS.SSR_CRSE_INFO_FL")>=0) {
 return true; } else {
 return false; }
}

function isSWASS() {
 if (peLocation.indexOf("PE_UI018_SWASS.PE_UI018_HB_STDNT") >= 0 || peLocation.indexOf("PE_UI018_SWASS.PE_AA032_LNK_CS_FL") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_SCHEDULES_SWASS") >= 0 || peSearch.indexOf("PE_PT_NVF_FIND_CLASSES_SWASS") >= 0 || peSearch.indexOf("PE_PT_NVI_ENROLLMENT_SWASS") >= 0 || peSearch.indexOf("PE_PT_NVF_DEGREE_PLAN_SWASS") >= 0 || peSearch.indexOf("PE_PT_NVF_TRANSFER_CRED_SWASS") >= 0 || peSearch.indexOf("PE_PT_NVF_ACADEMIC_REC_SWASS") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_NOTICES_SWASS") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_MY_FIN_SWASS") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_MY_INFO_SWASS") >= 0 || peSearch.indexOf("yari=swass") >= 0 || peSearch.indexOf("PE_PT_NVF_FND_CLS_AN_ENL_SWASS") >= 0 || peLocation.indexOf("PE_UI018_SWASS.SSR_CRSE_INFO_FL")>=0) {
 return true; } else {
 return false; }
}

function isAdvisorCenter() {
 if (peSearch.indexOf("PE_PT_NVF_OTHER_ASC") >= 0) {
 return true; } else {
 return false; }
}
function isStudentHB() {
 if (peLocation.indexOf("PE_UI018_HB_STDNT.PE_UI018_HB_STDNT") >= 0 || peSearch.indexOf("PE_PT_NVF_ENROLLMENT&") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_MY_INFO&") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_NOTICES&") >= 0 || peSearch.indexOf("PE_PT_NVF_FIND_CLASSES0") >= 0 || peSearch.indexOf("PE_PT_NVF_DEGREE_PLAN&") >= 0 || peSearch.indexOf("PE_PT_NVF_TRANSFER_CREDIT") >= 0 || peSearch.indexOf("PE_PT_NVF_ACADEMIC_RECORDS&") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_SCHEDULES&") >= 0 || peSearch.indexOf("PE_NVF_STUD_HB_MY_FINANCES") >= 0 || peSearch.indexOf("yari=studentUi") >= 0) {
 return true; } else {
 return false; }
}

function addMissingResultsMessage(aMessage) {
 if (isSWASS() || isSSCS() || isAdvisorCenter()) {
 var componentName = document.querySelector("div[id^='pt_pageinfo']").getAttribute("component");  if (componentName != null && (componentName == "SS_CC_HOLDS" || componentName == "SS_CC_TODOS" || componentName == "SS_SR_MILESTONES")) {
 
 var newDiv = document.createElement("div"); newDiv.setAttribute("class", "pe-message__info"); var textnode = document.createTextNode(aMessage); newDiv.appendChild(textnode); var titleDiv = document.querySelector("div[id$='divDERIVED_CCSRVC1_SS_TRANSACT_TITLE']"); if (titleDiv == null) {
 titleDiv = document.querySelector("div[id$='divDERIVED_CS_DERIVED_TITLE']"); }
 titleDiv.insertBefore(newDiv, titleDiv.firstChild); }
 
 
 
 if (componentName != null && (componentName == "SCC_TASK_HOLDS_FL" || componentName == "SCC_TASKS_TODOS_FL")) {
 var newDiv = document.createElement("div"); newDiv.setAttribute("class", "pe-message__info"); var textnode = document.createTextNode(aMessage); newDiv.appendChild(textnode); var appsContentDiv = document.querySelectorAll("div[class='ps_box-group psc_layout ps_apps_content']")[1]; appsContentDiv.insertBefore(newDiv, appsContentDiv.firstChild); }
 }
}

function setupStudentHelp() {
 try {
 var studentHelpLink = "https://lionpathsupport.psu.edu/student-help/";  if (isStudentHB() || isSWASS() || isSSCS()) {
 setFluidHelpToStudent(studentHelpLink);   var helpItem = window.parent.document.querySelector("li[id$='PT_SYSACT_HELP']"); if (!helpItem) {
 
 var helpListItemHtml = '<li role="listitem" class="ps_box-group psc_layout ps_header-help ps_menuitem" id="' + "win0" + 'hdrdivPT_SYSACT_HELP" aria-hidden="false" ps_state=""><div class="ps_box-link psc_toolaction-help" id="' + "win0" + 'hdrdivPT_HELP_MENU"><span id="PT_HELP_MENU$span" class="ps-link-wrapper"><a id="PT_HELP_MENU" class="ps-link" ptlinktgt="pt_replace" href="javascript:DoHelp(' + String.fromCharCode(39) + 'PeopleSoft Online Help' + String.fromCharCode(39) + ')" onclick="javascript:cancelBubble(event);">Help</a></span><!-- PT_HELP_MENU --></div></li>';  var myPrefListItemElement = document.querySelector("li[id$='hdrdivPT_SYSACT_MYPREF']"); if (!myPrefListItemElement === null) {
 myPrefListItemElement.insertAdjacentHTML("afterend", helpListItemHtml); }

 } else if (helpItem.getAttribute("class").indexOf("psc_hidden") > -1) {
 
 var helpClasses = helpItem.getAttribute("class"); var visibleHelpClasses = helpClasses.replace("psc_hidden", ""); helpItem.setAttribute("class", visibleHelpClasses); helpItem.setAttribute("ps_state", ""); helpItem.setAttribute("aria-hidden", "false"); }

 
 var classicHelpItem = window.document.getElementById("HELP"); if (classicHelpItem) {
 var newStudentHelpHref = "javascript:void window.open('" + studentHelpLink + "','help','');"
 classicHelpItem.setAttribute("href", newStudentHelpHref); }
 }



 
 if (window.location.href.indexOf("tab=DEFAULT") > -1) {
 var myPrefs = document.getElementById("pthdr2mypreferences"); var addToFav = document.getElementById("addToFavoritesId"); var personalize = document.getElementById("ptpersonalizetablinks"); if (!personalize) {
 
 var helpLink = document.getElementById("pttabhelplink"); if (helpLink) {
 helpLink.setAttribute("href", studentHelpLink); }
 }
 }

 
 if (window.location.href.indexOf("LP=PE_PT_NVT_FL_SELECT_HP") > -1) {
 
 var tiles = document.querySelectorAll(".nuitile:not([style='display: none;'])")


 if (tiles) {
 if (isOnlyStudent(tiles)) {
 setFluidHelpToStudent(studentHelpLink); }
 }
 }


 } catch (error) {
 console.log(error); }
}


function addPrivacyLink() {
 try {
 const privacyUrl = "https://www.psu.edu/web-privacy-statement/";  const flLiNodeId = "peLiPrivacy";  if (document.querySelector("div[id$='hdrdivPT_ACTION_MENU'") && !document.getElementById(flLiNodeId)) {
 
 const flPrivacyContent = `
 <div role="presentation" class="ps_box-link tester" id="peDivPrivacy">
 <span role="presentation" class="ps-link-wrapper" id="peSpanPrivacy">
 <a role="menuitem" class="ps-link" id="peAPrivacy" tabindex="-1" href="${privacyUrl}" target="_blank">
 Privacy Statement
 </a>
 </span>
 </div>
 `;  const flLiNode = document.createElement("li"); flLiNode.setAttribute("role", "presentation"); flLiNode.setAttribute("class", "ps_box-group ps_box-menuitem ps_menuitem"); flLiNode.setAttribute("id", flLiNodeId); flLiNode.innerHTML = flPrivacyContent;  const flUl = document.querySelector("ul[id$='hdrdivPT_SYSACT_CONT']"); let flNumbChildren = flUl.childElementCount; flUl.insertBefore(flLiNode, flUl.children[flNumbChildren - 1]); }
 
 const clsANodeId = "peAPrivacy";  if (document.querySelector("div[id$='pthdr2ActionList_div'") && !document.getElementById(clsANodeId)) {

 
 const clsANode = document.createElement("a"); const clsTxtNode = document.createTextNode('Privacy Statement'); clsANode.appendChild(clsTxtNode); clsANode.setAttribute("id", clsANodeId); clsANode.setAttribute("class", "PSHYPERLINK"); clsANode.setAttribute("title", 'Privacy Statement'); clsANode.setAttribute("target", "_blank"); clsANode.setAttribute("href", privacyUrl); clsANode.setAttribute("role", "menuitem");  const peClsContainer = document.getElementById("ACTION_LINK_CONTAINER"); const peClsContainerNumbChildren = peClsContainer.childElementCount; peClsContainer.insertBefore(clsANode, peClsContainer.children[peClsContainerNumbChildren - 1]); }
 } catch (error) {
 console.log(error); }
}


function isOnlyStudent(tilesArray) {
 var hasStudent = false; var hasOther = false; for (let i = 0; i < tilesArray.length; i++) {
 const aTile = tilesArray[i]; const aValue = aTile.getAttribute("data-fwid")
 if (aValue == "PE_UI018_HB_STDNT.PE_UI018_HB_STDNT") {
 hasStudent = true; } else if (aValue == "SA_LEARNING_MANAGEMENT.SS_FACULTY" || aValue == "NUI_FRAMEWORK.PT_AGSTARTPAGE_NUI") {
 hasOther = true; break; }
 }
 if (hasStudent && !hasOther) {
 return true; } else {
 return false; }
}

function setFluidHelpToStudent(studentHelpLink) {
 var helpInputElement = document.getElementById("ICPanelHelpUrl"); if (helpInputElement) {
 helpInputElement.setAttribute("value", studentHelpLink); } else {
 var hiddenFields = document.getElementById("win0" + "divPSHIDDENFIELDS"); if (hiddenFields) {
 var helpInputHtml = '<input type="hidden" name="ICPanelHelpUrl" id="ICPanelHelpUrl" value="' + studentHelpLink + '">'; hiddenFields.insertAdjacentHTML("beforeend", helpInputHtml); }
 }
}


try {
 
 var classSearchPageObserver = new MutationObserver(function (mutations) {

 var formName = document.getElementsByTagName("form")[0].getAttribute("name"); var pageInfoDiv = document.getElementById('pt_pageinfo_' + formName); if (pageInfoDiv.getAttribute("page") == "SSR_CLSRCH_ENTRY") {
 classSearchIcObserver.observe(document.getElementById("ICStateNum"), classSearchObserverConfig); prepareSearchButton(); }
 });  var classSearchIcObserver = new MutationObserver(function (mutations) {
 
 prepareSearchButton(); });  var classSearchObserverConfig = {
 attributes: true,
 childList: false,
 characterData: false
 };} catch (err) {
 
 console.log("Class Search GA setup didn't work: " + err);}
function sendGaClassSearchEvent() {
 try {
 var classSearchLabel = ""; var classSearchAction = ""; var classSearchItems = "";  $('form#CLASS_SEARCH select, form#CLASS_SEARCH input[id^="SSR"][class!="PSCHECKBOX"],form#SSR_SSENRL_CART select, form#SSR_SSENRL_CART input[id^="SSR"][class!="PSCHECKBOX"],form#SSR_SSENRL_SWAP select, form#SSR_SSENRL_SWAP input[id^="SSR"][class!="PSCHECKBOX"]').each(function (index, element) {

 var aLabelItem = $(element).attr('id'); var indexFrom = aLabelItem.indexOf("_", aLabelItem.indexOf("WRK")); aLabelItem = aLabelItem.substring(indexFrom + 1, aLabelItem.indexOf("$")); var anActionItem = aLabelItem; var itemValue; if ($(element).is("select")) {
 itemValue = $(element).find('option:checked').eq(0).attr("value"); } else if ($(element).attr('type') == "hidden") {
 if ($(element).val() == "Y") {
 itemValue = $(element).val(); } else {
 itemValue = ""; }
 } else {
 itemValue = $(element).val(); }
 aLabelItem = aLabelItem + ":" + itemValue
 
 
 if (itemValue.length > 0) {
 if (classSearchLabel.length > 0) {
 classSearchLabel = classSearchLabel + ";" + aLabelItem; classSearchAction = classSearchAction + ";" + anActionItem;  classSearchItems = classSearchItems + ',\n' + anActionItem + ': "' + itemValue + '"'; } else {
 classSearchLabel = aLabelItem; classSearchAction = anActionItem;  classSearchItems = anActionItem + ': "' + itemValue + '"'; }
 }

 });  var menuName = $("div[id^='pt_pageinfo']").attr("menu"); var formId = $('form').attr('id'); console.log("eventAction - " + classSearchAction); console.log("eventLabel - " + classSearchLabel); console.log("eventValue - " + classSearchLabel.split(";").length);     gtag("event", "class_search", {
 class_search_fields: classSearchAction,
 class_search_values: classSearchLabel,
 class_search_sumbitted_count: classSearchLabel.split(";").length,
 class_search_items: [
 {
 classSearchItems
 }
 ]
 }); } catch (err) {
 
 console.log("Class Search sending to GA didn't work: " + err); }
}

function prepareSearchButton() {
 try {
 var originalOnClick = $('form input#CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH').attr("onclick"); if (originalOnClick.substr(0, 22) != "sendGaClassSearchEvent") {
 $('form input#CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH').attr("onclick", "sendGaClassSearchEvent(); " + originalOnClick); }
 } catch (err) {
 
 console.log("Class Search preparing button for GA didn't work: " + err); }

}



function doMessage(msgType) {
 try {

 
 
 
 
 
 if ($(".peAnnouncement").length) {
 $(".peAnnouncement").remove(); }
 if ($(window.parent.document.querySelector(".peAnnouncement")).length) {
 $(window.parent.document.querySelectorAll(".peAnnouncement")).remove(); }
 
 
 
 
 
 
 
 
 if (peLocation.indexOf("PE_CC096_MODO.PE_CC096_SCHD") >= 0) {
 return; }
 var aLionPATHMsgFromCat; if (peSearch.indexOf("yari=modo") >= 0) {
 aLionPATHMsgFromCat = JSON.parse(localStorage.getItem(msgType)); }

 if (aLionPATHMsgFromCat == null) {
 aLionPATHMsgFromCat = JSON.parse(sessionStorage.getItem(msgType)); }

 
 var msgsArray = []; var urlControl = qs("peUrlMessageControl"); var urlMsgJson;  if (urlControl != null && urlControl.length > 0 && urlControl.indexOf("sbrd") == 0) {
 
 var urlMsgText = "Access to Student Center is no longer permitted.  Please use Student Home Base instead."; var urlMsgJson = { id: "urlMsg", control: urlControl, message: urlMsgText }; msgsArray.push(urlMsgJson); }
 

 if (msgsArray.length == 0 && aLionPATHMsgFromCat == null) {
 return; } else if (aLionPATHMsgFromCat != null) {
 for (let i = 0; i < aLionPATHMsgFromCat.length; i++) {
 msgsArray.push(aLionPATHMsgFromCat[i]); }

 }

 
 if (msgsArray.length > 0) {
 var msgHtmlElement = "";  for (ai = 0; ai < msgsArray.length; ai++) {

 
 var msgHideKey; if (localStorage.getItem(msgsArray[ai].id) == "hide") {
 continue; } else {
 msgHideKey = msgsArray[ai].id; }
 
 if (msgsArray[ai].id == "urlMsg" && sessionStorage.getItem(msgsArray[ai].control) == "hide") {
 continue; } else {
 
 }
 
 
 
 var comp = ""; comp = msgsArray[ai].component; var currentcomponent = ""; currentcomponent = getPeComponent();  if (comp <= " " || comp == currentcomponent || currentcomponent == "PE_TE099_BN_MSG_CN")
 { 
 
 
 } else{
 continue; }
 
 
 var msgHtml = "<div><div class='peAnnouncement' role='alert' id='" + msgHideKey + "' style='display:flex; flex-wrap:nowrap; background-color:white; border:2px #009CDE solid; border-radius:6px; margin: 2px 5px; justify-content:space-between; color:#333; font-size:13px; padding-left:17px; padding-right:3px; padding-top:2px; '>"; if (msgsArray[ai].title != undefined) {
 msgHtml = msgHtml + "<div><span style='color:#009CDE; font-weight:700;'>" + msgsArray[ai].title + " </span>" + msgsArray[ai].message + "</div>"; } else {
 msgHtml = msgHtml + "<div>" + msgsArray[ai].message + "</div>"; }
 if (msgsArray[ai].id != "urlMsg") {
 msgHtml = msgHtml + '<span><a href=\'#\' onclick="hideMessage(\'' + msgHideKey + '\')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#334D65" width="19px" height="19px"><title >Hides announcement</title><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg></a></span>'
 }
 msgHtml = msgHtml + "</div></div>"; msgHtmlElement = msgHtmlElement + $(msgHtml).html(); }
 if (window.self === window.top) {
 if ($("div#PT_MID_SECTION div#PT_MAIN div[id$='divPAGECONTAINER']").length) {
 $("div#PT_MID_SECTION div#PT_MAIN div[id$='divPAGECONTAINER']").prepend(msgHtmlElement);  } else if (peSearch.indexOf("tab=DEFAULT") >= 0) {
 $("table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(2):not([id='ptpgltbody_row_MENU']):not([id='ptpgltbody_row_GS_PRIV_LOGIN_GBL']) > td:nth-of-type(1):not([colspan='2'])").eq(0).prepend(msgHtmlElement); } else if (peSearch.indexOf("PE_PT_NVT_PUBLIC") >= 0 || peSearch.indexOf("PE_PT_NVT_UNV_BULLETINS") >= 0 || peSearch.indexOf("PE_PT_NVT_TRN") >= 0 || peSearch.indexOf("PE_PT_NVT_DEL_HOME") >= 0 || peSearch.indexOf("PE_PT_NVT_DEL_AUTH_PAY_ACCE") >= 0) {
 $("body > div:nth-of-type(2)").eq(0).prepend(msgHtmlElement); }
 } else {
 if (window.parent.document.querySelector("div#PT_MID_SECTION div#PT_MAIN div[id$='divPAGECONTAINER']") != null) {
 $(window.parent.document.querySelector("div#PT_MID_SECTION div#PT_MAIN div[id$='divPAGECONTAINER']")).prepend(msgHtmlElement); } else if ($(window.parent.document.querySelector("#ptifrmtarget")).length > 0) {
 $(window.parent.document.querySelector("#ptifrmtarget")).prepend(msgHtmlElement); window.top.ptIframe.resizeAll(); }
 }



 }
 
 } catch (error) {
 console.log(error); }
}

function hideMessage(aMsgId) {
 
 if (aMsgId != "urlMsg" && aMsgId != "pe_previewMarker") {
 localStorage.setItem(aMsgId, "hide"); }
 
 $("#" + aMsgId).remove();  try {
 if ($(window.parent.document.querySelector("#ptifrmtarget")).length > 0) {
 window.top.ptIframe.resizeAll(); }
 } catch (error) {
 console.log(error); }
}


function stringToHash(string) {

 var hash = 0; if (string.length == 0) return hash; for (i = 0; i < string.length; i++) {
 char = string.charCodeAt(i); hash = ((hash << 5) - hash) + char; hash = hash & hash; }

 return hash;}
function qs(key) {
 key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)")); return match && decodeURIComponent(match[1].replace(/\+/g, " "));}





var peFeedbackButtonId = "pe-bottom-right-button"
var peFeedBackContainerId = "pe-feedback-container";var peFeedBackMessageContainerId = "pe-feedback-message-container";var peFeedbackUrl = "peFeedbackUrl";var peFeedBackCommentContainerId = "pe-feedback-comment-container";function showFeedbackModal(msg, commentAllowed = "false", menuName) {
 const allowComment = commentAllowed.toLowerCase() === "true" ? true : false; const peFeedbackModal = document.createElement("div"); peFeedbackModal.setAttribute("id", peFeedBackContainerId); peFeedbackModal.setAttribute("role", "region"); peFeedbackModal.setAttribute("aria-label", "Rate your experience");  const closeButtonHtml = `<button><img src="/cs/CSPRD/cache86107_v2/PT_MODAL_CLOSE_NUI_1.svg" alt="Close" title="Close"></button>`
 const closeContainer = document.createElement("div"); closeContainer.setAttribute("class", "peFeedbackCloseButton"); closeContainer.innerHTML = closeButtonHtml; peFeedbackModal.appendChild(closeContainer); const peFeedbackMessage = document.createElement("div"); peFeedbackMessage.setAttribute("id", peFeedBackMessageContainerId); peFeedbackMessage.innerHTML = msg; peFeedbackModal.appendChild(peFeedbackMessage);  let commentHtml = ""; if (allowComment) {
 
 commentHtml = "<div class='peFeedbackComment'><button>Any Comments?</button>"; }

 const feedbackContainerHTML = `
 <div class="feedback-container">
 <fieldset aria-hidden="false" class="star-rating">
 <legend>Rate your experience:</legend>
 <div>
 <input type="radio" class="star" name="rating" value="1" id="rating1" />
 <label for="rating1"><span>1</span></label>
 <input type="radio" class="star" name="rating" value="2" id="rating2" />
 <label for="rating2"><span>2</span></label>
 <input type="radio" class="star" name="rating" value="3" id="rating3" />
 <label for="rating3"><span>3</span></label>
 <input type="radio" class="star" name="rating" value="4" id="rating4" />
 <label for="rating4"><span>4</span></label>
 <input type="radio" class="star" name="rating" value="5" id="rating5" />
 <label for="rating5"><span>5</span></label>
 </div>
 </fieldset>
 <div class="peFeedbackSubmit">
 <div><button>Submit Feedback</button></div>
 ${commentHtml}
 </div>
 </div>
 `; const starsContainer = document.createElement("div"); starsContainer.innerHTML = feedbackContainerHTML; peFeedbackModal.appendChild(starsContainer);  const pageContainerElement = document.querySelector("#divPAGECONTAINER_TGT"); if (pageContainerElement) {
 pageContainerElement.appendChild(peFeedbackModal); } else {
 document.body.appendChild(peFeedbackModal); }

 
 const stars = document.querySelectorAll(".star");  stars.forEach((star) => {


 star.addEventListener("click", () => {
 
 
 const submitContainer = document.querySelector("#pe-feedback-container .peFeedbackSubmit"); if (submitContainer) {
 submitContainer.style = "visibility:visible"; }
 }); });  const submitButton = document.querySelector(".peFeedbackSubmit button"); submitButton.addEventListener("click", (event) => {
 submitFeedback(); event.stopPropagation(); }); submitButton.addEventListener("keypress", (event) => {
 if (event.key === "Enter") {
 submitFeedback(); event.stopPropagation(); }
 });  if (allowComment) {
 const commentLink = document.querySelector(".peFeedbackComment button"); commentLink.addEventListener("click", (event) => {
 
 const textArea = document.querySelector("#peFeedbackComment"); if (!textArea) {
 showComments(); }
 event.stopPropagation(); event.preventDefault(); }); commentLink.addEventListener("keypress", (event) => {
 if (event.key === "Enter") {
 showComments(); event.stopPropagation(); }
 }); }

 
 const closeButton = document.querySelector(".peFeedbackCloseButton button"); closeButton.addEventListener("click", (event) => {
 xOutDialog(); event.stopPropagation(); event.preventDefault(); }); closeButton.addEventListener("keypress", (event) => {
 if (event.key === "Enter") {
 xOutDialog(); event.stopPropagation(); event.preventDefault(); }
 }); function submitFeedback() {

 
 let starValue, userComment; const radioButtons = document.querySelectorAll(".star-rating input"); radioButtons.forEach((aRadioButton) => {
 if (aRadioButton.checked) {
 starValue = aRadioButton.value; }
 }); if (allowComment) {
 const commentElement = document.querySelector("#peFeedbackComment"); if (commentElement) {
 userComment = document.getElementById("peFeedbackComment").value; if (!userComment || userComment.trim().length === 0) {
 userComment = "empty"
 }
 } else {
 userComment = "null"; }
 }

 if (starValue && starValue > 0 && starValue < 6) {
 let scriptParams = "&starValue=" + starValue; if (menuName) {
 scriptParams = scriptParams + "&menuName=" + menuName; }
 if (allowComment) {
 scriptParams = scriptParams + "&userComment=" + userComment; }
 
 callIscript(scriptParams); }

 document.getElementById(peFeedBackContainerId).remove(); }

 
 function showComments() {
 
 const legendElement = document.querySelector(".star-rating legend"); if (legendElement) {
 legendElement.classList.add("hidden"); }
 
 const msgElement = document.querySelector("#" + peFeedBackMessageContainerId); if (msgElement) {
 msgElement.classList.add("displayNone"); }
 
 const commentLinkElement = document.querySelector(".peFeedbackComment"); if (commentLinkElement) {
 commentLinkElement.classList.add("displayNone"); }
 
 const commentBox = document.createElement("div"); commentBox.setAttribute("id", peFeedBackCommentContainerId); const commentBoxHtml = ` <textarea id="peFeedbackComment" aria-label="Enter comment to submit with feedback" rows="4" maxlength="500" /> `
 commentBox.innerHTML = commentBoxHtml; const fieldSetElement = document.querySelector("fieldset.star-rating"); if (fieldSetElement) {
 fieldSetElement.parentNode.insertBefore(commentBox, fieldSetElement.nextSibling);  const textAreaElement = document.querySelector("#peFeedbackComment"); if (textAreaElement) {
 textAreaElement.focus(); }
 }
 }

 function xOutDialog() {
 

 
 let scriptParams = "&dismiss=true"; if (menuName) {
 scriptParams = scriptParams + "&menuName=" + menuName; }

 
 callIscript(scriptParams);  document.getElementById(peFeedBackContainerId).remove(); }

 function callIscript(params) {
 const scriptUrl = sessionStorage.getItem(peFeedbackUrl)
 if (scriptUrl) {
 let scriptUrlWithParams = scriptUrl + params; const xhrFeedback = new XMLHttpRequest(); xhrFeedback.open("GET", scriptUrlWithParams); xhrFeedback.send(); xhrFeedback.onload = () => {
 if (xhrFeedback.readyState == 4 && xhrFeedback.status == 200) {
 const data = xhrFeedback.response;  return true; } else {
 console.log(`Error: ${xhrFeedback.status}`); return false; }
 }
 } else {
 return false; }
 }
}




function getNumberofRTEInstances(){
var x = 0;for(var instances in CKEDITOR.instances){x++;}
return x;}

PTRTE_CheckImages = function (URI, UrlID, EditorField)
{
 
 if ((typeof URI == "undefined") || (URI == "")) URI = location.href; if ((typeof UrlID == "undefined") || (UrlID == "")) UrlID = "PT_RTE_IMG_DB_LOC";  var baseUri = URI.replace("/psp/", "/psc/"); var serverUri = baseUri.split("/psc/")[0]; baseUri = serverUri + baseUri.match(/\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0]; var URLoc = baseUri + "s/WEBLIB_PTRTE.ISCRIPT1.FieldFormula.IScript_RTE_IMAGE_ATTACH?URLId=" + UrlID; var psSiteName = (URI.split("/"))[4]; if(psSiteName.indexOf("_") != -1) {
 var lIndex = psSiteName.lastIndexOf("_"); var lastStr = psSiteName.substr(lIndex+1); if(typeof(lastStr) != 'undefined' && lastStr != "" && !isNaN(lastStr)) {
 psSiteName = psSiteName.substr(0, lIndex); }
 }

 
 var objEditorField = null; if ((typeof EditorField != "undefined") && (EditorField != "")) {
 objEditorField = document.getElementById(EditorField); }
 if (objEditorField == null) {
 objEditorField = document.body; }

 
 var objImages = objEditorField.getElementsByTagName('img');  if (typeof document.body.RTFImages == "undefined") document.body.RTFImages = new Array(0);  var imgStr = ""; for (var i=0; i<objImages.length; i++) {
 var img = objImages[i]; if ((!img.id) || (!img.src)) continue; var tempval = img.id.split("###"); var ImgID = tempval[0]; var filename = tempval[1]; if ((UrlID == ImgID) && !img.PTRTEImageVerified) {
 img.PTRTEImageVerified = "PENDING"; imgStr = imgStr + "&Params=" + filename; document.body.RTFImages.push(img);  tempval = img.src.split("/");  var temp_img_src ="";  temp_img_src = "/cs/"+psSiteName+"/";  var tempSrcSplit = img.src.split("/"); img.oracletempimagesrc = serverUri + temp_img_src + tempSrcSplit[tempSrcSplit.length-2] + "/" + tempSrcSplit[tempSrcSplit.length-1] ; }
 }

 
 if (imgStr != "") {
 var PTRTELoader = new net2.ContentLoader(
 URLoc + imgStr,
 null, null, "GET",
 function () {
 
 
 if (typeof document.body.RTFImages != "undefined") {
 for (var i=0; i<document.body.RTFImages.length; i++) {
 var img = document.body.RTFImages[i]; if ((img) && (typeof img.oracletempimagesrc != "undefined")) {
 if (img.src != img.oracletempimagesrc) {
 img.src = img.oracletempimagesrc; } else {
 img.src = img.oracletempimagesrc + "?reload"; }
 img.PTRTEImageVerified = "DONE"; }
 }
 }
 },
 function () {
 
 },
 null,
 "application/x-www-form-urlencoded"
 ); }
} 

function versionInfo()
{
 this.xhtml=""; this.version=""; this.importance="";}


function detectDoctype(currDoc) {
 var re=/\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi; var myversionInfo=new versionInfo(); if (!currDoc)
 currDoc = document; if ((typeof currDoc.namespaces != "undefined") && currDoc.all[0].nodeName.toLowerCase() !== "html" && currDoc.all[0].nodeValue !== null) {
 if (currDoc.all[0].nodeValue.toLowerCase().indexOf("doctype") > -1)
 re.exec(currDoc.all[0].nodeValue); else
 return false; } else { 
 if (((browserInfoObj2.isIE && browserInfoObj2.version > 8) || !browserInfoObj2.isIE) && currDoc.doctype !== null)
 re.exec(currDoc.doctype.publicId); else
 return false; }
 myversionInfo.xhtml=RegExp.$1; myversionInfo.version=RegExp.$2; myversionInfo.importance=RegExp.$3;  if (myversionInfo !== null) 
 return true; else
 return false;}

function PT_Dialog()
{ }

PT_Dialog.prototype = {
 init: function(closeUrl, closeAlt) {
 this.arrModalMsgs = new Array(); this.arrModalDialogs = new Array(); this.arrModelessDialogs = new Array(); this.arrDivPopup = new Array(); this.cObj = MTop().document.getElementById("pt_modals"); if (typeof this.cObj == 'undefined' || this.cObj == null) {
 var oBody = MTop().document.body; oObj = document.createElement("div"); oObj.setAttribute("id", "pt_modalMask"); oBody.appendChild(oObj); oObj = document.createElement("div"); oObj.setAttribute("id", "pt_modalMaskCover"); oBody.appendChild(oObj); oObj = document.createElement("div"); oObj.setAttribute("id", "pt_modals"); oObj.setAttribute("CLASS", "PSMODAL"); oBody.appendChild(oObj); this.cObj = MTop().document.getElementById("pt_modals"); this.cObj.innerHTML = "<div id='ptModalShadow' class='popupDragFrame' style='cursor:nw-resize'>&nbsp;</div>"; MTop().document.onkeyup = PT_handleTabKeyForModalDialog; MTop().document.onkeydown = PT_handleTabKeyForModalDialog; } else {
 this.cObj.style.display = "block"; }
 this.idCount = 0; this.zIndexBase = 9999; MTop().modlessId = -1; MTop().modlessWinCnt = -1; MTop().hideModId = -1; MTop().PTMODFRAME_ = "ptModFrame_";  MTop().PTMOD_ = "ptMod_";  MTop().modIdLastFrame = -1;  },

 processOptions: function(options, modObj, sHostUrl) {
 if (typeof options == "undefined") return; var optionArr = options.split(";"); modObj.strCurrUrl = null; modObj.bRCFModal = false; modObj.sStyle = 'PSMODALTABLE'; if (isFModeLayout())
 modObj.sStyle = 'ps_modal_container'; modObj.sMaskStyle = 'ps_modalmask'; modObj.bModeless = false; modObj.bClose = false; modObj.sCancelName = ''; modObj.bResize = false; modObj.bHeader = true; modObj.sTitle = ''; modObj.bPIA = false; modObj.bCrossDomain = false;  modObj.width = -1; modObj.height = -1; modObj.bPopup = false; modObj.sPopupParentId = ''; modObj.sPopupParentQS = ''; modObj.sCacheParentId = ''; modObj.bAutoClose = false; modObj.bAutoCloseWarn = false; modObj.nPopupBW = 10; modObj.nRPopupBW = 0; modObj.bTail = true; modObj.nTailW = 17; modObj.nTailH = 30; modObj.nTailMTop = 10; modObj.nTailMLeft = -25; modObj.bVertical = false; modObj.bLeft = false; modObj.bRight = false; modObj.bUp = false; modObj.bDown = false; modObj.bGrouplet = false; modObj.sWidth = ""; modObj.sHeight = ""; modObj.bBack = false; modObj.sBackIdQS = ""; modObj.sBackTitle = "Back"; modObj.bFolder = false; modObj.bSidePage = false; modObj.bFullScreen = false; modObj.bCenter = false; modObj.bMask = true; modObj.bAnm = false;  modObj.nAlign = 0;  modObj.bTypeAhead = false; modObj.bCal = false; modObj.bMsg = false; modObj.bTimeoutMsg = false; modObj.bDivPopup = false; modObj.bBackCancel = false; modObj.bGridSort = false; modObj.bCustPos = false; modObj.nRCFLeft = -1; modObj.nRCFTop = -1;  modObj.sortid = ""; modObj.bViewAtt = false; modObj.bSearchPage = false; modObj.bPopupMenu = false; modObj.bStartup = true;  modObj.form = null; modObj.bAddTabHandler = false; modObj.bSkipFocus = false; var bVerticalOverride = false;  for (var i = 0; i < optionArr.length; i++) {
 var name = optionArr[i].split("@")[0]; var value = optionArr[i].split("@")[1]; if (typeof value == "undefined")
 continue; switch (name) {
 case "strCurrUrl":
 modObj.strCurrUrl = value; break; case "closeUrl":
 modObj.closeUrl = convImgURLToABSUrl(value,sHostUrl, modObj.bCrossDomain, modObj.strCurrUrl,modObj.bRCFModal); break; case "closeAlt":
 modObj.closeAlt = value; break; case "resizeUrl":
 if (!isFModeLayout()) {
 if (modObj.bModeless && !modObj.bRCFModal)
 modObj.resizeUrl = convToABSUrl(value,sHostUrl, modObj.bCrossDomain, modObj.strCurrUrl); else
 modObj.resizeUrl = convImgURLToABSUrl(value,sHostUrl, modObj.bCrossDomain, modObj.strCurrUrl,modObj.bRCFModal); modObj.bResize = true; }
 break; case "resizeAlt":
 modObj.resizeAlt = value; break; case "moveAlt":
 modObj.moveAlt = value; break; case "bModeless":
 modObj.bModeless = (value.indexOf("0") != -1) ? false : true; break; case "bClose":
 modObj.bClose = (value.indexOf("0") != -1) ? false : true; break; case "bBack":
 modObj.bBack = (value.indexOf("0") != -1) ? false : true; break; case "bBackCancel":
 modObj.bBackCancel = (value.indexOf("0") != -1) ? false : true; break; case "bResize":
 if (!isFModeLayout()) 
 modObj.bResize = (value.indexOf("0") != -1) ? false : true; break; case "bGrouplet":
 modObj.bGrouplet = (value.indexOf("0") != -1) ? false : true; break; case "bPIA":
 modObj.bPIA = (value.indexOf("0") != -1) ? false : true; break; case "bCrossDomain":
 modObj.bCrossDomain = (value.indexOf("0") != -1) ? false : true; break; case "sCancelName":
 modObj.sCancelName = value; break; case "bHeader":
 if (!modObj.bPopupMenu)
 modObj.bHeader = (value.indexOf("0") != -1) ? false : true; break; case "sTitle":
 modObj.sTitle = value; break; case "width":
 modObj.width = new Number(value.valueOf()); break; case "height":
 modObj.height = new Number(value.valueOf()); break; case "bPopup":
 modObj.bPopup = (value.indexOf("0") != -1) ? false : true; break; case "bPopupMenu":
 modObj.bPopupMenu = (value.indexOf("0") != -1) ? false : true; if (modObj.bPopupMenu)
 {
 modObj.sStyle = modObj.sStyle + " " + "ps_box-popupmenu"; modObj.bHeader = false; modObj.bAutoClose = true; modObj.bMask = true; modObj.sMaskStyle = 'ps_masktrans'; if (!bVerticalOverride)
 modObj.bVertical = true; }
 break; case "sPopupParentId":
 modObj.sPopupParentId = value; modObj.bCenter = false; modObj.bPopup = true; break;  case "sPopupParentQS":
 modObj.sPopupParentQS = value; modObj.bCenter = false; modObj.bPopup = true; break; case "bCache":
 modObj.bCache = (value.indexOf("0") != -1) ? false : true; break; case "sCacheParentId":
 modObj.sCacheParentId = value; break; case "bAutoClose":
 if (!modObj.bPopupMenu)
 modObj.bAutoClose = (value.indexOf("0") != -1) ? false : true; break; case "bAutoCloseWarn":
 modObj.bAutoCloseWarn = (value.indexOf("0") != -1) ? false : true; break; case "bTail":
 modObj.bTail = (value.indexOf("0") != -1) ? false : true; break; case "nPopupBW":
 modObj.nPopupBW = new Number(value.valueOf()); break; case "nRPopupBW":
 modObj.nRPopupBW = new Number(value.valueOf()); break; case "nTailW":
 modObj.nTailW = new Number(value.valueOf()); break; case "nTailH":
 modObj.nTailH = new Number(value.valueOf()); break; case "nTailMTop":
 modObj.nTailMTop = new Number(value.valueOf()); break; case "nTailMLeft":
 modObj.nTailMLeft = new Number(value.valueOf()); break; case "bVertical":
 bVerticalOverride = true; modObj.bVertical = (value.indexOf("0") != -1) ? false : true; modObj.bCustPos = true; break;  case "sStyle":
 modObj.sStyle = modObj.sStyle+" "+value; if (value.indexOf('typeahead') != -1) {
 modObj.bTypeAhead = true; modObj.bPopup = true; } else if (value.indexOf('ps_modal-gridsort') != -1)
 modObj.bGridSort = true; break; case "sMaskStyle":
 if (!modObj.bPopupMenu)
 modObj.sMaskStyle = value; break; case "sWidth":
 modObj.sWidth = value; break; case "sHeight":
 modObj.sHeight = value; break; case "sBackIdQS":
 modObj.sBackIdQS = value; break; case "sBackTitle":
 modObj.sBackTitle = value; break;  case "bFolder":
 modObj.bFolder = (value.indexOf("0") != -1) ? false : true; break; case "bSidePage":
 modObj.bSidePage = (value.indexOf("0") != -1) ? false : true; break; case "bRCFModal":
 modObj.bRCFModal = true; break; case "sGlyphId":
 modObj.sGlyphId = value; break; case "bFullScreen":
 modObj.bFullScreen = (value.indexOf("0") != -1) ? false : true; if (modObj.bFullScreen) modObj.bPopup = false; modObj.sStyle = modObj.sStyle + " psc_modal-fullscreen"; break;  case "bViewAtt":
 modObj.bViewAtt = (value.indexOf("0") != -1) ? false : true; break; case "bCenter":
 modObj.bCenter = (value.indexOf("0") != -1) ? false : true; if (modObj.bCenter) modObj.bPopup = false; break; case "bMask":
 if (!modObj.bPopupMenu)
 modObj.bMask = (value.indexOf("0") != -1) ? false : true; break; case "bAnm":
 modObj.bAnm = (value.indexOf("0") != -1) ? false : true; break; case "nAlign":
 modObj.nAlign = value; break; case "bMsg":
 modObj.bMsg = (value.indexOf("0") != -1) ? false : true; if (isFModeLayout())
 modObj.sStyle = modObj.sStyle + " ps_popup-msg"; break; case "bTimeoutMsg":
 modObj.bTimeoutMsg = (value.indexOf("0") != -1) ? false : true; break; case "bDivPopup":
 modObj.bDivPopup = (value.indexOf("0") != -1) ? false : true; break; case "bSearchPage":
 modObj.bSearchPage = (value.indexOf("0") != -1) ? false : true; break; case "nrcfLeft":
 modObj.nRCFLeft = new Number(value.valueOf()); break; case "nrcfTop":
 modObj.nRCFTop = new Number(value.valueOf()); break; case "sortid":
 modObj.sortid = value;  break; case "bCal":
 modObj.bCal = (value.indexOf("0") != -1) ? false : true; break; case "bSkipFocus":
 modObj.bSkipFocus = (value.indexOf("0") != -1) ? false : true; break; }
 }

 if (modObj.bDivPopup && !modObj.bFullScreen) 
 modObj.bAutoClose = true; if (isFModeLayout() && isAccessibleLayout() && !modObj.bPopupMenu && modObj.bDivPopup 
 && (modObj.sStyle.indexOf('ps_calendar_modal') == -1))
 { 
 modObj.bHeader = true; if (modObj.sTitle == '')
 modObj.sTitle = sPopupTitle; } 
 },

 showModalDialog: function(url, oParentWin, options, msg, onclose, form, name, pollContent, mDivObj) {

 storeModalParentId(options); if (!this.arrModalDialogs)
 this.init();      if (typeof oParentWin.modWin != "undefined" && oParentWin.modWin != null && typeof msg != "undefined")
 {
 if (oParentWin.modWin.bMsg && options.indexOf("bTimeoutMsg@1") == -1) 
 ;  else
 this.closeModalDialog(oParentWin.modWin.modalID); }

 var saveTopModId = MTop().modId; MTop().oParentWin = oParentWin; MTop().modId = this.idCount; this.closeModalMsg(null, this.idCount - 1); modObj = document.createElement("div"); modObj.setAttribute("id", MTop().PTMOD_ + this.idCount); if (typeof msg != "undefined" && msg)
 options = options+"bMsg@1;"
 if (typeof mDivObj != "undefined" && mDivObj)
 options = options+"bDivPopup@1;"
 this.processOptions(options, modObj, url);  if (modObj.bModeless && modObj.bAutoClose || modObj.bRCFModal)
 MTop().modIdLastFrame = saveTopModId; var bRCFModeless = false; if (isFModeLayout() && modObj.bRCFModal && isModeless(saveTopModId))
 
 bRCFModeless = true; if (modObj.bMsg && isFModeLayout() && typeof oParentWin.gFocusObj != "undefined" && !oParentWin.isFModeLayout())
 modObj.sStyle = modObj.sStyle+" psc_popup-classic"; this.maskHeader(this.idCount - 1, oParentWin, modObj.sMaskStyle, modObj.bAutoClose); var role; if (modObj.bPopupMenu)
 {
 role = " ";  if (oParentWin)
 oParentWin.document.forms[0].ICFocus.value = modObj.sPopupParentId; }
 else
 {
 if (modObj.bMsg)
 role = " role='alertdialog' "; else
 role = " role='dialog' "; role += "aria-modal='true' "; if (modObj.bCal)
 role += "aria-labelledby='clndrtitle' "; else if (modObj.bPopup || modObj.bHeader)
 role += "aria-labelledby='ptModTitle_" + this.idCount + "' "; else if (!modObj.bPopupMenu)
 role += "aria-labelledby='PT_TITLE' "; }

 if (modObj.bFolder) {
 this.processOptions(options, mDivObj, url); var gpObj = this.getParentPopup(mDivObj); if (gpObj) {
 pObj = gpObj.children[0]; if (gpObj.children.length > 1)
 pObj = gpObj.children[1]; if (pObj.children.length > 0)
 addHide(pObj.children[0]); if (pObj.parentNode.children.length > 1)
 addClass(pObj.parentNode.children[0], "ps_dash"); pObj.appendChild(mDivObj); }
 modObj = null; return; }
 if(!(document.getElementById("PT_AGSTARTPAGE_NUI")))
 this.checkRemoveModeless(modObj.bModeless); if (modObj.bModeless) {
 modObj.bRemove = false; MTop().modlessId = MTop().modId; if (getModlessWinCnt() != -1)
 url = url.replace('/' + getPSHome0(url) + getPSHomeSuffix(url) + '/', '/' + getPSHome0(url) + getModlessWinCnt() + '/'); }
 if (typeof onclose != "undefined" && onclose)
 modObj.onclose = onclose; if (typeof form != "undefined" && form)
 modObj.form = form; if (typeof name != "undefined" && name)
 modObj.name = name; modObj.oParentWin = oParentWin; if (oParentWin)
 var currDoc = oParentWin.document; else
 var currDoc = document; modObj.bCustMove = false; modObj.bCustResize = false; modObj.bCustResizeDone = false;  modObj.oParentWin.bProcess = true; var dWidth = 1; var dHeight = 1; if (modObj.width != -1)
 dWidth = modObj.width; if (modObj.height != -1)
 dHeight = modObj.height;  if (isFModeLayout())
 {
 if (modObj.bModeless || modObj.form == null) 
 modObj.bAddTabHandler = true; else
 {
 if (modObj.form && typeof modObj.form.ICPanelControlStyle == "undefined")
 
 modObj.bAddTabHandler = true; }
 }

 var sHtml = ""; sHtml += "<div id='ptModTable_" + this.idCount + "'" + role + "class='" + modObj.sStyle + "'"; if (isFModeLayout()) { 
 sHtml += ">"; if (modObj.bPopup) { 
 sHtml += "<div id='ptModWrap" + this.idCount+"' class='ps_mod_wrap'><div id='ptArrow1_"+ this.idCount+"'></div>";  sHtml += "<a class='ps-anchor' id='ICFirstAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModWrapc" + this.idCount + "');\"></a>"; sHtml += "<div class='ps_mod_wrapc' id='ptModWrapc" + this.idCount + "'>"; }
 else if (modObj.bDivPopup || modObj.bAddTabHandler)
 sHtml += "<a class='ps-anchor' id='ICFirstAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModTable_" + this.idCount + "');\"></a>"; if (modObj.bHeader) {
 if (modObj.bMsg && isFModeLayout() && isAccessibleLayout()) 
 sHtml += "<div id='ptModHeader_" + this.idCount + "'" + " class='ps_modal_header'>"; else
 sHtml += "<div id='ptModHeader_" + this.idCount + "'" + " class='ps_modal_header psc_hidden'>"; var sTitleHtml = ""; sTitleHtml += "<span id='ptModTitle_" + this.idCount + "' class='ps-text'></span>"; if (modObj.bBack){
 sHtml += "<div class='ps_box-button psc_image_only ps_popup-back'></div>"; sHtml += "<h1 id='ptModTitleBar_" + this.idCount + "' class='ps_modal_title'>" + sTitleHtml + "</h1>"; }
 else {
 sHtml += "<h1 id='ptModTitleBar_" + this.idCount + "' class='ps_modal_title'"; if (modObj.bViewAtt)
 sHtml += " onclick='javascript:doCloseModal(" + this.idCount + ");'"; sHtml += ">" + sTitleHtml + "</h1>"; }
 if (modObj.bClose || modObj.bModeless) {
 sHtml += "<div id='ptModClose_" + this.idCount + "' class='ps_modal_close'><div class='ps_box-button psc_modal-close'><span class='ps-button-wrapper'>"; sHtml += "<a class='ps-button' role='button' id='ptModCloseLnk_" + this.idCount + "'"; if (isFModeLayout() && !isAccessibleLayout())
 sHtml += " title='" + modalCloseAlt + "'"; sHtml += " onclick='javascript:cancelBubble(event);' href='javascript:"; if (modObj.bModeless)
 sHtml += "closeModal(" + this.idCount + ");'/>";  else if (modObj.bDivPopup && modObj.sCancelName.length != 0)
 sHtml += "doCancel(\""+modObj.sCancelName + "\");'/>"; else
 sHtml += "doCloseModal(" + this.idCount + ");'/>"; sHtml += "<img id='ptModCloseImg_" + this.idCount + "' src='" + modalCloseUrl + "' alt='" + modalCloseAlt + "'/></a></span></div></div>"; }
 sHtml += "</div>"; }

 var sScrollingNo = "";  if (!modObj.bViewAtt && (isIPad() || isIPhone()) && !bypassIOSFrameWrknd())
 sScrollingNo += " scrolling='no'"; if (modObj.bDivPopup) {
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='ps_modal_content'"; if (modObj.sWidth != "")
 sHtml += "style='width:" + modObj.sWidth + ";'"; sHtml += "></div>"; }
 else if (modObj.bMsg) {
 sHtml += "<a class='ps-anchor' id='ICFirstAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModContent_" + this.idCount + "');\"></a>"; sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='ps_modal_content'>" + msg + "</div>"; sHtml += "<a class='ps-anchor' id='ICLastAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModContent_" + this.idCount + "');\"></a>"; }
 else {
 var iframeTitle = ""; if (typeof currDoc == 'undefined' || currDoc == null)
 iframeTitle = sPopupTitle; else
 iframeTitle = currDoc.title + " " + sPopupTitle; sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='ps_modal_content psc_has_iframe'><iframe frameborder=0 id='" + MTop().PTMODFRAME_ + this.idCount + "' name='" + MTop().PTMODFRAME_ + this.idCount + "' title='" + iframeTitle + "' src='" + url + "' width=" + dWidth + " height=" + dHeight + sScrollingNo + "></iframe></div>"; }
 if (!modObj.bMsg && !modObj.bPopup && modObj.bResize)
 sHtml += "<div id='ptModBottom_" + this.idCount + "' class='ps_modal_bottom'><img id='ptModResize_" + this.idCount + "' class='PSMODALRESIZE' src='" + modObj.resizeUrl + "' alt='" + modObj.resizeAlt + "'/></div>"; if (modObj.bPopup) { 
 sHtml += "</div><div id='ptArrow2_" + this.idCount + "'></div>"; sHtml += "<a class='ps-anchor' id='ICLastAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModWrapc" + this.idCount + "');\"></a>"; sHtml += "</div>"; }
 else if (modObj.bDivPopup || modObj.bAddTabHandler)
 sHtml += "<a class='ps-anchor' id='ICLastAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModTable_" + this.idCount + "');\"></a>"; }
 else { 
 if (modObj.sWidth == "") {
 var fullWidth = ptCommonObj2.getViewportWidth(); var fullHeight = ptCommonObj2.getViewportHeight(); if (fullHeight > 160) fullHeight -= 80;  var isStandards = detectDoctype(currDoc) ? true : false; var mtopDoc = isStandards ? MTop().document.documentElement : MTop().document.body; var mtopDocScrollTop = MTop().document.documentElement.scrollTop || MTop().document.body.scrollTop; var default_top = (fullHeight - dHeight) / 2 + mtopDocScrollTop + 'px'; var default_left = (fullWidth - dWidth) / 2 + mtopDoc.scrollLeft + 'px'; sHtml += " style='top:" + default_top + ";left:" + default_left + ";'"; } 
 sHtml += ">"; if (modObj.bHeader) {
 
 if(modObj.bMsg)
 { sHtml += "<div id='ptModHeader_" + this.idCount + "'" + role + "class='PSMODALHEADER LOOKUPMODAL PTCPHIDEHEADERFORALERTS'>"; }
 else
 { sHtml += "<div id='ptModHeader_" + this.idCount + "'" + role + "class='PSMODALHEADER LOOKUPMODAL'>"; }

 sHtml += "<div id='popupTitleBarLeftImage'>&nbsp;</div>";  if (isClassicPlus())
 sHtml += "<div style='float:left;height:auto;'>";  else
 sHtml += "<div style='float:left;height:22px;'>";  sHtml += "<div id='ptModTitleBar_" + this.idCount + "' alt='" + modObj.moveAlt + "' title='" + modObj.moveAlt + "' style='float:left;' CLASS='PSMODALTITLE'><span id='ptModTitle_" + this.idCount + "' class='PTPOPUP_TITLE'></span></div>"; if (modObj.bClose || modObj.bModeless) {
 sHtml += "<div id='ptModControl_" + this.idCount + "' style='float:right;' class='PSMODALCLOSE'>"; sHtml += "<a class='PSMODALCLOSEANCHOR' style='border:none;padding:0px;margin:0px;text-decoration:none;' title='" + modObj.closeAlt + "' id='ptModCloseLnk_" + this.idCount + "' href='javascript:"; if (modObj.bModeless || modObj.bCrossDomain)
 sHtml += "closeModal(" + this.idCount + ");'/>"; else
 sHtml += "doCloseModal(" + this.idCount + ");'/>"; sHtml += "</a></div>"; } 
 sHtml += "</div>"; sHtml += "<div id='popupTitleBarRightImage'>&nbsp;</div>"; sHtml += "</div>"; }
 
 if (url)
 url = url.replace(/'/g, '%27'); if (modObj.bMsg)
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='PSMODALCONTENT'>" + msg + "</div>"; else { 
 if (detectDoctype(currDoc)) 
 {
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='PSMODALCONTENT'><iframe frameborder=0 id='" + MTop().PTMODFRAME_ + this.idCount + "' name='" + MTop().PTMODFRAME_ + this.idCount + "' src='" + url + "'"; if (modObj.width != -1) 
 sHtml += " width=" + dWidth; if (modObj.height != -1)
 sHtml += " height=" + dHeight; } 
 else 
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='PSMODALCONTENT'><iframe frameborder=0 id='" + MTop().PTMODFRAME_ + this.idCount + "' name='" + MTop().PTMODFRAME_ + this.idCount + "' src='" + url + "' width=" + dWidth + " height=" + dHeight; if (modObj.bHeader)
 sHtml += " aria-labelledby= 'ptModTitle_" + this.idCount + "'"; else
 sHtml += " title='Modal Dialogue'"; sHtml += "></iframe></div>"; }

 if (!modObj.bMsg && modObj.bResize)
 sHtml += "<div id='ptModBottom_" + this.idCount + "' class='PSMODALBOTTOM'><img id='ptModResize_" + this.idCount + "' class='PSMODALRESIZE' src='" + modObj.resizeUrl + "' alt='" + modObj.resizeAlt + "'/></div>"; }
 sHtml += "</div>"; if (!isFModeLayout() || !isAndroid())
 modObj.style.visibility = "hidden"; modObj.innerHTML = sHtml; if (!isFModeLayout() && modObj.bModeless) this.processing(1,3000); this.cObj.appendChild(modObj); modObj = MTop().document.getElementById(MTop().PTMOD_ + this.idCount); modObj.style.zIndex = this.zIndexBase + this.idCount * 10; if (modObj.bDivPopup) {
 var oContent = MTop().document.getElementById("ptModContent_" + this.idCount); oContent.appendChild(mDivObj); }
 if(!!window.navigator.standalone){
 var viewAttach = document.getElementById('PT_VIEWATTACH_FRAME'); if(viewAttach){
 viewAttach.onload = function() {
 var attachFrame = MTop().document.getElementById('PT_VIEWATTACH_FRAME'); var imgSrc = attachFrame.src; if(imgSrc.endsWith("jpg")||imgSrc.endsWith("png")||imgSrc.endsWith("gif")){
 if(mDivObj)mDivObj.innerHTML = "<img src='"+imgSrc+"' width='100%' height='100%'/>"; }
 }
 }
 }

 if (isFModeLayout() && bypassIOSFrameWrknd())
 AddIOSHasStdIframe(MTop().document.getElementById("ptModContent_" + this.idCount)); var oresize = MTop().document.getElementById("ptModResize_" + this.idCount); var oshadow = MTop().document.getElementById("ptModalShadow");  if (oresize && !browserInfoObj2.isIE)
 oresize.style.cssFloat = 'right'; if ('ltr' == 'rtl') 
 {
 if (oresize)
 oresize.style.cursor = 'ne-resize';  oshadow.style.cursor = 'ne-resize';  }
 if (isFModeLayout()) { 
 this.cObj.style.display = "inline"; this.cObj.style.backgroundColor = "#ffffff"; }
 else {
 this.cObj.style.display = "block"; this.cObj.style.backgroundColor = "transparent"; }
 var id = this.idCount; this.idCount++;   if (modObj.bMask && ((modObj.width != -1 || modObj.sWidth != "") || (isFModeLayout() && modObj.bRCFModal)))
 this.showMask(modObj, id); if (modObj.bDivPopup) {
 var oContent = MTop().document.getElementById("ptModContent_" + id); oContent.appendChild(mDivObj); this.resizeModalDialog(id, true); var mobj = MTop().document.getElementById("ptModTable_" + id); if (mobj.getAttribute("class").indexOf("ps_menutype-rc") > -1){
 var temp; if(oContent.children[0] && oContent.children[0].children[0] &&
 oContent.children[0].children[0].children[0] && oContent.children[0].children[0].children[0].children[1] &&
 ((temp = oContent.children[0].children[0].children[0].children[1].getElementsByTagName('a'))!=null) && temp[0])
 temp[0].focus(); }
 this.setAllMask(modObj, true); top.setAllMask(modObj, true); return modObj; } else if (modObj.bMsg) {
 oParentWin.modWin = modObj; if (browserInfoObj2.isFF && isFModeLayout()) {
 var firstButton = modObj.querySelector("[role=button]"); if (firstButton)
 firstButton.setAttribute("aria-describedby", "alertmsg"); }
 this.resizeModalDialog(id); this.setAllMask(modObj, true); return modObj; }
 else if (modObj.bModeless) {
 if (!modObj.bPIA)
 this.resizeModalDialog(id, true, modObj.width, modObj.height); this.setAllMask(modObj, true); if (bRCFModeless)
 {
 
 MTop().modlessId = id; MTop().modId = id; MTop().oParentWin = oParentWin; MTop().modIdLastFrame = id; }

 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); return oframe; }
 else {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (typeof pollContent !== "undefined" && pollContent && !modObj.bCrossDomain) {
 (function testForContent() {
 if (oframe) {
 try {
 obj = oframe.contentWindow.document.body; } catch (ex) {
 oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); setTimeout(testForContent,0); return; }
 } else {
 oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); setTimeout(testForContent,0); return; }
 return oframe; })(); } else {
 if (!modObj.bPIA)
 this.resizeModalDialog(id); this.setAllMask(modObj, true); return oframe; }
 }
 },

 addMsg: function(msg, window, options) {
 if (!this.arrModalDialogs) this.init(); var msgReq = new Array(msg, window, options); this.arrModalMsgs.push(msgReq); },

 isAnyMsg: function() {
 if (!this.arrModalMsgs) return false; if (this.arrModalMsgs.length > 0) return true; return false; },
 playMsg: function() {
 if (!this.isAnyMsg()) return; var msgReq = this.arrModalMsgs.shift(); showModalDialog_pt(null, msgReq[1], msgReq[2], msgReq[0]); },
 addDivPopup: function(mObj, win, options, scrollId, bFrame) {
 if (!this.arrDivPopup) this.init(); var popReq = new Array(mObj, win, options, scrollId, bFrame); this.arrDivPopup.push(popReq); },
 isAnyDivPopup: function() {
 if (!this.arrDivPopup) return false; if (this.arrDivPopup.length > 0) return true; return false; }, 
 playDivPopup: function() {
 if (!this.isAnyDivPopup()) return; var popReq = this.arrDivPopup.shift(); var mDivObj = popReq[0]; var bFrame = (typeof popReq[4] == "undefined" || !popReq[4]) ? false : true; if (mDivObj)
 removeHide(mDivObj); if (bFrame && popReq[2].indexOf("bDivPopup@1") == -1) {
 var oframe = this.showModalDialog("about:blank", popReq[1], popReq[2], null, null, null, null, null); var respHTML = mDivObj.innerHTML;  oframe.contentDocument.write(respHTML);   }
 else
 this.showModalDialog(null, popReq[1], popReq[2], null, null, null, null, null, mDivObj); if (mDivObj)
 {
 var scrollId = popReq[3]; if (!scrollId && mDivObj.firstChild)
 scrollId = mDivObj.firstChild.id; if (scrollId)
 scrollInitDivPopup(scrollId); }
 },
 setFocusFMode: function (id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var objs = modObj.querySelectorAll(".ps-button"); if (objs.length == 0) {
 objs = modObj.querySelectorAll("INPUT"); }
 if (objs.length==0) return; var obj= objs[0]; ptCommonObj2.tryFocus0(obj); },
 setPopupMenuFocus: function (id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var objs = modObj.querySelectorAll("[role='menuitem']"); for (var i = 0; i < objs.length; i++)
 {
 if (objs[i].offsetParent && !ptCommonObj2.tryFocus0(objs[i]))
 return; }
 },
 setPopupFocus: function (id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oContent = MTop().document.getElementById("ptModContent_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var oClose = MTop().document.getElementById("ptModCloseLnk_" + id); if (isAccessibleLayout() && oTitle) {
 oTitle.tabIndex = -1; if (!ptCommonObj2.tryFocus0(oTitle)) return; } else if (oClose) {
 if (!ptCommonObj2.tryFocus0(oClose)) return; }
 var otb = MTop().document.getElementById("ptModTable_" + id); var oWrap = otb.querySelector(".ps_mod_wrapc"); if (SetTargetFocus(oWrap)) return; oContent.tabIndex = 0; ptCommonObj2.tryFocus0(oContent); return; }, 
 isInModal: function (id, target) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj || modObj.bMsg) return false; var oContent = MTop().document.getElementById("ptModContent_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); if (oTitle && target == oTitle) return true; var otb = MTop().document.getElementById("ptModTable_" + id); if (otb) {
 var elements = otb.querySelectorAll("*"); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; if (el == target) {
 return true; }
 } 
 }
 return false; },
 setMsgFocus: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj.oParentWin.gFocusObj != null) {
 modObj.oParentWin.gFocusObj.blur(); modObj.parentfocusElID = modObj.oParentWin.gFocusObj.id; }
 var oContent = MTop().document.getElementById("ptModContent_" + id); var elements = oContent.getElementsByTagName('*'); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; switch (el.type) {
 case "button":
 case "radio":
 case "input":
 case "select":
 case "textarea":
 if (!ptCommonObj2.tryFocus0(el)) return el; break; default:
 }
 } 
 ptCommonObj2.tryFocus0(oContent); return oContent; },
 getMsgCancelId: function(id, cancelId) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oContent = MTop().document.getElementById("ptModContent_" + id); var elements = oContent.getElementsByTagName('*'); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; switch (el.type) {
 case "button":
 if (el.id == cancelId) return el.id; break; default:
 }
 }
 return null; },
 isParentModal: function(oParentWin) {
 if (typeof oParentWin.modalID != 'undefined' && oParentWin.modalID != null) 
 return true; return false; },
 isParentLive: function(oParentWin) {
 if (!this.isParentModal(oParentWin)) return true; var tmp = ""; if (oParentWin.name && oParentWin.name.indexOf("modWin_") != -1)
 tmp = oParentWin.name.split("modWin_"); else if (oParentWin.name && oParentWin.name.indexOf(MTop().PTMODFRAME_) != -1)
 tmp = oParentWin.name.split(MTop().PTMODFRAME_); else if (oParentWin.name && oParentWin.name.indexOf(MTop().PTMOD_) != -1)
 tmp = oParentWin.name.split(MTop().PTMOD_); if (tmp == "") return false; if (tmp[1] != "undefined" && tmp[1] != "") {
 pmodObj = MTop().document.getElementById(MTop().PTMOD_ + tmp[1]); if (typeof pmodObj.bRemove != 'undefined' && pmodObj.bRemove) return false; }
 return true; },
 isParentModeless: function(oParentWin) {
 if (MTop().modlessId == -1) return false; if (typeof oParentWin == 'undefined' || oParentWin == null || typeof oParentWin.name == 'undefined' || oParentWin.name == null) 
 return false; var tmp = oParentWin.name.split("_"); if (tmp[1] != "undefined" && tmp[1] != "" && tmp[1] == MTop().modlessId)
 return true; return false; },
 isModeless: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (typeof modObj != 'undefined' && modObj)
 return modObj.bModeless && !modObj.bRemove; else
 return false; },
 isWinModeless:function(win) {
 return this.isParentModeless(win); },
 restoreModeless: function() {
 if (MTop().modlessId > -1) {
 var modlessObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modlessId); if (modlessObj) {
 modlessObj.style.display = "block"; return true; }
 }
 return false; },
 hideModeless: function() {
 if (MTop().modlessId > -1) {
 var modlessObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modlessId); if (modlessObj)
 modlessObj.style.display = "none"; }
 },
 checkRemoveModeless: function(bOpenModeless) {
 if (bOpenModeless)
 this.closeModalDialog(MTop().modlessId); if (MTop().modlessId != -1) {
 var modelessObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modlessId); if (modelessObj && modelessObj.bRemove) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + MTop().modlessId); if (oframe) {
 oWin = oframe.contentWindow; if (oWin == MTop().oParentWin)
 MTop().oParentWin = null; }
 modelessObj.innerHTML = ""; this.cObj.removeChild(modelessObj); MTop().modlessId = -1; }
 }
 },
 closeModalMsg: function(obj, id) {
 var modObj = null; if (typeof id != "undefined")
 modObj = MTop().document.getElementById(MTop().PTMOD_ + id); else {
 try {
 modObj = getFirstModObj(); if (!modObj || !modObj.bMsg) { 
 modObj = obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; if (!modObj || !modObj.bMsg)
 modObj = obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; }
 }
 catch (e) { return; }
 }
 if (!modObj || !modObj.bMsg) return; this.maskHeader(MTop().modId - 1, modObj.oParentWin, modObj.sMaskStyle, modObj.bAutoClose, true); if (isFModeLayout()) unhidePtWrapper(); modObj.oParentWin.modWin = null; if (modObj.oParentWin.winParent) {
 this.AddHandler(modObj.oParentWin.modalID); if (isFModeLayout())
 ptCommonObj2.hidePopupMask(modObj.oParentWin); else
 ptCommonObj2.hideParModalMask(modObj.oParentWin); }
 else {
 if (this.isParentModeless(modObj.oParentWin))
 ptCommonObj2.hidePopupMask(modObj.oParentWin); else {
 if (!this.restoreModeless() || (!isFModeLayout() && modObj.bMsg))
 ptCommonObj2.hidePopupMask(MTop()); }
 }
 if (modObj.parentfocusElID != null && this.isParentLive(modObj.oParentWin) && typeof modObj.oParentWin.document != "undefined")
 ptCommonObj2.tryFocus0(modObj.oParentWin.document.getElementById(modObj.parentfocusElID)); else if (modObj.oParentWin){
 if (isFModeLayout() && typeof modObj.oParentWin.gFocusObj != "undefined" && typeof modObj.oParentWin.isFModeLayout != "undefined" && modObj.oParentWin.isFModeLayout() && !modObj.oParentWin.gFocusObj)
 DoTabbing(null, null, true, modObj.oParentWin); else
 ptCommonObj2.tryFocus0(modObj.oParentWin.gFocusObj); }

 modObj.innerHTML = ""; this.cObj.removeChild(modObj); if (typeof modObj.oParentWin.modalID != 'undefined' && modObj.oParentWin.modalID != null) {
 if (modObj.bMsg && !top.window.isFModeLayout() && window.isFModeLayout())
 { setLocalModal(false); }
 else {
 var pmodObj = MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID); MTop().oParentWin = pmodObj ? pmodObj.oParentWin : null; MTop().modId = modObj.oParentWin.modalID; }
 }
 else {
 var isAnyRCFModal = false; for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (typeof modObj != "undefined" && modObj && modObj.bRCFModal) {
 isAnyRCFModal = true; break; }
 }
 if(!isAnyRCFModal) {
 MTop().oParentWin = null; MTop().modId = -1; }
 }
 top.setAllMask(modObj, false); if (isFModeLayout() && isAccessibleLayout() && !this.isAnyMsg())
 resizeModalAll(); this.playMsg(); },
 getTypeAheadModalId: function () {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && modObj.bTypeAhead)
 return id; }
 return ""; },
 getGridSortModalId: function () {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && modObj.bGridSort)
 return id; }
 return ""; },
 doCloseModalDialogAll: function () {
 var bReturn = false; for (var id = MTop().modId; id > -1; id--) {
 if (this.doCloseModalDialog(id)); bReturn = true; }
 setFocusOnModalClose(); return bReturn;  }, 
 doCloseModalDivPopup: function (id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && modObj.bDivPopup) return this.closeModalDialog0(id); return; },
 doCloseModalDialog: function(id) {
 this.checkRemoveModeless(false);  var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) {
 if (this.idCount > 0) { 
 MTop().modId = this.idCount; closeModalAll(); }
 return true; }
 if (isFModeLayout() && isAccessibleLayout() || modObj.bViewAtt) unhidePtWrapper(); if (modObj.bDivPopup) { 
 if (bSessionStorage) { sessionStorage.setItem("divPopupClosed", "1"); }
 window.bDoModal = false; this.closeModalDialog0(id);  return true; }

 if (modObj.bMsg) { this.closeModalMsg(modObj, id); return true; }
 if (modObj.bPIA && (modObj.bModeless || modObj.bAutoCloseWarn)) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe) {
 oWin = oframe.contentWindow; var bChanged = checkFrameChanged(oWin); if (bChanged) {
 var saveCancelEvent = 'javascript:doCloseModal0(' + id + ')'; if (modObj.bGrouplet) saveCancelEvent = 'javascript:closeModal0(' + id + ')'; oWin.psConfirmSW("", saveCancelEvent, oWin); return false; }
 }
 }
 
 if (modObj.bGrouplet) 
 this.closeModalDialog0(id); else {
 if (typeof modObj.bRCFModal != 'undefined' && modObj.bRCFModal) {
 var oframe = MTop().document.getElementById(PTMODFRAME_ + id); if (oframe) {
 oWin = oframe.contentWindow; var bChanged = checkFrameChanged(oWin); if (bChanged != null) {
 if (bChanged) {
 var saveCancelEvent = 'javascript:doCloseModal0(' + id + ')'; if (modObj.bGrouplet) saveCancelEvent = 'javascript:closeModal0(' + id + ')'; oWin.psConfirmSW("", saveCancelEvent, oWin); return false; }
 }
 }
 }
 this.doCloseModalDialog0(id); }
 return true;  },
 doCloseModalDialog0: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return; if (typeof modObj.bRCFModal != 'undefined' && modObj.bRCFModal && isFModeLayout()) {
 this.processing(0,3000); }
 if (modObj.bPIA) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oWin = oParentWin; if (oframe) {
 try {
 oWin = oframe.contentWindow; oWin.doCancel(modObj.sCancelName); }
 catch(err) {
 MTop().modId = -1; MTop().hideModId = -1; ptCommonObj2.hidePopupMask(MTop()); modObj.style.display = "none"; }
 }
 else {
 if (this.getMsgCancelId(id, "#ICCancel"))
 oWin.doCancelMsg(); else
 this.closeModalMsg(null, id); }
 } else if (modObj.bClose || modObj.bModeless) return this.closeModalDialog(id); },
 getFirstParentWin: function() {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && !modObj.bModeless) {
 if (modObj.oParentWin.winParent == null) return modObj.oParentWin; }
 }
 },
 getFirstModObj: function() {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj) {
 if (modObj.oParentWin.winParent == null) return modObj; }
 }
 },
 closeHideModal: function() {
 if (typeof MTop().hideModId == 'undefined' || MTop().hideModId == -1) return false; this.closeModalDialog(MTop().hideModId); return true; },
 hideModalDialog: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return; MTop().hideModId = id; modObj.style.display = "none"; },
 closeModalAll: function() {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj) {
 modObj.innerHTML = ""; this.cObj.removeChild(modObj); try{
 if (typeof modObj.onclose != "undefined") {
 modObj.onclose(); }
 }catch(e){}
 }
 }
 if(this.cObj)
 this.cObj.style.display = "none"; MTop().oParentWin = null; MTop().modId = -1; MTop().hideModId = -1; ptCommonObj2.hidePopupMask(MTop()); },

 closeModalDialog: function(id) {
 if (typeof id == 'undefined') 
 {
 this.closeModalAll(); return; }

 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj)
 return;  var oWin = null; if (!modObj.bCrossDomain) 
 {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); oWin = oframe.contentWindow; } 
 
 if (modObj.bPIA && modObj.bModeless) 
 {
 var bChanged = checkFrameChanged(oWin); if (bChanged) 
 {
 var saveCancelEvent; if (oWin && oWin.isFModeLayout() && !window.isFModeLayout())
 saveCancelEvent = 'javascript:closeModal0(' + id + ',top)'; else
 saveCancelEvent = 'javascript:closeModal0(' + id + ')'; return oWin.psConfirmSW("", saveCancelEvent, oWin); }
 }
 this.closeModalDialog0(id); },

 closeModalDialog0: function(id) {
 if (isFModeLayout()) unhidePtWrapper(); this.checkRemoveModeless(false);  var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return; this.maskHeader(id - 1, modObj.oParentWin, modObj.sMaskStyle, modObj.bAutoClose, true); if (modObj.bDivPopup) {
 var oContent = MTop().document.getElementById("ptModContent_" + id); var mDivObj = oContent.firstChild;  if (!modObj.bSearchPage) addHide(mDivObj); var objP = null; if (modObj.sCacheParentId.length > 0) 
 objP = modObj.oParentWin.document.getElementById(modObj.sCacheParentId); else {
 objP = modObj.oParentWin.document.getElementById(modObj.sPopupParentId); if (objP)
 objP = objP.parentNode; }
 if (objP) {
 objP.appendChild(mDivObj); }
 if (!modObj.bCache)
 mDivObj.innerHTML = ""; }
 if (modObj.onclose && typeof modObj.onclose != "undefined") {
 eval(modObj.onclose); }

 if (typeof modObj.sGlyphId != "undefined" && typeof modObj.oParentWin.document != 'undefined') {
 if(modObj.oParentWin.document.getElementById("Glyph_"+modObj.sGlyphId) != null)
 modObj.oParentWin.document.getElementById("Glyph_"+modObj.sGlyphId).focus(); }

 var bModeless = modObj.bModeless;  if (modObj.bGrouplet || !modObj.bModeless && id != MTop().hideModId) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var pWin = null;  try
 {
 if (modObj.bDivPopup)
 pWin = modObj.oParentWin; else {
 var oWin = oframe.contentWindow; pWin = oWin.winParent; }
 }
 catch (e) 
 {
 pWin=null; }

 if (typeof pWin == 'undefined' || pWin == null)
 modObj.oParentWin.modWin = null;  if (pWin && pWin.winParent) {
 this.AddHandler(pWin.modalID); if (isFModeLayout())
 ptCommonObj2.hidePopupMask(pWin); else
 ptCommonObj2.hideParModalMask(pWin); }
 else {
 if (!this.restoreModeless()) 
 {
 var popMask = document.getElementById('pt_modalMask'); if (!isFModeLayout() || isFModeLayout() && !popMask.bTypeAhead)
 ptCommonObj2.hidePopupMask(MTop()); }
 if (modObj.bModeless && isFModeLayout())
 ptCommonObj2.hidePopupMask(top.window); }
 } else if (modObj.bModeless) {
 if (modObj.oParentWin 
 && modObj.oParentWin.modalID != 'undefined' && modObj.oParentWin.modalID != null 
 && MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID) != null) 
 ptCommonObj2.hidePopupMask(modObj.oParentWin);  else
 ptCommonObj2.hidePopupMask(top.window); }

 if (bModeless) {
 this.cObj.removeChild(modObj); if (!isFModeLayout()) {
 var theBody = MTop().document.getElementsByTagName("BODY")[0];  var isWorkCenter = MTop().document.getElementById('ptalPgltAreaFrame'); if (!isWorkCenter) {
 theBody.style.overflow = "auto"; theBody.style.zIndex = "1"; } 
 }
 } else {
 if (!modObj.bCrossDomain && typeof modObj.bRCFModal != 'undefined' && !modObj.bRCFModal && typeof oWin != 'undefined' && oWin != null && typeof oWin.modalID != 'undefined') {
 var tmpModalID = oWin.modalID; }
 modObj.innerHTML = ""; if (typeof this.cObj != 'undefined' && this.cObj)
 this.cObj.removeChild(modObj); if (pWin != null && modObj.bRCFModal && !isFModeLayout())
 pWin.modWin = null; if (typeof modObj.bRCFModal != 'undefined' && !modObj.bRCFModal && typeof oWin != 'undefined' && oWin != null && typeof oWin.modalID != 'undefined') {
 oWin.modalID = tmpModalID; }
 }
 if (id == MTop().hideModId || MTop().modIdLastFrame != -1) {
 
 
 try { 
 if (!bLocalModal && typeof modObj.oParentWin.winParent != 'undefined' && modObj.oParentWin.winParent != null) {
 var pmodObj = MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID); MTop().oParentWin = modObj.oParentWin; MTop().modId = modObj.oParentWin.modalID; }
 else {
 MTop().oParentWin = null; MTop().modId = -1; this.cObj.style.display = "none"; }
 } catch (ex) {
 MTop().oParentWin = null; MTop().modId = -1; this.cObj.style.display = "none"; }
 MTop().hideModId = -1; MTop().modIdLastFrame = -1; }
 else if (bModeless)
 {}
 else {
 if (!bLocalModal && typeof modObj.oParentWin.modalID != 'undefined' && modObj.oParentWin.modalID != null) {
 var pmodObj = MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID); MTop().oParentWin = pmodObj.oParentWin; MTop().modId = modObj.oParentWin.modalID; }
 else {
 MTop().oParentWin = null; MTop().modId = -1; if ((typeof window.modWin == 'undefined') && (typeof id == "undefined" || id == null))
 this.cObj.style.display = "none"; }
 }
 if (bModeless)
 {
 ptCommonObj2.tryFocus0(MTop().gFocusObj); }
 else if (modObj.bDivPopup) {
 if (modObj.bPopup)
 {
 gFocusObj = this.getParentPopup(modObj); if (gFocusObj)
 ptCommonObj2.tryFocus0(gFocusObj); }
 else if (pWin && pWin.gFocusObj)
 ptCommonObj2.tryFocus0(pWin.gFocusObj); else
 DoTabbing(null, null, true, modObj.oParentWin); }
 if(top && top.setAllMask)
 top.setAllMask(modObj, false); if (isFModeLayout() && isAccessibleLayout())
 resizeModalAll(); },

 
 processing: function(opt,waittime) {

 var sScript = "processing_empty"; if (eval ("typeof " + sScript + " !== 'function'")) {
 if (document.forms.length > 0)
 sScript = "processing_" + document.forms[0].name; var tcFrame = "window.frames['TargetContent']"; if (window.frames['TargetContent']) {
 if (window.frames['TargetContent'].document.forms.length > 0)
 sScript = tcFrame + ".processing_" + eval(tcFrame + ".document.forms[0].name");  } 
 }
 if (eval ("typeof " + sScript + " === 'function'")) 
 eval(sScript + "(" + opt + "," + waittime + ");"); },

 
 resizeModalAll: function () {
 this.checkRemoveModeless(false); if (isFModeLayout() && isAccessibleLayout())
 this.resizeModalDialog(MTop().modId); else {
 for (var id = MTop().modId; id > -1; id--) {
 this.resizeModalDialog(id); }
 }
 },

 resizeModalDialog: function(id, bCenter, w, h) {
 var bReload = false; if(typeof bCenter != "undefined" && typeof w != "undefined" && typeof h != "undefined")
 bReload = true;  if(MTop().bSetFocusComplete == false)
 {
 var thisObject = this; setTimeout(function() {
 thisObject.resizeModalDialog(id, bCenter, w, h)}, 0); return; }
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return; var bFluidModal = false; if (isFluidNavCollection())
 {
 if (typeof modObj.oParentWin.isFModeLayout != "undefined") 
 bFluidModal = modObj.oParentWin.isFModeLayout(); }
 else
 bFluidModal = isFModeLayout(); if (modObj.bTypeAhead)
 bCenter = false; if (modObj.width != -1 && modObj.height != -1) 
 {
 w = modObj.width; h = modObj.height; }

 var oheader = MTop().document.getElementById("ptModHeader_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var otb = MTop().document.getElementById("ptModTable_" + id); if (otb.style.width && otb.style.width.length > 0 || otb.style.height && otb.style.height.length > 0) 
 {
 otb.style.width = ''; otb.style.height = ''; }
 var obottom = MTop().document.getElementById("ptModBottom_" + id); var oresize = MTop().document.getElementById("ptModResize_" + id); var oContent = MTop().document.getElementById("ptModContent_" + id); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oMsg = MTop().document.getElementById("alertmsg"); var oBtn = MTop().document.getElementById("okbutton"); var oWin = null; var fullWidth = ptCommonObj2.getViewportWidth(); var fullHeight = ptCommonObj2.getViewportHeight(); var currDoc = null; var nMinScrollH = 0, nMinScrollW = 0; var bAdjustW = false, bAdjustH = false;   if (modObj.bPopup) 
 {
 var rObj = this.getParentPopup(modObj); if (!rObj && modObj.nRCFLeft == -1)
 {}
 else 
 {
 var nLeft = 0; var nTop = 0; var nBottom = 0; var nRight = 0; if (rObj)
 {
 var pos = rObj.getBoundingClientRect(); nLeft = pos.left; nTop = pos.top; nBottom = pos.bottom; nRight = pos.right; var left = nLeft - otb.clientWidth;  var right = fullWidth - (nRight + otb.clientWidth);  var bRight = (left < right || modObj.bCal && right>0) ? true : false; var bLeft = (left > right && !bRight) ? true : false; if (!modObj.bVertical && modObj.bDivPopup) 
 {
 if (bLeft) 
 {
 if (otb.clientWidth > nLeft)
 fullWidth = nLeft; } 
 else 
 {
 var widthOnRight = fullWidth - nRight; if (bRight && (otb.clientWidth > widthOnRight))
 fullWidth = widthOnRight; }
 }
 }
 else
 {
 nLeft = nRight = modObj.nRCFLeft; nTop = nBottom = modObj.nRCFTop; }
 }
 }
 if(typeof oBtn == "undefined" || oBtn == null)
 oBtn = MTop().document.getElementById("alertbutton");  if (oframe) {
 oWin = oframe.contentWindow; try {
 if (!modObj.bCrossDomain)
 currDoc = oWin.document; } catch (e) {
 oWin = null; currDoc = null; }
 }
 bCenter = (typeof bCenter == "undefined") ? true : bCenter;  if (bCenter && !modObj.bCustResize && !modObj.bFullScreen) 
 {
 w = (typeof w == "undefined") ? 0 : w; h = (typeof h == "undefined") ? 0 : h; if (!modObj.bMsg && oframe) {
 if ((bFluidModal && !modObj.bRCFModal)
 || (modObj.bRCFModal && w != 0 && h != 0)
 || (w != 0 || h != 0)) {
 oframe.style.width = w + 'px'; oframe.style.height = h + 'px'; }
 }
 if (modObj.bCrossDomain) {
 w = (w == -1) ? parseInt(fullWidth * 0.4, 10) : w; h = (h == -1) ? parseInt(fullHeight * 0.5, 10) : h; }
 if (browserInfoObj2.isiPad && browserInfoObj2.isSafari) {
 
 w = (w <= 0) ? parseInt(fullWidth * 0.8, 10) : w; h = (h <= 0) ? parseInt(fullHeight * 0.5, 10) : h; }
 var h_win = h; if (!bFluidModal && fullHeight > 160) fullHeight -= 50;  if ((modObj.width != -1 && modObj.height != -1) && modObj.bDivPopup)
 {}
 else if (modObj.bMsg || modObj.bDivPopup) 
 {
 w = otb.scrollWidth; h = otb.scrollHeight + otb.clientTop;  if (oheader && (!bFluidModal || !modObj.bMsg))
 h -= oheader.clientHeight; if (modObj.bDown || modObj.bUp)
 h -= 12; }
 else if (!modObj.bCrossDomain) 
 {
 try {
 if (!bFluidModal && detectDoctype(currDoc))
 w = oWin.document.documentElement.scrollWidth; else 
 {
 if (oWin.document.documentElement.scrollWidth > oWin.document.body.scrollWidth)
 w = oWin.document.documentElement.scrollWidth; else
 w = oWin.document.body.scrollWidth; var sa1 = currDoc.querySelector(".ps_apps_content, .ps_scroll-target"); var wsa1; if (sa1) 
 {
 wsa1 = sa1.scrollWidth + sa1.offsetLeft; var addadjust = currDoc.querySelectorAll(".psc_modal-addwidth, .psc_modal-addall"); if (addadjust && addadjust.length > 0 ) 
 {
 for (var xxi = 0; xxi < addadjust.length; xxi++)
 wsa1 += addadjust[xxi].clientWidth; }
 if (wsa1 > w) 
 {
 w = wsa1; bAdjustW = true; }
 }
 }
 } catch (e) {}

 try { 
 var aObj = oWin.document.getElementById("ACE_width"); } catch (e) {aObj = null;}

 var w2 = 0; if (aObj && typeof aObj.width !== "undefined" && aObj.width != "")
 w2 = new Number(aObj.width).valueOf();  try {
 if (detectDoctype(currDoc) || (!browserInfoObj2.isIE && !browserInfoObj2.isFF)) 
 {
 h = oWin.document.documentElement.scrollHeight; var sa2 = currDoc.querySelector(".ps_apps_content, .ps_scroll-target"); var hsa2;  if (sa2) 
 {
 hsa2 = sa2.scrollHeight + sa2.offsetTop + 5; if (!sa2.offsetTop) 
 {
 var oHead = currDoc.getElementById("PT_HEADER_MODAL"); if (oHead)
 hsa2 += oHead.clientHeight; }
 if (hsa2 > h) 
 {
 h = hsa2; bAdjustH = true; }
 }
 else 
 h++;  } 
 else
 h = oWin.document.body.scrollHeight; if (bFluidModal)
 {
 nMinScrollH = Math.min(fullHeight, h); nMinScrollW = Math.min(fullWidth, w); }

 if (w >= fullWidth || h >= fullHeight)
 {
 offw = w - oWin.document.body.clientWidth; offh = h - oWin.document.body.clientHeight;  var scrollDiv = oWin.document.createElement("div"); scrollDiv.style.width = "100px"; scrollDiv.style.height = "100px"; scrollDiv.style.overflow = "scroll"; scrollDiv.style.position = "absolute"; scrollDiv.style.top = "-9999px"; oWin.document.documentElement.appendChild(scrollDiv);  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;  oWin.document.documentElement.removeChild(scrollDiv); if (offw > 0 && offw != w) 
 h -= scrollbarWidth; if (offh > 0 && offh != h) 
 w += scrollbarWidth; }
 } catch(e) {
 
 if (browserInfoObj2.isiPad && browserInfoObj2.isSafari) 
 {
 h = h_win; }
 }
 
 var minW = 0;  var minH = 0;     try {
 var specModalPage = false; if (bFluidModal)
 specModalPage = oWin.document.documentElement.scrollHeight == 0 || oWin.document.documentElement.scrollHeight == 0; else 
 specModalPage = oWin.document.body.innerHTML.indexOf("javascript:DatePrompt_win") != -1
 || oWin.document.body.innerHTML.indexOf("a name=\"PROMPT_XLAT1\"") != -1
 || oWin.document.body.innerHTML.indexOf("page=\"(search)\"") != -1;  } catch (e) {}; if (!modObj.bMsg && !modObj.bCustResizeDone && specModalPage && (w < 500 || h < 350))
 {
 minW = 500; if (h < 350)
 minH = 350;  else 
 minH = h;  }
 
 if (MTop().RTEModal)
 {
 h += 135 * MTop().RTEInstances ; MTop().RTEModal = false; }
 if (oWin && oWin.modalZoomName != null) 
 {
 var zObj = oWin.document.getElementById(oWin.modalZoomName); if (zObj && zObj.innerHTML.indexOf("CKEDITOR") != -1) 
 {
 w += 48; h += 90; } 
 else if (zObj) 
 {
 var aObj; if (browserInfoObj2.isIE)
 aObj = zObj.firstChild; else
 aObj = zObj.firstElementChild; if (aObj && typeof aObj.width !== "undefined" && aObj.width != "")
 {
 w2 = new Number(aObj.width).valueOf(); if (browserInfoObj2.isiPad && browserInfoObj2.isSafari)
 w = w2; }
 }
 }
 if (w < minW) w = minW; if (h < minH) h = minH; }
 
 var maxW = fullWidth; var maxH = fullHeight; if (w > maxW) 
 {
 if (! (browserInfoObj2.isiPad && browserInfoObj2.isSafari && !browserInfoObj2.bypassIOSFrameWrknd))
 w = maxW; }
 if (h > maxH) 
 h = maxH; }
 var isStandards = detectDoctype(currDoc) ? true : false;  var mtopDoc = isStandards ? MTop().document.documentElement : MTop().document.body;  if (!modObj.bCustMove && !modObj.bFullScreen && !bFluidModal && !modObj.bPopup)
 {
 if (h == maxH )
 h = maxH - 50; if (w == maxW)
 w = maxW - 80; }
 
 if (oheader) 
 {
 if (bFluidModal)
 removeHide(oheader); else
 oheader.style.display = 'block'; }
 if (modObj.bBackCancel)
 this.setModalDialogBack(id, "", modObj.sBackTitle, modObj.bBackCancel); this.setModalDialogTitle(id); if (!modObj.bCustResize) 
 {
 try {
 var heightFlag = browserInfoObj2.isIE ? oWin.document.body.clientHeight <= oWin.document.body.scrollHeight : oWin.document.body.clientHeight < oWin.document.body.scrollHeight; if (!modObj.bCrossDomain && !modObj.bMsg && oWin.modalZoomName == null && heightFlag)
 {
 w += 18; if (!modObj.bStartup) 
 {
 var addadjust = currDoc.querySelectorAll(".psc_modal-addheight, .psc_modal-addall"); var hsa = h; if (addadjust && addadjust.length > 0)
 {
 for (var xxi = 0; xxi < addadjust.length; xxi++)
 hsa += addadjust[xxi].clientHeight + addadjust[xxi].offsetTop; }
 if (hsa <= maxH)
 h = hsa; }
 }
 } catch (e) {}

 var bAdjustToFullScreen = false; if (w >= maxW && h >= maxH)
 bAdjustToFullScreen = true; oContent.removeAttribute("style");   if (modObj.bFullScreen || bAdjustToFullScreen)
 {
 if (modObj.bViewAtt) 
 hidePtWrapper(); otb.style.left = 0; otb.style.top = 0; w = ptCommonObj2.getViewportWidth();  h = ptCommonObj2.getViewportHeight();  if (!oframe || !bFluidModal) 
 {
 otb.style.width = w + 'px'; otb.style.height = h + 'px'; }
 if (oheader) 
 
 h -= oheader.clientHeight; if (!modObj.bMsg && oframe) 
 { 
 oframe.style.width = w + 'px'; oframe.style.height = h + 'px'; }
 oContent.style.width = w + 'px'; oContent.style.height = h + 'px'; } 
 else 
 { 
 if (!bFluidModal) 
 w = w + 14;  var h2 = h; if (oheader) 
 {
 if (bFluidModal && maxH <= (h + oheader.clientHeight)) 
 {
 
 if (h == maxH)
 h -= oheader.clientHeight; }
 h2 += oheader.clientHeight; }

 if (!modObj.bPopup)
 {
 if (bFluidModal)
 {
 if (h > maxH)
 h = Math.max(maxH - 10, nMinScrollH - 5); if (w > maxW)
 w = Math.max(maxW - 5, nMinScrollW - 5); }
 var scrollTopBody = MTop().document.body.scrollTop; if ((browserInfoObj2.isiPad && browserInfoObj2.isSafari))
 {
 if (scrollTopBody < 0)
 scrollTopBody = 0; }
 var mtopDocScrollTop = MTop().document.documentElement.scrollTop || scrollTopBody; if (bFluidModal && (isAccessibleLayout() || isTouchKeyboard()))
 {
 if (isTouchKeyboard())
 MTop().document.body.scrollTop = 0; mtopDocScrollTop = 0; }
 if (h != maxH && fullHeight > h2)
 otb.style.top = (fullHeight - h2) / 2 + mtopDocScrollTop + 'px'; else if (bFluidModal)
 otb.style.top = 0 + 'px'; else 
 otb.style.top = 25 + mtopDocScrollTop + 'px'; if (w != maxW)
 {
 if ("ltr" === "rtl" && browserInfoObj2.isIE &&
 (document.compatMode != "CSS1Compat" || (document.documentMode && document.documentMode == 7)))
 {
 var sLeft = parseInt((document.body.scrollWidth - document.body.clientWidth - document.body.scrollLeft), 10); otb.style.left = (fullWidth - w) / 2 + sLeft + "px"; }
 else
 {
 if (bFluidModal)
 {
 
 var nLeft = (fullWidth - w) / 2 + mtopDoc.scrollLeft; if (nLeft < 0)
 nLeft = 0; otb.style.left = nLeft + 'px'; }
 else
 {
 var tleft = (fullWidth - w) / 2 + mtopDoc.scrollLeft; if (tleft < 0)
 tleft = 3; otb.style.left = tleft + 'px'; }
 }
 }
 else
 {
 otb.style.left = 40 + mtopDoc.scrollLeft + 'px'; w = maxW - 80; }
 }

 if (!bFluidModal && oresize) 
 h2 += oresize.clientHeight; if (!oframe || !bFluidModal)
 {
 if (modObj.bRCFModal && !bReload)
 {}
 else
 otb.style.width = (w + 2) + 'px'; }
 if (obottom)
 obottom.style.width = oContent.style.width;   if (modObj.bMsg && !bFluidModal)
 {}
 else if (!oframe || !bFluidModal) 
 otb.style.height = h2 + 'px'; if (isFModeLayout() && modObj.bVertical) 
 otb.style.height = h2 + 'px';  if (!modObj.bMsg) 
 {
 if (oframe) 
 {
 if (bFluidModal && isIOS() && !bypassIOSFrameWrknd() && bAdjustW)
 oframe.style.setProperty("width", w + 'px', "important"); else
 oframe.style.width = w + 'px'; if (bFluidModal && isIOS() && !bypassIOSFrameWrknd() && bAdjustH)
 oframe.style.setProperty("height", h + 'px', "important"); else
 oframe.style.height = h + 'px'; }
 if (!modObj.bCrossDomain) 
 {
 h_win = h - ptCommonObj2.getHeight(oTitle); try {
 oWin.document.body.scrollTop = 0; oWin.document.body.scrollLeft = 0; } catch (e) {}
 }
 }
 }
 }
 
 this.positionPopup(modObj, otb, id);  if (modObj.bMask && modObj.width == -1)
 {
 if (!modObj.bModeless || bFluidModal)
 this.showMask(modObj, id);  else if (!bFluidModal)
 {
 if (!modObj.bPopup)
 this.AddHandler(id);  }
 }

 if (bFluidModal) 
 {
 if (modObj.bAutoClose && modObj.bFullScreen && oheader)
 oheader.addEventListener("click", autoClose, false); }
 
 modObj.oParentWin.bProcess = false; this.setModalDialogTitle(id);  if (isFModeLayout() && oframe && isIOS() && !browserInfoObj2.bypassIOSFrameWrknd) 
 {
 if (oWin.document.documentElement.scrollHeight > h)
 h = oWin.document.documentElement.scrollHeight; if (oWin.document.documentElement.scrollWidth > w)
 w = oWin.document.documentElement.scrollWidth; oContent.style.width = w + 'px'; oContent.style.height = h + 'px'; }
 modObj.style.visibility = ""; if (!bFluidModal && modObj.bModeless) 
 this.processing(0,3000); if (modObj.bMsg && !bFluidModal) 
 this.setMsgFocus(id); if (bFluidModal && isAccessibleLayout()) 
 hidePtWrapper();   var otb = MTop().document.getElementById("ptModTable_" + id);  if (modObj.nRight > 0)
 otb.style.right = modObj.nRight + 'px';  if (bFluidModal) 
 {
 if (modObj.bMsg || modObj.bDivPopup && !modObj.bPopup)
 this.setFocusFMode(id); else if (modObj.bPopupMenu) 
 this.setPopupMenuFocus(id); else if (modObj.bPopup && !modObj.bTypeAhead && !modObj.bRCFModal) 
 this.setPopupFocus(id); else if (modObj.bSkipFocus && (modObj.bClose || modObj.bModeless))
 {
 var modCloseLnk = document.getElementById('ptModCloseLnk_' + id); if (modCloseLnk)
 ptCommonObj2.tryFocus0(modCloseLnk); oWin.bSkipFocus = true; }
 }

 modObj.bCustResizeDone = false;  if ((modObj.bModeless || modObj.bRCFModal) && bFluidModal)
 {
 
 var topModalFrame = MTop().document.getElementById(MTop().PTMODFRAME_ + MTop().modIdLastFrame); if (topModalFrame)
 {
 var obj = topModalFrame.contentDocument.getElementById("WAIT_" + top.window.document.forms[0].name); if (obj)
 {
 obj.style.display = "none"; disableInteractionDuringProcessing(obj, false); }
 obj = topModalFrame.contentDocument.getElementById("SAVED_" + top.window.document.forms[0].name); if (obj) 
 obj.style.display = "none"; }
 else
 eval("processing_" + top.window.document.forms[0].name + "(0,3000);"); }

 modObj.bStartup = false; return true;  },

 setAllMask: function (modObj, bAdd)
 {
 if (!bAdd)
 modObj = top.document.getElementById(top.PTMOD_ + top.modId);  var bAutoClose = false; if (modObj)
 bAutoClose = modObj.bAutoClose; for (var id = MTop().modId; id > -1; id--) {
 var modObjThis = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObjThis) continue; var oModParent = modObjThis.oParentWin; if (typeof oModParent == 'undefined' || !oModParent || 
 typeof oModParent.document =='undefined' || !oModParent.document) continue; var popMask = oModParent.document.getElementById('pt_modalMask'); if (!popMask) continue; if (bAutoClose)
 popMask.addEventListener("click", autoClose, false); else
 popMask.removeEventListener("click", autoClose, false); }
 },

 getParentPopup: function(modObj)
 {
 var rObj = null; if (!modObj.bPopup) return rObj; if (modObj.sPopupParentId.length > 0)
 {
 rObj = modObj.oParentWin.document.getElementById(modObj.sPopupParentId); if (!rObj)
 {
 try{
 var Doc=(modObj.ownerDocument.contentWindow) ? modObj.ownerDocument.contentWindow.document : modObj.ownerDocument.activeElement.contentDocument; rObj = Doc.getElementById(modObj.sPopupParentId); }
 catch (err) 
 {
 return null; }
 }
 }
 else if (modObj.sPopupParentQS.length > 0)
 rObj = document.querySelector(modObj.sPopupParentQS); return rObj; }, 

positionPopup: function (modObj, otb, id) {
 if (!isFModeLayout() || !modObj.bPopup || modObj.bFullScreen || modObj.bCenter) return;  var oBody = document.getElementsByTagName("BODY")[0]; oBody.style.overflow = "hidden";  oBody = document.documentElement; var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe) {
 otb.style.width = oframe.clientWidth + "px"; otb.style.heigth = oframe.clientHeight + "px"; }
 
 otb.style.top = ''; otb.style.bottom = ''; otb.style.left = ''; otb.style.right = ''; var fullWidth = ptCommonObj2.getViewportWidth() - 20; var fullHeight = ptCommonObj2.getViewportHeight() - 20; var rObj = this.getParentPopup(modObj); if (!rObj && modObj.nRCFLeft == -1) return;  if (otb.clientWidth > fullWidth) {
 otb.style.width = fullWidth - 5 + 'px'; if (oframe) 
 oframe.style.width = fullWidth - 5 + 'px'; }
 modObj.nRight = 0; var bResize = !modObj.bTypeAhead &&(otb.style.maxWidth != ''); var eArrowLeft = null; var eArrowRight = null; if (modObj.bTail) {
 eArrowLeft = otb.querySelector("#ptArrow1_" + id); eArrowRight = otb.querySelector("#ptArrow2_" + id); }

 var nTMTop = (modObj.bTail) ? modObj.nTailMTop : 0; var nTW = (modObj.bTail) ? modObj.nTailW : 0; var nTH = (modObj.bTail) ? modObj.nTailH : 0; var nBW = modObj.nPopupBW; var nParentLeft = 0; var nParentTop = 0; var nParentBottom = 0; var nParentRight = 0; if (rObj)
 {
 var pos = rObj.getBoundingClientRect(); nParentLeft = pos.left; nParentTop = pos.top; nParentBottom = pos.bottom; nParentRight = pos.right; }
 else if (modObj.nRCFLeft != -1)
 {
 nParentRight = nParentLeft = modObj.nRCFLeft; nParentBottom = nParentTop = modObj.nRCFTop; }
 else
 return;  if(isFModeLayout() && isAccessibleLayout() && typeof modObj != 'undefined' && modObj && modObj.bRCFModal) 
 {
 if(typeof modObj.nRCFParentLeft == 'undefined' && typeof modObj.nRCFParentRight == 'undefined' && typeof modObj.nRCFParentTop == 'undefined'
 && typeof modObj.nRCFParentBottom == 'undefined' && nParentLeft != 0 && nParentTop != 0 && nParentBottom != 0 && nParentRight != 0)
 {
 modObj.nRCFParentLeft = nParentLeft; modObj.nRCFParentRight = nParentRight; modObj.nRCFParentTop = nParentTop; modObj.nRCFParentBottom = nParentBottom; }
 else if(typeof modObj.nRCFParentLeft != 'undefined' && typeof modObj.nRCFParentRight != 'undefined' 
 && typeof modObj.nRCFParentTop != 'undefined' && typeof modObj.nRCFParentBottom != 'undefined')
 {
 nParentLeft = modObj.nRCFParentLeft; nParentRight = modObj.nRCFParentRight; nParentTop = modObj.nRCFParentTop; nParentBottom = modObj.nRCFParentBottom; }
 }
 var nRW = nParentRight - nParentLeft; var nLeft = nParentLeft - otb.clientWidth; var nRight = fullWidth - (nParentRight + otb.clientWidth); var nTop = nParentBottom - otb.clientHeight; var nBottom = fullHeight - (nParentBottom + otb.clientHeight)+20; var bRight = (nRight > 0 && nLeft < nRight || modObj.bCal && nRight>0) ? true : false; var bLeft = (nLeft > 0 && nLeft > nRight && !bRight) ? true : false;  var bUp = (nTop > 0 && nTop > nBottom) ? true : false; var bDown = (nBottom > 0 && nTop <= nBottom) ? true : false; if (!bUp && !bDown && nTop < 0 && nBottom < 0) {
 if (nTop <= nBottom)
 bDown = true; else
 bUp = true; }
 var nLeftSp = nParentLeft; var nRightSp = fullWidth - nParentRight; if (fullWidth < 360 && nRightSp < 200 && nLeftSp < 200) {
 bLeft = false; bRight = false; }
 if (modObj.bRCFModal) {
 if (!bLeft && !bRight && fullWidth > 360) {
 bUp, bDown = false;  if (nLeft > nRight) {
 bLeft = true; var nLeftWidth = otb.clientWidth - nLeft; otb.style.width = nLeftWidth; } else {
 bRight = true; var nRightWidth = otb.clientWidth - nRight; otb.style.width = nRightWidth; }
 }
 if (bResize) {
 bLeft = modObj.bLeft; bRight = modObj.bRight; bUp = modObj.bUp; bDown = modObj.bDown; }
 }
 if (!modObj.bCustPos) {
 if (bLeft || bRight) {
 modObj.bVertical = false; bDown = false; bUp = false; }
 else if (bUp || bDown)
 modObj.bVertical = true; else {
 modObj.bVertical = true; if (nBottom > nTop || nTop < 0 && modObj.bCal)
 bDown = true; else
 bUp = true; }
 modObj.bLeft = bLeft; modObj.bRight = bRight; modObj.bUp = bUp; modObj.bDown = bDown; }

 if (modObj.bTail) {
 removeClass(otb.firstElementChild, "ps_popup-vertical"); removeClass(otb.firstElementChild, "ps_popup-horizontal"); removeClass(eArrowLeft, "ps_arrow_top"); removeClass(eArrowRight, "ps_arrow_bottom"); removeClass(eArrowLeft, "ps_arrow_right"); removeClass(eArrowRight, "ps_arrow_left"); removeClass(eArrowLeft, "ps_arrow_left"); removeClass(eArrowRight, "ps_arrow_right"); if (modObj.bVertical) {
 addClass(otb.firstElementChild, "ps_popup-vertical"); addClass(eArrowLeft, "ps_arrow_top"); addClass(eArrowRight, "ps_arrow_bottom"); }
 else {
 addClass(otb.firstElementChild, "ps_popup-horizontal");  if (isRTL()) {
 addClass(eArrowLeft, "ps_arrow_right"); addClass(eArrowRight, "ps_arrow_left"); }
 else {
 addClass(eArrowLeft, "ps_arrow_left"); addClass(eArrowRight, "ps_arrow_right"); }
 }
 }
 if (!modObj.bVertical) {
 var nW1 = fullWidth - (nParentRight + otb.clientWidth); var nW2 =nParentLeft - otb.clientWidth; var nH1 = fullHeight - (nParentTop + otb.clientHeight); var nH2 = nParentBottom - otb.clientHeight; if (bRight) {
 if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easel'); if (modObj.bTail) {
 otb.style.left = nParentRight + nTW/2 + 'px'; eArrowLeft.style.display = "block"; eArrowRight.style.display = "none"; }
 else
 otb.style.left = nParentRight + (window.pageXOffset || oBody.scrollLeft) + 'px';  }
 else {
 if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easer'); var nRight = fullWidth - nParentLeft; if (modObj.bTail) {
 eArrowRight.style.marginRight = -(nTW + nBW)+'px'; eArrowRight.style.display = "block"; otb.style.right = nRight + 2*nTW +'px'; eArrowLeft.style.display = "none"; }
 else
 otb.style.right = nRight - (window.pageXOffset || oBody.scrollLeft) + 'px';  }
 var nTop = nParentBottom - otb.clientHeight; if (nTop < 0) nTop = 0; if (modObj.bTail) {
 var nTop = nParentTop + (nParentBottom - nParentTop) * 2 - otb.clientHeight; if (nTop < 0) nTop = 0; otb.style.top = nTop + 'px'; var nMTop = nParentTop - nTop + (nParentBottom - nParentTop) / 2; if (modObj.nRCFLeft != -1)
 nMTop -= 16; if (bRight) {
 if (nMTop < 5) nMTop = 5; eArrowLeft.style.top = nMTop + 'px'; }
 else {
 if ((nMTop - nTW) < 5)
 eArrowRight.style.top = '5px'; else
 eArrowRight.style.top = nMTop - nTW + 'px'; }
 } else
 otb.style.top = nTop + 'px'; if (modObj.bSidePage)
 modObj.nRight = nParentRight - nParentLeft; var nMaxLeft = nParentLeft - 10; var nMaxRight = fullWidth - nParentRight - 10;  if (modObj.bTail) {
 nMaxLeft -= 12; nMaxRight -= 12; }
 if (modObj.bRCFModal) {
 if (bRight)
 otb.style.maxWidth = nMaxRight+"px"; else
 otb.style.maxWidth = nMaxLeft+"px"; }
 return; }
 if (modObj.bVertical && !bResize) {
 if (!modObj.bTypeAhead) nTop = nParentTop - otb.clientHeight; var nPosCenter = nParentLeft + (nParentRight - nParentLeft) / 2; var nLeft = nPosCenter - otb.clientWidth / 2; if (modObj.nAlign == 1)
 nLeft = nParentLeft; if (nLeft < 0) nLeft = nParentRight - otb.clientWidth; if ((nLeft + otb.clientWidth) > fullWidth) nLeft = fullWidth - otb.clientWidth -4; if (nLeft < 10) nLeft = 10; var nRight = fullWidth - (nLeft + otb.clientWidth); otb.style.left = nLeft + (window.pageXOffset || oBody.scrollLeft)+'px';  if (!modObj.bTypeAhead) otb.style.right = nRight - (window.pageXOffset || oBody.scrollLeft) + 'px';  if (modObj.bTypeAhead || oframe) {
 var nClientHeight = otb.clientHeight; if (oframe)
 nClientHeight = oframe.clientHeight; var nMaxDown = Math.min((fullHeight - nParentBottom), nClientHeight); var nMaxTop = Math.min(nParentTop, nClientHeight); if (nMaxDown >= nMaxTop) {
 bDown = true; otb.style.height = nMaxDown + 'px'; if (oframe)
 oframe.style.height = nMaxDown + 'px'; } else {
 bDown = false; otb.style.height = nMaxTop + 'px'; if (oframe)
 oframe.style.height = nMaxTop + 'px'; }
 } 
 if (fullWidth < 360 && isFModeLayout() && isIOS() && modObj.bCal && !browserInfoObj2.bypassIOSFrameWrknd) bDown = true;  if (bDown) {
 if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easet'); if (modObj.bTail) {
 var nTRight = nLeft + otb.clientWidth - nParentRight + (nParentRight - nParentLeft) / 2 - 2; if (nTRight < 0) nTRight = 5; eArrowLeft.style.right = nTRight + 'px'; eArrowLeft.style.display = "block";  nTop = nParentBottom + (nTH - nBW) / 2; otb.style.top = nTop + 'px'; if (fullHeight - nTop < otb.clientHeight) {
 otb.style.height = fullHeight - nTop + 'px'; if (oframe)
 oframe.style.height = fullHeight - nTop + 'px'; }
 eArrowRight.style.display = "none"; }
 else {
 nTop = nParentBottom; if (modObj.bTypeAhead && isTouchKeyboard())
 nTop = nParentBottom + oBody.scrollTop; if ((nParentBottom + otb.clientHeight) > fullHeight) {
 nTop = nParentBottom - ((nParentBottom + otb.clientHeight) - fullHeight); if (modObj.bTypeAhead && isTouchKeyboard())
 nTop += oBody.scrollTop; }
 if (nTop < 0) nTop = 0; otb.style.top = nTop + 'px'; if (fullHeight - nTop < otb.clientHeight) {
 otb.style.height = fullHeight - nTop + 'px'; if (oframe)
 oframe.style.height = fullHeight - nTop + 'px'; }
 }
 }
 else
 {
 var nBottom = fullHeight-nParentTop; if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easeb'); if (modObj.bTail) {
 nBottom += (nTH + nBW); eArrowRight.style.left = nParentLeft - nLeft + (nParentRight - nParentLeft)/2 + 'px'; eArrowRight.style.marginTop = '1px'; eArrowRight.style.display = "block"; eArrowLeft.style.display = "none"; if (nTop < 0 || oframe && otb.clientHeight > (fullHeight - nBottom)) {
 nHeight = Math.min(fullHeight, otb.clientHeight, nParentTop); otb.style.height = (nHeight - (nTH + nBW)) + 'px'; if (oframe)
 oframe.style.height = (nHeight - (nTH + nBW)) + 'px'; }
 otb.style.bottom = nBottom + 'px'; }
 else {
 var nHeight = otb.clientHeight + nTop; if (modObj.bTypeAhead) {
 nTop = nTop - (nParentBottom - nParentTop); if (isTouchKeyboard())
 nTop += oBody.scrollTop; otb.style.top = nTop + 'px'; } else if (nTop < 0) {
 nTop = 0; otb.style.height = nHeight + 'px'; if (oframe)
 oframe.style.height = nHeight + 'px'; }
 if (modObj.bCal)
 otb.style.top = nTop + 'px'; else
 otb.style.bottom = nBottom + 'px'; }
 } 

 if (!modObj.bTypeAhead) {
 var owrap = otb.querySelector(".ps_mod_wrapc"); if (!oframe)
 owrap.style.height = otb.clientHeight + "px"; }
 if (modObj.bRCFModal)
 otb.style.maxWidth = fullWidth - 10 +"px";  }
 oBody.style.overflow = "";},

maskHeader: function (id0, oParentWin, sMaskStyle, bAutoClose, bClose) {
 if (!oParentWin || id0 < 0) return; if (typeof bClose == "undefined")
 bClose = false; if (typeof bAutoClose == "undefined")
 bAutoClose = false; var modObj = null; var oheader = null; var oClose = null; var oframe = null; var idThis = -1; for (var id = id0; id > -1 && idThis == -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) continue; oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe && oParentWin == oframe.contentWindow) {
 oheader = MTop().document.getElementById("ptModHeader_" + id); oClose = MTop().document.getElementById("ptModCloseLnk_" + id); idThis = id; }
 }

 if (!oheader || idThis == -1) return; var pWin = modObj.oParentWin; if (!pWin) return; var oMask = null; try
 {
 oMask = pWin.document.getElementById("pt_modalMask"); }
 catch (e)
 {
 if (isFModeLayout())
 oMask = oParentWin.document.getElementById("pt_modalMask"); }
 if (!oMask) return; if (bClose) {
 removeClass(oheader, sMaskStyle+"-header"); removeClass(oheader, "psc_header-mask"); oheader.removeEventListener("click", autoClose, false); oheader.removeEventListener("click", autoClose0, false); }
 else {
 addClass(oheader, sMaskStyle + "-header"); addClass(oheader, "psc_header-mask"); if (bAutoClose)
 oheader.addEventListener("click", autoClose, false); else
 oheader.addEventListener("click", autoClose0, false); }
 },

showMask: function(modObj, id) {
 var oWin = null; var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe)
 oWin = oframe.contentWindow; if (!modObj.bPopup)
 this.AddHandler(id); var oModParent = null; var oParentWin = modObj.oParentWin; if (modObj.bCrossDomain) {
 if (!modObj.bModeless)
 oModParent = MTop(); }
 else {
 oParentWin = modObj.oParentWin; var bPModeless = this.isParentModeless(oParentWin); if (!oParentWin.winParent && !modObj.bModeless && !bPModeless) {
 this.hideModeless(); }
 if (typeof oParentWin.ptConsole2 !== "undefined" && oParentWin.ptConsole2 && !oParentWin.ptConsole2.isActive() && !modObj.bModeless) {
 if (oParentWin.winParent) {
 this.RemoveHandler(oParentWin.modalID); oModParent = oParentWin; }
 else {
 if (bPModeless)
 oModParent = oParentWin; else{
 oModParent = MTop(); }
 }
 }
 }
 if (!oModParent) { 
 if (modObj.bModeless)
 {
 if (!modObj.bRCFModal
 || typeof modObj.oParentWin.modalID == 'undefined' || modObj.oParentWin.modalID == null 
 || MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID) == null) 
 oModParent = MTop().window; else 
 oModParent = modObj.oParentWin; }
 else
 oModParent = modObj.oParentWin; }
 if (isFModeLayout()) 
 ptCommonObj2.showPopupMask(oModParent, 'pt_modalMask', modObj.bModeless, modObj.sMaskStyle); else {
 if (oParentWin.winParent)
 ptCommonObj2.setParModMask(MTop(), oModParent.modalID); else if (oModParent)
 ptCommonObj2.showPopupMask(oModParent); else
 ptCommonObj2.showPopupMask(MTop()); }
 },

getModalDialogTitle: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj.sTitle.length > 0)
 return modObj.sTitle; else {
 try {
 var oTitleText = null; if (modObj.bMsg)
 oTitleText = MTop().document.getElementById("msgTitle"); else
 oTitleText = oframe.contentWindow.document.getElementsByTagName("title")[0]; if (typeof oTitleText != 'undefined' && oTitleText){
 var sTitle = ""; if (modObj.bMsg)
 sTitle = oTitleText.innerHTML; else {
 var oObj = document.createElement("div"); oObj.innerHTML = (typeof oTitleText.text != "undefined") ? oTitleText.text : oTitleText.innerHTML; var sTitle = ""; if (browserInfoObj2.isIE)
 sTitle = oObj.outerText; else
 sTitle = oObj.textContent; }
 return sTitle; }
 } catch (e) {
 return ""; }
 }
 },

setModalDialogBack: function (id, sBackIdQS, sBackTitle, bBackCancel) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oheader = MTop().document.getElementById("ptModHeader_" + id); if (typeof bBackCancel != "undefined" && bBackCancel) {
 modObj.sBackIdQS = sBackIdQS; modObj.sBackTitle = sBackTitle; modObj.sBackTitle = bBackCancel; oheader.children[0].innerHTML = "<span class='ps-button-wrapper' title='" + modObj.sBackTitle + "'><a class='ps-button' role='button' onclick=\"javascript:closeLastModal();\">" + modObj.sBackTitle + "</a></span>"
 }
 else if (typeof sBackIdQS == "undefined")
 oheader.children[0].innerHTML = ""; else {
 modObj.sBackIdQS = sBackIdQS; modObj.sBackTitle = sBackTitle; oheader.children[0].innerHTML = "<span class='ps-button-wrapper' title='" + modObj.sBackTitle + "'><a  class='ps-button' role='button' href=\"javascript:backMenu('" + sBackIdQS + "')\" onclick=\"javascript:backMenu('" + sBackIdQS + "')\"><img src='" + modalBackUrl + "' alt='" + modalBackAlt + "'></a></span>"
 }
 },

setModalDialogTitle: function(id, sTitle) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oTitleBar = MTop().document.getElementById("ptModTitleBar_" + id); if (!oTitleBar) return; var oContent = MTop().document.getElementById("ptModContent_" + id); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var oTitleText = null; if (typeof sTitle != "undefined" && sTitle.length > 0){
 modObj.sTitle = sTitle; if(isAccessibleLayout() && sTitle.indexOf("folder")>-1){
 var slen = sTitle.length; oTitle.innerHTML = sTitle.substring(0,slen-7); }
 else
 oTitle.innerHTML = sTitle; }
 else if (modObj.sTitle.length > 0)
 oTitle.innerHTML = modObj.sTitle; else if (modObj.bCrossDomain)
 oTitle.innerHTML = "&nbsp;"; else {
 try {
 var oTitleText = null; if (modObj.bMsg){
 oTitleText = MTop().document.getElementById("msgTitle"); if(oTitleText != null)
 oTitleText.parentNode.removeChild(oTitleText); }
 else
 oTitleText = oframe.contentWindow.document.getElementsByTagName("title")[0]; if (typeof oTitleText != 'undefined' && oTitleText){
 var sTitle = ""; if (modObj.bMsg)
 sTitle = oTitleText.innerHTML; else {
 var oObj = document.createElement("div"); oObj.innerHTML = (typeof oTitleText.text != "undefined" && oTitleText.text.length > 0) ? oTitleText.text : oTitleText.innerHTML; var sTitle = ""; if (browserInfoObj2.isIE)
 sTitle = oObj.outerText; else
 sTitle = oObj.textContent; }
 oTitle.innerHTML = sTitle; }
 } catch (e) {
 oTitle.innerHTML = ""; }

 }
 if(!isFModeLayout() && typeof modObj != 'undefined' && modObj && modObj.bRCFModal && 
 typeof oframe != 'undefined' && oframe && typeof oTitle != 'undefined' && oTitle) 
 oframe.title=oTitle.innerHTML; var octl = MTop().document.getElementById("ptModControl_" + id); if (octl) octl.style.cssFloat = 'right'; var newWidth = (oContent.clientWidth - 21);  if (browserInfoObj2.isIE) 
 newWidth = newWidth - 3; if (newWidth > 0 && !isFModeLayout())
 oTitleBar.style.width = newWidth + 'px';  },

 showModelessDialog: function(url, obj, option) {
 },

 setEvent: function(obj) {
 ptEvent.add(obj, "mouseup", getPTDialog().onmouseup); ptEvent.add(obj, "mousemove", getPTDialog().onmousemove); ptEvent.add(obj, "dragstart", getPTDialog().cancelEvent); ptEvent.add(obj, "selectstart", getPTDialog().cancelEvent); },

 removeEvent: function(obj) {
 ptEvent.remove(obj, "mouseup", getPTDialog().onmouseup); ptEvent.remove(obj, "mousemove", getPTDialog().onmousemove); ptEvent.remove(obj, "dragstart", getPTDialog().cancelEvent); ptEvent.remove(obj, "selectstart", getPTDialog().cancelEvent); },

 cancelEvent: function(e) {
 return false; },

 onmouseup: function() {
 var id = getPTDialog().moveId; var shadowObj = MTop().document.getElementById("ptModalShadow"); if (!shadowObj.bMousedown) return; shadowObj.bMousedown = false; var XYposition = ptCommonObj2.getPosition(shadowObj); var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oHeader = MTop().document.getElementById("ptModHeader_" + id); var otb = MTop().document.getElementById("ptModTable_" + id); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oWin = null; if (oframe)
 oWin = oframe.contentWindow; if (shadowObj.bMove) {
 otb.style.left = XYposition.x + 'px'; otb.style.top = XYposition.y + 'px'; shadowObj.bMove = false; modObj.bCustMove = true; } 
 else if (shadowObj.bResize && modObj.bCustResizeDone) {
 
 var vpX = ptUtil.winSize().width;  var tgtCntY = 0; var oIfrmTgtCnt = MTop().document.getElementById('ptifrmtgtframe'); if (oIfrmTgtCnt) { 
 tgtCntY = parseInt(oIfrmTgtCnt.style.height , 10);  }
 
 var bannerHt = 0; var oBanner = top.document.querySelector("#pthdr2container"); if (oBanner)
 bannerHt = oBanner.clientHeight; var maxPopupHt = tgtCntY + bannerHt - 16;   var shadowObjX = ptCommonObj2.getWidth(shadowObj); var shadowObjY = ptCommonObj2.getHeight(shadowObj);   var newX = shadowObjX + otb.offsetLeft; var newY = shadowObjY + otb.offsetTop;   if (((newX <= vpX) && (newY <= maxPopupHt)) || tgtCntY == 0) {
 getPTDialog().resizeModalDialog(id, false, shadowObjX, shadowObjY); shadowObj.bResize = false; } 
 
 
 if (!modObj.bCrossDomain && oWin && oWin.modalZoomName != null) {
 var zObj = oWin.document.getElementById(oWin.modalZoomName); if (zObj && zObj.innerHTML.indexOf("CKEDITOR") == -1) {
 oWin.resizeZoomGrid(oWin.modalZoomName, shadowObjX, shadowObjY); shadowObj.bResize = false; }
 } 
 }
 shadowObj.style.left = "0px"; shadowObj.style.top = "0px"; shadowObj.style.width = "0px"; shadowObj.style.height = "0px"; shadowObj.style.zIndex = -1; shadowObj.style.display = "none"; getPTDialog().removeEvent(document); if (!modObj.bCrossDomain) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe) {
 var oWin = oframe.contentWindow; var oDoc = oWin.document; getPTDialog().removeEvent(oDoc); }
 } 
 
 if (modObj.bModeless) {
 ptCommonObj2.hidePopupMask(top, 'pt_modalMaskCover', true); }
 document.body.style.cursor = "auto"; },

 onmousemove: function(e) {
 e = e || window.event; var mousePos = ptCommonObj2.getMouseCoords(e); var shadowObj = MTop().document.getElementById("ptModalShadow"); var x = mousePos.x; var y = mousePos.y;  if (typeof shadowObj.bMousedown == 'undefined' || !shadowObj.bMousedown) return; var xdiff = parseInt((x - shadowObj.mouse_x) + 0); var ydiff = parseInt((y - shadowObj.mouse_y) + 0); shadowObj.mouse_x = x; shadowObj.mouse_y = y; if (xdiff == 0 && ydiff == 0) return; if (shadowObj.bMove) {
 shadowObj.style.left = xdiff + shadowObj.offsetLeft + "px"; shadowObj.style.top = ydiff + shadowObj.offsetTop + "px"; }
 else if (shadowObj.bResize) {
 var id = getPTDialog().moveId; var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); modObj.bCustResize = false; var isIEQuirks = browserInfoObj2.isIE && document.compatMode != "CSS1Compat";  var newWidth = xdiff + (isIEQuirks ? shadowObj.offsetWidth :shadowObj.clientWidth );  var newHeight = ydiff + (isIEQuirks ? shadowObj.offsetHeight : shadowObj.clientHeight);  if (newWidth > 0)
 shadowObj.style.width = newWidth + "px";  if (newHeight > 0)
 shadowObj.style.height = newHeight + "px";  modObj.bCustResizeDone = true;  }
 },

 onMouseDown: function(e) {
 e = e || window.event; var eObj = ptCommonObj2.getEO(e); var mousePos = ptCommonObj2.getMouseCoords(e); var x = mousePos.x; var y = mousePos.y; if (e.clientY >= mousePos.y) {
 
 y = e.clientY + (document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop);  }
 var id = eObj.id.split("_")[1]; var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var shadowObj = MTop().document.getElementById("ptModalShadow"); var otb = MTop().document.getElementById("ptModTable_" + id); var oHeader = MTop().document.getElementById("ptModHeader_" + id); var oBottom = MTop().document.getElementById("ptModBottom_" + id); var sizeBottom = oBottom ? (oBottom.offsetHeight - 5) : 0;  if (modObj.bModeless) {
 ptCommonObj2.showPopupMask(top, 'pt_modalMaskCover', true); }
 shadowObj.mouse_x = x; shadowObj.mouse_y = y; getPTDialog().moveId = id; shadowObj.style.left = otb.offsetLeft + "px"; shadowObj.style.top = otb.offsetTop + "px"; shadowObj.style.width = ptCommonObj2.getWidth(otb) + "px"; shadowObj.style.height = ptCommonObj2.getHeight(otb) + oHeader.offsetHeight + sizeBottom + "px"; shadowObj.style.zIndex = modObj.style.zIndex + 10; shadowObj.style.display = "block"; shadowObj.bMousedown = true; shadowObj.mouseOffset = ptCommonObj2.getMouseOffset(modObj, e); getPTDialog().setEvent(document); if (!modObj.bCrossDomain) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe) {
 oWin = oframe.contentWindow; var oDoc = oWin.document; getPTDialog().setEvent(oDoc); }
 }
 
 },

 RemoveHandler: function(id) {
 var oTitleBar = MTop().document.getElementById("ptModTitleBar_" + id); if (!oTitleBar) return; var obottom = MTop().document.getElementById("ptModBottom_" + id); var oresize = MTop().document.getElementById("ptModResize_" + id);  oTitleBar.onmousedown = null; oTitleBar.style.cursor = "auto"; },

 AddHandler: function(id) {
 if (isFModeLayout()) return; var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (typeof modObj == "undefined" || !modObj) return; if (typeof modObj.bMove != "undefined") modObj.bMove = false; if (typeof modObj.bMousedown != "undefined") modObj.bMousedown = false; modObj.bResize = false; var oTitleBar = MTop().document.getElementById("ptModTitleBar_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var octl = MTop().document.getElementById("ptModControl_" + id); if (octl) octl.style.display = "block"; var shadowObj = MTop().document.getElementById("ptModalShadow"); if (oTitleBar) {
 oTitleBar.style.cursor = "move"; oTitleBar.onmousedown = function (e) { 
 document.body.style.cursor = "move"; var shadowObj = MTop().document.getElementById("ptModalShadow"); shadowObj.bMove = true; shadowObj.style.cursor = ""; getPTDialog().onMouseDown(e); }
 }
 var obottom = MTop().document.getElementById("ptModBottom_" + id); if (obottom) {
 var oresize = MTop().document.getElementById("ptModResize_" + id); oresize.style.display = "block"; if ((browserInfoObj2.isiPad && browserInfoObj2.isSafari)) {
 obottom.style.display = "none"; obottom.style.height = "0px"; } else {
 obottom.style.display = "block"; obottom.style.height = "14px"; }
 obottom.onmousedown = function(e) { 
 var shadowObj = MTop().document.getElementById("ptModalShadow"); shadowObj.bResize = true; shadowObj.style.cursor = ('ltr'=='ltr') ? 'nw-resize' : 'ne-resize'; getPTDialog().onMouseDown(e); }
 }
 if (modObj.bFullScreen) {
 window.onorientationchange = function () {
 if (typeof (modObj.orientation) === "undefined") {
 if (window.orientation == -90 || window.orientation == 90) {
 modObj.orientation = "landscape"; } else {
 modObj.orientation = "portrait"; }
 MTop().resizeModalDialog_pt(id); }
 if ((window.orientation == -90 || window.orientation == 90) && (modObj.orientation == "portrait")) {
 modObj.orientation = "landscape"; MTop().resizeModalDialog_pt(id); }

 if ((window.orientation == 0 || window.orientation == 180) && (modObj.orientation == "landscape")) {
 modObj.orientation = "portrait"; MTop().resizeModalDialog_pt(id); }
 }
 }
 }
}

function showModal(url, parentWin, options, msg, onclose, bResize, pollContent, bBulkAction) {
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "modal url:\n" + url + "\n"); if (typeof(parentWin.modWin) != 'undefined' && parentWin.modWin != null && (options.indexOf("bRCFModal@1") == -1)) {
 try {
 closeModal(parentWin.modWin.modalID); } catch( error ) {}
 parentWin.modWin = null; }
 
 if ((typeof(modalCloseUrl) == "undefined" || !modalCloseUrl) && top.document.getElementById("ptifrmtgtframe") && top.TargetContent) {
 var contentFrame = top.TargetContent; modalCloseUrl = contentFrame.modalCloseUrl; modalCloseAlt = contentFrame.modalCloseAlt; modalResizeUrl = contentFrame.modalResizeUrl; modalResizeAlt = contentFrame.modalResizeAlt; modalMoveAlt = contentFrame.modalMoveAlt; }
 if (typeof options !== "undefined" && options) {
 options = options + 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';';  } else {
 options = 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; }
 
 parentWin.modWin = showModalDialog_pt(url, parentWin, options, msg, onclose, null, null, pollContent); if (typeof(pollContent) !== "undefined" && pollContent !== null && pollContent) {
 setModWinParent(); } else {
 var nDelay = 1000; if (!browserInfoObj2.isIE) { nDelay = 2000; }
 if (typeof bResize != 'undefined' && bResize) { nDelay = 0; }
 parentWin.setModWinID = window.setTimeout('setModWinParent();', nDelay); }

 if (typeof(bBulkAction) !== 'undefined' && bBulkAction !== null && bBulkAction)
 return parentWin.modWin;}

function setModlessWinParent() {
 setModWinParent(window.modLessWin);}

function setModWinParent(modlessWin) {
 if (MTop().modId == -1) return; var modWin = window.modWin; var bModless = false; if (typeof modlessWin != 'undefined') { modWin = modlessWin; bModless = true; }
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); var bPIA = modObj.bPIA; var obj = null; var pId = null; var owin = null; var modErrObj = null; if (modObj.bCrossDomain) {
 getPTDialog().resizeModalDialog(MTop().modId, true, modObj.width, modObj.height); return; }
 try {
 obj = modWin.contentWindow.document.body; var id = modWin.id; pId = id.split("_")[1]; if (!bPIA) { 
 modWin.contentWindow.winParent = window; modWin.contentWindow.dialogArguments = window; modWin.contentWindow.modalID = pId; modWin.contentWindow.name = "modWin_" + pId; }
 owin = modWin.contentWindow;  if (bModless)
 window.modlessWin = owin; else
 window.modWin = owin; var modDoc = modWin.contentWindow.document; modErrObj = modDoc.getElementById("PSMODAL_FATAL"); if (typeof setModWinID != 'undefined' && setModWinID != null)
 window.clearTimeout(setModWinID); if (modErrObj) {
 pWin = getFirstParentWin(); var formname = modObj.form.name; oForm = pWin.document.getElementById(formname); var modObj = getFirstModObj; var name = modObj.name; var sTxt = modErrObj.innerHTML; var xmlResponse = sTxt.substring(5, sTxt.length - 5); if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + " modal FATAL ERROR abort response:\n" + xmlResponse); closeModal(); var sScript = 'var postUrl=postUrl_' + oForm.name + ';'; eval(sScript); loader = new pWin.net2.ContentLoader(postUrl, oForm, name, null, null, null, null, null, true, true, null, false, xmlResponse); } 
 else {
 modErrObj = modDoc.getElementById("PSMODAL_ERR"); if (modErrObj) { 
 var sTxt = modErrObj.innerHTML; var xmlResponse = sTxt.substring(5, sTxt.length - 5); if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + " modal abort response:\n" +xmlResponse); closeModal(pId);  var sScript = 'var postUrl=postUrl_' + modObj.form.name + ';'; eval(sScript); loader = new net2.ContentLoader(postUrl, modObj.form, modObj.name, null, null, null, null, null, true, true, null, false, xmlResponse); } 
 else if (pId && owin && (!bPIA)) {
 MTop().resizeModalDialog_pt(pId);  }
 }
 }
 catch (err) {
 
 if (bModless)
 setModWinID = window.setTimeout('setModlessWinParent();', 10000); else
 setModWinID = window.setTimeout('setModWinParent();', 10000); return; }
}

function showModalDialog_pt(url, obj, options, msg, onclose, form, name, pollContent) {
 return getPTDialog().showModalDialog(url, obj, options, msg, onclose, form, name, pollContent);}

function setAllMask(modObj, bAdd) {
 return getPTDialog().setAllMask(modObj, bAdd);}

function resizeModalDialog_pt(id, bReload) {

 if(typeof CKEDITOR != "undefined"){
 MTop().RTEModal = true; MTop().RTEInstances = getNumberofRTEInstances(); }
 else
 MTop().RTEModal = false; if (typeof bReload != 'undefined' && bReload) {
 return getPTDialog().resizeModalDialog(id, true); }

 return getPTDialog().resizeModalDialog(id);}

function resizeModalAll() {
 return getPTDialog().resizeModalAll();}

function hideModal(id) {
 return getPTDialog().hideModalDialog(id);}
function closeHideModal(id) {
 if (typeof(getPTDialog()) != "undefined" && getPTDialog())
 return getPTDialog().closeHideModal(id);}

function closeModalAll() {
 return getPTDialog().closeModalAll();}

function closeModal(id) {
 return getPTDialog().closeModalDialog(id);}

function closeModal0(id, mtop) {
 if (mtop)
 mtop.getPTDialog().closeModalDialog0(id); else
 return MTop().getPTDialog().closeModalDialog0(id);}

function closeLastModal(evt, target, oParentWin) {
 if (!isLastLocalModal() && !isMsgModal() &&window.modalID == MTop().modId) return true; if (target && getPTDialog().isInModal(MTop().modId, target)) return true; if (isLastLocalModal() && !isMsgModal())
 doCloseLocalModals(); else
 getPTDialog().doCloseModalDialog(MTop().modId); if (!isAnyModal()) {
 if (typeof oParentWin != "undefined" && oParentWin)
 ptCommonObj2.tryFocus0(oParentWin.gFocusObj); else
 ptCommonObj2.tryFocus0(gFocusObj); if (isFModeLayout) gFFocusObjId = null; }
}

function isMsgModal() {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); return (modObj && modObj.bMsg);}

function isAnyModal(){
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (!modObj) return false; return true;}

function autoCloseTypeAhead(evt) {
 var id = getPTDialog().getTypeAheadModalId(); if (id.length == 0) return; if (isTypeHeadeNew() && isTouchKeyboard()) return; getPTDialog().doCloseModalDialog(id); setLocalModal(false);}

function autoCloseGridSort(evt) {
 var id = getPTDialog().getGridSortModalId(); if (id.length == 0) return; getPTDialog().doCloseModalDialog(id); setLocalModal(false);}

function doCloseLocalModals() {
 var bRtn = false; if (!isLastLocalModal()) return false; var oLastModalWin = getLastModalWin(); if (oLastModalWin) {
 var modObj = oLastModalWin.document.getElementById(oLastModalWin.PTMOD_ + oLastModalWin.modId); if (modObj) {
 var oScroll = modObj.querySelector(".ps_scrollable"); if (oScroll) {
 oScroll.style.height = ""; oScroll.style.width = ""; }
 bRtn = oLastModalWin.doCloseModalDialogAll(); if (modObj && modObj.bCal) {
 oLastModalWin.PTCalendar.closeWindow(); }
 oLastModalWin.setLocalModal(false); }
 }
 return bRtn;}


function checkRemoveModeless(){
 getPTDialog().checkRemoveModeless(false);}

function autoClose0(evt)
{ } 

function autoClose(evt)
{
 var target = ptCommonObj2.getEO(evt); var oLastModalWin = window; var bLocal = isLastLocalModal(); if (bLocal)
 oLastModalWin = getLastModalWin(); var modObj = oLastModalWin.document.getElementById(oLastModalWin.PTMOD_ + oLastModalWin.modId); if (bLocal && modObj) {
 if (modObj && modObj.bCal)
 oLastModalWin.PTCalendar.closeWindow(); else
 oLastModalWin.closeLastModal(); oLastModalWin.setLocalModal(false); }
 else if (modObj && modObj.bModeless)
 closeModal(oLastModalWin.modId); else
 closeLastModal();}

function autoCloseTop(evt) {
 var popMask = top.document.getElementById('pt_modalMask'); if (popMask.getAttribute('onclick') != null)
 popMask.onclick();}

function setLocalModal(bFlag) {
 bLocalModal = bFlag;}

function getLastModalWin()
{
 var oframe = top.document.getElementById(top.PTMODFRAME_ + top.modId); if (oframe) {
 return oframe.contentWindow; }
 else
 return window;}

function isLastLocalModal() 
{
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); var oWin = getLastModalWin(); if (modObj && modObj.bPIA && oWin && typeof oWin.bLocalModal != "undefined")
 return oWin.bLocalModal; else if (!modObj && oWin && getLastLocalModal())
 return oWin.bLocalModal; else
 return false; }

function getLastLocalModal() {
 var modObj = getLastModalWin().document.getElementById(getLastModalWin().PTMOD_ + getLastModalWin().modId); if (!modObj) return false; return true;}


function doCloseModalDialogAll() {
 return getPTDialog().doCloseModalDialogAll();}

function storeModalParentId(options) {
 
 
 if (bSessionStorage && typeof options != "undefined" && options) {
 
 
 
 
 var optionsParts = options.split(";"), prntEleId = null; for (var i =0; i < optionsParts.length; i++) {
 if (optionsParts[i].search("sPopupParentId") > -1) {
 prntEleId = optionsParts[i].split("@")[1]; break; }
 }
 try {
 sessionStorage.removeItem("RCActionHotKey");  prntEleId ? sessionStorage.setItem("divPopUpParentId", prntEleId) : sessionStorage.removeItem("divPopUpParentId"); } catch (e) {}
 }
} 

function setFocusOnModalClose() {
 
 
 if (typeof sessionStorage != "undefined") { 
 var prntEleId = sessionStorage.getItem("divPopUpParentId"), ePrntEle = null; if (prntEleId) { ePrntEle = top.document.getElementById(prntEleId); }
 
 if (ePrntEle) { 
 ePrntEle.tagName == "IMG" ? ePrntEle.parentElement.focus() : ePrntEle.focus(); }

 
 
 
 if (typeof sessionStorage != "undefined" && 
 !(sessionStorage.getItem("keyboardKey") && sessionStorage.getItem("keyboardKey") == "ESC" && 
 sessionStorage.getItem("divPopupClosed") && sessionStorage.getItem("divPopupClosed") == "1")) {
 sessionStorage.removeItem("divPopUpParentId"); sessionStorage.removeItem("keyboardKey"); sessionStorage.removeItem("divPopupClosed"); }

 }
}

function doCloseModal(obj) {
 var id; if(typeof(obj) == "object")
 id = obj.id.split("_")[1]; else
 id = obj; var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && modObj.bGridSort) {
 var oLastModalWin = window; var bLocal = isLastLocalModal(); if (bLocal)
 oLastModalWin = getLastModalWin()
 oLastModalWin.closeLastModal(); oLastModalWin.setLocalModal(false); } else {
 getPTDialog().doCloseModalDialog(id); }

 
 if (isFModeLayout() && isTouchKeyboard())
 initScrolls0(); setFocusOnModalClose(); }

function doCloseModal0(id) {
 return getPTDialog().doCloseModalDialog0(id);}

function getFirstParentWin() {
 return getPTDialog().getFirstParentWin();}

function getFirstModObj() {
 return getPTDialog().getFirstModObj();}

function getModObjHeight(id) {
 var otb = MTop().document.getElementById("ptModTable_" + id); if (otb)
 return otb.clientHeight; else
 return -1;}

function getModObjHeaderHeight(id) {
 var obj = MTop().document.getElementById("ptModHeader_" + id); if (obj)
 return obj.clientHeight; else
 return -1;}
function addMsg(msg, oParentWin, options)
{ 
 var bTopFMode = (typeof top.window.isFModeLayout != "undefined") ? top.window.isFModeLayout() : true;  if (!bTopFMode && window.isFModeLayout()) 
 setLocalModal(true); if (typeof oParentWin == 'undefined') {
 oParentWin = window; options = 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; }
 if (getPTDialog()) 
 return getPTDialog().addMsg(msg, oParentWin, options);}

function isAnyMsg() {
 if (getPTDialog()) 
 return getPTDialog().isAnyMsg(); else
 return false;}

function playMsg() {
 getPTDialog().doCloseModalDivPopup(MTop().modId); return getPTDialog().playMsg();}

function isLastMsgModal() {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (!modObj || !modObj.bMsg) return false; return true;}

function isLastCalModal() {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (!modObj || !modObj.bCal) return false; return true;}

function isLastTimeoutMsgModal() {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (!modObj || !modObj.bTimeoutMsg) return false; return true;}

function setFocusFModeMsgModal() {
 if (!isLastMsgModal()) return false; getPTDialog().setFocusFMode(MTop().modId); return true;}

function addDivPopup(mObj, oParentWin, options, scrollId, bFrame) {
 return getPTDialog().addDivPopup(mObj, oParentWin, options, scrollId, bFrame);}

function isAnyDivPopup() {
 if (getPTDialog()) 
 return getPTDialog().isAnyDivPopup(); else
 return false;}

function playDivPopup() {
 return getPTDialog().playDivPopup();}

function showModalMessage(msg, obj, option) {
 return getPTDialog().showModalMessage(msg, obj, option);}

function closeMsg(obj,id) {
 var nRtn = getPTDialog().closeModalMsg(obj,id); setLocalModal(false); if (isFModeLayout() && isAccessibleLayout()) unhidePtWrapper(); return nRtn;}

function isModeless(id) {
 return getPTDialog().isModeless(id);}

function isWinModeless(win) {
 return getPTDialog().isWinModeless(win);}

function getModlessWinCnt() {
 return MTop().modlessWinCnt;}

function setModlessWinCnt(cnt) {
 MTop().modlessWinCnt = cnt;}

function setModalDialogBack(id, sBackIdQS, sBackTitle) {
 return getPTDialog().setModalDialogBack(id, sBackIdQS, sBackTitle);}

function setModalDialogTitle(sTitle, sBackIdQS, sBackTitle) {
 setModalDialogBack(MTop().modId, sBackIdQS, (typeof sBackTitle == "undefined") ? 'Back' : sBackTitle); return getPTDialog().setModalDialogTitle(MTop().modId, sTitle);}

function getModalDialogTitle() {
 return getPTDialog().getModalDialogTitle(MTop().modId);}

function MTop() {
 if (isFModeLayout() && bLocalModal)
 return window; try {
 
 
 if (typeof top.gFocusId != 'undefined' && top.document.getElementsByTagName("BODY")[0] != null)
 return top; else if (typeof top.ModalTop != 'undefined' && !top.ModalTop)
 return top.ModalTop; }
 catch (err) {
 }
 if (top && top.frames)
 return getTargetFrame(top.frames);}

function getPTDialog() { 
 if (!isFModeLayout())
 return MTop().ptDialog; if (bLocalModal && window != top)
 return window.ptDialogLocal; else 
 return MTop().ptDialog;}

function CloseRCFModal()
 {
}

function isModalPage(formName) {
 var sScriptIsModal = 'var bIsModal = false; if (typeof(bDoModal_' + formName + ') != "undefined") {bIsModal=bDoModal_' + formName + ';}';  var sScriptIsJsModal = 'var bIsJsModal = false; if (typeof(bJSModal_' + formName + ') != "undefined") {bIsJsModal=bJSModal_' + formName + ';}'; eval(sScriptIsModal); eval(sScriptIsJsModal); if (bIsModal || bIsJsModal || PT_GetTopmostModalDialogIdCount() > -1) { return true; }
 return false;}


function PT_isModalDialogPresent() {
 var mTop = MTop(); if (!mTop) return false; var id = mTop.modId; var modObj = mTop.document.getElementById(mTop.PTMOD_ + id); if (modObj && modObj.bModeless) return !modObj.bRemove;  var divModal = mTop.document.getElementById("pt_modals"); if (typeof divModal == 'undefined' || divModal == null)
 return false; if ((divModal.offsetWidth > 0) || (divModal.style.display == "block") || (divModal.style.display == "inline"))
 return true; return false;}
function PT_GetTopmostModalDialogIdCount() {
 var mTop = MTop(); if (!mTop) return -1; var divModal = mTop.document.getElementById("pt_modals"); if (typeof divModal == 'undefined' || divModal == null) return -1; var modalDivList = divModal.getElementsByTagName('div'); if (typeof modalDivList == 'undefined' || modalDivList == null) return -1; var maxModalIndex = -1; for (var i = 0; i < modalDivList.length; ++i) {
 if (typeof (modalDivList[i].bRemove) != 'undefined' && modalDivList[i].bRemove)
 continue; var idValue = modalDivList[i].id; if (typeof idValue == 'undefined' || idValue == null)
 continue; if (idValue.indexOf("ptModTable_") != -1) {
 var tmp = ""; tmp = idValue.split("ptModTable_"); if (tmp != "") {
 if (tmp[1] != "undefined" && tmp[1] != "") {
 var modalIndex = parseInt(tmp[1]); if (!isNaN(modalIndex)) {
 if (modalIndex > maxModalIndex)
 maxModalIndex = modalIndex; }
 }
 }
 }
 }
 return maxModalIndex;}
function PT_GetModalDialog(idCount) {
 if (idCount < 0) return null; var mTop = MTop(); if (!mTop) return null; var otb = mTop.document.getElementById("ptModTable_" + idCount); return otb;}
function PT_isNodeInModalDialog(domNode, idCount) {
 var modalDialog = PT_GetModalDialog(idCount); if (typeof modalDialog == 'undefined' || modalDialog == null)
 return true; var tmpDomNode = domNode; while (typeof tmpDomNode != 'undefined' && tmpDomNode != null) {
 if (tmpDomNode === modalDialog)
 return true; tmpDomNode = tmpDomNode.parentNode; }
 return false;}
function PT_handleTabKeyForModalDialog(evt) {
 try {
 if (PT_isModalDialogPresent()) {
 if (!evt && window.event) evt = window.event; if (!evt) return false; var mTop = MTop(); if (!mTop) return true; var topmostModalDialogIdCount = PT_GetTopmostModalDialogIdCount(); if (ptUtil.getKeyCode(evt) == 9 && !ptUtil.isAltKey(evt) && !ptUtil.isCtrlKey(evt)) {
 if (!PT_isNodeInModalDialog(mTop.document.activeElement, topmostModalDialogIdCount)) {
 if (evt.returnValue) evt.returnValue = false; if (evt.preventDefault) evt.preventDefault(); var topmostModal = PT_GetModalDialog(topmostModalDialogIdCount); if (topmostModal) {
 var modCloseLnk = mTop.document.getElementById('ptModCloseLnk_' + topmostModalDialogIdCount); if (modCloseLnk)
 ptCommonObj2.tryFocus0(modCloseLnk); else {
 var modalFrame = mTop.document.getElementById(mTop.PTMODFRAME_ + topmostModalDialogIdCount); if (modalFrame)
 ptCommonObj2.tryFocus0(modalFrame); else {
 var inputElements = topmostModal.getElementsByTagName('input'); if (typeof inputElements == 'undefined' || inputElements == null)
 ptCommonObj2.tryFocus0(topmostModal); else {
 var focused = false; for (var i = 0; i < inputElements.length; ++i) {
 if (inputElements[i].tabIndex > -1) {
 ptCommonObj2.tryFocus0(inputElements[i]); focused = true; break; }
 }
 if (!focused) ptCommonObj2.tryFocus0(topmostModal); }
 }
 }
 return false; }
 }
 }
 }
 }
 catch (e) {
 }
 return true;}

function PT_isAnyDialogVisible(){
 var hasDialogVisible = false; var mTop = MTop(); var dlgContainer = mTop.document.getElementById("pt_modals"); if (dlgContainer) {
 for (var i = 0; i < dlgContainer.children.length; i++) {
 var childId = dlgContainer.children[i].id; if (childId) {
 var idArr = childId.split("_"); if (idArr.length >= 2 && idArr[0] == "ptMod" && !isNaN(idArr[1])) {
 if (dlgContainer.children[i].style.display != "none") {
 hasDialogVisible = true; break; }
 }
 }
 }
 }
 return hasDialogVisible;}



if (window == top) 
 ptDialog = new PT_Dialog();else if ((typeof top.gFocusId == 'undefined' || top.document.getElementsByTagName("BODY")[0] == null) && (window.name == "TargetContent" || window.name == "rightF"))
 ptDialog = new PT_Dialog();

function getContextRoot(strURL){
 var root = ""; var rootIdx = strURL.indexOf("://"); if (rootIdx != -1) {
 root = strURL.substr(rootIdx+3); var srvlet = String(root).match(/\/ps(c|p)\//);  if (srvlet != null) {
 rootIdx = root.indexOf("/"); if (rootIdx != -1) 
 root = root.substr(rootIdx, srvlet.index - rootIdx); }
 }
 return root;}


function getptBaseURI()
{
 var ptBaseURI = ""; var nPos = String(location).indexOf('\/psp\/'); if (nPos != -1)
 {
 ptBaseURI = String(location).substr(nPos,String(location).length); var addressLoc = String(ptBaseURI).match(/\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//); if (addressLoc)
 ptBaseURI = addressLoc[0].replace('\/psp\/','\/psc\/'); else 
 ptBaseURI = ""; }
 else 
 ptBaseURI = String(location).match(/\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0].replace('\/psp\/','\/psc\/');  ptBaseURI = getContextRoot(String(location)) + ptBaseURI; return ptBaseURI;}


function getptBaseURIFromUrl(sUrl)
{
 var ptBaseURI = ""; if (!sUrl)
 sUrl = String(location); var strUrl = String(sUrl); var nPos = strUrl.indexOf('\/psp\/'); if (nPos != -1)
 {
 var nPos2 = strUrl.indexOf('?'); var nLength = strUrl.length - nPos; if (nPos2 > nPos)
 nLength = nPos2 - nPos; ptBaseURI = String(strUrl).substr(nPos,nLength); var addressLoc = String(ptBaseURI).match(/(.)*\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//); if (addressLoc)
 ptBaseURI = addressLoc[0].replace('\/psp\/','\/psc\/'); else 
 ptBaseURI = ""; }
 else {
 ptBaseURI = strUrl.match(/(.)*\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0].replace('psp','psc'); }
 
 return ptBaseURI;}



function post_to_url(TgtLoc, path, paramstring, method, strLabel,isRCFWin) {
 method = method || "POST";  if(typeof(path) == "undefined" || path == null) return; var loader = new net2.ContentLoader(path, null, strLabel, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); path = newurl; }, null, paramstring, "application/x-www-form-urlencoded", 1, 0, null, false); if(typeof(path) == "undefined" || path == null) return;  if (path.indexOf("/s/") > -1) {
 var loader = new net2.ContentLoader(path, null, strLabel, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); path = newurl; }, null, paramstring, "application/x-www-form-urlencoded", 1, 0, null, false); if(typeof(path) == "undefined" || path == null) return; }

 if (TgtLoc == "_top")
 {
 var form = top.document.createElement("form"); form.setAttribute("method", method); form.setAttribute("action", path);  var strKey = paramstring.substr(0, 14); var strVal = paramstring.substr(15); var hiddenField = top.document.createElement("input");  hiddenField.setAttribute("type", "hidden"); hiddenField.setAttribute("name", strKey); hiddenField.setAttribute("value", strVal); form.appendChild(hiddenField); top.document.body.appendChild(form);  form.submit(); }
 else
 {
 var form = document.createElement("form"); form.setAttribute("method", method);  var formfactor = getFormFactorFromCookie(); if(typeof(isRCFWin) != "undefined" && isRCFWin != null && isRCFWin && (formfactor == "0" || formfactor =="1" || formfactor =="2")){
 var devWidth = getFormFactorSize(formfactor).width; var devHeight = getFormFactorSize(formfactor).height; var myWindow = window.open("", "MySubWindow", "width=1,height=1,resizable=yes,scrollable=yes,scrollbars=yes,toolbar=no,location=no"); myWindow.moveTo(0, 0); myWindow.resizeTo(devWidth, devHeight); myWindow.focus(); myWindow.innerHeight = devHeight; myWindow.innerWidth = devWidth; form.target = "MySubWindow";  }
 else
 form.setAttribute("target", '_blank');  form.setAttribute("action", path); var strKey = paramstring.substr(0, 14); var strVal = paramstring.substr(15); var hiddenField = document.createElement("input");  hiddenField.setAttribute("type", "hidden"); hiddenField.setAttribute("name", strKey); hiddenField.setAttribute("value", strVal); form.appendChild(hiddenField); document.body.appendChild(form); form.submit();  } 
}


function OpenCrefInUniNav (Tgtobj,TgtLoc,bBulkAction,strBulkData, strLabel,nFluidComponent,isRCFWin) { 
 var ptSearchURI = ""; var ptUnBaseURI = ""; var ExternalURL = "FALSE"; var XPortal = "FALSE"; if (TgtLoc == "")
 TgtLoc = "_top";  var nUrlPos = String(Tgtobj).indexOf('\/psp\/');  if(nUrlPos === -1)
 var nUrlContPos = String(Tgtobj).indexOf('\/psc\/');   if(nUrlContPos === -1)
 ExternalURL = "TRUE";  var PortalLocation = top.document.location.href; if(PortalLocation == "")
  PortalLocation = location;  var URLArr= String(PortalLocation).split("/");  var SrchURLArr= String(Tgtobj).split("/"); if(URLArr.length >= 5 && SrchURLArr.length >= 5) {
  if(URLArr[5] !== SrchURLArr[5])
 XPortal = "TRUE"; }

 if(ExternalURL != "TRUE" && XPortal != "TRUE") {
 var UnsiteName = ""; for(var ai = 0; ai < 6; ai++ ) {
  if(ai==3) {
 
 
 if ((typeof(nFluidComponent) != 'undefined') && nFluidComponent == 1 && isFModeLayout())
 ptUnBaseURI = ptUnBaseURI+"psc"+"/"; else
 ptUnBaseURI = ptUnBaseURI+"psp"+"/"; }
 else {
 if(ai==4) {
 UnsiteName = URLArr[ai]; if(TgtLoc == "_blank") {
 var UnsiteNamenew =""; var UnsiteNametemp = UnsiteName.lastIndexOf("_"); var UnsiteNameNewWin = UnsiteName.substring(UnsiteNametemp + 1,UnsiteName.length); if(isNaN(UnsiteNameNewWin)) {
 UnsiteNamenew = UnsiteName + "_newwin"; URLArr[ai] = UnsiteNamenew; }
 else {
 UnsiteNamenew = UnsiteName.substring(0,UnsiteNametemp); UnsiteNamenew = UnsiteNamenew + "_newwin"; URLArr[ai] = UnsiteNamenew; }
 }
 else {
 if (((bBulkAction != 'undefined' && bBulkAction != null) && bBulkAction == 1) && (isFModeLayout())) {
 var UnsiteNamenew =""; var UnsiteNametemp = UnsiteName.lastIndexOf("_"); if(UnsiteNametemp != -1)
 UnsiteNamenew = UnsiteName.substring(0,UnsiteNametemp); else
 UnsiteNamenew = UnsiteName; UnsiteNamenew = UnsiteNamenew + "_newwin"; URLArr[ai] = UnsiteNamenew; }
 }
 }
 ptUnBaseURI = ptUnBaseURI + URLArr[ai]+"/"; }
 }

 for(var bi = 6; bi < (SrchURLArr.length); bi++ ){ 
 if((SrchURLArr.length-1) === bi) {
 ptSearchURI = ptSearchURI + SrchURLArr[bi];  }
 else {
 ptSearchURI = ptSearchURI + SrchURLArr[bi]+"/";  }
 }

 ptUnBaseURI = ptUnBaseURI + ptSearchURI; var paramExist = Tgtobj.indexOf('?'); var unParam = "?cmd=uninav"; var temploc = ""; if (XPortal != "TRUE") {
 unParam = ""; }

 if ((bBulkAction != 'undefined' && bBulkAction != null) && bBulkAction == 1) {
 var url = ptUnBaseURI+unParam; post_to_url(TgtLoc, url, strBulkData, "POST", strLabel,isRCFWin);  } 
 else { 
 if ((XPortal == "TRUE") && (paramExist != -1)) {
 unParam = "&cmd=uninav"; }
 
 if(TgtLoc == "_blank") {
 var formfactor = getFormFactorFromCookie(); if(typeof(isRCFWin) != "undefined" && isRCFWin != null && isRCFWin && (formfactor == "0" || formfactor =="1" || formfactor =="2") )
 {
 temploc = "var devWidth = getFormFactorSize(\""+ formfactor + "\").width;"; temploc +="var devHeight = getFormFactorSize(\"" + formfactor + "\").height;"; temploc += "var myWindow = window.open(\"\",'_blank',\"width=1,height=1,resizable=yes,scrollable=yes,scrollbars=yes,toolbar=no,location=no\");"; temploc += "myWindow.moveTo(0, 0);myWindow.resizeTo(devWidth, devHeight);myWindow.focus();"; temploc += "myWindow.innerHeight = devHeight;myWindow.innerWidth = devWidth;"; temploc += "myWindow.location = \"" + ptUnBaseURI+unParam+"\";";  }
 else {
 if (XPortal == "TRUE")
 temploc = "window.open('"+ptUnBaseURI+unParam+"','_blank')"; else
 temploc = "window.open('"+ptUnBaseURI+"','_blank')"; }
 } 
 else {
 var TgtLocIndx = String(TgtLoc).indexOf('_'); if(TgtLocIndx == 0) { 
 TgtLoc = String(TgtLoc).slice(1);}
 temploc = TgtLoc+".document.location = '"+ptUnBaseURI+unParam+"'"; }
 eval(temploc); }
 } else { 
 TgtLoc = "_blank"; var formfactor = getFormFactorFromCookie(); if(typeof(isRCFWin) != "undefined" && isRCFWin != null && isRCFWin && (formfactor == "0" || formfactor =="1" || formfactor =="2") )
 {
 var formfactor = getFormFactorFromCookie(); var devWidth = getFormFactorSize(formfactor).width; var devHeight = getFormFactorSize(formfactor).height; var myWindow = window.open("",TgtLoc,"width=1,height=1,resizable=yes,scrollable=yes,scrollbars=yes,toolbar=no,location=no");  myWindow.moveTo(0, 0); myWindow.resizeTo(devWidth, devHeight);  myWindow.focus(); myWindow.innerHeight = devHeight; myWindow.innerWidth = devWidth; myWindow.location = Tgtobj; }
 else
 window.open(Tgtobj,TgtLoc);  }
}



function openSrchRsltURL(openURL){ 

 
 
 if (bcUpdater && typeof bcUpdater != 'undefined' &&
 top.pthNav && typeof top.pthNav != 'undefined' &&
 (openURL.search("/psp/") > 0 || openURL.search("/psc/") > 0)) {

 bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "F"); top.pthNav.isMenuCrefNav = "F";  if (typeof bcUpdater.getStoredData(bcUpdater.searchText) != 'undefined' && bcUpdater.getStoredData(bcUpdater.searchText) != null) {
 openURL += "&sesSrchTxt="; openURL += encodeURIComponent(bcUpdater.getStoredData(bcUpdater.searchText)); }
 if (typeof bcUpdater.getStoredData(bcUpdater.searchText) != 'undefined' && bcUpdater.getStoredData(bcUpdater.searchText) != null) {
 openURL += "&sesCrefID="; openURL += bcUpdater.getStoredData(bcUpdater.sesCrefID); }
 }

 if (typeof ptalPage != 'undefined' && ptalPage){ 
 openURL = openURL.replace('\/psp\/','\/psc\/');  tgt= "TargetContent"; window.open(openURL, tgt); }
 else
 OpenCrefInUniNav(openURL, ""); }





var ptsIsSearchLoaded = false;var ptstimer;function loadSuggestionSearch(searchIframeUrl) {
 if (document.querySelector(".pts_search_modal")) {
 document.querySelector(".pts_search_modal").style.display = "block"; } else {
 var ptsSearchModal = document.createElement("div"); ptsSearchModal.id = "ptsSearchModal"; ptsSearchModal.setAttribute("class", "pts_search_modal"); ptsSearchModal.setAttribute("aria-modal","true"); ptsSearchModal.setAttribute("role","dialog");  var searchIframe = document.createElement("iframe"); searchIframe.id = "ptsSearchIFrame"; searchIframe.name = "ptsSearchIFrame"; searchIframe.frameBorder = "0"; searchIframe.setAttribute("allowtransparency", "true"); searchIframe.style.backgroundColor = "transparent"; searchIframe.style.display = "none"; searchIframe.title = "Suggestion search"
 if (typeof (bFMode) == "undefined")
 bFMode = false; searchIframe.src = encodeURI(searchIframeUrl); ptsSearchModal.appendChild(searchIframe); var el = document.querySelector('body'); el.appendChild(ptsSearchModal); }
 ptsProcessing(1, 3000); doCloseLocalModals(); if (ptstimer != undefined){
 clearInterval(ptstimer); }
 ptstimer = setInterval(checkProcessing, 1000);}

function checkProcessing() {
 if (ptsIsSearchLoaded) {
 if (document.querySelector("#ptsSearchIFrame").contentWindow !== null)
 document.querySelector("#ptsSearchIFrame").contentWindow.document.querySelector("#PTSKEYWORD").focus(); clearInterval(ptstimer); ptsProcessing(0, 3000); }
}

function ptsProcessing(option, interval) {

 var sScript = "processing_empty"; if (eval("typeof " + sScript + " !== 'function'")) {
 if (document.forms.length > 0)
 sScript = "processing_" + document.forms[0].name; var tcFrame = "window.frames['TargetContent']"; if (window.frames['TargetContent']) {
 if (window.frames['TargetContent'].document.forms.length > 0)
 sScript = tcFrame + ".processing_" + eval(tcFrame + ".document.forms[0].name"); }
 }
 if (eval("typeof " + sScript + " === 'function'"))
 eval(sScript + "(" + option + "," + interval + ");");}

function doKeyEnter(evt, id){
 var key = getKeyCode(evt); if (key == 13) {
 var tObj = document.getElementById(id); if (tObj) {
 tObj.click(); cancelBubble(evt); }
 }
 return;}

function setFocusToHtmlElemId(sElemtId) {
 if ((typeof(sElemtId) === "undefined") || (!sElemtId) || (sElemtId == ""))
 return; var el = document.getElementById(sElemtId); if (el)
 el.focus();}




var pm = new Object();(function($){
 
 
 var p_interval_id,
 p_previous_hash,
 p_cache_number = 1,
 
 
 rm_callback,
 
 
 window = this,
 FALSE = !1,
 
 
 postMessage = 'postMessage',
 addEventListener = 'addEventListener',
 
 p_accept_message,

 p_handler,

 p_messagehandler,

 p_message,

 p_messageEventDeferred = false,

 p_messageEventsApplied = false,

 p_objFrameArr = new Array(),

 postMessage_supported = window[postMessage] 
 

 $.isFunction = function( obj ) 
 {
 return Object.prototype.toString.call(obj) === "[object Function]"; };   $[postMessage] = function(msg, target_url, target) 
 {
 if (!target_url) 
 return;   msg = typeof msg === 'string' ? msg : $.param( msg );   target = target || parent; if (postMessage_supported) 
 {
 var temp_url = target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1' ); target[postMessage]( msg, temp_url); }
 else 
 {
 if (target_url) 
 target.location = target_url.replace( /#.*$/, '' ) + '#' + (+new Date) + (p_cache_number++) + '&' + msg; }
 }; $.getFrame = function(fName){
 var frame; if (fName == "" || fName == "top") 
 frame = parent; else if (fName == "RCArea")
 frame = top.frames['RelatedContent'].frames[fName]; else if (fName == self.name)
 frame = self; else
 frame = top.frames[fName]; return frame;};$.getForm = function(theFrame, pName){
 var theForm;  var fDoc = theFrame.document; var pglt = fDoc.getElementById(pName); if (pglt && typeof pglt != "undefined")
 theForm = pglt.getElementsByTagName('form')[0]; else 
 if (pName.indexOf("ptpglt") != 0 )
 theForm = fDoc.getElementsByTagName('form')[0]; return theForm;};$.getFormField = function(fDoc, fldName, msgFldNames) {
 var fldArr = fDoc.getElementsByName(fldName); var msgFldArr = msgFldNames.split(","); var fldObj, msgFld; if (typeof fldArr == 'undefined' || fldArr.length == 0)
 {
 fldObj = fDoc.getElementById(fldName); if (typeof fldObj != 'undefined' && fldObj != null)
 fldArr = new Array(fldObj); }

 
 for (var j = 0; j < msgFldArr.length; j++)
 { 
 msgFld = fDoc.getElementById(msgFldArr[j]); if (typeof msgFld == 'undefined' || !msgFld)
 return null; if (typeof msgFld.form != 'undefined' && msgFld.form != null)
 break; } 
 
 fldObj = null;   if ((msgFld.form == 'undefined' || msgFld.form == null) && (fldArr.length > 0))
 fldObj = fldArr[0]; else if (fldArr.length > 0)
 {
 for (var i = 0; i < fldArr.length; i++)
 {
 
 
 if (typeof fldArr[i].form != 'undefined' && fldArr[i].form != null && fldArr[i].form.name == msgFld.form.name) 
 { 
 fldObj = fldArr[i]; break; }
 else if (fldArr[i].form == 'undefined' || fldArr[i].form == null) 
 fldObj = fldArr[i];  }
 }
 return fldObj;};$.isPageletSubscribed = function(eName)
{
 for (var x = 0; x < p_message_data.length; x++)
 {
 if (p_message_data[x][5] == eName && p_message_data[x][2] == "S")
 return true; }
 return false;};$.removeExistingEventHandler = function(fld, eventName) 
{
 var eventObject; var eventValue; if (fld.addEventListener) {
 eventObject = fld.attributes.getNamedItem("onchange"); if (eventObject != null) eventValue = eventObject.value; fld.removeEventListener(eventName, p_handler, false); } else {
 eventName = "on" + eventName; eventObject = fld.attributes.getNamedItem(eventName); if (eventObject != null) eventValue = eventObject.value; fld.detachEvent(eventName, p_handler); }
 return eventValue;};$.getJSONMessageData = function(theFrame, fldDataNames)
{
 var message = "{"; var fldId; var theDoc = theFrame.document; fieldNames = fldDataNames.split(","); for (var i = 0; i < fieldNames.length; i++)
 {
 try {
 fldId = theDoc.getElementById(fieldNames[i]); } catch(e) {}
 if (!fldId || typeof fldId == 'undefined')
 continue; if (i) message += ","; message += "'" + fldId + "' : '" + fldId.value + "'"; }
 message += "}"
 return message;};$.getStringMessageData = function(theFrame, eName, fldDataNames)
{
 var message = eName; var fldId;  var theDoc = theFrame.document || theFrame.contentDocument || theFrame.contentWindow.document; fieldNames = fldDataNames.split(","); for (var i = 0; i < fieldNames.length; i++)
 {
 try {
 fldId = theDoc.getElementById(fieldNames[i]); } catch(e) {}
 if (!fldId || typeof fldId == 'undefined')
 continue; message += ".,.";  if (fldId.nodeName.toLowerCase() == "label") {
 message += fldId.innerHTML.replace(":", ""); }
 else if (fldId.firstChild && (fldId.className.search("GRIDCOLUMNHDR") > -1)) {
 message += fldId.firstChild.nodeValue; } 
 else {
 if (fldId.tagName.toLowerCase() == "span" || fldId.tagName.toLowerCase() == "a") 
 message += fldId.innerText ? fldId.innerText: fldId.textContent;  else
 message += fldId.value; }
 
 }
 return message;};$.getIWCEventData = function(eventName, eventType)
{
 var iwcArray = new Array(); for (var x = 0; x < p_message_data.length; x++)
 {
 if (eventName == p_message_data[x].eventName && p_message_data[x].eventType == eventType)
 iwcArray.push(p_message_data[x]); }
 return iwcArray;};$.getFldPubEventData = function(fldName)
{
 if (typeof p_message_data != 'undefined') { 
 for (var x = 0; x < p_message_data.length; x++) 
 {
 if (fldName == p_message_data[x].htmlFieldName && p_message_data[x].eventType == "P") 
 return p_message_data[x]; }
 }
 return null;};$.getDelayedFldPubEvent = function(fldName)
{ 
 if (typeof p_message_data != 'undefined') { 
 for (var x = 0; x < p_message_data.length; x++)
 { 
 if (fldName == p_message_data[x].htmlFieldName && p_message_data[x].eventType == "P") 
 return p_message_data[x].p_message;  }
 }
 return null;};$.setDelayedFldPubEvent = function(fldName, iwcEvent)
{
 if (typeof p_message_data != 'undefined' && p_message_data.length > 0) { 
 for (var x = 0; x < p_message_data.length; x++)
 {
 if (fldName == p_message_data[x].htmlFieldName && p_message_data[x].eventType == "P") {
 p_message_data[x].p_message=iwcEvent; return; }
 
 }
 } 
};$.attachEvent = function(theFrame, eventName, fldName, eventJSName, fldDataNames)
{
 p_handler = function(event) 
 {
 $.GetMessageFrames(); if ((eventOnChange != null && eventOnChange.nodeValue != null) ||
 (eventOnClick != null && eventOnClick.nodeValue != null))
 {
 var iwcData = $.getIWCEventData(eventName, "P"); if (iwcData.length) {
 $.p_message = iwcData[0].p_message;  }
 }
 else
 {
 var message = $.getStringMessageData(theFrame, eventName, fldDataNames); var thisFrame; while (p_objFrameArr.length)
 {
 try 
 {
 thisFrame = p_objFrameArr.shift(); $.postMessage(message, thisFrame.location.href, thisFrame.window); }
 catch(e) {}
 }
 }
 }; var eventOnClick; var eventOnChange; var p_messageAfterEvent = ""; var fld; if (eventJSName == "C")
 eventJSName = "change"
 else {
 if (eventJSName == "L")
 eventJSName = "click"
 else 
 return p_messageAfterEvent; }

 if ($.isLevelZeroField(fldName)) {
 
 fld = $.getFormField(theFrame.document, fldName, fldDataNames); if (!fld || typeof fld == 'undefined')
 return p_messageAfterEvent; eventOnClick = fld.attributes.getNamedItem("onclick"); eventOnChange = fld.attributes.getNamedItem("onchange");   p_messageAfterEvent = $.attachEventToFldOcc(fld, p_handler, eventOnClick, eventOnChange, theFrame, eventName, eventJSName, fldDataNames); }
 else {
 
 var occIdx = 0; fld = theFrame.document.getElementById(fldName + occIdx); if (!fld || typeof fld == 'undefined')
 return p_messageAfterEvent; while ( fld ) {
 eventOnClick = fld.attributes.getNamedItem("onclick"); eventOnChange = fld.attributes.getNamedItem("onchange");  p_messageAfterEvent = $.attachEventToFldOcc(fld, p_handler, eventOnClick, eventOnChange, theFrame, eventName, eventJSName, fldDataNames); ++occIdx; fld = theFrame.document.getElementById(fldName + occIdx); }

 }

 return p_messageAfterEvent;}; $.attachEventToFldOcc = function(fld, p_handler, eventOnClick, eventOnChange,
 theFrame, eventName, eventJSName, fldDataNames) 
{
 var messageAfterEvent = ""; if ((fld.tagName.toLowerCase() == "a") || (eventOnChange != null && eventOnChange.nodeValue != null) ||
 (eventOnClick != null && eventOnClick.nodeValue != null)) {
 if (g_bAccessibilityMode && top.ptalPage && top.ptalPage.ptalPageletArea) { 
 eventOnClick.nodeValue = "pm.updateMessageEvents('" + fldDataNames + "');" + eventOnClick.nodeValue ; }
 messageAfterEvent = "pm.eventAfterAJAX('" + EscapeJSString(theFrame.name) + "', '" + eventName + "', '" + fldDataNames + "');"
 }
 else {
 if (fld.addEventListener) {
 fld.addEventListener(eventJSName, p_handler, false); } 
 else {
 eventJSName = "on" + eventJSName; fld.attachEvent(eventJSName, p_handler); }
 } 

 return messageAfterEvent;};$.isLevelZeroField = function(fldId) 
{
 if (fldId.charAt(fldId.length - 1) != '$')
 return true; return false;}; $.eventAfterAJAX = function(fName, eName, fldDataNames)
{
 var message; var theFrame = $.getFrame(fName); if (theFrame != 'undefined' && theFrame != null)
 message = $.getStringMessageData(theFrame, eName, fldDataNames);  else
 message = eName; if (!p_objFrameArr.length)
 $.GetMessageFrames(); while (p_objFrameArr.length)
 {
 var thisFrame; try 
 {
 thisFrame = p_objFrameArr.shift(); $.postMessage(message, thisFrame.location.href, thisFrame.window); }
 catch(e) {}
 }
 $.p_messageEventDeferred = false; };$.eventAfterTypeahead = function(fName, eName, fldDataNames)
{
 $.eventAfterAJAX(fName, eName, fldDataNames);};$.attachHandler = function(theFrame)
{
 
 var fDoc = theFrame.document; p_messagehandler = function(event) {
 
 
 if (typeof(event.data) !== 'string')
 return; var eventDataField, eventFunc; var eventDataValues = event.data.split(".,.");  sEventName = eventDataValues[0];  var iwcData = $.getIWCEventData(sEventName, "S");  if (!iwcData.length) 
 return; for (var x = 0; x < iwcData.length; x++)
 {
 var rtfldDataNames = iwcData[x].eventData; var rtfldEvent = iwcData[x].htmlFieldName; $.updateDOMFields(rtfldDataNames, eventDataValues, fDoc); if (rtfldEvent != null)
 { 
 if (rtfldEvent.indexOf("javascript:") == 0) 
 eventFunc = rtfldEvent; else
 eventDataField = fDoc.getElementById(rtfldEvent); }

 if (eventDataField != null)
 {
 var clickEvent = eventDataField.attributes.getNamedItem("onclick"); if (clickEvent && clickEvent.nodeValue != null && 
 (clickEvent.nodeValue).indexOf("cancelBubble") < 0) 
 eventDataField.onclick();  else
 {
 var submitStr = null; if (eventDataField.tagName.toLowerCase() == "a" && typeof eventDataField.href != 'undefined' &&
 eventDataField.href != null && (eventDataField.href).indexOf("javascript:") == 0) 
 submitStr = eventDataField.href;  else if (typeof eventDataField.form != 'undefined' && eventDataField.form != null)
 submitStr = "submitAction_" + eventDataField.form.name + "(document.getElementById('" + rtfldEvent + "').form, '" + rtfldEvent + "');";  if (submitStr != null)
 eval(submitStr); }
 }

 if (eventFunc != null) {
 eval(eventFunc);  } 

 if (iwcData[x].fieldEventType == "F") 
 {
 var refreshBtn = fDoc.getElementById("rfrsh_" + iwcData[x].crefId);  if (refreshBtn == null) 
 {
 if (rtfldDataNames != null && rtfldDataNames != "")
 {
 var refreshParams = $.getRefreshParams(rtfldDataNames, eventDataValues);  if (top.ptalPage && top.ptalPage.ptalPageletArea) 
 top.ptalPage.ptalPageletArea.reloadPagelet(iwcData[x].crefId, "", refreshParams); }
 else
 if (top.ptalPage && top.ptalPage.ptalPageletArea) 
 top.ptalPage.ptalPageletArea.reloadPagelet(iwcData[x].crefId, "", ""); }
 else
 {
 if (rtfldDataNames != null)
 $.refreshWithParams(refreshBtn, rtfldDataNames, eventDataValues); else
 refreshBtn.onclick();  }
 }
 }

 }

 var source_origin = fDoc.location.protocol + "//" + fDoc.location.host; $.accept_message(p_messagehandler, source_origin, 200);};$.getRefreshParams = function(fieldNames, eventDataValues)
{
 var paramStr = ""; var rtfieldNames = fieldNames.split(","); for (var i = 0; i < rtfieldNames.length; i++)
 paramStr = "&" + rtfieldNames[i] + "=" + eventDataValues[i+1]; return paramStr;};$.refreshWithParams = function(refreshBtn, fieldNames, fieldValues)
{
 var refreshParams = $.getRefreshParams(fieldNames, fieldValues);  var refEvent = refreshBtn.attributes.getNamedItem("onclick").nodeValue; var strEventArr = refEvent.split(","); var urlStr = strEventArr[1].replace(/'/g, ""); var newUrlStr = urlStr + refreshParams; var newRefEvent = refEvent.replace(urlStr, newUrlStr); eval(newRefEvent.split(";")[0]);};$.updateDOMFields = function(fieldNames, eventDataValues, fDoc)
{
 var fieldFound = false; var scriptFound = false; var rtfieldNames = fieldNames.split(","); var rtfieldObj = new Array(rtfieldNames.length); var fldName, fldValue, splitFld; var fldLen = eventDataValues.length - 1;  var eventObject; var submitStr;   fldLen = fldLen < rtfieldNames.length ? fldLen : rtfieldNames.length; for (var i = 0; i < fldLen; i++)
 {
 
 splitFld = rtfieldNames[i].split("|"); if (splitFld.length > 1) 
 {
 fldName = splitFld[1]; fldValue = splitFld[0] + "|" + eventDataValues[i+1];  }
 else
 {
 fldName = splitFld[0]; fldValue = eventDataValues[i+1];  }

 
 rtfieldObj[i] = fDoc.getElementById(fldName); if (rtfieldObj[i] && typeof rtfieldObj[i] != 'undefined' && !rtfieldObj[i].disabled)
 {
 $.updateFieldData(rtfieldObj[i], fldValue);    eventObject = rtfieldObj[i].attributes.getNamedItem("onchange");  if (!scriptFound && eventObject != null && eventObject.nodeValue != null)
 {
 submitStr = "submitAction_" + rtfieldObj[i].form.name + "(document.getElementById('" + fldName + "').form, '" + fldName + "');"; scriptFound = true; }
 }
 }

 
 if (scriptFound) 
 eval(submitStr);};$.updateFieldData = function(fieldObject, fieldValue)
{
 if (fieldObject.type == "select")
 {
 for (var i = 0; i < fieldObject.options.length; i++)
 {
 if (fieldObject.options[i].value == fieldValue)
 fieldObject.options[i].selected = true; }
 }
 else
 fieldObject.value = fieldValue.replace(/^\s+|\s+$/g,'') == '' ? '' : fieldValue;  sScript = "addchg_"+ fieldObject.form.name+"(fieldObject);"; eval(sScript); };$.GetFramesWithMessages = function(frames)
{
 if (frames)
 {
 for (var j=0; j < frames.length; ++j)
 {
 p_objFrameArr.push(frames[j]);  if ((!isCrossDomain(frames[j])) && (frames[j].frames))
 $.GetFramesWithMessages(frames[j].frames); } 
 }
};$.removeURLDefaultPort = function(url)
{
 
 var rtnURL = url; var result = url.match(/(\w+):\/\/([\w.]+):*(\d*)\/*(\S*)/);  if (result != null) { 
 var protocol = result[1];  var host = result[2];  var port = result[3]; var path = result[4];   if (typeof port != 'undefined' && port != null && 
 ((port == 80 && protocol.toLowerCase() === "http") ||
 (port == 443 && protocol.toLowerCase() === "https"))) {
 
 if (typeof path != 'undefined' && path != null && path.length != 0)
 rtnURL = protocol + "://" + host + "/" + path; else
 rtnURL = protocol + "://" + host; }
 }
 
 return rtnURL;};$.accept_message = p_accept_message = function( callback, source_origin, delay ) 
{
 if (postMessage_supported) 
 { 
 if ( callback ) 
 { 
 rm_callback && p_accept_message();  rm_callback = function(e) 
 {
 if ( ( typeof source_origin === 'string' && 
 $.removeURLDefaultPort(e.origin).toLowerCase() !== $.removeURLDefaultPort(source_origin).toLowerCase() )
 || ( $.isFunction( source_origin ) && 
 source_origin( e.origin ) === FALSE ) 
 ) 
 {
 
 var targetFrame = top.document.getElementById("ptifrmtgtframe"); if (targetFrame && typeof (targetFrame != 'undefined' ) )
 {
 var targetDoc = targetFrame.contentWindow.document; if (targetDoc && typeof (targetDoc != 'undefined' ))
 {
 var targetOrigin = targetDoc.location.origin; if (targetOrigin && typeof (targetOrigin != 'undefined' ) && e.origin === targetOrigin)
 {
 callback( e ); return; }
 }
 }
 
 var pageletFrame = top.document.getElementById("ptalPgltAreaFrame"); if (pageletFrame && typeof (pageletFrame != 'undefined' ) )
 {
 var pageletDoc = pageletFrame.contentWindow.document; if (pageletDoc && typeof (pageletDoc != 'undefined' ))
 {
 var pageletOrigin = pageletDoc.location.origin; if (pageletOrigin && typeof (pageletOrigin != 'undefined' ) && e.origin === pageletOrigin)
 {
 callback( e ); return; }
 }
 }
 return FALSE; }
 callback( e ); }; }
 
 if (window[addEventListener]) 
 {
 window[ callback ? addEventListener : 'removeEventListener' ]( 'message', rm_callback, FALSE ); } 
 else 
 {
 window[ callback ? 'attachEvent' : 'detachEvent' ]( 'onmessage', rm_callback ); }
 
 } 
 else 
 { 
 
 
 
 
 p_interval_id && clearInterval( p_interval_id ); p_interval_id = null;  if ( callback ) 
 {
 delay = typeof source_origin === 'number' ? source_origin : typeof delay === 'number' ? delay : 100;  p_interval_id = setInterval(function()
 {
 var docHash = document.location.hash,
 re = /^#?\d+&/; if ( docHash !== p_previous_hash && re.test( docHash ) ) {
 p_previous_hash = docHash; callback({ data: docHash.replace( re, '' ) }); }
 }, delay ); }
 }
};$.GenerateMessageEvents = function()
{ 
 if (typeof $.p_message_data == "undefined" || $.p_message_data == null) 
 $.p_message_data = p_message_data;  if (typeof $.p_message_data == "undefined") return; for (var x = 0; x < $.p_message_data.length; x++)
 {
 if ($.p_message_data[x].eventType == "P") 
 {
 $.p_message_data[x].p_message = $.attachEvent(window,
 $.p_message_data[x].eventName, 
 $.p_message_data[x].htmlFieldName, 
 $.p_message_data[x].fieldEventType, 
 $.p_message_data[x].eventData);  $.setDelayedFldPubEvent($.p_message_data[x].htmlFieldName, $.p_message_data[x].p_message); }
 }
 $.p_message_data = null;};$.GenerateMessageEventsTC = function()
{
 p_message_data = top.p_message_data; if (typeof p_message_data == "undefined") return; for (var x = 0; x < p_message_data.length; x++)
 {
 if (p_message_data[x].eventApplied) continue; if (p_message_data[x].eventType == "P") 
 p_message_data[x].p_message = $.attachEvent(window,
 p_message_data[x].eventName, 
 p_message_data[x].htmlFieldName, 
 p_message_data[x].fieldEventType, 
 p_message_data[x].eventData); }
};$.GetMessageFrames = function()
{
 if (top.frames.length)
 $.GetFramesWithMessages(top.frames); p_objFrameArr.push(parent);};$.GenerateEvents = function()
{
 IWCSubscribeServerEvents(); $.GenerateMessageEvents(); $.attachHandler(window);};$.getFunctionName = function(fn) 
{
 if (fn == null) 
 return null; var rgx = /^function\s+([^\(\s]+)/
 var matches = rgx.exec(fn.toString()); return matches ? matches[1] : "(anonymous)"
};$.updateMessageEvents = function(fldName)
{
 
 var lastPos = fldName.lastIndexOf("$"); var occurIdx; var tmpFldName = fldName; if (postMessage_supported)
 $.p_message = sessionStorage.getItem('IWCEvent');  if ($.p_message == null || $.p_message.length == 0)
 {
 
 if (lastPos > 0 && lastPos < (fldName.length -1)) {
 occurIdx = fldName.substring(lastPos+1); if (/^\d+$/.test(occurIdx))
 tmpFldName = fldName.substring(0, lastPos+1);  }

 $.p_message = $.getDelayedFldPubEvent(tmpFldName);  }

 if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") != 0)) 
 {
 var temp_mesg = $.p_message; $.p_message = ""; sessionStorage.setItem('IWCEvent', ''); $.setDelayedFldPubEvent(fldName, "");  eval(temp_mesg); }
 if (typeof p_message_data != "undefined" && p_message_data.length > 0)
 $.GenerateMessageEvents(); };$.updateParentMsgData = function(pWin,fName)
{ 
 if (typeof pWin != 'undefined' && pWin != null && typeof pWin.p_message_data != 'undefined' && pWin.p_message_data != null)
 {
 var iwcEventRcd = $.getFldPubEventData(fName); if (iwcEventRcd && iwcEventRcd.p_message != "")
 {
 for (var x = 0; x < pWin.p_message_data.length; x++) 
 {
 if (fName == pWin.p_message_data[x].htmlFieldName && pWin.p_message_data[x].eventType == "P") 
 pWin.p_message_data[x].p_message = iwcEventRcd.p_message; }
 }
 } 
};$.updatePromptMsgEvent = function(lookUpName)
{ 
 var promptName = (lookUpName.split("$prompt"))[0]; var iwcEventRcd = $.getFldPubEventData(promptName); var messageAfterEvent = ""; var promptFld; var eventOnClick; var eventOnChange;    if (iwcEventRcd && postMessage_supported)
 {
 promptFld = $.getFormField(window.document, promptName, iwcEventRcd.eventData); if (typeof promptFld != 'undefined' && promptFld) { 
 messageAfterEvent = "pm.eventAfterAJAX('" + EscapeJSString(window.name) + "', '" + iwcEventRcd.eventName + "', '" + iwcEventRcd.eventData + "');"
 sessionStorage.setItem('IWCEvent', messageAfterEvent);  }
 }
};$.updateTypeaheadMsgEvent = function(name)
{ 
 var typeaheadName = (name.split("$prompt"))[0]; var iwcEventRcd = $.getFldPubEventData(typeaheadName); var messageAfterEvent = ""; var fld; var eventOnClick; var eventOnChange;   if (sessionStorage != null) {
 $.p_message = sessionStorage.getItem('IWCEvent'); if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") == 0))
 sessionStorage.setItem('IWCEvent', ''); }

 
 if (iwcEventRcd && postMessage_supported)
 {
 fld = $.getFormField(window.document, typeaheadName, iwcEventRcd.eventData); if (typeof fld != 'undefined' && fld) {
 eventOnClick = fld.attributes.getNamedItem("onclick"); eventOnChange = fld.attributes.getNamedItem("onchange");     if ((eventOnChange == null || eventOnChange.nodeValue == null) &&
 (eventOnClick == null || eventOnClick.nodeValue == null))
 {
 messageAfterEvent = "pm.eventAfterTypeahead('" + EscapeJSString(window.name) + "', '" + iwcEventRcd.eventName + "', '" + iwcEventRcd.eventData + "');"
 sessionStorage.setItem('IWCEvent', messageAfterEvent); }
 }
 }
};$.updateEventAfterTypeahead = function()
{
 
 if (postMessage_supported) {
 $.p_message = sessionStorage.getItem('IWCEvent'); if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") == 0)) {
 var temp_mesg = $.p_message; $.p_message = ""; sessionStorage.setItem('IWCEvent', ''); eval(temp_mesg); }
 }
};$.updateEventAfterDatePrompt = function()
{
 
 if (postMessage_supported) {
 $.p_message = sessionStorage.getItem('IWCEvent'); if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") != 0)) {
 var temp_mesg = $.p_message; $.p_message = ""; sessionStorage.setItem('IWCEvent', ''); eval(temp_mesg); }
 }
};})(pm);function IWCRecord (crefId, htmlFldName, eventName, eventType, eventData, fldEventType)
{
this.crefId = crefId;this.htmlFieldName = htmlFldName;this.eventName = eventName;this.eventType = eventType;this.eventData = eventData;this.fieldEventType = fldEventType;this.p_message = " ";};

var glObjTr = {};glObjTr.oGntt= new Object();glObjTr.oMyArray = new Array();glObjTr.sOpen = "";glObjTr.aSource = [];glObjTr.nTm = "";glObjTr.aHash = [];glObjTr.ch127 = String.fromCharCode(127);glObjTr.ch177 = String.fromCharCode(177);glObjTr.chDv = String.fromCharCode(9);glObjTr.dc = "";glObjTr.nLenNd = 0;glObjTr.nLenStr = 0;glObjTr.bUseTopDoc = 0;glObjTr.bCrtCtxMn= 0;glObjTr.occNmb=""; glObjTr.sRALkId=""; glObjTr.oOrgChr=new Object();glObjTr.oRBChr=new Object();glObjTr.oDVT=new Object();glObjTr.oJet=new Object();glObjTr.iType = 4;glObjTr.nDocMode = 7;glObjTr.bEnterKey=false;glObjTr.oFcusItm="";glObjTr.bChrtRtMn=0;glObjTr.bChrtMn=0;glObjTr.nTop = 0;glObjTr.nLeft=0;glObjTr.nChrtScrlTp = 0;glObjTr.nChrtScrlLf=0;glObjTr.nMnMaxLfPs =0;glObjTr.nMnMaxTpPs =0;glObjTr.oInvkRtMenuId ="";glObjTr.bAccessible =false;glObjTr.iParam = 6;glObjTr.sPersSrchDivId ="";glObjTr.sRAId="";glObjTr.findObjTreePT = function (sUCn) {
 for (var s in this.oMyArray) {
 if (this.oMyArray[s].ID == sUCn) {
 break; }
 }
 return this.oMyArray[s];}


glObjTr.addProcTree = function (obj) {
 this.oMyArray.push(obj);}

glObjTr.procTree = function (sUCn) {
 this.ID = sUCn;}


glObjTr.procTree.prototype.crtAssocArray = function (sSrv, nPrm) {
 glObjTr.nLenStr = sSrv.length; var len = 0,
 len1 = 0,
 len2 = 0,
 len3 = 0,
 len4 = 0,
 len5 = 0; var a1 = sSrv.split(glObjTr.chDv + glObjTr.chDv); var nTestNode = 0; var a2, a3, a4, a5, sDdID, sCont, sParId, sCom = "",
 sIndex = ""; var aCont = new Array(); var aTreeStruct = new Array(); len = a1.length; if (len < 2) {
 alert(" the input string is not formated correctly return 0"); }
 for (var i = 0; i < len; i++) {
 if (a1[i].indexOf(glObjTr.chDv) < 0) {
 sDdID = a1[i]; sCont = a1[i + 1]; if (sCont.indexOf(glObjTr.ch127 + glObjTr.ch127) < 0) 
 return 1; len1 = sCont.length; if (sCont.lastIndexOf(glObjTr.ch127 + glObjTr.ch127) + 2 == len1) {
 sCont = sCont.substr(0, len1 - 2); } 
 else
 return 2; a2 = sCont.split(glObjTr.ch127 + glObjTr.ch127); len2 = a2.length; for (var p = 0; p < len2; p++) {
 a3 = a2[p].split(glObjTr.chDv); if (a3.length != 2) 
 return 3; sParId = a3[0]; sCont = a3[1]; sIndex = sDdID + glObjTr.ch127 + sParId; aTreeStruct[sIndex] = []; if (sCont.indexOf(',') < 0) 
 return 4; aCont.length = 0; a4 = sCont.split(glObjTr.ch127); len4 = a4.length; nTestNode = nTestNode + len4; for (var w = 0; w < len4; w++) {
 a5 = a4[w].split(','); len5 = a5.length; if (len5 < nPrm) 
 return 5; if (len5 > nPrm) 
 a5.length = nPrm; aTreeStruct[sIndex].push(a5); }
 }
 } 
 else {
 continue; }
 }
 glObjTr.nLenNd = nTestNode; return aTreeStruct;}


glObjTr.changeBkg = function (o) {
 if (o.className == "PT_ORG_ACTION_BG") 
 o.className = "PT_ORG_ACTION_HVR_BG"; else if (o.className == "PT_ORG_ACTION_HVR_BG") 
 o.className = "PT_ORG_ACTION_BG";}


glObjTr.showActionMenu = function () {
 var argv = this.showActionMenu.arguments; var sParentId = argv[0]; var nLeft = argv[1]; var nTop = argv[2]; var nParametrs = argv[3]; var nType = argv[4];  var sSrcStr = argv[5]; var sId = argv[6]; var sNId = ""; var nDescr = ""; glObjTr.iParam =parseInt(nParametrs); glObjTr.iType = parseInt(nType);  if (glObjTr.iType < 3) {
 sNId = argv[7]; nDescr = argv[8]; }

 var sCntr = sParentId; var index = sParentId.indexOf("$$"); if (index > 1) {
 var temp; temp = sParentId.substring(0, sParentId.indexOf('$')); sCntr = temp; }

 glObjTr.sPersSrchDivId =""
 var indexSearch= sParentId.indexOf("relatedActionsPers"); if (indexSearch > -1) {
 glObjTr.bUseTopDoc = 1; glObjTr.nDocMode = window.top.document.documentMode; }
 else {
 glObjTr.bUseTopDoc = 0; }

 if(glObjTr.bUseTopDoc)
 {
 if (sParentId.indexOf("relatedActionsPersGbl") > -1)
 {
 glObjTr.sPersSrchDivId="ptabndata_GBL"; }
 else
 {
 var oOpen = window.top.document.getElementById(sParentId); while (oOpen) 
 {
 oOpen = oOpen.parentNode; var sTmpId=oOpen.id; if (sTmpId.indexOf("ptabndata_") > -1)
 {
 glObjTr.sPersSrchDivId=sTmpId; break; }
 }
 }
 }

 if (this.isEmpty(glObjTr.nDocMode)) { 
 glObjTr.nDocMode=7; }
 var oProcTree = new glObjTr.procTree(sCntr); glObjTr.addProcTree(oProcTree); var oOrgMn = glObjTr.findObjTreePT(sCntr); glObjTr.aHash = oOrgMn.crtAssocArray(sSrcStr, nParametrs); var oBr = new PT_browserInfo(); oBr.init(); var bIEBr = oBr.isIE;  var sAct="click"; if(oBr.isiPad){
 sAct="touchstart"; }
 var sNdDscCtr = "";  if (glObjTr.iType < 3) {
 sNdDscCtr = sNId + "$" + nDescr; }
 var sNewRootMnID = sCntr + "$$" + unescape(sId) + this.ch127 + "#rt#" + "$" + sNdDscCtr; if (glObjTr.sOpen != "") {
 var oOpen; if (!glObjTr.bUseTopDoc)
 oOpen = document.getElementById(glObjTr.sOpen); else
 oOpen = window.top.document.getElementById(glObjTr.sOpen); if (this.isEmpty(oOpen)) {
 if ((glObjTr.sOpen == sNewRootMnID) && (glObjTr.iType > 2)) {
 glObjTr.sOpen = ""; return;  }
 glObjTr.sOpen = ""; }
 }
 if (glObjTr.sOpen != "") { 
 if (!this.removePrevMenu(sNewRootMnID,1)) {
 glObjTr.sOpen = ""; return;  }
 glObjTr.sOpen = sNewRootMnID; } 
 else if (glObjTr.sOpen == "") 
 glObjTr.sOpen = sNewRootMnID; if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 glObjTr.bChrtMn=1; glObjTr.nTop = nTop; glObjTr.nLeft=nLeft; }

 glObjTr.bAccessible=glObjTr.bEnterKey; var sIdI = "#rt#"; var sIdCh = ""; var o = ""; this.createMenu(sId, sParentId, nType, sIdI, sIdCh, sNId, nDescr, nLeft, nTop, bIEBr, o); if (glObjTr.iType > 2){
 glObjTr.bCrtCtxMn=1; }

 if(!glObjTr.bUseTopDoc){
 ptEvent.add(document, sAct, glObjTr.removePrevMenu,true); }
 else{
 ptEvent.add(window.top.document, sAct, glObjTr.removePrevMenu,true); }

}


glObjTr.createMenu = function (sIdEsc, sParentId, nType, sIdIEsc, sIdCh, sNId, nDescr, nLeft, nTop, bIE, o) {
 if (!(this.isEmpty(o))) 
 o.blur(); var sId = unescape(sIdEsc); var sCntr = sParentId; var index = sParentId.indexOf("$$"); if (index > 1) {
 var temp; temp = sParentId.substring(0, sParentId.indexOf('$')); sCntr = temp; }
 var sNdDscCtr = ""; var sIdI=sIdIEsc; if (glObjTr.iType < 3) {
 sNdDscCtr = sNId + "$" + nDescr;  sIdI=unescape(sIdIEsc); }
 var sSearch = ""; sSearch = sId + this.ch127 + sIdI; var aLoc = glObjTr.aHash[sSearch]; var len = aLoc.length; var aDescr = new Array(); var aClass = new Array(); var aIdItem = new Array(); var aFolder = new Array(); var aULPar = new Array(); var aTypePar = new Array(); var aTltip = new Array(); var MyCommaRegEx = new RegExp(this.ch177, "g"); var MyCommaEncRegEx = new RegExp("&#44;","g"); for (var a = 0; a < len; a++) {
 var aItem = new Object(); aItem = aLoc[a]; aItem[0] = aItem[0].replace(MyCommaRegEx, ","); aItem[2] = aItem[2].replace(MyCommaRegEx, ","); aItem[2] = aItem[2].replace(MyCommaEncRegEx, ","); aIdItem.push(aItem[0]); aClass.push(aItem[1]); aDescr.push(aItem[2]); if (glObjTr.iType > 2) 
 {
 aItem[3] = aItem[3].replace(MyCommaRegEx, ","); aULPar.push(aItem[3]); aTypePar.push(aItem[4]); }
 if(glObjTr.iParam>5)
 {
 aItem[5] = aItem[5].replace(MyCommaRegEx, ","); aTltip.push(aItem[5]); }
 var Mystr = sId + this.ch127 + aItem[0]; if (glObjTr.aHash.isParent(Mystr)) 
 aFolder.push("1"); else
 aFolder.push("0"); }
 if (sIdCh != "") 
 {
 var oParnt; if (!glObjTr.bUseTopDoc)
 oParnt = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); else
 oParnt = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); if (oParnt) {
 var oParOfParnt = oParnt.parentNode; var nlCh = oParOfParnt.children.length; for (var j = 0; j < nlCh; j++) {
 oParOfParnt.children[j].className = "PT_ORG_ACTION_BG"; }
 oParnt.className = "PT_ORG_ACTION_SLCT_BG"; nTop = oParnt.offsetTop + 6; if (!nTop) 
 nTop = 1; if(glObjTr.iType == 4)
 {
 nLeft = oParnt.offsetWidth -5; }
 else
 {
 nLeft = oParnt.offsetLeft + oParnt.offsetWidth - 5; }
 }
 }
 var sIdLvl = sCntr + "$$" + sId + this.ch127 + sIdI; var oDiv; if (!glObjTr.bUseTopDoc)
 oDiv = document.getElementById(sIdLvl); else 
 oDiv = window.top.document.getElementById(sIdLvl); if (oDiv && oDiv.parentNode) {
 var oParTr; if (!glObjTr.bUseTopDoc)
 oParTr = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); else
 oParTr = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); if (oParTr) {
 oParTr.className = "PT_ORG_ACTION_HVR_BG"; }
 oDiv.parentNode.removeChild(oDiv); if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 checkController(sCntr); this.moveMenuVisible(sCntr); } 

 return; }

 var oMainObj; if (!glObjTr.bUseTopDoc)
 oMainObj=document.getElementById(sParentId); else
 oMainObj=window.top.document.getElementById(sParentId); if (!glObjTr.bUseTopDoc) 
 var MyList = document.createElement("DIV"); else 
 var MyList = window.top.document.createElement("DIV"); if(nType==4 && glObjTr.bUseTopDoc) {
 var oMainObjDiv=oMainObj.parentNode; oMainObj=oMainObjDiv; }
 
 if((nType==3)||(nType==6)||((nType==4)&&(!glObjTr.bUseTopDoc))) { 
 oMainObj=document.body; }

 if (sIdCh == "") {
 MyList.id = sCntr + "$$" + sId + this.ch127 + sIdI + "$" + sNdDscCtr; } 
 else {
 MyList.id = sCntr + "$$" + sId + this.ch127 + sIdI; }
 MyList.className = "RADIUS_DROPDOWN_CORNER SHADOW_DROPDOWN"; if ((glObjTr.iType > 2)&&(glObjTr.iType < 5)) 
 {
 MyList.className = "RADIUS_MENU_DROPDOWN_CORNER SHADOW_MENU_DROPDOWN"; }

 MyList.style.textAlign = "left";  MyList.style.position = "absolute"; MyList.style.top = nTop + "px"; if(glObjTr.iType == 4)
 {
 MyList.setAttribute('SMN', "1"); if(sIdCh == "")
 {
 MyList.style.left = nLeft + "px"; }
 else 
 {
 MyList.style.right = nLeft + "px"; }
 }
 else
 {
 MyList.style.left = nLeft + "px"; }
 
 MyList.style.zIndex = 12000; MyList.style.cursor = "default"; if (glObjTr.sOpen == "") {
 alert("Root menu id is not set?"); return; }

 MyList.setAttribute('PSMNU', glObjTr.sOpen); var ariaLabel= "" ; var regExp = /^win\d+div/; var formContainerName = ""; if (sParentId) 
 {
 formContainerName = regExp.exec(sParentId); }
 if(glObjTr.oInvkRtMenuId)
 {
 if(formContainerName)
 ariaLabel = glObjTr.oInvkRtMenuId +"_"+ formContainerName;  else
 ariaLabel = glObjTr.oInvkRtMenuId ; }

 MyList.setAttribute('role', "presentation"); MyList.setAttribute('aria-labelledby', ariaLabel); var sMyInnerHTML = ""; sMyInnerHTML += "<table class=\'PTCPRCMENUTABLE\' role=\'menu\' SMN=1 cellspacing=\'0px\' cellpadding=\'0px\' border=0 style=\'border-collapse:collapse;margin-top:8px;margin-bottom:10px; "; sMyInnerHTML += "\'>";  var sVal = ""; var sIdIt = ""; var bCloseWindow = false; var sClassIt = "PT_ACTION_LIST_ITEM"; var nListLen = aDescr.length; var sPrevHeading = ""; for (var f = 0; f < nListLen; f++) {
 sClassIt = aClass[f]; sIdIt = aIdItem[f]; if (glObjTr.iType < 3) {
 sIdIt = escape(aIdItem[f]); }
 sTrClass = "PT_ORG_ACTION_BG"; var sTrId = sCntr + "$$" + sSearch + "$" + sIdIt; var sTooltiptxt=""; if(glObjTr.iParam>5)
 {
 sTooltiptxt=aTltip[f]; }
 if ((aDescr[f] == "--") || (aTypePar[f] == "S")) 
 {

 sMyInnerHTML += "</tbody></table><table class=\'PTCPRCMENUTABLE\' role=\'menu\' SMN=1 cellspacing=\'0px\' cellpadding=\'0px\' border=0 style=\'border-collapse:collapse;margin-top:8px;margin-bottom:10px; "; sMyInnerHTML += "\'>"; sMyInnerHTML += "<tr MSG=1 role=\"presentation\" onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " >";  sMyInnerHTML += "<th class='PTCPRCMENUSEPERATORTH' role=\"presentation\" colspan=2><hr class='PTCPRCMENUSEPERATORHR' role=\"presentation\" color='#BBBBBB'></th>"; sMyInnerHTML += "</tr>"; } 
 else if (aTypePar[f] == "H") 
 {
 if ((this.isEmpty(sClassIt))) {
 sClassIt = "PT_MENU_ACTION_LISTHEAD"; }
 sMyInnerHTML += "<tr MSG=1 role=\'presentation\' onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " ><td MSG=1 role=\'presentation\' style=\cursor:default;\'><div MSG=1 role=\'presentation\' id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default;\' class=\'" + sClassIt + "\'>";  sVal = aDescr[f]; if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; sPrevHeading = " of " + sVal+" submenu"; sMyInnerHTML += "</div></td>"; if (browserInfoObj2.isiPad && !bCloseWindow && glObjTr.iType>2){ 
 sMyInnerHTML += "<td><div role=\'button\' class='ptipadclosemenu' style=\"float:right; display:inline; padding-right:10px\" onclick='CloseContextMenuHandler();' aria-label=\'Close\'></div></td>"; bCloseWindow = true; }
 sMyInnerHTML += "</tr>"; } 
 else if (aTypePar[f] == "M") 
 {
 if ((this.isEmpty(sClassIt))) {
 sClassIt = "PT_MENU_ACTION_LISTITEM"; }
 sMyInnerHTML += "<tr MSG=1 onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " ><td MSG=1 style=\cursor:default;\'><div MSG=1 id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default;\' class=\'" + sClassIt + "\'>"; sVal = aDescr[f]; if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; sMyInnerHTML += "</div></td></tr>"; } 
 else if (aTypePar[f] == "N")
 {
 if (this.isEmpty(sClassIt)) {
 sClassIt = "PT_ACTION_LIST_ITEM"; if ((glObjTr.iType>2)&& (glObjTr.iType<5))
 {
 sClassIt = "PT_MENU_ACTION_LISTITEM"; if ((sIdCh == "") && (nType == "3")) 
 sClassIt = "PT_MENU_ACTION_LISTITEM_L0"; }
 }
 sMyInnerHTML += "<tr MSG=1 onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " STP=\'"+sTooltiptxt+"\'" +"\' onmouseover=\'glObjTr.getDescTooltip(this, event);\' onmouseout=\'glObjTr.closeDescTooltip(this);\'><td MSG=1 style=\cursor:default;\'><div MSG=1 id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default; color:Grey;\' class=\'" + sClassIt + "\'>"; sVal = aDescr[f]; if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; sMyInnerHTML += "</div></td></tr>"; } 
 else 
 {
 if (nType == "1") 
 {
 if (this.isEmpty(sClassIt)) {
 sClassIt = "PT_READONLY_LIST_ITEM"; }
 sMyInnerHTML += "<tr id=" + sTrId + " class=\'" + sTrClass + "\' ddbrd=\"1\" style=\'margin:0px;padding:0px;\' onclick=\'glObjTr.preventEventPropagation(event);\' onmouseover=\'glObjTr.changeBkg(this);\' onmouseout=\'glObjTr.changeBkg(this);\'><td ddbrd=\"1\" style=\'border-top:0px;margin:0px;padding:0px;align:top;\'><div ddbrd=\"1\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default;padding-top:0px;valign:top;\' class=\'" + sClassIt + "\'"
 if (aFolder[f] == "0") 
 {
 sMyInnerHTML += " >"; } 
 else 
 {
 sMyInnerHTML += " onmousedown=\"glObjTr.createMenu(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+", this);\">"; }
 } 
 else 
 {
 if (this.isEmpty(sClassIt)) {
 sClassIt = "PT_ACTION_LIST_ITEM"; if ((glObjTr.iType>2)&& (glObjTr.iType<5))
 {
 sClassIt = "PT_MENU_ACTION_LISTITEM"; if ((sIdCh == "") && (nType == "3")) 
 sClassIt = "PT_MENU_ACTION_LISTITEM_L0"; }
 }
 if (aFolder[f] == "0") 
 {
 sMyInnerHTML += "<tr SMN=1 role=\'presentation\' id=" + sTrId + " STP=\'"+sTooltiptxt+"\'" + " style=\'margin:0px;padding:0px;\' class=\'" + sTrClass + "\' onmouseover=\'glObjTr.getDescTooltip(this, event);\' onmouseout=\'glObjTr.closeDescTooltip(this);\'><td  role=\'presentation\' style=\'border-top:0px;margin:0px;padding:0px;align:top;cursor:pointer;\'><div SMN=1 role=\'presentation\' id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:pointer;padding-top:0px;valign:top;\' class=\'" + sClassIt + "\'"
 if (nType == "2") {
 sMyInnerHTML += " onmousedown=\"MainLink(\'ddb" + chM + nDescr + chM + sIdIt + "\',\'" + sNId + "\',\'" + sCntr + "\');\" >"; sMyInnerHTML += "<a href=\"#\" role=\"menuitem\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTATAG" + f + "$$0\' style=\"text-decoration:none; color:#000000;display:block;\""; sMyInnerHTML +=" aria-label=\'" + aDescr[f] + " " + sPrevHeading + "\'"
 sMyInnerHTML += " onkeydown=\"glObjTr.keyDwn(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sIdCh + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this, event);\" onclick=\"javascript:MainLink(\'ddb" + chM + nDescr + chM + sIdIt + "\',\'" + sNId + "\',\'" + sCntr + "\'\);\">"; } 
 else {
 sMyInnerHTML += ">"; if (aULPar[f] == "") {
 aULPar[f] = "javascript:void(0)"; }
 sMyInnerHTML += "<a SMN=1 href=" + aULPar[f] + " role=\"menuitem\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTATAG" + f + "$$0\' style=\"text-decoration:none; color:#000000; display:block;\""; sMyInnerHTML +=" aria-label=\'" + aDescr[f] + " " + sPrevHeading + "\'"
 sMyInnerHTML +=" onkeydown=\"glObjTr.keyDwn(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sIdCh + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this, event);\" >";  }
 } 
 else 
 {
 sMyInnerHTML += "<tr SMN=1 role=\'presentation\' onclick=\"glObjTr.preventEventPropagation(event);\" AC=1 FD=1 id=" + sTrId + " STP=\'"+sTooltiptxt+"\'" +" style=\'margin:0px;padding:0px;\' class=\'" + sTrClass + "\' onmouseover=\'glObjTr.getDescTooltip(this);\' onmouseout=\'glObjTr.closeDescTooltip(this);\'><td SMN=1 AC=1 FD=1 role=\'presentation\' style=\'border-top:0px;margin:0px;padding:0px;align:top;cursor:pointer;\'><div AC=1 FD=1 role=\'presentation\' id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:pointer;padding-top:0px;valign:top;\' class=\'" + sClassIt + "\'"
 sMyInnerHTML += " >"; sMyInnerHTML += "<a SMN=1 AC=1 FD=1 href=\"#\" aria-haspopup=\"true\" role=\"menuitem\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTATAG" + f + "$$0\' ATG=\"1\" style=\"text-decoration:none; color:#000000;display:block;\"";  sMyInnerHTML +=" aria-label=\'" + aDescr[f] + " " + sPrevHeading + "\'"
 sMyInnerHTML +=" onkeydown=\"glObjTr.keyDwn(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sIdCh + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this, event);\" onclick=\"glObjTr.createMenu(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this);\">";  }
 }
 sVal = escape(aDescr[f]); if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; if (nType != "1") 
 {
 sMyInnerHTML += "</a>"; }
 sMyInnerHTML += "</div></td>"; sMyInnerHTML += "<td role=\'presentation\' AC=1 style=\'border-top:0px;margin:0px;padding:0px;align:top;cursor:pointer;\'>"; if (aFolder[f] == "1") 
 {
 if(glObjTr.iType == 4)
 {
 sMyInnerHTML += "<div SMN=1 AC=1>"; sMyInnerHTML += "<a AC=1 SMN=1 aria-label=\"Left Arrow\" class='ptrcfmenuleftarrow' href=\"#\" style=\"text-decoration:none; pointer-events:all; display:block;\" onclick=\"glObjTr.createMenu(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this);\">"; }
 else
 {
 sMyInnerHTML += "<div SMN=1 AC=1>"; sMyInnerHTML += "<a AC=1 SMN=1 aria-label=\"Right Arrow\" class='ptactmenurightarrow' href=\"#\" style=\"text-decoration:none; pointer-events:all; display:block;\" onclick=\"glObjTr.createMenu(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this);\">"; }
 }
 else
 {
 sMyInnerHTML += "<div role=\'presentation\' SMN=1 AC=1>"; if(!glObjTr.bAccessible)
 {
 if(nType=="2")
 sMyInnerHTML += "<a AC=1 href=\"#\" style=\"text-decoration:none; display:block;\" onclick=\"javascript:MainLink(\'ddb" + chM + nDescr + chM + sIdIt + "\',\'" + sNId + "\',\'" + sCntr + "\'\);\">"; else if(glObjTr.iType>2)
 sMyInnerHTML += "<a SMN=1 AC=1 href=" + aULPar[f] + " style=\"text-decoration:none; display:block;\">"; }
 }
 if(!glObjTr.bAccessible)
 {
 if (nType != "1")
 {
 sMyInnerHTML += "</a>"; } 
 }
 sMyInnerHTML += "</div>"; sMyInnerHTML += "</td></tr>"; }
 }
 sMyInnerHTML += "</table>"; MyList.align = "center"; MyList.innerHTML = sMyInnerHTML; if (sIdCh != "") {
 if (sIdCh == "#rt#") {
 if (!glObjTr.bUseTopDoc)
 oMainObj = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sNdDscCtr); else
 oMainObj = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sNdDscCtr); } 
 else {
 if (!glObjTr.bUseTopDoc)
 oMainObj = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh); else
 oMainObj = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh); }
 }

 var oDivToolTip; if (!glObjTr.bUseTopDoc)
 oDivToolTip=document.getElementById("Mnt"); else
 oDivToolTip=window.top.document.getElementById("Mnt"); if(!(this.isEmpty(oDivToolTip)))
 {
 var oPar=oDivToolTip.parentNode; oPar.removeChild(oDivToolTip); }

 var oLast = oMainObj.lastChild; if (!(this.isEmpty(oLast))) {
 if (oLast.tagName == "DIV") {
 var sI = oLast.id; if (!sI.indexOf(sCntr + "$$" + sId + this.ch127)) {
 oMainObj.removeChild(oLast); }
 }
 }
 oMainObj.appendChild(MyList); for (f = 0; f < nListLen; f++) {
 if (nType != "1") 
 {
 var olistItem; if (!glObjTr.bUseTopDoc)
 olistItem = document.getElementById(sCntr + "$" + sIdI + "$DDBLSTATAG" + f + "$$0"); else
 olistItem = window.top.document.getElementById(sCntr + "$" + sIdI + "$DDBLSTATAG" + f + "$$0"); }
 if (nType == "1") 
 {
 var olistItem; if (!glObjTr.bUseTopDoc)
 olistItem = document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID" + f + "$$0"); else
 olistItem = window.top.document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID" + f + "$$0"); }
 sDesc = aDescr[f]; if ((olistItem) && (!(this.isEmpty(sDesc)))) {
 if (bIE) {
 var oldText = olistItem.innerText; olistItem.innerText = unescape(oldText); } 
 else {
 var oldText = olistItem.textContent; olistItem.textContent = unescape(oldText); }
 }
 }
 if (glObjTr.iType == 3)
 {
 this.adjustMenu(MyList); }

 
 var mId = MyList.id; var oTreeMenu; var oTreeMenu; if (!glObjTr.bUseTopDoc)
 oTreeMenu = document.getElementById(mId); else 
 { 
 oTreeMenu = window.top.document.getElementById(mId); } 


 if((glObjTr.iType == 4)&& !(this.isEmpty(oTreeMenu)))
 {
 if(sIdCh == "")
 {
 var nTreeMenuWidth=oTreeMenu.offsetWidth; oTreeMenu.style.left = nLeft -nTreeMenuWidth - 8 + "px"; }
 this.adjustSearchMenu(oTreeMenu); }



 
 var oFirsListItem;  if (!glObjTr.bUseTopDoc)
 oFirsListItem = document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID0" + "$$0"); else
 oFirsListItem = window.top.document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID0" + "$$0");  if ((glObjTr.bEnterKey)&&(!this.isEmpty(oFirsListItem)))
 {
 while(oFirsListItem.getAttribute("MSG"))
 {
 var oNextItem = bIE? (oFirsListItem.parentNode.parentNode).nextSibling : (oFirsListItem.parentNode.parentNode).nextElementSibling;  if(this.isEmpty(oNextItem))
 break; oFirsListItem=oNextItem.childNodes[0].childNodes[0]; } 

 if(!(this.isEmpty(oFirsListItem))) 
 {
 var oFcsItem=oFirsListItem.childNodes[0]; glObjTr.bEnterKey=false;  setTimeout(function(){glObjTr.setFcsItm(oFcsItem);},100);  }
 }

 if ((glObjTr.iType < 3)||(glObjTr.iType ==5))
 {
 glObjTr.bChrtMn=1; if (sIdCh == "") 
 {
 glObjTr.bChrtRtMn=1; }
 checkController(sCntr);  var oMainChart=document.getElementById(sCntr+"$OR1C$$0"); var oRoundTreeMenu = document.getElementById(mId); var myOrgChart=glObjTr.oOrgChr[sCntr]; var nTpPgltCh1C=0; if(myOrgChart.nPglt<1)
 {
 nTpPgltCh1C=oMainChart.offsetTop; }
 else
 nTpPgltCh1C=myOrgChart.PgltTop(oMainChart, 0); var nMnTpPos=GetElementTop(oRoundTreeMenu)+oRoundTreeMenu.offsetHeight-nTpPgltCh1C+10; var nMnLfPos=GetElementleft(oRoundTreeMenu)+oRoundTreeMenu.offsetWidth-oMainChart.offsetLeft+10; glObjTr.nMnMaxLfPs=nMnLfPos; if (sIdCh == "") 
 {
 glObjTr.nMnMaxTpPs =nMnTpPos; }
 if(nMnTpPos>glObjTr.nMnMaxTpPs)
 {
 glObjTr.nMnMaxTpPs=nMnTpPos;  }

 this.moveMenuVisible(sCntr); } 

}

glObjTr.setFcsItm = function (oItem) {
 if(oItem && oItem.focus) oItem.focus(); }


glObjTr.removePrevMenu = function (sIdOpn,bF) {
 var oBr = new PT_browserInfo(); oBr.init(); var bIE = oBr.isIE; var sAct="click"; var bFlag=glObjTr.isEmpty(bF)?0:bF; if(oBr.isiPad){ 
 
 if(!bFlag&&((glObjTr.isEmpty(event)||(event.type!="touchstart")||(event.touches&&event.touches.length>1) || 
 (typeof(event.target.className) != 'undefined' && event.target.className != "ptipadclosemenu"))))
 return;  sAct="touchstart";  } 


 if (((typeof sIdOpn == "object")||(glObjTr.isEmpty(sIdOpn))))
 {
 var ev = !bIE ? sIdOpn : event; if (glObjTr.isEmpty(ev) && glObjTr.bUseTopDoc) {
 ev=sIdOpn; }
 var Mysource = !bIE ? ev.target : ev.srcElement; if(!Mysource.getAttribute)
 {
 return; }
 if(bIE && ((glObjTr.iType==4)|| (glObjTr.iType==6)|| (glObjTr.iType==3))&&(Mysource.getAttribute("FD")) && 
 typeof(ev) != "undefined" && ev && typeof(ev.preventDefault) != "undefined" && ev.preventDefault)
 {
 ev.preventDefault();  }
 var nKey=ev.keyCode; if ((Mysource.getAttribute("AC"))&&(nKey!=27)&&(!Mysource.getAttribute("SMN"))) {
 return; }
 
 if ((Mysource.getAttribute("AC"))&&(ev.type=='click')&&(Mysource.getAttribute("SMN"))) { 
 return; }
 }
 var elmns; if (!glObjTr.bUseTopDoc)
 elmns = document.getElementsByTagName("DIV"); else 
 elmns = window.top.document.getElementsByTagName("DIV");  var nLelm = elmns.length; var sOpner = ""; var bRet = 1; if (nLelm) {
 for (var K = 0; K < nLelm; K++) {
 if (elmns[K].getAttribute("PSMNU")) {
 sOpner = elmns[K].getAttribute("PSMNU"); if (sOpner === sIdOpn) {
 bRet = 0; }
 var sMid = elmns[K].id; elmns[K].parentNode.removeChild(elmns[K]); glObjTr.sOpen = ""; if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 var sCntr=sMid.substring(0,sMid.indexOf('$')); checkController(sCntr); glObjTr.moveMenuVisible(sCntr); var oMainObj=document.getElementById(sCntr+"$OR1C$$0"); oMainObj.scrollTop=glObjTr.nChrtScrlTp; oMainObj.scrollLeft=glObjTr.nChrtScrlLf; glObjTr.nChrtScrlTp =0; glObjTr.nChrtScrlLf=0; } 

 break; }
 }
 glObjTr.bCrtCtxMn=0; glObjTr.bChrtMn=0; glObjTr.nTop = 0; glObjTr.nLeft=0; glObjTr.sRALkId=""; if(!glObjTr.bUseTopDoc){
 ptEvent.remove(document, sAct, glObjTr.removePrevMenu,true); }
 else{
 ptEvent.remove(window.top.document, sAct, glObjTr.removePrevMenu,true); if (glObjTr.sOpen == "" && sOpner.indexOf("relatedActionsPersGbl") >= 0) {
 glObjTr.sOpen = sOpner;  }
 }

 
 
 

 if(!glObjTr.isEmpty(glObjTr.sRAId))
 {
 var oRtmenuParentObj=document.getElementById(glObjTr.sRAId); if(!glObjTr.isEmpty(oRtmenuParentObj))
 {
 oRtmenuParentObj.focus(); glObjTr.sRAId=""; }
 }
 var objFrame = window; objFrame.document.oncontextmenu="return true"; return bRet; } 
 else {
 glObjTr.bCrtCtxMn=0;  glObjTr.bChrtMn=0; glObjTr.nTop = 0; glObjTr.nLeft=0; glObjTr.sRALkId=""; if(!glObjTr.bUseTopDoc){
 ptEvent.remove(document, sAct, glObjTr.removePrevMenu,true); }
 else{
 ptEvent.remove(window.top.document, sAct, glObjTr.removePrevMenu,true); }

 if((!glObjTr.isEmpty(glObjTr.oInvkRtMenuId))&&(glObjTr.bAccessible))
 {
 var oRtmenuParentObj=document.getElementById(glObjTr.oInvkRtMenuId); if(!glObjTr.isEmpty(oRtmenuParentObj))
 {
 oRtmenuParentObj.focus(); glObjTr.oInvkRtMenuId=""; }
 }
 return bRet; }
}



function getScrollXY() {
 var scrOfX = 0, scrOfY = 0; if( typeof( window.pageYOffset ) == 'number' ) {
 
 scrOfY = window.pageYOffset; scrOfX = window.pageXOffset; } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
 
 scrOfY = document.body.scrollTop; scrOfX = document.body.scrollLeft; } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
 
 scrOfY = document.documentElement.scrollTop; scrOfX = document.documentElement.scrollLeft; }
 return [ scrOfX, scrOfY ];}



glObjTr.adjustMenu = function (menuEle) {
 var menuHeight = menuEle.offsetHeight; var menuWidth = menuEle.offsetWidth; var scrollLeftTop = getScrollXY(); var e = menuEle; var x = 0, y = 0;  while(e) {
 x += e.offsetLeft || 0; y += e.offsetTop || 0; e = e.offsetParent; }


 menuEle.style.display = "none";   var docHeight = ptCommonObj2.getViewportHeight(); var docWidth = ptCommonObj2.getViewportWidth(); var tWidth = menuWidth; var mParent = menuEle.parentNode; var isSecondLevel = false; var parentTop = 0; var parentLeft = 0;   if(mParent && mParent.className.indexOf("SHADOW_MENU_DROPDOWN") != -1) {
 tWidth += mParent.offsetWidth; isSecondLevel = true; tParent = mParent.parentNode; if(tParent && tParent.className.indexOf("SHADOW_MENU_DROPDOWN") != -1) {
 parentTop = parseInt(tParent.style.top); parentTop = -tParent; } else {
 parentTop = parseInt(mParent.style.top); parentTop = -parentTop; }
 
 parentLeft = parseInt(mParent.style.left); parentLeft = -parentLeft; }

 if ("ltr" !== "ltr")
 {
 if(!isSecondLevel) {
 x = x-menuWidth; menuEle.style.left = x + "px"; } else {
 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); x = tLeft - (tWidth-5); menuEle.style.left = x + "px"; }
 }

 
 
 if ("ltr" === "ltr") {
 if(x + menuWidth + 20 > docWidth) {
 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); x = tLeft - (tWidth-5); if(x < 3 && !isSecondLevel)
 x = 3; else {
 if(x < parentLeft)
 x = x + (-parseInt(mParent.style.left) - x); }
 menuEle.style.left = x + "px"; }
 } else {
 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); if(tLeft < 0 && !isSecondLevel) {
 tLeft = parseInt(tLeft) + (tWidth+5); menuEle.style.left = tLeft + "px"; }
 }

 
 if(!isSecondLevel) {
 if(scrollLeftTop[1] <= 0 && (y + menuHeight) > docHeight) {
 var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); y = tTop - menuHeight; if(y < 3)
 y = 3; menuEle.style.top = y + "px"; } else if((y + menuHeight + scrollLeftTop[1] + 20) > (docHeight + scrollLeftTop[1])) {
 y = y - menuHeight; if(y < 3)
 y = 3; menuEle.style.top = y + "px"; } else if(scrollLeftTop[1] > 0)
 menuEle.style.top = y + "px"; } else {
 if((scrollLeftTop[1] <= 0 && (y + menuHeight) > docHeight) || (y + menuHeight) > (docHeight + scrollLeftTop[1])) {
 var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); y = tTop - menuHeight; if(y < parentTop)
 y = y + (-parseInt(mParent.style.top) - y); menuEle.style.top = y + "px"; }
 }
 menuEle.style.display = "";}



glObjTr.adjustSearchMenu = function (menuEle) {
 if(glObjTr.iType != 4)
 return; var menuHeight = menuEle.offsetHeight; var menuWidth = menuEle.offsetWidth; var scrollLeftTop = getScrollXY(); var e = menuEle; var x = 0, y = 0; var xPerSrch=0, yPerSrch=0, yPerSrchH, yPerSrchScrllH, yPerSrchScrllTp;  while(e) {
 x += e.offsetLeft || 0;  y += e.offsetTop || 0; e = e.offsetParent; }

 if(glObjTr.bUseTopDoc)
 {
 var oPersSrchDiv; if(!(glObjTr.isEmpty(glObjTr.sPersSrchDivId)))
 {
 oPersSrchDiv=window.top.document.getElementById(glObjTr.sPersSrchDivId); if(!(glObjTr.isEmpty(oPersSrchDiv)))
 {
 yPerSrchH=oPersSrchDiv.offsetHeight; yPerSrchScrllH=oPersSrchDiv.scrollHeight; yPerSrchScrllTp=oPersSrchDiv.scrollTop; }
 while(oPersSrchDiv) 
 {
 xPerSrch += oPersSrchDiv.offsetLeft || 0;  yPerSrch += oPersSrchDiv.offsetTop || 0; oPersSrchDiv = oPersSrchDiv.offsetParent; }
 }
 } 

 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); var tRight = menuEle.style.right; tRight = tRight.substr(0, tRight.length -2);  menuEle.style.display = "none";   var docHeight = ptCommonObj2.getViewportHeight(); var docWidth = ptCommonObj2.getViewportWidth(); var tWidth = menuWidth; var mParent = menuEle.parentNode; var bRtMenu=true;   if(mParent && mParent.className.indexOf("SHADOW_MENU_DROPDOWN") != -1) 
 {
 bRtMenu=false; }

 
 if(!bRtMenu)
 {
 if(glObjTr.bUseTopDoc)
 {
 if(x <xPerSrch) 
 {
 menuEle.style.right = tRight-menuWidth -20 + "px"; }
 }
 else
 {
 if(x <scrollLeftTop[0]) 
 {
 menuEle.style.right = tRight-menuWidth -30 + "px"; }
 }
 }

 
 if(glObjTr.bUseTopDoc)
 {
 if((y + menuHeight) > yPerSrchH+yPerSrch+yPerSrchScrllTp-8) 
 { 
 if(bRtMenu&&((tTop-menuHeight)<0))
 {
 menuEle.style.top = 0 + "px";  }
 else
 {
 menuEle.style.top = tTop-menuHeight + "px"; }
 }
 }
 else
 {
 if((y + menuHeight) > docHeight+scrollLeftTop[1]-8) 
 { 
 if(bRtMenu)
 {
 menuEle.style.top = y-menuHeight + "px"; }
 else
 {
 menuEle.style.top = tTop-menuHeight + "px"; }
 }
 }

 var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); var pTop = mParent.style.top; pTop = pTop.substr(0, pTop.length -2); tTop = tTop + pTop; if(tTop < 0) {
 tTop = 10; menuEle.style.top = tTop + "px"; }

 menuEle.style.display = "";}


glObjTr.getDescTooltip = function (mObj, e)
 {
 glObjTr.changeBkg(mObj); var oBr = new PT_browserInfo(); oBr.init(); var bIE = oBr.isIE; var bMozila=oBr.isMozilla
 var ev = bMozila ? e : event; var IsNeed = mObj.getAttribute("STP");  if (!glObjTr.isEmpty(IsNeed))
 {
 var TlT = document.createElement("DIV"); TlT.id = "Mnt";  TlT.innerHTML = IsNeed + "&nbsp;&nbsp;"; TlT.className = "PT_RATBOX_TOOLTIP"; TlT.style.position = "absolute"; TlT.style.display = "block"; TlT.style.zIndex = 200000; var TDivNode = mObj.parentNode.parentNode.parentNode; glObjTr.AddToObj(TDivNode, TlT);  var bPgl = 0; var bP = 0; var nLeft = mObj.offsetLeft; var nTop = mObj.offsetTop; TlT.style.left = nLeft - 10+"px"; TlT.style.top = nTop - 25+"px";  var biPad=0; if (biPad)
 {
 TlT.style.top = nTop + 35 +"px"; setTimeout(function () {closeDescTooltip(mObj); }, 5000); }
 }
 }


glObjTr.closeDescTooltip = function (mObj)
 {
 glObjTr.changeBkg(mObj); var oDivT=document.getElementById("Mnt"); if(oDivT)
 {
 var oPar=oDivT.parentNode
 oPar.removeChild(oDivT); }
 }


glObjTr.AddToObj = function(oParent,ChildO)
 { 
 var oDiv = document.getElementById(ChildO.id); if(oDiv&&oDiv.parentNode)
 {
 oDiv.parentNode.removeChild(oDiv);  }
 oParent.appendChild(ChildO); }


glObjTr.isEmpty = function (strIn) {
 var m_undef; if ((strIn == m_undef) || (strIn.length == 0)) 
 return 1; return 0;}


glObjTr.preventEventPropagation = function (ev) {
 if (ev.preventDefault) {
 ev.preventDefault(); }
 if (ev.stopPropagation) {
 ev.stopPropagation(); }
 ev.returnValue = false; ev.cancelBubble = true; ev.cancel = true;}


glObjTr.keyDwn = function (sIdEsc, sParentId, nType, sIdIEsc, sIdCh, sIdChPar, sNId, nDescr, nLeft, nTop, bIE, oItema, e) {
 var ev=!bIE?e:event; var key=ev.keyCode; var Mysource = !bIE ? ev.target : ev.srcElement; var sId = unescape(sIdEsc); var sCntr = sParentId; var index = sParentId.indexOf("$$"); if (index > 1) {
 var temp; temp = sParentId.substring(0, sParentId.indexOf('$')); sCntr = temp; }
 var sNdDscCtr = ""; var sIdI=sIdIEsc; if (glObjTr.iType < 3) {
 sNdDscCtr = sNId + "$" + nDescr;  sIdI=unescape(sIdIEsc); }

 if(key==38)
 { 
 var oPreItem = bIE? (oItema.parentNode.parentNode.parentNode).previousSibling : (oItema.parentNode.parentNode.parentNode).previousElementSibling; if(!(this.isEmpty(oPreItem))) 
 {
 while(oPreItem.getAttribute("MSG"))
 {
 oPreItem=bIE? oPreItem.previousSibling : oPreItem.previousElementSibling; if(this.isEmpty(oPreItem))
 {

 if((typeof(oPreItemBkp) !== "undefined") && !this.isEmpty(oPreItemBkp) && !this.isEmpty(oPreItemBkp.parentNode.parentNode.previousSibling))
 {
 oPreItem = bIE? (oPreItemBkp.parentNode.parentNode.previousSibling.lastChild.lastChild) : (oPreItemBkp.parentNode.parentNode.previousElementSibling.lastChild.lastChild); }
 else
 {
 break; }
 }
 oPreItemBkp = oPreItem; } 
 }

 if(!(this.isEmpty(oPreItem)))
 {
 var oPreItemA =oPreItem.childNodes[0].childNodes[0].childNodes[0]; }

 if(!(this.isEmpty(oPreItemA)))
 {

 oPreItemA.focus(); } 
 glObjTr.preventEventPropagation(ev); }

 if((key==40))
 { 
 var oNextItem = bIE? (oItema.parentNode.parentNode.parentNode).nextSibling : (oItema.parentNode.parentNode.parentNode).nextElementSibling; if(this.isEmpty(oNextItem))
 {
 if(!this.isEmpty(oItema.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling))
 {
 oNextItem = bIE? (oItema.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild.firstChild) : (oItema.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.firstChild.firstChild); }
 }

 if(!(this.isEmpty(oNextItem))) 
 {
 while(oNextItem.getAttribute("MSG"))
 {
 oNextItem=bIE? oNextItem.nextSibling : oNextItem.nextElementSibling; if(this.isEmpty(oNextItem))
 break; } 
 }

 if(!(this.isEmpty(oNextItem)))
 {
 var oNextItemA =oNextItem.childNodes[0].childNodes[0].childNodes[0];  }
 if(!(this.isEmpty(oNextItemA)))
 {
 oNextItemA.focus(); }
 glObjTr.preventEventPropagation(ev);  }

 if(key==9)
 { 
 var target = getEventTarget(ev);  if (!(glObjTr.isEmpty(glObjTr.sOpen)))
 {
 glObjTr.removePrevMenu(event); }
 }

 if(key==27)
 {
 if(!glObjTr.isEmpty(glObjTr.sRAId))
 {
 var oRtmenuParentObj=document.getElementById(glObjTr.sRAId); if(!glObjTr.isEmpty(oRtmenuParentObj))
 {
 oRtmenuParentObj.focus(); glObjTr.sRAId=""; }
 }
 }

 if(key==13)
 { 
 if(!Mysource.getAttribute)
 {
 return; }
 if(Mysource.getAttribute("FD"))
 glObjTr.bEnterKey=true;  }
 if(((glObjTr.iType != 4)&&(key==37))||((glObjTr.iType == 4)&&(key==39)))
 { 
 var sIdSubMenu = sCntr + "$$" + sId + this.ch127 + sIdCh; var oDivMn ; if (!glObjTr.bUseTopDoc)
 {
 oDivMn = document.getElementById(sIdSubMenu); }
 else 
 {
 oDivMn = window.top.document.getElementById(sIdSubMenu); }
 if (oDivMn && oDivMn .parentNode) 
 {
 var oParTr; if (!glObjTr.bUseTopDoc)
 oParTr = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdChPar + "$" + sIdCh); else
 oParTr = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdChPar + "$" + sIdCh); if (oParTr)
 {
 oParTr.className = "PT_ORG_ACTION_BG"; var oParA =oParTr.childNodes[0].childNodes[0].childNodes[0];  if(oParA)
 {
 oParA.focus();  }
 }
 oDivMn.parentNode.removeChild(oDivMn); }
 glObjTr.preventEventPropagation(ev);  }

 if(((glObjTr.iType != 4)&&(key==39))||((glObjTr.iType == 4)&&(key==37)))
 { 
 if(Mysource.getAttribute("FD"))
 {
 glObjTr.bEnterKey=true; this.createMenu(escape(sId), sCntr, nType, sIdIEsc, sIdCh, sNId, nDescr, nLeft, nTop, bIE, oItema) 
 }
 glObjTr.preventEventPropagation(ev);  }
}

glObjTr.checkEnterKey = function (e){ 
 var oBr = new PT_browserInfo(); oBr.init(); var bIE = oBr.isIE; var ev=!bIE?e:event; var key=ev.keyCode; if(key==13)
 { 
 glObjTr.bEnterKey=true; }
}



Array.prototype.isParent = function (Mystr) {
 var s; var bRet = false; for (s in this) {
 if (s == Mystr) {
 bRet = true; break; }
 }
 return bRet;}


glObjTr.moveMenuVisible = function (sCntr) {
 if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 var oMainObj=getObj(strCont+"$OR1C$$0"); if(this.isEmpty(oMainObj))
 return 0; if (glObjTr.bChrtMn)
 {
 var nCurrScrlTp=oMainObj.scrollTop; var nCurrScrlLf=oMainObj.scrollLeft; if(glObjTr.bChrtRtMn)
 {
 glObjTr.nChrtScrlTp =nCurrScrlTp; glObjTr.nChrtScrlLf=nCurrScrlLf; glObjTr.bChrtRtMn=0; }
 var nMaxScrlLf=glObjTr.nMnMaxLfPs-oMainObj.clientWidth; var nMaxScrlTp=glObjTr.nMnMaxTpPs-oMainObj.clientHeight; var nMinScrlLf=glObjTr.nLeft; var nMinScrlTp=glObjTr.nTop; if(nMinScrlLf<nCurrScrlLf)
 {
 oMainObj.scrollLeft=nMinScrlLf; }
 if(nMinScrlTp<nCurrScrlTp)
 {
 oMainObj.scrollTop=nMinScrlTp; }
 if(nMaxScrlLf>nCurrScrlLf)
 {
 oMainObj.scrollLeft=nMaxScrlLf; }
 if(nMaxScrlTp>nCurrScrlTp)
 {
 oMainObj.scrollTop=nMaxScrlTp; }
 glObjTr.bChrtMn=0; }
 }
}

var lastChildValid = function(node) {
 if (node.childNodes) {
 var listLength = node.childNodes.length; var validEl = null;  for (var i = 0; i < listLength; i++) { 
 var dNode = node.childNodes[(listLength - 1)- i];  if (dNode.nodeName !== "#text") {
 validEl = dNode; return validEl; }
 }
 if (validEl == null)
 return node.lastChild;  }
 else return node.lastChild;}
 
var firstChildValid = function(node) {
 if (node.childNodes) {
 var listLength = node.childNodes.length; var validEl = null; for (var i = 0; i < listLength; i++) {
 var dNode = node.childNodes[i];  if (dNode.nodeName !== "#text") {
 validEl = dNode; return validEl; }
 }
 if (validEl == null) 
 return node.firstChild;  }
 else return node.firstChild;}


try {
 if (typeof(top.ptIframe) == "undefined" && typeof(top.searchGbl) !== "undefined" && !top.searchGbl.sForm) {
 ptEvent.load(top.searchGbl.init); if (typeof(top.ptIframeHdr) !== "undefined") {
 ptEvent.load(top.ptIframeHdr.init); }
 }
}
catch(e) {}


function setRAActionUrl(srchUrl) {
 var elemId = "GSrchRaUrl1"; var elemUrl = document.getElementById(elemId); if (!elemUrl && !top.searchGbl.isHomepage && typeof(ptIframe) !== "undefined")
 elemUrl = window.frames["TargetContent"].document.getElementById(elemId);  else
 elemUrl = top.document.getElementById(elemId); if (elemUrl)
 elemUrl.value = srchUrl;}


function getRelatedActions(fldId, strRelActions) {
 var bIsHomePage = false; if (top && top.searchGbl)
 bIsHomePage = top.searchGbl.isHomepage; var relActionsStr = fldId + 'Str'; var elem = document.getElementById(relActionsStr); if (elem || (typeof relActionsStr != 'undefined')) {
 if(elem){

 var raStrValue = elem.value; if ((elem.firstChild) && (typeof strRelActions == 'undefined'))
 raStrValue = elem.firstChild.data; }
 else{
 raStrValue = strRelActions; }
 
 
 
 var rootMenu = 'DROPDOWNNAME1' + String.fromCharCode(9) + String.fromCharCode(9) + 
 '#rt#' + String.fromCharCode(9) + 'ID';  if (raStrValue.indexOf(rootMenu, 0) < 0) {
 var tmpRAStr = raStrValue; raStrValue = tmpRAStr.replace( 'DROPDOWNNAME1 #rt# ID', rootMenu); tmpRAStr = raStrValue;  var ch127ch127 = String.fromCharCode(127) + String.fromCharCode(127); var nMenuCount = 0; var nLen = 0; var nEndIndex = 0; do {
 nLen = tmpRAStr.length; nEndIndex = tmpRAStr.indexOf(ch127ch127, 0); tmpRAStr = tmpRAStr.substr((nEndIndex + 2), nLen); nMenuCount++; } while (nEndIndex < (nLen - 2))

 
 tmpRAStr = raStrValue; var processedRA = ""; for (var i = 0; i < nMenuCount; i++) {
 nEndIndex = tmpRAStr.indexOf(ch127ch127); processedRA = processedRA + tmpRAStr.substr(0, (nEndIndex + 2));  nLen = tmpRAStr.length; if (nEndIndex < (nLen - 2)) {
 tmpRAStr = tmpRAStr.substr((nEndIndex + 2), nLen); tmpRAStr = tmpRAStr.replace( ' ', String.fromCharCode(9)); }
 }
 raStrValue = processedRA; }


 
 var absCord = {x:0,y:0};  var referenceObj = document.getElementById(fldId);  if (!referenceObj)
 referenceObj = window.top.document.getElementById(fldId);  if ((fldId.indexOf("Pers") > -1) && referenceObj && (referenceObj.childNodes.length > 0)) { 
 if (!bIsHomePage || !browserInfoObj2.isIE)
 referenceObj = firstChildValid(referenceObj);  if (referenceObj) {
 absCord.x = referenceObj.offsetLeft;  absCord.y = referenceObj.offsetTop; if (bIsHomePage && (browserInfoObj2.isIE) && !detectDoctype(document)) {
 absCord.x = referenceObj.offsetLeft + 43;  absCord.y = referenceObj.offsetTop; }
 }
 } else { 
 absCord = ptCommonObj2.getAbsolutePosition(referenceObj);  absCord.y = absCord.y - referenceObj.offsetTop; } 

 
 if (glObjTr && raStrValue) { 
 glObjTr.bEnterKey = g_bAccessibilityMode; glObjTr.oInvkRtMenuId = fldId; glObjTr.showActionMenu(fldId, absCord.x, absCord.y, 6, 4, raStrValue, 'DROPDOWNNAME1');  } else {
 alert('An error occurred for homepage related actions. Please try accessing results on another page.'); }
 }
}

function isOutside(evt, parent) {
 var elem = evt.relatedTarget || evt.toElement || evt.fromElement; while (elem && elem !== parent)
 elem = elem.parentNode; if (elem !== parent)
 return true;}
 
function removeRelatedActionsImage(ev, fldId, rowNum) {
 var evnt = ev || window.event; var srchRsltTblId = "srchRsltTbl$" + rowNum;  var parentTbl = document.getElementById(srchRsltTblId); if (!parentTbl || fldId.indexOf("Pers") > -1) { 
 if (fldId.indexOf("Gbl") > -1)
 parentTbl = top.document.getElementById("persResultGbl$" + rowNum); else
 parentTbl = top.document.getElementById("persResult$" + rowNum); }
 if (isOutside(evnt, parentTbl)) {
 
 var relTarg = evnt.relatedTarget || evnt.toElement; if (relTarg && (!relTarg.getAttribute("SMN")) && (!relTarg.getAttribute("AC"))) {
 
 if (browserInfoObj2.isIE && relTarg.outerHTML && relTarg.innerHTML && 
 (relTarg.outerHTML != "") && (relTarg.innerHTML != "") && (!relTarg.innerText))
 return; var elem = document.getElementById(fldId); if (!elem) {
 elem = top.document.getElementById(fldId); }
 if (elem && elem.style.visibility=='visible') {
 if (glObjTr)
 glObjTr.removePrevMenu(evnt); gSrchRaFldId = ""; }
 }
 }
}

function showRelatedActionsImage(event, fldId, bVisible) {
 if ((gSrchRaFldId != fldId) && (gSrchRaFldId.length > 0)) {
 if (glObjTr)
 glObjTr.removePrevMenu(event); } 
 var elem = document.getElementById(fldId); if (!elem) {
 elem = top.document.getElementById(fldId); }
 if (bVisible) {
 var relActionsStr = fldId + 'Str'; var raStrElem = document.getElementById(relActionsStr); if (!raStrElem) {
 raStrElem = top.document.getElementById(relActionsStr); }
 if (elem && raStrElem) { 
 var raString = raStrElem.value; if ((typeof raString == 'undefined') && (raStrElem.childNodes.length > 0)) {
 raString = raStrElem.childNodes[0].data; }
 if (raString && raString.length > 0)
 elem.style.visibility='visible'; }
 gSrchRaFldId = fldId; } 
}


function setRelActionsElemValue(rowNum, raFormatedStrVar, raElemId, bProcessGbl) {
 
 var fldId = new Array(); if (raElemId.indexOf("relatedActionsPersGbl") > -1)
 fldId[0] = "relatedActionsPersGbl$" + rowNum; else if (raElemId.indexOf("relatedActionsPers") > -1)
 fldId[0] = "relatedActionsPers$" + rowNum; else
 fldId[0] = "relatedActions$" + rowNum;    if (raElemId.indexOf("relatedActionsPersGbl") < 0 && raElemId.indexOf("relatedActionsPers") < 0 && bProcessGbl) {
 fldId[0] = "relatedActions$" + rowNum; fldId[1] = "relatedActionsPersGbl$" + rowNum; }
 
 
 var raStrElem = null; for (var i=0; i < fldId.length; i++) {
 var raElem = document.getElementById(fldId[i]); if (!raElem) {
 raElem = top.document.getElementById(fldId[i]); }
 var raValue = eval(raFormatedStrVar); if (raElem && (raValue.length != 0)) {
 var relActionsStr = fldId[i].concat("Str");  raStrElem = document.getElementById(relActionsStr); var elemArr = new Array(); if (!raStrElem && fldId[i].indexOf("relatedActionsPersGbl") > -1) {
 elemArr = ptUtil.getElemsByClass("relActString", top.document.getElementById("ptabnprevGbl_GBL"), "span");  if (elemArr.length > 0) {
 raStrElem = elemArr[rowNum]; }
 }
 else if (!raStrElem && fldId[i].indexOf("relatedActionsPers") > -1 && typeof top.pthNav !== "undefined" && top.pthNav.abn.search.currResults) {
 elemArr = ptUtil.getElemsByClass("relActString", top.document.getElementById("ptabnprev_" + top.pthNav.abn.search.currResults.objName), "span");  if (elemArr.length > 0) {
 raStrElem = elemArr[rowNum]; } 
 }
 else if (!raStrElem) {
 raStrElem = top.document.getElementById(relActionsStr); }
 }
 if (raStrElem) {
 raStrElem.value = raValue;  if (raElem)
  raElem.style.visibility='visible';  var raTdElem = document.getElementById("relatedActionsTd$" + rowNum); var srTdElem = document.getElementById("srchRsltTd$" + rowNum); if (raTdElem && srTdElem) {
 raTdElem.height = srTdElem.offsetHeight; }
 }
 }
 if (raElem && (raValue.length != 0))
 return true; return false;}


function setRAElemValue(rowNum, raFormatedStrVar, raElemId) { 
 
 var raStrElem = null; var raElem = document.getElementById(raElemId); if (!raElem) {
 raElem = top.document.getElementById(fldId[i]); }

 var raValue = eval(raFormatedStrVar); if (raElem && (raValue.length != 0)) {
 var relActionsStr = raElemId.concat("Str");  raStrElem = document.getElementById(relActionsStr); var elemArr = new Array(); if (!raStrElem && raElemId.indexOf("relatedActionsPersGbl") > -1) {
 elemArr = ptUtil.getElemsByClass("relActString", top.document.getElementById("ptabnprevGbl_GBL"), "span");  if (elemArr.length > 0) {
 raStrElem = elemArr[rowNum];  }
 }
 else if (!raStrElem && raElemId.indexOf("relatedActionsPers") > -1 && typeof top.pthNav !== "undefined" && top.pthNav.abn.search.currResults) {
 elemArr = ptUtil.getElemsByClass("relActString", top.document.getElementById("ptabnprev_" + top.pthNav.abn.search.currResults.objName), "span");  if (elemArr.length > 0) {
 raStrElem = elemArr[rowNum];  } 
 }
 else if (!raStrElem) {
 raStrElem = top.document.getElementById(relActionsStr); }
 }
 if (raStrElem) {
 raStrElem.value = raValue; }
 if (raElem && (raValue.length != 0))
 return true; return false;}



function processRelatedActionsResponse(nContentServerIndex, respText, raElemId, bProcessGbl, currPage) {
 if (!respText) 
 return; var xmlDoc = null; if (window.ActiveXObject) {
 xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); xmlDoc.async = "false"; xmlDoc.loadXML(respText); } else {
 var parser=new DOMParser(); xmlDoc = parser.parseFromString(respText, "text/xml"); }
 if (xmlDoc) {

 var scriptList = xmlDoc.getElementsByTagName("GENSCRIPT"); if (scriptList) {
 for (var i=0; i < scriptList.length; i++) {
 eval(scriptList[i].firstChild.data); }
 }

 
 
 var nIndex = (currPage - 1) * 10;  var nRowNum = nIndex; var nTmp = 1; for (var rowNum = nIndex; rowNum < (nIndex + 10); rowNum++) {
 if (srchUrls[nContentServerIndex][rowNum - nIndex] != "") {
 var raFormatedStrVar = "raFormatedString" + nTmp++; setRelActionsElemValue(rowNum, raFormatedStrVar, raElemId, bProcessGbl); }
 }
 } else {
 alert("xmldoc is null"); }


}



function processOneSrchRsltRAResponse(respText, raElemId, rowNum) {
 if (!respText) 
 return; var xmlDoc = null; if (window.ActiveXObject) {
 xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); xmlDoc.async = "false"; xmlDoc.loadXML(respText); } else {
 var parser=new DOMParser(); xmlDoc = parser.parseFromString(respText, "text/xml"); }
 if (xmlDoc) {
 var scriptList = xmlDoc.getElementsByTagName("GENSCRIPT"); if (scriptList) {
 for (var i=0; i < scriptList.length; i++) {
 eval(scriptList[i].firstChild.data); }
 }

 var raFormatedStrVar = "raFormatedString1"; setRAElemValue(rowNum, raFormatedStrVar, raElemId); getRelatedActions(raElemId);  } else {
 alert("xmldoc is null");  }
}


function getCurrPagePersSrch(dList) {
 currPage = 0; if (dList) {
 for (var i = 0, y = 0; i < dList.childNodes.length; i++) {
 if (dList.childNodes[i].className != "ptabnhide" && y == 0) {
 currPage = i + 1; y = 1;  }
 }
 }
 return currPage;}

function setupRelatedActions() {
 
 var RAFlagGbl = top.document.getElementById("RelatedActionsFlagPersGbl"); var RAFlagBC = top.document.getElementById("RelatedActionsFlagPers");  var nameArr = ["gbl"]; var idArr = {gbl: "", persGbl: "PersGbl", persBC: "Pers"}; var currPageArr = {gbl: 0, persGbl: 0, persBC: 0}; var bProcessArr = {gbl: false, persGbl: false, persBC: false}; var srchUrlsArr = {gbl: [], persGbl: [], persBC: []}; var nSrchRsltCountArr = {gbl: 0, persGbl: 0, persBC: 0};  if (typeof(top.pthNav) !== "undefined" && top.pthNav.abn.search.currResults) {
 bProcessArr["persBC"] = true; nameArr.push("persBC"); currPageArr["persBC"] = getCurrPagePersSrch(top.document.getElementById("ptabndatalist_" + top.pthNav.abn.search.currResults.objName)); }
 if (typeof(top.searchGbl) !=="undefined") {
 bProcessArr["persGbl"] = true; nameArr.push("persGbl"); currPageArr["persGbl"] = getCurrPagePersSrch(top.document.getElementById("ptabndatalist_GBL")); }
 currPageArr["gbl"] = gSrchRsltPageNum;  if (RAFlagGbl) { 
 if (RAFlagGbl.value == "true") {
 bProcessArr["gbl"] = false; bProcessArr["persBC"] = false; nameArr = ["persGbl"];  }
 } 
 if (RAFlagBC) {
 if (RAFlagBC.value == "true") {
 bProcessArr["gbl"] = false; bProcessArr["persGbl"] = false; nameArr = ["persBC"];  }
 } 
 
 for (var i = 0; i < nameArr.length; i++) {
 var nameStr = nameArr[i]; var idStr = idArr[nameStr]; var bProcessRA = false; var currPage = currPageArr[nameStr]; var nSrchRsltCount = 0; var bRAExists = false;  var nStartIndex = (currPage - 1) * 10; var tmpSrchUrls = [];  for (var j = nStartIndex; j < (nStartIndex + 10); j++) {
 var elemId = "srchRsltUrl" + idStr + "$" + j; var elemSrchUrl = document.getElementById(elemId); if (!elemSrchUrl)
 elemSrchUrl = top.document.getElementById(elemId);  if (elemSrchUrl) {
 var srchRsltUrl = elemSrchUrl.getAttribute('ra'); tmpSrchUrls[nSrchRsltCount] = srchRsltUrl; nSrchRsltCount = nSrchRsltCount + 1; bProcessRA = true; } else 
 break;   var RAStrVal = ""; var RAStr = document.getElementById("relatedActions" + idStr + "$" + j + "Str"); var RAElem = ""; if (!RAStr)
 top.document.getElementById("relatedActions" + idStr + "$" + j + "Str"); if (RAStr) {
 RAStrVal = RAStr.value; if ((typeof RAStrVal == 'undefined') && (RAStr.childNodes.length > 0)) {
 RAStrVal = RAStr.childNodes[0].nodeValue; }
 if (RAStrVal) {
 RAElem = top.document.getElementById("relatedActions" + idStr + "$" + j); if (RAElem) {
 RAElem.style.visibility = "visible"; }
 }
 }
 if (typeof (RAStrVal) !== "undefined" && RAStrVal) { 
 bRAExists = true;  } 
 }
 
 if (!bRAExists) {
 bProcessRA = true;  }
 else 
 bProcessRA = false;  bProcessArr[nameStr] = bProcessRA; srchUrlsArr[nameStr] = tmpSrchUrls; nSrchRsltCountArr[nameStr] = nSrchRsltCount; }
 var returnedArr = {bProcessArr: bProcessArr, currPageArr: currPageArr, srchUrlsArr: srchUrlsArr, nSrchRsltCountArr: nSrchRsltCountArr}; return returnedArr;}


function getSrchRsltRelatedActions() {

 var raDataArr = setupRelatedActions();  var bProcessArr = raDataArr["bProcessArr"]; var bProcess = bProcessArr["gbl"]; var bProcessBC = bProcessArr["persBC"]; var bProcessGbl = bProcessArr["persGbl"];  if (!bProcess && !bProcessBC && !bProcessGbl)
 return;  var srchRsltUrls = []; var raElemId = ""; var nSrchRsltCount = 0; var currPage = 0;      if (bProcess || (bProcess && bProcessGbl)) {
 srchRsltUrls = raDataArr["srchUrlsArr"]["gbl"]; raElemId = "relatedActions$" + ((gSrchRsltPageNum - 1) * 10); currPage = gSrchRsltPageNum; nSrchRsltCount = raDataArr["nSrchRsltCountArr"]["gbl"]; } 
 if (bProcessBC) {
 srchRsltUrls = raDataArr["srchUrlsArr"]["persBC"];; raElemId = "relatedActionsPers$" + ((raDataArr["currPageArr"]["persBC"] - 1) * 10); currPage = raDataArr["currPageArr"]["persBC"]; nSrchRsltCount = raDataArr["nSrchRsltCountArr"]["persBC"];; }
 if (bProcessGbl && !bProcess) {
 srchRsltUrls = raDataArr["srchUrlsArr"]["persGbl"]; raElemId = "relatedActionsPersGbl$" + ((raDataArr["currPageArr"]["persGbl"] - 1) * 10); currPage = raDataArr["currPageArr"]["persGbl"]; nSrchRsltCount = raDataArr["nSrchRsltCountArr"]["persGbl"];; }

 for (var i = 0; i < 10; i++)
 for (var j = 0; j < 10; j++)
 srchUrls[i][j] = "";  nContentServers = 0; var nProcessedCount = 0; for (var i = 0; i < nSrchRsltCount; i++) {
 
 if (nProcessedCount >= nSrchRsltCount)
 break; var srchRsltUrl = srchRsltUrls[i]; if ((!srchRsltUrl) || (srchRsltUrl == ""))
 continue; var prevContentServer = ""; for (var j = i; j < nSrchRsltCount; j++) { 
 
 srchRsltUrl = srchRsltUrls[j]; if ((!srchRsltUrl) || (srchRsltUrl == ""))
 continue; var srchRsltUrlArr = srchRsltUrl.split('/'); if (!srchRsltUrlArr) {
 alert(srchRsltUrl + " " + "That was not a valid URL format."); return; }

 var srchUrlHost = srchRsltUrlArr[2]; if (!srchUrlHost) {
 alert(srchRsltUrl + " " + "That was not a valid URL format."); return; }

 if (srchUrlHost.indexOf(':') < 0)
 srchUrlHost = srchUrlHost + ':80'; var externalUrl = false; var tmpPsc = srchRsltUrlArr[3]; if (!tmpPsc || ((tmpPsc != 'psp') && (tmpPsc != 'psc') && (tmpPsc != 'psreports'))) {
 srchRsltUrls[j] = ""; nProcessedCount++; externalUrl = true; if (nProcessedCount >= nSrchRsltCount)
 break; } 

 if (externalUrl == false) {
 var bAdd = true; if (prevContentServer == "") {
 prevContentServer = srchUrlHost;  nContentServers++; } else if ((prevContentServer.length != srchUrlHost.length) || 
 (prevContentServer.toString().toLowerCase() != srchUrlHost.toString().toLowerCase())) {
 bAdd = false; }
 
 if (bAdd) {
 srchUrls[nContentServers - 1][j] = srchRsltUrl; srchRsltUrls[j] = ""; nProcessedCount++; if (nProcessedCount >= nSrchRsltCount)
 break; }
 }
 }
 }
 
 if (nContentServers <= 0)
 return;  var doclocation = document.location.href; var actionurl = doclocation; var index = doclocation.indexOf('/h/?'); if (index > 0) {
 actionurl = doclocation.replace('/h/?', '/c/PORTAL_ADMIN.PTSF_GLOBAL_SEARCH.GBL?'); doclocation = actionurl; }
 var index = doclocation.indexOf('?'); if (index > 0) {
 actionurl = doclocation.substr(0, index); }

 
 var origUrl = actionurl;  var localURLArr= actionurl.split('/');   var localHost = localURLArr[2]; if (localHost.indexOf(':') < 0)
 localHost = localHost + ':80';  var portalName = ""; if (localURLArr.length > 6)
 portalName = localURLArr[5];  var localNodeName = ""; if (localURLArr.length > 7)
 localNodeName = localURLArr[6];   for (var i = 0; i < nContentServers; i++) {
 var srchRsltUrl = ""; for (var k = 0; k < 10; k++) {
 srchRsltUrl = srchUrls[i][k];  if (srchRsltUrl != "")
 break; }

 var srchURLArr = srchRsltUrl.split('/');  var srchUrlHost = srchURLArr[2]; if (!srchUrlHost) {
 alert(srchRsltUrl + " " + "That was not a valid URL format."); return; }
 if (srchUrlHost.indexOf(':') < 0)
 srchUrlHost = srchUrlHost + ':80';   var bRemoteRA = true; var respText = "";  if ((localHost.length == srchUrlHost.length) && 
 ((localHost.toLowerCase()).indexOf(srchUrlHost.toLowerCase()) == 0))
 bRemoteRA = false; actionurl = origUrl; var tmpActionUrl = actionurl; var fldId = raElemId; var elemAction = fldId; if (bRemoteRA) {
 
 index = tmpActionUrl.indexOf('\/psc\/'); if (index > 0)
 actionurl = tmpActionUrl.replace('\/psc\/', '\/psp\/');  var remotePortalName = srchURLArr[5];  if (portalName)
 tmpActionUrl = actionurl.replace(portalName, remotePortalName); else
 tmpActionUrl = actionurl.concat(remotePortalName + '\/');  var remoteNodeName = srchURLArr[6];   if (localNodeName)
 actionurl = tmpActionUrl.replace('\/' + localNodeName + '\/', '\/' + remoteNodeName + '\/'); else {
 actionurl = tmpActionUrl.concat(remoteNodeName + '\/c\/PORTAL_ADMIN.PTSF_GLOBAL_SEARCH.GBL'); }
 
 
 tmpActionUrl = actionurl.concat('?cmd=smartnav'); actionurl = tmpActionUrl.concat('&ICAction=' + fldId);  var nTmp = 1; for (var j = 0; j < 10; j++) {
 var tmpUrl = srchUrls[i][j]; if ((!tmpUrl) || (tmpUrl == "") || (tmpUrl.length <= 0))
 continue; var tmpAction1 = "&GSrchRaUrl"; var tmpAction2 = tmpAction1.concat(nTmp.toString()); nTmp++; tmpAction1 = tmpAction2.concat('='); tmpAction2 = tmpAction1.concat(encodeURIComponent(tmpUrl)); tmpActionUrl = actionurl.concat(tmpAction2); actionurl = tmpActionUrl; }

 actionurl = tmpActionUrl.concat('&ICAJAX=1'); var xmlHttpReq = false; var encodeActionURL = encodeURI(actionurl) ; var nContentServerIndex = i;  if (window.XMLHttpRequest) { 
 xmlHttpReq = new XMLHttpRequest(); } else if (window.ActiveXObject) { 
 xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); }
 xmlHttpReq.open('POST', encodeActionURL, true); xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); xmlHttpReq.onreadystatechange = function() {
 if (xmlHttpReq.readyState == 4) {
 respText = xmlHttpReq.responseText; processRelatedActionsResponse(nContentServerIndex, respText, raElemId, bProcessGbl, currPage); }
 }
 xmlHttpReq.send(null);  } else { 
 tmpActionUrl = actionurl.concat('?ICAction=' + fldId); var nTmp = 1; for (var j = 0; j < 10; j++) {
 var tmpUrl = srchUrls[i][j]; if ((!tmpUrl) || (tmpUrl == ""))
 continue; var tmpAction1 = "&GSrchRaUrl"; var tmpAction2 = tmpAction1.concat(nTmp.toString()); nTmp++; tmpAction1 = tmpAction2.concat('='); tmpAction2 = tmpAction1.concat(encodeURIComponent(tmpUrl)); actionurl = tmpActionUrl.concat(tmpAction2); tmpActionUrl = actionurl; }
 actionurl = tmpActionUrl.concat('&ICAJAX=1'); var icsidResults = document.getElementById(winName + "divPSHIDDENFIELDS"); var icsid; if (typeof(icsidResults) !== "undefined"){
 var chldInputObj = icsidResults.childNodes; if (typeof(chldInputObj) !== "undefined"){
 for(var jj = 0; jj < chldInputObj.length; jj++){
 if(chldInputObj.item(jj).id == 'ICSID'){
 var tmpicsid = "&ICSID="; var icsid1 = encodeURIComponent(chldInputObj.item(jj).value); var icsid = tmpicsid.concat(icsid1); var tempUrl = actionurl.concat(icsid); actionurl = tempUrl; break; }
 }
 }
 }
 
 var encodeActionURL = encodeURI(actionurl) ;    var sLoader = new net2.ContentLoader(encodeActionURL, null, null, "POST",
 function() {
 respText = this.req.responseText;  processRelatedActionsResponse(i, respText, raElemId, bProcessGbl, currPage); }, null, null, "application/x-www-form-urlencoded", 
 true, false, null, false, null); if (respText == "") {
 respText = sLoader.req.responseText; processRelatedActionsResponse(i, respText, raElemId, bProcessGbl, currPage); }
 }
 }
}

function getGblSrchPageNum(act) {
 if ((typeof act == 'undefined') || (act == 'None') || (act == '') || (act == null) || (act.length == 0)) {
 gSrchRsltPageNum = 1; return; }

 var srchPage = 'PTUS_PAGING_WRK_PTUS_PAGE_TAB'; var index = act.indexOf(srchPage); if (index != 0) {
 gSrchRsltPageNum = 1; return; }

 var numStr = act.substr(index + srchPage.length, act.length);  var tmpImgIndex = numStr.indexOf('IMG'); if (tmpImgIndex >= 0) {
 gSrchRsltPageNum = gSrchRsltPageNum + 1; return; } 

 var num = parseInt(numStr); if (num != NaN) {
 if (num == 1) {
 gSrchRsltPageNum = gSrchRsltPageNum - 1; } else {
 gSrchRsltPageNum = num - 1; var tmpElem = null; while (!tmpElem) {
 var nIndx = (gSrchRsltPageNum - 1) * 10; tmpElem = document.getElementById('srchRsltUrl$' + nIndx); if (!tmpElem) {
 gSrchRsltPageNum++; if (gSrchRsltPageNum > 5)
 break;  }
 } 
 }
 }
}



function getOneSrchRsltRelatedActions(sSrchRsltUrl, raElemId, rowNum) {
 if ((!sSrchRsltUrl) || (sSrchRsltUrl == "") || (!raElemId) || (raElemId == ""))
  return;    var doclocation = document.location.href; var actionurl = doclocation; var index = doclocation.indexOf('/h/?'); if (index > 0) {
 actionurl = doclocation.replace('/h/?', '/c/PORTAL_ADMIN.PTSF_GLOBAL_SEARCH.GBL?'); doclocation = actionurl; }
 var index = doclocation.indexOf('?'); if (index > 0) {
 actionurl = doclocation.substr(0, index); }
 

 var origUrl = actionurl;  var localURLArr= actionurl.split('/');   var localHost = localURLArr[2]; if (localHost.indexOf(':') < 0)
 localHost = localHost + ':80';  var portalName = ""; if (localURLArr.length > 6)
 portalName = localURLArr[5];  var localNodeName = ""; if (localURLArr.length > 7)
 localNodeName = localURLArr[6];  var srchURLArr = sSrchRsltUrl.split('/');  var srchUrlHost = srchURLArr[2]; if (!srchUrlHost) {
 alert(sSrchRsltUrl + " " + "That was not a valid URL format."); return; }
 if (srchUrlHost.indexOf(':') < 0)
 srchUrlHost = srchUrlHost + ':80';   var bRemoteRA = true; var respText = "";  if ((localHost.length == srchUrlHost.length) && 
 ((localHost.toLowerCase()).indexOf(srchUrlHost.toLowerCase()) == 0))
 bRemoteRA = false; actionurl = origUrl; var tmpActionUrl = actionurl; var fldId = raElemId; var elemAction = fldId; if (bRemoteRA) {
 
 index = tmpActionUrl.indexOf('\/psc\/'); if (index > 0)
 actionurl = tmpActionUrl.replace('\/psc\/', '\/psp\/');  var remotePortalName = srchURLArr[5];  if (portalName)
 tmpActionUrl = actionurl.replace(portalName, remotePortalName); else
 tmpActionUrl = actionurl.concat(remotePortalName + '\/');  var remoteNodeName = srchURLArr[6];  if (localNodeName)
 actionurl = tmpActionUrl.replace('\/' + localNodeName + '\/', '\/' + remoteNodeName + '\/'); else {
 actionurl = tmpActionUrl.concat(remoteNodeName + '\/c\/PORTAL_ADMIN.PTSF_GLOBAL_SEARCH.GBL'); }
 
 
 tmpActionUrl = actionurl.concat('?cmd=smartnav');  actionurl = tmpActionUrl.concat('&ICAction=relatedActionsGM');  var tmpAction1 = "&GSrchRaUrl1="; tmpAction2 = tmpAction1.concat(encodeURIComponent(sSrchRsltUrl)); tmpActionUrl = actionurl.concat(tmpAction2); actionurl = tmpActionUrl; actionurl = tmpActionUrl.concat('&ICAJAX=1'); var xmlHttpReq = false; var nContentServerIndex = i;  if (window.XMLHttpRequest) { 
 xmlHttpReq = new XMLHttpRequest(); } else if (window.ActiveXObject) { 
 xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); }
 xmlHttpReq.open('POST', actionurl, true); xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); xmlHttpReq.onreadystatechange = function() {
 if (xmlHttpReq.readyState == 4) {
 respText = xmlHttpReq.responseText; processOneSrchRsltRAResponse(respText, raElemId, rowNum); }
 }
 xmlHttpReq.send(null);  } else { 
 
 tmpActionUrl = actionurl.concat('?ICAction=relatedActionsGM'); var tmpAction1 = "&GSrchRaUrl1="; var tmpAction2 = tmpAction1.concat(encodeURIComponent(sSrchRsltUrl)); actionurl = tmpActionUrl.concat(tmpAction2); tmpActionUrl = actionurl; actionurl = tmpActionUrl.concat('&ICAJAX=1');var encodeActionURL = encodeURI(actionurl) ;   var sLoader = new net2.ContentLoader(encodeActionURL, null, null, "",
 function() {
 respText = this.req.responseText; processOneSrchRsltRAResponse(respText, raElemId, rowNum); }, null, null, "application/x-www-form-urlencoded", 
 true, false, null, false, null); if (respText == "") {
 respText = sLoader.req.responseText;  processOneSrchRsltRAResponse(respText, raElemId, rowNum); }
 }
}

function getAllRelatedActions() {
 window.status = "Get Related Actions"; raFormatedString1 = ""; raFormatedString2 = ""; raFormatedString3 = ""; raFormatedString4 = ""; raFormatedString5 = ""; raFormatedString6 = ""; raFormatedString7 = ""; raFormatedString8 = ""; raFormatedString9 = ""; raFormatedString10 = ""; gSrchRaFldId = ""; try {
 getSrchRsltRelatedActions(); } catch (e) {
 alert(e.message); }
 window.status = "";}



function isWorkCenter() {
return top.document.getElementById('ptalPgltAreaFrame');}

function isWorkCenterDashboard(sUrl) {
var workcenterframe = top.document.getElementById('ptalPgltAreaFrame');if( typeof workcenterframe == 'undefined' || workcenterframe == null || typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false;if((sUrl.indexOf('/h/?tab=') != -1) || (sUrl.indexOf('IScript_HPCompRemove?tab') != -1)) return true;return false;}

function isWorkList(sUrl) {
 return (typeof(sUrl) != "undefined" && sUrl.indexOf("ICAction=ICViewWorklist") > -1);}

function isPIAUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false; if (sUrl.indexOf('/psc/') == -1 ) return false; return true;}

function isPIAComponentUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false; if (sUrl.indexOf('/psc/') != -1 && sUrl.indexOf('/c/') != -1) return true; return false;}

function isPIAHtmlTempalteTarget(sUrl, hostWin, topWin, form) {
 if (!isPIAUrl(sUrl)) return false; if (typeof form == 'undefined' || form == null) return false; if (typeof form.ICType == 'undefined') return false; if (typeof form.action != 'undefined' && form.action.indexOf('/psp/') != -1) return true; return false;}

function isPortalUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false;  var pspIndex = sUrl.indexOf('/psp/'); if (pspIndex == -1 ) return false; else {
 var queryIndex = sUrl.indexOf('?'); if (queryIndex != -1 && queryIndex < pspIndex) return false; }
 return true;}

function isPortalHomagPageUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false; if (sUrl.indexOf('/psp/') != -1 && sUrl.indexOf('/h/') != -1) return true; return false;}

function isInFrame(sUrl, hostWin, topWin) {
 if (hostWin != topWin && !isUrlFrmModal(sUrl, hostWin)) return true; return false;}

function isPIAPagelet(sUrl, hostWin, topWin, form) {
 if (!isPIAUrl(sUrl)) return false; if (typeof form == 'undefined' || form == null) return false; if (typeof form.ICFromPagelet == 'undefined' || form.ICFromPagelet.value != 'true') return false; return true;}

function isHostWinPIA(sUrl, hostWin) {
 return isPIAUrl(hostWin.location.href);}

function isHostWinPortal(sUrl, hostWin) {
 return isPortalUrl(hostWin.location.href);}

function getPortalName(sUrl) {
 var portalName = null; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var questionPos = sUrl.indexOf('?'); if (questionPos != -1 )
 {
 sUrl= sUrl.substring(0,questionPos);  }
 var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sArr = sUrl.substring(pos, sUrl.length).split('/'); if (sArr.length > 3)
 portalName = sArr[3]; return portalName;}

function getNodeName(sUrl) {
 var nodeName = null; if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return nodeName; var queryPos = sUrl.indexOf('?'); var fragmentPos = sUrl.indexOf('#'); var endPos; if (queryPos != -1 && fragmentPos != -1)
 endPos = queryPos < fragmentPos ? queryPos : fragmentPos; else if (queryPos == -1 && fragmentPos != -1)
 endPos = fragmentPos; else if (queryPos != -1 && fragmentPos == -1)
 endPos = queryPos; else
 endPos = sUrl.length;  var pos = sUrl.substring(0,endPos).indexOf('/psp/'); if (pos == -1) pos = sUrl.substring(0,endPos).indexOf('/psc/'); if (pos == -1) return nodeName; var sArr = sUrl.substring(pos, endPos).split('/'); if (sArr.length > 3)
 nodeName = sArr[4]; return nodeName;}


function getPortalNodePart(sUrl){
 if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var questionPos = sUrl.indexOf('?'); if (questionPos != -1 )
 {
 sUrl= sUrl.substring(0,questionPos);  }
 var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sTmp = sUrl.substring(pos, sUrl.length); var urlSplit = sTmp.split('/'); if (urlSplit.length > 4)
 return String("/"+ urlSplit[3] + "/" + urlSplit[4] + "/"); else
 return null;}

function getPSHome0(sUrl) {
 var psHome = null; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var questionPos = sUrl.indexOf('?'); if (questionPos != -1 )
 {
 sUrl= sUrl.substring(0,questionPos);  }
 var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sTmp = sUrl.substring(pos, sUrl.length); var sArr = sTmp.split('/'); if (sArr.length > 3) {
 psHome = trimWindowsNumber0(sArr[2]); }
 return psHome;}

function trimWindowsNumber0(psSiteName) {
 if (!psSiteName) return ""; var psHome = psSiteName; var nameArray = psSiteName.split('_'); if (nameArray.length > 1) {
 var lastStr = nameArray[nameArray.length - 1]; if (!isNaN(lastStr) || lastStr.indexOf('newwin')!=-1) {
 nameArray.pop(); psHome = nameArray.join('_'); }
 }
 return psHome;}

function getPSHome(sUrl) {
 var psHome = null; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var questionPos = sUrl.indexOf('?'); if (questionPos != -1 )
 {
 sUrl= sUrl.substring(0,questionPos);  }
 var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sTmp = sUrl.substring(pos, sUrl.length); var sArr = sTmp.split('/'); if (sArr.length > 3) {
 psHome = trimWindowsNumber(sArr[2]); }
 return psHome;}


function trimWindowsNumber(psSiteName) {
 if (!psSiteName) return ""; var nameArray = psSiteName.split('_'); if (nameArray.length > 1) {
 var lastStr = nameArray[nameArray.length - 1]; if (!isNaN(lastStr)) {
 nameArray.pop(); return nameArray.join('_'); }
 }
 return psSiteName;}



function getPSHomeSuffix(sUrl) {
 var nWinCnt = ""; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var questionPos = sUrl.indexOf('?'); if (questionPos != -1 )
 {
 sUrl= sUrl.substring(0,questionPos);  }
 if (sUrl.indexOf("_newwin") != -1)
 return "_newwin"; var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sTmp = sUrl.substring(pos, sUrl.length); var sArr = sTmp.split('/');  var sArr2 = sArr[2].split('_'); if (sArr2.length > 1 && !isNaN(sArr2[sArr2.length - 1])){
 nWinCnt = "_" + sArr2[sArr2.length - 1]; }
 return nWinCnt;}

function getUrlHost(sUrl) {
 if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return ""; var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); if (pos == -1) return ""; var serverURI = sUrl.substring(0, pos); return serverURI;}

function isRemoteNode(sUrl, hostWin) {
 if (getUrlHost(sUrl) != getUrlHost(hostWin.location.href))
 return true; if (getPSHome(sUrl) != getPSHome(hostWin.location.href))
 return true; return false;}

function isUrlFrmModal(sUrl, hostWin) {
 if (typeof hostWin.modalID != 'undefined' && hostWin.modalID != null)
 return true; return false;}

function isRelativeUrl(sUrl) {
 if (sUrl.indexOf('http') == 0) return false; return true;}

function convToABSUrl(sUrl, sHostUrl, bCrossDomain, strCurrUrl) {
 if (!isRelativeUrl(sUrl)) return sUrl; if (bCrossDomain)
 var sHostURI = getUrlHost(strCurrUrl); else
 var sHostURI = getUrlHost(sHostUrl); var sReturnUrl = sHostURI + sUrl; return sReturnUrl;}

function convToHostURI(sUrl, hostWin) {
 if (!isRemoteNode(sUrl, hostWin) && isHostWinPortal(sUrl, hostWin)) {
 return sUrl.replace('/psc/', '/psp/')
 } 

 var sHostUrl = hostWin.location.href; if (isPortalUrl(sUrl) && getPortalName(sUrl) != getPortalName(sHostUrl))
 return sUrl; var sHostURI = getUrlHost(sHostUrl); var sHostPSHome = getPSHome(sHostUrl); var sPSHomeSuffix = getPSHomeSuffix(sUrl); var sHostPortalName = getPortalName(sHostUrl);  var sNodeName = getNodeName(sUrl) + "/"; var pos = sUrl.indexOf(sNodeName); var sReturnUrl = sHostURI + '/psp/' + sHostPSHome+sPSHomeSuffix + '/' + sHostPortalName + '/' + sUrl.substring(pos, sUrl.length); return sReturnUrl;}


function getContentNode(sUrl){
 if(sUrl.indexOf('&contentNode') != -1){
 var r = sUrl.match('&contentNode=([^&]*)'); if(r){
 return r[1]; } 
 }else{
 return null; }
}


function convToRemoteDashboardURL(sUrl,hostWin) {

 var sHostUrl = hostWin.location.href; if (isUrlFrmModal(sUrl, window))
 return sHostUrl; var sPortalHostNode = getNodeName(sHostUrl); var sContentHostNode = getNodeName(sUrl); if(sPortalHostNode != sContentHostNode)
 {
 
 
 if ( (typeof hostWin.ptNav2Info != 'undefined') && (sContentHostNode == hostWin.ptNav2Info.UniNavPortalNode) )
 sUrl = String(sUrl).replace('\/'+sContentHostNode+'\/','\/'+sPortalHostNode+'\/'); }

 if (isPortalUrl(sUrl) && getPortalName(sUrl) != getPortalName(sHostUrl))
 return sUrl;   var sContentNode = getContentNode(sUrl); if(sContentNode != null){
 var sPortalNode = getNodeName(sUrl); sUrl = String(sUrl).replace('\/'+sPortalNode+'\/','\/'+sContentNode+'\/');  }
 

 var sHostURI = getUrlHost(sHostUrl); var sHostPSHome = getPSHome(sHostUrl); var sHostPortalName = getPortalName(sHostUrl); var sNodeName = getNodeName(sHostUrl); var UniNavPortalNode = typeof hostWin.ptNav2Info != 'undefined' ? hostWin.ptNav2Info.UniNavPortalNode : sPortalHostNode; var pos = sUrl.indexOf(sNodeName); sUrl = encodeURIComponent(sUrl); sUrl = sUrl + "&unifieddashboard=y"; var sReturnURL = sHostURI + '/psp/' + sHostPSHome + '/' + sHostPortalName + '/' + UniNavPortalNode +'/'+ 'h/?tab=REMOTEUNIFIEDDASHBOARD' + '&remotedburl=' + sUrl; return sReturnURL; }


function isRemoteDashboardURL(sUrl,hostWin) {
 var sHostUrl = hostWin.location.href;  var sContentNode = getContentNode(sUrl); if(sContentNode != null){
 var sPortalNode = getNodeName(sUrl); if(sContentNode != sPortalNode)
 return true; }
 
 var hptabname = ""; if (typeof sUrl == 'undefined' || sUrl.length == 0 || sUrl == null) return false; var res = document.cookie.match('(^|;)?' + "HPTabName" + '=([^;]*)(;|$)'); if (res)
 hptabname = res[2]; if (hptabname != "REMOTEUNIFIEDDASHBOARD")
 return false;  if (isUrlFrmModal(sUrl, window))
 return true; if (typeof hostWin.ptNav2Info == "undefined" || hostWin.ptNav2Info.UniNavRequest == "false")
 return false; if ((sUrl.indexOf('/psp/') != -1 && sUrl.indexOf('/h/') != -1 && sUrl.indexOf('&pslnkid') != -1 ))
 return true; else
 return false;}


function preProcessUrl(sUrl, hostWin, topWin, form) {

 sReturnUrl = sUrl;  if(isRemoteDashboardURL(sUrl,top)) {
 sReturnUrl = convToRemoteDashboardURL(sUrl,top); return sReturnUrl; }

 
 if ( isPortalUrl(sUrl) && !isPortalHomagPageUrl(sUrl) && !isRelativeUrl(sUrl)) {
 if(isHostWinPortal(sUrl, top)){
 sReturnUrl = convToHostURI(sUrl, top); return sReturnUrl; }
 } 
 
 
 if (isWorkCenter() || isModeless(modalID) || isPortalHomagPageUrl(sUrl) || !isPIAComponentUrl(sUrl))
 return sReturnUrl;  if (isPIAUrl(sUrl) && isInFrame(sUrl, hostWin, topWin) && isHostWinPIA(sUrl, hostWin))
 return sReturnUrl;  var winFirstParent = getFirstParentWin(); if (!winFirstParent)
 winFirstParent = topWin; if (isPIAUrl(sUrl) && isUrlFrmModal(sUrl, hostWin) && isHostWinPIA(sUrl, winFirstParent))
 return sReturnUrl;  if (!isInFrame(sUrl, hostWin, topWin) && (isPIAPagelet(sUrl, hostWin, topWin, form) || isPIAHtmlTempalteTarget(sUrl, hostWin, topWin, form))) {
 sReturnUrl = convToHostURI(sUrl, hostWin); return sReturnUrl; }

 
 if (isPIAUrl(sUrl) && isUrlFrmModal(sUrl, hostWin) && isHostWinPortal(sUrl, winFirstParent)) {
 sReturnUrl = convToHostURI(sUrl, winFirstParent); return sReturnUrl; }

 
 if (isPortalUrl(sUrl) && isHostWinPortal(sUrl, top)) {
 sReturnUrl = convToHostURI(sUrl, top); return sReturnUrl; }
 return sReturnUrl;}

function DoUrl(sOrigURL, form) {
 var bWorkCenter = isWorkCenter(); var sURL = preProcessUrl(sOrigURL, window, top, form); if (isPortalUrl(sURL)) {
 this.closeModal(); top.location.href = sURL; }
 else {
 window.location.href = sURL; }
}


function DoPortalUrl(sUrl) {
 
 if ( isPortalUrl(sUrl) && !isPortalHomagPageUrl(sUrl) && !isRelativeUrl(sUrl)) {
 if(isHostWinPortal(sUrl, top)){
 sReturnUrl = convToHostURI(sUrl, top); return sReturnUrl; } else {
 return sUrl; }
 } else {
 return sUrl; }
}

function StayInFrame() {
 var url = window.location.href; if (url.indexOf("PTNUI_NAVBAR") > 0)
 return true; if (url.indexOf("PTPN_POPUP_WINDOW") > 0)
 return true; if (url.indexOf("PTS_INTSRCH_COMP") > 0)
 return true; if (url.indexOf("PT_QAB_POPUP_FL") > 0)
 return true; return false;}

function DoUrlNUI() {
 if (window != top && isPortalUrl(top.location.href) && !StayInFrame())
 {
 
 
 top.location.href = window.location.href;    }
}


function convImgURLToABSUrl(value,sHostURL, bCrossDomain, strCurrUrl,bRCFModal)
{
if (!isRelativeUrl(value)) return value;if (sHostURL != null && sHostURL != "")
 {
 var sHostSite = getPSHome(sHostURL); if (sHostSite!= null)
 {
 var sLocSite = ""; var UrlArray; UrlArray = String(value).split('/'); if (UrlArray.length >3)
 sLocSite = UrlArray[2]; var newsite = sLocSite + "_newwin"; if(sLocSite != sHostSite && !(typeof bRCFModal != "undefined" && bRCFModal !=null && bRCFModal && newsite == sHostSite))
 value = String(value).replace('/'+sLocSite+'/','/'+sHostSite+'/'); }
 }

return convToABSUrl(value,sHostURL, bCrossDomain, strCurrUrl);}

function stripNewWin(url) {
 
 var strURI = url.match(/\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//); if (strURI && strURI.length > 2) { 
 var pos = strURI[2].lastIndexOf('_');  if(pos != -1){
 var suffix = strURI[2].substring(pos+1); var siteName; if(isNaN(suffix))
 siteName = strURI[2]; else
 siteName = strURI[2].substring(0, pos); if (siteName) 
 return url.replace(strURI[2], siteName); }
 }
 return url;}

function getURLQueryString(name, url) {
 if (url) {
 var iPos = url.indexOf("?"); url = url.substr(++iPos); if (url) {
 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); var r = url.match(reg); if (r != null) {
 return unescape(r[2]); }
 }
 }
 return null;}

function getCurrentWorkCenterId() {
 var curWorkCenterId = null; var eleWorkCenter = isWorkCenter(); if (eleWorkCenter) {
 curWorkCenterId = getURLQueryString("PTAL_ID", eleWorkCenter.getAttribute("src") || ""); }
 return curWorkCenterId;}

function getCookieValue(cName) 
{

var s, e, rv = "", ac = document.cookie;if (ac.length > 0) 
 {
 s = ac.indexOf(cName + "="); if (s !== -1) 
 {
 s += cName.length + 1;  e = ac.indexOf(";",s); if (e === -1) 
 { 
 e = document.cookie.length; }
 rv = decodeURIComponent(ac.substring(s,e)); }
 }
 return rv;}

function getRawCookieValue(cName) 
{

var s, e, rv = "", ac = document.cookie;if (ac.length > 0) 
 {
 s = ac.indexOf(cName + "="); if (s !== -1) 
 {
 s += cName.length + 1;  e = ac.indexOf(";",s); if (e === -1) 
 { 
 e = document.cookie.length; }
 rv = ac.substring(s,e); }
 }
 return rv;}

function setCookie(name,value,expires,path,domain,secure) 
{
 document.cookie = name + "=" + value +
 ((expires) ? "; expires=" + expires.toGMTString() : "") +
 ((path) ? "; path=" + path : "") +
 ((domain) && (domain != window.location.hostname) ? "; domain=" + domain : "") +
 ((secure) ? "; secure" : "") +
 ((name) ? "; samesite = Strict" : "");}





var bcUpdater = {

 
 
 
 
 
 
 
 
 
 
 

 
 breadCrumbHTML : "breadCrumbHTML",
 isMenuCrefNav : "isMenuCrefNav",
 isRCService : "isRCService",
 isGlobalSearch : "isGlobalSearch",
 searchText : "searchText",
 bcKeyList : "bcKeyList",

 advSearchLbl : "",
 ptdynnavbc : "ptdynnavbc",
 ptglbsearch : "ptglbsearch",
 sesCrefID : "sesCrefID",
 isBackBtnAct : "isBackBtnAct",
 bSessStorageSupp : true, 

addNUIToBC : function () {

 return false;  function hasClassicRoot() {
 return !!MTop().document.getElementById('pthnavbca_PORTAL_ROOT_OBJECT'); }
 
 
 if (this.getStoredData(this.isBackBtnAct ) == "true"){return;}

 var ptHist = getHistoryObject(); if (!ptHist || ptHist.size() === 0 || !ptHist.getCurrNUI()) { return; }

 
 if (typeof refererURL != 'undefined' && refererURL && refererURL.search("abnds") > -1 && !isFModeLayout()) { return; }

 var bcScroll; try {
 bcScroll = top.document.getElementById("pthbcUlScroll"); if (!bcScroll) { bcScroll = this.createBcList(); }
 
 
 
 if (top.document.querySelector("a[data-pt-nui-bc]")) {
 while (bcScroll.children.length > 2) { bcScroll.removeChild(bcScroll.children[0]); }
 }

 } catch(ex) { return; }

 var frag, crefId, url, crefLabel;   var createSep = function(append) {
 var bcSep = document.createElement("li"); var sClass = "pthnavhiearchysep " + (browserInfoObj2.isIE ? "pthbcdispinline" : "pthbcdispiblock"); bcSep.className = sClass; bcSep.setAttribute("role", "presentation"); bcSep.innerHTML = "&nbsp;"; if (append) {
 frag.appendChild(bcSep); } else {
 frag.insertBefore(bcSep,frag.firstChild); }
 };   var createBC = function() {
 
 var bcLi = document.createElement("li"); bcLi.id = "pthnavbccref_" + crefId; var sClass = "" + "pthnavbarcref " + (browserInfoObj2.isIE ? "pthbcdispinline " : "pthbcdispiblock ") + bcUpdater.ptdynnavbc; bcLi.className = sClass;  var bcAnc = document.createElement("a"); bcAnc.id = "pthnavbccrefanc_" + crefId; bcAnc.className = "ptntop"; bcAnc.href = url; bcAnc.setAttribute("role", "menuitem"); bcAnc.setAttribute("data-pt-nui-bc", crefLabel); bcAnc.innerHTML = crefLabel; ptEvent.add(bcAnc,"keydown",parent.pthNav.onKeyPressBC); ptEvent.add(bcAnc,"click",function(e) {
 ptHist.setFromBC(); try {
 var hRetVal = parent.pthNav.onClickCref.call(this, e); if (hRetVal === false) {
 e.preventDefault(); e.stopPropagation(); }
 } catch (ex) {}
 }
 );   var bcDiv = document.createElement("div"); bcDiv.className = "pthnavcrefimg"; bcDiv.innerHTML = "&nbsp;"; bcLi.appendChild(bcAnc);  bcLi.appendChild(bcDiv);  frag.appendChild(bcLi); }; frag = document.createDocumentFragment(); var h = ptHist.getCurrNUI();  crefId = h.pageName;   if (!!top.document.getElementById('pthnavbccrefanc_' + crefId)) {
 return; }
 
 url = h.url;   url = setQsParams(url, genUserQsParams(h));   if (getUrlHost(url) == getUrlHost(location.href) && getPSHomeSuffix(url) != getPSHomeSuffix(location.href) && getPSHome(url) == getPSHome(location.href))
 url = url.replace('/'+getPSHome(url)+getPSHomeSuffix(url)+'/', '/'+getPSHome(url)+getPSHomeSuffix(location.href)+'/'); crefLabel = h.label; createBC();   createSep(false); bcScroll.insertBefore(frag,bcScroll.firstChild); this.setStoredData(this.breadCrumbHTML, bcScroll.innerHTML); },

 updateBreadCrumbs : function(theForm) {

 
 if (this.updateNonPiaBreadcrumbs()) {
 return; }

 
 if (this.updateAppBreadCrumbs()) {
 return; } 

 
 var storedMenuCref = this.getStoredData(this.isMenuCrefNav);  if (typeof storedMenuCref === "undefined" || storedMenuCref !== "N") {
 this.removeStoredData("pt_history_last_nui"); }

 var bcList = top.document.getElementById("pthbcUlScroll"); if (!this.doBcUpdate(bcList, theForm)) {
 if (parent.pthNav) { 
 bcListUpdate = top.document.getElementById("pthbcUlScroll"); var bcArray; if(browserInfoObj2.isIE && browserInfoObj2.version == 11 && bcListUpdate) {
 var tmpEle = parent.document.createElement('div'); tmpEle.innerHTML = bcListUpdate.innerHTML;  bcArray = ptUtil.getElemsByClass("pthnavbarcref", tmpEle, "li");  } else {
 bcArray = ptUtil.getElemsByClass("pthnavbarcref", bcListUpdate, "li");  } 
 var curBcId = ""; for (i = 0; i < bcArray.length; i++) {
 
 
 if ((bcArray[i].id.indexOf("pthnavbccref") > -1) && (bcArray[i].className.indexOf("ptfakercfbc") < 0)) {
 curBcId = bcArray[i].id; }
 }
 if (parent.ptNav2Info && !parent.pthNav.portalObjName) {
 parent.ptNav2Info.selectedId = curBcId;  parent.pthNav.setPortalObjName(); }
 parent.pthNav.abn.search.resultsPromptCheck();  this.addNUIToBC();  var favsep = top.document.getElementById("pthnavfavsep"); if (favsep !=null && favsep.innerHTML == '&nbsp;') {
 favsep.innerHTML = "<span style='visibility:hidden'>:</span>"; }
 var seps=[]; if(browserInfoObj2.isIE && browserInfoObj2.version == 11 && bcListUpdate) {
 var tmpEle = parent.document.createElement('div'); tmpEle.innerHTML = bcListUpdate.innerHTML;  seps = ptUtil.getElemsByClass("pthnavhiearchysep", tmpEle, "li");  }
 else
 seps = ptUtil.getElemsByClass("pthnavhiearchysep", bcListUpdate, "li"); for (var i = 0; i < seps.length; i++) {
 var el = seps[i];  if (el !=null && el.innerHTML == '&nbsp;') {
 el.innerHTML = "<span style='visibility:hidden'>:</span>"; }
 } 
 
 } 
 if (typeof(strCurrUrl) != "undefined" && isWorkList(strCurrUrl))
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); if (typeof this.getStoredData("BreadCrumbHTML_WC") != "undefined" ) this.removeStoredData("BreadCrumbHTML_WC"); return; }
 if (typeof this.getStoredData("BreadCrumbHTML_WC") != "undefined" ) this.removeStoredData("BreadCrumbHTML_WC");  bcList = top.document.getElementById("pthbcUlScroll");  if (bcList != null) {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); }
 else {
 bcList = this.createBcList(); } 

 if (bcList) 
 {
 if (this.getStoredData(this.isGlobalSearch) == null) {
 if (this.removeBcElements(bcList, szCrefID)) 
 return; }

 this.appendBcElement(bcList, szCrefID, szCrefLabel); this.addNUIToBC(); }

 },

 
 updateNonPiaBreadcrumbs : function() {

 try {

 if (typeof top.pthNav == 'undefined' || !top.pthNav)
 return false;  var backCookie = backNavigation.getCookieValue(), bcList = top.document.querySelector("#pthbcUlScroll"); if (!backCookie || backNavigation.isPiaCookie(backCookie) || typeof bcList == 'undefined' || !bcList) { return false; }

 var isBackButtonAction = this.getStoredData(this.isBackBtnAct); if (isBackButtonAction) {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); return true; }

 
 while (bcList.children.length > 2) { bcList.removeChild(bcList.children[0]); }

 
 var frag = document.createDocumentFragment(); frag = this.createBC(frag, backCookie.url, backNavigation.crefId, backCookie.label, function(e){backNavigation.expireNonPiaCref(e);}, backNavigation.nonPiaClass); frag = this.createSep(frag, false); bcList.insertBefore(frag, bcList.firstChild);  ptUtil.addClass(bcList.lastElementChild, this.ptdynnavbc);   this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return true; } catch(e) {
 this.ErrorMessage(e, "updateNonPiaBreadcrumbs"); }

 },

 
 updateAppBreadCrumbs : function() {

 try {



 var updateAppHistory = function() {
 var eAppBreadCrumb = eAppBreadCrumbContainer.removeChild(eAppBreadCrumbContainer.children[1]); eAppBreadCrumbContainer.parentNode.removeChild(eAppBreadCrumbContainer); AddToHistory(eAppBreadCrumb.children[7].innerHTML, "", "", eAppBreadCrumb.children[6].innerHTML, 0, 0, "", 0, eAppBreadCrumb); corsHistoryTansaction();   return true; }

 

 var eAppBreadCrumbContainer = document.getElementById("pthnavappbc"); if (typeof szAppBC != 'undefined' && szAppBC) {
 
 if (typeof eAppBreadCrumbContainer != 'undefined' && eAppBreadCrumbContainer) {
 
 eAppBreadCrumbContainer.innerHTML = szAppBC; }
 else {
 
 var oBody = document.body; eAppBreadCrumbContainer = document.createElement("div"); eAppBreadCrumbContainer.setAttribute("id", "pthnavappbc"); if (browserInfoObj2.isIE && !browserInfoObj2.isEdge)
 eAppBreadCrumbContainer.style.setAttribute('cssText',"display:none"); else
 eAppBreadCrumbContainer.setAttribute('style',"display:none"); eAppBreadCrumbContainer.innerHTML = szAppBC; oBody.appendChild(eAppBreadCrumbContainer); }
 }

 if (backNavigation.classicBackButton.isUsed() || isFModeLayout()) {
 return updateAppHistory(); }
 else {
 return this.updateAppBC(); }

 }
 catch (e) {
 this.ErrorMessage(e, "updateAppBreadCrumbs"); }
 
 }, 
 

 updateAppBC : function() {
 if (typeof top.pthNav == 'undefined' || !top.pthNav)
 return false; top.pthNav.bAppBcUpdate = false;  if (typeof eAppBreadCrumbContainer == 'undefined' || !eAppBreadCrumbContainer || eAppBreadCrumbContainer.children.length <= 0) {
 return false; }

 
 var eSep = eAppBreadCrumbContainer.removeChild(eAppBreadCrumbContainer.children[0]); var eAppBreadCrumb = eAppBreadCrumbContainer.removeChild(eAppBreadCrumbContainer.children[0]); eAppBreadCrumbContainer.parentNode.removeChild(eAppBreadCrumbContainer);  var storedMenuCref = this.getStoredData(this.isMenuCrefNav);  if (typeof storedMenuCref !== "undefined" && storedMenuCref == "T")
 this.setStoredData(this.isMenuCrefNav, "F");  var isDashBoard = document.getElementById("remotedashboard"); if (typeof isDashBoard != 'undefined' && isDashBoard != null)
 return false;  var szHref = strCurrUrl; if (szHref.indexOf("?") > -1)
 szHref += "&"; else
 szHref += "?"; szHref += "IsFolder=false"; if (eAppBreadCrumb.children[10].innerHTML != "UnknownValue") {
 szHref += "&"; szHref += eAppBreadCrumb.children[10].innerHTML;  }
 eAppBreadCrumb.children[0].href = szHref;  var bcList = top.document.getElementById("pthbcUlScroll"); if (bcList != null) {
 if (typeof this.getStoredData(this.breadCrumbHTML) != 'undefined' && this.getStoredData(this.breadCrumbHTML))
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); else
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML);  var eDupBC = top.document.getElementById(eAppBreadCrumb.id);  var szContentId = eAppBreadCrumb.children[5].innerHTML; if (typeof eDupBC == 'undefined' || !eDupBC) {
 var nNextBC = 2; var eBcElement = bcList.children[bcList.children.length - 1]; while (ptUtil.isClassMember(eBcElement, "pthnavbarcref")) {
 if (eBcElement.children[0].href.search(szContentId) > -1) {
 eDupBC = eBcElement; break; }
 else 
 {
 eBcElement = bcList.children[bcList.children.length - 1 - nNextBC]; nNextBC += 2; }
 }
 }

 
 if (typeof eDupBC != 'undefined' && eDupBC) {
 while (eDupBC.nextSibling) {
 bcList.removeChild(eDupBC.nextSibling); }
 
 bcList.removeChild(eDupBC);  bcList.removeChild(bcList.children[bcList.children.length - 1]);  this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }

 
 this.setStoredData(this.breadCrumbHTML, this.getStoredData(this.breadCrumbHTML) + eSep.outerHTML + eAppBreadCrumb.outerHTML); bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList); }
 else {
 return false; }

 this.removeStoredData(this.isRCService); top.pthNav.bAppBcUpdate = true;   return true; },
 
 
 storeBcDomData : function() {

 
 

 try {

 var storeBreadrumbs = function() {
 var bcList = top.document.getElementById("pthbcUlScroll"); if (typeof bcList != 'undefined' && bcList) {
 
 if(browserInfoObj2.isIE && browserInfoObj2.version == 11) { 
 var tmpEle = top.document.createElement('div'); tmpEle.innerHTML = bcList.innerHTML; bcList = tmpEle; }
 var nIdx = bcList.children.length - 1; var eBcElement = bcList.children[nIdx]; if(nIdx>1 && (!eBcElement.children[0]||!eBcElement.children[0].href))eBcElement = bcList.children[nIdx-2];  while (ptUtil.isClassMember(eBcElement, "pthnavbarcref") || ptUtil.isClassMember(eBcElement, "pthnavbarfldr")) {
 var szUrlParts1 = eBcElement.children[0].href.split("/"); var szUrlParts2 = eBcElement.children[0].href.split("?"); if (nIdx < bcList.children.length - 1)
 el.value += szSep;    if (ptUtil.isClassMember(eBcElement, "ptappbc")) {
 bcUpdater.genBcElementData(el, "C", eBcElement.children[2].innerHTML, eBcElement.children[3].innerHTML, 
 eBcElement.children[4].innerHTML, eBcElement.children[5].innerHTML, eBcElement.children[6].innerHTML, 
 eBcElement.children[7].innerHTML, eBcElement.children[8].innerHTML, eBcElement.children[9].innerHTML,
 szUrlParts2[0], eBcElement.children[10].innerHTML); }
 
 else if (ptUtil.isClassMember(eBcElement, backNavigation.nonPiaClass)) {
 bcUpdater.genBcElementData(el, "C", eBcElement.id.substring(13), szUnknownValue, 
 szUnknownValue, szQsParts[0], szUnknownValue, eBcElement.children[0].innerHTML, 
 szUnknownValue, szUnknownValue, szUrlParts2[0], szUnknownValue);  } 
 
 else if (ptUtil.isClassMember(eBcElement, "pthnavbarcref")) {
 var szQsParts = szUrlParts1[8].split("?"); bcUpdater.genBcElementData(el, "C", eBcElement.id.substring(13), szUrlParts1[5], 
 szUrlParts1[6], szQsParts[0], szUnknownValue, eBcElement.children[0].innerHTML, 
 szUnknownValue, szUnknownValue, szUrlParts2[0], szUnknownValue); }
 
 else {
 bcUpdater.genBcElementData(el, "F", eBcElement.id.substring(9), szUrlParts1[5], 
 szUrlParts1[6], szUnknownValue, szUnknownValue, eBcElement.children[0].innerHTML, 
 szUnknownValue, szUnknownValue, eBcElement.children[0].href, szUnknownValue); }

 nIdx -= 2; eBcElement = bcList.children[nIdx]; }
 
 }
 else
 el.value = szUnknownValue;  }

 var storeHistoryStack = function() {
 var pt_history = getHistoryObject(); for (var nIdx = 0; nIdx < pt_history.size(); nIdx++ ) {
 var histRec = pt_history.nodes[nIdx];  if (histRec.valid) {
 if (nIdx > 0) { el.value += szSep; }

 var url = histRec.url.split("?")[0], urlParts = url.split("/"); var szPortalId = urlParts[5], szNodeId = urlParts[6], szComponentId; urlParts[8] == "" ? szComponentId = szUnknownValue : szComponentId = urlParts[8];  var szBcElementType = "C"; var szBcElementId = typeof histRec.appCrefid != 'undefined' && histRec.appCrefid ? histRec.appCrefid : szUnknownValue; var szPortalId = typeof histRec.appPortalid != 'undefined' && histRec.appPortalid ? histRec.appPortalid : szPortalId; var szNodeId = typeof histRec.appNodeid != 'undefined' && histRec.appNodeid ? histRec.appNodeid : szNodeId; var szContentId = typeof histRec.appComponentid != 'undefined' && histRec.appComponentid ? histRec.appComponentid : szComponentId; var szPageId = histRec.pageName; var szLabel = histRec.label; var szMode = typeof histRec.appMode != 'undefined' && histRec.appMode ? histRec.appMode : szUnknownValue; var szKeys = typeof histRec.appKeys != 'undefined' && histRec.appKeys ? histRec.appKeys : szUnknownValue; var szUrl = histRec.url; var szQs = typeof histRec.appQS != 'undefined' && histRec.appQS ? histRec.appQS : szUnknownValue; bcUpdater.genBcElementData(el, szBcElementType, szBcElementId, szPortalId, szNodeId, szContentId, szPageId, szLabel, szMode, szKeys, szUrl, szQs); }
 }
 }

 var el = document.getElementById("ICBcDomData"), szSep = "*", szUnknownValue = "UnknownValue"; if (typeof el != 'undefined' && el) {
 el.value = ""; backNavigation.classicBackButton.isUsed() || isFModeLayout() ? storeHistoryStack() : storeBreadrumbs(); } 

 
 
 } 
 catch (e) {
 this.ErrorMessage(e, "storeBcDomData"); }

 },

 
 genBcElementData : function(el, szBcElementType, szBcElementId, szPortalId, szNodeId, szContentId, szPageId, szLabel, szMode, szKeys, szUrl, szQs) {

 
 

 try {
 var szSep = "~"; el.value += szBcElementType; el.value += szSep; el.value += szBcElementId; el.value += szSep; el.value += szPortalId; el.value += szSep; el.value += szNodeId; el.value += szSep; el.value += szContentId; el.value += szSep; el.value += szPageId; el.value += szSep; el.value += szLabel; el.value += szSep; el.value += szMode; el.value += szSep; el.value += szKeys; el.value += szSep; el.value += szUrl; el.value += szSep; el.value += szQs; } 
 catch (e) {
 this.ErrorMessage(e, "genBcElementData"); }

 },
 
 updateBcForNuiToClassic : function(bcList){
 while(bcList.children.length > 2)
 bcList.removeChild(bcList.children[0]); },

 
 bcPreProcessForWC : function() {
 
 var bcList = top.document.getElementById("pthbcUlScroll"); if (bcList == null)
 return; var iframeObj = document.getElementById("ptifrmtgtframe"); if (iframeObj == null)
 return; var isBackButtonAction = this.getStoredData(this.isBackBtnAct ); var storedMenuCref = this.getStoredData(this.isMenuCrefNav); if (isBackButtonAction == "true") {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.isMenuCrefNav, "W");  return; }

 if (storedMenuCref == "N") {
 this.updateBcForNuiToClassic(bcList); this.addNUIToBC(); }

 if (typeof this.getStoredData(this.breadCrumbHTML) != "undefined" ) this.setStoredData("BreadCrumbHTML_WC", this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML);  this.setStoredData(this.isMenuCrefNav, "W");  },

 doBcUpdate : function(bcList, theForm) {

 try {
 var isBackButtonAction = this.getStoredData(this.isBackBtnAct ); var storedMenuCref = this.getStoredData(this.isMenuCrefNav);   if (typeof(top.pthNav) == "undefined" || 
 typeof(parent.pthNav) == "undefined" ||
 typeof(strCurrUrl) == "undefined" || 
 !this.isSessionStorageSupported() ||
 (typeof(theForm) === "undefined") || !theForm) {
 return false; } 

 if (parent.pthNav.isHomepage) {
 sessionStorage.removeItem("pt_history_last_nui"); return false; } 

 
 if (typeof bMenuSrchPage != 'undefined' && bMenuSrchPage) {
 this.setStoredData(this.isGlobalSearch, "BASIC"); this.setStoredData(this.searchText, szMenuSrchText); }
 
 
 if (isWorkList(strCurrUrl)) {
 if (storedMenuCref == "N" && isBackButtonAction != "true" ) {
 this.updateBcForNuiToClassic(bcList); }
 else if (isBackButtonAction == "true") 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); return false; }

 
 if (isBackButtonAction == "m") {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); return false; }

 
 if (typeof this.getStoredData(this.isGlobalSearch) != null && this.getStoredData(this.isGlobalSearch) == "REFINESEARCH") {
 if (bcList == null || typeof bcList == "undefined") {
 
 bcList = this.createBcList(); }

 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); if ((bcList.children != null || typeof bcList.children != "undefined") && bcList.children.length > 2) {
 
 for (var j = bcList.children.length; j > 2; j--) {
 bcList.removeChild(bcList.lastChild); }
 }

 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); this.cleanGlobalSearchParams(); return false; }

 
 if (this.getStoredData(this.isGlobalSearch) != null) {
 this.setStoredData(this.sesCrefID, szCrefID); return true; } 

 
 if (typeof theForm.children[1] != "undefined" && theForm.children[1] &&
 typeof(theForm.children[1].firstChild) != "undefined" && theForm.children[1].firstChild &&
 theForm.children[1].firstChild.nodeName == "#text") {
 return false; }

 
 var sScriptIsModal = 'var bIsModal = false; if (typeof(bDoModal_' + theForm.name + ') != "undefined") {bIsModal=bDoModal_' + theForm.name + ';}'
 eval(sScriptIsModal); var sScriptIsJsModal = 'var bIsJsModal = false; if (typeof(bJSModal_' + theForm.name + ') != "undefined") {bIsJsModal=bJSModal_' + theForm.name + ';}'
 eval(sScriptIsJsModal); if (bIsModal || bIsJsModal) {
 return false; }

 
 var abnContainer = document.getElementById("ptabncontainer"); if (abnContainer) { 
 return false; }

 
 
 
 
 
 var ptalPgltAreaContainer = isWorkCenter(); var bWorkCenterUpdate = !(typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType == 2); if (ptalPgltAreaContainer && bWorkCenterUpdate ) {
 if (storedMenuCref == "N" && isBackButtonAction != "true" ) {
 this.updateBcForNuiToClassic(bcList); }
 this.setStoredData(this.isMenuCrefNav, "W"); return false; }

 
 if (typeof szCrefSesSrchTxt != "undefined" && szCrefSesSrchTxt != null && 
 typeof szCrefSesID != "undefined" && szCrefSesID != null && (!bcList || bcList.children.length < 1)) {

 
 if (!bcList) {
 bcList = this.createBcList(); }
 
 
 this.setStoredData(this.isGlobalSearch, "BASIC"); szCrefSesSrchTxt = htmlDecode(htmlDecode(szCrefSesSrchTxt)); this.setStoredData(this.searchText, szCrefSesSrchTxt); this.appendBcElement(bcList, szCrefSesID, szCrefSesSrchTxt); bcList = top.document.getElementById("pthbcUlScroll");  if (this.getStoredData(this.isRCService) != null && this.getStoredData(this.isRCService) == "T") {
 this.removeStoredData(this.isRCService); return false; }

 }

 
 if (this.getStoredData(this.isRCService) != null && this.getStoredData(this.isRCService) == "T") {
 this.removeStoredData(this.isRCService); return false; }

 if (bcList == null) 
 return false;   var isDashBoard = document.getElementById("remotedashboard"); if (isDashBoard != null) {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); this.removeStoredData(this.isMenuCrefNav); return false; }
 
 
 
 
 if (typeof storedMenuCref !== "undefined" && storedMenuCref == "T") {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); this.setStoredData(this.isMenuCrefNav,"F"); return false; }

 
 if (typeof storedMenuCref !== "undefined" && storedMenuCref === "N") {
 this.removeStoredData(this.isMenuCrefNav);  var sHTML = this.getStoredData(bcUpdater.breadCrumbHTML); if ((sHTML && sHTML !== "" && /ptndbrd/.test(sHTML)) || isBackButtonAction == "true") {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); } else {
 this.setStoredData(this.breadCrumbHTML, "&nbsp;"); }
 
 

 return false;  }

 
 
 var bNullContent = false; if (typeof top.pthNav != 'undefined' && top.pthNav.bInitialized) {
 
 if (bcList.childNodes.length == 1 && bcList.innerHTML.search("hiddenHPBC") >= 0)
 bNullContent = true; if (bcList.innerHTML === "")
 bNullContent = true; }
 else {
 if (bcList.innerHTML == "&nbsp;")
 bNullContent = true; }
 if ((typeof storedMenuCref == 'undefined' || storedMenuCref == null) && bNullContent) {
 top.pthNav.isMenuCrefNav = "F"; }

 if ((typeof storedMenuCref == "undefined") || (storedMenuCref == null)) {
 
 if (top.pthNav.isMenuCrefNav == "T" && !bNullContent) {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); top.pthNav.isMenuCrefNav = "F"; return false; }
 else if (bNullContent){
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return true; }
 }

 
 if (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType == 0) {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; }

 
 if (bIncInNavigation == "F") {
 if (typeof nCrefBcUpdateType == 'undefined' ||
 (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType != 3)) {

 if (typeof this.getStoredData(this.breadCrumbHTML) !== "undefined") { 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); }

 if (typeof this.getStoredData("BreadCrumbHTML_WC") != "undefined" && typeof storedMenuCref != "undefined" && storedMenuCref == "W") { 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData("BreadCrumbHTML_WC")); this.removeStoredData("BreadCrumbHTML_WC"); }
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; }
 }

 
 
 var regPattern = new RegExp("id=.hiddenHPBC.*style=.*visibility *: *hidden","g"); if (typeof this.getStoredData(this.breadCrumbHTML) == "undefined" || !this.getStoredData(this.breadCrumbHTML) || regPattern.test(this.getStoredData(this.breadCrumbHTML))) {
 if (typeof bcList != "undefined" && bcList) {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }
 return false; }

 
 
 
 bcList = bcUpdater.replaceBreadCrumb(bcList, bcUpdater.getStoredData(bcUpdater.breadCrumbHTML)); if (typeof(bcList) != "undefined" && typeof(bcList.children) != "undefined" &&
 typeof(bcList.children[bcList.children.length - 1]) != "undefined" &&
 typeof(bcList.children[bcList.children.length - 1].children[0]) != "undefined" &&
 !ptUtil.isClassMember(bcList.children[bcList.children.length - 1], this.ptglbsearch)) {
 var strMatchUrl = strCurrUrl.split("?"); var strLastBcHref = bcList.children[bcList.children.length - 1].children[0].href;   if (ptUtil.isClassMember(bcList.children[bcList.children.length - 1],"ptfakercfbc")) {
 strMatchUrl[0] = strMatchUrl[0].replace(/psp/i, "psc"); } 
 
 if (document.getElementById("ICElementNum") != null) {
 var elemNum = document.getElementById("ICElementNum").value;  bcList = this.updateBCListState(elemNum, bcList); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }

 var strMatchUrlLocHref = null; if (typeof window.location.href && window.location.href) {strMatchUrlLocHref = window.location.href.split("?"); }
 if (strLastBcHref.search(strMatchUrl[0]) > -1 ||
 (strMatchUrlLocHref && strLastBcHref.search(strMatchUrlLocHref[0]) > -1) ||
 bcList.children[bcList.children.length - 1].id.search(szCrefID) > -1) {
 return false; }
 
 }
 

 if (this.getStoredData(this.isGlobalSearch) == null) {
 if (szCrefReged == "F") {
 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; }

 if (szCrefVisible == "F") {
 
 if (typeof nCrefBcUpdateType == 'undefined' ||
 (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType != 3)) {
 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; } 
 }
 }
 
 return true; }
 catch (e) {
 this.ErrorMessage(e, "doBcUpdate"); }

 },
 
 updateBCListState : function(elemNum, currBC){
 
 var newHref = ""; var currSite; var winNumURI = ""; var newWinNumURI = ""; for (var i=0; i < currBC.children.length; i++) { 
 if (ptUtil.isClassMember(currBC.children[i], "pthnavbarcref")){
 if ( isPortalUrl(currBC.children[i].firstChild.href) || isPIAUrl(currBC.children[i].firstChild.href)) {
 var siteName=bcUpdater.getSiteName(currBC.children[i].firstChild.href); currSite = siteName.split("_");  winNumURI = "/" + currSite.toString().replace(",", "_") + "/"; newWinNumURI = (elemNum == 0) ? ("/" + trimWindowsNumber(siteName) + "/") : ("/" + trimWindowsNumber(siteName) + "_" + elemNum + "/"); if (winNumURI != newWinNumURI) {
 newHref = currBC.children[i].firstChild.href; newHref = newHref.replace(winNumURI, newWinNumURI); currBC.children[i].firstChild.href =newHref; }
 }
 }
 } 
 return currBC; },

 getSiteName : function (crefURL) {
 var strURI = crefURL.match(/\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0]; var uriParts = strURI.split("/"); return uriParts[2];  },

 setBcListWidth : function(node) {
 var eNavContainer = top.document.getElementById("pthnavcontainer"); var ePortalRootObj = top.document.getElementById("pthnavbc_PORTAL_ROOT_OBJECT"); var npthbcScrollWidth = 500; if (eNavContainer && typeof eNavContainer != 'undefined' &&
 ePortalRootObj && typeof ePortalRootObj != 'undefined') {
 if('ltr'=='ltr') {
 npthbcScrollWidth = eNavContainer.clientWidth - (ePortalRootObj.offsetLeft + ePortalRootObj.clientWidth + 49); }
 else {
 npthbcScrollWidth = eNavContainer.clientWidth - (eNavContainer.clientWidth - ePortalRootObj.offsetLeft + 49 ); }
 }
 
 eNavContainer = null; ePortalRootObj = null;  if (browserInfoObj2.isIE) {
 try {
 
 
 
 node.style.setAttribute('cssText',"width: " + npthbcScrollWidth + "px;"); }
 catch (e) {
 }
 }
 else {
 node.setAttribute('style',"width: " + npthbcScrollWidth + "px;"); }
 },

 
 createSep : function(frag, append) {

 var bcSep = document.createElement("li"); var sClass = "pthnavhiearchysep " + (browserInfoObj2.isIE ? "pthbcdispinline" : "pthbcdispiblock"); bcSep.className = sClass; bcSep.setAttribute("role", "presentation"); bcSep.innerHTML = "&nbsp;"; if (append) {
 frag.appendChild(bcSep); } else {
 frag.insertBefore(bcSep,frag.firstChild); }

 return frag; },

 
 createBC : function(frag, url, id, label, eventHandler, classId) {

 
 var bcLi = document.createElement("li"); bcLi.id = "pthnavbccref_" + id; var sClass; if (typeof refererURL != 'undefined' && refererURL && refererURL.search("abnds") > -1 && !isFModeLayout()) {
 sClass = classId;  } 
 else {
 sClass = "" + "pthnavbarcref " + (browserInfoObj2.isIE ? "pthbcdispinline " : "pthbcdispiblock ") + bcUpdater.ptdynnavbc; if (typeof classId != 'undefined' && classId) { sClass += " " + classId; }
 }

 bcLi.className = sClass;  var bcAnc = document.createElement("a"); bcAnc.id = "pthnavbccrefanc_" + id; bcAnc.className = "ptntop"; bcAnc.href = url; bcAnc.setAttribute("role", "menuitem"); bcAnc.setAttribute("data-pt-nui-bc", label); bcAnc.innerHTML = label; if (typeof eventHandler != 'undefined' && eventHandler) {
 ptEvent.add(bcAnc,"keydown", eventHandler); ptEvent.add(bcAnc,"click", eventHandler); }

 
 var bcDiv = document.createElement("div"); bcDiv.className = "pthnavcrefimg"; bcDiv.innerHTML = "&nbsp;"; bcLi.appendChild(bcAnc);  bcLi.appendChild(bcDiv);  frag.appendChild(bcLi); return frag;  },

 createBcList : function() {

 
 

 
 

 try {
 
 var divBcScroll = document.createElement('div'); divBcScroll.setAttribute('id',"pthbcScroll"); divBcScroll.setAttribute('class',"pthbcscroll");  this.setBcListWidth(divBcScroll);   divBcScroll.innerHTML = "<ul id=\"pthbcUlScroll\" dir=\"ltr\"></ul>"; var prntElement = top.document.getElementById("pthnavbc"); var siblingElement = top.document.getElementById("pthbcScrollNext"); if (prntElement)
 prntElement.insertBefore(divBcScroll, siblingElement); bcList = top.document.getElementById("pthbcUlScroll"); return bcList; }
 catch (e) {
 this.ErrorMessage(e, "createBcList"); }
 
 },

 removeBcElements : function(bcList, crefId) {

 
 
 

 try {
 
 if (typeof bcList == "undefined" || bcList == null) {
 return; } 
 
 var theBC = top.document.getElementById("pthnavbccref_" + crefId);  if (typeof theBC == 'undefined' || theBC == null) {

 if (typeof strCurrUrl != "undfined" && strCurrUrl) {
 var szCmpUrl = strCurrUrl.split("?"); }
 else {
 return; }

 var bcListLength = bcList.children.length; for (var nIdx = 0; nIdx < bcListLength; nIdx++) {
 if (typeof bcList.children[nIdx] != "undefined" && bcList.children[nIdx] && 
 ptUtil.isClassMember(bcList.children[nIdx], "pthnavbarcref") && !ptUtil.isClassMember(bcList.children[nIdx], "ptglbsearch")) {
 if (typeof bcList.children[nIdx].children[0] != "undefined" && bcList.children[nIdx].children[0]) {
 var szBcUrl = bcList.children[nIdx].children[0].href.split("?");  if (szCmpUrl[0] == szBcUrl[0]) {
 theBC = bcList.children[nIdx]; crefId = theBC.id.substring(13);  break; }
 }
 }
 }
 }
 
 if (typeof theBC != 'undefined' && theBC != null) {
 var theLastBc = bcList.lastChild; while (theLastBc.id != ("pthnavbccref_" + crefId)) {
 bcList.removeChild(theLastBc); theLastBc = bcList.lastChild; }

 
 
 
 
 if (ptUtil.isClassMember(theBC, this.ptdynnavbc) && 
 ((typeof nCrefBcUpdateDNRK != 'undefined' && nCrefBcUpdateDNRK && nCrefBcUpdateDNRK != 1) || (typeof nCrefBcUpdateDNRK == 'undefined' || !nCrefBcUpdateDNRK))) {
 var urlParts = theBC.firstChild.href.split("?"); theBC.firstChild.href = urlParts[0]; if (typeof szCrefQS != 'undefined' && szCrefQS != null) {
 
 theBC.firstChild.href += "?"; theBC.firstChild.href += szCrefQS; theBC.firstChild.href += "&IsFolder=false"; }
 else {
 theBC.firstChild.href += "?IsFolder=false"; }

 
 
 this.storeKeyList(); }

 
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML);   this.cleanGlobalSearchParams();  parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList);   if (parent.pthNav.abn.search.searchEnabled && (parent.pthNav.portalObjName != parent.pthNav.getPortalObjName(theBC.id))) {
 parent.pthNav.setPortalObjName(theBC.id);   if (!parent.pthNav.isHomepage) {
 
 var bcLiEl = top.document.getElementById(parent.pthNav.bcCrefPrefix + parent.pthNav.portalObjName); if (bcLiEl) {
 var bcList = top.document.getElementById("pthbcUlScroll"); var bcChild = ""; var promptArray = new Array(); if (bcList && bcList.childNodes.length > 0) {
 for (var i=0; i < bcList.childNodes.length; i++){ 
 bcChild = parent.pthNav.abn.search.getLastChild(bcList.childNodes[i]); if (bcChild != null && bcChild.id.indexOf("ptabnsp_") > -1) {
 promptArray.push(bcChild); }
 } 
 }
 if (promptArray.length > 1) {
 promptArray[0].parentNode.removeChild(promptArray[0]);  }
 }
 }
 }
 




 
 if (parent.pthNav)
 parent.pthNav.abn.search.resultsPromptCheck();  return true; }

 return false; }
 catch (e) {
 this.ErrorMessage(e, "removeBcElements"); }
 
 },

 appendBcElement : function(bcList, crefId, crefLabel) {

 
 
 if(crefId == 'yyy' && crefLabel == 'zzz') return;  try {
 
 if (isWorkCenter()) {
 
 
 
 
 return; } 

 
 var bcLI; if (browserInfoObj2.isIE) 
 bcLI = "<li class=\"pthnavhiearchysep pthbcdispinline\" role=\"presentation\">&nbsp;</li>"; else
 bcLI = "<li class=\"pthnavhiearchysep pthbcdispiblock\" role=\"presentation\">&nbsp;</li>";  bcLI += "<li id=\"pthnavbccref_";  bcLI += crefId; bcLI += "\"";  bcLI += "class=\""; if (browserInfoObj2.isIE) 
 bcLI += "pthnavbarcref pthbcdispinline"; else
 bcLI += "pthnavbarcref pthbcdispiblock"; if (this.getStoredData(this.isGlobalSearch) != null) {
 
 bcLI += " " + this.ptglbsearch; }
 else {
 
 bcLI += " " + this.ptdynnavbc; }

 bcLI += "\">";  var bcAncId = "id=\"" + "pthnavbccrefanc_" + crefId + "\"";  bcLI += "<a class=\"ptntop\"" + bcAncId + "role=\"menuitem\" href=\""; if (this.getStoredData(this.isGlobalSearch) != null) {
 if (typeof bMenuSrchPage != 'undefined' && bMenuSrchPage) {
 
 
 bcLI += "#\">";  }
 else {
 bcLI += "#\">"; }
 }
 else {
 var strBcURL; var newStrCurrURL = strCurrUrl; if (document.getElementById("ICElementNum") != null) {
 
 var elemNum = document.getElementById("ICElementNum").value; var siteName=bcUpdater.getSiteName(newStrCurrURL); var currSite = siteName.split("_");  var winNumURI = "/" + currSite.toString().replace(",", "_") + "/"; var newWinNumURI = (elemNum == 0) ? ("/" + trimWindowsNumber(siteName) + "/") : ("/" + trimWindowsNumber(siteName) + "_" + elemNum + "/"); if (winNumURI != newWinNumURI) {
 
 newStrCurrURL = newStrCurrURL.replace(winNumURI, newWinNumURI); }
 }
 if (typeof szCrefQS != 'undefined' && szCrefQS != null) {
 
 if (newStrCurrURL.indexOf("?") > -1) {
 
 
 var strUrlParts = newStrCurrURL.split("?"); strBcURL = strUrlParts[0]; strBcURL += "?"; strBcURL += szCrefQS; strBcURL += "&"; strBcURL += strUrlParts[1]; strBcURL += "&"; }
 else {
 
 
 strBcURL = newStrCurrURL; strBcURL += "?"; strBcURL += szCrefQS; strBcURL += "&"; }
 }
 else {
 
 if (newStrCurrURL.indexOf("?") > -1) {
 strBcURL = newStrCurrURL; strBcURL += "&"; }
 else {
 strBcURL = newStrCurrURL; strBcURL += "?"; }
 }

 strBcURL += "IsFolder=false"; bcLI += strBcURL; bcLI += "\">";  }

 
 var eLabel = "Label Not Found", isAdvSearch = false; if (this.getStoredData(this.isGlobalSearch) == null) {
 if (typeof szCrefBcUpdateLabel != 'undefined') {
 
 eLabel = szCrefBcUpdateLabel; }
 else {
 eLabel = crefLabel; }
 }
 else { 
 if (this.getStoredData(this.isGlobalSearch) == "BASIC" || this.getStoredData(this.isGlobalSearch) == "SEARCHAGAIN") {

 

 if (this.getStoredData(this.searchText) == "-999999-" ||
 this.getStoredData(this.searchText) == "") { 
 eLabel = "\"...\""; }
 else {
 
 eLabel = "\"" + this.encodeString(this.snipLabel(this.getStoredData(this.searchText))) + "\""; }
 }
 else { 
 eLabel = "\"...\""; isAdvSearch = true; }
 }

 bcLI += eLabel; bcLI += "</a>"; bcLI += "<div class=\"pthnavcrefimg\">&nbsp;</div></li>";  if (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType == 1) {
 
 
 
 var bRemove = true; while (bRemove) {
 if (ptUtil.isClassMember(bcList.lastChild, "pthnavhiearchysep")) {
 bRemove = false; }
 bcList.removeChild(bcList.lastChild); }
 }
 
 
 
 this.removePersistedSrch(bcList);  if (this.getStoredData(this.isGlobalSearch) != null) {
 
 bcList = this.replaceBreadCrumb(bcList, bcLI); }
 else {
 
 this.appendKeyListToBcUrl(bcList); this.appendBreadCrumb(bcList, bcLI); }

 
 parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList);  var theBC = top.document.getElementById("pthnavbccref_" + crefId); if (parent.pthNav.abn.search.searchEnabled && (parent.pthNav.portalObjName != parent.pthNav.getPortalObjName(theBC.id))) {
 parent.pthNav.setPortalObjName(theBC.id);   if (!parent.pthNav.isHomepage) {
 
 var bcLiEl = top.document.getElementById(parent.pthNav.bcCrefPrefix + parent.pthNav.portalObjName); if (bcLiEl) {
 var bcList = top.document.getElementById("pthbcUlScroll"); var bcChild = ""; var promptArray = new Array(); if (bcList && bcList.childNodes.length > 0) {
 for (var i=0; i < bcList.childNodes.length; i++){ 
 bcChild = parent.pthNav.abn.search.getLastChild(bcList.childNodes[i]); if (bcChild != null && bcChild.id.indexOf("ptabnsp_") > -1) {
 promptArray.push(bcChild); }
 } 
 }
 if (promptArray.length > 1) {
 promptArray[0].parentNode.removeChild(promptArray[0]);  }
 }
 }
 }


 
 if (parent.pthNav)
 parent.pthNav.abn.search.resultsPromptCheck();    if (isAdvSearch) { bcList.style.display = "none"; }

 
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML);  if (this.getStoredData(this.isGlobalSearch) != null && browserInfoObj2.isIE) {
 var bcScroll = top.document.getElementById("pthbcScroll"); if (typeof bcScroll.style.width != "unknown" && typeof bcScroll.style.width != "undefined") 
 bcScroll.style.width = "300px"; }
 
 
 this.cleanGlobalSearchParams(); }
 catch (e) {
 this.ErrorMessage(e, "appendBcElement"); }
 
 },

 addBcCrefEvents : function (bcList, bSetEvents) {

 

 try {
 if (!bcList) {
 return; }

 var bSetCrefEvnts = true; if (bSetEvents != null && typeof bSetEvents != "undefined") {
 bSetCrefEvnts = bSetEvents; }

 
 for (var i=0; i < bcList.children.length; i++) {
 
 if (bSetCrefEvnts && 
 ptUtil.isClassMember(bcList.children[i], "pthnavbarcref") &&
 !ptUtil.isClassMember(bcList.children[i], "ptglbsearch") && 
 !ptUtil.isClassMember(bcList.children[i], "ptfakercfbc")) {
 if (ptUtil.isClassMember(bcList.children[i], backNavigation.nonPiaClass)) {
 
 ptEvent.add(bcList.children[i].firstChild,"keydown", function(e){backNavigation.expireNonPiaCref(e);}); ptEvent.add(bcList.children[i].firstChild,"click", function(e){backNavigation.expireNonPiaCref(e);});  } else {
 ptEvent.add(bcList.children[i].firstChild,"keydown", parent.pthNav.onKeyPressBC); ptEvent.add(bcList.children[i].firstChild,"click", parent.pthNav.onClickCref); }
 }
 
 if (ptUtil.isClassMember(bcList.children[i], "ptglbsearch") &&
 typeof top.searchGbl != 'undefined' && top.searchGbl) {
 ptEvent.remove(bcList.children[i].firstChild, "keydown"); ptEvent.remove(bcList.children[i].firstChild, "click"); ptEvent.add(bcList.children[i].firstChild, "keydown", top.searchGbl.onKeyPress); ptEvent.add(bcList.children[i].firstChild,"click", top.searchGbl.onClickSrchAgain);  } 
 
 }
 }
 catch (e) {
 this.ErrorMessage(e, "addBcCrefEvents"); }
 
 },

 removePersistedSrch : function(bcList) {

 
 try {
 if (bcList == null || bcList.lastChild == null || bcList.lastChild.lastChild == null) {
 return; }

 if (ptUtil.isClassMember(bcList.lastChild.lastChild, "ptabnsrchpromptbc")) {
 bcList.lastChild.removeChild(bcList.lastChild.lastChild); }
 }
 catch (e) {
 this.ErrorMessage(e, "removePersistedSrch"); }
 
 },

 storeKeyList : function() {
 

 try {
 var sep = ""; var keyList = ""; this.removeStoredData(this.bcKeyList); if (typeof PIA_KEYSTRUCT != 'undefined') {
 for(var szKeyId in PIA_KEYSTRUCT) {
 if (typeof szKeyId != 'undefined') {

 keyList += sep;  keyList += szKeyId; keyList += "="; keyList += PIA_KEYSTRUCT[szKeyId]; sep = "&"; }
 }
 this.setStoredData(this.bcKeyList, keyList); }
 }
 catch (e) {
 this.ErrorMessage(e, "storeKeyList"); }
 
 },

 appendKeyListToBcUrl : function(bcList) {

 
 
 

 try {
 if (this.getStoredData(this.bcKeyList) == null) {
 return; }

 
 if (bcList.children.length > 0) {
 var eCurrentBC = bcList.children[bcList.children.length - 1].firstChild; }
 else {
 return; }
 
 if (!ptUtil.isClassMember(eCurrentBC.parentNode, this.ptdynnavbc)) {
 
 return; }

 if (eCurrentBC.href.indexOf("?") > -1) {
 eCurrentBC.href += "&";  }
 else {
 eCurrentBC.href += "?";  }
 eCurrentBC.href += this.getStoredData(this.bcKeyList); this.removeStoredData(this.bcKeyList); }
 catch (e) {
 this.ErrorMessage(e, "appendKeyListToBcUrl"); }
 
 },

 getAdvSrchLblFrmCriteria : function(name, form) {

 try {
 
 
 var eAdvSrchBtn = document.getElementById("PTUS_ADV_SRCH_PTUS_SRCH_BTN"); if (typeof eAdvSrchBtn == 'undefined' || !eAdvSrchBtn)
 return;    if (name != "PTUS_ADV_SRCH_PTUS_SRCH_BTN" &&
 name != "#KEY\r" && name != "#KEY\r\n" && name != "#KEY\n" &&
 name != "PTUS_ADV_SRCH_CLEAR_BUTTON") {
 return; }

 
 
 var isHidden = true, bcUlScroll; try {
 bcUlScroll = top.document.getElementById("pthbcUlScroll"); if (bcUlScroll && ptUtil.getCSSValue(bcUlScroll,"display") !== "none") { 
 isHidden = false;  }
 } catch (ex) {}
 
 var showBCList = function () {
 if (isHidden) { 
 try { 
 bcUlScroll.style.display = "block";  isHidden = false; } catch (ex) {} 
 } 
 };  if (name == "PTUS_ADV_SRCH_PTUS_SRCH_BTN" || name == "#KEY\r" || name == "#KEY\r\n" || name == "#KEY\n") {

 var sep = " | "; this.advSearchLbl = ""; if (form.PTUS_ADV_SRCH_PTUS_KEYWORDS.value != "") { 
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_KEYWORDS.value; showBCList(); }

 if (form.PTUS_ADV_SRCH_PTUS_EXACT_PHRASE.value != "") { 
 if (this.advSearchLbl != "") { this.advSearchLbl += sep; }
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_EXACT_PHRASE.value; showBCList(); }

 if (form.PTUS_ADV_SRCH_PTUS_ANY_WORDS.value != "") { 
 if (this.advSearchLbl != "") { this.advSearchLbl += sep; }
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_ANY_WORDS.value; showBCList(); }
 
 if (form.PTUS_ADV_SRCH_PTUS_EXCLUDE.value != "") { 
 if (this.advSearchLbl != "") { this.advSearchLbl += sep; }
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_EXCLUDE.value; showBCList(); }

 
 var advSearchTxt = this.snipLabel(this.advSearchLbl); this.advSearchLbl = this.encodeString(advSearchTxt); }
 else if (name == "PTUS_ADV_SRCH_CLEAR_BUTTON") {
 this.advSearchLbl = "..."; showBCList(); }
 
 this.setStoredData(this.searchText, advSearchTxt);   }
 catch (e) {
 this.ErrorMessage(e, "getAdvSrchLblFrmCriteria"); }
 
 },

 updateAdvSearchLbl : function() {

 try {
 
 if (typeof(top.pthNav) == "undefined" || 
 typeof(parent.pthNav) == "undefined") {
 
 return; }
 
 var bcList = top.document.getElementById("pthbcUlScroll");  if (this.advSearchLbl == "" ||
 typeof bcList.children[1] == 'undefined' ||
 typeof bcList.children[1].children[0] == 'undefined' || 
 !ptUtil.isClassMember(bcList.children[1],"ptglbsearch")) {
 
 this.cleanGlobalSearchParams(); return; }

 
 bcList.children[1].children[0].innerHTML = "\"" + this.advSearchLbl + "\"";  this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }
 catch (e) {
 this.ErrorMessage(e, "updateAdvSearchLbl"); } 
 
 },

 snipLabel : function(szInString) {
 var cutOff = 15; if (szInString.length > cutOff) {

 if (szInString.charAt(cutOff - 1) == " " && this.advSearchLbl && this.advSearchLbl != "") {
 szInString = this.advSearchLbl.substring(0, cutOff - 1) + "..."; }
 else if (this.advSearchLbl.charAt(cutOff - 1) == "|") {
 szInString = szInString.substring(0, cutOff - 2) + "..."; }
 else {
 szInString = szInString.substring(0, cutOff) + "..."; }
 } 

 return szInString; },

 addPersSrchEvents : function() {

 

 try {
 var bcScroll = top.document.getElementById("pthbcUlScroll"); var nIdx = 0; while (nIdx < bcScroll.children.length) {
 var bcLi = bcScroll.children[nIdx]; var bcLiPersSrch = bcLi.children[2]; if (ptUtil.isClassMember(bcLi,this.ptdynnavbc) && bcLiPersSrch != null) {
 ptEvent.add(bcLiPersSrch,"click",parent.pthNav.onClickPrompt); ptEvent.add(bcLiPersSrch.firstChild,"click",parent.pthNav.onClickPrompt); ptEvent.add(bcLiPersSrch.firstChild,"keydown",parent.pthNav.onKeyPressBC); }
 nIdx++; }
 }
 catch (e) {
 this.ErrorMessage(e, "addPersSrchEvents"); }
 
 },

 appendBreadCrumb : function(bcList, szBreadCrumb) {
 bcList.innerHTML += szBreadCrumb; },

 replaceBreadCrumb : function(bcList, szBreadCrumb) {
 if (bcList == null)
 return; try {

 if (bcList != null && bcList.nodeName.toLowerCase() == "div") {
 
 
 var parentNode = bcList.parentNode; var bcListNew = parent.document.createElement("ul"); bcListNew.setAttribute('id',"pthbcUlScroll"); bcListNew.setAttribute('dir',"ltr"); parentNode.replaceChild(bcListNew, bcList); bcListNew.innerHTML = szBreadCrumb;  parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcListNew);  this.setBcListWidth(bcListNew.parentNode);   return bcListNew; } 
 else {
 bcList.innerHTML = szBreadCrumb;  parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList); this.setBcListWidth(bcList.parentNode);   return bcList; }
 }
 catch (e) {
 this.ErrorMessage(e, "replaceBreadCrumb"); }
 
 },

 setStoredData : function(szID, szValue) {
 if (!this.isSessionStorageSupported()) {
 return; }

 
 if (browserInfoObj2.isIE && browserInfoObj2.version <= 8 && szValue === "") { 
 szValue = " "; }
 
 try {
 sessionStorage[szID] = szValue; }catch(e){
 this.bSessStorageSupp = false; if (e.code == DOMException.QUOTA_EXCEEDED_ERR && sessionStorage.length == 0) 
 return;  else 
 throw e; }
 },

 getStoredData : function(szID) {
 if (!this.isSessionStorageSupported()) {
 return ""; } 
 
 return sessionStorage[szID]; },

 removeStoredData : function(szID) {
 if (!this.isSessionStorageSupported()) {
 return; } 
 
 sessionStorage.removeItem(szID); },

 clearStoredData : function() {
 sessionStorage.removeItem(this.breadCrumbHTML); sessionStorage.removeItem(this.isMenuCrefNav); sessionStorage.removeItem(this.isRCService); sessionStorage.removeItem(this.isGlobalSearch); sessionStorage.removeItem(this.searchText); sessionStorage.removeItem(this.bcKeyList);  if (top.pthNav && typeof top.pthNav != 'undefined') {
 top.pthNav.isMenuCrefNav = "F"; }
 },

 cleanGlobalSearchParams : function() {
 this.removeStoredData(this.isGlobalSearch); },

 removeRemoteData : function() {

 
 
 
 if (typeof bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) != 'undefined' &&
 bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) != null &&
 bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == "P") { 
 bcUpdater.removeStoredData(bcUpdater.isMenuCrefNav); }
 
 },
 
 isLocalStorageSupported : function() {
 if (typeof(localStorage) != "undefined") {
 return true; }

 return false; },

 isSessionStorageSupported : function() {
 if (this.bSessStorageSupp && (typeof(sessionStorage) != "undefined")) {
 return true; }
 this.bSessStorageSupp = false; return false; },

 encodeString : function(inValue) {
 
 var outValue = inValue; outValue = outValue.replace(/</g,"&lt;"); outValue = outValue.replace(/>/g,"&gt;"); return outValue; },

 decodeString : function(inValue) {
 
 var outValue = inValue; outValue = outValue.replace(/&lt;/g,"<"); outValue = outValue.replace(/&gt;/g,">"); return outValue; },
 
 ErrorMessage : function(e, inStr) {
 alert("Error in Breadcrumb Update function," + " " + inStr + ": " + e.message); } 

}





function UpdateHistory(label, keyData, userData, pageName, valid, userQueryString, nPost, bReturnToLastPage) {
 if (!backNavigation.shouldUpdateHistory(pageName)) {
 return; }

 if (_isBackButtonCompatibleMode()) {
 return _UpdateHistory(label, keyData, userData, pageName, valid, 
 userQueryString, nPost, bReturnToLastPage); }
 else {
 window.CorsHistoryTansactionListeners.readResult.push(function() {
 _UpdateHistory(label, keyData, userData, pageName, valid, userQueryString,
 nPost, bReturnToLastPage); }); }
}

function _UpdateHistory(label, keyData, userData, pageName, valid, userQueryString, nPost, bReturnToLastPage)
 {
 var pt_history = getHistoryObject(); var histRec; if (pt_history.size()) {
 histRec = pt_history.pop(); if (label !== "") {
 histRec.label = label; }

 if (!bReturnToLastPage) {
 histRec.isReturnToLastPage = 0; } else {
 histRec.isReturnToLastPage = 1;  }
 
 
 typeof histRec.appHistRecord != 'undefined' && histRec.appHistRecord ? (histRec.valid = 1, histRec.isReturnToLastPage = 1) : histRec.valid = valid;  if (backNavigation.isClassicSearch(histRec) && !isWorkCenter()) {
 histRec.valid = 0; }

 if (userData != "") histRec.userData = userData;  if (histRec.isWorkCenter) {
 var testRec = pt_history.pop(); if (testRec != null) {
 var PgltAreaFrame = top.document.getElementById('ptalPgltAreaFrame'); var testURL = PgltAreaFrame ? PgltAreaFrame. baseURI : null; if (typeof testURL == "undefined" || !testURL) { testURL = top.document.location.href; }
 if ( PgltAreaFrame && testRec.url == testURL) { histRec.valid = 0; }
 pt_history.push(testRec); }
 }

 
 
 if (userQueryString !== "") {
 histRec.userQs = userQueryString; histRec.url=removeUserQueryString(histRec.url,userQueryString); }

 if (typeof nPost != 'undefined' && nPost && nPost == 1)
 histRec.isPost = true; else
 histRec.isPost = false; pt_history.push(histRec); pt_history.save(); }
}

function BackHistoryPop()
{
 
 
 
 var pt_history = getHistoryObject(); if (pt_history && pt_history.size()) {
 pt_history.pop(); pt_history.save(); }
}


function UpdateSearchHistory(valid)
 {
 var pt_history = getHistoryObject(); var histRec; if (pt_history.size()) {
 histRec = pt_history.pop();  if (backNavigation.isClassicSearch(histRec) && !isWorkCenter()) {
 histRec.valid = valid; }

 pt_history.push(histRec); pt_history.save(); }
}

function UpdateLastHistoryItemUrl(forItem, newUrl) {
 var pt_history = getHistoryObject(); var histRec; if (pt_history.size()) {
 histRec = pt_history.pop(); if (histRec.label == forItem) {
 histRec.url = newUrl; }
 pt_history.push(histRec); pt_history.save(); }
}


function AddToHistory(label, keyData, userData, pageName, stateNum, elemNum, classicURL, dashboard, appBcData, nPost, userQueryString, bReturnToLastPage) {
 
 
 var bNewTab = false; if (window.history && window.history.length == 1)
 bNewTab = true; else if(window.history && window.history.length == 2 && browserInfoObj2.isSafari == true)
 bNewTab = true; if (bNewTab && backNavigation.shouldAddToHistory(pageName)) {
 resetHistory();  }

 backNavigation.classicBackButton.create(); if (!backNavigation.shouldAddToHistory(pageName)) {
 return; }
 if (_isBackButtonCompatibleMode()) {
 return _AddToHistory(label, keyData, userData, pageName, stateNum, elemNum, 
 classicURL, dashboard, appBcData, nPost, userQueryString,
 bReturnToLastPage); } else {
 window.CorsHistoryTansactionListeners.readResult.push(function() {
 _AddToHistory(label, keyData, userData, pageName, stateNum, elemNum,
 classicURL, dashboard, appBcData, nPost, userQueryString,
 bReturnToLastPage); }); }
}

function _AddToHistory(label, keyData, userData, pageName, stateNum, elemNum, classicURL, dashboard, appBcData, nPost, userQueryString, bReturnToLastPage) {
 var url = ""; if (isWorkCenter()) {
 var pgltAreaDoc = top.document.getElementById('ptalPgltAreaFrame'); if (typeof pgltAreaDoc.baseURI == 'undefined')
 url = pgltAreaDoc.ownerDocument.URL;  else
 url = pgltAreaDoc.baseURI;  if (typeof url == "undefined" || !url) { url = top.document.location.href; }
 }
 else if (typeof sHistURL !== "undefined") { 
 url = sHistURL; }

 var isClassic = isDashboard = false; if (isFModeLayout()) {
 bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "N"); bcUpdater.cleanGlobalSearchParams(); } else {
 if (typeof classicURL !== "undefined" && classicURL) {
 isClassic = true; if (typeof dashboard !== "undefined" && dashboard && !isWorkCenter()){
 isDashboard = true; url = classicURL; }
 }
 }

 
 
 
 if (!isFModeLayout() && typeof strCurrUrl != "undefined" && strCurrUrl && typeof sHistURL != "undefined" && sHistURL) {
 var strCurrUrlParts = strCurrUrl.split("/"), strHistUrlParts = sHistURL.split("/"); if (strCurrUrlParts.length >= 3 && strHistUrlParts.length >= 3) {
 var strCurrUrlDomain = strCurrUrlParts[2], strHistUrlDomain = strHistUrlParts[2]; if (strCurrUrlDomain != strHistUrlDomain) { url = url.replace(strHistUrlDomain, strCurrUrlDomain); }
 var strCurrUrlSiteId = strCurrUrlParts[4], strHistUrlSiteId = strHistUrlParts[4]; if (strCurrUrlSiteId != strHistUrlSiteId) { url = url.replace(strHistUrlSiteId, strCurrUrlSiteId); }
 }
 }

 
 if (url.search("abnds") && isClassic) { url = url.replace("/psc/","/psp/"); }

 
 
 if (url.search("PTSF_GBLSRCH_FLUID") > -1) {
 url = url.replace(/SEARCH_TYPE=BASIC/gi, "SEARCH_TYPE=SEARCHAGAIN"); url = url.replace(/SEARCH_TYPE=ADVANCED/gi, "SEARCH_TYPE=SEARCHAGAIN"); url = url.replace(/SEARCH_TYPE=MENUSEARCH/gi, "SEARCH_TYPE=SEARCHAGAIN"); if (url.search("SEARCH_TYPE=SEARCHAGAIN") <= -1) {
 var qsSep = "?"; if (url.indexOf("?") > -1) { qsSep = "&"; }
 url += qsSep; url += "SEARCH_TYPE=SEARCHAGAIN"; }
 }

 
 url = mergeUserQsParams(url, ["page"]); var pt_history = getHistoryObject(),
 historyData = new historyNode (label, pageName, url, keyData, userData, 1, stateNum, elemNum, isClassic, nPost),
 backBtn = ptUtil.id("PT_WORK_PT_BUTTON_BACK") || top.document.querySelector("#PT_WORK_PT_BUTTON_BACK"),
 histRec,
 topRec;  if (typeof appBcData != 'undefined' && appBcData) {
 historyData.appHistRecord = 1; historyData.appCrefid = appBcData.children[2].innerHTML; historyData.appPortalid = appBcData.children[3].innerHTML; historyData.appNodeid = appBcData.children[4].innerHTML; historyData.appComponentid = appBcData.children[5].innerHTML; historyData.appMode = appBcData.children[8].innerHTML; historyData.appKeys = appBcData.children[9].innerHTML; historyData.appQS = appBcData.children[10].innerHTML; if (appBcData.children[11].innerHTML == "1") { historyData.isClassic = 1; }

 historyData.url = historyData.url.split("/c/")[0] + "/c/" + appBcData.children[5].innerHTML + "?page=" + historyData.pageName; if (typeof historyData.isClassic != 'undefined' && historyData.isClassic) {
 historyData.cURL = historyData.url; }
 }
 
 
 
 if (!isWorkCenter()) {
 if (pt_history.size()){
 topRec = pt_history.pop(); if(topRec.pageName == historyData.pageName && topRec.label ==historyData.label && topRec.url==historyData.url){
 topRec.valid = 0;}

 pt_history.push(topRec); pt_history.save(); }
 }
 
 
 if (historyData.label.search("&amp;") > -1) {
 historyData.label = historyData.label.replace(/&amp;/g, ""); }

 
 if ((!isFModeLayout() && (historyData.pageName == '(search)' || (typeof bICList != "undefined" && bICList)) &&
 !isWorkCenter()) || historyData.pageName == 'PTS_NUI_GBLSRCH') {
 if (historyData.pageName == 'PTS_NUI_GBLSRCH') {
 topRec = pt_history.pop(); if (topRec.pageName != 'PTS_NUI_GBLSRCH')
 pt_history.push(topRec); pt_history.save(); }
 else
 historyData.valid = 0; }
 
 if (typeof userQueryString != 'undefined' && userQueryString !== "") {
 historyData.userQs = userQueryString; }
 
 historyData.isWorkCenter = 0; if (isWorkCenter()) {
 historyData.isWorkCenter = 1; var pt_history = getHistoryObject(); var testRec = pt_history.pop(); if (testRec) {
 if (testRec.url == url) { historyData.valid = 0; }
 pt_history.push(testRec); }
 }

 
 pt_history = backNavigation.addNonPiaBackRec(pt_history); if (_isBackButtonCompatibleMode()) {
 
 if (!backNavigation.isInHistory(historyData)) {
 var contentUrl = historyData.url;  if (typeof sHistURL != 'undefined' && !isFModeLayout() && (browserInfoObj2.isIE || browserInfoObj2.isEdge)) { contentUrl = sHistURL; }
 remoteDataGetter.createGetterComponents(contentUrl, "postBackHistoryMessage", backNavigation.addRemoteBackRec); }
 }

 if (!bReturnToLastPage) {
 historyData.isReturnToLastPage = 0; } else {
 historyData.isReturnToLastPage = 1;  }

 if (isDashboard) { historyData.cURL = url; }
 historyData.isDashboard = isDashboard; if (pt_history.size()) {
 var isFromBC = pt_history.isFromBC(); FixupBackToClassicSearch(historyData, pt_history); histRec = pt_history.lastValid(pageName, url, historyData); topRec = pt_history.pop(); if (topRec) {

 if (isFromBC) {
 pt_history.clearFromBC();  }

 
 
 if ((isFromBC || (topRec.isClassic && historyData.isClassic)) && !topRec.isDashboard && !backNavigation.classicBackButton.isUsed()) {
 topRec = pt_history.pop();  if (!topRec) {
 topRec = histRec = historyData; } else {
 histRec = pt_history.lastValid(pageName, url); }
 }

 pt_history.push(topRec);  if ((histRec && !histRec.isPost) ||
 topRec.url && topRec.url.split("?")[0] != url.split("?")[0] ||
 (topRec.pageName !== pageName && !backNavigation.isClassicSearch(historyData)) ||
 isWorkCenter() ||
 (backNavigation.isNuiSearch(historyData) && (typeof topRec.isReturnToSearch == "undefined" || topRec.isReturnToSearch == null || topRec.isReturnToSearch != 1)) ||
 (typeof appBcData != 'undefined' && appBcData && topRec.url && topRec.url.split("?")[0] != historyData.url.split("?")[0])) {
 if (typeof historyData.appHistRecord != 'undefined' && historyData.appHistRecord) {
 pt_history.pushAppHistRec(historyData); } else {
 pt_history.push(historyData); }
 }
 else if (backNavigation.isNuiSearch(historyData) && typeof topRec.isReturnToSearch != "undefined" && topRec.isReturnToSearch && topRec.isReturnToSearch == 1) {
 histRec = pt_history.lastValid(pageName, url); topRec.isReturnToSearch = 0; }

 
 var currPageRec = pt_history.pop();  pt_history.push(currPageRec); pt_history.save(); } 

 if (backBtn) {
 var objBackText = backBtn.querySelector(".ps-text"); var objBackImg = backBtn.querySelector(".ps-img"); if (typeof historyData.appHistRecord != 'undefined' && historyData.appHistRecord) {
 backNavigation.setLabel(objBackText, historyData.label, historyData, histRec); backNavigation.classicBackButton.isUsed() ? backNavigation.classicBackButton.show(backBtn.parentNode.parentNode) : ptUtil.removeClass(backBtn.parentNode.parentNode, "psc_disabled"); }
 else if (histRec && backBtn) {

 if (histRec.label != "" && pt_history.size() > 1) {
 backNavigation.setLabel(objBackText, histRec.label, histRec, historyData); backNavigation.setAltText(objBackImg); backNavigation.setTitle(objBackImg.parentNode.parentNode); backNavigation.setAriaLabel(objBackImg.parentNode, histRec.label, histRec, historyData); backNavigation.classicBackButton.isUsed() ? backNavigation.classicBackButton.show(backBtn.parentNode.parentNode) : ptUtil.removeClass(backBtn.parentNode.parentNode, "psc_disabled"); } else {
 objBackText.innerHTML = "Back"; if (typeof objBackImg != "undefined" && objBackImg) {
 backNavigation.setAltText(objBackImg); }
 }
 }

 if ((backBtn && pt_history.size() <= 1) || (histRec && !histRec.valid)) {
 if (typeof backBtn != "undefined" && backBtn &&
 typeof backBtn.parentNode != "undefined" && backBtn.parentNode &&
 typeof backBtn.parentNode.parentNode != "undefined" && backBtn.parentNode.parentNode ) {
 backNavigation.classicBackButton.isUsed() ? backNavigation.classicBackButton.hide(backBtn.parentNode.parentNode) : ptUtil.addClass(backBtn.parentNode.parentNode, "psc_disabled"); }
 }
 }
 } else { 
 
 if(historyData.valid != 0){
 pt_history.push(historyData); pt_history.save(); }
 if (backBtn) {
 backNavigation.classicBackButton.isUsed() ? backNavigation.classicBackButton.hide(backBtn.parentNode.parentNode) : ptUtil.addClass(backBtn.parentNode.parentNode, "psc_disabled"); }
 }

 
 
 
 if (isFModeLayout() || backNavigation.classicBackButton.isUsed()) { backNavigation.setCookie(historyData); }

}


function DoBackClassic() {
 try {
 var eTgtFrameWin = getPSIFrameContentWindow(top.document); var eDoBackHandler = null;  if (typeof eTgtFrameWin != "undefined" && eTgtFrameWin) {
 try{
 eDoBackHandler = eTgtFrameWin.document.getElementById("ancdobackclassic"); } 
 catch(e) 
 { 
 console.log("Error: exception in DoBackClassic-eTgtFrameWin.document");  }
 if(typeof eDoBackHandler == "undefined" || eDoBackHandler == null)
 {
 
 var strCurrUrl= document.URL; var strCurrUrlParts = strCurrUrl.split("/"); var strCurrUrlSiteId = strCurrUrlParts[4]; var UnsiteNametemp = strCurrUrlSiteId.lastIndexOf("_"); var UnsiteNameNewWin = strCurrUrlSiteId.substring(UnsiteNametemp + 1,strCurrUrlSiteId.length); if(isNaN(UnsiteNameNewWin)) {
 DoBack("win0"); }
 else
 {
 var sWinName="win"+UnsiteNameNewWin; DoBack(sWinName); } 
 }
 if (typeof eDoBackHandler != "undefined" && eDoBackHandler) { eDoBackHandler.click(); }
 }
 else if((typeof bIsOperationalDashboard == 'undefined' || !bIsOperationalDashboard) && typeof bIsDashboard != "undefined" && bIsDashboard) {
 eDoBackHandler = document.getElementById("ancdobackclassic"); if (typeof eDoBackHandler != "undefined" && eDoBackHandler) { eDoBackHandler.click(); }
 }
 } catch(e) { console.log("Error: DoBackClassic"); }
}

function DoBack(bForm, bWarning) {

 var history = getHistoryObject(); if (history == null) return; var thisRec; if (isWorkCenter()) {
 
 while (true) {
 thisRec = history.pop(); if (thisRec.valid) { break; }
 }
 } else {
 thisRec = history.pop(); }
 var backRec = history.updatedBack(); if ((typeof bWarning == "undefined" || bWarning) && DoGet(backRec, thisRec) && IsPageChanged()) { 
 var ssJsYesEvt = "";  var sJsNoEvt = 'javascript:DoBackService("' + bForm + '")';  psConfirmSW("", sJsNoEvt, window); } else { 
 DoBackService(bForm); }
 sessionStorage.setItem("isBackBtnAct", "true"); sessionStorage.removeItem("isRCService");}

function DoBackService(bForm) {
 var history = getHistoryObject(); if (history == null) return; var thisRec; if (isWorkCenter()) {
 
 while (true) {
 thisRec = history.pop(); if (thisRec.valid) { break; }
 }
 } else {
 thisRec = history.pop(); }

 var backRec = history.updatedBack(); if (history.size()==1 || thisRec == null || backRec == null) {
 var backObj = document.getElementById("PT_WORK_PT_BUTTON_BACK"); if (backObj) {
 backNavigation.classicBackButton.isUsed() ? backNavigation.classicBackButton.hide(backObj.parentNode.parentNode) : ptUtil.addClass(backObj, "psc_disabled"); }
 if (thisRec == null || backRec == null) return; }
 history.save();   if (DoGet(backRec, thisRec)) {
 
 
 var bDelete = true; if ((typeof backRec.isReturnToLastPage != "undefined" && backRec.isReturnToLastPage) ||
 (backRec.url.split("?")[0] == thisRec.url.split("?")[0] && !backRec.isPost))
 { bDelete = false; }
 
 
 while (bDelete && history.size() > 1) {
 var bottomNode = history.nodes[history.size() - 1];  if (backRec.url.split("?")[0] == bottomNode.url.split("?")[0] && 
 bottomNode.pageName.toLowerCase() != "(search)") { 
 history.pop();  } else {
 bDelete = false;  }
 }
 history.save(); var sUrl; if (!backRec.isClassic) {
 
 sUrl = backRec.url; } else {
 if(typeof backRec.cURL != 'undefined' && backRec.cURL.length > 0 && !backRec.isDashboard) {
 sUrl = backRec.cURL; } else {
 sUrl = backRec.url; }

 
 sUrl = backNavigation.classicBackButton.pspRequest(sUrl, backRec.isClassic); }


 
 

 
 

 
 sUrl = setQsParams(sUrl, genUserQsParams(backRec));  if (backRec.isReturnToLastPage) {
 sUrl.indexOf("?") > -1 ? sUrl += ("&Page=" + backRec.pageName) : sUrl += ("?Page=" + backRec.pageName); }

 
 history = backNavigation.expireNonPiaBackRec(backRec, history);  if (typeof bcUpdater != 'undefined' && bcUpdater && backRec && backRec.isDashboard) {
 bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "D"); }

 
 if ((thisRec.url.split("?")[0] == backRec.url.split("?")[0]) && backNavigation.isNuiSearch(backRec)) {
 backRec.isReturnToSearch = 1;  history.pop();  history.save(); }

 backNavigation.clearRemotePiaHistory(thisRec, backRec);   for (z=history.size()-1; z>=history.backIndex; z--) {
 history.pop(); }
 history.save();  var doBackServiceScripts = ""; if ((backRec && backRec.isWorkCenter) || (thisRec && thisRec.isWorkCenter)) {
 doBackServiceScripts = "top.location = \"" + sUrl + "\";"; } else if (typeof backRec != 'undefined' && backRec && backRec.isClassic) {
 doBackServiceScripts = "top.location = \"" + sUrl + "\";"; } else if (typeof backRec != 'undefined' && backRec && typeof backRec.isClassic != 'undefined' && 
 typeof window.parent != 'undefined' && window.parent &&
 typeof window.parent.location != 'undefined' && window.parent.location &&
 !backRec.isClassic && thisRec.isClassic) {
 
 doBackServiceScripts = "window.parent.location.href = \"" + sUrl + "\";"; } else {
 doBackServiceScripts = "window.location.href = \"" + sUrl + "\";"; }
 } else { 

 
 var backIndex = history.backIndex; while(history.size() > 1 && history.size() - 1 > backIndex) {
 history.pop(); }
 history.save();  genUserPostParams(backRec, bForm); var sEvent = "document." + bForm + ".ICPanelName.value = '" + backRec.pageName + "';\n submitAction_" + bForm + "(" + bForm + " ,'#ICBack');"; if (!isFModeLayout()) {
 
 sEvent = "var oContentWindow = top.document.getElementById('ptifrmtgtframe').contentWindow;\n"
 + "oContentWindow.document." + bForm + ".ICPanelName.value = '" + backRec.pageName + "';\n"
 + "oContentWindow.submitAction_" + bForm + "(oContentWindow.document." + bForm + ",'#ICBack');"; }
 if (typeof sUrl != "string") {
 sUrl = backRec.url; }
 doBackServiceScripts = sEvent; }

 if (_isBackButtonCompatibleMode()) {
 eval(doBackServiceScripts); return; }

 history.save(); if (isClassic(top.frames, true) && window === top) {
 var frameWin = getPSIFrameContentWindow(document); var referrerUrl = _getReferrerFromPsBack(); var isTopContentSameOrigin = isUrlBelongToSameOrigin(window.location.href, frameWin.location.href); var isContentReferrerSameOrigin = isUrlBelongToSameOrigin(referrerUrl, frameWin.location.href); var isTopReferrerSameOrigin = isUrlBelongToSameOrigin(window.location.href, referrerUrl); if (isTopReferrerSameOrigin) {
 eval(doBackServiceScripts); return; }
 if (!isContentReferrerSameOrigin && !isTopReferrerSameOrigin) {
 window.CorsHistoryTansactionListeners.writeResult.push(function() {
 eval(doBackServiceScripts); }); remoteDataGetter.createGetterComponents(window.location.href, "writeHistoryToRemote", null,
 referrerUrl, "_forDoBack"); return; }
 if (!isTopContentSameOrigin) {
 window.CorsHistoryTansactionListeners.writeResult.push(function() {
 eval(doBackServiceScripts); }); var writeHistoryMsg = {cmdType: "writeHistoryRequest", receiverData: _getCurrentWindowPtHistory()}; frameWin.postMessage(JSON.stringify(writeHistoryMsg), frameWin.location.origin); } 
 
 
 } else {
 window.CorsHistoryTansactionListeners.writeResult.push(function() {
 eval(doBackServiceScripts); }); writeHistoryToTop(); }
}

function IsPageChanged()
{
 var bChanged = false, bReturn = false; if (!isFModeLayout() && typeof top.frames != 'undefined' && top.frames)
 bChanged = checkAnyFrameChanged(top.frames); else
 bChanged = checkFrameChanged(window);  if (!bChanged && isClassic(top.frames))
 bChanged = checkAnyFrameChanged(top.frames); var agTarget = typeof document.getElementById("ICAGTarget") != 'undefined' && document.getElementById("ICAGTarget"); var agChanged = agTarget ? (typeof document.getElementById("ICUOW") != 'undefined' && document.getElementById("ICUOW") != null && document.getElementById("ICUOW").value != "N" ? true : false) : false; if (bChanged || agChanged) { bReturn = true; }

 return bReturn;}

function DoGet(backRec, thisRec) {
 var bDoGet = false; if (typeof backRec == "undefined" || !backRec || typeof thisRec == "undefined" || !thisRec) {
 return bDoGet; }

 var bPost = backRec.isPost && (thisRec.url.split("?")[0] == backRec.url.split("?")[0]); if (!bPost ||
 (backNavigation.classicBackButton.isUsed() && thisRec.url.split("?")[0] == backRec.url.split("?")[0] && backNavigation.isClassicSearch(backRec)) ||
 backNavigation.isNuiSearch(backRec)) { bDoGet = true; }

 return bDoGet; } 

function isClassic(frames, bUseNewRules) 
{ 
 var bClassic = false; if (typeof frames == 'undefined' || !frames)
 return bClassic;  for (var j=0; j < frames.length; ++j) {
 var objFrame = frames[j]; if (objFrame && !isCrossDomain(objFrame) && objFrame.bFMode == false) {
 if (bUseNewRules){
 frmWin = objFrame.frameElement; if (frmWin && 
 (frmWin.id == "ptifrmtgtframe" || (frmWin.className && frmWin.className.indexOf("ps_target-iframe") > -1))) {
 bClassic = true; break; } else {
 continue; }
 }
 bClassic = true; break; }
 }
 return bClassic;}

function DoURLWarning(url, histElement, backRec)
{
 DoURLWarningWithYesNoEvent(url, histElement, backRec, null, null);}

function DoURLWarningWithYesNoEvent(url, histElement, backRec, yesEvent, noEvent)
{
 var bChanged = false; if (!isFModeLayout() && typeof top.frames != 'undefined' && top.frames) 
 bChanged = checkAnyFrameChanged(top.frames); else {
 bChanged = checkFrameChanged(window); if (!bChanged && isClassic(top.frames)) 
 bChanged = checkAnyFrameChanged(top.frames); }

 var agTarget = typeof document.getElementById("ICAGTarget") != 'undefined' && document.getElementById("ICAGTarget"); var agChanged = agTarget ? (typeof document.getElementById("ICUOW") != 'undefined' && document.getElementById("ICUOW") != null && document.getElementById("ICUOW").value != "N" ? true : false) : false; if (bChanged || agChanged) {
 var sYes = yesEvent ? 'javascript:' + yesEvent : ''; if ((noEvent != null) && (noEvent.indexOf("processing_") == 0))
 noEvent = noEvent + "(1,3000);"; if(url.indexOf('cmd=logout') != -1)
 var sNo = 'javascript:clearSessionStorageRemote(); window.location.href = "' + url + '"' ; else
 var sNo = noEvent ? 'javascript:' + noEvent + 'window.location.href = "' + url + '"' : 'javascript:window.location.href = "' + url + '"'; psConfirmSW(sYes, sNo, window); }
 else if (typeof backRec != 'undefined' && backRec && backRec.isWorkCenter) {
 if ((noEvent != null) && (noEvent.indexOf("processing_") == 0) && (typeof window[noEvent] == 'function'))
 window[noEvent](1,3000);  if(url.indexOf('cmd=logout') != -1)
 clearSessionStorageRemote();  top.location = url; }
 else {
 if ((noEvent != null) && (noEvent.indexOf("processing_") == 0) && (typeof window[noEvent] == 'function'))
 window[noEvent](1,3000);  if(url.indexOf('cmd=logout') != -1)
 clearSessionStorageRemote();  window.location.href = url; }
}

function clearSessionStorageRemote(){
 
 var nodes = getCookieValue('PS_LOGINLIST').split(' '); var i,values,remoteNodeUrl,dbName,iframeUrl,ifrm,protocol; if(nodes != "" && nodes != "undefined"){
 for (i = 0; i < nodes.length; i++) {
 values = nodes[i].split('/'); protocol = values[0]; remoteNodeUrl = values[2]; dbName = values[3].split('x')[0]; iframeUrl = protocol+'//'+remoteNodeUrl+'/psc/'+values[3]+'/EMPLOYEE/'+dbName+'/s/WEBLIB_CLRSSN.ISCRIPT1.FieldFormula.IScript_clearSession?cmd=smartnav'; ifrm = document.createElement("iframe"); ifrm.setAttribute("id","iframe_"+dbName); ifrm.setAttribute("src",iframeUrl); ifrm.style.display = "none"; document.body.appendChild(ifrm); var start = new Date().getTime(); for (var j = 0; j < 1e7; j++) {
 if((new Date().getTime() - start) > 500){
 break; }
 } 
 }
 }
 else 
 sessionStorage.clear();}

function fixUpBackButton() {
 var backBtn = ptUtil.id("PT_WORK_PT_BUTTON_BACK"), pt_history = getHistoryObject(); if (backBtn && pt_history) {
 var objBackText = backBtn.querySelector(".ps-text"), backRec = pt_history.nodes[pt_history.backIndex]; if (pt_history.size() > 1 && backRec) {
 if (!isAGMode()) {
 
 if(backRec.valid !=0){
 objBackText.innerHTML = backRec.label; backNavigation.setLabel(objBackText, backRec.label);  backNavigation.setTitle(objBackText.parentNode.parentNode); backNavigation.setAriaLabel(objBackText.parentNode, backRec.label); ptUtil.removeClass(backBtn.parentNode.parentNode, "psc_disabled"); }
 }
 } else {
 objBackText.innerHTML = "Back"; var objBackImg = backBtn.querySelector(".ps-img"); if (typeof objBackImg != "undefined" && objBackImg) {
 objBackImg.setAttribute("alt", ""); }
 }
 }
}

function FixupBackToClassicSearch(historyData, pt_history) {
 if (isWorkCenter()) { return; }
 if (pt_history && (backNavigation.isClassicSearch(historyData) || (typeof bICList != "undefined" && bICList))) {
 while(true) {
 var index = pt_history.size()-1; var latestNode = pt_history.nodes[index]; if(latestNode == null || historyData==null) { break; }
 if ((historyData.url.split("?")[0] != latestNode.url.split("?")[0]) || backNavigation.isClassicSearch(latestNode)) { break; }
 if (historyData.url.split("?")[0] == latestNode.url.split("?")[0]) { pt_history.pop(); }
 } 
 }
}

function updClassicHistory() {
 _updClassicHistory(); if (!_isBackButtonCompatibleMode()) {
 var writeHistoryObj = {cmdType : "writeHistoryRequest", receiverData: _getCurrentWindowPtHistory()}; top.window.postMessage(JSON.stringify(writeHistoryObj), top.window.location.origin); }
}

function _updClassicHistory() {

 var h = getHistoryObject(); if (h.size() === 0) { return; }

 var n = h.getCurrClassic(); if (!n) { return; }

 
 if (n.appHistRecord) { return; }

 var url = ""; if (typeof strCurrUrl !== "undefined" && strCurrUrl && strCurrUrl != "") {
 var keyList = "", hasPageQS = false; url = strCurrUrl;  var page_portal_cref_adm=false; if (strCurrUrl.indexOf("?") !== -1) {
 url = strCurrUrl.split("?")[0]; var qVars = strCurrUrl.split("?")[1].split("&"); var bFirstKey = true; for (var i = 0; i < qVars.length; i++) {
 qParamNameValue = qVars[i].split("="); if (typeof qParamNameValue[0] != "undefined" && qParamNameValue[0] && typeof qParamNameValue[1] != "undefined" && qParamNameValue[1] && qParamNameValue[0].toLowerCase() != "page" ) {
 if (bFirstKey) { bFirstKey = false; keyList += "?"; } else { keyList += "&"; } 
 keyList += qVars[i]; } 
 else{
 if(typeof qParamNameValue[0] != "undefined" && qParamNameValue[0] && qParamNameValue[0].toLowerCase() == "page" && typeof qParamNameValue[1] != "undefined" && qParamNameValue[1] && qParamNameValue[1] == "PORTAL_CREF_ADM"){
 page_portal_cref_adm=true; }
 }
 
 }
 } 

 if (keyList === "") {
 bFirstKey = true; if (typeof PIA_KEYSTRUCT !== "undefined") {
 try {
 for (var key in PIA_KEYSTRUCT) {
 if (bFirstKey) { bFirstKey = false; keyList += "?"; } else { keyList += "&"; } 
 keyList += key; keyList += "="; keyList += PIA_KEYSTRUCT[key]; }
 } catch (e) {}
 }
 }
 if (keyList != "") { url += keyList; }

 var isPSP = false; try {

 if (!isCrossDomain(top)) {
 if (typeof top.pthNav !== "undefined" && typeof parent.pthNav !== "undefined") {
 isPSP = true; }
 }
 } catch (ex) {}


 if (isPSP) {
 url = url.replace("/psc/","/psp/"); } else {
 url = url.replace("/psp/","/psc/"); }
 } 

 if(page_portal_cref_adm != true){
 if (url !== "") {
 
 if (n.url.split("/")[2] != url.split("/")[2]) {
 url = url.replace(url.split("/")[2], n.url.split("/")[2]); }

 
 if(typeof n.url != "undefined" && n.url && typeof url != "undefined" && url) {
 var Comp1 = n.url.split("/")[8]; var Comp2 = url.split("/")[8]; if(typeof Comp1 != "undefined" && Comp1 && typeof Comp2 != "undefined" && Comp2) {
 if (Comp1.split("?")[0] == Comp2.split("?")[0]) { n.cURL = url; }
 }
 }
 } else {
 n.cURL = n.url; }
 }

 h.save();}

function genUserQsParams(histRec) {
 try {
 var szQs = "", paramCnt = 1; if (histRec && typeof histRec.userQs !== "undefined" && histRec.userQs && histRec.userQs !== "") {
 var qsObject = JSON.parse(histRec.userQs.replace(/&quot;/g, "\"")); if (typeof qsObject != "undefined" && qsObject) {
 for (var paramId in qsObject) {
 if (paramCnt > 1) { szQs += "&"; }
 szQs += paramId; szQs += "="; szQs += encodeURIComponent(qsObject[paramId]); paramCnt++; }
 }
 }
 return szQs; } catch (e) {
 exceptionMessage(e, "genUserQsParams"); }
}

function setQsParams(sUrl, szUserQs) {
 try {
 
 if (typeof sUrl !== "undefined" && sUrl &&
 typeof szUserQs !== "undefined" && szUserQs && szUserQs !== "") {
 sUrl.indexOf("?") > -1 ? (sUrl.charAt(sUrl.length - 1) === "&" ? sUrl += szUserQs : sUrl += ("&" + szUserQs)) : (sUrl += ("?" + szUserQs)); }
 
 return sUrl; } catch (e) {
 exceptionMessage(e, "setQsParams"); }
}

function genUserPostParams(histRec, formName) {
 try {
 divHiddenFields = document.querySelector("#" + formName + "divPSHIDDENFIELDS"); if (typeof divHiddenFields !== "undefined" && divHiddenFields && histRec && typeof histRec.userQs !== "undefined" && histRec.userQs && histRec.userQs !== "") {
 var qsObject = JSON.parse(histRec.userQs.replace(/&quot;/g, "\"")); if (typeof qsObject != "undefined" && qsObject) {
 for (var paramId in qsObject) {
 
 inputEl = divHiddenFields.querySelector("#" + paramId); if (typeof inputEl == "undefined" || !inputEl) { inputEl = document.createElement("input"); }

 inputEl.setAttribute("type", "hidden"); inputEl.setAttribute("name", paramId); inputEl.setAttribute("id", paramId); inputEl.setAttribute("value", encodeURIComponent(qsObject[paramId])); divHiddenFields.appendChild(inputEl); }
 }
 }
 } catch (e) {
 exceptionMessage(e, "genUserPostParams"); }
}

function getHistoryObjectFromStr(inString)
{
 var histObj = null; var historyStr = inString; if (historyStr && historyStr !== "") {
 var obj = JSON.parse(historyStr); if (obj) {
 if (backNavigation.isHistoryStack(obj)) { 
 histObj = new PT_Stack(); histObj.nodes = obj.nodes; histObj.backIndex = obj.backIndex; } else { 
 histObj = obj; }
 }
 }
 return histObj;}

function getHistoryObject()
{
 var histObj = new PT_Stack(); var historyStr = sessionStorage.getItem("pt_history"); if (historyStr && historyStr !== "") {
 var obj = JSON.parse(historyStr); histObj.nodes = obj.nodes; histObj.backIndex = obj.backIndex; }
 return histObj;}

function historyNode (label, pageName, url, keyData, userData, valid, stateNum, elemNum, isClassic, nPost) {
 this.label = label; this.pageName = pageName; this.url = url; this.keyData = keyData; this.userData = userData; this.valid = valid; this.stateNum = stateNum; this.elemNum = elemNum; this.isClassic = isClassic; if (typeof nPost != 'undefined' && nPost == 1)
 this.isPost = true; else
 this.isPost = false; if (isWorkCenter()) {
 this.workCenterId = getCurrentWorkCenterId(); } else {
 this.workCenterId = null; }
}

function PT_Stack() 
{
 
 this.nodes = [];  this.backIndex = this.nodes.length; this.push = function(data) {
 if (!data) { return; }
 this.nodes.push(data); if (!data.isClassic) {
 this.setCurrNUI(data); }
 }; this.pushAppHistRec = function(data) {
 
 if (!data) { return; }
 var topRec = this.nodes.pop(); this.nodes.push(data); this.nodes.push(topRec); }; this.pop = function() { return this.nodes.length ? this.nodes.pop() : null; }; this.unshift = function(el) { this.nodes.unshift(el); }; this.setBackIndex = function(idx) { this.backIndex = idx; }; this.print = function() { return this.nodes; };  this.size = function() { return this.nodes.length; }; this.save = function() {
 try {
 sessionStorage.setItem("pt_history", JSON.stringify(this)); }catch(e){ return; }
 }; this.lastValid = function(pageName, url, historyData) {
 var nMaxIndex = this.size() - 1; if (isWorkCenter()) {
 
 var curWorkCenterId = getCurrentWorkCenterId(); for (var j = this.size() - 1; j >= 0; j--) {
 if (this.nodes[j].valid && this.nodes[j].isWorkCenter) {
 nMaxIndex = j - 1; if (this.nodes[j].workCenterId != curWorkCenterId && curWorkCenterId != null)
 nMaxIndex = j; break; }
 }
 }

 
 if (typeof historyData != "undefined" && historyData && backNavigation.isClassicSearch(historyData)) {
 var bBackToSearch = false; for (var k = nMaxIndex; k >= 0; k--) {
 if (historyData.url.split("?")[0] != this.nodes[k].url.split("?")[0]) { 
 break;  }
 else if (historyData.url.split("?")[0] == this.nodes[k].url.split("?")[0] && backNavigation.isClassicSearch(this.nodes[k]) && this.backIndex <= nMaxIndex) { 
 bBackToSearch = true;  break;  }
 }
 if (bBackToSearch) { return this.nodes[this.backIndex]; }
 }

 for (var i = nMaxIndex; i >= 0; i--) {
 if (this.nodes[i].valid &&
 ((!this.nodes[i].isPost) ||
 (!backNavigation.isClassicSearch(this.nodes[i]) && pageName != this.nodes[i].pageName) ||
 (url.split("?")[0] != this.nodes[i].url.split("?")[0]) ||
 (backNavigation.isNuiSearch(this.nodes[i]) && (typeof this.nodes[i].isReturnToSearch == "undefined" || this.nodes[i].isReturnToSearch == null || this.nodes[i].isReturnToSearch != 1)))) {
 this.backIndex = i; break; }
 }
 return this.nodes[this.backIndex]; }; this.lastValidNUI = function(pageName, url) {
 for (var i = this.size() - 1; i >= 0; i--) {
 if (!this.nodes[i].isClassic && this.nodes[i].valid &&
 (pageName != this.nodes[i].pageName ||
 url.split("?")[0] != this.nodes[i].url.split("?")[0])) {
 this.backIndex = i; break; }
 }
 return this.nodes[this.backIndex]; };  this.getCurrNUI = function() {
 var h = sessionStorage.getItem("pt_history_last_nui"); return h && h !== "" ? JSON.parse(h) : null; };  this.setCurrNUI = function (h) {
 if (!h || !isFModeLayout()) { return; }

 var url = keyList = "", currNUI = {}; currNUI.pageName = h.pageName; currNUI.url = h.url; currNUI.label = h.label;  if (typeof h.userQs != "undefined" && h.userQs && h.userQs != "") {
 currNUI.userQs = h.userQs; }

 
 try {
 url = currNUI.url; } catch (ex) {}

 if (url !== "") {
 url += keyList; currNUI.url = url; }
 try {
 sessionStorage.setItem("pt_history_last_nui", JSON.stringify(currNUI)); } catch(e) {}
 }; this.setFromBC = function() {
 try {
 sessionStorage.setItem("pt_history_bc_to_nui", "true"); }catch(e){}
 }; this.isFromBC = function() {
 var v = sessionStorage.getItem("pt_history_bc_to_nui"); return v && v === "true" ? true : false; }; this.clearFromBC = function() {

 try {
 sessionStorage.removeItem("pt_history_bc_to_nui"); } catch (ex) {}

 }; this.getCurrClassic = function() { 
 var cNode = null; for (var i = this.size() - 1; i >= 0; i--) {
 if (this.nodes[i].isClassic) {
 cNode = this.nodes[i]; break; }
 }
 return cNode; }; this.updatedBack = function() {
 for (var i = this.backIndex+1; i < this.nodes.length; i++)
 this.nodes.pop(); return this.nodes[this.backIndex]; };}

function clearHistory()
{
 if (_isBackButtonCompatibleMode()) {
 clearHistoryInternal(); } else {
 if (window.isHistoryInSync) {
 setTimeout(clearHistory, 100); } else {
 clearHistoryInternal(); }
 }
}

function clearHistoryInternal() 
{
 var pt_history = getHistoryObject(); if (!pt_history || pt_history.size() <=1) return; var lastRec = pt_history.pop(); sessionStorage.removeItem("pt_history"); pt_history = getHistoryObject(); pt_history.push(lastRec); pt_history.save(); var backBtn = ptUtil.id("PT_WORK_PT_BUTTON_BACK") || top.document.querySelector("#PT_WORK_PT_BUTTON_BACK"); if (pt_history.size() <= 1 && backBtn) {
 backNavigation.classicBackButton.isUsed() ? backNavigation.classicBackButton.hide(backBtn.parentNode.parentNode) : ptUtil.addClass(backBtn.parentNode.parentNode, "psc_disabled"); }
 
 
 var localUrl =lastRec.url.split("?")[0]; var machineName =localUrl.split("/")[2];  var pt_wrapper = document.getElementById("PT_WRAPPER"); if (pt_wrapper && ptUtil.isClassMember(pt_wrapper, "pt_homepage")) {
 if (typeof remoteUrls != 'undefined' && remoteUrls) {
 
 for (var i = 0; i < remoteUrls.length; i++) {
 if(remoteUrls[i].indexOf(machineName) == -1)
 remoteDataGetter.createGetterComponents(window.location.href, "deleteRemoteHistory", null, remoteUrls[i], i);  }
 if (_isBackButtonCompatibleMode()) {
 
 setTimeout(function(){for (var j = 0; j < remoteUrls.length; j++) {remoteDataGetter.delGetterComponents(null, j);}}, 1000); }
 }
 }
}

function resetHistory() {
 if (typeof(sessionStorage) != "undefined") { sessionStorage.removeItem("pt_history"); }
}

function ClickAndHold(elem, action, start) {
 var t; elem.onmousedown = function() {
 t = setTimeout(action, start); }

 elem.onmouseup = function () {
 clearTimeout(t); }

 elem.onmouseout = function () {
 clearTimeout(t); }
}

function GetAllHistory()
{
 alert("test");}

function mergeUserQsParams(Url,QsNeedRemove){
 if(Url.indexOf("?") === -1) return Url; var urlParts = Url.split("?"); var targetUrl = urlParts[0]; var qsList = urlParts[1].split("&"); var dict = Object.create(null); var qsNeedRemoveList = Object.create(null); var paraName; var idx;   qsNeedRemoveList["PortalActualURL".toLowerCase()] = null; qsNeedRemoveList["PortalHomepageTabname".toLowerCase()] = null; qsNeedRemoveList["PortalContentURL".toLowerCase()] = null; qsNeedRemoveList["PortalContentProvider".toLowerCase()] = null; qsNeedRemoveList["PortalCRefLabel".toLowerCase()] = null; qsNeedRemoveList["PortalRegistryName".toLowerCase()] = null; qsNeedRemoveList["PortalServletURI".toLowerCase()] = null; qsNeedRemoveList["PortalURI".toLowerCase()] = null; qsNeedRemoveList["PortalHostNode".toLowerCase()] = null; qsNeedRemoveList["PortalIsPagelet".toLowerCase()] = null;   qsNeedRemoveList["NoCrumbs".toLowerCase()] = null;   qsNeedRemoveList["PortalObjectName".toLowerCase()] = null;  qsNeedRemoveList["PortalCacheContent".toLowerCase()] = null; qsNeedRemoveList["PortalIsPersonalized".toLowerCase()] = null; qsNeedRemoveList["PSCache-Control".toLowerCase()] = null;  qsNeedRemoveList["PortalCrefName".toLowerCase()] = null; qsNeedRemoveList["PortalIsHPPagelet".toLowerCase()] = null;   for(idx = 0; idx < QsNeedRemove.length; idx++)
 qsNeedRemoveList[QsNeedRemove[idx].toLowerCase()] = null;  for(idx = 0; idx < qsList.length; idx++){
 var paraNameLen = qsList[idx].indexOf("=");  if(paraNameLen > 0 && paraNameLen < qsList[idx].length - 1)
 if(qsList[idx].substr(0,paraNameLen).toLowerCase() in qsNeedRemoveList) 
 continue; else
 dict[qsList[idx].substr(0,paraNameLen + 1)] = qsList[idx].substr(paraNameLen + 1); else
 dict[qsList[idx]] = ""; }

 var delimiter = "?"; for(paraName in dict){
 targetUrl += delimiter; targetUrl += paraName; targetUrl += dict[paraName]; delimiter = "&"; }

 return targetUrl;}

function removeUserQueryString(Url,userQueryString){

 if(Url.indexOf("?") === -1) 
 return Url;  var urlParts = Url.split("?"); var targetUrl = urlParts[0]; var qsList = urlParts[1].split("&"); var dict = Object.create(null); var idx; if(urlParts[1]=="") 
 return Url; else
 {
 for(idx=0;idx<qsList.length;idx++){
 var qsListKey=qsList[idx].split("=");   if(userQueryString.split("=")[0].match(qsListKey[0]) == null)
 dict[idx]=qsList[idx]; }
 var delimiter = "?"; idx=0; for(idx in dict)
 {
 targetUrl += delimiter;  targetUrl += dict[idx]; delimiter = "&"; }
 }
 
 return targetUrl;}

function _readHistoryRequestProcessor(sourceWin, messageData) {
 var postBackData = {cmdType : "readHistoryResult", receiverData : messageData.senderData}; postBackData.receiverData = sessionStorage.getItem("pt_history"); if (postBackData.receiverData == "undefined" || postBackData.receiverData == "null" ||
 typeof postBackData.receiverData == "undefined" || postBackData.receiverData == null) {
 postBackData.receiverData = ""; }
 
 
 
 sourceWin.postMessage(JSON.stringify(postBackData), sourceWin.location.origin); return true;}

function _readHistoryResultProcessor(sourceWin, messageData) {
 var ret = true; window.sessionStorage.setItem('pt_history', messageData.receiverData); while (window.CorsHistoryTansactionListeners.readResult && 
 window.CorsHistoryTansactionListeners.readResult.length > 0) {
 var processorFunc = window.CorsHistoryTansactionListeners.readResult.shift(); if (typeof processorFunc == "function")
 ret = processorFunc(messageData); }
 return ret;}

function _CorsHistoryTansactionAfterReadProcessed(messageData) {
 var writeHistoryObj = {cmdType:"writeHistoryRequest", 
 receiverData:_getCurrentWindowPtHistory()}; top.window.postMessage(JSON.stringify(writeHistoryObj), top.window.location.origin); return true;}

function _writeHistoryRequestProcessor(sourceWin, messageData) {
 window.sessionStorage.setItem('pt_history', messageData.receiverData); var postBackData = {cmdType : "writeHistoryResult"}; sourceWin.postMessage(JSON.stringify(postBackData), sourceWin.location.origin); return true;}

function _writeHistoryResultProcessor(sourceWin, messageData) {
 var ret = true; while (window.CorsHistoryTansactionListeners.writeResult && 
 window.CorsHistoryTansactionListeners.writeResult.length > 0) {
 var processor = window.CorsHistoryTansactionListeners.writeResult.shift(); if (typeof processor == "function")
 ret = processor(messageData); }
 return ret;}

function _CorsHistoryTansactionAfterWriteProcessed(messageData) {
 window.isHistoryInSync = false; return true;}

function isUrlBelongToSameOrigin(referrer, contentUrl) {
 try {
 var bRetun = false; referrerParts = referrer.split("/"); contentUrlParts = contentUrl.split("/"); if (browserInfoObj2.isIE || browserInfoObj2.isEdge) {
 if (referrerParts[0].toLowerCase() == contentUrlParts[0].toLowerCase()  && 
 referrerParts[2].split(":")[0] == contentUrlParts[2].split(":")[0]  ) { 
 bRetun = true; } 
 } else {
 if (referrerParts[0].toLowerCase() == contentUrlParts[0].toLowerCase()  &&
 referrerParts[2].toLowerCase() == contentUrlParts[2].toLowerCase() ) { 
 bRetun = true; }
 }
 return bRetun; } catch(e) { return true; }
}

function _getReferrerFromPsBack(remoteUrl) {
 
 
 var backCookie = backNavigation.getCookieValue();  if (!backCookie) { return null; }

 var referrer = backCookie.url; if (typeof remoteUrl != 'undefined' && remoteUrl) {
 referrer = remoteUrl; } else if (typeof backCookie.refurl != 'undefined' && 
 backCookie.refurl && backCookie.refurl.length > 0) {
 referrer = backCookie.refurl; }
 if (typeof referrer == 'undefined' || !referrer) { 
 return null;  }

 return referrer;}


function _isNeedRemoteCrossOriginSynchronize(remoteUrl) {
 var referrer = _getReferrerFromPsBack(remoteUrl); if (typeof referrer == 'undefined' || !referrer) { return false; }

 var contentUrl = window.location.href; if (window === top && isClassic(window.frames, true)) {
 var fmtWindow = getPSIFrameContentWindow(document); if (fmtWindow) {
 contentUrl = fmtWindow.location.href; }
 }

 var isSame1 = isUrlBelongToSameOrigin(referrer, contentUrl); var isSame2 = isUrlBelongToSameOrigin(referrer, top.location.href); if (!isSame1 && !isSame2) {
 return true; }

 return false;}

function _getCurrentWindowPtHistory() {
 var historyItem = window.sessionStorage.getItem("pt_history"); if (typeof historyItem == "undefined" || "null" == historyItem || null == historyItem)
 historyItem = ""; return historyItem;}

function _localHistoryTransation() {
 var readHistoryObj = {cmdType : "readHistoryResult", 
 receiverData : _getCurrentWindowPtHistory()}; _readHistoryResultProcessor(null, readHistoryObj); var writeHistoryObj = {cmdType : "writeHistoryResult", 
 receiverData : _getCurrentWindowPtHistory()}; _writeHistoryResultProcessor(null, writeHistoryObj); window.isHistoryInSync = false; return true;}


function _localCrossOriginHistoryTransation() {
 var referrer = _getReferrerFromPsBack(); window.CorsHistoryTansactionListeners.readResult.push(window._CorsHistoryTansactionAfterReadProcessed); window.CorsHistoryTansactionListeners.writeResult.push(window._CorsHistoryTansactionAfterWriteProcessed); if (referrer != null) {
 if (isUrlBelongToSameOrigin(referrer, window.location.href)) {
 var readHistoryProcessedMsg = {cmdType : "readHistoryResult", 
 receiverData: _getCurrentWindowPtHistory()}; _readHistoryResultProcessor(null, readHistoryProcessedMsg); return true; } else {
 if (isUrlBelongToSameOrigin(referrer, top.location.href)) {
 var readHistoryMsg = {cmdType : "readHistoryRequest"};  top.window.postMessage(JSON.stringify(readHistoryMsg), 
 top.window.location.origin); return true; } else {
 
 return false; }
 }
 } else {
 var readHistoryObj = {cmdType : "readHistoryRequest"};  top.window.postMessage(JSON.stringify(readHistoryObj), top.window.location.origin); }

 return true;}


function _remoteCrossOriginHistoryTransation() {
 var isSameOrigin = isUrlBelongToSameOrigin(top.location.href, window.location.href);  if (!isSameOrigin) {
 window.CorsHistoryTansactionListeners.readResult.push(function(oriMessageData) {
 var writeHistoryObj = {cmdType : "writeHistoryRequest", 
 receiverData: _getCurrentWindowPtHistory()}; top.window.postMessage(JSON.stringify(writeHistoryObj), 
 top.window.location.origin); }); } else {
 window.CorsHistoryTansactionListeners.readResult.push(function(oriMessageData) {
 var writeHistoryObj = {cmdType : "writeHistoryResult", 
 receiverData: _getCurrentWindowPtHistory()}; _writeHistoryResultProcessor(null, writeHistoryObj); }); }
 window.CorsHistoryTansactionListeners.writeResult.push(function(messageData) {
 window.isHistoryInSync = false; }); remoteDataGetter.createGetterComponents(window.location.href, "postBackHistoryMessage"); return true;}

function _shouldIgnoreHistoryTransaction() {
 if (window.isHistoryInSync) {
 
 return true; }
 
 
 return (window.CorsHistoryTansactionListeners.readResult.length <= 0 && 
 window.CorsHistoryTansactionListeners.writeResult.length <= 0);}

function _isBackButtonCompatibleMode() {
 return (typeof window._backButtonCompatibleMode != "undefined" && 
 window._backButtonCompatibleMode);}

function corsHistoryTansaction() {
 if (_isBackButtonCompatibleMode())
 return false; if (_shouldIgnoreHistoryTransaction())
 return false; window.isHistoryInSync = true; var isNeedRemoteIframe = _isNeedRemoteCrossOriginSynchronize(); var isSameOrigin = isUrlBelongToSameOrigin(top.location.href, window.location.href);  if (isNeedRemoteIframe) {
 return _remoteCrossOriginHistoryTransation(); } else {
 if (!isSameOrigin) {
 return _localCrossOriginHistoryTransation(); } else {
 return _localHistoryTransation(); }
 }
}

function _writeHistoryToRemoteResultProcessor(sourceWin, messageData) {
 var ret = true; while (window.CorsHistoryTansactionListeners.writeResult && 
 window.CorsHistoryTansactionListeners.writeResult.length > 0) {
 var processor = window.CorsHistoryTansactionListeners.writeResult.shift(); if (typeof processor == "function")
 ret = processor(messageData); }
 return ret;}


function _postBackHistoryMessageResultProcessor(event) {
 var ret = true; var oriMessageData = {}; if (typeof event.data == "string")
 oriMessageData = JSON.parse(event.data); else
 oriMessageData = event.data; window.sessionStorage.setItem('pt_history', oriMessageData.receiverData); remoteDataGetter.delGetterComponents(); while (window.CorsHistoryTansactionListeners.readResult && 
 window.CorsHistoryTansactionListeners.readResult.length > 0) {
 var processor = window.CorsHistoryTansactionListeners.readResult.shift(); if (typeof processor == "function")
 ret = processor(oriMessageData); }
 return ret;}

function _deleteRemoteHistoryResultProcessor(sourceWin, messageData) {
 if (typeof remoteDataGetter != "undefined") {
 if (typeof messageData != "undefined")
 remoteDataGetter.delGetterComponents(null, messageData.frameId); else
 remoteDataGetter.delGetterComponents(null); }
 return true;}

function writeHistoryToTop() {
 var writeHistoryObj = {cmdType:"writeHistoryRequest", 
 receiverData : _getCurrentWindowPtHistory()}; var referrerUrl = _getReferrerFromPsBack(); var isSameOrigin1 = isUrlBelongToSameOrigin(window.location.href, top.location.href); var isSameOrigin2 = isUrlBelongToSameOrigin(referrerUrl, window.location.href); var isSameOrigin3 = isUrlBelongToSameOrigin(referrerUrl, top.location.href); if (isSameOrigin2 || isSameOrigin3) {
 if (!isSameOrigin1) { 
 top.window.postMessage(JSON.stringify(writeHistoryObj), 
 top.window.location.origin); } else {
 _writeHistoryResultProcessor(window, {cmdType:"writeHistoryResult",
 receiverData : _getCurrentWindowPtHistory()}); }
 } else {
 remoteDataGetter.createGetterComponents(window.location.href, "writeHistoryToRemote", null,
 referrerUrl, "_forDoBack"); }
}

function getPSIFrameContentWindow(doc) {
 var frm = doc.getElementById("ptifrmtgtframe") || doc.querySelector(".ps_target-iframe"); return (frm && frm.contentWindow) ? frm.contentWindow : null;}

function historyProcessHandler(event) {
 

 if (event.target.location.origin !== window.location.origin) {
 
 
 return; }

 if (typeof event.data == "string") {
 var messageData = {}; try {
 messageData = JSON.parse(event.data); } catch(e) {
 console.log(e); }
 var postBackData = {receiverData : messageData.senderData}; if (typeof messageData.cmdType == "undefined") {
 
 return; }

 
 

 if ("readHistoryRequest" == messageData.cmdType) {
 return _readHistoryRequestProcessor(event.source, messageData); } else if ("readHistoryResult" == messageData.cmdType) {
 return _readHistoryResultProcessor(event.source, messageData); } else if ("writeHistoryRequest" == messageData.cmdType) {
 return _writeHistoryRequestProcessor(event.source, messageData); } else if ("writeHistoryResult" == messageData.cmdType) {
 return _writeHistoryResultProcessor(event.source, messageData); } else if ("writeHistoryToRemoteResult" == messageData.cmdType) {
 return _writeHistoryToRemoteResultProcessor(event.source, messageData); } else if ("postBackHistoryMessageResult" == messageData.cmdType) {
 return _postBackHistoryMessageResultProcessor(event); } else if ("deleteRemoteHistoryResult" == messageData.cmdType) {
 return _deleteRemoteHistoryResultProcessor(event.source, messageData); } else {
 
 return; }
 }
}


if (typeof window.currentHistoryProcessListener == "function") {
 window.removeEventListener("message", window.currentHistoryProcessListener, false); }

if (!_isBackButtonCompatibleMode()) {
 window.currentHistoryProcessListener = historyProcessHandler; window.addEventListener("message", historyProcessHandler, false);}

window.CorsHistoryTansactionListeners = {
 readResult : new Array(),
 writeResult : new Array()
};


var pnWebsocketobjs = [];var pnSubscriptionFilters = {};var pnRemoteNodes = null;function getSiteName() {
 var URI = location.href; var psSiteName = (URI.split("/"))[4]; psSiteName = (psSiteName.split("_"))[0]; return psSiteName;}

function OpenAsynConnection() {
 var asyncPush = top.asyncPush; if (typeof (asyncPush) == 'undefined') asyncPush = 0; if (typeof (asyncPush) != 'undefined' && asyncPush === 0) {
 var websocketUri; var URI = location.href; var portalName = getPortalName(URI); if (window.location.protocol == "http:") websocketUri = "ws://" + window.location.host + "/ws/" + getSiteName() + "/PSWebsockServlet" + "?portalName=" + portalName; else websocketUri = "wss://" + window.location.host + "/ws/" + getSiteName() + "/PSWebsockServlet" + "?portalName=" + portalName; SetupWebSocket(websocketUri, false); pm.WebSocketEnabled = 1; } else {
 pm.WebSocketEnabled = 0; }
}

function SetupWebSocket(connectionUri, isContentNode) {
 if ("WebSocket" in window) {
 try {
 var websocketobj = new WebSocket(connectionUri); websocketobj.servereventsarray = []; if (isContentNode === true) websocketobj.servereventsarray = pm.serverEventNames.concat(); websocketobj.isContentNode = isContentNode; websocketobj.initialized = false; pnWebsocketobjs.push(websocketobj); pm.wsIsReady = 0; websocketobj.onopen = function (evt) {
 OnWebSocketOpen(evt); }; websocketobj.onclose = function (evt) {
 OnWebSocketClose(evt); }; websocketobj.onmessage = function (evt) {
 OnWebSocketMessage(evt); }; websocketobj.onerror = function (evt) {
 OnWebSocketError(evt); }; websocketobj.sendmessage = function (message) {
 var subsriptionFilter = pnSubscriptionFilters[message]; if (typeof (subsriptionFilter) != "undefined" && ApplySubscriptionFilter(subsriptionFilter, this)) return; this.send(message); }; } catch (e) {}
 }
}

function OnWebSocketOpen(evt) {
 try {
 for (var i = 0; i < pnWebsocketobjs.length; i++) {
 if (!pnWebsocketobjs[i].initialized) {
 pnWebsocketobjs[i].initialized = true;  for (var j = 0; j < pnWebsocketobjs[i].servereventsarray.length; j++) {
 pnWebsocketobjs[i].sendmessage(pnWebsocketobjs[i].servereventsarray[j]); }
 pnWebsocketobjs[i].servereventsarray.length = 0; }
 }
 } catch (e) {}
}

function OnWebSocketClose(evt) {}

function OnWebSocketMessage(evt) {
 try {
 var eventObject = eval("(" + evt.data + ")"); if (eventObject.EventName) {
 ServerPushEventHandler(eventObject.EventName, eventObject); } else if (eventObject.nodes && !evt.currentTarget.isContentNode) {
 pnRemoteNodes = evt.data; initializeRemoteNodes(); }

 } catch (e) {}
}

function OnWebSocketError(evt) {}

function setHTMLElementValue(aElementDivId, aValue) {
 var htmlElement = document.getElementById(aElementDivId); if (htmlElement.nodeName == "INPUT") htmlElement.value = aValue; else if (htmlElement.nodeName == "DIV") htmlElement.innerHTML = aValue; else if (htmlElement.nodeName == "SPAN") htmlElement.innerHTML = aValue;}

function getHTMLElementValue(aElementDivId) {
 var eHTMLElement = document.getElementById(aElementDivId); var sCurrentDivVal; if (eHTMLElement == null) return; if (eHTMLElement.nodeName == "INPUT") sCurrentDivVal = eHTMLElement.value; else if (eHTMLElement.nodeName == "DIV") sCurrentDivVal = eHTMLElement.innerHTML; else if (eHTMLElement.nodeName == "SPAN") sCurrentDivVal = eHTMLElement.innerHTML; return sCurrentDivVal;}

function SendWebSocketMessage(eventMessage) {
 var ajaxClient; if (pm.WebSocketEnabled == 1) {
 try {
 for (var i = 0; i < pnWebsocketobjs.length; i++) {
 if (pnWebsocketobjs[i].readyState == 1) pnWebsocketobjs[i].sendmessage(eventMessage); else pnWebsocketobjs[i].servereventsarray.push(eventMessage); }
 } catch (e) {}

 } else {
 try {
 if (ajaxClient == null || ajaxClient == undefined) {
 ajaxClient = new XMLHttpRequest(); }
 } catch (e) {

 try {
 if (ajaxClient == "undefined") {
 ajaxClient = new XMLHttpRequest(); }
 } catch (e) {
 ajaxClient = new ActiveXObject("MSXML2.XMLHTTP.6.0"); }
 }
 ajaxClient.onreadystatechange = function () {
 if (ajaxClient.readyState == 1) {
 pm.conIsReady = 1; } else if (ajaxClient.readyState == 3) {
 var eventMsg = ""; if (ajaxClient.responseText) eventMsg = ajaxClient.responseText.substring(ajaxClient.responseText.lastIndexOf("}{") + 1); if (eventMsg != "") {
 eventObject = eval("(" + eventMsg + ")"); ServerPushEventHandler(eventObject.EventName, eventObject); }
 } else {}
 }
 var nocache = new Date().getTime(); url = "http://" + window.location.host + "/aws/" + getSiteName() + "/NIOServlet"; url = url + "?event=" + eventMessage + "&cache=" + nocache; ajaxClient.open("GET", url, true); ajaxClient.send(null); }
}


function PnWindowSubscribe() {
 try {
 if (typeof (pm.wsIsPNW) == "undefined") {
 var elem = document.getElementById('PT_NOTIFY'); if (elem != null)
 {
 elem.setAttribute("aria-live", "assertive"); } 
 if (!IsPNEnabled()){
 var obj=document.getElementById('PT_NOTIFY'); if(obj==null)obj=top.document.getElementById('pthdr2notify_div'); if(obj!=null)obj.classList.add("psc_badge-hide"); return; } 
 
 var subscriptionFilter = SetSubscriptionFilter("PUSHNOTIFICATIONWINDOW", true); subscriptionFilter.subscribeOnContentNodes = false; AddSubscriptionFilter(subscriptionFilter); SubscribeCollection("PUSHNOTIFICATIONWINDOW", UpdatePNUI); pm.wsIsPNW = 1;}
 var parentNode = document.getElementById('PT_NOTIFY'); var parentNode_classic=top.document.getElementById('pthdr2notify_div'); if (parentNode != null || parentNode_classic!=null ) 
 javascript: doLoadNewNotification();  } catch (e) {}
}

function UpdatePNUI(EventName, EventData) {
 try {
 var parentNode = document.getElementById('PT_NOTIFY'); var parentNode_classic=top.document.getElementById('pthdr2notify_div'); if (parentNode != null || parentNode_classic!=null) {
 NewNotification(EventData); }
 } catch (e) {}
}

function IWCServerEvent(aEventName, evtdataPrimaryKey, uiPrimaryKey, uiIsGrid) {
 this.evtName = aEventName; this.evtdataPrimaryKey = evtdataPrimaryKey; this.uiPrimaryKey = uiPrimaryKey; this.uiIsGrid = uiIsGrid; this.fieldMappings = {};}

IWCServerEvent.prototype.insert = function (key, value) {
 if (typeof (value) !== "undefined") {
 this.fieldMappings[key] = value; }
}

IWCServerEvent.prototype.updateUI = function (eventName, eventData) {
 try {
 var sJsonMapVal; var nChildCount; if (this.uiIsGrid === false) {
 var sFieldDivValue = GetJSONObjectValue(eventData, this.evtdataPrimaryKey); setHTMLElementValue(this.uiPrimaryKey, sFieldDivValue); for (var key in this.fieldMappings) {
 sFieldDivValue = GetJSONObjectValue(eventData, key); setHTMLElementValue(this.fieldMappings[key], sFieldDivValue); }
 } else {
 var parents = document.getElementsByClassName('PSLEVEL1GRIDODDROW'); var rowcount = parents.length; this.updateUIGrid(eventData, eventData.EventDataType, rowcount); }
 } catch (e) {}
}

IWCServerEvent.prototype.updateUIGrid = function (eventData, eventType, rowcount) {
 var jsonData = GetJSONObjectValue(eventData, this.evtdataPrimaryKey); if (eventType == "Rowset") {
 while (jsonData.child != null) {
 for (var i = 0; i < rowcount - 1; i++) {
 var sDivId = this.uiPrimaryKey + "$" + i; var sCurrentDivVal = getHTMLElementValue(sDivId); if (sCurrentDivVal == jsonData.child[this.evtdataPrimaryKey]) {
 for (var key in this.fieldMappings) {
 var sGridFieldDivId = this.fieldMappings[key] + "$" + i; var sGridFieldDivValue = jsonData.child[key]; setHTMLElementValue(sGridFieldDivId, sGridFieldDivValue); }
 break; }
 }
 jsonData = jsonData.child; }
 } else {
 for (var i = 0; i < rowcount - 1; i++) {
 var sDivId = this.uiPrimaryKey + "$" + i; var sCurrentDivVal = getHTMLElementValue(sDivId); if (sCurrentDivVal == jsonData) {
 for (var key in this.fieldMappings) {
 var sGridFieldDivId = this.fieldMappings[key] + "$" + i; var sGridFieldDivValue = GetJSONObjectValue(eventData, key); setHTMLElementValue(sGridFieldDivId, sGridFieldDivValue); }
 break; }
 }
 }
}

function IWCSubscribeServerEvents() {
 try {
 var bHasServerSub = true; var bIsGrid; for (var x = 0; x < p_message_data.length; x++) {
 if (p_message_data[x].eventType == 'T') {
 bIsGrid = false; var oIWCObject = null; var sMessage = p_message_data[x].eventData; if (sMessage.indexOf("G:") != -1) bIsGrid = true; sMessage = sMessage.substring(2, sMessage.length); var sMain = sMessage.split(" "); for (var i = 0; i < sMain.length; i++) {
 var sSingleMap = sMain[i].split("-"); if (oIWCObject === null) {
 oIWCObject = new IWCServerEvent(p_message_data[x].eventName, sSingleMap[0], sSingleMap[1], bIsGrid); } else oIWCObject.insert(sSingleMap[0], sSingleMap[1]); }
 if (typeof (pm.iwcServerEventObjects) === "undefined") pm.iwcServerEventObjects = new Array(); pm.iwcServerEventObjects.push(oIWCObject); Subscribe(p_message_data[x].eventName, UpdatePIAUI); }
 }
 } catch (e) {}
}


function ServerPushEventHandler(eventName, eventData) {
 try {
 if (eventData.hasOwnProperty("CollectionName")) eventName = "COLL:" + eventData.CollectionName; for (var i = 0; i <= pm.serverEventCount; i = i + 1) {
 if (pm.serverEventNames[i] == eventName) {
 var callback = pm.serverEventCallBacks[i]; callback(eventName, eventData); }
 }
 } catch (e) {}
}


function GetJSONObjectValue(eventObject, key) {
 if (key == "int") return eventObject.int; else if (key == "str") return decodeURIComponent(eventObject.str); else if (key == "dbl") return eventObject.dbl; else if (key == "ints") return eventObject.ints; else if (key == "dbls") return eventObject.dbls; else if (key == "strs") return eventObject.strs; else if (eventObject.EventDataType == "Map") {
 return decodeURIComponent(eventObject.Map[key]); } else if (eventObject.EventDataType == "Rowset") {
 var rowsetobj = new Object(); var childobj = rowsetobj; var rowset = eventObject.Rowset; var rowsetheader = null; for (var row in rowset) {
 if (row == "Header") rowsetheader = rowset[row]; else {
 var rowsetdata = rowset[row]; if (rowsetheader[0] == key) {
 childobj.child = new Object(); childobj = childobj.child; for (var i = 0; i < rowsetheader.length; i++)
 childobj[rowsetheader[i]] = decodeURIComponent(rowsetdata[i]); }
 }
 }
 return rowsetobj; }
}


function UpdatePIAUI(eventName, eventData) {
 if (pm.iwcServerEventObjects != "undefined") {

 for (var x = 0; x < pm.iwcServerEventObjects.length; x++) {
 if (pm.iwcServerEventObjects[x].evtName == eventName) pm.iwcServerEventObjects[x].updateUI(eventName, eventData); }
 }
}

function Subscribe(eventName, eventCallback) {
 try {
 if (!IsPNEnabled()) return; if (pnWebsocketobjs.length === 0) OpenAsynConnection(); if (typeof (pm.serverEventCount) != "undefined") {
 for (var x = 0; x <= pm.serverEventCount; x++) {
 if (pm.serverEventNames[x] == eventName) {
 var fCallBack = pm.serverEventCallBacks[x]; if (fCallBack.name === eventCallback.name) return; }
 }
 pm.serverEventCount = pm.serverEventCount + 1; } else {
 pm.serverEventCount = 0; pm.serverEventNames = new Array(); pm.serverEventCallBacks = new Array(); }

 pm.serverEventNames[pm.serverEventCount] = eventName; pm.serverEventCallBacks[pm.serverEventCount] = eventCallback; SendWebSocketMessage(eventName); } catch (e) {}
}

function SubscribeCollection(collectionName, eventCallback) {
 collectionName = "COLL:" + collectionName; Subscribe(collectionName, eventCallback);}

function SetSubscriptionFilter(subscriptionName, isCollection) {
 var subscriptionFilter = {}; subscriptionFilter.name = subscriptionName; if (isCollection === true) subscriptionFilter.name = "COLL:" + subscriptionName;  subscriptionFilter.subscribeOnContentNodes = true; return subscriptionFilter;}

function AddSubscriptionFilter(subscriptionFilter) {
 pnSubscriptionFilters[subscriptionFilter.name] = subscriptionFilter;}

function ApplySubscriptionFilter(subsriptionFilter, websocketObj) {
 var filterIsApplicable = false;   if (subsriptionFilter.subscribeOnContentNodes === false && websocketObj.isContentNode === true) filterIsApplicable = true; return filterIsApplicable;}

function IsPNEnabled() {
 var enablePN = true; if (typeof (disablePNSubscriptions) != 'undefined' && disablePNSubscriptions === 1) enablePN = false; return enablePN;}

function initializeRemoteNodes() {
 var xmlhttp; if (typeof (pnRemoteNodes) != 'undefined') {
 var remoteNodesObject = eval("(" + pnRemoteNodes + ")"); remoteNodesObject = remoteNodesObject.nodes; var baseUri = location.href; for (var i = 0; i < remoteNodesObject.length; i++) {
 var serverUri = baseUri.split(getPortalName(baseUri))[0]; serverUri = serverUri.replace("/psc/", "/psp/"); serverUri = serverUri + getPortalName(baseUri) + "/" + remoteNodesObject[i].name + "/s/WEBLIB_PTPP.ISCRIPT1.FieldFormula.IScript_SSOTester?cmd=smartnav"; if (!isAlreadyLoggedIn(remoteNodesObject[i].host)) {
 sendAjaxRequest(serverUri, remoteNodesObject[i]); }
 else {
 setRemoteWebSocket(remoteNodesObject[i]); }
 }
 }
}


function setRemoteWebSocket(remoteNode) {
 
 var websocketUri; if (remoteNode.protocol == "http") websocketUri = "ws://" + remoteNode.host + "/ws/" + remoteNode.siteName + "/PSWebsockServlet"; else websocketUri = "wss://" + remoteNode.host + "/ws/" + remoteNode.siteName + "/PSWebsockServlet"; SetupWebSocket(websocketUri, true);}


function isAlreadyLoggedIn(hostName) {
 var loginList = getCookieValue("PS_LOGINLIST"); var nodes = loginList.split(" "); for (var i = 0; i < nodes.length; i++) {
 if (nodes[i].trim().toLowerCase().search(hostName.trim().toLowerCase()) > -1) {
 return true; }
 }
 return false;}

function sendAjaxRequest(url, remoteNode) {
 var sLoader = new net2.ContentLoader(url, null, null, "",

 function () {
 setRemoteWebSocket(remoteNode); }, null, null, "application/x-www-form-urlencoded", true, false, null, false, null);}



function selectTab(el)
{
if (el.getAttribute("role") == "tab")
el.focus();else
(el.firstElementChild || el.firstChild).focus();}
function doTabNav(event)
{
 var bEventContinue= true;var tabSelect;var newTab = null;var currentTarget = event.currentTarget || event.srcElement;if (currentTarget.tagName == 'LI')
 tabSelect = currentTarget;else
 tabSelect = currentTarget.parentNode; switch (event.keyCode)
 {
 case 13:
 case 32:
 bEventContinue = false; if (currentTarget.getAttribute("aria-selected") != "true")
 {
 
 
 var attr = currentTarget.getAttribute("href"); attr = attr.substring(11); eval(attr);  }
 break;  case 39:
 case 40:
 newTab = tabSelect.nextElementSibling || tabSelect.nextSibling; if (newTab && newTab.getAttribute("aria-selected") == "true")
 break; else
 {
 if (newTab && (newTab.firstElementChild || newTab.firstChild).getAttribute("role") != "tab")
 newTab = newTab.nextElementSibling || newTab.nextSibling; if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild;  if (eTab && eTab.getAttribute("role") == "tab")
 break; }
 }
 case 36:
 newTab = findFirstTab(tabSelect); break; case 37:
 case 38:
 newTab = tabSelect.previousElementSibling || tabSelect.previousSibling; if (newTab && newTab.getAttribute("aria-selected") == "true")
 break; else
 {
 if (newTab && (newTab.firstElementChild || newTab.firstChild).getAttribute("role") != "tab")
 newTab = newTab.previousElementSibling || newTab.previousSibling; if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild; if (eTab && eTab.getAttribute("role") == "tab")
 break;  }
 }
 case 35:
 newTab = findLastTab(tabSelect); }
 if (newTab != 'undefined' && newTab != null)
 {
 selectTab(newTab); bEventContinue=false; }
 return bEventContinue;}


var backNavigation = {

 psback : "psback",
 origin : "PIA",
 expireDuration : 12*60*60*1000,
 nonPiaPageId : "NONPIABACKPAGE",
 crefId : "THIRDPARTY", 
 nonPiaClass : "psnonpiacref",

 
 setCookie : function(histRec) {

 try {

 var setLabel = function() {
 var appLabel = document.querySelector("#app_label"), modLabel = top.document.querySelector("#ptModTitle_1"), label = "LabelNotFound"; if (typeof PIA_KEYSTRUCT !== "undefined" && PIA_KEYSTRUCT && typeof appLabel !== 'undefined' && appLabel && appLabel.innerHTML.length >= 1 && /\S/.test(appLabel.innerHTML)) {
 label = appLabel.innerHTML; } else if (typeof modLabel !== "undefined" && modLabel && modLabel.innerHTML.length >= 1 && /\S/.test(modLabel.innerHTML)) {
 label = modLabel.innerHTML; } else if (typeof document.querySelector("#remotedashboard") != 'undefined' && document.querySelector("#remotedashboard")) { 
 
 if (typeof document.querySelector("#ptdashboardlabel") != 'undefined' && document.querySelector("#ptdashboardlabel") && 
 typeof document.querySelector("#ptdashboardlabel").innerHTML != 'undefined' && document.querySelector("#ptdashboardlabel").innerHTML &&
 document.querySelector("#ptdashboardlabel").innerHTML.length > 0) {
 
 label = document.querySelector("#ptdashboardlabel").innerHTML; } else {
 
 label = "Home"; } 
 } else if (typeof szCrefLabel !== 'undefined' && szCrefLabel && szCrefLabel != "") {
 label = szCrefLabel; }

 return label; }

 var setUrl = function() {
 var url = histRec.url, keyList = ""; if (typeof PIA_KEYSTRUCT !== "undefined" && PIA_KEYSTRUCT) {
 
 if (url.charAt(url.length - 1) == '&') { url = url.substr(0, url.length - 1); } 

 var bFirstKey = true; for (var key in PIA_KEYSTRUCT) {
 if (bFirstKey && url.indexOf("?") == -1) {
 keyList += "?"; bFirstKey = false; }
 else
 keyList += "&"; keyList += key; keyList += "="; keyList += PIA_KEYSTRUCT[key]; }
 url += keyList; } else {
 
 urlParts = url.split("?"); url = urlParts[0]; }

 
 if (histRec.pageName.toLowerCase() != "(search)") {
 if (url.indexOf("?") > -1) 
 url += "&page="; else 
 url += "?page="; url += histRec.pageName; }

 return url; }

 var getLayout = function() {
 var reflayout = "-1", i = -1;  if (!isFModeLayout()) {
 reflayout = "0";  if (backNavigation.classicBackButton.isUsed()) {
 reflayout = "1";  } else {
 var bcList = top.document.getElementById("pthbcUlScroll"); if (typeof bcList != "undefined" && bcList) {
 
 for (i = bcList.children.length - 1; i > -1; i -= 2) {
 var bcEl = bcList.children[i]; if (typeof bcEl != "undefined" && bcEl && 
 typeof bcEl.children[0] != "undefined" && bcEl.children[0] &&
 typeof bcEl.children[0].getAttribute("data-pt-nui-bc") != "undefined" && bcEl.children[0].getAttribute("data-pt-nui-bc")) { 
 reflayout = "1"; break; }
 }
 }
 }
 } else {
 reflayout = "1";  var pt_history = getHistoryObject(), histRec = null; if (typeof pt_history != "undefined" && pt_history) { 
 histRec = pt_history.getCurrClassic(); if (typeof histRec != "undefined" && histRec) { reflayout = "0"; } 
 }
 }

 return reflayout; }



 if (isFModeLayout()) { 
 cookieObject.setCookie(this.psback, this.setCookieValue(setUrl(histRec), histRec.label, this.origin, getLayout(), remoteDataGetter.genRefUrl()), this.expireDuration);  } else { 
 if (typeof histRec != 'undefined' && histRec) { 
 var url = setUrl(), label = histRec.label; if (typeof PIA_KEYSTRUCT == "undefined" || !PIA_KEYSTRUCT) { label = setLabel(); } 
 setTimeout(function(){cookieObject.setCookie(backNavigation.psback, backNavigation.setCookieValue(url, histRec.label, backNavigation.origin, getLayout(), remoteDataGetter.genRefUrl()), backNavigation.expireDuration)}, 0);  } else { 
 setTimeout(function(){cookieObject.setCookie(backNavigation.psback, backNavigation.setCookieValue(top.location.href, setLabel(), backNavigation.origin, getLayout(), remoteDataGetter.genRefUrl()), backNavigation.expireDuration)}, 0); }
 }

 } catch (e) {
 exceptionMessage(e, "backNavigation.setCookie"); } 

 },

 
 setCookieValue : function(url, label, origin, layout, refurl) {

 try {
 var value = {}; value.url = url; value.label = label.replace(/&amp;/g, ""); value.label = encodeURIComponent(value.label); value.origin = origin; value.layout = layout; value.refurl = refurl; return value; } catch (e) {
 exceptionMessage(e, "backNavigation.setCookieValue"); }

 },

 
 setCookieLabelLP : function(inLabel) {
 try {
 var psBack = this.getCookieValue(); if (psBack != "undefined" && psBack && inLabel != "undefined" && inLabel && /\S/.test(inLabel)) {
 cookieObject.setCookie(this.psback, this.setCookieValue(psBack.url, inLabel, psBack.origin, psBack.layout, remoteDataGetter.genRefUrl()), this.expireDuration); }
 } catch(e) {}
 },

 
 getCookieValue : function() {

 return cookieObject.getCookieValue(this.psback); },

 
 addNonPiaBackRec : function(h) {

 try {

 var backCookie = cookieObject.getCookieValue(this.psback); if (backCookie && !this.isPiaCookie(backCookie)) {
 var backHistory = new historyNode (backCookie.label, this.nonPiaPageId, backCookie.url, "", "", 1, 0, 0, 1); backHistory.isNonPiaBack = 1; h.push(backHistory); h.save(); }
 return h; } catch (e) {
 exceptionMessage(e, "backNavigation.addNonPiaBackRec"); } 

 },

 
 
 expireNonPiaBackRec : function(backRec, h) {

 try {

 if (!this.isPiaBackRec(backRec)) { 
 this.setCookie(h.pop()); h.save(); this.removeStoredData(); }
 return h; } catch (e) {
 exceptionMessage(e, "backNavigation.expireNonPiaBackRec"); } 

 },

 
 expireNonPiaCref : function(e) {

 try {

 var anc = e.target || e.srcElement; if (this.isPiaCref(anc.parentNode)) { return; }

 cookieObject.expireCookie(this.psback); this.removeStoredData(); } catch (e) {
 exceptionMessage(e, "backNavigation.expireNonPiaCref"); } 


 },

 
 isPiaCookie : function(cookie) {

 try {

 if (typeof cookie.origin == "undefined" || !cookie.origin || cookie.origin.toUpperCase() != "PIA") { return false; }
 return true; } catch (e) {
 exceptionMessage(e, "backNavigation.isPiaCookie"); } 

 }, 

 
 isPiaBackRec : function(backRec) {

 try {

 if (typeof backRec.isNonPiaBack == "undefined" || backRec.isNonPiaBack == null || backRec.isNonPiaBack != 1) { return true; }
 return false; } catch (e) {
 exceptionMessage(e, "backNavigation.isPiaBackRec"); } 

 }, 

 
 isPiaCref : function(el) {

 try {

 if (ptUtil.isClassMember(el, this.nonPiaClass)) { return false; }
 return true; } catch (e) {
 exceptionMessage(e, "backNavigation.isPiaCref"); } 

 }, 

 
 
 removeStoredData : function() {

 try {
 sessionStorage.removeItem("isMenuCrefNav"); sessionStorage.removeItem("breadCrumbHTML"); sessionStorage.removeItem("pt_history_last_nui"); sessionStorage.removeItem("pt_history"); } catch (e) {
 exceptionMessage(e, "backNavigation.removeStoredData"); } 

 },

 
 addRemoteBackRec : function(event) {

 try {

 
 clearHistory(); var eBackGetter = document.querySelector("#" + remoteDataGetter.iframeId);   if (eBackGetter && event.origin == eBackGetter.contentWindow.document.location.origin) {
 var eventData = JSON.stringify(JSON.parse(event.data).receiverData); var referring_site_history = getHistoryObjectFromStr(eventData), pt_history = getHistoryObject(), pt_history_new = null, backBtn = top.document.querySelector("#PT_WORK_PT_BUTTON_BACK"); if (!backBtn) { 
 if (isFModeLayout()) {
 backBtn = ptUtil.id("PT_WORK_PT_BUTTON_BACK"); }
 else {
 backNavigation.classicBackButton.create();  backBtn = top.document.querySelector("#PT_WORK_PT_BUTTON_BACK"); }
 }

 if (referring_site_history && backBtn) {
 if (backNavigation.isHistoryStack(referring_site_history)) {
 
 pt_history_new = referring_site_history; var currRec = pt_history.nodes[0];  var backRec = pt_history_new.lastValid(currRec.pageName, currRec.url); var topRec = pt_history_new.pop(); if (topRec.pageName != currRec.pageName || topRec.url.split("?")[0] != currRec.url.split("?")[0]) {
 pt_history_new.push(topRec); } else {
 backRec = pt_history_new.lastValid(currRec.pageName, currRec.url); }

 backRec.remoteBackRec = true; pt_history_new.push(currRec); } else { 
 if (!backNavigation.isInHistory(referring_site_history)) {
 
 backRec = referring_site_history; pt_history_new = pt_history; pt_history_new.unshift(backRec); pt_history_new.setBackIndex(0); pt_history_new.save(); }
 }

 
 var backBtnTxt = backBtn.querySelector(".ps-text"); var objBackImg = backBtn.querySelector(".ps-img"); if (backRec.label != "" && pt_history_new.size() > 1) {
 backNavigation.setLabel(backBtnTxt, backRec.label);  backNavigation.setAltText(objBackImg); backNavigation.setTitle(objBackImg.parentNode.parentNode); backNavigation.setAriaLabel(objBackImg.parentNode, backRec.label); backNavigation.classicBackButton.isUsed() ? backNavigation.classicBackButton.show(backBtn.parentNode.parentNode) : ptUtil.removeClass(backBtn.parentNode.parentNode, "psc_disabled");  } else {
 backBtnTxt.innerHTML = "Back"; if (typeof objBackImg != "undefined" && objBackImg) {
 backNavigation.setAltText(objBackImg); }
 }

 pt_history_new.save(); }

 
 remoteDataGetter.delGetterComponents(backNavigation.addRemoteBackRec); }
 } catch(e) {}

 },

 
 clearRemotePiaHistory : function(topRec, backRec) {

 try {
 if (this.isRemotePiaContent(topRec, backRec)) { 
 sessionStorage.removeItem("pt_history");  sessionStorage.removeItem("pt_history_last_nui"); }
 } catch(e) {}

 },

 
 isRemotePiaContent : function(refUrl, curUrl) { 
 try {
 if (typeof refUrl == "undefined" || !refUrl || typeof curUrl == "undefined" || !curUrl) return false; if (typeof localNodes == "undefined") return true

 
 var refUrlNode = getNodeName(refUrl), bNodeFound = false; for (var i=0; i<localNodes.length; i++) {
 
 if ((localNodes[i] == refUrlNode) && (getPSHome(curUrl) == getPSHome(refUrl))) {
 bNodeFound = true; break; }
 }

 if (bNodeFound) return false;  return true;  } catch(e) {}
 },

 isIESameOrigin : function(referrer, contentUrl) {
 
 try {
 var bRetun = false; if (browserInfoObj2.isIE || browserInfoObj2.isEdge) {
 referrerParts = referrer.split("/"); contentUrlParts = contentUrl.split("/"); if (referrerParts[0] == contentUrlParts[0]  && referrerParts[2].split(":")[0] == contentUrlParts[2].split(":")[0]  ) { bRetun = true; } 
 }
 return bRetun; } catch(e) { return true; }
 },

 
 isInHistory : function(h) {

 try {
 var pt_history = getHistoryObject(); var topRec = pt_history.pop(); if (topRec && topRec.url.split("?")[0] == h.url.split("?")[0]) { return true; }
 return false; } catch(e) {}

 },

 
 isHistoryStack : function(inObj) {
 if (typeof inObj != 'undefined' && typeof inObj.backIndex != 'undefined') { return true; }
 return false; },

 
 
 shouldUpdateHistory : function(pageName) {

 
 if (typeof pageName != "undefined" && (pageName == "PTNUI_NAVBAR_PERS" || pageName == "PTNUI_GPLT_SRCH_NB" || pageName == "PTPN_CAT_NOTIFY")) { return false; }

 return true; },

 
 shouldAddToHistory : function(pageName) {

 
 if (typeof pageName != "undefined" &&
 (pageName == "PTNUI_NAVBAR" || pageName == "PTNUI_NAVBAR_PERS" || 
 pageName == "PTNUI_ADDTILE" || pageName == "PTNUI_GPLT_SRCH_NB" ||
 pageName == "PTNUI_MENU_COMP" || pageName == "PTPN_CAT_NOTIFY")) { return false; }

 
 if (typeof pageName != "undefined" && pageName == "PTPG_PGVIEWER") { return false; }

 var hasVisibleDlg = PT_isAnyDialogVisible();  if (typeof winName != 'undefined' && winName && isModalPage(winName) && (typeof bCloseModal != "undefined" && !bCloseModal && hasVisibleDlg)) { return false; }

 
 if (typeof bCloseModal != 'undefined' && bCloseModal && hasVisibleDlg) {return false;} 

 
 if ((typeof sHistURL != 'undefined' && sHistURL && sHistURL.search("ptreqfrom=rc") > -1) || 
 (typeof refererURL != 'undefined' && refererURL && refererURL.search("WEBLIB_PTRC.ISCRIPT1.FieldFormula.IScript_RelatedContent") > -1)) { return false; }

 
 if (!isFModeLayout() && top != window) {
 var eHtml = top.document.getElementsByTagName("html")[0]; if (typeof eHtml != "undefined" && eHtml && (ptUtil.isClassMember(eHtml,"psc_mode-ag") || ptUtil.isClassMember(eHtml,"psc_mode-md"))) { return false; }
 }

 return true; },
 
 setAltText : function(inObj) {
 try {
 
 if (typeof inObj != "undefined" && inObj && inObj.tagName.toUpperCase() == "IMG") { inObj.setAttribute("alt", ""); }
 } catch(e) {} 
 },

 setAriaLabel : function(inObj, histRecLabel, histRec, histData) {
 var szType = "Back to page %1"; if (typeof bGuidedAG != "undefined" && bGuidedAG) { szType = "Exit to page %1"; }

 var szLabel = this.genLabel(histRecLabel, histRec, histData);  if (typeof inObj != "undefined" && inObj && inObj.tagName.toUpperCase() == "A" && 
 typeof histRecLabel != "undefined" && histRecLabel && histRecLabel != "") 
 { inObj.setAttribute("aria-label", szType.replace("%1", szLabel)); }
 },

 setTitle : function(inObj) {
 try {
 if (typeof inObj == "undefined" || !inObj) { return; }
 var bAccessible = false; if (typeof winName != "undefined" && winName) { bAccessible = eval("bAccessibility_" + winName); } 
 if (bAccessible) {
 inObj.removeAttribute("title");  } else {
 inObj.setAttribute("title", inObj.textContent);  }
 } catch(e) {}
 },

 setLabel : function(backTextObj, inLabel, histRec, histData) {
 
 if (typeof bGuidedAG != "undefined" && bGuidedAG) { return; }

 var szLabel = this.genLabel(inLabel, histRec, histData); backTextObj.innerHTML = szLabel.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');  },
 
 genLabel : function(inLabel, histRec, histData) {
 var szLabel = inLabel; var bFixLabel = true; if (typeof histRec != "undefined" && histRec &&
 typeof histData != "undefined" && histData &&
 ((histRec.url.split("?")[0] == histData.url.split("?")[0] && !histRec.isPost) ||
 (histRec.isReturnToLastPage))) { bFixLabel = false; }

 if (bFixLabel) {
 var pt_history = getHistoryObject(), i = 1; while (typeof histRec != "undefined" && histRec && i < pt_history.size()) {
 if (histRec.url.split("?")[0] == pt_history.nodes[pt_history.size() - i].url.split("?")[0] && pt_history.nodes[pt_history.size() - i].pageName.toLowerCase() != "(search)") { 
 szLabel = pt_history.nodes[pt_history.size() - i].label;  }
 i++; }
 }
 return szLabel; },

 isClassicSearch : function(h) {
 if (!isFModeLayout() && h.pageName == "(search)") return true; return false; },

 isNuiSearch : function(h) {
 if (isFModeLayout() && h.pageName == "(search)") return true; return false; },

 
 classicBackButton : {
 
 isUsed : function() {
 var eDropDownMenu = top.document.querySelector("#ptdropdownmenu"); if (eDropDownMenu && getComputedStyle(eDropDownMenu).display == "none") 
  { 
  
  var isHomepage = typeof bIsOperationalDashboard != "undefined" && !bIsOperationalDashboard;  if(!isHomepage)
  {
  if( top.ptIframeHdr && !top.ptIframeHdr.isAccessibility() &&
 (window.frameElement == null || window.frameElement != null && window.frameElement.getAttribute("id") != "psNavBarIFrame"))
  { setTimeout("updatePageTitle()",100); }
  }
  else
  {
  if (document.getElementById("pthdr2pagetitle")!=null) 
 {document.getElementById("pthdr2pagetitle").style.display="none";}
  }
 
  return true;   }

 return false; },

 isCreated : function() {
 try {
 if (!isFModeLayout() && top.document.querySelector("#PT_WORK_PT_BUTTON_BACK") == null) { return false; }
 return true; } catch (e) {}
 },

 show : function(el) {
 
 typeof bHideClassicBackBtn != "undefined" && bHideClassicBackBtn ? this.hide(el) : el.style.visibility = "";    if((typeof bIsOperationalDashboard == 'undefined' || !bIsOperationalDashboard) && typeof bIsDashboard != "undefined" && bIsDashboard)
 document.getElementsByTagName("body")[0].classList.remove("homePageHdr"); },

 hide : function(el) {
 el.style.visibility = "hidden";  },

 pspRequest : function(szUrl, bClassicBackRec) {
 if (this.isUsed() || (bClassicBackRec && isFModeLayout()) ) { return szUrl.replace("/psc/", "/psp/"); }
 return szUrl; },

 create : function() {
 if (this.isUsed() && !this.isCreated()) {
 var dropDownCntnr = top.document.querySelector("#pthdr2container");  var divEl00 = document.createElement("div"); divEl00.setAttribute("id", "classicbackbuttonlayout"); var divEl01 = document.createElement("div"); divEl01.setAttribute("class", "ps_box-button psc_header-all");  divEl01.setAttribute("id", "classicbackbuttoncontainer"); var spanEl = document.createElement("span"); spanEl.setAttribute("class", "ps-button-wrapper"); spanEl.setAttribute("title", "Back"); var ancEl = document.createElement("a"); ancEl.setAttribute("id", "PT_WORK_PT_BUTTON_BACK"); ancEl.setAttribute("class", "ps-button"); ancEl.setAttribute("role", "button"); var href = "javascript:void(0);"; ancEl.setAttribute("href", href); ancEl.setAttribute("onkeydown", "registerHeaderKeyPress(event);"); ancEl.setAttribute("onclick", "javascript:DoBackClassic();"); var imgEl = document.createElement("img"); imgEl.setAttribute("src", "/cs/CSPRD/cache86107_v2/PT_NUI_BACK_PRIM_IMG_1.svg"); imgEl.setAttribute("name", "PT_WORK_PT_BUTTON_BACK$IMG"); imgEl.setAttribute("class", "ps-img"); backNavigation.setAltText(imgEl); var spanTxtEl = document.createElement("span"); spanTxtEl.setAttribute("class", "ps-text"); ancEl.appendChild(imgEl); ancEl.appendChild(spanTxtEl); spanEl.appendChild(ancEl); divEl01.appendChild(spanEl); divEl00.appendChild(divEl01); dropDownCntnr.insertBefore(divEl00, dropDownCntnr.children[0]);  }

 
 
 var tstDivDBC = document.getElementById("divdobackclassic"); if (typeof tstDivDBC != "undefined" && tstDivDBC) {
 tstDivDBC.parentNode.removeChild(tstDivDBC); tstDivDBC = null; }
 
 var divDBC = document.createElement("div"); divDBC.setAttribute("id", "divdobackclassic"); divDBC.setAttribute("style", "display:none;"); divDBC.setAttribute("aria-hidden", "true"); var ancDBC = document.createElement("a"); ancDBC.setAttribute("id", "ancdobackclassic"); var hrefDBC = "javascript:DoBack('xyz')";  if (typeof winName != 'undefined' && winName) { hrefDBC = "javascript:DoBack('" + winName + "')"; }
 ancDBC.setAttribute("href", hrefDBC); ancDBC.setAttribute("style", "display:none;"); ancDBC.setAttribute("aria-hidden", "true"); divDBC.appendChild(ancDBC); document.body.appendChild(divDBC);  } 

 }

}


var cookieObject = {

 expireDate : new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
 expiredString : "ExpiredCookie",

 
 setCookie : function(name, objValue, expireDuration) {

 try { 
 
 var createCookie = function() {
 var d = null;  if (typeof objValue.url != 'undefined' && objValue.url) {
 objValue.url = encodeURIComponent(objValue.url); }

 if (typeof objValue.refurl != 'undefined' && objValue.refurl) {
 objValue.refurl = encodeURIComponent(objValue.refurl); }

 var cv = JSON.stringify(objValue);  cv = cv.replace(/,/g," "); cv = cv.replace(/{/g,""); cv = cv.replace(/}/g,""); cv = '"' + cv + '"'; cv = cookieObject.encodeDelimitters(cv); setCookie(name, cv, d, '/', document.domain, cookieObject.isSecure());  }

 if (typeof name !== "undefined" && name != null && typeof objValue !== "undefined" && objValue != null) { createCookie(); }

 } catch (e) {
 exceptionMessage(e, "cookieObject.setCookie"); }

 },

 
 getCookieValue : function(name) {

 try {
 
 var createCookieValue = function() { 
 var cv = cookieObject.unencodeDelimitters(getRawCookieValue(name)); cv = cv.replace(/\" \"/g, '","'); cv = cv.substring(1,cv.length-1); cv = "{" + cv + "}"; var cvObj = JSON.parse(cv); if (typeof cvObj.url != 'undefined' && cvObj.url) { 
 cvObj.url = decodeURIComponent(cvObj.url); }

 if (typeof cvObj.refurl != 'undefined' && cvObj.refurl) { 
 cvObj.refurl = decodeURIComponent(cvObj.refurl); }

 if (typeof cvObj.label != 'undefined' && cvObj.label) { 
 cvObj.label = decodeURIComponent(cvObj.label); }

 return cvObj;  }

 if (typeof name !== "undefined" && name !== null && getRawCookieValue(name) !== "") { return createCookieValue(); }
 return null; } catch (e) {
 exceptionMessage(e, "cookieObject.getCookieValue"); }

 },

 encodeDelimitters : function(inString) {
 if (typeof inString == "undefined" || !inString || (typeof psback_unencoded_d != "undefined" && psback_unencoded_d)) { return inString; }

 var encodedString = inString;  encodedString = encodedString.replace(/\" \"/g, "%22%20%22"); encodedString = encodedString.replace(/\"\:\"/g, "%22%3A%22"); encodedString = encodedString.replace(/\"\"/g, "%22%22"); return encodedString; },

 unencodeDelimitters : function(inString) {
 if (typeof inString == "undefined" || !inString || (typeof psback_unencoded_d != "undefined" && psback_unencoded_d)) { return inString; }

 var unEncodedString = inString;  unEncodedString = unEncodedString.replace(/%22%20%22/g, "\" \""); unEncodedString = unEncodedString.replace(/%22%3A%22/g, "\"\:\""); unEncodedString = unEncodedString.replace(/%22%22/g, "\"\""); return unEncodedString; },

 
 expireCookie : function(name) {

 try {

 var setExpire = function() {
 setCookie(name, this.expiredString, cookieObject.expireDate, '/', document.domain, cookieObject.isSecure()); } 

 if (typeof name !== "undefined" && name!= null) { setExpire(); } 

 } catch (e) {
 exceptionMessage(e, "cookieObject.expireCookie"); }
 
 },

 
 isSecure : function() {

 try {

 var scheme = window.location.href.substr(0,5); var secure = (scheme == "https") ? true : null;  return secure; } catch (e) {
 exceptionMessage(e, "cookieObject.isSecure"); }

 }

}


var remoteDataGetter = {

 iframeId : "ptremotedatagetter",

 
 createGetterComponents : function(contentUrl, postFunctionId, msgEventHandler, remoteUrl, idAdd) { 
 try {
 var backCookie = backNavigation.getCookieValue();  if (!backCookie) { return; }

 var referrer = backCookie.url; if (typeof remoteUrl != 'undefined' && remoteUrl) {
 referrer = remoteUrl; } else if (typeof backCookie.refurl != 'undefined' && backCookie.refurl && backCookie.refurl.length > 0) {
 referrer = backCookie.refurl; }
 if (typeof referrer == 'undefined' || !referrer) { return; }

 var idx = referrer.indexOf("/psc/"); if (idx > 0) { referrer = referrer.replace("/psc/", "/psp/"); } 

 var paramIdx = referrer.indexOf('?'); if (paramIdx != -1){
 if (referrer.indexOf("/c/") != -1 && referrer.indexOf("/c/") < paramIdx)
 referrer = referrer.split("/c/")[0]; else if (referrer.indexOf("/h/") != -1 && referrer.indexOf("/h/") < paramIdx)
 referrer = referrer.split("/h/")[0]; else if (referrer.indexOf("/s/") != -1 && referrer.indexOf("/s/") < paramIdx)
 referrer = referrer.split("/s/")[0];  }
 else
 {
 if (referrer.indexOf("/c/") != -1)
 referrer = referrer.split("/c/")[0]; else if(referrer.indexOf("/h/") != -1)
 referrer = referrer.split("/h/")[0]; else if(referrer.indexOf("/s/") != -1)
 referrer = referrer.split("/s/")[0]; }

 var isIESameOrigin = backNavigation.isIESameOrigin(referrer, contentUrl); var isRemoteWirteHistoryCmd = ("writeHistoryToRemote" == postFunctionId); if ((isRemoteWirteHistoryCmd || backNavigation.isRemotePiaContent(referrer, contentUrl)) && !isIESameOrigin) {
 
 var eRemoteDataGetter = document.createElement("iframe"); var iframeId = this.iframeId; if (typeof idAdd != 'undefined' && idAdd) { iframeId += ("idAdd_" + idAdd);}
 eRemoteDataGetter.setAttribute("name", iframeId);  eRemoteDataGetter.setAttribute("id", iframeId); eRemoteDataGetter.setAttribute("style", "display:none"); document.body.appendChild(eRemoteDataGetter);   eRemoteDataGetterUrl = referrer + "/ptgetremotedata.html" + "?d=" + document.domain + "&postFunction=" + postFunctionId; eRemoteDataGetter.setAttribute("src", eRemoteDataGetterUrl);  if (typeof msgEventHandler != 'undefined' && msgEventHandler) { window.top.addEventListener("message", msgEventHandler, false); }
 } else {
 if (isRemoteWirteHistoryCmd) {
 var messageData = {"cmdType" : "readHistoryRequest"}; top.window.postMessage(JSON.stringify(messageData), top.window.location.origin); window.CorsHistoryTansactionListeners.readResult.push(function() {
 var postData = {"cmdType":"writeHistoryToRemoteResult"}; window.postMessage(JSON.stringify(postData), window.location.origin); }); }
 }
 } catch(e) {}
 },

 
 delGetterComponents : function(msgEventHandler, idAdd) {
 var iframeId = this.iframeId; if (typeof idAdd != 'undefined' && idAdd) { iframeId += ("idAdd_" + idAdd); }
 var eBackGetter = document.querySelector("#" + iframeId); if (typeof eBackGetter != 'undefined' && eBackGetter) { eBackGetter.parentNode.removeChild(eBackGetter); }
 if (msgEventHandler) { window.removeEventListener("message", msgEventHandler); }
 },

 genRefUrl : function() {
 var sRefUrl = ""; if (window.location.href) { sRefUrl = window.location.href.split("/c/")[0]; }
 return sRefUrl; }

}


function exceptionMessage(e, inStr) {
 alert(inStr + " -> " + e.message);}

