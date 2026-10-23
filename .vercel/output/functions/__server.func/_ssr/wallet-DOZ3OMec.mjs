import { i as __toESM } from "../_runtime.mjs";
import { a as peso, n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, S as Navigate, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as payout, i as useConnect, m as getWallet } from "./router-HBf7GLTa.mjs";
import { i as Splash, n as Paywall, r as Shell } from "./shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-DOZ3OMec.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Wallet"
			}),
			profile.membershipStatus !== "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {})
			}) : null,
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
//#endregion
export { WalletPage as component };
