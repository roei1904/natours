const mongoose = require('mongoose');
const dotenv = require('dotenv');

console.log('Starting application...');

// Handle uncaught exceptions first
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const database = process.env.DATABASE || '';
const databasePassword = process.env.DATABASE_PASSWORD || '';

if (!database || !databasePassword) {
  console.error(
    'FATAL ERROR: DATABASE or DATABASE_PASSWORD environment variables are missing!',
  );
  process.exit(1);
}

const DB = database.replace('<PASSWORD>', databasePassword);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error('DB Connection Failed! Shutting down...', err.message);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
