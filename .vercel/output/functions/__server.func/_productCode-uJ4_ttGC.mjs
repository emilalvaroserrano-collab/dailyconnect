import { i as __toESM } from "./_runtime.mjs";
import { a as peso, n as errorText } from "./_ssr/manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-HBf7GLTa.mjs";
import { t as Logo } from "./_ssr/shell-DKI3etak.mjs";
import { o as loadAffiliateLanding, u as recordClick } from "./_ssr/studio.functions-CC0DSwCy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_productCode-uJ4_ttGC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
//#endregion
export { AffiliateLanding as component };
