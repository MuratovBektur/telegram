import fs from 'fs';
import getPath from '../dist/lib/get-path.js';

const pathConstructor = getPath(import.meta.url)

const pathToPackage = pathConstructor (['..', 'package.json'])
let pathCurrentPackage = pathConstructor(['.', 'package.json'])

let packageJson = fs.readFileSync(pathToPackage, 'utf8')
let currentPackage = fs.readFileSync(pathCurrentPackage, 'utf8')
packageJson = JSON.parse(packageJson);
currentPackage = JSON.parse(currentPackage);

let devDependencies = packageJson.devDependencies
let currentDevDependencies = currentPackage.devDependencies || {}

const types = {}
for (let packageName in devDependencies) {
  if (packageName.startsWith('@types/')) {
    types[packageName] = devDependencies[packageName]
  }
}
for (let packageName in types) {
  if (types[packageName] && currentDevDependencies[packageName] !== types[packageName] ) {
    currentDevDependencies[packageName] = types[packageName]
  }
}

if (currentDevDependencies) {
  currentPackage.devDependencies = currentDevDependencies
  fs.writeFileSync(pathCurrentPackage, JSON.stringify(currentPackage, null, 2))
}