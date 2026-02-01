const htmlToText = require('html-to-text');
htmlToText;
try {
  ('Testing convert:', htmlToText.convert('<h1>Hello</h1>'));
} catch (e) {
  console.error('Error with convert:', e.message);
}
