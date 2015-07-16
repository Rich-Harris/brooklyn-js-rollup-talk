import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Geometry,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	ImageUtils,
	LinearFilter,
	Object3D,
	FogExp2,
	Vector3,
	PointCloud,
	PointCloudMaterial,
	AdditiveBlending
} from 'three-jsnext';

export default function ( el ) {
	var renderer = new WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( el.offsetWidth, el.offsetHeight );
	el.appendChild( renderer.domElement );

	var camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.z = 400;

	var scene = new Scene();
	scene.fog = new FogExp2( 0x000000, 0.0008 );

	// particles
	var particlesGeometry = new Geometry();

	var j = ImageUtils.loadTexture( "images/j.png" );
	var s = ImageUtils.loadTexture( "images/s.png" );

	for ( var i = 0; i < 4000; i ++ ) {
		var vertex = new Vector3();
		vertex.x = Math.random() * 4000 - 2000;
		vertex.y = Math.random() * 4000 - 2000;
		vertex.z = Math.random() * 4000 - 2000;

		particlesGeometry.vertices.push( vertex );
	}

	var parameters = [
		[ [1, 0.2, 0.5], j, 20 ],
		[ [1, 0.2, 0.5], s, 20 ]
	];

	var particles = [ j, s ].map( function ( sprite ) {
		var material = new PointCloudMaterial({
			size: 30,
			map: sprite,
			depthTest: true,
			transparent: true
		});

		var particles = new PointCloud( particlesGeometry, material );
		particles.position.z = -1500;

		scene.add( particles );

		return particles;
	});


	// box
	var geometry = new BoxGeometry( 300, 300, 300 );

	var texture = ImageUtils.loadTexture( 'images/texture.jpg' );
	texture.minFilter = LinearFilter;

	var material = new MeshBasicMaterial({
		color: 0xffffff,
		map: texture
	});

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

		particles[0].rotation.x += 0.002;
		particles[0].rotation.y += 0.001;

		particles[1].rotation.x += 0.003;
		particles[1].rotation.y += 0.001;

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
