require('dotnev').config();

const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require("express");
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');

app.use(express.json()); // JSON-i tugi

// Mock andmed 
let users = [];
let events = [];
let ticketTypes = [];
let tickets = [];

// --- Kasutajate lõpp-punktid (Users) ---
app.get("/users", async(req, res) => {
    res.send(users);
});

app.post("/users", async (req, res) => {
    const { first_name, last_name, email, role } = req.body;

    if (!first_name || !last_name || !email || !role) {
        return res.status(400).send({ error: "Missing user details" });
    }

    const user = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        role,
        created_at: new Date()
    };

    users.push(user);
    res.status(201).send(user);
});

// --- Sündmuste lõpp-punktid (Events) ---
app.get("/events", (req, res) => {
    res.send(events);
});

app.post("/events", (req, res) => {
    const { user_id, title, location, event_date, start_time, end_time, max_attendees, status } = req.body;

    if (!user_id || !title || !location || !event_date || !start_time || !end_time || !max_attendees || !status) {
        return res.status(400).send({ error: "Missing event details" });
    }

    const event = {
        id: events.length + 1,
        user_id,
        title,
        location,
        event_date,
        start_time,
        end_time,
        max_attendees,
        status,
        created_at: new Date()
    };

    events.push(event);
    res.status(201).send(event);
});

// --- Pileti tüüpide lõpp-punktid (Ticket Types) ---
app.get("/tickets", async (req, res) => {
    const ticket = await getTicket(req, res);
    if (!ticket) { return};
    return res.send(ticket);
    }
)

app.post("/ticket-types", (req, res) => {
    const { event_id, name, price, quantity, description } = req.body;

    if (!event_id || !name || !price || !quantity) {
        return res.status(400).send({ error: "Missing ticket type details" });
    }

    const ticketType = {
        id: ticketTypes.length + 1,
        event_id,
        name,
        price,
        quantity,
        description
    };

    ticketTypes.push(ticketType);
    res.status(201).send(ticketType);
});

// --- Piletite lõpp-punktid (Tickets) ---
app.get("/tickets", (req, res) => {
    res.send(tickets);
});

app.post("/tickets", async (req, res) => {
    const { ticket_type_id, user_id, status } = req.body;

    if (!ticket_type_id || !user_id || !status) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const ticket = {
        id: createID(), 
        ticket_type_id,
        user_id,
        status,
        purchase_date: new Date(),
        created_at: new Date()
    };

    try {
        const createdTicket = await db.tickets.create(ticket);

        res.status(201)
            .location(`${getBaseURL(req)}/tickets/${createdTicket.id}`)
            .send(createdTicket);
    } catch (error) {
        res.status(500).send({ error: "Failed to create ticket" });
    }
});

// --- API kuulamine ---
app.listen(port, () => {
    console.log(`Piletimüügi API on saadaval aadressil http://localhost:${port}`);
});

async function getTicket(req, res) {
    const idNumber = parseInt(req.params.TicketID, 10);
    if (isNaN(idNumber)) {
        res.status(400).send({ error: "Invalid ticket ID" });
        return null;
    }
    const ticket = await db.tickets.findByPk(idNumber);
    if (!ticket) {
        res.status(404).send({ error: "Ticket not found" });
        return null;
    }
    return ticket;
}