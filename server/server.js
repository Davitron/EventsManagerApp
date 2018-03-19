import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import path from 'path';
import eventRoutes from './routes/event-route';
import centerRoutes from './routes/center-route';
import userRoutes from './routes/user-routes';
import swaggerDoc from './doc/swagger.json';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


app.set('secret_key', process.env.SECRET_KEY);

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
eventRoutes(app);
centerRoutes(app);
userRoutes(app);

app.use(express.static(path.join(__dirname, '../client/public')));
// app.use('/update-center/', express.static(path.join(__dirname, '../client/public')));
// app.use('/admin/centers/', express.static(path.join(__dirname, '../client/public')));
// app.use('/admin/pending/', express.static(path.join(__dirname, '../client/public')));
// app.use('/users/verify/', express.static(path.join(__dirname, '../client/public')));
app.set('views', path.join(__dirname, '..', 'client', 'public'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'client/public/index.html'));
});

app.get('*.js.gz', (req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'application/javascript');
  next();
});

app.get('*.css.gz', (req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

app.use((req, res, next) => {
  const err = res.status(404).send({
    error: '404: Sorry Page Not Found!'
  });
  next(err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
