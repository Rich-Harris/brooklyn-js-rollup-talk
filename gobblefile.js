var gobble = require( 'gobble' );

module.exports = gobble([

	gobble( 'src/files' ),

	gobble( 'src/app' )
		.transform( 'ractive', { type: 'es6' })
		.transform( 'rollup-babel', {
			entry: 'index.js',
			format: 'cjs',
			external: [ 'ractive', 'eases' ]
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
