import React, { useEffect, useState } from "react"
import { Mod } from "../../types"
import ModListing from "./ModListing"
import { ReactSortable } from "react-sortablejs"
import AddModButton from "./AddModButton"

const ModList: React.FC<{
	mods?: Mod[]
	setMods?: (newMods: Mod[]) => void
}> = props => {
	if (!props.mods) props.mods = []
	const [items, setItems] = useState(
		props.mods.map((val, i) => ({ ...val, id: i }))
	)

	useEffect(() => props.setMods?.(items), [items])

	//#region Helper functions for mods
	function updateMod(newMod: Mod) {
		const modIndex = items.findIndex(val => val.keyname === newMod.keyname)

		/* 
			Dumb way to do it, sure, but 
			I don't want react crying over `newState === state`
			if I do `items.splice` and assign `items` to `setItems` or something
		*/
		setItems([
			...items.slice(0, modIndex),
			{ ...newMod, id: modIndex },
			...items.slice(modIndex + 1),
		])
	}

	function deleteMod(modKeyname: string) {
		const modIndex = items.findIndex(val => val.keyname === modKeyname)
		// TODO: Copypaste the comment above
		setItems([...items.slice(0, modIndex), ...items.slice(modIndex + 1)])
	}
	// #endregion
	return (
		<div>
			{items.length === 0 ? (
				<i>
					<b>None!</b> Add a link to a mod below or get some from the{" "}
					<a href="https://ccrepo.glander.club">Cppkies Mod Repository!</a>
					<br /> {/* Breakline in italics 😳 */}
				</i>
			) : (
				<ReactSortable
					list={items}
					setList={setItems}
					animation={350}
					easing={"cubic-bezier(1, 0, 0, 1)"} // Epic gamer animation which is not enabled by default
				>
					{items.map(val => (
						<ModListing
							key={val.keyname}
							mod={val}
							updateMod={updateMod}
							deleteMod={deleteMod}
						/>
					))}
				</ReactSortable>
			)}
			<AddModButton
				onSubmit={link => {
					setItems([
						...items,
						{
							disabled: false,
							entrypoint: link,
							id: items.length,
							keyname: `unknown-mod-${
								items.filter(val => val.keyname.startsWith("unknown-mod-"))
									.length
							}`,
							name: "Unknown mod",
							version: "0.0.0",
						},
					])
				}}
			/>
		</div>
	)
}

export default ModList
