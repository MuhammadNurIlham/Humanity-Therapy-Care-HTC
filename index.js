const express = require('express');
const cors = require('cors');



const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => console.log(`Connected Database Success - Server Running on port ${port}!! and Happy Hacking!`))