const https = require('https');
const fs = require('fs');

https.get('https://docs.google.com/forms/d/e/1FAIpQLSeGvSi8sbeogsN3YAIZwB6mK7bUnVU-CJDYGxjASVdVYO5Z5Q/viewform', (resp) => {
  let data = '';
  resp.on('data', (chunk) => data += chunk);
  resp.on('end', () => {
    fs.writeFileSync('form_dump.html', data);
    console.log("Saved to form_dump.html");
  });
});
