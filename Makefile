lint:
	                           node_modules/.bin/eslint . && \
	cd           test &&    ../node_modules/.bin/eslint . && \
	cd ../core/static && ../../node_modules/.bin/eslint .

test:
	node_modules/.bin/mocha -r chai/register-should

docs:
	node_modules/.bin/jsdoc . -c .jsdoc.js

script\:%:
	node_modules/.bin/browserify -o static/scripts/$* core/static/$*

script\:%--min:
	node_modules/.bin/uglifyjs -mco static/scripts/$* static/scripts/$*
