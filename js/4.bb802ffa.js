(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"414a":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));const s={methods:{generateLink(t){return t.toLowerCase().replace(/[çöüğşüı]/g,t=>({"ç":"c","ö":"o","ü":"u","ğ":"g","ş":"s","ı":"i"}[t])).replace(/[^\w ]+/g,"").replace(/ +/g,"-")}}}},"6bcd":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));const s={left:{enter:"animated fadeInLeft",leave:"animated fadeOutRight"},right:{enter:"animated fadeInRight",leave:"animated fadeOutLeft"},up:{enter:"animated fadeInDown",leave:"animated fadeOutDown"},down:{enter:"animated fadeInUp",leave:"animated fadeOutUp"},in:{enter:"animated fadeIn",leave:"animated fadeOut"}}},7525:function(t,e,i){"use strict";var s=i("9c8c"),n=i.n(s);n.a},"8b24":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-page",{staticClass:"flex",staticStyle:{"min-height":"100vh",overflow:"hidden"}},[i("transition",{attrs:{"enter-active-class":t.enterClassName,"leave-active-class":t.leaveClassName},on:{"after-leave":t.hide}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.$q.loading.isActive,expression:"!$q.loading.isActive"}],staticClass:"full-width row items-center justify-evenly"},[i("router-link",{staticClass:"col-7",attrs:{to:t.prevLink,event:""},nativeOn:{click:function(e){return e.preventDefault(),t.prev(e)}}},[i("q-card",{class:t.marginByScreen,attrs:{flat:""}},[i("q-carousel",{attrs:{autoplay:t.frequency,infinite:"",navigation:"",height:"100%","navigation-icon":t.mdiCircle},on:{"before-transition":t.beforeCarouselTransition},model:{value:t.slide,callback:function(e){t.slide=e},expression:"slide"}},t._l(t.images,(function(e,s){return i("q-carousel-slide",{key:s,staticStyle:{padding:"0"},attrs:{name:s}},[i("ImageComponent",{attrs:{inlineStyle:{"max-height":"100vh"},ratio:2/3,src:e,contain:"",q:""},on:{load:t.reveal}})],1)})),1)],1)],1),i("router-link",{staticClass:"col-5",staticStyle:{"text-decoration":"none",color:"rgb(0,0,0)"},attrs:{to:t.nextLink,event:""},nativeOn:{click:function(e){return e.preventDefault(),t.next(e)}}},[i("q-card",{class:t.marginByScreen,attrs:{bordered:!t.$q.screen.xs,flat:""}},[i("q-card-section",{style:t.$q.screen.xs?"padding:0;":""},[i("div",{domProps:{innerHTML:t._s(t.text)}})])],1)],1),i("q-page-sticky",{staticStyle:{opacity:".3"},attrs:{offset:[9,9],position:"top-right"}},[i("q-chip",{attrs:{label:t.pageChip,dense:""}})],1)],1)])],1)},n=[],a=i("e519"),r=i("a142"),o=i("6bcd"),l=i("cc8e"),h=i("414a");let c;var d={name:"IndexPage",mixins:[l["a"],h["a"]],components:{ImageComponent:r["a"]},props:{updateLayout:Object},data(){return{enterClassName:o["a"].in.enter,leaveClassName:o["a"].in.leave,list:[],images:[],text:"",page:0,pageChip:"",notify:void 0,proms:[],slide:0,isRevealed:!1,frequency:0,mdiCircle:""}},computed:{marginByScreen(){return{"q-mx-xs":this.$q.screen.xs,"q-mx-sm":this.$q.screen.sm,"q-mx-md":this.$q.screen.md,"q-mx-lg":this.$q.screen.lg,"q-mx-xl":this.$q.screen.xl}},curLink(){let t="/";return this.page>1&&this.page<=this.list.length&&this.list.length>0&&void 0!==this.list[this.page-1]&&(t=t+this.page+"-"+this.generateLink(this.list[this.page-1].title)),t},prevLink(){let t="/";return this.page>2&&this.list.length>0&&void 0!==this.list[this.page-2]&&(t=t+(this.page-1)+"-"+this.generateLink(this.list[this.page-2].title)),t},nextLink(){let t="/";return this.page<=this.list.length&&this.list.length>0&&void 0!==this.list[this.page]&&(t=t+(this.page+1)+"-"+this.generateLink(this.list[this.page].title)),t}},watch:{"$route.params.id":function(t){t=Number(t.split("-")[0]),this.page=Number(t||""),this.page=this.page<2?1:this.page,this.fetch()},"updateLayout.page":function(t,e){t>e?this.last():this.first()},"list.length":function(t){this.updateLayout.lastPage=this.list.length}},methods:{fetchThen(t){let e=t.find(t=>"exists"in t);if(e&&!0===e.exists){let t=e.data();if(!(Number.isInteger(t.count)&&t.count>0))return this.notFound("Index Page could not fetch number of pages.");this.list=Array(t.count).fill(void 0)}else if(this.list.length<1)return this.notFound("Index Page could not fetch number of pages.");let i=t.find(t=>"empty"in t);if(i&&!1===i.empty){let t=[];if(i.docs.filter(t=>"exists"in t&&!0===t.exists).forEach(e=>t.push(e.data())),t.length<1)return this.notFound("Index Page could not fetch detail of page number: "+this.page);t.forEach(t=>this.list.splice(t.id-1,1,t))}else if(void 0===this.list[this.page-1])return this.notFound("Index Page could not fetch detail of page number: "+this.page);let s=this.images=[];({images:s,text:this.text,title:document.title}=this.list[this.page-1]),this.images.push(...s),this.$route.path!==this.curLink&&history.pushState({},null,this.curLink),this.proms=[],this.isRevealed=!1,this.slide=0},fetch(){this.$q.loading.show(),this.updateLayout.buffer=this.list.length>0?this.page/this.list.length:0,this.slide=-1;let t=[this.page-1,this.page,this.page+1].filter(t=>t>0),e=this.list.filter(e=>!!e&&t.includes(e.id)).map(t=>t.id);t=t.filter(t=>!e.includes(t)),t.length>0&&this.proms.push(this.$db.collection("pages").where("id","in",t).get()),Promise.all(this.proms).catch(this.connectionError).then(t=>this.fetchThen(t.filter(t=>"resolve"!==t)))},hide(){this.frequency=0,"function"===typeof this.notify&&this.notify(),c(Promise.resolve("resolve"))},reveal(){this.frequency=32e3/this.images.length,this.isRevealed||(this.updateLayout.value=this.page/this.list.length,this.pageChip=this.page+"/"+this.list.length,this.$q.loading.hide(),this.proms.push(new Promise((t,e)=>c=t)),this.isRevealed=!0)},beforeCarouselTransition(){this.frequency=0},animationDirection(t){this.enterClassName=t.enter,this.leaveClassName=t.leave},prev(t=o["a"].in){t&&t.enter&&t.leave||(t=o["a"].left),this.page>1?(this.animationDirection(t),this.$router.push(this.prevLink)):this.notifyShow("You are looking at first page =]")},next(t=o["a"].in){t&&t.enter&&t.leave||(t=o["a"].right),this.page<this.list.length?(this.animationDirection(t),this.$router.push(this.nextLink)):this.notifyShow("Last page sadly =[, use the button down below on the right side for more!")},first(){1!==this.page?(this.animationDirection(o["a"].in),this.$router.push("/")):this.notifyShow("You are looking at first page =]")},last(){this.page!==this.list.length?(this.animationDirection(o["a"].in),this.$router.push("/"+(this.list.length>0?this.list.length:""))):this.notifyShow("Last page sadly =[ Yo want more of me? Use reveal me button =]")},notifyShow(t){"function"!==typeof this.notify&&(this.notify=this.$q.notify({message:t,position:"top-right",onDismiss:()=>this.notify=void 0}))}},created(){this.mdiCircle=a["d"],this.$q.loading.show(),this.proms.push(this.$db.collection("pages").doc("data").get());let t=Number(this.$route.params.id.split("-")[0]);this.page=Number(t||""),1===this.page?this.$router.push("/"):(this.page=this.page<2?1:this.page,this.fetch()),this.$root.$on("prev",t=>this.prev(t)),this.$root.$on("next",t=>this.next(t)),this.$root.$on("first",t=>this.first()),this.$root.$on("last",t=>this.last())},updated(){document.querySelectorAll("a.col-5 a").forEach(t=>{t&&!t.onclick&&(t.onclick=t=>{t.stopPropagation()})});let t=document.querySelectorAll("div.q-carousel__navigation-inner button");t.length>0&&t.forEach(t=>{t.onclick=t=>{t.preventDefault(),t.stopPropagation()}})},destroyed(){"function"===typeof this.notify&&this.notify(),this.updateLayout.value=this.updateLayout.buffer=0,this.$root.$off("prev"),this.$root.$off("next"),this.$root.$off("first"),this.$root.$off("last")},beforeRouteEnter(t,e,i){let s=sessionStorage.redirect;delete sessionStorage.redirect,s&&s!==location.pathname?i(s):i()},beforeRouteUpdate(t,e,i){!this.$q.loading.isActive||"/"===t.path&&"/1"===e.path?i():i(!1)},beforeRouteLeave(t,e,i){this.$q.loading.isActive?i(!1):i()}},u=d,g=(i("7525"),i("2877")),p=i("9989"),f=i("f09f"),m=i("880c"),v=i("62cd"),y=i("a370"),b=i("de5e"),$=i("b047"),S=i("eebe"),q=i.n(S),x=Object(g["a"])(u,s,n,!1,null,"c31e8866",null);e["default"]=x.exports;q()(x,"components",{QPage:p["a"],QCard:f["a"],QCarousel:m["a"],QCarouselSlide:v["a"],QCardSection:y["a"],QPageSticky:b["a"],QChip:$["a"]})},"9c8c":function(t,e,i){},a142:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"full-width text-center",staticStyle:{overflow:"hidden","line-height":"0"}},[t.q?i("q-img",t._g({class:t.inlineClass,style:t.inlineStyle,attrs:{basic:t.basic,contain:t.contain,ratio:t.ratio,src:t.imageSrc,srcset:t.imgSrcSet,"spinner-color":"primary","spinner-size":"2em"},on:{load:function(e){return t.$emit("load")}}},t.imageSrc?{error:t.cdnProblem}:{}),[t._t("default")],2):t._e(),t.q?t._e():i("div",{staticClass:"absolute-center",staticStyle:{transition:"0.5s opacity"},style:t.loading?{}:{opacity:0}},[i("q-spinner",{attrs:{color:"primary",size:"5em"}})],1),t.q?t._e():i("img",t._g({staticStyle:{transition:"0.5s opacity"},style:t.loading?Object.assign({},t.inlineStyle,{opacity:0}):t.inlineStyle,attrs:{src:t.imageSrc,srcset:t.imgSrcSet},on:{load:t.loaded}},t.imageSrc?{error:t.cdnProblem}:{}))],1)},n=[],a=i("cc8e"),r={name:"ImageComponent",mixins:[a["a"]],props:{src:String,contain:Boolean,basic:Boolean,inlineStyle:Object,inlineClass:Object,q:Boolean,ratio:Number},watch:{"$route.path":function(){"photograph"===this.$route.name&&(this.loading=!0)}},data(){return{loading:!0}},computed:{imageSrc(){return""!==this.src?this.src.replace(/\s/g,"%20"):""},imgSrcSet(){if(""!==this.imageSrc){let t=this.imageSrc.search(/_\d+.(jpg|gif|png|jpeg)/g),e=[this.imageSrc.slice(0,t),Number(this.imageSrc.slice(1+t,this.imageSrc.length-4)),this.imageSrc.slice(-3)];return e[0]+"_"+e[1]+"."+e[2]+" "+e[1]+"w, "+e[0]+"_half."+e[2]+" "+Math.floor(e[1]/2)+"w, "+e[0]+"_quarter."+e[2]+" "+Math.floor(e[1]/4)+"w, "+e[0]+"_eighth."+e[2]+" "+Math.floor(e[1]/8)+"w"}return""}},methods:{loaded(){this.loading=!1,this.$emit("load")}},activated(){this.loading=!1}},o=r,l=i("2877"),h=i("068f"),c=i("0d59"),d=i("eebe"),u=i.n(d),g=Object(l["a"])(o,s,n,!1,null,null,null);e["a"]=g.exports;u()(g,"components",{QImg:h["a"],QSpinner:c["a"]})},cc8e:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));const s={methods:{connectionError(t){return this.error("firestore","Connection problem with firestore servers. Object: "+t)},cdnProblem(t){return this.error("cdn","Connection problem with cdn servers. Object: "+t)},notFound(t){return this.error("404","Requested content could not found. Probable url mismatch. Object: "+t)},unknownError(t){return this.error("url","Have no idea what the hell just happened. Kindly inform the idiot dev please, thanks. Object: "+t)},error(t,e){return this.$q.loading.hide(),this.$router.push("/error?code="+t),Promise.reject(e)}}}}}]);