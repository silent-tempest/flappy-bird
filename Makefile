COVERALLS := $(shell cat config/coveralls.txt 2>/dev/null)
BROWSERS  := $(shell cat config/browsers.txt  2>/dev/null)
SCRIPTS   := home/scripts/index.js
STYLES    := home/styles/index.scss
STATIC    := static
PUBLIC    := public

lint\:static:
	@cd static && ../node_modules/.bin/eslint .

lint\:server:
	@node_modules/.bin/eslint .

lint\:shared:
	@cd shared && ../node_modules/.bin/eslint .

lint\:test:
	@cd test && ../node_modules/.bin/eslint .

lint: lint\:static lint\:server lint\:test

mocha:
	@if [ "$(REPORTER)" = 'mocha' ]; then                                                                            \
		node_modules/.bin/mocha `find test -name '*.test.js'` --require test/internal/register --reporter spec;        \
	elif [ "$(REPORTER)" ]; then                                                                                     \
		node_modules/.bin/mocha `find test -name '*.test.js'` --require test/internal/register --reporter $(REPORTER); \
	else                                                                                                             \
		node_modules/.bin/mocha `find test -name '*.test.js'` --require test/internal/register;                        \
	fi

karma--no-colors:
	@if [ "$(REPORTER)" ]; then                                                      \
		$(BROWSERS) node_modules/.bin/karma start --no-colors --reporters $(REPORTER); \
	else                                                                             \
		$(BROWSERS) node_modules/.bin/karma start --no-colors;                         \
	fi

karma:
	@if [ "$(REPORTER)" ]; then                                          \
		$(BROWSERS) node_modules/.bin/karma start --reporters $(REPORTER); \
	else                                                                 \
		$(BROWSERS) node_modules/.bin/karma start;                         \
	fi

$(SCRIPTS):
	@build/script $(STATIC)/$@ $(PUBLIC)/$@ --min

scripts: $(SCRIPTS)

$(STYLES):
	@build/style $(STATIC)/$@ $(PUBLIC)/$(subst .scss,.css,$@) --min

styles: $(STYLES)

docs:
	@node_modules/.bin/jsdoc -c .jsdoc.json

coveralls:
	@cat coverage/lcov.info | $(COVERALLS) node_modules/.bin/coveralls

prepublish:
	@if [ "$(NODE_ENV)" = 'production' ]; then                                                 \
		make --no-print-directory --always-make lint mocha scripts styles;                       \
	else                                                                                       \
		make --no-print-directory --always-make lint mocha karma--no-colors scripts styles docs; \
	fi

clean:
	@rm -rf docs coverage public/*
