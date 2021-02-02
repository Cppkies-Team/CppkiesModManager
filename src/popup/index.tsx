import React from "react"
import { render } from "react-dom"
import App from "./components/App"
import { createGlobalStyle } from "styled-components"
import { Mod } from "../types"
import browser from "webextension-polyfill"

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		width: 500px;
	}
`

;(async () => {
	let mods = (await browser.storage.local.get("mods")).mods
	if (!(mods instanceof Array)) mods = []
	const root = document.getElementById("root")
	if (root)
		render(
			<React.StrictMode>
				<GlobalStyle />
				<App
					mods={mods as Mod[]}
					setMods={mods => browser.storage.local.set({ mods })}
				/>
				{
					// Trust me
				}
			</React.StrictMode>,
			root
		)
})()
