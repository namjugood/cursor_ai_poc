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

// src/app 하위 모든 디렉토리 재귀적으로 탐색
function findFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 디렉토리면 재귀 호출
      findFiles(filePath);
    } else {
      // 파일이면 suffix 체크
      suffixes.forEach(suffix => {
        if (file.endsWith(suffix)) {
          // baseDir 기준 상대 경로 생성
          const relativePath = path.relative(baseDir, filePath);
          content += `require('./${relativePath.replace(/\\/g, '/')}');\n`;
        }
      });
    }
  });
}

findFiles(baseDir);

fs.writeFileSync(path.join(baseDir, 'auto_require.js'), content);
console.log('auto_require.js 생성 완료');