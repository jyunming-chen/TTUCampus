const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, '../dist/bundle.css');

fs.writeFileSync(
  filename,
  fs.readFileSync(filename, 'utf8').replace(/\.\.\/fonts/g, './fonts'),
);
