import { context, getOctokit } from '@actions/github'

const token = Bun.env.GITHUB_TOKEN

if (token === undefined) {
    throw new Error('GITHUB_TOKEN is missing! 😭')
}

const octokit = getOctokit(token)
export { context, octokit }
