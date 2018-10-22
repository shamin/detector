const { getFilesFromDetector, getFilesInPullRequest, getMatchingFiles } = require('./utils')
const comment = require('./comment')

module.exports = class Detector {
  constructor(context) {
    this.context = context
    this.owner = context.payload.repository.owner.login
    this.repository = context.payload.repository.name
    this.pullRequestsNumber = context.payload.number
  }

  async getChangedFiles() {
    const pullRequestData = await this.context.github.pullRequests.getFiles({
      owner: this.owner,
      repo: this.repository,
      number: this.pullRequestsNumber
    })
    this.context.log(JSON.stringify(pullRequestData))
    if (this.context.payload.action === "closed") {
      return
    }
    const detectorFiles = []
    try {
      const detectorData = await this.context.github.repos.getContent({
        owner: this.owner,
        repo: this.repository,
        path: '.detector'
      })
      detectorData = getFilesFromDetector(detectorData.data.content)
      detectorFiles = detectorData["tracked-files"]
    }
    catch (e) {
      if (this.context.payload.action === "opened") {
        const issueComment = this.context.issue({ body: "No `.detector` file found in the project." })
        this.context.github.issues.createComment(issueComment)
      }
      return
    }
    const pullRequestFiles = getFilesInPullRequest(pullRequestData.data)
    return getMatchingFiles(detectorFiles, pullRequestFiles)
  }

  async sendComments() {
    if (this.context.payload.action === "closed") {
      return
    }
    const changedFiles = await this.getChangedFiles()
    if (changedFiles !== undefined && changedFiles.length > 0) {
      const issueComment = this.context.issue({ body: comment(changedFiles) })
      return this.context.github.issues.createComment(issueComment)
    }
  }
}

