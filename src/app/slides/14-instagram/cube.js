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
	const renderer = new WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( el.offsetWidth, el.offsetHeight );
	el.appendChild( renderer.domElement );

	const camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;

	const scene = new Scene();

	const geometry = new BoxGeometry( 300, 300, 300 );

	const texture = ImageUtils.loadTexture( 'images/brooklynjs.png' );
	texture.minFilter = LinearFilter;
	//texture.anisotropy = renderer.getMaxAnisotropy();

	const material = new MeshBasicMaterial({ map: texture });
	//const material = new MeshBasicMaterial({ color: 0xff0000 });

	const mesh = new Mesh( geometry, material );
	scene.add( mesh );

	function onWindowResize () {
		camera.aspect = el.offsetWidth / el.offsetHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( el.offsetWidth, el.offsetHeight );
	}

	window.addEventListener( 'resize', onWindowResize, false );

	let animating = true;
	function animate () {
		if ( animating ) requestAnimationFrame( animate );

		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.01;

		renderer.render( scene, camera );
	}

	animate();

	return {
		teardown () {
			animating = false;
			window.removeEventListener( 'resize', onWindowResize, false );

			setTimeout( () => {
				el.removeChild( renderer.domElement );
			}, 4000 );
		}
	};
}
