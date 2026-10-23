import { i as __toESM } from "../_runtime.mjs";
import { a as peso, n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as listProducts, g as speakCaption, n as generateStudio, v as submitPost } from "./studio.functions-CC0DSwCy.mjs";
import { t as MemberGate } from "./member-gate-DrlSKAHV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-DJyucoLq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var SplitComponent = function StudioPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioView, { session }) });
};
//#endregion
export { SplitComponent as component };
