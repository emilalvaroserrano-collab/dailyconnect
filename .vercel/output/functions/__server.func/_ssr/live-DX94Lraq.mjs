import { i as __toESM } from "../_runtime.mjs";
import { a as peso, n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as startLive, h as saveLive, i as listLive, n as generateStudio } from "./studio.functions-CC0DSwCy.mjs";
import { t as MemberGate } from "./member-gate-DrlSKAHV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-DX94Lraq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var SplitComponent = function LivePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveView, { session }) });
};
//#endregion
export { SplitComponent as component };
