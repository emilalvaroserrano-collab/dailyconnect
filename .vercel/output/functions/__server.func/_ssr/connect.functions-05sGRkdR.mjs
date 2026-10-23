import { t as createServerFn } from "./ssr.mjs";
import { a as number, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/connect.functions-05sGRkdR.js
var token = string().min(20);
var signUp_createServerFn_handler = createServerRpc({
	id: "c927ced39ce2c9981e639ac2ff3b1afa897e9ba2c83c95060b108aa0186169c6",
	name: "signUp",
	filename: "src/lib/connect.functions.ts"
}, (opts) => signUp.__executeServer(opts));
var signUp = createServerFn({ method: "POST" }).validator(object({
	name: string().trim().min(1).max(80),
	email: string().trim().email().max(120),
	phone: string().trim().max(30).optional(),
	password: string().min(8).max(100),
	referralCode: string().trim().max(12).optional(),
	cookieTimestamp: number().optional()
})).handler(signUp_createServerFn_handler, async ({ data }) => {
	const { signUpWithEmail } = await import("./firebase.server-C5c_o70F.mjs");
	return signUpWithEmail(data);
});
var signIn_createServerFn_handler = createServerRpc({
	id: "0672a16b80407c0b836f59fefb73164ee4ed7f7c1e28db0ee2ad89961bb61e5f",
	name: "signIn",
	filename: "src/lib/connect.functions.ts"
}, (opts) => signIn.__executeServer(opts));
var signIn = createServerFn({ method: "POST" }).validator(object({
	email: string().trim().email().max(120),
	password: string().min(8).max(100)
})).handler(signIn_createServerFn_handler, async ({ data }) => {
	const { signInWithEmail } = await import("./firebase.server-C5c_o70F.mjs");
	return signInWithEmail(data);
});
var refreshSession_createServerFn_handler = createServerRpc({
	id: "3ad40b1316b3f2b7c6098a33a8d32743ea88c365ec3c5558441216b49e72d82b",
	name: "refreshSession",
	filename: "src/lib/connect.functions.ts"
}, (opts) => refreshSession.__executeServer(opts));
var refreshSession = createServerFn({ method: "POST" }).validator(object({ refreshToken: string().min(10) })).handler(refreshSession_createServerFn_handler, async ({ data }) => {
	const { refresh } = await import("./firebase.server-C5c_o70F.mjs");
	return refresh(data.refreshToken);
});
var ensureProfile_createServerFn_handler = createServerRpc({
	id: "702ed82b72ee1f64c3dc305f55e05dcb70d362e69a8edd2052d3e6318d7e615d",
	name: "ensureProfile",
	filename: "src/lib/connect.functions.ts"
}, (opts) => ensureProfile.__executeServer(opts));
var ensureProfile = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	name: string().trim().max(80).optional(),
	phone: string().trim().max(30).optional(),
	referralCode: string().trim().max(12).optional(),
	cookieTimestamp: number().optional()
})).handler(ensureProfile_createServerFn_handler, async ({ data }) => {
	const { ensureProfile: ensure } = await import("./firebase.server-C5c_o70F.mjs");
	return ensure(data);
});
var getMe_createServerFn_handler = createServerRpc({
	id: "3e20f27d8c771d681ae3f8f1419c2cd915cbad1c55fe6953116a4b8cd71aaada",
	name: "getMe",
	filename: "src/lib/connect.functions.ts"
}, (opts) => getMe.__executeServer(opts));
var getMe = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(getMe_createServerFn_handler, async ({ data }) => {
	const { loadProfile } = await import("./firebase.server-C5c_o70F.mjs");
	return loadProfile(data.idToken);
});
var getDesk_createServerFn_handler = createServerRpc({
	id: "86fcd189a13777fb54389a2e3c56995881ba0c90b54934fb81507178f32617fb",
	name: "getDesk",
	filename: "src/lib/connect.functions.ts"
}, (opts) => getDesk.__executeServer(opts));
var getDesk = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(getDesk_createServerFn_handler, async ({ data }) => {
	const { loadDesk } = await import("./firebase.server-C5c_o70F.mjs");
	return loadDesk(data.idToken);
});
var getTutorial_createServerFn_handler = createServerRpc({
	id: "384152df2d0d3c588c5703d3657b5bd01cf8cc6393d3a9f1eeaa94b792de4ae1",
	name: "getTutorial",
	filename: "src/lib/connect.functions.ts"
}, (opts) => getTutorial.__executeServer(opts));
var getTutorial = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	tutorialId: string().regex(/^[a-z0-9-]{1,40}$/)
})).handler(getTutorial_createServerFn_handler, async ({ data }) => {
	const { loadTutorial } = await import("./firebase.server-C5c_o70F.mjs");
	return loadTutorial(data.idToken, data.tutorialId);
});
var saveProgress_createServerFn_handler = createServerRpc({
	id: "6915da1487145ccb93b28c2a2a58263eb81d82d1aef44c5386fd4dab208a5499",
	name: "saveProgress",
	filename: "src/lib/connect.functions.ts"
}, (opts) => saveProgress.__executeServer(opts));
var saveProgress = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	tutorialId: string().regex(/^[a-z0-9-]{1,40}$/),
	progressPercent: number().min(0).max(100),
	lastPositionSec: number().min(0).max(28800),
	completed: boolean(),
	exercises: array(string().max(40)).max(20)
})).handler(saveProgress_createServerFn_handler, async ({ data }) => {
	const { saveProgress: save } = await import("./firebase.server-C5c_o70F.mjs");
	return save(data);
});
var activate_createServerFn_handler = createServerRpc({
	id: "faca5a38bad2fd652bc73706fc0a881d71a725fdc0faf632493cf0c0c70c3502",
	name: "activate",
	filename: "src/lib/connect.functions.ts"
}, (opts) => activate.__executeServer(opts));
var activate = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	method: _enum([
		"gcash",
		"maya",
		"card"
	])
})).handler(activate_createServerFn_handler, async ({ data }) => {
	const { activateMembership } = await import("./firebase.server-C5c_o70F.mjs");
	return activateMembership(data);
});
var getWallet_createServerFn_handler = createServerRpc({
	id: "bc796cd31ddba61610ab4f742fd9ea7e8c88b6fdea755d868ba2f018a1f1e62e",
	name: "getWallet",
	filename: "src/lib/connect.functions.ts"
}, (opts) => getWallet.__executeServer(opts));
var getWallet = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(getWallet_createServerFn_handler, async ({ data }) => {
	const { loadWallet } = await import("./firebase.server-C5c_o70F.mjs");
	return loadWallet(data.idToken);
});
var payout_createServerFn_handler = createServerRpc({
	id: "f86395d50ca80ad157c25545e2fd6aafba4ec0eb7304a027fae9ace599c39a78",
	name: "payout",
	filename: "src/lib/connect.functions.ts"
}, (opts) => payout.__executeServer(opts));
var payout = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	amount: number().int().min(100).max(1e6)
})).handler(payout_createServerFn_handler, async ({ data }) => {
	const { requestPayout } = await import("./firebase.server-C5c_o70F.mjs");
	return requestPayout(data.idToken, data.amount);
});
var getNetwork_createServerFn_handler = createServerRpc({
	id: "0ab883fdc3081e6c8338a6b4d4d2a9b83d0ad5186a3f655b197b977d4069fbb2",
	name: "getNetwork",
	filename: "src/lib/connect.functions.ts"
}, (opts) => getNetwork.__executeServer(opts));
var getNetwork = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(getNetwork_createServerFn_handler, async ({ data }) => {
	const { loadNetwork } = await import("./firebase.server-C5c_o70F.mjs");
	return loadNetwork(data.idToken);
});
var place_createServerFn_handler = createServerRpc({
	id: "63b7dbca97584c54e1e3d08995fe83835f52de1d671f495d05c83daf3444d752",
	name: "place",
	filename: "src/lib/connect.functions.ts"
}, (opts) => place.__executeServer(opts));
var place = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	recruitUid: string().regex(/^[A-Za-z0-9]{8,128}$/),
	parentUid: string().regex(/^[A-Za-z0-9]{8,128}$/)
})).handler(place_createServerFn_handler, async ({ data }) => {
	const { placeMember } = await import("./firebase.server-C5c_o70F.mjs");
	return placeMember(data);
});
var getNotices_createServerFn_handler = createServerRpc({
	id: "ddfbc55e2bdcb59385da24f17f202701122bbd991a3d327271c2659a63df289a",
	name: "getNotices",
	filename: "src/lib/connect.functions.ts"
}, (opts) => getNotices.__executeServer(opts));
var getNotices = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(getNotices_createServerFn_handler, async ({ data }) => {
	const { listNotices } = await import("./firebase.server-C5c_o70F.mjs");
	return listNotices(data.idToken);
});
var readNotices_createServerFn_handler = createServerRpc({
	id: "a16aace1c65bae1b7c94cd994a96cc0ca4f56ec57cb245c66286cb8aa2db6153",
	name: "readNotices",
	filename: "src/lib/connect.functions.ts"
}, (opts) => readNotices.__executeServer(opts));
var readNotices = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(readNotices_createServerFn_handler, async ({ data }) => {
	const { markNoticesRead } = await import("./firebase.server-C5c_o70F.mjs");
	return markNoticesRead(data.idToken);
});
//#endregion
export { activate_createServerFn_handler, ensureProfile_createServerFn_handler, getDesk_createServerFn_handler, getMe_createServerFn_handler, getNetwork_createServerFn_handler, getNotices_createServerFn_handler, getTutorial_createServerFn_handler, getWallet_createServerFn_handler, payout_createServerFn_handler, place_createServerFn_handler, readNotices_createServerFn_handler, refreshSession_createServerFn_handler, saveProgress_createServerFn_handler, signIn_createServerFn_handler, signUp_createServerFn_handler };
