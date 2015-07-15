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
			{ used: 6, unused: 12 },
			{ used: 8, unused: 3 },
			{ used: 3, unused: 16 },
			{ used: 4, unused: 10 },
			{ used: 5, unused: 3 }
		]
	}
};

export default function generateBundle ({ cruft }) {
	function sum ( prev, curr ) {
		return prev + ( curr.used + curr.unused + cruft );
	}

	const appModules = bundleTemplate.app.modules.map( ({ used, unused = 0 }) => {
		return { used, unused, cruft, total: used + unused + cruft };
	});

	const appSize = appModules.reduce( sum, 0 );

	const libModules = bundleTemplate.lib.modules.map( ({ used, unused = 0 }) => {
		return { used, unused, cruft, total: used + unused + cruft };
	});

	const libSize = libModules.reduce( sum, 0 );

	return {
		app: {
			modules: appModules,
			size: appSize
		},
		lib: {
			modules: libModules,
			size: libSize
		},
		size: appSize + libSize
	};
}
