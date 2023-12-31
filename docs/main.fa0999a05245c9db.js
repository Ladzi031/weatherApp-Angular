(self.webpackChunkweatherApp_Angular =
  self.webpackChunkweatherApp_Angular || []).push([
  [179],
  {
    35: (Fo, as, Po) => {
      "use strict";
      function me(e) {
        return "function" == typeof e;
      }
      function k(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const _ = k(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function O(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class S {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (me(r))
              try {
                r();
              } catch (i) {
                t = i instanceof _ ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Lo(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof _ ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new _(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Lo(t);
            else {
              if (t instanceof S) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && O(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && O(n, t), t instanceof S && t._removeParent(this);
        }
      }
      S.EMPTY = (() => {
        const e = new S();
        return (e.closed = !0), e;
      })();
      const A = S.EMPTY;
      function B(e) {
        return (
          e instanceof S ||
          (e && "closed" in e && me(e.remove) && me(e.add) && me(e.unsubscribe))
        );
      }
      function Lo(e) {
        me(e) ? e() : e.unsubscribe();
      }
      const kt = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ot = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Ot;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Ot;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function bt(e) {
        Ot.setTimeout(() => {
          const { onUnhandledError: t } = kt;
          if (!t) throw e;
          t(e);
        });
      }
      function ct() {}
      const ls = Re("C", void 0, void 0);
      function Re(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Rt = null;
      function nt(e) {
        if (kt.useDeprecatedSynchronousErrorHandling) {
          const t = !Rt;
          if ((t && (Rt = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Rt;
            if (((Rt = null), n)) throw r;
          }
        } else e();
      }
      class rt extends S {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), B(t) && t.add(this))
              : (this.destination = Ml);
        }
        static create(t, n, r) {
          return new ne(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Vo(
                (function cs(e) {
                  return Re("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Vo(
                (function Dt(e) {
                  return Re("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Vo(ls, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const us = Function.prototype.bind;
      function cn(e, t) {
        return us.call(e, t);
      }
      class fr {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ue(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ue(r);
            }
          else Ue(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ue(n);
            }
        }
      }
      class ne extends rt {
        constructor(t, n, r) {
          let o;
          if ((super(), me(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && kt.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && cn(t.next, i),
                  error: t.error && cn(t.error, i),
                  complete: t.complete && cn(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new fr(o);
        }
      }
      function Ue(e) {
        kt.useDeprecatedSynchronousErrorHandling
          ? (function qn(e) {
              kt.useDeprecatedSynchronousErrorHandling &&
                Rt &&
                ((Rt.errorThrown = !0), (Rt.error = e));
            })(e)
          : bt(e);
      }
      function Vo(e, t) {
        const { onStoppedNotification: n } = kt;
        n && Ot.setTimeout(() => n(e, t));
      }
      const Ml = {
          closed: !0,
          next: ct,
          error: function Il(e) {
            throw e;
          },
          complete: ct,
        },
        jo =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Rr(e) {
        return e;
      }
      let Be = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function Nl(e) {
              return (
                (e && e instanceof rt) ||
                ((function ds(e) {
                  return e && me(e.next) && me(e.error) && me(e.complete);
                })(e) &&
                  B(e))
              );
            })(n)
              ? n
              : new ne(n, r, o);
            return (
              nt(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Ho(r))((o, i) => {
              const s = new ne({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [jo]() {
            return this;
          }
          pipe(...n) {
            return (function Bo(e) {
              return 0 === e.length
                ? Rr
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = Ho(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Ho(e) {
        var t;
        return null !== (t = e ?? kt.Promise) && void 0 !== t ? t : Promise;
      }
      const Al = k(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Mn = (() => {
        class e extends Be {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new pr(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Al();
          }
          next(n) {
            nt(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            nt(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            nt(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? A
              : ((this.currentObservers = null),
                i.push(n),
                new S(() => {
                  (this.currentObservers = null), O(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new Be();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new pr(t, n)), e;
      })();
      class pr extends Mn {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : A;
        }
      }
      function ut(e) {
        return (t) => {
          if (
            (function Tl(e) {
              return me(e?.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ut(e, t, n, r, o) {
        return new $o(e, t, n, r, o);
      }
      class $o extends rt {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function Sn(e, t) {
        return ut((n, r) => {
          let o = 0;
          n.subscribe(
            Ut(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function X(e) {
        return this instanceof X ? ((this.v = e), this) : new X(e);
      }
      function _t(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function F(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Go = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Wo(e) {
        return me(e?.then);
      }
      function qo(e) {
        return me(e[jo]);
      }
      function hs(e) {
        return Symbol.asyncIterator && me(e?.[Symbol.asyncIterator]);
      }
      function Xo(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const ms = (function Rl() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function gs(e) {
        return me(e?.[ms]);
      }
      function ys(e) {
        return (function Ne(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (p) {
                return new Promise(function (m, y) {
                  i.push([f, p, m, y]) > 1 || a(f, p);
                });
              });
          }
          function a(f, p) {
            try {
              !(function l(f) {
                f.value instanceof X
                  ? Promise.resolve(f.value.v).then(c, u)
                  : d(i[0][2], f);
              })(r[f](p));
            } catch (m) {
              d(i[0][3], m);
            }
          }
          function c(f) {
            a("next", f);
          }
          function u(f) {
            a("throw", f);
          }
          function d(f, p) {
            f(p), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield X(n.read());
              if (o) return yield X(void 0);
              yield yield X(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function vs(e) {
        return me(e?.getReader);
      }
      function ge(e) {
        if (e instanceof Be) return e;
        if (null != e) {
          if (qo(e))
            return (function Ct(e) {
              return new Be((t) => {
                const n = e[jo]();
                if (me(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Go(e))
            return (function mr(e) {
              return new Be((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Wo(e))
            return (function Fr(e) {
              return new Be((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, bt);
              });
            })(e);
          if (hs(e)) return Mf(e);
          if (gs(e))
            return (function Ab(e) {
              return new Be((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (vs(e))
            return (function Tb(e) {
              return Mf(ys(e));
            })(e);
        }
        throw Xo(e);
      }
      function Mf(e) {
        return new Be((t) => {
          (function kb(e, t) {
            var n, r, o, i;
            return (function Q(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(u) {
                  try {
                    c(r.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(r.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? i(u.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(u.value).then(a, l);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = _t(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Zn(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function ws(e, t, n = 1 / 0) {
        return me(t)
          ? ws((r, o) => Sn((i, s) => t(r, i, o, s))(ge(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            ut((r, o) =>
              (function Ob(e, t, n, r, o, i, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !c && t.complete();
                  },
                  p = (y) => (c < r ? m(y) : l.push(y)),
                  m = (y) => {
                    i && t.next(y), c++;
                    let b = !1;
                    ge(n(y, u++)).subscribe(
                      Ut(
                        t,
                        (C) => {
                          o?.(C), i ? p(C) : t.next(C);
                        },
                        () => {
                          b = !0;
                        },
                        void 0,
                        () => {
                          if (b)
                            try {
                              for (c--; l.length && c < r; ) {
                                const C = l.shift();
                                s ? Zn(t, s, () => m(C)) : m(C);
                              }
                              f();
                            } catch (C) {
                              t.error(C);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ut(t, p, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const Sf = new Be((e) => e.complete());
      function Fl(e) {
        return e[e.length - 1];
      }
      function Nf(e) {
        return (function Pb(e) {
          return e && me(e.schedule);
        })(Fl(e))
          ? e.pop()
          : void 0;
      }
      function Af(e, t = 0) {
        return ut((n, r) => {
          n.subscribe(
            Ut(
              r,
              (o) => Zn(r, e, () => r.next(o), t),
              () => Zn(r, e, () => r.complete(), t),
              (o) => Zn(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Tf(e, t = 0) {
        return ut((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function kf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Be((n) => {
          Zn(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Zn(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function bs(e, t) {
        return t
          ? (function zb(e, t) {
              if (null != e) {
                if (qo(e))
                  return (function jb(e, t) {
                    return ge(e).pipe(Tf(t), Af(t));
                  })(e, t);
                if (Go(e))
                  return (function Hb(e, t) {
                    return new Be((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Wo(e))
                  return (function Bb(e, t) {
                    return ge(e).pipe(Tf(t), Af(t));
                  })(e, t);
                if (hs(e)) return kf(e, t);
                if (gs(e))
                  return (function $b(e, t) {
                    return new Be((n) => {
                      let r;
                      return (
                        Zn(n, t, () => {
                          (r = e[ms]()),
                            Zn(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => me(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (vs(e))
                  return (function Ub(e, t) {
                    return kf(ys(e), t);
                  })(e, t);
              }
              throw Xo(e);
            })(e, t)
          : ge(e);
      }
      class Wb extends Mn {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Pl(...e) {
        return bs(e, Nf(e));
      }
      function Of(e = {}) {
        const {
          connector: t = () => new Mn(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            l,
            c = 0,
            u = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            p = () => {
              f(), (s = l = void 0), (u = d = !1);
            },
            m = () => {
              const y = s;
              p(), y?.unsubscribe();
            };
          return ut((y, b) => {
            c++, !d && !u && f();
            const C = (l = l ?? t());
            b.add(() => {
              c--, 0 === c && !d && !u && (a = Ll(m, o));
            }),
              C.subscribe(b),
              !s &&
                c > 0 &&
                ((s = new ne({
                  next: (w) => C.next(w),
                  error: (w) => {
                    (d = !0), f(), (a = Ll(p, n, w)), C.error(w);
                  },
                  complete: () => {
                    (u = !0), f(), (a = Ll(p, r)), C.complete();
                  },
                })),
                ge(y).subscribe(s));
          })(i);
        };
      }
      function Ll(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new ne({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return ge(t(...n)).subscribe(r);
      }
      function Rf(e, t) {
        return ut((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ut(
              r,
              (l) => {
                o?.unsubscribe();
                let c = 0;
                const u = i++;
                ge(e(l, u)).subscribe(
                  (o = Ut(
                    r,
                    (d) => r.next(t ? t(l, d, u, c++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Xb(e, t) {
        return e === t;
      }
      function pe(e) {
        for (let t in e) if (e[t] === pe) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Ds(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function ze(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ze).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Vl(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Zb = pe({ __forward_ref__: pe });
      function we(e) {
        return (
          (e.__forward_ref__ = we),
          (e.toString = function () {
            return ze(this());
          }),
          e
        );
      }
      function H(e) {
        return jl(e) ? e() : e;
      }
      function jl(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Zb) &&
          e.__forward_ref__ === we
        );
      }
      function Bl(e) {
        return e && !!e.ɵproviders;
      }
      const Ff = "https://g.co/ng/security#xss";
      class E extends Error {
        constructor(t, n) {
          super(
            (function _s(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function $(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Hl(e, t) {
        throw new E(-201, !1);
      }
      function zt(e, t) {
        null == e &&
          (function V(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function ae(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function dn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Cs(e) {
        return Pf(e, Es) || Pf(e, Lf);
      }
      function Pf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function xs(e) {
        return e && (e.hasOwnProperty($l) || e.hasOwnProperty(nD))
          ? e[$l]
          : null;
      }
      const Es = pe({ ɵprov: pe }),
        $l = pe({ ɵinj: pe }),
        Lf = pe({ ngInjectableDef: pe }),
        nD = pe({ ngInjectorDef: pe });
      var te = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(te || {});
      let Ul;
      function xt(e) {
        const t = Ul;
        return (Ul = e), t;
      }
      function jf(e, t, n) {
        const r = Cs(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & te.Optional
          ? null
          : void 0 !== t
          ? t
          : void Hl(ze(e));
      }
      const be = globalThis;
      class T {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = ae({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Zo = {},
        Xl = "__NG_DI_FLAG__",
        Is = "ngTempTokenPath",
        iD = /\n/gm,
        Hf = "__source";
      let Pr;
      function Yn(e) {
        const t = Pr;
        return (Pr = e), t;
      }
      function lD(e, t = te.Default) {
        if (void 0 === Pr) throw new E(-203, !1);
        return null === Pr
          ? jf(e, void 0, t)
          : Pr.get(e, t & te.Optional ? null : void 0, t);
      }
      function Y(e, t = te.Default) {
        return (
          (function Vf() {
            return Ul;
          })() || lD
        )(H(e), t);
      }
      function oe(e, t = te.Default) {
        return Y(e, Ms(t));
      }
      function Ms(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Zl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = H(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new E(900, !1);
            let o,
              i = te.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = cD(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(Y(o, i));
          } else t.push(Y(r));
        }
        return t;
      }
      function cD(e) {
        return e[Xl];
      }
      function An(e) {
        return { toString: e }.toString();
      }
      var Ss = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(Ss || {}),
        Yt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(Yt || {});
      const fn = {},
        le = [],
        Ns = pe({ ɵcmp: pe }),
        Yl = pe({ ɵdir: pe }),
        Ql = pe({ ɵpipe: pe }),
        Uf = pe({ ɵmod: pe }),
        Tn = pe({ ɵfac: pe }),
        Qo = pe({ __NG_ELEMENT_ID__: pe }),
        zf = pe({ __NG_ENV_ID__: pe });
      function Gf(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function Jl(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            qf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Wf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function qf(e) {
        return 64 === e.charCodeAt(0);
      }
      function Jo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Xf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Xf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const Zf = "ng-template";
      function fD(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Gf(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Yf(e) {
        return 4 === e.type && e.value !== Zf;
      }
      function pD(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Zf);
      }
      function hD(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function yD(e) {
            for (let t = 0; t < e.length; t++) if (Wf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !pD(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (Qt(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!fD(e.attrs, c, n)) {
                    if (Qt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = mD(8 & r ? "class" : l, o, Yf(e), n);
                if (-1 === d) {
                  if (Qt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const p = 8 & r ? f : null;
                  if ((p && -1 !== Gf(p, c, 0)) || (2 & r && c !== f)) {
                    if (Qt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Qt(r) && !Qt(l)) return !1;
            if (s && Qt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Qt(r) || s;
      }
      function Qt(e) {
        return 0 == (1 & e);
      }
      function mD(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function vD(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Qf(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (hD(e, t[r], n)) return !0;
        return !1;
      }
      function Jf(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function bD(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Qt(s) && ((t += Jf(i, o)), (o = "")),
              (r = s),
              (i = i || !Qt(r));
          n++;
        }
        return "" !== o && (t += Jf(i, o)), t;
      }
      function As(e) {
        return An(() => {
          const t = ep(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Ss.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || Yt.Emulated,
              styles: e.styles || le,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          tp(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Ts(r, !1)),
            (n.pipeDefs = Ts(r, !0)),
            (n.id = (function SD(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function xD(e) {
        return ie(e) || Qe(e);
      }
      function ED(e) {
        return null !== e;
      }
      function kn(e) {
        return An(() => ({
          type: e.type,
          bootstrap: e.bootstrap || le,
          declarations: e.declarations || le,
          imports: e.imports || le,
          exports: e.exports || le,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Kf(e, t) {
        if (null == e) return fn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function G(e) {
        return An(() => {
          const t = ep(e);
          return tp(t), t;
        });
      }
      function ie(e) {
        return e[Ns] || null;
      }
      function Qe(e) {
        return e[Yl] || null;
      }
      function dt(e) {
        return e[Ql] || null;
      }
      function ep(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || fn,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || le,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Kf(e.inputs, t),
          outputs: Kf(e.outputs),
        };
      }
      function tp(e) {
        e.features?.forEach((t) => t(e));
      }
      function Ts(e, t) {
        if (!e) return null;
        const n = t ? dt : xD;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(ED);
      }
      const Te = 0,
        M = 1,
        q = 2,
        Ie = 3,
        Jt = 4,
        ei = 5,
        ot = 6,
        Lr = 7,
        Pe = 8,
        Qn = 9,
        Vr = 10,
        U = 11,
        ti = 12,
        np = 13,
        jr = 14,
        Le = 15,
        ni = 16,
        Br = 17,
        pn = 18,
        ri = 19,
        rp = 20,
        Jn = 21,
        On = 22,
        oi = 23,
        ii = 24,
        K = 25,
        Kl = 1,
        op = 2,
        hn = 7,
        Hr = 9,
        Je = 11;
      function It(e) {
        return Array.isArray(e) && "object" == typeof e[Kl];
      }
      function ft(e) {
        return Array.isArray(e) && !0 === e[Kl];
      }
      function ec(e) {
        return 0 != (4 & e.flags);
      }
      function yr(e) {
        return e.componentOffset > -1;
      }
      function Os(e) {
        return 1 == (1 & e.flags);
      }
      function Kt(e) {
        return !!e.template;
      }
      function tc(e) {
        return 0 != (512 & e[q]);
      }
      function vr(e, t) {
        return e.hasOwnProperty(Tn) ? e[Tn] : null;
      }
      let Ke = null,
        Rs = !1;
      function Gt(e) {
        const t = Ke;
        return (Ke = e), t;
      }
      const ap = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function cp(e) {
        if (!ai(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !fp(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function dp(e) {
        (e.dirty = !0),
          (function up(e) {
            if (void 0 === e.liveConsumerNode) return;
            const t = Rs;
            Rs = !0;
            try {
              for (const n of e.liveConsumerNode) n.dirty || dp(n);
            } finally {
              Rs = t;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function rc(e) {
        return e && (e.nextProducerIndex = 0), Gt(e);
      }
      function oc(e, t) {
        if (
          (Gt(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (ai(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
              Fs(e.producerNode[n], e.producerIndexOfThis[n]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function fp(e) {
        $r(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (cp(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function pp(e) {
        if (($r(e), ai(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            Fs(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function Fs(e, t) {
        if (
          ((function mp(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          $r(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            Fs(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
          $r(o), (o.producerIndexOfThis[r] = t);
        }
      }
      function ai(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function $r(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let gp = null;
      const bp = () => {},
        HD = (() => ({
          ...ap,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: bp,
        }))();
      class $D {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Rn() {
        return Dp;
      }
      function Dp(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = zD), UD;
      }
      function UD() {
        const e = Cp(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === fn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function zD(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Cp(e) ||
            (function GD(e, t) {
              return (e[_p] = t);
            })(e, { previous: fn, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          l = a[o];
        (s[o] = new $D(l && l.currentValue, t, a === fn)), (e[r] = t);
      }
      Rn.ngInherit = !0;
      const _p = "__ngSimpleChanges__";
      function Cp(e) {
        return e[_p] || null;
      }
      const mn = function (e, t, n) {};
      function De(e) {
        for (; Array.isArray(e); ) e = e[Te];
        return e;
      }
      function Ps(e, t) {
        return De(t[e]);
      }
      function Mt(e, t) {
        return De(t[e.index]);
      }
      function Ip(e, t) {
        return e.data[t];
      }
      function jt(e, t) {
        const n = t[e];
        return It(n) ? n : n[Te];
      }
      function er(e, t) {
        return null == t ? null : e[t];
      }
      function Mp(e) {
        e[Br] = 0;
      }
      function QD(e) {
        1024 & e[q] || ((e[q] |= 1024), Np(e, 1));
      }
      function Sp(e) {
        1024 & e[q] && ((e[q] &= -1025), Np(e, -1));
      }
      function Np(e, t) {
        let n = e[Ie];
        if (null === n) return;
        n[ei] += t;
        let r = n;
        for (
          n = n[Ie];
          null !== n && ((1 === t && 1 === r[ei]) || (-1 === t && 0 === r[ei]));

        )
          (n[ei] += t), (r = n), (n = n[Ie]);
      }
      const j = {
        lFrame: Bp(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function kp() {
        return j.bindingsEnabled;
      }
      function D() {
        return j.lFrame.lView;
      }
      function se() {
        return j.lFrame.tView;
      }
      function et() {
        let e = Op();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Op() {
        return j.lFrame.currentTNode;
      }
      function gn(e, t) {
        const n = j.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function cc() {
        return j.lFrame.isParent;
      }
      function Gr() {
        return j.lFrame.bindingIndex++;
      }
      function d_(e, t) {
        const n = j.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), dc(t);
      }
      function dc(e) {
        j.lFrame.currentDirectiveIndex = e;
      }
      function pc(e) {
        j.lFrame.currentQueryIndex = e;
      }
      function p_(e) {
        const t = e[M];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[ot] : null;
      }
      function Vp(e, t, n) {
        if (n & te.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & te.Host ||
              ((o = p_(i)), null === o || ((i = i[jr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (j.lFrame = jp());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function hc(e) {
        const t = jp(),
          n = e[M];
        (j.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function jp() {
        const e = j.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Bp(e) : t;
      }
      function Bp(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Hp() {
        const e = j.lFrame;
        return (
          (j.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const $p = Hp;
      function mc() {
        const e = Hp();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function ht() {
        return j.lFrame.selectedIndex;
      }
      function wr(e) {
        j.lFrame.selectedIndex = e;
      }
      function Ae() {
        const e = j.lFrame;
        return Ip(e.tView, e.selectedIndex);
      }
      let zp = !0;
      function Ls() {
        return zp;
      }
      function tr(e) {
        zp = e;
      }
      function Vs(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            l && (e.viewHooks ??= []).push(-n, l),
            c &&
              ((e.viewHooks ??= []).push(n, c),
              (e.viewCheckHooks ??= []).push(n, c)),
            null != u && (e.destroyHooks ??= []).push(n, u);
        }
      }
      function js(e, t, n) {
        Gp(e, t, 3, n);
      }
      function Bs(e, t, n, r) {
        (3 & e[q]) === n && Gp(e, t, n, r);
      }
      function gc(e, t) {
        let n = e[q];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[q] = n));
      }
      function Gp(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[Br] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[Br] += 65536),
              (a < i || -1 == i) &&
                (D_(e, n, t, l), (e[Br] = (4294901760 & e[Br]) + l + 2)),
              l++;
      }
      function Wp(e, t) {
        mn(4, e, t);
        const n = Gt(null);
        try {
          t.call(e);
        } finally {
          Gt(n), mn(5, e, t);
        }
      }
      function D_(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[q] >> 13 < e[Br] >> 16 &&
            (3 & e[q]) === t &&
            ((e[q] += 8192), Wp(a, i))
          : Wp(a, i);
      }
      const Wr = -1;
      class ci {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function ui(e) {
        return 32767 & e;
      }
      function di(e, t) {
        let n = (function E_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[jr]), n--;
        return r;
      }
      let wc = !0;
      function Hs(e) {
        const t = wc;
        return (wc = e), t;
      }
      const qp = 255,
        Xp = 5;
      let I_ = 0;
      const yn = {};
      function $s(e, t) {
        const n = Zp(e, t);
        if (-1 !== n) return n;
        const r = t[M];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          bc(r.data, e),
          bc(t, null),
          bc(r.blueprint, null));
        const o = Us(e, t),
          i = e.injectorIndex;
        if (
          (function vc(e) {
            return e !== Wr;
          })(o)
        ) {
          const s = ui(o),
            a = di(o, t),
            l = a[M].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | l[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function bc(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Zp(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Us(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = nh(o)), null === r)) return Wr;
          if ((n++, (o = o[jr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Wr;
      }
      function Dc(e, t, n) {
        !(function M_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Qo) && (r = n[Qo]),
            null == r && (r = n[Qo] = I_++);
          const o = r & qp;
          t.data[e + (o >> Xp)] |= 1 << o;
        })(e, t, n);
      }
      function Yp(e, t, n) {
        if (n & te.Optional || void 0 !== e) return e;
        Hl();
      }
      function Qp(e, t, n, r) {
        if (
          (n & te.Optional && void 0 === r && (r = null),
          !(n & (te.Self | te.Host)))
        ) {
          const o = e[Qn],
            i = xt(void 0);
          try {
            return o ? o.get(t, r, n & te.Optional) : jf(t, r, n & te.Optional);
          } finally {
            xt(i);
          }
        }
        return Yp(r, 0, n);
      }
      function Jp(e, t, n, r = te.Default, o) {
        if (null !== e) {
          if (2048 & t[q] && !(r & te.Self)) {
            const s = (function O_(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[q] && !(512 & s[q]);

              ) {
                const a = Kp(i, s, n, r | te.Self, yn);
                if (a !== yn) return a;
                let l = i.parent;
                if (!l) {
                  const c = s[rp];
                  if (c) {
                    const u = c.get(n, yn, r);
                    if (u !== yn) return u;
                  }
                  (l = nh(s)), (s = s[jr]);
                }
                i = l;
              }
              return o;
            })(e, t, n, r, yn);
            if (s !== yn) return s;
          }
          const i = Kp(e, t, n, r, yn);
          if (i !== yn) return i;
        }
        return Qp(t, n, r, o);
      }
      function Kp(e, t, n, r, o) {
        const i = (function A_(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Qo) ? e[Qo] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & qp : k_) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Vp(t, e, r)) return r & te.Host ? Yp(o, 0, r) : Qp(t, n, r, o);
          try {
            let s;
            if (((s = i(r)), null != s || r & te.Optional)) return s;
            Hl();
          } finally {
            $p();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Zp(e, t),
            l = Wr,
            c = r & te.Host ? t[Le][ot] : null;
          for (
            (-1 === a || r & te.SkipSelf) &&
            ((l = -1 === a ? Us(e, t) : t[a + 8]),
            l !== Wr && th(r, !1)
              ? ((s = t[M]), (a = ui(l)), (t = di(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = t[M];
            if (eh(i, a, u.data)) {
              const d = N_(a, t, n, s, r, c);
              if (d !== yn) return d;
            }
            (l = t[a + 8]),
              l !== Wr && th(r, t[M].data[a + 8] === c) && eh(i, a, t)
                ? ((s = u), (a = ui(l)), (t = di(l, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function N_(e, t, n, r, o, i) {
        const s = t[M],
          a = s.data[e + 8],
          u = (function zs(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              u = i >> 20,
              f = o ? a + u : e.directiveEnd;
            for (let p = r ? a : a + u; p < f; p++) {
              const m = s[p];
              if ((p < l && n === m) || (p >= l && m.type === n)) return p;
            }
            if (o) {
              const p = s[l];
              if (p && Kt(p) && p.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? yr(a) && wc : r != s && 0 != (3 & a.type),
            o & te.Host && i === a
          );
        return null !== u ? br(t, s, u, a) : yn;
      }
      function br(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function __(e) {
            return e instanceof ci;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Yb(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new E(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function fe(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : $(e);
              })(i[n])
            );
          const a = Hs(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? xt(s.injectImpl) : null;
          Vp(e, r, te.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function b_(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Dp(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== c && xt(c), Hs(a), (s.resolving = !1), $p();
          }
        }
        return o;
      }
      function eh(e, t, n) {
        return !!(n[t + (e >> Xp)] & (1 << e));
      }
      function th(e, t) {
        return !(e & te.Self || (e & te.Host && t));
      }
      class mt {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Jp(this._tNode, this._lView, t, Ms(r), n);
        }
      }
      function k_() {
        return new mt(et(), D());
      }
      function it(e) {
        return An(() => {
          const t = e.prototype.constructor,
            n = t[Tn] || _c(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[Tn] || _c(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function _c(e) {
        return jl(e)
          ? () => {
              const t = _c(H(e));
              return t && t();
            }
          : vr(e);
      }
      function nh(e) {
        const t = e[M],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[ot] : null;
      }
      function Jr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Jr(n, t) : t(n)));
      }
      function Gs(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Bt(e, t, n) {
        let r = Kr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function B_(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Ec(e, t) {
        const n = Kr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Kr(e, t) {
        return (function ih(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      var nr = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(nr || {});
      const kc = new Map();
      let uC = 0;
      const Rc = "__ngContext__";
      function st(e, t) {
        It(t)
          ? ((e[Rc] = t[ri]),
            (function fC(e) {
              kc.set(e[ri], e);
            })(t))
          : (e[Rc] = t);
      }
      let Fc;
      function Pc(e, t) {
        return Fc(e, t);
      }
      function yi(e) {
        const t = e[Ie];
        return ft(t) ? t[Ie] : t;
      }
      function Eh(e) {
        return Mh(e[ti]);
      }
      function Ih(e) {
        return Mh(e[Jt]);
      }
      function Mh(e) {
        for (; null !== e && !ft(e); ) e = e[Jt];
        return e;
      }
      function no(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          ft(r) ? (i = r) : It(r) && ((s = !0), (r = r[Te]));
          const a = De(r);
          0 === e && null !== n
            ? null == o
              ? Th(t, n, a)
              : Dr(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Dr(t, n, a, o || null, !0)
            : 2 === e
            ? (function oa(e, t, n) {
                const r = (function na(e, t) {
                  return e.parentNode(t);
                })(e, t);
                r &&
                  (function TC(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function RC(e, t, n, r, o) {
                const i = n[hn];
                i !== De(n) && no(t, e, r, i, o);
                for (let a = Je; a < n.length; a++) {
                  const l = n[a];
                  wi(l[M], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function ea(e, t, n) {
        return e.createElement(t, n);
      }
      function Nh(e, t) {
        const n = e[Hr],
          r = n.indexOf(t);
        Sp(t), n.splice(r, 1);
      }
      function jc(e, t) {
        if (!(256 & t[q])) {
          (t[q] &= -129),
            (t[q] |= 256),
            (function AC(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ci)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        mn(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          mn(5, a, l);
                        }
                      }
                    else {
                      mn(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        mn(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function NC(e, t) {
              const n = e.cleanup,
                r = t[Lr];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[Lr] = null);
              const o = t[Jn];
              if (null !== o) {
                t[Jn] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[M].type && t[U].destroy();
          const n = t[ni];
          if (null !== n && ft(t[Ie])) {
            n !== t[Ie] && Nh(n, t);
            const r = t[pn];
            null !== r && r.detachView(e);
          }
          !(function pC(e) {
            kc.delete(e[ri]);
          })(t);
        }
      }
      function Bc(e, t, n) {
        return (function Ah(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Te];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === Yt.None || i === Yt.Emulated) return null;
            }
            return Mt(r, n);
          }
        })(e, t.parent, n);
      }
      function Dr(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Th(e, t, n) {
        e.appendChild(t, n);
      }
      function kh(e, t, n, r, o) {
        null !== r ? Dr(e, t, n, r, o) : Th(e, t, n);
      }
      let Hc,
        Gc,
        Fh = function Rh(e, t, n) {
          return 40 & e.type ? Mt(e, n) : null;
        };
      function ra(e, t, n, r) {
        const o = Bc(e, r, t),
          i = t[U],
          a = (function Oh(e, t, n) {
            return Fh(e, t, n);
          })(r.parent || t[ot], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) kh(i, o, n[l], a, !1);
          else kh(i, o, n, a, !1);
        void 0 !== Hc && Hc(i, r, t, n, o);
      }
      function Lh(e, t) {
        return null !== t ? e[Le][ot].projection[t.projection] : null;
      }
      function Uc(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && st(De(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) Uc(e, t, n.child, r, o, i, !1), no(t, e, o, a, i);
            else if (32 & l) {
              const c = Pc(n, r);
              let u;
              for (; (u = c()); ) no(t, e, o, u, i);
              no(t, e, o, a, i);
            } else 16 & l ? jh(e, t, r, n, o, i) : no(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function wi(e, t, n, r, o, i) {
        Uc(n, r, e.firstChild, t, o, i, !1);
      }
      function jh(e, t, n, r, o, i) {
        const s = n[Le],
          l = s[ot].projection[r.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) no(t, e, o, l[c], i);
        else {
          let c = l;
          const u = s[Ie];
          (function Qs(e) {
            return 128 == (128 & e.flags);
          })(r) && (c.flags |= 128),
            Uc(e, t, c, u, o, i, !0);
        }
      }
      function Bh(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Hh(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Jl(e, t, r),
          null !== o && Bh(e, t, o),
          null !== i &&
            (function PC(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class Gh {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ff})`;
        }
      }
      function rr(e) {
        return e instanceof Gh ? e.changingThisBreaksApplicationSecurity : e;
      }
      const YC = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var io = (function (e) {
        return (
          (e[(e.NONE = 0)] = "NONE"),
          (e[(e.HTML = 1)] = "HTML"),
          (e[(e.STYLE = 2)] = "STYLE"),
          (e[(e.SCRIPT = 3)] = "SCRIPT"),
          (e[(e.URL = 4)] = "URL"),
          (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          e
        );
      })(io || {});
      function la(e) {
        const t = (function _i() {
          const e = D();
          return e && e[Vr].sanitizer;
        })();
        return t
          ? t.sanitize(io.URL, e) || ""
          : (function bi(e, t) {
              const n = (function WC(e) {
                return (e instanceof Gh && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(`Required a safe ${t}, got a ${n} (see ${Ff})`);
              }
              return n === t;
            })(e, "URL")
          ? rr(e)
          : (function qc(e) {
              return (e = String(e)).match(YC) ? e : "unsafe:" + e;
            })($(e));
      }
      const ca = new T("ENVIRONMENT_INITIALIZER"),
        Kh = new T("INJECTOR", -1),
        em = new T("INJECTOR_DEF_TYPES");
      class Qc {
        get(t, n = Zo) {
          if (n === Zo) {
            const r = new Error(`NullInjectorError: No provider for ${ze(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function ux(...e) {
        return { ɵproviders: tm(0, e), ɵfromNgModule: !0 };
      }
      function tm(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const i = (s) => {
          n.push(s);
        };
        return (
          Jr(t, (s) => {
            const a = s;
            ua(a, i, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && nm(o, i),
          n
        );
      }
      function nm(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          Kc(o, (i) => {
            t(i, r);
          });
        }
      }
      function ua(e, t, n, r) {
        if (!(e = H(e))) return !1;
        let o = null,
          i = xs(e);
        const s = !i && ie(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = xs(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) ua(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                Jr(i.imports, (u) => {
                  ua(u, t, n, r) && ((c ||= []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && nm(c, t);
            }
            if (!a) {
              const c = vr(o) || (() => new o());
              t({ provide: o, useFactory: c, deps: le }, o),
                t({ provide: em, useValue: o, multi: !0 }, o),
                t({ provide: ca, useValue: () => Y(o), multi: !0 }, o);
            }
            const l = i.providers;
            if (null != l && !a) {
              const c = e;
              Kc(l, (u) => {
                t(u, c);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Kc(e, t) {
        for (let n of e)
          Bl(n) && (n = n.ɵproviders), Array.isArray(n) ? Kc(n, t) : t(n);
      }
      const dx = pe({ provide: String, useValue: pe });
      function eu(e) {
        return null !== e && "object" == typeof e && dx in e;
      }
      function _r(e) {
        return "function" == typeof e;
      }
      const tu = new T("Set Injector scope."),
        da = {},
        px = {};
      let nu;
      function fa() {
        return void 0 === nu && (nu = new Qc()), nu;
      }
      class vn {}
      class so extends vn {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            ou(t, (s) => this.processProvider(s)),
            this.records.set(Kh, ao(void 0, this)),
            o.has("environment") && this.records.set(vn, ao(void 0, this));
          const i = this.records.get(tu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(em.multi, le, te.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Yn(this),
            r = xt(void 0);
          try {
            return t();
          } finally {
            Yn(n), xt(r);
          }
        }
        get(t, n = Zo, r = te.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(zf)))
            return t[zf](this);
          r = Ms(r);
          const i = Yn(this),
            s = xt(void 0);
          try {
            if (!(r & te.SkipSelf)) {
              let l = this.records.get(t);
              if (void 0 === l) {
                const c =
                  (function vx(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof T)
                    );
                  })(t) && Cs(t);
                (l = c && this.injectableDefInScope(c) ? ao(ru(t), da) : null),
                  this.records.set(t, l);
              }
              if (null != l) return this.hydrate(t, l);
            }
            return (r & te.Self ? fa() : this.parent).get(
              t,
              (n = r & te.Optional && n === Zo ? null : n)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Is] = a[Is] || []).unshift(ze(t)), i)) throw a;
              return (function uD(e, t, n, r) {
                const o = e[Is];
                throw (
                  (t[Hf] && o.unshift(t[Hf]),
                  (e.message = (function dD(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = ze(t);
                    if (Array.isArray(t)) o = t.map(ze).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ze(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      iD,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Is] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            xt(s), Yn(i);
          }
        }
        resolveInjectorInitializers() {
          const t = Yn(this),
            n = xt(void 0);
          try {
            const o = this.get(ca.multi, le, te.Self);
            for (const i of o) i();
          } finally {
            Yn(t), xt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ze(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new E(205, !1);
        }
        processProvider(t) {
          let n = _r((t = H(t))) ? t : H(t && t.provide);
          const r = (function mx(e) {
            return eu(e) ? ao(void 0, e.useValue) : ao(im(e), da);
          })(t);
          if (_r(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = ao(void 0, da, !0)),
              (o.factory = () => Zl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === da && ((n.value = px), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function yx(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = H(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function ru(e) {
        const t = Cs(e),
          n = null !== t ? t.factory : vr(e);
        if (null !== n) return n;
        if (e instanceof T) throw new E(204, !1);
        if (e instanceof Function)
          return (function hx(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function hi(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new E(204, !1))
              );
            const n = (function tD(e) {
              return (e && (e[Es] || e[Lf])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new E(204, !1);
      }
      function im(e, t, n) {
        let r;
        if (_r(e)) {
          const o = H(e);
          return vr(o) || ru(o);
        }
        if (eu(e)) r = () => H(e.useValue);
        else if (
          (function om(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Zl(e.deps || []));
        else if (
          (function rm(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => Y(H(e.useExisting));
        else {
          const o = H(e && (e.useClass || e.provide));
          if (
            !(function gx(e) {
              return !!e.deps;
            })(e)
          )
            return vr(o) || ru(o);
          r = () => new o(...Zl(e.deps));
        }
        return r;
      }
      function ao(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function ou(e, t) {
        for (const n of e)
          Array.isArray(n) ? ou(n, t) : n && Bl(n) ? ou(n.ɵproviders, t) : t(n);
      }
      const pa = new T("AppId", { providedIn: "root", factory: () => wx }),
        wx = "ng",
        sm = new T("Platform Initializer"),
        Cr = new T("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        am = new T("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function oo() {
              if (void 0 !== Gc) return Gc;
              if (typeof document < "u") return document;
              throw new E(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let lm = (e, t, n) => null;
      function fu(e, t, n = !1) {
        return lm(e, t, n);
      }
      class Nx {}
      class dm {}
      class Tx {
        resolveComponentFactory(t) {
          throw (function Ax(e) {
            const t = Error(`No component factory found for ${ze(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let wa = (() => {
        class e {
          static #e = (this.NULL = new Tx());
        }
        return e;
      })();
      function kx() {
        return uo(et(), D());
      }
      function uo(e, t) {
        return new en(Mt(e, t));
      }
      let en = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
          static #e = (this.__NG_ELEMENT_ID__ = kx);
        }
        return e;
      })();
      class pm {}
      let xr = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function Rx() {
                const e = D(),
                  n = jt(et().index, e);
                return (It(n) ? n : e)[U];
              })());
          }
          return e;
        })(),
        Fx = (() => {
          class e {
            static #e = (this.ɵprov = ae({
              token: e,
              providedIn: "root",
              factory: () => null,
            }));
          }
          return e;
        })();
      class ba {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Px = new ba("16.2.12"),
        mu = {};
      function ym(e, t = null, n = null, r) {
        const o = vm(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function vm(e, t = null, n = null, r, o = new Set()) {
        const i = [n || le, ux(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ze(e))),
          new so(i, t || fa(), r || null, o)
        );
      }
      let tn = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = Zo);
          static #t = (this.NULL = new Qc());
          static create(n, r) {
            if (Array.isArray(n)) return ym({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return ym({ name: o }, n.parent, n.providers, o);
            }
          }
          static #n = (this.ɵprov = ae({
            token: e,
            providedIn: "any",
            factory: () => Y(Kh),
          }));
          static #r = (this.__NG_ELEMENT_ID__ = -1);
        }
        return e;
      })();
      function yu(e) {
        return e.ngOriginalError;
      }
      class Vn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && yu(t);
          for (; n && yu(n); ) n = yu(n);
          return n || null;
        }
      }
      function wu(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const tt = class Ux extends Mn {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = wu(i)), o && (o = wu(o)), s && (s = wu(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof S && t.add(a), a;
        }
      };
      function bm(...e) {}
      class ke {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new tt(!1)),
            (this.onMicrotaskEmpty = new tt(!1)),
            (this.onStable = new tt(!1)),
            (this.onError = new tt(!1)),
            typeof Zone > "u")
          )
            throw new E(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function zx() {
              const e = "function" == typeof be.requestAnimationFrame;
              let t = be[e ? "requestAnimationFrame" : "setTimeout"],
                n = be[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function qx(e) {
              const t = () => {
                !(function Wx(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(be, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Du(e),
                                (e.isCheckStableRunning = !0),
                                bu(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Du(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  if (
                    (function Zx(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return n.invokeTask(o, i, s, a);
                  try {
                    return Dm(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      _m(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return Dm(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), _m(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Du(e),
                          bu(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ke.isInAngularZone()) throw new E(909, !1);
        }
        static assertNotInAngularZone() {
          if (ke.isInAngularZone()) throw new E(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, Gx, bm, bm);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Gx = {};
      function bu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Du(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Dm(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function _m(e) {
        e._nesting--, bu(e);
      }
      class Xx {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new tt()),
            (this.onMicrotaskEmpty = new tt()),
            (this.onStable = new tt()),
            (this.onError = new tt());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Cm = new T("", { providedIn: "root", factory: xm });
      function xm() {
        const e = oe(ke);
        let t = !0;
        return (function Gb(...e) {
          const t = Nf(e),
            n = (function Vb(e, t) {
              return "number" == typeof Fl(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length
            ? 1 === r.length
              ? ge(r[0])
              : (function Rb(e = 1 / 0) {
                  return ws(Rr, e);
                })(n)(bs(r, t))
            : Sf;
        })(
          new Be((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new Be((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                ke.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              ke.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Of())
        );
      }
      let _u = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static #e = (this.ɵprov = ae({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function Ei(e) {
        for (; e; ) {
          e[q] |= 64;
          const t = yi(e);
          if (tc(e) && !t) return e;
          e = t;
        }
        return null;
      }
      const Nm = new T("", { providedIn: "root", factory: () => !1 });
      let _a = null;
      function Om(e, t) {
        return e[t] ?? Pm();
      }
      function Rm(e, t) {
        const n = Pm();
        n.producerNode?.length && ((e[t] = _a), (n.lView = e), (_a = Fm()));
      }
      const iE = {
        ...ap,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          Ei(e.lView);
        },
        lView: null,
      };
      function Fm() {
        return Object.create(iE);
      }
      function Pm() {
        return (_a ??= Fm()), _a;
      }
      const W = {};
      function nn(e) {
        Lm(se(), D(), ht() + e, !1);
      }
      function Lm(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[q])) {
            const i = e.preOrderCheckHooks;
            null !== i && js(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Bs(t, i, 0, n);
          }
        wr(n);
      }
      function x(e, t = te.Default) {
        const n = D();
        return null === n ? Y(e, t) : Jp(et(), n, H(e), t);
      }
      function Ca(e, t, n, r, o, i, s, a, l, c, u) {
        const d = t.blueprint.slice();
        return (
          (d[Te] = o),
          (d[q] = 140 | r),
          (null !== c || (e && 2048 & e[q])) && (d[q] |= 2048),
          Mp(d),
          (d[Ie] = d[jr] = e),
          (d[Pe] = n),
          (d[Vr] = s || (e && e[Vr])),
          (d[U] = a || (e && e[U])),
          (d[Qn] = l || (e && e[Qn]) || null),
          (d[ot] = i),
          (d[ri] = (function dC() {
            return uC++;
          })()),
          (d[On] = u),
          (d[rp] = c),
          (d[Le] = 2 == t.type ? e[Le] : d),
          d
        );
      }
      function ho(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Cu(e, t, n, r, o) {
            const i = Op(),
              s = cc(),
              l = (e.data[t] = (function hE(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function zr() {
                    return null !== j.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && ((i.next = l), (l.prev = i))),
              l
            );
          })(e, t, n, r, o)),
            (function u_() {
              return j.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function li() {
            const e = j.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return gn(i, !0), i;
      }
      function Ii(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Vm(e, t, n, r, o) {
        const i = Om(t, oi),
          s = ht(),
          a = 2 & r;
        try {
          wr(-1), a && t.length > K && Lm(e, t, K, !1), mn(a ? 2 : 0, o);
          const c = a ? i : null,
            u = rc(c);
          try {
            null !== c && (c.dirty = !1), n(r, o);
          } finally {
            oc(c, u);
          }
        } finally {
          a && null === t[oi] && Rm(t, oi), wr(s), mn(a ? 3 : 1, o);
        }
      }
      function xu(e, t, n) {
        if (ec(t)) {
          const r = Gt(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            Gt(r);
          }
        }
      }
      function jm(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Mu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Mu(e, t, n, r, o, i, s, a, l, c, u) {
        const d = K + r,
          f = d + o,
          p = (function lE(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : W);
            return n;
          })(d, f),
          m = "function" == typeof c ? c() : c;
        return (p[M] = {
          type: e,
          blueprint: p,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: p.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: m,
          incompleteFirstPass: !1,
          ssrId: u,
        });
      }
      let Bm = (e) => null;
      function Hm(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? $m(n, t, o, i)
              : r.hasOwnProperty(o) && $m(n, t, r[o], i);
          }
        return n;
      }
      function $m(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Ht(e, t, n, r, o, i, s, a) {
        const l = Mt(t, n);
        let u,
          c = t.inputs;
        !a && null != c && (u = c[r])
          ? (ku(e, n, u, r, o),
            yr(t) &&
              (function yE(e, t) {
                const n = jt(t, e);
                16 & n[q] || (n[q] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function gE(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(l, r, o));
      }
      function Um(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) Dc($s(n, t), e, r[c].type);
        !(function IE(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const u = r[c];
          u.providersResolver && u.providersResolver(u);
        }
        let s = !1,
          a = !1,
          l = Ii(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const u = r[c];
          (n.mergedAttrs = Jo(n.mergedAttrs, u.hostAttrs)),
            ME(e, n, t, l, u),
            EE(l, u, o),
            null !== u.contentQueries && (n.flags |= 4),
            (null !== u.hostBindings ||
              null !== u.hostAttrs ||
              0 !== u.hostVars) &&
              (n.flags |= 64);
          const d = u.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            l++;
        }
        !(function mE(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            c = null;
          for (let u = t.directiveStart; u < o; u++) {
            const d = i[u],
              f = n ? n.get(d) : null,
              m = f ? f.outputs : null;
            (l = Hm(d.inputs, u, l, f ? f.inputs : null)),
              (c = Hm(d.outputs, u, c, m));
            const y = null === l || null === s || Yf(t) ? null : AE(l, u, s);
            a.push(y);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = c);
        })(e, n, i);
      }
      function zm(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function f_() {
            return j.lFrame.currentDirectiveIndex;
          })();
        try {
          wr(i);
          for (let a = r; a < o; a++) {
            const l = e.data[a],
              c = t[a];
            dc(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                _E(l, c);
          }
        } finally {
          wr(-1), dc(s);
        }
      }
      function _E(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Nu(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function EE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Kt(t) && (n[""] = e);
        }
      }
      function ME(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = vr(o.type)),
          s = new ci(i, Kt(o), x);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function wE(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function bE(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Ii(e, n, o.hostVars, W), o);
      }
      function wn(e, t, n, r, o, i) {
        const s = Mt(e, t);
        !(function Au(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? $(i) : s(i, r || "", o);
            e.setAttribute(t, o, a, n);
          }
        })(t[U], s, i, e.value, n, r, o);
      }
      function NE(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Gm(r, n, s[a++], s[a++], s[a++]);
      }
      function Gm(e, t, n, r, o) {
        const i = Gt(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          Gt(i);
        }
      }
      function AE(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function qm(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              pc(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function xa(e, t) {
        return e[ti] ? (e[np][Jt] = t) : (e[ti] = t), (e[np] = t), t;
      }
      function Tu(e, t, n) {
        pc(0);
        const r = Gt(null);
        try {
          t(e, n);
        } finally {
          Gt(r);
        }
      }
      function Qm(e, t) {
        const n = e[Qn],
          r = n ? n.get(Vn, null) : null;
        r && r.handleError(t);
      }
      function ku(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          Gm(e.data[s], t[s], r, a, o);
        }
      }
      function TE(e, t) {
        const n = jt(t, e),
          r = n[M];
        !(function kE(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[Te];
        null !== o && null === n[On] && (n[On] = fu(o, n[Qn])), Ou(r, n, n[Pe]);
      }
      function Ou(e, t, n) {
        hc(t);
        try {
          const r = e.viewQuery;
          null !== r && Tu(1, r, n);
          const o = e.template;
          null !== o && Vm(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && qm(e, t),
            e.staticViewQueries && Tu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function OE(e, t) {
              for (let n = 0; n < t.length; n++) TE(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[q] &= -5), mc();
        }
      }
      let Jm = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, o) {
            const i = typeof Zone > "u" ? null : Zone.current,
              s = (function BD(e, t, n) {
                const r = Object.create(HD);
                n && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = t);
                const o = (s) => {
                  r.cleanupFn = s;
                };
                return (
                  (r.ref = {
                    notify: () => dp(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !fp(r))) return;
                      r.hasRun = !0;
                      const s = rc(r);
                      try {
                        r.cleanupFn(), (r.cleanupFn = bp), r.fn(o);
                      } finally {
                        oc(r, s);
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                );
              })(
                n,
                (c) => {
                  this.all.has(c) && this.queue.set(c, i);
                },
                o
              );
            let a;
            this.all.add(s), s.notify();
            const l = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(l)), { destroy: l };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static #e = (this.ɵprov = ae({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function Ea(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Vl(o, a))
              : 2 == i && (r = Vl(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Mi(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          null !== i && r.push(De(i)), ft(i) && Km(i, r);
          const s = n.type;
          if (8 & s) Mi(e, t, n.child, r);
          else if (32 & s) {
            const a = Pc(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Lh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = yi(t[Le]);
              Mi(l[M], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function Km(e, t) {
        for (let n = Je; n < e.length; n++) {
          const r = e[n],
            o = r[M].firstChild;
          null !== o && Mi(r[M], r, o, t);
        }
        e[hn] !== e[Te] && t.push(e[hn]);
      }
      function Ia(e, t, n, r = !0) {
        const o = t[Vr],
          i = o.rendererFactory,
          s = o.afterRenderEventManager;
        i.begin?.(), s?.begin();
        try {
          eg(e, t, e.template, n);
        } catch (l) {
          throw (r && Qm(t, l), l);
        } finally {
          i.end?.(), o.effectManager?.flush(), s?.end();
        }
      }
      function eg(e, t, n, r) {
        const o = t[q];
        if (256 != (256 & o)) {
          t[Vr].effectManager?.flush(), hc(t);
          try {
            Mp(t),
              (function Fp(e) {
                return (j.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Vm(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && js(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && Bs(t, c, 0, null), gc(t, 0);
            }
            if (
              ((function PE(e) {
                for (let t = Eh(e); null !== t; t = Ih(t)) {
                  if (!t[op]) continue;
                  const n = t[Hr];
                  for (let r = 0; r < n.length; r++) {
                    QD(n[r]);
                  }
                }
              })(t),
              tg(t, 2),
              null !== e.contentQueries && qm(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && js(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && Bs(t, c, 1), gc(t, 1);
            }
            !(function aE(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = Om(t, ii);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) wr(~i);
                  else {
                    const s = i,
                      a = n[++o],
                      l = n[++o];
                    d_(a, s), (r.dirty = !1);
                    const c = rc(r);
                    try {
                      l(2, t[s]);
                    } finally {
                      oc(r, c);
                    }
                  }
                }
              } finally {
                null === t[ii] && Rm(t, ii), wr(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && rg(t, a, 0);
            const l = e.viewQuery;
            if ((null !== l && Tu(2, l, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && js(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && Bs(t, c, 2), gc(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[q] &= -73),
              Sp(t);
          } finally {
            mc();
          }
        }
      }
      function tg(e, t) {
        for (let n = Eh(e); null !== n; n = Ih(n))
          for (let r = Je; r < n.length; r++) ng(n[r], t);
      }
      function LE(e, t, n) {
        ng(jt(t, e), n);
      }
      function ng(e, t) {
        if (
          !(function ZD(e) {
            return 128 == (128 & e[q]);
          })(e)
        )
          return;
        const n = e[M],
          r = e[q];
        if ((80 & r && 0 === t) || 1024 & r || 2 === t)
          eg(n, e, n.template, e[Pe]);
        else if (e[ei] > 0) {
          tg(e, 1);
          const o = n.components;
          null !== o && rg(e, o, 1);
        }
      }
      function rg(e, t, n) {
        for (let r = 0; r < t.length; r++) LE(e, t[r], n);
      }
      class Si {
        get rootNodes() {
          const t = this._lView,
            n = t[M];
          return Mi(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Pe];
        }
        set context(t) {
          this._lView[Pe] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[q]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[Ie];
            if (ft(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 &&
                ((function ta(e, t) {
                  if (e.length <= Je) return;
                  const n = Je + t,
                    r = e[n];
                  if (r) {
                    const o = r[ni];
                    null !== o && o !== e && Nh(o, r),
                      t > 0 && (e[n - 1][Jt] = r[Jt]);
                    const i = Gs(e, Je + t);
                    !(function CC(e, t) {
                      wi(e, t, t[U], 2, null, null),
                        (t[Te] = null),
                        (t[ot] = null);
                    })(r[M], r);
                    const s = i[pn];
                    null !== s && s.detachView(i[M]),
                      (r[Ie] = null),
                      (r[Jt] = null),
                      (r[q] &= -129);
                  }
                  return r;
                })(t, r),
                Gs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          !(function Vc(e, t) {
            if (!(256 & t[q])) {
              const n = t[U];
              t[oi] && pp(t[oi]),
                t[ii] && pp(t[ii]),
                n.destroyNode && wi(e, t, n, 3, null, null),
                (function IC(e) {
                  let t = e[ti];
                  if (!t) return jc(e[M], e);
                  for (; t; ) {
                    let n = null;
                    if (It(t)) n = t[ti];
                    else {
                      const r = t[Je];
                      r && (n = r);
                    }
                    if (!n) {
                      for (; t && !t[Jt] && t !== e; )
                        It(t) && jc(t[M], t), (t = t[Ie]);
                      null === t && (t = e),
                        It(t) && jc(t[M], t),
                        (n = t && t[Jt]);
                    }
                    t = n;
                  }
                })(t);
            }
          })(this._lView[M], this._lView);
        }
        onDestroy(t) {
          !(function Ap(e, t) {
            if (256 == (256 & e[q])) throw new E(911, !1);
            null === e[Jn] && (e[Jn] = []), e[Jn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          Ei(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[q] &= -129;
        }
        reattach() {
          this._lView[q] |= 128;
        }
        detectChanges() {
          Ia(this._lView[M], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new E(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function EC(e, t) {
              wi(e, t, t[U], 2, null, null);
            })(this._lView[M], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new E(902, !1);
          this._appRef = t;
        }
      }
      class VE extends Si {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Ia(t[M], t, t[Pe], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class og extends wa {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = ie(t);
          return new Ni(n, this.ngModule);
        }
      }
      function ig(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class BE {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Ms(r);
          const o = this.injector.get(t, mu, r);
          return o !== mu || n === mu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Ni extends dm {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = ig(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return ig(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function DD(e) {
              return e.map(bD).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof vn ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new BE(t, i) : t,
            a = s.get(pm, null);
          if (null === a) throw new E(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get(Fx, null),
              effectManager: s.get(Jm, null),
              afterRenderEventManager: s.get(_u, null),
            },
            f = a.createRenderer(null, this.componentDef),
            p = this.componentDef.selectors[0][0] || "div",
            m = r
              ? (function cE(e, t, n, r) {
                  const i = r.get(Nm, !1) || n === Yt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function uE(e) {
                      Bm(e);
                    })(s),
                    s
                  );
                })(f, r, this.componentDef.encapsulation, s)
              : ea(
                  f,
                  p,
                  (function jE(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(p)
                ),
            C = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let w = null;
          null !== m && (w = fu(m, s, !0));
          const N = Mu(0, null, null, 1, 0, null, null, null, null, null, null),
            P = Ca(null, N, null, C, null, null, d, f, s, null, w);
          let J, qe;
          hc(P);
          try {
            const In = this.componentDef;
            let Or,
              If = null;
            In.findHostDirectiveDefs
              ? ((Or = []),
                (If = new Map()),
                In.findHostDirectiveDefs(In, Or, If),
                Or.push(In))
              : (Or = [In]);
            const wR = (function $E(e, t) {
                const n = e[M],
                  r = K;
                return (e[r] = t), ho(n, r, 2, "#host", null);
              })(P, m),
              bR = (function UE(e, t, n, r, o, i, s) {
                const a = o[M];
                !(function zE(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Jo(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ea(t, t.mergedAttrs, !0), null !== n && Hh(r, n, t));
                })(r, e, t, s);
                let l = null;
                null !== t && (l = fu(t, o[Qn]));
                const c = i.rendererFactory.createRenderer(t, n);
                let u = 16;
                n.signals ? (u = 4096) : n.onPush && (u = 64);
                const d = Ca(
                  o,
                  jm(n),
                  null,
                  u,
                  o[e.index],
                  e,
                  i,
                  c,
                  null,
                  null,
                  l
                );
                return (
                  a.firstCreatePass && Nu(a, e, r.length - 1),
                  xa(o, d),
                  (o[e.index] = d)
                );
              })(wR, m, In, Or, P, d, f);
            (qe = Ip(N, K)),
              m &&
                (function WE(e, t, n, r) {
                  if (r) Jl(e, n, ["ng-version", Px.full]);
                  else {
                    const { attrs: o, classes: i } = (function _D(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!Qt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Jl(e, n, o),
                      i && i.length > 0 && Bh(e, n, i.join(" "));
                  }
                })(f, In, m, r),
              void 0 !== n &&
                (function qE(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(qe, this.ngContentSelectors, n),
              (J = (function GE(e, t, n, r, o, i) {
                const s = et(),
                  a = o[M],
                  l = Mt(s, o);
                Um(a, o, s, n, null, r);
                for (let u = 0; u < n.length; u++)
                  st(br(o, a, s.directiveStart + u, s), o);
                zm(a, o, s), l && st(l, o);
                const c = br(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[Pe] = o[Pe] = c), null !== i))
                  for (const u of i) u(c, t);
                return xu(a, s, e), c;
              })(bR, In, Or, If, P, [XE])),
              Ou(N, P, null);
          } finally {
            mc();
          }
          return new HE(this.componentType, J, uo(qe, P), P, qe);
        }
      }
      class HE extends Nx {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new VE(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            ku(i[M], i, o, t, n),
              this.previousInputValues.set(t, n),
              Ei(jt(this._tNode.index, i));
          }
        }
        get injector() {
          return new mt(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function XE() {
        const e = et();
        Vs(D()[M], e);
      }
      function he(e) {
        let t = (function sg(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (Kt(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new E(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Ma(e.inputs)),
                (s.inputTransforms = Ma(e.inputTransforms)),
                (s.declaredInputs = Ma(e.declaredInputs)),
                (s.outputs = Ma(e.outputs));
              const a = o.hostBindings;
              a && JE(e, a);
              const l = o.viewQuery,
                c = o.contentQueries;
              if (
                (l && YE(e, l),
                c && QE(e, c),
                Ds(e.inputs, o.inputs),
                Ds(e.declaredInputs, o.declaredInputs),
                Ds(e.outputs, o.outputs),
                null !== o.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  Ds(s.inputTransforms, o.inputTransforms)),
                Kt(o) && o.data.animation)
              ) {
                const u = e.data;
                u.animation = (u.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === he && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function ZE(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Jo(o.hostAttrs, (n = Jo(n, o.hostAttrs))));
          }
        })(r);
      }
      function Ma(e) {
        return e === fn ? {} : e === le ? [] : e;
      }
      function YE(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function QE(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function JE(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function at(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Hn(e, t, n, r) {
        const o = D();
        return at(o, Gr(), t) && (se(), wn(Ae(), o, e, t, n, r)), Hn;
      }
      function go(e, t, n, r) {
        return at(e, Gr(), n) ? t + $(n) + r : W;
      }
      function Bu(e, t, n) {
        const r = D();
        return at(r, Gr(), t) && Ht(se(), Ae(), r, e, t, r[U], n, !1), Bu;
      }
      function Hu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        ku(e, n, t.inputs[s], s, r);
      }
      function ye(e, t, n, r) {
        const o = D(),
          i = se(),
          s = K + e,
          a = o[U],
          l = i.firstCreatePass
            ? (function N1(e, t, n, r, o, i) {
                const s = t.consts,
                  l = ho(t, e, 2, r, er(s, o));
                return (
                  (function Su(e, t, n, r) {
                    if (kp()) {
                      const o = null === r ? null : { "": -1 },
                        i = (function CE(e, t) {
                          const n = e.directiveRegistry;
                          let r = null,
                            o = null;
                          if (n)
                            for (let i = 0; i < n.length; i++) {
                              const s = n[i];
                              if (Qf(t, s.selectors, !1))
                                if ((r || (r = []), Kt(s)))
                                  if (null !== s.findHostDirectiveDefs) {
                                    const a = [];
                                    (o = o || new Map()),
                                      s.findHostDirectiveDefs(s, a, o),
                                      r.unshift(...a, s),
                                      Nu(e, t, a.length);
                                  } else r.unshift(s), Nu(e, t, 0);
                                else
                                  (o = o || new Map()),
                                    s.findHostDirectiveDefs?.(s, r, o),
                                    r.push(s);
                            }
                          return null === r ? null : [r, o];
                        })(e, n);
                      let s, a;
                      null === i ? (s = a = null) : ([s, a] = i),
                        null !== s && Um(e, t, n, s, o, a),
                        o &&
                          (function xE(e, t, n) {
                            if (t) {
                              const r = (e.localNames = []);
                              for (let o = 0; o < t.length; o += 2) {
                                const i = n[t[o + 1]];
                                if (null == i) throw new E(-301, !1);
                                r.push(t[o], i);
                              }
                            }
                          })(n, r, o);
                    }
                    n.mergedAttrs = Jo(n.mergedAttrs, n.attrs);
                  })(t, n, l, er(s, i)),
                  null !== l.attrs && Ea(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ea(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          c = Eg(i, o, l, a, t, e);
        o[s] = c;
        const u = Os(l);
        return (
          gn(l, !0),
          Hh(a, c, l),
          32 != (32 & l.flags) && Ls() && ra(i, o, c, l),
          0 ===
            (function KD() {
              return j.lFrame.elementDepthCount;
            })() && st(c, o),
          (function e_() {
            j.lFrame.elementDepthCount++;
          })(),
          u &&
            ((function Eu(e, t, n) {
              kp() &&
                ((function DE(e, t, n, r) {
                  const o = n.directiveStart,
                    i = n.directiveEnd;
                  yr(n) &&
                    (function SE(e, t, n) {
                      const r = Mt(t, e),
                        o = jm(n);
                      let s = 16;
                      n.signals ? (s = 4096) : n.onPush && (s = 64);
                      const a = xa(
                        e,
                        Ca(
                          e,
                          o,
                          null,
                          s,
                          r,
                          t,
                          null,
                          e[Vr].rendererFactory.createRenderer(r, n),
                          null,
                          null,
                          null
                        )
                      );
                      e[t.index] = a;
                    })(t, n, e.data[o + n.componentOffset]),
                    e.firstCreatePass || $s(n, t),
                    st(r, t);
                  const s = n.initialInputs;
                  for (let a = o; a < i; a++) {
                    const l = e.data[a],
                      c = br(t, e, a, n);
                    st(c, t),
                      null !== s && NE(0, a - o, c, l, 0, s),
                      Kt(l) && (jt(n.index, t)[Pe] = br(t, e, a, n));
                  }
                })(e, t, n, Mt(n, t)),
                64 == (64 & n.flags) && zm(e, t, n));
            })(i, o, l),
            xu(i, l, o)),
          null !== r &&
            (function Iu(e, t, n = Mt) {
              const r = t.localNames;
              if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                  const s = r[i + 1],
                    a = -1 === s ? n(t, e) : e[s];
                  e[o++] = a;
                }
              }
            })(o, l),
          ye
        );
      }
      function Ve() {
        let e = et();
        cc()
          ? (function uc() {
              j.lFrame.isParent = !1;
            })()
          : ((e = e.parent), gn(e, !1));
        const t = e;
        (function n_(e) {
          return j.skipHydrationRootTNode === e;
        })(t) &&
          (function s_() {
            j.skipHydrationRootTNode = null;
          })(),
          (function t_() {
            j.lFrame.elementDepthCount--;
          })();
        const n = se();
        return (
          n.firstCreatePass && (Vs(n, e), ec(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function C_(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Hu(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function x_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Hu(n, t, D(), t.stylesWithoutHost, !1),
          Ve
        );
      }
      function Dn(e, t, n, r) {
        return ye(e, t, n, r), Ve(), Dn;
      }
      let Eg = (e, t, n, r, o, i) => (
        tr(!0),
        ea(
          r,
          o,
          (function Up() {
            return j.lFrame.currentNamespace;
          })()
        )
      );
      function Oa(e) {
        return !!e && "function" == typeof e.then;
      }
      function Sg(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function Nt(e, t, n, r) {
        const o = D(),
          i = se(),
          s = et();
        return (
          (function Ag(e, t, n, r, o, i, s) {
            const a = Os(r),
              c =
                e.firstCreatePass &&
                (function Zm(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              u = t[Pe],
              d = (function Xm(e) {
                return e[Lr] || (e[Lr] = []);
              })(t);
            let f = !0;
            if (3 & r.type || s) {
              const y = Mt(r, t),
                b = s ? s(y) : y,
                C = d.length,
                w = s ? (P) => s(De(P[r.index])) : r.index;
              let N = null;
              if (
                (!s &&
                  a &&
                  (N = (function P1(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[Lr],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== N)
              )
                ((N.__ngLastListenerFn__ || N).__ngNextListenerFn__ = i),
                  (N.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = kg(r, t, u, i, !1);
                const P = n.listen(b, o, i);
                d.push(i, P), c && c.push(o, w, C, C + 1);
              }
            } else i = kg(r, t, u, i, !1);
            const p = r.outputs;
            let m;
            if (f && null !== p && (m = p[o])) {
              const y = m.length;
              if (y)
                for (let b = 0; b < y; b += 2) {
                  const J = t[m[b]][m[b + 1]].subscribe(i),
                    qe = d.length;
                  d.push(i, J), c && c.push(o, r.index, qe, -(qe + 1));
                }
            }
          })(i, o, o[U], s, e, t, r),
          Nt
        );
      }
      function Tg(e, t, n, r) {
        try {
          return mn(6, t, n), !1 !== n(r);
        } catch (o) {
          return Qm(e, o), !1;
        } finally {
          mn(7, t, n);
        }
      }
      function kg(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Ei(e.componentOffset > -1 ? jt(e.index, t) : t);
          let l = Tg(t, n, r, s),
            c = i.__ngNextListenerFn__;
          for (; c; ) (l = Tg(t, n, c, s) && l), (c = c.__ngNextListenerFn__);
          return o && !1 === l && s.preventDefault(), l;
        };
      }
      function Ri(e, t, n) {
        return zu(e, "", t, "", n), Ri;
      }
      function zu(e, t, n, r, o) {
        const i = D(),
          s = go(i, t, n, r);
        return s !== W && Ht(se(), Ae(), i, e, s, i[U], o, !1), zu;
      }
      function Ra(e, t) {
        return (e << 17) | (t << 2);
      }
      function or(e) {
        return (e >> 17) & 32767;
      }
      function Gu(e) {
        return 2 | e;
      }
      function Ir(e) {
        return (131068 & e) >> 2;
      }
      function Wu(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function qu(e) {
        return 1 | e;
      }
      function Hg(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? or(i) : Ir(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = e[a + 1];
          W1(e[a], t) && ((l = !0), (e[a + 1] = r ? qu(u) : Gu(u))),
            (a = r ? or(u) : Ir(u));
        }
        l && (e[n + 1] = r ? Gu(i) : qu(i));
      }
      function W1(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Kr(e, t) >= 0)
        );
      }
      function Fi(e, t) {
        return (
          (function rn(e, t, n, r) {
            const o = D(),
              i = se(),
              s = (function Pn(e) {
                const t = j.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function Yg(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[ht()],
                    s = (function Zg(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function ey(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function tI(e, t, n, r) {
                      const o = (function fc(e) {
                        const t = j.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Pi((n = Xu(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = Xu(o, e, t, n, r)), null === i)) {
                            let l = (function nI(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== Ir(r)) return e[or(r)];
                            })(e, t, r);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = Xu(null, e, t, l[1], r)),
                              (l = Pi(l, t.attrs, r)),
                              (function rI(e, t, n, r) {
                                e[or(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, l));
                          } else
                            i = (function oI(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Pi(r, e[i].hostAttrs, n);
                              return Pi(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function z1(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = or(s),
                        l = Ir(s);
                      e[r] = n;
                      let u,
                        c = !1;
                      if (
                        (Array.isArray(n)
                          ? ((u = n[1]),
                            (null === u || Kr(n, u) > 0) && (c = !0))
                          : (u = n),
                        o)
                      )
                        if (0 !== l) {
                          const f = or(e[a + 1]);
                          (e[r + 1] = Ra(f, a)),
                            0 !== f && (e[f + 1] = Wu(e[f + 1], r)),
                            (e[a + 1] = (function $1(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Ra(a, 0)),
                            0 !== a && (e[a + 1] = Wu(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Ra(l, 0)),
                          0 === a ? (a = r) : (e[l + 1] = Wu(e[l + 1], r)),
                          (l = r);
                      c && (e[r + 1] = Gu(e[r + 1])),
                        Hg(e, u, r, !0),
                        Hg(e, u, r, !1),
                        (function G1(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            Kr(i, t) >= 0 &&
                            (n[r + 1] = qu(n[r + 1]));
                        })(t, u, e, r, i),
                        (s = Ra(a, l)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== W &&
                at(o, s, t) &&
                (function Jg(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const l = e.data,
                    c = l[a + 1],
                    u = (function U1(e) {
                      return 1 == (1 & e);
                    })(c)
                      ? Kg(l, t, n, o, Ir(c), s)
                      : void 0;
                  Fa(u) ||
                    (Fa(i) ||
                      ((function H1(e) {
                        return 2 == (2 & e);
                      })(c) &&
                        (i = Kg(l, null, n, o, a, s))),
                    (function FC(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : nr.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= nr.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, Ps(ht(), n), o, i));
                })(
                  i,
                  i.data[ht()],
                  o,
                  o[U],
                  e,
                  (o[s + 1] = (function lI(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = ze(rr(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Fi
        );
      }
      function Xu(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Pi(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Pi(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                Bt(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function Kg(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let f = n[o + 1];
          f === W && (f = d ? le : void 0);
          let p = d ? Ec(f, r) : u === r ? f : void 0;
          if ((c && !Fa(p) && (p = Ec(l, r)), Fa(p) && ((a = p), s))) return a;
          const m = e[o + 1];
          o = s ? or(m) : Ir(m);
        }
        if (null !== t) {
          let l = i ? t.residualClasses : t.residualStyles;
          null != l && (a = Ec(l, r));
        }
        return a;
      }
      function Fa(e) {
        return void 0 !== e;
      }
      function He(e, t = "") {
        const n = D(),
          r = se(),
          o = e + K,
          i = r.firstCreatePass ? ho(r, o, 1, t, null) : r.data[o],
          s = ty(r, n, i, t, e);
        (n[o] = s), Ls() && ra(r, n, s, i), gn(i, !1);
      }
      let ty = (e, t, n, r, o) => (
        tr(!0),
        (function Ks(e, t) {
          return e.createText(t);
        })(t[U], r)
      );
      function Li(e) {
        return Eo("", e, ""), Li;
      }
      function Eo(e, t, n) {
        const r = D(),
          o = go(r, e, t, n);
        return (
          o !== W &&
            (function Bn(e, t, n) {
              const r = Ps(t, e);
              !(function Sh(e, t, n) {
                e.setValue(t, n);
              })(e[U], r, n);
            })(r, ht(), o),
          Eo
        );
      }
      const Mo = "en-US";
      let Cy = Mo;
      function Qu(e, t, n, r, o) {
        if (((e = H(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) Qu(e[i], t, n, r, o);
        else {
          const i = se(),
            s = D(),
            a = et();
          let l = _r(e) ? e : H(e.provide);
          const c = im(e),
            u = 1048575 & a.providerIndexes,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
          if (_r(e) || !e.multi) {
            const p = new ci(c, o, x),
              m = Ku(l, t, o ? u : u + f, d);
            -1 === m
              ? (Dc($s(a, s), i, l),
                Ju(i, e, t.length),
                t.push(l),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                n.push(p),
                s.push(p))
              : ((n[m] = p), (s[m] = p));
          } else {
            const p = Ku(l, t, u + f, d),
              m = Ku(l, t, u, u + f),
              b = m >= 0 && n[m];
            if ((o && !b) || (!o && !(p >= 0 && n[p]))) {
              Dc($s(a, s), i, l);
              const C = (function NM(e, t, n, r, o) {
                const i = new ci(e, n, x);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Xy(i, o, r && !n),
                  i
                );
              })(o ? SM : MM, n.length, o, r, c);
              !o && b && (n[m].providerFactory = C),
                Ju(i, e, t.length, 0),
                t.push(l),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                n.push(C),
                s.push(C);
            } else Ju(i, e, p > -1 ? p : m, Xy(n[o ? m : p], c, !o && r));
            !o && r && b && n[m].componentProviders++;
          }
        }
      }
      function Ju(e, t, n, r) {
        const o = _r(t),
          i = (function fx(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const l = (i ? H(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const c = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const u = c.indexOf(n);
              -1 === u ? c.push(n, [r, l]) : c[u + 1].push(r, l);
            } else c.push(n, l);
          }
        }
      }
      function Xy(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Ku(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function MM(e, t, n, r) {
        return ed(this.multi, []);
      }
      function SM(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = br(n, n[M], this.providerFactory.index, r);
          (i = a.slice(0, s)), ed(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), ed(o, i);
        return i;
      }
      function ed(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function Me(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function IM(e, t, n) {
              const r = se();
              if (r.firstCreatePass) {
                const o = Kt(e);
                Qu(n, r.data, r.blueprint, o, !0),
                  Qu(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Sr {}
      class AM {}
      class td extends Sr {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new og(this));
          const o = (function Vt(e, t) {
            const n = e[Uf] || null;
            if (!n && !0 === t)
              throw new Error(
                `Type ${ze(e)} does not have '\u0275mod' property.`
              );
            return n;
          })(t);
          (this._bootstrapComponents = (function jn(e) {
            return e instanceof Function ? e() : e;
          })(o.bootstrap)),
            (this._r3Injector = vm(
              t,
              n,
              [
                { provide: Sr, useValue: this },
                { provide: wa, useValue: this.componentFactoryResolver },
                ...r,
              ],
              ze(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class nd extends AM {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new td(this.moduleType, t, []);
        }
      }
      Symbol;
      const eN = new T("Application Initializer");
      let md = (() => {
        class e {
          constructor() {
            (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((n, r) => {
                (this.resolve = n), (this.reject = r);
              })),
              (this.appInits = oe(eN, { optional: !0 }) ?? []);
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [];
            for (const o of this.appInits) {
              const i = o();
              if (Oa(i)) n.push(i);
              else if (Sg(i)) {
                const s = new Promise((a, l) => {
                  i.subscribe({ complete: a, error: l });
                });
                n.push(s);
              }
            }
            const r = () => {
              (this.done = !0), this.resolve();
            };
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = ae({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const Un = new T("LocaleId", {
        providedIn: "root",
        factory: () =>
          oe(Un, te.Optional | te.SkipSelf) ||
          (function nN() {
            return (typeof $localize < "u" && $localize.locale) || Mo;
          })(),
      });
      let gd = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new Wb(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = ae({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const $0 = new T(""),
        za = new T("");
      let Dd,
        wd = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Dd ||
                  ((function MN(e) {
                    Dd = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ke.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(Y(ke), Y(bd), Y(za));
            });
            static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        bd = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Dd?.findTestabilityInTree(this, n, r) ?? null;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = ae({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })(),
        ir = null;
      const U0 = new T("AllowMultipleToken"),
        _d = new T("PlatformDestroyListeners"),
        z0 = new T("appBootstrapListener");
      function q0(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new T(r);
        return (i = []) => {
          let s = Cd();
          if (!s || s.injector.get(U0, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function AN(e) {
                  if (ir && !ir.get(U0, !1)) throw new E(400, !1);
                  (function G0() {
                    !(function FD(e) {
                      gp = e;
                    })(() => {
                      throw new E(600, !1);
                    });
                  })(),
                    (ir = e);
                  const t = e.get(Z0);
                  (function W0(e) {
                    e.get(sm, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function X0(e = [], t) {
                    return tn.create({
                      name: t,
                      providers: [
                        { provide: tu, useValue: "platform" },
                        { provide: _d, useValue: new Set([() => (ir = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function kN(e) {
            const t = Cd();
            if (!t) throw new E(401, !1);
            return t;
          })();
        };
      }
      function Cd() {
        return ir?.get(Z0) ?? null;
      }
      let Z0 = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function ON(e = "zone.js", t) {
              return "noop" === e ? new Xx() : "zone.js" === e ? new ke(t) : e;
            })(
              r?.ngZone,
              (function Y0(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const i = (function kM(e, t, n) {
                  return new td(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function tv(e) {
                    return [
                      { provide: ke, useFactory: e },
                      {
                        provide: ca,
                        multi: !0,
                        useFactory: () => {
                          const t = oe(FN, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: ev, useFactory: RN },
                      { provide: Cm, useFactory: xm },
                    ];
                  })(() => o)
                ),
                s = i.injector.get(Vn, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (l) => {
                      s.handleError(l);
                    },
                  });
                  i.onDestroy(() => {
                    Ga(this._modules, i), a.unsubscribe();
                  });
                }),
                (function Q0(e, t, n) {
                  try {
                    const r = n();
                    return Oa(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, o, () => {
                  const a = i.injector.get(md);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function xy(e) {
                          zt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Cy = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(Un, Mo) || Mo),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = J0({}, r);
            return (function SN(e, t, n) {
              const r = new nd(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(qi);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new E(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new E(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(_d, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(tn));
          });
          static #t = (this.ɵprov = ae({
            token: e,
            factory: e.ɵfac,
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function J0(e, t) {
        return Array.isArray(t) ? t.reduce(J0, e) : { ...e, ...t };
      }
      let qi = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = oe(ev)),
              (this.zoneIsStable = oe(Cm)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = oe(gd).hasPendingTasks.pipe(
                Rf((n) => (n ? Pl(!1) : this.zoneIsStable)),
                (function qb(e, t = Rr) {
                  return (
                    (e = e ?? Xb),
                    ut((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        Ut(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                Of()
              )),
              (this._injector = oe(vn));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof dm;
            if (!this._injector.get(md).done)
              throw (
                (!o &&
                  (function Ko(e) {
                    const t = ie(e) || Qe(e) || dt(e);
                    return null !== t && t.standalone;
                  })(n),
                new E(405, !1))
              );
            let s;
            (s = o ? n : this._injector.get(wa).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function NN(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Sr),
              c = s.create(tn.NULL, [], r || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get($0, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  Ga(this.components, c),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new E(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Ga(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(z0, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Ga(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new E(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = ae({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Ga(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const ev = new T("", {
        providedIn: "root",
        factory: () => oe(Vn).handleError.bind(void 0),
      });
      function RN() {
        const e = oe(ke),
          t = oe(Vn);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let FN = (() => {
        class e {
          constructor() {
            (this.zone = oe(ke)), (this.applicationRef = oe(qi));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = ae({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      let rv = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = LN);
        }
        return e;
      })();
      function LN(e) {
        return (function VN(e, t, n) {
          if (yr(e) && !n) {
            const r = jt(e.index, t);
            return new Si(r, r);
          }
          return 47 & e.type ? new Si(t[Le], t) : null;
        })(et(), D(), 16 == (16 & e));
      }
      const QN = q0(null, "core", []);
      let JN = (() => {
        class e {
          constructor(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(qi));
          });
          static #t = (this.ɵmod = kn({ type: e }));
          static #n = (this.ɵinj = dn({}));
        }
        return e;
      })();
      function Nd(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let Ad = null;
      function Zi() {
        return Ad;
      }
      class dA {}
      const sr = new T("DocumentToken");
      function Sv(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      let MT = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = kn({ type: e }));
          static #n = (this.ɵinj = dn({}));
        }
        return e;
      })();
      function Pv(e) {
        return "server" === e;
      }
      class Lv {}
      class ek extends dA {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class qd extends ek {
        static makeCurrent() {
          !(function uA(e) {
            Ad || (Ad = e);
          })(new qd());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function tk() {
            return (
              (Ki = Ki || document.querySelector("base")),
              Ki ? Ki.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function nk(e) {
                (ll = ll || document.createElement("a")),
                  ll.setAttribute("href", e);
                const t = ll.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Ki = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return Sv(document.cookie, t);
        }
      }
      let ll,
        Ki = null,
        ok = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
          }
          return e;
        })();
      const Xd = new T("EventManagerPlugins");
      let $v = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new E(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(Xd), Y(ke));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Uv {
        constructor(t) {
          this._doc = t;
        }
      }
      const Zd = "ng-app-id";
      let zv = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = Pv(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${Zd}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(Zd), i;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(Zd, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r);
            n.appendChild(o);
            const i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(sr), Y(pa), Y(am, 8), Y(Cr));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Yd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Qd = /%COMP%/g,
        lk = new T("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function Wv(e, t) {
        return t.map((n) => n.replace(Qd, e));
      }
      let qv = (() => {
        class e {
          constructor(n, r, o, i, s, a, l, c = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = l),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = Pv(a)),
              (this.defaultRenderer = new Jd(n, s, l, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === Yt.ShadowDom &&
              (r = { ...r, encapsulation: Yt.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Zv
                ? o.applyToHost(n)
                : o instanceof Kd && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                l = this.eventManager,
                c = this.sharedStylesHost,
                u = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case Yt.Emulated:
                  i = new Zv(l, c, r, this.appId, u, s, a, d);
                  break;
                case Yt.ShadowDom:
                  return new fk(l, c, n, r, s, a, this.nonce, d);
                default:
                  i = new Kd(l, c, r, u, s, a, d);
              }
              o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              Y($v),
              Y(zv),
              Y(pa),
              Y(lk),
              Y(sr),
              Y(Cr),
              Y(ke),
              Y(am)
            );
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Jd {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(Yd[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (Xv(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Xv(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new E(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Yd[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Yd[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (nr.DashCase | nr.Important)
            ? t.style.setProperty(n, r, o & nr.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & nr.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Zi().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function Xv(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class fk extends Jd {
        constructor(t, n, r, o, i, s, a, l) {
          super(t, i, s, l),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = Wv(o.id, o.styles);
          for (const u of c) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = u),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Kd extends Jd {
        constructor(t, n, r, o, i, s, a, l) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = l ? Wv(l, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class Zv extends Kd {
        constructor(t, n, r, o, i, s, a, l) {
          const c = o + "-" + r.id;
          super(t, n, r, i, s, a, l, c),
            (this.contentAttr = (function ck(e) {
              return "_ngcontent-%COMP%".replace(Qd, e);
            })(c)),
            (this.hostAttr = (function uk(e) {
              return "_nghost-%COMP%".replace(Qd, e);
            })(c));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let pk = (() => {
        class e extends Uv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(sr));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Yv = ["alt", "control", "meta", "shift"],
        hk = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        mk = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let gk = (() => {
        class e extends Uv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Zi().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Yv.forEach((c) => {
                const u = r.indexOf(c);
                u > -1 && (r.splice(u, 1), (s += c + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let o = hk[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Yv.forEach((s) => {
                  s !== o && (0, mk[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(sr));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const bk = q0(QN, "browser", [
          { provide: Cr, useValue: "browser" },
          {
            provide: sm,
            useValue: function yk() {
              qd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: sr,
            useFactory: function wk() {
              return (
                (function BC(e) {
                  Gc = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Dk = new T(""),
        Kv = [
          {
            provide: za,
            useClass: class rk {
              addToWindow(t) {
                (be.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new E(5103, !1);
                  return i;
                }),
                  (be.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (be.getAllAngularRootElements = () => t.getAllRootElements()),
                  be.frameworkStabilizers || (be.frameworkStabilizers = []),
                  be.frameworkStabilizers.push((r) => {
                    const o = be.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach((l) => {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Zi().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: $0, useClass: wd, deps: [ke, bd, za] },
          { provide: wd, useClass: wd, deps: [ke, bd, za] },
        ],
        ew = [
          { provide: tu, useValue: "root" },
          {
            provide: Vn,
            useFactory: function vk() {
              return new Vn();
            },
            deps: [],
          },
          { provide: Xd, useClass: pk, multi: !0, deps: [sr, ke, Cr] },
          { provide: Xd, useClass: gk, multi: !0, deps: [sr] },
          qv,
          zv,
          $v,
          { provide: pm, useExisting: qv },
          { provide: Lv, useClass: ok, deps: [] },
          [],
        ];
      let _k = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [{ provide: pa, useValue: n.appId }],
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(Dk, 12));
          });
          static #t = (this.ɵmod = kn({ type: e }));
          static #n = (this.ɵinj = dn({
            providers: [...ew, ...Kv],
            imports: [MT, JN],
          }));
        }
        return e;
      })();
      function ow(e) {
        return ut((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      typeof window < "u" && window;
      class cl {}
      class ul {}
      class ln {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? "string" == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split("\n").forEach((n) => {
                        const r = n.indexOf(":");
                        if (r > 0) {
                          const o = n.slice(0, r),
                            i = o.toLowerCase(),
                            s = n.slice(r + 1).trim();
                          this.maybeSetNormalizedName(o, i),
                            this.headers.has(i)
                              ? this.headers.get(i).push(s)
                              : this.headers.set(i, [s]);
                        }
                      });
                  })
                : typeof Headers < "u" && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((n, r) => {
                    this.setHeaderEntries(r, n);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([n, r]) => {
                        this.setHeaderEntries(n, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof ln
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new ln();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof ln
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        setHeaderEntries(t, n) {
          const r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
            o = t.toLowerCase();
          this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class Tk {
        encodeKey(t) {
          return iw(t);
        }
        encodeValue(t) {
          return iw(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const Ok = /%(\d[a-f0-9])/gi,
        Rk = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function iw(e) {
        return encodeURIComponent(e).replace(Ok, (t, n) => Rk[n] ?? t);
      }
      function dl(e) {
        return `${e}`;
      }
      class Wn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new Tk()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function kk(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(dl) : [dl(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new Wn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(dl(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(dl(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class Fk {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function sw(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function aw(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function lw(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class es {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function Pk(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new ln()),
            this.context || (this.context = new Fk()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Wn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : sw(this.body) ||
              aw(this.body) ||
              lw(this.body) ||
              (function Lk(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Wn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || lw(this.body)
            ? null
            : aw(this.body)
            ? this.body.type || null
            : sw(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Wn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const u = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                c
              )),
            new es(n, r, i, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var To = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })(To || {});
      class tf {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new ln()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class nf extends tf {
        constructor(t = {}) {
          super(t), (this.type = To.ResponseHeader);
        }
        clone(t = {}) {
          return new nf({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class ko extends tf {
        constructor(t = {}) {
          super(t),
            (this.type = To.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new ko({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class cw extends tf {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function rf(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let uw = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof es) i = n;
            else {
              let l, c;
              (l = o.headers instanceof ln ? o.headers : new ln(o.headers)),
                o.params &&
                  (c =
                    o.params instanceof Wn
                      ? o.params
                      : new Wn({ fromObject: o.params })),
                (i = new es(n, r, void 0 !== o.body ? o.body : null, {
                  headers: l,
                  context: o.context,
                  params: c,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = Pl(i).pipe(
              (function Nk(e, t) {
                return me(t) ? ws(e, t, 1) : ws(e, 1);
              })((l) => this.handler.handle(l))
            );
            if (n instanceof es || "events" === o.observe) return s;
            const a = s.pipe(
              (function Ak(e, t) {
                return ut((n, r) => {
                  let o = 0;
                  n.subscribe(Ut(r, (i) => e.call(t, i, o++) && r.next(i)));
                });
              })((l) => l instanceof ko)
            );
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      Sn((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      Sn((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      Sn((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(Sn((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new Wn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, rf(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, rf(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, rf(o, r));
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(cl));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function pw(e, t) {
        return t(e);
      }
      function jk(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const Hk = new T(""),
        ts = new T(""),
        hw = new T("");
      function $k() {
        let e = null;
        return (t, n) => {
          null === e &&
            (e = (oe(Hk, { optional: !0 }) ?? []).reduceRight(jk, pw));
          const r = oe(gd),
            o = r.add();
          return e(t, n).pipe(ow(() => r.remove(o)));
        };
      }
      let mw = (() => {
        class e extends cl {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null),
              (this.pendingTasks = oe(gd));
          }
          handle(n) {
            if (null === this.chain) {
              const o = Array.from(
                new Set([
                  ...this.injector.get(ts),
                  ...this.injector.get(hw, []),
                ])
              );
              this.chain = o.reduceRight(
                (i, s) =>
                  (function Bk(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(i, s, this.injector),
                pw
              );
            }
            const r = this.pendingTasks.add();
            return this.chain(n, (o) => this.backend.handle(o)).pipe(
              ow(() => this.pendingTasks.remove(r))
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(ul), Y(vn));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Wk = /^\)\]\}',?\n/;
      let yw = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method) throw new E(-2800, !1);
            const r = this.xhrFactory;
            return (r.ɵloadImpl ? bs(r.ɵloadImpl()) : Pl(null)).pipe(
              Rf(
                () =>
                  new Be((i) => {
                    const s = r.build();
                    if (
                      (s.open(n.method, n.urlWithParams),
                      n.withCredentials && (s.withCredentials = !0),
                      n.headers.forEach((y, b) =>
                        s.setRequestHeader(y, b.join(","))
                      ),
                      n.headers.has("Accept") ||
                        s.setRequestHeader(
                          "Accept",
                          "application/json, text/plain, */*"
                        ),
                      !n.headers.has("Content-Type"))
                    ) {
                      const y = n.detectContentTypeHeader();
                      null !== y && s.setRequestHeader("Content-Type", y);
                    }
                    if (n.responseType) {
                      const y = n.responseType.toLowerCase();
                      s.responseType = "json" !== y ? y : "text";
                    }
                    const a = n.serializeBody();
                    let l = null;
                    const c = () => {
                        if (null !== l) return l;
                        const y = s.statusText || "OK",
                          b = new ln(s.getAllResponseHeaders()),
                          C =
                            (function qk(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(s) || n.url;
                        return (
                          (l = new nf({
                            headers: b,
                            status: s.status,
                            statusText: y,
                            url: C,
                          })),
                          l
                        );
                      },
                      u = () => {
                        let {
                            headers: y,
                            status: b,
                            statusText: C,
                            url: w,
                          } = c(),
                          N = null;
                        204 !== b &&
                          (N =
                            typeof s.response > "u"
                              ? s.responseText
                              : s.response),
                          0 === b && (b = N ? 200 : 0);
                        let P = b >= 200 && b < 300;
                        if ("json" === n.responseType && "string" == typeof N) {
                          const J = N;
                          N = N.replace(Wk, "");
                          try {
                            N = "" !== N ? JSON.parse(N) : null;
                          } catch (qe) {
                            (N = J),
                              P && ((P = !1), (N = { error: qe, text: N }));
                          }
                        }
                        P
                          ? (i.next(
                              new ko({
                                body: N,
                                headers: y,
                                status: b,
                                statusText: C,
                                url: w || void 0,
                              })
                            ),
                            i.complete())
                          : i.error(
                              new cw({
                                error: N,
                                headers: y,
                                status: b,
                                statusText: C,
                                url: w || void 0,
                              })
                            );
                      },
                      d = (y) => {
                        const { url: b } = c(),
                          C = new cw({
                            error: y,
                            status: s.status || 0,
                            statusText: s.statusText || "Unknown Error",
                            url: b || void 0,
                          });
                        i.error(C);
                      };
                    let f = !1;
                    const p = (y) => {
                        f || (i.next(c()), (f = !0));
                        let b = { type: To.DownloadProgress, loaded: y.loaded };
                        y.lengthComputable && (b.total = y.total),
                          "text" === n.responseType &&
                            s.responseText &&
                            (b.partialText = s.responseText),
                          i.next(b);
                      },
                      m = (y) => {
                        let b = { type: To.UploadProgress, loaded: y.loaded };
                        y.lengthComputable && (b.total = y.total), i.next(b);
                      };
                    return (
                      s.addEventListener("load", u),
                      s.addEventListener("error", d),
                      s.addEventListener("timeout", d),
                      s.addEventListener("abort", d),
                      n.reportProgress &&
                        (s.addEventListener("progress", p),
                        null !== a &&
                          s.upload &&
                          s.upload.addEventListener("progress", m)),
                      s.send(a),
                      i.next({ type: To.Sent }),
                      () => {
                        s.removeEventListener("error", d),
                          s.removeEventListener("abort", d),
                          s.removeEventListener("load", u),
                          s.removeEventListener("timeout", d),
                          n.reportProgress &&
                            (s.removeEventListener("progress", p),
                            null !== a &&
                              s.upload &&
                              s.upload.removeEventListener("progress", m)),
                          s.readyState !== s.DONE && s.abort();
                      }
                    );
                  })
              )
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(Lv));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const sf = new T("XSRF_ENABLED"),
        vw = new T("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        ww = new T("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class bw {}
      let Yk = (() => {
        class e {
          constructor(n, r, o) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = Sv(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(sr), Y(Cr), Y(vw));
          });
          static #t = (this.ɵprov = ae({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function Qk(e, t) {
        const n = e.url.toLowerCase();
        if (
          !oe(sf) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = oe(bw).getToken(),
          o = oe(ww);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var lr = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = "Interceptors"),
          (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
          (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
          (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
          (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
          (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
          (e[(e.Fetch = 6)] = "Fetch"),
          e
        );
      })(lr || {});
      function Jk(...e) {
        const t = [
          uw,
          yw,
          mw,
          { provide: cl, useExisting: mw },
          { provide: ul, useExisting: yw },
          { provide: ts, useValue: Qk, multi: !0 },
          { provide: sf, useValue: !0 },
          { provide: bw, useClass: Yk },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function Jc(e) {
          return { ɵproviders: e };
        })(t);
      }
      const Dw = new T("LEGACY_INTERCEPTOR_FN");
      function Kk() {
        return (function Ar(e, t) {
          return { ɵkind: e, ɵproviders: t };
        })(lr.LegacyInterceptors, [
          { provide: Dw, useFactory: $k },
          { provide: ts, useExisting: Dw, multi: !0 },
        ]);
      }
      let eO = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = kn({ type: e }));
          static #n = (this.ɵinj = dn({ providers: [Jk(Kk())] }));
        }
        return e;
      })();
      function _w(e) {
        return ut((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Ut(n, void 0, void 0, (s) => {
              (i = ge(e(s, _w(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      let af = (() => {
        class e {
          constructor(n) {
            (this.http = n), (this.nameOfCity = "pretoria");
          }
          setCityName(n) {
            this.nameOfCity = n.toLowerCase();
          }
          fetchWeatherData() {
            let n = new ln()
                .set("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com")
                .set(
                  "X-RapidAPI-Key",
                  "0947148510msh7ca3f876bfe6fd5p1b5d4bjsnee0754614690"
                ),
              r = new Wn().set("q", this.getNameOfCity());
            return this.http
              .get("https://weatherapi-com.p.rapidapi.com/current.json", {
                headers: n,
                params: r,
              })
              .pipe(_w(this.errorHandler));
          }
          errorHandler(n) {
            return (function sO(e, t) {
              const n = me(e) ? e : () => e,
                r = (o) => o.error(n());
              return new Be(t ? (o) => t.schedule(r, 0, o) : r);
            })(() => new Error(n.error));
          }
          getNameOfCity() {
            return this.nameOfCity;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(Y(uw));
          });
          static #t = (this.ɵprov = ae({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      var Cw = Po(1);
      const { isArray: lO } = Array,
        { getPrototypeOf: cO, prototype: uO, keys: dO } = Object;
      const { isArray: hO } = Array;
      function yO(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function vO(...e) {
        const t = (function Lb(e) {
            return me(Fl(e)) ? e.pop() : void 0;
          })(e),
          { args: n, keys: r } = (function fO(e) {
            if (1 === e.length) {
              const t = e[0];
              if (lO(t)) return { args: t, keys: null };
              if (
                (function pO(e) {
                  return e && "object" == typeof e && cO(e) === uO;
                })(t)
              ) {
                const n = dO(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e),
          o = new Be((i) => {
            const { length: s } = n;
            if (!s) return void i.complete();
            const a = new Array(s);
            let l = s,
              c = s;
            for (let u = 0; u < s; u++) {
              let d = !1;
              ge(n[u]).subscribe(
                Ut(
                  i,
                  (f) => {
                    d || ((d = !0), c--), (a[u] = f);
                  },
                  () => l--,
                  void 0,
                  () => {
                    (!l || !d) && (c || i.next(r ? yO(r, a) : a), i.complete());
                  }
                )
              );
            }
          });
        return t
          ? o.pipe(
              (function gO(e) {
                return Sn((t) =>
                  (function mO(e, t) {
                    return hO(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(t)
            )
          : o;
      }
      let xw = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(x(xr), x(en));
            });
            static #t = (this.ɵdir = G({ type: e }));
          }
          return e;
        })(),
        Tr = (() => {
          class e extends xw {
            static #e = (this.ɵfac = (function () {
              let n;
              return function (o) {
                return (n || (n = it(e)))(o || e);
              };
            })());
            static #t = (this.ɵdir = G({ type: e, features: [he] }));
          }
          return e;
        })();
      const En = new T("NgValueAccessor"),
        bO = { provide: En, useExisting: we(() => pl), multi: !0 },
        _O = new T("CompositionEventMode");
      let pl = (() => {
        class e extends xw {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function DO() {
                  const e = Zi() ? Zi().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(x(xr), x(en), x(_O, 8));
          });
          static #t = (this.ɵdir = G({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (r, o) {
              1 & r &&
                Nt("input", function (s) {
                  return o._handleInput(s.target.value);
                })("blur", function () {
                  return o.onTouched();
                })("compositionstart", function () {
                  return o._compositionStart();
                })("compositionend", function (s) {
                  return o._compositionEnd(s.target.value);
                });
            },
            features: [Me([bO]), he],
          }));
        }
        return e;
      })();
      const lt = new T("NgValidators"),
        ur = new T("NgAsyncValidators");
      function Nw(e) {
        return (function cr(e) {
          return (
            null == e ||
            (("string" == typeof e || Array.isArray(e)) && 0 === e.length)
          );
        })(e.value)
          ? { required: !0 }
          : null;
      }
      function hl(e) {
        return null;
      }
      function Fw(e) {
        return null != e;
      }
      function Pw(e) {
        return Oa(e) ? bs(e) : e;
      }
      function Lw(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function Vw(e, t) {
        return t.map((n) => n(e));
      }
      function jw(e) {
        return e.map((t) =>
          (function xO(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function lf(e) {
        return null != e
          ? (function Bw(e) {
              if (!e) return null;
              const t = e.filter(Fw);
              return 0 == t.length
                ? null
                : function (n) {
                    return Lw(Vw(n, t));
                  };
            })(jw(e))
          : null;
      }
      function cf(e) {
        return null != e
          ? (function Hw(e) {
              if (!e) return null;
              const t = e.filter(Fw);
              return 0 == t.length
                ? null
                : function (n) {
                    return vO(Vw(n, t).map(Pw)).pipe(Sn(Lw));
                  };
            })(jw(e))
          : null;
      }
      function $w(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function uf(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function ml(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function Gw(e, t) {
        const n = uf(t);
        return (
          uf(e).forEach((o) => {
            ml(n, o) || n.push(o);
          }),
          n
        );
      }
      function Ww(e, t) {
        return uf(t).filter((n) => !ml(e, n));
      }
      class qw {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = lf(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = cf(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class wt extends qw {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class dr extends qw {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Xw {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let Zw = (() => {
          class e extends Xw {
            constructor(n) {
              super(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(x(dr, 2));
            });
            static #t = (this.ɵdir = G({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (r, o) {
                2 & r &&
                  Fi("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
                    "ng-pristine",
                    o.isPristine
                  )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
                    "ng-invalid",
                    o.isInvalid
                  )("ng-pending", o.isPending);
              },
              features: [he],
            }));
          }
          return e;
        })(),
        Yw = (() => {
          class e extends Xw {
            constructor(n) {
              super(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(x(wt, 10));
            });
            static #t = (this.ɵdir = G({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (r, o) {
                2 & r &&
                  Fi("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
                    "ng-pristine",
                    o.isPristine
                  )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
                    "ng-invalid",
                    o.isInvalid
                  )("ng-pending", o.isPending)("ng-submitted", o.isSubmitted);
              },
              features: [he],
            }));
          }
          return e;
        })();
      const rs = "VALID",
        yl = "INVALID",
        Oo = "PENDING",
        os = "DISABLED";
      function pf(e) {
        return (vl(e) ? e.validators : e) || null;
      }
      function hf(e, t) {
        return (vl(t) ? t.asyncValidators : e) || null;
      }
      function vl(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class eb {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === rs;
        }
        get invalid() {
          return this.status === yl;
        }
        get pending() {
          return this.status == Oo;
        }
        get disabled() {
          return this.status === os;
        }
        get enabled() {
          return this.status !== os;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(Gw(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Gw(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(Ww(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(Ww(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return ml(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return ml(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Oo),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = os),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = rs),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === rs || this.status === Oo) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? os : rs;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Oo), (this._hasOwnPendingAsyncValidator = !0);
            const n = Pw(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new tt()), (this.statusChanges = new tt());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? os
            : this.errors
            ? yl
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Oo)
            ? Oo
            : this._anyControlsHaveStatus(yl)
            ? yl
            : rs;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          vl(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function SO(e) {
              return Array.isArray(e) ? lf(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function NO(e) {
              return Array.isArray(e) ? cf(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class mf extends eb {
        constructor(t, n, r) {
          super(pf(n), hf(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          (function Kw(e, t, n) {
            e._forEachChild((r, o) => {
              if (void 0 === n[o]) throw new E(1002, "");
            });
          })(this, 0, t),
            Object.keys(t).forEach((r) => {
              (function Jw(e, t, n) {
                const r = e.controls;
                if (!(t ? Object.keys(r) : r).length) throw new E(1e3, "");
                if (!r[n]) throw new E(1001, "");
              })(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t ? t[o] : null, { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      const Ro = new T("CallSetDisabledState", {
          providedIn: "root",
          factory: () => wl,
        }),
        wl = "always";
      function is(e, t, n = wl) {
        gf(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function kO(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && tb(e, t);
            });
          })(e, t),
          (function RO(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function OO(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && tb(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function TO(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function _l(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function gf(e, t) {
        const n = (function Uw(e) {
          return e._rawValidators;
        })(e);
        null !== t.validator
          ? e.setValidators($w(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = (function zw(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators($w(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        _l(t._rawValidators, o), _l(t._rawAsyncValidators, o);
      }
      function tb(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      const jO = { provide: wt, useExisting: we(() => xl) },
        ss = (() => Promise.resolve())();
      let xl = (() => {
        class e extends wt {
          constructor(n, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new tt()),
              (this.form = new mf({}, lf(n), cf(r)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            ss.then(() => {
              const r = this._findContainer(n.path);
              (n.control = r.registerControl(n.name, n.control)),
                is(n.control, n, this.callSetDisabledState),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            ss.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            ss.then(() => {
              const r = this._findContainer(n.path),
                o = new mf({});
              (function nb(e, t) {
                gf(e, t);
              })(o, n),
                r.registerControl(n.name, o),
                o.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            ss.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            ss.then(() => {
              this.form.get(n.path).setValue(r);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function rb(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n = void 0) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(x(lt, 10), x(ur, 10), x(Ro, 8));
          });
          static #t = (this.ɵdir = G({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (r, o) {
              1 & r &&
                Nt("submit", function (s) {
                  return o.onSubmit(s);
                })("reset", function () {
                  return o.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [Me([jO]), he],
          }));
        }
        return e;
      })();
      function ob(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function ib(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const sb = class extends eb {
          constructor(t = null, n, r) {
            super(pf(n), hf(r, n)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(n),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              vl(n) &&
                (n.nonNullable || n.initialValueIsDefault) &&
                (this.defaultValue = ib(t) ? t.value : t);
          }
          setValue(t, n = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== n.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== n.emitViewToModelChange)
                ),
              this.updateValueAndValidity(n);
          }
          patchValue(t, n = {}) {
            this.setValue(t, n);
          }
          reset(t = this.defaultValue, n = {}) {
            this._applyFormState(t),
              this.markAsPristine(n),
              this.markAsUntouched(n),
              this.setValue(this.value, n),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            ob(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            ob(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            ib(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        $O = { provide: dr, useExisting: we(() => bf) },
        cb = (() => Promise.resolve())();
      let bf = (() => {
          class e extends dr {
            constructor(n, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new sb()),
                (this._registered = !1),
                (this.name = ""),
                (this.update = new tt()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function wf(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === pl
                        ? (n = i)
                        : (function LO(e) {
                            return Object.getPrototypeOf(e.constructor) === Tr;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function vf(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              is(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              cb.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o = 0 !== r && Nd(r);
              cb.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function bl(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(
                x(wt, 9),
                x(lt, 10),
                x(ur, 10),
                x(En, 10),
                x(rv, 8),
                x(Ro, 8)
              );
            });
            static #t = (this.ɵdir = G({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [Me([$O]), he, Rn],
            }));
          }
          return e;
        })(),
        ub = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵdir = G({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            }));
          }
          return e;
        })(),
        fb = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = kn({ type: e }));
            static #n = (this.ɵinj = dn({}));
          }
          return e;
        })(),
        kr = (() => {
          class e {
            constructor() {
              this._validator = hl;
            }
            ngOnChanges(n) {
              if (this.inputName in n) {
                const r = this.normalizeInput(n[this.inputName].currentValue);
                (this._enabled = this.enabled(r)),
                  (this._validator = this._enabled
                    ? this.createValidator(r)
                    : hl),
                  this._onChange && this._onChange();
              }
            }
            validate(n) {
              return this._validator(n);
            }
            registerOnValidatorChange(n) {
              this._onChange = n;
            }
            enabled(n) {
              return null != n;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵdir = G({ type: e, features: [Rn] }));
          }
          return e;
        })();
      const sR = { provide: lt, useExisting: we(() => El), multi: !0 };
      let El = (() => {
          class e extends kr {
            constructor() {
              super(...arguments),
                (this.inputName = "required"),
                (this.normalizeInput = Nd),
                (this.createValidator = (n) => Nw);
            }
            enabled(n) {
              return n;
            }
            static #e = (this.ɵfac = (function () {
              let n;
              return function (o) {
                return (n || (n = it(e)))(o || e);
              };
            })());
            static #t = (this.ɵdir = G({
              type: e,
              selectors: [
                [
                  "",
                  "required",
                  "",
                  "formControlName",
                  "",
                  3,
                  "type",
                  "checkbox",
                ],
                ["", "required", "", "formControl", "", 3, "type", "checkbox"],
                ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
              ],
              hostVars: 1,
              hostBindings: function (r, o) {
                2 & r && Hn("required", o._enabled ? "" : null);
              },
              inputs: { required: "required" },
              features: [Me([sR]), he],
            }));
          }
          return e;
        })(),
        fR = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = kn({ type: e }));
            static #n = (this.ɵinj = dn({ imports: [fb] }));
          }
          return e;
        })(),
        hR = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ro, useValue: n.callSetDisabledState ?? wl },
                ],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = kn({ type: e }));
            static #n = (this.ɵinj = dn({ imports: [fR] }));
          }
          return e;
        })(),
        mR = (() => {
          class e {
            constructor() {
              (this.cityName = ""),
                (this.weatherService = oe(af)),
                (this.weatherInfo = new tt());
            }
            getWeather() {
              !(function aO(e) {
                return /^[^\d\s]*[^\d][^\d\s]*$/.test(e);
              })(this.cityName) || 0 === this.cityName.length
                ? Cw.Notify.failure("please double check the name of the city")
                : (this.weatherService.setCityName(this.cityName),
                  this.weatherService.fetchWeatherData().subscribe(
                    (n) => {
                      this.weatherInfo.emit(n);
                    },
                    (n) => {
                      Cw.Notify.failure("No matching location found.");
                    }
                  ));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = As({
              type: e,
              selectors: [["app-header"]],
              outputs: { weatherInfo: "weatherInfo" },
              decls: 17,
              vars: 3,
              consts: [
                [1, "navbar", "navbar-expand-lg", "navbar-light", "bg-light"],
                ["src", "./assets/images/dumbbell.png", "alt", "dumbbell pic"],
                ["href", "#", 1, "navbar-brand"],
                [1, "collapse", "navbar-collapse"],
                [1, "form-inline", "my-2", "my-lg-0", 3, "ngSubmit"],
                ["searchBar", "ngForm"],
                [
                  "type",
                  "text",
                  "placeholder",
                  "Search",
                  "aria-label",
                  "Search",
                  "name",
                  "cityName",
                  "required",
                  "",
                  1,
                  "form-control",
                  "mr-sm-2",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                ["inputText", "ngModel"],
                [1, "text-danger"],
              ],
              template: function (r, o) {
                if (
                  (1 & r &&
                    (ye(0, "header")(1, "nav", 0),
                    Dn(2, "img", 1),
                    ye(3, "a", 2)(4, "span"),
                    He(5, "P"),
                    Ve(),
                    He(6, "rac"),
                    ye(7, "span"),
                    He(8, "K"),
                    Ve(),
                    He(9, "tise_"),
                    Ve(),
                    ye(10, "div", 3)(11, "form", 4, 5),
                    Nt("ngSubmit", function () {
                      return o.getWeather();
                    }),
                    ye(13, "input", 6, 7),
                    Nt("ngModelChange", function (s) {
                      return (o.cityName = s);
                    }),
                    Ve(),
                    ye(15, "small", 8),
                    He(16, "Name is required "),
                    Ve()()()()()),
                  2 & r)
                ) {
                  const i = (function xg(e) {
                    return (function Ur(e, t) {
                      return e[t];
                    })(
                      (function c_() {
                        return j.lFrame.contextLView;
                      })(),
                      K + e
                    );
                  })(14);
                  nn(13),
                    Bu("ngModel", o.cityName),
                    nn(2),
                    Fi("d-none", i.valid || i.untouched);
                }
              },
              dependencies: [ub, pl, Zw, Yw, El, bf, xl],
              styles: [
                "span[_ngcontent-%COMP%]{padding-right:4px;padding-left:4px;color:#09ef09;background-color:#000;font-family:monospace;font-size:larger}header[_ngcontent-%COMP%]{padding:1% 1% 0%;font-family:monospace;font-family:cursive}nav[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:inline}img[_ngcontent-%COMP%]{width:50px;height:50px;border:50%;padding-right:4px}.text-white[_ngcontent-%COMP%]{color:#f5f5f5;font-family:cursive}#showMainInfo[_ngcontent-%COMP%]{font-family:cursive;font-size:larger;font-weight:800}",
              ],
            }));
          }
          return e;
        })(),
        gR = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = As({
              type: e,
              selectors: [["app-footer"]],
              decls: 13,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "py-2", "my-2"],
                [
                  1,
                  "nav",
                  "justify-content-center",
                  "border-bottom",
                  "pb-1",
                  "mb-1",
                ],
                [1, "text-center", "text-muted"],
                ["href", "#"],
              ],
              template: function (r, o) {
                1 & r &&
                  (ye(0, "div", 0)(1, "footer", 1),
                  Dn(2, "ul", 2),
                  ye(3, "p", 3),
                  He(4, " \xa9 2023 "),
                  ye(5, "a", 4)(6, "span"),
                  He(7, "P"),
                  Ve(),
                  He(8, "rac"),
                  ye(9, "span"),
                  He(10, "K"),
                  Ve(),
                  He(11, "tise_"),
                  Ve(),
                  He(12, ", Inc "),
                  Ve()()());
              },
              styles: [
                "span[_ngcontent-%COMP%]{padding-right:4px;padding-left:4px;color:#09ef09;background-color:#000;font-family:monospace;font-size:larger}a[_ngcontent-%COMP%]{text-decoration:none;color:#000}",
              ],
            }));
          }
          return e;
        })(),
        yR = (() => {
          class e {
            constructor(n) {
              (this.weatherService = n),
                (this.whiteText = !1),
                (this.loadImage = "./assets/images/coldWallpaper.jpg"),
                (this.altText = "cold weather image"),
                (this.renderImage = {
                  hot: "./assets/images/hotWallpaper.jpg",
                  cold: "./assets/images/coldWallpaper.jpg",
                });
            }
            ngOnInit() {
              this.weatherService.fetchWeatherData().subscribe({
                next: (n) => {
                  this.data = n;
                  let o = this.isHotWeather(n.current.temp_c);
                  this.displayImage(o);
                },
              });
            }
            displayInfo(n) {
              this.data = n;
              let o = this.isHotWeather(n.current.temp_c);
              this.displayImage(o);
            }
            isHotWeather(n) {
              return (this.whiteText = n > 15), n > 15;
            }
            displayImage(n) {
              this.loadImage = n ? this.renderImage.hot : this.renderImage.cold;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(x(af));
            });
            static #t = (this.ɵcmp = As({
              type: e,
              selectors: [["app-root"]],
              decls: 32,
              vars: 9,
              consts: [
                [3, "weatherInfo"],
                ["id", "top-container"],
                [3, "src", "alt"],
                ["id", "showMainInfo", 1, "text-white"],
                ["id", "bottom-container"],
                [1, "custom"],
                ["src", "./assets/images/humidity.png", "alt", "humidity pic"],
                ["src", "./assets/images/location.png", "alt", "location pic"],
                ["id", "image-from-api", "alt", "thermometer pic", 3, "src"],
                ["src", "./assets/images/wind.png", "alt", "wind pic"],
              ],
              template: function (r, o) {
                1 & r &&
                  (ye(0, "app-header", 0),
                  Nt("weatherInfo", function (s) {
                    return o.displayInfo(s);
                  }),
                  Ve(),
                  ye(1, "main")(2, "div")(3, "div", 1),
                  Dn(4, "img", 2),
                  ye(5, "div", 3)(6, "h2"),
                  He(7),
                  Ve(),
                  ye(8, "h4"),
                  He(9),
                  Ve()()()(),
                  ye(10, "div", 4)(11, "div", 5),
                  Dn(12, "img", 6),
                  ye(13, "small"),
                  He(14, "Humidity:"),
                  Ve(),
                  ye(15, "p"),
                  He(16),
                  Ve()(),
                  ye(17, "div", 5),
                  Dn(18, "img", 7),
                  ye(19, "p"),
                  He(20),
                  Ve()(),
                  ye(21, "div", 5),
                  Dn(22, "img", 8),
                  ye(23, "p"),
                  He(24),
                  Ve()(),
                  ye(25, "div", 5),
                  Dn(26, "img", 9),
                  ye(27, "small"),
                  He(28, "Wind speed:"),
                  Ve(),
                  ye(29, "p"),
                  He(30),
                  Ve()()()(),
                  Dn(31, "app-footer")),
                  2 & r &&
                    (nn(4),
                    Ri("src", o.loadImage, la),
                    Ri("alt", o.altText),
                    nn(3),
                    Li(o.data.location.name),
                    nn(2),
                    Eo("", o.data.current.temp_c, " \xb0C"),
                    nn(7),
                    Eo("", o.data.current.humidity, " %"),
                    nn(4),
                    Li(o.data.location.tz_id),
                    nn(2),
                    Ri("src", o.data.current.condition.icon, la),
                    nn(2),
                    Li(o.data.current.condition.text),
                    nn(6),
                    Eo("", o.data.current.wind_kph, " km/h"));
              },
              dependencies: [mR, gR],
              styles: [
                "main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}main[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:55vh}#showMainInfo[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#top-container[_ngcontent-%COMP%]{position:relative;text-align:center}#top-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;border-top-right-radius:10%;border-top-left-radius:10%}img[_ngcontent-%COMP%]{width:25%}#bottom-container[_ngcontent-%COMP%]{padding-top:3%;background-color:#fff;display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;font-family:cursive}#bottom-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:35%;height:-moz-fit-content;height:fit-content}.custom[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-wrap:wrap;justify-content:space-evenly}#image-from-api[_ngcontent-%COMP%]{width:30%}",
              ],
            }));
          }
          return e;
        })(),
        vR = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = kn({ type: e, bootstrap: [yR] }));
            static #n = (this.ɵinj = dn({
              providers: [af],
              imports: [_k, hR, eO],
            }));
          }
          return e;
        })();
      bk()
        .bootstrapModule(vR)
        .catch((e) => console.error(e));
    },
    1: function (Fo, as) {
      var me, k;
      (k =
        typeof global > "u" ? (typeof window > "u" ? this : window) : global),
        (me = function () {
          return (function (k) {
            "use strict";
            if (typeof k > "u" && typeof k.document > "u") return !1;
            var _,
              O,
              S,
              A,
              B,
              Lo =
                "\n\nVisit documentation page to learn more: https://notiflix.github.io/documentation",
              kt =
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
              Ot_Success = "Success",
              Ot_Failure = "Failure",
              Ot_Warning = "Warning",
              Ot_Info = "Info",
              bt = {
                wrapID: "NotiflixNotifyWrap",
                overlayID: "NotiflixNotifyOverlay",
                width: "280px",
                position: "right-top",
                distance: "10px",
                opacity: 1,
                borderRadius: "5px",
                rtl: !1,
                timeout: 3e3,
                messageMaxLength: 110,
                backOverlay: !1,
                backOverlayColor: "rgba(0,0,0,0.5)",
                plainText: !0,
                showOnlyTheLastOne: !1,
                clickToClose: !1,
                pauseOnHover: !0,
                ID: "NotiflixNotify",
                className: "notiflix-notify",
                zindex: 4001,
                fontFamily: "Quicksand",
                fontSize: "13px",
                cssAnimation: !0,
                cssAnimationDuration: 400,
                cssAnimationStyle: "fade",
                closeButton: !1,
                useIcon: !0,
                useFontAwesome: !1,
                fontAwesomeIconStyle: "basic",
                fontAwesomeIconSize: "34px",
                success: {
                  background: "#32c682",
                  textColor: "#fff",
                  childClassName: "notiflix-notify-success",
                  notiflixIconColor: "rgba(0,0,0,0.2)",
                  fontAwesomeClassName: "fas fa-check-circle",
                  fontAwesomeIconColor: "rgba(0,0,0,0.2)",
                  backOverlayColor: "rgba(50,198,130,0.2)",
                },
                failure: {
                  background: "#ff5549",
                  textColor: "#fff",
                  childClassName: "notiflix-notify-failure",
                  notiflixIconColor: "rgba(0,0,0,0.2)",
                  fontAwesomeClassName: "fas fa-times-circle",
                  fontAwesomeIconColor: "rgba(0,0,0,0.2)",
                  backOverlayColor: "rgba(255,85,73,0.2)",
                },
                warning: {
                  background: "#eebf31",
                  textColor: "#fff",
                  childClassName: "notiflix-notify-warning",
                  notiflixIconColor: "rgba(0,0,0,0.2)",
                  fontAwesomeClassName: "fas fa-exclamation-circle",
                  fontAwesomeIconColor: "rgba(0,0,0,0.2)",
                  backOverlayColor: "rgba(238,191,49,0.2)",
                },
                info: {
                  background: "#26c0d3",
                  textColor: "#fff",
                  childClassName: "notiflix-notify-info",
                  notiflixIconColor: "rgba(0,0,0,0.2)",
                  fontAwesomeClassName: "fas fa-info-circle",
                  fontAwesomeIconColor: "rgba(0,0,0,0.2)",
                  backOverlayColor: "rgba(38,192,211,0.2)",
                },
              },
              ct_Success = "Success",
              ct_Failure = "Failure",
              ct_Warning = "Warning",
              ct_Info = "Info",
              ls = {
                ID: "NotiflixReportWrap",
                className: "notiflix-report",
                width: "320px",
                backgroundColor: "#f8f8f8",
                borderRadius: "25px",
                rtl: !1,
                zindex: 4002,
                backOverlay: !0,
                backOverlayColor: "rgba(0,0,0,0.5)",
                backOverlayClickToClose: !1,
                fontFamily: "Quicksand",
                svgSize: "110px",
                plainText: !0,
                titleFontSize: "16px",
                titleMaxLength: 34,
                messageFontSize: "13px",
                messageMaxLength: 400,
                buttonFontSize: "14px",
                buttonMaxLength: 34,
                cssAnimation: !0,
                cssAnimationDuration: 360,
                cssAnimationStyle: "fade",
                success: {
                  svgColor: "#32c682",
                  titleColor: "#1e1e1e",
                  messageColor: "#242424",
                  buttonBackground: "#32c682",
                  buttonColor: "#fff",
                  backOverlayColor: "rgba(50,198,130,0.2)",
                },
                failure: {
                  svgColor: "#ff5549",
                  titleColor: "#1e1e1e",
                  messageColor: "#242424",
                  buttonBackground: "#ff5549",
                  buttonColor: "#fff",
                  backOverlayColor: "rgba(255,85,73,0.2)",
                },
                warning: {
                  svgColor: "#eebf31",
                  titleColor: "#1e1e1e",
                  messageColor: "#242424",
                  buttonBackground: "#eebf31",
                  buttonColor: "#fff",
                  backOverlayColor: "rgba(238,191,49,0.2)",
                },
                info: {
                  svgColor: "#26c0d3",
                  titleColor: "#1e1e1e",
                  messageColor: "#242424",
                  buttonBackground: "#26c0d3",
                  buttonColor: "#fff",
                  backOverlayColor: "rgba(38,192,211,0.2)",
                },
              },
              Dt_Show = "Show",
              Dt_Ask = "Ask",
              Dt_Prompt = "Prompt",
              cs = {
                ID: "NotiflixConfirmWrap",
                className: "notiflix-confirm",
                width: "300px",
                zindex: 4003,
                position: "center",
                distance: "10px",
                backgroundColor: "#f8f8f8",
                borderRadius: "25px",
                backOverlay: !0,
                backOverlayColor: "rgba(0,0,0,0.5)",
                rtl: !1,
                fontFamily: "Quicksand",
                cssAnimation: !0,
                cssAnimationDuration: 300,
                cssAnimationStyle: "fade",
                plainText: !0,
                titleColor: "#32c682",
                titleFontSize: "16px",
                titleMaxLength: 34,
                messageColor: "#1e1e1e",
                messageFontSize: "14px",
                messageMaxLength: 110,
                buttonsFontSize: "15px",
                buttonsMaxLength: 34,
                okButtonColor: "#f8f8f8",
                okButtonBackground: "#32c682",
                cancelButtonColor: "#f8f8f8",
                cancelButtonBackground: "#a9a9a9",
              },
              Re_Standard = "Standard",
              Re_Hourglass = "Hourglass",
              Re_Circle = "Circle",
              Re_Arrows = "Arrows",
              Re_Dots = "Dots",
              Re_Pulse = "Pulse",
              Re_Custom = "Custom",
              Re_Notiflix = "Notiflix",
              Rt = {
                ID: "NotiflixLoadingWrap",
                className: "notiflix-loading",
                zindex: 4e3,
                backgroundColor: "rgba(0,0,0,0.8)",
                rtl: !1,
                fontFamily: "Quicksand",
                cssAnimation: !0,
                cssAnimationDuration: 400,
                clickToClose: !1,
                customSvgUrl: null,
                customSvgCode: null,
                svgSize: "80px",
                svgColor: "#32c682",
                messageID: "NotiflixLoadingMessage",
                messageFontSize: "15px",
                messageMaxLength: 34,
                messageColor: "#dcdcdc",
              },
              nt_Standard = "Standard",
              nt_Hourglass = "Hourglass",
              nt_Circle = "Circle",
              nt_Arrows = "Arrows",
              nt_Dots = "Dots",
              nt_Pulse = "Pulse",
              qn = {
                ID: "NotiflixBlockWrap",
                querySelectorLimit: 200,
                className: "notiflix-block",
                position: "absolute",
                zindex: 1e3,
                backgroundColor: "rgba(255,255,255,0.9)",
                rtl: !1,
                fontFamily: "Quicksand",
                cssAnimation: !0,
                cssAnimationDuration: 300,
                svgSize: "45px",
                svgColor: "#383838",
                messageFontSize: "14px",
                messageMaxLength: 34,
                messageColor: "#383838",
              },
              rt = function (h) {
                return console.error(
                  "%c Notiflix Error ",
                  "padding:2px;border-radius:20px;color:#fff;background:#ff5549",
                  "\n" + h + Lo
                );
              },
              cn = function (h) {
                return (
                  h || (h = "head"),
                  null !== k.document[h] ||
                    (rt(
                      '\nNotiflix needs to be appended to the "<' +
                        h +
                        '>" element, but you called it before the "<' +
                        h +
                        '>" element has been created.'
                    ),
                    !1)
                );
              },
              fr = function (h, g) {
                if (!cn("head")) return !1;
                if (null !== h() && !k.document.getElementById(g)) {
                  var v = k.document.createElement("style");
                  (v.id = g),
                    (v.innerHTML = h()),
                    k.document.head.appendChild(v);
                }
              },
              ne = function () {
                var h = {},
                  g = !1,
                  v = 0;
                "[object Boolean]" ===
                  Object.prototype.toString.call(arguments[0]) &&
                  ((g = arguments[0]), v++);
                for (
                  var R = function (L) {
                    for (var Q in L)
                      Object.prototype.hasOwnProperty.call(L, Q) &&
                        (h[Q] =
                          g &&
                          "[object Object]" ===
                            Object.prototype.toString.call(L[Q])
                            ? ne(h[Q], L[Q])
                            : L[Q]);
                  };
                  v < arguments.length;
                  v++
                )
                  R(arguments[v]);
                return h;
              },
              Ue = function (h) {
                var g = k.document.createElement("div");
                return (g.innerHTML = h), g.textContent || g.innerText || "";
              },
              Rr = function (h, g) {
                return (
                  h || (h = "60px"),
                  g || (g = "#32c682"),
                  '<svg xmlns="http://www.w3.org/2000/svg" stroke="' +
                    g +
                    '" width="' +
                    h +
                    '" height="' +
                    h +
                    '" transform="scale(.8)" viewBox="0 0 38 38"><g fill="none" fill-rule="evenodd" stroke-width="2" transform="translate(1 1)"><circle cx="18" cy="18" r="18" stroke-opacity=".25"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" dur="1s" from="0 18 18" repeatCount="indefinite" to="360 18 18" type="rotate"/></path></g></svg>'
                );
              },
              Sl = function (h, g) {
                return (
                  h || (h = "60px"),
                  g || (g = "#32c682"),
                  '<svg xmlns="http://www.w3.org/2000/svg" id="NXLoadingHourglass" fill="' +
                    g +
                    '" width="' +
                    h +
                    '" height="' +
                    h +
                    '" viewBox="0 0 200 200"><style>@-webkit-keyframes NXhourglass5-animation{0%{-webkit-transform:scale(1,1);transform:scale(1,1)}16.67%{-webkit-transform:scale(1,.8);transform:scale(1,.8)}33.33%{-webkit-transform:scale(.88,.6);transform:scale(.88,.6)}37.5%{-webkit-transform:scale(.85,.55);transform:scale(.85,.55)}41.67%{-webkit-transform:scale(.8,.5);transform:scale(.8,.5)}45.83%{-webkit-transform:scale(.75,.45);transform:scale(.75,.45)}50%{-webkit-transform:scale(.7,.4);transform:scale(.7,.4)}54.17%{-webkit-transform:scale(.6,.35);transform:scale(.6,.35)}58.33%{-webkit-transform:scale(.5,.3);transform:scale(.5,.3)}83.33%,to{-webkit-transform:scale(.2,0);transform:scale(.2,0)}}@keyframes NXhourglass5-animation{0%{-webkit-transform:scale(1,1);transform:scale(1,1)}16.67%{-webkit-transform:scale(1,.8);transform:scale(1,.8)}33.33%{-webkit-transform:scale(.88,.6);transform:scale(.88,.6)}37.5%{-webkit-transform:scale(.85,.55);transform:scale(.85,.55)}41.67%{-webkit-transform:scale(.8,.5);transform:scale(.8,.5)}45.83%{-webkit-transform:scale(.75,.45);transform:scale(.75,.45)}50%{-webkit-transform:scale(.7,.4);transform:scale(.7,.4)}54.17%{-webkit-transform:scale(.6,.35);transform:scale(.6,.35)}58.33%{-webkit-transform:scale(.5,.3);transform:scale(.5,.3)}83.33%,to{-webkit-transform:scale(.2,0);transform:scale(.2,0)}}@-webkit-keyframes NXhourglass3-animation{0%{-webkit-transform:scale(1,.02);transform:scale(1,.02)}79.17%,to{-webkit-transform:scale(1,1);transform:scale(1,1)}}@keyframes NXhourglass3-animation{0%{-webkit-transform:scale(1,.02);transform:scale(1,.02)}79.17%,to{-webkit-transform:scale(1,1);transform:scale(1,1)}}@-webkit-keyframes NXhourglass1-animation{0%,83.33%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes NXhourglass1-animation{0%,83.33%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}#NXLoadingHourglass *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g data-animator-group="true" data-animator-type="1" style="-webkit-animation-name:NXhourglass1-animation;animation-name:NXhourglass1-animation;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transform-box:fill-box"><g id="NXhourglass2" fill="inherit"><g data-animator-group="true" data-animator-type="2" style="-webkit-animation-name:NXhourglass3-animation;animation-name:NXhourglass3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform-origin:50% 100%;transform-origin:50% 100%;transform-box:fill-box" opacity=".4"><path id="NXhourglass4" d="M100 100l-34.38 32.08v31.14h68.76v-31.14z"/></g><g data-animator-group="true" data-animator-type="2" style="-webkit-animation-name:NXhourglass5-animation;animation-name:NXhourglass5-animation;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;transform-box:fill-box" opacity=".4"><path id="NXhourglass6" d="M100 100L65.62 67.92V36.78h68.76v31.14z"/></g><path d="M51.14 38.89h8.33v14.93c0 15.1 8.29 28.99 23.34 39.1 1.88 1.25 3.04 3.97 3.04 7.08s-1.16 5.83-3.04 7.09c-15.05 10.1-23.34 23.99-23.34 39.09v14.93h-8.33a4.859 4.859 0 1 0 0 9.72h97.72a4.859 4.859 0 1 0 0-9.72h-8.33v-14.93c0-15.1-8.29-28.99-23.34-39.09-1.88-1.26-3.04-3.98-3.04-7.09s1.16-5.83 3.04-7.08c15.05-10.11 23.34-24 23.34-39.1V38.89h8.33a4.859 4.859 0 1 0 0-9.72H51.14a4.859 4.859 0 1 0 0 9.72zm79.67 14.93c0 15.87-11.93 26.25-19.04 31.03-4.6 3.08-7.34 8.75-7.34 15.15 0 6.41 2.74 12.07 7.34 15.15 7.11 4.78 19.04 15.16 19.04 31.03v14.93H69.19v-14.93c0-15.87 11.93-26.25 19.04-31.02 4.6-3.09 7.34-8.75 7.34-15.16 0-6.4-2.74-12.07-7.34-15.15-7.11-4.78-19.04-15.16-19.04-31.03V38.89h61.62v14.93z"/></g></g></svg>'
                );
              },
              Bo = function (h, g) {
                return (
                  h || (h = "60px"),
                  g || (g = "#32c682"),
                  '<svg xmlns="http://www.w3.org/2000/svg" width="' +
                    h +
                    '" height="' +
                    h +
                    '" viewBox="25 25 50 50" style="-webkit-animation:rotate 2s linear infinite;animation:rotate 2s linear infinite;height:' +
                    h +
                    ";-webkit-transform-origin:center center;-ms-transform-origin:center center;transform-origin:center center;width:" +
                    h +
                    ';position:absolute;top:0;left:0;margin:auto"><style>@-webkit-keyframes rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35}to{stroke-dasharray:89,200;stroke-dashoffset:-124}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35}to{stroke-dasharray:89,200;stroke-dashoffset:-124}}</style><circle cx="50" cy="50" r="20" fill="none" stroke="' +
                    g +
                    '" stroke-width="2" style="-webkit-animation:dash 1.5s ease-in-out infinite,color 1.5s ease-in-out infinite;animation:dash 1.5s ease-in-out infinite,color 1.5s ease-in-out infinite" stroke-dasharray="150 200" stroke-dashoffset="-10" stroke-linecap="round"/></svg>'
                );
              },
              Be = function (h, g) {
                return (
                  h || (h = "60px"),
                  g || (g = "#32c682"),
                  '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                    g +
                    '" width="' +
                    h +
                    '" height="' +
                    h +
                    '" viewBox="0 0 128 128"><g><path fill="inherit" d="M109.25 55.5h-36l12-12a29.54 29.54 0 0 0-49.53 12H18.75A46.04 46.04 0 0 1 96.9 31.84l12.35-12.34v36zm-90.5 17h36l-12 12a29.54 29.54 0 0 0 49.53-12h16.97A46.04 46.04 0 0 1 31.1 96.16L18.74 108.5v-36z"/><animateTransform attributeName="transform" dur="1.5s" from="0 64 64" repeatCount="indefinite" to="360 64 64" type="rotate"/></g></svg>'
                );
              },
              Ho = function (h, g) {
                return (
                  h || (h = "60px"),
                  g || (g = "#32c682"),
                  '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                    g +
                    '" width="' +
                    h +
                    '" height="' +
                    h +
                    '" viewBox="0 0 100 100"><g transform="translate(25 50)"><circle r="9" fill="inherit" transform="scale(.239)"><animateTransform attributeName="transform" begin="-0.266s" calcMode="spline" dur="0.8s" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.5;1" repeatCount="indefinite" type="scale" values="0;1;0"/></circle></g><g transform="translate(50 50)"><circle r="9" fill="inherit" transform="scale(.00152)"><animateTransform attributeName="transform" begin="-0.133s" calcMode="spline" dur="0.8s" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.5;1" repeatCount="indefinite" type="scale" values="0;1;0"/></circle></g><g transform="translate(75 50)"><circle r="9" fill="inherit" transform="scale(.299)"><animateTransform attributeName="transform" begin="0s" calcMode="spline" dur="0.8s" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.5;1" repeatCount="indefinite" type="scale" values="0;1;0"/></circle></g></svg>'
                );
              },
              ds = function (h, g) {
                return (
                  h || (h = "60px"),
                  g || (g = "#32c682"),
                  '<svg xmlns="http://www.w3.org/2000/svg" stroke="' +
                    g +
                    '" width="' +
                    h +
                    '" height="' +
                    h +
                    '" viewBox="0 0 44 44"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>'
                );
              },
              Al = function () {
                return '[id^=NotiflixNotifyWrap]{pointer-events:none;position:fixed;z-index:4001;opacity:1;right:10px;top:10px;width:280px;max-width:96%;-webkit-box-sizing:border-box;box-sizing:border-box;background:transparent}[id^=NotiflixNotifyWrap].nx-flex-center-center{max-height:calc(100vh - 20px);overflow-x:hidden;overflow-y:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin:auto}[id^=NotiflixNotifyWrap]::-webkit-scrollbar{width:0;height:0}[id^=NotiflixNotifyWrap]::-webkit-scrollbar-thumb{background:transparent}[id^=NotiflixNotifyWrap]::-webkit-scrollbar-track{background:transparent}[id^=NotiflixNotifyWrap] *{-webkit-box-sizing:border-box;box-sizing:border-box}[id^=NotiflixNotifyOverlay]{-webkit-transition:background .3s ease-in-out;-o-transition:background .3s ease-in-out;transition:background .3s ease-in-out}[id^=NotiflixNotifyWrap]>div{pointer-events:all;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:"Quicksand",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;width:100%;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:relative;margin:0 0 10px;border-radius:5px;background:#1e1e1e;color:#fff;padding:10px 12px;font-size:14px;line-height:1.4}[id^=NotiflixNotifyWrap]>div:last-child{margin:0}[id^=NotiflixNotifyWrap]>div.nx-with-callback{cursor:pointer}[id^=NotiflixNotifyWrap]>div.nx-with-icon{padding:8px;min-height:56px}[id^=NotiflixNotifyWrap]>div.nx-paused{cursor:auto}[id^=NotiflixNotifyWrap]>div.nx-notify-click-to-close{cursor:pointer}[id^=NotiflixNotifyWrap]>div.nx-with-close-button{padding:10px 36px 10px 12px}[id^=NotiflixNotifyWrap]>div.nx-with-icon.nx-with-close-button{padding:6px 36px 6px 6px}[id^=NotiflixNotifyWrap]>div>span.nx-message{cursor:inherit;font-weight:normal;font-family:inherit!important;word-break:break-all;word-break:break-word}[id^=NotiflixNotifyWrap]>div>span.nx-close-button{cursor:pointer;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;position:absolute;right:8px;top:0;bottom:0;margin:auto;color:inherit;width:20px;height:20px}[id^=NotiflixNotifyWrap]>div>span.nx-close-button:hover{-webkit-transform:rotate(90deg);transform:rotate(90deg)}[id^=NotiflixNotifyWrap]>div>span.nx-close-button>svg{position:absolute;width:16px;height:16px;right:2px;top:2px}[id^=NotiflixNotifyWrap]>div>.nx-message-icon{position:absolute;width:40px;height:40px;font-size:30px;line-height:40px;text-align:center;left:8px;top:0;bottom:0;margin:auto;border-radius:inherit}[id^=NotiflixNotifyWrap]>div>.nx-message-icon-fa.nx-message-icon-fa-shadow{color:inherit;background:rgba(0,0,0,.15);-webkit-box-shadow:inset 0 0 34px rgba(0,0,0,.2);box-shadow:inset 0 0 34px rgba(0,0,0,.2);text-shadow:0 0 10px rgba(0,0,0,.3)}[id^=NotiflixNotifyWrap]>div>span.nx-with-icon{position:relative;float:left;width:calc(100% - 40px);margin:0 0 0 40px;padding:0 0 0 10px;-webkit-box-sizing:border-box;box-sizing:border-box}[id^=NotiflixNotifyWrap]>div.nx-rtl-on>.nx-message-icon{left:auto;right:8px}[id^=NotiflixNotifyWrap]>div.nx-rtl-on>span.nx-with-icon{padding:0 10px 0 0;margin:0 40px 0 0}[id^=NotiflixNotifyWrap]>div.nx-rtl-on>span.nx-close-button{right:auto;left:8px}[id^=NotiflixNotifyWrap]>div.nx-with-icon.nx-with-close-button.nx-rtl-on{padding:6px 6px 6px 36px}[id^=NotiflixNotifyWrap]>div.nx-with-close-button.nx-rtl-on{padding:10px 12px 10px 36px}[id^=NotiflixNotifyOverlay].nx-with-animation,[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-fade{-webkit-animation:notify-animation-fade .3s ease-in-out 0s normal;animation:notify-animation-fade .3s ease-in-out 0s normal}@-webkit-keyframes notify-animation-fade{0%{opacity:0}100%{opacity:1}}@keyframes notify-animation-fade{0%{opacity:0}100%{opacity:1}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-zoom{-webkit-animation:notify-animation-zoom .3s ease-in-out 0s normal;animation:notify-animation-zoom .3s ease-in-out 0s normal}@-webkit-keyframes notify-animation-zoom{0%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1.05);transform:scale(1.05)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes notify-animation-zoom{0%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1.05);transform:scale(1.05)}100%{-webkit-transform:scale(1);transform:scale(1)}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-right{-webkit-animation:notify-animation-from-right .3s ease-in-out 0s normal;animation:notify-animation-from-right .3s ease-in-out 0s normal}@-webkit-keyframes notify-animation-from-right{0%{right:-300px;opacity:0}50%{right:8px;opacity:1}100%{right:0;opacity:1}}@keyframes notify-animation-from-right{0%{right:-300px;opacity:0}50%{right:8px;opacity:1}100%{right:0;opacity:1}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-left{-webkit-animation:notify-animation-from-left .3s ease-in-out 0s normal;animation:notify-animation-from-left .3s ease-in-out 0s normal}@-webkit-keyframes notify-animation-from-left{0%{left:-300px;opacity:0}50%{left:8px;opacity:1}100%{left:0;opacity:1}}@keyframes notify-animation-from-left{0%{left:-300px;opacity:0}50%{left:8px;opacity:1}100%{left:0;opacity:1}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-top{-webkit-animation:notify-animation-from-top .3s ease-in-out 0s normal;animation:notify-animation-from-top .3s ease-in-out 0s normal}@-webkit-keyframes notify-animation-from-top{0%{top:-50px;opacity:0}50%{top:8px;opacity:1}100%{top:0;opacity:1}}@keyframes notify-animation-from-top{0%{top:-50px;opacity:0}50%{top:8px;opacity:1}100%{top:0;opacity:1}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-bottom{-webkit-animation:notify-animation-from-bottom .3s ease-in-out 0s normal;animation:notify-animation-from-bottom .3s ease-in-out 0s normal}@-webkit-keyframes notify-animation-from-bottom{0%{bottom:-50px;opacity:0}50%{bottom:8px;opacity:1}100%{bottom:0;opacity:1}}@keyframes notify-animation-from-bottom{0%{bottom:-50px;opacity:0}50%{bottom:8px;opacity:1}100%{bottom:0;opacity:1}}[id^=NotiflixNotifyOverlay].nx-with-animation.nx-remove,[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-fade.nx-remove{opacity:0;-webkit-animation:notify-remove-fade .3s ease-in-out 0s normal;animation:notify-remove-fade .3s ease-in-out 0s normal}@-webkit-keyframes notify-remove-fade{0%{opacity:1}100%{opacity:0}}@keyframes notify-remove-fade{0%{opacity:1}100%{opacity:0}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-zoom.nx-remove{-webkit-transform:scale(0);transform:scale(0);-webkit-animation:notify-remove-zoom .3s ease-in-out 0s normal;animation:notify-remove-zoom .3s ease-in-out 0s normal}@-webkit-keyframes notify-remove-zoom{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.05);transform:scale(1.05)}100%{-webkit-transform:scale(0);transform:scale(0)}}@keyframes notify-remove-zoom{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.05);transform:scale(1.05)}100%{-webkit-transform:scale(0);transform:scale(0)}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-top.nx-remove{opacity:0;-webkit-animation:notify-remove-to-top .3s ease-in-out 0s normal;animation:notify-remove-to-top .3s ease-in-out 0s normal}@-webkit-keyframes notify-remove-to-top{0%{top:0;opacity:1}50%{top:8px;opacity:1}100%{top:-50px;opacity:0}}@keyframes notify-remove-to-top{0%{top:0;opacity:1}50%{top:8px;opacity:1}100%{top:-50px;opacity:0}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-right.nx-remove{opacity:0;-webkit-animation:notify-remove-to-right .3s ease-in-out 0s normal;animation:notify-remove-to-right .3s ease-in-out 0s normal}@-webkit-keyframes notify-remove-to-right{0%{right:0;opacity:1}50%{right:8px;opacity:1}100%{right:-300px;opacity:0}}@keyframes notify-remove-to-right{0%{right:0;opacity:1}50%{right:8px;opacity:1}100%{right:-300px;opacity:0}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-bottom.nx-remove{opacity:0;-webkit-animation:notify-remove-to-bottom .3s ease-in-out 0s normal;animation:notify-remove-to-bottom .3s ease-in-out 0s normal}@-webkit-keyframes notify-remove-to-bottom{0%{bottom:0;opacity:1}50%{bottom:8px;opacity:1}100%{bottom:-50px;opacity:0}}@keyframes notify-remove-to-bottom{0%{bottom:0;opacity:1}50%{bottom:8px;opacity:1}100%{bottom:-50px;opacity:0}}[id^=NotiflixNotifyWrap]>div.nx-with-animation.nx-from-left.nx-remove{opacity:0;-webkit-animation:notify-remove-to-left .3s ease-in-out 0s normal;animation:notify-remove-to-left .3s ease-in-out 0s normal}@-webkit-keyframes notify-remove-to-left{0%{left:0;opacity:1}50%{left:8px;opacity:1}100%{left:-300px;opacity:0}}@keyframes notify-remove-to-left{0%{left:0;opacity:1}50%{left:8px;opacity:1}100%{left:-300px;opacity:0}}';
              },
              Mn = 0,
              pr = function (h, g, v, R) {
                if (!cn("body")) return !1;
                _ || Xe.Notify.init({});
                var L = ne(!0, _, {});
                if (
                  ("object" == typeof v && !Array.isArray(v)) ||
                  ("object" == typeof R && !Array.isArray(R))
                ) {
                  var Q = {};
                  "object" == typeof v
                    ? (Q = v)
                    : "object" == typeof R && (Q = R),
                    (_ = ne(!0, _, Q));
                }
                var z = _[h.toLocaleLowerCase("en")];
                Mn++,
                  "string" != typeof g && (g = "Notiflix " + h),
                  _.plainText && (g = Ue(g)),
                  !_.plainText &&
                    g.length > _.messageMaxLength &&
                    ((_ = ne(!0, _, {
                      closeButton: !0,
                      messageMaxLength: 150,
                    })),
                    (g =
                      'Possible HTML Tags Error: The "plainText" option is "false" and the notification content length is more than the "messageMaxLength" option.')),
                  g.length > _.messageMaxLength &&
                    (g = g.substring(0, _.messageMaxLength) + "..."),
                  "shadow" === _.fontAwesomeIconStyle &&
                    (z.fontAwesomeIconColor = z.background),
                  _.cssAnimation || (_.cssAnimationDuration = 0);
                var I =
                  k.document.getElementById(bt.wrapID) ||
                  k.document.createElement("div");
                if (
                  ((I.id = bt.wrapID),
                  (I.style.width = _.width),
                  (I.style.zIndex = _.zindex),
                  (I.style.opacity = _.opacity),
                  "center-center" === _.position
                    ? ((I.style.left = _.distance),
                      (I.style.top = _.distance),
                      (I.style.right = _.distance),
                      (I.style.bottom = _.distance),
                      (I.style.margin = "auto"),
                      I.classList.add("nx-flex-center-center"),
                      (I.style.maxHeight =
                        "calc((100vh - " +
                        _.distance +
                        ") - " +
                        _.distance +
                        ")"),
                      (I.style.display = "flex"),
                      (I.style.flexWrap = "wrap"),
                      (I.style.flexDirection = "column"),
                      (I.style.justifyContent = "center"),
                      (I.style.alignItems = "center"),
                      (I.style.pointerEvents = "none"))
                    : "center-top" === _.position
                    ? ((I.style.left = _.distance),
                      (I.style.right = _.distance),
                      (I.style.top = _.distance),
                      (I.style.bottom = "auto"),
                      (I.style.margin = "auto"))
                    : "center-bottom" === _.position
                    ? ((I.style.left = _.distance),
                      (I.style.right = _.distance),
                      (I.style.bottom = _.distance),
                      (I.style.top = "auto"),
                      (I.style.margin = "auto"))
                    : "right-bottom" === _.position
                    ? ((I.style.right = _.distance),
                      (I.style.bottom = _.distance),
                      (I.style.top = "auto"),
                      (I.style.left = "auto"))
                    : "left-top" === _.position
                    ? ((I.style.left = _.distance),
                      (I.style.top = _.distance),
                      (I.style.right = "auto"),
                      (I.style.bottom = "auto"))
                    : "left-bottom" === _.position
                    ? ((I.style.left = _.distance),
                      (I.style.bottom = _.distance),
                      (I.style.top = "auto"),
                      (I.style.right = "auto"))
                    : ((I.style.right = _.distance),
                      (I.style.top = _.distance),
                      (I.style.left = "auto"),
                      (I.style.bottom = "auto")),
                  _.backOverlay)
                ) {
                  var ee =
                    k.document.getElementById(bt.overlayID) ||
                    k.document.createElement("div");
                  (ee.id = bt.overlayID),
                    (ee.style.width = "100%"),
                    (ee.style.height = "100%"),
                    (ee.style.position = "fixed"),
                    (ee.style.zIndex = _.zindex - 1),
                    (ee.style.left = 0),
                    (ee.style.top = 0),
                    (ee.style.right = 0),
                    (ee.style.bottom = 0),
                    (ee.style.background =
                      z.backOverlayColor || _.backOverlayColor),
                    (ee.className = _.cssAnimation ? "nx-with-animation" : ""),
                    (ee.style.animationDuration = _.cssAnimation
                      ? _.cssAnimationDuration + "ms"
                      : ""),
                    k.document.getElementById(bt.overlayID) ||
                      k.document.body.appendChild(ee);
                }
                k.document.getElementById(bt.wrapID) ||
                  k.document.body.appendChild(I);
                var F = k.document.createElement("div");
                (F.id = _.ID + "-" + Mn),
                  (F.className =
                    _.className +
                    " " +
                    z.childClassName +
                    " " +
                    (_.cssAnimation ? "nx-with-animation" : "") +
                    " " +
                    (_.useIcon ? "nx-with-icon" : "") +
                    " nx-" +
                    _.cssAnimationStyle +
                    " " +
                    (_.closeButton && "function" != typeof v
                      ? "nx-with-close-button"
                      : "") +
                    " " +
                    ("function" == typeof v ? "nx-with-callback" : "") +
                    " " +
                    (_.clickToClose ? "nx-notify-click-to-close" : "")),
                  (F.style.fontSize = _.fontSize),
                  (F.style.color = z.textColor),
                  (F.style.background = z.background),
                  (F.style.borderRadius = _.borderRadius),
                  (F.style.pointerEvents = "all"),
                  _.rtl &&
                    (F.setAttribute("dir", "rtl"),
                    F.classList.add("nx-rtl-on")),
                  (F.style.fontFamily = '"' + _.fontFamily + '", ' + kt),
                  _.cssAnimation &&
                    (F.style.animationDuration = _.cssAnimationDuration + "ms");
                var ce = "";
                if (
                  (_.closeButton &&
                    "function" != typeof v &&
                    (ce =
                      '<span class="nx-close-button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g><path fill="' +
                      z.notiflixIconColor +
                      '" d="M0.38 2.19l7.8 7.81 -7.8 7.81c-0.51,0.5 -0.51,1.31 -0.01,1.81 0.25,0.25 0.57,0.38 0.91,0.38 0.34,0 0.67,-0.14 0.91,-0.38l7.81 -7.81 7.81 7.81c0.24,0.24 0.57,0.38 0.91,0.38 0.34,0 0.66,-0.14 0.9,-0.38 0.51,-0.5 0.51,-1.31 0,-1.81l-7.81 -7.81 7.81 -7.81c0.51,-0.5 0.51,-1.31 0,-1.82 -0.5,-0.5 -1.31,-0.5 -1.81,0l-7.81 7.81 -7.81 -7.81c-0.5,-0.5 -1.31,-0.5 -1.81,0 -0.51,0.51 -0.51,1.32 0,1.82z"/></g></svg></span>'),
                  _.useIcon)
                )
                  if (_.useFontAwesome)
                    F.innerHTML =
                      '<i style="color:' +
                      z.fontAwesomeIconColor +
                      "; font-size:" +
                      _.fontAwesomeIconSize +
                      ';" class="nx-message-icon nx-message-icon-fa ' +
                      z.fontAwesomeClassName +
                      " " +
                      ("shadow" === _.fontAwesomeIconStyle
                        ? "nx-message-icon-fa-shadow"
                        : "nx-message-icon-fa-basic") +
                      '"></i><span class="nx-message nx-with-icon">' +
                      g +
                      "</span>" +
                      (_.closeButton ? ce : "");
                  else {
                    var Se = "";
                    h === Ot_Success
                      ? (Se =
                          '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' +
                          z.notiflixIconColor +
                          '" d="M20 0c11.03,0 20,8.97 20,20 0,11.03 -8.97,20 -20,20 -11.03,0 -20,-8.97 -20,-20 0,-11.03 8.97,-20 20,-20zm0 37.98c9.92,0 17.98,-8.06 17.98,-17.98 0,-9.92 -8.06,-17.98 -17.98,-17.98 -9.92,0 -17.98,8.06 -17.98,17.98 0,9.92 8.06,17.98 17.98,17.98zm-2.4 -13.29l11.52 -12.96c0.37,-0.41 1.01,-0.45 1.42,-0.08 0.42,0.37 0.46,1 0.09,1.42l-12.16 13.67c-0.19,0.22 -0.46,0.34 -0.75,0.34 -0.23,0 -0.45,-0.07 -0.63,-0.22l-7.6 -6.07c-0.43,-0.35 -0.5,-0.99 -0.16,-1.42 0.35,-0.43 0.99,-0.5 1.42,-0.16l6.85 5.48z"/></g></svg>')
                      : h === Ot_Failure
                      ? (Se =
                          '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' +
                          z.notiflixIconColor +
                          '" d="M20 0c11.03,0 20,8.97 20,20 0,11.03 -8.97,20 -20,20 -11.03,0 -20,-8.97 -20,-20 0,-11.03 8.97,-20 20,-20zm0 37.98c9.92,0 17.98,-8.06 17.98,-17.98 0,-9.92 -8.06,-17.98 -17.98,-17.98 -9.92,0 -17.98,8.06 -17.98,17.98 0,9.92 8.06,17.98 17.98,17.98zm1.42 -17.98l6.13 6.12c0.39,0.4 0.39,1.04 0,1.43 -0.19,0.19 -0.45,0.29 -0.71,0.29 -0.27,0 -0.53,-0.1 -0.72,-0.29l-6.12 -6.13 -6.13 6.13c-0.19,0.19 -0.44,0.29 -0.71,0.29 -0.27,0 -0.52,-0.1 -0.71,-0.29 -0.39,-0.39 -0.39,-1.03 0,-1.43l6.13 -6.12 -6.13 -6.13c-0.39,-0.39 -0.39,-1.03 0,-1.42 0.39,-0.39 1.03,-0.39 1.42,0l6.13 6.12 6.12 -6.12c0.4,-0.39 1.04,-0.39 1.43,0 0.39,0.39 0.39,1.03 0,1.42l-6.13 6.13z"/></g></svg>')
                      : h === Ot_Warning
                      ? (Se =
                          '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' +
                          z.notiflixIconColor +
                          '" d="M21.91 3.48l17.8 30.89c0.84,1.46 -0.23,3.25 -1.91,3.25l-35.6 0c-1.68,0 -2.75,-1.79 -1.91,-3.25l17.8 -30.89c0.85,-1.47 2.97,-1.47 3.82,0zm16.15 31.84l-17.8 -30.89c-0.11,-0.2 -0.41,-0.2 -0.52,0l-17.8 30.89c-0.12,0.2 0.05,0.4 0.26,0.4l35.6 0c0.21,0 0.38,-0.2 0.26,-0.4zm-19.01 -4.12l0 -1.05c0,-0.53 0.42,-0.95 0.95,-0.95 0.53,0 0.95,0.42 0.95,0.95l0 1.05c0,0.53 -0.42,0.95 -0.95,0.95 -0.53,0 -0.95,-0.42 -0.95,-0.95zm0 -4.66l0 -13.39c0,-0.52 0.42,-0.95 0.95,-0.95 0.53,0 0.95,0.43 0.95,0.95l0 13.39c0,0.53 -0.42,0.96 -0.95,0.96 -0.53,0 -0.95,-0.43 -0.95,-0.96z"/></g></svg>')
                      : h === Ot_Info &&
                        (Se =
                          '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' +
                          z.notiflixIconColor +
                          '" d="M20 0c11.03,0 20,8.97 20,20 0,11.03 -8.97,20 -20,20 -11.03,0 -20,-8.97 -20,-20 0,-11.03 8.97,-20 20,-20zm0 37.98c9.92,0 17.98,-8.06 17.98,-17.98 0,-9.92 -8.06,-17.98 -17.98,-17.98 -9.92,0 -17.98,8.06 -17.98,17.98 0,9.92 8.06,17.98 17.98,17.98zm-0.99 -23.3c0,-0.54 0.44,-0.98 0.99,-0.98 0.55,0 0.99,0.44 0.99,0.98l0 15.86c0,0.55 -0.44,0.99 -0.99,0.99 -0.55,0 -0.99,-0.44 -0.99,-0.99l0 -15.86zm0 -5.22c0,-0.55 0.44,-0.99 0.99,-0.99 0.55,0 0.99,0.44 0.99,0.99l0 1.09c0,0.54 -0.44,0.99 -0.99,0.99 -0.55,0 -0.99,-0.45 -0.99,-0.99l0 -1.09z"/></g></svg>'),
                      (F.innerHTML =
                        Se +
                        '<span class="nx-message nx-with-icon">' +
                        g +
                        "</span>" +
                        (_.closeButton ? ce : ""));
                  }
                else
                  F.innerHTML =
                    '<span class="nx-message">' +
                    g +
                    "</span>" +
                    (_.closeButton ? ce : "");
                if (
                  "left-bottom" === _.position ||
                  "right-bottom" === _.position
                ) {
                  var Fe = k.document.getElementById(bt.wrapID);
                  Fe.insertBefore(F, Fe.firstChild);
                } else k.document.getElementById(bt.wrapID).appendChild(F);
                var Ee = k.document.getElementById(F.id);
                if (Ee) {
                  var X,
                    Ne,
                    re = function () {
                      Ee.classList.add("nx-remove");
                      var Z = k.document.getElementById(bt.overlayID);
                      Z &&
                        0 >= I.childElementCount &&
                        Z.classList.add("nx-remove"),
                        clearTimeout(X);
                    },
                    _t = function () {
                      if (
                        (Ee &&
                          null !== Ee.parentNode &&
                          Ee.parentNode.removeChild(Ee),
                        0 >= I.childElementCount && null !== I.parentNode)
                      ) {
                        I.parentNode.removeChild(I);
                        var Z = k.document.getElementById(bt.overlayID);
                        Z &&
                          null !== Z.parentNode &&
                          Z.parentNode.removeChild(Z);
                      }
                      clearTimeout(Ne);
                    };
                  if (
                    (_.closeButton &&
                      "function" != typeof v &&
                      k.document
                        .getElementById(F.id)
                        .querySelector("span.nx-close-button")
                        .addEventListener("click", function () {
                          re();
                          var Z = setTimeout(function () {
                            _t(), clearTimeout(Z);
                          }, _.cssAnimationDuration);
                        }),
                    ("function" == typeof v || _.clickToClose) &&
                      Ee.addEventListener("click", function () {
                        "function" == typeof v && v(), re();
                        var Z = setTimeout(function () {
                          _t(), clearTimeout(Z);
                        }, _.cssAnimationDuration);
                      }),
                    !_.closeButton && "function" != typeof v)
                  ) {
                    var Ze = function () {
                      (X = setTimeout(function () {
                        re();
                      }, _.timeout)),
                        (Ne = setTimeout(function () {
                          _t();
                        }, _.timeout + _.cssAnimationDuration));
                    };
                    Ze(),
                      _.pauseOnHover &&
                        (Ee.addEventListener("mouseenter", function () {
                          Ee.classList.add("nx-paused"),
                            clearTimeout(X),
                            clearTimeout(Ne);
                        }),
                        Ee.addEventListener("mouseleave", function () {
                          Ee.classList.remove("nx-paused"), Ze();
                        }));
                  }
                }
                if (_.showOnlyTheLastOne && 0 < Mn)
                  for (
                    var Ye,
                      xe = k.document.querySelectorAll(
                        "[id^=" + _.ID + "-]:not([id=" + _.ID + "-" + Mn + "])"
                      ),
                      un = 0;
                    un < xe.length;
                    un++
                  )
                    null !== (Ye = xe[un]).parentNode &&
                      Ye.parentNode.removeChild(Ye);
                _ = ne(!0, _, L);
              },
              Tl = function () {
                return '[id^=NotiflixReportWrap]{position:fixed;z-index:4002;width:100%;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:"Quicksand",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;left:0;top:0;padding:10px;color:#1e1e1e;border-radius:25px;background:transparent;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[id^=NotiflixReportWrap] *{-webkit-box-sizing:border-box;box-sizing:border-box}[id^=NotiflixReportWrap]>div[class*="-overlay"]{width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,.5);position:fixed;z-index:0}[id^=NotiflixReportWrap]>div.nx-report-click-to-close{cursor:pointer}[id^=NotiflixReportWrap]>div[class*="-content"]{width:320px;max-width:100%;max-height:96vh;overflow-x:hidden;overflow-y:auto;border-radius:inherit;padding:10px;-webkit-filter:drop-shadow(0 0 5px rgba(0,0,0,0.05));filter:drop-shadow(0 0 5px rgba(0, 0, 0, .05));border:1px solid rgba(0,0,0,.03);background:#f8f8f8;position:relative;z-index:1}[id^=NotiflixReportWrap]>div[class*="-content"]::-webkit-scrollbar{width:0;height:0}[id^=NotiflixReportWrap]>div[class*="-content"]::-webkit-scrollbar-thumb{background:transparent}[id^=NotiflixReportWrap]>div[class*="-content"]::-webkit-scrollbar-track{background:transparent}[id^=NotiflixReportWrap]>div[class*="-content"]>div[class$="-icon"]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:110px;height:110px;display:block;margin:6px auto 12px}[id^=NotiflixReportWrap]>div[class*="-content"]>div[class$="-icon"] svg{min-width:100%;max-width:100%;height:auto}[id^=NotiflixReportWrap]>*>h5{word-break:break-all;word-break:break-word;font-family:inherit!important;font-size:16px;font-weight:500;line-height:1.4;margin:0 0 10px;padding:0 0 10px;border-bottom:1px solid rgba(0,0,0,.1);float:left;width:100%;text-align:center}[id^=NotiflixReportWrap]>*>p{word-break:break-all;word-break:break-word;font-family:inherit!important;font-size:13px;line-height:1.4;font-weight:normal;float:left;width:100%;padding:0 10px;margin:0 0 10px}[id^=NotiflixReportWrap] a#NXReportButton{word-break:break-all;word-break:break-word;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:inherit!important;-webkit-transition:all .25s ease-in-out;-o-transition:all .25s ease-in-out;transition:all .25s ease-in-out;cursor:pointer;float:right;padding:7px 17px;background:#32c682;font-size:14px;line-height:1.4;font-weight:500;border-radius:inherit!important;color:#fff}[id^=NotiflixReportWrap] a#NXReportButton:hover{-webkit-box-shadow:inset 0 -60px 5px -5px rgba(0,0,0,.25);box-shadow:inset 0 -60px 5px -5px rgba(0,0,0,.25)}[id^=NotiflixReportWrap].nx-rtl-on a#NXReportButton{float:left}[id^=NotiflixReportWrap]>div[class*="-overlay"].nx-with-animation{-webkit-animation:report-overlay-animation .3s ease-in-out 0s normal;animation:report-overlay-animation .3s ease-in-out 0s normal}@-webkit-keyframes report-overlay-animation{0%{opacity:0}100%{opacity:1}}@keyframes report-overlay-animation{0%{opacity:0}100%{opacity:1}}[id^=NotiflixReportWrap]>div[class*="-content"].nx-with-animation.nx-fade{-webkit-animation:report-animation-fade .3s ease-in-out 0s normal;animation:report-animation-fade .3s ease-in-out 0s normal}@-webkit-keyframes report-animation-fade{0%{opacity:0}100%{opacity:1}}@keyframes report-animation-fade{0%{opacity:0}100%{opacity:1}}[id^=NotiflixReportWrap]>div[class*="-content"].nx-with-animation.nx-zoom{-webkit-animation:report-animation-zoom .3s ease-in-out 0s normal;animation:report-animation-zoom .3s ease-in-out 0s normal}@-webkit-keyframes report-animation-zoom{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes report-animation-zoom{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}[id^=NotiflixReportWrap].nx-remove>div[class*="-overlay"].nx-with-animation{opacity:0;-webkit-animation:report-overlay-animation-remove .3s ease-in-out 0s normal;animation:report-overlay-animation-remove .3s ease-in-out 0s normal}@-webkit-keyframes report-overlay-animation-remove{0%{opacity:1}100%{opacity:0}}@keyframes report-overlay-animation-remove{0%{opacity:1}100%{opacity:0}}[id^=NotiflixReportWrap].nx-remove>div[class*="-content"].nx-with-animation.nx-fade{opacity:0;-webkit-animation:report-animation-fade-remove .3s ease-in-out 0s normal;animation:report-animation-fade-remove .3s ease-in-out 0s normal}@-webkit-keyframes report-animation-fade-remove{0%{opacity:1}100%{opacity:0}}@keyframes report-animation-fade-remove{0%{opacity:1}100%{opacity:0}}[id^=NotiflixReportWrap].nx-remove>div[class*="-content"].nx-with-animation.nx-zoom{opacity:0;-webkit-animation:report-animation-zoom-remove .3s ease-in-out 0s normal;animation:report-animation-zoom-remove .3s ease-in-out 0s normal}@-webkit-keyframes report-animation-zoom-remove{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.5;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@keyframes report-animation-zoom-remove{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.5;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}';
              },
              ut = function (h, g, v, R, L, Q) {
                if (!cn("body")) return !1;
                O || Xe.Report.init({});
                var z = {};
                if (
                  ("object" == typeof L && !Array.isArray(L)) ||
                  ("object" == typeof Q && !Array.isArray(Q))
                ) {
                  var I = {};
                  "object" == typeof L
                    ? (I = L)
                    : "object" == typeof Q && (I = Q),
                    (z = ne(!0, O, {})),
                    (O = ne(!0, O, I));
                }
                var ee = O[h.toLocaleLowerCase("en")];
                "string" != typeof g && (g = "Notiflix " + h),
                  "string" != typeof v &&
                    (h === ct_Success
                      ? (v =
                          '"Do not try to become a person of success but try to become a person of value." <br><br>- Albert Einstein')
                      : h === ct_Failure
                      ? (v =
                          '"Failure is simply the opportunity to begin again, this time more intelligently." <br><br>- Henry Ford')
                      : h === ct_Warning
                      ? (v =
                          '"The peoples who want to live comfortably without producing and fatigue; they are doomed to lose their dignity, then liberty, and then independence and destiny." <br><br>- Mustafa Kemal Ataturk')
                      : h === ct_Info &&
                        (v =
                          '"Knowledge rests not upon truth alone, but upon error also." <br><br>- Carl Gustav Jung')),
                  "string" != typeof R && (R = "Okay"),
                  O.plainText && ((g = Ue(g)), (v = Ue(v)), (R = Ue(R))),
                  O.plainText ||
                    (g.length > O.titleMaxLength &&
                      ((g = "Possible HTML Tags Error"),
                      (v =
                        'The "plainText" option is "false" and the title content length is more than the "titleMaxLength" option.'),
                      (R = "Okay")),
                    v.length > O.messageMaxLength &&
                      ((g = "Possible HTML Tags Error"),
                      (v =
                        'The "plainText" option is "false" and the message content length is more than the "messageMaxLength" option.'),
                      (R = "Okay")),
                    R.length > O.buttonMaxLength &&
                      ((g = "Possible HTML Tags Error"),
                      (v =
                        'The "plainText" option is "false" and the button content length is more than the "buttonMaxLength" option.'),
                      (R = "Okay"))),
                  g.length > O.titleMaxLength &&
                    (g = g.substring(0, O.titleMaxLength) + "..."),
                  v.length > O.messageMaxLength &&
                    (v = v.substring(0, O.messageMaxLength) + "..."),
                  R.length > O.buttonMaxLength &&
                    (R = R.substring(0, O.buttonMaxLength) + "..."),
                  O.cssAnimation || (O.cssAnimationDuration = 0);
                var F = k.document.createElement("div");
                (F.id = ls.ID),
                  (F.className = O.className),
                  (F.style.zIndex = O.zindex),
                  (F.style.borderRadius = O.borderRadius),
                  (F.style.fontFamily = '"' + O.fontFamily + '", ' + kt),
                  O.rtl &&
                    (F.setAttribute("dir", "rtl"),
                    F.classList.add("nx-rtl-on")),
                  (F.style.display = "flex"),
                  (F.style.flexWrap = "wrap"),
                  (F.style.flexDirection = "column"),
                  (F.style.alignItems = "center"),
                  (F.style.justifyContent = "center");
                var ce = "",
                  Se = !0 === O.backOverlayClickToClose;
                O.backOverlay &&
                  (ce =
                    '<div class="' +
                    O.className +
                    "-overlay" +
                    (O.cssAnimation ? " nx-with-animation" : "") +
                    (Se ? " nx-report-click-to-close" : "") +
                    '" style="background:' +
                    (ee.backOverlayColor || O.backOverlayColor) +
                    ";animation-duration:" +
                    O.cssAnimationDuration +
                    'ms;"></div>');
                var Fe = "";
                if (
                  (h === ct_Success
                    ? (Fe = (function (h, g) {
                        return (
                          h || (h = "110px"),
                          g || (g = "#32c682"),
                          '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportSuccess" width="' +
                            h +
                            '" height="' +
                            h +
                            '" fill="' +
                            g +
                            '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportSuccess1-animation{0%{-webkit-transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px)}50%,to{-webkit-transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px)}60%{-webkit-transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px)}}@keyframes NXReportSuccess1-animation{0%{-webkit-transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px)}50%,to{-webkit-transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px)}60%{-webkit-transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px)}}@-webkit-keyframes NXReportSuccess4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportSuccess4-animation{0%{opacity:0}50%,to{opacity:1}}@-webkit-keyframes NXReportSuccess3-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportSuccess3-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportSuccess2-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportSuccess2-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}#NXReportSuccess *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportSuccess2-animation;animation-name:NXReportSuccess2-animation;-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)"><path d="M60 115.38C29.46 115.38 4.62 90.54 4.62 60 4.62 29.46 29.46 4.62 60 4.62c30.54 0 55.38 24.84 55.38 55.38 0 30.54-24.84 55.38-55.38 55.38zM60 0C26.92 0 0 26.92 0 60s26.92 60 60 60 60-26.92 60-60S93.08 0 60 0z" style="-webkit-animation-name:NXReportSuccess3-animation;animation-name:NXReportSuccess3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportSuccess1-animation;animation-name:NXReportSuccess1-animation;-webkit-transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px);-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)"><path d="M88.27 35.39L52.8 75.29 31.43 58.2c-.98-.81-2.44-.63-3.24.36-.79.99-.63 2.44.36 3.24l23.08 18.46c.43.34.93.51 1.44.51.64 0 1.27-.26 1.74-.78l36.91-41.53a2.3 2.3 0 0 0-.19-3.26c-.95-.86-2.41-.77-3.26.19z" style="-webkit-animation-name:NXReportSuccess4-animation;animation-name:NXReportSuccess4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>'
                        );
                      })(O.svgSize, ee.svgColor))
                    : h === ct_Failure
                    ? (Fe = (function (h, g) {
                        return (
                          h || (h = "110px"),
                          g || (g = "#ff5549"),
                          '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportFailure" width="' +
                            h +
                            '" height="' +
                            h +
                            '" fill="' +
                            g +
                            '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportFailure2-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportFailure2-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportFailure1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportFailure1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportFailure3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportFailure3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportFailure4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportFailure4-animation{0%{opacity:0}50%,to{opacity:1}}#NXReportFailure *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportFailure1-animation;animation-name:NXReportFailure1-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M4.35 34.95c0-16.82 13.78-30.6 30.6-30.6h50.1c16.82 0 30.6 13.78 30.6 30.6v50.1c0 16.82-13.78 30.6-30.6 30.6h-50.1c-16.82 0-30.6-13.78-30.6-30.6v-50.1zM34.95 120h50.1c19.22 0 34.95-15.73 34.95-34.95v-50.1C120 15.73 104.27 0 85.05 0h-50.1C15.73 0 0 15.73 0 34.95v50.1C0 104.27 15.73 120 34.95 120z" style="-webkit-animation-name:NXReportFailure2-animation;animation-name:NXReportFailure2-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportFailure3-animation;animation-name:NXReportFailure3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M82.4 37.6c-.9-.9-2.37-.9-3.27 0L60 56.73 40.86 37.6a2.306 2.306 0 0 0-3.26 3.26L56.73 60 37.6 79.13c-.9.9-.9 2.37 0 3.27.45.45 1.04.68 1.63.68.59 0 1.18-.23 1.63-.68L60 63.26 79.13 82.4c.45.45 1.05.68 1.64.68.58 0 1.18-.23 1.63-.68.9-.9.9-2.37 0-3.27L63.26 60 82.4 40.86c.9-.91.9-2.36 0-3.26z" style="-webkit-animation-name:NXReportFailure4-animation;animation-name:NXReportFailure4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>'
                        );
                      })(O.svgSize, ee.svgColor))
                    : h === ct_Warning
                    ? (Fe = (function (h, g) {
                        return (
                          h || (h = "110px"),
                          g || (g = "#eebf31"),
                          '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportWarning" width="' +
                            h +
                            '" height="' +
                            h +
                            '" fill="' +
                            g +
                            '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportWarning2-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportWarning2-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportWarning1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportWarning1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportWarning3-animation{0%{-webkit-transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px)}50%,to{-webkit-transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px)}60%{-webkit-transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px)}}@keyframes NXReportWarning3-animation{0%{-webkit-transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px)}50%,to{-webkit-transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px)}60%{-webkit-transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px)}}@-webkit-keyframes NXReportWarning4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportWarning4-animation{0%{opacity:0}50%,to{opacity:1}}#NXReportWarning *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportWarning1-animation;animation-name:NXReportWarning1-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M115.46 106.15l-54.04-93.8c-.61-1.06-2.23-1.06-2.84 0l-54.04 93.8c-.62 1.07.21 2.29 1.42 2.29h108.08c1.21 0 2.04-1.22 1.42-2.29zM65.17 10.2l54.04 93.8c2.28 3.96-.65 8.78-5.17 8.78H5.96c-4.52 0-7.45-4.82-5.17-8.78l54.04-93.8c2.28-3.95 8.03-4 10.34 0z" style="-webkit-animation-name:NXReportWarning2-animation;animation-name:NXReportWarning2-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportWarning3-animation;animation-name:NXReportWarning3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px)"><path d="M57.83 94.01c0 1.2.97 2.17 2.17 2.17s2.17-.97 2.17-2.17v-3.2c0-1.2-.97-2.17-2.17-2.17s-2.17.97-2.17 2.17v3.2zm0-14.15c0 1.2.97 2.17 2.17 2.17s2.17-.97 2.17-2.17V39.21c0-1.2-.97-2.17-2.17-2.17s-2.17.97-2.17 2.17v40.65z" style="-webkit-animation-name:NXReportWarning4-animation;animation-name:NXReportWarning4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>'
                        );
                      })(O.svgSize, ee.svgColor))
                    : h === ct_Info &&
                      (Fe = (function (h, g) {
                        return (
                          h || (h = "110px"),
                          g || (g = "#26c0d3"),
                          '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportInfo" width="' +
                            h +
                            '" height="' +
                            h +
                            '" fill="' +
                            g +
                            '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportInfo4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportInfo4-animation{0%{opacity:0}50%,to{opacity:1}}@-webkit-keyframes NXReportInfo3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportInfo3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportInfo2-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportInfo2-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportInfo1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportInfo1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}#NXReportInfo *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportInfo1-animation;animation-name:NXReportInfo1-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M60 115.38C29.46 115.38 4.62 90.54 4.62 60 4.62 29.46 29.46 4.62 60 4.62c30.54 0 55.38 24.84 55.38 55.38 0 30.54-24.84 55.38-55.38 55.38zM60 0C26.92 0 0 26.92 0 60s26.92 60 60 60 60-26.92 60-60S93.08 0 60 0z" style="-webkit-animation-name:NXReportInfo2-animation;animation-name:NXReportInfo2-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportInfo3-animation;animation-name:NXReportInfo3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M57.75 43.85c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v48.18c0 1.24-1.01 2.25-2.25 2.25s-2.25-1.01-2.25-2.25V43.85zm0-15.88c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v3.32c0 1.25-1.01 2.25-2.25 2.25s-2.25-1-2.25-2.25v-3.32z" style="-webkit-animation-name:NXReportInfo4-animation;animation-name:NXReportInfo4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>'
                        );
                      })(O.svgSize, ee.svgColor)),
                  (F.innerHTML =
                    ce +
                    '<div class="' +
                    O.className +
                    "-content" +
                    (O.cssAnimation ? " nx-with-animation " : "") +
                    " nx-" +
                    O.cssAnimationStyle +
                    '" style="width:' +
                    O.width +
                    "; background:" +
                    O.backgroundColor +
                    "; animation-duration:" +
                    O.cssAnimationDuration +
                    'ms;"><div style="width:' +
                    O.svgSize +
                    "; height:" +
                    O.svgSize +
                    ';" class="' +
                    O.className +
                    '-icon">' +
                    Fe +
                    '</div><h5 class="' +
                    O.className +
                    '-title" style="font-weight:500; font-size:' +
                    O.titleFontSize +
                    "; color:" +
                    ee.titleColor +
                    ';">' +
                    g +
                    '</h5><p class="' +
                    O.className +
                    '-message" style="font-size:' +
                    O.messageFontSize +
                    "; color:" +
                    ee.messageColor +
                    ';">' +
                    v +
                    '</p><a id="NXReportButton" class="' +
                    O.className +
                    '-button" style="font-weight:500; font-size:' +
                    O.buttonFontSize +
                    "; background:" +
                    ee.buttonBackground +
                    "; color:" +
                    ee.buttonColor +
                    ';">' +
                    R +
                    "</a></div>"),
                  !k.document.getElementById(F.id))
                ) {
                  k.document.body.appendChild(F);
                  var Ee = function () {
                    var re = k.document.getElementById(F.id);
                    re.classList.add("nx-remove");
                    var _t = setTimeout(function () {
                      null !== re.parentNode && re.parentNode.removeChild(re),
                        clearTimeout(_t);
                    }, O.cssAnimationDuration);
                  };
                  k.document
                    .getElementById("NXReportButton")
                    .addEventListener("click", function () {
                      "function" == typeof L && L(), Ee();
                    }),
                    ce &&
                      Se &&
                      k.document
                        .querySelector(".nx-report-click-to-close")
                        .addEventListener("click", function () {
                          Ee();
                        });
                }
                O = ne(!0, O, z);
              },
              Ut = function () {
                return '[id^=NotiflixConfirmWrap]{position:fixed;z-index:4003;width:100%;height:100%;left:0;top:0;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box;background:transparent;font-family:"Quicksand",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[id^=NotiflixConfirmWrap].nx-position-center-top{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}[id^=NotiflixConfirmWrap].nx-position-center-bottom{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[id^=NotiflixConfirmWrap].nx-position-left-top{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}[id^=NotiflixConfirmWrap].nx-position-left-center{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}[id^=NotiflixConfirmWrap].nx-position-left-bottom{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[id^=NotiflixConfirmWrap].nx-position-right-top{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}[id^=NotiflixConfirmWrap].nx-position-right-center{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end}[id^=NotiflixConfirmWrap].nx-position-right-bottom{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[id^=NotiflixConfirmWrap] *{-webkit-box-sizing:border-box;box-sizing:border-box}[id^=NotiflixConfirmWrap]>div[class*="-overlay"]{width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,.5);position:fixed;z-index:0}[id^=NotiflixConfirmWrap]>div[class*="-overlay"].nx-with-animation{-webkit-animation:confirm-overlay-animation .3s ease-in-out 0s normal;animation:confirm-overlay-animation .3s ease-in-out 0s normal}@-webkit-keyframes confirm-overlay-animation{0%{opacity:0}100%{opacity:1}}@keyframes confirm-overlay-animation{0%{opacity:0}100%{opacity:1}}[id^=NotiflixConfirmWrap].nx-remove>div[class*="-overlay"].nx-with-animation{opacity:0;-webkit-animation:confirm-overlay-animation-remove .3s ease-in-out 0s normal;animation:confirm-overlay-animation-remove .3s ease-in-out 0s normal}@-webkit-keyframes confirm-overlay-animation-remove{0%{opacity:1}100%{opacity:0}}@keyframes confirm-overlay-animation-remove{0%{opacity:1}100%{opacity:0}}[id^=NotiflixConfirmWrap]>div[class*="-content"]{width:300px;max-width:100%;max-height:96vh;overflow-x:hidden;overflow-y:auto;border-radius:25px;padding:10px;margin:0;-webkit-filter:drop-shadow(0 0 5px rgba(0,0,0,0.05));filter:drop-shadow(0 0 5px rgba(0, 0, 0, .05));background:#f8f8f8;color:#1e1e1e;position:relative;z-index:1;text-align:center}[id^=NotiflixConfirmWrap]>div[class*="-content"]::-webkit-scrollbar{width:0;height:0}[id^=NotiflixConfirmWrap]>div[class*="-content"]::-webkit-scrollbar-thumb{background:transparent}[id^=NotiflixConfirmWrap]>div[class*="-content"]::-webkit-scrollbar-track{background:transparent}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]{float:left;width:100%;text-align:inherit}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>h5{float:left;width:100%;margin:0;padding:0 0 10px;border-bottom:1px solid rgba(0,0,0,.1);color:#32c682;font-family:inherit!important;font-size:16px;line-height:1.4;font-weight:500;text-align:inherit}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>div{font-family:inherit!important;margin:15px 0 20px;padding:0 10px;float:left;width:100%;font-size:14px;line-height:1.4;font-weight:normal;color:inherit;text-align:inherit}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>div>div{font-family:inherit!important;float:left;width:100%;margin:15px 0 0;padding:0}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>div>div>input{font-family:inherit!important;float:left;width:100%;height:40px;margin:0;padding:0 15px;border:1px solid rgba(0,0,0,.1);border-radius:25px;font-size:14px;font-weight:normal;line-height:1;-webkit-transition:all .25s ease-in-out;-o-transition:all .25s ease-in-out;transition:all .25s ease-in-out;text-align:left}[id^=NotiflixConfirmWrap].nx-rtl-on>div[class*="-content"]>div[class*="-head"]>div>div>input{text-align:right}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>div>div>input:hover{border-color:rgba(0,0,0,.1)}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>div>div>input:focus{border-color:rgba(0,0,0,.3)}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>div>div>input.nx-validation-failure{border-color:#ff5549}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-head"]>div>div>input.nx-validation-success{border-color:#32c682}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-buttons"]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:inherit;float:left;width:100%;text-align:inherit}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-buttons"]>a{cursor:pointer;font-family:inherit!important;-webkit-transition:all .25s ease-in-out;-o-transition:all .25s ease-in-out;transition:all .25s ease-in-out;float:left;width:48%;padding:9px 5px;border-radius:inherit!important;font-weight:500;font-size:15px;line-height:1.4;color:#f8f8f8;text-align:inherit}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-buttons"]>a.nx-confirm-button-ok{margin:0 2% 0 0;background:#32c682}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-buttons"]>a.nx-confirm-button-cancel{margin:0 0 0 2%;background:#a9a9a9}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-buttons"]>a.nx-full{margin:0;width:100%}[id^=NotiflixConfirmWrap]>div[class*="-content"]>div[class*="-buttons"]>a:hover{-webkit-box-shadow:inset 0 -60px 5px -5px rgba(0,0,0,.25);box-shadow:inset 0 -60px 5px -5px rgba(0,0,0,.25)}[id^=NotiflixConfirmWrap].nx-rtl-on>div[class*="-content"]>div[class*="-buttons"],[id^=NotiflixConfirmWrap].nx-rtl-on>div[class*="-content"]>div[class*="-buttons"]>a{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}[id^=NotiflixConfirmWrap].nx-with-animation.nx-fade>div[class*="-content"]{-webkit-animation:confirm-animation-fade .3s ease-in-out 0s normal;animation:confirm-animation-fade .3s ease-in-out 0s normal}@-webkit-keyframes confirm-animation-fade{0%{opacity:0}100%{opacity:1}}@keyframes confirm-animation-fade{0%{opacity:0}100%{opacity:1}}[id^=NotiflixConfirmWrap].nx-with-animation.nx-zoom>div[class*="-content"]{-webkit-animation:confirm-animation-zoom .3s ease-in-out 0s normal;animation:confirm-animation-zoom .3s ease-in-out 0s normal}@-webkit-keyframes confirm-animation-zoom{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes confirm-animation-zoom{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}[id^=NotiflixConfirmWrap].nx-with-animation.nx-fade.nx-remove>div[class*="-content"]{opacity:0;-webkit-animation:confirm-animation-fade-remove .3s ease-in-out 0s normal;animation:confirm-animation-fade-remove .3s ease-in-out 0s normal}@-webkit-keyframes confirm-animation-fade-remove{0%{opacity:1}100%{opacity:0}}@keyframes confirm-animation-fade-remove{0%{opacity:1}100%{opacity:0}}[id^=NotiflixConfirmWrap].nx-with-animation.nx-zoom.nx-remove>div[class*="-content"]{opacity:0;-webkit-animation:confirm-animation-zoom-remove .3s ease-in-out 0s normal;animation:confirm-animation-zoom-remove .3s ease-in-out 0s normal}@-webkit-keyframes confirm-animation-zoom-remove{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.5;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@keyframes confirm-animation-zoom-remove{0%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.5;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}';
              },
              $o = function (h, g, v, R, L, Q, z, I, ee) {
                if (!cn("body")) return !1;
                S || Xe.Confirm.init({});
                var F = ne(!0, S, {});
                "object" != typeof ee ||
                  Array.isArray(ee) ||
                  (S = ne(!0, S, ee)),
                  "string" != typeof g && (g = "Notiflix Confirm"),
                  "string" != typeof v && (v = "Do you agree with me?"),
                  "string" != typeof L && (L = "Yes"),
                  "string" != typeof Q && (Q = "No"),
                  "function" != typeof z && (z = void 0),
                  "function" != typeof I && (I = void 0),
                  S.plainText &&
                    ((g = Ue(g)), (v = Ue(v)), (L = Ue(L)), (Q = Ue(Q))),
                  S.plainText ||
                    (g.length > S.titleMaxLength &&
                      ((g = "Possible HTML Tags Error"),
                      (v =
                        'The "plainText" option is "false" and the title content length is more than "titleMaxLength" option.'),
                      (L = "Okay"),
                      (Q = "...")),
                    v.length > S.messageMaxLength &&
                      ((g = "Possible HTML Tags Error"),
                      (v =
                        'The "plainText" option is "false" and the message content length is more than "messageMaxLength" option.'),
                      (L = "Okay"),
                      (Q = "...")),
                    (L.length || Q.length) > S.buttonsMaxLength &&
                      ((g = "Possible HTML Tags Error"),
                      (v =
                        'The "plainText" option is "false" and the buttons content length is more than "buttonsMaxLength" option.'),
                      (L = "Okay"),
                      (Q = "..."))),
                  g.length > S.titleMaxLength &&
                    (g = g.substring(0, S.titleMaxLength) + "..."),
                  v.length > S.messageMaxLength &&
                    (v = v.substring(0, S.messageMaxLength) + "..."),
                  L.length > S.buttonsMaxLength &&
                    (L = L.substring(0, S.buttonsMaxLength) + "..."),
                  Q.length > S.buttonsMaxLength &&
                    (Q = Q.substring(0, S.buttonsMaxLength) + "..."),
                  S.cssAnimation || (S.cssAnimationDuration = 0);
                var ce = k.document.createElement("div");
                (ce.id = cs.ID),
                  (ce.className =
                    S.className +
                    (S.cssAnimation
                      ? " nx-with-animation nx-" + S.cssAnimationStyle
                      : "")),
                  (ce.style.zIndex = S.zindex),
                  (ce.style.padding = S.distance),
                  S.rtl &&
                    (ce.setAttribute("dir", "rtl"),
                    ce.classList.add("nx-rtl-on"));
                var Se =
                  "string" == typeof S.position ? S.position.trim() : "center";
                ce.classList.add("nx-position-" + Se),
                  (ce.style.fontFamily = '"' + S.fontFamily + '", ' + kt);
                var Fe = "";
                S.backOverlay &&
                  (Fe =
                    '<div class="' +
                    S.className +
                    "-overlay" +
                    (S.cssAnimation ? " nx-with-animation" : "") +
                    '" style="background:' +
                    S.backOverlayColor +
                    ";animation-duration:" +
                    S.cssAnimationDuration +
                    'ms;"></div>');
                var Ee = "";
                "function" == typeof z &&
                  (Ee =
                    '<a id="NXConfirmButtonCancel" class="nx-confirm-button-cancel" style="color:' +
                    S.cancelButtonColor +
                    ";background:" +
                    S.cancelButtonBackground +
                    ";font-size:" +
                    S.buttonsFontSize +
                    ';">' +
                    Q +
                    "</a>");
                var X = "",
                  Ne = null,
                  re = void 0;
                if (h === Dt_Ask || h === Dt_Prompt) {
                  Ne = R || "";
                  var _t =
                    h === Dt_Ask || 200 < Ne.length
                      ? Math.ceil(1.5 * Ne.length)
                      : 250;
                  X =
                    '<div><input id="NXConfirmValidationInput" type="text" ' +
                    (h === Dt_Prompt ? 'value="' + Ne + '"' : "") +
                    ' maxlength="' +
                    _t +
                    '" style="font-size:' +
                    S.messageFontSize +
                    ";border-radius: " +
                    S.borderRadius +
                    ';" autocomplete="off" spellcheck="false" autocapitalize="none" /></div>';
                }
                if (
                  ((ce.innerHTML =
                    Fe +
                    '<div class="' +
                    S.className +
                    '-content" style="width:' +
                    S.width +
                    "; background:" +
                    S.backgroundColor +
                    "; animation-duration:" +
                    S.cssAnimationDuration +
                    "ms; border-radius: " +
                    S.borderRadius +
                    ';"><div class="' +
                    S.className +
                    '-head"><h5 style="color:' +
                    S.titleColor +
                    ";font-size:" +
                    S.titleFontSize +
                    ';">' +
                    g +
                    '</h5><div style="color:' +
                    S.messageColor +
                    ";font-size:" +
                    S.messageFontSize +
                    ';">' +
                    v +
                    X +
                    '</div></div><div class="' +
                    S.className +
                    '-buttons"><a id="NXConfirmButtonOk" class="nx-confirm-button-ok' +
                    ("function" == typeof z ? "" : " nx-full") +
                    '" style="color:' +
                    S.okButtonColor +
                    ";background:" +
                    S.okButtonBackground +
                    ";font-size:" +
                    S.buttonsFontSize +
                    ';">' +
                    L +
                    "</a>" +
                    Ee +
                    "</div></div>"),
                  !k.document.getElementById(ce.id))
                ) {
                  k.document.body.appendChild(ce);
                  var Ze = k.document.getElementById(ce.id),
                    Ye = k.document.getElementById("NXConfirmButtonOk"),
                    xe = k.document.getElementById("NXConfirmValidationInput");
                  xe &&
                    (xe.focus(),
                    xe.setSelectionRange(0, (xe.value || "").length),
                    xe.addEventListener("keyup", function (Z) {
                      h === Dt_Ask && Z.target.value !== Ne
                        ? (Z.preventDefault(),
                          xe.classList.add("nx-validation-failure"),
                          xe.classList.remove("nx-validation-success"))
                        : (h === Dt_Ask &&
                            (xe.classList.remove("nx-validation-failure"),
                            xe.classList.add("nx-validation-success")),
                          ("enter" === (Z.key || "").toLocaleLowerCase("en") ||
                            13 === Z.keyCode) &&
                            Ye.dispatchEvent(new Event("click")));
                    })),
                    Ye.addEventListener("click", function (Z) {
                      if (h === Dt_Ask && Ne && xe) {
                        if ((xe.value || "").toString() !== Ne)
                          return (
                            xe.focus(),
                            xe.classList.add("nx-validation-failure"),
                            Z.stopPropagation(),
                            Z.preventDefault(),
                            (Z.returnValue = !1),
                            (Z.cancelBubble = !0),
                            !1
                          );
                        xe.classList.remove("nx-validation-failure");
                      }
                      "function" == typeof z &&
                        (h === Dt_Prompt && xe && (re = xe.value || ""), z(re)),
                        Ze.classList.add("nx-remove");
                      var hr = setTimeout(function () {
                        null !== Ze.parentNode &&
                          (Ze.parentNode.removeChild(Ze), clearTimeout(hr));
                      }, S.cssAnimationDuration);
                    }),
                    "function" == typeof z &&
                      k.document
                        .getElementById("NXConfirmButtonCancel")
                        .addEventListener("click", function () {
                          "function" == typeof I &&
                            (h === Dt_Prompt && xe && (re = xe.value || ""),
                            I(re)),
                            Ze.classList.add("nx-remove");
                          var Z = setTimeout(function () {
                            null !== Ze.parentNode &&
                              (Ze.parentNode.removeChild(Ze), clearTimeout(Z));
                          }, S.cssAnimationDuration);
                        });
                }
                S = ne(!0, S, F);
              },
              Sn = function () {
                return '[id^=NotiflixLoadingWrap]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:fixed;z-index:4000;width:100%;height:100%;left:0;top:0;right:0;bottom:0;margin:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;background:rgba(0,0,0,.8);font-family:"Quicksand",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}[id^=NotiflixLoadingWrap] *{-webkit-box-sizing:border-box;box-sizing:border-box}[id^=NotiflixLoadingWrap].nx-loading-click-to-close{cursor:pointer}[id^=NotiflixLoadingWrap]>div[class*="-icon"]{width:60px;height:60px;position:relative;-webkit-transition:top .2s ease-in-out;-o-transition:top .2s ease-in-out;transition:top .2s ease-in-out;margin:0 auto}[id^=NotiflixLoadingWrap]>div[class*="-icon"] img,[id^=NotiflixLoadingWrap]>div[class*="-icon"] svg{max-width:unset;max-height:unset;width:100%;height:auto;position:absolute;left:0;top:0}[id^=NotiflixLoadingWrap]>p{position:relative;margin:10px auto 0;font-family:inherit!important;font-weight:normal;font-size:15px;line-height:1.4;padding:0 10px;width:100%;text-align:center}[id^=NotiflixLoadingWrap].nx-with-animation{-webkit-animation:loading-animation-fade .3s ease-in-out 0s normal;animation:loading-animation-fade .3s ease-in-out 0s normal}@-webkit-keyframes loading-animation-fade{0%{opacity:0}100%{opacity:1}}@keyframes loading-animation-fade{0%{opacity:0}100%{opacity:1}}[id^=NotiflixLoadingWrap].nx-with-animation.nx-remove{opacity:0;-webkit-animation:loading-animation-fade-remove .3s ease-in-out 0s normal;animation:loading-animation-fade-remove .3s ease-in-out 0s normal}@-webkit-keyframes loading-animation-fade-remove{0%{opacity:1}100%{opacity:0}}@keyframes loading-animation-fade-remove{0%{opacity:1}100%{opacity:0}}[id^=NotiflixLoadingWrap]>p.nx-loading-message-new{-webkit-animation:loading-new-message-fade .3s ease-in-out 0s normal;animation:loading-new-message-fade .3s ease-in-out 0s normal}@-webkit-keyframes loading-new-message-fade{0%{opacity:0}100%{opacity:1}}@keyframes loading-new-message-fade{0%{opacity:0}100%{opacity:1}}';
              },
              Ft = function (h, g, v, R, L) {
                if (!cn("body")) return !1;
                A || Xe.Loading.init({});
                var Q = ne(!0, A, {});
                if (
                  ("object" == typeof g && !Array.isArray(g)) ||
                  ("object" == typeof v && !Array.isArray(v))
                ) {
                  var z = {};
                  "object" == typeof g
                    ? (z = g)
                    : "object" == typeof v && (z = v),
                    (A = ne(!0, A, z));
                }
                var I = "";
                if (("string" == typeof g && 0 < g.length && (I = g), R)) {
                  var ee = "";
                  0 <
                    (I =
                      I.length > A.messageMaxLength
                        ? Ue(I).toString().substring(0, A.messageMaxLength) +
                          "..."
                        : Ue(I).toString()).length &&
                    (ee =
                      '<p id="' +
                      A.messageID +
                      '" class="nx-loading-message" style="color:' +
                      A.messageColor +
                      ";font-size:" +
                      A.messageFontSize +
                      ';">' +
                      I +
                      "</p>"),
                    A.cssAnimation || (A.cssAnimationDuration = 0);
                  var F = "";
                  if (h === Re_Standard) F = Rr(A.svgSize, A.svgColor);
                  else if (h === Re_Hourglass) F = Sl(A.svgSize, A.svgColor);
                  else if (h === Re_Circle) F = Bo(A.svgSize, A.svgColor);
                  else if (h === Re_Arrows) F = Be(A.svgSize, A.svgColor);
                  else if (h === Re_Dots) F = Ho(A.svgSize, A.svgColor);
                  else if (h === Re_Pulse) F = ds(A.svgSize, A.svgColor);
                  else if (
                    h === Re_Custom &&
                    null !== A.customSvgCode &&
                    null === A.customSvgUrl
                  )
                    F = A.customSvgCode || "";
                  else if (
                    h === Re_Custom &&
                    null !== A.customSvgUrl &&
                    null === A.customSvgCode
                  )
                    F =
                      '<img class="nx-custom-loading-icon" width="' +
                      A.svgSize +
                      '" height="' +
                      A.svgSize +
                      '" src="' +
                      A.customSvgUrl +
                      '" alt="Notiflix">';
                  else {
                    if (
                      h === Re_Custom &&
                      (null === A.customSvgUrl || null === A.customSvgCode)
                    )
                      return (
                        rt(
                          'You have to set a static SVG url to "customSvgUrl" option to use Loading Custom.'
                        ),
                        !1
                      );
                    F = (function (h, g, v) {
                      return (
                        h || (h = "60px"),
                        g || (g = "#f8f8f8"),
                        v || (v = "#32c682"),
                        '<svg xmlns="http://www.w3.org/2000/svg" id="NXLoadingNotiflixLib" width="' +
                          h +
                          '" height="' +
                          h +
                          '" viewBox="0 0 200 200"><defs><style>@keyframes notiflix-n{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes notiflix-x{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes notiflix-dot{0%,to{stroke-width:0}50%{stroke-width:12}}.nx-icon-line{stroke:' +
                          g +
                          ';stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22;fill:none}</style></defs><path d="M47.97 135.05a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z" style="animation-name:notiflix-dot;animation-timing-function:ease-in-out;animation-duration:1.25s;animation-iteration-count:infinite;animation-direction:normal" fill="' +
                          v +
                          '" stroke="' +
                          v +
                          '" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22" stroke-width="12"/><path class="nx-icon-line" d="M10.14 144.76V87.55c0-5.68-4.54-41.36 37.83-41.36 42.36 0 37.82 35.68 37.82 41.36v57.21" style="animation-name:notiflix-n;animation-timing-function:linear;animation-duration:2.5s;animation-delay:0s;animation-iteration-count:infinite;animation-direction:normal" stroke-dasharray="500"/><path class="nx-icon-line" d="M115.06 144.49c24.98-32.68 49.96-65.35 74.94-98.03M114.89 46.6c25.09 32.58 50.19 65.17 75.29 97.75" style="animation-name:notiflix-x;animation-timing-function:linear;animation-duration:2.5s;animation-delay:.2s;animation-iteration-count:infinite;animation-direction:normal" stroke-dasharray="500"/></svg>'
                      );
                    })(A.svgSize, "#f8f8f8", "#32c682");
                  }
                  var ce = parseInt((A.svgSize || "").replace(/[^0-9]/g, "")),
                    Se = k.innerWidth,
                    Fe = ce >= Se ? Se - 40 + "px" : ce + "px",
                    Ee =
                      '<div style="width:' +
                      Fe +
                      "; height:" +
                      Fe +
                      ';" class="' +
                      A.className +
                      "-icon" +
                      (0 < I.length ? " nx-with-message" : "") +
                      '">' +
                      F +
                      "</div>",
                    X = k.document.createElement("div");
                  (X.id = Rt.ID),
                    (X.className =
                      A.className +
                      (A.cssAnimation ? " nx-with-animation" : "") +
                      (A.clickToClose ? " nx-loading-click-to-close" : "")),
                    (X.style.zIndex = A.zindex),
                    (X.style.background = A.backgroundColor),
                    (X.style.animationDuration = A.cssAnimationDuration + "ms"),
                    (X.style.fontFamily = '"' + A.fontFamily + '", ' + kt),
                    (X.style.display = "flex"),
                    (X.style.flexWrap = "wrap"),
                    (X.style.flexDirection = "column"),
                    (X.style.alignItems = "center"),
                    (X.style.justifyContent = "center"),
                    A.rtl &&
                      (X.setAttribute("dir", "rtl"),
                      X.classList.add("nx-rtl-on")),
                    (X.innerHTML = Ee + ee),
                    !k.document.getElementById(X.id) &&
                      (k.document.body.appendChild(X), A.clickToClose) &&
                      k.document
                        .getElementById(X.id)
                        .addEventListener("click", function () {
                          X.classList.add("nx-remove");
                          var Pt = setTimeout(function () {
                            null !== X.parentNode &&
                              (X.parentNode.removeChild(X), clearTimeout(Pt));
                          }, A.cssAnimationDuration);
                        });
                } else if (k.document.getElementById(Rt.ID))
                  var re = k.document.getElementById(Rt.ID),
                    _t = setTimeout(function () {
                      re.classList.add("nx-remove");
                      var Pt = setTimeout(function () {
                        null !== re.parentNode &&
                          (re.parentNode.removeChild(re), clearTimeout(Pt));
                      }, A.cssAnimationDuration);
                      clearTimeout(_t);
                    }, L);
                A = ne(!0, A, Q);
              },
              Uo = function () {
                return '[id^=NotiflixBlockWrap]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1000;font-family:"Quicksand",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;background:rgba(255,255,255,.9);text-align:center;animation-duration:.4s;width:100%;height:100%;left:0;top:0;border-radius:inherit;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[id^=NotiflixBlockWrap] *{-webkit-box-sizing:border-box;box-sizing:border-box}[id^=NotiflixBlockWrap]>span[class*="-icon"]{display:block;width:45px;height:45px;position:relative;margin:0 auto}[id^=NotiflixBlockWrap]>span[class*="-icon"] svg{width:inherit;height:inherit}[id^=NotiflixBlockWrap]>span[class*="-message"]{position:relative;display:block;width:100%;margin:10px auto 0;padding:0 10px;font-family:inherit!important;font-weight:normal;font-size:14px;line-height:1.4}[id^=NotiflixBlockWrap].nx-with-animation{-webkit-animation:block-animation-fade .3s ease-in-out 0s normal;animation:block-animation-fade .3s ease-in-out 0s normal}@-webkit-keyframes block-animation-fade{0%{opacity:0}100%{opacity:1}}@keyframes block-animation-fade{0%{opacity:0}100%{opacity:1}}[id^=NotiflixBlockWrap].nx-with-animation.nx-remove{opacity:0;-webkit-animation:block-animation-fade-remove .3s ease-in-out 0s normal;animation:block-animation-fade-remove .3s ease-in-out 0s normal}@-webkit-keyframes block-animation-fade-remove{0%{opacity:1}100%{opacity:0}}@keyframes block-animation-fade-remove{0%{opacity:1}100%{opacity:0}}';
              },
              zo = 0,
              Nn = function (h, g, v, R, L, Q) {
                var z;
                if (Array.isArray(v)) {
                  if (1 > v.length)
                    return (
                      rt(
                        "Array of HTMLElements should contains at least one HTMLElement."
                      ),
                      !1
                    );
                  z = v;
                } else if (
                  Object.prototype.isPrototypeOf.call(NodeList.prototype, v)
                ) {
                  if (1 > v.length)
                    return (
                      rt(
                        "NodeListOf<HTMLElement> should contains at least one HTMLElement."
                      ),
                      !1
                    );
                  z = Array.prototype.slice.call(v);
                } else {
                  if (
                    "string" != typeof v ||
                    1 > (v || "").length ||
                    (1 === (v || "").length &&
                      ("#" === (v || "")[0] || "." === (v || "")[0]))
                  )
                    return (
                      rt(
                        "The selector parameter must be a string and matches a specified CSS selector(s)."
                      ),
                      !1
                    );
                  var ee = k.document.querySelectorAll(v);
                  if (1 > ee.length)
                    return (
                      rt(
                        'You called the "Notiflix.Block..." function with "' +
                          v +
                          '" selector, but there is no such element(s) in the document.'
                      ),
                      !1
                    );
                  z = ee;
                }
                B || Xe.Block.init({});
                var F = ne(!0, B, {});
                if (
                  ("object" == typeof R && !Array.isArray(R)) ||
                  ("object" == typeof L && !Array.isArray(L))
                ) {
                  var ce = {};
                  "object" == typeof R
                    ? (ce = R)
                    : "object" == typeof L && (ce = L),
                    (B = ne(!0, B, ce));
                }
                var Se = "";
                "string" == typeof R && 0 < R.length && (Se = R),
                  B.cssAnimation || (B.cssAnimationDuration = 0);
                var Fe = qn.className;
                "string" == typeof B.className && (Fe = B.className.trim());
                var Ee =
                    "number" == typeof B.querySelectorLimit
                      ? B.querySelectorLimit
                      : 200,
                  X = (z || []).length >= Ee ? Ee : z.length,
                  Ne = "nx-block-temporary-position";
                if (h) {
                  for (
                    var re,
                      _t = [
                        "area",
                        "base",
                        "br",
                        "col",
                        "command",
                        "embed",
                        "hr",
                        "img",
                        "input",
                        "keygen",
                        "link",
                        "meta",
                        "param",
                        "source",
                        "track",
                        "wbr",
                        "html",
                        "head",
                        "title",
                        "script",
                        "style",
                        "iframe",
                      ],
                      Pt = 0;
                    Pt < X;
                    Pt++
                  )
                    if ((re = z[Pt])) {
                      if (-1 < _t.indexOf(re.tagName.toLocaleLowerCase("en")))
                        break;
                      var Ze = re.querySelectorAll("[id^=" + qn.ID + "]");
                      if (1 > Ze.length) {
                        var Ye = "";
                        g &&
                          (Ye =
                            g === nt_Hourglass
                              ? Sl(B.svgSize, B.svgColor)
                              : g === nt_Circle
                              ? Bo(B.svgSize, B.svgColor)
                              : g === nt_Arrows
                              ? Be(B.svgSize, B.svgColor)
                              : g === nt_Dots
                              ? Ho(B.svgSize, B.svgColor)
                              : g === nt_Pulse
                              ? ds(B.svgSize, B.svgColor)
                              : Rr(B.svgSize, B.svgColor));
                        var xe =
                            '<span class="' +
                            Fe +
                            '-icon" style="width:' +
                            B.svgSize +
                            ";height:" +
                            B.svgSize +
                            ';">' +
                            Ye +
                            "</span>",
                          un = "";
                        0 < Se.length &&
                          ((Se =
                            Se.length > B.messageMaxLength
                              ? Ue(Se).substring(0, B.messageMaxLength) + "..."
                              : Ue(Se)),
                          (un =
                            '<span style="font-size:' +
                            B.messageFontSize +
                            ";color:" +
                            B.messageColor +
                            ';" class="' +
                            Fe +
                            '-message">' +
                            Se +
                            "</span>")),
                          zo++;
                        var Z = k.document.createElement("div");
                        (Z.id = qn.ID + "-" + zo),
                          (Z.className =
                            Fe + (B.cssAnimation ? " nx-with-animation" : "")),
                          (Z.style.position = B.position),
                          (Z.style.zIndex = B.zindex),
                          (Z.style.background = B.backgroundColor),
                          (Z.style.animationDuration =
                            B.cssAnimationDuration + "ms"),
                          (Z.style.fontFamily =
                            '"' + B.fontFamily + '", ' + kt),
                          (Z.style.display = "flex"),
                          (Z.style.flexWrap = "wrap"),
                          (Z.style.flexDirection = "column"),
                          (Z.style.alignItems = "center"),
                          (Z.style.justifyContent = "center"),
                          B.rtl &&
                            (Z.setAttribute("dir", "rtl"),
                            Z.classList.add("nx-rtl-on")),
                          (Z.innerHTML = xe + un);
                        var Xn = k
                            .getComputedStyle(re)
                            .getPropertyValue("position"),
                          hr =
                            "string" == typeof Xn
                              ? Xn.toLocaleLowerCase("en")
                              : "relative",
                          fs = Math.round(1.25 * parseInt(B.svgSize)) + 40,
                          ps = "";
                        fs > (re.offsetHeight || 0) &&
                          (ps = "min-height:" + fs + "px;");
                        var Go;
                        Go = re.getAttribute("id")
                          ? "#" + re.getAttribute("id")
                          : re.classList[0]
                          ? "." + re.classList[0]
                          : (re.tagName || "").toLocaleLowerCase("en");
                        var Wo = "",
                          qo =
                            -1 >=
                            ["absolute", "relative", "fixed", "sticky"].indexOf(
                              hr
                            );
                        if (qo || 0 < ps.length) {
                          if (!cn("head")) return !1;
                          qo && (Wo = "position:relative!important;");
                          var hs =
                              '<style id="Style-' +
                              qn.ID +
                              "-" +
                              zo +
                              '">' +
                              Go +
                              "." +
                              Ne +
                              "{" +
                              Wo +
                              ps +
                              "}</style>",
                            Xo = k.document.createRange();
                          Xo.selectNode(k.document.head);
                          var Rl = Xo.createContextualFragment(hs);
                          k.document.head.appendChild(Rl), re.classList.add(Ne);
                        }
                        re.appendChild(Z);
                      }
                    }
                } else
                  var ms = function (ge) {
                      var Ct = setTimeout(function () {
                        null !== ge.parentNode && ge.parentNode.removeChild(ge);
                        var mr = ge.getAttribute("id"),
                          Fr = k.document.getElementById("Style-" + mr);
                        Fr &&
                          null !== Fr.parentNode &&
                          Fr.parentNode.removeChild(Fr),
                          clearTimeout(Ct);
                      }, B.cssAnimationDuration);
                    },
                    gs = function (ge) {
                      if (ge && 0 < ge.length)
                        for (var Ct, mr = 0; mr < ge.length; mr++)
                          (Ct = ge[mr]) &&
                            (Ct.classList.add("nx-remove"), ms(Ct));
                      else
                        !(function (h) {
                          console.log(
                            "%c Notiflix Info ",
                            "padding:2px;border-radius:20px;color:#fff;background:#26c0d3",
                            "\n" + h + Lo
                          );
                        })(
                          "string" == typeof v
                            ? '"Notiflix.Block.remove();" function called with "' +
                                v +
                                '" selector, but this selector does not have a "Block" element to remove.'
                            : '"Notiflix.Block.remove();" function called with "' +
                                v +
                                '", but this "Array<HTMLElement>" or "NodeListOf<HTMLElement>" does not have a "Block" element to remove.'
                        );
                    },
                    ys = function (ge) {
                      var Ct = setTimeout(function () {
                        ge.classList.remove(Ne), clearTimeout(Ct);
                      }, B.cssAnimationDuration + 300);
                    },
                    vs = setTimeout(function () {
                      for (var ge, Ct = 0; Ct < X; Ct++)
                        (ge = z[Ct]) &&
                          (ys(ge),
                          (Ze = ge.querySelectorAll("[id^=" + qn.ID + "]")),
                          gs(Ze));
                      clearTimeout(vs);
                    }, Q);
                B = ne(!0, B, F);
              },
              Xe = {
                Notify: {
                  init: function (h) {
                    (_ = ne(!0, bt, h)), fr(Al, "NotiflixNotifyInternalCSS");
                  },
                  merge: function (h) {
                    return _
                      ? void (_ = ne(!0, _, h))
                      : (rt(
                          "You have to initialize the Notify module before call Merge function."
                        ),
                        !1);
                  },
                  success: function (h, g, v) {
                    pr(Ot_Success, h, g, v);
                  },
                  failure: function (h, g, v) {
                    pr(Ot_Failure, h, g, v);
                  },
                  warning: function (h, g, v) {
                    pr(Ot_Warning, h, g, v);
                  },
                  info: function (h, g, v) {
                    pr(Ot_Info, h, g, v);
                  },
                },
                Report: {
                  init: function (h) {
                    (O = ne(!0, ls, h)), fr(Tl, "NotiflixReportInternalCSS");
                  },
                  merge: function (h) {
                    return O
                      ? void (O = ne(!0, O, h))
                      : (rt(
                          "You have to initialize the Report module before call Merge function."
                        ),
                        !1);
                  },
                  success: function (h, g, v, R, L) {
                    ut(ct_Success, h, g, v, R, L);
                  },
                  failure: function (h, g, v, R, L) {
                    ut(ct_Failure, h, g, v, R, L);
                  },
                  warning: function (h, g, v, R, L) {
                    ut(ct_Warning, h, g, v, R, L);
                  },
                  info: function (h, g, v, R, L) {
                    ut(ct_Info, h, g, v, R, L);
                  },
                },
                Confirm: {
                  init: function (h) {
                    (S = ne(!0, cs, h)), fr(Ut, "NotiflixConfirmInternalCSS");
                  },
                  merge: function (h) {
                    return S
                      ? void (S = ne(!0, S, h))
                      : (rt(
                          "You have to initialize the Confirm module before call Merge function."
                        ),
                        !1);
                  },
                  show: function (h, g, v, R, L, Q, z) {
                    $o(Dt_Show, h, g, null, v, R, L, Q, z);
                  },
                  ask: function (h, g, v, R, L, Q, z, I) {
                    $o(Dt_Ask, h, g, v, R, L, Q, z, I);
                  },
                  prompt: function (h, g, v, R, L, Q, z, I) {
                    $o(Dt_Prompt, h, g, v, R, L, Q, z, I);
                  },
                },
                Loading: {
                  init: function (h) {
                    (A = ne(!0, Rt, h)), fr(Sn, "NotiflixLoadingInternalCSS");
                  },
                  merge: function (h) {
                    return A
                      ? void (A = ne(!0, A, h))
                      : (rt(
                          "You have to initialize the Loading module before call Merge function."
                        ),
                        !1);
                  },
                  standard: function (h, g) {
                    Ft(Re_Standard, h, g, !0, 0);
                  },
                  hourglass: function (h, g) {
                    Ft(Re_Hourglass, h, g, !0, 0);
                  },
                  circle: function (h, g) {
                    Ft(Re_Circle, h, g, !0, 0);
                  },
                  arrows: function (h, g) {
                    Ft(Re_Arrows, h, g, !0, 0);
                  },
                  dots: function (h, g) {
                    Ft(Re_Dots, h, g, !0, 0);
                  },
                  pulse: function (h, g) {
                    Ft(Re_Pulse, h, g, !0, 0);
                  },
                  custom: function (h, g) {
                    Ft(Re_Custom, h, g, !0, 0);
                  },
                  notiflix: function (h, g) {
                    Ft(Re_Notiflix, h, g, !0, 0);
                  },
                  remove: function (h) {
                    "number" != typeof h && (h = 0),
                      Ft(null, null, null, !1, h);
                  },
                  change: function (h) {
                    !(function (h) {
                      "string" != typeof h && (h = "");
                      var g = k.document.getElementById(Rt.ID);
                      if (g)
                        if (0 < h.length) {
                          h =
                            h.length > A.messageMaxLength
                              ? Ue(h).substring(0, A.messageMaxLength) + "..."
                              : Ue(h);
                          var v = g.getElementsByTagName("p")[0];
                          if (v) v.innerHTML = h;
                          else {
                            var R = k.document.createElement("p");
                            (R.id = A.messageID),
                              (R.className =
                                "nx-loading-message nx-loading-message-new"),
                              (R.style.color = A.messageColor),
                              (R.style.fontSize = A.messageFontSize),
                              (R.innerHTML = h),
                              g.appendChild(R);
                          }
                        } else rt("Where is the new message?");
                    })(h);
                  },
                },
                Block: {
                  init: function (h) {
                    (B = ne(!0, qn, h)), fr(Uo, "NotiflixBlockInternalCSS");
                  },
                  merge: function (h) {
                    return B
                      ? void (B = ne(!0, B, h))
                      : (rt(
                          'You have to initialize the "Notiflix.Block" module before call Merge function.'
                        ),
                        !1);
                  },
                  standard: function (h, g, v) {
                    Nn(!0, nt_Standard, h, g, v);
                  },
                  hourglass: function (h, g, v) {
                    Nn(!0, nt_Hourglass, h, g, v);
                  },
                  circle: function (h, g, v) {
                    Nn(!0, nt_Circle, h, g, v);
                  },
                  arrows: function (h, g, v) {
                    Nn(!0, nt_Arrows, h, g, v);
                  },
                  dots: function (h, g, v) {
                    Nn(!0, nt_Dots, h, g, v);
                  },
                  pulse: function (h, g, v) {
                    Nn(!0, nt_Pulse, h, g, v);
                  },
                  remove: function (h, g) {
                    "number" != typeof g && (g = 0),
                      Nn(!1, null, h, null, null, g);
                  },
                },
              };
            return "object" == typeof k.Notiflix
              ? ne(!0, k.Notiflix, {
                  Notify: Xe.Notify,
                  Report: Xe.Report,
                  Confirm: Xe.Confirm,
                  Loading: Xe.Loading,
                  Block: Xe.Block,
                })
              : {
                  Notify: Xe.Notify,
                  Report: Xe.Report,
                  Confirm: Xe.Confirm,
                  Loading: Xe.Loading,
                  Block: Xe.Block,
                };
          })(k);
        }.apply(as, [])),
        void 0 !== me && (Fo.exports = me);
    },
  },
  (Fo) => {
    Fo((Fo.s = 35));
  },
]);
