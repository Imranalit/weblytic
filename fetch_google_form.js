const https = require('https');

https.get('https://docs.google.com/forms/d/e/1FAIpQLSeGvSi8sbeogsN3YAIZwB6mK7bUnVU-CJDYGxjASVdVYO5Z5Q/viewform', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    const regex = /entry\.\d+/g;
    const matches = [...new Set(data.match(regex))];
    
    // Also try to find the field names next to the entries
    const regex2 = /"([^"]+)".*?\[\[(\d+)\]/g;
    let m;
    const fields = {};
    while ((m = regex2.exec(data)) !== null) {
      if (m[1].length > 1 && m[1].length < 100) {
        fields[m[2]] = m[1];
      }
    }
    
    console.log("Entries:", matches);
    console.log("Fields context:", JSON.stringify(fields, null, 2));
    
    // Fallback: extract the whole FB_PUBLIC_LOAD_DATA_
    const dataMatch = data.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);/s);
    if (dataMatch) {
       try {
           const parsed = JSON.parse(dataMatch[1]);
           const formFields = parsed[1][1];
           formFields.forEach(field => {
               console.log(`Field Name: ${field[1]}`);
               console.log(`Entry ID: entry.${field[4][0][0]}`);
               console.log('---');
           });
       } catch (e) {
           console.log("Could not parse JSON", e);
       }
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
