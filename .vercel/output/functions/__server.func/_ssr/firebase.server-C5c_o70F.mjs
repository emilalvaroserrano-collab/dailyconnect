import { i as manilaPeriod, t as dayIndex } from "./manila-B3JVSKdi.mjs";
import { t as firebaseConfig } from "./firebase-config-gC_VXmLt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase.server-C5c_o70F.js
var lesson = (chapters, exercises) => ({
	chapters,
	exercises
});
var CATALOG = [
	{
		id: "projects",
		title: "A project that remembers the work",
		description: "Turn a blank chat into a studio: instructions, files, and a voice that stays put.",
		difficulty: "Start",
		durationMin: 22,
		thumbnail: "/covers/projects.jpg",
		reel: "/reels/projects.mp4",
		muxPlaybackId: "",
		tags: ["Writing", "Setup"],
		sortOrder: 0,
		lesson: lesson([
			{
				id: "c1",
				title: "Name the desk",
				minutes: 7,
				body: "Create one project per ongoing job, not per mood. Title it the way a colleague would search for it: client, artifact, and the outcome. Write three lines of custom instructions: who the reader is, what you refuse to invent, and the shape of a finished answer. If you cannot say those three things, you do not have a project yet — you have a chat."
			},
			{
				id: "c2",
				title: "Give it only the files that matter",
				minutes: 8,
				body: "Add the source of truth and nothing decorative. A style guide, a price list, last month's brief. Skip archives you would not hand a new hire on day one. Then ask a question you already know the answer to. If the reply misses the file, the file is too long or too vague — split it, don't add more instructions."
			},
			{
				id: "c3",
				title: "Close the loop",
				minutes: 7,
				body: "End the first session by saving one reusable prompt at the top of the project: the job, the inputs, the output format. Tomorrow you should be able to paste new notes under it and get the same shape back. That repeatability is the whole point of the desk."
			}
		], [
			{
				id: "e1",
				prompt: "Write the three instruction lines for a project you actually have.",
				hint: "Reader, refusal, finished shape."
			},
			{
				id: "e2",
				prompt: "List the two files you would add, and one you would leave out on purpose.",
				hint: "Leave out anything you would not hand a new hire."
			},
			{
				id: "e3",
				prompt: "Draft the reusable prompt in under 80 words.",
				hint: "Job, inputs, output format."
			}
		])
	},
	{
		id: "cursor",
		title: "Editor rules that survive Monday",
		description: "Stop repeating yourself. Write rules the editor follows when you are tired.",
		difficulty: "Intermediate",
		durationMin: 26,
		thumbnail: "/covers/cursor.jpg",
		reel: "/reels/cursor.mp4",
		muxPlaybackId: "",
		tags: ["Coding"],
		sortOrder: 1,
		lesson: lesson([
			{
				id: "c1",
				title: "One rule, one mistake",
				minutes: 8,
				body: "Open the last review comment that wasted time. Turn that single mistake into a rule: the bad pattern, the good pattern, and where it applies. A rule that tries to describe your whole taste will be ignored. A rule that forbids one concrete thing will be followed."
			},
			{
				id: "c2",
				title: "Scope it",
				minutes: 9,
				body: "Put global rules in the project root and narrow ones next to the code they govern. Tests do not need the same voice as a migration. Name the file so future-you knows why it exists. If two rules contradict, delete one today."
			},
			{
				id: "c3",
				title: "Prove it",
				minutes: 9,
				body: "Ask the editor to do the task that used to go wrong. If it still misses, the example in the rule is too abstract. Paste a tiny before-and-after from your own code. Rules without an example are wishes."
			}
		], [
			{
				id: "e1",
				prompt: "Convert one recent review comment into a three-line rule.",
				hint: "Bad pattern, good pattern, where it applies."
			},
			{
				id: "e2",
				prompt: "Decide whether that rule is global or folder-scoped, and say why.",
				hint: "If only one area cares, it is not global."
			},
			{
				id: "e3",
				prompt: "Add a six-line before-and-after example.",
				hint: "Use your code, not a toy."
			}
		])
	},
	{
		id: "n8n",
		title: "A reply desk that waits for you",
		description: "A webhook, a model, and a human approve step. No science project.",
		difficulty: "Intermediate",
		durationMin: 30,
		thumbnail: "/covers/n8n.jpg",
		reel: "/reels/n8n.mp4",
		muxPlaybackId: "",
		tags: ["Automation"],
		sortOrder: 2,
		lesson: lesson([
			{
				id: "c1",
				title: "Start from the message",
				minutes: 10,
				body: "Pick one inbox you actually answer. Sketch the path on paper: trigger, classify, draft, stop. The stop is the product. A draft that sends itself will embarrass you once and then you will unplug the whole thing. The approve button is not optional."
			},
			{
				id: "c2",
				title: "Classify before you write",
				minutes: 10,
				body: "Ask the model for a label first: billing, scheduling, noise, or needs-a-human. Only billing and scheduling get a draft. Noise is archived. Needs-a-human is left untouched. Constraining the labels is what keeps the desk small enough to trust."
			},
			{
				id: "c3",
				title: "Log the miss",
				minutes: 10,
				body: "Every time you rewrite a draft, paste the original and your edit into a note. After ten, promote the repeated fix into the system prompt. Automation that never eats its corrections just gets louder."
			}
		], [
			{
				id: "e1",
				prompt: "Name the one inbox and the two labels allowed to draft.",
				hint: "Everything else waits for you."
			},
			{
				id: "e2",
				prompt: "Write the approve step in one sentence: who taps it, and where.",
				hint: "If nobody is named, it will auto-send."
			},
			{
				id: "e3",
				prompt: "Write the system line that forbids inventing prices or dates.",
				hint: "Say what to do instead: ask, or leave blank."
			}
		])
	},
	{
		id: "ollama",
		title: "A local model you can call",
		description: "Install it, pin a model, and hit it from a script you understand.",
		difficulty: "Start",
		durationMin: 24,
		thumbnail: "/covers/ollama.jpg",
		reel: "/reels/ollama.mp4",
		muxPlaybackId: "",
		tags: ["Local"],
		sortOrder: 3,
		lesson: lesson([
			{
				id: "c1",
				title: "Pick a small model on purpose",
				minutes: 8,
				body: "Start with a model that answers on your machine in a few seconds, not the largest file you can download. You are learning the loop: prompt in, text out, no account. Write down the exact model name. 'The local one' is how you lose a week."
			},
			{
				id: "c2",
				title: "Call it like any other API",
				minutes: 8,
				body: "Send one request from the terminal, then the same request from a ten-line script. Print the status and the text. If you wrap it in a framework today, you will not know which layer failed tomorrow. Keep the script boring."
			},
			{
				id: "c3",
				title: "Know when to leave the machine",
				minutes: 8,
				body: "Local is for drafts, classification, and anything you cannot send out. It is the wrong tool when you need today's knowledge or a long, careful document. Write that boundary at the top of the script as a comment. Future-you will try to stretch it."
			}
		], [
			{
				id: "e1",
				prompt: "Write the exact model name you would install, and why it is small enough.",
				hint: "Seconds, not a slideshow."
			},
			{
				id: "e2",
				prompt: "Sketch the ten-line script: input, request, print.",
				hint: "No framework."
			},
			{
				id: "e3",
				prompt: "Write the one-line comment that says what this model must not do.",
				hint: "Fresh facts, or a finished long document."
			}
		])
	},
	{
		id: "evals",
		title: "Score your prompts like a craft",
		description: "Twenty examples, a rubric, and a number you can compare next week.",
		difficulty: "Advanced",
		durationMin: 28,
		thumbnail: "/covers/evals.jpg",
		reel: "/reels/evals.mp4",
		muxPlaybackId: "",
		tags: ["Quality"],
		sortOrder: 4,
		lesson: lesson([
			{
				id: "c1",
				title: "Steal from your own misses",
				minutes: 9,
				body: "Collect twenty real inputs: ten that went well, ten that cost you time. Do not invent clever cases. The set should look like Tuesday. Store the input beside the answer you wish you had received. That pair is a row. Twenty rows is a set. Five rows is a vibe."
			},
			{
				id: "c2",
				title: "A rubric with three checks",
				minutes: 10,
				body: "Score each reply 0 or 1 on three questions: did it use only the given facts, did it follow the format, did a colleague accept it without a rewrite. Average them. A ten-point scale feels precise and is not. Binary checks you can explain to someone else."
			},
			{
				id: "c3",
				title: "Change one thing",
				minutes: 9,
				body: "Edit the prompt once. Rerun the same twenty. If the average does not move, the edit was taste, not craft. Keep the winner, date it, and throw the loser away. An eval you do not compare is a diary."
			}
		], [
			{
				id: "e1",
				prompt: "Write five real rows: input, and the answer you wanted.",
				hint: "Use misses from this month."
			},
			{
				id: "e2",
				prompt: "Write your three yes/no checks.",
				hint: "Facts, format, no rewrite."
			},
			{
				id: "e3",
				prompt: "Name the single prompt line you would change first.",
				hint: "One line, then rerun."
			}
		])
	},
	{
		id: "rag",
		title: "Retrieval that cites or stays quiet",
		description: "Chunk, retrieve, and refuse when the file does not say.",
		difficulty: "Intermediate",
		durationMin: 32,
		thumbnail: "/covers/rag.jpg",
		reel: "/reels/rag.mp4",
		muxPlaybackId: "",
		tags: ["Search"],
		sortOrder: 5,
		lesson: lesson([
			{
				id: "c1",
				title: "Chunk on meaning, not on vibes",
				minutes: 10,
				body: "Split documents where a human would pause: headings, clauses, list items. A chunk should answer one kind of question. If a chunk contains two topics, you will retrieve half of what you needed and the model will improvise the rest. Write the chunk size as a consequence of the document, not a default you found online."
			},
			{
				id: "c2",
				title: "Retrieve, then show the sentence",
				minutes: 12,
				body: "The reply must quote or point at the chunk it used. If you cannot highlight the sentence, you do not have retrieval — you have a confident guess with extra steps. Put the passage above the answer so a reviewer can check in five seconds."
			},
			{
				id: "c3",
				title: "The quiet path",
				minutes: 10,
				body: "When the top passages do not contain the fact, the correct answer is 'not in the files.' Add that instruction and test it with a question you know is absent. A system that cannot say nothing will eventually invent a price, a date, or a policy."
			}
		], [
			{
				id: "e1",
				prompt: "Take one document you have and mark three chunk boundaries.",
				hint: "Headings and clauses, not a round number."
			},
			{
				id: "e2",
				prompt: "Write the reply format: passage first, answer second.",
				hint: "A reviewer should check it in five seconds."
			},
			{
				id: "e3",
				prompt: "Write a question that should return 'not in the files.'",
				hint: "Pick a fact you know is absent."
			}
		])
	},
	{
		id: "product",
		title: "Product stills without a studio",
		description: "One object, one light logic, ten frames that belong to the same brand.",
		difficulty: "Start",
		durationMin: 20,
		thumbnail: "/covers/product.jpg",
		reel: "/reels/product.mp4",
		muxPlaybackId: "",
		tags: ["Images"],
		sortOrder: 6,
		lesson: lesson([
			{
				id: "c1",
				title: "Lock the object",
				minutes: 6,
				body: "Describe the object as if you were insuring it: material, color, proportion, what it is not. 'A cup' will wander. 'A matte stoneware cup, low and wide, no logo, no text' will stay. Generate one frame. If the object changes shape, tighten the description before you chase lighting."
			},
			{
				id: "c2",
				title: "One light, ten angles",
				minutes: 7,
				body: "Pick a single light story — hard rim from the left, or soft window from the right — and repeat it. Change only the angle and the crop. Ten frames with ten moods look like a stock site. Ten frames with one light look like a brand."
			},
			{
				id: "c3",
				title: "Reject fast",
				minutes: 7,
				body: "Throw out anything with extra objects, warped edges, or text you did not ask for. Do not 'fix it in the caption.' The set is the frames you would print. Three clean frames beat twelve almosts."
			}
		], [
			{
				id: "e1",
				prompt: "Write the insurance description of an object you sell or use.",
				hint: "Material, color, proportion, exclusions."
			},
			{
				id: "e2",
				prompt: "Name the one light story in a sentence.",
				hint: "Direction and hardness."
			},
			{
				id: "e3",
				prompt: "List the three reject rules you will actually enforce.",
				hint: "Extra objects, warped edges, stray text."
			}
		])
	},
	{
		id: "voice",
		title: "A voice agent that knows when to stop",
		description: "A script, a turn-taking rule, and the cases where a button is kinder.",
		difficulty: "Intermediate",
		durationMin: 27,
		thumbnail: "/covers/voice.jpg",
		reel: "/reels/voice.mp4",
		muxPlaybackId: "",
		tags: ["Voice"],
		sortOrder: 7,
		lesson: lesson([
			{
				id: "c1",
				title: "Write the call, not the persona",
				minutes: 9,
				body: "Script the first twenty seconds as lines, not as a personality essay. Who you are, why you called or answered, and the one question that moves the task forward. A voice with a backstory and no job will chatter. Read it out loud. If you run out of breath, the caller will hang up."
			},
			{
				id: "c2",
				title: "One question at a time",
				minutes: 9,
				body: "The agent asks, then waits. No stacked questions. No filling silence with a second offer. Silence is the caller thinking. Set a patient pause, then a single repeat, then a path to a person. Turn-taking is the feature. Wit is not."
			},
			{
				id: "c3",
				title: "Where voice is the wrong door",
				minutes: 9,
				body: "Payments, medical detail, and anything the caller must compare should not be spoken at them. Offer a link or a person. Write those exits into the script before you pick a voice model. A pleasant voice on the wrong task is still the wrong task."
			}
		], [
			{
				id: "e1",
				prompt: "Write the first twenty seconds as lines you can read aloud.",
				hint: "Who, why, one question."
			},
			{
				id: "e2",
				prompt: "Define the pause: how long, then what single line repeats.",
				hint: "No second offer."
			},
			{
				id: "e3",
				prompt: "Name two topics this agent must hand off.",
				hint: "If they must compare it, don't speak it."
			}
		])
	}
];
var BASE = `${firebaseConfig.databaseURL}/dailyConnect`;
async function rget(path) {
	const res = await fetch(`${BASE}${path}.json`);
	if (!res.ok) throw new Error("Could not reach the membership database.");
	return await res.json();
}
async function rput(path, value) {
	if (!(await fetch(`${BASE}${path}.json`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(value)
	})).ok) throw new Error("Could not save.");
}
async function rpatch(path, value) {
	if (!(await fetch(`${BASE}${path}.json`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(value)
	})).ok) throw new Error("Could not save.");
}
function authMessage(raw) {
	const code = raw.split(":")[0]?.trim() ?? raw;
	if (code === "EMAIL_EXISTS") return "An account already uses that email. Sign in instead.";
	if (code === "EMAIL_NOT_FOUND" || code === "INVALID_PASSWORD" || code === "INVALID_LOGIN_CREDENTIALS") return "Email or password doesn’t match.";
	if (code === "WEAK_PASSWORD") return "Use at least 8 characters.";
	if (code === "INVALID_EMAIL") return "That email doesn’t look right.";
	if (code === "TOO_MANY_ATTEMPTS_TRY_LATER") return "Too many attempts. Wait a minute and try again.";
	return "Could not sign in. Try again.";
}
async function identity(path, body) {
	const res = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${firebaseConfig.apiKey}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	const data = await res.json();
	if (!res.ok) throw new Error(authMessage(data.error?.message ?? "AUTH"));
	return data;
}
function asRecord(value) {
	if (value && typeof value === "object" && !Array.isArray(value)) return value;
	return {};
}
function asStringList(value) {
	if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
	return Object.keys(asRecord(value)).sort((a, b) => Number(a) - Number(b)).map((key) => asRecord(value)[key]).filter((item) => typeof item === "string");
}
function uidOk(uid) {
	return /^[A-Za-z0-9]{8,128}$/.test(uid);
}
function cleanCode(code) {
	const next = (code ?? "").trim().toUpperCase();
	if (!next) return "";
	if (!/^[A-Z0-9]{4,12}$/.test(next)) return "";
	return next;
}
function digits(phone) {
	return phone.replace(/\D/g, "");
}
async function verify(idToken) {
	const user = (await identity("accounts:lookup", { idToken })).users?.[0];
	if (!user?.localId) throw new Error("Sign in again.");
	return {
		uid: user.localId,
		email: user.email ?? "",
		name: user.displayName ?? ""
	};
}
function toSession(input) {
	return {
		idToken: input.idToken,
		refreshToken: input.refreshToken,
		uid: input.localId,
		email: input.email,
		expiresAt: Date.now() + Number(input.expiresIn || 3600) * 1e3
	};
}
async function updateUser(uid, mutate) {
	const url = `${BASE}/users/${uid}.json`;
	for (let attempt = 0; attempt < 4; attempt += 1) {
		const res = await fetch(url, { headers: { "X-Firebase-ETag": "true" } });
		if (!res.ok) throw new Error("Could not read membership.");
		const etag = res.headers.get("etag");
		const current = await res.json();
		if (!current) throw new Error("Member not found.");
		const next = mutate(current);
		const putRes = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				...etag ? { "if-match": etag } : {}
			},
			body: JSON.stringify(next)
		});
		if (putRes.status === 412) continue;
		if (!putRes.ok) throw new Error("Could not save membership.");
		return next;
	}
	throw new Error("Could not save membership. Try again.");
}
async function resolveSponsor(uid, code) {
	if (!code) return null;
	const sponsorId = await rget(`/referralCodes/${code}`);
	if (!sponsorId || sponsorId === uid || !uidOk(sponsorId)) return null;
	const sponsor = await rget(`/users/${sponsorId}`);
	if (!sponsor || sponsor.membershipStatus !== "active") return null;
	return sponsorId;
}
async function createProfile(input) {
	const existing = await rget(`/users/${input.uid}`);
	if (existing) {
		if (!existing.name && input.name || !existing.phone && input.phone) return updateUser(input.uid, (user) => ({
			...user,
			name: user.name || input.name,
			phone: user.phone || input.phone,
			email: user.email || input.email
		}));
		return existing;
	}
	const phone = digits(input.phone);
	if (phone && phone.length < 10) throw new Error("Enter a mobile number with at least 10 digits, or leave it blank.");
	const sponsorId = await resolveSponsor(input.uid, cleanCode(input.referralCode));
	const profile = {
		uid: input.uid,
		name: input.name.trim() || input.email.split("@")[0] || "Member",
		email: input.email,
		phone,
		membershipStatus: "inactive",
		referralCode: null,
		sponsorId,
		placementParentId: null,
		walletBalance: 0,
		joinDate: null,
		createdAt: Date.now()
	};
	await rput(`/users/${input.uid}`, profile);
	if (sponsorId) {
		await rput(`/bySponsor/${sponsorId}/${input.uid}`, {
			name: profile.name,
			membershipStatus: "inactive",
			placed: false
		});
		if (input.cookieTimestamp) await rpatch(`/users/${input.uid}`, { sponsorCookieAt: input.cookieTimestamp });
	}
	return profile;
}
async function signUpWithEmail(input) {
	const created = await identity("accounts:signUp", {
		email: input.email.trim(),
		password: input.password,
		returnSecureToken: true
	});
	await identity("accounts:update", {
		idToken: created.idToken,
		displayName: input.name.trim(),
		returnSecureToken: false
	}).catch(() => void 0);
	return {
		session: toSession(created),
		profile: await createProfile({
			uid: created.localId,
			email: created.email,
			name: input.name,
			phone: input.phone ?? "",
			referralCode: input.referralCode ?? "",
			cookieTimestamp: input.cookieTimestamp
		})
	};
}
async function signInWithEmail(input) {
	const signed = await identity("accounts:signInWithPassword", {
		email: input.email.trim(),
		password: input.password,
		returnSecureToken: true
	});
	return {
		session: toSession(signed),
		profile: await createProfile({
			uid: signed.localId,
			email: signed.email,
			name: signed.displayName ?? "",
			phone: "",
			referralCode: ""
		})
	};
}
async function refresh(refreshToken) {
	const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken
		})
	});
	const data = await res.json();
	if (!res.ok || !data.id_token || !data.user_id) throw new Error("Sign in again.");
	return {
		idToken: data.id_token,
		refreshToken: data.refresh_token ?? refreshToken,
		uid: data.user_id,
		email: "",
		expiresAt: Date.now() + Number(data.expires_in ?? 3600) * 1e3
	};
}
async function ensureProfile(input) {
	const who = await verify(input.idToken);
	return createProfile({
		uid: who.uid,
		email: who.email,
		name: input.name || who.name,
		phone: input.phone ?? "",
		referralCode: input.referralCode ?? "",
		cookieTimestamp: input.cookieTimestamp
	});
}
async function loadProfile(idToken) {
	const profile = await rget(`/users/${(await verify(idToken)).uid}`);
	if (!profile) throw new Error("Sign in again.");
	return profile;
}
async function requireUser(idToken) {
	const profile = await rget(`/users/${(await verify(idToken)).uid}`);
	if (!profile) throw new Error("Sign in again.");
	return profile;
}
async function requireMember(idToken) {
	const profile = await requireUser(idToken);
	if (profile.membershipStatus !== "active") throw new Error("Membership required.");
	return profile;
}
async function requireActiveMember(idToken) {
	return requireMember(idToken);
}
async function postLedger(input) {
	if (!/^[A-Za-z0-9_-]{4,64}$/.test(input.txId)) throw new Error("Invalid ledger id.");
	if (!Number.isFinite(input.amount) || input.amount === 0) throw new Error("Invalid amount.");
	const path = `/walletTransactions/${input.uid}/${input.txId}`;
	const prior = await rget(path);
	if (prior) {
		const user = await rget(`/users/${input.uid}`);
		return {
			applied: false,
			balance: Number(user?.walletBalance ?? 0)
		};
	}
	const claim = await fetch(`${BASE}${path}.json?print=silent`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"if-none-match": "*"
		},
		body: JSON.stringify({
			userId: input.uid,
			type: input.type,
			amount: input.amount,
			status: input.status ?? "posted",
			period: manilaPeriod(),
			note: input.note.slice(0, 180),
			sourceUserId: input.sourceUserId ?? null,
			createdAt: Date.now()
		})
	});
	if (claim.status === 412 || claim.status === 409) {
		const user = await rget(`/users/${input.uid}`);
		return {
			applied: false,
			balance: Number(user?.walletBalance ?? 0)
		};
	}
	if (!claim.ok) throw new Error("Could not write the ledger.");
	const again = await rget(path);
	if (again && again.createdAt !== void 0 && prior) {
		const user = await rget(`/users/${input.uid}`);
		return {
			applied: false,
			balance: Number(user?.walletBalance ?? 0)
		};
	}
	return {
		applied: true,
		balance: (await updateUser(input.uid, (user) => ({
			...user,
			walletBalance: user.walletBalance + input.amount
		}))).walletBalance
	};
}
async function seedTutorials() {
	const existing = await rget("/tutorials");
	if (existing && Object.keys(existing).length >= CATALOG.length) return;
	await Promise.all(CATALOG.map((tutorial) => rput(`/tutorials/${tutorial.id}`, tutorial)));
}
function orderedTutorials(raw) {
	return Object.values(raw ?? {}).sort((a, b) => a.sortOrder - b.sortOrder);
}
function toCard(tutorial) {
	return {
		id: tutorial.id,
		title: tutorial.title,
		description: tutorial.description,
		difficulty: tutorial.difficulty,
		durationMin: tutorial.durationMin,
		thumbnail: tutorial.thumbnail,
		reel: tutorial.reel,
		muxPlaybackId: tutorial.muxPlaybackId ?? "",
		tags: Array.isArray(tutorial.tags) ? tutorial.tags : asStringList(tutorial.tags),
		sortOrder: tutorial.sortOrder
	};
}
function readProgress(tutorialId, raw) {
	const row = asRecord(raw);
	if (!row.tutorialId && !row.progressPercent && row.progressPercent !== 0) return null;
	return {
		tutorialId: typeof row.tutorialId === "string" ? row.tutorialId : tutorialId,
		progressPercent: Number(row.progressPercent ?? 0),
		completed: Boolean(row.completed),
		lastPositionSec: Number(row.lastPositionSec ?? 0),
		exercises: asStringList(row.exercises),
		updatedAt: Number(row.updatedAt ?? 0)
	};
}
async function noticesFor(uid) {
	const raw = await rget(`/notifications/${uid}`);
	return Object.entries(raw ?? {}).map(([id, notice]) => ({
		...notice,
		id
	})).sort((a, b) => b.createdAt - a.createdAt).slice(0, 20);
}
async function loadDesk(idToken) {
	const profile = await requireUser(idToken);
	await seedTutorials();
	const tutorials = orderedTutorials(await rget("/tutorials"));
	const today = tutorials[dayIndex(tutorials.length)];
	const progressRaw = await rget(`/userProgress/${profile.uid}`);
	const progress = Object.entries(progressRaw ?? {}).map(([id, row]) => readProgress(id, row)).filter((row) => row !== null);
	const notifications = await noticesFor(profile.uid);
	return {
		profile,
		todayId: today?.id ?? "",
		tutorials: tutorials.map(toCard),
		progress,
		notifications,
		unread: notifications.filter((notice) => !notice.read).length
	};
}
async function loadTutorial(idToken, tutorialId) {
	const profile = await requireMember(idToken);
	const tutorial = await rget(`/tutorials/${tutorialId}`);
	if (!tutorial) throw new Error("That tutorial is gone.");
	return {
		tutorial,
		progress: readProgress(tutorialId, await rget(`/userProgress/${profile.uid}/${tutorialId}`))
	};
}
async function saveProgress(input) {
	const profile = await requireMember(input.idToken);
	const progress = {
		tutorialId: input.tutorialId,
		progressPercent: Math.round(input.progressPercent),
		completed: input.completed || input.progressPercent >= 100,
		lastPositionSec: Math.round(input.lastPositionSec),
		exercises: input.exercises,
		updatedAt: Date.now()
	};
	await rput(`/userProgress/${profile.uid}/${input.tutorialId}`, progress);
	return progress;
}
async function mintCode(uid, name) {
	const stem = name.normalize("NFD").replace(/[^a-zA-Z]/g, "").slice(0, 4).toUpperCase() || "DC";
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	for (let attempt = 0; attempt < 6; attempt += 1) {
		const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4));
		let rand = "";
		for (const byte of bytes) rand += alphabet[byte % 32];
		const code = (stem + rand).slice(0, 8);
		if (!await rget(`/referralCodes/${code}`)) {
			await rput(`/referralCodes/${code}`, uid);
			return code;
		}
	}
	throw new Error("Could not mint a referral code. Try again.");
}
async function activateMembership(input) {
	const profile = await requireUser(input.idToken);
	if (profile.membershipStatus === "active") return profile;
	const code = profile.referralCode ?? await mintCode(profile.uid, profile.name);
	const now = Date.now();
	if (profile.sponsorId && profile.sponsorId !== profile.uid) {
		if (!await rget(`/referrals/${profile.uid}`)) {
			await updateUser(profile.sponsorId, (sponsor) => ({
				...sponsor,
				walletBalance: sponsor.walletBalance + 50
			}));
			await rput(`/referrals/${profile.uid}`, {
				referrerId: profile.sponsorId,
				referredId: profile.uid,
				cookieTimestamp: now,
				bonusPaid: true,
				createdAt: now
			});
			await rput(`/walletTransactions/${profile.sponsorId}/ref_${profile.uid}`, {
				userId: profile.sponsorId,
				type: "referral_bonus",
				amount: 50,
				status: "posted",
				period: manilaPeriod(),
				note: `${profile.name} joined`,
				sourceUserId: profile.uid,
				createdAt: now
			});
			await rput(`/notifications/${profile.sponsorId}/ref_${profile.uid}`, {
				kind: "referral",
				title: "₱50 referral",
				body: `${profile.name} joined with your link.`,
				read: false,
				createdAt: now
			});
		}
	}
	const next = await updateUser(profile.uid, (user) => ({
		...user,
		membershipStatus: "active",
		referralCode: code,
		joinDate: user.joinDate ?? now
	}));
	if (!await rget(`/unilevelTree/${profile.uid}`)) await rput(`/unilevelTree/${profile.uid}`, {
		userId: profile.uid,
		parentId: null,
		level: 0,
		children: {},
		ancestorIds: ""
	});
	await rput(`/payments/${profile.uid}/${now}`, {
		userId: profile.uid,
		amount: 550,
		status: "recorded",
		gateway: "paymongo",
		gatewayRef: `pm_preview_${now.toString(36)}`,
		method: input.method,
		timestamp: now
	});
	if (profile.sponsorId) await rpatch(`/bySponsor/${profile.sponsorId}/${profile.uid}`, {
		name: profile.name,
		membershipStatus: "active",
		placed: false
	});
	await rput(`/notifications/${profile.uid}/welcome`, {
		kind: "welcome",
		title: "Desk is open",
		body: "Membership is active. Today’s pick is waiting.",
		read: false,
		createdAt: now
	});
	await seedTutorials();
	return next;
}
async function settle(uid) {
	const period = manilaPeriod();
	const raw = await rget(`/walletTransactions/${uid}`);
	let add = 0;
	await Promise.all(Object.entries(raw ?? {}).map(async ([id, tx]) => {
		if (tx.type === "unilevel" && tx.status === "scheduled" && tx.period < period) {
			await rpatch(`/walletTransactions/${uid}/${id}`, { status: "posted" });
			add += Number(tx.amount);
		}
	}));
	if (add > 0) await updateUser(uid, (user) => ({
		...user,
		walletBalance: user.walletBalance + add
	}));
}
async function loadWallet(idToken) {
	const profile = await requireUser(idToken);
	await settle(profile.uid);
	const fresh = await rget(`/users/${profile.uid}`) ?? profile;
	const txRaw = await rget(`/walletTransactions/${profile.uid}`);
	const transactions = Object.entries(txRaw ?? {}).map(([id, tx]) => ({
		...tx,
		id,
		amount: Number(tx.amount)
	})).sort((a, b) => b.createdAt - a.createdAt);
	const recruits = await rget(`/bySponsor/${profile.uid}`);
	const list = Object.values(recruits ?? {});
	const accruing = transactions.filter((tx) => tx.type === "unilevel" && tx.status === "scheduled").reduce((sum, tx) => sum + tx.amount, 0);
	return {
		profile: fresh,
		transactions,
		directPaid: list.filter((recruit) => recruit.membershipStatus === "active").length,
		directPending: list.filter((recruit) => recruit.membershipStatus !== "active").length,
		directBonus: transactions.filter((tx) => tx.type === "referral_bonus").reduce((sum, tx) => sum + tx.amount, 0),
		accruing,
		teamSize: await teamSize(profile.uid)
	};
}
async function teamSize(uid) {
	const seen = /* @__PURE__ */ new Set();
	const queue = [uid];
	while (queue.length) {
		const current = queue.shift();
		if (!current || seen.has(current)) continue;
		seen.add(current);
		const node = await rget(`/unilevelTree/${current}`);
		for (const child of Object.keys(node?.children ?? {})) queue.push(child);
	}
	return Math.max(0, seen.size - 1);
}
async function requestPayout(idToken, amount) {
	const profile = await requireUser(idToken);
	if (profile.membershipStatus !== "active") throw new Error("Activate membership before requesting a payout.");
	if (amount < 100) throw new Error(`Minimum payout is ₱100.`);
	const next = await updateUser(profile.uid, (user) => {
		if (user.walletBalance < amount) throw new Error("That is more than your available balance.");
		return {
			...user,
			walletBalance: user.walletBalance - amount
		};
	});
	const now = Date.now();
	await rput(`/walletTransactions/${profile.uid}/payout_${now}`, {
		userId: profile.uid,
		type: "payout",
		amount,
		status: "requested",
		period: manilaPeriod(),
		note: "Payout requested",
		sourceUserId: null,
		createdAt: now
	});
	await rput(`/notifications/${profile.uid}/payout_${now}`, {
		kind: "payout",
		title: "Payout requested",
		body: `₱${amount} is marked for the monthly payout.`,
		read: false,
		createdAt: now
	});
	return next;
}
async function buildTree(uid, depth) {
	const user = await rget(`/users/${uid}`);
	const node = await rget(`/unilevelTree/${uid}`);
	const childIds = Object.keys(node?.children ?? {});
	const children = depth >= 10 ? [] : await Promise.all(childIds.map((child) => buildTree(child, depth + 1)));
	return {
		uid,
		name: user?.name || "Member",
		level: node?.level ?? depth,
		children
	};
}
async function downline(uid) {
	const ids = /* @__PURE__ */ new Set();
	const queue = [uid];
	while (queue.length) {
		const current = queue.shift();
		if (!current || ids.has(current)) continue;
		ids.add(current);
		const node = await rget(`/unilevelTree/${current}`);
		for (const child of Object.keys(node?.children ?? {})) queue.push(child);
	}
	return ids;
}
async function loadNetwork(idToken) {
	const profile = await requireUser(idToken);
	const recruitRaw = await rget(`/bySponsor/${profile.uid}`);
	return {
		profile,
		recruits: Object.entries(recruitRaw ?? {}).map(([uid, recruit]) => ({
			...recruit,
			uid
		})),
		tree: await buildTree(profile.uid, 0)
	};
}
async function placeMember(input) {
	const sponsor = await requireMember(input.idToken);
	if (!uidOk(input.recruitUid) || !uidOk(input.parentUid)) throw new Error("That placement is not valid.");
	if (input.recruitUid === input.parentUid) throw new Error("A member cannot sit under themselves.");
	const recruit = await rget(`/users/${input.recruitUid}`);
	if (!recruit || recruit.sponsorId !== sponsor.uid) throw new Error("You can only place people who joined with your link.");
	if (recruit.membershipStatus !== "active") throw new Error("They need an active membership before placement.");
	if (recruit.placementParentId) throw new Error("They are already placed.");
	const allowed = await downline(sponsor.uid);
	if (!allowed.has(input.parentUid)) throw new Error("Place them under yourself or someone already in your line.");
	if (allowed.has(input.recruitUid)) throw new Error("They are already in the line.");
	const parent = await rget(`/unilevelTree/${input.parentUid}`);
	const parentLevel = parent?.level ?? 0;
	const chain = [...(parent?.ancestorIds ?? "").split(",").filter(Boolean), input.parentUid].slice(-10);
	const recruitNode = await rget(`/unilevelTree/${input.recruitUid}`) ?? {
		userId: input.recruitUid,
		parentId: null,
		level: 0,
		children: {},
		ancestorIds: ""
	};
	await rput(`/unilevelTree/${input.recruitUid}`, {
		...recruitNode,
		parentId: input.parentUid,
		level: parentLevel + 1,
		ancestorIds: chain.join(",")
	});
	await rpatch(`/unilevelTree/${input.parentUid}`, { children: {
		...parent?.children ?? {},
		[input.recruitUid]: true
	} });
	await rpatch(`/users/${input.recruitUid}`, { placementParentId: input.parentUid });
	await rpatch(`/bySponsor/${sponsor.uid}/${input.recruitUid}`, { placed: true });
	const period = manilaPeriod();
	const now = Date.now();
	await Promise.all(chain.map(async (ancestorId, index) => {
		const level = chain.length - index;
		await rput(`/walletTransactions/${ancestorId}/uni_${input.recruitUid}`, {
			userId: ancestorId,
			type: "unilevel",
			amount: 10,
			status: "scheduled",
			period,
			note: `Level ${level} from ${recruit.name}`,
			sourceUserId: input.recruitUid,
			createdAt: now
		});
		await rput(`/notifications/${ancestorId}/uni_${input.recruitUid}`, {
			kind: "unilevel",
			title: "₱10 unilevel scheduled",
			body: `${recruit.name} was placed at level ${level}. It posts on the 1st.`,
			read: false,
			createdAt: now
		});
	}));
	return loadNetwork(input.idToken);
}
async function markNoticesRead(idToken) {
	const profile = await requireUser(idToken);
	const raw = await rget(`/notifications/${profile.uid}`);
	await Promise.all(Object.entries(raw ?? {}).filter(([, notice]) => !notice.read).map(([id]) => rpatch(`/notifications/${profile.uid}/${id}`, { read: true })));
	return noticesFor(profile.uid);
}
async function listNotices(idToken) {
	const notifications = await noticesFor((await requireUser(idToken)).uid);
	return {
		notifications,
		unread: notifications.filter((notice) => !notice.read).length
	};
}
//#endregion
export { activateMembership, ensureProfile, listNotices, loadDesk, loadNetwork, loadProfile, loadTutorial, loadWallet, markNoticesRead, placeMember, postLedger, refresh, requestPayout, requireActiveMember, saveProgress, signInWithEmail, signUpWithEmail };
