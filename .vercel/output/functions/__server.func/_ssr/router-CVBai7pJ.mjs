import { i as __toESM } from "../_runtime.mjs";
import { C as useRouter, S as useNavigate, Z as require_react, _ as Outlet, b as Link, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as createFileRoute, w as require_jsx_runtime, x as Navigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as number, c as union, i as literal, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { i as formatClock, n as errorText, o as peso, r as firebaseConfig, s as secondsUntilManilaMidnight } from "./manila-ST5161Lc.mjs";
import { n as PRODUCT_CATALOG } from "./catalog-CCc5nSkg.mjs";
import { a as Store, c as Radio, d as Menu, f as House, g as Bell, h as BookOpen, i as TriangleAlert, l as Play, m as ChartLine, n as Wallet, o as Sparkles, p as Clapperboard, r as UserRound, s as Shield, t as X, u as Pause } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CVBai7pJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
var RELOAD_KEY = "dc.chunk-reload";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function isStaleChunk(message) {
	return /dynamically imported module|module script failed|Importing a module script failed/i.test(message);
}
function AppErrorComponent({ error }) {
	const message = errorMessage(error);
	(0, import_react.useEffect)(() => {
		if (!isStaleChunk(message)) return;
		try {
			if (sessionStorage.getItem(RELOAD_KEY)) return;
			sessionStorage.setItem(RELOAD_KEY, "1");
		} catch {
			return;
		}
		window.location.reload();
	}, [message]);
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
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-2 h-11 rounded-full bg-teal px-5 font-medium text-ink",
				onClick: () => {
					try {
						sessionStorage.removeItem(RELOAD_KEY);
					} catch {}
					window.location.reload();
				},
				children: "Reload"
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
var token$1 = string().min(20);
var signUp = createServerFn({ method: "POST" }).validator(object({
	name: string().trim().min(1).max(80),
	email: string().trim().email().max(120),
	phone: string().trim().min(10).max(30),
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
	idToken: token$1,
	name: string().trim().max(80).optional(),
	phone: string().trim().max(30).optional(),
	referralCode: string().trim().max(12).optional(),
	cookieTimestamp: number().optional()
})).handler(createSsrRpc("702ed82b72ee1f64c3dc305f55e05dcb70d362e69a8edd2052d3e6318d7e615d"));
var getSponsor = createServerFn({ method: "POST" }).validator(object({ code: string().trim().regex(/^[A-Za-z0-9]{4,12}$/) })).handler(createSsrRpc("965b371c2fddce743c20ddfdb09c7be83716ff999cff906d8ac1edda80d8b42d"));
var getMySponsor = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("75b855d405bf267df0a78ecdf83597e4a9d3622332e26e2481b35cbc539e9755"));
var saveContact = createServerFn({ method: "POST" }).validator(object({
	idToken: token$1,
	phone: string().trim().max(30),
	facebook: string().trim().max(200),
	whatsapp: string().trim().max(200)
})).handler(createSsrRpc("5e3339c256dff075a82110c9036dc9e4f88fbde08465cfc4842a346547e5a7e0"));
var getMe = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("3e20f27d8c771d681ae3f8f1419c2cd915cbad1c55fe6953116a4b8cd71aaada"));
var getDesk = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("86fcd189a13777fb54389a2e3c56995881ba0c90b54934fb81507178f32617fb"));
var getTutorial = createServerFn({ method: "POST" }).validator(object({
	idToken: token$1,
	tutorialId: string().regex(/^[a-z0-9-]{1,40}$/)
})).handler(createSsrRpc("384152df2d0d3c588c5703d3657b5bd01cf8cc6393d3a9f1eeaa94b792de4ae1"));
var saveProgress = createServerFn({ method: "POST" }).validator(object({
	idToken: token$1,
	tutorialId: string().regex(/^[a-z0-9-]{1,40}$/),
	progressPercent: number().min(0).max(100),
	lastPositionSec: number().min(0).max(28800),
	completed: boolean(),
	exercises: array(string().max(40)).max(20)
})).handler(createSsrRpc("6915da1487145ccb93b28c2a2a58263eb81d82d1aef44c5386fd4dab208a5499"));
var issueCode = createServerFn({ method: "POST" }).validator(object({
	idToken: token$1,
	memberCode: string().trim().min(4).max(12)
})).handler(createSsrRpc("d08727e2062d78bc12c5830ea0ba43b0b9f563a16d4b9a43e9b8e63b297a714b"));
var listCodes = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("9230de1213b07f6212815a17740bb13b0bb98d8294e1ba9551e7e56bb1ba3801"));
var redeemCode = createServerFn({ method: "POST" }).validator(object({
	idToken: token$1,
	code: string().trim().min(4).max(16)
})).handler(createSsrRpc("e48b7e79bb0071f80c67ccea351e7d2b0bf422727c337e4f10c6d50c56e394c2"));
var getWallet = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("bc796cd31ddba61610ab4f742fd9ea7e8c88b6fdea755d868ba2f018a1f1e62e"));
var payout = createServerFn({ method: "POST" }).validator(object({
	idToken: token$1,
	amount: number().int().min(100).max(1e6)
})).handler(createSsrRpc("f86395d50ca80ad157c25545e2fd6aafba4ec0eb7304a027fae9ace599c39a78"));
var getNetwork = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("0ab883fdc3081e6c8338a6b4d4d2a9b83d0ad5186a3f655b197b977d4069fbb2"));
var place = createServerFn({ method: "POST" }).validator(object({
	idToken: token$1,
	recruitUid: string().regex(/^[A-Za-z0-9]{8,128}$/),
	parentUid: string().regex(/^[A-Za-z0-9]{8,128}$/)
})).handler(createSsrRpc("63b7dbca97584c54e1e3d08995fe83835f52de1d671f495d05c83daf3444d752"));
var getNotices = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("ddfbc55e2bdcb59385da24f17f202701122bbd991a3d327271c2659a63df289a"));
var readNotices = createServerFn({ method: "POST" }).validator(object({ idToken: token$1 })).handler(createSsrRpc("a16aace1c65bae1b7c94cd994a96cc0ca4f56ec57cb245c66286cb8aa2db6153"));
async function signInWithGoogle() {
	const { initializeApp, getApps } = await import("../_libs/firebase.mjs").then((n) => n.n);
	const { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithPopup } = await import("../_libs/firebase.mjs").then((n) => n.t);
	const auth = getAuth(getApps()[0] ?? initializeApp(firebaseConfig));
	await setPersistence(auth, browserLocalPersistence);
	const cred = await signInWithPopup(auth, new GoogleAuthProvider());
	const idToken = await cred.user.getIdToken();
	const bag = cred._tokenResponse;
	return {
		idToken,
		refreshToken: cred.user.refreshToken || bag?.refreshToken || "",
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
var COOKIE = "dc_ref";
var MAX_AGE = Math.floor(2592e3);
function valid(code) {
	return /^[A-Z0-9]{4,12}$/.test(code);
}
function parse(raw) {
	if (!raw) return null;
	try {
		const value = JSON.parse(raw);
		if (!value || typeof value.code !== "string" || typeof value.ts !== "number") return null;
		if (!valid(value.code) || Date.now() - value.ts > 2592e6) return null;
		return {
			code: value.code,
			ts: value.ts
		};
	} catch {
		return null;
	}
}
function readCookieRaw() {
	const row = document.cookie.split("; ").find((part) => part.startsWith(`${COOKIE}=`));
	if (!row) return null;
	try {
		return decodeURIComponent(row.slice(7));
	} catch {
		return null;
	}
}
function clearCookie() {
	document.cookie = `${COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
	localStorage.removeItem(KEY$1);
}
function writeReferral(record) {
	const payload = encodeURIComponent(JSON.stringify(record));
	document.cookie = `${COOKIE}=${payload}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
	localStorage.setItem(KEY$1, JSON.stringify(record));
}
function readReferral() {
	if (typeof window === "undefined") return null;
	const fromCookie = parse(readCookieRaw());
	if (fromCookie) return fromCookie;
	const fromStore = parse(localStorage.getItem(KEY$1));
	if (!fromStore) {
		if (readCookieRaw() || localStorage.getItem(KEY$1)) clearCookie();
		return null;
	}
	writeReferral(fromStore);
	return fromStore;
}
function codeFromLocation() {
	const query = new URLSearchParams(window.location.search).get("ref")?.trim().toUpperCase() ?? "";
	if (valid(query)) return query;
	const fromPath = window.location.pathname.match(/^\/r\/([A-Za-z0-9]{4,12})(?:\/|$)/i)?.[1]?.toUpperCase() ?? "";
	return valid(fromPath) ? fromPath : "";
}
/** First link opener keeps the credit for one month. Later links do not replace it. */
function captureReferralFromUrl() {
	if (typeof window === "undefined") return null;
	const existing = readReferral();
	const ref = codeFromLocation();
	if (!ref) return existing;
	if (existing) return existing;
	const record = {
		code: ref,
		ts: Date.now()
	};
	writeReferral(record);
	return record;
}
var KEY = "dc.session.v1";
var PROFILE = "dc.profile.v1";
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
function readProfile() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(PROFILE);
		if (!raw) return null;
		const value = JSON.parse(raw);
		if (!value?.uid) return null;
		return value;
	} catch {
		return null;
	}
}
function writeProfile(profile) {
	localStorage.setItem(PROFILE, JSON.stringify(profile));
}
function clearSession() {
	localStorage.removeItem(KEY);
	localStorage.removeItem(PROFILE);
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
function remember(session, profile) {
	writeSession(session);
	writeProfile(profile);
}
function ConnectProvider({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfileState] = (0, import_react.useState)(null);
	function setProfile(next) {
		writeProfile(next);
		setProfileState(next);
	}
	(0, import_react.useEffect)(() => {
		captureReferralFromUrl();
		let cancel = false;
		const stored = readSession();
		const cached = readProfile();
		if (stored) setSession(stored);
		if (stored && cached?.uid === stored.uid) setProfileState(cached);
		if (!stored) {
			setReady(true);
			return;
		}
		(async () => {
			try {
				const next = await fresh(stored);
				const me = await getMe({ data: { idToken: next.idToken } });
				if (cancel) return;
				remember(next, me);
				setSession(next);
				setProfileState(me);
			} catch (caught) {
				const message = caught instanceof Error ? caught.message : "";
				if (!cancel && message.includes("SESSION_REVOKED")) {
					clearSession();
					setSession(null);
					setProfileState(null);
				}
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
			remember(result.session, result.profile);
			setSession(result.session);
			setProfileState(result.profile);
			return result.profile;
		},
		async signUpEmail(input) {
			const referral = readReferral();
			const result = await signUp({ data: {
				...input,
				referralCode: referral?.code,
				cookieTimestamp: referral?.ts
			} });
			remember(result.session, result.profile);
			setSession(result.session);
			setProfileState(result.profile);
			return result.profile;
		},
		async adopt(next, name, phone) {
			const referral = readReferral();
			writeSession(next);
			const me = await ensureProfile({ data: {
				idToken: next.idToken,
				name,
				phone,
				referralCode: referral?.code,
				cookieTimestamp: referral?.ts
			} });
			remember(next, me);
			setSession(next);
			setProfileState(me);
			return me;
		},
		async signOut() {
			clearSession();
			setSession(null);
			setProfileState(null);
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
var styles_default = "/assets/styles-BUQ0okqE.css";
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConnectProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldInactive, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
function HoldInactive() {
	const { ready, session, profile } = useConnect();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	if (!ready || !session || !profile) return null;
	if (profile.membershipStatus === "active") return null;
	if (pathname === "/checkout" || pathname === "/login" || pathname === "/join") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
}
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
function Ring({ value }) {
	const radius = 18;
	const circ = 2 * Math.PI * radius;
	const offset = circ - Math.max(0, Math.min(100, value)) / 100 * circ;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 44 44",
		className: "size-12 shrink-0",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "22",
			cy: "22",
			r: radius,
			className: "fill-none stroke-line",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "22",
			cy: "22",
			r: radius,
			className: "fill-none stroke-teal",
			strokeWidth: "3",
			strokeLinecap: "round",
			strokeDasharray: circ,
			strokeDashoffset: offset,
			transform: "rotate(-90 22 22)"
		})]
	});
}
function Countdown() {
	const [left, setLeft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setLeft(secondsUntilManilaMidnight());
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: left === null ? "--:--:--" : formatClock(left)
	});
}
function Dashboard() {
	const { session } = useConnect();
	const [desk, setDesk] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		setLoading(true);
		getDesk({ data: { idToken: session.idToken } }).then((next) => {
			if (!cancel) setDesk(next);
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		}).finally(() => {
			if (!cancel) setLoading(false);
		});
		return () => {
			cancel = true;
		};
	}, [session]);
	(0, import_react.useEffect)(() => {
		if (!desk?.todayId) return;
		const key = "dc.seenPick";
		const prev = localStorage.getItem(key);
		if (prev && prev !== desk.todayId) {
			toast("A new daily pick is up.");
			if (typeof Notification !== "undefined" && Notification.permission === "granted") new Notification("Daily Connect", { body: "Today’s pick is ready." });
		}
		localStorage.setItem(key, desk.todayId);
	}, [desk?.todayId]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-5 py-8 text-sm text-muted",
		children: "Loading the desk…"
	});
	if (error || !desk) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: error || "Could not load the desk."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 text-teal",
			onClick: () => window.location.reload(),
			children: "Try again"
		})]
	});
	const byId = new Map(desk.tutorials.map((tutorial) => [tutorial.id, tutorial]));
	const today = byId.get(desk.todayId) ?? desk.tutorials[0];
	const progressOf = (id) => desk.progress.find((row) => row.tutorialId === id);
	const continueRows = desk.progress.filter((row) => row.progressPercent > 0 && !row.completed).sort((a, b) => b.updatedAt - a.updatedAt).map((row) => ({
		row,
		tutorial: byId.get(row.tutorialId)
	})).filter((item) => Boolean(item.tutorial));
	const archive = desk.tutorials.filter((tutorial) => tutorial.id !== today?.id).slice(0, 4);
	const todayProgress = today ? progressOf(today.id) : void 0;
	if (!today) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-5 py-16 text-muted",
		children: "No lessons yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Good morning",
					desk.profile.name ? `, ${desk.profile.name.split(" ")[0]}` : "",
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "glass mt-4 overflow-hidden rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/10] sm:aspect-[16/8]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: today.thumbnail,
							alt: "",
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-canvas via-canvas/30 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-4 top-4 rounded-full bg-canvas/80 px-3 py-1 text-xs text-teal",
							children: "Today’s pick"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-4 top-4 rounded-full bg-canvas/80 px-3 py-1 text-xs tabular-nums",
							children: ["Swaps in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-4 left-4 right-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									today.difficulty,
									" · ",
									today.durationMin,
									" min"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl md:text-4xl",
								children: today.title
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 p-4 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, { value: todayProgress?.progressPercent ?? 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-fg",
									children: [todayProgress?.progressPercent ?? 0, "%"]
								}),
								" · ",
								today.description
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn/$tutorialId",
						params: { tutorialId: today.id },
						className: "inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-teal px-5 font-medium text-ink sm:ml-auto",
						children: todayProgress?.progressPercent ? "Resume" : "Start tutorial"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 grid grid-cols-3 gap-2",
				children: [
					{
						to: "/learn",
						label: "Learn",
						hint: "Today’s tool",
						icon: BookOpen
					},
					{
						to: "/deck",
						label: "Deck",
						hint: "Watch or upload",
						icon: Clapperboard
					},
					{
						to: "/studio",
						label: "Studio",
						hint: "Make a post",
						icon: Sparkles
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: "rounded-2xl bg-raise px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5 text-teal" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: item.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: item.hint
						})
					]
				}, item.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Continue"
				}), continueRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Nothing in progress. Today’s pick is the door."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-3 overflow-x-auto pb-2",
					children: continueRows.map(({ row, tutorial }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn/$tutorialId",
						params: { tutorialId: tutorial.id },
						className: "glass w-64 shrink-0 overflow-hidden rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tutorial.thumbnail,
							alt: "",
							className: "aspect-[3/2] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: tutorial.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs tabular-nums text-muted",
								children: [row.progressPercent, "%"]
							})]
						})]
					}, tutorial.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Archive"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn",
						className: "text-sm text-teal",
						children: "All lessons"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 md:grid-cols-4",
					children: archive.map((tutorial) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn/$tutorialId",
						params: { tutorialId: tutorial.id },
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: tutorial.thumbnail,
								alt: "",
								className: "aspect-[3/2] w-full rounded-2xl object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: tutorial.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									tutorial.difficulty,
									" · ",
									tutorial.durationMin,
									" min"
								]
							})
						]
					}, tutorial.id))
				})]
			})
		]
	});
}
function cn(...values) {
	return twMerge(clsx(values));
}
function whatsappHref(value) {
	if (value.startsWith("http")) return value;
	return `https://wa.me/${value.replace(/\D/g, "")}`;
}
function PhoneIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.58 1 1 0 0 1-.25 1.02z"
		})
	});
}
function WhatsAppIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.16h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.64-.61-2.89-1.25-4.77-4.16-4.91-4.35-.14-.19-1.17-1.55-1.17-2.96s.74-2.1 1-2.39c.26-.28.57-.35.76-.35h.55c.17 0 .41-.07.64.49.24.57.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.28-.12.55.16.26.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.26.14.42.12.58-.07.16-.19.66-.77.84-1.03.17-.26.35-.22.58-.13.24.09 1.49.7 1.75.83.26.12.43.19.49.29.07.1.07.6-.17 1.28z"
		})
	});
}
function FacebookIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M14.5 8.5V6.7c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.5v2H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z"
		})
	});
}
function SponsorContacts({ card }) {
	const items = [
		card.phone ? {
			href: `tel:${card.phone}`,
			label: `Call ${card.name}`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneIcon, {}),
			className: "bg-[#34C759] text-white"
		} : null,
		card.whatsapp ? {
			href: whatsappHref(card.whatsapp),
			label: `WhatsApp ${card.name}`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, {}),
			className: "bg-[#25D366] text-white",
			external: true
		} : null,
		card.facebook ? {
			href: card.facebook,
			label: `Facebook profile of ${card.name}`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookIcon, {}),
			className: "bg-[#1877F2] text-white",
			external: true
		} : null
	].filter((item) => Boolean(item));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-line bg-raise px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: ["Your sponsor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-fg",
				children: card.name
			})]
		}), items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex gap-3",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: item.href,
				"aria-label": item.label,
				target: "external" in item && item.external ? "_blank" : void 0,
				rel: "external" in item && item.external ? "noreferrer" : void 0,
				className: `grid size-12 shrink-0 place-items-center overflow-hidden rounded-full ${item.className}`,
				children: item.icon
			}, item.label))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "No number yet. It appears here when they add one."
		})]
	});
}
function SponsorDetails({ card }) {
	const rows = [
		{
			key: "phone",
			label: "Phone",
			value: card.phone,
			href: card.phone ? `tel:${card.phone}` : "",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneIcon, {}),
			tone: "text-[#34C759]",
			empty: "Not added yet"
		},
		{
			key: "facebook",
			label: "Facebook",
			value: card.facebook,
			href: card.facebook,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookIcon, {}),
			tone: "text-[#1877F2]",
			empty: "Not added yet",
			external: true
		},
		{
			key: "whatsapp",
			label: "WhatsApp",
			value: card.whatsapp,
			href: card.whatsapp ? whatsappHref(card.whatsapp) : "",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, {}),
			tone: "text-[#25D366]",
			empty: "Not added yet",
			external: true
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line bg-raise",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg px-5 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted",
					children: "Your sponsor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-lg font-medium text-fg",
					children: card.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: row.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: row.href,
						target: row.external ? "_blank" : void 0,
						rel: row.external ? "noreferrer" : void 0,
						className: "flex items-center gap-3 rounded-2xl bg-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid size-10 shrink-0 place-items-center rounded-full bg-raise ${row.tone}`,
							children: row.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: row.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block break-all text-sm text-fg",
								children: row.value
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl bg-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 shrink-0 place-items-center rounded-full bg-raise text-muted",
							children: row.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: row.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-muted",
								children: row.empty
							})]
						})]
					}) }, row.key))
				})
			]
		})
	});
}
function FieldIcon({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "grid size-9 shrink-0 place-items-center rounded-full bg-surface text-fg",
		children
	});
}
function SponsorBar() {
	const href = useRouterState({ select: (state) => state.location.href });
	const { profile } = useConnect();
	const [card, setCard] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const referral = captureReferralFromUrl();
		if (!referral || profile?.membershipStatus === "active") {
			setCard(null);
			return;
		}
		let cancel = false;
		getSponsor({ data: { code: referral.code } }).then((next) => {
			if (!cancel) setCard(next);
		}).catch(() => {
			if (!cancel) setCard(null);
		});
		return () => {
			cancel = true;
		};
	}, [href, profile?.membershipStatus]);
	if (!card || profile?.membershipStatus === "active") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorContacts, { card });
}
function Logo({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "size-8",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "32",
					height: "32",
					rx: "8",
					fill: "#122433"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12.2",
					cy: "16",
					r: "5.1",
					fill: "none",
					stroke: "#2EE6C7",
					strokeWidth: "2.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "19.8",
					cy: "16",
					r: "5.1",
					fill: "none",
					stroke: "#E8F4F2",
					strokeWidth: "2.4"
				})
			]
		}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-lg leading-none",
			children: ["Daily ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-teal",
				children: "Connect"
			})]
		})]
	});
}
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-canvas",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
	});
}
var primary = [
	{
		to: "/",
		label: "Home",
		icon: House,
		exact: true
	},
	{
		to: "/learn",
		label: "Learn",
		icon: BookOpen,
		exact: false
	},
	{
		to: "/deck",
		label: "Deck",
		icon: Clapperboard,
		exact: false
	},
	{
		to: "/studio",
		label: "Studio",
		icon: Sparkles,
		exact: false
	}
];
var extra = [
	{
		to: "/live",
		label: "Live",
		hint: "Schedule a selling stream",
		icon: Radio,
		exact: false
	},
	{
		to: "/market",
		label: "Market",
		hint: "Products you can share",
		icon: Store,
		exact: false
	},
	{
		to: "/creator",
		label: "Creator",
		hint: "Views and earnings",
		icon: ChartLine,
		exact: false
	},
	{
		to: "/wallet",
		label: "Wallet",
		hint: "Balance and payouts",
		icon: Wallet,
		exact: false
	},
	{
		to: "/profile",
		label: "Profile",
		hint: "Your link and contacts",
		icon: UserRound,
		exact: false
	},
	{
		to: "/moderate",
		label: "Moderate",
		hint: "Review the queue",
		icon: Shield,
		exact: false
	}
];
var bottomTabs = primary.slice(0, 4);
function Shell({ children }) {
	const { session, profile } = useConnect();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [more, setMore] = (0, import_react.useState)(false);
	const [notices, setNotices] = (0, import_react.useState)([]);
	const [unread, setUnread] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		getNotices({ data: { idToken: session.idToken } }).then((result) => {
			if (cancel) return;
			setNotices(result.notifications);
			setUnread(result.unread);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, [pathname, session]);
	const initial = (profile?.name || profile?.email || "M").charAt(0).toUpperCase();
	const moreActive = extra.some((tab) => tab.exact ? pathname === tab.to : pathname.startsWith(tab.to));
	(0, import_react.useEffect)(() => {
		setMore(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-frame relative text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-20 flex shrink-0 flex-col border-b border-line bg-canvas/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "Home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "relative grid size-11 place-items-center rounded-full text-fg",
								"aria-label": unread ? `${unread} unread notices` : "Notices",
								onClick: () => setOpen((value) => !value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-teal" }) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "grid size-11 place-items-center rounded-full bg-surface font-medium text-teal",
								"aria-label": "Profile",
								children: initial
							})]
						}),
						open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass absolute right-4 top-16 w-80 max-w-[calc(100vw-2rem)] rounded-2xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "Notices"
								}), unread > 0 && session ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm text-teal",
									onClick: () => {
										readNotices({ data: { idToken: session.idToken } }).then((next) => {
											setNotices(next);
											setUnread(0);
										});
									},
									children: "Mark read"
								}) : null]
							}), notices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-1 py-6 text-sm text-muted",
								children: "Referrals and payouts show up here."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "max-h-80 space-y-2 overflow-auto",
								children: notices.map((notice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("rounded-xl px-3 py-2", notice.read ? "opacity-60" : "bg-surface"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: notice.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: notice.body
									})]
								}, notice.id))
							})]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorBar, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "app-scroll",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Main",
				className: "z-20 grid shrink-0 grid-cols-5 border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)]",
				children: [bottomTabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tab.to,
					activeOptions: { exact: tab.exact },
					className: "flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-muted transition-colors",
					activeProps: { className: "flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-teal" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "size-5" }), tab.label]
				}, tab.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs", moreActive || more ? "text-teal" : "text-muted"),
					"aria-expanded": more,
					"aria-label": "More",
					onClick: () => setMore((value) => !value),
					children: [more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), "More"]
				})]
			}),
			more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 rounded-2xl border border-line bg-raise p-2 sm:left-auto sm:w-72",
				children: extra.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tab.to,
					className: "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "size-4 text-teal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: tab.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: tab.hint
					})] })]
				}, tab.to))
			}) : null
		]
	});
}
function useDesktop() {
	const [desktop, setDesktop] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const apply = () => setDesktop(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	return desktop;
}
function Landing() {
	const desktop = useDesktop();
	const [toEntry, setToEntry] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!new URLSearchParams(window.location.search).get("ref")) return;
		captureReferralFromUrl();
		setToEntry(true);
	}, []);
	if (toEntry) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/join" });
	const src = desktop === null ? void 0 : desktop ? "/landing/pc.mp4" : "/landing/mobile.mp4";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-canvas text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "inline-flex h-11 items-center px-3 text-sm text-muted",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/join",
						className: "inline-flex h-11 items-center rounded-full bg-teal px-4 text-sm font-medium text-ink",
						children: "Join"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto flex max-w-6xl flex-col items-center px-4 py-6 md:px-8 md:py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-[420px] overflow-hidden rounded-3xl bg-black md:max-w-5xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[9/16] w-full md:aspect-video",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						className: "absolute inset-0 h-full w-full bg-black object-contain",
						src,
						controls: true,
						playsInline: true,
						preload: "metadata",
						children: "Your browser cannot play this video."
					}, src)
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 max-w-xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight md:text-5xl",
						children: "A new AI tool, taught before lunch."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "Watch the film, then open a desk."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							className: "inline-flex h-12 items-center rounded-full bg-teal px-6 font-medium text-ink",
							children: "Create your desk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "inline-flex h-12 items-center rounded-full px-4 text-fg",
							children: "I already have one"
						})]
					})
				]
			})]
		})]
	});
}
var Route$14 = createFileRoute("/")({ component: Home$1 });
function Home$1() {
	const { ready, session, profile } = useConnect();
	if (!ready && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {});
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) });
}
var Route$13 = createFileRoute("/checkout")({ component: Checkout });
function Checkout() {
	const navigate = useNavigate();
	const { ready, session, profile, setProfile, signOut } = useConnect();
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [sponsor, setSponsor] = (0, import_react.useState)(null);
	const [sponsorReady, setSponsorReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		(async () => {
			try {
				const mine = await getMySponsor({ data: { idToken: session.idToken } });
				if (cancel) return;
				if (mine) {
					setSponsor(mine);
					return;
				}
			} catch {}
			const referral = captureReferralFromUrl();
			if (!referral) return;
			try {
				const card = await getSponsor({ data: { code: referral.code } });
				if (!cancel && card) setSponsor(card);
			} catch {}
		})().finally(() => {
			if (!cancel) setSponsorReady(true);
		});
		return () => {
			cancel = true;
		};
	}, [session]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/join",
			className: "text-teal",
			children: "Open your sponsor’s link"
		})
	});
	if (profile.membershipStatus === "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-canvas",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-10 border-b border-line bg-canvas",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-lg items-center justify-between px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-muted",
						onClick: () => {
							signOut().then(() => navigate({ to: "/login" }));
						},
						children: "Log out"
					})]
				})
			}),
			sponsor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorDetails, { card: sponsor }) : sponsorReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-line bg-raise px-5 py-4 text-sm text-muted",
				children: "Open the link your sponsor sent so their phone, Facebook, and WhatsApp show here."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-lg px-5 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "Activate your account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-3",
					onSubmit: (event) => {
						event.preventDefault();
						setPending(true);
						setError("");
						redeemCode({ data: {
							idToken: session.idToken,
							code
						} }).then((next) => {
							setProfile(next);
							navigate({ to: "/" });
						}).catch((caught) => setError(errorText(caught))).finally(() => setPending(false));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Enter activation code", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: code,
								onChange: (event) => setCode(event.target.value.toUpperCase()),
								autoComplete: "one-time-code",
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 tracking-widest"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-teal",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending,
							className: "h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-60",
							children: pending ? "Checking…" : "Activate"
						})
					]
				})]
			})
		]
	});
}
var token = string().min(20);
var id = string().regex(/^[A-Za-z0-9_-]{4,40}$/);
var listFeed = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("3db129ac3bd7c0eeddbf83cd607a34cd31cd79ff6503a3bf9a30bae9a35275d6"));
var recordView = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id
})).handler(createSsrRpc("3ade3bc90052405024f936103e63e1d42ac4433c22149fdc2289ea4e3a8958ab"));
var submitPost = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	title: string().trim().min(1).max(80),
	caption: string().trim().max(500),
	hashtags: string().trim().max(120),
	kind: _enum(["video", "image"]),
	mediaUrl: string().min(1).max(12e5),
	posterUrl: string().max(12e5),
	durationSec: number().min(0).max(120),
	width: number().min(0).max(8e3),
	height: number().min(0).max(8e3),
	mime: string().max(40),
	productCode: string().max(40),
	rightsConfirmed: boolean()
})).handler(createSsrRpc("deab5756f3dc38e185e65041a2bdc6c871c5b1db0266e6b2de0bdf597ca4909d"));
var revisePost = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id,
	title: string().trim().min(1).max(80),
	caption: string().trim().max(500)
})).handler(createSsrRpc("0a97294987222ad7a4ed7df30582c94f59e5efa154784ce61f15b44a3df7ddc0"));
var generateStudio = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	productCode: string().regex(/^[a-z0-9-]{2,40}$/),
	output: _enum([
		"image",
		"caption",
		"script"
	]),
	style: string().max(240)
})).handler(createSsrRpc("a7d1c31428ca4249a3dc8b1937852c1e906e2155a52b9f2af103cdf830e40e0f"));
var speakCaption = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	text: string().trim().min(1).max(400)
})).handler(createSsrRpc("373c98d347d041f29f5540670e0847f9dc124f399a6f846c50b1ac9d853eb4d3"));
var listProducts = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("a7647f7687f12d34447bc7c37ce939e89aabc14691132b4b74d62a9472b79e86"));
var loadCreator = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("eccf5d0f350b99145a401b8b762229401f13292e7e79416817dc3f680220c43e"));
var listLive = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("9e62663aaf357beadad5a3e56d39a7e6b00fad4f2b1601eb63dde4383ddfe718"));
var saveLive = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	title: string().trim().max(80),
	scheduledAt: number().min(0),
	productCodes: array(string().regex(/^[a-z0-9-]{2,40}$/)).max(6),
	script: string().max(2e3)
})).handler(createSsrRpc("9bff47c6c6b2844a55ebc1bd360a7f0a7efbd36ea62290c4920a2d23904ae1c9"));
var startLive = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	sessionId: id
})).handler(createSsrRpc("dec34bc29a76ece895e7b96d550def5774a2d282471b808a25adb97babf00892"));
var loadModeration = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("26f89283351c4f85977e2c4627d0764b51ebcf6ce7f8ee9740f899e6c9a1b15e"));
var moderatePost = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id,
	action: _enum([
		"approve",
		"reject",
		"changes"
	]),
	note: string().max(240)
})).handler(createSsrRpc("5b992e28ad99fbe07a6f9db973867d5a6b980cea23868573fed2bf5b12c85b9f"));
createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id,
	platform: _enum([
		"tiktok",
		"youtube",
		"facebook"
	])
})).handler(createSsrRpc("ce33efd19864a05e20b92b183c5b843a15fbaeac37ebb033fbe9b7b79d17d209"));
var confirmOrder = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	orderId: id,
	memberCode: string().regex(/^[A-Z0-9]{4,12}$/),
	productCode: string().regex(/^[a-z0-9-]{2,40}$/),
	salePesos: number().int().min(1).max(1e7),
	event: _enum([
		"confirmed",
		"refunded",
		"cancelled"
	])
})).handler(createSsrRpc("67fbc9469ebbbc697120f2caa6f236c352c4042d1ea4ee93b7332dd45bc67cc7"));
var recordRevenue = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	reportId: id,
	postId: id,
	gross: number().int().min(0).max(1e7),
	deductions: number().int().min(0).max(1e7),
	source: string().max(80),
	status: _enum(["estimated", "confirmed"])
})).handler(createSsrRpc("214ad44472567cb49c11a23e0e5a34949845dcb1283f9681bc6c9aadd84a9d6d"));
var recordClick = createServerFn({ method: "POST" }).validator(object({
	memberCode: string().regex(/^[A-Za-z0-9]{4,12}$/),
	productCode: string().regex(/^[A-Za-z0-9-]{2,40}$/)
})).handler(createSsrRpc("c8f5ae6173767a184510c5f857738bd376a06eaf8546b06b3b4d4132aac1129c"));
var loadAffiliateLanding = createServerFn({ method: "POST" }).validator(object({
	memberCode: string().regex(/^[A-Za-z0-9]{4,12}$/),
	productCode: string().regex(/^[A-Za-z0-9-]{2,40}$/)
})).handler(createSsrRpc("2c11d69d4db1c99e9c2bb911c773d1ea22ed1b76f35566e979594d91c51f0a0b"));
function CreatorView({ session }) {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [earnings, setEarnings] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [views, setViews] = (0, import_react.useState)({});
	const [clicks, setClicks] = (0, import_react.useState)(0);
	const [summary, setSummary] = (0, import_react.useState)({
		submitted: 0,
		pending: 0,
		approved: 0,
		rejected: 0,
		estimated: 0,
		confirmed: 0
	});
	const [note, setNote] = (0, import_react.useState)("");
	const [edit, setEdit] = (0, import_react.useState)(null);
	function reload() {
		return loadCreator({ data: { idToken: session.idToken } }).then((result) => {
			setPosts(result.posts);
			setEarnings(result.earnings);
			setOrders(result.orders);
			setViews(result.views);
			setClicks(result.clicks);
			setSummary(result.summary);
		});
	}
	(0, import_react.useEffect)(() => {
		reload().catch((caught) => setNote(errorText(caught)));
	}, [session.idToken]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "Creator Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "What actually posted, and what actually paid"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Estimated share is not in the wallet. Confirmed share is half of net eligible revenue a moderator reconciled. Clicks are not sales."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-6 grid grid-cols-2 gap-3 md:grid-cols-3",
				children: [
					["Submitted", String(summary.submitted)],
					["In review", String(summary.pending)],
					["Approved", String(summary.approved)],
					["Rejected", String(summary.rejected)],
					["Estimated", peso(summary.estimated)],
					["Confirmed", peso(summary.confirmed)],
					["Link clicks", String(clicks)],
					["Orders", String(orders.length)]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-lg tabular-nums",
						children: value
					})]
				}, label))
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Posts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 divide-y divide-line",
				children: [posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-3 text-sm text-muted",
					children: "No submissions yet."
				}) : null, posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: post.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								post.status,
								post.flags?.length ? ` · flagged: ${post.flags.join(", ")}` : "",
								" · ",
								views[post.id] ?? 0,
								" views"
							]
						}),
						post.moderatorNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: post.moderatorNote
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: Object.entries(post.destinations ?? {}).map(([name, dest]) => `${name}: ${dest.url ? "live link" : dest.status}`).join(" · ")
						}),
						post.status === "changes" || post.status === "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 text-sm text-teal",
							onClick: () => setEdit(post),
							children: "Revise"
						}) : null
					]
				}, post.id))]
			}),
			edit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-2",
				onSubmit: (event) => {
					event.preventDefault();
					revisePost({ data: {
						idToken: session.idToken,
						postId: edit.id,
						title: edit.title,
						caption: edit.caption
					} }).then(() => {
						setEdit(null);
						setNote("Back in the queue.");
						return reload();
					}).catch((caught) => setNote(errorText(caught)));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: edit.title,
						onChange: (event) => setEdit({
							...edit,
							title: event.target.value
						}),
						className: "h-11 w-full rounded-xl border border-line bg-raise px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: edit.caption,
						onChange: (event) => setEdit({
							...edit,
							caption: event.target.value
						}),
						rows: 3,
						className: "w-full rounded-xl border border-line bg-raise px-3 py-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-full bg-teal px-5 text-sm font-medium text-ink",
						children: "Resubmit"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Earnings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 divide-y divide-line",
				children: [earnings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-3 text-sm text-muted",
					children: "No reconciled revenue yet."
				}) : null, earnings.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						row.status === "estimated" ? "Estimated" : "Confirmed",
						" · ",
						row.source
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							row.period,
							" · net ",
							peso(row.net),
							" of ",
							peso(row.gross)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular-nums",
						children: peso(row.share)
					})]
				}, row.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Affiliate orders"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 divide-y divide-line",
				children: [orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-3 text-sm text-muted",
					children: "No merchant-confirmed orders."
				}) : null, orders.map((order, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3 text-sm",
					children: [
						order.productCode,
						" · ",
						order.status,
						" · ",
						peso(order.memberPesos ?? 0)
					]
				}, `${order.productCode}-${index}`))]
			})
		]
	});
}
function MemberGate({ children }) {
	const { ready, session, profile } = useConnect();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: children(session, profile) });
}
var Route$12 = createFileRoute("/creator")({ component: function CreatorPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorView, { session }) });
} });
async function uploadMemberMedia(idToken, file, objectPath) {
	const bucket = firebaseConfig.storageBucket;
	const res = await fetch(`https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(objectPath)}`, {
		method: "POST",
		headers: {
			Authorization: `Firebase ${idToken}`,
			"Content-Type": file.type || "application/octet-stream"
		},
		body: file
	});
	if (!res.ok) return null;
	const data = await res.json();
	const token = data.downloadTokens?.split(",")[0];
	if (!token) return null;
	return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(data.name || objectPath)}?alt=media&token=${token}`;
}
function readVideoMeta(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const video = document.createElement("video");
		video.preload = "metadata";
		video.muted = true;
		video.playsInline = true;
		let settled = false;
		const finish = () => {
			if (settled) return;
			settled = true;
			window.clearTimeout(timer);
			const width = video.videoWidth || 720;
			const height = video.videoHeight || 1280;
			const durationSec = Number.isFinite(video.duration) ? video.duration : 0;
			const canvas = document.createElement("canvas");
			canvas.width = 360;
			canvas.height = Math.max(1, Math.round(360 * height / Math.max(1, width)));
			const ctx = canvas.getContext("2d");
			if (ctx && video.videoWidth) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			const posterUrl = canvas.toDataURL("image/jpeg", .72);
			URL.revokeObjectURL(url);
			resolve({
				durationSec,
				width,
				height,
				posterUrl
			});
		};
		const timer = window.setTimeout(finish, 2500);
		video.onloadedmetadata = () => {
			try {
				const target = Math.min(.2, Math.max(0, (video.duration || 0) / 2));
				if (target > 0) video.currentTime = target;
				else finish();
			} catch {
				finish();
			}
		};
		video.onseeked = finish;
		video.onerror = () => {
			if (settled) return;
			settled = true;
			window.clearTimeout(timer);
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Could not read that video."));
		};
		video.src = url;
	});
}
function Reel({ post, mine, onView }) {
	const videoRef = (0, import_react.useRef)(null);
	const seen = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		const watcher = new IntersectionObserver(([entry]) => {
			if (!entry) return;
			if (entry.isIntersecting) {
				video.play().catch(() => void 0);
				if (!seen.current) {
					seen.current = true;
					onView();
				}
			} else video.pause();
		}, { threshold: .65 });
		watcher.observe(video);
		return () => watcher.disconnect();
	}, [onView]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "snap-start snap-always relative h-[78dvh] overflow-hidden bg-black",
		children: [post.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: videoRef,
			src: post.mediaUrl,
			poster: post.posterUrl,
			playsInline: true,
			muted: true,
			loop: true,
			className: "h-full w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: post.mediaUrl,
			alt: "",
			className: "h-full w-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-4 pt-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-white",
					children: post.creatorName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-lg text-white",
					children: post.title
				}),
				post.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-3 text-sm text-white/85",
					children: post.caption
				}) : null,
				mine && post.status !== "approved" && post.status !== "publishing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-teal",
					children: post.status === "queued" ? "In review" : post.status
				}) : null,
				post.affiliatePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: post.affiliatePath,
					className: "pointer-events-auto mt-3 inline-flex h-9 items-center rounded-full bg-white/15 px-3 text-sm text-white",
					children: "View product"
				}) : null
			]
		})]
	});
}
function DeckView({ session, profile }) {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [caption, setCaption] = (0, import_react.useState)("");
	const [productCode, setProductCode] = (0, import_react.useState)("");
	const [rights, setRights] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [fileName, setFileName] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	function reload() {
		return listFeed({ data: { idToken: session.idToken } }).then((result) => setPosts(result.posts));
	}
	(0, import_react.useEffect)(() => {
		let cancel = false;
		reload().catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		return () => {
			cancel = true;
		};
	}, [session.idToken]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto h-full max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "h-full snap-y snap-mandatory overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sticky top-0 z-10 border-b border-line bg-canvas px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 shrink-0 place-items-center rounded-full bg-surface font-medium text-teal",
								children: (profile.name || "M").charAt(0).toUpperCase()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 flex-1 rounded-full bg-raise px-4 text-left text-sm text-muted",
								onClick: () => setOpen(true),
								children: "Post a video"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 rounded-full bg-teal px-4 text-sm font-medium text-ink",
								onClick: () => setOpen(true),
								children: "Post"
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: error
					}) : null,
					note && !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: note
					}) : null
				]
			}), posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-16 text-center text-sm text-muted",
				children: "No reels yet. Post the first video."
			}) : posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reel, {
				post,
				mine: post.creatorId === profile.uid,
				onView: () => {
					recordView({ data: {
						idToken: session.idToken,
						postId: post.id
					} }).catch(() => void 0);
				}
			}, post.id))]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-30 flex flex-col justify-end bg-canvas/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "max-h-[85%] space-y-3 overflow-y-auto rounded-t-3xl border border-line bg-raise px-4 py-5",
				onSubmit: (event) => {
					event.preventDefault();
					setNote("");
					setBusy(true);
					const file = fileRef.current?.files?.[0];
					(async () => {
						if (!file) throw new Error("Choose a video to upload.");
						const meta = await readVideoMeta(file);
						let mediaUrl = await uploadMemberMedia(session.idToken, file, `dailyConnect/${profile.uid}/${Date.now()}.mp4`);
						if (!mediaUrl) {
							if (file.size > 7e5) throw new Error("Storage refused the file. Trim it under about 700KB and try again.");
							mediaUrl = await fileToData(file);
						}
						await submitPost({ data: {
							idToken: session.idToken,
							title,
							caption,
							hashtags: "#DailyConnect",
							kind: "video",
							mediaUrl,
							posterUrl: meta.posterUrl,
							durationSec: meta.durationSec,
							width: meta.width,
							height: meta.height,
							mime: file.type || "video/mp4",
							productCode,
							rightsConfirmed: rights
						} });
						setTitle("");
						setCaption("");
						setRights(false);
						setFileName("");
						if (fileRef.current) fileRef.current.value = "";
						setOpen(false);
						setNote("Video uploaded. It stays in review until a person approves it.");
						await reload();
					})().catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Upload video"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-muted",
							onClick: () => setOpen(false),
							children: "Close"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Portrait clips under 58 seconds. ",
							profile.name,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (event) => setTitle(event.target.value),
							required: true,
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Caption", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: caption,
							onChange: (event) => setCaption(event.target.value),
							rows: 3,
							className: "mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Affiliate product, optional", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: productCode,
							onChange: (event) => setProductCode(event.target.value),
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "None"
							}), PRODUCT_CATALOG.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: product.code,
								children: product.name
							}, product.code))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						name: "clip",
						type: "file",
						accept: "video/mp4,video/webm,video/*",
						className: "sr-only",
						onChange: (event) => setFileName(event.target.files?.[0]?.name ?? "")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 w-full rounded-xl border border-line bg-canvas text-sm",
						onClick: () => fileRef.current?.click(),
						children: fileName || "Choose video"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: rights,
							onChange: (event) => setRights(event.target.checked),
							className: "mt-1 size-4 accent-teal",
							required: true
						}), "I have the rights to this footage and any music in it."]
					}),
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: note
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-50",
						children: busy ? "Uploading…" : "Upload video"
					})
				]
			})
		}) : null]
	});
}
function fileToData(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read the file."));
		reader.readAsDataURL(file);
	});
}
var Route$11 = createFileRoute("/deck")({ component: function DeckPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session, profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckView, {
		session,
		profile
	}) });
} });
function GoogleGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12 11v2.4h6.6c-.3 1.6-1.8 4.6-6.6 4.6A7 7 0 1 1 12 5a6.7 6.7 0 0 1 4.7 1.8l1.8-1.8A9.8 9.8 0 0 0 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4 9.6-9.7 0-.6 0-1.1-.1-1.6H12z"
		})
	});
}
function AuthPanel({ mode }) {
	const navigate = useNavigate();
	const { signInEmail, signUpEmail, adopt } = useConnect();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		captureReferralFromUrl();
	}, []);
	function go(profile) {
		navigate({ to: profile.membershipStatus === "active" ? "/" : "/checkout" });
	}
	async function onEmail(event) {
		event.preventDefault();
		setError("");
		setPending("email");
		try {
			go(mode === "login" ? await signInEmail(email, password) : await signUpEmail({
				name,
				email,
				phone,
				password
			}));
		} catch (caught) {
			setError(errorText(caught));
		} finally {
			setPending(null);
		}
	}
	async function onGoogle() {
		setError("");
		if (mode === "join" && phone.replace(/\D/g, "").length < 10) {
			setError("Enter a mobile number with at least 10 digits.");
			return;
		}
		setPending("google");
		try {
			const session = await signInWithGoogle();
			go(await adopt({
				idToken: session.idToken,
				refreshToken: session.refreshToken,
				uid: session.uid,
				email: session.email,
				expiresAt: session.expiresAt
			}, session.name, mode === "join" ? phone : void 0));
		} catch (caught) {
			const code = caught && typeof caught === "object" && "code" in caught;
			setError(code ? googleError(caught) : errorText(caught));
		} finally {
			setPending(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-canvas px-5 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 font-display text-4xl",
					children: mode === "join" ? "Create your account" : "Welcome back"
				}),
				mode === "join" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Next you’ll see your sponsor. They give you the code that activates this account."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Use the email or Google account you joined with."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: onEmail,
					className: "mt-6 space-y-3",
					children: [
						mode === "join" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (event) => setName(event.target.value),
								autoComplete: "name",
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 text-fg"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								autoComplete: "email",
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 text-fg"
							})]
						}),
						mode === "join" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Mobile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: phone,
								onChange: (event) => setPhone(event.target.value),
								autoComplete: "tel",
								inputMode: "tel",
								placeholder: "09…",
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 text-fg"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "password",
								minLength: 8,
								value: password,
								onChange: (event) => setPassword(event.target.value),
								autoComplete: mode === "join" ? "new-password" : "current-password",
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 text-fg"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-teal",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending !== null,
							className: "h-12 w-full rounded-full bg-teal font-medium text-ink disabled:opacity-60",
							children: pending === "email" ? "Please wait…" : mode === "join" ? "Create account" : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
						"or",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: pending !== null,
					onClick: () => void onGoogle(),
					className: "flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-raise font-medium disabled:opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleGlyph, {}), pending === "google" ? "Opening Google…" : "Continue with Google"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: mode === "join" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Already joined?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-teal",
							children: "Sign in"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"New here?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							className: "text-teal",
							children: "Create a desk"
						})
					] })
				})
			]
		})
	});
}
var Route$10 = createFileRoute("/join")({ component: Join });
function Join() {
	const { ready, session, profile } = useConnect();
	(0, import_react.useEffect)(() => {
		captureReferralFromUrl();
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (session && profile?.membershipStatus === "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (session && profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPanel, { mode: "join" });
}
function LiveView({ session }) {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [title, setTitle] = (0, import_react.useState)("");
	const [when, setWhen] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [script, setScript] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	function reload() {
		return listLive({ data: { idToken: session.idToken } }).then((result) => {
			setProducts(result.products);
			setSessions(result.sessions);
		});
	}
	(0, import_react.useEffect)(() => {
		reload().catch((caught) => setNote(errorText(caught)));
	}, [session.idToken]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "Daily Connect Live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Schedule the sell"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Each platform is its own destination. Stream keys never come to this page. If a destination is not connected, the others are still checked — none of them go live until an official account is eligible."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					setBusy(true);
					saveLive({ data: {
						idToken: session.idToken,
						title,
						scheduledAt: when ? new Date(when).getTime() : Date.now(),
						productCodes: picked,
						script
					} }).then(() => reload()).then(() => setNote("Session saved. It is not live.")).catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (event) => setTitle(event.target.value),
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["When", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "datetime-local",
							value: when,
							onChange: (event) => setWhen(event.target.value),
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm",
						children: "Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-2",
						children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "size-4 accent-teal",
									checked: picked.includes(product.code),
									onChange: () => setPicked((current) => current.includes(product.code) ? current.filter((code) => code !== product.code) : [...current, product.code])
								}),
								product.name,
								" · ",
								peso(product.price)
							]
						}, product.code))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Script", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: script,
							onChange: (event) => setScript(event.target.value),
							rows: 5,
							className: "mt-1 w-full rounded-xl border border-line bg-raise px-3 py-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 rounded-full bg-surface px-4 text-sm",
							disabled: !picked[0] || busy,
							onClick: () => {
								const code = picked[0];
								if (!code) return;
								setBusy(true);
								generateStudio({ data: {
									idToken: session.idToken,
									productCode: code,
									output: "script",
									style: title || "calm host"
								} }).then((draft) => setScript(draft.text)).catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
							},
							children: "Draft a script"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "h-11 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
							children: "Save session"
						})]
					})
				]
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-4",
				children: sessions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-3xl bg-raise p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								new Date(item.scheduledAt).toLocaleString(),
								" · ",
								item.status
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whitespace-pre-wrap text-sm",
							children: item.script
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1 text-sm",
							children: [
								"youtube",
								"facebook",
								"tiktok"
							].map((platform) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-teal",
									children: platform
								}),
								" · ",
								item.destinations[platform]?.status,
								" — ",
								item.destinations[platform]?.detail
							] }, platform))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 h-10 rounded-full bg-surface px-4 text-sm",
							onClick: () => {
								startLive({ data: {
									idToken: session.idToken,
									sessionId: item.id
								} }).then((next) => {
									setSessions((current) => current.map((row) => row.id === next.id ? next : row));
									setNote("Checked each destination. None are connected, so nothing is streaming.");
								}).catch((caught) => setNote(errorText(caught)));
							},
							children: "Check destinations"
						})
					]
				}, item.id))
			})
		]
	});
}
var Route$9 = createFileRoute("/live")({ component: function LivePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveView, { session }) });
} });
var Route$8 = createFileRoute("/login")({ component: Login });
function Login() {
	const { ready, session, profile } = useConnect();
	if (!ready && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (session && profile?.membershipStatus === "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (session && profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPanel, { mode: "login" });
}
function MarketView({ session }) {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [links, setLinks] = (0, import_react.useState)({});
	const [policy, setPolicy] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listProducts({ data: { idToken: session.idToken } }).then((result) => {
			setProducts(result.products);
			setLinks(Object.fromEntries(result.links.map((link) => [link.productCode, link.path])));
			setPolicy(`Member share is ${result.policy.affiliateMemberShareBps / 100}% of the merchant commission. A click is not a sale. Confirmed orders are entered by a moderator from the merchant record.`);
		}).catch((caught) => setNote(errorText(caught)));
	}, [session.idToken]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "Affiliate marketplace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Products we are allowed to sell"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: policy
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-4",
				children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-4 rounded-3xl bg-raise p-4 sm:grid-cols-[8rem_minmax(0,1fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: "",
						className: "aspect-square w-full rounded-2xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 tabular-nums",
							children: [
								peso(product.price),
								" · ",
								product.commissionBps / 100,
								"% merchant commission · ",
								product.windowDays,
								"-day window"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: product.guidelines
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 break-all text-sm text-teal",
							children: links[product.code]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 h-10 rounded-full bg-teal px-4 text-sm font-medium text-ink",
							onClick: () => {
								const path = links[product.code];
								if (!path) return;
								const absolute = new URL(path, window.location.origin).toString();
								navigator.clipboard.writeText(absolute).then(() => setNote("Link copied."), () => setNote(absolute));
							},
							children: "Copy tracked link"
						})
					] })]
				}, product.code))
			})
		]
	});
}
var Route$7 = createFileRoute("/market")({ component: function MarketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketView, { session }) });
} });
function ModerateView({ session }) {
	const [allowed, setAllowed] = (0, import_react.useState)(true);
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	const [comment, setComment] = (0, import_react.useState)("");
	const [orderId, setOrderId] = (0, import_react.useState)("");
	const [memberCode, setMemberCode] = (0, import_react.useState)("");
	const [productCode, setProductCode] = (0, import_react.useState)("lamp");
	const [sale, setSale] = (0, import_react.useState)(1e3);
	const [reportId, setReportId] = (0, import_react.useState)("");
	const [postId, setPostId] = (0, import_react.useState)("");
	const [gross, setGross] = (0, import_react.useState)(0);
	const [deductions, setDeductions] = (0, import_react.useState)(0);
	const [earningStatus, setEarningStatus] = (0, import_react.useState)("estimated");
	const [issued, setIssued] = (0, import_react.useState)("");
	const [soldTo, setSoldTo] = (0, import_react.useState)("");
	const [sponsorCode, setSponsorCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	function reload() {
		return loadModeration({ data: { idToken: session.idToken } }).then((result) => {
			setAllowed(result.allowed);
			setPosts(result.posts);
			setProducts(result.products);
		});
	}
	(0, import_react.useEffect)(() => {
		reload().catch((caught) => setNote(errorText(caught)));
	}, [session.idToken]);
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Moderation is closed"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Another desk lead already holds this queue."
		})]
	});
	const queue = posts.filter((post) => post.status === "queued" || post.status === "changes");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "Moderation desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "A person decides"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Screening flags are not a legal clearance. Approving creates one publishing job per platform. Those jobs stay unsent until an official TikTok, YouTube, or Facebook account is connected on the server. If you are the only moderator, you may clear your own post; once a second lead exists, you cannot."
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-3xl bg-raise p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Sell a code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "The sponsor pays you for the code between the two of you. Your contact is not shown in the app. Enter their member code and it lands in their stock to sell."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-3 flex flex-wrap gap-2",
						onSubmit: (event) => {
							event.preventDefault();
							setBusy(true);
							issueCode({ data: {
								idToken: session.idToken,
								memberCode: sponsorCode
							} }).then((result) => {
								setIssued(result.code);
								setSoldTo(result.sponsorName);
								setSponsorCode("");
								setNote(`Sold to ${result.sponsorName}.`);
							}).catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: sponsorCode,
							onChange: (event) => setSponsorCode(event.target.value.toUpperCase()),
							placeholder: "Sponsor member code",
							className: "h-11 min-w-48 flex-1 rounded-xl border border-line bg-canvas px-3 tracking-widest"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "h-11 rounded-full bg-teal px-4 text-sm font-medium text-ink disabled:opacity-50",
							children: busy ? "Selling…" : "Sell code"
						})]
					}),
					issued ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-display text-3xl tracking-widest text-teal",
						children: [issued, soldTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-3 font-sans text-sm tracking-normal text-muted",
							children: ["for ", soldTo]
						}) : null]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 space-y-4",
				children: [queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Queue is clear."
				}) : null, queue.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-3xl bg-raise p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								post.creatorName,
								" · ",
								post.creatorCode,
								" · ",
								post.status,
								post.flags?.length ? ` · ${post.flags.join(", ")}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: post.caption
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								"approve",
								"changes",
								"reject"
							].map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-10 rounded-full bg-surface px-4 text-sm",
								onClick: () => {
									moderatePost({ data: {
										idToken: session.idToken,
										postId: post.id,
										action,
										note: comment
									} }).then(() => {
										setNote(action === "approve" ? "Approved. Platforms are still not connected." : "Decision saved.");
										return reload();
									}).catch((caught) => setNote(errorText(caught)));
								},
								children: action
							}, action))
						})
					]
				}, post.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-sm",
				children: ["Note for the creator", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: comment,
					onChange: (event) => setComment(event.target.value),
					className: "mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Merchant order"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Use the merchant’s order id. Sending the same id again does not pay twice."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					const eventName = event.currentTarget.elements.namedItem("event").value;
					confirmOrder({ data: {
						idToken: session.idToken,
						orderId,
						memberCode: memberCode.toUpperCase(),
						productCode,
						salePesos: sale,
						event: eventName
					} }).then((result) => setNote(`Order ${result.action}. Member amount ₱${result.member}.`)).catch((caught) => setNote(errorText(caught)));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "Order id",
						value: orderId,
						onChange: (event) => setOrderId(event.target.value),
						className: "h-11 rounded-xl border border-line bg-raise px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "Member code",
						value: memberCode,
						onChange: (event) => setMemberCode(event.target.value),
						className: "h-11 rounded-xl border border-line bg-raise px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: productCode,
						onChange: (event) => setProductCode(event.target.value),
						className: "h-11 rounded-xl border border-line bg-raise px-3",
						children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: product.code,
							children: product.name
						}, product.code))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						value: sale,
						onChange: (event) => setSale(Number(event.target.value)),
						className: "h-11 rounded-xl border border-line bg-raise px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "event",
						className: "h-11 rounded-xl border border-line bg-raise px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "confirmed",
								children: "confirmed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "refunded",
								children: "refunded"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cancelled",
								children: "cancelled"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-full bg-teal px-5 font-medium text-ink",
						children: "Record order"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Creator revenue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Confirmed posts half of net to the wallet. Estimated does not."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					recordRevenue({ data: {
						idToken: session.idToken,
						reportId,
						postId,
						gross,
						deductions,
						source: "configured-revenue",
						status: earningStatus
					} }).then((result) => setNote(result.applied ? `${result.status} share ₱${result.share}.` : "That report id was already recorded.")).catch((caught) => setNote(errorText(caught)));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "Report id",
						value: reportId,
						onChange: (event) => setReportId(event.target.value),
						className: "h-11 rounded-xl border border-line bg-raise px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: postId,
						onChange: (event) => setPostId(event.target.value),
						className: "h-11 rounded-xl border border-line bg-raise px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Post"
						}), posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: post.id,
							children: post.title
						}, post.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						value: gross,
						onChange: (event) => setGross(Number(event.target.value)),
						className: "h-11 rounded-xl border border-line bg-raise px-3",
						"aria-label": "Gross pesos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						value: deductions,
						onChange: (event) => setDeductions(Number(event.target.value)),
						className: "h-11 rounded-xl border border-line bg-raise px-3",
						"aria-label": "Deductions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: earningStatus,
						onChange: (event) => setEarningStatus(event.target.value),
						className: "h-11 rounded-xl border border-line bg-raise px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "estimated",
							children: "estimated"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "confirmed",
							children: "confirmed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-full bg-teal px-5 font-medium text-ink",
						children: "Record revenue"
					})
				]
			})
		]
	});
}
var Route$6 = createFileRoute("/moderate")({ component: function ModeratePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModerateView, { session }) });
} });
var Route$5 = createFileRoute("/profile")({ component: ProfilePage });
function flatten(node, depth = 0) {
	return [{
		uid: node.uid,
		name: node.name,
		depth
	}, ...node.children.flatMap((child) => flatten(child, depth + 1))];
}
function Branch({ node }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			node.name,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted",
				children: node.level === 0 ? "you" : `level ${node.level}`
			})
		] }), node.children.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "ml-4 border-l border-line pl-4",
			children: node.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Branch, { node: child }, child.uid))
		}) : null]
	});
}
function ProfilePage() {
	const { ready, session, profile, setProfile, signOut } = useConnect();
	const [network, setNetwork] = (0, import_react.useState)(null);
	const [recruitUid, setRecruitUid] = (0, import_react.useState)("");
	const [parentUid, setParentUid] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [alerts, setAlerts] = (0, import_react.useState)("Alerts off");
	const [stock, setStock] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (typeof Notification !== "undefined") setAlerts(Notification.permission === "granted" ? "Alerts on" : "Alerts off");
	}, []);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		getNetwork({ data: { idToken: session.idToken } }).then((next) => {
			if (cancel) return;
			setNetwork(next);
			setParentUid(next.profile.uid);
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		return () => {
			cancel = true;
		};
	}, [session]);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		listCodes({ data: { idToken: session.idToken } }).then((result) => {
			if (!cancel) setStock(result.codes);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, [session]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	const link = profile.referralCode ? `${window.location.origin}/join?ref=${profile.referralCode}` : "";
	const unplaced = (network?.recruits ?? []).filter((recruit) => recruit.membershipStatus === "active" && !recruit.placed);
	const parents = network ? flatten(network.tree) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: profile.name || "Member"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: profile.email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm",
				children: [
					"Membership",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-teal",
						children: profile.membershipStatus === "active" ? "active" : "inactive"
					}),
					profile.phone ? ` · ${profile.phone}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 grid gap-3",
				onSubmit: (event) => {
					event.preventDefault();
					const form = new FormData(event.currentTarget);
					setPending(true);
					setError("");
					saveContact({ data: {
						idToken: session.idToken,
						phone: String(form.get("phone") ?? ""),
						facebook: String(form.get("facebook") ?? ""),
						whatsapp: String(form.get("whatsapp") ?? "")
					} }).then((next) => {
						setProfile(next);
						toast("Contact saved. New visitors from your link can reach you.");
					}).catch((caught) => setError(errorText(caught))).finally(() => setPending(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "How recruits reach you"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "These icons show on their activation page. Leave a field blank to hide that icon."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneIcon, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "phone",
							defaultValue: profile.phone,
							autoComplete: "tel",
							placeholder: "Mobile number",
							className: "h-11 w-full rounded-xl border border-line bg-raise px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#1877F2]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookIcon, {})
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "facebook",
							defaultValue: profile.facebook ?? "",
							placeholder: "facebook.com/your-name",
							className: "h-11 w-full rounded-xl border border-line bg-raise px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#25D366]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, {})
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "whatsapp",
							defaultValue: profile.whatsapp ?? "",
							placeholder: "WhatsApp number or link",
							className: "h-11 w-full rounded-xl border border-line bg-raise px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: pending,
						className: "h-11 w-fit rounded-full bg-teal px-4 font-medium text-ink disabled:opacity-50",
						children: "Save contact"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Your link"
				}), profile.referralCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 break-all text-sm text-muted",
						children: link
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl tracking-wide text-teal",
						children: profile.referralCode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 h-11 rounded-full bg-teal px-4 font-medium text-ink",
						onClick: () => {
							navigator.clipboard.writeText(link).then(() => toast("Link copied"));
						},
						children: "Copy link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "The first person to open this link keeps you as their sponsor for 1 month. Buy codes from the admin, between the two of you. When a new member pays you ₱550 the same way, give them one code. The app does not take the money. The admin’s contact is not listed here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm text-muted",
							children: "Codes you can sell"
						}), stock.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "None yet. Buy a code from the admin first."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-2",
							children: stock.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "font-display text-2xl tracking-widest text-teal",
								children: code
							}, code))
						})]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Your code is minted when membership is active."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Place a recruit"
				}), unplaced.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "When someone active joins with your link, they show up here until you place them."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 space-y-3",
					onSubmit: (event) => {
						event.preventDefault();
						setPending(true);
						setError("");
						place({ data: {
							idToken: session.idToken,
							recruitUid,
							parentUid
						} }).then((next) => {
							setNetwork(next);
							setRecruitUid("");
							toast("Placed. ₱10 is scheduled up to ten levels.");
						}).catch((caught) => setError(errorText(caught))).finally(() => setPending(false));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Who", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								value: recruitUid,
								onChange: (event) => setRecruitUid(event.target.value),
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select"
								}), unplaced.map((recruit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: recruit.uid,
									children: recruit.name
								}, recruit.uid))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Under", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								required: true,
								value: parentUid,
								onChange: (event) => setParentUid(event.target.value),
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3",
								children: parents.map((parent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: parent.uid,
									children: ["· ".repeat(parent.depth), parent.depth === 0 ? "Directly under me" : parent.name]
								}, parent.uid))
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-teal",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending,
							className: "h-12 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
							children: pending ? "Placing…" : "Place"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Your line"
				}), network ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Branch, { node: network.tree })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Loading the line…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full bg-surface px-4",
					onClick: () => {
						if (typeof Notification === "undefined") return;
						Notification.requestPermission().then((permission) => {
							setAlerts(permission === "granted" ? "Alerts on" : "Alerts off");
						});
					},
					children: alerts
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full px-4 text-muted",
					onClick: () => {
						signOut();
					},
					children: "Sign out"
				})]
			})
		]
	}) });
}
function StudioView({ session }) {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [productCode, setProductCode] = (0, import_react.useState)("lamp");
	const [style, setStyle] = (0, import_react.useState)("morning light, quiet desk");
	const [output, setOutput] = (0, import_react.useState)("caption");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const [audio, setAudio] = (0, import_react.useState)("");
	const [rights, setRights] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		listProducts({ data: { idToken: session.idToken } }).then((result) => {
			setProducts(result.products);
			if (result.products[0]) setProductCode(result.products[0].code);
		}).catch((caught) => setNote(errorText(caught)));
	}, [session.idToken]);
	const product = products.find((item) => item.code === productCode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "AI Content Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Make the piece, then send it up"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Image, caption, or a live script from an approved product. Video is a desk draft plus your own portrait clip — this desk does not invent a finished commercial unless the image service is configured. Nothing publishes until a person approves it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					setBusy(true);
					setNote("");
					setAudio("");
					generateStudio({ data: {
						idToken: session.idToken,
						productCode,
						output,
						style
					} }).then((next) => {
						setDraft(next);
						setText(next.text);
						setNote(next.source === "grok" ? "Generated. Edit it before you submit." : "AI provider is not configured. This is a desk draft you can edit.");
					}).catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Product", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: productCode,
							onChange: (event) => setProductCode(event.target.value),
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3",
							children: products.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.code,
								children: [
									item.name,
									" · ",
									peso(item.price)
								]
							}, item.code))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"caption",
							"image",
							"script"
						].map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOutput(kind),
							className: kind === output ? "h-10 rounded-full bg-teal px-4 text-sm text-ink" : "h-10 rounded-full bg-surface px-4 text-sm text-muted",
							children: kind
						}, kind))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Style or prompt", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: style,
							onChange: (event) => setStyle(event.target.value),
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "h-11 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
						children: busy ? "Working…" : "Generate"
					})
				]
			}),
			product ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: product.guidelines
			}) : null,
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: note
			}) : null,
			draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-3xl bg-raise p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: draft.imageUrl,
						alt: "",
						className: "aspect-[9/16] max-h-96 w-full rounded-2xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: [
							draft.source,
							" · ",
							draft.affiliatePath
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm",
						children: ["Edit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: text,
							onChange: (event) => setText(event.target.value),
							rows: 5,
							className: "mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 rounded-full bg-surface px-4 text-sm",
							onClick: () => {
								setBusy(true);
								speakCaption({ data: {
									idToken: session.idToken,
									text
								} }).then((result) => setAudio(result.audio)).catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
							},
							children: "Read caption"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: rights,
								onChange: (event) => setRights(event.target.checked),
								className: "size-4 accent-teal"
							}), "I can use this image and any audio."]
						})]
					}),
					audio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						controls: true,
						src: audio,
						className: "mt-3 w-full"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy || output === "script",
						className: "mt-4 h-11 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
						onClick: () => {
							setBusy(true);
							submitPost({ data: {
								idToken: session.idToken,
								title: product?.name || "Product",
								caption: text,
								hashtags: "#DailyConnect",
								kind: "image",
								mediaUrl: draft.imageUrl,
								posterUrl: draft.imageUrl,
								durationSec: 0,
								width: 9,
								height: 16,
								mime: "image/jpeg",
								productCode: draft.productCode,
								rightsConfirmed: rights
							} }).then(() => setNote("Submitted to View Deck. It waits for a person.")).catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
						},
						children: output === "script" ? "Scripts stay on the live desk" : "Submit to View Deck"
					})
				]
			}) : null
		]
	});
}
var Route$4 = createFileRoute("/studio")({ component: function StudioPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioView, { session }) });
} });
var Route$3 = createFileRoute("/wallet")({ component: WalletPage });
var labels = {
	referral_bonus: "Direct referral",
	unilevel: "Unilevel",
	payout: "Payout",
	creator_share: "Creator share",
	affiliate_commission: "Affiliate commission",
	adjustment: "Adjustment"
};
function WalletPage() {
	const { ready, session, profile, setProfile } = useConnect();
	const [view, setView] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)(100);
	const [note, setNote] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		getWallet({ data: { idToken: session.idToken } }).then((next) => {
			if (cancel) return;
			setView(next);
			setProfile(next.profile);
			setAmount(Math.max(100, next.profile.walletBalance));
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		return () => {
			cancel = true;
		};
	}, [session, setProfile]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Wallet"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-teal",
				children: error
			}) : null,
			view ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: "Available now"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl tabular-nums",
					children: peso(view.profile.walletBalance)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-6 grid grid-cols-2 gap-3 md:grid-cols-4",
					children: [
						["Direct, paid", String(view.directPaid)],
						["Waiting to join", String(view.directPending)],
						["Referral paid", peso(view.directBonus)],
						["Accruing", peso(view.accruing)]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-lg tabular-nums",
							children: value
						})]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"₱50 from a direct join is available immediately. ₱10 unilevel posts on the 1st (Manila). Line size: ",
						view.teamSize,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					onSubmit: (event) => {
						event.preventDefault();
						if (!session) return;
						setPending(true);
						setNote("");
						payout({ data: {
							idToken: session.idToken,
							amount
						} }).then(() => getWallet({ data: { idToken: session.idToken } })).then((next) => {
							setView(next);
							setProfile(next.profile);
							setNote("Payout requested. It stays in history until the monthly run.");
						}).catch((caught) => setNote(errorText(caught))).finally(() => setPending(false));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["Request payout", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 100,
							value: amount,
							onChange: (event) => setAmount(Number(event.target.value)),
							className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 sm:w-40"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: pending || profile.membershipStatus !== "active",
						className: "h-12 self-end rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
						children: pending ? "Sending…" : "Request"
					})]
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 font-display text-2xl",
					children: "History"
				}),
				view.transactions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Share your link. ₱50 lands the moment they join."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line",
					children: view.transactions.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: labels[tx.type] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								tx.note,
								" · ",
								tx.status === "scheduled" ? "Posts on the 1st" : tx.status
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums",
							children: [tx.type === "payout" || tx.amount < 0 ? "−" : "+", peso(Math.abs(tx.amount))]
						})]
					}, tx.id))
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Loading wallet…"
			})
		]
	}) });
}
var Route$2 = createFileRoute("/learn/")({ component: Learn });
var filters = [
	"All",
	"Start",
	"Intermediate",
	"Advanced"
];
function Learn() {
	const { ready, session, profile } = useConnect();
	const [items, setItems] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [query, setQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!session || profile?.membershipStatus !== "active") return;
		let cancel = false;
		getDesk({ data: { idToken: session.idToken } }).then((desk) => {
			if (!cancel) setItems(desk.tutorials);
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		}).finally(() => {
			if (!cancel) setLoading(false);
		});
		return () => {
			cancel = true;
		};
	}, [profile?.membershipStatus, session]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	const shown = items.filter((tutorial) => {
		const matchesFilter = filter === "All" || tutorial.difficulty === filter;
		const hay = `${tutorial.title} ${tutorial.tags.join(" ")} ${tutorial.description}`.toLowerCase();
		return matchesFilter && hay.includes(query.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Learn"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search lessons",
					className: "h-12 flex-1 rounded-xl border border-line bg-raise px-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto",
					children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(item),
						className: filter === item ? "h-10 shrink-0 rounded-full bg-teal px-3 text-sm text-ink" : "h-10 shrink-0 rounded-full bg-surface px-3 text-sm text-muted",
						children: item
					}, item))
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Loading lessons…"
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-teal",
				children: error
			}) : null,
			!loading && shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Nothing matches."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-3",
				children: shown.map((tutorial) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/learn/$tutorialId",
					params: { tutorialId: tutorial.id },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tutorial.thumbnail,
							alt: "",
							className: "aspect-[3/2] w-full rounded-2xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: tutorial.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								tutorial.difficulty,
								" · ",
								tutorial.durationMin,
								" min"
							]
						})
					]
				}, tutorial.id))
			})
		]
	}) });
}
/** Public Mux Data environment key. It identifies the environment; it is not an API secret. */
var MUX_ENV_KEY = "hi98e49ahgosgknjladelb6hc";
function Player({ tutorial, initial, related }) {
	const { session } = useConnect();
	const videoRef = (0, import_react.useRef)(null);
	const total = tutorial.durationMin * 60;
	const seed = newer(initial, (0, import_react.useMemo)(() => readCache(session?.uid, tutorial.id), [session?.uid, tutorial.id]));
	const [position, setPosition] = (0, import_react.useState)(seed?.lastPositionSec ?? 0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [exercises, setExercises] = (0, import_react.useState)(seed?.exercises ?? []);
	const [completed, setCompleted] = (0, import_react.useState)(Boolean(seed?.completed));
	const [syncNote, setSyncNote] = (0, import_react.useState)("");
	const hlsRef = (0, import_react.useRef)(null);
	const spans = (0, import_react.useMemo)(() => {
		let cursor = 0;
		return tutorial.lesson.chapters.map((chapter) => {
			const start = cursor;
			const len = chapter.minutes * 60;
			cursor += len;
			return {
				...chapter,
				start,
				len
			};
		});
	}, [tutorial.lesson.chapters]);
	const chapter = [...spans].reverse().find((span) => position >= span.start) ?? spans[0];
	const percent = completed ? 100 : Math.min(100, Math.round(position / total * 100));
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		let dead = false;
		let monitored = false;
		let muxApi = null;
		const meta = {
			env_key: MUX_ENV_KEY,
			player_name: "Desk player",
			video_id: tutorial.id,
			video_title: tutorial.title,
			video_duration: total * 1e3,
			video_stream_type: "on-demand",
			video_content_type: "episode"
		};
		(async () => {
			const mux = (await import("../_libs/mux-embed.mjs").then((n) => n.t)).default;
			if (dead) return;
			muxApi = mux;
			const player_init_time = mux.utils.now();
			const watch = (extra) => {
				if (dead) return;
				mux.monitor(video, {
					...extra,
					data: {
						...meta,
						player_init_time
					}
				});
				monitored = true;
				if (dead) mux.destroyMonitor(video);
			};
			if (!tutorial.muxPlaybackId) {
				video.src = tutorial.reel;
				watch();
				return;
			}
			const src = `https://stream.mux.com/${tutorial.muxPlaybackId}.m3u8`;
			if (video.canPlayType("application/vnd.apple.mpegurl")) {
				video.src = src;
				watch();
				return;
			}
			const { default: Hls } = await import("../_libs/hls.js.mjs").then((n) => n.t);
			if (dead) return;
			if (!Hls.isSupported()) {
				video.src = tutorial.reel;
				watch();
				return;
			}
			const hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
			hls.on(Hls.Events.ERROR, () => {
				video.src = tutorial.reel;
			});
			hlsRef.current = hls;
			watch({
				hlsjs: hls,
				Hls
			});
		})();
		return () => {
			dead = true;
			if (monitored) muxApi?.destroyMonitor(video);
			hlsRef.current?.destroy();
			hlsRef.current = null;
		};
	}, [
		tutorial.id,
		tutorial.muxPlaybackId,
		tutorial.reel,
		tutorial.title,
		total
	]);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		if (playing) video.play().catch(() => void 0);
		else video.pause();
	}, [playing]);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = window.setInterval(() => {
			setPosition((value) => {
				const next = Math.min(total, value + 1);
				if (next >= total) setPlaying(false);
				return next;
			});
		}, 1e3);
		return () => window.clearInterval(id);
	}, [playing, total]);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		const snapshot = {
			tutorialId: tutorial.id,
			progressPercent: percent,
			completed: completed || percent >= 100,
			lastPositionSec: position,
			exercises,
			updatedAt: Date.now()
		};
		writeCache(session.uid, snapshot);
		const handle = window.setTimeout(() => {
			saveProgress({ data: {
				idToken: session.idToken,
				tutorialId: tutorial.id,
				progressPercent: snapshot.progressPercent,
				lastPositionSec: snapshot.lastPositionSec,
				completed: snapshot.completed,
				exercises: snapshot.exercises
			} }).then(() => setSyncNote("")).catch(() => setSyncNote("Saved on this device. It will sync when you’re back."));
		}, 800);
		return () => window.clearTimeout(handle);
	}, [
		completed,
		exercises,
		percent,
		position,
		session,
		tutorial.id
	]);
	function toggleExercise(id) {
		setExercises((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-5xl gap-8 px-5 py-6 md:grid-cols-[minmax(0,1fr)_18rem] md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					tutorial.difficulty,
					" · ",
					tutorial.durationMin,
					" min"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl",
				children: tutorial.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-hidden rounded-3xl bg-raise",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					poster: tutorial.thumbnail,
					muted: true,
					loop: true,
					playsInline: true,
					className: "aspect-video w-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-12 place-items-center rounded-full bg-teal text-ink",
					"aria-label": playing ? "Pause" : "Play",
					onClick: () => setPlaying((value) => !value),
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-1 flex-col gap-1 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Lesson position"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: total,
							value: position,
							onChange: (event) => setPosition(Number(event.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								formatClock(position),
								" / ",
								formatClock(total),
								" · ",
								percent,
								"%"
							]
						})
					]
				})]
			}),
			chapter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: chapter.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-base leading-relaxed text-fg/90",
					children: chapter.body
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: spans.map((span) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPosition(span.start),
					className: span.id === chapter?.id ? "h-10 rounded-full bg-teal px-3 text-sm text-ink" : "h-10 rounded-full bg-surface px-3 text-sm text-muted",
					children: span.title
				}, span.id))
			}),
			syncNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: syncNote
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Drills"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: tutorial.lesson.exercises.map((exercise) => {
							const on = exercises.includes(exercise.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "glass rounded-2xl p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "mt-1 size-5 accent-teal",
										checked: on,
										onChange: () => toggleExercise(exercise.id)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block",
										children: exercise.prompt
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm text-muted",
										children: exercise.hint
									})] })]
								})
							}, exercise.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-4 h-12 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
						disabled: completed,
						onClick: () => {
							setCompleted(true);
							setPosition(total);
							setPlaying(false);
						},
						children: completed ? "Marked complete" : "Mark complete"
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm text-muted",
			children: "Also on the desk"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/learn/$tutorialId",
				params: { tutorialId: item.id },
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.thumbnail,
					alt: "",
					className: "aspect-[3/2] w-full rounded-2xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: item.title
				})]
			}) }, item.id))
		})] })]
	});
}
function readCache(uid, tutorialId) {
	if (!uid || typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(progressCacheKey(uid, tutorialId));
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function writeCache(uid, progress) {
	localStorage.setItem(progressCacheKey(uid, progress.tutorialId), JSON.stringify(progress));
}
function newer(server, local) {
	if (!server) return local;
	if (!local) return server;
	return local.updatedAt > server.updatedAt ? local : server;
}
var Route$1 = createFileRoute("/learn/$tutorialId")({ component: TutorialPage });
function TutorialPage() {
	const { tutorialId } = Route$1.useParams();
	const { ready, session, profile } = useConnect();
	const [tutorial, setTutorial] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [related, setRelated] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!session || profile?.membershipStatus !== "active") return;
		let cancel = false;
		setTutorial(null);
		setError("");
		Promise.all([getTutorial({ data: {
			idToken: session.idToken,
			tutorialId
		} }), getDesk({ data: { idToken: session.idToken } })]).then(([detail, desk]) => {
			if (cancel) return;
			setTutorial(detail.tutorial);
			setProgress(detail.progress);
			setRelated(desk.tutorials.filter((item) => item.id !== tutorialId).slice(0, 3));
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		return () => {
			cancel = true;
		};
	}, [
		profile?.membershipStatus,
		session,
		tutorialId
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/checkout" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 py-16 text-muted",
			children: error
		}) : null,
		!error && !tutorial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 py-16 text-sm text-muted",
			children: "Opening the lesson…"
		}) : null,
		tutorial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {
			tutorial,
			initial: progress,
			related
		}) : null
	] });
}
var Route = createFileRoute("/r/$memberCode/$productCode")({ component: AffiliateLanding });
function AffiliateLanding() {
	const { memberCode, productCode } = Route.useParams();
	const [product, setProduct] = (0, import_react.useState)(null);
	const [memberName, setMemberName] = (0, import_react.useState)("");
	const [disclosure, setDisclosure] = (0, import_react.useState)("");
	const [windowDays, setWindowDays] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	const [recorded, setRecorded] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		loadAffiliateLanding({ data: {
			memberCode,
			productCode
		} }).then((result) => {
			if (cancel) return;
			setProduct(result.product);
			setMemberName(result.memberName);
			setDisclosure(result.disclosure);
			setWindowDays(result.windowDays);
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		recordClick({ data: {
			memberCode,
			productCode
		} }).then((result) => {
			if (!cancel) setRecorded(result.recorded);
		}).catch(() => {
			if (!cancel) setRecorded(false);
		});
		return () => {
			cancel = true;
		};
	}, [memberCode, productCode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorBar, {}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted",
				children: error
			}) : null,
			product ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: "",
						className: "aspect-square w-full rounded-3xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-teal",
						children: ["Shared by ", memberName]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-2xl tabular-nums",
						children: peso(product.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: disclosure
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							recorded ? "This click was recorded." : "Click noted.",
							" A sale counts only after the merchant confirms it, inside ",
							windowDays,
							" days."
						]
					})
				]
			}) : null
		]
	});
}
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
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getRouter };
