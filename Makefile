BROWSERS := $(subst \n, ,$(shell cat config/browsers.txt))
SCRIPTS  := \
  play/scripts/index.js
STYLES   := \
  play/styles/index.scss
STATIC   := static
PUBLIC   := public

lint\:server:
	@node_modules/.bin/eslint . $(ESLINT)

lint\:static:
	@cd static && ../node_modules/.bin/eslint . $(ESLINT)

lint\:shared:
	@cd shared && ../node_modules/.bin/eslint . $(ESLINT)

lint\:test:
	@cd test && ../node_modules/.bin/eslint . $(ESLINT)

lint: lint\:server lint\:static lint\:shared lint\:test

mocha:
	node_modules/.bin/mocha -r test/internal/register `find test -name '*.test.js'` $(MOCHA)

karma:
	$(BROWSERS) node_modules/.bin/karma start $(KARMA)

$(SCRIPTS):
	@build/script $(STATIC)/$@ $(PUBLIC)/$@ --min

scripts: $(SCRIPTS)

$(STYLES):
	@build/style $(STATIC)/$@ $(PUBLIC)/$(subst .scss,.css,$@) --min

styles: $(STYLES)

docs:
	@node_modules/.bin/jsdoc -c .jsdoc.json

coverage:
	@cat coverage/lcov.info | $(subst \n, ,$(shell cat config/coveralls.txt)) node_modules/.bin/coveralls

prepublish:
	@if [ "$(NODE_ENV)" = 'production' ]; then                                                          \
		make --no-print-directory --always-make lint mocha scripts styles;                                \
	else                                                                                                \
		KARMA='--no-colors' make --no-print-directory --always-make lint mocha karma scripts styles docs; \
	fi

clean:
	@rm -rf docs coverage public/*
