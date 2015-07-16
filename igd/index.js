console.log( 'running instagram daemon' );

var request = require( 'request' );
var fs = require( 'fs' );
var path = require( 'path' );

var dest = path.join( __dirname, '../src/files/images/texture.jpg' );
var backup = path.join( __dirname, 'backup.jpg' );

function poll () {
	console.log( 'polling instagram.com' );

	request({
	 	method: 'GET',
		url: 'http://instagram.com/richard.a.harris/',
		encoding: 'utf-8'
	}, function (error, response, body) {
		var sharedDataRaw = /_sharedData = (.+?);<\/script/.exec( body );

		if ( sharedDataRaw ) {
			var data = eval( '(' + sharedDataRaw[1] + ')' );
			var mostRecent = data.entry_data.ProfilePage[0].user.media.nodes[0].display_src;
			console.log( 'mostRecent', mostRecent );

			if ( mostRecent ) {
				console.log( 'fetching most recent image' );

				request({
					method: 'GET',
					url: mostRecent,
					encoding: null
				}, function ( err, response, body ) {
					fs.writeFileSync( dest, body );
					console.log( 'wrote image to %s', dest );
				});
			}
		}
	});
}

// copy backup texture
fs.writeFileSync( dest, fs.readFileSync( backup ) );

// start polling instagram
poll();
setInterval( poll, 1000 * 60 );
