lint:
	                   node_modules/.bin/eslint . && \
	cd      test && ../node_modules/.bin/eslint . && \
	cd ../static && ../node_modules/.bin/eslint .

mocha:
	node_modules/.bin/mocha -r test/internal/register `find test -name '.test.js'`

docs:
	node_modules/.bin/jsdoc -c .jsdoc.js

script\:%:
	node_modules/.bin/browserify -o public/scripts/$* static/$* -d

script\:%--min:
	node_modules/.bin/uglifyjs -mco public/scripts/$* public/scripts/$*
