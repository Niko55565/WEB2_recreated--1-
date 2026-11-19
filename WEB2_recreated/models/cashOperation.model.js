const { getDb } = require('../db');

const create = async (
    operationDate,
    amount,
    purpose,
    operationTypeId,
    cashboxId,
    counterpartyId,
    createdBy
) => {
    const db = getDb();
    const result = await db.run(
        `INSERT INTO cash_operation (
            operation_date, amount, purpose, operation_type_id,
            cashbox_id, counterparty_id, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        operationDate,
        amount,
        purpose,
        operationTypeId,
        cashboxId,
        counterpartyId,
        createdBy
    );
    return result.lastID;
};

const getAll = async () => {
    const db = getDb();
    return await db.all(`SELECT * FROM cash_operation`);
};

const getById = async (id) => {
    const db = getDb();
    return await db.get(`SELECT * FROM cash_operation WHERE operation_id = ?`, id);
};

const update = async (
    id,
    operationDate,
    amount,
    purpose,
    operationTypeId,
    cashboxId,
    counterpartyId,
    createdBy
) => {
    const db = getDb();
    await db.run(
        `UPDATE cash_operation
         SET operation_date = ?, amount = ?, purpose = ?, operation_type_id = ?,
             cashbox_id = ?, counterparty_id = ?, created_by = ?
         WHERE operation_id = ?`,
        operationDate,
        amount,
        purpose,
        operationTypeId,
        cashboxId,
        counterpartyId,
        createdBy,
        id
    );
};

const remove = async (id) => {
    const db = getDb();
    await db.run(`DELETE FROM cash_operation WHERE operation_id = ?`, id);
};

module.exports = { create, getAll, getById, update, remove };
