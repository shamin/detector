const { Application } = require('probot')
const myProbotApp = require('..')
const { CONFIG_FILE } = require('../lib/constants')

const pullrequestPayload = require('./fixtures/pullrequest.opened.json')

describe('Github Assistant', () => {
  let app, github

  beforeEach(() => {
    app = new Application()
    myProbotApp(app)

    github = {
      repos: {
        getContent: jest.fn().mockReturnValue(Promise.resolve({
          data: {content: 'YWJzb2x1dGUtcGF0aHM6IGZhbHNlDQp0cmFja2VkLWZpbGVzOg0KICAtIGluZGV4Lmpz'}
        }))
      },
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      },
      pullRequests: {
        getFiles: jest.fn().mockReturnValue(Promise.resolve({
          data: [{filename: 'help.yml'}, {filename: 'index.js'}]
        }))
      }
    }
    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github)
  })

  test('detects a pullrequest', async () => {
    // Simulates delivery of an issues.opened webhook
    await app.receive({
      name: 'pull_request',
      payload: pullrequestPayload
    })

    expect(github.pullRequests.getFiles).toHaveBeenCalledWith({
      owner: 'Codertocat',
      repo: 'Hello-World',
      number: 1
    })

    expect(github.repos.getContent).toHaveBeenCalledWith({
      owner: 'Codertocat',
      repo: 'Hello-World',
      path: CONFIG_FILE
    })

    // This test passes if the code in your index.js file calls `context.github.issues.createComment`
    expect(github.issues.createComment).toHaveBeenCalled()
  })
})
