import browser from "webextension-polyfill"

// Content script, so we can access `browser.storage`

window.addEventListener("message", async (ev: MessageEvent<string>) => {
	if (ev.data !== "cmm-inner-connected") return
	window.postMessage(
		`cmm-outer-${JSON.stringify(
			(await browser.storage.local.get("mods")).mods ?? []
		)}`,
		"*"
	)
})

const scriptTag = document.createElement("script")
scriptTag.src = browser.runtime.getURL("./dist/innerContent.js")
document.head.appendChild(scriptTag)
