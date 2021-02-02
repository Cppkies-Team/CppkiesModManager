export type CCIcon = [number, number, string?]

// A cut down version of the CCRepo mod interface
export interface Mod {
	/**
	 * The unique keyname of the mod, can consist of
	 * A-Z a-z 0-9 - _ . ! ~ * ' ( )
	 */
	keyname: string
	/**
	 * The shown name of the mod, doesn't contain any restrictions
	 */
	name: string
	/**
	 * The version of the mod, must be in semver
	 */
	version: string
	/**
	 * The link to the code of the mod
	 */
	entrypoint: string
	// TODO: packageLink

	//! Cppkies Mod Manager exclusive!
	disabled: boolean
	unknown?: boolean
}
