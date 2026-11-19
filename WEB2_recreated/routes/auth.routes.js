const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'web2-secret-key';

router.post('/register', async (req, res) => {
    try {
        const { fullName, login, password } = req.body;

        if (!fullName || !login || !password) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const oldUser = await usersModel.getByLogin(login);
        if (oldUser) {
            return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const userId = await usersModel.create(fullName, login, passwordHash);

        res.status(201).json({ user_id: userId, fullName, login });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await usersModel.getByLogin(login);

        if (!user || !user.password_hash) {
            return res.status(401).json({ message: 'Неверный логин или пароль' });
        }

        const correctPassword = await bcrypt.compare(password, user.password_hash);
        if (!correctPassword) {
            return res.status(401).json({ message: 'Неверный логин или пароль' });
        }

        const token = jwt.sign(
            { userId: user.user_id, login: user.login },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                login: user.login
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
