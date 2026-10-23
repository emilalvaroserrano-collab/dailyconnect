import { i as __toESM } from "../_runtime.mjs";
import { Q as require_react, T as require_jsx_runtime, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Store, c as Radio, d as Menu, f as House, g as Bell, h as BookOpen, m as ChartLine, n as Wallet, o as Sparkles, p as Clapperboard, r as UserRound, s as Shield, t as X } from "../_libs/lucide-react.mjs";
import { _ as readNotices, f as getNotices, i as useConnect } from "./router-HBf7GLTa.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DKI3etak.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...values) {
	return twMerge(clsx(values));
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
function Paywall() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "Membership"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "The desk is locked."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "₱550 once. After that, a new tool every morning — film, drills, and a referral link of your own."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/checkout",
				className: "mt-8 inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 font-medium text-ink",
				children: "Open membership"
			})
		]
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
		icon: Radio,
		exact: false
	},
	{
		to: "/market",
		label: "Market",
		icon: Store,
		exact: false
	},
	{
		to: "/creator",
		label: "Creator",
		icon: ChartLine,
		exact: false
	},
	{
		to: "/wallet",
		label: "Wallet",
		icon: Wallet,
		exact: false
	},
	{
		to: "/profile",
		label: "Profile",
		icon: UserRound,
		exact: false
	},
	{
		to: "/moderate",
		label: "Moderate",
		icon: Shield,
		exact: false
	}
];
var sideNav = [...primary, ...extra];
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
		className: "app-frame relative text-fg md:pl-60",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-raise px-4 py-6 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-10 flex flex-col gap-1",
					children: sideNav.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: tab.to,
						activeOptions: { exact: tab.exact },
						className: "flex h-11 items-center gap-3 rounded-xl px-3 text-muted",
						activeProps: { className: "flex h-11 items-center gap-3 rounded-xl bg-surface px-3 text-teal" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "size-4" }), tab.label]
					}, tab.to))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-20 flex shrink-0 items-center justify-between border-b border-line bg-canvas/95 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "md:hidden",
						"aria-label": "Home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { compact: true })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden text-sm text-muted md:block",
						children: "Manila desk"
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "app-scroll",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "z-20 grid shrink-0 grid-cols-5 border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] md:hidden",
				children: [primary.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tab.to,
					activeOptions: { exact: tab.exact },
					className: "flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-muted",
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
				className: "absolute inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 rounded-2xl border border-line bg-raise p-2 md:hidden",
				children: extra.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tab.to,
					className: "flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "size-4 text-teal" }), tab.label]
				}, tab.to))
			}) : null
		]
	});
}
//#endregion
export { Splash as i, Paywall as n, Shell as r, Logo as t };
