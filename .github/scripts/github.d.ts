declare module 'bun' {
    interface Env {
        /**
         * The GitHub personal access token used for authentication in GitHub Actions scripts.
         */
        GITHUB_TOKEN?: string
    }
}
