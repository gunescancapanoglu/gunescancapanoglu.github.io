(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"414a":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));i("a481");var n={methods:{generateLink:function(t){return t.toLowerCase().replace(/[çöüğşüı]/g,(function(t){return{"ç":"c","ö":"o","ü":"u","ğ":"g","ş":"s","ı":"i"}[t]})).replace(/[^\w ]+/g,"").replace(/ +/g,"-")}}}},"5e7d":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:{fullscreen:"photograph"===t.$route.name},staticStyle:{"z-index":"inherit"}},[i("q-carousel",{staticClass:"full-height",style:"photograph"===t.$route.name?{"background-color":"black"}:{"background-color":""},attrs:{animated:"",infinite:""},model:{value:t.slide,callback:function(e){t.slide=e},expression:"slide"}},t._l(t.collection,(function(e){return i("q-carousel-slide",{key:e.id,staticClass:"column no-wrap q-pa-none",class:{"flex-center":"photograph"===t.$route.name},attrs:{name:e.id}},[t._t("default",null,{item:e})],2)})),1),"photograph"===t.$route.name?i("div",{staticClass:"absolute-center full-width full-height row"},[i("router-link",{staticClass:"col-6",attrs:{to:t.prevSlideId,event:""}}),i("router-link",{staticClass:"col-6",attrs:{to:t.nextSlideId,event:""}})],1):t._e(),"photograph"===t.$route.name?i("div",{staticClass:"absolute-center full-width full-height"}):t._e(),i("q-page-sticky",{attrs:{offset:[18,18],position:"top-right"}},[i("q-btn",{staticStyle:{opacity:".3"},attrs:{round:"",color:"primary",icon:t.mdiClose},on:{click:function(e){return t.$router.push("photograph"===t.$route.name?"/photography":"/reviews")}}})],1)],1)},o=[],r=(i("8e6e"),i("8a81"),i("456d"),i("28a5"),i("c5f6"),i("551c"),i("ac6a"),i("cadf"),i("5df3"),i("4db1")),s=i.n(r),c=i("c47a"),h=i.n(c),u=(i("7f7f"),i("7514"),i("6b54"),i("06db"),i("e519")),a=i("cc8e"),l=i("414a");function d(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function f(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?d(Object(i),!0).forEach((function(e){h()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):d(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var p={name:"ItemComponent",mixins:[a["a"],l["a"]],props:{updateLayout:Object,store:Object},data:function(){return{slide:0,collection:[],count:0,fetching:!0,notify:void 0,mdiClose:""}},computed:{prevSlideId:function(){return this.slide>0&&this.slide<this.count?(this.slide+1).toString():"1"},nextSlideId:function(){return this.slide>1&&this.slide<=this.count?(this.slide-1).toString():this.count.toString()},curLink:function(){var t=this,e="",i=this.collection.find((function(e){return e.id===t.slide}));return this.slide>1&&this.slide<=this.count&&this.count>0&&void 0!==i&&(e=e+this.slide+"-"+this.generateLink(i.title)),e}},methods:{next:function(){this.fetching||this.changeSlide(1)},prev:function(){this.fetching||this.changeSlide(-1)},first:function(){this.fetching||this.changeSlide(this.slide-this.count)},last:function(){this.fetching||this.changeSlide(this.slide-1)},updateSlide:function(){var t=this;this.$router.push({params:{id:"photograph"===this.$route.name?this.slide:function(e){return e.id+"-"+t.generateLink(e.title)}(this.collection.find((function(e){return e.id===t.slide})))}}).then((function(){return t.fetch(t.slide)}),(function(e){return"NavigationDuplicated"===e.name?t.notify=t.$q.notify({message:"You are at the start/end of the gallery =]",position:"top-right",onDismiss:function(){return t.notify=void 0}}):t.unknownError(e)}))},changeSlide:function(t){"function"===typeof this.notify&&this.notify(),this.slide-t<=this.count&&this.slide-t>0?(this.slide-=t,this.updateSlide()):this.slide-t<1?(this.slide=this.count,this.updateSlide()):this.slide-t>this.count&&(this.slide=1,this.updateSlide())},check:function(t){var e=this;return t>0&&t<=this.count&&!this.collection.find((function(e){return e.id===t}))?t:t<1&&!this.collection.find((function(t){return t.id===e.count}))?this.count:t>this.count&&!this.collection.find((function(t){return 1===t.id}))?1:-1},fetchReview:function(t,e){var i=this;if(!(t.length>0))return this.notFound("Item Component could not fetch the detail item/items.");t.forEach((function(t,n){return i.collection.push(f({},e[n],{},t.docs[0].data()))})),"photography"!==this.$route.name&&(this.$route.params.id!==this.curLink&&history.pushState({},null,"/reviews/"+this.curLink),document.title=this.collection.find((function(t){return t.id===i.slide})).title),this.fetching=!1},fetchThen:function(t,e){var i=this,n=[];t.forEach((function(t){return!1===t.empty?n.push.apply(n,s()(t.docs)):{}}));var o,r=[],c=[];(n.forEach((function(t){"photograph"!==i.$route.name&&r.push(i.store.doc(t.id).collection("review").get()),c.push(t.data())}),this),r.length)?Promise.all(r).catch(this.connectionError).then((function(t){return i.fetchReview(t,c)})):((o=this.collection).push.apply(o,c),this.fetching=!1);this.collection.sort((function(t,e){return e.id-t.id}))},fetch:function(t){var e=this;this.updateLayout.value=(this.count-this.slide+1)/this.count,this.fetching=!0;var i=this.check(t+1),n=this.check(t),o=this.check(t-1),r=[];i===t+1&&n===t&&o===t-1?r.push(this.fetchRange(t+2,3)):i!==t+1&&n===t&&o===t-1?(r.push(this.fetchRange(t+1,2)),r.push(this.fetchOne(i))):i===t+1&&n===t&&o!==t-1?(r.push(this.fetchRange(t+2,2)),r.push(this.fetchOne(o))):(-1!==i&&r.push(this.fetchOne(i)),-1!==n&&r.push(this.fetchOne(n)),-1!==o&&r.push(this.fetchOne(o)));var s=this.collection.find((function(t){return t.id===e.slide}));r.length<3&&"photograph"!==this.$route.name&&void 0!==s?document.title=s.title:"photograph"===this.$route.name&&(document.title="Over 20 years, and tens of thousands of stills these are the best I can come up with. Please, don't judge..."),Promise.all(r).catch(this.connectionError).then((function(i){return e.fetchThen(i,t)}))},fetchOne:function(t){return this.store.where("id","==",t).get()},fetchRange:function(t,e){return this.store.orderBy("id","desc").where("id","<",t).limit(e).get()},init:function(t){if(this.count=t.data().count,this.slide="photograph"===this.$route.name?Number(this.$route.params.id):Number(this.$route.params.id.split("-")[0]),!(this.slide>0&&this.slide<=this.count))return this.notFound("Item Component could not fetch the item/items.");this.fetch(this.slide)}},created:function(){var t=this;this.mdiClose=u["e"],this.store.doc("data").get().catch(this.connectionError).then((function(e){return t.init(e)})),window.onpopstate=function(){return t.fetch("photograph"===t.$route.name?t.slide=Number(t.$route.params.id):t.slide=Number(t.$route.params.id.split("-")[0]))},this.$root.$on("prev",(function(){return t.prev()})),this.$root.$on("next",(function(){return t.next()})),this.$root.$on("first",(function(){return t.first()})),this.$root.$on("last",(function(){return t.last()}))},destroyed:function(){this.updateLayout.value=this.updateLayout.buffer=0,window.onpopstate=function(){},this.$root.$off("prev"),this.$root.$off("next"),this.$root.$off("first"),this.$root.$off("last")}},m=p,g=i("2877"),v=Object(g["a"])(m,n,o,!1,null,null,null);e["default"]=v.exports},cc8e:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));i("551c"),i("06db");var n={methods:{connectionError:function(t){return this.error("firestore","Connection problem with firestore servers. Object: "+t)},cdnProblem:function(t){return this.error("cdn","Connection problem with cdn servers. Object: "+t)},notFound:function(t){return this.error("404","Requested content could not found. Probable url mismatch. Object: "+t)},unknownError:function(t){return this.error("url","Have no idea what the hell just happened. Kindly inform the idiot dev please, thanks. Object: "+t)},error:function(t,e){return this.$q.loading.hide(),this.$router.push("/error?code="+t),Promise.reject(e)}}}}}]);