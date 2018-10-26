module.exports = (changedFiles) => {
  return (
    `
#### Files Changed

${getFiles(changedFiles).reduce(textReducer)}
    `
  )
}

const getFiles = (files) => files.map((file) => `- \`${file}\``)

const textReducer = (accumulator, currentValue) => `${accumulator} \n ${currentValue}`
