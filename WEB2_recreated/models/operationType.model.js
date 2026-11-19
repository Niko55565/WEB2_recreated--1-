const { getDb } = require('../db');

const create = async (typeName) => {
    const db = getDb();
    const result = await db.run(`INSERT INTO operation_type (type_name) VALUES (?)`, typeName);
    return result.lastID;
};

const getAll = async () => {
    const db = getDb();
    return await db.all(`SELECT * FROM operation_type`);
};

const getById = async (id) => {
    const db = getDb();
    return await db.get(`SELECT * FROM operation_type WHERE operation_type_id = ?`, id);
};

const update = async (id, typeName) => {
    const db = getDb();
    await db.run(`UPDATE operation_type SET type_name = ? WHERE operation_type_id = ?`, typeName, id);
};

const remove = async (id) => {
    const db = getDb();
    await db.run(`DELETE FROM operation_type WHERE operation_type_id = ?`, id);
};

module.exports = { create, getAll, getById, update, remove };
