script\:%:
	node_modules/.bin/browserify -o static/scripts/$* core/static/$*
script\:%--min:
	node_modules/.bin/uglifyjs -mco static/scripts/$* static/scripts/$*
