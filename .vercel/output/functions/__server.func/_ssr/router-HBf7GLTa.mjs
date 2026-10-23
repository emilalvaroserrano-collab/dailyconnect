import { i as __toESM } from "../_runtime.mjs";
import { Q as require_react, T as require_jsx_runtime, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, w as useRouter, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as firebaseConfig } from "./firebase-config-gC_VXmLt.mjs";
import { a as number, c as union, i as literal, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-HBf7GLTa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var token = string().min(20);
var signUp = createServerFn({ method: "POST" }).validator(object({
	name: string().trim().min(1).max(80),
	email: string().trim().email().max(120),
	phone: string().trim().max(30).optional(),
	password: string().min(8).max(100),
	referralCode: string().trim().max(12).optional(),
	cookieTimestamp: number().optional()
})).handler(createSsrRpc("c927ced39ce2c9981e639ac2ff3b1afa897e9ba2c83c95060b108aa0186169c6"));
var signIn = createServerFn({ method: "POST" }).validator(object({
	email: string().trim().email().max(120),
	password: string().min(8).max(100)
})).handler(createSsrRpc("0672a16b80407c0b836f59fefb73164ee4ed7f7c1e28db0ee2ad89961bb61e5f"));
var refreshSession = createServerFn({ method: "POST" }).validator(object({ refreshToken: string().min(10) })).handler(createSsrRpc("3ad40b1316b3f2b7c6098a33a8d32743ea88c365ec3c5558441216b49e72d82b"));
var ensureProfile = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	name: string().trim().max(80).optional(),
	phone: string().trim().max(30).optional(),
	referralCode: string().trim().max(12).optional(),
	cookieTimestamp: number().optional()
})).handler(createSsrRpc("702ed82b72ee1f64c3dc305f55e05dcb70d362e69a8edd2052d3e6318d7e615d"));
var getMe = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("3e20f27d8c771d681ae3f8f1419c2cd915cbad1c55fe6953116a4b8cd71aaada"));
var getDesk = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("86fcd189a13777fb54389a2e3c56995881ba0c90b54934fb81507178f32617fb"));
var getTutorial = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	tutorialId: string().regex(/^[a-z0-9-]{1,40}$/)
})).handler(createSsrRpc("384152df2d0d3c588c5703d3657b5bd01cf8cc6393d3a9f1eeaa94b792de4ae1"));
var saveProgress = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	tutorialId: string().regex(/^[a-z0-9-]{1,40}$/),
	progressPercent: number().min(0).max(100),
	lastPositionSec: number().min(0).max(28800),
	completed: boolean(),
	exercises: array(string().max(40)).max(20)
})).handler(createSsrRpc("6915da1487145ccb93b28c2a2a58263eb81d82d1aef44c5386fd4dab208a5499"));
var activate = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	method: _enum([
		"gcash",
		"maya",
		"card"
	])
})).handler(createSsrRpc("faca5a38bad2fd652bc73706fc0a881d71a725fdc0faf632493cf0c0c70c3502"));
var getWallet = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("bc796cd31ddba61610ab4f742fd9ea7e8c88b6fdea755d868ba2f018a1f1e62e"));
var payout = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	amount: number().int().min(100).max(1e6)
})).handler(createSsrRpc("f86395d50ca80ad157c25545e2fd6aafba4ec0eb7304a027fae9ace599c39a78"));
var getNetwork = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("0ab883fdc3081e6c8338a6b4d4d2a9b83d0ad5186a3f655b197b977d4069fbb2"));
var place = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	recruitUid: string().regex(/^[A-Za-z0-9]{8,128}$/),
	parentUid: string().regex(/^[A-Za-z0-9]{8,128}$/)
})).handler(createSsrRpc("63b7dbca97584c54e1e3d08995fe83835f52de1d671f495d05c83daf3444d752"));
var getNotices = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("ddfbc55e2bdcb59385da24f17f202701122bbd991a3d327271c2659a63df289a"));
var readNotices = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("a16aace1c65bae1b7c94cd994a96cc0ca4f56ec57cb245c66286cb8aa2db6153"));
async function signInWithGoogle() {
	const { initializeApp, getApps } = await import("../_libs/firebase.mjs").then((n) => n.n);
	const { getAuth, GoogleAuthProvider, signInWithPopup } = await import("../_libs/firebase.mjs").then((n) => n.t);
	const cred = await signInWithPopup(getAuth(getApps()[0] ?? initializeApp(firebaseConfig)), new GoogleAuthProvider());
	const idToken = await cred.user.getIdToken();
	const bag = cred._tokenResponse;
	return {
		idToken,
		refreshToken: bag?.refreshToken ?? "",
		uid: cred.user.uid,
		email: cred.user.email ?? "",
		name: cred.user.displayName ?? "",
		expiresAt: Date.now() + Number(bag?.expiresIn ?? 3600) * 1e3
	};
}
function googleError(error) {
	const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
	const host = typeof window !== "undefined" ? window.location.hostname : "this site";
	if (code.includes("unauthorized-domain")) return `Google isn’t allowed on ${host} yet. Add that domain in Firebase Authentication → Settings → Authorized domains. Email still works.`;
	if (code.includes("popup-blocked")) return "The browser blocked the Google window. Allow popups, or use email.";
	if (code.includes("popup-closed-by-user") || code.includes("cancelled")) return "Google window closed before finishing.";
	if (code.includes("operation-not-allowed")) return "Turn on Google in Firebase Authentication → Sign-in method.";
	if (code.includes("network")) return "Couldn’t reach Google. Try again.";
	return "Google didn’t finish. Use email, or try again.";
}
async function signOutGoogle() {
	try {
		const { getApps } = await import("../_libs/firebase.mjs").then((n) => n.n);
		const { getAuth, signOut } = await import("../_libs/firebase.mjs").then((n) => n.t);
		const app = getApps()[0];
		if (app) await signOut(getAuth(app));
	} catch {}
}
var KEY$1 = "dc.referral.v1";
var WINDOW_MS = 2592e6;
function valid(code) {
	return /^[A-Z0-9]{4,12}$/.test(code);
}
function readReferral() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(KEY$1);
		if (!raw) return null;
		const value = JSON.parse(raw);
		if (!value || typeof value.code !== "string" || typeof value.ts !== "number") return null;
		if (!valid(value.code) || Date.now() - value.ts > WINDOW_MS) {
			localStorage.removeItem(KEY$1);
			return null;
		}
		return value;
	} catch {
		return null;
	}
}
/** First link opener keeps the credit for 30 days. Later links do not replace it. */
function captureReferralFromUrl() {
	if (typeof window === "undefined") return null;
	const existing = readReferral();
	const ref = new URLSearchParams(window.location.search).get("ref")?.trim().toUpperCase() ?? "";
	if (!valid(ref)) return existing;
	if (existing) return existing;
	const record = {
		code: ref,
		ts: Date.now()
	};
	localStorage.setItem(KEY$1, JSON.stringify(record));
	return record;
}
var KEY = "dc.session.v1";
function readSession() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const value = JSON.parse(raw);
		if (!value?.idToken || !value.uid) return null;
		return value;
	} catch {
		return null;
	}
}
function writeSession(session) {
	localStorage.setItem(KEY, JSON.stringify(session));
}
function clearSession() {
	localStorage.removeItem(KEY);
}
function progressCacheKey(uid, tutorialId) {
	return `dc.progress.${uid}.${tutorialId}`;
}
var ConnectContext = (0, import_react.createContext)(null);
async function fresh(session) {
	if (session.expiresAt > Date.now() + 6e4) return session;
	if (!session.refreshToken) throw new Error("Sign in again.");
	const next = await refreshSession({ data: { refreshToken: session.refreshToken } });
	const merged = {
		...next,
		email: next.email || session.email
	};
	writeSession(merged);
	return merged;
}
function ConnectProvider({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		captureReferralFromUrl();
		let cancel = false;
		const stored = readSession();
		if (!stored) {
			setReady(true);
			return;
		}
		(async () => {
			try {
				const next = await fresh(stored);
				const me = await getMe({ data: { idToken: next.idToken } });
				if (cancel) return;
				setSession(next);
				setProfile(me);
			} catch {
				clearSession();
			} finally {
				if (!cancel) setReady(true);
			}
		})();
		return () => {
			cancel = true;
		};
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		ready,
		session,
		profile,
		setProfile,
		async signInEmail(email, password) {
			const result = await signIn({ data: {
				email,
				password
			} });
			writeSession(result.session);
			setSession(result.session);
			setProfile(result.profile);
			return result.profile;
		},
		async signUpEmail(input) {
			const referral = readReferral();
			const result = await signUp({ data: {
				...input,
				referralCode: referral?.code,
				cookieTimestamp: referral?.ts
			} });
			writeSession(result.session);
			setSession(result.session);
			setProfile(result.profile);
			return result.profile;
		},
		async adopt(next, name) {
			const referral = readReferral();
			writeSession(next);
			const me = await ensureProfile({ data: {
				idToken: next.idToken,
				name,
				referralCode: referral?.code,
				cookieTimestamp: referral?.ts
			} });
			setSession(next);
			setProfile(me);
			return me;
		},
		async signOut() {
			clearSession();
			setSession(null);
			setProfile(null);
			await signOutGoogle();
		}
	}), [
		profile,
		ready,
		session
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectContext.Provider, {
		value,
		children
	});
}
function useConnect() {
	const value = (0, import_react.useContext)(ConnectContext);
	if (!value) throw new Error("Connect is unavailable.");
	return value;
}
var styles_default = "/assets/styles-DeEl7JQb.css";
var Route$15 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
			},
			{ title: "Daily Connect" },
			{
				name: "description",
				content: "One AI tool, taught every morning. ₱550 once."
			},
			{
				name: "theme-color",
				content: "#071018"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-canvas font-sans text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockZoom, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
function LockZoom() {
	(0, import_react.useEffect)(() => {
		const blockGesture = (event) => event.preventDefault();
		const blockPinch = (event) => {
			if (event.ctrlKey) event.preventDefault();
		};
		document.addEventListener("gesturestart", blockGesture, { passive: false });
		document.addEventListener("gesturechange", blockGesture, { passive: false });
		window.addEventListener("wheel", blockPinch, { passive: false });
		return () => {
			document.removeEventListener("gesturestart", blockGesture);
			document.removeEventListener("gesturechange", blockGesture);
			window.removeEventListener("wheel", blockPinch);
		};
	}, []);
	return null;
}
var $$splitComponentImporter$14 = () => import("./routes-Zqv07VT-.mjs");
var Route$14 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./checkout-DIs-DRVq.mjs");
var Route$13 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./creator-DwYpy2X_.mjs");
var Route$12 = createFileRoute("/creator")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./deck-CqTMTWMp.mjs");
var Route$11 = createFileRoute("/deck")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./join-7yL4IEVM.mjs");
var Route$10 = createFileRoute("/join")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./live-DX94Lraq.mjs");
var Route$9 = createFileRoute("/live")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./login-Bl-U-xAc.mjs");
var Route$8 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./market-BQdC8hti.mjs");
var Route$7 = createFileRoute("/market")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./moderate-xq8pzxbV.mjs");
var Route$6 = createFileRoute("/moderate")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./profile-aYRrPtQe.mjs");
var Route$5 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./studio-DJyucoLq.mjs");
var Route$4 = createFileRoute("/studio")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./wallet-DOZ3OMec.mjs");
var Route$3 = createFileRoute("/wallet")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./learn-DPkCbjbN.mjs");
var Route$2 = createFileRoute("/learn/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_tutorialId-UMcmIXKy.mjs");
var Route$1 = createFileRoute("/learn/$tutorialId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_productCode-uJ4_ttGC.mjs");
var Route = createFileRoute("/r/$memberCode/$productCode")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var CheckoutRoute = Route$13.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$15
});
var CreatorRoute = Route$12.update({
	id: "/creator",
	path: "/creator",
	getParentRoute: () => Route$15
});
var DeckRoute = Route$11.update({
	id: "/deck",
	path: "/deck",
	getParentRoute: () => Route$15
});
var JoinRoute = Route$10.update({
	id: "/join",
	path: "/join",
	getParentRoute: () => Route$15
});
var LiveRoute = Route$9.update({
	id: "/live",
	path: "/live",
	getParentRoute: () => Route$15
});
var LoginRoute = Route$8.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$15
});
var MarketRoute = Route$7.update({
	id: "/market",
	path: "/market",
	getParentRoute: () => Route$15
});
var ModerateRoute = Route$6.update({
	id: "/moderate",
	path: "/moderate",
	getParentRoute: () => Route$15
});
var ProfileRoute = Route$5.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$15
});
var StudioRoute = Route$4.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$15
});
var WalletRoute = Route$3.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => Route$15
});
var LearnIndexRoute = Route$2.update({
	id: "/learn/",
	path: "/learn/",
	getParentRoute: () => Route$15
});
var rootRouteChildren = {
	IndexRoute,
	CheckoutRoute,
	CreatorRoute,
	DeckRoute,
	JoinRoute,
	LiveRoute,
	LoginRoute,
	MarketRoute,
	ModerateRoute,
	ProfileRoute,
	StudioRoute,
	WalletRoute,
	LearnTutorialIdRoute: Route$1.update({
		id: "/learn/$tutorialId",
		path: "/learn/$tutorialId",
		getParentRoute: () => Route$15
	}),
	LearnIndexRoute,
	RMemberCodeProductCodeRoute: Route.update({
		id: "/r/$memberCode/$productCode",
		path: "/r/$memberCode/$productCode",
		getParentRoute: () => Route$15
	})
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { readNotices as _, progressCacheKey as a, signInWithGoogle as c, getNetwork as d, getNotices as f, place as g, payout as h, useConnect as i, activate as l, getWallet as m, Route as n, readReferral as o, getTutorial as p, Route$1 as r, googleError as s, router_exports as t, getDesk as u, saveProgress as v, createSsrRpc as y };
