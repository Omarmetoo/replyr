(function(){"use strict";var O,m,pe,U,he,me,ye,ee,W,R,ge,te,ne,oe,B={},q=[],We=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,V=Array.isArray;function I(t,e){for(var n in e)t[n]=e[n];return t}function re(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Be(t,e,n){var _,i,o,s={};for(o in e)o=="key"?_=e[o]:o=="ref"?i=e[o]:s[o]=e[o];if(arguments.length>2&&(s.children=arguments.length>3?O.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)s[o]===void 0&&(s[o]=t.defaultProps[o]);return J(t,s,_,i,null)}function J(t,e,n,_,i){var o={type:t,props:e,key:n,ref:_,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++pe,__i:-1,__u:0};return i==null&&m.vnode!=null&&m.vnode(o),o}function z(t){return t.children}function Y(t,e){this.props=t,this.context=e}function E(t,e){if(e==null)return t.__?E(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?E(t):null}function qe(t){if(t.__P&&t.__d){var e=t.__v,n=e.__e,_=[],i=[],o=I({},e);o.__v=e.__v+1,m.vnode&&m.vnode(o),_e(t.__P,o,e,t.__n,t.__P.namespaceURI,32&e.__u?[n]:null,_,n??E(e),!!(32&e.__u),i),o.__v=e.__v,o.__.__k[o.__i]=o,$e(_,o,i),e.__e=e.__=null,o.__e!=n&&be(o)}}function be(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),be(t)}function ve(t){(!t.__d&&(t.__d=!0)&&U.push(t)&&!G.__r++||he!=m.debounceRendering)&&((he=m.debounceRendering)||me)(G)}function G(){try{for(var t,e=1;U.length;)U.length>e&&U.sort(ye),t=U.shift(),e=U.length,qe(t)}finally{U.length=G.__r=0}}function xe(t,e,n,_,i,o,s,a,c,l,d){var r,u,f,x,w,k,h,p=_&&_.__k||q,C=e.length;for(c=Ve(n,e,p,c,C),r=0;r<C;r++)(f=n.__k[r])!=null&&(u=f.__i!=-1&&p[f.__i]||B,f.__i=r,k=_e(t,f,u,i,o,s,a,c,l,d),x=f.__e,f.ref&&u.ref!=f.ref&&(u.ref&&se(u.ref,null,f),d.push(f.ref,f.__c||x,f)),w==null&&x!=null&&(w=x),(h=!!(4&f.__u))||u.__k===f.__k?(c=ke(f,c,t,h),h&&u.__e&&(u.__e=null)):typeof f.type=="function"&&k!==void 0?c=k:x&&(c=x.nextSibling),f.__u&=-7);return n.__e=w,c}function Ve(t,e,n,_,i){var o,s,a,c,l,d=n.length,r=d,u=0;for(t.__k=new Array(i),o=0;o<i;o++)(s=e[o])!=null&&typeof s!="boolean"&&typeof s!="function"?(typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?s=t.__k[o]=J(null,s,null,null,null):V(s)?s=t.__k[o]=J(z,{children:s},null,null,null):s.constructor===void 0&&s.__b>0?s=t.__k[o]=J(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):t.__k[o]=s,c=o+u,s.__=t,s.__b=t.__b+1,a=null,(l=s.__i=Je(s,n,c,r))!=-1&&(r--,(a=n[l])&&(a.__u|=2)),a==null||a.__v==null?(l==-1&&(i>d?u--:i<d&&u++),typeof s.type!="function"&&(s.__u|=4)):l!=c&&(l==c-1?u--:l==c+1?u++:(l>c?u--:u++,s.__u|=4))):t.__k[o]=null;if(r)for(o=0;o<d;o++)(a=n[o])!=null&&(2&a.__u)==0&&(a.__e==_&&(_=E(a)),He(a,a));return _}function ke(t,e,n,_){var i,o;if(typeof t.type=="function"){for(i=t.__k,o=0;i&&o<i.length;o++)i[o]&&(i[o].__=t,e=ke(i[o],e,n,_));return e}t.__e!=e&&(_&&(e&&t.type&&!e.parentNode&&(e=E(t)),n.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Je(t,e,n,_){var i,o,s,a=t.key,c=t.type,l=e[n],d=l!=null&&(2&l.__u)==0;if(l===null&&a==null||d&&a==l.key&&c==l.type)return n;if(_>(d?1:0)){for(i=n-1,o=n+1;i>=0||o<e.length;)if((l=e[s=i>=0?i--:o++])!=null&&(2&l.__u)==0&&a==l.key&&c==l.type)return s}return-1}function we(t,e,n){e[0]=="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||We.test(e)?n:n+"px"}function X(t,e,n,_,i){var o,s;e:if(e=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof _=="string"&&(t.style.cssText=_=""),_)for(e in _)n&&e in n||we(t.style,e,"");if(n)for(e in n)_&&n[e]==_[e]||we(t.style,e,n[e])}else if(e[0]=="o"&&e[1]=="n")o=e!=(e=e.replace(ge,"$1")),s=e.toLowerCase(),e=s in t||e=="onFocusOut"||e=="onFocusIn"?s.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=n,n?_?n[R]=_[R]:(n[R]=te,t.addEventListener(e,o?oe:ne,o)):t.removeEventListener(e,o?oe:ne,o);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function Se(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e[W]==null)e[W]=te++;else if(e[W]<n[R])return;return n(m.event?m.event(e):e)}}}function _e(t,e,n,_,i,o,s,a,c,l){var d,r,u,f,x,w,k,h,p,C,P,N,Z,D,L,S=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(c=!!(32&n.__u),o=[a=e.__e=n.__e]),(d=m.__b)&&d(e);e:if(typeof S=="function")try{if(h=e.props,p=S.prototype&&S.prototype.render,C=(d=S.contextType)&&_[d.__c],P=d?C?C.props.value:d.__:_,n.__c?k=(r=e.__c=n.__c).__=r.__E:(p?e.__c=r=new S(h,P):(e.__c=r=new Y(h,P),r.constructor=S,r.render=Ge),C&&C.sub(r),r.state||(r.state={}),r.__n=_,u=r.__d=!0,r.__h=[],r._sb=[]),p&&r.__s==null&&(r.__s=r.state),p&&S.getDerivedStateFromProps!=null&&(r.__s==r.state&&(r.__s=I({},r.__s)),I(r.__s,S.getDerivedStateFromProps(h,r.__s))),f=r.props,x=r.state,r.__v=e,u)p&&S.getDerivedStateFromProps==null&&r.componentWillMount!=null&&r.componentWillMount(),p&&r.componentDidMount!=null&&r.__h.push(r.componentDidMount);else{if(p&&S.getDerivedStateFromProps==null&&h!==f&&r.componentWillReceiveProps!=null&&r.componentWillReceiveProps(h,P),e.__v==n.__v||!r.__e&&r.shouldComponentUpdate!=null&&r.shouldComponentUpdate(h,r.__s,P)===!1){e.__v!=n.__v&&(r.props=h,r.state=r.__s,r.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.some(function(T){T&&(T.__=e)}),q.push.apply(r.__h,r._sb),r._sb=[],r.__h.length&&s.push(r);break e}r.componentWillUpdate!=null&&r.componentWillUpdate(h,r.__s,P),p&&r.componentDidUpdate!=null&&r.__h.push(function(){r.componentDidUpdate(f,x,w)})}if(r.context=P,r.props=h,r.__P=t,r.__e=!1,N=m.__r,Z=0,p)r.state=r.__s,r.__d=!1,N&&N(e),d=r.render(r.props,r.state,r.context),q.push.apply(r.__h,r._sb),r._sb=[];else do r.__d=!1,N&&N(e),d=r.render(r.props,r.state,r.context),r.state=r.__s;while(r.__d&&++Z<25);r.state=r.__s,r.getChildContext!=null&&(_=I(I({},_),r.getChildContext())),p&&!u&&r.getSnapshotBeforeUpdate!=null&&(w=r.getSnapshotBeforeUpdate(f,x)),D=d!=null&&d.type===z&&d.key==null?Ce(d.props.children):d,a=xe(t,V(D)?D:[D],e,n,_,i,o,s,a,c,l),r.base=e.__e,e.__u&=-161,r.__h.length&&s.push(r),k&&(r.__E=r.__=null)}catch(T){if(e.__v=null,c||o!=null)if(T.then){for(e.__u|=c?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;o[o.indexOf(a)]=null,e.__e=a}else{for(L=o.length;L--;)re(o[L]);ie(e)}else e.__e=n.__e,e.__k=n.__k,T.then||ie(e);m.__e(T,e,n)}else o==null&&e.__v==n.__v?(e.__k=n.__k,e.__e=n.__e):a=e.__e=Ye(n.__e,e,n,_,i,o,s,c,l);return(d=m.diffed)&&d(e),128&e.__u?void 0:a}function ie(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(ie))}function $e(t,e,n){for(var _=0;_<n.length;_++)se(n[_],n[++_],n[++_]);m.__c&&m.__c(e,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(o){o.call(i)})}catch(o){m.__e(o,i.__v)}})}function Ce(t){return typeof t!="object"||t==null||t.__b>0?t:V(t)?t.map(Ce):t.constructor!==void 0?null:I({},t)}function Ye(t,e,n,_,i,o,s,a,c){var l,d,r,u,f,x,w,k=n.props||B,h=e.props,p=e.type;if(p=="svg"?i="http://www.w3.org/2000/svg":p=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),o!=null){for(l=0;l<o.length;l++)if((f=o[l])&&"setAttribute"in f==!!p&&(p?f.localName==p:f.nodeType==3)){t=f,o[l]=null;break}}if(t==null){if(p==null)return document.createTextNode(h);t=document.createElementNS(i,p,h.is&&h),a&&(m.__m&&m.__m(e,o),a=!1),o=null}if(p==null)k===h||a&&t.data==h||(t.data=h);else{if(o=p=="textarea"&&h.defaultValue!=null?null:o&&O.call(t.childNodes),!a&&o!=null)for(k={},l=0;l<t.attributes.length;l++)k[(f=t.attributes[l]).name]=f.value;for(l in k)f=k[l],l=="dangerouslySetInnerHTML"?r=f:l=="children"||l in h||l=="value"&&"defaultValue"in h||l=="checked"&&"defaultChecked"in h||X(t,l,null,f,i);for(l in h)f=h[l],l=="children"?u=f:l=="dangerouslySetInnerHTML"?d=f:l=="value"?x=f:l=="checked"?w=f:a&&typeof f!="function"||k[l]===f||X(t,l,f,k[l],i);if(d)a||r&&(d.__html==r.__html||d.__html==t.innerHTML)||(t.innerHTML=d.__html),e.__k=[];else if(r&&(t.innerHTML=""),xe(e.type=="template"?t.content:t,V(u)?u:[u],e,n,_,p=="foreignObject"?"http://www.w3.org/1999/xhtml":i,o,s,o?o[0]:n.__k&&E(n,0),a,c),o!=null)for(l=o.length;l--;)re(o[l]);a&&p!="textarea"||(l="value",p=="progress"&&x==null?t.removeAttribute("value"):x!=null&&(x!==t[l]||p=="progress"&&!x||p=="option"&&x!=k[l])&&X(t,l,x,k[l],i),l="checked",w!=null&&w!=t[l]&&X(t,l,w,k[l],i))}return t}function se(t,e,n){try{if(typeof t=="function"){var _=typeof t.__u=="function";_&&t.__u(),_&&e==null||(t.__u=t(e))}else t.current=e}catch(i){m.__e(i,n)}}function He(t,e,n){var _,i;if(m.unmount&&m.unmount(t),(_=t.ref)&&(_.current&&_.current!=t.__e||se(_,null,e)),(_=t.__c)!=null){if(_.componentWillUnmount)try{_.componentWillUnmount()}catch(o){m.__e(o,e)}_.base=_.__P=null}if(_=t.__k)for(i=0;i<_.length;i++)_[i]&&He(_[i],e,n||typeof t.type!="function");n||re(t.__e),t.__c=t.__=t.__e=void 0}function Ge(t,e,n){return this.constructor(t,n)}function Xe(t,e,n){var _,i,o,s;e==document&&(e=document.documentElement),m.__&&m.__(t,e),i=(_=!1)?null:e.__k,o=[],s=[],_e(e,t=e.__k=Be(z,null,[t]),i||B,B,e.namespaceURI,i?null:e.firstChild?O.call(e.childNodes):null,o,i?i.__e:e.firstChild,_,s),$e(o,t,s)}O=q.slice,m={__e:function(t,e,n,_){for(var i,o,s;e=e.__;)if((i=e.__c)&&!i.__)try{if((o=i.constructor)&&o.getDerivedStateFromError!=null&&(i.setState(o.getDerivedStateFromError(t)),s=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,_||{}),s=i.__d),s)return i.__E=i}catch(a){t=a}throw t}},pe=0,Y.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=I({},this.state),typeof t=="function"&&(t=t(I({},n),this.props)),t&&I(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),ve(this))},Y.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),ve(this))},Y.prototype.render=z,U=[],me=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ye=function(t,e){return t.__v.__b-e.__v.__b},G.__r=0,ee=Math.random().toString(8),W="__d"+ee,R="__a"+ee,ge=/(PointerCapture)$|Capture$/i,te=0,ne=Se(!1),oe=Se(!0);var Ke=0;function g(t,e,n,_,i,o){e||(e={});var s,a,c=e;if("ref"in c)for(a in c={},e)a=="ref"?s=e[a]:c[a]=e[a];var l={type:t,props:c,key:n,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ke,__i:-1,__u:0,__source:i,__self:o};if(typeof t=="function"&&(s=t.defaultProps))for(a in s)c[a]===void 0&&(c[a]=s[a]);return m.vnode&&m.vnode(l),l}var F,b,le,Ie,K=0,Pe=[],v=m,Ne=v.__b,Te=v.__r,Ue=v.diffed,De=v.__c,Me=v.unmount,Ee=v.__;function ae(t,e){v.__h&&v.__h(b,t,K||e),K=0;var n=b.__H||(b.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function $(t){return K=1,Qe(Fe,t)}function Qe(t,e,n){var _=ae(F++,2);if(_.t=t,!_.__c&&(_.__=[Fe(void 0,e),function(a){var c=_.__N?_.__N[0]:_.__[0],l=_.t(c,a);c!==l&&(_.__N=[l,_.__[1]],_.__c.setState({}))}],_.__c=b,!b.__f)){var i=function(a,c,l){if(!_.__c.__H)return!0;var d=_.__c.__H.__.filter(function(u){return u.__c});if(d.every(function(u){return!u.__N}))return!o||o.call(this,a,c,l);var r=_.__c.props!==a;return d.some(function(u){if(u.__N){var f=u.__[0];u.__=u.__N,u.__N=void 0,f!==u.__[0]&&(r=!0)}}),o&&o.call(this,a,c,l)||r};b.__f=!0;var o=b.shouldComponentUpdate,s=b.componentWillUpdate;b.componentWillUpdate=function(a,c,l){if(this.__e){var d=o;o=void 0,i(a,c,l),o=d}s&&s.call(this,a,c,l)},b.shouldComponentUpdate=i}return _.__N||_.__}function Ze(t,e){var n=ae(F++,3);!v.__s&&ze(n.__H,e)&&(n.__=t,n.u=e,b.__H.__h.push(n))}function et(t){return K=5,tt(function(){return{current:t}},[])}function tt(t,e){var n=ae(F++,7);return ze(n.__H,e)&&(n.__=t(),n.__H=e,n.__h=t),n.__}function nt(){for(var t;t=Pe.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(Q),e.__h.some(ce),e.__h=[]}catch(n){e.__h=[],v.__e(n,t.__v)}}}v.__b=function(t){b=null,Ne&&Ne(t)},v.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),Ee&&Ee(t,e)},v.__r=function(t){Te&&Te(t),F=0;var e=(b=t.__c).__H;e&&(le===b?(e.__h=[],b.__h=[],e.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(e.__h.some(Q),e.__h.some(ce),e.__h=[],F=0)),le=b},v.diffed=function(t){Ue&&Ue(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(Pe.push(e)!==1&&Ie===v.requestAnimationFrame||((Ie=v.requestAnimationFrame)||ot)(nt)),e.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0})),le=b=null},v.__c=function(t,e){e.some(function(n){try{n.__h.some(Q),n.__h=n.__h.filter(function(_){return!_.__||ce(_)})}catch(_){e.some(function(i){i.__h&&(i.__h=[])}),e=[],v.__e(_,n.__v)}}),De&&De(t,e)},v.unmount=function(t){Me&&Me(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.some(function(_){try{Q(_)}catch(i){e=i}}),n.__H=void 0,e&&v.__e(e,n.__v))};var Re=typeof requestAnimationFrame=="function";function ot(t){var e,n=function(){clearTimeout(_),Re&&cancelAnimationFrame(e),setTimeout(t)},_=setTimeout(n,35);Re&&(e=requestAnimationFrame(n))}function Q(t){var e=b,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),b=e}function ce(t){var e=b;t.__c=t.__(),b=e}function ze(t,e){return!t||t.length!==e.length||e.some(function(n,_){return n!==t[_]})}function Fe(t,e){return typeof e=="function"?e(t):e}const rt=document.currentScript,_t=`
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.panel {
  position: absolute;
  bottom: 68px;
  width: 360px;
  height: 540px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slide-up 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.panel.right { right: 0; }
.panel.left  { left: 0; }

@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.header {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  flex-shrink: 0;
}
.bot-name { font-weight: 600; font-size: 15px; }
.close-btn {
  background: none; border: none; color: #fff;
  cursor: pointer; font-size: 18px; line-height: 1;
  opacity: 0.75; padding: 2px;
}
.close-btn:hover { opacity: 1; }

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.messages::-webkit-scrollbar { width: 4px; }
.messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }

.msg { display: flex; }
.msg.user      { justify-content: flex-end; }
.msg.assistant { justify-content: flex-start; }

.bbl {
  max-width: 80%;
  padding: 9px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}
.msg.user      .bbl { color: #fff; border-bottom-right-radius: 3px; }
.msg.assistant .bbl { background: #f3f4f6; color: #1f2937; border-bottom-left-radius: 3px; }

.cursor {
  display: inline-block;
  width: 2px; height: 13px;
  background: currentColor;
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }

.handoff-card {
  margin: 0 12px 10px;
  padding: 12px;
  background: #f8faff;
  border: 1px solid #dbeafe;
  border-radius: 12px;
  flex-shrink: 0;
}
.handoff-card p { font-size: 13px; font-weight: 600; color: #1d4ed8; margin-bottom: 8px; }
.handoff-card input,
.handoff-card textarea {
  width: 100%; padding: 7px 10px;
  border: 1px solid #cbd5e1; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit;
  margin-bottom: 6px; display: block;
}
.handoff-card input:focus,
.handoff-card textarea:focus { border-color: #93c5fd; }
.handoff-card textarea { resize: none; height: 52px; }
.handoff-submit {
  width: 100%; padding: 8px;
  border: none; border-radius: 8px;
  color: #fff; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: opacity 0.15s;
}
.handoff-submit:disabled { opacity: 0.5; cursor: default; }
.handoff-done {
  margin: 0 12px 10px;
  padding: 10px 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  font-size: 13px; color: #15803d; font-weight: 500;
  flex-shrink: 0;
}

.input-bar {
  padding: 10px 12px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.txt {
  flex: 1;
  padding: 9px 14px;
  border: 1px solid #d1d5db;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
}
.txt:focus { border-color: #9ca3af; }
.txt:disabled { background: #f9fafb; }

.send {
  width: 38px; height: 38px;
  border-radius: 50%; border: none;
  cursor: pointer; color: #fff;
  font-size: 18px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.15s;
}
.send:disabled { opacity: 0.45; cursor: default; }

.fab {
  position: relative;
  width: 56px; height: 56px;
  border-radius: 50%; border: none;
  cursor: pointer; color: #fff;
  font-size: 22px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.22);
  transition: transform 0.2s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.fab:hover { transform: scale(1.07); }
`;function it(t){const e=t.toLowerCase();return e.includes("human agent")||e.includes("connect you with")}function st({publicKey:t,config:e,apiUrl:n}){const _=e.position==="bottom-left"?"left":"right",i=e.primaryColor,[o,s]=$(!1),[a,c]=$([{role:"assistant",content:e.greeting}]),[l,d]=$(""),[r,u]=$(!1),[f,x]=$(()=>sessionStorage.getItem(`replyr-conv-${t}`)??void 0),[w,k]=$(()=>sessionStorage.getItem(`replyr-visitor-${t}`)??void 0),[h,p]=$(!1),[C,P]=$(!1),[N,Z]=$(""),[D,L]=$(""),[S,T]=$(!1),Ae=et(null);Ze(()=>{var y;(y=Ae.current)==null||y.scrollIntoView({behavior:"smooth"})},[a,h]);async function je(){const y=l.trim();if(!(!y||r)){d(""),u(!0),p(!1),c(H=>[...H,{role:"user",content:y},{role:"assistant",content:"",streaming:!0}]);try{const H=await fetch(`${n}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({publicKey:t,message:y,conversationId:f,visitorId:w})});if(!H.ok)throw new Error("failed");const M=H.headers.get("X-Conversation-Id"),fe=H.headers.get("X-Visitor-Id");M&&(x(M),sessionStorage.setItem(`replyr-conv-${t}`,M)),fe&&(k(fe),sessionStorage.setItem(`replyr-visitor-${t}`,fe));const at=H.body.getReader(),Oe=new TextDecoder;let A="";for(;;){const{done:de,value:j}=await at.read();if(de)break;A+=Oe.decode(j,{stream:!0});const ct=A;c(ft=>{const ue=[...ft];return ue[ue.length-1]={role:"assistant",content:ct,streaming:!0},ue})}A+=Oe.decode(),c(de=>{const j=[...de];return j[j.length-1]={role:"assistant",content:A,streaming:!1},j}),it(A)&&p(!0)}catch{c(H=>{const M=[...H];return M[M.length-1]={role:"assistant",content:"Sorry, something went wrong. Please try again.",streaming:!1},M})}finally{u(!1)}}}async function lt(y){if(y.preventDefault(),!(!N||!f)){T(!0);try{await fetch(`${n}/api/handoff`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({publicKey:t,conversationId:f,email:N,message:D})}),p(!1),P(!0)}catch{}finally{T(!1)}}}return g(z,{children:[g("style",{children:_t}),o&&g("div",{class:`panel ${_}`,children:[g("div",{class:"header",style:{background:i},children:[g("span",{class:"bot-name",children:e.botName}),g("button",{class:"close-btn",onClick:()=>s(!1),"aria-label":"Close chat",children:"✕"})]}),g("div",{class:"messages",children:[a.map((y,H)=>g("div",{class:`msg ${y.role}`,children:g("div",{class:"bbl",style:y.role==="user"?{background:i}:void 0,children:[y.content,y.streaming&&g("span",{class:"cursor"})]})},H)),g("div",{ref:Ae})]}),h&&!C&&g("form",{class:"handoff-card",onSubmit:lt,children:[g("p",{children:"Talk to a human?"}),g("input",{type:"email",placeholder:"Your email address",value:N,onInput:y=>Z(y.target.value),required:!0}),g("textarea",{placeholder:"Optional message…",value:D,onInput:y=>L(y.target.value)}),g("button",{type:"submit",class:"handoff-submit",style:{background:i},disabled:S,children:S?"Sending…":"Contact us"})]}),C&&g("div",{class:"handoff-done",children:"✓ Got it! We'll reach out to you shortly."}),g("div",{class:"input-bar",children:[g("input",{class:"txt",value:l,onInput:y=>d(y.target.value),onKeyDown:y=>y.key==="Enter"&&!y.shiftKey&&je(),placeholder:"Type a message…",disabled:r}),g("button",{class:"send",style:{background:i},onClick:je,disabled:r,"aria-label":"Send",children:"↑"})]})]}),g("button",{class:"fab",style:{background:i},onClick:()=>s(y=>!y),"aria-label":o?"Close chat":"Open chat",children:o?"✕":"💬"})]})}function Le(){const t=rt??document.querySelector("script[data-public-key]");if(!t){console.error("[Replyr] Could not find script tag with data-public-key");return}const e=t.dataset.publicKey;if(!e){console.error("[Replyr] Missing data-public-key attribute on Replyr script tag");return}const n=new URL(t.src).origin,_=document.createElement("div");_.id="replyr-widget-host",Object.assign(_.style,{position:"fixed",bottom:"20px",zIndex:"2147483647"}),document.body.appendChild(_);const i=_.attachShadow({mode:"open"}),o=document.createElement("div");i.appendChild(o),fetch(`${n}/api/widget-config?publicKey=${encodeURIComponent(e)}`).then(s=>s.ok?s.json():Promise.reject(new Error(`${s.status}`))).then(s=>{s.position==="bottom-left"?_.style.left="20px":_.style.right="20px",Xe(g(st,{publicKey:e,config:s,apiUrl:n}),o)}).catch(s=>console.error("[Replyr] Failed to load widget config:",s))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Le):Le()})();
