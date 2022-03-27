var express = require('express');
const bodyParser = require('body-parser');
const disc = require('./disc')

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/post-kill', (req, res) => {
    disc.invoke(req.body)
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Started server at http://localhost:${port}!`));

