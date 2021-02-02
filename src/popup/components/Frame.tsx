import styled from "styled-components"
import React from "react"

const Frame = styled.div`
	background-color: black;
	position: relative;
	/* External colors */
	border-top: 2px solid #ece2b6;
	border-left: 2px solid #dfbc9a;
	border-right: 2px solid #875626;
	border-bottom: 2px solid #733726;
	border-radius: 2px;
	/* Vanilla props */
	margin: 4px;
	padding: 4px 8px;
	text-shadow: 0px 1px 1px #000;
	color: #ccc;
	background: black;

	&:before {
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		/* Internal colors */
		border-top: 1px solid #998a4d;
		border-left: 1px solid #875626;
		border-right: 1px solid #dfbc9a;
		border-bottom: 1px solid #dfbc9a;
		box-sizing: border-box;
		pointer-events: none;
		inset: 0;
	}
`

export default React.memo(Frame)

export const MarginlessFrame = styled(Frame)`
	margin: 0;
`
