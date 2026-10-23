import { i as __toESM } from "../_runtime.mjs";
import { a as peso, n as errorText } from "./manila-B3JVSKdi.mjs";
import { C as useNavigate, Q as require_react, S as Navigate, T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useConnect, l as activate } from "./router-HBf7GLTa.mjs";
import { i as Splash, t as Logo } from "./shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DIs-DRVq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var methods = [
	{
		id: "gcash",
		label: "GCash"
	},
	{
		id: "maya",
		label: "Maya"
	},
	{
		id: "card",
		label: "Card"
	}
];
function Checkout() {
	const navigate = useNavigate();
	const { ready, session, profile, setProfile } = useConnect();
	const [method, setMethod] = (0, import_react.useState)("gcash");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "text-teal",
			children: "Sign in to continue"
		})
	});
	if (profile.membershipStatus === "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 font-display text-4xl",
				children: "Membership"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "One payment. The desk does not expire."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 font-display text-5xl tabular-nums",
				children: peso(550)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "mt-6 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm text-muted",
					children: "Pay with"
				}), methods.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-12 items-center gap-3 rounded-xl border border-line px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						name: "method",
						checked: method === item.id,
						onChange: () => setMethod(item.id)
					}), item.label]
				}, item.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "This records the ₱550 membership in your Firebase project. PayMongo is not connected, so nothing is charged to GCash, Maya, or a card."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-teal",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: pending,
				className: "mt-6 h-12 rounded-full bg-teal font-medium text-ink disabled:opacity-60",
				onClick: () => {
					setPending(true);
					setError("");
					activate({ data: {
						idToken: session.idToken,
						method
					} }).then((next) => {
						setProfile(next);
						navigate({ to: "/" });
					}).catch((caught) => setError(errorText(caught))).finally(() => setPending(false));
				},
				children: pending ? "Opening the desk…" : `Confirm ${peso(550)}`
			})
		]
	});
}
//#endregion
export { Checkout as component };
