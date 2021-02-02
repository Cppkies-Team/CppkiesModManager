import React, { useState } from "react"
import Button from "./Button"

const AddModButton: React.FC<{ onSubmit: (modLink: string) => void }> = ({
	onSubmit,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false)

	if (!isSubmitting)
		return (
			<Button type="good" onClick={() => setIsSubmitting(true)}>
				Add mod
			</Button>
		)
	return (
		<input
			autoFocus
			onBlur={() => setIsSubmitting(false)}
			onKeyDown={ev => {
				if (ev.code === "Enter") {
					let link = ev.currentTarget.value
					if (!/^https?:\/\//.test(link)) link = `http://${link}`
					let isError = false
					try {
						new URL(link)
					} catch {
						isError = true
					}
					if (!isError) {
						setIsSubmitting(false)
						onSubmit(link)
					}
				}
			}}
			placeholder="Enter the link to the mod!"
		/>
	)
}

export default AddModButton
