const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/UserRoutes');
app.use('/tickets', ticketRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
