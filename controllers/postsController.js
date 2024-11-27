const db = require('../db/database');

// 게시글 생성 함수입니다. HTTP 요청(req)와 응답(res)을 처리.
const createPost = async (req, res) => {
  // 요청(req.body)에서 클라이언트가 보낸 제목(title)과 내용(content)을 추출.
  const { title, content } = req.body;

  // 제목과 내용이 제공되지 않았을 경우, 클라이언트에 400 Bad Request 에러를 반환.
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
    // "제목과 내용이 필요합니다"라는 메시지를 JSON 형태로 반환.
  }

  try {
    // 데이터베이스에 게시글을 삽입하는 SQL 쿼리를 실행.
    // $1과 $2는 변수 바인딩 자리로, 배열 [title, content]의 값이 채워짐.
    const result = await db.query(
      'INSERT INTO posts (title, content, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [title, content]
    );
    // 'RETURNING *'는 삽입된 행의 모든 데이터를 반환.

    // 게시글이 성공적으로 생성되었을 경우, 201 Created 상태 코드와 함께 성공 메시지를 반환.
    // 반환되는 데이터는 삽입된 게시글의 모든 정보(result.rows[0]).
    return res.status(200).json({
      message: '게시글 등록 성공', // 성공 메시지
      post: result.rows[0], // 삽입된 게시글 데이터
    });
  } catch (error) {
    // 데이터베이스 쿼리 실행 중 에러가 발생했을 경우, 콘솔에 에러를 출력.
    console.error(error);
    // 500 Internal Server Error 상태 코드와 에러 메시지를 클라이언트에 반환.
    return res.status(500).json({ error: 'Failed to create post' });
    // "게시글 생성 실패"라는 메시지를 반환.
  }
};

// 게시글 전체 조회 함수
const getAllPosts = async (req, res) => {
  try {
    // 데이터베이스에서 모든 게시글 데이터를 가져오는 SQL 쿼리
    const result = await db.query(
      'SELECT id, title, content, created_at, updated_at FROM posts ORDER BY created_at DESC'
    );
    // 결과를 클라이언트에 반환.
    return res.status(200).json({
      message: '전체 게시글 조회 성공', // 성공 메시지
      posts: result.rows, // 모든 게시글 데이터 배열
    });
  } catch (error) {
    // 데이터베이스 쿼리 실행 중 에러가 발생했을 경우 처리
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

// 단일 게시글 조회 함수
const getPostById = async (req, res) => {
  const { id } = req.params; // URL에서 게시글 ID를 가져오기.

  try {
    // 데이터베이스에서 해당 ID의 게시글을 조회하는 SQL 쿼리 실행
    const result = await db.query(
      'SELECT id, title, content, created_at, updated_at FROM posts WHERE id = $1',
      [id]
    );

    // 게시글이 없을 경우 404 Not Found 응답
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // 게시글이 존재하면 클라이언트에 반환
    return res.status(200).json({
      message: '단일 게시글 조회 성공', // 성공 메시지
      post: result.rows[0],
    });
  } catch (error) {
    // 데이터베이스 에러 처리
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve post' });
  }
};

// 게시글 수정 함수
const updatePost = async (req, res) => {
  const { id } = req.params; // URL에서 게시글 ID를 가져옵니다.
  const { title, content } = req.body; // 요청 본문에서 제목과 내용을 가져옵니다.

  // 제목과 내용이 없는 경우 400 Bad Request 응답
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    // 데이터베이스에서 해당 ID의 게시글을 수정하는 SQL 쿼리 실행
    const result = await db.query(
      'UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [title, content, id]
    );

    // 게시글이 없을 경우 404 Not Found 응답
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // 게시글이 성공적으로 수정되었을 경우 200 OK 응답
    return res.status(200).json({
      message: '게시글 수정 완료',
      post: result.rows[0],
    });
  } catch (error) {
    // 데이터베이스 에러 처리
    console.error(error);
    return res.status(500).json({ error: 'Failed to update post' });
  }
};

// 기존의 createPost 함수와 함께 내보냄.
module.exports = { createPost, getAllPosts, getPostById, updatePost };
