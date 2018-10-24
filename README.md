# FlappyShape

[![Coverage Status](https://coveralls.io/repos/github/tikhiy/flappyshape/badge.svg)](https://coveralls.io/github/tikhiy/flappyshape)

The FlappyShape Game.

### Development

##### Linting

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `make lint:static` | Lint **client-side** scripts. |
| `make lint:server` | Lint **server-side** scripts. |
| `make lint:shared` | Lint **shared** scripts.      |
| `make lint:test`   | Lint **test** scripts.        |
| `make lint`        | Lint **all** scripts above.   |

##### Testing

First, edit `build/browsers.txt` (it is ignored in `.gitignore`) for your system if required.

**NOTE:** no empty line at the end.

| Command                 | Description                   | Example                 |
| ----------------------- | ----------------------------- | ----------------------- |
| `make mocha`            | Run Mocha.                    | `make mocha`            |
| `make karma`            | Run Karma.                    | `make karma`            |
| `make karma--no-colors` | Run Karma with `--no-colors`. | `make karma--no-colors` |

##### Building Client JavaScript

| Command                                | Example                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `build/script <script> <output>`       | `build/script static/home/scripts/index.js public/home/scripts/index.js`       |
| `build/script <script> <output> --min` | `build/script static/home/scripts/index.js public/home/scripts/index.js --min` |

##### Building Style Sheets

| Command                                | Example                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| `build/style <style> <output>`       | `build/style static/home/styles/index.scss public/home/styles/index.css`       |
| `build/style <style> <output> --min` | `build/style static/home/styles/index.scss public/home/styles/index.css --min` |

##### Before Committing

* `npm run prepublish`

**Source maps should not be on production!**

### License

Released under the [GPL-3.0](LICENSE) license.
