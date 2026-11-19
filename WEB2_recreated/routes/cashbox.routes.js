const express = require('express');
const cashboxModel = require('../models/cashbox.model');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try { res.json(await cashboxModel.getAll()); }
    catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await cashboxModel.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Касса не найдена' });
        res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { cashboxName, currentBalance, responsibleUserId } = req.body;
        const id = await cashboxModel.create(cashboxName, currentBalance, responsibleUserId);
        res.status(201).json({ cashbox_id: id, cashboxName, currentBalance, responsibleUserId });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { cashboxName, currentBalance, responsibleUserId } = req.body;
        await cashboxModel.update(req.params.id, cashboxName, currentBalance, responsibleUserId);
        res.json({ message: 'Касса обновлена' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await cashboxModel.remove(req.params.id);
        res.json({ message: 'Касса удалена' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;
