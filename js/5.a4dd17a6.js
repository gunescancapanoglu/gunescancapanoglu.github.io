(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"1f3e":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{staticClass:"flex",staticStyle:{"min-height":"100vh"}},[i("transition",{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut",mode:"out-in"},on:{"after-enter":e.afterEnter}},[i("keep-alive",{attrs:{include:"ColumnsComponent"}},["/reviews"===e.$route.path?i("router-view",{attrs:{store:e.store,updateLayout:e.updateLayout},scopedSlots:e._u([{key:"default",fn:function(t){return[i("router-link",{staticClass:"flex q-pa-sm",attrs:{to:{path:"/reviews/"+t.item.id+"-"+e.generateLink(t.item.title)}}},[i("q-card",[t.item.image?i("ImageComponent",{attrs:{inlineStyle:{"max-height":"100vh","min-height":"100px"},src:t.item.image,q:""}}):e._e(),t.item.title?i("q-card-section",[i("div",{staticClass:"text-h6"},[e._v(e._s(t.item.title))])]):e._e(),t.item.excerpt?i("q-card-section",{domProps:{innerHTML:e._s(t.item.excerpt)}}):e._e()],1)],1)]}}],null,!1,3615590297)}):e._e(),"/reviews"!==e.$route.path?i("router-view",{attrs:{store:e.store,updateLayout:e.updateLayout},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticClass:"row"},[i("div",{staticClass:"col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-2"},[i("div",{staticClass:"row"},[t.item.image?i("div",{staticClass:"col-xs-12 col-sm-grow col-md-12",class:{"q-pa-xs":e.$q.screen.xs,"q-pa-sm":e.$q.screen.sm,"q-pa-md":e.$q.screen.md,"q-pa-lg":e.$q.screen.lg,"q-pa-xl":e.$q.screen.xl}},[i("ImageComponent",{attrs:{inlineClass:{"float-right":!0},inlineStyle:{"max-height":"100vh","max-width":"100vw","min-height":"100px"},src:t.item.image,contain:"",q:""}})],1):e._e(),t.item.title?i("div",{staticClass:"col-xs-12 col-sm-6 col-md-12",class:{"q-pa-xs":e.$q.screen.xs,"q-pa-sm":e.$q.screen.sm,"q-pa-md":e.$q.screen.md,"q-pa-lg":e.$q.screen.lg,"q-pa-xl":e.$q.screen.xl}},[i("div",{staticClass:"text-h6"},[e._v(e._s(t.item.title))])]):e._e()])]),t.item.text?i("div",{staticClass:"col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-3",class:{"q-pa-xs":e.$q.screen.xs,"q-pa-sm":e.$q.screen.sm,"q-pa-md":e.$q.screen.md,"q-pa-lg":e.$q.screen.lg,"q-pa-xl":e.$q.screen.xl},domProps:{innerHTML:e._s(t.item.text)}}):e._e()]),t.item.images&&t.item.images.length>0?i("div",{staticClass:"row"},[i("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-5"},[i("q-carousel",{staticStyle:{"min-height":"auto","max-height":"auto",height:"auto"},attrs:{animated:"",infinite:"",navigation:"",arrows:"",autoplay:"","prev-icon":e.Icons.mdiChevronLeft,"next-icon":e.Icons.mdiChevronRight,"navigation-icon":"mdi-circle","control-color":"primary"},model:{value:e.slide,callback:function(t){e.slide=t},expression:"slide"}},e._l(t.item.images,(function(e,t){return i("q-carousel-slide",{key:t,attrs:{name:t}},[i("ImageComponent",{attrs:{ratio:1,src:e,contain:"",q:""}})],1)})),1)],1)]):e._e()]}}],null,!1,3526537136)}):e._e()],1)],1)],1)},s=[],r=i("a142"),n=i("414a"),o={name:"ReviewsPage",mixins:[n["a"]],components:{ImageComponent:r["a"]},props:{updateLayout:Object},data(){return{store:this.$db.collection("reviews"),slide:0}},methods:{afterEnter(){"/reviews"===this.$route.path&&this.$root.$emit("triggerScroll")}}},c=o,l=(i("b935"),i("2877")),m=i("9989"),d=i("f09f"),u=i("a370"),h=i("880c"),p=i("62cd"),g=i("eebe"),f=i.n(g),q=Object(l["a"])(c,a,s,!1,null,"38a10294",null);t["default"]=q.exports;f()(q,"components",{QPage:m["a"],QCard:d["a"],QCardSection:u["a"],QCarousel:h["a"],QCarouselSlide:p["a"]})},3142:function(e,t,i){},"414a":function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));const a={methods:{generateLink(e){return e.toLowerCase().replace(/[çöüğşüı]/g,e=>({"ç":"c","ö":"o","ü":"u","ğ":"g","ş":"s","ı":"i"}[e])).replace(/[^\w ]+/g,"").replace(/ +/g,"-")}}}},a142:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"full-width text-center",staticStyle:{overflow:"hidden","line-height":"0"}},[e.q?i("q-img",e._g({class:e.inlineClass,style:e.inlineStyle,attrs:{basic:e.basic,contain:e.contain,ratio:e.ratio,src:e.imageSrc,srcset:e.imgSrcSet,"spinner-color":"primary","spinner-size":"2em"},on:{load:function(t){return e.$emit("load")}}},e.imageSrc?{error:e.cdnProblem}:{}),[e._t("default")],2):e._e(),e.q?e._e():i("div",{staticClass:"absolute-center",staticStyle:{transition:"0.5s opacity"},style:e.loading?{}:{opacity:0}},[i("q-spinner",{attrs:{color:"primary",size:"5em"}})],1),e.q?e._e():i("img",e._g({staticStyle:{transition:"0.5s opacity"},style:e.loading?Object.assign({},e.inlineStyle,{opacity:0}):e.inlineStyle,attrs:{src:e.imageSrc,srcset:e.imgSrcSet},on:{load:e.loaded}},e.imageSrc?{error:e.cdnProblem}:{}))],1)},s=[],r=i("cc8e"),n={name:"ImageComponent",mixins:[r["a"]],props:{src:String,contain:Boolean,basic:Boolean,inlineStyle:Object,inlineClass:Object,q:Boolean,ratio:Number},watch:{"$route.path":function(){"photograph"===this.$route.name&&(this.loading=!0)}},data(){return{loading:!0}},computed:{imageSrc(){return""!==this.src?this.src.replace(/\s/g,"%20"):""},imgSrcSet(){if(""!==this.imageSrc){let e=this.imageSrc.search(/_\d+.(jpg|gif|png|jpeg)/g),t=[this.imageSrc.slice(0,e),Number(this.imageSrc.slice(1+e,this.imageSrc.length-4)),this.imageSrc.slice(-3)];return t[0]+"_"+t[1]+"."+t[2]+" "+t[1]+"w, "+t[0]+"_half."+t[2]+" "+Math.floor(t[1]/2)+"w, "+t[0]+"_quarter."+t[2]+" "+Math.floor(t[1]/4)+"w, "+t[0]+"_eighth."+t[2]+" "+Math.floor(t[1]/8)+"w"}return""}},methods:{loaded(){this.loading=!1,this.$emit("load")}},activated(){this.loading=!1}},o=n,c=i("2877"),l=i("068f"),m=i("0d59"),d=i("eebe"),u=i.n(d),h=Object(c["a"])(o,a,s,!1,null,null,null);t["a"]=h.exports;u()(h,"components",{QImg:l["a"],QSpinner:m["a"]})},b935:function(e,t,i){"use strict";var a=i("3142"),s=i.n(a);s.a},cc8e:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));const a={methods:{connectionError(e){return this.error("firestore","Connection problem with firestore servers. Object: "+e)},cdnProblem(e){return this.error("cdn","Connection problem with cdn servers. Object: "+e)},notFound(e){return this.error("404","Requested content could not found. Probable url mismatch. Object: "+e)},unknownError(e){return this.error("url","Have no idea what the hell just happened. Kindly inform the idiot dev please, thanks. Object: "+e)},error(e,t){return this.$q.loading.hide(),this.$router.push("/error?code="+e),Promise.reject(t)}}}}}]);