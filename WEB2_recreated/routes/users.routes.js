const express = require('express');
const usersModel = require('../models/users.model');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        res.json(await usersModel.getAll());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await usersModel.getById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { fullName, login } = req.body;
        await usersModel.update(req.params.id, fullName, login);
        res.json({ message: 'Пользователь обновлён' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await usersModel.remove(req.params.id);
        res.json({ message: 'Пользователь удалён' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
