var gobble = require( 'gobble' );

module.exports = gobble([

	gobble( 'src/files' ),
	gobble( 'node_modules/acorn/dist/acorn.js' ),

	gobble( 'src/app' )
		.transform( 'ractive', { type: 'es6' })
		.transform( 'rollup-babel', {
			entry: 'index.js',
			format: 'cjs',
			external: [
				'ractive',
				'eases',
				'jshint',
				'codemirror',
				'codemirror/keymap/sublime',
				'codemirror/addon/search/searchcursor',
				'codemirror/mode/javascript/javascript'
			]
		})
		.transform( 'derequire' )
		.transform( 'browserify', {
			entries: [ './index' ],
			dest: 'app.js',
			standalone: 'App'
		}),

	gobble( 'src/styles' )
		.transform( 'sass', {
			src: 'main.scss',
			dest: 'main.css'
		})
]);
