const { db } = require("../db");
const Utils = require("../utils");

exports.getAll = async (req, res) => {
    const tickets = await db.tickets.findAll();
    res.send(tickets.map(({ id, name }) => { return { id, name } }));
};

exports.getById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    return res.send(ticket);
};

exports.create = async (req, res) => {
    if (!req.body.TicketName ||
        !req.body.EventDate ||
        !req.body.Price) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }

    let newTicket = {
        TicketName: req.body.TicketName,
        EventDate: req.body.EventDate,
        Price: req.body.Price
    };

    const createdTicket = await db.tickets.create(newTicket);
    res.status(201)
        .location(${getBaseURL(req)}/tickets/${createdTicket.id})
        .send(createdTicket.id);
};

exports.editById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    if (!req.body.TicketName ||
        !req.body.EventDate ||
        !req.body.Price) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }
    ticket.TicketName = req.body.TicketName;
    ticket.EventDate = req.body.EventDate;
    ticket.Price = req.body.Price;
    await ticket.save();
    return res.status(201)
        .location(${getBaseURL(req)}/tickets/${ticket.id})
        .send(ticket);
};

exports.deleteById = async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return; }
    await ticket.destroy();
    res.status(204).send();
};

// Helper function to get a ticket by ID
async function getTicket(req, res) {
    const ticket = await db.tickets.findByPk(req.params.id);
    if (!ticket) {
        res.status(404).send({ error: "Ticket not found" });
    }
    return ticket;
}