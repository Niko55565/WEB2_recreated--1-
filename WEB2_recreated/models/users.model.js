const { getDb } = require('../db');

const create = async (fullName, login, passwordHash) => {
    const db = getDb();
    const result = await db.run(
        `INSERT INTO users (full_name, login, password_hash) VALUES (?, ?, ?)`,
        fullName,
        login,
        passwordHash
    );
    return result.lastID;
};

const getAll = async () => {
    const db = getDb();
    return await db.all(`SELECT user_id, full_name, login FROM users`);
};

const getById = async (id) => {
    const db = getDb();
    return await db.get(
        `SELECT user_id, full_name, login FROM users WHERE user_id = ?`,
        id
    );
};

const getByLogin = async (login) => {
    const db = getDb();
    return await db.get(`SELECT * FROM users WHERE login = ?`, login);
};

const update = async (id, fullName, login) => {
    const db = getDb();
    await db.run(
        `UPDATE users SET full_name = ?, login = ? WHERE user_id = ?`,
        fullName,
        login,
        id
    );
};

const remove = async (id) => {
    const db = getDb();
    await db.run(`DELETE FROM users WHERE user_id = ?`, id);
};

module.exports = { create, getAll, getById, getByLogin, update, remove };
