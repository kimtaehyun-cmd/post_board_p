const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/postsRoutes'); // 게시글 등록 관련 라우트
const getRoutes = require('./routes/getRoutes'); // 게시글 조회 관련 라우트
const updateRoutes = require('./routes/updateRoutes'); // 게시글 조회 관련 라우트

const app = express(); // Express 애플리케이션 생성
const PORT = 5000;

// JSON 요청 데이터를 처리하기 위한 미들웨어 설정
app.use(bodyParser.json());

// 라우트를 등록하여 엔드포인트를 정의
app.use('/api/posts', postsRoutes); // 게시글 등록 (POST /api/posts)
app.use('/api/posts', getRoutes); // 게시글 조회 (GET /api/posts)
app.use('/api/posts', updateRoutes); // 게시글 수정 (UPDATE /api/posts)

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
