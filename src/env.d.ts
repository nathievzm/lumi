declare module 'bun' {
    interface Env {
        /**
         * Default target width for resized images.
         */
        WIDTH?: string
        /**
         * Default target height for resized images.
         */
        HEIGHT?: string
        /**
         * Default path to the input folder containing images.
         */
        INPUT_FOLDER?: string
        /**
         * Default path where processed images will be saved.
         */
        OUTPUT_FOLDER?: string
        /**
         * Default global output format (e.g., '.webp', '.png').
         */
        FORMAT?: string
        /**
         * Default concurrent processing limit.
         */
        LIMIT?: string
        /**
         * Whether to process the input directory recursively by default.
         */
        RECURSIVE?: string
    }
}
