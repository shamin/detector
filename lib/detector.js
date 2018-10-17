const { getFilesFromDetector, getFilesInPullRequest, getMatchingFiles, getCommentText } = require('./utils')

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
    const detectorData = await this.context.github.repos.getContent({
      owner: this.owner,
      repo: this.repository,
      path: '.detector'
    })
    const detectorFiles = getFilesFromDetector(detectorData.data.content)
    const pullRequestFiles = getFilesInPullRequest(pullRequestData.data)
    return getMatchingFiles(detectorFiles, pullRequestFiles)
  }

  async sendComments() {
    const changedFiles = await this.getChangedFiles()
    if (changedFiles !== undefined && changedFiles.length > 0) {
      const issueComment = this.context.issue({ body: getCommentText(changedFiles) })
      return this.context.github.issues.createComment(issueComment)
    }
  }
}

