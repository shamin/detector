Buffer = require('safer-buffer').Buffer
const YAML = require("yamljs")

const getFilesFromDetector = (data) => {
  let buff = Buffer.from(data, 'base64')
  let data = parseYmlData(buff.toString('ascii'))
  return data
}

const getFilesInPullRequest = (data) => {
  const files = data.map((d) => {
    return d.filename
  })
  return files
}

const getMatchingFiles = (changedFiles, filesList) => {
  return filesList.filter(f => changedFiles.includes(f))
}

const parseYmlData = (content) => {
  return YAML.parse(content)
}
module.exports = {
  getFilesFromDetector,
  getFilesInPullRequest,
  getMatchingFiles,
  parseYmlFile
}

