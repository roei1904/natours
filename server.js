const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
  (err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB, {}).then(() => {
  ('DB connection successful!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  `Server is running on port: ${port}`;
});

process.on('unhandledRejection', (err) => {
  ('UNHANDLED REJECTION! Shutting down...');
  (err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
