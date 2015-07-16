import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	ImageUtils,
	LinearFilter
} from 'three-jsnext';

export default function ( el ) {
	var renderer = new WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( el.offsetWidth, el.offsetHeight );
	el.appendChild( renderer.domElement );

	var camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;

	var scene = new Scene();

	var geometry = new BoxGeometry( 300, 300, 300 );

	var texture = ImageUtils.loadTexture( 'images/texture.jpg' );
	texture.minFilter = LinearFilter;

	var material = new MeshBasicMaterial({ map: texture });

	var mesh = new Mesh( geometry, material );
	scene.add( mesh );

	function onWindowResize () {
		camera.aspect = el.offsetWidth / el.offsetHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( el.offsetWidth, el.offsetHeight );
	}

	window.addEventListener( 'resize', onWindowResize, false );

	var animating = true;
	function animate () {
		if ( animating ) requestAnimationFrame( animate );

		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.01;

		renderer.render( scene, camera );
	}

	animate();

	return {
		teardown: function () {
			animating = false;
			window.removeEventListener( 'resize', onWindowResize, false );

			setTimeout( function () {
				el.removeChild( renderer.domElement );
			}, 4000 );
		}
	};
}
