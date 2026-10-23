import { i as __toESM } from "./_runtime.mjs";
import { n as errorText, r as formatClock } from "./_ssr/manila-B3JVSKdi.mjs";
import { Q as require_react, S as Navigate, T as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as Play, u as Pause } from "./_libs/lucide-react.mjs";
import { a as progressCacheKey, i as useConnect, p as getTutorial, r as Route$1, u as getDesk, v as saveProgress } from "./_ssr/router-HBf7GLTa.mjs";
import { i as Splash, n as Paywall, r as Shell } from "./_ssr/shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tutorialId-UMcmIXKy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Public Mux Data environment key. It identifies the environment; it is not an API secret. */
var MUX_ENV_KEY = "hi98e49ahgosgknjladelb6hc";
function Player({ tutorial, initial, related }) {
	const { session } = useConnect();
	const videoRef = (0, import_react.useRef)(null);
	const total = tutorial.durationMin * 60;
	const seed = newer(initial, (0, import_react.useMemo)(() => readCache(session?.uid, tutorial.id), [session?.uid, tutorial.id]));
	const [position, setPosition] = (0, import_react.useState)(seed?.lastPositionSec ?? 0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [exercises, setExercises] = (0, import_react.useState)(seed?.exercises ?? []);
	const [completed, setCompleted] = (0, import_react.useState)(Boolean(seed?.completed));
	const [syncNote, setSyncNote] = (0, import_react.useState)("");
	const hlsRef = (0, import_react.useRef)(null);
	const spans = (0, import_react.useMemo)(() => {
		let cursor = 0;
		return tutorial.lesson.chapters.map((chapter) => {
			const start = cursor;
			const len = chapter.minutes * 60;
			cursor += len;
			return {
				...chapter,
				start,
				len
			};
		});
	}, [tutorial.lesson.chapters]);
	const chapter = [...spans].reverse().find((span) => position >= span.start) ?? spans[0];
	const percent = completed ? 100 : Math.min(100, Math.round(position / total * 100));
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		let dead = false;
		let monitored = false;
		let muxApi = null;
		const meta = {
			env_key: MUX_ENV_KEY,
			player_name: "Desk player",
			video_id: tutorial.id,
			video_title: tutorial.title,
			video_duration: total * 1e3,
			video_stream_type: "on-demand",
			video_content_type: "episode"
		};
		(async () => {
			const mux = (await import("./_libs/mux-embed.mjs").then((n) => n.t)).default;
			if (dead) return;
			muxApi = mux;
			const player_init_time = mux.utils.now();
			const watch = (extra) => {
				if (dead) return;
				mux.monitor(video, {
					...extra,
					data: {
						...meta,
						player_init_time
					}
				});
				monitored = true;
				if (dead) mux.destroyMonitor(video);
			};
			if (!tutorial.muxPlaybackId) {
				video.src = tutorial.reel;
				watch();
				return;
			}
			const src = `https://stream.mux.com/${tutorial.muxPlaybackId}.m3u8`;
			if (video.canPlayType("application/vnd.apple.mpegurl")) {
				video.src = src;
				watch();
				return;
			}
			const { default: Hls } = await import("./_libs/hls.js.mjs").then((n) => n.t);
			if (dead) return;
			if (!Hls.isSupported()) {
				video.src = tutorial.reel;
				watch();
				return;
			}
			const hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
			hls.on(Hls.Events.ERROR, () => {
				video.src = tutorial.reel;
			});
			hlsRef.current = hls;
			watch({
				hlsjs: hls,
				Hls
			});
		})();
		return () => {
			dead = true;
			if (monitored) muxApi?.destroyMonitor(video);
			hlsRef.current?.destroy();
			hlsRef.current = null;
		};
	}, [
		tutorial.id,
		tutorial.muxPlaybackId,
		tutorial.reel,
		tutorial.title,
		total
	]);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		if (playing) video.play().catch(() => void 0);
		else video.pause();
	}, [playing]);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = window.setInterval(() => {
			setPosition((value) => {
				const next = Math.min(total, value + 1);
				if (next >= total) setPlaying(false);
				return next;
			});
		}, 1e3);
		return () => window.clearInterval(id);
	}, [playing, total]);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		const snapshot = {
			tutorialId: tutorial.id,
			progressPercent: percent,
			completed: completed || percent >= 100,
			lastPositionSec: position,
			exercises,
			updatedAt: Date.now()
		};
		writeCache(session.uid, snapshot);
		const handle = window.setTimeout(() => {
			saveProgress({ data: {
				idToken: session.idToken,
				tutorialId: tutorial.id,
				progressPercent: snapshot.progressPercent,
				lastPositionSec: snapshot.lastPositionSec,
				completed: snapshot.completed,
				exercises: snapshot.exercises
			} }).then(() => setSyncNote("")).catch(() => setSyncNote("Saved on this device. It will sync when you’re back."));
		}, 800);
		return () => window.clearTimeout(handle);
	}, [
		completed,
		exercises,
		percent,
		position,
		session,
		tutorial.id
	]);
	function toggleExercise(id) {
		setExercises((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-5xl gap-8 px-5 py-6 md:grid-cols-[minmax(0,1fr)_18rem] md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					tutorial.difficulty,
					" · ",
					tutorial.durationMin,
					" min"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl",
				children: tutorial.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-hidden rounded-3xl bg-raise",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					poster: tutorial.thumbnail,
					muted: true,
					loop: true,
					playsInline: true,
					className: "aspect-video w-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-12 place-items-center rounded-full bg-teal text-ink",
					"aria-label": playing ? "Pause" : "Play",
					onClick: () => setPlaying((value) => !value),
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-1 flex-col gap-1 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Lesson position"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: total,
							value: position,
							onChange: (event) => setPosition(Number(event.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								formatClock(position),
								" / ",
								formatClock(total),
								" · ",
								percent,
								"%"
							]
						})
					]
				})]
			}),
			chapter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: chapter.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-base leading-relaxed text-fg/90",
					children: chapter.body
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: spans.map((span) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPosition(span.start),
					className: span.id === chapter?.id ? "h-10 rounded-full bg-teal px-3 text-sm text-ink" : "h-10 rounded-full bg-surface px-3 text-sm text-muted",
					children: span.title
				}, span.id))
			}),
			syncNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: syncNote
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Drills"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: tutorial.lesson.exercises.map((exercise) => {
							const on = exercises.includes(exercise.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "glass rounded-2xl p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "mt-1 size-5 accent-teal",
										checked: on,
										onChange: () => toggleExercise(exercise.id)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block",
										children: exercise.prompt
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm text-muted",
										children: exercise.hint
									})] })]
								})
							}, exercise.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-4 h-12 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
						disabled: completed,
						onClick: () => {
							setCompleted(true);
							setPosition(total);
							setPlaying(false);
						},
						children: completed ? "Marked complete" : "Mark complete"
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm text-muted",
			children: "Also on the desk"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/learn/$tutorialId",
				params: { tutorialId: item.id },
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.thumbnail,
					alt: "",
					className: "aspect-[3/2] w-full rounded-2xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: item.title
				})]
			}) }, item.id))
		})] })]
	});
}
function readCache(uid, tutorialId) {
	if (!uid || typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(progressCacheKey(uid, tutorialId));
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function writeCache(uid, progress) {
	localStorage.setItem(progressCacheKey(uid, progress.tutorialId), JSON.stringify(progress));
}
function newer(server, local) {
	if (!server) return local;
	if (!local) return server;
	return local.updatedAt > server.updatedAt ? local : server;
}
function TutorialPage() {
	const { tutorialId } = Route$1.useParams();
	const { ready, session, profile } = useConnect();
	const [tutorial, setTutorial] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [related, setRelated] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!session || profile?.membershipStatus !== "active") return;
		let cancel = false;
		setTutorial(null);
		setError("");
		Promise.all([getTutorial({ data: {
			idToken: session.idToken,
			tutorialId
		} }), getDesk({ data: { idToken: session.idToken } })]).then(([detail, desk]) => {
			if (cancel) return;
			setTutorial(detail.tutorial);
			setProgress(detail.progress);
			setRelated(desk.tutorials.filter((item) => item.id !== tutorialId).slice(0, 3));
		}).catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		return () => {
			cancel = true;
		};
	}, [
		profile?.membershipStatus,
		session,
		tutorialId
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (profile.membershipStatus !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 py-16 text-muted",
			children: error
		}) : null,
		!error && !tutorial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 py-16 text-sm text-muted",
			children: "Opening the lesson…"
		}) : null,
		tutorial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {
			tutorial,
			initial: progress,
			related
		}) : null
	] });
}
//#endregion
export { TutorialPage as component };
