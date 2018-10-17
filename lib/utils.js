Buffer = require('safer-buffer').Buffer

const getFilesFromDetector = (data) => {
  let buff = Buffer.from(data, 'base64')
  let text = buff.toString('ascii').split(/(?:\r\n|\r|\n)/g)
  return text
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

const getCommentText = (changedFiles) => {
  return `Files Changed : ${changedFiles.reduce(textReducer)}`
}

const textReducer = (accumulator, currentValue) => `${accumulator} \`${currentValue}\``;


module.exports = {
  getFilesFromDetector,
  getFilesInPullRequest,
  getMatchingFiles,
  getCommentText
}