import { exit } from 'node:process'

import { type PullRequest } from '@octokit/webhooks-types'

import { context, octokit } from './octokit'

const isPullRequest = (data: unknown): data is PullRequest =>
    typeof data === 'object' && data !== null && 'head' in data

const pullRequest = context.payload.pull_request

if (!isPullRequest(pullRequest)) {
    throw new Error('this event does not contain a pull request! 😢')
}

const branch = /\w+\/(\d+)-\w+/v.exec(pullRequest.head.ref)

if (branch === null || branch.length < 2 || branch[1] === undefined) {
    console.log(`skipping: branch ${pullRequest.head.ref} does not match the issue format. ⏭️`)
    exit(0)
}

const issueNumber = Number(branch[1])

const { data: issue, status } = await octokit.rest.issues.get({
    issue_number: issueNumber,
    owner: context.repo.owner,
    repo: context.repo.repo
})

if (status !== 200) {
    throw new Error('failed to fetch the issue! 😟')
}

const labels = issue.labels
    .map(label => (typeof label === 'string' ? label : label.name))
    .filter((name): name is string => typeof name === 'string' && name.length > 0)

await octokit.rest.issues.addLabels({
    issue_number: context.issue.number,
    labels,
    owner: context.repo.owner,
    repo: context.repo.repo
})
