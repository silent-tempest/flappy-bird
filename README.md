# flappyshape

[![Coverage Status](https://coveralls.io/repos/github/tikhiy/flappyshape/badge.svg)](https://coveralls.io/github/tikhiy/flappyshape)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](LICENSE)

The FlappyShape.

### Development

##### Linting

| Command            | Example                           |
| ------------------ | --------------------------------- |
| `make lint:server` | `ESLINT='--fix' make lint:server` |
| `make lint:static` | `ESLINT='--fix' make lint:static` |
| `make lint:shared` | `ESLINT='--fix' make lint:shared` |
| `make lint:test`   | `ESLINT='--fix' make lint:test`   |
| `make lint`        | `ESLINT='--fix' make lint`        |

##### Testing

First, edit `build/browsers.txt` (it is ignored in `.gitignore`) for your system if required.

| Command      | Example                                |
| ------------ | -------------------------------------- |
| `make mocha` | `MOCHA='--reporter=spec' make mocha`   |
| `make karma` | `KARMA='--reporters=mocha' make karma` |

##### Building Client JavaScript

| Command                                  | Description            | Example                                                                                                                                                     |
| ---------------------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `build/script <script> <output> [--min]` | This command will make | | Number | Example                                                                  | |
|                                          | a static script.       | | ------ | ------------------------------------------------------------------------ | |
|                                          |                        | | 1      | `build/script static/play/scripts/index.js public/play/scripts/index.js` | |

|| *Year* || *Temperature (low)* || *Temperature (high)* ||
||   1900 ||                 -10 ||                   25 ||
||   1910 ||                 -15 ||                   30 ||
||   1920 ||                 -10 ||                   32 ||

###### `build/script <script> <output> [--min]` Command

This command will make a static script. Examples:

* `build/script static/play/scripts/index.js public/play/scripts/index.js`
* `build/script static/play/scripts/index.js public/play/scripts/index.js --min`

###### `make scripts` Command

This command will make all scripts specified in `config/scripts.txt`.

##### Building Style Sheets

###### `build/style <style> <output> [--min]` Command

This command will make a static script. Examples:

* `build/style static/play/styles/index.scss public/play/styles/index.css`
* `build/style static/play/styles/index.scss public/play/styles/index.css --min`

###### `make styles` Command

This command will make all stylesheets specified in `config/styles.txt`.

##### Before Committing

* `npm run prepublish`

##### What To Commit

* No `docs`!
* No `config/browsers.txt`!
* No `config/coveralls.txt`!
* No `temp`!

### License

Released under the [GPL-3.0](LICENSE) license.
