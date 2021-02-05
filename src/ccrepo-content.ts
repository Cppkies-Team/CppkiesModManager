import browser from "webextension-polyfill"
import { Mod } from "./types"

// Content script, so we can access `browser.storage`

const getMods = async (): Promise<Mod[]> =>
	(await browser.storage.local.get("mods")).mods ?? []

async function sendMods() {
	window.postMessage(
		`cmm-ccrepo-connect-${JSON.stringify(await getMods())}`,
		"*"
	)
}

window.addEventListener("message", async (ev: MessageEvent<string>) => {
	if (typeof ev.data !== "string" || !ev.data.startsWith("ccrepo-cmm-")) return
	if (ev.data === "ccrepo-cmm-connect") sendMods()
	if (ev.data.startsWith("ccrepo-cmm-submit-")) {
		await browser.storage.local.set({
			mods: [
				...(await getMods()),
				JSON.parse(ev.data.substr("ccrepo-cmm-submit-".length)),
			],
		})
		await sendMods()
	}
	if (ev.data.startsWith("ccrepo-cmm-unsubmit-")) {
		const unsubmitModId = ev.data.substr("ccrepo-cmm-unsubmit-".length)
		await browser.storage.local.set({
			mods: (await getMods()).filter(val => val.keyname !== unsubmitModId),
		})
		await sendMods()
	}
})
