import { i as __toESM } from "../_runtime.mjs";
import { a as peso, n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as listProducts } from "./studio.functions-CC0DSwCy.mjs";
import { t as MemberGate } from "./member-gate-DrlSKAHV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-BQdC8hti.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var SplitComponent = function MarketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketView, { session }) });
};
//#endregion
export { SplitComponent as component };
