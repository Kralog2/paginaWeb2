const pool = require('../config/db');

exports.getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}
exports.findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}
exports.update = async (id, name, email) => {
    return await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
}
exports.delete = async (id) => {
    return await pool.query('DELETE FROM users WHERE id = ?', [id]);
}
exports.findByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};
exports.create = async ({ name, email, password, role }) => {
  return pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
};
exports.searchByNameOrEmail = async (search) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE name LIKE ? OR email LIKE ?',
        [`%${search}%`, `%${search}%`]
    );
    return rows;
};

exports.filterByRole = async (role) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE role = ?', [role]);
    return rows;
};

