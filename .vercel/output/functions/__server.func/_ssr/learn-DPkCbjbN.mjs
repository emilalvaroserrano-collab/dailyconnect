import { i as __toESM } from "../_runtime.mjs";
import { n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, S as Navigate, T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useConnect, u as getDesk } from "./router-HBf7GLTa.mjs";
import { i as Splash, n as Paywall, r as Shell } from "./shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn-DPkCbjbN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	"All",
	"Start",
	"Intermediate",
	"Advanced"
];
function Learn() {
	const { ready, session, profile } = useConnect();
	const [items, setItems] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [query, setQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!session || profile?.membershipStatus !== "active") return;
		let cancel = false;
		getDesk({ data: { idToken: session.idToken } }).then((desk) => {
			if (!cancel) setItems(desk.tutorials);
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		}).finally(() => {
			if (!cancel) setLoading(false);
		});
		return () => {
			cancel = true;
		};
	}, [profile?.membershipStatus, session]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {}) });
	const shown = items.filter((tutorial) => {
		const matchesFilter = filter === "All" || tutorial.difficulty === filter;
		const hay = `${tutorial.title} ${tutorial.tags.join(" ")} ${tutorial.description}`.toLowerCase();
		return matchesFilter && hay.includes(query.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Learn"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search lessons",
					className: "h-12 flex-1 rounded-xl border border-line bg-raise px-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto",
					children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(item),
						className: filter === item ? "h-10 shrink-0 rounded-full bg-teal px-3 text-sm text-ink" : "h-10 shrink-0 rounded-full bg-surface px-3 text-sm text-muted",
						children: item
					}, item))
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Loading lessons…"
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-teal",
				children: error
			}) : null,
			!loading && shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Nothing matches."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-3",
				children: shown.map((tutorial) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/learn/$tutorialId",
					params: { tutorialId: tutorial.id },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tutorial.thumbnail,
							alt: "",
							className: "aspect-[3/2] w-full rounded-2xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: tutorial.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								tutorial.difficulty,
								" · ",
								tutorial.durationMin,
								" min"
							]
						})
					]
				}, tutorial.id))
			})
		]
	}) });
}
//#endregion
export { Learn as component };
