import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.port || 8000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.status(404).send('404: Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
