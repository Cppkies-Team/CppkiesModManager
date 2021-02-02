import React from "react"

import ModList from "./ModList"
import { MarginlessFrame } from "./Frame"
import { Mod } from "../../types"

const App: React.FC<{ mods?: Mod[]; setMods?: (mods: Mod[]) => void }> = ({
	mods,
	setMods,
}) => {
	return (
		<MarginlessFrame>
			Active mods:
			<ModList mods={mods} setMods={setMods}></ModList>
		</MarginlessFrame>
	)
}

export default App
