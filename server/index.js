require('dotenv').config()
const express = require('express');
const app = express();
const massive = require('massive');
const controller = require('./controller');

const { SERVER_PORT, CONNECTION_STRING } = process.env;


massive({
    connectionString: CONNECTION_STRING,
     ssl: {rejectUnauthorized: false}
})
.then(dbInstance => {
    app.set('db', dbInstance);
})
    .catch(err => console.log(err));


app.use(express.json());

app.post('/api/products', controller.create);
app.get('/api/products', controller.getAll);
app.get('/api/products/:id', contorller.getOne);
app.put('/api/products/:id', contorller.update);
app.delete('/api/products/:id', controller.delete);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`)
})
