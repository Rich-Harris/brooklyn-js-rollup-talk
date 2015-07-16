import { voronoi } from 'd3-jsnext';

export default function generateVoronoiLayout ( stops ) {
	const layout = voronoi( stops.map( ({ x, y }) => ([ x, y ]) ) );

	return layout.map( ( points, i ) => ({
		index: i,
		stop: stops[i],
		path: 'M' + points.join( 'L' ) + 'L' + points[0] + 'Z'
	}));
}
