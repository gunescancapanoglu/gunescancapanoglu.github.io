(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"26f1":function(t,e,n){"use strict";var r=n("7020"),s=n.n(r);s.a},7020:function(t,e,n){},cc8e:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("551c"),n("06db");var r={methods:{connectionError:function(t){return this.error("firestore","Connection problem with firestore servers. Object: "+t)},cdnProblem:function(t){return this.error("cdn","Connection problem with cdn servers. Object: "+t)},notFound:function(t){return this.error("404","Requested content could not found. Probable url mismatch. Object: "+t)},unknownError:function(t){return this.error("url","Have no idea what the hell just happened. Kindly inform the idiot dev please, thanks. Object: "+t)},error:function(t,e){return this.$q.loading.hide(),this.$router.push("/error?code="+t),Promise.reject(e)}}}},f552:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-infinite-scroll",{staticClass:"row full-width",on:{load:t.fetch},scopedSlots:t._u([{key:"loading",fn:function(){return[n("div",{staticClass:"row justify-center q-my-md"},[n("q-spinner-dots",{style:t.done?"display:none;":"",attrs:{color:"primary",size:"40px"}})],1)]},proxy:!0}])},t._l(t.columns,(function(e,r){return n("div",{key:r,staticClass:"col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"},t._l(e,(function(e){return n("div",{key:e.id,staticClass:"col-12"},[t._t("default",null,{item:e})],2)})),0)})),0)},s=[],o=(n("7f7f"),n("ac4d"),n("8a81"),n("ac6a"),n("cc8e")),i={name:"ColumnsComponent",mixins:[o["a"]],props:{store:Object,updateLayout:Object},data:function(){return{contentArrayData:[],contentArray:[],columns:[],done:!1}},watch:{"$q.screen.xs":function(t){t&&(this.resetArrays(),this.setArrays())},"$q.screen.sm":function(t){t&&(this.resetArrays(),this.setArrays())},"$q.screen.md":function(t){t&&(this.resetArrays(),this.setArrays())},"$q.screen.lg":function(t){t&&(this.resetArrays(),this.setArrays())},"$q.screen.xl":function(t){t&&(this.resetArrays(),this.setArrays())},contentArray:function(){this.resetArrays(),this.setArrays()}},methods:{resetArrays:function(){this.columns=[],this.columns.push([]),this.$q.screen.sm?this.columns.push([]):this.$q.screen.md?this.columns.push([],[]):this.$q.screen.lg?this.columns.push([],[],[]):this.$q.screen.xl&&this.columns.push([],[],[],[],[])},setArrays:function(){this.contentArrayData.reduce((function(t,e){var n=t.it.next();return n.done&&(t.it=t.columns[Symbol.iterator](),n=t.it.next()),n.value.push(e),t}),{columns:this.columns,it:this.columns[Symbol.iterator]()})},fetchThen:function(t,e){var n=this;if(!1===t.empty)t.docs.forEach((function(t){n.contentArray.push(t),n.contentArrayData.push(t.data())}),this),e();else{if(!0===t.empty&&this.contentArray.length<1)return this.notFound("Columns Component could not fetch any item.");e(this.done=!0)}},fetch:function(t,e){var n,r=this,s=4*this.columns.length;n=0===this.contentArray.length?this.store.orderBy("id","desc").limit(s).get():this.store.orderBy("id","desc").startAfter(this.contentArray[this.contentArray.length-1]).limit(s).get(),n.catch(this.connectionError).then((function(t){return r.fetchThen(t,e)}))},triggerScroll:function(t){if("/photography"===this.$route.path||"/reviews"===this.$route.path){var e=document.querySelector("[href='".concat(t.path,"']"));e&&e.scrollIntoView({block:"start",behavior:"smooth"})}},setupScrollAfterTransition:function(t,e){var n=this;("/photography"===t.path&&"photograph"===e.name||"/reviews"===t.path&&"photograph"!==e.name)&&this.$root.$once("triggerScroll",(function(){return n.triggerScroll(e)}))}},created:function(){this.resetArrays()},activated:function(){"/photography"===this.$route.path?document.title="Over 20 years, and tens of thousands of stills these are the best I can come up with. Please, don't judge...":document.title="I grew up imagining working for a gaming magazine thinking it would be awesome! Oh boy, was I wrong..."},beforeRouteEnter:function(t,e,n){n((function(r){r.setupScrollAfterTransition(t,e),n()}))}},c=i,a=(n("26f1"),n("2877")),u=Object(a["a"])(c,r,s,!1,null,"df225214",null);e["default"]=u.exports}}]);