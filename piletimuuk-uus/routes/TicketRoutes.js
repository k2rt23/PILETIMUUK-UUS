const TicketsController = require('../controllers/TicketsController');

module.exports = (app) => {
    app.route('/tickets')
        .get(TicketsController.getAll)
        .post(TicketsController.create);

    app.route('/tickets/:id')
        .get(TicketsController.getById)
        .put(TicketsController.editById)
        .delete(TicketsController.deleteById);
};
