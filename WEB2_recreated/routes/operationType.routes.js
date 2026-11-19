const express = require('express');
const model = require('../models/operationType.model');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try { res.json(await model.getAll()); }
    catch (error) { res.status(500).json({ error: error.message }); }
});
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await model.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Тип операции не найден' });
        res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.post('/', authMiddleware, async (req, res) => {
    try {
        const id = await model.create(req.body.typeName);
        res.status(201).json({ operation_type_id: id, typeName: req.body.typeName });
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        await model.update(req.params.id, req.body.typeName);
        res.json({ message: 'Тип операции обновлён' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await model.remove(req.params.id);
        res.json({ message: 'Тип операции удалён' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;
