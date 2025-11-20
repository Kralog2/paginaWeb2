const bcrypt = require('bcrypt');
const db = require('./src/config/db');

async function createAdmin() {
  const name = 'Admin User';
  const email = 'admin@admin.com';
  const password = 'admin123!';
  const role = 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );
  console.log(`Admin user created: ${email} / ${password}`);
  process.exit();
}

createAdmin();