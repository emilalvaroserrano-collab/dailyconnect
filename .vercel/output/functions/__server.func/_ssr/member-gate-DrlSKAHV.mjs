import { S as Navigate, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useConnect } from "./router-HBf7GLTa.mjs";
import { i as Splash, n as Paywall, r as Shell } from "./shell-DKI3etak.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/member-gate-DrlSKAHV.js
var import_jsx_runtime = require_jsx_runtime();
function MemberGate({ children }) {
	const { ready, session, profile } = useConnect();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!session || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: profile.membershipStatus !== "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {}) : children(session, profile) });
}
//#endregion
export { MemberGate as t };
