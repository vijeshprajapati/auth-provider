const app = require('./app');
const { PORT } = process.env;

const initApp = () => {
    app.listen(PORT, () => {
        console.log(`Backend running on port : ${PORT}`);
    });
}

initApp();