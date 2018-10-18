# FlappyShape

[![Coverage Status](https://coveralls.io/repos/github/tikhiy/flappyshape/badge.svg)](https://coveralls.io/github/tikhiy/flappyshape)

The FlappyShape Game.

### Development

##### Linting

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `make lint:static` | Lint **client-side** scripts. |
| `make lint:core`   | Lint **server-side** scripts. |
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

| Command                                | Example                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| `build/script <script> <output>`       | `build/script home/scripts/index.js home/index.js`       |
| `build/script <script> <output> --min` | `build/script home/scripts/index.js home/index.js --min` |

##### Before Committing

* `npm run prepublish`

**Source maps should not be on production!**

### License

Released under the [GPL-3.0](LICENSE) license.
