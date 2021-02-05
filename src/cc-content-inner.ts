import { Mod } from "./types"
// Injected script, so we can access `browser.storage`

function waitForCC(): Promise<void> {
	return new Promise<void>(res => {
		const id = setInterval(() => {
			if (window.Game?.ready) {
				clearInterval(id)
				res()
			}
		}, 100)
	})
}

;(async () => {
	await waitForCC()
	window.addEventListener("message", (ev: MessageEvent<string>) => {
		if (!ev.data.startsWith("cmm-outer-")) return
		const mods: Mod[] = JSON.parse(ev.data.substring("cmm-outer-".length))
		console.log("CMM - Loading mods!")
		for (const mod of mods) {
			if (mod.disabled) continue
			let url = mod.entrypoint
			if (mod.packageLink)
				try {
					url = new URL(url, mod.packageLink).href
				} catch {}
			Game.LoadMod(url)
		}
	})
	window.postMessage("cmm-inner-connected", "*")
})()
