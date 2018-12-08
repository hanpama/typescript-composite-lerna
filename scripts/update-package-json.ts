import * as fs from 'fs';
import * as path from 'path';

const packagesRoot = path.join(__dirname, '..', 'packages');

const packages = fs.readdirSync(packagesRoot).filter(
  item => (fs.lstatSync(path.join(packagesRoot, item)).isDirectory())
);

packages.forEach(packageName => {
  const packageJSONPath = path.join(packagesRoot, packageName, 'package.json');
  // const tsconfigPath = path.join(packagesRoot, packageName, 'tsconfig.json');

  const packageJSONData = JSON.parse(fs.readFileSync(packageJSONPath).toString());
  delete packageJSONData.scripts;
  packageJSONData.main = './lib/index.js';
  packageJSONData.types = './lib/index.d.ts';
  packageJSONData.files = ['lib', 'src'];
  packageJSONData.scripts = {
    'build': 'tsc -b ./tsconfig.package.json',
    'prepublish': 'npm run build',
  };
  packageJSONData.publishConfig = {
    access: 'public',
  };
  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSONData, null, '  '));
});
