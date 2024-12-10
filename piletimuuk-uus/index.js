require('dotenv').config();

const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const app = express();
const cors = require('cors');

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');

const tickets = [
    { 
        TicketID: 1,
        TicketName: "Throne & Liberty", ReleaseDateEU: "01.10.2024", ReviewScore: 10 
    },
    { 
        TicketID: 2, 
        TicketName: "Goat Simulator", ReleaseDateEU: "01.04.2014", ReviewScore: 10 
    },
    { 
        TicketID: 3, 
        TicketName: "Team Fortress 2", ReleaseDateEU: "01.01.2007", ReviewScore: 10 
    } 
];
const users = [
    {
        ID: 1,
        Username: "xXtittyslayer666Xx",
        Firstname: "Mihkel",
        Lastname: "Jaakson",
        Email: "mihkel@example.com",
        SecureLevel: 0,
        LevelKey: "0-0"
    },
    {
        ID: 2,
        Username: "BluePill",
        Firstname: "Olle",
        Lastname: "Õlle",
        Email: "Olleolle@example.com",
        SecureLevel: 0,
        LevelKey: "0-1"
    },
    {
        ID: 3,
        Username: "SuperMadis",
        Firstname: "Mattias",
        Lastname: "Moderaator",
        Email: "suma@example.com",
        SecureLevel: 0,
        LevelKey: "1-0"
    },
    {
        ID: 4,
        Username: "Admin",
        Firstname: "Admin",
        Lastname: "istraator",
        Email: "admin@example.com",
        SecureLevel: 1,
        LevelKey: "0-0"
    },
];

app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/tickets", (req, res) => { res.status(200).send(tickets) });

app.get("/tickets/:id", (req, res) => {
    const ticket = tickets.find(t => t.TicketID === parseInt(req.params.id));
    if (!ticket) {
        return res.status(404).send({ error: "Ticket not found" });
    }
    res.status(200).send(ticket);
});

app.post('/tickets', (req, res) => {
    if (!req.body.TicketName || !req.body.ReleaseDateEU || !req.body.ReviewScore) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }
    const ticket = {
        TicketID: tickets.length + 1,
        TicketName: req.body.TicketName,
        ReleaseDateEU: req.body.ReleaseDateEU,
        ReviewScore: req.body.ReviewScore,
    };
    tickets.push(ticket);
    res.status(201).location(`${getBaseURL(req)}/tickets/${tickets.length}`).send(ticket);
});

app.put('/tickets/:id', (req, res) => {
    const ticket = tickets.find(t => t.TicketID === parseInt(req.params.id));
    if (!ticket) {
        return res.status(404).send({ error: "Ticket not found" });
    }
    if (!req.body.TicketName || !req.body.ReleaseDateEU || !req.body.ReviewScore) {
        return res.status(400).send({ error: "One or multiple parameters are missing" });
    }
    ticket.TicketName = req.body.TicketName;
    ticket.ReleaseDateEU = req.body.ReleaseDateEU;
    ticket.ReviewScore = req.body.ReviewScore;
    res.status(200).send(ticket);
});

app.delete('/tickets/:id', (req, res) => {
    const ticketIndex = tickets.findIndex(t => t.TicketID === parseInt(req.params.id));
    if (ticketIndex === -1) {
        return res.status(404).send({ error: "Ticket not found" });
    }
    tickets.splice(ticketIndex, 1);
    res.status(204).send();
});

app.listen(port, () => { console.log(`API available at: http://localhost:${port}`); });

function getBaseURL(req) {
    return `${req.protocol}://${req.get('host')}`;
}
