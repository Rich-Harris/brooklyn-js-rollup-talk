const bundleTemplate = {
	app: {
		modules: [
			{ used: 15 },
			{ used: 18 },
			{ used: 14 },
			{ used: 15 },
			{ used: 12 }
		]
	},
	lib: {
		modules: [
			{ used: 15, unused: 17 },
			{ used: 8, unused: 3 },
			{ used: 6, unused: 26 },
			{ used: 7, unused: 15 },
			{ used: 5, unused: 20 }
		]
	}
};

export default function generateBundle ({ cruft, minifyFactor }) {
	function sum ( prev, curr ) {
		return prev + curr.total;
	}

	function sumMinified ( prev, curr ) {
		return prev + curr.minifiedTotal;
	}

	function createModule ({ used, unused = 0 }) {
		const minifiedUsed = used / minifyFactor;
		const minifiedUnused = unused / minifyFactor;

		return {
			used,
			unused,
			cruft,
			total: used + unused + cruft,
			minifiedUsed,
			minifiedUnused,
			minifiedTotal: minifiedUsed + minifiedUnused + cruft
		};
	}

	const appModules = bundleTemplate.app.modules.map( createModule );
	const appSize = appModules.reduce( sum, 0 );
	const appSizeMinified = appModules.reduce( sumMinified, 0 );

	const libModules = bundleTemplate.lib.modules.map( createModule );
	const libSize = libModules.reduce( sum, 0 );
	const libSizeMinified = libModules.reduce( sumMinified, 0 );

	return {
		app: {
			modules: appModules,
			size: appSize,
			sizeMinified: appSizeMinified
		},
		lib: {
			modules: libModules,
			size: libSize,
			sizeMinified: libSizeMinified
		},
		size: appSize + libSize,
		sizeMinified: appSizeMinified + libSizeMinified
	};
}
