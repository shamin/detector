const getPullRequest = `query getPullRequest($owner: String!, $name: String!, $number: Int!) {
  repository(owner: $owner, name: $name) {
    pullRequest(number: $number) {
      id
      number
      title,
      commits(last: 100)
      {
        nodes{
          commit{
            message
          }
        }
      }
    }
  }
}
`

module.exports = app => {
  app.log('Detecter app is loaded')
  app.on('pull_request', async context => {
    const data = await context.github.query(getPullRequest, {owner: context.payload.repository.owner.login,name: context.payload.repository.name,number: context.payload.number})
    await app.log(JSON.stringify(data))
  })
}
