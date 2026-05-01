declare module 'bun' {
	interface Env {
		WIDTH: string
		HEIGHT: string
		INPUT_FOLDER: string
		OUTPUT_FOLDER: string
		FORMAT: string
		LIMIT: string
	}
}
