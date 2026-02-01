const htmlToText = require('html-to-text');
console.log(htmlToText);
try {
  console.log('Testing convert:', htmlToText.convert('<h1>Hello</h1>'));
} catch (e) {
  console.error('Error with convert:', e.message);
}
