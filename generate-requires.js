const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/app');
const suffixes = [
  '_controller.js',
  '_service.js',
  '_directive.js',
  '_filter.js'
];

let content = '';

function walkSync(dir, baseRequirePath) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkSync(fullPath, baseRequirePath + '/' + file);
    } else {
      suffixes.forEach(suffix => {
        if (file.endsWith(suffix)) {
          content += `require('./${baseRequirePath}/${file}');\n`;
        }
      });
    }
  });
}

walkSync(baseDir, '.');

fs.writeFileSync(path.join(baseDir, 'auto_require.js'), content);
console.log('auto_require.js 생성 완료'); 