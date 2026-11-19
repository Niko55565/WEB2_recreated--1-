const { getDb } = require('../db');

const create = async (cashboxName, currentBalance, responsibleUserId) => {
    const db = getDb();
    const result = await db.run(
        `INSERT INTO cashbox (cashbox_name, current_balance, responsible_user_id)
         VALUES (?, ?, ?)`,
        cashboxName,
        currentBalance,
        responsibleUserId
    );
    return result.lastID;
};

const getAll = async () => {
    const db = getDb();
    return await db.all(`SELECT * FROM cashbox`);
};

const getById = async (id) => {
    const db = getDb();
    return await db.get(`SELECT * FROM cashbox WHERE cashbox_id = ?`, id);
};

const update = async (id, cashboxName, currentBalance, responsibleUserId) => {
    const db = getDb();
    await db.run(
        `UPDATE cashbox
         SET cashbox_name = ?, current_balance = ?, responsible_user_id = ?
         WHERE cashbox_id = ?`,
        cashboxName,
        currentBalance,
        responsibleUserId,
        id
    );
};

const remove = async (id) => {
    const db = getDb();
    await db.run(`DELETE FROM cashbox WHERE cashbox_id = ?`, id);
};

module.exports = { create, getAll, getById, update, remove };
