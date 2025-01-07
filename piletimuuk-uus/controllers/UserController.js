const { User } = require('../models');

module.exports = {
    // CREATE
    async create(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // READ - GetAll
    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // READ - GetById
    async getById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // UPDATE
    async update(req, res) {
        try {
            const [updated] = await User.update(req.body, { where: { id: req.params.id } });
            if (!updated) return res.status(404).json({ error: 'User not found' });
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // DELETE
    async delete(req, res) {
        try {
            const deleted = await User.destroy({ where: { id: req.params.id } });
            if (!deleted) return res.status(404).json({ error: 'User not found' });
            res.json({ message: 'User deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
