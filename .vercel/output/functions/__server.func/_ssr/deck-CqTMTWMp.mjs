import { i as __toESM } from "../_runtime.mjs";
import { n as errorText } from "./manila-B3JVSKdi.mjs";
import { Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as firebaseConfig } from "./firebase-config-gC_VXmLt.mjs";
import { f as recordView, p as retryPublish, r as listFeed, v as submitPost } from "./studio.functions-CC0DSwCy.mjs";
import { t as MemberGate } from "./member-gate-DrlSKAHV.mjs";
import { n as PRODUCT_CATALOG } from "./catalog-CCc5nSkg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deck-CqTMTWMp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function uploadMemberMedia(idToken, file, objectPath) {
	const bucket = firebaseConfig.storageBucket;
	const res = await fetch(`https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(objectPath)}`, {
		method: "POST",
		headers: {
			Authorization: `Firebase ${idToken}`,
			"Content-Type": file.type || "application/octet-stream"
		},
		body: file
	});
	if (!res.ok) return null;
	const data = await res.json();
	const token = data.downloadTokens?.split(",")[0];
	if (!token) return null;
	return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(data.name || objectPath)}?alt=media&token=${token}`;
}
function readVideoMeta(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const video = document.createElement("video");
		video.preload = "metadata";
		video.muted = true;
		video.playsInline = true;
		let settled = false;
		const finish = () => {
			if (settled) return;
			settled = true;
			window.clearTimeout(timer);
			const width = video.videoWidth || 720;
			const height = video.videoHeight || 1280;
			const durationSec = Number.isFinite(video.duration) ? video.duration : 0;
			const canvas = document.createElement("canvas");
			canvas.width = 360;
			canvas.height = Math.max(1, Math.round(360 * height / Math.max(1, width)));
			const ctx = canvas.getContext("2d");
			if (ctx && video.videoWidth) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			const posterUrl = canvas.toDataURL("image/jpeg", .72);
			URL.revokeObjectURL(url);
			resolve({
				durationSec,
				width,
				height,
				posterUrl
			});
		};
		const timer = window.setTimeout(finish, 2500);
		video.onloadedmetadata = () => {
			try {
				const target = Math.min(.2, Math.max(0, (video.duration || 0) / 2));
				if (target > 0) video.currentTime = target;
				else finish();
			} catch {
				finish();
			}
		};
		video.onseeked = finish;
		video.onerror = () => {
			if (settled) return;
			settled = true;
			window.clearTimeout(timer);
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Could not read that video."));
		};
		video.src = url;
	});
}
var platforms = [
	"tiktok",
	"youtube",
	"facebook"
];
function Destinations({ post, token, onDone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 flex flex-wrap gap-2",
		children: platforms.map((platform) => {
			const dest = post.destinations?.[platform];
			const href = dest?.url || "";
			const label = platform === "tiktok" ? "TikTok" : platform === "youtube" ? "YouTube" : "Facebook";
			if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				className: "h-9 rounded-full bg-surface px-3 text-xs leading-9 text-teal",
				target: "_blank",
				rel: "noreferrer",
				children: label
			}, platform);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "h-9 rounded-full bg-surface px-3 text-xs text-muted",
				onClick: () => {
					if (dest?.status === "pending") {
						onDone(`${label} is waiting on approval.`);
						return;
					}
					retryPublish({ data: {
						idToken: token,
						postId: post.id,
						platform
					} }).then((result) => onDone(result.error)).catch((caught) => onDone(errorText(caught)));
				},
				children: [
					label,
					" · ",
					dest?.status === "needs_connection" ? "not connected" : dest?.status || "pending"
				]
			}, platform);
		})
	});
}
function DeckView({ session, profile }) {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [caption, setCaption] = (0, import_react.useState)("");
	const [productCode, setProductCode] = (0, import_react.useState)("");
	const [rights, setRights] = (0, import_react.useState)(false);
	function reload() {
		return listFeed({ data: { idToken: session.idToken } }).then((result) => setPosts(result.posts));
	}
	(0, import_react.useEffect)(() => {
		let cancel = false;
		reload().catch((caught) => {
			if (!cancel) setError(errorText(caught));
		});
		return () => {
			cancel = true;
		};
	}, [session.idToken]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-5xl gap-8 px-4 py-6 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "View Deck"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "The reel desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Portrait clips under 58 seconds. A person still has to approve anything before it can publish. ",
					profile.name,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					setNote("");
					setBusy(true);
					const file = event.currentTarget.elements.namedItem("clip").files?.[0];
					(async () => {
						if (!file) throw new Error("Choose a portrait video.");
						const meta = await readVideoMeta(file);
						let mediaUrl = await uploadMemberMedia(session.idToken, file, `dailyConnect/${profile.uid}/${Date.now()}.mp4`);
						if (!mediaUrl) {
							if (file.size > 7e5) throw new Error("Storage refused the file. Trim it under about 700KB and try again.");
							mediaUrl = await fileToData(file);
						}
						await submitPost({ data: {
							idToken: session.idToken,
							title,
							caption,
							hashtags: "#DailyConnect",
							kind: "video",
							mediaUrl,
							posterUrl: meta.posterUrl,
							durationSec: meta.durationSec,
							width: meta.width,
							height: meta.height,
							mime: file.type || "video/mp4",
							productCode,
							rightsConfirmed: rights
						} });
						setTitle("");
						setCaption("");
						setRights(false);
						setNote("In the moderation queue. Automated screening is not a copyright clearance.");
						await reload();
					})().catch((caught) => setNote(errorText(caught))).finally(() => setBusy(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (event) => setTitle(event.target.value),
							required: true,
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Caption", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: caption,
							onChange: (event) => setCaption(event.target.value),
							rows: 3,
							className: "mt-1 w-full rounded-xl border border-line bg-raise px-3 py-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Affiliate product, optional", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: productCode,
							onChange: (event) => setProductCode(event.target.value),
							className: "mt-1 h-11 w-full rounded-xl border border-line bg-raise px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "None"
							}), PRODUCT_CATALOG.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: product.code,
								children: product.name
							}, product.code))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Portrait video", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "clip",
							type: "file",
							accept: "video/mp4,video/webm",
							className: "mt-1 block w-full text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: rights,
							onChange: (event) => setRights(event.target.checked),
							className: "mt-1 size-4 accent-teal",
							required: true
						}), "I have the rights to this footage and any music in it."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "h-11 rounded-full bg-teal px-5 font-medium text-ink disabled:opacity-50",
						children: busy ? "Sending…" : "Submit for review"
					}),
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: note
					}) : null
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "md:max-w-sm",
			children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: error
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-dvh space-y-4 overflow-y-auto pr-1",
				children: [posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing approved yet."
				}) : null, posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-3xl bg-raise",
					children: [post.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: post.mediaUrl,
						poster: post.posterUrl,
						controls: true,
						playsInline: true,
						className: "aspect-[9/16] max-h-[70vh] w-full bg-canvas object-cover",
						onPlay: () => {
							recordView({ data: {
								idToken: session.idToken,
								postId: post.id
							} }).catch(() => void 0);
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.mediaUrl,
						alt: "",
						className: "aspect-[9/16] max-h-[70vh] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: post.creatorName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: post.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed",
								children: post.caption
							}),
							post.affiliatePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: post.affiliatePath,
								className: "mt-2 inline-block text-sm text-teal",
								children: "Product link"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Destinations, {
								post,
								token: session.idToken,
								onDone: setNote
							})
						]
					})]
				}, post.id))]
			})]
		})]
	});
}
function fileToData(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read the file."));
		reader.readAsDataURL(file);
	});
}
var SplitComponent = function DeckPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberGate, { children: (session, profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckView, {
		session,
		profile
	}) });
};
//#endregion
export { SplitComponent as component };
