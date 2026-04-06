import ViteExpress from 'vite-express';
import express from 'express';
import routes from './routes/index.js';   // путь к вашему файлу маршрутов (с расширением .js)

const app = express();

app.use(express.json());

// Подключаем маршруты
app.use('/api', routes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

// ViteExpress.listen ожидает app, порт и колбэк
ViteExpress.listen(app, PORT, () => {
  console.log(`Server running on port ${PORT}`);
});