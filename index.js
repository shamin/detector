const Detector = require('./lib/detector')

module.exports = app => {
  app.log('Detector app is loaded')

  app.on('pull_request', async context => {
    app.log('Pull Request')
    const detector = new Detector(context)
    detector.sendComments()
  })
}
