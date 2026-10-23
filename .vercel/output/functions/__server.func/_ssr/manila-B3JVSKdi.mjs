//#region node_modules/.nitro/vite/services/ssr/assets/manila-B3JVSKdi.js
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
export { peso as a, manilaPeriod as i, errorText as n, secondsUntilManilaMidnight as o, formatClock as r, dayIndex as t };
