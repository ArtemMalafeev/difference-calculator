install:
	npm ci
	npm link

publish:
	npm publish --dru-run

lint:
	npx eslint .