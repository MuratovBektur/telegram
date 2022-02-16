import express from 'express';

import expressWS from'express-ws';

const app = express();
const te = expressWS(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  return res.json({ message: 'Hello World2' });
})

export default app