import { i as __toESM } from "../_runtime.mjs";
import { a as peso, n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as revisePost, s as loadCreator } from "./studio.functions-CC0DSwCy.mjs";
import { t as MemberGate } from "./member-gate-DrlSKAHV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/creator-DwYpy2X_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var SplitComponent = function CreatorPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorView, { session }) });
};
//#endregion
export { SplitComponent as component };
