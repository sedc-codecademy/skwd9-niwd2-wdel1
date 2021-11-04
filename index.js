require('dotenv').config();
require('./db/db');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const express = require('express');
const cors = require('cors');
const { PORT } = process.env;
const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})