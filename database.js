const Database = require('better-sqlite3');
const db = new Database('./videos.db');

function getAllRows() {
  const statement = db.prepare('SELECT * FROM testing');
  const rows = statement.all();
  return rows;
}

module.exports = { getAllRows };