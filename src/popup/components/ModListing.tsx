import React, { useState } from "react"
import { Mod } from "../../types"
import Frame from "./Frame"
import Button from "./Button"
import styled from "styled-components"

const CoolFrame = styled(Frame)`
	min-width: 20ch;
	display: flex;
	align-items: center;
`

const ModListing: React.FC<{
	mod: Mod
	updateMod?: (newMod: Mod) => void
	deleteMod?: (modKeyname: string) => void
}> = ({ mod, updateMod, deleteMod }) => {
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div style={{ opacity: mod.disabled ? 0.5 : 1 }}>
			<CoolFrame>
				{isEditing ? (
					<div>
						<input
							defaultValue={mod.name}
							style={{ width: "20ch" }}
							onChange={ev =>
								updateMod?.({ ...mod, name: ev.currentTarget.value })
							}
						/>
						<br />
						<input
							style={{ width: "25ch" }}
							defaultValue={mod.entrypoint}
							onChange={ev =>
								updateMod?.({ ...mod, entrypoint: ev.currentTarget.value })
							}
						/>
					</div>
				) : (
					<span
						style={{
							fontStyle: mod.keyname.startsWith("unknown-mod-")
								? "italic"
								: "normal",
						}}
					>
						{mod.name}
					</span>
				)}
				<div style={{ marginLeft: "auto" }}>
					<Button
						type={mod.disabled ? "good" : "bad"}
						onClick={() => updateMod?.({ ...mod, disabled: !mod.disabled })}
					>
						{mod.disabled ? "En" : "Dis"}able
					</Button>
					<Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
					{isEditing && deleteMod ? (
						<Button type="bad" onClick={() => deleteMod(mod.keyname)}>
							Delete!
						</Button>
					) : (
						""
					)}
				</div>
			</CoolFrame>
		</div>
	)
}

export default ModListing
