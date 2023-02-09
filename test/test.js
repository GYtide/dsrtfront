// const fs = require('fs');
// const path = require('path');

import fs from 'fs';;
import path from 'path';

function countLines(dir) {
  let count = 0;

  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      count += countLines(filePath);
    } else if (filePath.endsWith('.html')) {
      count += fs.readFileSync(filePath, 'utf-8').split('\n').length;
    }
  });

  return count;
}

console.log(`The number of lines of code in .html files is: ${countLines('.')}`);
