import { i as __toESM } from "../_runtime.mjs";
import { n as errorText, o as secondsUntilManilaMidnight, r as formatClock } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useConnect, u as getDesk } from "./router-HBf7GLTa.mjs";
import { n as Paywall, r as Shell, t as Logo } from "./shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Zqv07VT-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Ring({ value }) {
	const radius = 18;
	const circ = 2 * Math.PI * radius;
	const offset = circ - Math.max(0, Math.min(100, value)) / 100 * circ;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 44 44",
		className: "size-12 shrink-0",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "22",
			cy: "22",
			r: radius,
			className: "fill-none stroke-line",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "22",
			cy: "22",
			r: radius,
			className: "fill-none stroke-teal",
			strokeWidth: "3",
			strokeLinecap: "round",
			strokeDasharray: circ,
			strokeDashoffset: offset,
			transform: "rotate(-90 22 22)"
		})]
	});
}
function Countdown() {
	const [left, setLeft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setLeft(secondsUntilManilaMidnight());
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: left === null ? "--:--:--" : formatClock(left)
	});
}
function Dashboard() {
	const { session } = useConnect();
	const [desk, setDesk] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		let cancel = false;
		setLoading(true);
		getDesk({ data: { idToken: session.idToken } }).then((next) => {
			if (!cancel) setDesk(next);
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		}).finally(() => {
			if (!cancel) setLoading(false);
		});
		return () => {
			cancel = true;
		};
	}, [session]);
	(0, import_react.useEffect)(() => {
		if (!desk?.todayId) return;
		const key = "dc.seenPick";
		const prev = localStorage.getItem(key);
		if (prev && prev !== desk.todayId) {
			toast("A new daily pick is up.");
			if (typeof Notification !== "undefined" && Notification.permission === "granted") new Notification("Daily Connect", { body: "Today’s pick is ready." });
		}
		localStorage.setItem(key, desk.todayId);
	}, [desk?.todayId]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-5 py-8 text-sm text-muted",
		children: "Loading the desk…"
	});
	if (error || !desk) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: error || "Could not load the desk."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 text-teal",
			onClick: () => window.location.reload(),
			children: "Try again"
		})]
	});
	const byId = new Map(desk.tutorials.map((tutorial) => [tutorial.id, tutorial]));
	const today = byId.get(desk.todayId) ?? desk.tutorials[0];
	const progressOf = (id) => desk.progress.find((row) => row.tutorialId === id);
	const continueRows = desk.progress.filter((row) => row.progressPercent > 0 && !row.completed).sort((a, b) => b.updatedAt - a.updatedAt).map((row) => ({
		row,
		tutorial: byId.get(row.tutorialId)
	})).filter((item) => Boolean(item.tutorial));
	const archive = desk.tutorials.filter((tutorial) => tutorial.id !== today?.id).slice(0, 4);
	const todayProgress = today ? progressOf(today.id) : void 0;
	if (!today) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-5 py-16 text-muted",
		children: "No lessons yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-5 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Good morning",
					desk.profile.name ? `, ${desk.profile.name.split(" ")[0]}` : "",
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "glass mt-4 overflow-hidden rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/10] sm:aspect-[16/8]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: today.thumbnail,
							alt: "",
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-canvas via-canvas/30 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-4 top-4 rounded-full bg-canvas/80 px-3 py-1 text-xs text-teal",
							children: "Today’s pick"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-4 top-4 rounded-full bg-canvas/80 px-3 py-1 text-xs tabular-nums",
							children: ["Swaps in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-4 left-4 right-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									today.difficulty,
									" · ",
									today.durationMin,
									" min"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl md:text-4xl",
								children: today.title
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 p-4 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, { value: todayProgress?.progressPercent ?? 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-fg",
									children: [todayProgress?.progressPercent ?? 0, "%"]
								}),
								" · ",
								today.description
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn/$tutorialId",
						params: { tutorialId: today.id },
						className: "inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-teal px-5 font-medium text-ink sm:ml-auto",
						children: todayProgress?.progressPercent ? "Resume" : "Start tutorial"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Continue"
				}), continueRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Nothing in progress. Today’s pick is the door."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-3 overflow-x-auto pb-2",
					children: continueRows.map(({ row, tutorial }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn/$tutorialId",
						params: { tutorialId: tutorial.id },
						className: "glass w-64 shrink-0 overflow-hidden rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tutorial.thumbnail,
							alt: "",
							className: "aspect-[3/2] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: tutorial.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs tabular-nums text-muted",
								children: [row.progressPercent, "%"]
							})]
						})]
					}, tutorial.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Archive"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn",
						className: "text-sm text-teal",
						children: "All lessons"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 md:grid-cols-4",
					children: archive.map((tutorial) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn/$tutorialId",
						params: { tutorialId: tutorial.id },
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: tutorial.thumbnail,
								alt: "",
								className: "aspect-[3/2] w-full rounded-2xl object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: tutorial.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									tutorial.difficulty,
									" · ",
									tutorial.durationMin,
									" min"
								]
							})
						]
					}, tutorial.id))
				})]
			})
		]
	});
}
function Clock() {
	const [left, setLeft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setLeft(secondsUntilManilaMidnight());
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: left === null ? "--:--:--" : formatClock(left)
	});
}
var rows = [
	[
		"Once",
		"₱550",
		"The desk stays open."
	],
	[
		"Direct",
		"₱50",
		"To the first link that brought you, for 30 days."
	],
	[
		"Line",
		"₱10",
		"Each of ten levels, posted on the 1st."
	]
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-canvas text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "inline-flex h-11 items-center px-3 text-sm text-muted",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/join",
						className: "inline-flex h-11 items-center rounded-full bg-teal px-4 text-sm font-medium text-ink",
						children: "Join"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-end gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tracking-wide text-teal",
						children: "Manila · one tool a day"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl leading-tight md:text-6xl",
						children: "A new AI tool, taught before lunch."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-lg text-muted",
						children: "Email or Google. ₱550 once. Film, drills, and a line you place by hand."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							className: "inline-flex h-12 items-center rounded-full bg-teal px-6 font-medium text-ink",
							children: "Create your desk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "inline-flex h-12 items-center rounded-full px-4 text-fg",
							children: "I already have one"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass overflow-hidden rounded-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/10]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/covers/projects.jpg",
								alt: "",
								className: "h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute left-4 top-4 rounded-full bg-canvas/80 px-3 py-1 text-xs text-teal",
								children: ["Next door in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-4 left-4 right-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Today’s pick"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl",
									children: "Members only"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 py-4 text-sm text-muted",
						children: "The lesson, the reel, and the drills stay shut until membership is active."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pb-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-4 pr-4 text-sm font-medium text-muted",
								children: row[0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-4 pr-4 font-display text-2xl tabular-nums",
								children: row[1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-4 text-sm text-muted",
								children: row[2]
							})
						]
					}, row[0])) })
				})
			})
		]
	});
}
function Home() {
	const { ready, session, profile } = useConnect();
	if (!ready || !session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: profile.membershipStatus === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {}) });
}
//#endregion
export { Home as component };
