import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'svelteuser',
  password: 'password123',
  database: 'sveltekit_demo'
});

export { db };

// Db files will be split out only for readability