require('dotenv').config(); // dotenv 설정

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER, // DB 유저명
  host: process.env.DB_HOST, // DB 호스트
  database: process.env.DB_DATABASE, // DB 이름
  password: process.env.DB_PASSWORD, // DB 비밀번호
  port: process.env.DB_PORT, // 포트
});

const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = { query };
