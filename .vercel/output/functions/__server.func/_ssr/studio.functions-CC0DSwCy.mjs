import { t as createServerFn } from "./ssr.mjs";
import { a as number, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { y as createSsrRpc } from "./router-HBf7GLTa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio.functions-CC0DSwCy.js
var token = string().min(20);
var id = string().regex(/^[A-Za-z0-9_-]{4,40}$/);
var listFeed = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("3db129ac3bd7c0eeddbf83cd607a34cd31cd79ff6503a3bf9a30bae9a35275d6"));
var recordView = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id
})).handler(createSsrRpc("3ade3bc90052405024f936103e63e1d42ac4433c22149fdc2289ea4e3a8958ab"));
var submitPost = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	title: string().trim().min(1).max(80),
	caption: string().trim().max(500),
	hashtags: string().trim().max(120),
	kind: _enum(["video", "image"]),
	mediaUrl: string().min(1).max(12e5),
	posterUrl: string().max(12e5),
	durationSec: number().min(0).max(120),
	width: number().min(0).max(8e3),
	height: number().min(0).max(8e3),
	mime: string().max(40),
	productCode: string().max(40),
	rightsConfirmed: boolean()
})).handler(createSsrRpc("deab5756f3dc38e185e65041a2bdc6c871c5b1db0266e6b2de0bdf597ca4909d"));
var revisePost = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id,
	title: string().trim().min(1).max(80),
	caption: string().trim().max(500)
})).handler(createSsrRpc("0a97294987222ad7a4ed7df30582c94f59e5efa154784ce61f15b44a3df7ddc0"));
var generateStudio = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	productCode: string().regex(/^[a-z0-9-]{2,40}$/),
	output: _enum([
		"image",
		"caption",
		"script"
	]),
	style: string().max(240)
})).handler(createSsrRpc("a7d1c31428ca4249a3dc8b1937852c1e906e2155a52b9f2af103cdf830e40e0f"));
var speakCaption = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	text: string().trim().min(1).max(400)
})).handler(createSsrRpc("373c98d347d041f29f5540670e0847f9dc124f399a6f846c50b1ac9d853eb4d3"));
var listProducts = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("a7647f7687f12d34447bc7c37ce939e89aabc14691132b4b74d62a9472b79e86"));
var loadCreator = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("eccf5d0f350b99145a401b8b762229401f13292e7e79416817dc3f680220c43e"));
var listLive = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("9e62663aaf357beadad5a3e56d39a7e6b00fad4f2b1601eb63dde4383ddfe718"));
var saveLive = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	title: string().trim().max(80),
	scheduledAt: number().min(0),
	productCodes: array(string().regex(/^[a-z0-9-]{2,40}$/)).max(6),
	script: string().max(2e3)
})).handler(createSsrRpc("9bff47c6c6b2844a55ebc1bd360a7f0a7efbd36ea62290c4920a2d23904ae1c9"));
var startLive = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	sessionId: id
})).handler(createSsrRpc("dec34bc29a76ece895e7b96d550def5774a2d282471b808a25adb97babf00892"));
var loadModeration = createServerFn({ method: "POST" }).validator(object({ idToken: token })).handler(createSsrRpc("26f89283351c4f85977e2c4627d0764b51ebcf6ce7f8ee9740f899e6c9a1b15e"));
var moderatePost = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id,
	action: _enum([
		"approve",
		"reject",
		"changes"
	]),
	note: string().max(240)
})).handler(createSsrRpc("5b992e28ad99fbe07a6f9db973867d5a6b980cea23868573fed2bf5b12c85b9f"));
var retryPublish = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	postId: id,
	platform: _enum([
		"tiktok",
		"youtube",
		"facebook"
	])
})).handler(createSsrRpc("ce33efd19864a05e20b92b183c5b843a15fbaeac37ebb033fbe9b7b79d17d209"));
var confirmOrder = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	orderId: id,
	memberCode: string().regex(/^[A-Z0-9]{4,12}$/),
	productCode: string().regex(/^[a-z0-9-]{2,40}$/),
	salePesos: number().int().min(1).max(1e7),
	event: _enum([
		"confirmed",
		"refunded",
		"cancelled"
	])
})).handler(createSsrRpc("67fbc9469ebbbc697120f2caa6f236c352c4042d1ea4ee93b7332dd45bc67cc7"));
var recordRevenue = createServerFn({ method: "POST" }).validator(object({
	idToken: token,
	reportId: id,
	postId: id,
	gross: number().int().min(0).max(1e7),
	deductions: number().int().min(0).max(1e7),
	source: string().max(80),
	status: _enum(["estimated", "confirmed"])
})).handler(createSsrRpc("214ad44472567cb49c11a23e0e5a34949845dcb1283f9681bc6c9aadd84a9d6d"));
var recordClick = createServerFn({ method: "POST" }).validator(object({
	memberCode: string().regex(/^[A-Za-z0-9]{4,12}$/),
	productCode: string().regex(/^[A-Za-z0-9-]{2,40}$/)
})).handler(createSsrRpc("c8f5ae6173767a184510c5f857738bd376a06eaf8546b06b3b4d4132aac1129c"));
var loadAffiliateLanding = createServerFn({ method: "POST" }).validator(object({
	memberCode: string().regex(/^[A-Za-z0-9]{4,12}$/),
	productCode: string().regex(/^[A-Za-z0-9-]{2,40}$/)
})).handler(createSsrRpc("2c11d69d4db1c99e9c2bb911c773d1ea22ed1b76f35566e979594d91c51f0a0b"));
//#endregion
export { startLive as _, listProducts as a, loadModeration as c, recordRevenue as d, recordView as f, speakCaption as g, saveLive as h, listLive as i, moderatePost as l, revisePost as m, generateStudio as n, loadAffiliateLanding as o, retryPublish as p, listFeed as r, loadCreator as s, confirmOrder as t, recordClick as u, submitPost as v };
