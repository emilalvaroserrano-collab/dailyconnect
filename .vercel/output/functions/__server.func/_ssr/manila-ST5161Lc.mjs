//#region node_modules/.nitro/vite/services/ssr/assets/manila-ST5161Lc.js
/** Public Firebase web config (the client key is not a server secret). */
var firebaseConfig = {
	apiKey: "AIzaSyC8k-Urv_CEQSuJFSEojh_aU9ur3LijXOA",
	authDomain: "masterplan-1cd65.firebaseapp.com",
	databaseURL: "https://masterplan-1cd65-default-rtdb.firebaseio.com",
	projectId: "masterplan-1cd65",
	storageBucket: "masterplan-1cd65.firebasestorage.app",
	messagingSenderId: "737894267682",
	appId: "1:737894267682:web:26d96704580c32222d037b"
};
function manilaDate(now = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Manila",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(now);
}
function manilaPeriod(now = /* @__PURE__ */ new Date()) {
	return manilaDate(now).slice(0, 7);
}
function dayIndex(count, now = /* @__PURE__ */ new Date()) {
	if (count <= 0) return 0;
	const [y, m, d] = manilaDate(now).split("-").map(Number);
	return (Math.floor(Date.UTC(y, (m ?? 1) - 1, d ?? 1) / 864e5) % count + count) % count;
}
function secondsUntilManilaMidnight(now = Date.now()) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "Asia/Manila",
		hourCycle: "h23",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}).formatToParts(new Date(now));
	const num = (type) => Number(parts.find((p) => p.type === type)?.value ?? "0");
	let hour = num("hour");
	if (hour === 24) hour = 0;
	return 86400 - (hour * 3600 + num("minute") * 60 + num("second"));
}
function formatClock(totalSeconds) {
	const s = Math.max(0, Math.floor(totalSeconds));
	return [
		Math.floor(s / 3600),
		Math.floor(s % 3600 / 60),
		s % 60
	].map((n) => String(n).padStart(2, "0")).join(":");
}
function peso(amount) {
	return new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
		maximumFractionDigits: 0
	}).format(amount);
}
function errorText(error) {
	if (error instanceof Error && error.message) return error.message.replace(/^Error:\s*/, "");
	return "Something went wrong.";
}
//#endregion
export { manilaPeriod as a, formatClock as i, errorText as n, peso as o, firebaseConfig as r, secondsUntilManilaMidnight as s, dayIndex as t };
