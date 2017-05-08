/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 * Although most of the following code is written from scratch, it is
 * heavily influenced by Q (https://github.com/kriskowal/q) and uses some of Q's spec.
 */
define(["require","exports","../Types","../Threading/deferImmediate","../Disposable/DisposableBase","../Exceptions/InvalidOperationException","../Exceptions/ArgumentException","../Exceptions/ArgumentNullException","../Disposable/ObjectPool","../Collections/Set","../Threading/defer","../Disposable/ObjectDisposedException","../../extends"],function(t,e,n,r,o,i,s,u,l,c,a,f,h){"use strict";function p(t){return n["default"].hasMemberOfType(t,D,n["default"].FUNCTION)}function d(t,e,n){var r=e?e(t):t;return r&&p(r)?C.wrap(r):n(r)}function w(t,e,n){try{var r=n?n(e):e;return t&&t.resolve(r),null}catch(o){return t&&t.reject(o),o}}function v(t,e,n,r){try{var o=r?r(n):n;t&&t(o)}catch(i){e&&e(i)}}function y(t,e,n){t instanceof A?t.doneNow(e,n):t.then(e,n)}function g(t,e,n){return t instanceof A?t.thenSynchronous(e,n):t.then(e,n)}function _(){return new f.ObjectDisposedException("Promise","An underlying promise-result was disposed.")}Object.defineProperty(e,"__esModule",{value:!0});var m=h["default"],b=void 0,j=null,I="Promise",S=I+"State",D="then",P="target",N=function(t){function e(e,n,r){var o=t.call(this)||this;return o._state=e,o._result=n,o._error=r,o._disposableObjectName=S,o}return m(e,t),e.prototype._onDispose=function(){this._state=b,this._result=b,this._error=b},e.prototype.getState=function(){return this._state},Object.defineProperty(e.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isPending",{get:function(){return this.getState()===C.State.Pending},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isSettled",{get:function(){return this.getState()!=C.State.Pending},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isFulfilled",{get:function(){return this.getState()===C.State.Fulfilled},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isRejected",{get:function(){return this.getState()===C.State.Rejected},enumerable:!0,configurable:!0}),e.prototype.getResult=function(){return this._result},Object.defineProperty(e.prototype,"result",{get:function(){return this.throwIfDisposed(),this.getResult()},enumerable:!0,configurable:!0}),e.prototype.getError=function(){return this._error},Object.defineProperty(e.prototype,"error",{get:function(){return this.throwIfDisposed(),this.getError()},enumerable:!0,configurable:!0}),e}(o.DisposableBase);e.PromiseState=N;var A=function(t){function e(){var e=t.call(this,C.State.Pending)||this;return e._disposableObjectName=I,e}return m(e,t),e.prototype.thenThis=function(t,e){return this.doneNow(t,e),this},e.prototype.then=function(t,e){var n=this;return this.throwIfDisposed(),new C(function(r,o){n.doneNow(function(e){return v(r,o,e,t)},function(t){return e?v(r,o,t,e):o(t)})})},e.prototype.thenAllowFatal=function(t,e){var n=this;return this.throwIfDisposed(),new C(function(r,o){n.doneNow(function(e){return r(t?t(e):e)},function(t){return o(e?e(t):t)})})},e.prototype.done=function(t,e){var n=this;a.defer(function(){return n.doneNow(t,e)})},e.prototype.delayFromNow=function(t){var e=this;return void 0===t&&(t=0),this.throwIfDisposed(),new C(function(n,r){a.defer(function(){e.doneNow(function(t){return n(t)},function(t){return r(t)})},t)},(!0))},e.prototype.delayAfterResolve=function(t){var e=this;return void 0===t&&(t=0),this.throwIfDisposed(),this.isSettled?this.delayFromNow(t):new C(function(n,r){e.doneNow(function(e){return a.defer(function(){return n(e)},t)},function(e){return a.defer(function(){return r(e)},t)})},(!0))},e.prototype["catch"]=function(t){return this.then(b,t)},e.prototype.catchAllowFatal=function(t){return this.thenAllowFatal(b,t)},e.prototype["finally"]=function(t){return this.then(t,t)},e.prototype.finallyAllowFatal=function(t){return this.thenAllowFatal(t,t)},e.prototype.finallyThis=function(t,e){var n=e?t:function(){return r.deferImmediate(t)};return this.doneNow(n,n),this},e}(N);e.PromiseBase=A;var E=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return m(e,t),e.prototype.doneNow=function(t,e){switch(this.throwIfDisposed(),this.state){case C.State.Fulfilled:t&&t(this._result);break;case C.State.Rejected:e&&e(this._error)}},e.prototype.thenSynchronous=function(t,e){this.throwIfDisposed();try{switch(this.state){case C.State.Fulfilled:return t?d(this._result,t,C.resolve):this;case C.State.Rejected:return e?d(this._error,e,C.resolve):this}}catch(n){return new O(n)}throw new Error("Invalid state for a resolved promise.")},e}(A);e.Resolvable=E;var x=function(t){function e(e,n,r){var o=t.call(this)||this;return o._result=n,o._error=r,o._state=e,o}return m(e,t),e}(E);e.Resolved=x;var F=function(t){function e(e){return t.call(this,C.State.Fulfilled,e)||this}return m(e,t),e}(x);e.Fulfilled=F;var O=function(t){function e(e){return t.call(this,C.State.Rejected,b,e)||this}return m(e,t),e}(x);e.Rejected=O;var R=function(t){function e(e){var n=t.call(this)||this;if(n._target=e,!e)throw new u.ArgumentNullException(P);if(!p(e))throw new s.ArgumentException(P,"Must be a promise-like object.");return e.then(function(t){n._state=C.State.Fulfilled,n._result=t,n._error=b,n._target=b},function(t){n._state=C.State.Rejected,n._error=t,n._target=b}),n}return m(e,t),e.prototype.thenSynchronous=function(e,n){this.throwIfDisposed();var r=this._target;return r?new C(function(t,o){y(r,function(n){return v(t,o,n,e)},function(e){return n?v(t,null,e,n):o(e)})},(!0)):t.prototype.thenSynchronous.call(this,e,n)},e.prototype.doneNow=function(e,n){this.throwIfDisposed();var r=this._target;r?y(r,e,n):t.prototype.doneNow.call(this,e,n)},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._target=b},e}(E),C=function(t){function e(e,n){void 0===n&&(n=!1);var r=t.call(this)||this;return e&&r.resolveUsing(e,n),r}return m(e,t),e.prototype.thenSynchronous=function(n,r){if(this.throwIfDisposed(),this._state)return t.prototype.thenSynchronous.call(this,n,r);var o=new e;return(this._waiting||(this._waiting=[])).push(M.PromiseCallbacks.init(n,r,o)),o},e.prototype.doneNow=function(e,n){return this.throwIfDisposed(),this._state?t.prototype.doneNow.call(this,e,n):void(this._waiting||(this._waiting=[])).push(M.PromiseCallbacks.init(e,n))},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._resolvedCalled=b},e.prototype.resolveUsing=function(t,n){var o=this;if(void 0===n&&(n=!1),!t)throw new u.ArgumentNullException("resolver");if(this._resolvedCalled)throw new i.InvalidOperationException(".resolve() already called.");if(this.state)throw new i.InvalidOperationException("Already resolved: "+e.State[this.state]);this._resolvedCalled=!0;var s=0,l=function(t){s?console.warn(s==-1?"Rejection called multiple times":"Rejection called after fulfilled."):(s=-1,o._resolvedCalled=!1,o.reject(t))},c=function(t){s?console.warn(1==s?"Fulfill called multiple times":"Fulfill called after rejection."):(s=1,o._resolvedCalled=!1,o.resolve(t))};n?t(c,l):r.deferImmediate(function(){return t(c,l)})},e.prototype._emitDisposalRejection=function(t){var e=t.wasDisposed;return e&&this._rejectInternal(_()),e},e.prototype._resolveInternal=function(t){var n=this;if(!this.wasDisposed){for(;t instanceof A;){var r=t;if(this._emitDisposalRejection(r))return;switch(r.state){case e.State.Pending:return void r.doneNow(function(t){return n._resolveInternal(t)},function(t){return n._rejectInternal(t)});case e.State.Rejected:return void this._rejectInternal(r.error);case e.State.Fulfilled:t=r.result}}if(p(t))t.then(function(t){return n._resolveInternal(t)},function(t){return n._rejectInternal(t)});else{this._state=e.State.Fulfilled,this._result=t,this._error=b;var o=this._waiting;if(o){this._waiting=b;for(var i=0,s=o;i<s.length;i++){var u=s[i],l=u.onFulfilled,c=u.promise;M.PromiseCallbacks.recycle(u),w(c,t,l)}o.length=0}}}},e.prototype._rejectInternal=function(t){if(!this.wasDisposed){this._state=e.State.Rejected,this._error=t;var n=this._waiting;if(n){this._waiting=null;for(var r=0,o=n;r<o.length;r++){var i=o[r],s=i.onRejected,u=i.promise;M.PromiseCallbacks.recycle(i),s?w(u,t,s):u&&u.reject(t)}n.length=0}}},e.prototype.resolve=function(t,n){if(void 0===n&&(n=!1),this.throwIfDisposed(),t==this)throw new i.InvalidOperationException("Cannot resolve a promise as itself.");if(this._state){if(!n||this._state==e.State.Fulfilled&&this._result===t)return;throw new i.InvalidOperationException("Changing the fulfilled state/value of a promise is not supported.")}if(this._resolvedCalled){if(n)throw new i.InvalidOperationException(".resolve() already called.")}else this._resolveInternal(t)},e.prototype.reject=function(t,n){if(void 0===n&&(n=!1),this.throwIfDisposed(),this._state){if(!n||this._state==e.State.Rejected&&this._error===t)return;throw new i.InvalidOperationException("Changing the rejected state/value of a promise is not supported.")}if(this._resolvedCalled){if(n)throw new i.InvalidOperationException(".resolve() already called.")}else this._rejectInternal(t)},e}(E);e.Promise=C;var k=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return m(e,t),e.prototype.map=function(t){var n=this;return this.throwIfDisposed(),new e(function(e){n.doneNow(function(n){return e(n.map(t))})},(!0))},e.prototype.reduce=function(t,e){return this.thenSynchronous(function(n){return n.reduce(t,e)})},e.fulfilled=function(t){return new e(function(e){return t},(!0))},e}(C);e.ArrayPromise=k;var T="PromiseCollection",B=function(t){function e(e){var n=t.call(this)||this;return n._disposableObjectName=T,n._source=e&&e.slice()||[],n}return m(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._source.length=0,this._source=null},Object.defineProperty(e.prototype,"promises",{get:function(){return this.throwIfDisposed(),this._source.slice()},enumerable:!0,configurable:!0}),e.prototype.all=function(){return this.throwIfDisposed(),C.all(this._source)},e.prototype.race=function(){return this.throwIfDisposed(),C.race(this._source)},e.prototype.waitAll=function(){return this.throwIfDisposed(),C.waitAll(this._source)},e.prototype.map=function(t){var e=this;return this.throwIfDisposed(),new k(function(n){e.all().doneNow(function(e){return n(e.map(t))})},(!0))},e.prototype.pipe=function(t){return this.throwIfDisposed(),new e(this._source.map(function(e){return g(e,t)}))},e.prototype.reduce=function(t,e){return this.throwIfDisposed(),C.wrap(this._source.reduce(function(e,n,r,o){return g(e,function(e){return g(n,function(n){return t(e,n,r,o)})})},p(e)?e:new F(e)))},e}(o.DisposableBase);e.PromiseCollection=B;var M;!function(t){
// 		if(c) getPool().add(c);
// 	}
//
// }
//
// export function recycle<T>(c:PromiseBase<T>):void
// {
// 	if(!c) return;
// 	if(c instanceof Promise && c.constructor==Promise) pending.recycle(c);
// 	else c.dispose();
// }
var e;!function(t){function e(){return i||(i=new l.ObjectPool(40,n,function(t){t.onFulfilled=j,t.onRejected=j,t.promise=j}))}function n(){return{onFulfilled:j,onRejected:j,promise:j}}function r(t,n,r){var o=e().take();return o.onFulfilled=t,o.onRejected=n,o.promise=r,o}function o(t){e().add(t)}var i;t.init=r,t.recycle=o}(e=t.PromiseCallbacks||(t.PromiseCallbacks={}))}(M||(M={})),function(t){function e(e){return new t(e)}function n(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(!t&&!e.length)throw new u.ArgumentNullException("promises");return new B((t instanceof Array?t:[t]).concat(e))}function r(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(!t&&!e.length)throw new u.ArgumentNullException("promises");var r=(t instanceof Array?t:[t]).concat(e);return!r.length||r.every(function(t){return!t})?new k(function(t){return t(r)},(!0)):new k(function(t,e){var n=[],o=r.length;n.length=o;for(var i=new c.Set(r.map(function(t,e){return e})),s=function(){e=b,t=b,r.length=0,r=b,i.dispose(),i=b},u=function(){var e=t;e&&!i.count&&(s(),e(n))},l=function(e,r){t&&(n[r]=e,i.remove(r),u())},a=function(t){var n=e;n&&(s(),n(t))},f=function(t){var e=r[t];e?e.then(function(e){return l(e,t)},a):i.remove(t),u()},h=0;i&&h<o;h++)f(h)})}function o(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(!t&&!e.length)throw new u.ArgumentNullException("promises");var r=(t instanceof Array?t:[t]).concat(e);return!r.length||r.every(function(t){return!t})?new k(function(t){return t(r)},(!0)):new k(function(t,e){for(var n=r.length,o=new c.Set(r.map(function(t,e){return e})),i=function(){e=j,t=j,o.dispose(),o=j},s=function(){var e=t;e&&!o.count&&(i(),e(r))},u=function(t){o&&(o.remove(t),s())},l=function(t){var e=r[t];e?e.then(function(e){return u(t)},function(e){return u(t)}):u(t)},a=0;o&&a<n;a++)l(a)})}function i(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var o=e&&(e instanceof Array?e:[e]).concat(n);if(!o||!o.length||!(o=o.filter(function(t){return null!=t})).length)throw new s.ArgumentException("Nothing to wait for.");var i=o.length;if(1==i)return w(o[0]);for(var u=0;u<i;u++){var l=o[u];if(l instanceof A&&l.isSettled)return l}return new t(function(t,e){for(var n=function(){e=j,t=j,o.length=0,o=j},r=function(t,e){t&&(n(),t(e))},i=function(e){return r(t,e)},s=function(t){return r(e,t)},u=0,l=o;u<l.length;u++){var c=l[u];if(!t)break;c.then(i,s)}})}function l(t){return p(t)?w(t):new F(t)}function a(e,n){return void 0===n&&(n=!1),new t(e,n)}function f(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(!t&&!e.length)throw new u.ArgumentNullException("resolutions");return new B((t instanceof Array?t:[t]).concat(e).map(function(t){return l(t)}))}function h(e,n){return new B(e.map(function(e){return new t(function(t,r){try{t(n(e))}catch(o){r(o)}})}))}function d(t){return new O(t)}function w(t){if(!t)throw new u.ArgumentNullException(P);return p(t)?t instanceof A?t:new R(t):new F(t)}function v(t){if(!t)throw new u.ArgumentNullException(D);return new R({then:t})}var y;!function(t){t[t.Pending=0]="Pending",t[t.Fulfilled=1]="Fulfilled",t[t.Rejected=-1]="Rejected"}(y=t.State||(t.State={})),Object.freeze(y),t.factory=e,t.group=n,t.all=r,t.waitAll=o,t.race=i,t.resolve=l,t.using=a,t.resolveAll=f,t.map=h,t.reject=d,t.wrap=w,t.createFrom=v}(C=e.Promise||(e.Promise={})),e.Promise=C,e["default"]=C});
//# sourceMappingURL=Promise.js.map