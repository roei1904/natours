const dotenv = require('dotenv');
const Email = require('./utils/email');

dotenv.config({ path: './config.env' });

async function sendTestEmailClass() {
  console.log('Testing Email Class...');

  const user = {
    email: 'test@example.com',
    name: 'Test User',
  };
  const url = 'http://example.com/reset';

  try {
    await new Email(user, url).sendPasswordReset();
    ('Class-based email sent successfully!');
  } catch (error) {
    console.error('Error in Email class:');
    console.error(error);
  }
}

sendTestEmailClass();
