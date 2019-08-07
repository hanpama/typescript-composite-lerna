import { Foobar } from 'typescript-composite-lerna-bar';

function main() {
  console.log(Foobar() + 'baz');
}

if (process.mainModule === module) {
  main();
}