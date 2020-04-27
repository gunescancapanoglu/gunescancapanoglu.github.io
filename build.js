const shelljs = require('shelljs');
if(process.argv[2] === "pre") shelljs.mv('dist/spa/.git', 'dist/.git');
else if(process.argv[2] === "after"){
  shelljs.mv('dist/.git', 'dist/spa/.git');
  shelljs.cp(['public/.*', 'public/*'], 'dist/spa');
}