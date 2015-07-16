rollup -i generate-voronoi.js -o generate-voronoi-bundle.js -f es6
uglifyjs -c -m -o generate-voronoi-bundle.min.js -- generate-voronoi-bundle.js
