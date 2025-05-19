const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공 (build 폴더)
app.use(express.static(path.join(__dirname, '../build')));

// API 라우트
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// SPA 라우팅 처리 (정적 파일 서비스 이후, 항상 마지막에 추가)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 