const express = require('express');
const model = require('../models/cashOperation.model');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try { res.json(await model.getAll()); }
    catch (error) { res.status(500).json({ error: error.message }); }
});
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await model.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Операция не найдена' });
        res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { operationDate, amount, purpose, operationTypeId, cashboxId, counterpartyId, createdBy } = req.body;
        const id = await model.create(operationDate, amount, purpose, operationTypeId, cashboxId, counterpartyId, createdBy);
        res.status(201).json({ operation_id: id });
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { operationDate, amount, purpose, operationTypeId, cashboxId, counterpartyId, createdBy } = req.body;
        await model.update(req.params.id, operationDate, amount, purpose, operationTypeId, cashboxId, counterpartyId, createdBy);
        res.json({ message: 'Кассовая операция обновлена' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await model.remove(req.params.id);
        res.json({ message: 'Кассовая операция удалена' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;
