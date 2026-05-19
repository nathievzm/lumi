declare module 'bun' {
    interface Env {
        /**
         * The default target width in pixels for resized images.
         */
        WIDTH?: string
        /**
         * The default target height in pixels for resized images.
         */
        HEIGHT?: string
        /**
         * The default path to the input directory containing source images.
         */
        INPUT_FOLDER?: string
        /**
         * The default path to the destination directory where processed images will be saved.
         */
        OUTPUT_FOLDER?: string
        /**
         * The default global output format extension (e.g., `.webp`, `.png`).
         */
        FORMAT?: string
        /**
         * The default concurrent processing limit.
         */
        LIMIT?: string
        /**
         * Whether to process the input directory recursively by default.
         */
        RECURSIVE?: string
    }
}
