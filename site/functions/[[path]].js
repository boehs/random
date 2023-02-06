import { easeCubicInOut } from 'd3-ease';
import require$$7 from 'events';
import require$$0$1 from 'math-codegen';

var manifest = {
	"/*404": [
	{
		type: "script",
		href: "/assets/_...404_.c89500b1.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	},
	{
		type: "script",
		href: "/assets/EmOMG.cb5098d9.js"
	}
],
	"/": [
	{
		type: "script",
		href: "/assets/index.10e845f2.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	},
	{
		type: "script",
		href: "/assets/EmOMG.cb5098d9.js"
	},
	{
		type: "script",
		href: "/assets/_...404_.c89500b1.js"
	}
],
	"/test/plot": [
	{
		type: "script",
		href: "/assets/plot.0b7e3123.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	}
],
	"/tomfoolery/passwordSuggestions": [
	{
		type: "script",
		href: "/assets/passwordSuggestions.a0572afd.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	},
	{
		type: "script",
		href: "/assets/EmOMG.cb5098d9.js"
	}
],
	"/tools/tt/cl": [
	{
		type: "script",
		href: "/assets/cl.ce6c26a5.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	}
],
	"/sch/10/ma/pow/4": [
	{
		type: "script",
		href: "/assets/4.266abe6a.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	}
],
	"/sch/10/ma/pow/": [
	{
		type: "script",
		href: "/assets/index.ac097979.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	},
	{
		type: "script",
		href: "/assets/4.266abe6a.js"
	},
	{
		type: "style",
		href: "/assets/index.5d8bbc0a.css"
	}
],
	"entry-client": [
	{
		type: "script",
		href: "/assets/entry-client.dbfa8cef.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.7199a62b.css"
	}
],
	"index.html": [
]
};

const ERROR = Symbol("error");
const BRANCH = Symbol("branch");
function castError(err) {
  if (err instanceof Error || typeof err === "string") return err;
  return new Error("Unknown error");
}
function handleError(err) {
  err = castError(err);
  const fns = lookup(Owner, ERROR);
  if (!fns) throw err;
  for (const f of fns) f(err);
}
const UNOWNED = {
  context: null,
  owner: null
};
let Owner = null;
function createRoot(fn, detachedOwner) {
  detachedOwner && (Owner = detachedOwner);
  const owner = Owner,
    root = fn.length === 0 ? UNOWNED : {
      context: null,
      owner
    };
  Owner = root;
  let result;
  try {
    result = fn(() => {});
  } catch (err) {
    handleError(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
function createComputed(fn, value) {
  Owner = {
    owner: Owner,
    context: null
  };
  try {
    fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
const createRenderEffect = createComputed;
function createMemo(fn, value) {
  Owner = {
    owner: Owner,
    context: null
  };
  let v;
  try {
    v = fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
  return () => v;
}
function batch(fn) {
  return fn();
}
const untrack = batch;
function on(deps, fn, options = {}) {
  const isArray = Array.isArray(deps);
  const defer = options.defer;
  return () => {
    if (defer) return undefined;
    let value;
    if (isArray) {
      value = [];
      for (let i = 0; i < deps.length; i++) value.push(deps[i]());
    } else value = deps();
    return fn(value);
  };
}
function onCleanup(fn) {
  let node;
  if (Owner && (node = lookup(Owner, BRANCH))) {
    if (!node.cleanups) node.cleanups = [fn];else node.cleanups.push(fn);
  }
  return fn;
}
function cleanNode(node) {
  if (node.cleanups) {
    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = undefined;
  }
}
function onError(fn) {
  if (Owner) {
    if (Owner.context === null) Owner.context = {
      [ERROR]: [fn]
    };else if (!Owner.context[ERROR]) Owner.context[ERROR] = [fn];else Owner.context[ERROR].push(fn);
  }
}
function createContext(defaultValue) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let ctx;
  return (ctx = lookup(Owner, context.id)) !== undefined ? ctx : context.defaultValue;
}
function getOwner() {
  return Owner;
}
function children$1(fn) {
  const memo = createMemo(() => resolveChildren(fn()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  Owner = o;
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
  }
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== undefined ? owner.context[key] : lookup(owner.owner, key) : undefined;
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}
function createProvider(id) {
  return function provider(props) {
    return createMemo(() => {
      Owner.context = {
        [id]: props.value
      };
      return children$1(() => props.children);
    });
  };
}

function resolveSSRNode$1(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode$1(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode$1(node());
  return String(node);
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createUniqueId() {
  const ctx = sharedConfig.context;
  if (!ctx) throw new Error(`createUniqueId cannot be used under non-hydrating context`);
  return `${ctx.id}${ctx.count++}`;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function mergeProps(...sources) {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i = sources.length - 1; i >= 0; i--) {
              let s = sources[i] || {};
              if (typeof s === "function") s = s();
              const v = s[key];
              if (v !== undefined) return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  const descriptors = Object.getOwnPropertyDescriptors(props),
    split = k => {
      const clone = {};
      for (let i = 0; i < k.length; i++) {
        const key = k[i];
        if (descriptors[key]) {
          Object.defineProperty(clone, key, descriptors[key]);
          delete descriptors[key];
        }
      }
      return clone;
    };
  return keys.map(split).concat(split(Object.keys(descriptors)));
}
function simpleMap(props, wrap) {
  const list = props.each || [],
    len = list.length,
    fn = props.children;
  if (len) {
    let mapped = Array(len);
    for (let i = 0; i < len; i++) mapped[i] = wrap(fn, list[i], i);
    return mapped;
  }
  return props.fallback;
}
function For(props) {
  return simpleMap(props, (fn, item, i) => fn(item, () => i));
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.when) : c : props.fallback || "";
}
function ErrorBoundary$1(props) {
  let error,
    res,
    clean,
    sync = true;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  function displayFallback() {
    cleanNode(clean);
    ctx.writeResource(id, error, true);
    setHydrateContext({
      ...ctx,
      count: 0
    });
    const f = props.fallback;
    return typeof f === "function" && f.length ? f(error, () => {}) : f;
  }
  onError(err => {
    error = err;
    !sync && ctx.replace("e" + id, displayFallback);
    sync = true;
  });
  onCleanup(() => cleanNode(clean));
  createMemo(() => {
    Owner.context = {
      [BRANCH]: clean = {}
    };
    return res = props.children;
  });
  if (error) return displayFallback();
  sync = false;
  return {
    t: `<!e${id}>${resolveSSRNode$1(res)}<!/e${id}>`
  };
}
const SuspenseContext = createContext();
let resourceContext = null;
function createResource(source, fetcher, options = {}) {
  if (arguments.length === 2) {
    if (typeof fetcher === "object") {
      options = fetcher;
      fetcher = source;
      source = true;
    }
  } else if (arguments.length === 1) {
    fetcher = source;
    source = true;
  }
  const contexts = new Set();
  const id = sharedConfig.context.id + sharedConfig.context.count++;
  let resource = {};
  let value = options.storage ? options.storage(options.initialValue)[0]() : options.initialValue;
  let p;
  let error;
  if (sharedConfig.context.async && options.ssrLoadFrom !== "initial") {
    resource = sharedConfig.context.resources[id] || (sharedConfig.context.resources[id] = {});
    if (resource.ref) {
      if (!resource.data && !resource.ref[0].loading && !resource.ref[0].error) resource.ref[1].refetch();
      return resource.ref;
    }
  }
  const read = () => {
    if (error) throw error;
    if (resourceContext && p) resourceContext.push(p);
    const resolved = options.ssrLoadFrom !== "initial" && sharedConfig.context.async && "data" in sharedConfig.context.resources[id];
    if (!resolved && read.loading) {
      const ctx = useContext(SuspenseContext);
      if (ctx) {
        ctx.resources.set(id, read);
        contexts.add(ctx);
      }
    }
    return resolved ? sharedConfig.context.resources[id].data : value;
  };
  read.loading = false;
  read.error = undefined;
  read.state = "initialValue" in options ? "resolved" : "unresolved";
  Object.defineProperty(read, "latest", {
    get() {
      return read();
    }
  });
  function load() {
    const ctx = sharedConfig.context;
    if (!ctx.async) return read.loading = !!(typeof source === "function" ? source() : source);
    if (ctx.resources && id in ctx.resources && "data" in ctx.resources[id]) {
      value = ctx.resources[id].data;
      return;
    }
    resourceContext = [];
    const lookup = typeof source === "function" ? source() : source;
    if (resourceContext.length) {
      p = Promise.all(resourceContext).then(() => fetcher(source(), {
        value
      }));
    }
    resourceContext = null;
    if (!p) {
      if (lookup == null || lookup === false) return;
      p = fetcher(lookup, {
        value
      });
    }
    if (p != undefined && typeof p === "object" && "then" in p) {
      read.loading = true;
      read.state = "pending";
      if (ctx.writeResource) ctx.writeResource(id, p, undefined, options.deferStream);
      return p.then(res => {
        read.loading = false;
        read.state = "resolved";
        ctx.resources[id].data = res;
        p = null;
        notifySuspense(contexts);
        return res;
      }).catch(err => {
        read.loading = false;
        read.state = "errored";
        read.error = error = castError(err);
        p = null;
        notifySuspense(contexts);
      });
    }
    ctx.resources[id].data = p;
    if (ctx.writeResource) ctx.writeResource(id, p);
    p = null;
    return ctx.resources[id].data;
  }
  if (options.ssrLoadFrom !== "initial") load();
  return resource.ref = [read, {
    refetch: load,
    mutate: v => value = v
  }];
}
function suspenseComplete(c) {
  for (const r of c.resources.values()) {
    if (r.loading) return false;
  }
  return true;
}
function notifySuspense(contexts) {
  for (const c of contexts) {
    if (!suspenseComplete(c)) {
      continue;
    }
    c.completed();
    contexts.delete(c);
  }
}
function startTransition(fn) {
  fn();
}
function Suspense(props) {
  let done;
  let clean;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  const o = Owner;
  if (o) {
    if (o.context) o.context[BRANCH] = clean = {};else o.context = {
      [BRANCH]: clean = {}
    };
  }
  const value = ctx.suspense[id] || (ctx.suspense[id] = {
    resources: new Map(),
    completed: () => {
      const res = runSuspense();
      if (suspenseComplete(value)) {
        done(resolveSSRNode$1(res));
      }
    }
  });
  function runSuspense() {
    setHydrateContext({
      ...ctx,
      count: 0
    });
    return runWithOwner(o, () => {
      return createComponent(SuspenseContext.Provider, {
        value,
        get children() {
          clean && cleanNode(clean);
          return props.children;
        }
      });
    });
  }
  const res = runSuspense();
  if (suspenseComplete(value)) return res;
  onError(err => {
    if (!done || !done(undefined, err)) {
      if (o) runWithOwner(o.owner, () => {
        throw err;
      });else throw err;
    }
  });
  done = ctx.async ? ctx.registerFragment(id) : undefined;
  if (ctx.async) {
    setHydrateContext({
      ...ctx,
      count: 0,
      id: ctx.id + "0.f",
      noHydrate: true
    });
    const res = {
      t: `<template id="pl-${id}"></template>${resolveSSRNode$1(props.fallback)}<!pl-${id}>`
    };
    setHydrateContext(ctx);
    return res;
  }
  setHydrateContext({
    ...ctx,
    count: 0,
    id: ctx.id + "0.f"
  });
  ctx.writeResource(id, "$$f");
  return props.fallback;
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const BooleanAttributes = /*#__PURE__*/new Set(booleans);
/*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /*#__PURE__*/Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
});

const {
  hasOwnProperty
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push(")");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}

const REPLACE_SCRIPT = `function $df(e,t,n,o,d){if(n=document.getElementById(e),o=document.getElementById("pl-"+e)){for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)d=o.nextSibling,o.remove(),o=d;o.replaceWith(n.content)}n.remove(),_$HY.set(e,t),_$HY.fe(e)}`;
function renderToStringAsync(code, options = {}) {
  const {
    timeoutMs = 30000
  } = options;
  let timeoutHandle;
  const timeout = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
  });
  return Promise.race([renderToStream(code, options), timeout]).then(html => {
    clearTimeout(timeoutHandle);
    return html;
  });
}
function renderToStream(code, options = {}) {
  let {
    nonce,
    onCompleteShell,
    onCompleteAll,
    renderId
  } = options;
  const blockingResources = [];
  const registry = new Map();
  const dedupe = new WeakMap();
  const checkEnd = () => {
    if (!registry.size && !completed) {
      writeTasks();
      onCompleteAll && onCompleteAll({
        write(v) {
          !completed && buffer.write(v);
        }
      });
      writable && writable.end();
      completed = true;
    }
  };
  const pushTask = task => {
    tasks += task + ";";
    if (!scheduled && firstFlushed) {
      Promise.resolve().then(writeTasks);
      scheduled = true;
    }
  };
  const writeTasks = () => {
    if (tasks.length && !completed && firstFlushed) {
      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
      tasks = "";
    }
    scheduled = false;
  };
  let context;
  let writable;
  let tmp = "";
  let tasks = "";
  let firstFlushed = false;
  let completed = false;
  let scriptFlushed = false;
  let scheduled = true;
  let buffer = {
    write(payload) {
      tmp += payload;
    }
  };
  sharedConfig.context = context = {
    id: renderId || "",
    count: 0,
    async: true,
    resources: {},
    lazy: {},
    suspense: {},
    assets: [],
    nonce,
    block(p) {
      if (!firstFlushed) blockingResources.push(p);
    },
    replace(id, payloadFn) {
      if (firstFlushed) return;
      const placeholder = `<!${id}>`;
      const first = html.indexOf(placeholder);
      if (first === -1) return;
      const last = html.indexOf(`<!/${id}>`, first + placeholder.length);
      html = html.replace(html.slice(first, last + placeholder.length + 1), resolveSSRNode(payloadFn()));
    },
    writeResource(id, p, error, wait) {
      const serverOnly = sharedConfig.context.noHydrate;
      if (error) return !serverOnly && pushTask(serializeSet(dedupe, id, p, serializeError));
      if (!p || typeof p !== "object" || !("then" in p)) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
      if (!firstFlushed) wait && blockingResources.push(p);else !serverOnly && pushTask(`_$HY.init("${id}")`);
      if (serverOnly) return;
      p.then(d => {
        !completed && pushTask(serializeSet(dedupe, id, d));
      }).catch(() => {
        !completed && pushTask(`_$HY.set("${id}", {})`);
      });
    },
    registerFragment(key) {
      if (!registry.has(key)) {
        registry.set(key, []);
        firstFlushed && pushTask(`_$HY.init("${key}")`);
      }
      return (value, error) => {
        if (registry.has(key)) {
          const keys = registry.get(key);
          registry.delete(key);
          if (waitForFragments(registry, key)) return;
          if ((value !== undefined || error) && !completed) {
            if (!firstFlushed) {
              Promise.resolve().then(() => html = replacePlaceholder(html, key, value !== undefined ? value : ""));
              error && pushTask(serializeSet(dedupe, key, error, serializeError));
            } else {
              buffer.write(`<template id="${key}">${value !== undefined ? value : " "}</template>`);
              pushTask(`${keys.length ? keys.map(k => `_$HY.unset("${k}")`).join(";") + ";" : ""}$df("${key}"${error ? "," + serializeError(error) : ""})${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
              scriptFlushed = true;
            }
          }
        }
        if (!registry.size) Promise.resolve().then(checkEnd);
        return firstFlushed;
      };
    }
  };
  let html = resolveSSRNode(escape(code()));
  function doShell() {
    sharedConfig.context = context;
    context.noHydrate = true;
    html = injectAssets(context.assets, html);
    for (const key in context.resources) {
      if (!("data" in context.resources[key] || context.resources[key].ref[0].error)) pushTask(`_$HY.init("${key}")`);
    }
    for (const key of registry.keys()) pushTask(`_$HY.init("${key}")`);
    if (tasks.length) html = injectScripts(html, tasks, nonce);
    buffer.write(html);
    tasks = "";
    scheduled = false;
    onCompleteShell && onCompleteShell({
      write(v) {
        !completed && buffer.write(v);
      }
    });
  }
  return {
    then(fn) {
      function complete() {
        doShell();
        fn(tmp);
      }
      if (onCompleteAll) {
        ogComplete = onCompleteAll;
        onCompleteAll = options => {
          ogComplete(options);
          complete();
        };
      } else onCompleteAll = complete;
      if (!registry.size) Promise.resolve().then(checkEnd);
    },
    pipe(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        buffer = writable = w;
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    },
    pipeTo(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        const encoder = new TextEncoder();
        const writer = w.getWriter();
        writable = {
          end() {
            writer.releaseLock();
            w.close();
          }
        };
        buffer = {
          write(payload) {
            writer.write(encoder.encode(payload));
          }
        };
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    }
  };
}
function HydrationScript(props) {
  const {
    nonce
  } = sharedConfig.context;
  return ssr(generateHydrationScript({
    nonce,
    ...props
  }));
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrClassList(value) {
  if (!value) return "";
  let classKeys = Object.keys(value),
    result = "";
  for (let i = 0, len = classKeys.length; i < len; i++) {
    const key = classKeys[i],
      classValue = !!value[key];
    if (!key || key === "undefined" || !classValue) continue;
    i && (result += " ");
    result += key;
  }
  return result;
}
function ssrStyle(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  let result = "";
  const k = Object.keys(value);
  for (let i = 0; i < k.length; i++) {
    const s = k[i];
    const v = value[s];
    if (v != undefined) {
      if (i) result += ";";
      result += `${s}:${escape(v, true)}`;
    }
  }
  return result;
}
function ssrElement(tag, props, children, needsId) {
  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
  if (props == null) props = {};else if (typeof props === "function") props = props();
  const keys = Object.keys(props);
  let classResolved;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    if (ChildProperties.has(prop)) {
      if (children === undefined) children = prop === "innerHTML" ? props[prop] : escape(props[prop]);
      continue;
    }
    const value = props[prop];
    if (prop === "style") {
      result += `style="${ssrStyle(value)}"`;
    } else if (prop === "class" || prop === "className" || prop === "classList") {
      if (classResolved) continue;
      let n;
      result += `class="${(n = props.class) ? n + " " : ""}${(n = props.className) ? n + " " : ""}${ssrClassList(props.classList)}"`;
      classResolved = true;
    } else if (BooleanAttributes.has(prop)) {
      if (value) result += prop;else continue;
    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on") {
      continue;
    } else {
      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
    }
    if (i !== keys.length - 1) result += " ";
  }
  return {
    t: result + `>${resolveSSRNode(children)}</${tag}>`
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (!attr && Array.isArray(s)) {
      let r = "";
      for (let i = 0; i < s.length; i++) r += resolveSSRNode(escape(s[i], attr));
      return {
        t: r
      };
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function useAssets(fn) {
  sharedConfig.context.assets.push(() => resolveSSRNode(fn()));
}
function generateHydrationScript({
  eventNames = ["click", "input"],
  nonce
} = {}) {
  return `<script${nonce ? ` nonce="${nonce}"` : ""}>(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host instanceof Node?e.host:e.parentNode));["${eventNames.join('", "')}"].forEach((o=>document.addEventListener(o,(o=>{let s=o.composedPath&&o.composedPath()[0]||o.target,a=t(s);a&&!e.completed.has(a)&&e.events.push([a,o])}))))})(window._$HY||(_$HY={events:[],completed:new WeakSet,r:{},fe(){},init(e,t){_$HY.r[e]=[new Promise((e=>t=e)),t]},set(e,t,o){(o=_$HY.r[e])&&o[1](t),_$HY.r[e]=[t]},unset(e){delete _$HY.r[e]},load:e=>_$HY.r[e]}));</script><!--xs-->`;
}
function NoHydration(props) {
  sharedConfig.context.noHydrate = true;
  return props.children;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}
function waitForFragments(registry, key) {
  for (const k of [...registry.keys()].reverse()) {
    if (key.startsWith(k)) {
      registry.get(k).push(key);
      return true;
    }
  }
  return false;
}
function serializeSet(registry, key, value, serializer = stringify) {
  const exist = registry.get(value);
  if (exist) return `_$HY.set("${key}", _$HY.r["${exist}"][0])`;
  value !== null && typeof value === "object" && registry.set(value, key);
  return `_$HY.set("${key}", ${serializer(value)})`;
}
function replacePlaceholder(html, key, value) {
  const marker = `<template id="pl-${key}">`;
  const close = `<!pl-${key}>`;
  const first = html.indexOf(marker);
  if (first === -1) return html;
  const last = html.indexOf(close, first + marker.length);
  return html.slice(0, first) + value + html.slice(last + close.length);
}

const isServer = true;

// src/index.ts
function createContextProvider(factoryFn, defaults) {
  const ctx = createContext(defaults);
  const Provider = (props) => {
    return createComponent(ctx.Provider, {
      value: factoryFn(props),
      get children() {
        return props.children;
      }
    });
  };
  const useProvider = () => useContext(ctx);
  return [Provider, useProvider];
}

function isWrappable(obj) {
  return obj != null && typeof obj === "object" && (Object.getPrototypeOf(obj) === Object.prototype || Array.isArray(obj));
}
function setProperty(state, property, value, force) {
  if (!force && state[property] === value) return;
  if (value === undefined) {
    delete state[property];
  } else state[property] = value;
}
function mergeStoreNode(state, value, force) {
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    setProperty(state, key, value[key], force);
  }
}
function updateArray(current, next) {
  if (typeof next === "function") next = next(current);
  if (Array.isArray(next)) {
    if (current === next) return;
    let i = 0,
      len = next.length;
    for (; i < len; i++) {
      const value = next[i];
      if (current[i] !== value) setProperty(current, i, value);
    }
    setProperty(current, "length", len);
  } else mergeStoreNode(current, next);
}
function updatePath(current, path, traversed = []) {
  let part,
    next = current;
  if (path.length > 1) {
    part = path.shift();
    const partType = typeof part,
      isArray = Array.isArray(current);
    if (Array.isArray(part)) {
      for (let i = 0; i < part.length; i++) {
        updatePath(current, [part[i]].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "function") {
      for (let i = 0; i < current.length; i++) {
        if (part(current[i], i)) updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "object") {
      const {
        from = 0,
        to = current.length - 1,
        by = 1
      } = part;
      for (let i = from; i <= to; i += by) {
        updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (path.length > 1) {
      updatePath(current[part], path, [part].concat(traversed));
      return;
    }
    next = current[part];
    traversed = [part].concat(traversed);
  }
  let value = path[0];
  if (typeof value === "function") {
    value = value(next, traversed);
    if (value === next) return;
  }
  if (part === undefined && value == undefined) return;
  if (part === undefined || isWrappable(next) && isWrappable(value) && !Array.isArray(value)) {
    mergeStoreNode(next, value);
  } else setProperty(current, part, value);
}
function createStore(state) {
  const isArray = Array.isArray(state);
  function setStore(...args) {
    isArray && args.length === 1 ? updateArray(state, args[0]) : updatePath(state, args);
  }
  return [state, setStore];
}

const FETCH_EVENT = "$FETCH";

function getRouteMatches$1(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}

let apiRoutes$1;
const registerApiRoutes = (routes) => {
  apiRoutes$1 = routes;
};
async function internalFetch(route, init) {
  if (route.startsWith("http")) {
    return await fetch(route, init);
  }
  let url = new URL(route, "http://internal");
  const request = new Request(url.href, init);
  const handler = getRouteMatches$1(apiRoutes$1, url.pathname, request.method.toUpperCase());
  if (!handler) {
    throw new Error(`No handler found for ${request.method} ${request.url}`);
  }
  let apiEvent = Object.freeze({
    request,
    params: handler.params,
    clientAddress: "127.0.0.1",
    env: {},
    locals: {},
    $type: FETCH_EVENT,
    fetch: internalFetch
  });
  const response = await handler.handler(apiEvent);
  return response;
}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
function redirect(url, init = 302) {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  if (url === "") {
    url = "/";
  }
  let headers = new Headers(responseInit.headers);
  headers.set(LocationHeader, url);
  const response = new Response(null, {
    ...responseInit,
    headers
  });
  return response;
}
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  status;
  headers;
  name = "ResponseError";
  ok;
  statusText;
  redirected;
  url;
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  response;
  type;
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  bodyUsed;
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}

const api = [
  {
    GET: "skip",
    path: "/*404"
  },
  {
    GET: "skip",
    path: "/"
  },
  {
    GET: "skip",
    path: "/test/plot"
  },
  {
    GET: "skip",
    path: "/tomfoolery/passwordSuggestions"
  },
  {
    GET: "skip",
    path: "/tools/tt/cl"
  },
  {
    GET: "skip",
    path: "/sch/10/ma/pow/4"
  },
  {
    GET: "skip",
    path: "/sch/10/ma/pow/"
  }
];
function expandOptionals$1(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match)
    return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals$1(suffix).reduce(
    (results, expansion) => [...results, ...prefixes.map((p) => p + expansion)],
    []
  );
}
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = route.path.endsWith("/") ? 4 : 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
const allRoutes = api.flatMap((route) => {
  const paths = expandOptionals$1(route.path);
  return paths.map((path) => ({ ...route, path }));
}).map(routeToMatchRoute).sort((a, b) => b.score - a.score);
registerApiRoutes(allRoutes);
function getApiHandler(url, method) {
  return getRouteMatches$1(allRoutes, url.pathname, method.toUpperCase());
}

const apiRoutes = ({ forward }) => {
  return async (event) => {
    let apiHandler = getApiHandler(new URL(event.request.url), event.request.method);
    if (apiHandler) {
      let apiEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        params: apiHandler.params,
        env: event.env,
        $type: FETCH_EVENT,
        fetch: internalFetch
      });
      try {
        return await apiHandler.handler(apiEvent);
      } catch (error) {
        if (error instanceof Response) {
          return error;
        }
        return new Response(JSON.stringify(error), {
          status: 500
        });
      }
    }
    return await forward(event);
  };
};
function normalizeIntegration(integration) {
    if (!integration) {
        return {
            signal: createSignal({ value: "" })
        };
    }
    else if (Array.isArray(integration)) {
        return {
            signal: integration
        };
    }
    return integration;
}
function staticIntegration(obj) {
    return {
        signal: [() => obj, next => Object.assign(obj, next)]
    };
}

function createBeforeLeave() {
    let listeners = new Set();
    function subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    let ignore = false;
    function confirm(to, options) {
        if (ignore)
            return !(ignore = false);
        const e = {
            to,
            options,
            defaultPrevented: false,
            preventDefault: () => (e.defaultPrevented = true)
        };
        for (const l of listeners)
            l.listener({
                ...e,
                from: l.location,
                retry: (force) => {
                    force && (ignore = true);
                    l.navigate(to, options);
                }
            });
        return !e.defaultPrevented;
    }
    return {
        subscribe,
        confirm
    };
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|\/+$/g;
function normalizePath(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalizePath(base);
    const fromPath = from && normalizePath(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
function createMatcher(path, partial, matchFilters) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        const matchFilter = (s) => matchFilters === undefined ? undefined : matchFilters[s];
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            const key = segment[0] === ":" ? segment.slice(1) : segment;
            if (segment[0] === ":" && matchSegment(locSegment, matchFilter(key))) {
                match.params[key] = locSegment;
            }
            else if (!matchSegment(locSegment, segment)) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
            if (matchSegment(remainder, matchFilter(splat))) {
                match.params[splat] = remainder;
            }
            else {
                return null;
            }
        }
        return match;
    };
}
function matchSegment(input, filter) {
    const isEqual = (s) => s.localeCompare(input, undefined, { sensitivity: "base" }) === 0;
    if (filter === undefined) {
        return true;
    }
    else if (typeof filter === "string") {
        return isEqual(filter);
    }
    else if (typeof filter === "function") {
        return filter(input);
    }
    else if (Array.isArray(filter)) {
        return filter.some(isEqual);
    }
    else if (filter instanceof RegExp) {
        return filter.test(input);
    }
    return false;
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
const useResolvedPath = (path) => {
    const route = useRoute();
    return createMemo(() => route.resolvePath(path()));
};
const useHref = (to) => {
    const router = useRouter();
    return createMemo(() => {
        const to_ = to();
        return to_ !== undefined ? router.renderPath(to_) : to_;
    });
};
const useLocation$1 = () => useRouter().location;
const useRouteData = () => useRoute().data;
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createLocation(path, state) {
    const origin = new URL("http://sar");
    const url = createMemo(prev => {
        const path_ = path();
        try {
            return new URL(path_, origin);
        }
        catch (err) {
            console.error(`Invalid path ${path_}`);
            return prev;
        }
    }, origin);
    const pathname = createMemo(() => url().pathname);
    const search = createMemo(() => url().search, true);
    const hash = createMemo(() => url().hash);
    const key = createMemo(() => "");
    return {
        get pathname() {
            return pathname();
        },
        get search() {
            return search();
        },
        get hash() {
            return hash();
        },
        get state() {
            return state();
        },
        get key() {
            return key();
        },
        query: createMemoObject(on(search, () => extractSearchParams(url())))
    };
}
function createRouterContext(integration, base = "", data, out) {
    const { signal: [source, setSource], utils = {} } = normalizeIntegration(integration);
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const beforeLeave = utils.beforeLeave || createBeforeLeave();
    const basePath = resolvePath("", base);
    const output = out
        ? Object.assign(out, {
            matches: [],
            url: undefined
        })
        : undefined;
    if (basePath === undefined) {
        throw new Error(`${basePath} is not a valid base path`);
    }
    else if (basePath && !source().value) {
        setSource({ value: basePath, replace: true, scroll: false });
    }
    const [isRouting, setIsRouting] = createSignal(false);
    const start = async (callback) => {
        setIsRouting(true);
        try {
            await startTransition(callback);
        }
        finally {
            setIsRouting(false);
        }
    };
    const [reference, setReference] = createSignal(source().value);
    const [state, setState] = createSignal(source().state);
    const location = createLocation(reference, state);
    const referrers = [];
    const baseRoute = {
        pattern: basePath,
        params: {},
        path: () => basePath,
        outlet: () => null,
        resolvePath(to) {
            return resolvePath(basePath, to);
        }
    };
    if (data) {
        try {
            TempRoute = baseRoute;
            baseRoute.data = data({
                data: undefined,
                params: {},
                location,
                navigate: navigatorFactory(baseRoute)
            });
        }
        finally {
            TempRoute = undefined;
        }
    }
    function navigateFromRoute(route, to, options) {
        // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
        untrack(() => {
            if (typeof to === "number") {
                if (!to) ;
                else if (utils.go) {
                    beforeLeave.confirm(to, options) && utils.go(to);
                }
                else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const { replace, resolve, scroll, state: nextState } = {
                replace: false,
                resolve: true,
                scroll: true,
                ...options
            };
            const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
            if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
            }
            else if (referrers.length >= MAX_REDIRECTS) {
                throw new Error("Too many redirects");
            }
            const current = reference();
            if (resolvedTo !== current || nextState !== state()) {
                {
                    if (output) {
                        output.url = resolvedTo;
                    }
                    setSource({ value: resolvedTo, replace, scroll, state: nextState });
                }
            }
        });
    }
    function navigatorFactory(route) {
        // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
        route = route || useContext(RouteContextObj) || baseRoute;
        return (to, options) => navigateFromRoute(route, to, options);
    }
    createRenderEffect(() => {
        const { value, state } = source();
        // Untrack this whole block so `start` doesn't cause Solid's Listener to be preserved
        untrack(() => {
            if (value !== reference()) {
                start(() => {
                    setReference(value);
                    setState(state);
                });
            }
        });
    });
    return {
        base: baseRoute,
        out: output,
        location,
        isRouting,
        renderPath,
        parsePath,
        navigatorFactory,
        beforeLeave
    };
}
function createRouteContext(router, parent, child, match, params) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const Router = props => {
  const {
    source,
    url,
    base,
    data,
    out
  } = props;
  const integration = source || (staticIntegration({
    value: url || ""
  }) );
  const routerState = createRouterContext(integration, base, data, out);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return props.children;
    }
  });
};
const Routes$1 = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children$1(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches(branches(), router.location.pathname));
  const params = createMemoObject(() => {
    const m = matches();
    const params = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params, m[i].params);
    }
    return params;
  });
  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i], params);
        });
      }
    }
    disposers.splice(nextMatches.length).forEach(dispose => dispose());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createComponent(Show, {
    get when() {
      return routeStates() && root;
    },
    children: route => createComponent(RouteContextObj.Provider, {
      value: route,
      get children() {
        return route.outlet();
      }
    })
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent(Show, {
    get when() {
      return route.child;
    },
    children: child => createComponent(RouteContextObj.Provider, {
      value: child,
      get children() {
        return child.outlet();
      }
    })
  });
};
function A$2(props) {
  props = mergeProps({
    inactiveClass: "inactive",
    activeClass: "active"
  }, props);
  const [, rest] = splitProps(props, ["href", "state", "class", "activeClass", "inactiveClass", "end"]);
  const to = useResolvedPath(() => props.href);
  const href = useHref(to);
  const location = useLocation$1();
  const isActive = createMemo(() => {
    const to_ = to();
    if (to_ === undefined) return false;
    const path = normalizePath(to_.split(/[?#]/, 1)[0]).toLowerCase();
    const loc = normalizePath(location.pathname).toLowerCase();
    return props.end ? path === loc : loc.startsWith(path);
  });
  return ssrElement("a", mergeProps({
    link: true
  }, rest, {
    get href() {
      return href() || props.href;
    },
    get state() {
      return JSON.stringify(props.state);
    },
    get classList() {
      return {
        ...(props.class && {
          [props.class]: true
        }),
        [props.inactiveClass]: !isActive(),
        [props.activeClass]: isActive(),
        ...rest.classList
      };
    },
    get ["aria-current"]() {
      return isActive() ? "page" : undefined;
    }
  }), undefined, true);
}

class ServerError extends Error {
  constructor(message, {
    status,
    stack
  } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status || 400;
    if (stack) {
      this.stack = stack;
    }
  }
}
class FormError extends ServerError {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message, {
      stack
    });
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;
  }
}

const ServerContext = createContext({});

const A$1 = A$2;
const Routes = Routes$1;
const useLocation = useLocation$1;

const server$ = (_fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(event) {
  let request = event.request;
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.clone().formData();
      args = [formData, event];
    }
  }
  return [name, args];
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        statusText: "Redirected",
        headers
      });
    } else if (data.status === 101) {
      return data;
    } else {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(data.body, {
        status: data.status,
        statusText: data.statusText,
        headers
      });
    }
  } else if (data instanceof FormError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: "",
          formError: data.formError,
          fields: data.fields,
          fieldErrors: data.fieldErrors
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "form-error"
        }
      }
    );
  } else if (data instanceof ServerError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: ""
        }
      }),
      {
        status: data.status,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "server-error"
        }
      }
    );
  } else if (data instanceof Error) {
    console.error(data);
    return new Response(
      JSON.stringify({
        error: {
          message: "Internal Server Error",
          stack: "",
          status: data.status
        }
      }),
      {
        status: data.status || 500,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "error"
        }
      }
    );
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}
async function handleServerRequest(event) {
  const url = new URL(event.request.url);
  if (server$.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(event);
      let handler = server$.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(event, ...Array.isArray(args) ? args : [args]);
      return respondWith(event.request, data, "return");
    } catch (error) {
      return respondWith(event.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server$.createHandler = (_fn, hash, serverResource) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object") {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        return serverResource ? _fn.call(ctx, args[0], ctx) : _fn.call(ctx, ...args);
      } catch (e) {
        if (e instanceof Error && /[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(
            e.message + "\n You probably are using a variable defined in a closure in your server function."
          );
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server$.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server$.getHandler = function(route) {
  return handlers.get(route);
};
server$.hasHandler = function(route) {
  return handlers.has(route);
};
server$.fetch = internalFetch;

const inlineServerFunctions = ({ forward }) => {
  return async (event) => {
    const url = new URL(event.request.url);
    if (server$.hasHandler(url.pathname)) {
      let contentType = event.request.headers.get(ContentTypeHeader);
      let origin = event.request.headers.get(XSolidStartOrigin);
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = event.request.body.tee();
        formRequestBody = new Request(event.request.url, {
          body: read2,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
        event.request = new Request(event.request.url, {
          body: read1,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
      }
      let serverFunctionEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        fetch: internalFetch,
        $type: FETCH_EVENT,
        env: event.env
      });
      const serverResponse = await handleServerRequest(serverFunctionEvent);
      let responseContentType = serverResponse.headers.get(XSolidStartContentTypeHeader);
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(event.request.headers.get("referer") || "").pathname + "?form=" + encodeURIComponent(
              JSON.stringify({
                url: url.pathname,
                entries,
                ...await serverResponse.json()
              })
            )
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(event);
    return response;
  };
};

function renderAsync(fn, options) {
  return () => apiRoutes({
    forward: inlineServerFunctions({
      async forward(event) {
        let pageEvent = createPageEvent(event);
        let markup = await renderToStringAsync(() => fn(pageEvent), options);
        if (pageEvent.routerContext && pageEvent.routerContext.url) {
          return redirect(pageEvent.routerContext.url, {
            headers: pageEvent.responseHeaders
          });
        }
        markup = handleIslandsRouting(pageEvent, markup);
        return new Response(markup, {
          status: pageEvent.getStatusCode(),
          headers: pageEvent.responseHeaders
        });
      }
    })
  });
}
function createPageEvent(event) {
  let responseHeaders = new Headers({
    "Content-Type": "text/html"
  });
  const prevPath = event.request.headers.get("x-solid-referrer");
  let statusCode = 200;
  function setStatusCode(code) {
    statusCode = code;
  }
  function getStatusCode() {
    return statusCode;
  }
  const pageEvent = Object.freeze({
    request: event.request,
    prevUrl: prevPath || "",
    routerContext: {},
    tags: [],
    env: event.env,
    clientAddress: event.clientAddress,
    locals: event.locals,
    $type: FETCH_EVENT,
    responseHeaders,
    setStatusCode,
    getStatusCode,
    fetch: internalFetch
  });
  return pageEvent;
}
function handleIslandsRouting(pageEvent, markup) {
  return markup;
}

const MetaContext = createContext();
const cascadingTags = ["title", "meta"];
const getTagType = tag => tag.tag + (tag.name ? `.${tag.name}"` : "");
const MetaProvider = props => {
  const cascadedTagInstances = new Map();
  const actions = {
    addClientTag: tag => {
      let tagType = getTagType(tag);
      if (cascadingTags.indexOf(tag.tag) !== -1) {
        //  only cascading tags need to be kept as singletons
        if (!cascadedTagInstances.has(tagType)) {
          cascadedTagInstances.set(tagType, []);
        }
        let instances = cascadedTagInstances.get(tagType);
        let index = instances.length;
        instances = [...instances, tag];
        // track indices synchronously
        cascadedTagInstances.set(tagType, instances);
        return index;
      }
      return -1;
    },
    removeClientTag: (tag, index) => {
      const tagName = getTagType(tag);
      if (tag.ref) {
        const t = cascadedTagInstances.get(tagName);
        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }
          t[index] = null;
          cascadedTagInstances.set(tagName, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };
  {
    actions.addServerTag = tagDesc => {
      const {
        tags = []
      } = props;
      // tweak only cascading tags
      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const index = tags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagDesc.props.name || tagDesc.props.property;
          return prev.tag === tagDesc.tag && prevName === nextName;
        });
        if (index !== -1) {
          tags.splice(index, 1);
        }
      }
      tags.push(tagDesc);
    };
    if (Array.isArray(props.tags) === false) {
      throw Error("tags array should be passed to <MetaProvider /> in node");
    }
  }
  return createComponent(MetaContext.Provider, {
    value: actions,
    get children() {
      return props.children;
    }
  });
};
const MetaTag = (tag, props) => {
  const id = createUniqueId();
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  useHead({
    tag,
    props,
    id,
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const {
    addClientTag,
    removeClientTag,
    addServerTag
  } = useContext(MetaContext);
  createRenderEffect(() => {
    if (!isServer) ;
  });
  {
    addServerTag(tagDesc);
    return null;
  }
}
function renderTags(tags) {
  return tags.map(tag => {
    const keys = Object.keys(tag.props);
    const props = keys.map(k => k === "children" ? "" : ` ${k}="${tag.props[k]}"`).join("");
    return tag.props.children ? `<${tag.tag} data-sm="${tag.id}"${props}>${
    // Tags might contain multiple text children:
    //   <Title>example - {myCompany}</Title>
    Array.isArray(tag.props.children) ? tag.props.children.join("") : tag.props.children}</${tag.tag}>` : `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = props => MetaTag("title", props);
const Meta$1 = props => MetaTag("meta", props);
const Link = props => MetaTag("link", props);

const _tmpl$$d = ["<div", " style=\"", "\"><div style=\"", "\"><p style=\"", "\" id=\"error-message\">", "</p><button id=\"reset-errors\" style=\"", "\">Clear errors and retry</button><pre style=\"", "\">", "</pre></div></div>"];
function ErrorBoundary(props) {
  return createComponent(ErrorBoundary$1, {
    fallback: (e, reset) => {
      return createComponent(Show, {
        get when() {
          return !props.fallback;
        },
        get fallback() {
          return props.fallback && props.fallback(e, reset);
        },
        get children() {
          return createComponent(ErrorMessage, {
            error: e
          });
        }
      });
    },
    get children() {
      return props.children;
    }
  });
}
function ErrorMessage(props) {
  return ssr(_tmpl$$d, ssrHydrationKey(), "padding:" + "16px", "background-color:" + "rgba(252, 165, 165)" + (";color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";overflow:" + "scroll") + (";padding:" + "16px") + (";margin-bottom:" + "8px"), "font-weight:" + "bold", escape(props.error.message), "color:" + "rgba(252, 165, 165)" + (";background-color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";padding:" + "4px 8px"), "margin-top:" + "8px" + (";width:" + "100%"), escape(props.error.stack));
}

const routeLayouts = {
  "/*404": {
    "id": "/*404",
    "layouts": []
  },
  "/": {
    "id": "/",
    "layouts": []
  },
  "/test/plot": {
    "id": "/test/plot",
    "layouts": []
  },
  "/tomfoolery/passwordSuggestions": {
    "id": "/tomfoolery/passwordSuggestions",
    "layouts": []
  },
  "/tools/tt/cl": {
    "id": "/tools/tt/cl",
    "layouts": []
  },
  "/sch/10/ma/pow/4": {
    "id": "/sch/10/ma/pow/4",
    "layouts": []
  },
  "/sch/10/ma/pow/": {
    "id": "/sch/10/ma/pow/",
    "layouts": []
  }
};

const _tmpl$$c = ["<link", " rel=\"stylesheet\"", ">"],
  _tmpl$2$9 = ["<link", " rel=\"modulepreload\"", ">"];
function flattenIslands(match, manifest) {
  let result = [...match];
  match.forEach(m => {
    if (m.type !== "island") return;
    const islandManifest = manifest[m.href];
    if (islandManifest) {
      const res = flattenIslands(islandManifest.assets, manifest);
      result.push(...res);
    }
  });
  return result;
}
function getAssetsFromManifest(manifest, routerContext) {
  let match = routerContext.matches ? routerContext.matches.reduce((memo, m) => {
    if (m.length) {
      const fullPath = m.reduce((previous, match) => previous + match.originalPath, "");
      const route = routeLayouts[fullPath];
      if (route) {
        memo.push(...(manifest[route.id] || []));
        const layoutsManifestEntries = route.layouts.flatMap(manifestKey => manifest[manifestKey] || []);
        memo.push(...layoutsManifestEntries);
      }
    }
    return memo;
  }, []) : [];
  match.push(...(manifest["entry-client"] || []));
  match = manifest ? flattenIslands(match, manifest) : [];
  const links = match.reduce((r, src) => {
    r[src.href] = src.type === "style" ? ssr(_tmpl$$c, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : src.type === "script" ? ssr(_tmpl$2$9, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : undefined;
    return r;
  }, {});
  return Object.values(links);
}

/**
 * Links are used to load assets for the server rendered HTML
 * @returns {JSXElement}
 */
function Links() {
  const context = useContext(ServerContext);
  useAssets(() => getAssetsFromManifest(context.env.manifest, context.routerContext));
  return null;
}

function Meta() {
  const context = useContext(ServerContext);
  // @ts-expect-error The ssr() types do not match the Assets child types
  useAssets(() => ssr(renderTags(context.tags)));
  return null;
}

const _tmpl$4$3 = ["<script", " type=\"module\" async", "></script>"];
const isDev = "production" === "development";
const isIslands = false;
function Scripts() {
  const context = useContext(ServerContext);
  return [createComponent(HydrationScript, {}), isIslands , createComponent(NoHydration, {
    get children() {
      return (      ssr(_tmpl$4$3, ssrHydrationKey(), ssrAttribute("src", escape(context.env.manifest["entry-client"][0].href, true), false)) );
    }
  }), isDev ];
}

function Html(props) {
  {
    return ssrElement("html", props, undefined, false);
  }
}
function Head(props) {
  {
    return ssrElement("head", props, () => [props.children, createComponent(Meta, {}), createComponent(Links, {})], false);
  }
}
function Body(props) {
  {
    return ssrElement("body", props, () => props.children , false);
  }
}

function HttpStatusCode(props) {
  const context = useContext(ServerContext);
  {
    context.setStatusCode(props.code);
  }
  onCleanup(() => {
    {
      context.setStatusCode(200);
    }
  });
  return null;
}

const _tmpl$$b = ["<i", " class=\"emoji\"><img", "></i>"];
function EmOMG(props) {
  let emoji = props.src || props.giphy ? `https://media.giphy.com/media/${props.giphy}/giphy.gif` : props.kym ? `https://i.kym-cdn.com/photos/images/newsfeed/${props.kym}.jpg` : false;
  return ssr(_tmpl$$b, ssrHydrationKey(), ssrAttribute("src", escape(emoji, true), false) + ssrAttribute("alt", escape(props.alt, true), false));
}

const _tmpl$$a = ["<span", "><!--#-->", "<!--/--><!--#-->", "<!--/--></span>"];
function Plural(props) {
  return ssr(_tmpl$$a, ssrHydrationKey(), escape(props.children), props.i != 1 ? 's' : '');
}

const routeMf = {
  tomfoolery: {
    description: "What it is on the tin. Dumb things.",
    children: {
      passwordSuggestions: {
        description: "You ever get tired of entering your password?"
      }
    }
  }
};

const _tmpl$$9 = ["<b", ">", "</b>"],
  _tmpl$2$8 = ["<p", ">On second thought... Maybe hold that breath in.</p>"],
  _tmpl$3$5 = ["<p", ">On a more chearful note, this is your age represented by waddling ducks.</p>"],
  _tmpl$4$2 = ["<div", " style=\"", "\">", "</div>"],
  _tmpl$5$2 = ["<main", " style=\"", "\"><!--#-->", "<!--/--><!--#-->", "<!--/--><h1>Nothing Here.</h1><p>Calm Down. Breath. Give me personal information. <!--#-->", "<!--/--></p><div class=\"toolbar\"><input type=\"number\" min=\"0\" placeholder=\"I am this many years old\"><p class=\"chip\" style=\"", "\">", "</p></div><!--#-->", "<!--/--><!--#-->", "<!--/--></main>"],
  _tmpl$6$1 = ["<span", " style=\"", "\">", "</span>"],
  _tmpl$7$1 = ["<h2", ">Today's your lucky day</h2>"],
  _tmpl$8$1 = ["<p", ">We found these matching subroutes</p>"],
  _tmpl$9$1 = ["<ul", " class=\"list\">", "</ul>"],
  _tmpl$10$1 = ["<span", "><!--#-->", "<!--/-->:</span>"],
  _tmpl$11 = ["<i", ">", "</i>"],
  _tmpl$12 = ["<li", ">", "</li>"];
function NotFound() {
  const breathsPerMinute = 16;
  const [age, setAge] = createSignal();
  const yearsLeft = () => age() ? 78 - age() : 78;
  const seconds = useSecondsHere() || (() => 0);
  const remainingBreaths = () => breathsPerMinute * 60 * 24 * 360 * yearsLeft() - seconds();
  return ssr(_tmpl$5$2, ssrHydrationKey(), "animation:" + "var(--ani)", escape(createComponent(Title, {
    children: "Not Found"
  })), escape(createComponent(HttpStatusCode, {
    code: 404
  })), escape(createComponent(EmOMG, {
    giphy: "1xkdvKuSi51k74BwTc",
    alt: "gimme"
  })), "flex-grow:" + "2", escape(createComponent(Show, {
    get when() {
      return remainingBreaths() > 0 && seconds() != undefined;
    },
    fallback: 'You should be dead. Why are you not dead. Go die.',
    get children() {
      return ["Since visiting, you have taken\xA0", ssr(_tmpl$$9, ssrHydrationKey(), escape(seconds())), "\xA0", createComponent(Plural, {
        get i() {
          return seconds();
        },
        children: "breath"
      }), createComponent(Show, {
        get when() {
          return age();
        },
        get children() {
          return [", and hence have\xA0", ssr(_tmpl$$9, ssrHydrationKey(), escape(remainingBreaths())), "\xA0breaths left."];
        }
      })];
    }
  })), escape(createComponent(Show, {
    get when() {
      return age();
    },
    get children() {
      return [ssr(_tmpl$2$8, ssrHydrationKey()), ssr(_tmpl$3$5, ssrHydrationKey()), ssr(_tmpl$4$2, ssrHydrationKey(), "display:" + "flex" + (";flex-wrap:" + "wrap") + (";font-size:" + "50px"), escape(createComponent(For, {
        get each() {
          return Array(age());
        },
        children: duck => ssr(_tmpl$6$1, ssrHydrationKey(), "animation:" + "zoom 0.3s ease-in-out;", escape(createComponent(EmOMG, {
          giphy: "rtRflhLVzbNWU",
          alt: "duck"
        })))
      })))];
    }
  })), escape(createComponent(FourOFolder, {})));
}
function FourOFolder(props) {
  console.log(useLocation().pathname);
  const routeChildren = useLocation().pathname.split('/').slice(1).reduce((o, i) => {
    return o != false ? (i == '' ? o : o[i]) || false : false;
  }, routeMf);
  return [createComponent(Show, {
    get when() {
      return !props.hideMsg && routeChildren;
    },
    get children() {
      return [ssr(_tmpl$7$1, ssrHydrationKey()), ssr(_tmpl$8$1, ssrHydrationKey())];
    }
  }), ssr(_tmpl$9$1, ssrHydrationKey(), escape(createComponent(For, {
    get each() {
      return Object.entries(routeChildren ? routeChildren.children ? routeChildren.children : routeChildren : []);
    },
    children: ([loc, bd]) => ssr(_tmpl$12, ssrHydrationKey(), escape(createComponent(A$1, {
      "class": "sbt",
      get href() {
        return useLocation().pathname == '/' ? loc : useLocation().pathname + '/' + loc;
      },
      get children() {
        return [ssr(_tmpl$10$1, ssrHydrationKey(), escape(loc)), " ", ssr(_tmpl$11, ssrHydrationKey(), escape(bd.description))];
      }
    })))
  })))];
}

const _tmpl$$8 = ["<main", "><!--#-->", "<!--/--><h1>Hello Hello, Welcome Home!!!</h1><p>I use this as a playground to test <!--#-->", "<!--/--> various ideas.</p><img src=\"https://media.tenor.com/hAlpXvNEQM0AAAAd/bull-dog-dog.gif\"><blockquote>Wherever you go, go with all your heart</blockquote><div style=\"", "\">", "</div><!--#-->", "<!--/--></main>"],
  _tmpl$2$7 = ["<img", " src=\"", "\" class=\"no\">"];
function Home() {
  return ssr(_tmpl$$8, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Ahoy!"
  })), escape(createComponent(EmOMG, {
    kym: "000/234/765/b7e"
  })), "display:" + "flex" + (";gap:" + "5px"), escape(createComponent(For, {
    each: ["archlinux", 'bvwe', 'masto', 'leaveaol', 'sucks', 'web3', 'webpassion'],
    children: gif => ssr(_tmpl$2$7, ssrHydrationKey(), `/buttons/${escape(gif, true)}.gif`)
  })), escape(createComponent(FourOFolder, {
    hideMsg: true
  })));
}

const _tmpl$$7 = ["<div", " style=\"", "\"><div style=\"", "\">", "</div><div class=\"notrans\"", "></div></div>"],
  _tmpl$2$6 = ["<h2", ">$$<!--#-->", "<!--/-->$$</h2>"];
function Graph(props) {
  const id = (Math.random() + 1).toString(36).substring(7);
  return [createComponent(Link, {
    rel: "stylesheet",
    href: "https://latex.now.sh/prism/prism.css"
  }), ssr(_tmpl$$7, ssrHydrationKey(), "display:" + "grid" + (";grid-template-columns:" + "2fr 3fr") + (";width:" + "100%"), "background-color:" + "whitesmoke" + (";border-radius:" + "5px"), escape(createComponent(For, {
    get each() {
      return props.data;
    },
    children: (data, i) => ssr(_tmpl$2$6, ssrHydrationKey(), escape(data.fn))
  })), ssrAttribute("id", escape(id, true), false))];
}

function Plot() {
  return createComponent(Graph, {
    data: [{
      fn: 'x^2'
    }]
  });
}

function routeData() {
  const sl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/';
  const passwordEndpoint = sl + 'Passwords/Common-Credentials/10-million-password-list-top-10000.txt';
  const [passwords] = createResource(async () => (await (await fetch(passwordEndpoint)).text()).split('\n'));
  const usernameEndpoint = sl + 'Usernames/Honeypot-Captures/multiplesources-users-fabian-fingerle.de.txt';
  const [usernames] = createResource(async () => (await (await fetch(usernameEndpoint)).text()).split('\n').slice(250));
  return {
    passwords,
    usernames
  };
}

const _tmpl$$6 = ["<h1", ">Welcome to ACME!</h1>"],
  _tmpl$2$5 = ["<main", "><div class=\"toolbar\" style=\"", "\"><div style=\"", "\"></div><div><h2>Login with to you'res ACME account!</h2><form style=\"", "\"><input type=\"text\" placeholder=\"username\" list=\"usernames\" value=\"jeff@bank.com\"><input type=\"text\" style=\"-webkit-text-security: disc\" list=\"passwords\" placeholder=\"password go here!\"><input type=\"submit\" value=\"Login\"></form><datalist id=\"usernames\">", "</datalist><datalist id=\"passwords\">", "</datalist></div></div><h2>Some notes <!--#-->", "<!--/--></h2><details><summary>Click me!</summary><p>Ok so first, this doesn't work on firefox <!--#-->", "<!--/-->. Well it does, but the best part, the little password ... that sell the illusion are missing.</p><p>This is a quick little hack inspired by the fact that the HTML spec allows password fields to have suggestions provided by <code>&lt;datalist/></code></p><p>As far as I'm aware, <b>no browser</b> supports this in actual password inputs, for good reason. For this example, I use <code>-webkit-text-security: disc</code> to make a normal input look like a password field. This really is just an excellent example of where it makes sense to disregard a spec.</p><p>Some thanks/stuff/etc</p><ul><li><a href=\"https://github.com/danielmiessler/SecLists/\">danielmiessler's SecLists</a>&nbsp;for \"donating\" the usernames and passwords of this site's very real users</li><li><a href=\"https://demo.agektmr.com/datalist/\">agektmr.com's datalist examples</a>&nbsp;for real uses for <code>&lt;datalist/></code></li><li><a href=\"https://noppa.github.io/text-security.html\">this</a> incredibly stupid polyfill that would \"fix\" firefox if I wasn't lazy.</li></ul></details></main>"],
  _tmpl$3$4 = ["<option", ">", "</option>"];
function PasswordSuggestions() {
  const {
    passwords,
    usernames
  } = useRouteData();
  return [ssr(_tmpl$$6, ssrHydrationKey()), ssr(_tmpl$2$5, ssrHydrationKey(), "height:" + "500px" + (";gap:" + "30px") + (";align-items:" + "center"), "background:" + "url('https://media.istockphoto.com/id/486378867/photo/silhouette-of-a-man-at-the-airport-with-suitcase.jpg?s=2048x2048&amp;w=is&amp;k=20&amp;c=gRzHi5IGTv0ceMlqW9S-N3xXgFYolglfl_A-tDhEsQs='" + (";background-size:" + "cover") + (";background-position:" + "right") + (";border-radius:" + "5px") + (";height:" + "100%"), "display:" + "flex" + (";flex-direction:" + "column") + (";gap:" + "5px"), escape(createComponent(For, {
    get each() {
      return usernames();
    },
    children: username => ssr(_tmpl$3$4, ssrHydrationKey(), escape(username))
  })), escape(createComponent(For, {
    get each() {
      return passwords();
    },
    children: password => ssr(_tmpl$3$4, ssrHydrationKey(), escape(password))
  })), escape(createComponent(EmOMG, {
    giphy: "VbnUQpnihPSIgIXuZv",
    alt: "A cat with glasses!"
  })), escape(createComponent(EmOMG, {
    giphy: "fvM5D7vFoACAM",
    alt: "Firefox doge."
  })))];
}

const _tmpl$$5 = ["<div", " class=\"toolbar\"><div><ul>", "</ul><input type=\"text\" list=\"students\" id=\"", "\"><button>Create Rule</button></div></div>"],
  _tmpl$2$4 = ["<li", "><span style=\"", "\"><!--#-->", "<!--/--> <button>x</button></span></li>"],
  _tmpl$3$3 = ["<h1", ">Class list</h1>"],
  _tmpl$4$1 = ["<div", " class=\"toolbar\" style=\"", "\"><div><h2>Students</h2><p>Enter a comma seperated list of students</p><textarea style=\"", "\" rows=\"7\" placeholder=\"Anne Smith, Steve Jobs, Penny\"></textarea></div><div><h2>Seating chart</h2><div class=\"toolbar\"><input type=\"number\" placeholder=\"How many tables?\" min=\"2\" max=\"", "\"><button>Redo</button></div></div></div>"],
  _tmpl$5$1 = ["<h2", ">Rules</h2>"],
  _tmpl$6 = ["<div", " class=\"toolbar\"><input type=\"text\" list=\"students\" id=\"rulef\"><button>Create Rule</button></div>"],
  _tmpl$7 = ["<datalist", " id=\"students\">", "</datalist>"],
  _tmpl$8 = ["<h3", ">", "</h3>"],
  _tmpl$9 = ["<div", " class=\"toolbar\"><div><h4 style=\"", "\">Musts</h4><!--#-->", "<!--/--></div><div><h4 style=\"", "\">Cants</h4><!--#-->", "<!--/--></div></div>"],
  _tmpl$10 = ["<option", ">", "</option>"];
function Cl() {
  const [students, setStudents] = createStore([]);
  const ruledStundents = createMemo(() => students.filter(s => s.ruled == true));
  function SOpt(props) {
    return ssr(_tmpl$$5, ssrHydrationKey(), escape(createComponent(For, {
      get each() {
        return props.student[props.info];
      },
      children: must => ssr(_tmpl$2$4, ssrHydrationKey(), "display:" + "flex" + (";justify-content:" + "space-between"), escape(must))
    })), escape(props.info, true) + "_" + escape(props.student.name, true));
  }
  return [ssr(_tmpl$3$3, ssrHydrationKey()), ssr(_tmpl$4$1, ssrHydrationKey(), "display:" + "flex" + (";flex-wrap:" + "wrap") + (";gap:" + "30px"), "resize:" + "vertical", escape(students.length, true) / 2), ssr(_tmpl$5$1, ssrHydrationKey()), ssr(_tmpl$6, ssrHydrationKey()), createComponent(For, {
    get each() {
      return ruledStundents();
    },
    children: student => [ssr(_tmpl$8, ssrHydrationKey(), escape(student.name)), ssr(_tmpl$9, ssrHydrationKey(), "margin:" + 0, escape(createComponent(SOpt, {
      student: student,
      info: "must"
    })), "margin:" + 0, escape(createComponent(SOpt, {
      student: student,
      info: "cant"
    })))]
  }), ssr(_tmpl$7, ssrHydrationKey(), escape(createComponent(For, {
    each: students,
    children: student => ssr(_tmpl$10, ssrHydrationKey(), escape(student.name))
  })))];
}

const _tmpl$$4 = ["<div", " class=\"card\" style=\"", "\">", "</div>"],
  _tmpl$2$3 = ["<div", " style=\"", "\">", "</div>"],
  _tmpl$3$2 = ["<div", " style=\"", "\"></div>"];
function Grid(props) {
  const i = () => (props.grid.length - 1) / 2;
  return ssr(_tmpl$$4, ssrHydrationKey(), "gap:" + `${5 - escape(Math.round(i() / 10), true)}px`, escape(createComponent(For, {
    get each() {
      return props.grid;
    },
    children: row => ssr(_tmpl$2$3, ssrHydrationKey(), "display:" + "flex" + (";flex-grow:" + "1") + (";gap:" + `${5 - escape(Math.round(i() / 10), true)}px`), escape(createComponent(For, {
      each: row,
      children: item => ssr(_tmpl$3$2, ssrHydrationKey(), "background-color:" + `${item ? "LightGray" : "white"}` + (";border-radius:" + `${5 - escape(Math.round(i() / 10), true)}px`) + (";height:" + "100%") + (";flex-grow:" + "1"))
    })))
  })));
}

const _tmpl$$3 = ["<h1", ">Pow #4</h1>"],
  _tmpl$2$2 = ["<div", " class=\"toolbar\"><button>+</button><button", ">-</button><input type=\"number\"", " min=\"0\"><div class=\"chip\" style=\"", "\">", "</div></div>"],
  _tmpl$3$1 = ["<div", "><input type=\"range\" min=\"0\" max=\"50\"", "></div>"];
function Counter(props) {
  const [i, setI] = props.i || createSignal(1);
  const grid = createMemo(() => {
    let grid = Array(1 + i() * 2).fill(Array(1 + i() * 2).fill(true)).map((row, idx) => idx > i() ? row : Array(i() + 1).fill(false).concat(row.slice(i() + 1)));
    grid[0][i()] = true;
    grid[i()][0] = true;
    grid = grid.reverse().map((row, idx) => idx >= i() ? row : row.slice(0, i() + 1).concat(Array(i()).fill(false))).reverse();
    if (grid[i() + 1] && grid[i() + 1][i() + 1] != undefined) grid[i() + 1][i() + 1] = true;
    return grid;
  });
  const filled = () => grid().flat(1).filter(circle => circle).length;
  return [createComponent(Show, {
    get when() {
      return !props.i;
    },
    get children() {
      return ssr(_tmpl$$3, ssrHydrationKey());
    }
  }), createComponent(Grid, {
    get grid() {
      return grid();
    }
  }), createComponent(Show, {
    get when() {
      return !props.i;
    },
    get children() {
      return [ssr(_tmpl$2$2, ssrHydrationKey(), ssrAttribute("disabled", i() == 0, true), ssrAttribute("value", escape(i(), true), false), "--offset:" + (escape(filled(), true) / 20 + "px"), escape(filled())), ssr(_tmpl$3$1, ssrHydrationKey(), ssrAttribute("value", escape(i(), true), false))];
    }
  })];
}

const _tmpl$$2 = ["<div", " class=\"card\" style=\"", "\"></div>"];
function Construction(props) {
  return ssr(_tmpl$$2, ssrHydrationKey(), "--offset:" + (escape(props.i(), true) * 2 + "px") + (";background:" + "repeating-linear-gradient(\n            45deg,\n            #D9B365 var(--offset),\n            #D9B365 calc(var(--offset) + 10px),\n            #FFF calc(var(--offset) + 10px),\n            #FFF calc(var(--offset) + 20px)\n        )") + (";border-color:" + "#D9B365"));
}

const _tmpl$$1 = ["<div", " id=\"previews\">", "</div>"],
  _tmpl$2$1 = ["<div", " style=\"", "\"><div class=\"preview\"><div>", "</div></div><span class=\"", "\">", "</span></div>"];
function Previews(props) {
  return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent(For, {
    get each() {
      return props.previews;
    },
    children: (preview, n) => {
      const [i, setI] = createSignal(1);
      return ssr(_tmpl$2$1, ssrHydrationKey(), "--delay:" + escape(n(), true), escape(preview.preview(i, setI)), `button ${preview.url ? '' : 'disabled'}`, escape(createComponent(Show, {
        get when() {
          return preview.url;
        },
        get fallback() {
          return preview.title;
        },
        get children() {
          return createComponent(A$2, {
            get href() {
              return preview.url;
            },
            get children() {
              return preview.title || preview.url;
            }
          });
        }
      })));
    }
  })));
}

function Index() {
  return createComponent(Previews, {
    previews: [{
      url: '4',
      title: 'Pow #4',
      preview: (i, setI) => createComponent(Counter, {
        i: [i, setI]
      })
    }, {
      preview: i => createComponent(Construction, {
        i: i
      }),
      title: "Under construction"
    }, {
      preview: i => createComponent(Construction, {
        i: i
      }),
      title: "Under construction"
    }, {
      preview: i => createComponent(Construction, {
        i: i
      }),
      title: "Under construction"
    }]
  });
}

/// <reference path="../server/types.tsx" />
const fileRoutes = [{
  component: NotFound,
  path: "/*404"
}, {
  component: Home,
  path: "/"
}, {
  component: Plot,
  path: "/test/plot"
}, {
  data: routeData,
  component: PasswordSuggestions,
  path: "/tomfoolery/passwordSuggestions"
}, {
  component: Cl,
  path: "/tools/tt/cl"
}, {
  component: Counter,
  path: "/sch/10/ma/pow/4"
}, {
  component: Index,
  path: "/sch/10/ma/pow/"
}];

/**
 * Routes are the file system based routes, used by Solid App Router to show the current page according to the URL.
 */

const FileRoutes = () => {
  return fileRoutes;
};

const _tmpl$ = ["<nav", "><ul id=\"breadcrumb\"><li>", "</li><!--#-->", "<!--/--></ul></nav>"],
  _tmpl$2 = ["<article", ">", "</article>"],
  _tmpl$3 = ["<footer", "><p>By <a href=\"https://boehs.org\">Evan Boehs</a>, <i>All Rights Reserved</i></p></footer>"],
  _tmpl$4 = ["<div", "><!--#-->", "<!--/--><!--#-->", "<!--/--></div>"],
  _tmpl$5 = ["<li", ">", "</li>"];
const [SecondsHereProvider, useSecondsHere] = createContextProvider(() => {
  const breathsPerMinute = 16;
  const [breathsSinceVisiting, setBSV] = createSignal(0);
  setInterval(() => setBSV(breathsSinceVisiting() + 1), 1000 * 60 / breathsPerMinute);
  return breathsSinceVisiting;
});
function Root() {
  return createComponent(Html, {
    lang: "en",
    get children() {
      return [createComponent(Head, {
        get children() {
          return [createComponent(Title, {
            children: "SolidStart - Bare"
          }), createComponent(Meta$1, {
            charset: "utf-8"
          }), createComponent(Meta$1, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          }), createComponent(Link, {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
          }), createComponent(Link, {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: true
          }), createComponent(Link, {
            href: "https://fonts.googleapis.com/css2?family=Ubuntu&display=swap",
            rel: "stylesheet"
          })];
        }
      }), createComponent(Body, {
        get children() {
          return ssr(_tmpl$4, ssrHydrationKey(), escape(createComponent(Suspense, {
            get children() {
              return createComponent(ErrorBoundary, {
                get children() {
                  return [ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(A$1, {
                    href: "/",
                    children: "home"
                  })), escape(createComponent(For, {
                    get each() {
                      return (() => useLocation().pathname.split('/').slice(1))();
                    },
                    children: (path, i) => ssr(_tmpl$5, ssrHydrationKey(), escape(createComponent(A$1, {
                      get href() {
                        return useLocation().pathname.split('/').slice(0, i() + 2).join('/');
                      },
                      children: path
                    })))
                  }))), ssr(_tmpl$2, ssrHydrationKey(), escape(createComponent(SecondsHereProvider, {
                    get children() {
                      return createComponent(Routes, {
                        get children() {
                          return createComponent(FileRoutes, {});
                        }
                      });
                    }
                  }))), ssr(_tmpl$3, ssrHydrationKey())];
                }
              });
            }
          })), escape(createComponent(Scripts, {})));
        }
      })];
    }
  });
}

const rootData = Object.values(/* #__PURE__ */ Object.assign({

}))[0];
const dataFn = rootData ? rootData.default : undefined;

/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware(exchanges);
  return async event => {
    return await exchange({
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(event);
  };
}
function StartRouter(props) {
  return createComponent(Router, props);
}
const docType = ssr("<!DOCTYPE html>");
function StartServer({
  event
}) {
  const parsed = new URL(event.request.url);
  const path = parsed.pathname + parsed.search;

  // @ts-ignore
  sharedConfig.context.requestContext = event;
  return createComponent(ServerContext.Provider, {
    value: event,
    get children() {
      return createComponent(MetaProvider, {
        get tags() {
          return event.tags;
        },
        get children() {
          return createComponent(StartRouter, {
            url: path,
            get out() {
              return event.routerContext;
            },
            location: path,
            get prevLocation() {
              return event.prevUrl;
            },
            data: dataFn,
            routes: fileRoutes,
            get children() {
              return [docType, createComponent(Root, {})];
            }
          });
        }
      });
    }
  });
}

const entryServer = createHandler(renderAsync(event => createComponent(StartServer, {
  event: event
})));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function () {
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var dist = {};

function constant$3(x) {
  return function constant() {
    return x;
  };
}

const abs$1 = Math.abs;
const atan2 = Math.atan2;
const cos$1 = Math.cos;
const max$2 = Math.max;
const min$2 = Math.min;
const sin$1 = Math.sin;
const sqrt$2 = Math.sqrt;

const epsilon$2 = 1e-12;
const pi$1 = Math.PI;
const halfPi = pi$1 / 2;
const tau$1 = 2 * pi$1;

function acos$1(x) {
  return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
}

function asin$1(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

const pi = Math.PI,
    tau = 2 * pi,
    epsilon$1 = 1e-6,
    tauEpsilon = tau - epsilon$1;

function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}

class Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x, y) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x, y) {
    this._append`L${this._x1 = +x},${this._y1 = +y}`;
  }
  quadraticCurveTo(x1, y1, x, y) {
    this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$1));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    }

    // Otherwise, draw an arc!
    else {
      let x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }

      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
      this._append`L${x0},${y0}`;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$1) {
      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
    }
  }
  rect(x, y, w, h) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
}

function withPath(shape) {
  let digits = 3;

  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };

  return () => new Path(digits);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < epsilon$2) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt$2(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt$2(max$2(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant$3(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null,
      path = withPath(arc);

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs$1(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon$2)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau$1 - epsilon$2) {
      context.moveTo(r1 * cos$1(a0), r1 * sin$1(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$2) {
        context.moveTo(r0 * cos$1(a1), r0 * sin$1(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon$2) && (padRadius ? +padRadius.apply(this, arguments) : sqrt$2(r0 * r0 + r1 * r1)),
          rc = min$2(abs$1(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$2) {
        var p0 = asin$1(rp / r0 * sin$1(ap)),
            p1 = asin$1(rp / r1 * sin$1(ap));
        if ((da0 -= p0 * 2) > epsilon$2) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon$2) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos$1(a01),
          y01 = r1 * sin$1(a01),
          x10 = r0 * cos$1(a10),
          y10 = r0 * sin$1(a10);

      // Apply rounded corners?
      if (rc > epsilon$2) {
        var x11 = r1 * cos$1(a11),
            y11 = r1 * sin$1(a11),
            x00 = r0 * cos$1(a00),
            y00 = r0 * sin$1(a00),
            oc;

        // Restrict the corner radius according to the sector angle. If this
        // intersection fails, it’s probably because the arc is too small, so
        // disable the corner radius entirely.
        if (da < pi$1) {
          if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
            var ax = x01 - oc[0],
                ay = y01 - oc[1],
                bx = x11 - oc[0],
                by = y11 - oc[1],
                kc = 1 / sin$1(acos$1((ax * bx + ay * by) / (sqrt$2(ax * ax + ay * ay) * sqrt$2(bx * bx + by * by))) / 2),
                lc = sqrt$2(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min$2(rc, (r0 - lc) / (kc - 1));
            rc1 = min$2(rc, (r1 - lc) / (kc + 1));
          } else {
            rc0 = rc1 = 0;
          }
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$2)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$2) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$2) || !(da0 > epsilon$2)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$2) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$1 / 2;
    return [cos$1(a) * r, sin$1(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$3(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$3(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$3(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$3(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$3(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$3(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$3(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

var slice = Array.prototype.slice;

function array$2(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line(x$1, y$1) {
  var defined = constant$3(true),
      context = null,
      curve = curveLinear,
      output = null,
      path = withPath(line);

  x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant$3(x$1);
  y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant$3(y$1);

  function line(data) {
    var i,
        n = (data = array$2(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$3(+_), line) : x$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$3(+_), line) : y$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$3(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function area(x0, y0, y1) {
  var x1 = null,
      defined = constant$3(true),
      context = null,
      curve = curveLinear,
      output = null,
      path = withPath(area);

  x0 = typeof x0 === "function" ? x0 : (x0 === undefined) ? x : constant$3(+x0);
  y0 = typeof y0 === "function" ? y0 : (y0 === undefined) ? constant$3(0) : constant$3(+y0);
  y1 = typeof y1 === "function" ? y1 : (y1 === undefined) ? y : constant$3(+y1);

  function area(data) {
    var i,
        j,
        k,
        n = (data = array$2(data)).length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$3(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$3(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$3(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$3(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$3(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$3(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$3(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

function descending$2(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity$7(d) {
  return d;
}

function pie() {
  var value = identity$7,
      sortValues = descending$2,
      sort = null,
      startAngle = constant$3(0),
      endAngle = constant$3(tau$1),
      padAngle = constant$3(0);

  function pie(data) {
    var i,
        n = (data = array$2(data)).length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau$1, Math.max(-tau$1, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$3(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$3(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$3(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$3(+_), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function areaRadial() {
  var a = area().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

class Bump {
  constructor(context, x) {
    this._context = context;
    this._x = x;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x, y);
        else this._context.moveTo(x, y);
        break;
      }
      case 1: this._point = 2; // falls through
      default: {
        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);
        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
        break;
      }
    }
    this._x0 = x, this._y0 = y;
  }
}

class BumpRadial {
  constructor(context) {
    this._context = context;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {}
  point(x, y) {
    x = +x, y = +y;
    if (this._point === 0) {
      this._point = 1;
    } else {
      const p0 = pointRadial(this._x0, this._y0);
      const p1 = pointRadial(this._x0, this._y0 = (this._y0 + y) / 2);
      const p2 = pointRadial(x, this._y0);
      const p3 = pointRadial(x, y);
      this._context.moveTo(...p0);
      this._context.bezierCurveTo(...p1, ...p2, ...p3);
    }
    this._x0 = x, this._y0 = y;
  }
}

function bumpX(context) {
  return new Bump(context, true);
}

function bumpY(context) {
  return new Bump(context, false);
}

function bumpRadial(context) {
  return new BumpRadial(context);
}

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  let source = linkSource,
      target = linkTarget,
      x$1 = x,
      y$1 = y,
      context = null,
      output = null,
      path = withPath(link);

  function link() {
    let buffer;
    const argv = slice.call(arguments);
    const s = source.apply(this, argv);
    const t = target.apply(this, argv);
    if (context == null) output = curve(buffer = path());
    output.lineStart();
    argv[0] = s, output.point(+x$1.apply(this, argv), +y$1.apply(this, argv));
    argv[0] = t, output.point(+x$1.apply(this, argv), +y$1.apply(this, argv));
    output.lineEnd();
    if (buffer) return output = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$3(+_), link) : x$1;
  };

  link.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$3(+_), link) : y$1;
  };

  link.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link) : context;
  };

  return link;
}

function linkHorizontal() {
  return link(bumpX);
}

function linkVertical() {
  return link(bumpY);
}

function linkRadial() {
  const l = link(bumpRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

const sqrt3$2 = sqrt$2(3);

const asterisk = {
  draw(context, size) {
    const r = sqrt$2(size + min$2(size / 28, 0.75)) * 0.59436;
    const t = r / 2;
    const u = t * sqrt3$2;
    context.moveTo(0, r);
    context.lineTo(0, -r);
    context.moveTo(-u, -t);
    context.lineTo(u, t);
    context.moveTo(-u, t);
    context.lineTo(u, -t);
  }
};

const circle = {
  draw(context, size) {
    const r = sqrt$2(size / pi$1);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$1);
  }
};

const cross = {
  draw(context, size) {
    const r = sqrt$2(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

const tan30 = sqrt$2(1 / 3);
const tan30_2 = tan30 * 2;

const diamond = {
  draw(context, size) {
    const y = sqrt$2(size / tan30_2);
    const x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

const diamond2 = {
  draw(context, size) {
    const r = sqrt$2(size) * 0.62625;
    context.moveTo(0, -r);
    context.lineTo(r, 0);
    context.lineTo(0, r);
    context.lineTo(-r, 0);
    context.closePath();
  }
};

const plus = {
  draw(context, size) {
    const r = sqrt$2(size - min$2(size / 7, 2)) * 0.87559;
    context.moveTo(-r, 0);
    context.lineTo(r, 0);
    context.moveTo(0, r);
    context.lineTo(0, -r);
  }
};

const square$1 = {
  draw(context, size) {
    const w = sqrt$2(size);
    const x = -w / 2;
    context.rect(x, x, w, w);
  }
};

const square2 = {
  draw(context, size) {
    const r = sqrt$2(size) * 0.4431;
    context.moveTo(r, r);
    context.lineTo(r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, r);
    context.closePath();
  }
};

const ka = 0.89081309152928522810;
const kr = sin$1(pi$1 / 10) / sin$1(7 * pi$1 / 10);
const kx = sin$1(tau$1 / 10) * kr;
const ky = -cos$1(tau$1 / 10) * kr;

const star = {
  draw(context, size) {
    const r = sqrt$2(size * ka);
    const x = kx * r;
    const y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (let i = 1; i < 5; ++i) {
      const a = tau$1 * i / 5;
      const c = cos$1(a);
      const s = sin$1(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

const sqrt3$1 = sqrt$2(3);

const triangle = {
  draw(context, size) {
    const y = -sqrt$2(size / (sqrt3$1 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3$1 * y, -y);
    context.lineTo(sqrt3$1 * y, -y);
    context.closePath();
  }
};

const sqrt3 = sqrt$2(3);

const triangle2 = {
  draw(context, size) {
    const s = sqrt$2(size) * 0.6824;
    const t = s  / 2;
    const u = (s * sqrt3) / 2; // cos(Math.PI / 6)
    context.moveTo(0, -s);
    context.lineTo(u, t);
    context.lineTo(-u, t);
    context.closePath();
  }
};

const c = -0.5;
const s = sqrt$2(3) / 2;
const k = 1 / sqrt$2(12);
const a = (k / 2 + 1) * 3;

const wye = {
  draw(context, size) {
    const r = sqrt$2(size / a);
    const x0 = r / 2, y0 = r * k;
    const x1 = x0, y1 = r * k + r;
    const x2 = -x1, y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

const times = {
  draw(context, size) {
    const r = sqrt$2(size - min$2(size / 6, 1.7)) * 0.6189;
    context.moveTo(-r, -r);
    context.lineTo(r, r);
    context.moveTo(-r, r);
    context.lineTo(r, -r);
  }
};

// These symbols are designed to be filled.
const symbolsFill = [
  circle,
  cross,
  diamond,
  square$1,
  star,
  triangle,
  wye
];

// These symbols are designed to be stroked (with a width of 1.5px and round caps).
const symbolsStroke = [
  circle,
  plus,
  times,
  triangle2,
  asterisk,
  square2,
  diamond2
];

function Symbol$1(type, size) {
  let context = null,
      path = withPath(symbol);

  type = typeof type === "function" ? type : constant$3(type || circle);
  size = typeof size === "function" ? size : constant$3(size === undefined ? 64 : +size);

  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$3(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$3(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop$1() {}

function point$4(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point$4(this, this._x1, this._y1); // falls through
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // falls through
      default: point$4(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basis$2(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop$1,
  areaEnd: noop$1,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point$4(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisClosed$1(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // falls through
      default: point$4(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

const bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$3(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$3(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // falls through
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

const cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop$1,
  areaEnd: noop$1,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

const cardinalClosed = (function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // falls through
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

const cardinalOpen = (function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon$2) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$2) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // falls through
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

const catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop$1,
  areaEnd: noop$1,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

const catmullRomClosed = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // falls through
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

const catmullRomOpen = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop$1,
  areaEnd: noop$1,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function linearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$1(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$1(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$1(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$1(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function natural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

function step(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function none$2(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none$1(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}

function stack() {
  var keys = constant$3([]),
      order = none$1,
      offset = none$2,
      value = stackValue;

  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries),
        i, n = sz.length, j = -1,
        oz;

    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }

    for (i = 0, oz = array$2(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$3(Array.from(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$3(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant$3(Array.from(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none$2 : _, stack) : offset;
  };

  return stack;
}

function expand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none$2(series, order);
}

function diverging$1(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}

function silhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none$2(series, order);
}

function wiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none$2(series, order);
}

function appearance(series) {
  var peaks = series.map(peak);
  return none$1(series).sort(function(a, b) { return peaks[a] - peaks[b]; });
}

function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}

function ascending$2(series) {
  var sums = series.map(sum);
  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
}

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

function descending$1(series) {
  return ascending$2(series).reverse();
}

function insideOut(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum),
      order = appearance(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}

function reverse(series) {
  return none$1(series).reverse();
}

const src$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  arc,
  area,
  line,
  pie,
  areaRadial,
  radialArea: areaRadial,
  lineRadial: lineRadial$1,
  radialLine: lineRadial$1,
  pointRadial,
  link,
  linkHorizontal,
  linkVertical,
  linkRadial,
  symbol: Symbol$1,
  symbolsStroke,
  symbolsFill,
  symbols: symbolsFill,
  symbolAsterisk: asterisk,
  symbolCircle: circle,
  symbolCross: cross,
  symbolDiamond: diamond,
  symbolDiamond2: diamond2,
  symbolPlus: plus,
  symbolSquare: square$1,
  symbolSquare2: square2,
  symbolStar: star,
  symbolTriangle: triangle,
  symbolTriangle2: triangle2,
  symbolWye: wye,
  symbolTimes: times,
  symbolX: times,
  curveBasisClosed: basisClosed$1,
  curveBasisOpen: basisOpen,
  curveBasis: basis$2,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveBundle: bundle,
  curveCardinalClosed: cardinalClosed,
  curveCardinalOpen: cardinalOpen,
  curveCardinal: cardinal,
  curveCatmullRomClosed: catmullRomClosed,
  curveCatmullRomOpen: catmullRomOpen,
  curveCatmullRom: catmullRom,
  curveLinearClosed: linearClosed,
  curveLinear,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural: natural,
  curveStep: step,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore,
  stack,
  stackOffsetExpand: expand,
  stackOffsetDiverging: diverging$1,
  stackOffsetNone: none$2,
  stackOffsetSilhouette: silhouette,
  stackOffsetWiggle: wiggle,
  stackOrderAppearance: appearance,
  stackOrderAscending: ascending$2,
  stackOrderDescending: descending$1,
  stackOrderInsideOut: insideOut,
  stackOrderNone: none$1,
  stackOrderReverse: reverse
}, Symbol.toStringTag, { value: 'Module' }));

const require$$0 = /*@__PURE__*/getAugmentedNamespace(src$7);

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

const formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

function identity$6(x) {
  return x;
}

var map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale$1(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$6 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$6 : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale$1;
var format;
var formatPrefix;

defaultLocale$1({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

const src$6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  formatDefaultLocale: defaultLocale$1,
  get format () { return format; },
  get formatPrefix () { return formatPrefix; },
  formatLocale: formatLocale$1,
  formatSpecifier,
  FormatSpecifier,
  precisionFixed,
  precisionPrefix,
  precisionRound
}, Symbol.toStringTag, { value: 'Module' }));

const require$$1$2 = /*@__PURE__*/getAugmentedNamespace(src$6);

function ascending$1(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending$1;
    compare2 = (d, x) => ascending$1(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending$1 || f === descending ? f : zero$2;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero$2() {
  return 0;
}

function number$3(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}

const ascendingBisect = bisector(ascending$1);
const bisectRight = ascendingBisect.right;
bisector(number$3).center;
const bisect = bisectRight;

class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

function intern_get({_intern, _key}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

function compareDefined(compare = ascending$1) {
  if (compare === ascending$1) return ascendingDefined;
  if (typeof compare !== "function") throw new TypeError("compare is not a function");
  return (a, b) => {
    const x = compare(a, b);
    if (x || x === 0) return x;
    return (compare(b, b) === 0) - (compare(a, a) === 0);
  };
}

function ascendingDefined(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}

const e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log10(step)),
      error = step / Math.pow(10, power),
      factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

function max$1(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}

function min$1(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = Infinity, compare) {
  k = Math.floor(k);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array.length - 1, right));

  if (!(left <= k && k <= right)) return array;

  compare = compare === undefined ? ascendingDefined : compareDefined(compare);

  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;

    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);

    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap(array, left, j);
    else ++j, swap(array, j, right);

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }

  return array;
}

function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}

function quantile$1(values, p, valueof) {
  values = Float64Array.from(numbers(values, valueof));
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return min$1(values);
  if (p >= 1) return max$1(values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = max$1(quickselect(values, i0).subarray(0, i0 + 1)),
      value1 = min$1(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

function quantileSorted(values, p, valueof = number$3) {
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}

const implicit = Symbol("implicit");

function ordinal() {
  var index = new InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), [r0, r1])
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl$2(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl$2, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

const radians = Math.PI / 180;
const degrees$1 = 180 / Math.PI;

// https://observablehq.com/@mbostock/lab-and-rgb
const K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0$1 = 4 / 29,
    t1$1 = 6 / 29,
    t2 = 3 * t1$1 * t1$1,
    t3 = t1$1 * t1$1 * t1$1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab$1(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab$1, extend(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0$1;
}

function lab2xyz(t) {
  return t > t1$1 ? t * t * t : t2 * (t - t0$1);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees$1;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl$2(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

define(Hcl, hcl$2, extend(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * degrees$1 - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix$2(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix$2, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

const src$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  color,
  rgb,
  hsl: hsl$2,
  lab: lab$1,
  hcl: hcl$2,
  lch,
  gray,
  cubehelix: cubehelix$2
}, Symbol.toStringTag, { value: 'Module' }));

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

function basis$1(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function basisClosed(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

const constant$2 = x => () => x;

function linear$2(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue$1(a, b) {
  var d = b - a;
  return d ? linear$2(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$2(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$2(a, d) : constant$2(isNaN(a) ? b : a);
}

const interpolateRgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);
var rgbBasisClosed = rgbSpline(basisClosed);

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function array$1(a, b) {
  return (isNumberArray(b) ? numberArray : genericArray)(a, b);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date$1(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate$1(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero$1(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero$1(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate$1(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$2(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
      : b instanceof color ? interpolateRgb
      : b instanceof Date ? date$1
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : interpolateNumber)(a, b);
}

function discrete(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

function hue(a, b) {
  var i = hue$1(+a, +b);
  return function(t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

var degrees = 180 / Math.PI;

var identity$5 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$5 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return identity$5;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$5;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var epsilon2 = 1e-12;

function cosh$1(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh$1(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh$1(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

const interpolateZoom = (function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh$1(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh$1(rho * s + r0) - sinh$1(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh$1(rho * s + r0)
        ];
      };
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4);

function hsl(hue) {
  return function(start, end) {
    var h = hue((start = hsl$2(start)).h, (end = hsl$2(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

const hsl$1 = hsl(hue$1);
var hslLong = hsl(nogamma);

function lab(start, end) {
  var l = nogamma((start = lab$1(start)).l, (end = lab$1(end)).l),
      a = nogamma(start.a, end.a),
      b = nogamma(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}

function hcl(hue) {
  return function(start, end) {
    var h = hue((start = hcl$2(start)).h, (end = hcl$2(end)).h),
        c = nogamma(start.c, end.c),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

const hcl$1 = hcl(hue$1);
var hclLong = hcl(nogamma);

function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = cubehelix$2(start)).h, (end = cubehelix$2(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

const cubehelix$1 = cubehelix(hue$1);
var cubehelixLong = cubehelix(nogamma);

function piecewise(interpolate, values) {
  if (values === undefined) values = interpolate, interpolate = interpolate$1;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}

function quantize$1(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

const src$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  interpolate: interpolate$1,
  interpolateArray: array$1,
  interpolateBasis: basis$1,
  interpolateBasisClosed: basisClosed,
  interpolateDate: date$1,
  interpolateDiscrete: discrete,
  interpolateHue: hue,
  interpolateNumber,
  interpolateNumberArray: numberArray,
  interpolateObject: object,
  interpolateRound,
  interpolateString,
  interpolateTransformCss,
  interpolateTransformSvg,
  interpolateZoom,
  interpolateRgb,
  interpolateRgbBasis: rgbBasis,
  interpolateRgbBasisClosed: rgbBasisClosed,
  interpolateHsl: hsl$1,
  interpolateHslLong: hslLong,
  interpolateLab: lab,
  interpolateHcl: hcl$1,
  interpolateHclLong: hclLong,
  interpolateCubehelix: cubehelix$1,
  interpolateCubehelixLong: cubehelixLong,
  piecewise,
  quantize: quantize$1
}, Symbol.toStringTag, { value: 'Module' }));

function constants$1(x) {
  return function() {
    return x;
  };
}

function number$2(x) {
  return +x;
}

var unit = [0, 1];

function identity$4(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants$1(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy$1(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer$2() {
  var domain = unit,
      range = unit,
      interpolate = interpolate$1,
      transform,
      untransform,
      unknown,
      clamp = identity$4,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$4) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number$2), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$4, rescale()) : clamp !== identity$4;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer$2()(identity$4, identity$4);
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear$1() {
  var scale = continuous();

  scale.copy = function() {
    return copy$1(scale, linear$1());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function identity$3(domain) {
  var unknown;

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = Array.from(_, number$2), scale) : domain.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return identity$3(domain).unknown(unknown);
  };

  domain = arguments.length ? Array.from(domain, number$2) : [0, 1];

  return linearish(scale);
}

function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : x => Math.pow(base, x);
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), x => Math.log(x) / base);
}

function reflect(f) {
  return (x, k) => -f(-x, k);
}

function loggish(transform) {
  const scale = transform(transformLog, transformExp);
  const domain = scale.domain;
  let base = 10;
  let logs;
  let pows;

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = count => {
    const d = domain();
    let u = d[0];
    let v = d[d.length - 1];
    const r = v < u;

    if (r) ([u, v] = [v, u]);

    let i = logs(u);
    let j = logs(v);
    let k;
    let t;
    const n = count == null ? 10 : +count;
    let z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k = 1; k < base; ++k) {
          t = i < 0 ? k / pows(-i) : k * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i <= j; ++i) {
        for (k = base - 1; k >= 1; --k) {
          t = i > 0 ? k / pows(-i) : k * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = ticks(u, v, n);
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };

  scale.tickFormat = (count, specifier) => {
    if (count == null) count = 10;
    if (specifier == null) specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
      specifier = format(specifier);
    }
    if (count === Infinity) return specifier;
    const k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return d => {
      let i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = () => {
    return domain(nice(domain(), {
      floor: x => pows(Math.floor(logs(x))),
      ceil: x => pows(Math.ceil(logs(x)))
    }));
  };

  return scale;
}

function log$1() {
  const scale = loggish(transformer$2()).domain([1, 10]);
  scale.copy = () => copy$1(scale, log$1()).base(scale.base());
  initRange.apply(scale, arguments);
  return scale;
}

function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return linearish(scale);
}

function symlog() {
  var scale = symlogish(transformer$2());

  scale.copy = function() {
    return copy$1(scale, symlog()).constant(scale.constant());
  };

  return initRange.apply(scale, arguments);
}

function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(identity$4, identity$4),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(identity$4, identity$4)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linearish(scale);
}

function pow$1() {
  var scale = powish(transformer$2());

  scale.copy = function() {
    return copy$1(scale, pow$1()).exponent(scale.exponent());
  };

  initRange.apply(scale, arguments);

  return scale;
}

function sqrt$1() {
  return pow$1.apply(null, arguments).exponent(0.5);
}

function square(x) {
  return Math.sign(x) * x * x;
}

function unsquare(x) {
  return Math.sign(x) * Math.sqrt(Math.abs(x));
}

function radial() {
  var squared = continuous(),
      range = [0, 1],
      round = false,
      unknown;

  function scale(x) {
    var y = unsquare(squared(x));
    return isNaN(y) ? unknown : round ? Math.round(y) : y;
  }

  scale.invert = function(y) {
    return squared.invert(square(y));
  };

  scale.domain = function(_) {
    return arguments.length ? (squared.domain(_), scale) : squared.domain();
  };

  scale.range = function(_) {
    return arguments.length ? (squared.range((range = Array.from(_, number$2)).map(square)), scale) : range.slice();
  };

  scale.rangeRound = function(_) {
    return scale.range(_).round(true);
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, scale) : round;
  };

  scale.clamp = function(_) {
    return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return radial(squared.domain(), range)
        .round(round)
        .clamp(squared.clamp())
        .unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = quantileSorted(domain, i / n);
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : range[bisect(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending$1);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x != null && x <= x ? range[bisect(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function() {
    return domain.slice();
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(linearish(scale), arguments);
}

function threshold() {
  var domain = [0.5],
      range = [0, 1],
      unknown,
      n = 1;

  function scale(x) {
    return x != null && x <= x ? range[bisect(domain, x, 0, n)] : unknown;
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

const t0 = new Date, t1 = new Date;

function timeInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
  }

  interval.floor = (date) => {
    return floori(date = new Date(+date)), date;
  };

  interval.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = (date) => {
    const d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = (date, step) => {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = (start, stop, step) => {
    const range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    let previous;
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? (d) => field(d) % step === 0
              : (d) => interval.count(0, d) % step === 0);
    };
  }

  return interval;
}

const millisecond = timeInterval(() => {
  // noop
}, (date, step) => {
  date.setTime(+date + step);
}, (start, end) => {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = (k) => {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start, end) => {
    return (end - start) / k;
  });
};

millisecond.range;

const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;

const second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});

second.range;

const timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getMinutes();
});

timeMinute.range;

const utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});

utcMinute.range;

const timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getHours();
});

timeHour.range;

const utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getUTCHours();
});

utcHour.range;

const timeDay = timeInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);

timeDay.range;

const utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});

utcDay.range;

const unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});

unixDay.range;

function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);

timeSunday.range;
timeMonday.range;
timeTuesday.range;
timeWednesday.range;
timeThursday.range;
timeFriday.range;
timeSaturday.range;

function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}

const utcSunday = utcWeekday(0);
const utcMonday = utcWeekday(1);
const utcTuesday = utcWeekday(2);
const utcWednesday = utcWeekday(3);
const utcThursday = utcWeekday(4);
const utcFriday = utcWeekday(5);
const utcSaturday = utcWeekday(6);

utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;

const timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});

timeMonth.range;

const utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});

utcMonth.range;

const timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date) => {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
timeYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

timeYear.range;

const utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

utcYear.range;

function ticker(year, month, week, day, hour, minute) {

  const tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function ticks(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
    return reverse ? ticks.reverse() : ticks;
  }

  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([,, step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }

  return [ticks, tickInterval];
}

const [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}

function dISO(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
}

function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale;
var timeFormat;
var utcFormat;

defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  locale.parse;
  utcFormat = locale.utcFormat;
  locale.utcParse;
  return locale;
}

function date(t) {
  return new Date(t);
}

function number$1(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  var scale = continuous(),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number$1)) : domain().map(date);
  };

  scale.ticks = function(interval) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d, interval)) : scale;
  };

  scale.copy = function() {
    return copy$1(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
  };

  return scale;
}

function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}

function transformer$1() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = identity$4,
      clamp = false,
      unknown;

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  function range(interpolate) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }

  scale.range = range(interpolate$1);

  scale.rangeRound = range(interpolateRound);

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = linearish(transformer$1()(identity$4));

  scale.copy = function() {
    return copy(scale, sequential());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialLog() {
  var scale = loggish(transformer$1()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, sequentialLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = symlogish(transformer$1());

  scale.copy = function() {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialPow() {
  var scale = powish(transformer$1());

  scale.copy = function() {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}

function sequentialQuantile() {
  var domain = [],
      interpolator = identity$4;

  function scale(x) {
    if (x != null && !isNaN(x = +x)) return interpolator((bisect(domain, x, 1) - 1) / (domain.length - 1));
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending$1);
    return scale;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.range = function() {
    return domain.map((d, i) => interpolator(i / (domain.length - 1)));
  };

  scale.quantiles = function(n) {
    return Array.from({length: n + 1}, (_, i) => quantile$1(domain, i / n));
  };

  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };

  return initInterpolator.apply(scale, arguments);
}

function transformer() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      s = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = identity$4,
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  function range(interpolate) {
    return function(_) {
      var r0, r1, r2;
      return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
    };
  }

  scale.range = range(interpolate$1);

  scale.rangeRound = range(interpolateRound);

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
    return scale;
  };
}

function diverging() {
  var scale = linearish(transformer()(identity$4));

  scale.copy = function() {
    return copy(scale, diverging());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingLog() {
  var scale = loggish(transformer()).domain([0.1, 1, 10]);

  scale.copy = function() {
    return copy(scale, divergingLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSymlog() {
  var scale = symlogish(transformer());

  scale.copy = function() {
    return copy(scale, divergingSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingPow() {
  var scale = powish(transformer());

  scale.copy = function() {
    return copy(scale, divergingPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

const src$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  scaleBand: band,
  scalePoint: point,
  scaleIdentity: identity$3,
  scaleLinear: linear$1,
  scaleLog: log$1,
  scaleSymlog: symlog,
  scaleOrdinal: ordinal,
  scaleImplicit: implicit,
  scalePow: pow$1,
  scaleSqrt: sqrt$1,
  scaleRadial: radial,
  scaleQuantile: quantile,
  scaleQuantize: quantize,
  scaleThreshold: threshold,
  scaleTime: time,
  scaleUtc: utcTime,
  scaleSequential: sequential,
  scaleSequentialLog: sequentialLog,
  scaleSequentialPow: sequentialPow,
  scaleSequentialSqrt: sequentialSqrt,
  scaleSequentialSymlog: sequentialSymlog,
  scaleSequentialQuantile: sequentialQuantile,
  scaleDiverging: diverging,
  scaleDivergingLog: divergingLog,
  scaleDivergingPow: divergingPow,
  scaleDivergingSqrt: divergingSqrt,
  scaleDivergingSymlog: divergingSymlog,
  tickFormat
}, Symbol.toStringTag, { value: 'Module' }));

const require$$2 = /*@__PURE__*/getAugmentedNamespace(src$3);

function identity$2(x) {
  return x;
}

var top = 1,
    right = 2,
    bottom = 3,
    left = 4,
    epsilon = 1e-6;

function translateX(x) {
  return "translate(" + x + ",0)";
}

function translateY(y) {
  return "translate(0," + y + ")";
}

function number(scale) {
  return d => +scale(d);
}

function center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return d => +scale(d) + offset;
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
      k = orient === top || orient === left ? -1 : 1,
      x = orient === left || orient === right ? "x" : "y",
      transform = orient === top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$2) : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + offset,
        range1 = +range[range.length - 1] + offset,
        position = (scale.bandwidth ? center : number)(scale.copy(), offset),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");

    path = path.merge(path.enter().insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "currentColor"));

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line")
        .attr("stroke", "currentColor")
        .attr(x + "2", k * tickSizeInner));

    text = text.merge(tickEnter.append("text")
        .attr("fill", "currentColor")
        .attr(x, k * spacing)
        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);

      tickExit = tickExit.transition(context)
          .attr("opacity", epsilon)
          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

      tickEnter
          .attr("opacity", epsilon)
          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
    }

    tickExit.remove();

    path
        .attr("d", orient === left || orient === right
            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

    tick
        .attr("opacity", 1)
        .attr("transform", function(d) { return transform(position(d) + offset); });

    line
        .attr(x + "2", k * tickSizeInner);

    text
        .attr(x, k * spacing)
        .text(format);

    selection.filter(entering)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

    selection
        .each(function() { this.__axis = position; });
  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = Array.from(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  axis.offset = function(_) {
    return arguments.length ? (offset = +_, axis) : offset;
  };

  return axis;
}

function axisTop(scale) {
  return axis(top, scale);
}

function axisRight(scale) {
  return axis(right, scale);
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(left, scale);
}

const src$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  axisTop,
  axisRight,
  axisBottom,
  axisLeft
}, Symbol.toStringTag, { value: 'Module' }));

const require$$3 = /*@__PURE__*/getAugmentedNamespace(src$2);

var noop = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames$1(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

var xhtml = "http://www.w3.org/1999/xhtml";

const namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}

function selection_selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection$1(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function selection_selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

function selection_selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant$1(x) {
  return function() {
    return x;
  };
}

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$1(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection$1(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection$1(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  return Array.from(this);
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove$1 : typeof value === "function"
            ? styleFunction$1
            : styleConstant$1)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction$1
          : textConstant$1)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

var root = [null];

function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection$1([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
      : new Selection$1([[selector]], root);
}

function create$1(name) {
  return select(creator(name).call(document.documentElement));
}

var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

function sourceEvent(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

function pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

function pointers(events, node) {
  if (events.target) { // i.e., instanceof Event, not TouchList or iterable
    events = sourceEvent(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => pointer(event, node));
}

function selectAll(selector) {
  return typeof selector === "string"
      ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection$1([array(selector)], root);
}

const src$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  create: create$1,
  creator,
  local,
  matcher,
  namespace,
  namespaces,
  pointer,
  pointers,
  select,
  selectAll,
  selection,
  selector,
  selectorAll,
  style: styleValue,
  window: defaultView
}, Symbol.toStringTag, { value: 'Module' }));

// These are typically used in conjunction with noevent to ensure that we can
const nonpassivecapture = {capture: true, passive: false};

function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function dragDisable(view) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent$1, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent$1, nonpassivecapture);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

var frame = 0, // is an animation frame pending?
    timeout$1 = 0, // is a timeout pending?
    interval$4 = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval$4) interval$4 = clearInterval(interval$4);
  } else {
    if (!interval$4) clockLast = clock.now(), interval$4 = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

function timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}

function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}

function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function() {
    set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set(this, id).duration = value;
  };
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get(this.node(), id).ease;
}

function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    set(this, id).ease = v;
  };
}

function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection = selection.prototype.constructor;

function transition_selection() {
  return new Selection(this._groups, this._parents);
}

function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}

function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(tweenValue(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
}

function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

function transition_transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

function transition_end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: easeCubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

const constant = x => () => x;

function ZoomEvent(type, {
  sourceEvent,
  target,
  transform,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    transform: {value: transform, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity$1 = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity$1;
  return node.__zoom;
}

function nopropagation(event) {
  event.stopImmediatePropagation();
}

function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || identity$1;
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

function zoom() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = interpolateZoom,
      listeners = dispatch("start", "zoom", "end"),
      touchstarting,
      touchfirst,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0,
      tapDistance = 10;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled, {passive: false})
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p, event) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };

  zoom.scaleTo = function(selection, k, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };

  zoom.translateBy = function(selection, x, y, event) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };

  zoom.translateTo = function(selection, x, y, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity$1.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args).event(event),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = pointer(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
        g = gesture(this, args, true).event(event),
        v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = pointer(event, currentTarget),
        x0 = event.clientX,
        y0 = event.clientY;

    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved(event) {
      noevent(event);
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event)
       .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event.view, g.moved);
      noevent(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    noevent(event);
    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
    else select(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
        n = touches.length,
        g = gesture(this, args, event.changedTouches.length === n).event(event),
        started, i, t, p;

    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      interrupt(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;

    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t;

    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };

  return zoom;
}

const src = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  zoom,
  zoomTransform: transform,
  zoomIdentity: identity$1,
  ZoomTransform: Transform
}, Symbol.toStringTag, { value: 'Module' }));

const require$$4 = /*@__PURE__*/getAugmentedNamespace(src);

const require$$5 = /*@__PURE__*/getAugmentedNamespace(src$1);

const require$$6 = /*@__PURE__*/getAugmentedNamespace(src$4);

var annotations$1 = {};

Object.defineProperty(annotations$1, "__esModule", { value: true });
const d3_shape_1$3 = require$$0;
const d3_selection_1$8 = require$$5;
function annotations(options) {
    const xScale = options.owner.meta.xScale;
    const yScale = options.owner.meta.yScale;
    const line = (0, d3_shape_1$3.line)()
        .x(function (d) { return d[0]; })
        .y(function (d) { return d[1]; });
    return function (parentSelection) {
        parentSelection.each(function () {
            // join
            const current = (0, d3_selection_1$8.select)(this);
            const selection = current.selectAll('g.annotations')
                .data(function (d) { return d.annotations || []; });
            // enter
            const enter = selection.enter()
                .append('g')
                .attr('class', 'annotations');
            // enter + update
            // - path
            const yRange = yScale.range();
            const xRange = xScale.range();
            const path = selection.merge(enter).selectAll('path')
                .data(function (d) {
                if ('x' in d) {
                    return [[[0, yRange[0]], [0, yRange[1]]]];
                }
                else {
                    return [[[xRange[0], 0], [xRange[1], 0]]];
                }
            });
            path.enter()
                .append('path')
                .attr('stroke', '#eee')
                .attr('d', line);
            path.exit().remove();
            // enter + update
            // - text
            const text = selection.merge(enter).selectAll('text')
                .data(function (d) {
                return [{
                        text: d.text || '',
                        hasX: 'x' in d
                    }];
            });
            text.enter()
                .append('text')
                .attr('y', function (d) {
                return d.hasX ? 3 : 0;
            })
                .attr('x', function (d) {
                return d.hasX ? 0 : 3;
            })
                .attr('dy', function (d) {
                return d.hasX ? 5 : -5;
            })
                .attr('text-anchor', function (d) {
                return d.hasX ? 'end' : '';
            })
                .attr('transform', function (d) {
                return d.hasX ? 'rotate(-90)' : '';
            })
                .text(function (d) { return d.text; });
            text.exit().remove();
            // enter + update
            // move group
            selection.merge(enter)
                .attr('transform', function (d) {
                if ('x' in d) {
                    return 'translate(' + xScale(d.x) + ', 0)';
                }
                else {
                    return 'translate(0, ' + yScale(d.y) + ')';
                }
            });
            // exit
            selection.exit()
                .remove();
        });
    };
}
annotations$1.default = annotations;

var tip = {};

var clamp_1$3 = clamp;

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

var utils$2 = {};

var globals = {};

const require$$1$1 = /*@__PURE__*/getAugmentedNamespace(src$5);

Object.defineProperty(globals, "__esModule", { value: true });
const d3_color_1$1 = require$$1$1;
// var d3 = window.d3
const Globals = {
    COLORS: [
        'steelblue',
        'red',
        '#05b378',
        'orange',
        '#4040e8',
        'yellow',
        'brown',
        'magenta',
        'cyan'
    ].map(function (v) {
        return (0, d3_color_1$1.hsl)(v);
    }),
    DEFAULT_WIDTH: 550,
    DEFAULT_HEIGHT: 350,
    TIP_X_EPS: 1,
    DEFAULT_ITERATIONS: Infinity,
    MAX_ITERATIONS: 0
};
Globals.DEFAULT_ITERATIONS = null;
Globals.MAX_ITERATIONS = Globals.DEFAULT_WIDTH * 10;
// module.exports.Globals = Globals
globals.default = Globals;

var __importDefault$e = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(utils$2, "__esModule", { value: true });
const globals_1$3 = __importDefault$e(globals);
const utils$1 = {
    linspace: function (lo, hi, n) {
        const step = (hi - lo) / (n - 1);
        return Array.from({ length: n }, (val, i) => lo + step * i);
    },
    logspace: function (lo, hi, n) {
        return this.linspace(lo, hi, n).map((x) => Math.pow(10, x));
    },
    isValidNumber: function (v) {
        return typeof v === 'number' && !isNaN(v);
    },
    space: function (chart, range, n) {
        const lo = range[0];
        const hi = range[1];
        if (chart.options.xAxis.type === 'log') {
            return this.logspace(Math.log10(lo), Math.log10(hi), n);
        }
        // default is linear
        return this.linspace(lo, hi, n);
    },
    getterSetter: function (config, option) {
        const me = this;
        this[option] = function (value) {
            if (!arguments.length) {
                return config[option];
            }
            config[option] = value;
            return me;
        };
    },
    sgn: function (v) {
        if (v < 0) {
            return -1;
        }
        if (v > 0) {
            return 1;
        }
        return 0;
    },
    color: function (data, index) {
        let indexModLenColor = index % globals_1$3.default.COLORS.length;
        return data.color || globals_1$3.default.COLORS[indexModLenColor].hex();
    }
};
utils$2.default = utils$1;

var _eval$2 = {};

var builtInMathEval = {exports: {}};

var _eval$1 = {exports: {}};

var adapter$1 = function () {
  var math = Object.create(Math);

  math.factory = function (a) {
    if (typeof a !== 'number') {
      throw new TypeError('built-in math factory only accepts numbers')
    }
    return Number(a)
  };

  math.add = function (a, b) {
    return a + b
  };
  math.sub = function (a, b) {
    return a - b
  };
  math.mul = function (a, b) {
    return a * b
  };
  math.div = function (a, b) {
    return a / b
  };
  math.mod = function (a, b) {
    return a % b
  };
  math.factorial = function (a) {
    var res = 1;
    for (var i = 2; i <= a; i += 1) {
      res *= i;
    }
    return res
  };

  // taken from https://github.com/josdejong/mathjs/blob/master/lib/function/arithmetic/nthRoot.js
  math.nthRoot = function (a, root) {
    var inv = root < 0;
    if (inv) {
      root = -root;
    }

    if (root === 0) {
      throw new Error('Root must be non-zero')
    }
    if (a < 0 && (Math.abs(root) % 2 !== 1)) {
      throw new Error('Root must be odd when a is negative.')
    }

    // edge cases zero and infinity
    if (a === 0) {
      return 0
    }
    if (!isFinite(a)) {
      return inv ? 0 : a
    }

    var x = Math.pow(Math.abs(a), 1 / root);
    // If a < 0, we require that root is an odd integer,
    // so (-1) ^ (1/root) = -1
    x = a < 0 ? -x : x;
    return inv ? 1 / x : x
  };

  // logical
  math.logicalOR = function (a, b) {
    return a || b
  };
  math.logicalXOR = function (a, b) {
    /* eslint-disable */
    return a != b
    /* eslint-enable*/
  };
  math.logicalAND = function (a, b) {
    return a && b
  };

  // bitwise
  math.bitwiseOR = function (a, b) {
    /* eslint-disable */
    return a | b
    /* eslint-enable*/
  };
  math.bitwiseXOR = function (a, b) {
    /* eslint-disable */
    return a ^ b
    /* eslint-enable*/
  };
  math.bitwiseAND = function (a, b) {
    /* eslint-disable */
    return a & b
    /* eslint-enable*/
  };

  // relational
  math.lessThan = function (a, b) {
    return a < b
  };
  math.lessEqualThan = function (a, b) {
    return a <= b
  };
  math.greaterThan = function (a, b) {
    return a > b
  };
  math.greaterEqualThan = function (a, b) {
    return a >= b
  };
  math.equal = function (a, b) {
    /* eslint-disable */
    return a == b
  /* eslint-enable*/
  };
  math.strictlyEqual = function (a, b) {
    return a === b
  };
  math.notEqual = function (a, b) {
    /* eslint-disable */
    return a != b
  /* eslint-enable*/
  };
  math.strictlyNotEqual = function (a, b) {
    return a !== b
  };

  // shift
  math.shiftRight = function (a, b) {
    return (a >> b)
  };
  math.shiftLeft = function (a, b) {
    return (a << b)
  };
  math.unsignedRightShift = function (a, b) {
    return (a >>> b)
  };

  // unary
  math.negative = function (a) {
    return -a
  };
  math.positive = function (a) {
    return a
  };

  return math
};

var CodeGenerator$1 = require$$0$1;
var math = adapter$1();

function processScope$1 (scope) {
  Object.keys(scope).forEach(function (k) {
    var value = scope[k];
    scope[k] = math.factory(value);
  });
}

_eval$1.exports = function (expression) {
  return new CodeGenerator$1()
    .setDefs({
      $$processScope: processScope$1
    })
    .parse(expression)
    .compile(math)
};

_eval$1.exports.math = math;

/*
 * built-in-math-eval
 *
 * Copyright (c) 2015 Mauricio Poppe
 * Licensed under the MIT license.
 */

(function (module) {

	module.exports = _eval$1.exports;
} (builtInMathEval));

var intervalArithmeticEval = {exports: {}};

var _eval = {exports: {}};

/**
 * @mixin utils
 */
/**
 * Checks if `x` is an interval, `x` is an interval if it's an object which has
 * `x.lo` and `x.hi` defined and both are numbers
 *
 * @example
 * ```typescript
 * Interval.isInterval(
 *   Interval()
 * ) // true
 * Interval.isInterval(
 *   undefined
 * ) // false
 * Interval.isInterval(
 *   {lo: 1, hi: 2}
 * ) // true
 * ```
 *
 * @param  {*} x
 * @return {boolean} true if `x` is an interval
 */
function isInterval(x) {
    return typeof x === 'object' && typeof x.lo === 'number' && typeof x.hi === 'number';
}
/**
 * Checks if `x` is empty, it's empty when `x.lo > x.hi`
 *
 * @example
 * ```typescript
 * Interval.isEmpty(
 *   Interval.EMPTY
 * ) // true
 * Interval.isEmpty(
 *   Interval.WHOLE
 * ) // false
 * Interval.isEmpty(
 *   // bypass empty interval check
 *   Interval().set(1, -1)
 * ) // true
 * ```
 *
 * @param {Interval} i
 * @returns {boolean}
 */
function isEmpty(i) {
    return i.lo > i.hi;
}
/**
 * Checks if an interval is a whole interval, that is an interval which covers
 * all the real numbers i.e. when `x.lo === -Infinity` and `x.hi === Infinity`
 *
 * @example
 * ```typescript
 * Interval.isWhole(
 *   Interval.WHOLE
 * ) // true
 * ```
 *
 * @param {Interval} i
 * @returns {boolean}
 */
function isWhole(i) {
    return i.lo === -Infinity && i.hi === Infinity;
}
/**
 * Checks if the intervals `x` is a singleton (an interval representing a single
 * value) i.e. when `x.lo === x.hi`
 *
 * @example
 * ```typescript
 * Interval.isSingleton(
 *  Interval(2, 2)
 * ) // true
 * Interval.isSingleton(
 *  Interval(2)
 * ) // true
 * ```
 *
 * @param {Interval} i
 * @returns {boolean}
 */
function isSingleton(i) {
    return i.lo === i.hi;
}
/**
 * Checks if zero is included in the interval `x`
 *
 * @example
 * ```typescript
 * Interval.zeroIn(
 *   Interval(-1, 1)
 * ) // true
 * ```
 *
 * @param {Interval} i
 * @returns {boolean}
 */
function zeroIn(i) {
    return hasValue(i, 0);
}
/**
 * Checks if `value` is included in the interval `x`
 *
 * @example
 * ```typescript
 * Interval.hasValue(
 *   Interval(-1, 1),
 *   0
 * ) // true
 * Interval.hasValue(
 *   Interval(-1, 1),
 *   10
 * ) // false
 * ```
 *
 * @param {Interval} i
 * @param {number} value
 * @returns {boolean}
 */
function hasValue(i, value) {
    if (isEmpty(i)) {
        return false;
    }
    return i.lo <= value && value <= i.hi;
}
/**
 * Checks if `x` is a subset of `y`
 *
 * @example
 * ```typescript
 * Interval.hasInteravl(
 *   Interval(0, 3),
 *   Interval(1, 2)
 * ) // true
 * Interval.hasInteravl(
 *   Interval(0, 3),
 *   Interval(1, 4)
 * ) // false
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @returns {boolean}
 */
function hasInterval(x, y) {
    if (isEmpty(x)) {
        return true;
    }
    return !isEmpty(y) && y.lo <= x.lo && x.hi <= y.hi;
}
/**
 * Checks if the intervals `x`, `y` overlap i.e. if they share at least one value
 *
 * @example
 * ```typescript
 * Interval.intervalsOverlap(
 *   Interval(0, 3),
 *   Interval(1, 2)
 * ) // true
 * Interval.intervalsOverlap(
 *   Interval(0, 2),
 *   Interval(1, 3)
 * ) // true
 * Interval.intervalsOverlap(
 *   Interval(0, 2),
 *   Interval(2, 3)
 * ) // true
 * Interval.intervalsOverlap(
 *   Interval(0, 1),
 *   Interval(2, 3)
 * ) // false
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @returns {boolean}
 */
function intervalsOverlap(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return false;
    }
    return (x.lo <= y.lo && y.lo <= x.hi) || (y.lo <= x.lo && x.lo <= y.hi);
}

const utils = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  isInterval,
  isEmpty,
  isWhole,
  isSingleton,
  zeroIn,
  hasValue,
  hasInterval,
  intervalsOverlap
}, Symbol.toStringTag, { value: 'Module' }));

var double = {exports: {}};

(function (module) {
	var hasTypedArrays = false;
	if(typeof Float64Array !== "undefined") {
	  var DOUBLE_VIEW = new Float64Array(1)
	    , UINT_VIEW   = new Uint32Array(DOUBLE_VIEW.buffer);
	  DOUBLE_VIEW[0] = 1.0;
	  hasTypedArrays = true;
	  if(UINT_VIEW[1] === 0x3ff00000) {
	    //Use little endian
	    module.exports = function doubleBitsLE(n) {
	      DOUBLE_VIEW[0] = n;
	      return [ UINT_VIEW[0], UINT_VIEW[1] ]
	    };
	    function toDoubleLE(lo, hi) {
	      UINT_VIEW[0] = lo;
	      UINT_VIEW[1] = hi;
	      return DOUBLE_VIEW[0]
	    }
	    module.exports.pack = toDoubleLE;
	    function lowUintLE(n) {
	      DOUBLE_VIEW[0] = n;
	      return UINT_VIEW[0]
	    }
	    module.exports.lo = lowUintLE;
	    function highUintLE(n) {
	      DOUBLE_VIEW[0] = n;
	      return UINT_VIEW[1]
	    }
	    module.exports.hi = highUintLE;
	  } else if(UINT_VIEW[0] === 0x3ff00000) {
	    //Use big endian
	    module.exports = function doubleBitsBE(n) {
	      DOUBLE_VIEW[0] = n;
	      return [ UINT_VIEW[1], UINT_VIEW[0] ]
	    };
	    function toDoubleBE(lo, hi) {
	      UINT_VIEW[1] = lo;
	      UINT_VIEW[0] = hi;
	      return DOUBLE_VIEW[0]
	    }
	    module.exports.pack = toDoubleBE;
	    function lowUintBE(n) {
	      DOUBLE_VIEW[0] = n;
	      return UINT_VIEW[1]
	    }
	    module.exports.lo = lowUintBE;
	    function highUintBE(n) {
	      DOUBLE_VIEW[0] = n;
	      return UINT_VIEW[0]
	    }
	    module.exports.hi = highUintBE;
	  } else {
	    hasTypedArrays = false;
	  }
	}
	if(!hasTypedArrays) {
	  var buffer = new Buffer(8);
	  module.exports = function doubleBits(n) {
	    buffer.writeDoubleLE(n, 0, true);
	    return [ buffer.readUInt32LE(0, true), buffer.readUInt32LE(4, true) ]
	  };
	  function toDouble(lo, hi) {
	    buffer.writeUInt32LE(lo, 0, true);
	    buffer.writeUInt32LE(hi, 4, true);
	    return buffer.readDoubleLE(0, true)
	  }
	  module.exports.pack = toDouble;  
	  function lowUint(n) {
	    buffer.writeDoubleLE(n, 0, true);
	    return buffer.readUInt32LE(0, true)
	  }
	  module.exports.lo = lowUint;
	  function highUint(n) {
	    buffer.writeDoubleLE(n, 0, true);
	    return buffer.readUInt32LE(4, true)
	  }
	  module.exports.hi = highUint;
	}

	module.exports.sign = function(n) {
	  return module.exports.hi(n) >>> 31
	};

	module.exports.exponent = function(n) {
	  var b = module.exports.hi(n);
	  return ((b<<1) >>> 21) - 1023
	};

	module.exports.fraction = function(n) {
	  var lo = module.exports.lo(n);
	  var hi = module.exports.hi(n);
	  var b = hi & ((1<<20) - 1);
	  if(hi & 0x7ff00000) {
	    b += (1<<20);
	  }
	  return [lo, b]
	};

	module.exports.denormalized = function(n) {
	  var hi = module.exports.hi(n);
	  return !(hi & 0x7ff00000)
	};
} (double));

var doubleBits = double.exports;

var SMALLEST_DENORM = Math.pow(2, -1074);
var UINT_MAX = (-1)>>>0;

var nextafter_1 = nextafter;

function nextafter(x, y) {
  if(isNaN(x) || isNaN(y)) {
    return NaN
  }
  if(x === y) {
    return x
  }
  if(x === 0) {
    if(y < 0) {
      return -SMALLEST_DENORM
    } else {
      return SMALLEST_DENORM
    }
  }
  var hi = doubleBits.hi(x);
  var lo = doubleBits.lo(x);
  if((y > x) === (x > 0)) {
    if(lo === UINT_MAX) {
      hi += 1;
      lo = 0;
    } else {
      lo += 1;
    }
  } else {
    if(lo === 0) {
      lo = UINT_MAX;
      hi -= 1;
    } else {
      lo -= 1;
    }
  }
  return doubleBits.pack(lo, hi)
}

/**
 * @module interval-arithmetic/round-math
 */
function identity(v) {
    return v;
}
function prev(v) {
    if (v === Infinity) {
        return v;
    }
    return nextafter_1(v, -Infinity);
}
function next(v) {
    if (v === -Infinity) {
        return v;
    }
    return nextafter_1(v, Infinity);
}
function toInteger(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}
const cache = {
    prev: prev,
    next: next
};
/**
 * @alias module:interval-arithmetic/round-math
 */
const round = {
    /**
     * Computes the previous IEEE floating point representation of `v`
     * @example
     * Interval.round.safePrev(1)          // 0.9999999999999999
     * Interval.round.safePrev(3)          // 2.9999999999999996
     * Interval.round.safePrev(Infinity)   // Infinity
     * @param {number} v
     * @return {number}
     * @function
     */
    safePrev: prev,
    /**
     * Computes the next IEEE floating point representation of `v`
     * @example
     * Interval.round.safeNext(1)          // 1.0000000000000002
     * Interval.round.safeNext(3)          // 3.0000000000000004
     * Interval.round.safeNext(-Infinity)  // -Infinity
     * @param {number} v
     * @return {number}
     * @function
     */
    safeNext: next,
    prev(x) {
        return cache.prev(x);
    },
    next(x) {
        return cache.next(x);
    },
    // prettier-ignore
    addLo(x, y) { return round.prev(x + y); },
    // prettier-ignore
    addHi(x, y) { return round.next(x + y); },
    // prettier-ignore
    subLo(x, y) { return round.prev(x - y); },
    // prettier-ignore
    subHi(x, y) { return round.next(x - y); },
    // prettier-ignore
    mulLo(x, y) { return round.prev(x * y); },
    // prettier-ignore
    mulHi(x, y) { return round.next(x * y); },
    // prettier-ignore
    divLo(x, y) { return round.prev(x / y); },
    // prettier-ignore
    divHi(x, y) { return round.next(x / y); },
    // prettier-ignore
    intLo(x) { return toInteger(round.prev(x)); },
    // prettier-ignore
    intHi(x) { return toInteger(round.next(x)); },
    // prettier-ignore
    logLo(x) { return round.prev(Math.log(x)); },
    // prettier-ignore
    logHi(x) { return round.next(Math.log(x)); },
    // prettier-ignore
    expLo(x) { return round.prev(Math.exp(x)); },
    // prettier-ignore
    expHi(x) { return round.next(Math.exp(x)); },
    // prettier-ignore
    sinLo(x) { return round.prev(Math.sin(x)); },
    // prettier-ignore
    sinHi(x) { return round.next(Math.sin(x)); },
    // prettier-ignore
    cosLo(x) { return round.prev(Math.cos(x)); },
    // prettier-ignore
    cosHi(x) { return round.next(Math.cos(x)); },
    // prettier-ignore
    tanLo(x) { return round.prev(Math.tan(x)); },
    // prettier-ignore
    tanHi(x) { return round.next(Math.tan(x)); },
    // prettier-ignore
    asinLo(x) { return round.prev(Math.asin(x)); },
    // prettier-ignore
    asinHi(x) { return round.next(Math.asin(x)); },
    // prettier-ignore
    acosLo(x) { return round.prev(Math.acos(x)); },
    // prettier-ignore
    acosHi(x) { return round.next(Math.acos(x)); },
    // prettier-ignore
    atanLo(x) { return round.prev(Math.atan(x)); },
    // prettier-ignore
    atanHi(x) { return round.next(Math.atan(x)); },
    // polyfill required for hyperbolic functions
    // prettier-ignore
    sinhLo(x) { return round.prev(Math.sinh(x)); },
    // prettier-ignore
    sinhHi(x) { return round.next(Math.sinh(x)); },
    // prettier-ignore
    coshLo(x) { return round.prev(Math.cosh(x)); },
    // prettier-ignore
    coshHi(x) { return round.next(Math.cosh(x)); },
    // prettier-ignore
    tanhLo(x) { return round.prev(Math.tanh(x)); },
    // prettier-ignore
    tanhHi(x) { return round.next(Math.tanh(x)); },
    /**
     * @ignore
     * ln(power) exponentiation of x
     * @param {number} x
     * @param {number} power
     * @returns {number}
     */
    powLo(x, power) {
        if (power % 1 !== 0) {
            // power has decimals
            return round.prev(Math.pow(x, power));
        }
        let y = (power & 1) === 1 ? x : 1;
        power >>= 1;
        while (power > 0) {
            x = round.mulLo(x, x);
            if ((power & 1) === 1) {
                y = round.mulLo(x, y);
            }
            power >>= 1;
        }
        return y;
    },
    /**
     * @ignore
     * ln(power) exponentiation of x
     * @param {number} x
     * @param {number} power
     * @returns {number}
     */
    powHi(x, power) {
        if (power % 1 !== 0) {
            // power has decimals
            return round.next(Math.pow(x, power));
        }
        let y = (power & 1) === 1 ? x : 1;
        power >>= 1;
        while (power > 0) {
            x = round.mulHi(x, x);
            if ((power & 1) === 1) {
                y = round.mulHi(x, y);
            }
            power >>= 1;
        }
        return y;
    },
    // prettier-ignore
    sqrtLo(x) { return round.prev(Math.sqrt(x)); },
    // prettier-ignore
    sqrtHi(x) { return round.next(Math.sqrt(x)); },
    /**
     * Most operations on intervals will cary the rounding error so that the
     * resulting interval correctly represents all the possible values, this feature
     * can be disabled by calling this method allowing a little boost in the
     * performance while operating on intervals
     *
     * @see module:interval-arithmetic/round-math.enable
     * @example
     * var x = Interval.add(
     *   Interval(1),
     *   Interval(1)
     * )
     * x // equal to {lo: 1.9999999999999998, hi: 2.0000000000000004}
     *
     * Interval.round.disable()
     * var y = Interval.add(
     *   Interval(1),
     *   Interval(1)
     * )
     * y // equal to {lo: 2, hi: 2}
     * @function
     */
    disable() {
        cache.next = cache.prev = identity;
    },
    /**
     * Enables IEEE previous/next floating point wrapping of values (enabled by
     * default)
     * @see module:interval-arithmetic/round-math.disable
     * @example
     * var x = Interval.add(
     *   Interval(1),
     *   Interval(1)
     * )
     * x // equal to {lo: 1.9999999999999998, hi: 2.0000000000000004}
     *
     * Interval.round.disable()
     * var y = Interval.add(
     *   Interval(1),
     *   Interval(1)
     * )
     * y // equal to {lo: 2, hi: 2}
     *
     * Interval.round.enable()
     * var z = Interval.add(
     *   Interval(1),
     *   Interval(1)
     * )
     * z // equal to {lo: 1.9999999999999998, hi: 2.0000000000000004}
     * @function
     */
    enable() {
        cache.next = next;
        cache.prev = prev;
    }
};

/**
 * Constructor for closed intervals representing all the values inside (and
 * including) `lo` and `hi` e.g. `[lo, hi]`
 *
 * NOTE: If `lo > hi` then the constructor will return an empty interval
 *
 * @mixes arithmetic
 * @mixes algebra
 * @mixes misc
 * @mixes relational
 * @mixes trigonometric
 * @mixes utils
 * @mixes constants
 *
 * @link #bounded
 * @link #boundedSingleton
 *
 * @example
 * ```typescript
 * new Interval(1, 2)  // {lo: 1, hi: 2}
 * // function invocation without new is also supported
 * Interval(1, 2)   // {lo: 1, hi: 2}
 * // with numbers
 * Interval(1, 2)   // {lo: 1, hi: 2}
 * Interval(1)      // {lo: 1, hi: 1}
 * // with an array
 * Interval([1, 2]) // {lo: 1, hi: 2}
 * // singleton intervals
 * var x = Interval(1)
 * var y = Interval(2)
 * Interval(x, y)   // {lo: 1, hi: 2}
 * // when `lo > hi` it returns an empty interval
 * Interval(2, 1)   // {lo: Infinity, hi: -Infinity}
 * // bounded interval
 * Interval().bounded(1, 2)  // { lo: 0.9999999999999999, hi: 2.0000000000000004 }
 * // singleton bounded interval
 * Interval().boundedSingleton(2)  // {lo: 1.9999999999999998, hi: 2.0000000000000004}
 * // half open and open intervals
 * // [2, 3]
 * Interval(2, 3)                     // {lo: 2, hi: 3}
 * // (2, 3]
 * Interval().halfOpenLeft(2, 3)      // {lo: 2.0000000000000004, hi: 3}
 * // [2, 3)
 * Interval().halfOpenRight(2, 3)     // {lo: 2, hi: 2.9999999999999996}
 * // (2, 3)
 * Interval().open(2, 3)              // {lo: 2.0000000000000004, hi: 2.9999999999999996}
 * ```
 *
 * @param {number|array|Interval} lo The left endpoint of the interval if it's a
 * number or a singleton interval, if it's an array then an interval will be
 * built out of the elements of the array
 * @param {number|Interval} [hi] The right endpoint of the interval if it's a
 * number or a singleton interval, if omitted then a singleton interval will be
 * built out of `lo`
 */
class _Interval {
    constructor(lo, hi) {
        /**
         * The left endpoint of the interval
         * @type {number}
         */
        this.lo = 0;
        /**
         * The right endpoint of the interval
         * @type {number}
         */
        this.hi = 0;
        if (!(this instanceof _Interval)) {
            console.log('calling with new');
            console.log(lo, hi);
            return new _Interval(lo, hi);
        }
        if (typeof lo !== 'undefined' && typeof hi !== 'undefined') {
            // possible cases:
            // - Interval(1, 2)
            // - Interval(Interval(1, 1), Interval(2, 2))     // singletons are required
            if (isInterval(lo)) {
                if (!isSingleton(lo)) {
                    throw new TypeError('Interval: interval `lo` must be a singleton');
                }
                lo = lo.lo;
            }
            if (isInterval(hi)) {
                if (!isSingleton(hi)) {
                    throw TypeError('Interval: interval `hi` must be a singleton');
                }
                hi = hi.hi;
            }
        }
        else if (typeof lo !== 'undefined') {
            // possible cases:
            // - Interval([1, 2])
            // - Interval([Interval(1, 1), Interval(2, 2)])
            if (Array.isArray(lo)) {
                return new Interval$1(lo[0], lo[1]);
            }
            // - Interval(1)
            return new Interval$1(lo, lo);
        }
        else {
            // possible cases:
            // - Interval()
            lo = hi = 0;
        }
        this.assign(lo, hi);
    }
    /**
     * Sets `this.lo` and `this.hi` to a single value `v`
     *
     * @param {number} v
     * @return {Interval} The calling interval i.e. `this`
     */
    singleton(v) {
        return this.set(v, v);
    }
    /**
     * Sets new endpoints to this interval, the left endpoint is equal to the
     * previous IEEE floating point value of `lo` and the right endpoint
     * is equal to the next IEEE floating point
     * value of `hi`, it's assumed that `lo <= hi`
     *
     * @example
     * ```typescript
     * const x = Interval().bounded(1, 2)
     * x.lo < 1 // true, x.lo === 0.9999999999999999
     * x.hi > 2 // true, x.hi === 2.0000000000000004
     * ```
     *
     * @example
     * ```typescript
     * // the correct representation of 1/3
     * var x = Interval().bounded(1/3, 1/3)
     * x.lo < 1/3 // true
     * x.hi > 1/3 // true
     * // however the floating point representation of 1/3 is less than the real 1/3
     * // therefore the left endpoint could be 1/3 instead of the previous value of
     * var next = Interval.round.safeNext
     * var x = Interval().set(1/3, next(1/3))
     * // x now represents 1/3 correctly
     * ```
     *
     * @param {number} lo
     * @param {number} hi
     * @return {Interval} The calling interval i.e. `this`
     */
    bounded(lo, hi) {
        return this.set(round.prev(lo), round.next(hi));
    }
    /**
     * Equivalent to `Interval().bounded(v, v)`
     * @param {number} v
     * @return {Interval} The calling interval i.e. `this`
     */
    boundedSingleton(v) {
        return this.bounded(v, v);
    }
    /**
     * Sets new endpoints for this interval, this method bypasses any
     * checks on the type of arguments
     *
     * @param {Number} lo The left endpoint of the interval
     * @param {Number} hi The right endpoint of the interval
     * @return {Interval} The calling interval
     */
    set(lo, hi) {
        this.lo = lo;
        this.hi = hi;
        return this;
    }
    /**
     * Sets new endpoints for this interval checking that both arguments exist
     * and that are valid numbers, additionally if `lo > hi` the interval is set to
     * an empty interval
     *
     * @param {Number} lo The left endpoint of the interval
     * @param {Number} hi The right endpoint of the interval
     * @return {Interval} The calling interval
     */
    assign(lo, hi) {
        if (typeof lo !== 'number' || typeof hi !== 'number') {
            throw TypeError('Interval#assign: arguments must be numbers');
        }
        if (isNaN(lo) || isNaN(hi) || lo > hi) {
            return this.setEmpty();
        }
        return this.set(lo, hi);
    }
    /**
     * Sets the endpoints of this interval to `[∞, -∞]` effectively representing
     * no values
     * @return {Interval} The calling interval
     */
    setEmpty() {
        return this.set(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    }
    /**
     * Sets the endpoints of this interval to `[-∞, ∞]` effectively representing all
     * the possible real values
     * @return {Interval} The calling interval
     */
    setWhole() {
        return this.set(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    }
    /**
     * Sets the endpoints of this interval to the open interval `(lo, hi)`
     *
     * NOTE: `Interval.round.disable` has no effect on this method
     *
     * @example
     * ```typescript
     * // (2, 3)
     * Interval().open(2, 3)  // {lo: 2.0000000000000004, hi: 2.9999999999999996}
     * ```
     *
     * @param {number} lo
     * @param {number} hi
     * @return {Interval} The calling interval
     */
    open(lo, hi) {
        return this.assign(round.safeNext(lo), round.safePrev(hi));
    }
    /**
     * Sets the endpoints of this interval to the half open interval `(lo, hi]`
     *
     * NOTE: `Interval.round.disable` has no effect on this method
     *
     * @example
     * ```typescript
     * // (2, 3]
     * Interval().halfOpenLeft(2, 3)  // {lo: 2.0000000000000004, hi: 3}
     * ```
     *
     * @param {number} lo
     * @param {number} hi
     * @return {Interval} The calling interval
     */
    halfOpenLeft(lo, hi) {
        return this.assign(round.safeNext(lo), hi);
    }
    /**
     * Sets the endpoints of this interval to the half open interval `[lo, hi)`
     *
     * NOTE: `Interval.round.disable` has no effect on this method
     *
     * @example
     * ```typescript
     * // [2, 3)
     * Interval.halfOpenRight(2, 3)     // {lo: 2, hi: 2.9999999999999996}
     * ```
     *
     * @param {number} lo
     * @param {number} hi
     * @return {Interval} The calling interval
     */
    halfOpenRight(lo, hi) {
        return this.assign(lo, round.safePrev(hi));
    }
    /**
     * Array representation of this interval
     * @return {array}
     */
    toArray() {
        return [this.lo, this.hi];
    }
    /**
     * Creates an interval equal to the calling one
     * @see Interval.clone
     * @name Interval.prototype
     * @example
     * ```typescript
     * var x = Interval(2, 3)
     * x.clone()    // Interval(2, 3)
     * ```
     * @return {Interval}
     */
    clone() {
        return new Interval$1().set(this.lo, this.hi);
    }
}
// @ts-ignore
function bindNew(Class) {
    function _Class() {
        for (var len = arguments.length, rest = Array(len), key = 0; key < len; key++) {
            rest[key] = arguments[key];
        }
        // @ts-ignore
        return new (Function.prototype.bind.apply(Class, [null].concat(rest)))();
    }
    _Class.prototype = Class.prototype;
    return _Class;
}
const Interval$1 = bindNew(_Interval);
// @ts-ignore
Interval$1.factory = Interval$1;

const piLow = (3373259426.0 + 273688.0 / (1 << 21)) / (1 << 30);
const piHigh = (3373259426.0 + 273689.0 / (1 << 21)) / (1 << 30);
/**
 * @mixin constants
 */
const constants = {
    /**
     * Previous IEEE floating point value of PI (equal to Math.PI)
     * 3.141592653589793
     * @memberof constants
     * @type {number}
     */
    PI_LOW: piLow,
    /**
     * Next IEEE floating point value of PI, 3.1415926535897936
     * @memberof constants
     * @type {number}
     */
    PI_HIGH: piHigh,
    PI_HALF_LOW: piLow / 2,
    PI_HALF_HIGH: piHigh / 2,
    PI_TWICE_LOW: piLow * 2,
    PI_TWICE_HIGH: piHigh * 2,
    /**
     * An interval that represents PI, NOTE: calls to Interval.PI always return
     * a new interval representing PI
     * @memberof constants
     * @static
     * @example
     * ```typescript
     * Interval.E
     * ```
     * @name E
     * @type {Interval}
     */
    get E() {
        return new Interval$1(round.prev(Math.E), round.next(Math.E));
    },
    /**
     * An interval that represents Euler's constant e, NOTE: calls to Interval.E always return
     * a new interval representing PI
     * @memberof constants
     * @static
     * @example
     * ```typescript
     * Interval(Interval.PI_LOW, Interval.PI_HIGH)
     * ```
     * @name PI
     * @type {Interval}
     */
    get PI() {
        return new Interval$1(piLow, piHigh);
    },
    /**
     * An interval that represents `PI / 2`, NOTE: calls to `Interval.PI_HALF` always
     * return a new interval representing `PI / 2`
     * @memberof constants
     * @static
     * @example
     * ```typescript
     * Interval(Interval.PI_LOW / 2, Interval.PI_HIGH / 2)
     * ```
     * @name PI_HALF
     * @type {Interval}
     */
    get PI_HALF() {
        return new Interval$1(constants.PI_HALF_LOW, constants.PI_HALF_HIGH);
    },
    /**
     * An interval that represents `PI * 2` NOTE: calls to `Interval.PI_TWICE` always
     * return a new interval representing `PI * 2`
     * @memberof constants
     * @static
     * @example
     * ```typescript
     * Interval(Interval.PI_LOW * 2, Interval.PI_HIGH * 2)
     * ```
     * @name PI_TWICE
     * @type {Interval}
     */
    get PI_TWICE() {
        return new Interval$1(constants.PI_TWICE_LOW, constants.PI_TWICE_HIGH);
    },
    /**
     * An interval that represents 0, NOTE: calls to `Interval.ZERO` always return a new interval representing 0
     * @memberof constants
     * @static
     * @example
     * ```typescript
     * // Interval.ZERO is equivalent to
     * Interval(0)
     * ```
     * @name ZERO
     * @type {Interval}
     */
    get ZERO() {
        return new Interval$1(0);
    },
    /**
     * An interval that represents 1, NOTE: calls to Interval.ONE always
     * return a new interval representing 1
     * @memberof constants
     * @static
     * @example
     * // Interval.ONE is equivalent to
     * Interval(1)
     * @name ONE
     * @type {Interval}
     */
    get ONE() {
        return new Interval$1(1);
    },
    /**
     * An interval that represents all the real values
     * NOTE: calls to Interval.WHOLE always return a new interval representing all the real values
     * @memberof constants
     * @static
     * @example
     * ```typescript
     * // Interval.WHOLE is equivalent to
     * Interval().setWhole()
     * ```
     * @name WHOLE
     * @type {Interval}
     */
    get WHOLE() {
        return new Interval$1().setWhole();
    },
    /**
     * An interval that represents no values
     * NOTE: calls to Interval.EMPTY always return a new interval representing no values
     * @memberof constants
     * @static
     * @example
     * ```typescript
     * // Interval.EMPTY is equivalent to
     * Interval().setEmpty()
     * ```
     * @name EMPTY
     * @type {Interval}
     */
    get EMPTY() {
        return new Interval$1().setEmpty();
    }
};

// boost/numeric/interval_lib/compare/certain package on boost
/**
 * @mixin relational
 */
/**
 * Checks if the intervals `x`, `y` are equal, they're equal when
 * `x.lo === y.lo` and `x.hi === y.hi`, a corner case handled is when `x` and
 * `y` are both empty intervals
 *
 * @example
 * ```typescript
 * Interval.equal(
 *   Interval(2, 3),
 *   Interval(2, 3)
 * ) // true
 * ```
 *
 * @example
 * ```typescript
 * Interval.equal(
 *   Interval.EMPTY,
 *   Interval.EMPTY
 * ) // true
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @returns {boolean}
 */
function equal(x, y) {
    if (isEmpty(x)) {
        return isEmpty(y);
    }
    return !isEmpty(y) && x.lo === y.lo && x.hi === y.hi;
}
// <debug>
const EPS = 1e-7;
function assert(a, message) {
    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!a) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        throw new Error(message || 'assertion failed');
    }
}
function assertEps(a, b) {
    if (!isFinite(a)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return assert(a === b, `[Infinity] expected ${a} to be ${b}`);
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    assert(Math.abs(a - b) < EPS, `expected ${a} to be close to ${b}`);
}
function almostEqual(x, y) {
    x = Array.isArray(x) ? x : x.toArray();
    y = Array.isArray(y) ? y : y.toArray();
    assertEps(x[0], y[0]);
    assertEps(x[1], y[1]);
}
function assertIncludes(x, y) {
    // checks that `y` is included in `x` with the bounds close to `x`
    almostEqual(x, y);
    x = Array.isArray(x) ? x : x.toArray();
    y = Array.isArray(y) ? y : y.toArray();
    assert(x[0] <= y[0], `${x[0]} should be less/equal than ${y[0]}`);
    assert(y[1] <= x[1], `${y[1]} should be less/equal than ${x[1]}`);
}
// </debug>
/**
 * Checks if the intervals `x`, `y` are not equal i.e. when the intervals don't
 * share any value
 *
 * @example
 * ```typescript
 * Interval.notEqual(
 *   Interval(2, 3),
 *   Interval(4, 5)
 * ) // true
 * ```
 *
 * @example
 * ```typescript
 * Interval.notEqual(
 *   Interval(2, 3),
 *   Interval(3, 5)
 * ) // false
 * ```
 *
 * @example
 * ```typescript
 * Interval.notEqual(
 *   Interval(2, 4),
 *   Interval(3, 5)
 * ) // false
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @returns {boolean}
 */
function notEqual(x, y) {
    if (isEmpty(x)) {
        return !isEmpty(y);
    }
    return isEmpty(y) || x.hi < y.lo || x.lo > y.hi;
}
/**
 * Checks if the interval `x` is less than `y` i.e. if all the values of `x`
 * are lower than the left endpoint of `y`
 *
 * @example
 * ```typescript
 * Interval.lessThan(
 *   Interval(2, 3),
 *   Interval(4, 5)
 * ) // true
 * ```
 *
 * @example
 * ```typescript
 * Interval.lessThan(
 *   Interval(4, 5),
 *   Interval(2, 3)
 * ) // false
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {boolean}
 */
function lessThan(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return false;
    }
    return x.hi < y.lo;
}
/**
 * Alias for {@link lessThan}
 * @function
 */
const lt = lessThan;
/**
 * Checks if the interval `x` is greater than `y` i.e. if all the values of `x`
 * are greater than the right endpoint of `y`
 *
 * @example
 * ```typescript
 * Interval.greaterThan(
 *   Interval(2, 3),
 *   Interval(4, 5)
 * ) // false
 * ```
 *
 * @example
 * ```typescript
 * Interval.greaterThan(
 *   Interval(4, 5),
 *   Interval(2, 3)
 * ) // true
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {boolean}
 */
function greaterThan(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return false;
    }
    return x.lo > y.hi;
}
/**
 * Alias for {@link greaterThan}
 * @function
 */
const gt = greaterThan;
/**
 * Checks if the interval `x` is less or equal than `y` i.e.
 * if all the values of `x` are lower or equal to the left endpoint of `y`
 *
 * @example
 * ```typescript
 * Interval.lessEqualThan(
 *   Interval(2, 3),
 *   Interval(3, 5)
 * ) // true
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {boolean}
 */
function lessEqualThan(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return false;
    }
    return x.hi <= y.lo;
}
/**
 * Alias for {@link lessEqualThan}
 * @function
 */
const leq = lessEqualThan;
/**
 * Checks if the interval `x` is greater or equal than `y` i.e.
 * if all the values of `x` are greater or equal to the right endpoint of `y`
 * @param {Interval} x
 * @param {Interval} y
 * @return {boolean}
 */
function greaterEqualThan(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return false;
    }
    return x.lo >= y.hi;
}
/**
 * Alias for {@link greaterEqualThan}
 * @function
 */
const geq = greaterEqualThan;

const relational = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  equal,
  almostEqual,
  assertIncludes,
  notEqual,
  lessThan,
  lt,
  greaterThan,
  gt,
  lessEqualThan,
  leq,
  greaterEqualThan,
  geq
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * Division between intervals when `y` doesn't contain zero
 * @param {Interval} x
 * @param {Interval} y
 * @returns {Interval}
 */
function nonZero(x, y) {
    const xl = x.lo;
    const xh = x.hi;
    const yl = y.lo;
    const yh = y.hi;
    const out = new Interval$1();
    if (xh < 0) {
        if (yh < 0) {
            out.lo = round.divLo(xh, yl);
            out.hi = round.divHi(xl, yh);
        }
        else {
            out.lo = round.divLo(xl, yl);
            out.hi = round.divHi(xh, yh);
        }
    }
    else if (xl < 0) {
        if (yh < 0) {
            out.lo = round.divLo(xh, yh);
            out.hi = round.divHi(xl, yh);
        }
        else {
            out.lo = round.divLo(xl, yl);
            out.hi = round.divHi(xh, yl);
        }
    }
    else {
        if (yh < 0) {
            out.lo = round.divLo(xh, yh);
            out.hi = round.divHi(xl, yl);
        }
        else {
            out.lo = round.divLo(xl, yh);
            out.hi = round.divHi(xh, yl);
        }
    }
    return out;
}
/**
 * Division between an interval and a positive constant
 * @param {Interval} x
 * @param {number} v
 * @returns {Interval}
 */
function positive$1(x, v) {
    if (x.lo === 0 && x.hi === 0) {
        return x;
    }
    if (zeroIn(x)) {
        // mixed considering zero in both ends
        return constants.WHOLE;
    }
    if (x.hi < 0) {
        // negative / v
        return new Interval$1(Number.NEGATIVE_INFINITY, round.divHi(x.hi, v));
    }
    else {
        // positive / v
        return new Interval$1(round.divLo(x.lo, v), Number.POSITIVE_INFINITY);
    }
}
/**
 * Division between an interval and a negative constant
 * @param {Interval} x
 * @param {number} v
 * @returns {Interval}
 */
function negative$1(x, v) {
    if (x.lo === 0 && x.hi === 0) {
        return x;
    }
    if (zeroIn(x)) {
        // mixed considering zero in both ends
        return constants.WHOLE;
    }
    if (x.hi < 0) {
        // negative / v
        return new Interval$1(round.divLo(x.hi, v), Number.POSITIVE_INFINITY);
    }
    else {
        // positive / v
        return new Interval$1(Number.NEGATIVE_INFINITY, round.divHi(x.lo, v));
    }
}
/**
 * Division between an interval and zero
 * @param {Interval} x
 * @returns {Interval}
 */
function zero(x) {
    if (x.lo === 0 && x.hi === 0) {
        return x;
    }
    return constants.WHOLE;
}

/**
 * @mixin arithmetic
 */
/**
 * Adds two intervals
 *
 * @example
 * ```typescript
 * Interval.add(
 *   Interval(0, 1),
 *   Interval(1, 2),
 * )   // Interval(prev(1), next(3))
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function add(x, y) {
    return new Interval$1(round.addLo(x.lo, y.lo), round.addHi(x.hi, y.hi));
}
/**
 * Subtracts two intervals
 *
 * @example
 * ```typescript
 * Interval.subtract(
 *   Interval(0, 1),
 *   Interval(1, 2),
 * )   // Interval(prev(-2), next(0))
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function subtract(x, y) {
    return new Interval$1(round.subLo(x.lo, y.hi), round.subHi(x.hi, y.lo));
}
/**
 * Alias for {@link subtract}
 * @function
 */
const sub = subtract;
/**
 * Multiplies two intervals, an explanation of all the possible cases ca
 * be found on [Interval Arithmetic: from Principles to Implementation - T. Hickey, Q. Ju, M.H. van Emden](http://fab.cba.mit.edu/classes/S62.12/docs/Hickey_interval.pdf)
 *
 * @example
 * ```typescript
 * Interval.multiply(
 *  Interval(1, 2),
 *  Interval(2, 3)
 * ) // Interval(prev(2), next(6))
 * ```
 *
 * @example
 * ```typescript
 * Interval.multiply(
 *  Interval(1, Infinity),
 *  Interval(4, 6)
 * ) // Interval(prev(4), Infinity)
 * ```
 *
 * @example
 * ```typescript
 * Interval.multiply(
 *  Interval(1, 2),
 *  Interval(-3, -2)
 * ) // Interval(prev(-6), next(-2))
 * ```
 *
 * @example
 * ```typescript
 * Interval.multiply(
 *  Interval(1, 2),
 *  Interval(-2, 3)
 * ) // Interval(prev(-4), next(6))
 * ```
 *
 * @example
 * ```typescript
 * Interval.multiply(
 *  Interval(-2, -1),
 *  Interval(-3, -2)
 * ) // Interval(prev(2), next(6))
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function multiply(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return constants.EMPTY;
    }
    const xl = x.lo;
    const xh = x.hi;
    const yl = y.lo;
    const yh = y.hi;
    const out = new Interval$1();
    if (xl < 0) {
        if (xh > 0) {
            if (yl < 0) {
                if (yh > 0) {
                    // mixed * mixed
                    out.lo = Math.min(round.mulLo(xl, yh), round.mulLo(xh, yl));
                    out.hi = Math.max(round.mulHi(xl, yl), round.mulHi(xh, yh));
                }
                else {
                    // mixed * negative
                    out.lo = round.mulLo(xh, yl);
                    out.hi = round.mulHi(xl, yl);
                }
            }
            else {
                if (yh > 0) {
                    // mixed * positive
                    out.lo = round.mulLo(xl, yh);
                    out.hi = round.mulHi(xh, yh);
                }
                else {
                    // mixed * zero
                    out.lo = 0;
                    out.hi = 0;
                }
            }
        }
        else {
            if (yl < 0) {
                if (yh > 0) {
                    // negative * mixed
                    out.lo = round.mulLo(xl, yh);
                    out.hi = round.mulHi(xl, yl);
                }
                else {
                    // negative * negative
                    out.lo = round.mulLo(xh, yh);
                    out.hi = round.mulHi(xl, yl);
                }
            }
            else {
                if (yh > 0) {
                    // negative * positive
                    out.lo = round.mulLo(xl, yh);
                    out.hi = round.mulHi(xh, yl);
                }
                else {
                    // negative * zero
                    out.lo = 0;
                    out.hi = 0;
                }
            }
        }
    }
    else {
        if (xh > 0) {
            if (yl < 0) {
                if (yh > 0) {
                    // positive * mixed
                    out.lo = round.mulLo(xh, yl);
                    out.hi = round.mulHi(xh, yh);
                }
                else {
                    // positive * negative
                    out.lo = round.mulLo(xh, yl);
                    out.hi = round.mulHi(xl, yh);
                }
            }
            else {
                if (yh > 0) {
                    // positive * positive
                    out.lo = round.mulLo(xl, yl);
                    out.hi = round.mulHi(xh, yh);
                }
                else {
                    // positive * zero
                    out.lo = 0;
                    out.hi = 0;
                }
            }
        }
        else {
            // zero * any other value
            out.lo = 0;
            out.hi = 0;
        }
    }
    return out;
}
/**
 * Alias for {@link multiply}
 * @function
 */
const mul = multiply;
/**
 * Computes x/y, an explanation of all the possible cases ca
 * be found on [Interval Arithmetic: from Principles to Implementation - T. Hickey, Q. Ju, M.H. van Emden](http://fab.cba.mit.edu/classes/S62.12/docs/Hickey_interval.pdf)
 *
 * NOTE: an extreme case of division might results in multiple
 * intervals, unfortunately this library doesn't support multi-interval
 * arithmetic yet so a single interval will be returned instead with
 * the {@link hull} of the resulting intervals (this is the way
 * Boost implements it too)
 *
 * @example
 * ```typescript
 * Interval.divide(
 *   Interval(1, 2),
 *   Interval(3, 4)
 * ) // Interval(prev(1/4), next(2/3))
 * ```
 *
 * @example
 * ```typescript
 * Interval.divide(
 *   Interval(-2, 1),
 *   Interval(-4, -3)
 * ) // Interval(prev(-1/3), next(2/3))
 * ```
 *
 * @example
 * ```typescript
 * Interval.divide(
 *   Interval(1, 2),
 *   Interval(-1, 1)
 * ) // Interval(-Infinity, Infinity)
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function divide(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return constants.EMPTY;
    }
    if (zeroIn(y)) {
        if (y.lo !== 0) {
            if (y.hi !== 0) {
                return zero(x);
            }
            else {
                return negative$1(x, y.lo);
            }
        }
        else {
            if (y.hi !== 0) {
                return positive$1(x, y.hi);
            }
            else {
                return constants.EMPTY;
            }
        }
    }
    else {
        return nonZero(x, y);
    }
}
/**
 * Alias for {@link divide}
 * @function
 */
const div = divide;
/**
 * Computes +x (identity function)
 * @link clone
 *
 * @example
 * ```typescript
 * Interval.positive(
 *  Interval(1, 2)
 * )  // Interval(1, 2)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function positive(x) {
    return new Interval$1(x.lo, x.hi);
}
/**
 * Computes -x
 *
 * @example
 * ```typescript
 * Interval.negative(
 *   Interval(1, 2)
 * )  // Interval(-2, -1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.negative(
 *   Interval(-Infinity, Infinity)
 * )  // Interval(-Infinity, Infinity)
 * ```
 *
 * @example
 * ```typescript
 * Interval.negative(
 *   Interval.WHOLE
 * )  // Interval.WHOLE
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function negative(x) {
    return new Interval$1(-x.hi, -x.lo);
}

const arithmetic = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  add,
  subtract,
  sub,
  multiply,
  mul,
  divide,
  div,
  positive,
  negative
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * @mixin algebra
 */
/**
 * Computes `x mod y (x - k * y)`
 *
 * @example
 * ```typescript
 * Interval.fmod(
 *   Interval(5.3, 5.3),
 *   Interval(2, 2)
 * ) // Interval(1.3, 1.3)
 * Interval.fmod(
 *   Interval(5, 7),
 *   Interval(2, 3)
 * ) // Interval(2, 5)
 * // explanation: [5, 7] - [2, 3] * 1 = [2, 5]
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function fmod(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return constants.EMPTY;
    }
    const yb = x.lo < 0 ? y.lo : y.hi;
    let n = x.lo / yb;
    if (n < 0)
        n = Math.ceil(n);
    else
        n = Math.floor(n);
    // x mod y = x - n * y
    return sub(x, mul(y, new Interval$1(n)));
}
/**
 * Computes `1 / x`
 *
 * @example
 * ```typescript
 * Interval.multiplicativeInverse(
 *   Interval(2, 6)
 * )  // Interval(1/6, 1/2)
 * Interval.multiplicativeInverse(
 *   Interval(-6, -2)
 * )  // Interval(-1/2, -1/6)
 * ```
 *
 * @param {Interval} x
 * @returns {Interval}
 */
function multiplicativeInverse(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    if (zeroIn(x)) {
        if (x.lo !== 0) {
            if (x.hi !== 0) {
                // [negative, positive]
                return constants.WHOLE;
            }
            else {
                // [negative, zero]
                return new Interval$1(Number.NEGATIVE_INFINITY, round.divHi(1, x.lo));
            }
        }
        else {
            if (x.hi !== 0) {
                // [zero, positive]
                return new Interval$1(round.divLo(1, x.hi), Number.POSITIVE_INFINITY);
            }
            else {
                // [zero, zero]
                return constants.EMPTY;
            }
        }
    }
    else {
        // [positive, positive]
        return new Interval$1(round.divLo(1, x.hi), round.divHi(1, x.lo));
    }
}
/**
 * Computes `x^power` given that `power` is an integer
 *
 * If `power` is an Interval it must be a singletonInterval i.e. `x^x` is not
 * supported yet
 *
 * If `power` is a rational number use {@link nthRoot} instead
 *
 * @example
 * ```typescript
 * // 2^{-2}
 * Interval.pow(
 *   Interval(2, 2),
 *   -2
 * )  // Interval(1/4, 1/4)
 * // [2,3]^2
 * Interval.pow(
 *   Interval(2, 3),
 *   2
 * )  // Interval(4, 9)
 * // [2,3]^0
 * Interval.pow(
 *   Interval(2, 3),
 *   0
 * )  // Interval(1, 1)
 * // with a singleton interval
 * Interval.pow(
 *   Interval(2, 3),
 *   Interval(2)
 * )  // Interval(4, 9)
 * ```
 *
 * @param {Interval} x
 * @param {number|Interval} power A number of a singleton interval
 * @returns {Interval}
 */
function pow(x, power) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    if (typeof power === 'object') {
        if (!isSingleton(power)) {
            return constants.EMPTY;
        }
        power = power.lo;
    }
    if (power === 0) {
        if (x.lo === 0 && x.hi === 0) {
            // 0^0
            return constants.EMPTY;
        }
        else {
            // x^0
            return constants.ONE;
        }
    }
    else if (power < 0) {
        // compute [1 / x]^-power if power is negative
        return pow(multiplicativeInverse(x), -power);
    }
    // power > 0
    if (Number.isSafeInteger(power)) {
        // power is integer
        if (x.hi < 0) {
            // [negative, negative]
            // assume that power is even so the operation will yield a positive interval
            // if not then just switch the sign and order of the interval bounds
            const yl = round.powLo(-x.hi, power);
            const yh = round.powHi(-x.lo, power);
            if ((power & 1) === 1) {
                // odd power
                return new Interval$1(-yh, -yl);
            }
            else {
                // even power
                return new Interval$1(yl, yh);
            }
        }
        else if (x.lo < 0) {
            // [negative, positive]
            if ((power & 1) === 1) {
                return new Interval$1(-round.powLo(-x.lo, power), round.powHi(x.hi, power));
            }
            else {
                // even power means that any negative number will be zero (min value = 0)
                // and the max value will be the max of x.lo^power, x.hi^power
                return new Interval$1(0, round.powHi(Math.max(-x.lo, x.hi), power));
            }
        }
        else {
            // [positive, positive]
            return new Interval$1(round.powLo(x.lo, power), round.powHi(x.hi, power));
        }
    }
    else {
        console.warn('power is not an integer, you should use nth-root instead, returning an empty interval');
        return constants.EMPTY;
    }
}
/**
 * Computes `sqrt(x)`, alias for `nthRoot(x, 2)`
 *
 * @example
 * ```typescript
 * Interval.sqrt(
 *   Interval(4, 9)
 * ) // Interval(prev(2), next(3))
 * ```
 *
 * @param {Interval} x
 * @returns {Interval}
 */
function sqrt(x) {
    return nthRoot(x, 2);
}
/**
 * Computes `x^(1/n)`
 *
 * @example
 * ```typescript
 * Interval.nthRoot(
 *   Interval(-27, -8),
 *   3
 * ) // Interval(-3, -2)
 * ```
 *
 * @param {Interval} x
 * @param {number|Interval} n A number or a singleton interval
 * @return {Interval}
 */
function nthRoot(x, n) {
    if (isEmpty(x) || n < 0) {
        // compute 1 / x^-power if power is negative
        return constants.EMPTY;
    }
    // singleton interval check
    if (typeof n === 'object') {
        if (!isSingleton(n)) {
            return constants.EMPTY;
        }
        n = n.lo;
    }
    const power = 1 / n;
    if (x.hi < 0) {
        // [negative, negative]
        if (Number.isSafeInteger(n) && (n & 1) === 1) {
            // when n is odd we can always take the nth root
            const yl = round.powHi(-x.lo, power);
            const yh = round.powLo(-x.hi, power);
            return new Interval$1(-yl, -yh);
        }
        // n is not odd therefore there's no nth root
        return constants.EMPTY;
    }
    else if (x.lo < 0) {
        // [negative, positive]
        const yp = round.powHi(x.hi, power);
        if (Number.isSafeInteger(n) && (n & 1) === 1) {
            // nth root of x.lo is possible (n is odd)
            const yn = -round.powHi(-x.lo, power);
            return new Interval$1(yn, yp);
        }
        return new Interval$1(0, yp);
    }
    else {
        // [positive, positive]
        return new Interval$1(round.powLo(x.lo, power), round.powHi(x.hi, power));
    }
}

const algebra = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  fmod,
  multiplicativeInverse,
  pow,
  sqrt,
  nthRoot
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * @mixin misc
 */
/**
 * Computes e^x where e is the mathematical constant equal to the base of the
 * natural logarithm
 *
 * @example
 * ```typescript
 * Interval.exp(
 *   Interval(-1, 1)
 * )  // Interval(0.3679, 2.7183)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function exp(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    return new Interval$1(round.expLo(x.lo), round.expHi(x.hi));
}
/**
 * Computes the natural logarithm of x
 *
 * @example
 * ```typescript
 * Interval.log(
 *   Interval(1, Math.exp(3))
 * )  // Interval(0, 3)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function log(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    const l = x.lo <= 0 ? Number.NEGATIVE_INFINITY : round.logLo(x.lo);
    return new Interval$1(l, round.logHi(x.hi));
}
/**
 * Alias for {@link log}
 * @function
 */
const ln = log;
const LOG_EXP_10 = log(new Interval$1(10, 10));
/**
 * Computes the logarithm base 10 of x
 *
 * @example
 * ```typescript
 * Interval.log10(
 *   Interva(1, 1000)
 * )  // Interval(0, 3)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function log10(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    return div(log(x), LOG_EXP_10);
}
const LOG_EXP_2 = log(new Interval$1(2, 2));
/**
 * Computes the logarithm base 2 of x
 *
 * @example
 * ```typescript
 * Interval.log10(
 *   Interva(1, 8)
 * )  // Interval(0, 3)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function log2(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    return div(log(x), LOG_EXP_2);
}
/**
 * Computes an interval that has all the values of x and y, note that it may be
 * possible that values that don't belong to either x or y are included in the
 * interval that represents the hull
 *
 * @example
 * ```typescript
 * Interval.hull(
 *   Interval(-1, 1),
 *   Interval(5, 7)
 * )  // Interval(-1, 7)
 * Interval.hull(
 *   Interval(-1, 1),
 *   Interval.EMPTY
 * )  // Interval(-1, 1)
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function hull(x, y) {
    const badX = isEmpty(x);
    const badY = isEmpty(y);
    if (badX && badY) {
        return constants.EMPTY;
    }
    else if (badX) {
        return y.clone();
    }
    else if (badY) {
        return x.clone();
    }
    else {
        return new Interval$1(Math.min(x.lo, y.lo), Math.max(x.hi, y.hi));
    }
}
/**
 * Computes an interval that has all the values that belong to both x and y
 *
 * @example
 * ```typescript
 * Interval.intersection(
 *   Interval(-1, 1),
 *   Interval(0, 7)
 * )  // Interval(0, 1)
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function intersection(x, y) {
    if (isEmpty(x) || isEmpty(y)) {
        return constants.EMPTY;
    }
    const lo = Math.max(x.lo, y.lo);
    const hi = Math.min(x.hi, y.hi);
    if (lo <= hi) {
        return new Interval$1(lo, hi);
    }
    return constants.EMPTY;
}
/**
 * Computes an interval that has all the values that belong to both x and y,
 * the difference with {@link hull} is that x and y must overlap to
 * compute the union
 *
 * @example
 * ```typescript
 * Interval.union(
 *   Interval(-1, 1),
 *   Interval(5, 7)
 * )  // throws error
 * Interval.union(
 *   Interval(-1, 1),
 *   Interval(1, 7)
 * )  // Interval(-1, 7)
 * ```
 *
 * @throws {Error} When x and y don't overlap
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function union(x, y) {
    if (!intervalsOverlap(x, y)) {
        throw Error('Interval#union: intervals do not overlap');
    }
    return new Interval$1(Math.min(x.lo, y.lo), Math.max(x.hi, y.hi));
}
/**
 * Computes the difference between `x` and `y`, i.e. an interval with all the
 * values of `x` that are not in `y`
 *
 * @example
 * ```typescript
 * Interval.difference(
 *   Interval(3, 5),
 *   Interval(4, 6)
 * )  // Interval(3, prev(4))
 * Interval.difference(
 *   Interval(0, 3),
 *   Interval(0, 1)
 * )  // Interval(next(1), 3)
 * Interval.difference(
 *   Interval(0, 1),
 *   Interval.WHOLE
 * )  // Interval.EMPTY
 * Interval.difference(
 *   Interval(-Infinity, 0),
 *   Interval.WHOLE
 * )  // Interval.EMPTY
 * ```
 *
 * @throws {Error} When the difference creates multiple intervals
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function difference(x, y) {
    if (isEmpty(x) || isWhole(y)) {
        return constants.EMPTY;
    }
    if (intervalsOverlap(x, y)) {
        if (x.lo < y.lo && y.hi < x.hi) {
            // difference creates multiple subsets
            throw Error('Interval.difference: difference creates multiple intervals');
        }
        // handle corner cases first
        if ((y.lo <= x.lo && y.hi === Infinity) || (y.hi >= x.hi && y.lo === -Infinity)) {
            return constants.EMPTY;
        }
        // NOTE: empty interval is handled automatically
        // e.g.
        //
        //    n = difference([0,1], [0,1]) // n = Interval(next(1), 1) = EMPTY
        //    isEmpty(n) === true
        //
        if (y.lo <= x.lo) {
            return new Interval$1().halfOpenLeft(y.hi, x.hi);
        }
        // y.hi >= x.hi
        return new Interval$1().halfOpenRight(x.lo, y.lo);
    }
    return x.clone();
}
/**
 * Computes the distance between the endpoints of the interval i.e. `x.hi - x.lo`
 *
 * @example
 * ```typescript
 * Interval.width(
 *   Interval(1, 2)
 * )  // 1
 * Interval.width(
 *   Interval(-1, 1)
 * )  // 2
 * Interval.width(
 *   Interval(1, 1)
 * )  // next(0) ~5e-324
 * Interval.width(
 *   Interval.EMPTY
 * )  // 0
 * ```
 *
 * @param {Interval} x
 * @returns {number}
 */
function width(x) {
    if (isEmpty(x)) {
        return 0;
    }
    return round.subHi(x.hi, x.lo);
}
/**
 * Alias for {@link  width}
 * @function
 */
const wid = width;
/**
 * Computes the absolute value of `x`
 *
 * @example
 * ```typescript
 * Interval.abs(
 *   Interval(2, 3)
 * )  // Interval(2, 3)
 * Interval.abs(
 *   Interval(-2, 3)
 * )  // Interval(2, 3)
 * Interval.abs(
 *   Interval(-3, -2)
 * )  // Interval(2, 3)
 * Interval.abs(
 *   Interval(-3, 2)
 * )  // Interval(0, 3)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function abs(x) {
    if (isEmpty(x) || isWhole(x)) {
        return constants.EMPTY;
    }
    if (x.lo >= 0) {
        return x.clone();
    }
    if (x.hi <= 0) {
        return negative(x);
    }
    return new Interval$1(0, Math.max(-x.lo, x.hi));
}
/**
 * Computes an interval with the maximum values for each endpoint based on `x`
 * and `y`
 *
 * @example
 * ```typescript
 * Interval.max(
 *   Interval(0, 3),
 *   Interval(1, 2)
 * )  // Interval(1, 3)
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function max(x, y) {
    const badX = isEmpty(x);
    const badY = isEmpty(y);
    if (badX && badY) {
        return constants.EMPTY;
    }
    else if (badX) {
        return y.clone();
    }
    else if (badY) {
        return x.clone();
    }
    else {
        return new Interval$1(Math.max(x.lo, y.lo), Math.max(x.hi, y.hi));
    }
}
/**
 * Computes an interval with the minimum values for each endpoint based on `x` and `y`
 *
 * @example
 * ```typescript
 * Interval.min(
 *   Interval(0, 3),
 *   Interval(1, 2)
 * )  // Interval(0, 2)
 * ```
 *
 * @param {Interval} x
 * @param {Interval} y
 * @return {Interval}
 */
function min(x, y) {
    const badX = isEmpty(x);
    const badY = isEmpty(y);
    if (badX && badY) {
        return constants.EMPTY;
    }
    else if (badX) {
        return y.clone();
    }
    else if (badY) {
        return x.clone();
    }
    else {
        return new Interval$1(Math.min(x.lo, y.lo), Math.min(x.hi, y.hi));
    }
}
/**
 * Creates an interval equal to `x`, equivalent to `Interval().set(x.lo, x.hi)`
 *
 * @example
 * ```typescript
 * Interval.clone(
 *   Interval(1, 2)
 * )  // Interval(1, 2)
 * Interval.clone(
 *   Interval.EMPTY
 * )  // Interval.EMPTY
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function clone(x) {
    // no bound checking
    return new Interval$1().set(x.lo, x.hi);
}

const misc = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  exp,
  log,
  ln,
  LOG_EXP_10,
  log10,
  LOG_EXP_2,
  log2,
  hull,
  intersection,
  union,
  difference,
  width,
  wid,
  abs,
  max,
  min,
  clone
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * @mixin trigonometric
 */
/**
 * Checks if an interval is
 * - [-Infinity, -Infinity]
 * - [Infinity, Infinity]
 * @param {Interval} x
 * @returns {boolean}
 */
function onlyInfinity(x) {
    return !isFinite(x.lo) && x.lo === x.hi;
}
/**
 * moves interval 2PI * k to the right until both bounds are positive
 * @param interval
 */
function handleNegative(interval) {
    if (interval.lo < 0) {
        if (interval.lo === -Infinity) {
            interval.lo = 0;
            interval.hi = Infinity;
        }
        else {
            const n = Math.ceil(-interval.lo / constants.PI_TWICE_LOW);
            interval.lo += constants.PI_TWICE_LOW * n;
            interval.hi += constants.PI_TWICE_LOW * n;
        }
    }
    return interval;
}
/**
 * Computes the cosine of `x`
 *
 * @example
 * ```typescript
 * Interval.cos(
 *   Interval(0, 0)
 * ) // Interval(1, 1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.cos(
 *   Interval(0, Math.PI / 2)
 * ) // Interval(0, 1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.cos(
 *   Interval(3 * Math.PI / 2, 3 * Math.PI)
 * ) // Interval(-1, 1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.cos(
 *   Interval(-Infinity, x)
 * )
 * // Interval(-1, 1) if x > -Infinity
 * // Interval.EMPTY otherwise
 * ```
 *
 * @example
 * ```typescript
 * Interval.cos(
 *   Interval(x, Infinity)
 * )
 * // Interval(-1, 1) if x < Infinity
 * // Interval.EMPTY otherwise
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function cos(x) {
    if (isEmpty(x) || onlyInfinity(x)) {
        return constants.EMPTY;
    }
    // create a clone of `x` because the clone is going to be modified
    const cache = new Interval$1().set(x.lo, x.hi);
    handleNegative(cache);
    const pi2 = constants.PI_TWICE;
    const t = fmod(cache, pi2);
    if (width(t) >= pi2.lo) {
        return new Interval$1(-1, 1);
    }
    // when t.lo > pi it's the same as
    // -cos(t - pi)
    if (t.lo >= constants.PI_HIGH) {
        const cosv = cos(sub(t, constants.PI));
        return negative(cosv);
    }
    const lo = t.lo;
    const hi = t.hi;
    const rlo = round.cosLo(hi);
    const rhi = round.cosHi(lo);
    // it's ensured that t.lo < pi and that t.lo >= 0
    if (hi <= constants.PI_LOW) {
        // when t.hi < pi
        // [cos(t.lo), cos(t.hi)]
        return new Interval$1(rlo, rhi);
    }
    else if (hi <= pi2.lo) {
        // when t.hi < 2pi
        // [-1, max(cos(t.lo), cos(t.hi))]
        return new Interval$1(-1, Math.max(rlo, rhi));
    }
    else {
        // t.lo < pi and t.hi > 2pi
        return new Interval$1(-1, 1);
    }
}
/**
 * Computes the sine of `x`
 *
 * @example
 * ```typescript
 * Interval.sin(
 *   Interval(0, 0)
 * ) // Interval(0, 0)
 * ```
 *
 * @example
 * ```typescript
 * Interval.sin(
 *   Interval(0, Math.PI / 2)
 * ) // Interval(0, 1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.sin(
 *   Interval(Math.PI / 2, Math.PI / 2)
 * ) // Interval(1, 1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.sin(
 *   Interval(Math.PI / 2, -Math.PI / 2)
 * ) // Interval(-1, 1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.sin(
 *   Interval(Math.PI, 3 * Math.PI / 2)
 * ) // Interval(-1, 0)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function sin(x) {
    if (isEmpty(x) || onlyInfinity(x)) {
        return constants.EMPTY;
    }
    return cos(sub(x, constants.PI_HALF));
}
/**
 * Computes the tangent of `x`
 *
 * @example
 * ```typescript
 * Interval.tan(
 *   Interval(-Math.PI / 4, Math.PI / 4)
 * ) // Interval(-1, 1)
 * ```
 *
 * @example
 * ```typescript
 * Interval.tan(
 *   Interval(0, Math.PI / 2)
 * ) // Interval.WHOLE
 * ```
 *
 * @example
 * ```typescript
 * Interval.tan(
 *   Interval(-Infinity, x)
 * )
 * // Interval.WHOLE if x > -Infinity
 * // Interval.EMPTY otherwise
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function tan(x) {
    if (isEmpty(x) || onlyInfinity(x)) {
        return constants.EMPTY;
    }
    // create a clone of `x` because the clone is going to be modified
    const cache = new Interval$1().set(x.lo, x.hi);
    handleNegative(cache);
    const pi = constants.PI;
    let t = fmod(cache, pi);
    if (t.lo >= constants.PI_HALF_LOW) {
        t = sub(t, pi);
    }
    if (t.lo <= -constants.PI_HALF_LOW || t.hi >= constants.PI_HALF_LOW) {
        return constants.WHOLE;
    }
    return new Interval$1(round.tanLo(t.lo), round.tanHi(t.hi));
}
/**
 * Computes the arcsine of `x`
 *
 * @example
 * ```typescript
 * Interval.asin(
 *   Interval(-1.57079633, 1.57079633)
 * )  // Interval(-10, 10)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function asin(x) {
    if (isEmpty(x) || x.hi < -1 || x.lo > 1) {
        return constants.EMPTY;
    }
    const lo = x.lo <= -1 ? -constants.PI_HALF_HIGH : round.asinLo(x.lo);
    const hi = x.hi >= 1 ? constants.PI_HALF_HIGH : round.asinHi(x.hi);
    return new Interval$1(lo, hi);
}
/**
 * Computes the arccosine of `x`
 *
 * @example
 * ```typescript
 * Interval.acos(
 *   Interval(0, 1)
 * )  // Interval(0, Math.PI / 2)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function acos(x) {
    if (isEmpty(x) || x.hi < -1 || x.lo > 1) {
        return constants.EMPTY;
    }
    const lo = x.hi >= 1 ? 0 : round.acosLo(x.hi);
    const hi = x.lo <= -1 ? constants.PI_HIGH : round.acosHi(x.lo);
    return new Interval$1(lo, hi);
}
/**
 * Computes the arctangent of `x`
 *
 * @example
 * ```typescript
 * Interval.atan(
 *   Interval(-1, 1)
 * )  // Interval(-0.785398163, 0.785398163)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function atan(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    return new Interval$1(round.atanLo(x.lo), round.atanHi(x.hi));
}
/**
 * Computes the hyperbolic sine of `x`
 *
 * @example
 * ```typescript
 * Interval.sinh(
 *   Interval(-2, 2)
 * )  // Interval(-3.6286040785, 3.6286040785)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function sinh(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    return new Interval$1(round.sinhLo(x.lo), round.sinhHi(x.hi));
}
/**
 * Computes the hyperbolic cosine of `x`
 *
 * @example
 * ```typescript
 * Interval.cosh(
 *   Interval(-2, 2)
 * )  // Interval(1, 3.76219569108)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function cosh(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    if (x.hi < 0) {
        return new Interval$1(round.coshLo(x.hi), round.coshHi(x.lo));
    }
    else if (x.lo >= 0) {
        return new Interval$1(round.coshLo(x.lo), round.coshHi(x.hi));
    }
    else {
        return new Interval$1(1, round.coshHi(-x.lo > x.hi ? x.lo : x.hi));
    }
}
/**
 * Computes the hyperbolic tangent of `x`
 *
 * @example
 * ```typescript
 * Interval.tanh(
 *   Interval(-Infinity, Infinity)
 * )  // Interval(-1, 1)
 * ```
 *
 * @param {Interval} x
 * @return {Interval}
 */
function tanh(x) {
    if (isEmpty(x)) {
        return constants.EMPTY;
    }
    return new Interval$1(round.tanhLo(x.lo), round.tanhHi(x.hi));
}

const trigonometric = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  cos,
  sin,
  tan,
  asin,
  acos,
  atan,
  sinh,
  cosh,
  tanh
}, Symbol.toStringTag, { value: 'Module' }));

/*
 * interval-arithmetic
 *
 * Copyright (c) 2015-2020 Mauricio Poppe
 * Licensed under the MIT license.
 */
const MixedInterval = Object.assign(Interval$1, constants, round, misc, utils, relational, arithmetic, algebra, trigonometric, { round });

const libEsm = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: MixedInterval,
  Interval: _Interval,
  round,
  constants,
  equal,
  almostEqual,
  assertIncludes,
  notEqual,
  lessThan,
  lt,
  greaterThan,
  gt,
  lessEqualThan,
  leq,
  greaterEqualThan,
  geq,
  add,
  subtract,
  sub,
  multiply,
  mul,
  divide,
  div,
  positive,
  negative,
  fmod,
  multiplicativeInverse,
  pow,
  sqrt,
  nthRoot,
  cos,
  sin,
  tan,
  asin,
  acos,
  atan,
  sinh,
  cosh,
  tanh,
  exp,
  log,
  ln,
  LOG_EXP_10,
  log10,
  LOG_EXP_2,
  log2,
  hull,
  intersection,
  union,
  difference,
  width,
  wid,
  abs,
  max,
  min,
  clone,
  isInterval,
  isEmpty,
  isWhole,
  isSingleton,
  zeroIn,
  hasValue,
  hasInterval,
  intervalsOverlap
}, Symbol.toStringTag, { value: 'Module' }));

const require$$1 = /*@__PURE__*/getAugmentedNamespace(libEsm);

var adapter = function (ns) {
  // mod
  ns.mod = ns.fmod;

  // relational
  ns.lessThan = ns.lt;
  ns.lessEqualThan = ns.leq;
  ns.greaterThan = ns.gt;
  ns.greaterEqualThan = ns.geq;

  ns.strictlyEqual = ns.equal;
  ns.strictlyNotEqual = ns.notEqual;

  ns.logicalAND = function (a, b) {
    return a && b
  };
  ns.logicalXOR = function (a, b) {
    return a ^ b
  };
  ns.logicalOR = function (a, b) {
    return a || b
  };
};

/**
 * Created by mauricio on 5/12/15.
 */
var policies = function (Interval) {
  return {
    disableRounding: function () {
      Interval.round.disable();
    },

    enableRounding: function () {
      Interval.round.enable();
    }
  }
};

/**
 * Created by mauricio on 5/12/15.
 */

const CodeGenerator = require$$0$1;
const Interval = require$$1.default;
adapter(Interval);

function processScope (scope) {
  Object.keys(scope).forEach(function (k) {
    const value = scope[k];
    if (typeof value === 'number' || Array.isArray(value)) {
      scope[k] = Interval.factory(value);
    } else if (typeof value === 'object' && 'lo' in value && 'hi' in value) {
      scope[k] = Interval.factory(value.lo, value.hi);
    }
  });
}

_eval.exports = function (expression) {
  return new CodeGenerator()
    .setDefs({
      $$processScope: processScope
    })
    .parse(expression)
    .compile(Interval)
};

_eval.exports.policies = policies(Interval);
_eval.exports.Interval = Interval;

/*
 * interval-arithmetic-eval
 *
 * Copyright (c) 2015 Mauricio Poppe
 * Licensed under the MIT license.
 */

(function (module) {
	module.exports = _eval.exports;
} (intervalArithmeticEval));

var __importDefault$d = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(_eval$2, "__esModule", { value: true });
_eval$2.interval = _eval$2.builtIn = void 0;
const built_in_math_eval_1 = __importDefault$d(builtInMathEval.exports);
const interval_arithmetic_eval_1$1 = __importDefault$d(intervalArithmeticEval.exports);
const samplers$1 = {
    interval: interval_arithmetic_eval_1$1.default,
    builtIn: built_in_math_eval_1.default
};
if (window.math) {
    samplers$1.builtIn = window.math.compile;
}
function generateEvaluator(samplerName) {
    function doCompile(expression) {
        // compiles does the following
        //
        // when expression === string
        //
        //     gen = new require('math-codegen')
        //     return gen.parse(expression).compile(Interval|BultInMath)
        //
        //     which is an object with the form
        //
        //     {
        //       eval: function (scope) {
        //         // math-codegen magic
        //       }
        //     }
        //
        // when expression === function
        //
        //    {
        //      eval: expression
        //    }
        //
        // othewise throw an error
        if (typeof expression === 'string') {
            const compiled = samplers$1[samplerName](expression);
            if (window.math && samplerName === 'builtIn') {
                // if mathjs is included use its evaluate method instead
                return { eval: compiled.evaluate || compiled.eval };
            }
            return compiled;
        }
        else if (typeof expression === 'function') {
            return { eval: expression };
        }
        else {
            throw Error('expression must be a string or a function');
        }
    }
    function compileIfPossible(meta, property) {
        // compile the function using interval arithmetic, cache the result
        // so that multiple calls with the same argument don't trigger the
        // kinda expensive compilation process
        const expression = meta[property];
        const hiddenProperty = samplerName + '_Expression_' + property;
        const hiddenCompiled = samplerName + '_Compiled_' + property;
        if (expression !== meta[hiddenProperty]) {
            meta[hiddenProperty] = expression;
            meta[hiddenCompiled] = doCompile(expression);
        }
    }
    function getCompiledExpression(meta, property) {
        return meta[samplerName + '_Compiled_' + property];
    }
    /**
     * Evaluates meta[property] with `variables`
     *
     * - Compiles meta[property] if it wasn't compiled already (also with cache
     *   check)
     * - Evaluates the resulting function with the merge of meta.scope and
     *   `variables`
     *
     * @param {Object} meta
     * @param {String} property
     * @param {Object} variables
     * @returns {Number|Array} The builtIn evaluator returns a number, the
     * interval evaluator an array
     */
    function evaluate(meta, property, variables) {
        // e.g.
        //
        //  meta: {
        //    fn: 'x + 3',
        //    scope: { y: 3 }
        //  }
        //  property: 'fn'
        //  variables:  { x: 3 }
        //
        compileIfPossible(meta, property);
        return getCompiledExpression(meta, property).eval(Object.assign({}, meta.scope || {}, variables));
    }
    return evaluate;
}
const builtIn$1 = generateEvaluator('builtIn');
_eval$2.builtIn = builtIn$1;
const interval$3 = generateEvaluator('interval');
_eval$2.interval = interval$3;

var __importDefault$c = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(tip, "__esModule", { value: true });
const d3_shape_1$2 = require$$0;
const d3_selection_1$7 = require$$5;
const clamp_1$2 = __importDefault$c(clamp_1$3);
const utils_1$5 = __importDefault$c(utils$2);
const globals_1$2 = __importDefault$c(globals);
const eval_1$4 = _eval$2;
function mouseTip(config) {
    config = Object.assign({
        xLine: false,
        yLine: false,
        renderer: function (x, y) {
            return '(' + x.toFixed(3) + ', ' + y.toFixed(3) + ')';
        },
        owner: null
    }, config);
    const MARGIN = 20;
    const line = (0, d3_shape_1$2.line)()
        .x(function (d) { return d[0]; })
        .y(function (d) { return d[1]; });
    function lineGenerator(el, data) {
        return el.append('path')
            .datum(data)
            .attr('stroke', 'grey')
            .attr('stroke-dasharray', '5,5')
            .attr('opacity', 0.5)
            .attr('d', line);
    }
    let tipInnerJoin, tipInnerEnter;
    function tip(selection) {
        const join = selection
            .selectAll('g.tip')
            .data(function (d) { return [d]; });
        // enter
        const tipEnter = join
            .enter().append('g')
            .attr('class', 'tip')
            .attr('clip-path', 'url(#function-plot-clip-' + config.owner.id + ')');
        // enter + update = enter inner tip
        tipInnerJoin = join.merge(tipEnter)
            .selectAll('g.inner-tip')
            .data(function (d) {
            // debugger
            return [d];
        });
        tipInnerEnter = tipInnerJoin.enter()
            .append('g')
            .attr('class', 'inner-tip')
            .style('display', 'none')
            .each(function () {
            const el = (0, d3_selection_1$7.select)(this);
            lineGenerator(el, [[0, -config.owner.meta.height - MARGIN], [0, config.owner.meta.height + MARGIN]])
                .attr('class', 'tip-x-line')
                .style('display', 'none');
            lineGenerator(el, [[-config.owner.meta.width - MARGIN, 0], [config.owner.meta.width + MARGIN, 0]])
                .attr('class', 'tip-y-line')
                .style('display', 'none');
            el.append('circle').attr('r', 3);
            el.append('text').attr('transform', 'translate(5,-5)');
        });
        // enter + update
        tipInnerJoin.merge(tipInnerEnter)
            .selectAll('.tip-x-line').style('display', config.xLine ? null : 'none');
        tipInnerJoin.merge(tipInnerEnter)
            .selectAll('.tip-y-line').style('display', config.yLine ? null : 'none');
    }
    tip.move = function (coordinates) {
        let i;
        let minDist = Infinity;
        let closestIndex = -1;
        let x, y;
        const selection = tipInnerJoin.merge(tipInnerEnter);
        const inf = 1e8;
        const meta = config.owner.meta;
        const data = selection.datum().data;
        const xScale = meta.xScale;
        const yScale = meta.yScale;
        const width = meta.width;
        const height = meta.height;
        const x0 = coordinates.x;
        const y0 = coordinates.y;
        for (i = 0; i < data.length; i += 1) {
            // skipTip=true skips the evaluation in the datum
            // implicit equations cannot be evaluated with a single point
            // parametric equations cannot be evaluated with a single point
            // polar equations cannot be evaluated with a single point
            if (data[i].skipTip || data[i].fnType !== 'linear') {
                continue;
            }
            const range = data[i].range || [-inf, inf];
            let candidateY;
            if (x0 > range[0] - globals_1$2.default.TIP_X_EPS && x0 < range[1] + globals_1$2.default.TIP_X_EPS) {
                try {
                    candidateY = (0, eval_1$4.builtIn)(data[i], 'fn', { x: x0 });
                }
                catch (e) { }
                if (utils_1$5.default.isValidNumber(candidateY)) {
                    const tDist = Math.abs(candidateY - y0);
                    if (tDist < minDist) {
                        minDist = tDist;
                        closestIndex = i;
                    }
                }
            }
        }
        if (closestIndex !== -1) {
            x = x0;
            if (data[closestIndex].range) {
                x = Math.max(x, data[closestIndex].range[0]);
                x = Math.min(x, data[closestIndex].range[1]);
            }
            y = (0, eval_1$4.builtIn)(data[closestIndex], 'fn', { x: x });
            tip.show();
            config.owner.emit('tip:update', { x, y, index: closestIndex });
            // @ts-ignore
            const clampX = (0, clamp_1$2.default)(x, xScale.invert(-MARGIN), xScale.invert(width + MARGIN));
            // @ts-ignore
            const clampY = (0, clamp_1$2.default)(y, yScale.invert(height + MARGIN), yScale.invert(-MARGIN));
            const color = utils_1$5.default.color(data[closestIndex], closestIndex);
            selection.style('color', 'red');
            selection.attr('transform', 'translate(' + xScale(clampX) + ',' + yScale(clampY) + ')');
            selection.select('circle')
                .attr('fill', color);
            selection.select('text')
                .attr('fill', color)
                .text(config.renderer(x, y, closestIndex));
        }
        else {
            tip.hide();
        }
    };
    tip.show = function () {
        tipInnerJoin.merge(tipInnerEnter)
            .style('display', null);
    };
    tip.hide = function () {
        tipInnerJoin.merge(tipInnerEnter)
            .style('display', 'none');
    };
    // generations of getters/setters
    Object.keys(config).forEach(function (option) {
        utils_1$5.default.getterSetter.call(tip, config, option);
    });
    return tip;
}
tip.default = mouseTip;

var helpers$1 = {};

var derivative$1 = {};

var graphTypes$1 = {};

var polyline$1 = {};

var evaluate$1 = {};

var samplers = {};

var builtIn = {};

var __importDefault$b = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(builtIn, "__esModule", { value: true });
const clamp_1$1 = __importDefault$b(clamp_1$3);
const utils_1$4 = __importDefault$b(utils$2);
const eval_1$3 = _eval$2;
function checkAsymptote(d0, d1, d, sign, level) {
    if (!level) {
        return {
            asymptote: true,
            d0: d0,
            d1: d1
        };
    }
    const n = 10;
    const x0 = d0[0];
    const x1 = d1[0];
    const samples = utils_1$4.default.linspace(x0, x1, n);
    let oldY, oldX;
    for (let i = 0; i < n; i += 1) {
        const x = samples[i];
        const y = (0, eval_1$3.builtIn)(d, 'fn', { x: x });
        if (i && oldY) {
            const deltaY = y - oldY;
            const newSign = utils_1$4.default.sgn(deltaY);
            if (newSign === sign) {
                return checkAsymptote([oldX, oldY], [x, y], d, sign, level - 1);
            }
        }
        oldY = y;
        oldX = x;
    }
    return {
        asymptote: false,
        d0: d0,
        d1: d1
    };
}
/**
 * Splits the evaluated data into arrays, each array is separated by any asymptote found
 * through the process of detecting slope/sign brusque changes
 * @param chart
 * @param d
 * @param data
 * @returns {Array[]}
 */
function split(chart, d, data) {
    let i, oldSign;
    let deltaX;
    let st = [];
    const sets = [];
    const domain = chart.meta.yScale.domain();
    const yMin = domain[0];
    const yMax = domain[1];
    if (data[0]) {
        st.push(data[0]);
        deltaX = data[1][0] - data[0][0];
        oldSign = utils_1$4.default.sgn(data[1][1] - data[0][1]);
    }
    function updateY(d) {
        d[1] = Math.min(d[1], yMax);
        d[1] = Math.max(d[1], yMin);
        return d;
    }
    i = 1;
    while (i < data.length) {
        const y0 = data[i - 1][1];
        const y1 = data[i][1];
        const deltaY = y1 - y0;
        const newSign = utils_1$4.default.sgn(deltaY);
        // make a new set if:
        if ( // utils.sgn(y1) * utils.sgn(y0) < 0 && // there's a change in the evaluated values sign
        // there's a change in the slope sign
        oldSign !== newSign &&
            // the slope is bigger to some value (according to the current zoom scale)
            Math.abs(deltaY / deltaX) > 1 / 1) {
            // retest this section again and determine if it's an asymptote
            const check = checkAsymptote(data[i - 1], data[i], d, newSign, 3);
            if (check.asymptote) {
                st.push(updateY(check.d0));
                sets.push(st);
                st = [updateY(check.d1)];
            }
        }
        oldSign = newSign;
        st.push(data[i]);
        ++i;
    }
    if (st.length) {
        sets.push(st);
    }
    return sets;
}
function linear(chart, d, range, n) {
    const allX = utils_1$4.default.space(chart, range, n);
    const yDomain = chart.meta.yScale.domain();
    const yDomainMargin = (yDomain[1] - yDomain[0]);
    const yMin = yDomain[0] - yDomainMargin * 1e5;
    const yMax = yDomain[1] + yDomainMargin * 1e5;
    let data = [];
    for (let i = 0; i < allX.length; i += 1) {
        const x = allX[i];
        const y = (0, eval_1$3.builtIn)(d, 'fn', { x: x });
        if (utils_1$4.default.isValidNumber(x) && utils_1$4.default.isValidNumber(y)) {
            data.push([x, (0, clamp_1$1.default)(y, yMin, yMax)]);
        }
    }
    data = split(chart, d, data);
    return data;
}
function parametric(chart, d, range, nSamples) {
    // range is mapped to canvas coordinates from the input
    // for parametric plots the range will tell the start/end points of the `t` param
    const parametricRange = d.range || [0, 2 * Math.PI];
    const tCoords = utils_1$4.default.space(chart, parametricRange, nSamples);
    const samples = [];
    for (let i = 0; i < tCoords.length; i += 1) {
        const t = tCoords[i];
        const x = (0, eval_1$3.builtIn)(d, 'x', { t: t });
        const y = (0, eval_1$3.builtIn)(d, 'y', { t: t });
        samples.push([x, y]);
    }
    return [samples];
}
function polar(chart, d, range, nSamples) {
    // range is mapped to canvas coordinates from the input
    // for polar plots the range will tell the start/end points of the `theta` param
    const polarRange = d.range || [-Math.PI, Math.PI];
    const thetaSamples = utils_1$4.default.space(chart, polarRange, nSamples);
    const samples = [];
    for (let i = 0; i < thetaSamples.length; i += 1) {
        const theta = thetaSamples[i];
        const r = (0, eval_1$3.builtIn)(d, 'r', { theta: theta });
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        samples.push([x, y]);
    }
    return [samples];
}
function points(chart, d, range, nSamples) {
    return [d.points];
}
function vector(chart, d, range, nSamples) {
    d.offset = d.offset || [0, 0];
    return [[
            d.offset,
            [d.vector[0] + d.offset[0], d.vector[1] + d.offset[1]]
        ]];
}
const sampler$1 = function (chart, d, range, nSamples) {
    const fnTypes = {
        parametric: parametric,
        polar: polar,
        points: points,
        vector: vector,
        linear: linear
    };
    if (!(d.fnType in fnTypes)) {
        throw Error(d.fnType + ' is not supported in the `builtIn` sampler');
    }
    // @ts-ignore
    return fnTypes[d.fnType].apply(null, arguments);
};
builtIn.default = sampler$1;

var interval$2 = {};

var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
var __importDefault$a = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(interval$2, "__esModule", { value: true });
const interval_arithmetic_eval_1 = __importStar$1(intervalArithmeticEval.exports);
const eval_1$2 = _eval$2;
const utils_1$3 = __importDefault$a(utils$2);
// const Interval = (intervalArithmeticEval as any).Interval
// disable the use of typed arrays in interval-arithmetic to improve the performance
interval_arithmetic_eval_1.default.policies.disableRounding();
function interval1d(chart, d, range, nSamples) {
    const xCoords = utils_1$3.default.space(chart, range, nSamples);
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    const yMin = yScale.domain()[0];
    const yMax = yScale.domain()[1];
    const samples = [];
    let i;
    for (i = 0; i < xCoords.length - 1; i += 1) {
        const x = { lo: xCoords[i], hi: xCoords[i + 1] };
        const y = (0, eval_1$2.interval)(d, 'fn', { x: x });
        if (!interval_arithmetic_eval_1.Interval.isEmpty(y) && !interval_arithmetic_eval_1.Interval.isWhole(y)) {
            samples.push([x, y]);
        }
        if (interval_arithmetic_eval_1.Interval.isWhole(y)) {
            // means that the next and prev intervals need to be fixed
            samples.push(null);
        }
    }
    // asymptote determination
    for (i = 1; i < samples.length - 1; i += 1) {
        if (!samples[i]) {
            const prev = samples[i - 1];
            const next = samples[i + 1];
            if (prev && next && !interval_arithmetic_eval_1.Interval.intervalsOverlap(prev[1], next[1])) {
                // case:
                //
                //   |
                //
                //     |
                //
                //   p n
                if (prev[1].lo > next[1].hi) {
                    prev[1].hi = Math.max(yMax, prev[1].hi);
                    next[1].lo = Math.min(yMin, next[1].lo);
                }
                // case:
                //
                //     |
                //
                //   |
                //
                //   p n
                if (prev[1].hi < next[1].lo) {
                    prev[1].lo = Math.min(yMin, prev[1].lo);
                    next[1].hi = Math.max(yMax, next[1].hi);
                }
            }
        }
    }
    samples.scaledDx = xScale(xCoords[1]) - xScale(xCoords[0]);
    return [samples];
}
let rectEps;
function smallRect(x, y) {
    return interval_arithmetic_eval_1.Interval.width(x) < rectEps;
}
function quadTree(x, y, meta) {
    const sample = (0, eval_1$2.interval)(meta, 'fn', {
        x: x,
        y: y
    });
    const fulfills = interval_arithmetic_eval_1.Interval.zeroIn(sample);
    if (!fulfills) {
        return this;
    }
    if (smallRect(x)) {
        this.push([x, y]);
        return this;
    }
    const midX = x.lo + (x.hi - x.lo) / 2;
    const midY = y.lo + (y.hi - y.lo) / 2;
    const east = { lo: midX, hi: x.hi };
    const west = { lo: x.lo, hi: midX };
    const north = { lo: midY, hi: y.hi };
    const south = { lo: y.lo, hi: midY };
    quadTree.call(this, east, north, meta);
    quadTree.call(this, east, south, meta);
    quadTree.call(this, west, north, meta);
    quadTree.call(this, west, south, meta);
}
function interval2d(chart, meta) {
    const xScale = chart.meta.xScale;
    const xDomain = chart.meta.xScale.domain();
    const yDomain = chart.meta.yScale.domain();
    const x = { lo: xDomain[0], hi: xDomain[1] };
    const y = { lo: yDomain[0], hi: yDomain[1] };
    const samples = [];
    // 1 px
    rectEps = xScale.invert(1) - xScale.invert(0);
    quadTree.call(samples, x, y, meta);
    samples.scaledDx = 1;
    return [samples];
}
const sampler = function (chart, d, range, nSamples) {
    const fnTypes = {
        implicit: interval2d,
        linear: interval1d
    };
    if (!(fnTypes.hasOwnProperty(d.fnType))) {
        throw Error(d.fnType + ' is not supported in the `interval` sampler');
    }
    // @ts-ignore
    return fnTypes[d.fnType].apply(null, arguments);
};
interval$2.default = sampler;

var __importDefault$9 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(samplers, "__esModule", { value: true });
samplers.interval = samplers.builtIn = void 0;
const builtIn_1 = __importDefault$9(builtIn);
samplers.builtIn = builtIn_1.default;
const interval_1$1 = __importDefault$9(interval$2);
samplers.interval = interval_1$1.default;

var __importDefault$8 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(evaluate$1, "__esModule", { value: true });
const globals_1$1 = __importDefault$8(globals);
const samplers_1 = samplers;
const evalTypeFn = {
    interval: samplers_1.interval,
    builtIn: samplers_1.builtIn
};
/**
 * Computes the endpoints x_lo, x_hi of the range
 * from which the sampler will take samples
 *
 * @param {Object} scale
 * @param {Object} d An item from `data`
 * @returns {Array}
 */
function computeEndpoints(scale, d) {
    const range = d.range || [-Infinity, Infinity];
    const start = Math.max(scale.domain()[0], range[0]);
    const end = Math.min(scale.domain()[1], range[1]);
    return [start, end];
}
/**
 * Decides which sampler function to call based on the options
 * of `data`
 *
 * @param {Object} chart Chart instance which is orchestrating this sampling operation
 * @param {Object} d a.k.a a single item from `data`
 * @returns {Array}
 */
function evaluate(chart, d) {
    const range = computeEndpoints(chart.meta.xScale, d);
    const evalFn = evalTypeFn[d.sampler];
    const nSamples = d.nSamples || Math.min(globals_1$1.default.MAX_ITERATIONS, globals_1$1.default.DEFAULT_ITERATIONS || (chart.meta.width * 2));
    const data = evalFn(chart, d, range, nSamples);
    // NOTE: it's impossible to listen for the first eval event
    // as the event is already fired when a listener is attached
    chart.emit('eval', data, d.index, d.isHelper);
    return data;
}
evaluate$1.default = evaluate;

var __importDefault$7 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(polyline$1, "__esModule", { value: true });
const d3_selection_1$6 = require$$5;
const d3_shape_1$1 = require$$0;
const clamp_1 = __importDefault$7(clamp_1$3);
const utils_1$2 = __importDefault$7(utils$2);
const evaluate_1$2 = __importDefault$7(evaluate$1);
function polyline(chart) {
    function plotLine(selection) {
        selection.each(function (d) {
            const el = plotLine.el = (0, d3_selection_1$6.select)(this);
            const index = d.index;
            const evaluatedData = (0, evaluate_1$2.default)(chart, d);
            const color = utils_1$2.default.color(d, index);
            // join
            const innerSelection = el.selectAll(':scope > path.line')
                .data(evaluatedData);
            const yRange = chart.meta.yScale.range();
            let yMax = yRange[0];
            let yMin = yRange[1];
            // workaround, clamp assuming that the bounds are finite but huge
            const diff = yMax - yMin;
            yMax += diff * 1e6;
            yMin -= diff * 1e6;
            if (d.skipBoundsCheck) {
                yMax = Infinity;
                yMin = -Infinity;
            }
            function y(d) {
                return (0, clamp_1.default)(chart.meta.yScale(d[1]), yMin, yMax);
            }
            const line = (0, d3_shape_1$1.line)()
                .curve(d3_shape_1$1.curveLinear)
                .x(function (d) { return chart.meta.xScale(d[0]); })
                .y(y);
            const area = (0, d3_shape_1$1.area)()
                .x(function (d) { return chart.meta.yScale(d[0]); })
                .y0(chart.meta.yScale(0))
                .y1(y);
            const innerSelectionEnter = innerSelection.enter()
                .append('path')
                .attr('class', 'line line-' + index)
                .attr('stroke-width', 1)
                .attr('stroke-linecap', 'round');
            // enter + update
            innerSelection.merge(innerSelectionEnter)
                .each(function () {
                const path = (0, d3_selection_1$6.select)(this);
                let pathD;
                if (d.closed) {
                    path.attr('fill', color);
                    path.attr('fill-opacity', 0.3);
                    pathD = area;
                }
                else {
                    path.attr('fill', 'none');
                    pathD = line;
                }
                path
                    .attr('stroke', color)
                    .attr('marker-end', function () {
                    // special marker for vectors
                    return d.fnType === 'vector'
                        ? 'url(#' + chart.markerId + ')'
                        : null;
                })
                    .attr('d', pathD);
                if (d.attr) {
                    for (let k in d.attr) {
                        if (d.attr.hasOwnProperty(k)) {
                            path.attr(k, d.attr[k]);
                        }
                    }
                }
            });
            // exit
            innerSelection.exit().remove();
        });
    }
    return plotLine;
}
polyline$1.default = polyline;

var interval$1 = {};

var __importDefault$6 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(interval$1, "__esModule", { value: true });
const d3_selection_1$5 = require$$5;
const evaluate_1$1 = __importDefault$6(evaluate$1);
const utils_1$1 = __importDefault$6(utils$2);
function interval(chart) {
    let minWidthHeight;
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    function clampRange(vLo, vHi, gLo, gHi) {
        // issue 69
        // by adding the option `invert` to both the xAxis and the `yAxis`
        // it might be possible that after the transformation to canvas space
        // the y limits of the rectangle get inverted i.e. gLo > gHi
        //
        // e.g.
        //
        //   functionPlot({
        //     target: '#playground',
        //     yAxis: { invert: true },
        //     // ...
        //   })
        //
        if (gLo > gHi) {
            const t = gLo;
            gLo = gHi;
            gHi = t;
        }
        const hi = Math.min(vHi, gHi);
        const lo = Math.max(vLo, gLo);
        if (lo > hi) {
            // no overlap
            return [-minWidthHeight, 0];
        }
        return [lo, hi];
    }
    const line = function (points, closed) {
        let path = '';
        const range = yScale.range();
        const minY = Math.min.apply(Math, range);
        const maxY = Math.max.apply(Math, range);
        for (let i = 0, length = points.length; i < length; i += 1) {
            if (points[i]) {
                const x = points[i][0];
                const y = points[i][1];
                let yLo = y.lo;
                let yHi = y.hi;
                // if options.closed is set to true then one of the bounds must be zero
                if (closed) {
                    yLo = Math.min(yLo, 0);
                    yHi = Math.max(yHi, 0);
                }
                // points.scaledDX is added because of the stroke-width
                const moveX = xScale(x.lo) + points.scaledDx / 2;
                const viewportY = clampRange(minY, maxY, isFinite(yHi) ? yScale(yHi) : -Infinity, isFinite(yLo) ? yScale(yLo) : Infinity);
                const vLo = viewportY[0];
                const vHi = viewportY[1];
                path += ' M ' + moveX + ' ' + vLo;
                path += ' v ' + Math.max(vHi - vLo, minWidthHeight);
            }
        }
        return path;
    };
    function plotLine(selection) {
        selection.each(function (d) {
            const el = plotLine.el = (0, d3_selection_1$5.select)(this);
            const index = d.index;
            const closed = d.closed;
            const evaluatedData = (0, evaluate_1$1.default)(chart, d);
            const innerSelection = el.selectAll(':scope > path.line')
                .data(evaluatedData);
            // the min height/width of the rects drawn by the path generator
            minWidthHeight = Math.max(evaluatedData[0].scaledDx, 1);
            const innerSelectionEnter = innerSelection.enter()
                .append('path')
                .attr('class', 'line line-' + index)
                .attr('fill', 'none');
            // enter + update
            const selection = innerSelection.merge(innerSelectionEnter)
                .attr('stroke-width', minWidthHeight)
                .attr('stroke', utils_1$1.default.color(d, index))
                .attr('opacity', closed ? 0.5 : 1)
                .attr('d', function (d) {
                return line(d, closed);
            });
            if (d.attr) {
                for (let k in d.attr) {
                    if (d.attr.hasOwnProperty(k)) {
                        selection.attr(k, d.attr[k]);
                    }
                }
            }
            innerSelection.exit().remove();
        });
    }
    return plotLine;
}
interval$1.default = interval;

var scatter$1 = {};

var __importDefault$5 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(scatter$1, "__esModule", { value: true });
const d3_selection_1$4 = require$$5;
const d3_color_1 = require$$1$1;
const utils_1 = __importDefault$5(utils$2);
const evaluate_1 = __importDefault$5(evaluate$1);
function scatter(chart) {
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    function scatter(selection) {
        selection.each(function (d) {
            let i, j;
            const index = d.index;
            const color = utils_1.default.color(d, index);
            const evaluatedData = (0, evaluate_1.default)(chart, d);
            // scatter doesn't need groups, therefore each group is
            // flattened into a single array
            const joined = [];
            for (i = 0; i < evaluatedData.length; i += 1) {
                for (j = 0; j < evaluatedData[i].length; j += 1) {
                    joined.push(evaluatedData[i][j]);
                }
            }
            const innerSelection = (0, d3_selection_1$4.select)(this)
                .selectAll(':scope > circle')
                .data(joined);
            const innerSelectionEnter = innerSelection.enter()
                .append('circle');
            const selection = innerSelection.merge(innerSelectionEnter)
                .attr('fill', (0, d3_color_1.hsl)(color.toString()).brighter(1.5).hex())
                .attr('stroke', color)
                .attr('opacity', 0.7)
                .attr('r', 1)
                .attr('cx', function (d) { return xScale(d[0]); })
                .attr('cy', function (d) { return yScale(d[1]); });
            if (d.attr) {
                for (let k in d.attr) {
                    if (d.attr.hasOwnProperty(k)) {
                        selection.attr(k, d.attr[k]);
                    }
                }
            }
            innerSelection.exit().remove();
        });
    }
    return scatter;
}
scatter$1.default = scatter;

var __importDefault$4 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(graphTypes$1, "__esModule", { value: true });
graphTypes$1.scatter = graphTypes$1.interval = graphTypes$1.polyline = void 0;
const polyline_1 = __importDefault$4(polyline$1);
graphTypes$1.polyline = polyline_1.default;
const interval_1 = __importDefault$4(interval$1);
graphTypes$1.interval = interval_1.default;
const scatter_1 = __importDefault$4(scatter$1);
graphTypes$1.scatter = scatter_1.default;

var datumDefaults$1 = {};

Object.defineProperty(datumDefaults$1, "__esModule", { value: true });
function datumDefaults(d) {
    // default graphType uses boxes i.e. 2d intervals
    if (!('graphType' in d)) {
        d.graphType = 'interval';
    }
    // if the graphType is not `interval` then the sampler is `builtIn`
    // because the interval sampler returns a box instead of a point
    if (!('sampler' in d)) {
        d.sampler = d.graphType !== 'interval'
            ? 'builtIn'
            : 'interval';
    }
    // TODO: handle default fnType
    // default `fnType` is linear
    if (!('fnType' in d)) {
        d.fnType = 'linear';
    }
    return d;
}
datumDefaults$1.default = datumDefaults;

var __importDefault$3 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(derivative$1, "__esModule", { value: true });
const d3_selection_1$3 = require$$5;
const graph_types_1$1 = graphTypes$1;
const eval_1$1 = _eval$2;
const datum_defaults_1$2 = __importDefault$3(datumDefaults$1);
function derivative(chart) {
    const derivativeDatum = (0, datum_defaults_1$2.default)({
        isHelper: true,
        skipTip: true,
        skipBoundsCheck: true,
        nSamples: 2,
        graphType: 'polyline'
    });
    function computeLine(d) {
        if (!d.derivative) {
            return [];
        }
        const x0 = typeof d.derivative.x0 === 'number' ? d.derivative.x0 : Infinity;
        derivativeDatum.index = d.index;
        derivativeDatum.scope = {
            m: (0, eval_1$1.builtIn)(d.derivative, 'fn', { x: x0 }),
            x0: x0,
            y0: (0, eval_1$1.builtIn)(d, 'fn', { x: x0 })
        };
        derivativeDatum.fn = 'm * (x - x0) + y0';
        return [derivativeDatum];
    }
    function checkAutoUpdate(d) {
        const self = this;
        if (!d.derivative) {
            return;
        }
        if (d.derivative.updateOnMouseMove && !d.derivative.$$mouseListener) {
            d.derivative.$$mouseListener = function ({ x }) {
                // update initial value to be the position of the mouse
                // scope's x0 will be updated on the next call to `derivative(self)`
                if (d.derivative) {
                    d.derivative.x0 = x;
                }
                // trigger update (selection = self)
                derivative(self);
            };
            // if d.derivative is destroyed and recreated, the tip:update event
            // will be fired on the new d.derivative :)
            chart.on('tip:update', d.derivative.$$mouseListener);
        }
    }
    const derivative = function (selection) {
        selection.each(function (d) {
            const el = (0, d3_selection_1$3.select)(this);
            const data = computeLine.call(selection, d);
            checkAutoUpdate.call(selection, d);
            const innerSelection = el.selectAll('g.derivative')
                .data(data);
            const innerSelectionEnter = innerSelection.enter()
                .append('g')
                .attr('class', 'derivative');
            // enter + update
            innerSelection.merge(innerSelectionEnter)
                .call((0, graph_types_1$1.polyline)(chart));
            // update
            // change the opacity of the line
            innerSelection.merge(innerSelectionEnter)
                .selectAll('path')
                .attr('opacity', 0.5);
            innerSelection.exit().remove();
        });
    };
    return derivative;
}
derivative$1.default = derivative;

var secant$1 = {};

var __importDefault$2 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(secant$1, "__esModule", { value: true });
const d3_selection_1$2 = require$$5;
const eval_1 = _eval$2;
const datum_defaults_1$1 = __importDefault$2(datumDefaults$1);
const graph_types_1 = graphTypes$1;
function secant(chart) {
    const secantDefaults = (0, datum_defaults_1$1.default)({
        isHelper: true,
        skipTip: true,
        skipBoundsCheck: true,
        nSamples: 2,
        graphType: 'polyline'
    });
    function computeSlope(scope) {
        scope.m = (scope.y1 - scope.y0) / (scope.x1 - scope.x0);
    }
    function updateLine(d, secant) {
        if (!('x0' in secant)) {
            throw Error('secant must have the property `x0` defined');
        }
        secant.scope = secant.scope || {};
        const x0 = secant.x0;
        const x1 = typeof secant.x1 === 'number' ? secant.x1 : Infinity;
        Object.assign(secant.scope, {
            x0: x0,
            x1: x1,
            y0: (0, eval_1.builtIn)(d, 'fn', { x: x0 }),
            y1: (0, eval_1.builtIn)(d, 'fn', { x: x1 })
        });
        computeSlope(secant.scope);
    }
    function setFn(d, secant) {
        updateLine(d, secant);
        secant.fn = 'm * (x - x0) + y0';
    }
    function setMouseListener(d, secantObject) {
        const self = this;
        if (secantObject.updateOnMouseMove && !secantObject.$$mouseListener) {
            secantObject.$$mouseListener = function ({ x }) {
                secantObject.x1 = x;
                updateLine(d, secantObject);
                secant(self);
            };
            chart.on('tip:update', secantObject.$$mouseListener);
        }
    }
    function computeLines(d) {
        const self = this;
        const data = [];
        d.secants = d.secants || [];
        for (let i = 0; i < d.secants.length; i += 1) {
            const secant = d.secants[i] = Object.assign({}, secantDefaults, d.secants[i]);
            // necessary to make the secant have the same color as d
            secant.index = d.index;
            if (!secant.fn) {
                setFn.call(self, d, secant);
                setMouseListener.call(self, d, secant);
            }
            data.push(secant);
        }
        return data;
    }
    const secant = function (selection) {
        selection.each(function (d) {
            const el = (0, d3_selection_1$2.select)(this);
            const data = computeLines.call(selection, d);
            const innerSelection = el.selectAll('g.secant')
                .data(data);
            const innerSelectionEnter = innerSelection.enter()
                .append('g')
                .attr('class', 'secant');
            // enter + update
            innerSelection.merge(innerSelectionEnter)
                .call((0, graph_types_1.polyline)(chart));
            // change the opacity of the secants
            innerSelection.merge(innerSelectionEnter)
                .selectAll('path')
                .attr('opacity', 0.5);
            // exit
            innerSelection.exit().remove();
        });
    };
    return secant;
}
secant$1.default = secant;

var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(helpers$1, "__esModule", { value: true });
// const d3 = window.d3
const d3_selection_1$1 = require$$5;
const derivative_1 = __importDefault$1(derivative$1);
const secant_1 = __importDefault$1(secant$1);
function helpers(chart) {
    function helper(selection) {
        selection.each(function () {
            const el = (0, d3_selection_1$1.select)(this);
            el.call((0, derivative_1.default)(chart));
            el.call((0, secant_1.default)(chart));
        });
    }
    return helper;
}
helpers$1.default = helpers;

// @ts-ignore-file
// issue: https://github.com/maurizzzio/function-plot/issues/6
// solution: the line type is selecting the derivative line when the content is re-drawn, then when the
// derivative was redrawn an already selected line (by the line type) was used thus making a single line
// disappear from the graph, to avoid the selection of the derivative line the selector needs to
// work only for immediate children which is done with `:scope >`
// src: http://stackoverflow.com/questions/6481612/queryselector-search-immediate-children
/*eslint-disable */
if (typeof window !== 'undefined')
    (function (doc, proto) {
        try { // check if browser supports :scope natively
            doc.querySelector(':scope body');
        }
        catch (err) { // polyfill native methods if it doesn't
            ['querySelector', 'querySelectorAll'].forEach(function (method) {
                // @ts-ignore
                const native = proto[method];
                // @ts-ignore
                proto[method] = function (selectors) {
                    if (/(^|,)\s*:scope/.test(selectors)) { // only if selectors contains :scope
                        const id = this.id; // remember current element id
                        this.id = 'ID_' + Date.now(); // assign new unique id
                        selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id); // replace :scope with #ID
                        // @ts-ignore
                        const result = doc[method](selectors);
                        this.id = id; // restore previous id
                        return result;
                    }
                    else {
                        return native.call(this, selectors); // use native code for other selectors
                    }
                };
            });
        }
    })(window.document, Element.prototype);

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(dist, "__esModule", { value: true });
dist.Chart = void 0;
const d3_shape_1 = require$$0;
const d3_format_1 = require$$1$2;
const d3_scale_1 = require$$2;
const d3_axis_1 = require$$3;
const d3_zoom_1 = require$$4;
// @ts-ignore
const d3_selection_1 = require$$5;
const d3_interpolate_1 = require$$6;
const events_1 = __importDefault(require$$7);
const annotations_1 = __importDefault(annotations$1);
const tip_1 = __importDefault(tip);
const helpers_1 = __importDefault(helpers$1);
const datum_defaults_1 = __importDefault(datumDefaults$1);
const globals_1 = __importDefault(globals);
const graphTypes = __importStar(graphTypes$1);
const $eval = __importStar(_eval$2);

const d3Scale = { linear: d3_scale_1.scaleLinear, log: d3_scale_1.scaleLog };
/**
 * An instance can subscribe to any of the following events by doing `instance.on([eventName], callback)`,
 * events can be triggered by doing `instance.emit([eventName][, params])`
 *
 * - `mouseover` fired whenever the mouse is over the canvas
 * - `mousemove` fired whenever the mouse is moved inside the canvas, callback params: a single object `{x: number, y: number}` (in canvas space
 coordinates)
 * - `mouseout` fired whenever the mouse is moved outside the canvas
 * - `before:draw` fired before drawing all the graphs
 * - `after:draw` fired after drawing all the graphs
 * - `zoom:scaleUpdate` fired whenever the scale of another graph is updated, callback params `xScale`, `yScale`
 (x-scale and y-scale of another graph whose scales were updated)
 * - `tip:update` fired whenever the tip position is updated, callback params `{x, y, index}` (in canvas
 space coordinates, `index` is the index of the graph where the tip is on top of)
 * - `eval` fired whenever the sampler evaluates a function, callback params `data` (an array of segment/points),
 `index` (the index of datum in the `data` array), `isHelper` (true if the data is created for a helper e.g.
 for the derivative/secant)
 *
 * The following events are dispatched to all the linked graphs
 *
 * - `all:mouseover` same as `mouseover` but it's dispatched in each linked graph
 * - `all:mousemove` same as `mousemove` but it's dispatched in each linked graph
 * - `all:mouseout` same as `mouseout` but it's dispatched in each linked graph
 * - `all:zoom:scaleUpdate` same as `zoom:scaleUpdate` but it's dispatched in each linked graph
 * - `all:zoom` fired whenever there's scaling/translation on the graph, dispatched on all the linked graphs
 */
class Chart extends events_1.default.EventEmitter {
    constructor(options) {
        super();
        const n = Math.random();
        const letter = String.fromCharCode(Math.floor(n * 26) + 97);
        this.options = options;
        this.id = letter + n.toString(16).substr(2);
        this.options.id = this.id;
        this.markerId = this.id + '-marker';
        Chart.cache[this.id] = this;
        this.linkedGraphs = [this];
        this.meta = {};
        this.setUpEventListeners();
    }
    /**
     * Rebuilds the entire graph from scratch recomputing
     *
     * - the inner width/height
     * - scales/axes
     *
     * After this is done it does a complete redraw of all the datums,
     * if only the datums need to be redrawn call `instance.draw()` instead
     *
     * @returns {Chart}
     */
    build() {
        this.internalVars();
        this.drawGraphWrapper();
        return this;
    }
    getDraggableNode() {
        return (0, d3_selection_1.select)(this.options.target).select('.zoom-and-drag').node();
    }
    /**
     * The draggable container won't change across different instances of Chart,
     * therefore multiple instances will share the draggable container, to avoid dispatching
     * the event from the old instance grab it in runtime with this function
     */
    getEmitInstance() {
        let cachedInstance = this;
        const cachedNode = this.getDraggableNode();
        if (cachedNode) {
            cachedInstance = cachedNode.instance;
        }
        return cachedInstance;
    }
    internalVars() {
        const margin = this.meta.margin = { left: 40, right: 20, top: 20, bottom: 20 };
        // if there's a title make the top margin bigger
        if (this.options.title) {
            this.meta.margin.top = 40;
        }
        // inner width/height
        this.meta.width = (this.options.width || globals_1.default.DEFAULT_WIDTH) - margin.left - margin.right;
        this.meta.height = (this.options.height || globals_1.default.DEFAULT_HEIGHT) - margin.top - margin.bottom;
        this.initializeAxes();
    }
    initializeAxes() {
        const self = this;
        const integerFormat = (0, d3_format_1.format)('~s');
        (0, d3_format_1.format)('~e');
        function formatter(d) {
            // take only the decimal part of the number
            const frac = Math.abs(d) - Math.floor(Math.abs(d));
            if (frac > 0) {
                return d.toString();
            }
            else {
                return integerFormat(d);
            }
        }
        function computeYScale(xScale) {
            // assumes that xScale is a linear scale
            const xDiff = xScale[1] - xScale[0];
            return self.meta.height * xDiff / self.meta.width;
        }
        this.options.xAxis = this.options.xAxis || {};
        this.options.xAxis.type = this.options.xAxis.type || 'linear';
        this.options.yAxis = this.options.yAxis || {};
        this.options.yAxis.type = this.options.yAxis.type || 'linear';
        const xDomain = this.meta.xDomain = (function (axis) {
            if (axis.domain) {
                return axis.domain;
            }
            if (axis.type === 'linear') {
                const xLimit = 12;
                return [-xLimit / 2, xLimit / 2];
            }
            else if (axis.type === 'log') {
                return [1, 10];
            }
            throw Error('axis type ' + axis.type + ' unsupported');
        })(this.options.xAxis);
        const yDomain = this.meta.yDomain = (function (axis) {
            if (axis.domain) {
                return axis.domain;
            }
            const yLimit = computeYScale(xDomain);
            if (axis.type === 'linear') {
                return [-yLimit / 2, yLimit / 2];
            }
            else if (axis.type === 'log') {
                return [1, 10];
            }
            throw Error('axis type ' + axis.type + ' unsupported');
        })(this.options.yAxis);
        if (!this.meta.xScale) {
            this.meta.xScale = d3Scale[this.options.xAxis.type]();
        }
        this.meta.xScale
            .domain(xDomain)
            // @ts-ignore domain always returns typeof this.meta.xDomain
            .range(this.options.xAxis.invert ? [this.meta.width, 0] : [0, this.meta.width]);
        if (!this.meta.yScale) {
            this.meta.yScale = d3Scale[this.options.yAxis.type]();
        }
        this.meta.yScale
            .domain(yDomain)
            // @ts-ignore domain always returns typeof this.meta.yDomain
            .range(this.options.yAxis.invert ? [0, this.meta.height] : [this.meta.height, 0]);
        if (!this.meta.xAxis) {
            this.meta.xAxis = (0, d3_axis_1.axisBottom)(this.meta.xScale);
        }
        this.meta.xAxis
            .tickSize(this.options.grid ? -this.meta.height : 0)
            .tickFormat(formatter);
        if (!this.meta.yAxis) {
            this.meta.yAxis = (0, d3_axis_1.axisLeft)(this.meta.yScale);
        }
        this.meta.yAxis
            .tickSize(this.options.grid ? -this.meta.width : 0)
            .tickFormat(formatter);
        this.line = (0, d3_shape_1.line)()
            .x(function (d) { return self.meta.xScale(d[0]); })
            .y(function (d) { return self.meta.yScale(d[1]); });
    }
    drawGraphWrapper() {
        const root = this.root = (0, d3_selection_1.select)(this.options.target)
            .selectAll('svg')
            .data([this.options]);
        // enter
        this.root.enter = root.enter()
            .append('svg')
            .attr('class', 'function-plot')
            .attr('font-size', this.getFontSize());
        // enter + update
        root.merge(this.root.enter)
            .attr('width', this.meta.width + this.meta.margin.left + this.meta.margin.right)
            .attr('height', this.meta.height + this.meta.margin.top + this.meta.margin.bottom);
        this.buildTitle();
        this.buildLegend();
        this.buildCanvas();
        this.buildClip();
        this.buildAxis();
        this.buildAxisLabel();
        // helper to detect the closest fn to the cursor's current abscissa
        const tip = this.tip = (0, tip_1.default)(Object.assign(this.options.tip || {}, { owner: this }));
        this.canvas.merge(this.canvas.enter)
            .call(tip);
        this.setUpPlugins();
        // draw each datum after the wrapper and plugins were set up
        this.draw();
        // zoom helper on top
        this.buildZoomHelper();
    }
    buildTitle() {
        // join
        const selection = this.root.merge(this.root.enter)
            .selectAll('text.title')
            .data(function (d) {
            return [d.title].filter(Boolean);
        });
        // enter
        const selectionEnter = selection.enter()
            .append('text');
        selectionEnter.merge(selection)
            .attr('class', 'title')
            .attr('y', this.meta.margin.top / 2)
            .attr('x', this.meta.margin.left + this.meta.width / 2)
            .attr('font-size', 25)
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text(this.options.title);
        // exit
        selection.exit().remove();
    }
    buildLegend() {
        // enter
        this.root.enter
            .append('text')
            .attr('class', 'top-right-legend')
            .attr('text-anchor', 'end');
        // update + enter
        this.root.merge(this.root.enter)
            .select('.top-right-legend')
            .attr('y', this.meta.margin.top / 2)
            .attr('x', this.meta.width + this.meta.margin.left);
    }
    buildCanvas() {
        // enter
        const canvas = this.canvas = this.root.merge(this.root.enter)
            .selectAll('.canvas')
            .data(function (d) {
            return [d];
        });
        this.canvas.enter = canvas.enter()
            .append('g')
            .attr('class', 'canvas');
        // enter + update
    }
    buildClip() {
        // (so that the functions don't overflow on zoom or drag)
        const id = this.id;
        const defs = this.canvas.enter
            .append('defs');
        defs.append('clipPath')
            .attr('id', 'function-plot-clip-' + id)
            .append('rect')
            .attr('class', 'clip static-clip');
        // enter + update
        this.canvas.merge(this.canvas.enter)
            .selectAll('.clip')
            .attr('width', this.meta.width)
            .attr('height', this.meta.height);
        // marker clip (for vectors)
        defs.append('clipPath')
            .append('marker')
            .attr('id', this.markerId)
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 10)
            .attr('markerWidth', 5)
            .attr('markerHeight', 5)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5L0,0')
            .attr('stroke-width', '0px')
            .attr('fill-opacity', 1)
            .attr('fill', '#777');
    }
    buildAxis() {
        // axis creation
        const canvasEnter = this.canvas.enter;
        canvasEnter.append('g')
            .attr('class', 'x axis');
        canvasEnter.append('g')
            .attr('class', 'y axis');
        // update
        this.canvas.merge(this.canvas.enter)
            .select('.x.axis')
            .attr('transform', 'translate(0,' + this.meta.height + ')')
            .call(this.meta.xAxis);
        this.canvas.merge(this.canvas.enter)
            .select('.y.axis')
            .call(this.meta.yAxis);
    }
    buildAxisLabel() {
        // axis labeling
        const canvas = this.canvas;
        const xLabel = canvas.merge(canvas.enter)
            .selectAll('text.x.axis-label')
            .data(function (d) {
            return [d.xAxis.label].filter(Boolean);
        });
        const xLabelEnter = xLabel.enter()
            .append('text')
            .attr('class', 'x axis-label')
            .attr('text-anchor', 'end');
        xLabel.merge(xLabelEnter)
            .attr('x', this.meta.width)
            .attr('y', this.meta.height - 6)
            .text(function (d) { return d; });
        xLabel.exit().remove();
        const yLabel = canvas.merge(canvas.enter)
            .selectAll('text.y.axis-label')
            .data(function (d) {
            return [d.yAxis.label].filter(Boolean);
        });
        const yLabelEnter = yLabel.enter()
            .append('text')
            .attr('class', 'y axis-label')
            .attr('y', 6)
            .attr('dy', '.75em')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-90)');
        yLabel.merge(yLabelEnter)
            .text(function (d) { return d; });
        yLabel.exit().remove();
    }
    /**
     * @private
     *
     * Draws each of the datums stored in data.options, to do a full
     * redraw call `instance.draw()`
     */
    buildContent() {
        const self = this;
        const canvas = this.canvas;
        canvas.merge(canvas.enter)
            .attr('transform', 'translate(' + this.meta.margin.left + ',' + this.meta.margin.top + ')');
        const content = this.content = canvas.merge(canvas.enter)
            .selectAll(':scope > g.content')
            .data(function (d) { return [d]; });
        // g tag clipped to hold the data
        const contentEnter = content.enter()
            .append('g')
            .attr('clip-path', 'url(#function-plot-clip-' + this.id + ')')
            .attr('class', 'content');
        // helper line, x = 0
        if (this.options.xAxis.type === 'linear') {
            const yOrigin = content.merge(contentEnter).selectAll(':scope > path.y.origin')
                .data([[
                    [0, this.meta.yScale.domain()[0]],
                    [0, this.meta.yScale.domain()[1]]
                ]]);
            const yOriginEnter = yOrigin.enter()
                .append('path')
                .attr('class', 'y origin')
                .attr('stroke', 'black')
                .attr('opacity', 0.2);
            yOrigin.merge(yOriginEnter)
                .attr('d', this.line);
        }
        // helper line y = 0
        if (this.options.yAxis.type === 'linear') {
            const xOrigin = content.merge(contentEnter).selectAll(':scope > path.x.origin')
                .data([[[this.meta.xScale.domain()[0], 0], [this.meta.xScale.domain()[1], 0]]]);
            const xOriginEnter = xOrigin.enter()
                .append('path')
                .attr('class', 'x origin')
                .attr('stroke', 'black')
                .attr('opacity', 0.2);
            xOrigin.merge(xOriginEnter)
                .attr('d', this.line);
        }
        // annotations
        content.merge(contentEnter)
            .call((0, annotations_1.default)({ owner: self }));
        // content construction
        // - join options.data to <g class='graph'> elements
        // - for each datum determine the sampler to use
        const graphs = content.merge(contentEnter)
            .selectAll(':scope > g.graph')
            .data((d) => d.data.map(datum_defaults_1.default));
        // enter
        const graphsEnter = graphs
            .enter()
            .append('g')
            .attr('class', 'graph');
        // enter + update
        graphs.merge(graphsEnter)
            .each(function (d, index) {
            // additional options needed in the graph-types/helpers
            d.index = index;
            const selection = (0, d3_selection_1.select)(this);
            selection.call(graphTypes[d.graphType](self));
            selection.call((0, helpers_1.default)(self));
        });
    }
    buildZoomHelper() {
        // dummy rect (detects the zoom + drag)
        const self = this;
        if (!this.meta.zoomBehavior) {
            this.meta.zoomBehavior = (0, d3_zoom_1.zoom)()
                .on('zoom', function onZoom(ev) {
                self.getEmitInstance().emit('all:zoom', ev);
            });
            // the zoom behavior must work with a copy of the scale, the zoom behavior has its own state and assumes
            // that its updating the original scale!
            // things that failed when I tried rescaleX(self.meta.xScale), the state of self.meta.xScale was a multiplied
            // for zoom/mousemove operations
            //
            // this copy should only be created once when the application starts
            self.meta.zoomBehavior.xScale = self.meta.xScale.copy();
            self.meta.zoomBehavior.yScale = self.meta.yScale.copy();
        }
        // in the case where the original scale domains were updated (because of a change in the size of the canvas)
        // update the range only but not the domain, the domain is going to be updated
        self.meta.zoomBehavior.xScale.range(self.meta.xScale.range());
        self.meta.zoomBehavior.yScale.range(self.meta.yScale.range());
        // enter
        this.canvas.enter
            .append('rect')
            .call(this.meta.zoomBehavior)
            .attr('class', 'zoom-and-drag')
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mouseover', function (event) {
            self.getEmitInstance().emit('all:mouseover', event);
        })
            .on('mouseout', function (event) {
            self.getEmitInstance().emit('all:mouseout', event);
        })
            .on('mousemove', function (event) {
            self.getEmitInstance().emit('all:mousemove', event);
        });
        // update + enter
        this.draggable = this.canvas.merge(this.canvas.enter).select('.zoom-and-drag')
            .call((selection) => {
            if (selection.node()) {
                // store the instance for the next run
                selection.node().instance = self;
            }
        })
            .attr('width', this.meta.width)
            .attr('height', this.meta.height);
    }
    setUpPlugins() {
        const plugins = this.options.plugins || [];
        const self = this;
        plugins.forEach(function (plugin) {
            plugin(self);
        });
    }
    addLink() {
        for (let i = 0; i < arguments.length; i += 1) {
            this.linkedGraphs.push(arguments[i]);
        }
    }
    updateAxes() {
        const instance = this;
        const canvas = instance.canvas.merge(instance.canvas.enter);
        canvas.select('.x.axis').call(instance.meta.xAxis);
        canvas.select('.y.axis').call(instance.meta.yAxis);
        // updates the style of the axes
        canvas
            .selectAll('.axis path, .axis line')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('shape-rendering', 'crispedges')
            .attr('opacity', 0.1);
    }
    syncOptions() {
        // update the original options yDomain and xDomain, this is done so that next calls to functionPlot()
        // with the same object preserve some of the computed state
        this.options.xAxis.domain = this.meta.xScale.domain();
        this.options.yAxis.domain = this.meta.yScale.domain();
    }
    getFontSize() {
        return Math.max(Math.max(this.meta.width, this.meta.height) / 50, 8);
    }
    draw() {
        const instance = this;
        instance.emit('before:draw');
        instance.syncOptions();
        instance.updateAxes();
        instance.buildContent();
        instance.emit('after:draw');
    }
    setUpEventListeners() {
        const self = this;
        // before setting up the listeners, remove any listeners set on the previous instance, this happens because
        // the draggable container is shared across instances
        const prevInstance = this.getEmitInstance();
        if (prevInstance) {
            prevInstance.removeAllListeners();
        }
        const events = {
            mousemove: function (coordinates) {
                self.tip.move(coordinates);
            },
            mouseover: function () {
                self.tip.show();
            },
            mouseout: function () {
                self.tip.hide();
            },
            zoom: function zoom({ transform }) {
                // disable zoom
                if (self.options.disableZoom)
                    return;
                const xScaleClone = transform.rescaleX(self.meta.zoomBehavior.xScale).interpolate(d3_interpolate_1.interpolateRound);
                const yScaleClone = transform.rescaleY(self.meta.zoomBehavior.yScale).interpolate(d3_interpolate_1.interpolateRound);
                // update the scales's metadata
                // NOTE: setting self.meta.xScale = self.meta.zoomBehavior.xScale creates artifacts and weird lines
                self.meta.xScale
                    .domain(xScaleClone.domain())
                    // @ts-ignore domain always returns typeof this.meta.yDomain
                    .range(xScaleClone.range());
                self.meta.yScale
                    .domain(yScaleClone.domain())
                    // @ts-ignore domain always returns typeof this.meta.yDomain
                    .range(yScaleClone.range());
            },
            'tip:update': function ({ x, y, index }) {
                const meta = self.root.merge(self.root.enter).datum().data[index];
                const title = meta.title || '';
                const format = meta.renderer || function (x, y) {
                    return x.toFixed(3) + ', ' + y.toFixed(3);
                };
                const text = [];
                title && text.push(title);
                text.push(format(x, y));
                self.root.select('.top-right-legend')
                    .attr('fill', globals_1.default.COLORS[index])
                    .text(text.join(' '));
            }
        };
        // all represents events that can be propagated to all the instances (including this one)
        const all = {
            mousemove: function (event) {
                const mouse = (0, d3_selection_1.pointer)(event, self.draggable.node());
                const coordinates = {
                    x: self.meta.xScale.invert(mouse[0]),
                    y: self.meta.yScale.invert(mouse[1])
                };
                self.linkedGraphs.forEach(function (graph) {
                    graph.emit('before:mousemove', coordinates);
                    graph.emit('mousemove', coordinates);
                });
            },
            zoom: function (event) {
                self.linkedGraphs.forEach(function (graph) {
                    // hack to synchronize the zoom state across all the instances
                    graph.draggable.node().__zoom = self.draggable.node().__zoom;
                    graph.emit('zoom', event);
                    graph.draw();
                });
                // emit the position of the mouse to all the registered graphs
                self.emit('all:mousemove', event);
            }
        };
        Object.keys(events).forEach(function (e) {
            // create an event for each event existing on `events` in the form 'all:' event
            // e.g. all:mouseover all:mouseout
            // the objective is that all the linked graphs receive the same event as the current graph
            // @ts-ignore
            !all[e] && self.on('all:' + e, function () {
                const args = Array.prototype.slice.call(arguments);
                self.linkedGraphs.forEach(function (graph) {
                    const localArgs = args.slice();
                    localArgs.unshift(e);
                    graph.emit.apply(graph, localArgs);
                });
            });
            // @ts-ignore
            self.on(e, events[e]);
        });
        Object.keys(all).forEach(function (e) {
            // @ts-ignore
            self.on('all:' + e, all[e]);
        });
    }
}
dist.Chart = Chart;
Chart.cache = {};
function functionPlot(options = { target: null }) {
    options.data = options.data || [];
    let instance = Chart.cache[options.id];
    if (!instance) {
        instance = new Chart(options);
    }
    return instance.build();
}
functionPlot.globals = globals_1.default;
functionPlot.$eval = $eval;
functionPlot.graphTypes = graphTypes;
dist.default = functionPlot;

const onRequestGet = async ({ request, next, env }) => {
  // Handle static assets
  if (/\.\w+$/.test(request.url)) {
    let resp = await next(request);
    if (resp.status === 200 || 304) {
      return resp;
    }
  }

  env.manifest = manifest;
  env.next = next;
  env.getStaticHTML = async path => {
    return next();
  };
  return entryServer({
    request: request,
    clientAddress: request.headers.get('cf-connecting-ip'),
    locals: {},
    env
  });
};

const onRequestHead = async ({ request, next, env }) => {
  // Handle static assets
  if (/\.\w+$/.test(request.url)) {
    let resp = await next(request);
    if (resp.status === 200 || 304) {
      return resp;
    }
  }

  env.manifest = manifest;
  env.next = next;
  env.getStaticHTML = async path => {
    return next();
  };
  return entryServer({
    request: request,
    env
  });
};

async function onRequestPost({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return entryServer({
    request: request,
    env
  });
}

async function onRequestDelete({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return entryServer({
    request: request,
    env
  });
}

async function onRequestPatch({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return entryServer({
    request: request,
    env
  });
}

export { onRequestDelete, onRequestGet, onRequestHead, onRequestPatch, onRequestPost };
