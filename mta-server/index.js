var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

request({
 	method: 'GET',
	url: 'http://datamine.mta.info/mta_esi.php?key=eafabd66862acbc30b71b6aa6fa6ba92&feed_id=1',
	encoding: null
}, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
		require( 'fs' ).writeFileSync( require( 'path' ).join( __dirname, 'example.json' ), JSON.stringify( feed ) );
		// feed.entity.forEach(function(entity) {
		// 	if (entity.trip_update) {
		// 		console.log(entity.trip_update);
		// 	}
		// });
	}
});
