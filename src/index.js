require('./config/db');
const { PORT } = process.env;
const express = require('express');
const bodyParser = express.json;
const cors = require('cors');
const userRoutes = require('./domain/user/routes');
const otpRoutes = require('./domain/otp/routes');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(cors());
app.use('/api/user', userRoutes);
app.use('/api/otp', otpRoutes);

app.listen(PORT, () => {
    console.log(`Server running at : ${PORT}`);
})