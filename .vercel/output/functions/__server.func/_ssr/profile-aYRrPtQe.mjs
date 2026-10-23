import { i as __toESM } from "../_runtime.mjs";
import { n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, S as Navigate, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as getNetwork, g as place, i as useConnect } from "./router-HBf7GLTa.mjs";
import { i as Splash, r as Shell } from "./shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-aYRrPtQe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function flatten(node, depth = 0) {
	return [{
		uid: node.uid,
		name: node.name,
		depth
	}, ...node.children.flatMap((child) => flatten(child, depth + 1))];
}
function Branch({ node }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			node.name,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted",
				children: node.level === 0 ? "you" : `level ${node.level}`
			})
		] }), node.children.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "ml-4 border-l border-line pl-4",
			children: node.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Branch, { node: child }, child.uid))
		}) : null]
	});
}
function ProfilePage() {
	const { ready, session, profile, signOut } = useConnect();
	const [network, setNetwork] = (0, import_react.useState)(null);
	const [recruitUid, setRecruitUid] = (0, import_react.useState)("");
	const [parentUid, setParentUid] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [alerts, setAlerts] = (0, import_react.useState)("Alerts off");
	(0, import_react.useEffect)(() => {
		if (typeof Notification !== "undefined") setAlerts(Notification.permission === "granted" ? "Alerts on" : "Alerts off");
	}, []);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		getNetwork({ data: { idToken: session.idToken } }).then((next) => {
			if (cancel) return;
			setNetwork(next);
			setParentUid(next.profile.uid);
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		return () => {
			cancel = true;
		};
	}, [session]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	const link = profile.referralCode ? `${window.location.origin}/join?ref=${profile.referralCode}` : "";
	const unplaced = (network?.recruits ?? []).filter((recruit) => recruit.membershipStatus === "active" && !recruit.placed);
	const parents = network ? flatten(network.tree) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: profile.name || "Member"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: profile.email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm",
				children: [
					"Membership",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-teal",
						children: profile.membershipStatus === "active" ? "active" : "inactive"
					}),
					profile.phone ? ` · ${profile.phone}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Your link"
				}), profile.referralCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 break-all text-sm text-muted",
						children: link
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl tracking-wide text-teal",
						children: profile.referralCode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 h-11 rounded-full bg-teal px-4 font-medium text-ink",
						onClick: () => {
							navigator.clipboard.writeText(link).then(() => toast("Link copied"));
						},
						children: "Copy link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "The first person to open it keeps the ₱50, even if they join later another way. Placement in your line is separate, and you do it by hand."
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Your code is minted when membership is active."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Place a recruit"
				}), unplaced.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "When someone active joins with your link, they show up here until you place them."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 space-y-3",
					onSubmit: (event) => {
						event.preventDefault();
						setPending(true);
						setError("");
						place({ data: {
							idToken: session.idToken,
							recruitUid,
							parentUid
						} }).then((next) => {
							setNetwork(next);
							setRecruitUid("");
							toast("Placed. ₱10 is scheduled up to ten levels.");
						}).catch((caught) => setError(errorText(caught))).finally(() => setPending(false));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Who", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								value: recruitUid,
								onChange: (event) => setRecruitUid(event.target.value),
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select"
								}), unplaced.map((recruit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: recruit.uid,
									children: recruit.name
								}, recruit.uid))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Under", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								required: true,
								value: parentUid,
								onChange: (event) => setParentUid(event.target.value),
								className: "mt-1 h-12 w-full rounded-xl border border-line bg-raise px-3",
								children: parents.map((parent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: parent.uid,
									children: ["· ".repeat(parent.depth), parent.depth === 0 ? "Directly under me" : parent.name]
								}, parent.uid))
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-teal",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending,
							className: "h-12 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
							children: pending ? "Placing…" : "Place"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Your line"
				}), network ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Branch, { node: network.tree })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Loading the line…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full bg-surface px-4",
					onClick: () => {
						if (typeof Notification === "undefined") return;
						Notification.requestPermission().then((permission) => {
							setAlerts(permission === "granted" ? "Alerts on" : "Alerts off");
						});
					},
					children: alerts
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full px-4 text-muted",
					onClick: () => {
						signOut();
					},
					children: "Sign out"
				})]
			})
		]
	}) });
}
//#endregion
export { ProfilePage as component };
