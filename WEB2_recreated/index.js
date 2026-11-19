const express = require('express');
const cors = require('cors');
const { initDb } = require('./db');

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const cashboxRoutes = require('./routes/cashbox.routes');
const cashOperationRoutes = require('./routes/cashOperation.routes');
const counterpartyRoutes = require('./routes/counterparty.routes');
const operationTypeRoutes = require('./routes/operationType.routes');

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true
}));

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/cashboxes', cashboxRoutes);
app.use('/cash-operations', cashOperationRoutes);
app.use('/counterparties', counterpartyRoutes);
app.use('/operation-types', operationTypeRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ ok: true });
});

const port = process.env.PORT || 3001;

(async () => {
    await initDb();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})();
