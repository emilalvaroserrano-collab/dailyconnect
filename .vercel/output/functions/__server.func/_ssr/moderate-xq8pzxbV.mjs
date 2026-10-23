import { i as __toESM } from "../_runtime.mjs";
import { n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as loadModeration, d as recordRevenue, l as moderatePost, t as confirmOrder } from "./studio.functions-CC0DSwCy.mjs";
import { t as MemberGate } from "./member-gate-DrlSKAHV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/moderate-xq8pzxbV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var SplitComponent = function ModeratePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModerateView, { session }) });
};
//#endregion
export { SplitComponent as component };
