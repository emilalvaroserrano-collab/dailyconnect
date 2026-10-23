import { i as __toESM } from "../_runtime.mjs";
import { n as errorText } from "./manila-B3JVSKdi.mjs";
import { C as useNavigate, Q as require_react, T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as signInWithGoogle, i as useConnect, o as readReferral, s as googleError } from "./router-HBf7GLTa.mjs";
import { t as Logo } from "./shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-panel-B6Jirfia.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const referralState = (0, import_react.useState)(null);
	const referral = referralState[0];
	const setReferral = referralState[1];
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setReferral(readReferral());
	}, [setReferral]);
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
		setPending("google");
		try {
			const session = await signInWithGoogle();
			go(await adopt({
				idToken: session.idToken,
				refreshToken: session.refreshToken,
				uid: session.uid,
				email: session.email,
				expiresAt: session.expiresAt
			}, session.name));
		} catch (caught) {
			const code = caught && typeof caught === "object" && "code" in caught;
			setError(code ? googleError(caught) : errorText(caught));
		} finally {
			setPending(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-canvas px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 font-display text-4xl",
					children: mode === "join" ? "Open a desk" : "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: mode === "join" ? "Email or Google. Your mobile number is saved on the membership — it is not a login." : "Use the email or Google account you joined with."
				}),
				mode === "join" && referral ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 rounded-2xl bg-surface px-4 py-3 text-sm",
					children: [
						"Attributed to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-teal",
							children: referral.code
						}),
						" for 30 days. The first link keeps the ₱50."
					]
				}) : null,
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
							children: [
								"Mobile ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "(optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: phone,
									onChange: (event) => setPhone(event.target.value),
									autoComplete: "tel",
									inputMode: "tel",
									className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3 text-fg"
								})
							]
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
//#endregion
export { AuthPanel as t };
