(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"8e31":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-layout",{on:{scroll:t.scrollHandler,"scroll-height":t.scrollHeightHandler}},[o("q-page-container",[o("transition",{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut",mode:"out-in"}},[o("router-view",{attrs:{updateLayout:t.updateLayout}})],1),o("q-linear-progress",{staticClass:"fixed-top",attrs:{buffer:t.updateLayout.buffer,value:t.updateLayout.value}}),o("q-page-sticky",{attrs:{offset:[18,18],position:"bottom-right"}},[o("q-fab",{staticStyle:{transition:"opacity .3s"},style:{opacity:t.qFabOpacity},attrs:{direction:"up",color:"primary",icon:"mdi-plus","active-icon":"mdi-close"},on:{hide:function(e){t.qFabOpacity=.3},show:function(e){t.qFabOpacity=1}}},["page"===t.$route.name&&"/"!==t.$route.path&&"/1"!==t.$route.path?o("q-fab-action",{attrs:{color:"primary",icon:"mdi-page-first"},on:{click:function(e){t.updateLayout.page--}}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right"}},[t._v("First page")])],1):t._e(),"page"===t.$route.name&&t.$route.path!=="/"+t.updateLayout.lastPage?o("q-fab-action",{attrs:{color:"primary",icon:"mdi-page-last"},on:{click:function(e){t.updateLayout.page++}}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right"}},[t._v("Last page")])],1):t._e(),"page"!==t.$route.name?o("q-fab-action",{attrs:{color:"primary",icon:"mdi-home-variant",to:"/"}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right"}},[t._v("Home")])],1):t._e(),"/photography"!==t.$route.path?o("q-fab-action",{attrs:{color:"primary",icon:"mdi-image-filter-hdr",to:"/photography"}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right"}},[t._v("Photography")])],1):t._e(),"/reviews"!==t.$route.path?o("q-fab-action",{attrs:{color:"primary",icon:"mdi-gamepad",to:"/reviews"}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right"}},[t._v("Oyun yazıları")])],1):t._e(),"/contact"!==t.$route.path?o("q-fab-action",{attrs:{color:"primary",icon:"mdi-at",to:"/contact"}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right"}},[t._v("Contact")])],1):t._e(),o("q-fab-action",{attrs:{color:"primary",icon:"mdi-help"},on:{click:t.showHelp}},[o("q-tooltip",{attrs:{anchor:"center left",self:"center right"}},[t._v("How to navigate")])],1)],1)],1)],1)],1)},r=[],i={name:"MainLayout",data:function(){return{updateLayout:{value:0,buffer:0,page:0,lastPage:0},qFabOpacity:.3,scrollPosition:0}},methods:{showHelp:function(){var t="These are general instructions,some options might not apply every page.<br>";this.$q.platform.is.mobile?t+="<br><em>Swipe horizontally/vertically:</em> Next/prev page<br><em>Tap right/left side of screen:</em> Next/prev page":t+="<br><em>Click and move horizontally/vertically with mouse:</em> Next/prev page<br><em>Click right/left side of screen with mouse:</em> Next/prev page<br><em>Mouse wheel down/up:</em> Next/prev page<br><em>Left/right/up/down/page up/page down keys:</em> Next/prev page<br><em>Home/end keys:</em> First/last page<br><em>Esc key:</em> Close photograph/review",t+="<br>You can use floating buttons for first/last page and to navigate to the rest of the site.",this.$q.dialog({message:t,html:!0,position:"bottom",ok:!1,"full-width":!0})},scrollHandler:function(t){"/photography"!==this.$route.path&&"/reviews"!==this.$route.path||(this.scrollPosition=t.position),this.updateLayout.value=t.position/(document.body.scrollHeight-window.innerHeight)},scrollHeightHandler:function(t){"/photography"!==this.$route.path&&"/reviews"!==this.$route.path||(this.updateLayout.value=this.scrollPosition/(document.body.scrollHeight-window.innerHeight))}}},n=i,s=o("2877"),l=Object(s["a"])(n,a,r,!1,null,null,null);e["default"]=l.exports}}]);