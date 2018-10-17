# FlappyShape

[![Coverage Status](https://coveralls.io/repos/github/tikhiy/flappyshape/badge.svg)](https://coveralls.io/github/tikhiy/flappyshape)

The FlappyShape Game.

### Development

##### Linting

* `make lint:static`
* `make lint:core`
* `make lint:test`

##### Testing

* First, edit `build/browsers.txt` (it is ignored in `.gitignore`) for your system
* `make mocha`
* `make karma`

##### Before Committing

* `rm -rf docs coverage public/scripts/* && npm run prepublish`

### License

Released under the [GPL-3.0](LICENSE) license.
