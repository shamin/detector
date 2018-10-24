const { getFilesFromDetector, getFilesInPullRequest, getMatchingFiles } = require('./utils')
const { CONFIG_FILE } = require('./constants')
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
    if (this.context.payload.action === "closed") {
      return
    }
    let detectorFiles = []
    let isAbsoultePath = false
    try {
      const detectorData = await this.context.github.repos.getContent({
        owner: this.owner,
        repo: this.repository,
        path: CONFIG_FILE
      })
      const finalData = getFilesFromDetector(detectorData.data.content)
      detectorFiles = finalData["tracked-files"]
      isAbsoultePath = finalData["absolute-paths"]
    }
    catch (e) {
      if (this.context.payload.action === "opened") {
        const issueComment = this.context.issue({ body: "No `" + CONFIG_FILE + "` file found in the project." })
        this.context.github.issues.createComment(issueComment)
      }
      return
    }
    const pullRequestFiles = getFilesInPullRequest(pullRequestData.data)
    return getMatchingFiles(pullRequestFiles, detectorFiles, isAbsoultePath)
  }

  async sendComments() {
    if (this.context.payload.action === "closed") {
      return
    }
    const changedFiles = await this.getChangedFiles()
    if (changedFiles !== undefined && changedFiles.length > 0) {
      const issueComment = this.context.issue({ body: comment(changedFiles) })
      return this.context.github.issues.createComment(issueComment)
    } else {
      const issueComment = this.context.issue({ body: "No change in tracked files." })
      return this.context.github.issues.createComment(issueComment)
    }
  }
}

