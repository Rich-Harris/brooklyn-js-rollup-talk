rollup -i renderScene.js -o ../../../files/renderScene.js -f iife -n renderScene
uglifyjs -c -m -o ../../../files/renderScene.min.js -- ../../../files/renderScene.js
gzip -9 -c ../../../files/renderScene.min.js > ../../../files/renderScene.min.js.gz
