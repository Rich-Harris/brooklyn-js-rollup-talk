browserify cjs/main.js > browserify.js --standalone=app
webpack cjs/main.js webpack.js --output-library-target=umd
esperanto -b -t umd -o esperanto.js -i es6/main.js -n app
