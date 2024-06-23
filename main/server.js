import express from 'express';
import * as controlla from '../src/controler/handle.js'
const app = express();
import { sanitizeParams } from '../src/helper/sanatize.js';

app.get('/', (req, res) => {
    res.json({ Message: "Hello World!" });
});

app.get('/:word',sanitizeParams , async (req, res) => {
    await controlla.getResponse(req, res);
});


app.listen(3000);
