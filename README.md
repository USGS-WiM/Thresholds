![WiM](wim.png)

# Thresholds

An alternative way of delivering USGS streamgage data using thresholds

### Prerequisites

What things you need to install the software and how to install them

```
Vue 2
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Building and testing

Explain how to run the debugging 'watch' script for this repo, if applicable

Explain how to run unit tests, if applicable

## Development Workflow

Explain the desired workflow. Workflow may deviate from the instructions below depending on the projects needs.

**Instructions below are for developers actively working on the repo.**

An issue will be assigned to you via Github. Your workflow begins after assignment:

1. Create a branch with the issue number as the branch name (e.g. `134`)
2. Move issue into 'In Progress' column of project board
3. Do the work
    - While you work, you may wish to have the app running with live reload. Run `ng serve` to do so.
4. Once all checks have passed and you are ready to submit a Pull Request, update the changelog with a brief description of what your work added, changed, or fixed. There is an Unreleased section at top with subheadings for each category. Edit the file CHANGELOG.md found at project root.
5. Add the changed files `git add .` and commit `git commit -m '[your commit message here]'` you commit message should reference the issue number and include a very brief description of the work.
6. **Pull from `dev`**
    - Run `git pull origin dev`. This is a critical step. It ensures your Pull Request is synced with the latest work in the main `dev` branch. If you are lucky, it will auto-merge. Otherwise, you may have to resolve conflicts between your commit and what currently exists in dev. Please be careful with this step so no code is lost - ask for help if you are unsure what to do.
    - If manually merging, you will have changed files so you will need to add and commit once more (see step 9).
7. Push your committed and synced branch to the remote repo (Github): `git push origin [your branch name]`
8. Submit Pull Request (PR) to merge your issue branch into `dev`
    - Automated checks will be run against your PR. Failure of any of these will mean you need to re-commit to your branch to update your PR with the fix. A colleague will review your work and either approve it or request changes. Upon approval of the PR your issue will be automatically moved to the 'In Dev Branch' column of the project board.

Move onto next assigned issue and start back at step 1.

## Deployment

Add additional notes about how to deploy this on a live system. **Do not include any credentials, IP addresses, or other sensitive information**

## Built With

- [Vue](https://vuejs.org/) - The main web framework used
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Others](https://www.npmjs.com/) - Any other high-level dependencies

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on adhering by the [USGS Code of Scientific Conduct](https://www2.usgs.gov/fsp/fsp_code_of_scientific_conduct.asp).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](../../tags).

Advance the version when adding features, fixing bugs or making minor enhancement. Follow semver principles. To add tag in git, type git tag v{major}.{minor}.{patch}. Example: git tag v2.0.5

To push tags to remote origin: `git push origin --tags`

\*Note that your alias for the remote origin may differ.

## Authors

- **[Lauren Privette](https://github.com/lprivette)** - _Lead Developer_ - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)
- **[Lily Houtman](https://github.com/lilyhoutman)** - _Developer_ - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)

See also the list of [contributors](../../graphs/contributors) who participated in this project.

## License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE.md](LICENSE.md) file for details

## Suggested Citation

In the spirit of open source, please cite any re-use of the source code stored in this repository. Below is the suggested citation:

`This project contains code produced by the Web Informatics and Mapping (WIM) team at the United States Geological Survey (USGS). As a work of the United States Government, this project is in the public domain within the United States. https://wim.usgs.gov`

## Acknowledgments

- Hat tip to anyone who's code was used
- Inspiration Note

## About WIM

- This project authored by the [USGS WIM team](https://wim.usgs.gov)
- WIM is a team of developers and technologists who build and manage tools, software, web services, and databases to support USGS science and other federal government cooperators.
- WIM is a part of the [Upper Midwest Water Science Center](https://www.usgs.gov/centers/wisconsin-water-science-center).
