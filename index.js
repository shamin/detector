module.exports = app => {
  app.log('Detecter app is loaded')
  app.on('pull_request', async context => {
    app.log(context.payload)
  })
}
