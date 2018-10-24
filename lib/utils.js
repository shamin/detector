Buffer = require('safer-buffer').Buffer
const YAML = require("yamljs")

const getFilesFromDetector = (data) => {
  let buff = Buffer.from(data, 'base64')
  return parseYmlData(buff.toString('ascii'))
}

const getFilesInPullRequest = (data) => {
  const files = data.map((d) => {
    return d.filename
  })
  return files
}

const getMatchingFiles = (changedFiles, filesList, isAbsoultePath) => {
  return filesList.filter(f => changedFiles.includes(f))
}

const parseYmlData = (content) => {
  return YAML.parse(content)
}
module.exports = {
  getFilesFromDetector,
  getFilesInPullRequest,
  getMatchingFiles
}

