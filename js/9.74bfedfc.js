(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"2cd6":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{staticClass:"flex",staticStyle:{"min-height":"100vh"}},[r("transition",{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut",mode:"out-in"},on:{"after-enter":t.afterEnter}},[r("keep-alive",{attrs:{include:"ColumnsComponent"}},["/photography"===t.$route.path?r("router-view",{attrs:{store:t.store,updateLayout:t.updateLayout},scopedSlots:t._u([{key:"default",fn:function(t){return[r("router-link",{staticClass:"flex q-pa-xs",attrs:{to:{path:"/photography/"+t.item.id}}},[r("q-card",{staticStyle:{width:"100%"},attrs:{id:t.item.id,flat:"",square:""}},[r("ImageComponent",{attrs:{inlineStyle:{"max-height":"100vh","min-height":"100px",width:"100%"},src:t.item.image}})],1)],1)]}}],null,!1,2238023099)}):t._e(),"/photography"!==t.$route.path?r("router-view",{attrs:{store:t.store,updateLayout:t.updateLayout},scopedSlots:t._u([{key:"default",fn:function(t){return[r("ImageComponent",{attrs:{inlineStyle:{"max-height":"100vh","max-width":"100vw","object-fit":"scale-down"},src:t.item.image}})]}}],null,!1,1510572461)}):t._e()],1)],1)],1)},a=[],n=r("a142"),o={name:"PhotographyPage",components:{ImageComponent:n["a"]},props:{updateLayout:Object},data(){return{store:this.$db.collection("photographs")}},methods:{afterEnter(){"/photography"===this.$route.path&&this.$root.$emit("triggerScroll")}}},s=o,c=r("2877"),l=r("9989"),h=r("f09f"),u=r("eebe"),d=r.n(u),m=Object(c["a"])(s,i,a,!1,null,null,null);e["default"]=m.exports;d()(m,"components",{QPage:l["a"],QCard:h["a"]})},a142:function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"full-width text-center",staticStyle:{overflow:"hidden","line-height":"0"}},[t.q?r("q-img",t._g({class:t.inlineClass,style:t.inlineStyle,attrs:{basic:t.basic,contain:t.contain,ratio:t.ratio,src:t.imageSrc,srcset:t.imgSrcSet,"spinner-color":"primary","spinner-size":"2em"},on:{load:function(e){return t.$emit("load")}}},t.imageSrc?{error:t.cdnProblem}:{}),[t._t("default")],2):t._e(),t.q?t._e():r("div",{staticClass:"absolute-center",staticStyle:{transition:"0.5s opacity"},style:t.loading?{}:{opacity:0}},[r("q-spinner",{attrs:{color:"primary",size:"5em"}})],1),t.q?t._e():r("img",t._g({staticStyle:{transition:"0.5s opacity"},style:t.loading?Object.assign({},t.inlineStyle,{opacity:0}):t.inlineStyle,attrs:{src:t.imageSrc,srcset:t.imgSrcSet},on:{load:t.loaded}},t.imageSrc?{error:t.cdnProblem}:{}))],1)},a=[],n=r("cc8e"),o={name:"ImageComponent",mixins:[n["a"]],props:{src:String,contain:Boolean,basic:Boolean,inlineStyle:Object,inlineClass:Object,q:Boolean,ratio:Number},watch:{"$route.path":function(){"photograph"===this.$route.name&&(this.loading=!0)}},data(){return{loading:!0}},computed:{imageSrc(){return""!==this.src?this.src.replace(/\s/g,"%20"):""},imgSrcSet(){if(""!==this.imageSrc){let t=this.imageSrc.search(/_\d+.(jpg|gif|png|jpeg)/g),e=[this.imageSrc.slice(0,t),Number(this.imageSrc.slice(1+t,this.imageSrc.length-4)),this.imageSrc.slice(-3)];return e[0]+"_"+e[1]+"."+e[2]+" "+e[1]+"w, "+e[0]+"_half."+e[2]+" "+Math.floor(e[1]/2)+"w, "+e[0]+"_quarter."+e[2]+" "+Math.floor(e[1]/4)+"w, "+e[0]+"_eighth."+e[2]+" "+Math.floor(e[1]/8)+"w"}return""}},methods:{loaded(){this.loading=!1,this.$emit("load")}},activated(){this.loading=!1}},s=o,c=r("2877"),l=r("068f"),h=r("0d59"),u=r("eebe"),d=r.n(u),m=Object(c["a"])(s,i,a,!1,null,null,null);e["a"]=m.exports;d()(m,"components",{QImg:l["a"],QSpinner:h["a"]})},cc8e:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));const i={methods:{connectionError(t){return this.error("firestore","Connection problem with firestore servers. Object: "+t)},cdnProblem(t){return this.error("cdn","Connection problem with cdn servers. Object: "+t)},notFound(t){return this.error("404","Requested content could not found. Probable url mismatch. Object: "+t)},unknownError(t){return this.error("url","Have no idea what the hell just happened. Kindly inform the idiot dev please, thanks. Object: "+t)},error(t,e){return this.$q.loading.hide(),this.$router.push("/error?code="+t),Promise.reject(e)}}}}}]);