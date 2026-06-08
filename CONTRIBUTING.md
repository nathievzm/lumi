# 💖 contributing to lumi

## ✨ welcome to the team!

Thank you so much for your interest in contributing to lumi! 💖 To keep our repository clean, organized, and running
smoothly, please follow these guidelines when submitting your magical code.

## 🐛 reporting issues & suggesting features

Found a bug or have a brilliant idea for a new feature? We would love to hear about it!

- Please check the existing issues first to make sure it hasn't already been reported.
- If it is new, open an issue and provide as much detail as possible so we can understand and replicate the magic.

## 🙋🏻‍♀️ claiming an issue to work on

Want to write some code? Awesome! To avoid multiple people working on the same thing, please follow this flow:

1. Browse the open issues. Look for the `good first issue` or `help wanted` labels if you are not sure where to start.
2. Leave a comment on the issue saying you would like to work on it.
3. Wait for me ([**@nathievzm**](https://github.com/nathievzm)) to officially assign the issue to you before you start
   coding.

## 💻 local development setup

Ready to get your hands dirty? Follow these steps to get the environment running on your local machine using bun:

1. Fork the repository on GitHub.
2. Clone your fork locally:

```bash
# clone your fork
git clone https://github.com/nathievzm/lumi.git

# navigate to the project directory
cd lumi

# install all dependencies using bun
bun install
```

3. Create a new branch for your feature or bugfix.

## 🌿 branch naming convention

To keep our branches tidy, we strictly follow this naming pattern: `<type>/<issue-number>-short-description`.

For the `<type>`, we use the standard conventional commits prefixes:

- `feat` - for new features.
- `bug` - for bug fixes.
- `docs` - for documentation updates.
- `chore` - for maintenance tasks.
- `refactor` - for restructuring code.
- `test` - for adding or updating tests.

**Example:** `docs/93-add-code-of-conduct`

## 📝 commit messages

We love clean git histories! Please write your commit messages following the
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. If your commit is related to an
open issue, it is highly encouraged and super helpful to append the issue number at the end of the commit message.

**Example:** `docs: add CODE_OF_CONDUCT (#93)`

## 🚀 pull requests

When your code is ready and tested, open a Pull Request against the `main` branch.

- Ensure your code passes all linting and local tests before requesting a review.
- Link the related issue in the PR description (e.g., `"Closes #93"`).
- I will review it as soon as possible and we will get that merged! 🎉
