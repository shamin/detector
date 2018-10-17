const { pullRequest, file } = require('./test')
const Detector = require('./lib/detector')

Buffer = require('safer-buffer').Buffer

module.exports = app => {
  app.log('Detecter app is loaded')

  app.on('pull_request', async context => {
    const detector = new Detector(context)
    detector.sendComments()
  })
}

