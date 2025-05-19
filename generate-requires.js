const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/app');
const types = [
  { dir: 'views', suffix: '_controller.js' },
  { dir: 'services', suffix: '_service.js' },
  { dir: 'directives', suffix: '_directive.js' },
  { dir: 'filters', suffix: '_filter.js' }
];

let content = '';

function walkSync(dir, suffix, baseRequirePath) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkSync(fullPath, suffix, baseRequirePath + '/' + file);
    } else if (file.endsWith(suffix)) {
      content += `require('./${baseRequirePath}/${file}');\n`;
    }
  });
}

types.forEach(type => {
  const dirPath = path.join(baseDir, type.dir);
  if (fs.existsSync(dirPath)) {
    walkSync(dirPath, type.suffix, type.dir);
  }
});

fs.writeFileSync(path.join(baseDir, 'auto_require.js'), content);
console.log('auto_require.js 생성 완료'); 