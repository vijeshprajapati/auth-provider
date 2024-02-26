require('./config/db');
const { PORT } = process.env;
const express = require('express');
const bodyParser = express.json;
const cors = require('cors');
const routes = require('./domain/user/routes');

const app = express();

app.use(bodyParser());
app.use(cors());
app.use('/user', routes);

app.listen(PORT, () => {
    console.log(`Server running at : ${PORT}`);
})