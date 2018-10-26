<p align="center">
  <a href="">
    <img width="100" height="100" alt="" src="https://user-images.githubusercontent.com/8272719/47097001-0cdea500-d24e-11e8-921d-b1288b122a3b.png"></a>
</p>

<h2 align="center">Detector</h2>

<p align="center">A GitHub App built with <a href="https://github.com/probot/probot"">🤖Probot</a> that helps to track changes to important files.</p>

## Usage

- Install detector-io github app.
- Create a `.detector.yml` file with the file names that needs to be tracked in the following structure
```yml
absolute-paths: true
tracked-files:
  - README.md
```
- Now detector app automatically checks and comments, if there is a change in the file tracked, in a pull request.

![Screenshot](https://raw.githubusercontent.com/shaminmeerankutty/detector/master/screenshot.png)

### Configuration file

| parameters    | description | default       |
| ------------- |-------------| ------------- |
| absolute-paths|If `true` will check for absolute paths of files in tracked-files.| false         |
| tracked-files |Contains the list of files which need to be tracked for changes. | none          |

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Contributing

If you have suggestions for how detector could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Shamin Meerankutty <shamin616@gmail.com>
