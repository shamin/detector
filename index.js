module.exports = app => {
  app.log('Detecter app is loaded')
  app.on('pull_request', async context => {

    try {
      const data = await context.github.pullRequests.getFiles({ owner: context.payload.repository.owner.login, repo: context.payload.repository.name, number: context.payload.number })
      const files = await context.github.repos.getContent({ owner: context.payload.repository.owner.login, repo: context.payload.repository.name,path: '.detector' })
      await app.log(JSON.stringify(data))
    } catch (e) {
      app.log(e)
    }
  })
}
