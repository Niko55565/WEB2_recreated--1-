const express = require('express');
const model = require('../models/counterparty.model');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try { res.json(await model.getAll()); }
    catch (error) { res.status(500).json({ error: error.message }); }
});
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await model.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Контрагент не найден' });
        res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.post('/', authMiddleware, async (req, res) => {
    try {
        const id = await model.create(req.body.name);
        res.status(201).json({ counterparty_id: id, name: req.body.name });
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        await model.update(req.params.id, req.body.name);
        res.json({ message: 'Контрагент обновлён' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await model.remove(req.params.id);
        res.json({ message: 'Контрагент удалён' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;
