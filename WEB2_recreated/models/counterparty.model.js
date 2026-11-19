const { getDb } = require('../db');

const create = async (name) => {
    const db = getDb();
    const result = await db.run(`INSERT INTO counterparty (name) VALUES (?)`, name);
    return result.lastID;
};

const getAll = async () => {
    const db = getDb();
    return await db.all(`SELECT * FROM counterparty`);
};

const getById = async (id) => {
    const db = getDb();
    return await db.get(`SELECT * FROM counterparty WHERE counterparty_id = ?`, id);
};

const update = async (id, name) => {
    const db = getDb();
    await db.run(`UPDATE counterparty SET name = ? WHERE counterparty_id = ?`, name, id);
};

const remove = async (id) => {
    const db = getDb();
    await db.run(`DELETE FROM counterparty WHERE counterparty_id = ?`, id);
};

module.exports = { create, getAll, getById, update, remove };
