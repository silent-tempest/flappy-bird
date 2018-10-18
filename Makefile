COVERALLS := $(shell cat build/coveralls.txt)
BROWSERS  := $(shell cat build/browsers.txt)

lint\:static:
	@cd static && ../node_modules/.bin/eslint .

lint\:test:
	@cd test && ../node_modules/.bin/eslint .

lint\:core:
	@node_modules/.bin/eslint .

mocha:
	@if [ "$(REPORTER)" = 'mocha' ]; then                                                                     \
		node_modules/.bin/mocha -r test/internal/register `find test -name '*.test.js'` --reporter spec;        \
	elif [ "$(REPORTER)" ]; then                                                                              \
		node_modules/.bin/mocha -r test/internal/register `find test -name '*.test.js'` --reporter $(REPORTER); \
	else                                                                                                      \
		node_modules/.bin/mocha -r test/internal/register `find test -name '*.test.js'`;                        \
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

docs:
	@node_modules/.bin/jsdoc -c .jsdoc.json

script\:%:
	@node_modules/.bin/browserify -o public/scripts/$* static/$* -x platform -x qs -d

script\:%--min:
	@node_modules/.bin/uglifyjs -mco public/scripts/$* public/scripts/$*

coveralls:
	@cat coverage/lcov.info | $(COVERALLS) node_modules/.bin/coveralls
