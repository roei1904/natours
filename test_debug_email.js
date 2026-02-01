const dotenv = require('dotenv');
const Email = require('./utils/email');
const path = require('path');

// Load env vars
dotenv.config({ path: './config.env' });

async function runDebug() {
  console.log('--- START DEBUG ---');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST);

  const user = {
    email: 'jennifer@example.com',
    name: 'Jennifer Hardy',
  };
  const url = 'http://localhost:3000/reset-token-123';

  try {
    const emailObj = new Email(user, url);
    console.log('Email object created.');
    console.log('Templates path:', path.join(__dirname, 'views', 'emails'));

    console.log('Attempting to sendPasswordReset...');
    await emailObj.sendPasswordReset();
    console.log('--- SUCCESS ---');
  } catch (err) {
    console.error('--- FAILURE ---');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    if (err.response) {
      console.error('SMTP Response:', err.response);
    }
    console.error('Full Error:', err);
  }
}

runDebug();
