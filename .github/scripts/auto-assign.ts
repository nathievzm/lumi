import { context, getOctokit } from '@actions/github'
import { type PullRequest } from '@octokit/webhooks-types'

const isPullRequest = (data: unknown): data is PullRequest =>
    typeof data === 'object' && data !== null && 'head' in data

const token = Bun.env.GITHUB_TOKEN

if (token === undefined) {
    throw new Error('GITHUB_TOKEN is missing! 😭')
}

const octokit = getOctokit(token)

const pullRequest = context.payload.pull_request

if (!isPullRequest(pullRequest)) {
    throw new Error('this event does not contain a pull request! 😢')
}

await octokit.rest.issues.addAssignees({
    assignees: [context.actor],
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo
})
