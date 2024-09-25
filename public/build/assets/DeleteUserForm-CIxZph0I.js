import{o as x,f as _,r as h,B as C,s as $,x as B,h as D,c as E,a as o,w as n,i as f,z as p,b as s,A as y,n as b,g as V,C as U,y as v,T as A,D as S,d as w,u as d,q as T}from"./app-BYsSabO3.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as z}from"./InputError-DDwO6WKk.js";import{_ as M,a as O}from"./TextInput-D1hcRGWv.js";import{_ as P}from"./SecondaryButton-D4_jEV1e.js";const W={},F={class:"inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"};function I(l,r){return x(),_("button",F,[h(l.$slots,"default")])}const g=N(W,[["render",I]]),K={class:"fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50","scroll-region":""},L={__name:"Modal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(l,{emit:r}){const a=l,t=r;C(()=>a.show,()=>{a.show?document.body.style.overflow="hidden":document.body.style.overflow=null});const u=()=>{a.closeable&&t("close")},c=m=>{m.key==="Escape"&&a.show&&u()};$(()=>document.addEventListener("keydown",c)),B(()=>{document.removeEventListener("keydown",c),document.body.style.overflow=null});const i=D(()=>({sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"})[a.maxWidth]);return(m,e)=>(x(),E(U,{to:"body"},[o(y,{"leave-active-class":"duration-200"},{default:n(()=>[f(s("div",K,[o(y,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:n(()=>[f(s("div",{class:"fixed inset-0 transform transition-all",onClick:u},e[0]||(e[0]=[s("div",{class:"absolute inset-0 bg-gray-500 opacity-75"},null,-1)]),512),[[p,l.show]])]),_:1}),o(y,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:n(()=>[f(s("div",{class:b(["mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto",i.value])},[l.show?h(m.$slots,"default",{key:0}):V("",!0)],2),[[p,l.show]])]),_:3})],512),[[p,l.show]])]),_:3})]))}},j={class:"space-y-6"},q={class:"p-6"},G={class:"mt-6"},H={class:"mt-6 flex justify-end"},Z={__name:"DeleteUserForm",setup(l){const r=v(!1),a=v(null),t=A({password:""}),u=()=>{r.value=!0,S(()=>a.value.focus())},c=()=>{t.delete(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>i(),onError:()=>a.value.focus(),onFinish:()=>t.reset()})},i=()=>{r.value=!1,t.clearErrors(),t.reset()};return(m,e)=>(x(),_("section",j,[e[6]||(e[6]=s("header",null,[s("h2",{class:"text-lg font-medium text-gray-900"},"Delete Account"),s("p",{class:"mt-1 text-sm text-gray-600"}," Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. ")],-1)),o(g,{onClick:u},{default:n(()=>e[1]||(e[1]=[w("Delete Account")])),_:1}),o(L,{show:r.value,onClose:i},{default:n(()=>[s("div",q,[e[4]||(e[4]=s("h2",{class:"text-lg font-medium text-gray-900"}," Are you sure you want to delete your account? ",-1)),e[5]||(e[5]=s("p",{class:"mt-1 text-sm text-gray-600"}," Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ",-1)),s("div",G,[o(M,{for:"password",value:"Password",class:"sr-only"}),o(O,{id:"password",ref_key:"passwordInput",ref:a,modelValue:d(t).password,"onUpdate:modelValue":e[0]||(e[0]=k=>d(t).password=k),type:"password",class:"mt-1 block w-3/4",placeholder:"Password",onKeyup:T(c,["enter"])},null,8,["modelValue"]),o(z,{message:d(t).errors.password,class:"mt-2"},null,8,["message"])]),s("div",H,[o(P,{onClick:i},{default:n(()=>e[2]||(e[2]=[w(" Cancel ")])),_:1}),o(g,{class:b(["ms-3",{"opacity-25":d(t).processing}]),disabled:d(t).processing,onClick:c},{default:n(()=>e[3]||(e[3]=[w(" Delete Account ")])),_:1},8,["class","disabled"])])])]),_:1},8,["show"])]))}};export{Z as default};
