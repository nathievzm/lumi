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

const branch = /\w+\/(\d+)-\w+/v.exec(pullRequest.head.ref)

if (branch === null || branch.length < 2 || branch[1] === undefined) {
    throw new Error('branch name does not match the expected format! 😕')
}

const issueNumber = Number(branch[1])

const { data: issue, status } = await octokit.rest.issues.get({
    issue_number: issueNumber,
    owner: pullRequest.head.repo?.owner.login ?? '',
    repo: pullRequest.head.repo?.name ?? ''
})

if (status !== 200) {
    throw new Error('failed to fetch the issue! 😟')
}

console.log({ issue })
