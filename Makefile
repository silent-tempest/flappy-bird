script\:%:
	npm run lint && node_modules/.bin/browserify -o static/scripts/$* static_scripts/$*
script\:%--min:
	node_modules/.bin/uglifyjs -mco static/scripts/$* static/scripts/$*
