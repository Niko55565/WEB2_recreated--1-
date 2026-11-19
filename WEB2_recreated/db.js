const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

const initDb = async () => {
    if (!db) {
        db = await open({
            filename: 'database.db',
            driver: sqlite3.Database
        });
    }

    await db.exec('PRAGMA foreign_keys = ON;');

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            login TEXT NOT NULL UNIQUE,
            password_hash TEXT
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS cashbox (
            cashbox_id INTEGER PRIMARY KEY AUTOINCREMENT,
            cashbox_name TEXT NOT NULL,
            current_balance REAL NOT NULL DEFAULT 0,
            responsible_user_id INTEGER NOT NULL,
            FOREIGN KEY (responsible_user_id)
                REFERENCES users(user_id)
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS operation_type (
            operation_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
            type_name TEXT NOT NULL
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS counterparty (
            counterparty_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS cash_operation (
            operation_id INTEGER PRIMARY KEY AUTOINCREMENT,
            operation_date TEXT NOT NULL,
            amount REAL NOT NULL,
            purpose TEXT,
            operation_type_id INTEGER NOT NULL,
            cashbox_id INTEGER NOT NULL,
            counterparty_id INTEGER NOT NULL,
            created_by INTEGER NOT NULL,
            FOREIGN KEY (operation_type_id)
                REFERENCES operation_type(operation_type_id),
            FOREIGN KEY (cashbox_id)
                REFERENCES cashbox(cashbox_id),
            FOREIGN KEY (counterparty_id)
                REFERENCES counterparty(counterparty_id),
            FOREIGN KEY (created_by)
                REFERENCES users(user_id)
        )
    `);

    // Совместимость со старой базой, где password_hash мог отсутствовать.
    const columns = await db.all('PRAGMA table_info(users)');
    const hasPassword = columns.some(column => column.name === 'password_hash');
    if (!hasPassword) {
        await db.exec('ALTER TABLE users ADD COLUMN password_hash TEXT');
    }
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
};
