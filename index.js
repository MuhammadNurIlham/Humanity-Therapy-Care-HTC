const express = require('express');
const cors = require('cors');
const UserRoute = require('./src/routes/UserRoute');
const ServiceRoute = require('./src/routes/ServiceRoute');


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/', UserRoute);
app.use('/api/v1/', ServiceRoute);

app.listen(port, () => console.log(`Connected Database Success - Server Running on port ${port}!! and Happy Hacking!`))