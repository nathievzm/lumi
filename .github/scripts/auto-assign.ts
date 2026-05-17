import { context, octokit } from './octokit'

await octokit.rest.issues.addAssignees({
    assignees: [context.actor],
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo
})
