import ViteExpress from 'vite-express';
import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

ViteExpress.listen(app, PORT, () => {
  console.log(`Server running on port ${PORT}`);
});